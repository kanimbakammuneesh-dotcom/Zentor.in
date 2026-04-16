<template>
  <div class="page">
    <HeroSection
      eyebrow="Zentor"
      eyebrow-slash="/"
      headline="Zentor"
      headline-highlight="for GenZ"
      tagline="Your Future Starts Here"
      subheadline="India's most trusted AI-powered college admission platform. Get personalized college matches, direct admissions to top institutions in Chennai & Bengaluru, and expert counseling—everything you need to unlock your potential and build a successful career."
      cta-text="Apply Now"
      cta-link="https://zentor.in/admissions/"
      cta-aria="Start your college admission journey with Zentor"
    />

    <CardGrid
      title="Why Choose Zentor"
      :cards="features"
      accent-color="acid"
    />

    <StatsSection :stats="stats" />

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
import StatsSection from '@/components/StatsSection.vue'
import ProcessSteps from '@/components/ProcessSteps.vue'

const features = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    title: 'AI-Powered Matching',
    text: 'Our advanced AI analyzes your academic score, preferences, and career goals to recommend the perfect colleges tailored just for you.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    title: 'Direct Admissions',
    text: 'Skip the entrance exam stress. Get guaranteed direct admission guidance to India\'s top colleges in Chennai and Bengaluru.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    title: 'Expert Counselors',
    text: 'One-on-one sessions with experienced education experts who understand your aspirations and guide you to the right path.'
  }
]

const stats = [
  { number: '500+', label: 'Colleges Partnered' },
  { number: '10,000+', label: 'Students Placed' },
  { number: '95%', label: 'Success Rate' }
]

const processSteps = [
  { title: 'Share Your Details', text: 'Fill out a simple form with your academic scores, preferences, and career interests.' },
  { title: 'Get AI Recommendations', text: 'Our smart algorithm matches you with colleges that fit your profile perfectly.' },
  { title: 'Expert Counseling', text: 'Connect with our counselors to choose the best option and navigate the admission process.' },
  { title: 'Secure Your Seat', text: 'Complete your admission with our step-by-step guidance and start your journey.' }
]

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

@media (prefers-reduced-motion: reduce) {
  .btn-cta-secondary { transition: none; }
}
</style>