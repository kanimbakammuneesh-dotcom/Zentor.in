<script setup>
defineProps({
  stats: { type: Array, required: true }
})
</script>

<template>
  <section class="stats-section">
    <div class="stats-grid">
      <div v-for="(stat, index) in stats" :key="index" class="stat-item">
        <span class="stat-number">{{ stat.number }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: var(--section-gap) 1.5rem;
  background: var(--bg);
  border-top: 1px solid rgba(0, 24, 25, 0.05);
  border-bottom: 1px solid rgba(0, 24, 25, 0.05);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  max-width: var(--container-max);
  margin: 0 auto;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-number {
  font-family: 'Newsreader', serif;
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 600;
  color: var(--primary);
  line-height: 1;
}

.stat-label {
  font-family: 'Manrope', sans-serif;
  font-size: 0.8125rem;
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 800;
}

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; gap: 3rem; }
}
</style>