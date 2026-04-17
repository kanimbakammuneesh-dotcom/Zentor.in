<template>
  <div class="page">
    <HeroSection
      eyebrow="Zentor"
      eyebrow-slash="/"
      headline="Zentor"
      headline-highlight="for GenZ"
      tagline="Your Future Starts Here"
      subheadline="India's most trusted education platform. Get personalized college matches, direct admissions to top institutions in Chennai & Bengaluru, and expert counseling—everything you need to unlock your potential and build a successful career."
      cta-text="Apply Now"
      cta-link="https://zentor.in/admissions/"
      cta-aria="Start your college admission journey with Zentor"
    />

    <CardGrid
      title="Why Choose Zentor"
      :cards="features"
      accent-color="acid"
    />

    <section class="programs-section">
      <h2 class="section-title">Our Programs</h2>
      <p class="section-intro">Choose your path to a successful career</p>
      <div class="programs-grid">
        <a href="/courses/" class="program-card">
          <div class="program-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <h3>Courses</h3>
          <p>AI Agent, Gen AI, Data Analytics, Fullstack & Python. Get job-ready with expert-led training.</p>
          <span class="program-link">Explore Courses</span>
        </a>
        <a href="/internship/" class="program-card">
          <div class="program-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          </div>
          <h3>Internship</h3>
          <p>2-month intensive program with live projects, mock interviews & certification.</p>
          <span class="program-link">View Internships</span>
        </a>
      </div>
    </section>

    <ProcessSteps
      title="How It Works"
      :steps="processSteps"
    />

    <section class="cta-section" aria-labelledby="cta-heading">
      <h2 id="cta-heading" class="sr-only">Ready to Start</h2>
      <div class="cta-content">
        <h3>Ready to Find Your Dream College?</h3>
        <p>Join thousands of students who found their perfect college with Zentor</p>
        <a href="https://zentor.in/admissions/" class="btn-cta-secondary">
          Get Started Free
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import CardGrid from '@/components/CardGrid.vue'
import ProcessSteps from '@/components/ProcessSteps.vue'

const features = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    title: 'Smart Matching',
    text: 'We analyze your academic score, preferences, and career goals to recommend colleges that perfectly match your profile.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    title: 'Direct Admissions',
    text: 'Skip the entrance exam stress. Get direct admission guidance to top colleges in Chennai and Bengaluru.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    title: 'Expert Counselors',
    text: 'One-on-one sessions with experienced education experts who guide you to the right path.'
  }
]

const processSteps = [
  { title: 'Share Your Details', text: 'Fill out a simple form with your academic scores, preferences, and career interests.' },
  { title: 'Get Recommendations', text: 'We match you with colleges that fit your profile perfectly.' },
  { title: 'Expert Counseling', text: 'Connect with our counselors to choose the best option.' },
  { title: 'Secure Your Seat', text: 'Complete your admission with our step-by-step guidance.' }
]

onMounted(() => {
  document.title = 'Zentor - College Admission Platform | Direct Admissions in Chennai & Bengaluru'
  
  const metaTags = [
    { name: 'description', content: 'Zentor is India\'s leading college admission platform. Get personalized college matching, direct admissions to top colleges in Chennai & Bengaluru, and expert counseling.' },
    { property: 'og:title', content: 'Zentor - College Admission Platform | Direct Admissions Chennai Bengaluru' },
    { property: 'og:description', content: 'Find your dream college with personalized matching. Direct admissions and expert counseling for 12th pass students in India.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Zentor' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Zentor - College Admission Platform' },
    { name: 'twitter:description', content: 'College admission platform for Gen Z. Direct admissions and expert counseling.' },
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

.section-title {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: var(--text);
  text-align: center;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-intro {
  text-align: center;
  font-size: 1.125rem;
  color: var(--muted);
  margin-bottom: 3rem;
}

.programs-section {
  padding: 4rem 1rem 6rem;
  background: var(--glass-bg);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.program-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 2rem;
  background: var(--glass-bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.program-card:hover {
  border-color: var(--cyan);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 240, 255, 0.1);
}

.program-icon {
  color: var(--cyan);
  margin-bottom: 1.25rem;
}

.program-card h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.program-card p {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.program-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--cyan);
}

.cta-section {
  padding: 6rem 1rem;
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

@media (max-width: 640px) {
  .programs-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .program-card, .btn-cta-secondary {
    transition: none;
  }
}
</style>