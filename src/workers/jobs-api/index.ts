import pg from "pg"

export interface Env {
  JOBS_CACHE: KVNamespace
  RATELIMIT: RateLimit
  DB_HOST: string
  DB_PORT: string
  DB_NAME: string
  DB_USER: string
  DB_PASSWORD: string
}

// ============ SECURITY CONFIGURATION ============

// Allowed origins for CORS (frontend + developer tools)
const ALLOWED_ORIGINS = [
  "https://zentor.in",
  "https://www.zentor.in",
  "http://localhost:5173",  // Dev server
  "http://localhost:4173",  // Preview server
]

// Trusted development IPs (add your IP if needed)
const TRUSTED_IPS = [
  "127.0.0.1",
  "::1",
]

// Rate limit settings
const RATE_LIMIT = {
  // Requests per period
  LIMIT: 100,
  // Period in seconds
  PERIOD: 60,
}

// ============ SECURITY HELPERS ============

/**
 * Get client IP from request (handles Cloudflare proxy)
 */
function getClientIP(request: Request): string {
  // Cloudflare passes real IP in this header
  const cfIP = request.headers.get("CF-Connecting-IP")
  if (cfIP) return cfIP
  
  // Fallback to standard header
  return request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() || "unknown"
}

/**
 * Validate request origin against allowlist
 */
function isOriginAllowed(request: Request): boolean {
  const origin = request.headers.get("Origin") || request.headers.get("Referer")
  
  if (!origin) {
    // No origin header - might be a direct request, check referer
    const referer = request.headers.get("Referer")
    if (!referer) return false // No origin or referer = suspicious
  }
  
  if (origin) {
    // Check exact match or wildcard
    return ALLOWED_ORIGINS.some(allowed => 
      origin === allowed || 
      origin.startsWith(allowed.replace("https://", "")) ||
      allowed.includes(origin.replace("https://", ""))
    )
  }
  
  return false
}

/**
 * Check for suspicious/bot request patterns
 */
function isSuspiciousRequest(request: Request): boolean {
  const userAgent = request.headers.get("User-Agent") || ""
  
  // Block common scraper/user agents
  const blockedAgents = [
    "scrapy",
    "curl",
    "wget",
    "python-requests",
    "bot",
    "crawler",
    "spider",
    "curl/",
    "wget/",
  ]
  
  const lowerUA = userAgent.toLowerCase()
  for (const blocked of blockedAgents) {
    if (lowerUA.includes(blocked)) {
      console.log("Blocked suspicious user agent:", userAgent)
      return true
    }
  }
  
  // Block requests with no user agent
  if (!userAgent || userAgent.trim() === "") {
    console.log("Blocked request with no User-Agent")
    return true
  }
  
  return false
}

/**
 * Apply security headers to response
 */
function applySecurityHeaders(headers: Headers): void {
  headers.set("X-Content-Type-Options", "nosniff")
  headers.set("X-Frame-Options", "DENY")
  headers.set("X-XSS-Protection", "1; mode=block")
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
  
  // Content Security Policy - strict for API
  headers.set(
    "Content-Security-Policy",
    "default-src 'none'; frame-ancestors 'none';"
  )
}

/**
 * Create a secure error response
 */
function securityErrorResponse(message: string, status = 403): Response {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store, must-revalidate",
  }
  applySecurityHeaders(new Headers(headers))
  
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      ...Object.fromEntries(new Headers(headers)),
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
  })
}

// ============ CORS CONFIGURATION ============

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://zentor.in",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Max-Age": "86400", // 24 hours
  "Cache-Control": "no-store, must-revalidate",
}

