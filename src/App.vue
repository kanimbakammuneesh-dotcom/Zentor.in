<template>
  <div class="app-wrapper">
    <canvas id="bg-canvas"></canvas>
    <div class="noise-bg"></div>
    <div class="radial-glow"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <NavBar />

    <main class="page" id="main-content">
      <router-view />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/Footer.vue'

onMounted(() => {
  const schemaScript = document.createElement('script')
  schemaScript.type = 'application/ld+json'
  schemaScript.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://zentor.in/#organization',
        name: 'Zentor',
        url: 'https://zentor.in',
        logo: {
          '@type': 'ImageObject',
          url: 'https://zentor.in/logos/zentor_for_darkbg.png',
          width: 400,
          height: 150
        },
        description: 'AI-powered education platform for Gen Z students in India. Find your dream college in Chennai & Bengaluru with personalized matching, direct admissions, and expert counseling.',
        foundingDate: '2025',
        areaServed: {
          '@type': 'Place',
          name: 'India'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Admissions',
          availableLanguage: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada']
        },
        sameAs: [
          'https://instagram.com/zentoredu',
          'https://linkedin.com/company/zentor'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://zentor.in/#website',
        url: 'https://zentor.in',
        name: 'Zentor — Mentor for GenZ',
        publisher: { '@id': 'https://zentor.in/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://zentor.in/admissions/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        },
        inLanguage: 'en-IN'
      },
      {
        '@type': 'WebPage',
        '@id': 'https://zentor.in/#webpage',
        url: 'https://zentor.in',
        name: 'Zentor — Mentor for GenZ',
        isPartOf: { '@id': 'https://zentor.in/#website' },
        about: { '@id': 'https://zentor.in/#organization' },
        description: 'AI-powered mentorship for finding the perfect college, getting direct admissions, and building your future in Chennai & Bengaluru.',
        datePublished: '2025-01-01',
        dateModified: new Date().toISOString().split('T')[0]
      },
      {
        '@type': 'Service',
        '@id': 'https://zentor.in/#service',
        name: 'College Admission Services',
        serviceType: 'Educational Consulting',
        provider: { '@id': 'https://zentor.in/#organization' },
        areaServed: ['Chennai', 'Bengaluru', 'India'],
        description: 'Personalized college matching, direct admission support, and expert counseling for intermediate students in India.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Education Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI-Powered College Matching'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Direct Admission Guidance'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Expert Counseling'
              }
            }
          ]
        }
      }
    ]
  })
  document.head.appendChild(schemaScript)

  // Google Analytics 4 - Replace G-MEASUREMENT_ID with your actual GA4 ID
  const gaScript = document.createElement('script')
  gaScript.async = true
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID'
  document.head.appendChild(gaScript)

  window.dataLayer = window.dataLayer || []
  function gtag() { dataLayer.push(arguments) }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', 'G-MEASUREMENT_ID')

  // Facebook Pixel - Replace YOUR_PIXEL_ID with your actual Facebook Pixel ID
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
})

onMounted(() => {
  initParticles()
})

function initParticles() {
  const canvas = document.getElementById('bg-canvas')
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  let width = window.innerWidth
  let height = window.innerHeight
  let particles = []

  canvas.width = width
  canvas.height = height

  class Particle {
    constructor() {
      this.reset()
    }

    reset() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.size = Math.random() * 2 + 1
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.opacity = Math.random() * 0.5 + 0.2
      this.hue = Math.random() > 0.5 ? 280 : 340
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x < 0 || this.x > width) this.speedX *= -1
      if (this.y < 0 || this.y > height) this.speedY *= -1
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`
      ctx.fill()
    }
  }

  function init() {
    particles = []
    const count = Math.min(80, Math.floor((width * height) / 15000))
    for (let i = 0; i < count; i++) {
      particles.push(new Particle())
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)
    particles.forEach(p => {
      p.update()
      p.draw()
    })
    requestAnimationFrame(animate)
  }

  init()
  animate()

  window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
    init()
  })
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>
