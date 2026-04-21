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

onMounted(() => {
  fetchJob()
  
  // Monetag Integration
  if (!window._monetagInitializedDetail) {
    window._monetagInitializedDetail = true
    
    // Global Tag
    const tag = document.createElement('script')
    tag.src = 'https://quge5.com/88/tag.min.js'
    tag.dataset.zone = '231794'
    tag.async = true
    tag.setAttribute('data-cfasync', 'false')
    document.head.appendChild(tag)

    // Popunder
    const pop = document.createElement('script')
    pop.dataset.zone = '10902056'
    pop.src = 'https://al5sm.com/tag.min.js'
    pop.setAttribute('data-cfasync', 'false')
    document.body.appendChild(pop)
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

      <!-- <AdsterraBanner /> -->
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

      <!-- <AdsterraBanner /> -->
      <div class="job-footer">
        <p class="posted-date">Posted {{ formatDate(job.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding-top: 6rem;
}

.job-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 5% 6rem;
}

.detail-header {
  margin-bottom: 2.5rem;
}

.btn-back-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--acid);
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-back-nav:hover {
  border-color: var(--acid);
  background: rgba(167, 138, 254, 0.1);
  transform: translateX(-5px);
  box-shadow: 0 0 20px rgba(167, 138, 254, 0.2);
}

.back-icon {
  font-size: 1.2rem;
  line-height: 1;
}

.job-hero {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  margin-bottom: 3rem;
  background: var(--glass-bg);
  padding: 2.5rem;
  border: 1px solid var(--border);
  border-radius: 24px;
}

.company-logo {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 15px;
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
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
}

.job-info {
  flex: 1;
}

.job-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 0.5rem;
  line-height: 1.2;
}

.job-company {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--acid);
  margin: 0 0 1.5rem;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--text-dim);
  background: var(--bg);
  padding: 0.5rem 1rem;
  border-radius: 100px;
  border: 1px solid var(--border);
}

.meta-item.remote {
  color: var(--cyan);
  border-color: rgba(0, 255, 255, 0.2);
}

.salary-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgba(167, 138, 254, 0.1), rgba(0, 255, 255, 0.05));
  padding: 1.5rem 2rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  margin-bottom: 3rem;
}

.salary-label {
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--muted);
}

.salary-value {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
}

.skills-section, .description-section {
  margin-bottom: 3.5rem;
}

h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  background: var(--glass-bg);
  color: var(--text);
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  font-size: 0.9rem;
  font-weight: 600;
}

.apply-section {
  text-align: center;
  background: var(--glass-bg);
  padding: 3rem;
  border-radius: 24px;
  border: 1px solid var(--border);
  margin-bottom: 3rem;
}

.btn-apply {
  padding: 1.25rem 3.5rem;
  background: var(--acid);
  border: none;
  border-radius: 12px;
  font-family: 'Unbounded', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--bg);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 1rem;
}

.btn-apply:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(167, 138, 254, 0.4);
}

.apply-note {
  font-size: 0.85rem;
  color: var(--muted);
}

.loading-state, .error-state {
  text-align: center;
  padding: 10rem 5%;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border);
  border-top-color: var(--acid);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.job-footer {
  text-align: center;
  border-top: 1px solid var(--border);
  padding-top: 2rem;
}

.posted-date {
  font-size: 0.85rem;
  color: var(--text-dim);
}

@media (max-width: 768px) {
  .job-detail {
    padding: 2rem 5% 4rem;
  }
  .job-hero {
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.5rem;
    text-align: center;
    align-items: center;
  }
  .job-title {
    font-size: 1.75rem;
  }
  .job-company {
    font-size: 1.2rem;
  }
  .job-meta {
    justify-content: center;
    gap: 1rem;
  }
  .salary-range {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
    padding: 1.25rem;
  }
  .salary-value {
    font-size: 1.25rem;
  }
  .btn-apply {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
  }
}
</style>