function corsResponse(body: string, status = 200): Response {
  const headers = new Headers({
    "Content-Type": "application/json",
    ...CORS_HEADERS,
  })
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
const CACHE_TTL = 604800 // 7 days (in seconds)
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

// ============ MAIN HANDLER ============

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method

    // ===== SECURITY CHECKS =====
    
    // 1. Rate limiting (using Cloudflare Rate Limiting binding)
    if (env.RATELIMIT) {
      const clientIP = getClientIP(request)
      const { success } = await env.RATELIMIT.limit({ 
        key: clientIP,
        limit: RATE_LIMIT.LIMIT,
        period: RATE_LIMIT.PERIOD,
      })
      
      if (!success) {
        console.log("Rate limit exceeded for IP:", clientIP)
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(RATE_LIMIT.PERIOD),
              "X-RateLimit-Limit": String(RATE_LIMIT.LIMIT),
              "X-RateLimit-Remaining": "0",
              ...CORS_HEADERS,
            },
          }
        )
      }
    }
    
    // 2. Origin/Referer validation (allowlist)
    if (!isOriginAllowed(request)) {
      console.log("Blocked request from disallowed origin:", request.headers.get("Origin") || request.headers.get("Referer"))
      return securityErrorResponse("Origin not allowed", 403)
    }
    
    // 3. Bot/Spam detection
    if (isSuspiciousRequest(request)) {
      return securityErrorResponse("Request blocked", 403)
    }

    // Handle CORS preflight
    if (method === "OPTIONS") {
      const headers = new Headers(CORS_HEADERS)
      applySecurityHeaders(headers)
      return new Response(null, { status: 204, headers })
    }

    try {
      if (path === "/jobs" && method === "GET") {
        return await handleGetJobs(request, env)
      }
      if (path.match(/^\/jobs\/[\w-]+$/) && method === "GET") {
        const id = path.split("/")[2]
        return await handleGetJobById(id, env)
      }
      if (path === "/jobs/refresh" && method === "POST") {
        // Protected: require authorized origin or secret
        return await handleRefresh(env)
      }
      if (path === "/jobs/sync" && method === "POST") {
        // Protected: require authorized origin or secret
        return await handleSync(request, env)
      }
      
      return corsResponse(JSON.stringify({ error: "Not found" }), 404)
    } catch (error: any) {
      console.error("Error:", error)
      return corsResponse(JSON.stringify({ error: "Internal server error" }), 500)
    }
  },
}

// ============ DATABASE ============

function getDbConfig(env: Env) {
  const { Client } = pg
  console.log("Connecting to:", env.DB_HOST)
  
  return new Client({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT || "5432"),
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    ssl: "require",
    max: 1,
  })
}

// ============ JOB HANDLERS ============

