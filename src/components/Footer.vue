<template>
  <footer>
    <div class="footer-brand">
      <img class="footer-logo" src="/logos/zentor_for_darkbg.png" alt="Zentor" width="24" height="24" />
      <span>Zentor</span>
    </div>
    <div class="footer-links">
      <router-link to="/privacy/" class="nav-link">Privacy</router-link>
      <router-link to="/terms/" class="nav-link">Terms</router-link>
      <router-link to="/contact/" class="nav-link">Contact</router-link>
      <router-link to="/admissions/" class="nav-link">Admissions</router-link>
      <span class="divider">|</span>
      <span class="udyam-wrapper" @click="revealUdyam" title="Click to reveal UDYAM">
        <span v-if="!udyamRevealed" class="udyam-masked">••••••••</span>
        <span v-else class="udyam-code">UDYAM: UDYAM-AP-23-0083180</span>
      </span>
      <router-link to="/referrals/" class="secret-refer">Refer & Earn</router-link>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const udyamRevealed = ref(false)

function revealUdyam() {
  udyamRevealed.value = !udyamRevealed.value
}
</script>

<style scoped>
footer {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem 3rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: var(--muted);
  text-decoration: none;
  opacity: 0.6;
  transition: all 0.2s;
}

.nav-link:hover {
  opacity: 1;
  color: var(--acid);
}

.divider {
  opacity: 0.3;
}

.udyam-wrapper {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}

.udyam-masked {
  opacity: 0.3;
  user-select: none;
  transition: opacity 0.2s;
}

.udyam-masked:hover {
  opacity: 0.6;
}

.udyam-code {
  opacity: 0.2;
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
    justify-content: center;
    gap: 1rem;
    padding: 1.5rem;
    text-align: center;
  }

  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>