<template>
  <div class="page">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading job details...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <router-link to="/jobs/" class="btn-back">← Back to Jobs</router-link>
    </div>

    <div v-else-if="job" class="job-detail">
      <div class="detail-header">
        <router-link to="/jobs/" class="back-link">← Back to Jobs</router-link>
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

      <AdsterraBanner />
      <div class="skills-section" v-if="job.skills && job.skills.length">
        <h3>Required Skills</h3>
        <div class="skills-list">
          <span v-for="skill in job.skills" :key="skill" class="skill-tag">{{ skill }}</span>
        </div>
      </div>

      <div class="description-section">
        <h3>Job Description</h3>
        <div class="description-content" v-html="formatDescription(job.description)"></div>
      </div>

      <div class="apply-section">
        <button @click="handleApply" class="btn-apply">
          Apply Now →
        </button>
        <p class="apply-note">{{ applyClicks === 0 ? 'Click to apply (ad plays first)' : 'Opening job posting...' }}</p>
      </div>

      <AdsterraBanner />
      <div class="job-footer">
        <p class="posted-date">Posted {{ formatDate(job.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AdsterraBanner from '@/components/AdsterraBanner.vue'

const API_URL = 'https://zentor-jobs-api.zentor-admin.workers.dev'

const route = useRoute()
const job = ref(null)
const loading = ref(true)
const error = ref(null)
const applyClicks = ref(0)

function handleApply() {
  const jobUrl = job.value.job_url_direct || job.value.job_url
  
  if (applyClicks.value === 0) {
    // First click - popunder triggers automatically via script in head
    applyClicks.value++
    // Just open the job URL directly on first click too, popunder handles monetization
    window.open(jobUrl, '_blank', 'noopener,noreferrer')
  } else {
    // Second click - go directly to job posting
    window.open(jobUrl, '_blank', 'noopener,noreferrer')
  }
}

async function fetchJob() {
  loading.value = true
  error.value = null

  try {
    const id = route.params.id
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      headers: {
        'Origin': 'https://zentor.in',
        'User-Agent': navigator.userAgent
      }
    })
    if (!response.ok) {
      if (response.status === 404) {
        error.value = 'Job not found'
      } else {
        error.value = 'Failed to load job details'
      }
      return
    }
    job.value = await response.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load job'
  } finally {
    loading.value = false
  }
}

function getLogoColor(company) {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  const index = company.charCodeAt(0) % colors.length
  return colors[index]
}

function formatSalary(amount) {
  if (!amount) return '0'
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

function formatDescription(text) {
  if (!text) return ''
  return text.replace(/\n/g, '<br>')
}

onMounted(() => {
  fetchJob()
  
  // Adsterra — inject each script exactly once to avoid CORB blocks from multiple loads
  if (!window._adsterraPopunder) {
    window._adsterraPopunder = true
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = 'https://windowthrilling.com/ce/53/fc/ce53fcb07fd938c7dd165e9b64ba3005.js'
    document.head.appendChild(s)
  }
  if (!window._adsterraAntiAdblock) {
    window._adsterraAntiAdblock = true
    const s2 = document.createElement('script')
    s2.type = 'text/javascript'
    s2.async = true
    s2.src = 'https://pl29201487.profitablecpmratenetwork.com/ce/53/fc/ce53fcb07fd938c7dd165e9b64ba3005.js'
    document.head.appendChild(s2)
  }

  const id = String(route.params.id)
  document.title = 'Job Details | Zentor'
  
  const metaTags = [
    { name: 'description', content: job.value?.title ? `${job.value.title} at ${job.value.company}` : 'Job details on Zentor' },
    { property: 'og:title', content: 'Job Details | Zentor' },
    { property: 'og:description', content: job.value?.title ? `${job.value.title} at ${job.value.company}` : 'Apply for jobs on Zentor' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: `https://zentor.in/jobs/${id}` },
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

  fetchJob()
})
</script>

<style scoped>
.loading-state,
.error-state {
  padding: 4rem 5%;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--border);
  border-top-color: var(--acid);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.back-link {
  display: inline-block;
  padding: 1rem 5%;
  color: var(--text-dim);
  text-decoration: none;
}

.back-link:hover {
  color: var(--acid);
}

.job-detail {
  padding: 8rem 5% 3rem;
  max-width: 800px;
  margin: 0 auto;
}

.job-hero {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.company-logo {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

.logo-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 2rem;
  font-weight: 600;
  color: white;
}

.job-info {
  flex: 1;
}

.job-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 0.5rem;
}

.job-company {
  font-size: 1.1rem;
  color: var(--text-dim);
  margin: 0 0 1rem;
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
  font-size: 0.9rem;
  color: var(--text-dim);
}

.meta-item.remote {
  color: var(--acid);
}

.salary-range {
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.salary-label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-dim);
  margin-bottom: 0.35rem;
}

.salary-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
}

.skills-section {
  margin-bottom: 1.5rem;
}

.skills-section h3 {
  font-size: 1rem;
  color: var(--text);
  margin: 0 0 0.75rem;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.35rem 0.75rem;
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--text);
}

