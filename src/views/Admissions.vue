<template>
  <section class="hero">
    <div class="hero-content">
      <span class="eyebrow">
        <span class="eyebrow-slash">/</span> Admissions 2026
      </span>
      <h1 class="headline">
        <span class="hl-your">Your</span>
        <span class="hl-future">Future</span>
        <br>Starts Here
      </h1>
      <p class="tagline">Find Your Dream College</p>
      <p class="sub-headline">
        Get personalized college matching, direct admission support, and expert counseling for your higher education journey in Chennai & Bengaluru.
      </p>
    </div>
  </section>

  <section class="features" aria-labelledby="admissions-features-heading">
    <h2 id="admissions-features-heading" class="sr-only">What We Offer</h2>
    <div class="motivational-grid">
      <article class="motif-card">
        <div class="motif-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        <h3 class="motif-title">Personalized Matching</h3>
        <p class="motif-text">AI-powered college recommendations based on your score, preferences, and career goals.</p>
      </article>
      <article class="motif-card">
        <div class="motif-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h3 class="motif-title">Direct Admissions</h3>
        <p class="motif-text">Skip the entrance exam stress. Get direct admission guidance to top colleges.</p>
      </article>
      <article class="motif-card">
        <div class="motif-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <h3 class="motif-title">Expert Counseling</h3>
        <p class="motif-text">One-on-one sessions with education experts who understand your aspirations.</p>
      </article>
    </div>
  </section>

  <section class="form-section" id="apply-form" aria-labelledby="form-heading">
    <h2 id="form-heading" class="sr-only">Apply for Admissions</h2>
    <div class="form-container">
      <div 
        data-fillout-id="674b9de46e91d0478aa199" 
        data-fillout-embed-type="standard" 
        data-fillout-iframe-height="900px"
        role="region"
        aria-label="Admission application form"
      ></div>
      <script src="https://server.fillout.com/embed/v1/"></script>
    </div>
  </section>
</template>

<script setup>
import { useSeoMeta } from '@unhead/vue'

useSeoMeta({
  title: 'Admissions 2026 — Apply Now | Zentor',
  titleTemplate: '%s',
  ogTitle: 'Apply for Admissions 2026 — Zentor',
  description: 'Apply for direct admissions to top colleges in Chennai & Bengaluru. AI-powered college matching, expert counseling, and personalized guidance for your higher education journey.',
  ogDescription: 'Your future starts here. Apply for admissions to top colleges in Chennai & Bengaluru with personalized guidance and direct admission support.',
  ogImage: 'https://zentor.in/logos/zentor_for_darkbg.png',
  ogUrl: 'https://zentor.in/admissions/',
  ogType: 'website',
  ogSiteName: 'Zentor',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Apply for Admissions 2026 — Zentor',
  twitterDescription: 'Direct admissions to top colleges in Chennai & Bengaluru. AI-powered matching and expert counseling.',
  twitterImage: 'https://zentor.in/logos/zentor_for_darkbg.png',
  twitterSite: '@zentoredu',
  canonical: 'https://zentor.in/admissions/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  'article:published_time': '2025-01-01',
  'article:modified_time': new Date().toISOString(),
  'article:author': 'https://zentor.in/#organization',
  'article:section': 'Admissions',
  'article:tag': ['admissions', 'college', 'India', 'Chennai', 'Bengaluru', 'higher education', 'direct admission'],
  'og:special_languages': 'en-IN, ta-IN, te-IN, kn-IN',
  'geo.region': 'IN-TN',
  'geo.placename': 'Chennai, Bengaluru'
})
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 10rem;
  padding-bottom: 4rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
}

.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--glass-border);
  padding: 0.5rem 1rem;
  border-radius: 100px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  margin-bottom: 2rem;
}

.eyebrow-slash {
  color: var(--magenta);
  font-weight: 800;
}

.headline {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.hl-your {
  color: var(--text);
}

.hl-future {
  color: transparent;
  -webkit-text-stroke: 2px var(--acid);
}

.tagline {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--cyan);
  margin-bottom: 2rem;
  font-weight: 700;
  text-transform: uppercase;
}

.sub-headline {
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  color: var(--muted);
  max-width: 600px;
  line-height: 1.6;
  font-weight: 500;
}

.features {
  padding-bottom: 4rem;
}

.motivational-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
}

.motif-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 6px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  text-align: left;
  transition: all 0.3s;
}

.motif-card:hover {
  border-color: var(--acid);
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(212, 255, 0, 0.1);
}

.motif-icon {
  color: var(--acid);
  margin-bottom: 1rem;
}

.motif-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.motif-text {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.5;
}

.form-section {
  padding: 2rem 1rem 6rem;
  width: 100%;
}

.form-container {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.form-container :deep(div:first-child) {
  width: 100% !important;
  height: 900px !important;
  min-height: 700px;
}

.form-container :deep(iframe) {
  border-radius: 8px;
  width: 100%;
  display: block;
  max-width: 100%;
}

@media (min-width: 768px) {
  .form-container :deep(div:first-child) {
    height: 950px !important;
  }
}

@media (min-width: 1024px) {
  .form-container {
    padding: 2rem;
    max-width: 1100px;
  }

  .form-container :deep(div:first-child) {
    height: 1000px !important;
  }
}

@media (min-width: 1440px) {
  .form-container {
    max-width: 1200px;
  }

  .form-container :deep(div:first-child) {
    height: 1100px !important;
  }
}

@media (max-width: 480px) {
  .form-section {
    padding: 1rem 0.75rem 4rem;
  }

  .form-container {
    padding: 1rem;
    border-radius: 12px;
  }

  .form-container :deep(div:first-child) {
    height: 750px !important;
    min-height: 600px;
  }
}

@media (hover: none) and (pointer: coarse) {
  .motif-card:hover {
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .motif-card {
    transition: none;
  }
}
</style>
