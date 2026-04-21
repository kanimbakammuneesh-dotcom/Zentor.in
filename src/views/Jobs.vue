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
  document.title = 'Jobs | Zentor'
  
  const metaTags = [
    { name: 'description', content: 'Find tech jobs in India. Filter by location, experience. Apply to top companies.' },
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

    <div class="content-container">
      <JobFilters 
        :unique-locations="uniqueLocations" 
        @filter-change="handleFilterChange" 
      />

      <section class="jobs-section">
        <div class="section-header">
          <p class="results-count">{{ total }} jobs found</p>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading jobs...</p>
        </div>

        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button class="btn-retry" @click="fetchJobs()">Retry</button>
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
          <button class="page-btn" :disabled="filters.page <= 1" @click="setPage(filters.page - 1)">Previous</button>
          <span class="page-info">Page {{ filters.page }}</span>
          <button class="page-btn" :disabled="!hasMore" @click="setPage(filters.page + 1)">Next</button>
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
  padding: 8rem 1rem 4rem;
  margin-top: 5rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
}

.eyebrow {
  font-family: 'Unbounded', sans-serif;
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

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-top: 2rem;
}

.results-count {
  color: var(--text-dim);
  font-size: 1rem;
  font-weight: 600;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
  padding-bottom: 3rem;
  justify-content: center;
}

.loading-state,
.error-state {
  padding: 5rem 0;
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
  padding: 0.75rem 2rem;
  background: var(--acid);
  border: none;
  border-radius: 12px;
  color: var(--bg);
  font-weight: 700;
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem 0 6rem;
}

.page-btn {
  padding: 0.75rem 1.5rem;
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--acid);
  background: rgba(167, 138, 254, 0.1);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  color: var(--text-dim);
  font-weight: 600;
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 7rem 1rem 3rem;
  }
  .headline {
    font-size: 2.5rem;
  }
  .content-container {
    padding: 0 4%;
  }
  .jobs-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .section-header {
    margin-bottom: 1.5rem;
  }
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }
  .page-btn {
    width: 100%;
  }
}
</style>