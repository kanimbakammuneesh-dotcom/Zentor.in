import pg from "pg"

export interface Env {
  JOBS_CACHE: KVNamespace
  RATELIMIT: RateLimit
  HYPERDRIVE: Hyperdrive          // Cloudflare Hyperdrive — proxies TCP to RDS
  REFRESH_SECRET: string          // wrangler secret put REFRESH_SECRET
}

// ============ RATE LIMIT SETTINGS ============
// These values mirror the [ratelimits] block in wrangler.toml (limit=100, period=60)
// The RateLimit binding only needs the key at runtime — limits are config-driven.
const RATE_LIMIT_PERIOD = 60  // seconds (for Retry-After header)

// ============ HELPERS ============

function getClientIP(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown"
  )
}

/** Minimal security headers — no CORS, no origin restrictions */
function applySecurityHeaders(headers: Headers): void {
  headers.set("X-Content-Type-Options", "nosniff")
  headers.set("X-Frame-Options", "DENY")
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
}

/** Standard JSON response with optional caching */
function jsonResponse(body: string, status = 200, cacheSeconds = 0): Response {
  const headers = new Headers({
    "Content-Type": "application/json",
  })
  
  if (cacheSeconds > 0) {
    // Enable browser and CDN caching
    headers.set("Cache-Control", `public, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}`)
  } else {
    // Disable caching for dynamic/sensitive actions
    headers.set("Cache-Control", "no-store, must-revalidate")
  }
  
  applySecurityHeaders(headers)
  return new Response(body, { status, headers })
}

// ============ TYPES ============

interface Job {
  id: string
  title: string
  company: string
  company_logo_url: string | null
  location: string
  job_type: string
  is_remote: boolean
  experience_years: number
  salary_min: number | null
  salary_max: number | null
  salary_currency: string | null
  skills: string[] | null
  description: string
  job_url: string
  job_url_direct: string | null
  created_at: string
  updated_at: string
}

interface JobsResponse {
  jobs: Job[]
  total: number
  page: number
  hasMore: boolean
}

// ============ CACHE CONFIG ============

const CACHE_KEY = "jobs:all"
const LAST_SYNC_KEY = "jobs:last_sync"
const CACHE_TTL = 604800          // 7 days in seconds
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

// ============ MAIN HANDLER ============

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method

    // ── Rate limiting ──────────────────────────────────────────────────────────
    if (env.RATELIMIT) {
      const clientIP = getClientIP(request)
      // Cloudflare RateLimit binding: only `key` at runtime; limits come from wrangler.toml
      const { success } = await env.RATELIMIT.limit({ key: clientIP })

      if (!success) {
        console.log("Rate limit exceeded for IP:", clientIP)
        return jsonResponse(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          429
        )
      }
    }

    // ── Route matching ─────────────────────────────────────────────────────────
    // IMPORTANT: specific paths must be checked BEFORE the wildcard /jobs/:id regex
    try {
      // GET /jobs — list with filters + pagination
      if (path === "/jobs" && method === "GET") {
        return await handleGetJobs(request, env)
      }

      // POST /jobs/refresh — force-refetch all jobs from DB into KV
      if (path === "/jobs/refresh" && method === "POST") {
        return await handleRefresh(env, request)
      }

      // POST /jobs/sync — incremental sync (delta since last run)
      if (path === "/jobs/sync" && method === "POST") {
        return await handleSync(request, env)
      }

      // GET /healthz — DB connectivity check (requires secret, for diagnostics)
      if (path === "/healthz" && method === "GET") {
        return await handleHealthz(env, request)
      }

      // GET /jobs/:id — single job by ID (wildcard — must come LAST)
      if (path.match(/^\/jobs\/[\w-]+$/) && method === "GET") {
        const id = path.split("/")[2]
        return await handleGetJobById(id, env, request)
      }

      return jsonResponse(JSON.stringify({ error: "Not found" }), 404)
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error)
      console.error("Unhandled error:", msg)
      // Return actual error detail in response so we can debug
      return jsonResponse(JSON.stringify({ error: "Internal server error", detail: msg }), 500)
    }
  },
}

