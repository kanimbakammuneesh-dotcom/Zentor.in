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
        <span v-if="headline" class="hl-main">{{ headline }}</span>
        <br v-if="headlineHighlight" />
        <span v-if="headlineHighlight" class="hl-highlight">{{ headlineHighlight }}</span>
      </h1>
      <p v-if="tagline" class="tagline">{{ tagline }}</p>
      <p v-if="subheadline" class="sub-headline">{{ subheadline }}</p>
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
  padding: 10rem 1rem 6rem;
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

.eyebrow-slash {
  color: var(--magenta);
  font-weight: 700;
}

.headline {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.hl-main { color: var(--text); }
.hl-highlight { color: var(--acid); }

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
  max-width: 700px;
  line-height: 1.7;
  font-weight: 400;
  margin-bottom: 3rem;
}

.cta-wrap { margin-top: 1rem; }

.btn-cta {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--bg);
  padding: 1.25rem 3rem;
  border-radius: 8px;
  background: var(--acid);
  text-decoration: none;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-cta:hover {
  background: var(--cyan);
  box-shadow: 0 0 40px rgba(0, 240, 255, 0.4);
  transform: translateY(-2px);
}

.btn-arrow { transition: transform 0.3s; }
.btn-cta:hover .btn-arrow { transform: translateX(6px); }

@media (max-width: 768px) {
  .hero { padding: 8rem 1rem 4rem; min-height: auto; }
}
</style>