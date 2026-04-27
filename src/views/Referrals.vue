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

    <section class="faq-section">
      <h2 class="faq-title">Frequently Asked Questions</h2>
      
      <div class="faq-item">
        <h3>How do I earn rewards through referrals?</h3>
        <p>Simply share your unique referral link with friends and family. When someone uses your link to apply and successfully enrolls in a college through Zentor, you both qualify for exclusive rewards and benefits.</p>
      </div>

      <div class="faq-item">
        <h3>What rewards can I earn?</h3>
        <p>Referral rewards include cash bonuses, exclusive scholarships for your referrals, priority counseling sessions, and special merchandise for top referrers. The more people you refer, the higher your rewards!</p>
      </div>

      <div class="faq-item">
        <h3>Is there a limit on how many friends I can refer?</h3>
        <p>No limit at all! You can refer as many friends and family members as you like. There's no cap on earning potential - every successful referral counts toward your rewards.</p>
      </div>

      <div class="faq-item">
        <h3>When do I receive my referral rewards?</h3>
        <p>Rewards are processed once your referral completes their admission process and enrolls in a college. You'll receive your reward within 30 days of their enrollment confirmation.</p>
      </div>

      <div class="faq-item">
        <h3>Who can I refer?</h3>
        <p>You can refer anyone who is looking for college admission guidance in India, particularly those interested in institutions in Chennai and Bengaluru. This includes recent 12th graduates, transfer students, and parents looking for guidance for their children.</p>
      </div>

      <div class="faq-item">
        <h3>How do I track my referrals?</h3>
        <p>After you sign up for the referral program, you'll receive a unique dashboard where you can track your referral links, see who has used them, and monitor your reward status.</p>
      </div>

      <div class="faq-item">
        <h3>What if my friend doesn't get admitted?</h3>
        <p>Rewards are only given for successful enrollments. However, we encourage you to refer anyone interested in higher education - our team provides free guidance to all applicants regardless of admission outcome.</p>
      </div>
    </section>
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

<style scoped>
.faq-section {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--section-gap) 1.5rem;
}

.faq-title {
  font-family: 'Newsreader', serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--primary);
  text-align: center;
  margin-bottom: 3rem;
}

.faq-item {
  background: white;
  border: 1px solid rgba(0, 24, 25, 0.05);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.faq-item:hover {
  border-color: var(--secondary);
}

.faq-item h3 {
  font-family: 'Newsreader', serif;
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
}

.faq-item p {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0;
}

@media (max-width: 768px) {
  .faq-item { padding: 2rem 1.5rem; }
}
</style>