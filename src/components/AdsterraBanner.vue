<template>
  <div class="adsterra-wrapper">
    <div class="ad-skeleton" v-show="!loaded">
      <div class="shimmer"></div>
      <span class="ad-label">Advertisement</span>
    </div>
    <iframe 
      ref="adIframe" 
      width="100%" 
      height="90" 
      frameborder="0" 
      scrolling="no" 
      @load="onIframeLoad"
      class="ad-frame"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const adIframe = ref(null)
const loaded = ref(false)

onMounted(() => {
  if (!adIframe.value) return
  
  const doc = adIframe.value.contentWindow?.document || adIframe.value.contentDocument
  if (!doc) return

  doc.open()
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 90px; 
            background: transparent; 
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '29100988',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        <\/script>
        <script type="text/javascript" src="https://www.topcreativeformat.com/29100988/invoke.js"><\/script>
      </body>
    </html>
  `)
  doc.close()
})

const onIframeLoad = () => {
  loaded.value = true
}
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
}

.ad-skeleton {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.ad-frame {
  z-index: 2;
  min-height: 90px;
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
  .adsterra-wrapper {
    margin: 1.25rem 0;
    min-height: 100px;
  }
}
</style>
