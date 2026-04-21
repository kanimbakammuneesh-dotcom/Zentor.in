<template>
  <div class="page">
    <HeroSection
      eyebrow="Internship 2026"
      eyebrow-slash="/"
      headline="Gain Experience."
      headline-highlight="Launch Your Career."
      tagline="Internship Program"
      subheadline="Step into the professional world with our 2-month intensive internship program. Build real-world projects and receive expert career guidance to transition from student to professional."
      cta-text="View Programs"
      cta-link="#internships"
      cta-aria="Explore our internship programs"
    />

    <CardGrid
      title="Why Choose Our Internship"
      :cards="benefits"
      accent-color="acid"
    />

    <section id="internships" class="internship-section">
      <h2 class="section-title">Internship Programs</h2>
      <p class="section-intro">2-month intensive program with real-world projects</p>
      <div class="internship-grid">
        <article v-for="internship in internships" :key="internship.title" class="internship-card">
          <div class="internship-icon" v-html="internship.icon"></div>
          <h3>{{ internship.title }}</h3>
          <p class="internship-desc">{{ internship.description }}</p>
          <div class="internship-duration">{{ internship.duration }}</div>
          <ul class="internship-includes">
            <li v-for="item in internship.includes" :key="item">{{ item }}</li>
          </ul>
          <div class="internship-topics">
            <span v-for="topic in internship.topics" :key="topic" class="topic-tag">{{ topic }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="process-section">
      <h2 class="section-title">How It Works</h2>
      <div class="process-grid">
        <div v-for="(step, index) in process" :key="step.title" class="process-item">
          <div class="process-number">{{ index + 1 }}</div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import CardGrid from '@/components/CardGrid.vue'

const benefits = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    title: 'Job Guarantee',
    text: 'Mock interviews and certification to help you land your dream job.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    title: 'Real Projects',
    text: 'Build production-ready projects for your portfolio.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    title: 'Certification',
    text: 'Get certified upon completion and hackathon.'
  }
]

const internships = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    title: 'Fullstack Development',
    description: 'Master end-to-end web development. Build real applications from scratch.',
    duration: '2 Months',
    includes: ['Live Tasks', 'Mock Interview', 'Project Building', 'Hackathon at End', 'Certification'],
    topics: ['React', 'Node.js', 'MongoDB', 'REST API', 'Deployment', 'Git']
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    title: 'AI Agent Building',
    description: 'Build autonomous AI agents. Learn LLM integration and agent frameworks.',
    duration: '2 Months',
    includes: ['Live Tasks', 'Mock Interview', 'Project Building', 'Hackathon at End', 'Certification'],
    topics: ['LLM API', 'Agent Framework', 'Tool Use', 'Memory', 'Vector DB', 'RAG']
  }
]

const process = [
  { title: 'Apply', text: 'Submit your application through the form.' },
  { title: 'Screening', text: 'Complete a brief technical assessment.' },
  { title: 'Start Internship', text: 'Begin with live tasks and projects.' },
  { title: 'Hackathon', text: 'Build your final project and get certified.' }
]

onMounted(() => {
  document.title = 'Internship Program | Zentor - Fullstack & AI Agent'
  
  const metaTags = [
    { name: 'description', content: '2-month intensive internship program in Fullstack and AI Agent Building. Gain real-world experience and expert career guidance to launch your professional career.' },
    { property: 'og:title', content: 'Zentor — Professional Internship Program' },
    { property: 'og:description', content: 'Gain real-world tech experience. 2-month internships with expert career guidance and certification for Gen Z.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/internship/' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Zentor — Internship Program' },
    { name: 'twitter:description', content: 'Fullstack and AI Agent internships with professional career guidance and certification.' },
    { name: 'twitter:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
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

.internship-section {
  padding: 4rem 1rem 6rem;
  background: var(--glass-bg);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}

.internship-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.internship-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2.5rem;
  transition: all 0.3s;
}

.internship-card:hover {
  border-color: var(--acid);
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(212, 255, 0, 0.1);
}

.internship-icon {
  display: flex;
  justify-content: center;
  color: var(--acid);
  margin-bottom: 1.25rem;
}

.internship-card h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.internship-desc {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.internship-duration {
  font-family: 'Unbounded', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--cyan);
  margin-bottom: 1.25rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 240, 255, 0.1);
  border-radius: 100px;
  display: inline-block;
}

.internship-includes {
  list-style: none;
  margin-bottom: 1.25rem;
}

.internship-includes li {
  font-size: 0.875rem;
  color: var(--text);
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--glass-border);
}

.internship-includes li:last-child {
  border-bottom: none;
}

.internship-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  font-size: 0.7rem;
  color: var(--text);
  background: rgba(212, 255, 0, 0.1);
  padding: 0.3rem 0.65rem;
  border-radius: 100px;
}

.process-section {
  padding: 4rem 1rem 6rem;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.process-item {
  text-align: center;
  padding: 1.5rem 1rem;
}

.process-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--magenta), var(--acid));
  color: var(--bg);
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.process-item h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.process-item p {
  font-size: 0.85rem;
  color: var(--muted);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .internship-grid {
    grid-template-columns: 1fr;
  }

  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .internship-card, .process-item {
    transition: none;
  }
}
</style>