// ============ AUTH HELPER ============

/**
 * Verify the X-Refresh-Secret header matches the REFRESH_SECRET env var.
 * Returns a 401 Response if auth fails, or null if OK.
 */
function requireSecret(request: Request, env: Env): Response | null {
  if (!env.REFRESH_SECRET) {
    // Secret not configured → allow (dev mode / initial setup)
    console.warn("REFRESH_SECRET not set — skipping auth check")
    return null
  }
  const provided = request.headers.get("X-Refresh-Secret")
  if (!provided || provided !== env.REFRESH_SECRET) {
    console.log("Unauthorized refresh attempt — bad or missing X-Refresh-Secret")
    return jsonResponse(JSON.stringify({ error: "Unauthorized" }), 401)
  }
  return null
}

// ============ DATABASE ============

function createDbClient(env: Env) {
  const { Client } = pg
  // Hyperdrive provides a local connection string that proxies to RDS
  const connStr = env.HYPERDRIVE.connectionString
  console.log("Connecting via Hyperdrive...")
  return new Client({ connectionString: connStr })
}

// ============ JOB HANDLERS ============

async function handleGetJobs(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const params = {
    location: url.searchParams.get("location") || "",
    company:  url.searchParams.get("company")  || "",
    minExp:   url.searchParams.get("min_exp")  || "",
    maxExp:   url.searchParams.get("max_exp")  || "",
    sort:     url.searchParams.get("sort")     || "date",
    page:     parseInt(url.searchParams.get("page")  || "1"),
    limit:    parseInt(url.searchParams.get("limit") || "10"),
  }

  // Clamp pagination
  params.page  = Math.max(1, Math.min(params.page,  100))
  params.limit = Math.max(1, Math.min(params.limit, 100))

  // Try cache first
  const cached = await env.JOBS_CACHE.get(CACHE_KEY, "json") as JobsResponse | null
  let jobs: Job[] = []

  if (cached?.jobs) {
    console.log("Cache hit — returning", cached.jobs.length, "jobs")
    jobs = cached.jobs
  } else {
    console.log("Cache miss — fetching from DB")
    jobs = await fetchJobsFromDB(env)
    await env.JOBS_CACHE.put(
      CACHE_KEY,
      JSON.stringify({ jobs, total: jobs.length, page: 1, hasMore: false }),
      { expirationTtl: CACHE_TTL }
    )
  }

  // Apply filters
  if (params.location) jobs = jobs.filter(j => j.location.toLowerCase().includes(params.location.toLowerCase()))
  if (params.company)  jobs = jobs.filter(j => j.company.toLowerCase().includes(params.company.toLowerCase()))
  if (params.minExp)   jobs = jobs.filter(j => j.experience_years >= parseInt(params.minExp))
  if (params.maxExp)   jobs = jobs.filter(j => j.experience_years <= parseInt(params.maxExp))

  // Sort
  if (params.sort === "date") {
    jobs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  // Paginate
  const total = jobs.length
  const start = (params.page - 1) * params.limit
  const paginatedJobs = jobs.slice(start, start + params.limit)
  const hasMore = start + params.limit < total

  // Return with 1 hour CDN/Browser cache (3600 seconds)
  return jsonResponse(JSON.stringify({ jobs: paginatedJobs, total, page: params.page, hasMore }), 200, 3600)
}

async function handleGetJobById(id: string, env: Env, _request: Request): Promise<Response> {
  if (!/^[\w-]+$/.test(id)) {
    return jsonResponse(JSON.stringify({ error: "Invalid job ID" }), 400)
  }

  const cached = await env.JOBS_CACHE.get(CACHE_KEY, "json") as JobsResponse | null
  let jobs: Job[] = []

  if (cached?.jobs) {
    jobs = cached.jobs
  } else {
    jobs = await fetchJobsFromDB(env)
    await env.JOBS_CACHE.put(
      CACHE_KEY,
      JSON.stringify({ jobs, total: jobs.length, page: 1, hasMore: false }),
      { expirationTtl: CACHE_TTL }
    )
  }

  const job = jobs.find(j => j.id === id)
  if (!job) return jsonResponse(JSON.stringify({ error: "Job not found" }), 404)

  // Cache individual job detail for 1 hour
  return jsonResponse(JSON.stringify(job), 200, 3600)
}

async function handleRefresh(env: Env, request: Request): Promise<Response> {
  // Require secret on refresh endpoint
  const authError = requireSecret(request, env)
  if (authError) return authError

  console.log("Refreshing jobs cache from DB...")
  const jobs = await fetchJobsFromDB(env)

  await env.JOBS_CACHE.put(
    CACHE_KEY,
    JSON.stringify({ jobs, total: jobs.length, page: 1, hasMore: false }),
    { expirationTtl: CACHE_TTL }
  )
  await env.JOBS_CACHE.put(LAST_SYNC_KEY, new Date().toISOString())

  console.log("Refresh complete — cached", jobs.length, "jobs")
  return jsonResponse(JSON.stringify({ success: true, count: jobs.length, refreshed_at: new Date().toISOString() }))
}

async function handleSync(request: Request, env: Env): Promise<Response> {
  // Require secret on sync endpoint
  const authError = requireSecret(request, env)
  if (authError) return authError

  const url = new URL(request.url)
  const sinceParam = url.searchParams.get("since") || ""
  const lastSyncStored = await env.JOBS_CACHE.get(LAST_SYNC_KEY)
  const since = sinceParam || lastSyncStored || undefined

  console.log("Sync since:", since || "initial (last 7 days only)")

  const jobs = await fetchJobsFromDB(env, since)
  await env.JOBS_CACHE.put(LAST_SYNC_KEY, new Date().toISOString())

  return jsonResponse(JSON.stringify({ jobs, count: jobs.length, since: since ?? null }))
}

// ============ DB QUERY ============

async function fetchJobsFromDB(env: Env, since?: string): Promise<Job[]> {
  const client = createDbClient(env)

  await client.connect()
  console.log("Connected to DB")

  try {
    const sevenDaysAgo = new Date(Date.now() - SEVEN_DAYS_MS).toISOString()

    const conditions: string[] = ["created_at > $1"]
    const params: unknown[] = [sevenDaysAgo]

    if (since) {
      conditions.push(`updated_at > $${params.length + 1}`)
      params.push(since)
    }

    const query = [
      "SELECT id, title, company, company_logo_url, location, job_type, is_remote,",
      "       experience_years, salary_min, salary_max, salary_currency, skills,",
      "       description, job_url, job_url_direct, created_at, updated_at",
      "FROM job_postings",
      "WHERE " + conditions.join(" AND "),
      "ORDER BY created_at DESC",
    ].join(" ")

    console.log("Executing query, params:", params)
    const result = await client.query(query, params)
    console.log("Fetched", result.rows.length, "rows")

    return result.rows.map(row => ({
      ...row,
      skills: row.skills || [],
    }))
  } catch (err) {
    console.error("DB query error:", err)
    throw err
  } finally {
    await client.end()
  }
}

// ============ HEALTH CHECK ============

async function handleHealthz(env: Env, request: Request): Promise<Response> {
  const authError = requireSecret(request, env)
  if (authError) return authError

  const info: Record<string, unknown> = {
    hyperdrive_set: !!env.HYPERDRIVE,
    refresh_secret_set: !!env.REFRESH_SECRET,
  }

  const client = createDbClient(env)
  try {
    await client.connect()
    const result = await client.query("SELECT NOW() as now, current_database() as db")
    await client.end()
    return jsonResponse(JSON.stringify({
      status: "ok",
      db: { ...info, server_time: result.rows[0].now, database: result.rows[0].db },
    }))
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    try { await client.end() } catch {}
    return jsonResponse(JSON.stringify({
      status: "error",
      db: info,
      error: msg,
    }), 500)
  }
}
