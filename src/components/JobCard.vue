<script setup>
defineProps({
  job: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

function getLogoColor(company) {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  const index = company ? company.charCodeAt(0) % colors.length : 0
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
</script>

<template>
  <article class="job-card" @click="$emit('click', job.id)">
    <div class="job-card-header">
      <div class="company-logo">
        <img v-if="job.company_logo_url" :src="job.company_logo_url" :alt="job.company" class="logo-img" />
        <div v-else class="logo-fallback" :style="{ backgroundColor: getLogoColor(job.company) }">
          {{ job.company ? job.company.charAt(0).toUpperCase() : 'J' }}
        </div>
      </div>
      
      <div class="job-title-area">
        <h3 class="job-title">{{ job.title }}</h3>
        <p class="job-company">{{ job.company }}</p>
      </div>
    </div>

    <div class="job-card-body">
      <div class="job-meta-grid">
        <div class="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{{ job.location }}</span>
        </div>
        <div class="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          <span>{{ job.experience_years }}+ yrs Exp</span>
        </div>
        <div v-if="job.is_remote" class="meta-item remote">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Remote</span>
        </div>
      </div>
    </div>

    <div class="job-card-footer">
      <div class="job-salary" v-if="job.salary_min || job.salary_max">
        <span class="salary-range">
          {{ job.salary_currency || '₹' }}{{ formatSalary(job.salary_min) }} - {{ formatSalary(job.salary_max) }}
        </span>
      </div>
      <div class="job-date">{{ formatDate(job.created_at) }}</div>
    </div>
  </article>
</template>

<style scoped>
.job-card {
  background: white;
  border: 1px solid rgba(0, 24, 25, 0.05);
  border-radius: var(--radius-lg);
  padding: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.job-card:hover {
  transform: translateY(-6px);
  border-color: var(--secondary);
  box-shadow: 0 20px 40px rgba(0, 24, 25, 0.08);
}

.job-card-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.company-logo {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  background: var(--bg);
  border: 1px solid rgba(0, 24, 25, 0.05);
  border-radius: var(--radius-md);
  padding: 12px;
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
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.job-title-area {
  flex: 1;
  min-width: 0;
}

.job-title {
  font-family: 'Newsreader', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0 0 0.25rem;
  line-height: 1.2;
}

.job-company {
  font-family: 'Manrope', sans-serif;
  color: var(--secondary);
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.02em;
}

.job-card-body {
  flex: 1;
}

.job-meta-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  color: var(--text-muted);
  font-weight: 600;
}

.meta-item svg {
  color: var(--primary);
  opacity: 0.7;
}

.meta-item.remote {
  color: var(--primary);
}

.job-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 24, 25, 0.05);
}

.job-salary {
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--primary);
}

.job-date {
  font-family: 'Manrope', sans-serif;
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .job-card { padding: 1.5rem; }
  .company-logo { width: 56px; height: 56px; padding: 10px; }
  .job-title { font-size: 1.25rem; }
  .job-company { font-size: 0.9375rem; }
  .meta-item { font-size: 0.8125rem; }
  .job-salary { font-size: 1rem; }
}
</style>
