<template>
  <div class="page">
    <HeroSection
      eyebrow="Zentor"
      eyebrow-slash="/"
      headline="Privacy"
      headline-highlight="Policy"
      tagline="Your Data, Your Privacy"
      subheadline="We are committed to protecting your personal information and ensuring transparency in how we collect, use, and safeguard your data in compliance with India's Digital Personal Data Protection Act, 2023 (DPDPA)."
      cta-text="Contact Us"
      cta-link="https://zentor.in/contact/"
    />

    <section class="content-section" aria-labelledby="info-heading">
      <div class="content-wrapper">
        <h2 id="info-heading" class="sr-only">Privacy Information</h2>
        
        <div class="policy-card">
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li><strong>Personal Details:</strong> Name, email address, phone number, date of birth</li>
            <li><strong>Academic Information:</strong> 12th grade marks, preferred courses, college preferences</li>
            <li><strong>Communication Data:</strong> Messages you send us, call records when you contact our support</li>
          </ul>
        </div>

        <div class="policy-card">
          <h3>2. How We Use Your Information</h3>
          <p>Your information helps us provide and improve our services:</p>
          <ul>
            <li>Match you with suitable colleges based on your academic profile</li>
            <li>Provide personalized counseling and admission guidance</li>
            <li>Communicate with you about your application status</li>
            <li>Send you relevant updates about colleges and courses</li>
            <li>Improve our website and user experience</li>
          </ul>
        </div>

        <div class="policy-card">
          <h3>3. Data Sharing & Disclosure</h3>
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Partner Colleges:</strong> For admission processing and communication</li>
            <li><strong>Service Providers:</strong> Trusted partners who help deliver our services</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
          <p class="note">We never sell your personal data to third parties.</p>
        </div>

        <div class="policy-card">
          <h3>4. Data Security</h3>
          <p>We implement appropriate technical and organizational measures to protect your data:</p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Secure servers with regular security audits</li>
            <li>Access controls limiting employee access to personal data</li>
            <li>Regular security testing and vulnerability assessments</li>
          </ul>
        </div>

        <div class="policy-card">
          <h3>5. Your Rights Under DPDPA</h3>
          <p>As per India's Digital Personal Data Protection Act, 2023, you have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data ("Right to be Forgotten")</li>
            <li><strong>Withdrawal:</strong> Withdraw consent for data processing at any time</li>
            <li><strong>Grievance:</strong> File a complaint with the Data Protection Board of India</li>
          </ul>
        </div>

        <div class="policy-card">
          <h3>6. Cookies & Tracking</h3>
          <p>We use cookies to enhance your experience:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>
          <p>You can manage cookie preferences through your browser settings.</p>
        </div>

        <div class="policy-card">
          <h3>7. Data Retention</h3>
          <p>We retain your personal data only as long as necessary:</p>
          <ul>
            <li>Account data: While your account is active + 2 years after</li>
            <li>Application data: For 5 years after admission process completion</li>
            <li>Marketing data: Until you withdraw consent</li>
          </ul>
        </div>

        <div class="policy-card">
          <h3>8. Third-Party Links</h3>
          <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>
        </div>

        <div class="policy-card">
          <h3>9. Children's Privacy</h3>
          <p>Our services are designed for students aged 18 and above. We do not knowingly collect personal information from minors. If you believe we have collected data from a minor, please contact us immediately.</p>
        </div>

        <div class="policy-card">
          <h3>10. Changes to This Policy</h3>
          <p>We may update this privacy policy periodically. We will notify you of any material changes by posting the new policy on this page with an updated "Last Updated" date. Your continued use of our services constitutes acceptance of these changes.</p>
        </div>

        <div class="policy-card contact-card">
          <h3>Contact Us</h3>
          <p>If you have questions about this Privacy Policy or want to exercise your data rights, please contact us:</p>
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
  document.title = 'Privacy Policy | Zentor'
  
  const metaTags = [
    { name: 'description', content: 'Zentor Privacy Policy - Learn how we collect, use, and protect your personal data in compliance with DPDPA 2023. Your privacy matters to us.' },
    { property: 'og:title', content: 'Privacy Policy | Zentor' },
    { property: 'og:description', content: 'Zentor Privacy Policy - Your data privacy and protection information.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/privacy/' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Privacy Policy | Zentor' },
    { name: 'twitter:description', content: 'Zentor Privacy Policy - Your data privacy and protection information.' },
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
  padding: 4rem 1rem;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.policy-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.policy-card h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--acid);
  margin-bottom: 1rem;
}

.policy-card p {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.policy-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.policy-card li {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--text);
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
}

.policy-card li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--acid);
}

.policy-card li strong {
  color: var(--text);
  font-weight: 600;
}

.note {
  color: var(--magenta) !important;
  font-size: 0.9rem;
  margin-top: 0.5rem !important;
}

.contact-card {
  border-color: var(--acid);
  background: linear-gradient(135deg, rgba(212, 255, 0, 0.05) 0%, rgba(75, 0, 255, 0.05) 100%);
}

.contact-info {
  margin-top: 1rem;
}

.contact-info p {
  margin: 0.5rem 0;
}

.contact-info a {
  color: var(--acid);
  text-decoration: none;
  transition: opacity 0.3s;
}

.contact-info a:hover {
  opacity: 0.8;
}

.last-updated {
  text-align: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  color: var(--muted);
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .policy-card {
    padding: 1.5rem;
  }
  
  .policy-card h3 {
    font-size: 1.1rem;
  }
}
</style>