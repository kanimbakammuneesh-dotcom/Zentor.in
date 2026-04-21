<template>
  <div class="page">
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">
          <span class="eyebrow-slash">/</span>Jobs
        </span>
        <h1 class="headline">
          <span class="hl-main">Find Your Dream</span>
          <br />
          <span class="hl-highlight">Job</span>
        </h1>
        <p class="tagline">Tech Jobs in India</p>
        <p class="sub-headline">Browse latest job openings from top companies. Filter by location, experience, and more.</p>
        <div class="cta-wrap">
          <a href="/contact/" class="btn-cta" aria-label="Post a job">Post a Job<span class="btn-arrow">→</span></a>
        </div>
      </div>
    </section>

    <section class="jobs-filters">
      <div class="filter-bar">
        <div class="filter-group">
          <input v-model="searchCompany" type="text" placeholder="Search by company..." class="filter-input" @input="debouncedSearch" />
        </div>
        <div class="filter-group">
          <select v-model="selectedLocation" class="filter-select" @change="onLocationChange">
            <option value="">All Locations</option>
            <option v-for="loc in uniqueLocations" :key="loc" :value="loc">{{ loc }}</option>
          </select>
        </div>
        <div class="filter-group">
          <select v-model="selectedExp" class="filter-select" @change="onExpChange">
            <option value="">Any Experience</option>
            <option value="0-1">0-1 Years</option>
            <option value="1-3">1-3 Years</option>
            <option value="3-5">3-5 Years</option>
            <option value="5+">5+ Years</option>
          </select>
        </div>
        <div class="filter-group">
          <select v-model="selectedSort" class="filter-select" @change="onSortChange">
            <option value="date">Newest First</option>
            <option value="experience">Experience</option>
          </select>
        </div>
      </div>
    </section>

    <!-- <AdsterraBanner /> -->
    
    <!-- <AdsterraBanner v-if="filters.page === 1" /> -->

    <section class="jobs-section">
      <p class="results-count">{{ total }} jobs found</p>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading jobs...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button class="btn-retry" @click="fetchJobs()">Retry</button>
      </div>

      <div v-else class="jobs-grid">
        <article v-for="job in jobs" :key="job.id" class="job-card" @click="openJobDetail(job.id)">
          <div class="job-card-main">
            <div class="company-logo">
              <img v-if="job.company_logo_url" :src="job.company_logo_url" :alt="job.company" class="logo-img" />
              <div v-else class="logo-fallback" :style="{ backgroundColor: getLogoColor(job.company) }">{{ job.company.charAt(0).toUpperCase() }}</div>
            </div>
            
            <div class="job-info-main">
              <h3 class="job-title">{{ job.title }}</h3>
              <p class="job-company">{{ job.company }}</p>
              
              <div class="job-details-row">
                <span class="detail-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {{ job.location }}
                </span>
                <span class="detail-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  {{ job.experience_years }} yrs
                </span>
                <span v-if="job.is_remote" class="detail-item remote">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Remote
                </span>
              </div>
            </div>
          </div>

          <div class="job-card-side">
            <div class="job-salary" v-if="job.salary_min || job.salary_max">
              <span>{{ job.salary_currency || '₹' }}{{ formatSalary(job.salary_min) }} - {{ job.salary_currency || '₹' }}{{ formatSalary(job.salary_max) }}</span>
            </div>
            <div class="job-date">{{ formatDate(job.created_at) }}</div>
          </div>
        </article>
      </div>

      <div v-if="hasMore || filters.page > 1" class="pagination">
        <button class="page-btn" :disabled="filters.page <= 1" @click="setPage(filters.page - 1)">Previous</button>
        <span class="page-info">Page {{ filters.page }}</span>
        <button class="page-btn" :disabled="!hasMore" @click="setPage(filters.page + 1)">Next</button>
      </div>

      <!-- <AdsterraBanner /> -->
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdsterraBanner from '@/components/AdsterraBanner.vue'

const API_URL = 'https://zentor-jobs-api.zentor-admin.workers.dev'

const jobs = ref([])
const total = ref(0)
const loading = ref(false)
const error = ref(null)
const filters = ref({ location: '', company: '', minExp: null, maxExp: null, sort: 'date', page: 1, limit: 10 })
const hasMore = ref(false)
const uniqueLocations = ref([])

