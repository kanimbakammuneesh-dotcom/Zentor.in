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
  padding: var(--section-gap) 1.5rem;
  width: 100%;
  background: var(--bg);
}

.section-title {
  font-family: 'Newsreader', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  color: var(--primary);
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.form-intro {
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem;
  color: var(--text-muted);
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  line-height: 1.7;
}

.form-container {
  background: white;
  border: 1px solid rgba(0, 24, 25, 0.05);
  border-radius: var(--radius-lg);
  padding: 1rem;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 30px 60px rgba(0, 24, 25, 0.08);
}

.form-container iframe {
  width: 100% !important;
  height: 900px !important;
  border: none;
  border-radius: var(--radius-md);
}

@media (max-width: 640px) {
  .form-container { padding: 0.5rem; }
  .form-container iframe { height: 750px !important; }
}
</style>