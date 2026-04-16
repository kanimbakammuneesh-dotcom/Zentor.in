<template>
  <section class="hero">
    <div class="hero-content">
      <span class="eyebrow">
        <span class="eyebrow-slash">/</span>Zentor
      </span>
      <h1 class="headline">
        <span class="hl-zen">Zentor</span>
        <br>
        <span class="hl-gen">for GenZ</span>
      </h1>
      <p class="tagline">Education, Reimagined</p>
      <p class="sub-headline">
        Your AI-powered mentor for finding the perfect college, 
        getting direct admissions, and building your future in Chennai & Bengaluru.
      </p>
      <div class="cta-wrap">
        <router-link to="/admissions/" class="btn-cta">
          Get Started
          <span class="btn-arrow">→</span>
        </router-link>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="motivational-grid">
      <div class="motif-card">
        <div class="motif-icon">🎯</div>
        <h3 class="motif-title">Smart Matching</h3>
        <p class="motif-text">AI-powered recommendations that understand your goals, scores, and aspirations.</p>
      </div>
      <div class="motif-card">
        <div class="motif-icon">📋</div>
        <h3 class="motif-title">Direct Admissions</h3>
        <p class="motif-text">Skip the entrance exam stress. Get direct admission guidance to top colleges.</p>
      </div>
      <div class="motif-card">
        <div class="motif-icon">💬</div>
        <h3 class="motif-title">Expert Support</h3>
        <p class="motif-text">One-on-one counseling from experts who care about your success.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 4rem;
  padding-top: 8rem;
  padding-bottom: 4rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  width: 100%;
}

.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--glass-border);
  padding: 0.5rem 1rem;
  border-radius: 100px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  margin-bottom: 2rem;
  white-space: wrap;
}

.eyebrow-slash {
  color: var(--magenta);
  font-weight: 800;
}

.headline {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(3rem, 7vw, 7.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  word-break: break-word;
}

.hl-zen {
  color: var(--text);
}

.hl-gen {
  color: var(--acid);
}

.tagline {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--cyan);
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
}

.sub-headline {
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  color: var(--muted);
  max-width: 500px;
  line-height: 1.6;
  font-weight: 500;
  margin-bottom: 2.5rem;
}

.cta-wrap {
  margin-bottom: 4rem;
}

.btn-cta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bg);
  padding: 1.25rem 3rem;
  border-radius: 4px;
  background: var(--acid);
  text-decoration: none;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

.btn-cta:hover {
  background: var(--cyan);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
  transform: scale(1.02);
}

.btn-arrow {
  transition: transform 0.3s;
}

.btn-cta:hover .btn-arrow {
  transform: translateX(4px);
}

.features {
  padding-bottom: 4rem;
}

.motivational-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
}

.motif-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 6px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  text-align: left;
  transition: all 0.3s;
}

.motif-card:hover {
  border-color: var(--acid);
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(212, 255, 0, 0.1);
}

.motif-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.motif-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.motif-text {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding-top: 6rem;
    padding-bottom: 3rem;
    min-height: auto;
  }

  .hero-content {
    align-items: center;
    text-align: center;
  }

  .motivational-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .motif-card,
  .btn-cta {
    transition: none;
  }
}
</style>