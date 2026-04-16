<template>
  <div class="page">
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">
          <span class="eyebrow-slash">/</span>Refer & Earn
        </span>
        <h1 class="headline">
          <span class="hl-refer">Refer</span>
          <span class="hl-earn">Earn</span>
          <br>Together
        </h1>
        <p class="tagline">Share the Opportunity</p>
        <p class="sub-headline">
          Know someone looking for college admissions? Share Zentor with your friends
          and family. When they enroll, you both win rewards!
        </p>
      </div>
    </section>

    <section class="rewards" aria-labelledby="rewards-heading">
      <h2 id="rewards-heading" class="sr-only">Referral Rewards</h2>
      <div class="rewards-grid">
        <article class="reward-card">
          <div class="reward-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="M12 12V3"/><path d="M8 7l4-4 4 4"/></svg>
          </div>
          <h3 class="reward-title">Bonus Rewards</h3>
          <p class="reward-text">Earn exclusive rewards for every successful referral. The more you share, the more you earn!</p>
        </article>
        <article class="reward-card">
          <div class="reward-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3 class="reward-title">Help Friends</h3>
          <p class="reward-text">Give your friends a head start in their college journey with expert guidance and support.</p>
        </article>
        <article class="reward-card">
          <div class="reward-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <h3 class="reward-title">Unlock Perks</h3>
          <p class="reward-text">Top referrers get access to exclusive webinars, priority counseling, and special merchandise.</p>
        </article>
      </div>
    </section>

    <section class="form-section" aria-labelledby="referral-form-heading">
      <h2 id="referral-form-heading" class="sr-only">Referral Form</h2>
      <div class="form-container">
        <iframe 
          id="referral-iframe" 
          src="https://zentor.fillout.com/referral_form"
          style="width:100%;height:900px;border:none;border-radius:8px;background:#fff;"
          title="Zentor Referral Form"
          allow="clipboard-read; clipboard-write"
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
  document.title = 'Refer & Earn — Share Zentor and Earn Rewards'
  
  const metaTags = [
    { name: 'description', content: 'Share Zentor with friends and earn rewards. Help others find their dream college and unlock exclusive perks, webinars, and priority counseling.' },
    { property: 'og:title', content: 'Refer & Earn — Zentor' },
    { property: 'og:description', content: 'Know someone looking for college admissions? Share Zentor with your friends and family. When they enroll, you both win rewards!' },
    { property: 'og:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { property: 'og:url', content: 'https://zentor.in/referrals/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Zentor' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Refer & Earn — Zentor' },
    { name: 'twitter:description', content: 'Share Zentor with friends and earn rewards. Help others find their dream college.' },
    { name: 'twitter:image', content: 'https://zentor.in/logos/zentor_for_darkbg.png' },
    { name: 'twitter:site', content: '@zentoredu' },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
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

.rewards { padding-bottom: 4rem; }

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
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

@media (max-width: 1024px) {
  .rewards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .rewards-grid {
    grid-template-columns: 1fr;
  }
}

.form-section {
  padding: 2rem 1rem 6rem;
  width: 100%;
}

.form-container {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 1.5rem;
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
  border-radius: 8px;
}

@media (min-width: 768px) {
  .form-container iframe { height: 950px !important; }
}

@media (min-width: 1024px) {
  .form-container { padding: 2rem; max-width: 1100px; }
  .form-container iframe { height: 1000px !important; }
}

@media (min-width: 1440px) {
  .form-container { max-width: 1200px; }
  .form-container iframe { height: 1100px !important; }
}

@media (max-width: 480px) {
  .form-section { padding: 1rem 0.75rem 4rem; }
  .form-container { padding: 1rem; border-radius: 12px; }
  .form-container iframe { height: 750px !important; min-height: 600px; }
}

@media (hover: none) and (pointer: coarse) {
  .reward-card:hover { transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .reward-card { transition: none; }
}
</style>
