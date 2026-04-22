<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="glass-nav" :class="{ 'is-scrolled': isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="nav-logo" aria-label="Zentor Home">
        <img class="logo-img" src="/logos/zentor_for_lightbg.png" alt="Zentor Logo" width="130" height="46" />
      </router-link>
      
      <div class="nav-links">
        <router-link to="/courses/" class="nav-link">Courses</router-link>
        <router-link to="/internship/" class="nav-link">Internship</router-link>
        <router-link to="/jobs/" class="nav-link">Jobs</router-link>
        <router-link to="/admissions/" class="nav-link nav-cta">Admissions</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.glass-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(253, 250, 245, 0.4);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(180, 145, 80, 0.1);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-nav.is-scrolled {
  background: rgba(253, 250, 245, 0.95);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border-bottom: 1px solid rgba(180, 145, 80, 0.25);
  box-shadow: 0 4px 30px rgba(26, 20, 8, 0.08);
}

.nav-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.is-scrolled .nav-container {
  height: 64px;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
}

.logo-img {
  width: auto;
  max-height: 70%;
  display: block;
  transition: all 0.5s ease;
}

.is-scrolled .logo-img {
  max-height: 65%;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link {
  font-family: 'Manrope', sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.nav-link:not(.nav-cta)::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--secondary);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateX(-50%);
}

.nav-link:not(.nav-cta):hover::after {
  width: 20px;
}

.nav-link:hover {
  color: var(--secondary);
}

.nav-cta {
  background: var(--primary);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 800;
  box-shadow: 0 4px 15px rgba(26, 20, 8, 0.15);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.nav-cta:hover {
  color: white;
  background: var(--secondary);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 24px rgba(200, 129, 26, 0.25);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1.25rem;
    height: 64px;
  }

  .logo-img {
    width: 100px;
  }

  .nav-links {
    gap: 1.25rem;
  }
  
  .nav-link:not(.nav-cta) {
    display: none;
  }
}
</style>