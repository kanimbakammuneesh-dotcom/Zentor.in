<template>
  <div class="page">
    <HeroSection
      eyebrow="Zentor"
      eyebrow-slash="/"
      headline="Terms of"
      headline-highlight="Service"
      tagline="Using Our Platform"
      subheadline="By accessing and using Zentor's services, you agree to these terms. Please read them carefully to understand your rights and obligations when using our college admission platform."
      cta-text="Have Questions?"
      cta-link="https://zentor.in/contact/"
    />

    <section class="content-section" aria-labelledby="terms-heading">
      <div class="content-wrapper">
        <h2 id="terms-heading" class="sr-only">Terms of Service</h2>
        
        <div class="terms-card">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using the Zentor website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you should not use our services.</p>
        </div>

        <div class="terms-card">
          <h3>2. Service Description</h3>
          <p>Zentor provides an AI-powered college admission platform that helps students find and apply to colleges in Chennai and Bengaluru. Our services include:</p>
          <ul>
            <li>Personalized college matching based on academic profile</li>
            <li>Direct admission guidance and support</li>
            <li>Expert counseling sessions</li>
            <li>Application process assistance</li>
            <li>College and course information resources</li>
          </ul>
        </div>

        <div class="terms-card">
          <h3>3. User Eligibility</h3>
          <p>Our services are intended for:</p>
          <ul>
            <li>Students who have completed 12th grade (or equivalent)</li>
            <li>Students seeking higher education in India</li>
            <li>Users who are at least 18 years of age</li>
          </ul>
          <p>By using our services, you confirm that you meet these eligibility requirements.</p>
        </div>

        <div class="terms-card">
          <h3>4. User Obligations</h3>
          <p>When using Zentor's services, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Not share your account with others</li>
            <li>Use the services only for lawful purposes</li>
            <li>Not attempt to gain unauthorized access to our systems</li>
            <li>Not copy, distribute, or modify any part of our website</li>
          </ul>
        </div>

        <div class="terms-card">
          <h3>5. Intellectual Property</h3>
          <p>All content on the Zentor website, including but not limited to text, graphics, logos, images, software, and code, is the property of Zentor and is protected by Indian and international copyright laws. You may not reproduce, distribute, or modify any content without our prior written consent.</p>
        </div>

        <div class="terms-card">
          <h3>6. Service Availability</h3>
          <p>We strive to provide uninterrupted services but cannot guarantee:</p>
          <ul>
            <li>Continuous availability of the website</li>
            <li>Error-free operation</li>
            <li>Uninterrupted data transmission</li>
          </ul>
          <p>We reserve the right to modify, suspend, or discontinue any part of our services at any time.</p>
        </div>

        <div class="terms-card">
          <h3>7. Limitation of Liability</h3>
          <p>Zentor shall not be liable for:</p>
          <ul>
            <li>Any indirect, incidental, or consequential damages</li>
            <li>Loss of data or profits arising from use of our services</li>
            <li>Any errors or omissions in college information</li>
            <li>Decisions made based on our recommendations</li>
          </ul>
          <p>Our services are provided "as is" without any warranties.</p>
        </div>

        <div class="terms-card">
          <h3>8. Third-Party Services</h3>
          <p>Our platform may contain links to third-party websites, partner colleges, or services. We are not responsible for the content, accuracy, or practices of these third parties. Your interactions with third parties are governed by their own terms and policies.</p>
        </div>

        <div class="terms-card">
          <h3>9. College Admissions</h3>
          <p>While we provide guidance and support for college admissions:</p>
          <ul>
            <li>We do not guarantee admission to any college</li>
            <li>Admission decisions are made by respective colleges</li>
            <li>We are not responsible for college policies or decisions</li>
            <li>Students must meet individual college eligibility criteria</li>
          </ul>
        </div>

        <div class="terms-card">
          <h3>10. Refund Policy</h3>
          <p>Zentor offers free basic services. For any paid services:</p>
          <ul>
            <li>Refund requests must be made within 7 days of payment</li>
            <li>Refunds are processed at our sole discretion</li>
            <li>Services not rendered due to technical issues may qualify for refund</li>
          </ul>
        </div>

        <div class="terms-card">
          <h3>11. Termination</h3>
          <p>We reserve the right to terminate your access to our services without notice if you:</p>
          <ul>
            <li>Violate any of these terms</li>
            <li>Engage in unlawful activity</li>
            <li>Provide false or misleading information</li>
            <li>Attempt to harm our systems or other users</li>
          </ul>
        </div>

        <div class="terms-card">
          <h3>12. Governing Law</h3>
          <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.</p>
        </div>

        <div class="terms-card">
          <h3>13. Changes to Terms</h3>
          <p>We may update these terms from time to time. Updated terms will be posted on this page with a new "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the new terms.</p>
        </div>

        <div class="terms-card contact-card">
          <h3>Questions?</h3>
          <p>If you have any questions about these Terms of Service, please contact us:</p>
          <div class="contact-info">
            <p><strong>Email:</strong> <a href="mailto:contact.email@zentor.in">contact.email@zentor.in</a></p>
            <p><strong>Website:</strong> <a href="https://zentor.in/contact/">https://zentor.in/contact/</a></p>
          </div>
        </div>

        <p class="last-updated">Last Updated: April 2026</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'

onMounted(() => {
  document.title = 'Terms of Service | Zentor'
  
  const metaTags = [
    { name: 'description', content: 'Zentor Terms of Service - Read our terms and conditions for using our AI-powered college admission platform. Understand your rights and obligations.' },
    { property: 'og:title', content: 'Terms of Service | Zentor' },
    { property: 'og:description', content: 'Zentor Terms of Service - Terms and conditions for using our college admission services.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/terms/' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Terms of Service | Zentor' },
    { name: 'twitter:description', content: 'Zentor Terms of Service - Terms and conditions for using our college admission services.' },
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

.content-section {
  padding: var(--section-gap) 1.5rem;
  background: white;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.terms-card {
  background: white;
  border: 1px solid rgba(0, 24, 25, 0.05);
  border-radius: var(--radius-lg);
  padding: 3rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.terms-card h3 {
  font-family: 'Newsreader', serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.terms-card p {
  font-family: 'Manrope', sans-serif;
  font-size: 1.0625rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.terms-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.terms-card li {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  color: var(--text);
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
  line-height: 1.6;
}

.terms-card li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--secondary);
  font-weight: 800;
}

.contact-card {
  border-color: var(--primary);
  background: var(--bg);
}

.contact-info {
  margin-top: 2rem;
}

.contact-info p {
  margin: 0.75rem 0;
}

.contact-info a {
  color: var(--secondary);
  font-weight: 800;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-info a:hover {
  color: var(--primary);
  text-decoration: underline;
}

.last-updated {
  text-align: center;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 4rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .terms-card { padding: 2rem 1.5rem; }
  .terms-card h3 { font-size: 1.5rem; }
}
</style>