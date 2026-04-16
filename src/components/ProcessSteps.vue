<script setup>
defineProps({
  title: { type: String, default: '' },
  steps: { type: Array, required: true }
})
</script>

<template>
  <section class="process-section">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <div class="steps-grid">
      <div v-for="(step, index) in steps" :key="index" class="step-item">
        <div class="step-number">{{ index + 1 }}</div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.text }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-section {
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

@media (max-width: 1024px) {
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .steps-grid { grid-template-columns: 1fr; }
}
</style>