const searchCompany = ref('')
const selectedLocation = ref('')
const selectedExp = ref('')
const selectedSort = ref('date')

let searchTimeout = null

function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    setFilter('company', searchCompany.value)
  }, 300)
}

function onLocationChange() {
  setFilter('location', selectedLocation.value)
}

function onExpChange() {
  if (!selectedExp.value) {
    setFilter('minExp', null)
    setFilter('maxExp', null)
  } else if (selectedExp.value === '5+') {
    setFilter('minExp', 5)
    setFilter('maxExp', null)
  } else {
    const [min, max] = selectedExp.value.split('-').map(Number)
    setFilter('minExp', min)
    setFilter('maxExp', max)
  }
}

function onSortChange() {
  setFilter('sort', selectedSort.value)
}

function setFilter(key, value) {
  filters.value[key] = value
  filters.value.page = 1
  fetchJobs()
}

function setPage(page) {
  filters.value.page = page
  fetchJobs()
}

function openJobDetail(id) {
  window.open(`/jobs/${id}`, '_blank')
}

function getLogoColor(company) {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  const index = company.charCodeAt(0) % colors.length
  return colors[index]
}

function formatSalary(amount) {
  if (!amount) return ''
  return amount.toLocaleString()
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}

async function fetchJobs() {
  loading.value = true
  error.value = null

  try {
    const params = new URLSearchParams()
    if (filters.value.location) params.set('location', filters.value.location)
    if (filters.value.company) params.set('company', filters.value.company)
    if (filters.value.minExp) params.set('min_exp', filters.value.minExp.toString())
    if (filters.value.maxExp) params.set('max_exp', filters.value.maxExp.toString())
    params.set('sort', filters.value.sort)
    params.set('page', filters.value.page.toString())
    params.set('limit', filters.value.limit.toString())

    const response = await fetch(`${API_URL}/jobs?${params}&t=${Date.now()}`)
    if (!response.ok) throw new Error('Failed to fetch jobs')

    const data = await response.json()
    jobs.value = data.jobs || []
    total.value = data.total || 0
    hasMore.value = data.hasMore || false

    const locs = new Set(jobs.value.map(j => j.location).filter(Boolean))
    uniqueLocations.value = Array.from(locs).sort()

    // Update local cache (only for page 1 with no filters)
    if (filters.value.page === 1 && !filters.value.location && !filters.value.company) {
      localStorage.setItem('zentor_jobs_cache', JSON.stringify({
        data,
        timestamp: Date.now()
      }))
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load jobs'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  document.title = 'Jobs | Zentor'
  
  /* Monetag Integration - commented out
  if (!window._monetagInitialized) {
    ...
  }
  */

  const metaTags = [    { name: 'description', content: 'Find tech jobs in India. Filter by location, experience. Apply to top companies.' },
    { property: 'og:title', content: 'Jobs | Zentor' },
    { property: 'og:description', content: 'Find tech jobs in India. Filter by location, experience. Apply to top companies.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/jobs/' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]
  
  metaTags.forEach(tag => {
    let meta = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      if (tag.property) meta.setAttribute('property', tag.property)
      else meta.setAttribute('name', tag.name)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', tag.content)
  })

  // Try to load from cache first for instant UI
  const cached = localStorage.getItem('zentor_jobs_cache')
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached)
      // If cache is less than 5 minutes old, show it immediately
      if (Date.now() - timestamp < 300000) {
        jobs.value = data.jobs || []
        total.value = data.total || 0
        hasMore.value = data.hasMore || false
        const locs = new Set(jobs.value.map(j => j.location).filter(Boolean))
        uniqueLocations.value = Array.from(locs).sort()
      }
    } catch (e) {
      console.error('Failed to parse jobs cache', e)
    }
  }

  fetchJobs()
})
</script>

<style scoped>
.hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rem 1rem 4rem;
  margin-top: 5rem;
}

.hero-content {
  text-align: center;
  max-width: 800px;
}

.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--acid);
}

.eyebrow-slash {
  color: var(--muted);
  margin-right: 0.5em;
}

.headline {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  color: var(--text);
  line-height: 1.1;
  margin: 1.5rem 0 1rem;
}

.hl-highlight {
  color: var(--acid);
}

