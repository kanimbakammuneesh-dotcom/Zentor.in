<template>
  <div class="adsterra-wrapper" ref="adContainer">
    <!-- Placeholder styling while the script loads -->
    <div class="ad-skeleton">
      <div class="shimmer"></div>
      <span class="ad-label">Advertisement</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const adContainer = ref(null)

onMounted(() => {
  // Inject the specific pop-under script provided by the user directly into these precise spots.
  if (adContainer.value) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://windowthrilling.com/ce/53/fc/ce53fcb07fd938c7dd165e9b64ba3005.js'
    script.async = true
    
    // This appends the popunder ad strictly into this container as requested.
    adContainer.value.appendChild(script)
  }
})
</script>

<style scoped>
.adsterra-wrapper {
  width: 100%;
  min-height: 120px;
  background: var(--glass-bg);
  border: 1px dashed var(--glass-border);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  color-scheme: dark;
  cursor: pointer; /* Suggests interactivity for the pop-under trigger */
}

/* Fallback styling for the ad space before/if content loads */
.ad-skeleton {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: none;
}

.ad-label {
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 700;
  opacity: 0.5;
}

.shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.03) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2.5s infinite linear;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@media (max-width: 768px) {
  .adsterra-wrapper {
    margin: 1.25rem 0;
    min-height: 100px;
  }
}
</style>
