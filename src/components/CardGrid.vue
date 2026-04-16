<script setup>
defineProps({
  title: { type: String, default: '' },
  cards: { type: Array, required: true },
  accentColor: { type: String, default: 'acid' }
})
</script>

<template>
  <section class="card-section">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <div class="card-grid" :class="'accent-' + accentColor">
      <article v-for="(card, index) in cards" :key="index" class="card-item">
        <div class="card-icon" v-html="card.icon"></div>
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-text">{{ card.text }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.card-section {
  padding: 4rem 1rem 6rem;
}

.card-section:nth-child(even) {
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

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.card-item {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  backdrop-filter: blur(20px);
  text-align: center;
  transition: all 0.3s;
}

.accent-acid .card-item:hover {
  border-color: var(--acid);
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(212, 255, 0, 0.15);
}

.accent-magenta .card-item:hover {
  border-color: var(--magenta);
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(255, 0, 85, 0.15);
}

.accent-cyan .card-item:hover {
  border-color: var(--cyan);
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 240, 255, 0.15);
}

.card-icon {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.accent-acid .card-icon { color: var(--acid); }
.accent-magenta .card-icon { color: var(--magenta); }
.accent-cyan .card-icon { color: var(--cyan); }

.card-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-text {
  font-size: 1rem;
  color: var(--muted);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .card-grid { grid-template-columns: 1fr; }
}

@media (hover: none) and (pointer: coarse) {
  .card-item:hover { transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .card-item { transition: none; }
}
</style>