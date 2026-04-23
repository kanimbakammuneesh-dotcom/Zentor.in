<script setup>
import { computed } from 'vue'

const props = defineProps({
  jobs: {
    type: Array,
    default: () => []
  }
})

// Duplicate jobs to create seamless infinite loop
const scrollJobs = computed(() => {
  if (props.jobs.length === 0) return []
  // Triplicate for ultra-smooth looping even with very few cards
  return [...props.jobs, ...props.jobs, ...props.jobs]
})

function getLogoColor(company) {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  const index = company ? company.charCodeAt(0) % colors.length : 0
  return colors[index]
}

function formatSalary(amount) {
  if (!amount) return ''
  return amount >= 100000
    ? `${(amount / 100000).toFixed(1)}L`
    : amount.toLocaleString('en-IN')
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const days = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

function openJob(id) {
  window.open(`/jobs/${id}`, '_blank', 'noopener')
}

// Compute animation duration based on count — more cards = slower scroll
const animDuration = computed(() => {
  const base = props.jobs.length * 8
  return `${Math.max(24, base)}s`
})
</script>

<template>
  <section class="job-scroller-section" aria-label="Live job openings scroller">
    <!-- Header row: eyebrow + CTA -->
    <div class="scroller-header">
      <div class="scroller-label">
        <span class="pulse-dot" aria-hidden="true"></span>
        <span class="label-text">Live Opportunities</span>
      </div>

      <div class="scroller-heading">
        <h2 class="scroller-title">Jobs <span class="title-highlight">Portal</span></h2>
        <p class="scroller-sub">Fresh tech roles scrolling in real-time</p>
      </div>

      <router-link to="/jobs/" class="btn-visit-jobs" aria-label="Visit the full Jobs page">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
          <path d="M10 12h4"/><path d="M12 10v4"/>
          <path d="M7 6V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"/>
        </svg>
        Visit Jobs Page
        <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </router-link>
    </div>

    <!-- Scroller viewport with fade masks -->
    <div class="scroller-viewport" role="region" aria-label="Scrolling job cards">
      <div
        class="scroller-track"
        :style="{ '--anim-duration': animDuration }"
      >
        <article
          v-for="(job, index) in scrollJobs"
          :key="`${job.id}-${index}`"
          class="scroll-card"
          tabindex="0"
          :aria-label="`${job.title} at ${job.company}`"
          @click="openJob(job.id)"
          @keydown.enter="openJob(job.id)"
          @keydown.space.prevent="openJob(job.id)"
        >
          <!-- Company logo -->
          <div class="sc-logo">
            <img
              v-if="job.company_logo_url"
              :src="job.company_logo_url"
              :alt="job.company"
              class="sc-logo-img"
              loading="lazy"
            />
            <div
              v-else
              class="sc-logo-fallback"
              :style="{ backgroundColor: getLogoColor(job.company) }"
              aria-hidden="true"
            >
              {{ job.company ? job.company.charAt(0).toUpperCase() : 'J' }}
            </div>
          </div>

          <!-- Job info -->
          <div class="sc-info">
            <p class="sc-title">{{ job.title }}</p>
            <p class="sc-company">{{ job.company }}</p>
          </div>

          <!-- Tags -->
          <div class="sc-tags">
            <span class="sc-tag sc-tag--location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {{ job.location || 'India' }}
            </span>
            <span v-if="job.is_remote" class="sc-tag sc-tag--remote">Remote</span>
            <span v-if="job.salary_min" class="sc-tag sc-tag--salary">
              ₹{{ formatSalary(job.salary_min) }}–{{ formatSalary(job.salary_max) }}
            </span>
          </div>

          <!-- Date + CTA -->
          <div class="sc-footer">
            <span class="sc-date">{{ formatDate(job.created_at) }}</span>
            <span class="sc-apply">Apply →</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── Section wrapper ─────────────────────────────── */
.job-scroller-section {
  padding: var(--section-gap) 0;
  position: relative;
  overflow: hidden;
  background: white;
  border-top: 1px solid rgba(0, 24, 25, 0.05);
  border-bottom: 1px solid rgba(0, 24, 25, 0.05);
}

/* ─── Header ──────────────────────────────────────── */
.scroller-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: var(--container-max);
  margin: 0 auto 4rem;
  padding: 0 1.5rem;
}

.scroller-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.pulse-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--secondary);
  box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4); }
  70%  { box-shadow: 0 0 0 10px rgba(217, 119, 6, 0); }
  100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0); }
}

.label-text {
  font-family: 'Manrope', sans-serif;
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--secondary);
}

.scroller-heading {
  flex: 1;
}

.scroller-title {
  font-family: 'Newsreader', serif;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 600;
  color: var(--primary);
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem;
  line-height: 1.1;
}

.title-highlight {
  color: var(--secondary);
}

.scroller-sub {
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem;
  color: var(--text-muted);
  margin: 0;
  font-weight: 500;
}

/* ─── Visit Jobs CTA button ───────────────────────── */
.btn-visit-jobs {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  font-weight: 800;
  color: white;
  background: var(--primary);
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
  white-space: nowrap;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-visit-jobs:hover {
  background: var(--secondary);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 24, 25, 0.15);
}

.btn-visit-jobs:hover .arrow-icon {
  transform: translateX(4px);
}

/* ─── Viewport with fade masks ─────────────────────── */
.scroller-viewport {
  position: relative;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

/* ─── Scrolling track ─────────────────────────────── */
.scroller-track {
  display: flex;
  gap: 2rem;
  width: max-content;
  animation: marquee var(--anim-duration, 32s) linear infinite;
  padding: 2rem 0;
}

.scroller-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.333%); }
}

/* ─── Individual scroll card ─────────────────────── */
.scroll-card {
  flex-shrink: 0;
  width: 340px;
  background: white;
  border: 1px solid rgba(0, 24, 25, 0.05);
  border-radius: var(--radius-lg);
  padding: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.scroll-card:hover {
  border-color: var(--secondary);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 24, 25, 0.08);
}

.sc-logo {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  background: var(--bg);
  border: 1px solid rgba(0, 24, 25, 0.05);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sc-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sc-logo-fallback {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
}

.sc-title {
  font-family: 'Newsreader', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0 0 0.25rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sc-company {
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--secondary);
  margin: 0;
}

.sc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sc-tag {
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: 100px;
}

.sc-tag--location {
  background: var(--bg);
  color: var(--primary);
  border: 1px solid rgba(0, 24, 25, 0.05);
}

.sc-tag--remote {
  background: #E0F2F1;
  color: #00695C;
}

.sc-tag--salary {
  background: var(--tertiary);
  color: var(--primary);
}

.sc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 24, 25, 0.05);
}

.sc-date {
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
}

.sc-apply {
  font-family: 'Manrope', sans-serif;
  font-size: 0.8125rem;
  font-weight: 800;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}

.scroll-card:hover .sc-apply {
  color: var(--secondary);
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .scroller-header { flex-direction: column; align-items: center; text-align: center; }
  .scroll-card { width: 280px; padding: 1.5rem; }
}
</style>
