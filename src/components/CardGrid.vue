<script setup>
defineProps({
  title: { type: String, default: '' },
  cards: { type: Array, required: true },
  accentColor: { type: String, default: 'acid' }
})
</script>

<template>
  <section class="card-section">
    <h2 v-if="title" class="section-title" v-html="title"></h2>
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
  padding: var(--section-gap) 1.5rem;
  background: var(--bg-subtle);
}

.section-title {
  font-family: 'Newsreader', serif;
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  color: var(--primary);
  text-align: center;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
}

.card-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 16px rgba(26, 20, 8, 0.04);
}

.card-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(26, 20, 8, 0.08);
  border-color: var(--secondary);
}

.card-icon {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  color: var(--secondary);
  background: var(--bg);
  padding: 1.25rem;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.card-item:hover .card-icon {
  background: var(--secondary);
  color: white;
  transform: scale(1.1);
}

.card-title {
  font-family: 'Newsreader', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.card-text {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
}

@media (max-width: 640px) {
  .card-grid { grid-template-columns: 1fr; }
  .card-item { padding: 2.5rem 1.5rem; }
}
</style>