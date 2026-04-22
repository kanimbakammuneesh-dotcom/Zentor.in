<script setup>
defineProps({
  title: { type: String, default: '' },
  steps: { type: Array, required: true }
})
</script>

<template>
  <section class="process-section">
    <h2 v-if="title" class="section-title" v-html="title"></h2>
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
  padding: var(--section-gap) 1.5rem;
  background: var(--bg);
}

.section-title {
  font-family: 'Newsreader', serif;
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  color: var(--primary);
  text-align: center;
  margin-bottom: 5rem;
  letter-spacing: -0.02em;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: var(--container-max);
  margin: 0 auto;
  position: relative;
}

.step-item {
  text-align: center;
  padding: 0 1rem;
  position: relative;
}

.step-number {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--surface);
  color: var(--secondary);
  font-family: 'Newsreader', serif;
  font-size: 1.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(26, 20, 8, 0.05);
}

.step-item:hover .step-number {
  background: var(--secondary);
  color: white;
  transform: scale(1.1);
}

.step-item h3 {
  font-family: 'Newsreader', serif;
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
}

.step-item p {
  font-family: 'Manrope', sans-serif;
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 3rem 1.5rem; }
}

@media (max-width: 640px) {
  .steps-grid { grid-template-columns: 1fr; }
  .step-item { padding: 0; }
}
</style>