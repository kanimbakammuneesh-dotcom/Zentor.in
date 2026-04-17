<template>
  <div class="page">
    <HeroSection
      eyebrow="Admissions 2026"
      eyebrow-slash="/"
      headline="Your Future"
      headline-highlight="Starts Here"
      tagline="Find Your Dream College"
      subheadline="Take the first step toward your dream career. Get personalized college matching, direct admission guidance, and expert counseling to top institutions in Chennai & Bengaluru. Join thousands of successful students who trusted Zentor with their future."
    />

    <CardGrid
      title="Why Choose Zentor for Admissions"
      :cards="features"
      accent-color="acid"
    />

    <section class="benefits-section">
      <h2 class="section-title">What You'll Get</h2>
      <div class="benefits-grid">
        <article v-for="benefit in benefits" :key="benefit.title" class="benefit-card">
          <div class="benefit-icon" v-html="benefit.icon"></div>
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.text }}</p>
        </article>
      </div>
    </section>

    <FormContainer
      title="Apply Now — Secure Your Future"
      intro="Fill out the form below and our team will contact you within 24 hours to guide you through the admission process."
      src="https://zentor.fillout.com/admission_interest"
      aria-label="Admission application form"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import CardGrid from '@/components/CardGrid.vue'
import FormContainer from '@/components/FormContainer.vue'

const features = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    title: 'Smart Matching',
    text: 'We analyze your academic score, preferences, and career goals to recommend colleges that perfectly match your profile.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    title: 'Direct Admissions',
    text: 'Skip the stressful entrance exams. Get direct admission pathways to top colleges in Chennai and Bengaluru.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    title: 'Expert Counseling',
    text: 'One-on-one sessions with experienced education counselors who guide you through every step.'
  }
]

const benefits = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    title: 'Personalized College List',
    text: 'Colleges tailored to your score, preferences, and career aspirations.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',
    title: 'Application Assistance',
    text: 'Step-by-step guidance through the entire application process.'
  },
  {
    icon: '<svg width="40" leaf="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    title: 'Scholarship Guidance',
    text: 'Information on available scholarships and financial aid options.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="21" x2="17" y2="21"/><line x1="20" y1="24" x2="14" y2="18"/></svg>',
    title: 'Direct College Connect',
    text: 'Direct communication with college admission teams.'
  }
]

onMounted(() => {
  document.title = 'Apply for Direct Admissions 2026 | Zentor - Top Colleges Chennai Bengaluru'
  
  const metaTags = [
    { name: 'description', content: 'Apply for direct admissions to top colleges in Chennai & Bengaluru. Personalized college matching, expert counseling, scholarship guidance. For 12th pass students seeking engineering, medical, arts, and commerce courses.' },
    { property: 'og:title', content: 'Apply for Direct Admissions 2026 | Zentor - Top Colleges Chennai Bengaluru' },
    { property: 'og:description', content: 'Your future starts here. Apply for direct admissions to top colleges in Chennai & Bengaluru with personalized matching and expert counseling.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/admissions/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Zentor' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Apply for Direct Admissions 2026 | Zentor' },
    { name: 'twitter:description', content: 'Direct admissions to top colleges in Chennai & Bengaluru.' },
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
.section-title {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: var(--text);
  text-align: center;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.benefits-section {
  padding: 4rem 1rem 6rem;
  background: var(--glass-bg);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.benefit-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;
}

.benefit-card:hover {
  border-color: var(--cyan);
  transform: translateY(-4px);
}

.benefit-icon {
  display: flex;
  justify-content: center;
  color: var(--cyan);
  margin-bottom: 1rem;
}

.benefit-card h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.benefit-card p {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .benefit-card {
    transition: none;
  }
}
</style>