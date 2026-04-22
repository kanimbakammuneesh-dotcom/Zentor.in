<template>
  <div class="app-wrapper">
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
          url: 'https://zentor.in/logos/zentor_for_lightbg.png',
          width: 400,
          height: 150
        },
        description: 'Tech education platform for Gen Z. Job-ready courses in AI, Fullstack, Data Analytics with career support.',
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
        description: 'Tech courses for career preparation. AI Agent Building, Gen AI, Data Analytics, Fullstack, Python with resume prep and mock interviews.',
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
        description: 'Tech courses with career support, resume prep, mock interviews, and certification.',
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
})
</script>

<style scoped>
.app-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>