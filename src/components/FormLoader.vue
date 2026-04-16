<template>
  <div class="dot-flow-loader" :class="{ ready: isReady }">
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
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  duration: {
    type: Number,
    default: 150
  }
})

const emit = defineEmits(['ready'])

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

const texts = ['Loading', 'Preparing', 'Loading', 'Loading', 'Ready']

const currentIndex = ref(0)
const textIndex = ref(0)
const isReady = ref(false)

const activeDots = computed(() => frames[currentIndex.value] || [])

const currentText = computed(() => texts[textIndex.value] || 'Loading')

let interval = null

const nextFrame = () => {
  currentIndex.value = (currentIndex.value + 1) % frames.length
  
  if (currentIndex.value === 0) {
    textIndex.value = (textIndex.value + 1) % texts.length
  }
  
  if (textIndex.value === texts.length - 1 && currentIndex.value === 0) {
    isReady.value = true
    emit('ready')
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }
}

onMounted(() => {
  interval = setInterval(nextFrame, props.duration)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.dot-flow-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.dot-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.15);
  transition: background 0.1s ease;
}

.dot.active {
  background: var(--acid, #D4FF00);
}

.loader-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(243, 244, 246, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.dot-flow-loader.ready {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
</style>