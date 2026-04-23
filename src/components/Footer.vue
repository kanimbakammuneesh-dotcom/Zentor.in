<script setup>
import { ref } from 'vue'

const udyamRevealed = ref(false)

function revealUdyam() {
  udyamRevealed.value = !udyamRevealed.value
}
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <img class="footer-logo" src="/logos/zentor_for_lightbg.png" alt="Zentor" width="100" height="35" />
          <p class="footer-tagline">Empowering Gen Z with tech excellence.</p>
        </div>
        <div class="footer-grid">
          <div class="footer-column">
            <h4>Quick Links</h4>
            <router-link to="/courses/" class="footer-link">Courses</router-link>
            <router-link to="/internship/" class="footer-link">Internship</router-link>
            <router-link to="/jobs/" class="footer-link">Jobs</router-link>
          </div>
          <div class="footer-column">
            <h4>Support</h4>
            <router-link to="/contact/" class="footer-link">Contact</router-link>
            <router-link to="/privacy/" class="footer-link">Privacy</router-link>
            <router-link to="/terms/" class="footer-link">Terms</router-link>
          </div>
          <div class="footer-column">
            <h4>Opportunities</h4>
            <router-link to="/referrals/" class="footer-link">Refer & Earn</router-link>
            <router-link to="/admissions/" class="footer-link">Admissions</router-link>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copyright">
          © {{ new Date().getFullYear() }} Zentor.in. All rights reserved.
        </div>
        <div class="footer-legal">
          <span class="udyam-wrapper" @click="revealUdyam" title="Click to reveal UDYAM">
            <span v-if="!udyamRevealed" class="udyam-masked">••••••••</span>
            <span v-else class="udyam-code">UDYAM: UDYAM-AP-23-0083180</span>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--primary);
  color: #FDFAF5;
  padding: 80px 24px 40px;
  font-family: 'Manrope', sans-serif;
  border-top: 1px solid var(--border-strong);
}

.footer-container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  gap: 4rem;
  margin-bottom: 60px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-logo {
  width: 120px;
  height: auto;
  filter: brightness(0) invert(1);
}

.footer-tagline {
  font-size: 1rem;
  color: rgba(253, 250, 245, 0.6);
  max-width: 240px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-column h4 {
  font-family: 'Newsreader', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #FDFAF5;
  margin-bottom: 1.5rem;
}

.footer-link {
  display: block;
  color: rgba(253, 250, 245, 0.6);
  text-decoration: none;
  font-size: 0.9375rem;
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
}

.footer-link:hover {
  color: var(--secondary);
  transform: translateX(4px);
}

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid rgba(253, 250, 245, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
  color: rgba(253, 250, 245, 0.4);
}

.udyam-wrapper {
  cursor: pointer;
}

.udyam-masked {
  letter-spacing: 0.2em;
}

@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .footer { padding: 60px 20px 30px; }
  .footer-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
}
</style>