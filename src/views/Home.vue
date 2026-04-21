<template>
  <div class="page">
    <HeroSection
      eyebrow="Zentor"
      eyebrow-slash="/"
      headline="Master Tech. Get Hired."
      headline-highlight="Scale Your Future."
      tagline="Your Future Starts Here"
      subheadline="Transition from student to professional with expert career guidance. Access top-tier AI courses, high-growth internships, and direct job placements built for the Gen Z generation."
      cta-text="Explore Careers"
      cta-link="/jobs/"
      cta-aria="Start your career journey with Zentor"
    />

    <CardGrid
      title="Scale Your Career"
      :cards="features"
      accent-color="acid"
    />

    <JobScroller :jobs="latestJobs" />

    <section class="programs-section">
      <h2 class="section-title">Career Ecosystem</h2>
      <p class="section-intro">Everything you need to go from student to professional</p>
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
          <p>Gain real-world experience with live projects and career-defining certificates.</p>
          <span class="program-link">View Internships</span>
        </a>
        <a href="/jobs/" class="program-card">
          <div class="program-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M10 12h4"/><path d="M12 10v4"/><path d="M7 6v-2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"/></svg>
          </div>
          <h3>Jobs</h3>
          <p>Direct placements in top tech companies for freshers and Gen Z talent.</p>
          <span class="program-link">Browse Jobs</span>
        </a>
      </div>
    </section>

    <ProcessSteps
      title="Your Career Path"
      :steps="processSteps"
    />

    <section class="cta-section" aria-labelledby="cta-heading">
      <h2 id="cta-heading" class="sr-only">Ready to Start</h2>
      <div class="cta-content">
        <h3>Ready to Build Your Career?</h3>
        <p>Join thousands of Gen Z professionals who started their journey with Zentor</p>
        <a href="/jobs/" class="btn-cta-secondary">
          Browse Opportunities
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import CardGrid from '@/components/CardGrid.vue'
import ProcessSteps from '@/components/ProcessSteps.vue'
import JobScroller from '@/components/JobScroller.vue'

const API_URL = 'https://zentor-jobs-api.zentor-admin.workers.dev'
const latestJobs = ref([])
const jobsLoading = ref(true)

async function fetchLatestJobs() {
  try {
    const response = await fetch(`${API_URL}/jobs?limit=9&t=${Date.now()}`)
    if (!response.ok) throw new Error('API down')
    const data = await response.json()
    latestJobs.value = data.jobs || []
  } catch (e) {
    console.error('Home: Failed to fetch latest jobs', e)
    latestJobs.value = []
  } finally {
    jobsLoading.value = false
  }
}

const features = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    title: 'Career Guidance',
    text: 'Expert-led guidance to help students navigate their path from the classroom to a professional tech career.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    title: 'Tech Courses',
    text: 'Master in-demand skills with our specialized AI, Fullstack, and Data Analytics courses designed for the industry.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M10 12h4"/><path d="M12 10v4"/><path d="M7 6v-2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"/></svg>',
    title: 'Direct Placements',
    text: 'Skip the line with direct job placements and internship opportunities at high-growth tech companies.'
  }
]

const processSteps = [
  { title: 'Level Up Skills', text: 'Enroll in our specialized tech courses and build real-world projects.' },
  { title: 'Get Guided', text: 'One-on-one career counseling to build your professional profile.' },
  { title: 'Gain Experience', text: 'Secure internships that provide industry exposure and certifications.' },
  { title: 'Land Your Job', text: 'Access exclusive job opportunities and transition into your professional role.' }
]

onMounted(() => {
  fetchLatestJobs()
  document.title = 'Zentor — Career Guidance, Tech Courses & Job Placements for Gen Z'
  
  const metaTags = [
    { name: 'description', content: 'Your journey from student to professional starts here. Get expert career guidance, master AI courses, find high-growth internships, and land direct job placements.' },
    { property: 'og:title', content: 'Zentor — Career Guidance, Tech Courses & Job Placements' },
    { property: 'og:description', content: 'Transition from student to professional with AI courses, internships, and job placements for Gen Z.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Zentor' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Zentor — Career Guidance & Placements' },
    { name: 'twitter:description', content: 'Career guidance, AI courses, and tech jobs for Gen Z professionals.' },
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1100px;
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