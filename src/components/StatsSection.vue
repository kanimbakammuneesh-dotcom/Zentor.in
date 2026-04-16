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
  padding: 4rem 1rem;
  background: var(--glass-bg);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-number {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--acid);
}

.stat-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; gap: 2rem; }
}
</style>