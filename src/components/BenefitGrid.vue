<script setup>
defineProps({
  title: { type: String, default: '' },
  cards: { type: Array, required: true }
})
</script>

<template>
  <section class="benefit-section">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <div class="benefit-grid">
      <article v-for="(card, index) in cards" :key="index" class="benefit-card">
        <div class="benefit-icon">{{ card.icon }}</div>
        <h3>{{ card.title }}</h3>
        <p>{{ card.text }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.benefit-section {
  padding: 4rem 1rem 6rem;
  background: var(--glass-bg);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
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

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.benefit-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;
}

.benefit-card:hover {
  border-color: var(--cyan);
  transform: translateY(-4px);
}

.benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.benefit-card h3 {
  font-family: 'Unbounded', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.benefit-card p {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .benefit-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .benefit-grid { grid-template-columns: 1fr; }
}

@media (hover: none) and (pointer: coarse) {
  .benefit-card:hover { transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .benefit-card { transition: none; }
}
</style>