.tagline {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--text-dim);
  margin-bottom: 0.5rem;
}

.sub-headline {
  font-size: 1rem;
  color: var(--muted);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.cta-wrap {
  margin-top: 1.5rem;
}

.btn-cta {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--acid);
  border: none;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bg);
  text-decoration: none;
  transition: all 0.2s;
}

.btn-cta:hover {
  box-shadow: 0 0 30px rgba(167, 138, 254, 0.5);
}

.btn-arrow {
  margin-left: 0.5rem;
}

.jobs-filters {
  padding: 1rem 5%;
  background: var(--glass-bg);
  border-bottom: 1px solid var(--border);
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.filter-group {
  flex: 1;
  min-width: 150px;
}

.filter-input,
.filter-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.9rem;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--acid);
}

.results-count {
  padding: 1rem 5%;
  color: var(--text-dim);
  font-size: 1rem;
}

.ad-banner {
  padding: 0 5%;
  margin: 1.5rem 0;
  min-height: 120px;
}

.hero-ad {
  margin-top: 0;
  padding-top: 1rem;
}

.bottom-ad {
  margin-top: 2rem;
  padding-bottom: 2rem;
}

.adsbygoogle {
  display: block;
  min-height: 120px;
  background: var(--glass-bg);
  border-radius: 12px;
}

ins.adsbygoogle a {
  display: none;
}

.ad-placeholder {
  display: none;
}

.ad-placeholder span {
  opacity: 0.5;
}

.loading-state,
.error-state {
  padding: 3rem 5%;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border);
  border-top-color: var(--acid);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn-retry {
  padding: 0.5rem 1.5rem;
  background: var(--acid);
  border: none;
  border-radius: 8px;
  color: var(--bg);
  cursor: pointer;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 0 5% 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.job-card {
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.job-card:hover {
  transform: translateY(-8px);
  border-color: var(--acid);
  box-shadow: 0 15px 35px rgba(167, 138, 254, 0.2);
}

.job-card-main {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  min-width: 0;
}

.company-logo {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.job-info-main {
  flex: 1;
  min-width: 0;
}

.job-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.job-company {
  color: var(--acid);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
}

.job-details-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-dim);
}

.detail-item.remote {
  color: var(--cyan);
}

.job-card-side {
  text-align: left;
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-salary {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.job-date {
  font-size: 0.8rem;
  color: var(--muted);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem 5%;
}

.page-btn {
  padding: 0.5rem 1.25rem;
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
  border-color: var(--acid);
}

.page-info {
  color: var(--text-dim);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 7rem 1rem 2rem;
    margin-top: 3rem;
  }
  .headline {
    font-size: clamp(1.75rem, 10vw, 2.5rem);
    margin: 1rem 0 0.5rem;
  }
  .tagline {
    font-size: 1rem;
  }
  .sub-headline {
    font-size: 0.9rem;
  }
  .filter-bar {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }
  .filter-group {
    width: 100%;
  }
  .filter-select {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  .jobs-grid {
    grid-template-columns: 1fr;
    padding: 0 4% 1.5rem;
  }
  .job-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
    border-radius: 12px;
  }
  .job-card:hover {
    transform: translateY(-4px);
  }
  .job-card-main {
    gap: 1rem;
  }
  .company-logo {
    width: 44px;
    height: 44px;
    padding: 6px;
  }
  .job-title {
    font-size: 1.1rem;
    white-space: normal;
  }
  .job-company {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  .job-details-row {
    gap: 0.75rem;
  }
  .detail-item {
    font-size: 0.75rem;
  }
  .job-card-side {
    text-align: left;
    width: 100%;
    border-top: 1px solid var(--border);
    padding-top: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .job-salary {
    font-size: 0.95rem;
    margin-bottom: 0;
  }
  .job-date {
    font-size: 0.7rem;
  }
  .pagination {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem 4%;
  }
  .page-btn {
    width: 100%;
    padding: 0.875rem;
    font-size: 0.9rem;
  }
  .ad-banner {
    margin: 1rem 0;
    padding: 0 4%;
  }
  .ad-placeholder {
    height: 100px;
    border-radius: 8px;
  }
  .results-count {
    padding: 0.75rem 4%;
    font-size: 0.85rem;
  }
}
</style>