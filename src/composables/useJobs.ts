import { ref, reactive, computed } from 'vue'

const API_URL = 'https://zentor-jobs-api.zentor-admin.workers.dev'

const jobs = ref([])
const total = ref(0)
const loading = ref(false)
const error = ref(null)
const cacheTimestamp = ref(null)

const filters = reactive({
  location: '',
  company: '',
  minExp: null,
  maxExp: null,
  sort: 'date',
  page: 1,
  limit: 10
})

const CACHE_KEY = 'zentor_jobs_cache'
const CACHE_TTL = 300000 // 5 minutes

function getCache() {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const data = JSON.parse(cached)
      if (Date.now() - data.timestamp < CACHE_TTL) {
        return data
      }
    }
  } catch {}
  return null
}

function setCache(response) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      ...response,
      timestamp: Date.now()
    }))
  } catch {}
}

async function fetchJobs(forceRefresh = false) {
  loading.value = true
  error.value = null

  try {
    if (!forceRefresh) {
      const cached = getCache()
      if (cached) {
        jobs.value = cached.jobs
        total.value = cached.total
        cacheTimestamp.value = cached.timestamp
        loading.value = false
        return
      }
    }

    const params = new URLSearchParams()
    if (filters.location) params.set('location', filters.location)
    if (filters.company) params.set('company', filters.company)
    if (filters.minExp) params.set('min_exp', filters.minExp.toString())
    if (filters.maxExp) params.set('max_exp', filters.maxExp.toString())
    params.set('sort', filters.sort)
    params.set('page', filters.page.toString())
    params.set('limit', filters.limit.toString())

    const response = await fetch(`${API_URL}/jobs?${params}&t=${Date.now()}`)
    if (!response.ok) throw new Error('Failed to fetch jobs')

    const data = await response.json()
    jobs.value = data.jobs
    total.value = data.total
    cacheTimestamp.value = Date.now()
    setCache(data)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function refreshCache() {
  try {
    const response = await fetch(`${API_URL}/jobs/refresh`, { method: 'POST' })
    if (!response.ok) throw new Error('Failed to refresh')
    await fetchJobs(true)
  } catch (e) {
    error.value = e.message
  }
}

function setFilter(key, value) {
  filters[key] = value
  filters.page = 1
  fetchJobs()
}

function setPage(page) {
  filters.page = page
  fetchJobs()
}

const hasMore = computed(() => filters.page * filters.limit < total.value)

const uniqueLocations = computed(() => {
  const locs = new Set(jobs.value.map(j => j.location).filter(Boolean))
  return Array.from(locs).sort()
})

export function useJobs() {
  return {
    jobs,
    total,
    loading,
    error,
    filters,
    hasMore,
    uniqueLocations,
    fetchJobs,
    refreshCache,
    setFilter,
    setPage
  }
}