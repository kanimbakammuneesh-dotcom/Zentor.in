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
  padding: 5rem 0 4rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(0, 240, 255, 0.03) 0%,
    transparent 60%
  );
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}

/* ─── Header ──────────────────────────────────────── */
.scroller-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 2rem;
}

.scroller-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pulse-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--acid);
  box-shadow: 0 0 0 0 rgba(212, 255, 0, 0.6);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 rgba(212, 255, 0, 0.6); }
  70%  { box-shadow: 0 0 0 8px rgba(212, 255, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(212, 255, 0, 0); }
}

.label-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--acid);
}

.scroller-heading {
  text-align: center;
  flex: 1;
}

.scroller-title {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.25rem;
  line-height: 1.1;
}

.title-highlight {
  color: var(--cyan);
}

.scroller-sub {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--muted);
  margin: 0;
}

/* ─── Visit Jobs CTA button ───────────────────────── */
.btn-visit-jobs {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--bg);
  background: var(--acid);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  white-space: nowrap;
  transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
}

.btn-visit-jobs:hover {
  background: var(--cyan);
  box-shadow: 0 0 24px rgba(0, 240, 255, 0.35);
  transform: translateY(-2px);
}

.btn-visit-jobs:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 3px;
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.btn-visit-jobs:hover .arrow-icon {
  transform: translateX(4px);
}

/* ─── Viewport with fade masks ─────────────────────── */
.scroller-viewport {
  position: relative;
  overflow: hidden;
  /* Fade edges via mask */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

/* ─── Scrolling track ─────────────────────────────── */
.scroller-track {
  display: flex;
  gap: 1.25rem;
  width: max-content;
  animation: marquee var(--anim-duration, 32s) linear infinite;
  padding: 1rem 0;
}

/* Pause on hover (accessibility + UX) */
.scroller-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.333%); }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .scroller-track {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    justify-content: center;
  }
  .scroller-viewport {
    mask-image: none;
    -webkit-mask-image: none;
    overflow: visible;
  }
  .pulse-dot {
    animation: none;
  }
}

/* ─── Individual scroll card ─────────────────────── */
.scroll-card {
  flex-shrink: 0;
  width: 320px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  position: relative;
  overflow: hidden;
}

/* Subtle shimmer accent */
.scroll-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(212,255,0,0.04) 0%, transparent 60%);
  pointer-events: none;
}

.scroll-card:hover,
.scroll-card:focus-visible {
  border-color: var(--acid);
  box-shadow: 0 8px 32px rgba(212, 255, 0, 0.12);
  transform: translateY(-4px);
  outline: none;
}

.scroll-card:focus-visible {
  outline: 2px solid var(--acid);
  outline-offset: 2px;
}

/* Logo */
.sc-logo {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--bg);
  border: 1px solid var(--glass-border);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sc-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
}

.sc-logo-fallback {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 800;
  color: white;
}

/* Info block */
.sc-info {
  flex: 1;
}

.sc-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 0.3rem;
  line-height: 1.3;
  /* Prevent overflow for long titles */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sc-company {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--acid);
  margin: 0;
}

/* Tags */
.sc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.sc-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 100px;
  letter-spacing: 0.01em;
}

.sc-tag--location {
  background: rgba(255, 255, 255, 0.06);
  color: var(--muted);
  border: 1px solid var(--glass-border);
}

.sc-tag--remote {
  background: rgba(0, 240, 255, 0.1);
  color: var(--cyan);
  border: 1px solid rgba(0, 240, 255, 0.2);
}

.sc-tag--salary {
  background: rgba(212, 255, 0, 0.08);
  color: var(--acid);
  border: 1px solid rgba(212, 255, 0, 0.15);
  font-family: 'JetBrains Mono', monospace;
}

/* Footer */
.sc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--glass-border);
}

.sc-date {
  font-size: 0.75rem;
  color: var(--muted);
}

.sc-apply {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--cyan);
  letter-spacing: 0.05em;
  transition: letter-spacing 0.2s ease;
}

.scroll-card:hover .sc-apply {
  letter-spacing: 0.12em;
}

/* ─── Mobile: reduce card width for better feel ───── */
@media (max-width: 640px) {
  .scroller-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 1.25rem;
  }

  .scroller-heading {
    text-align: left;
  }

  .scroll-card {
    width: 270px;
    padding: 1.25rem;
  }
}
</style>
