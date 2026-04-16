<template>
  <div class="page">
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">
          <span class="eyebrow-slash">/</span>Zentor
        </span>
        <h1 class="headline">
          <span class="hl-zen">Zentor</span>
          <br>
          <span class="hl-gen">for GenZ</span>
        </h1>
        <p class="tagline">Your Future Starts Here</p>
        <p class="sub-headline">
          India's most trusted AI-powered college admission platform. Get personalized college matches, 
          direct admissions to top institutions in Chennai & Bengaluru, and expert counseling—everything 
          you need to unlock your potential and build a successful career.
        </p>
        <div class="cta-wrap">
          <a href="https://zentor.in/admissions/" class="btn-cta" aria-label="Start your college admission journey with Zentor" target="_self">
            Apply Now
            <span class="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>

    <section class="features" aria-labelledby="features-heading">
      <h2 id="features-heading" class="sr-only">Why Choose Zentor</h2>
      <div class="motivational-grid">
        <article class="motif-card">
          <div class="motif-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <h3 class="motif-title">AI-Powered Matching</h3>
          <p class="motif-text">Our advanced AI analyzes your academic score, preferences, and career goals to recommend the perfect colleges tailored just for you.</p>
        </article>
        <article class="motif-card">
          <div class="motif-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3 class="motif-title">Direct Admissions</h3>
          <p class="motif-text">Skip the entrance exam stress. Get guaranteed direct admission guidance to India's top colleges in Chennai and Bengaluru.</p>
        </article>
        <article class="motif-card">
          <div class="motif-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3 class="motif-title">Expert Counselors</h3>
          <p class="motif-text">One-on-one sessions with experienced education experts who understand your aspirations and guide you to the right path.</p>
        </article>
      </div>
    </section>

    <section class="stats" aria-labelledby="stats-heading">
      <h2 id="stats-heading" class="sr-only">Zentor Success Metrics</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-number">500+</span>
          <span class="stat-label">Colleges Partnered</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">10,000+</span>
          <span class="stat-label">Students Placed</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">95%</span>
          <span class="stat-label">Success Rate</span>
        </div>
      </div>
    </section>

    <section class="process" aria-labelledby="process-heading">
      <h2 id="process-heading" class="section-title">How It Works</h2>
      <div class="process-grid">
        <article class="process-card">
          <div class="process-step">1</div>
          <h3 class="process-title">Share Your Details</h3>
          <p class="process-text">Fill out a simple form with your academic scores, preferences, and career interests.</p>
        </article>
        <article class="process-card">
          <div class="process-step">2</div>
          <h3 class="process-title">Get AI Recommendations</h3>
          <p class="process-text">Our smart algorithm matches you with colleges that fit your profile perfectly.</p>
        </article>
        <article class="process-card">
          <div class="process-step">3</div>
          <h3 class="process-title">Expert Counseling</h3>
          <p class="process-text">Connect with our counselors to choose the best option and navigate the admission process.</p>
        </article>
        <article class="process-card">
          <div class="process-step">4</div>
          <h3 class="process-title">Secure Your Seat</h3>
          <p class="process-text">Complete your admission with our step-by-step guidance and start your journey.</p>
        </article>
      </div>
    </section>

    <section class="cta-section" aria-labelledby="cta-heading">
      <h2 id="cta-heading" class="sr-only">Ready to Start</h2>
      <div class="cta-content">
        <h3>Ready to Find Your Dream College?</h3>
        <p>Join thousands of students who found their perfect college with Zentor</p>
        <a href="https://zentor.in/admissions/" class="btn-cta-secondary" aria-label="Start your admission journey now">
          Get Started Free
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Zentor - AI-Powered College Admission Platform | Direct Admissions in Chennai & Bengaluru'
  
  const metaTags = [
    { name: 'description', content: 'Zentor is India\'s leading AI-powered college admission platform. Get personalized college matching, direct admissions to top colleges in Chennai & Bengaluru, and expert counseling. For 12th pass students seeking higher education.' },
    { property: 'og:title', content: 'Zentor - AI College Admission Platform | Direct Admissions Chennai Bengaluru' },
    { property: 'og:description', content: 'Find your dream college with AI-powered matching. Direct admissions, expert counseling, and personalized guidance for 12th pass students in India.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Zentor' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Zentor - AI College Admission Platform | Direct Admissions Chennai Bengaluru' },
    { name: 'twitter:description', content: 'AI-powered college admission platform for Gen Z. Direct admissions, expert counseling, personalized matching.' },
    { name: 'twitter:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { name: 'twitter:site', content: '@zentoredu' },
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 10rem;
  padding-bottom: 6rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  text-align: center;
}

.eyebrow {
  font-family: 'DM Sans', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--glass-border);
  padding: 0.6rem 1.25rem;
  border-radius: 100px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  margin-bottom: 2.5rem;
}

.eyebrow-slash {
  color: var(--magenta);
  font-weight: 700;
}

.headline {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.hl-zen { color: var(--text); }
.hl-gen { color: var(--acid); }

.tagline {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: var(--cyan);
  margin-bottom: 2rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.sub-headline {
  font-size: clamp(1.125rem, 1.5vw, 1.25rem);
  color: var(--muted);
  max-width: 700px;
  line-height: 1.7;
  font-weight: 400;
  margin-bottom: 3rem;
}

.cta-wrap {
  margin-bottom: 4rem;
}

.btn-cta {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--bg);
  padding: 1.25rem 3rem;
  border-radius: 8px;
  background: var(--acid);
  text-decoration: none;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-cta:hover {
  background: var(--cyan);
  box-shadow: 0 0 40px rgba(0, 240, 255, 0.4);
  transform: translateY(-2px);
}

.btn-arrow { transition: transform 0.3s; }
.btn-cta:hover .btn-arrow { transform: translateX(6px); }

.features {
  padding: 4rem 1rem 6rem;
  width: 100%;
}

.motivational-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.motif-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  backdrop-filter: blur(20px);
  text-align: center;
  transition: all 0.3s;
}

.motif-card:hover {
  border-color: var(--acid);
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(212, 255, 0, 0.15);
}

.motif-icon {
  color: var(--acid);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.motif-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.motif-text {
  font-size: 1rem;
  color: var(--muted);
  line-height: 1.6;
}

.stats {
  padding: 4rem 1rem;
  background: var(--glass-bg);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-number {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--acid);
}

.stat-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.process {
  padding: 6rem 1rem;
}

.section-title {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: var(--text);
  text-align: center;
  margin-bottom: 4rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.process-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  text-align: center;
  transition: all 0.3s;
}

.process-card:hover {
  border-color: var(--cyan);
  transform: translateY(-4px);
}

.process-step {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--acid);
  color: var(--bg);
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}

.process-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.process-text {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.5;
}

.cta-section {
  padding: 6rem 1rem;
  background: linear-gradient(135deg, rgba(75, 0, 255, 0.2) 0%, rgba(212, 255, 0, 0.1) 100%);
  border-top: 1px solid var(--glass-border);
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.cta-content h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
}

.cta-content p {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  color: var(--muted);
  margin-bottom: 2rem;
}

.btn-cta-secondary {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
  padding: 1.25rem 3rem;
  border-radius: 8px;
  background: transparent;
  border: 2px solid var(--acid);
  text-decoration: none;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-cta-secondary:hover {
  background: var(--acid);
  color: var(--bg);
}

@media (max-width: 1024px) {
  .motivational-grid { grid-template-columns: repeat(2, 1fr); }
  .process-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .motivational-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr; gap: 2rem; }
  .process-grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .motif-card, .btn-cta, .process-card, .btn-cta-secondary { transition: none; }
}
</style>
