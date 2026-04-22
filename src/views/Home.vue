<template>
  <div class="page">
    <HeroSection
      eyebrow="Zentor"
      eyebrow-slash="/"
      headline="Master <span class='highlight-amber'>Tech.</span>"
      headline-highlight="Scale Your <span class='highlight-coral'>Future.</span>"
      tagline="Your Future <span class='highlight-teal'>Starts Here</span>"
      subheadline="Transition from student to professional with expert career guidance. Access top-tier AI courses, high-growth internships, and land <span class='highlight-amber'>career opportunities</span> built for the Gen Z generation."
      cta-text="Explore Careers"
      cta-link="/jobs/"
      cta-aria="Start your career journey with Zentor"
    />

    <CardGrid
      title="Scale Your <span class='highlight-teal'>Career</span>"
      :cards="features"
      accent-color="primary"
    />

    <JobScroller :jobs="latestJobs" />

    <section class="programs-section">
      <div class="container">
        <h2 class="section-title">Career <span class="highlight-amber">Ecosystem</span></h2>
        <p class="section-intro">Everything you need to go from student to professional</p>
        <div class="programs-grid">
          <router-link to="/courses/" class="program-card">
            <div class="program-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            </div>
            <h3>Courses</h3>
            <p>AI Agent, Gen AI, Data Analytics, Fullstack & Python. Get job-ready with expert-led training.</p>
            <span class="program-link">Explore Courses →</span>
          </router-link>
          <router-link to="/internship/" class="program-card">
            <div class="program-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            </div>
            <h3>Internship</h3>
            <p>Gain real-world experience with live projects and career-defining certificates.</p>
            <span class="program-link">View Internships →</span>
          </router-link>
          <router-link to="/jobs/" class="program-card">
            <div class="program-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M10 12h4"/><path d="M12 10v4"/><path d="M7 6v-2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"/></svg>
            </div>
            <h3>Jobs</h3>
            <p>Access career opportunities in top tech companies tailored for freshers and Gen Z talent.</p>
            <span class="program-link">Browse Jobs →</span>
          </router-link>
        </div>
      </div>
    </section>

    <ProcessSteps
      title="Your Career Path"
      :steps="processSteps"
    />

    <section class="cta-section" aria-labelledby="cta-heading">
      <div class="container">
        <div class="cta-content">
          <h2 id="cta-heading">Ready to Build Your <span class="highlight-coral">Career?</span></h2>
          <p>Join thousands of Gen Z professionals who started their journey with Zentor</p>
          <router-link to="/jobs/" class="btn btn-amber btn-lg">
            Browse Opportunities
          </router-link>
        </div>
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
    title: 'Career Opportunities',
    text: 'Gain an edge with internship and job opportunities at high-growth tech companies.'
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
  document.title = 'Zentor — Career Guidance, Tech Courses & Job Opportunities for Gen Z'
  
  const metaTags = [
    { name: 'description', content: 'Your journey from student to professional starts here. Get expert career guidance, master AI courses, find high-growth internships, and discover job opportunities.' },
    { property: 'og:title', content: 'Zentor — Career Guidance, Tech Courses & Job Opportunities' },
    { property: 'og:description', content: 'Transition from student to professional with AI courses, internships, and job opportunities for Gen Z.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_lightbg.png' },
    { property: 'og:url', content: 'https://zentor.in' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Zentor' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Zentor — Career Guidance & Placements' },
    { name: 'twitter:description', content: 'Career guidance, AI courses, and tech jobs for Gen Z professionals.' },
    { name: 'twitter:image', content: 'https://zentor.in/logos/zentor_for_lightbg.png' },
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
  font-family: 'Newsreader', serif;
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  color: var(--primary);
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.section-intro {
  text-align: center;
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem;
  color: var(--text-muted);
  margin-bottom: 4rem;
}

.programs-section {
  padding: var(--section-gap) 0;
  background: var(--bg-subtle);
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

.program-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(26, 20, 8, 0.04);
}

.program-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(26, 20, 8, 0.08);
  border-color: var(--secondary);
}

.program-icon {
  color: var(--secondary);
  background: var(--bg);
  padding: 1.25rem;
  border-radius: var(--radius-md);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.program-card:hover .program-icon {
  background: var(--secondary);
  color: white;
  transform: scale(1.1);
}

.program-card h3 {
  font-family: 'Newsreader', serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.program-card p {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.program-link {
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cta-section {
  padding: var(--section-gap) 0;
  background: linear-gradient(160deg, #FBF5E8 0%, #F5ECd6 40%, #FBF8F2 100%);
  color: var(--text);
  border-top: 1px solid var(--border);
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background: var(--surface);
  padding: 4rem 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: 0 16px 48px rgba(26, 20, 8, 0.08);
}

.cta-content h2 {
  font-family: 'Newsreader', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.cta-content p {
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  color: var(--text-muted);
  margin-bottom: 3rem;
}

.btn-lg {
  padding: 1.25rem 3.5rem;
  font-size: 1.125rem;
}

@media (max-width: 1024px) {
  .programs-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
}

@media (max-width: 640px) {
  .programs-grid { grid-template-columns: 1fr; }
  .program-card { padding: 2.5rem 1.5rem; }
}
</style>