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
.job-description {
  font-family: 'Manrope', sans-serif;
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--text-muted);
}

.job-description :deep(p) {
  margin-bottom: 1.5rem;
}

.job-description :deep(strong) {
  color: var(--primary);
  font-weight: 800;
  display: block;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-family: 'Newsreader', serif;
  font-size: 1.25rem;
}

.job-description :deep(.description-list) {
  margin: 1.5rem 0 2rem 1.25rem;
  list-style: none;
}

.job-description :deep(li) {
  position: relative;
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
}

.job-description :deep(li)::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--secondary);
  font-weight: bold;
}

@media (max-width: 768px) {
  .job-description {
    font-size: 1rem;
  }
}
</style>
