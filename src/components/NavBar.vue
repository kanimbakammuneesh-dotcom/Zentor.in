<template>
  <nav>
    <router-link to="/" class="nav-logo" aria-label="Zentor Home">
      <img class="logo-img" src="/logos/zentor_for_darkbg.png" alt="Zentor Logo" width="100" height="35" />
    </router-link>
    <div class="nav-links">
      <router-link to="/courses/" class="nav-link">Courses</router-link>
      <router-link to="/admissions/" class="nav-link">Admissions</router-link>
      <router-link to="/internship/" class="nav-link">Internship</router-link>
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
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  width: 100px;
  height: auto;
  display: block;
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

  .logo-img {
    width: 80px;
  }

  .nav-pill {
    font-size: 0.65rem;
    padding: 0.35rem 0.75rem;
  }
}
</style>