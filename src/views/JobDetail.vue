<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import JobDescription from '@/components/JobDescription.vue'

const route = useRoute()
const API_URL = 'https://zentor-jobs-api.zentor-admin.workers.dev'

const job = ref(null)
const loading = ref(true)
const error = ref(null)
const applyClicks = ref(0)

function formatSalary(amount) {
  if (!amount) return ''
  return amount.toLocaleString()
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function getLogoColor(company) {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  const index = company ? company.charCodeAt(0) % colors.length : 0
  return colors[index]
}

async function fetchJob() {
  loading.value = true
  error.value = null
  try {
    const id = route.params.id
    const response = await fetch(`${API_URL}/jobs/${id}?t=${Date.now()}`)
    if (!response.ok) throw new Error('Job not found')
    job.value = await response.json()
    
    // Update Meta
    document.title = `${job.value.title} at ${job.value.company} | Zentor`
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load job'
  } finally {
    loading.value = false
  }
}

function handleApply() {
  applyClicks.value++
  // Minimal interaction logic
  if (job.value?.job_url) {
    window.open(job.value.job_url, '_blank')
  }
}

function injectMonetag() {
  if (!window._monetagInitializedDetail) {
    window._monetagInitializedDetail = true
    
    const tag = document.createElement('script')
    tag.id = 'monetag-tag'
    tag.src = 'https://quge5.com/88/tag.min.js'
    tag.dataset.zone = '231794'
    tag.async = true
    tag.setAttribute('data-cfasync', 'false')
    document.head.appendChild(tag)

    const pop = document.createElement('script')
    pop.id = 'monetag-popunder'
    pop.dataset.zone = '10902056'
    pop.src = 'https://al5sm.com/tag.min.js'
    pop.setAttribute('data-cfasync', 'false')
    document.body.appendChild(pop)
  }
}

onMounted(() => {
  fetchJob()
  
  const hero = document.querySelector('.hero')
  if (hero) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        injectMonetag()
        observer.disconnect()
      }
    }, { threshold: 0 })
    observer.observe(hero)
  } else {
    injectMonetag()
  }
})

// Update SEO Meta when job data changes
import { watch } from 'vue'
watch(job, (newJob) => {
  if (newJob) {
    const title = `${newJob.title} at ${newJob.company} | Zentor`
    const description = `Apply for ${newJob.title} at ${newJob.company} in ${newJob.location}. ${newJob.experience_years}+ years experience required.`
    const url = `https://zentor.in/jobs/${newJob.id}`

    document.title = title
    
    const metaTags = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
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
  }
}, { immediate: true })
</script>

