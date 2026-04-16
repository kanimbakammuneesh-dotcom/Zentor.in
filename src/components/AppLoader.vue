<template>
  <Transition name="fade">
    <div v-if="loading" class="app-loader">
      <div class="dot-grid">
        <div 
          v-for="i in 49" 
          :key="i" 
          class="dot" 
          :class="{ active: activeDots.includes(i - 1) }"
        />
      </div>
      <div class="loader-text">{{ currentText }}</div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineExpose({ done: () => { loading.value = false } })

const frames = [
  [0, 2, 4, 6, 20, 34, 48, 46, 44, 42, 28, 14, 8, 22, 36, 38, 40, 26, 12, 10, 16, 30, 24, 18, 32],
  [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47],
  [8, 22, 36, 38, 40, 26, 12, 10, 16, 30, 24, 18, 32],
  [9, 11, 15, 17, 19, 23, 25, 29, 31, 33, 37, 39],
  [16, 30, 24, 18, 32],
  [17, 23, 31, 25],
  [24],
  [17, 23, 31, 25],
  [16, 30, 24, 18, 32],
  [9, 11, 15, 17, 19, 23, 25, 29, 31, 33, 37, 39],
  [8, 22, 36, 38, 40, 26, 12, 10, 16, 30, 24, 18, 32],
  [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47],
  [0, 2, 4, 6, 20, 34, 48, 46, 44, 42, 28, 14, 8, 22, 36, 38, 40, 26, 12, 10, 16, 30, 24, 18, 32],
]

const texts = ['Loading', 'Preparing', 'Loading', 'Loading']

const loading = ref(true)
const currentIndex = ref(0)
const textIndex = ref(0)

const activeDots = computed(() => frames[currentIndex.value] || [])
const currentText = computed(() => texts[textIndex.value] || 'Loading')

let interval = null

const nextFrame = () => {
  currentIndex.value = (currentIndex.value + 1) % frames.length
  
  if (currentIndex.value === 0 && textIndex.value < texts.length - 1) {
    textIndex.value++
  }
  
  if (textIndex.value === texts.length - 1 && currentIndex.value >= frames.length - 1) {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
}

onMounted(() => {
  interval = setInterval(nextFrame, 150)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.app-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: var(--bg);
}

.dot-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  transition: background 0.1s ease;
}

.dot.active {
  background: var(--acid, #D4FF00);
}

.loader-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(243, 244, 246, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>