async function handleGetJobs(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const params = {
    location: url.searchParams.get("location") || "",
    company: url.searchParams.get("company") || "",
    minExp: url.searchParams.get("min_exp") || "",
    maxExp: url.searchParams.get("max_exp") || "",
    sort: url.searchParams.get("sort") || "date",
    page: parseInt(url.searchParams.get("page") || "1"),
    limit: parseInt(url.searchParams.get("limit") || "10"),
  }

  // Validate and cap pagination params
  params.page = Math.max(1, Math.min(params.page, 100))
  params.limit = Math.max(1, Math.min(params.limit, 100))

  const cached = await env.JOBS_CACHE.get(CACHE_KEY, "json") as JobsResponse | null
  let jobs: Job[] = []

  if (cached && cached.jobs) {
    jobs = cached.jobs
  } else {
    jobs = await fetchJobsFromDB(env)
    await env.JOBS_CACHE.put(CACHE_KEY, JSON.stringify({ jobs, total: jobs.length, page: 1, hasMore: false }), { expirationTtl: CACHE_TTL })
  }

  if (params.location) {
    jobs = jobs.filter((j) => j.location.toLowerCase().includes(params.location.toLowerCase()))
  }
  if (params.company) {
    jobs = jobs.filter((j) => j.company.toLowerCase().includes(params.company.toLowerCase()))
  }
  if (params.minExp) {
    jobs = jobs.filter((j) => j.experience_years >= parseInt(params.minExp))
  }
  if (params.maxExp) {
    jobs = jobs.filter((j) => j.experience_years <= parseInt(params.maxExp))
  }

  if (params.sort === "date") {
    jobs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  const total = jobs.length
  const start = (params.page - 1) * params.limit
  const paginatedJobs = jobs.slice(start, start + params.limit)
  const hasMore = start + params.limit < total

  return corsResponse(JSON.stringify({
    jobs: paginatedJobs,
    total,
    page: params.page,
    hasMore,
  }))
}

async function handleGetJobById(id: string, env: Env): Promise<Response> {
  // Validate ID format (prevent injection)
  if (!/^[\w-]+$/.test(id)) {
    return corsResponse(JSON.stringify({ error: "Invalid job ID" }), 400)
  }
  
  const cached = await env.JOBS_CACHE.get(CACHE_KEY, "json") as JobsResponse | null
  let jobs: Job[] = []

  if (cached && cached.jobs) {
    jobs = cached.jobs
  } else {
    jobs = await fetchJobsFromDB(env)
    await env.JOBS_CACHE.put(CACHE_KEY, JSON.stringify({ jobs, total: jobs.length, page: 1, hasMore: false }), { expirationTtl: CACHE_TTL })
  }

  const job = jobs.find((j) => j.id === id)
  if (!job) {
    return corsResponse(JSON.stringify({ error: "Job not found" }), 404)
  }

  return corsResponse(JSON.stringify(job))
}

async function handleRefresh(env: Env): Promise<Response> {
  const jobs = await fetchJobsFromDB(env)
  await env.JOBS_CACHE.put(CACHE_KEY, JSON.stringify({ jobs, total: jobs.length, page: 1, hasMore: false }), { expirationTtl: CACHE_TTL })
  await env.JOBS_CACHE.put(LAST_SYNC_KEY, new Date().toISOString())

  return corsResponse(JSON.stringify({ success: true, count: jobs.length }))
}

async function handleSync(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  
  // Get 'since' from query param OR from last_sync stored in KV
  const sinceParam = url.searchParams.get("since") || ""
  const lastSyncStored = await env.JOBS_CACHE.get(LAST_SYNC_KEY)
  const since = sinceParam || lastSyncStored || undefined

  console.log("Sync since:", since || "initial (last 7 days only)")

  const jobs = await fetchJobsFromDB(env, since)
  
  // Update last sync timestamp after successful sync
  await env.JOBS_CACHE.put(LAST_SYNC_KEY, new Date().toISOString())
  
  return corsResponse(JSON.stringify({ jobs, count: jobs.length, since: since }))
}

async function fetchJobsFromDB(env: Env, since?: string): Promise<Job[]> {
  console.log("Starting DB connection...")
  
  const client = getDbConfig(env)
  
  try {
    await client.connect()
    console.log("Connected to DB successfully")
  } catch (err) {
    console.error("Connection error:", err)
    throw err
  }

  try {
    // Calculate 7-day cutoff (last week from today)
    const sevenDaysAgo = new Date(Date.now() - SEVEN_DAYS_MS).toISOString()
    
    let query = "SELECT id, title, company, company_logo_url, location, job_type, is_remote, experience_years, salary_min, salary_max, salary_currency, skills, description, job_url, job_url_direct, created_at, updated_at FROM job_postings"
    const params: unknown[] = []
    const conditions: string[] = []

    // ALWAYS filter to last 7 days only (stale job application data excluded)
    conditions.push("created_at > $1")
    params.push(sevenDaysAgo)

    // For incremental sync: only fetch records updated AFTER last sync
    // For full refresh: this param is undefined, so we fetch all from last 7 days
    if (since) {
      conditions.push("updated_at > $2")
      params.push(since)
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ")
    }
    query += " ORDER BY created_at DESC"

    console.log("Executing query with params:", params)
    const result = await client.query(query, params)
    console.log("Query result:", result.rows.length, "rows (last 7 days only)")
    return result.rows.map((row) => ({
      ...row,
      skills: row.skills || [],
    }))
  } catch (err) {
    console.error("Query error:", err)
    throw err
  } finally {
    await client.end()
  }
}