.description-section {
  margin-bottom: 1.5rem;
}

.description-section h3 {
  font-size: 1rem;
  color: var(--text);
  margin: 0 0 0.75rem;
}

.description-content {
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text);
}

.google-ads {
  margin: 2rem 0;
}

.ads-placeholder {
  width: 100%;
  min-height: 250px;
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dim);
  font-size: 0.85rem;
}

.apply-section {
  text-align: center;
  margin-bottom: 2rem;
}

.btn-apply {
  display: inline-block;
  width: 100%;
  max-width: 300px;
  padding: 1rem 2rem;
  background: var(--acid);
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--bg);
  text-decoration: none;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-apply:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(167, 138, 254, 0.3);
}

.apply-note {
  font-size: 0.8rem;
  color: var(--text-dim);
  margin-top: 0.5rem;
}

.job-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.ad-banner {
  margin: 2rem 0;
  min-height: 120px;
}

.adsbygoogle {
  display: block;
  min-height: 120px;
  background: var(--glass-bg);
  border-radius: 12px;
}

.ad-placeholder {
  display: none;
}

.posted-date {
  font-size: 0.85rem;
  color: var(--text-dim);
  margin: 0;
}

.btn-back {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  text-decoration: none;
}

.btn-back:hover {
  border-color: var(--acid);
}

@media (max-width: 600px) {
  .page {
    padding-top: 4rem;
  }
  .job-detail {
    padding: 5rem 4% 2rem;
  }
  .back-link {
    padding: 0.75rem 4%;
    font-size: 0.9rem;
  }
  .job-hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .company-logo {
    width: 60px;
    height: 60px;
  }
  .job-title {
    font-size: 1.35rem;
    line-height: 1.3;
  }
  .job-company {
    font-size: 1rem;
  }
  .job-meta {
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .meta-item {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
  .salary-range {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    padding: 1rem;
  }
  .salary-label {
    font-size: 0.85rem;
  }
  .salary-value {
    font-size: 1.1rem;
  }
  .skills-section h3,
  .description-section h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
  .skills-list {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .skill-tag {
    font-size: 0.75rem;
    padding: 0.4rem 0.75rem;
  }
  .description-content {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  .apply-section {
    padding: 1.5rem 0;
  }
  .btn-apply {
    width: 100%;
    text-align: center;
    padding: 1rem;
    font-size: 1rem;
  }
  .apply-note {
    font-size: 0.8rem;
  }
  .ad-banner {
    margin: 1.5rem 0;
    padding: 0 4%;
  }
  .ad-placeholder {
    height: 100px;
    border-radius: 8px;
  }
  .job-footer {
    padding-top: 0.75rem;
  }
  .posted-date {
    font-size: 0.8rem;
  }
}
</style>