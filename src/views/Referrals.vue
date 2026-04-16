<template>
  <div class="page">
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">
          <span class="eyebrow-slash">/</span>Refer & Earn
        </span>
        <h1 class="headline">
          <span class="hl-refer">Refer</span>
          <span class="hl-earn">Friends</span>
          <br>Earn Rewards
        </h1>
        <p class="tagline">Share the Opportunity</p>
        <p class="sub-headline">
          Help your friends and family discover their dream colleges with Zentor. 
          When they enroll, you both win exclusive rewards, scholarships, and perks. 
          It's your chance to help others succeed while earning amazing benefits.
        </p>
      </div>
    </section>

    <section class="rewards" aria-labelledby="rewards-heading">
      <h2 id="rewards-heading" class="section-title">Earn Rewards While Helping Others</h2>
      <div class="rewards-grid">
        <article class="reward-card">
          <div class="reward-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="M12 12V3"/><path d="M8 7l4-4 4 4"/></svg>
          </div>
          <h3 class="reward-title">Cash Rewards</h3>
          <p class="reward-text">Earn instant cash rewards for every successful referral. The more friends you refer, the more you earn!</p>
        </article>
        <article class="reward-card">
          <div class="reward-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3 class="reward-title">Help Friends Succeed</h3>
          <p class="reward-text">Give your friends a head start in their college journey with expert guidance and guaranteed admission support.</p>
        </article>
        <article class="reward-card">
          <div class="reward-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <h3 class="reward-title">Exclusive Perks</h3>
          <p class="reward-text">Top referrers unlock exclusive perks including priority counseling, premium webinars, and special merchandise.</p>
        </article>
      </div>
    </section>

    <section class="how-it-works" aria-labelledby="howitworks-heading">
      <h2 id="howitworks-heading" class="section-title">How Referral Works</h2>
      <div class="steps-grid">
        <div class="step-item">
          <div class="step-number">1</div>
          <h3>Share Your Link</h3>
          <p>Get your unique referral link from the form below and share it with friends and family.</p>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <h3>Friend Applies</h3>
          <p>Your friend fills out the admission form using your referral link.</p>
        </div>
        <div class="step-item">
          <div class="step-number">3</div>
          <h3>They Enroll</h3>
          <p>Once your friend successfully enrolls, both of you qualify for rewards.</p>
        </div>
        <div class="step-item">
          <div class="step-number">4</div>
          <h3>Earn Rewards</h3>
          <p>Receive your referral reward directly in your account. Keep referring to earn more!</p>
        </div>
      </div>
    </section>

    <section class="form-section" aria-labelledby="referral-form-heading">
      <h2 id="referral-form-heading" class="section-title">Join Our Referral Program</h2>
      <p class="form-intro">Fill out the form below to get your unique referral link and start earning rewards today.</p>
      <div class="form-container">
        <iframe 
          id="referral-iframe" 
          src="https://zentor.fillout.com/referral_form"
          title="Zentor Referral Form"
          loading="eager"
          aria-label="Referral signup form"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Refer Friends & Earn Rewards | Zentor Referral Program'
  
  const metaTags = [
    { name: 'description', content: 'Refer friends and earn exclusive rewards with Zentor\'s referral program. Help others find their dream college in Chennai & Bengaluru while earning cash rewards, scholarships, and exclusive perks. Join now!' },
    { property: 'og:title', content: 'Refer Friends & Earn Rewards | Zentor Referral Program' },
    { property: 'og:description', content: 'Share Zentor with friends and earn rewards. Help others find their dream college while unlocking exclusive perks, cash rewards, and priority counseling.' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/referrals/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Zentor' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Refer Friends & Earn Rewards | Zentor Referral Program' },
    { name: 'twitter:description', content: 'Share Zentor with friends and earn rewards. Help others find their dream college.' },
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

.hero {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 10rem;
  padding-bottom: 4rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  text-align: center;
}

.eyebrow {
  font-family: 'DM Sans', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--glass-border);
  padding: 0.6rem 1.25rem;
  border-radius: 100px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  margin-bottom: 2.5rem;
}

.eyebrow-slash { color: var(--cyan); font-weight: 700; }

.headline {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.hl-refer { color: var(--acid); }
.hl-earn { color: transparent; -webkit-text-stroke: 2px var(--magenta); }

.tagline {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: var(--cyan);
  margin-bottom: 2.5rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sub-headline {
  font-size: clamp(1.125rem, 1.5vw, 1.25rem);
  color: var(--muted);
  max-width: 650px;
  line-height: 1.7;
  font-weight: 400;
  margin-bottom: 3rem;
}

.rewards {
  padding: 4rem 1rem 6rem;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.reward-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  backdrop-filter: blur(20px);
  text-align: center;
  transition: all 0.3s;
}

.reward-card:hover {
  border-color: var(--magenta);
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(255, 0, 85, 0.15);
}

.reward-icon {
  color: var(--magenta);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.reward-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.reward-text {
  font-size: 1rem;
  color: var(--muted);
  line-height: 1.6;
}

.section-title {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: var(--text);
  text-align: center;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.how-it-works {
  padding: 4rem 1rem 6rem;
  background: var(--glass-bg);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.step-item {
  text-align: center;
  padding: 2rem 1rem;
}

.step-number {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--magenta), var(--acid));
  color: var(--bg);
  font-family: 'Unbounded', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}

.step-item h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.step-item p {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.5;
}

.form-section {
  padding: 6rem 1rem;
  width: 100%;
}

.form-intro {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  color: var(--muted);
  text-align: center;
  max-width: 600px;
  margin: -2rem auto 3rem;
  line-height: 1.6;
}

.form-container {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.form-container iframe {
  width: 100% !important;
  height: 900px !important;
  border: none;
  border-radius: 12px;
}

@media (max-width: 1024px) {
  .rewards-grid { grid-template-columns: repeat(2, 1fr); }
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .rewards-grid { grid-template-columns: 1fr; }
  .steps-grid { grid-template-columns: 1fr; }
  .form-container iframe { height: 750px !important; min-height: 600px; }
}

@media (hover: none) and (pointer: coarse) {
  .reward-card:hover { transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .reward-card { transition: none; }
}
</style>
