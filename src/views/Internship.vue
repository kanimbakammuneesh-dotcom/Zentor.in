<template>
  <div class="page">
    <HeroSection
      eyebrow="Internship 2026"
      eyebrow-slash="/"
      headline="Modern <span class='highlight-amber'>Internships.</span>"
      headline-highlight="Real <span class='highlight-coral'>Experience.</span>"
      tagline="Career <span class='highlight-teal'>Launchpad</span>"
      subheadline="Gain hands-on experience with high-impact internships in AI and Fullstack development. Build real products, work with expert mentors, and accelerate your <span class='highlight-amber'>career journey.</span>"
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
    title: 'Career Support',
    text: 'Mock interviews and certification to help you land your dream job.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    text: 'Post-internship career guidance including resume reviews and mock interviews.'
  }
]

const internshipPrograms = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    title: 'Fullstack Development',
    text: 'Master React, Node.js, and databases while building scalable web applications.',
    duration: '2 Months'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>',
    title: 'AI & Data Science',
    text: 'Build LLM applications and data models using Python and modern AI frameworks.',
    duration: '2 Months'
  }
]

const processSteps = [
  { title: 'Apply Now', text: 'Submit your application and portfolio for review.' },
  { title: 'Interview', text: 'A quick technical and culture fit conversation.' },
  { title: 'Build & Learn', text: 'Work on high-impact projects with your mentor.' },
  { title: 'Certification', text: 'Receive your internship certificate and career guidance.' }
]

onMounted(() => {
  document.title = 'Internship Programs | Zentor - AI & Fullstack Experience'
  
  const metaTags = [
    { name: 'description', content: 'Gain real-world experience with high-impact internships in AI and Fullstack development. Expert career guidance and certificates provided.' },
    { property: 'og:title', content: 'Internship Programs | Zentor' },
    { property: 'og:description', content: 'Build real products and learn from experts. High-impact tech internships for Gen Z.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/internship/' },
    { name: 'twitter:card', content: 'summary_large_image' },
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
.programs-section {
  padding: var(--section-gap) 1.5rem;
  background: var(--bg-subtle);
}

.section-title {
  font-family: 'Newsreader', serif;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
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
  margin-bottom: 5rem;
  font-weight: 500;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  max-width: var(--container-max);
  margin: 0 auto;
}

.program-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 3.5rem 2.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(26, 20, 8, 0.04);
}

.program-card:hover {
  border-color: var(--secondary);
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(26, 20, 8, 0.08);
}

.program-icon {
  display: flex;
  justify-content: center;
  color: var(--secondary);
  margin-bottom: 2rem;
}

.program-card h3 {
  font-family: 'Newsreader', serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
}

.program-card p {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.program-duration {
  font-family: 'Manrope', sans-serif;
  font-size: 0.8125rem;
  color: var(--secondary);
  font-weight: 800;
  padding: 0.6rem 1.5rem;
  border-radius: 100px;
  background: var(--bg);
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.internship-includes li {
  font-family: 'Manrope', sans-serif;
  font-size: 0.9375rem;
  color: var(--text);
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 24, 25, 0.05);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.internship-includes li::before {
  content: "✓";
  color: var(--secondary);
  font-weight: bold;
}

.internship-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.topic-tag {
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary);
  background: var(--bg);
  padding: 0.4rem 0.75rem;
  border-radius: 100px;
  border: 1px solid rgba(0, 24, 25, 0.05);
}

.process-section {
  padding: var(--section-gap) 1.5rem;
  background: var(--bg);
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: var(--container-max);
  margin: 0 auto;
}

.process-item {
  text-align: center;
  padding: 1rem;
}

.process-number {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  font-family: 'Newsreader', serif;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.process-item h3 {
  font-family: 'Newsreader', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.75rem;
}

.process-item p {
  font-family: 'Manrope', sans-serif;
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .internship-grid { grid-template-columns: 1fr; }
  .process-grid { grid-template-columns: repeat(2, 1fr); gap: 3rem 1.5rem; }
}

@media (max-width: 480px) {
  .process-grid { grid-template-columns: 1fr; }
}
</style>