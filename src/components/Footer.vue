<template>
  <footer>
    <p>Zentor — Mentor for GenZ</p>
    <router-link to="/referrals/" class="secret-refer">Refer & Earn</router-link>
  </footer>
</template>

<style scoped>
footer {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 3rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.secret-refer {
  color: var(--muted);
  text-decoration: none;
  opacity: 0.6;
  transition: all 0.2s;
}

.secret-refer:hover {
  opacity: 1;
  color: var(--magenta);
}

@media (max-width: 768px) {
  footer {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
  }
}
</style>