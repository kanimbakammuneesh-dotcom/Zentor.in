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
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '404 — Page Not Found | Zentor'
  
  const metaTags = [
    { name: 'description', content: 'The page you were looking for could not be found. Return to the Zentor homepage.' },
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'googlebot', content: 'noindex, nofollow' },
  ]
  
  metaTags.forEach(tag => {
    let meta = document.querySelector(`meta[name="${tag.name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', tag.name)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', tag.content)
  })
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
  background: white;
}

.lottie-wrap {
  width: 100%;
  max-width: 500px;
  height: 400px;
  margin-bottom: 2rem;
}

.lottie-wrap iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.error-code {
  font-family: 'Newsreader', serif;
  font-size: clamp(6rem, 20vw, 15rem);
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
  margin-bottom: 1rem;
  letter-spacing: -0.05em;
  opacity: 0.1;
  position: absolute;
  z-index: 0;
}

.error-title {
  font-family: 'Newsreader', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.error-message {
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem;
  color: var(--text-muted);
  margin-bottom: 3rem;
  max-width: 480px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.btn-home {
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
  padding: 1.25rem 3rem;
  border-radius: var(--radius-md);
  background: var(--primary);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 1;
}

.btn-home:hover {
  background: var(--secondary);
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 24, 25, 0.15);
}

@media (max-width: 768px) {
  .error-page { padding: 6rem 1.5rem 3rem; }
  .lottie-wrap { height: 300px; }
}
</style>
