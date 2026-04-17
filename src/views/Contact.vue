<template>
  <div class="page">
    <HeroSection
      eyebrow="Zentor"
      eyebrow-slash="/"
      headline="Get in"
      headline-highlight="Touch"
      tagline="We're Here to Help"
      subheadline="Have questions about admissions, colleges, or our services? We'd love to hear from you. Reach out through any of the channels below and our team will get back to you within 24 hours."
      cta-text="Apply Now"
      cta-link="https://zentor.in/admissions/"
    />

    <section class="contact-section" aria-labelledby="contact-heading">
      <h2 id="contact-heading" class="sr-only">Contact Information</h2>
      
      <div class="contact-cards">
        <div class="contact-card">
          <div class="icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h3>Email Us</h3>
          <p>For general inquiries and support</p>
          <a href="mailto:contact.email@zentor.in" class="contact-link">contact.email@zentor.in</a>
        </div>

        <div class="contact-card">
          <div class="icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <h3>Instagram</h3>
          <p>Follow us for updates and tips</p>
          <a href="https://instagram.com/zentor.edtech" target="_blank" rel="noopener noreferrer" class="contact-link">@zentor.edtech</a>
        </div>

        <div class="contact-card">
          <div class="icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <h3>Apply Now</h3>
          <p>Start your admission journey</p>
          <a href="https://zentor.in/admissions/" class="contact-link">Visit Admissions</a>
        </div>
      </div>

      <div class="hours-card">
        <h3>Support Hours</h3>
        <p>Monday - Saturday: 9:00 AM - 7:00 PM IST</p>
        <p class="note">We typically respond within 24 hours</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'

onMounted(() => {
  document.title = 'Contact Us | Zentor'
  
  const metaTags = [
    { name: 'description', content: 'Contact Zentor for tech course inquiries. Reach us via email at contact.email@zentor.in or follow us on Instagram @zentor.edtech. We respond within 24 hours.' },
    { property: 'og:title', content: 'Contact Us | Zentor' },
    { property: 'og:description', content: 'Get in touch with Zentor for tech course support. Email or follow us on Instagram.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/contact/' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Contact Us | Zentor' },
    { name: 'twitter:description', content: 'Get in touch with Zentor for tech course support.' },
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

.contact-section {
  padding: 4rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.contact-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: transform 0.3s, border-color 0.3s;
}

.contact-card:hover {
  transform: translateY(-4px);
  border-color: var(--acid);
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--acid) 0%, var(--magenta) 100%);
  margin-bottom: 1.5rem;
}

.icon-wrapper svg {
  color: var(--bg);
}

.contact-card h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.contact-card p {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--muted);
  margin-bottom: 1.25rem;
}

.contact-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--acid);
  text-decoration: none;
  transition: opacity 0.3s;
}

.contact-link:hover {
  opacity: 0.8;
}

.hours-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.hours-card h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
}

.hours-card p {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: var(--muted);
  margin-bottom: 0.5rem;
}

.hours-card .note {
  font-size: 0.875rem;
  color: var(--magenta);
}

@media (prefers-reduced-motion: reduce) {
  .contact-card { transition: none; }
}

@media (max-width: 768px) {
  .contact-cards {
    grid-template-columns: 1fr;
  }
}
</style>