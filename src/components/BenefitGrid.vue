<script setup>
defineProps({
  title: { type: String, default: '' },
  cards: { type: Array, required: true }
})
</script>

<template>
  <section class="benefit-section">
    <h2 v-if="title" class="section-title" v-html="title"></h2>
    <div class="benefit-grid">
      <article v-for="(card, index) in cards" :key="index" class="benefit-card">
        <div class="benefit-icon" v-html="card.icon"></div>
        <h3>{{ card.title }}</h3>
        <p>{{ card.text }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.benefit-section {
  padding: var(--section-gap) 1.5rem;
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.section-title {
  font-family: 'Newsreader', serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 600;
  color: var(--primary);
  text-align: center;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
}

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: var(--container-max);
  margin: 0 auto;
}

.benefit-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(26, 20, 8, 0.04);
}

.benefit-card:hover {
  border-color: var(--secondary);
  background: var(--surface);
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(26, 20, 8, 0.08);
}

.benefit-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
}

.benefit-card h3 {
  font-family: 'Newsreader', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
}

.benefit-card p {
  font-family: 'Manrope', sans-serif;
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .benefit-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .benefit-grid { grid-template-columns: 1fr; }
  .benefit-card { padding: 2.5rem 1.5rem; }
}
</style>