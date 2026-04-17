<template>
  <div class="app-wrapper">
    <div class="noise-bg"></div>
    <div class="glow glow-1"></div>
    <div class="glow glow-2"></div>
    <div class="grid-pattern"></div>

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
        description: 'Tech education platform for Gen Z. Job-ready courses in AI, Fullstack, Data Analytics with placement support.',
        foundingDate: '2025',
        areaServed: {
          '@type': 'Place',
          name: 'India'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Course Enquiries',
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
        name: 'Zentor — Tech Courses',
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
        name: 'Zentor — Tech Courses',
        isPartOf: { '@id': 'https://zentor.in/#website' },
        about: { '@id': 'https://zentor.in/#organization' },
        description: 'Tech courses for placement preparation. AI Agent Building, Gen AI, Data Analytics, Fullstack, Python with resume prep and mock interviews.',
        datePublished: '2025-01-01',
        dateModified: new Date().toISOString().split('T')[0]
      },
      {
        '@type': 'Service',
        '@id': 'https://zentor.in/#service',
        name: 'Tech Education Services',
        serviceType: 'Educational Consulting',
        provider: { '@id': 'https://zentor.in/#organization' },
        areaServed: ['India'],
        description: 'Tech courses with placement support, resume prep, mock interviews, and certification.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Courses',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI Agent Building'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Gen AI Basics'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Data Analytics'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Fullstack Developer'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Python A to Z'
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
</script>

<style scoped>
.app-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>