<template>
  <div class="page">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading job details...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <router-link to="/jobs/" class="btn-back-nav">
        <span class="back-icon">←</span>
        <span class="back-text">Back to Jobs</span>
      </router-link>
    </div>

    <div v-else-if="job" class="job-detail">
      <div class="detail-header">
        <router-link to="/jobs/" class="btn-back-nav">
          <span class="back-icon">←</span>
          <span class="back-text">Back to Jobs</span>
        </router-link>
      </div>

      <div class="job-hero">
        <div class="company-logo">
          <img v-if="job.company_logo_url" :src="job.company_logo_url" :alt="job.company" class="logo-img" />
          <div v-else class="logo-fallback" :style="{ backgroundColor: getLogoColor(job.company) }">
            {{ job.company.charAt(0).toUpperCase() }}
          </div>
        </div>

        <div class="job-info">
          <h1 class="job-title">{{ job.title }}</h1>
          <p class="job-company">{{ job.company }}</p>

          <div class="job-meta">
            <span class="meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {{ job.location }}
            </span>
            <span class="meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              {{ job.experience_years }} Years
            </span>
            <span v-if="job.is_remote" class="meta-item remote">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Remote
            </span>
            <span class="meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 3v4"/>
                <path d="M8 3v4"/>
              </svg>
              {{ job.job_type }}
            </span>
          </div>
        </div>
      </div>

      <div class="salary-range" v-if="job.salary_min || job.salary_max">
        <span class="salary-label">Salary Range</span>
        <span class="salary-value">
          {{ job.salary_currency || '₹' }}{{ formatSalary(job.salary_min) }} - {{ job.salary_currency || '₹' }}{{ formatSalary(job.salary_max) }}
        </span>
      </div>

      <div class="skills-section" v-if="job.skills && job.skills.length">
        <h3>Required Skills</h3>
        <div class="skills-list">
          <span v-for="skill in job.skills" :key="skill" class="skill-tag">{{ skill }}</span>
        </div>
      </div>

      <div class="description-section">
        <h3>Job Description</h3>
        <JobDescription :description="job.description" />
      </div>

      <div class="apply-section">
        <button @click="handleApply" class="btn-apply">
          Apply Now →
        </button>
        <p class="apply-note">Opening job posting...</p>
      </div>

      <div class="job-footer">
        <p class="posted-date">Posted {{ formatDate(job.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding-top: 100px;
  background: white;
}

.job-detail {
  max-width: 960px;
  margin: 0 auto;
  padding: 60px 24px 120px;
}

.detail-header {
  margin-bottom: 3rem;
}

.btn-back-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.8125rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--primary);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  background: var(--bg);
  border: 1px solid rgba(0, 24, 25, 0.05);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.btn-back-nav:hover {
  background: white;
  border-color: var(--secondary);
  color: var(--secondary);
  transform: translateX(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.job-hero {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  margin-bottom: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid rgba(0, 24, 25, 0.05);
}

.company-logo {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  background: var(--bg);
  border: 1px solid rgba(0, 24, 25, 0.05);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  border-radius: 12px;
  font-size: 3rem;
  font-weight: 700;
  color: white;
}

.job-info {
  flex: 1;
}

.job-title {
  font-family: 'Newsreader', serif;
  font-size: 3.5rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0 0 0.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.job-company {
  font-family: 'Manrope', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--secondary);
  margin: 0 0 2rem;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  color: var(--text-muted);
  background: var(--bg);
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  font-weight: 700;
}

.meta-item svg {
  color: var(--primary);
  opacity: 0.6;
}

.salary-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--tertiary);
  padding: 2rem 2.5rem;
  border-radius: var(--radius-lg);
  margin-bottom: 4rem;
  border: 1px solid rgba(0, 24, 25, 0.05);
}

.salary-label {
  font-family: 'Manrope', sans-serif;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: 0.1em;
  opacity: 0.6;
}

.salary-value {
  font-family: 'Newsreader', serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary);
}

.skills-section, .description-section {
  margin-bottom: 4rem;
}

h3 {
  font-family: 'Newsreader', serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--primary);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.skill-tag {
  background: white;
  color: var(--primary);
  padding: 0.6rem 1.5rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(0, 24, 25, 0.1);
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
}

.apply-section {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--primary);
  border-radius: var(--radius-lg);
  color: white;
  margin-bottom: 4rem;
  box-shadow: 0 20px 40px rgba(0, 24, 25, 0.15);
}

.btn-apply {
  padding: 1.25rem 4rem;
  background: var(--secondary);
  border: none;
  border-radius: var(--radius-md);
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: white;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-bottom: 1.5rem;
}

.btn-apply:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 35px rgba(217, 119, 6, 0.3);
}

.apply-note {
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.loading-state, .error-state {
  text-align: center;
  padding: 120px 24px;
}

.spinner {
  width: 56px;
  height: 56px;
  border: 3px solid var(--surface);
  border-top-color: var(--secondary);
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  margin: 0 auto 2rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.job-footer {
  text-align: center;
  border-top: 1px solid rgba(0, 24, 25, 0.05);
  padding-top: 3rem;
}

.posted-date {
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .job-detail { padding: 40px 20px 80px; }
  .job-hero { flex-direction: column; gap: 2rem; padding-bottom: 2.5rem; }
  .job-title { font-size: 2.25rem; }
  .job-company { font-size: 1.25rem; margin-bottom: 1.5rem; }
  .salary-range { flex-direction: column; gap: 1rem; text-align: center; padding: 1.5rem; }
  .salary-value { font-size: 1.5rem; }
  .btn-apply { width: 100%; padding: 1rem; }
}
</style>