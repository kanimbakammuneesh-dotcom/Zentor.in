<template>
  <div class="page">
    <HeroSection
      eyebrow="Courses 2026"
      eyebrow-slash="/"
      headline="Get Job Ready"
      headline-highlight="Today"
      tagline="Placement Preparation"
      subheadline="Master in-demand tech skills with expert-led courses. All courses include free resume preparation, mock interviews, and industry-recognized certification. Join students who got placed in top companies."
    />

    <CardGrid
      title="Why Choose Zentor"
      :cards="features"
      accent-color="acid"
    />

    <section class="courses-section">
      <h2 class="section-title">Our Courses</h2>
      <p class="section-intro">All courses include free resume prep, mock interviews, and certification</p>
      <div class="courses-grid">
        <article v-for="course in courses" :key="course.title" class="course-card">
          <div class="course-icon" v-html="course.icon"></div>
          <h3>{{ course.title }}</h3>
          <p>{{ course.text }}</p>
          <div class="course-bonus">+ Free Resume Prep + Mock Interview</div>
        </article>
      </div>
    </section>

    <ProcessSteps
      title="How It Works"
      :steps="processSteps"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import CardGrid from '@/components/CardGrid.vue'
import ProcessSteps from '@/components/ProcessSteps.vue'

const features = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    title: 'Job Guarantee',
    text: 'Mock interviews and resume prep included with every course.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    title: 'Expert Mentors',
    text: 'Learn from industry experts with years of real-world experience.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    title: 'Flexible Schedule',
    text: 'Learn at your own pace with weekend and weekday batches available.'
  }
]

const courses = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    title: 'AI Agent Building',
    text: 'Build autonomous AI agents from scratch. Learn LLM integration, tool use, and agent frameworks.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    title: 'Gen AI Basics',
    text: 'Master prompt engineering, fine-tuning LLMs, and building with GPT, Claude, and Gemini APIs.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
    title: 'Data Analytics',
    text: 'Learn Python, SQL, Tableau, and data visualization. Turn raw data into actionable insights.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    title: 'Fullstack Developer',
    text: 'Master React, Node.js, databases, and deployment. Build complete web applications.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3 3 3 3 0 0 0-3 3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3V6a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/><path d="M12 12v6"/><path d="M8 9h8"/></svg>',
    title: 'Python A to Z',
    text: 'Complete Python from basics to advanced. OOP, APIs, automation, and real-world projects.'
  }
]

const processSteps = [
  { title: 'Choose Your Course', text: 'Pick from our industry-relevant tech courses.' },
  { title: 'Learn & Build', text: 'Complete modules with hands-on projects and assignments.' },
  { title: 'Resume Prep', text: 'Get free resume preparation with our experts.' },
  { title: 'Mock Interview', text: 'Practice with mock interviews and get certified.' }
]

onMounted(() => {
  document.title = 'Tech Courses for Placement | Zentor - AI, Fullstack, Data Analytics'
  
  const metaTags = [
    { name: 'description', content: 'Tech courses for placement preparation. AI Agent Building, Gen AI, Data Analytics, Fullstack, Python. Free resume prep, mock interviews, and certification included.' },
    { property: 'og:title', content: 'Zentor - Tech Courses for Placement Preparation' },
    { property: 'og:description', content: 'Get job-ready with AI, Fullstack, and Data Analytics courses. Free resume prep and mock interviews included.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/courses/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Zentor' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Zentor - Tech Courses for Placement' },
    { name: 'twitter:description', content: 'AI, Fullstack, Data Analytics courses with certification and job support.' },
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

.courses-section {
  padding: 4rem 1rem 6rem;
  background: var(--glass-bg);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.course-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;
}

.course-card:hover {
  border-color: var(--acid);
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(212, 255, 0, 0.1);
}

.course-icon {
  display: flex;
  justify-content: center;
  color: var(--acid);
  margin-bottom: 1rem;
}

.course-card h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.course-card p {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.course-bonus {
  font-size: 0.8rem;
  color: var(--cyan);
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  background: rgba(0, 240, 255, 0.1);
  display: inline-block;
}

@media (max-width: 640px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .course-card {
    transition: none;
  }
}
</style>