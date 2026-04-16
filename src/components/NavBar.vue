<template>
  <nav>
    <router-link to="/" class="nav-logo">Zentor</router-link>
    <div class="nav-links">
      <router-link to="/admissions/" class="nav-link">Admissions</router-link>
      <router-link to="/referrals/" class="nav-pill">Refer & Earn</router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  background: linear-gradient(to bottom, rgba(3, 3, 5, 0.9) 0%, rgba(3, 3, 5, 0) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.nav-logo {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.nav-logo::before {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  background: var(--acid);
  border-radius: 2px;
  box-shadow: 0 0 10px var(--acid);
  animation: pulse-acid 2s infinite alternate;
  flex-shrink: 0;
}

@keyframes pulse-acid {
  from {
    box-shadow: 0 0 5px var(--acid);
    transform: scale(0.9);
  }
  to {
    box-shadow: 0 0 20px var(--acid);
    transform: scale(1.1);
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--text);
}

.nav-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bg);
  padding: 0.4rem 1rem;
  border-radius: 2px;
  background: var(--acid);
  text-decoration: none;
  transition: all 0.2s;
}

.nav-pill:hover {
  background: var(--cyan);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
}

@media (max-width: 768px) {
  nav {
    padding: 1rem 1.5rem;
  }

  .nav-link {
    display: none;
  }
}
</style>