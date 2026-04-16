<template>
  <section class="error-page">
    <div class="lottie-wrap">
      <iframe 
        src="https://lottie.host/embed/9d3304a4-e3cc-4fb1-ac9c-adaa70796006/nwKZzUgTIk.lottie" 
        title="Error Animation"
        loading="lazy"
        aria-hidden="true"
      ></iframe>
    </div>
    <h1 class="error-code">404</h1>
    <p class="error-title">Page Not Found</p>
    <p class="error-message">The page you're looking for couldn't be loaded. Let's get you back on track.</p>
    <router-link to="/" class="btn-home">Back to Home</router-link>
  </section>
</template>

<script setup>
import { useSeoMeta } from '@unhead/vue'

useSeoMeta({
  title: '404 — Page Not Found | Zentor',
  titleTemplate: '%s',
  description: 'The page you were looking for could not be found. Return to the Zentor homepage.',
  robots: 'noindex, nofollow',
  googlebot: 'noindex, nofollow'
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 2rem 4rem;
}

.lottie-wrap {
  width: 100%;
  max-width: 500px;
  height: 400px;
  margin-bottom: 1rem;
}

.lottie-wrap iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.error-code {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 900;
  color: var(--acid);
  line-height: 1;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 60px rgba(212, 255, 0, 0.3);
}

.error-title {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.error-message {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: var(--muted);
  margin-bottom: 2rem;
  max-width: 400px;
  line-height: 1.5;
}

.btn-home {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bg);
  padding: 1rem 2rem;
  border-radius: 4px;
  background: var(--acid);
  text-decoration: none;
  transition: all 0.3s;
}

.btn-home:hover {
  background: var(--cyan);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
}

@media (max-width: 768px) {
  .error-page {
    padding: 6rem 1.5rem 3rem;
  }

  .lottie-wrap {
    height: 300px;
  }

  .error-code {
    font-size: clamp(3rem, 20vw, 8rem);
  }
}
</style>
