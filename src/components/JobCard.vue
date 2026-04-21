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
</script>

<template>
  <article class="job-card" @click="$emit('click', job.id)">
    <div class="job-card-main">
      <div class="company-logo">
        <img v-if="job.company_logo_url" :src="job.company_logo_url" :alt="job.company" class="logo-img" />
        <div v-else class="logo-fallback" :style="{ backgroundColor: getLogoColor(job.company) }">
          {{ job.company.charAt(0).toUpperCase() }}
        </div>
      </div>
      
      <div class="job-info-main">
        <h3 class="job-title">{{ job.title }}</h3>
        <p class="job-company">{{ job.company }}</p>
        
        <div class="job-details-row">
          <span class="detail-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {{ job.location }}
          </span>
          <span class="detail-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            {{ job.experience_years }} yrs
          </span>
          <span v-if="job.is_remote" class="detail-item remote">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
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
</template>

<style scoped>
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
  height: 100%;
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

@media (max-width: 768px) {
  .job-card {
    gap: 1rem;
    padding: 1.25rem;
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
    padding-top: 0.75rem;
  }
  .job-salary {
    font-size: 0.95rem;
  }
}
</style>
