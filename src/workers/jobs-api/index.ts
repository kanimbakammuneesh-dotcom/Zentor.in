import pg from "pg"

export interface Env {
  JOBS_CACHE: KVNamespace
  DB_HOST: string
  DB_PORT: string
  DB_NAME: string
  DB_USER: string
  DB_PASSWORD: string
}

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

const CACHE_KEY = "jobs:all"
const LAST_SYNC_KEY = "jobs:last_sync"
const CACHE_TTL = 604800 // 7 days (in seconds)
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method

    try {
      if (path === "/jobs" && method === "GET") {
        return await handleGetJobs(request, env)
      }
      if (path.match(/^\/jobs\/[\w-]+$/) && method === "GET") {
        const id = path.split("/")[2]
        return await handleGetJobById(id, env)
      }
      if (path === "/jobs/refresh" && method === "POST") {
        return await handleRefresh(env)
      }
      if (path === "/jobs/sync" && method === "POST") {
        return await handleSync(request, env)
      }
      
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    } catch (error: any) {
      console.error("Error:", error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
  },
}

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

  return new Response(JSON.stringify({
    jobs: paginatedJobs,
    total,
    page: params.page,
    hasMore,
  }), {
    headers: { "Content-Type": "application/json" },
  })
}

async function handleGetJobById(id: string, env: Env): Promise<Response> {
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
    return new Response(JSON.stringify({ error: "Job not found" }), { status: 404, headers: { "Content-Type": "application/json" } })
  }

  return new Response(JSON.stringify(job), { headers: { "Content-Type": "application/json" } })
}

async function handleRefresh(env: Env): Promise<Response> {
  const jobs = await fetchJobsFromDB(env)
  await env.JOBS_CACHE.put(CACHE_KEY, JSON.stringify({ jobs, total: jobs.length, page: 1, hasMore: false }), { expirationTtl: CACHE_TTL })
  await env.JOBS_CACHE.put(LAST_SYNC_KEY, new Date().toISOString())

  return new Response(JSON.stringify({ success: true, count: jobs.length }), { headers: { "Content-Type": "application/json" } })
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
  
  return new Response(JSON.stringify({ jobs, count: jobs.length, since: since }), { headers: { "Content-Type": "application/json" } })
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
    const params: any[] = []
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