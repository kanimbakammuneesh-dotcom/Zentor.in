<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  eyebrowSlash: { type: String, default: '' },
  headline: { type: String, default: '' },
  headlineHighlight: { type: String, default: '' },
  tagline: { type: String, default: '' },
  subheadline: { type: String, default: '' },
  ctaText: { type: String, default: '' },
  ctaLink: { type: String, default: '' },
  ctaAria: { type: String, default: '' }
})
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <span v-if="eyebrow" class="eyebrow">
        <span class="eyebrow-slash">{{ eyebrowSlash }}</span>{{ eyebrow }}
      </span>
      <h1 class="headline">
        <span v-if="headline" class="hl-main" v-html="headline"></span>
        <br v-if="headlineHighlight" />
        <span v-if="headlineHighlight" class="hl-highlight" v-html="headlineHighlight"></span>
      </h1>
      <p v-if="tagline" class="tagline" v-html="tagline"></p>
      <p v-if="subheadline" class="sub-headline" v-html="subheadline"></p>
      <div v-if="ctaText" class="cta-wrap">
        <a :href="ctaLink" class="btn-cta" :aria-label="ctaAria">
          {{ ctaText }}
          <span class="btn-arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 80px 24px 120px;
  background: radial-gradient(circle at top right, rgba(200, 129, 26, 0.08) 0%, transparent 65%),
              radial-gradient(circle at bottom left, rgba(192, 72, 40, 0.05) 0%, transparent 65%);
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  text-align: center;
}

.eyebrow {
  font-family: 'Manrope', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--secondary);
  border: 1px solid rgba(0, 24, 25, 0.05);
  padding: 0.6rem 1.25rem;
  border-radius: 100px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  margin-bottom: 2.5rem;
}

.eyebrow-slash {
  color: var(--primary);
  font-weight: 800;
}

.headline {
  font-family: 'Newsreader', serif;
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--primary);
  margin-bottom: 2.5rem;
}

.hl-highlight { 
  font-style: italic;
  font-weight: 500;
  color: var(--text);
}

.tagline {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.sub-headline {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.125rem, 1.5vw, 1.375rem);
  color: var(--text-muted);
  max-width: 800px;
  line-height: 1.6;
  font-weight: 400;
  margin-bottom: 3.5rem;
}

.btn-cta {
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  padding: 1.25rem 3.5rem;
  border-radius: var(--radius-md);
  background: var(--primary);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 30px rgba(0, 24, 25, 0.15);
}

.btn-cta:hover {
  background: var(--secondary);
  box-shadow: 0 15px 35px rgba(217, 119, 6, 0.25);
  transform: translateY(-4px) scale(1.02);
}

.btn-arrow { transition: transform 0.3s; }
.btn-cta:hover .btn-arrow { transform: translateX(8px); }

@media (max-width: 768px) {
  .hero { padding: 60px 20px; min-height: auto; }
  .headline { font-size: 3.5rem; }
}
</style>