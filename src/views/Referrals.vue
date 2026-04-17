<template>
  <div class="page">
    <HeroSection
      eyebrow="Refer & Earn"
      eyebrow-slash="/"
      headline="Refer"
      headline-highlight="Friends"
      tagline="Share the Opportunity"
      subheadline="Help your friends and family discover their dream colleges with Zentor. When they enroll, you both win exclusive rewards, scholarships, and perks. It's your chance to help others succeed while earning amazing benefits."
    />

    <CardGrid
      title="Earn Rewards While Helping Others"
      :cards="rewards"
      accent-color="magenta"
    />

    <ProcessSteps
      title="How Referral Works"
      :steps="steps"
    />

    <FormContainer
      title="Join Our Referral Program"
      intro="Fill out the form below to get your unique referral link and start earning rewards today."
      src="https://zentor.fillout.com/referral_form"
      aria-label="Referral signup form"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import CardGrid from '@/components/CardGrid.vue'
import ProcessSteps from '@/components/ProcessSteps.vue'
import FormContainer from '@/components/FormContainer.vue'

const rewards = [
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="M12 12V3"/><path d="M8 7l4-4 4 4"/></svg>',
    title: 'Cash Rewards',
    text: 'Earn instant cash rewards for every successful referral. The more friends you refer, the more you earn!'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    title: 'Help Friends Succeed',
    text: 'Give your friends a head start in their college journey with expert guidance and admission support.'
  },
  {
    icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    title: 'Exclusive Perks',
    text: 'Top referrers unlock exclusive perks including priority counseling and special merchandise.'
  }
]

const steps = [
  { title: 'Share Your Link', text: 'Get your unique referral link from the form below and share it with friends and family.' },
  { title: 'Friend Applies', text: 'Your friend fills out the admission form using your referral link.' },
  { title: 'They Enroll', text: 'Once your friend successfully enrolls, both of you qualify for rewards.' },
  { title: 'Earn Rewards', text: 'Receive your referral reward directly in your account. Keep referring to earn more!' }
]

onMounted(() => {
  document.title = 'Refer Friends & Earn Rewards | Zentor Referral Program'
  
  const metaTags = [
    { name: 'description', content: 'Refer friends and earn exclusive rewards with Zentor\'s referral program. Help others find their dream college in Chennai & Bengaluru while earning cash rewards and scholarships.' },
    { property: 'og:title', content: 'Refer Friends & Earn Rewards | Zentor' },
    { property: 'og:description', content: 'Share Zentor with friends and earn rewards. Help others find their dream college while unlocking exclusive perks.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/referrals/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Zentor' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Refer Friends & Earn Rewards | Zentor' },
    { name: 'twitter:description', content: 'Share Zentor with friends and earn rewards on college admissions.' },
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