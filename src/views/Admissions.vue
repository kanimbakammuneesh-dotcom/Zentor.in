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

    <BenefitGrid
      title="What You'll Get"
      :cards="benefits"
    />

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
import BenefitGrid from '@/components/BenefitGrid.vue'
import FormContainer from '@/components/FormContainer.vue'

const features = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    title: 'AI-Powered Matching',
    text: 'Our intelligent algorithm analyzes your academic score, preferences, and career goals to recommend colleges that perfectly match your profile.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    title: 'Direct Admissions',
    text: 'Skip the stressful entrance exams. Get direct admission pathways to India\'s top colleges in Chennai and Bengaluru through our established partnerships.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    title: 'Expert Counseling',
    text: 'One-on-one sessions with experienced education counselors who guide you through every step of the admission process, from application to enrollment.'
  }
]

const benefits = [
  { icon: '🎯', title: 'Personalized College List', text: 'AI-generated list of colleges tailored to your score, preferences, and career aspirations.' },
  { icon: '📋', title: 'Application Assistance', text: 'Step-by-step guidance through the entire application process with our experts.' },
  { icon: '🎓', title: 'Scholarship Guidance', text: 'Information on available scholarships and financial aid options to support your education.' },
  { icon: '🤝', title: 'Direct College Connect', text: 'Direct communication with college admission teams through our network.' }
]

onMounted(() => {
  document.title = 'Apply for Direct Admissions 2026 | Zentor - Top Colleges Chennai Bengaluru'
  
  const metaTags = [
    { name: 'description', content: 'Apply for direct admissions to top colleges in Chennai & Bengaluru. AI-powered college matching, expert counseling, scholarship guidance, and personalized admission support. For 12th pass students seeking engineering, medical, arts, and commerce courses.' },
    { property: 'og:title', content: 'Apply for Direct Admissions 2026 | Zentor - Top Colleges Chennai Bengaluru' },
    { property: 'og:description', content: 'Your future starts here. Apply for direct admissions to top colleges in Chennai & Bengaluru with AI-powered matching, expert counseling, and guaranteed admission support.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/admissions/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Zentor' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Apply for Direct Admissions 2026 | Zentor - Top Colleges Chennai Bengaluru' },
    { name: 'twitter:description', content: 'Direct admissions to top colleges in Chennai & Bengaluru. AI-powered matching and expert counseling.' },
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