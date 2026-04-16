<script setup>
defineProps({
  title: { type: String, default: '' },
  intro: { type: String, default: '' },
  src: { type: String, required: true },
  ariaLabel: { type: String, default: 'Form' }
})
</script>

<template>
  <section class="form-section">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <p v-if="intro" class="form-intro">{{ intro }}</p>
    <div class="form-container">
      <iframe 
        :src="src"
        :title="title"
        loading="eager"
        :aria-label="ariaLabel"
      ></iframe>
    </div>
  </section>
</template>

<style scoped>
.form-section {
  padding: 6rem 1rem;
  width: 100%;
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

.form-intro {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  color: var(--muted);
  text-align: center;
  max-width: 600px;
  margin: -2rem auto 3rem;
  line-height: 1.6;
}

.form-container {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.form-container iframe {
  width: 100% !important;
  height: 900px !important;
  border: none;
  border-radius: 12px;
}

@media (max-width: 640px) {
  .form-container iframe { height: 750px !important; min-height: 600px; }
}
</style>