<template>
  <div class="banner-placeholder">
    <div class="ad-skeleton">
      <div class="shimmer"></div>
      <span class="ad-label">Advertisement space reserved for Monetag</span>
    </div>
  </div>
</template>

<script setup>
// Adsterra scripts completely removed per user request.
// Awaiting Monetag specific banner script if an inline zone is created.
</script>

<style scoped>
.banner-placeholder {
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
}

.ad-skeleton {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 3s infinite linear;
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@media (max-width: 768px) {
  .banner-placeholder {
    margin: 1.25rem 0;
    min-height: 100px;
  }
}
</style>


