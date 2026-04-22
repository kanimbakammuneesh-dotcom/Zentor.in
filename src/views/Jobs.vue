<script setup>
import { ref, onMounted } from 'vue'
import JobCard from '@/components/JobCard.vue'
import JobFilters from '@/components/JobFilters.vue'

const API_URL = 'https://zentor-jobs-api.zentor-admin.workers.dev'

const jobs = ref([])
const total = ref(0)
const loading = ref(false)
const error = ref(null)
const filters = ref({ location: '', company: '', minExp: null, maxExp: null, sort: 'date', page: 1, limit: 10 })
const hasMore = ref(false)
const uniqueLocations = ref([])

function handleFilterChange({ key, value }) {
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

async function fetchJobs() {
  loading.value = true
  error.value = null

  try {
    const params = new URLSearchParams()
    if (filters.value.location) params.set('location', filters.value.location)
    if (filters.value.company) params.set('company', filters.value.company)
    if (filters.value.minExp !== null) params.set('min_exp', filters.value.minExp.toString())
    if (filters.value.maxExp !== null) params.set('max_exp', filters.value.maxExp.toString())
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
  document.title = 'Tech Jobs in India | Zentor'
  
  // Monetag Integration
  if (!window._monetagInitialized) {
    window._monetagInitialized = true
    
    // Global Tag
    const tag = document.createElement('script')
    tag.id = 'monetag-tag'
    tag.src = 'https://quge5.com/88/tag.min.js'
    tag.dataset.zone = '231794'
    tag.async = true
    tag.setAttribute('data-cfasync', 'false')
    document.head.appendChild(tag)

    // Popunder
    const pop = document.createElement('script')
    pop.id = 'monetag-popunder'
    pop.dataset.zone = '10902056'
    pop.src = 'https://al5sm.com/tag.min.js'
    pop.setAttribute('data-cfasync', 'false')
    document.body.appendChild(pop)
  }

  const metaTags = [
    { name: 'description', content: 'Find the latest tech jobs in India. Filter by full-stack, AI, location, and experience. Apply to top companies and startups.' },
    { property: 'og:title', content: 'Tech Jobs in India | Zentor' },
    { property: 'og:description', content: 'Find the latest tech jobs in India. Filter by full-stack, AI, location, and experience. Apply to top companies and startups.' },
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

  const cached = localStorage.getItem('zentor_jobs_cache')
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached)
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

<template>
  <div class="page">
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">
          <span class="eyebrow-slash">/</span>Jobs
        </span>
        <h1 class="headline">
          Find Your Dream <span class="highlight-amber">Job</span>
        </h1>
        <p class="tagline">Premium <span class="highlight-coral">Tech Careers</span> in India</p>
        <p class="sub-headline">Browse curated job openings from high-growth tech companies. Filter by location, experience, and domain.</p>
        <div class="cta-wrap">
          <a href="/contact/" class="btn btn-primary" aria-label="Post a job">
            Post a Job <span class="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>

    <div class="content-container">
      <JobFilters 
        :unique-locations="uniqueLocations" 
        @filter-change="handleFilterChange" 
      />

      <section class="jobs-section">
        <div class="section-header">
          <p class="results-count">{{ total }} opportunities found</p>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Curating jobs for you...</p>
        </div>

        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button class="btn btn-secondary" @click="fetchJobs()">Try Again</button>
        </div>

        <div v-else class="jobs-grid">
          <JobCard 
            v-for="job in jobs" 
            :key="job.id" 
            :job="job" 
            @click="openJobDetail" 
          />
        </div>

        <div v-if="hasMore || filters.page > 1" class="pagination">
          <button class="btn btn-secondary" :disabled="filters.page <= 1" @click="setPage(filters.page - 1)">Previous</button>
          <span class="page-info">Page {{ filters.page }}</span>
          <button class="btn btn-secondary" :disabled="!hasMore" @click="setPage(filters.page + 1)">Next</button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.hero {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 140px 24px 60px;
  text-align: center;
  background: radial-gradient(circle at top left, rgba(200, 129, 26, 0.08) 0%, transparent 65%),
              radial-gradient(circle at bottom right, rgba(192, 72, 40, 0.05) 0%, transparent 65%);
}

.hero-content {
  max-width: 900px;
}

.eyebrow {
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--secondary);
}

.eyebrow-slash {
  color: var(--primary);
  margin-right: 0.5em;
}

.headline {
  font-family: 'Newsreader', serif;
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 600;
  color: var(--primary);
  line-height: 1.1;
  margin: 1.5rem 0 1.5rem;
  letter-spacing: -0.02em;
}

.hl-highlight {
  font-style: italic;
  font-weight: 500;
  color: var(--text);
}

.tagline {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: var(--text-muted);
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.sub-headline {
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem;
  color: var(--text-muted);
  max-width: 650px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.content-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(0, 24, 25, 0.05);
}

.results-count {
  font-family: 'Newsreader', serif;
  color: var(--primary);
  font-size: 1.25rem;
  font-weight: 600;
  font-style: italic;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
  padding-bottom: 4rem;
}

.loading-state,
.error-state {
  padding: 8rem 0;
  text-align: center;
  font-family: 'Manrope', sans-serif;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--surface);
  border-top-color: var(--secondary);
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 4rem 0 8rem;
}

.page-info {
  font-family: 'Manrope', sans-serif;
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.9375rem;
}

@media (max-width: 768px) {
  .hero { padding: 100px 20px 40px; }
  .headline { font-size: 3rem; }
  .jobs-grid { grid-template-columns: 1fr; }
  .pagination { flex-direction: column; gap: 1rem; }
  .btn { width: 100%; }
}
</style>
e>