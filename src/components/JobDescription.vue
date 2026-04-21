<script setup>
import { computed } from 'vue'

const props = defineProps({
  description: {
    type: String,
    required: true
  }
})

const formattedDescription = computed(() => {
  if (!props.description) return ''
  
  let html = props.description
  
  // Handle Bold (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // Handle Bullet Points
  const lines = html.split('\n')
  let inList = false
  const processedLines = lines.map(line => {
    const trimmed = line.trim()
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const content = trimmed.substring(2)
      let prefix = ''
      if (!inList) {
        prefix = '<ul class="description-list">'
        inList = true
      }
      return `${prefix}<li>${content}</li>`
    } else {
      let suffix = ''
      if (inList) {
        suffix = '</ul>'
        inList = false
      }
      return `${suffix}${trimmed ? `<p>${trimmed}</p>` : ''}`
    }
  })
  
  if (inList) processedLines.push('</ul>')
  
  return processedLines.join('')
})
</script>

<template>
  <div class="job-description" v-html="formattedDescription"></div>
</template>

<style scoped>
.job-description :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--text-dim);
}

.job-description :deep(strong) {
  color: var(--text);
  font-weight: 700;
}

.job-description :deep(.description-list) {
  margin: 1rem 0 1.5rem 1.5rem;
  list-style: disc;
}

.job-description :deep(li) {
  margin-bottom: 0.5rem;
  color: var(--text-dim);
  line-height: 1.5;
}
</style>
