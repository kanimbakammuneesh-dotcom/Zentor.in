<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
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

      <button class="burger-btn" @click="toggleMenu" aria-label="Menu" :aria-expanded="isMenuOpen">
        <span class="burger-line" :class="{ 'open': isMenuOpen }"></span>
        <span class="burger-line" :class="{ 'open': isMenuOpen }"></span>
        <span class="burger-line" :class="{ 'open': isMenuOpen }"></span>
      </button>
    </div>

    <div class="mobile-menu" :class="{ 'open': isMenuOpen }">
      <div class="mobile-menu-overlay" @click="closeMenu"></div>
      <div class="mobile-menu-panel">
        <router-link to="/courses/" class="mobile-link" @click="closeMenu">Courses</router-link>
        <router-link to="/internship/" class="mobile-link" @click="closeMenu">Internship</router-link>
        <router-link to="/jobs/" class="mobile-link" @click="closeMenu">Jobs</router-link>
        <router-link to="/admissions/" class="mobile-link mobile-cta" @click="closeMenu">Admissions</router-link>
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
  z-index: 1002;
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
  padding: 0.25rem 0;
}

.logo-img {
  width: auto;
  height: 56px;
  max-height: 56px;
  object-fit: contain;
  display: block;
  transition: all 0.5s ease;
}

.is-scrolled .logo-img {
  width: auto;
  height: 44px;
  max-height: 44px;
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

.burger-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.burger-btn:hover {
  background: rgba(180, 145, 80, 0.1);
}

.burger-line {
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.burger-line.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.burger-line.open:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.burger-line.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  pointer-events: none;
}

.mobile-menu.open {
  display: block;
  pointer-events: auto;
}

.mobile-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-menu.open .mobile-menu-overlay {
  opacity: 1;
}

.mobile-menu-panel {
  position: absolute;
  top: 64px;
  right: 16px;
  background: rgba(253, 250, 245, 0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(26, 20, 8, 0.15);
  transform: translateX(120%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu.open .mobile-menu-panel {
  transform: translateX(0);
}

.mobile-link {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.mobile-link:hover {
  background: rgba(180, 145, 80, 0.1);
  color: var(--secondary);
}

.mobile-cta {
  background: var(--primary);
  color: white;
  text-align: center;
  margin-top: 8px;
}

.mobile-cta:hover {
  background: var(--secondary);
  color: white;
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
    padding: 0 1rem;
    height: 64px;
  }

  .logo-img {
    width: auto;
    height: 40px;
    max-height: 40px;
  }

  .nav-links {
    display: none;
  }

  .burger-btn {
    display: flex;
  }

  .nav-link:not(.nav-cta) {
    display: none;
  }
}
</style>