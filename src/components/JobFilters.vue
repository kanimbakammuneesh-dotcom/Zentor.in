<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  uniqueLocations: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['filter-change'])

const searchCompany = ref('')
const selectedLocation = ref('')
const selectedExp = ref('')
const selectedSort = ref('date')

let searchTimeout = null

function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    emit('filter-change', { key: 'company', value: searchCompany.value })
  }, 300)
}

function onLocationChange() {
  emit('filter-change', { key: 'location', value: selectedLocation.value })
}

function onExpChange() {
  if (!selectedExp.value) {
    emit('filter-change', { key: 'minExp', value: null })
    emit('filter-change', { key: 'maxExp', value: null })
  } else if (selectedExp.value === '5+') {
    emit('filter-change', { key: 'minExp', value: 5 })
    emit('filter-change', { key: 'maxExp', value: null })
  } else {
    const [min, max] = selectedExp.value.split('-').map(Number)
    emit('filter-change', { key: 'minExp', value: min })
    emit('filter-change', { key: 'maxExp', value: max })
  }
}

function onSortChange() {
  emit('filter-change', { key: 'sort', value: selectedSort.value })
}
</script>

<template>
  <section class="jobs-filters">
    <div class="filter-bar">
      <div class="filter-group">
        <input 
          v-model="searchCompany" 
          type="text" 
          placeholder="Search by company..." 
          class="filter-input" 
          @input="debouncedSearch" 
        />
      </div>
      <div class="filter-group">
        <select v-model="selectedLocation" class="filter-select" @change="onLocationChange">
          <option value="">All Locations</option>
          <option v-for="loc in uniqueLocations" :key="loc" :value="loc">{{ loc }}</option>
        </select>
      </div>
      <div class="filter-group">
        <select v-model="selectedExp" class="filter-select" @change="onExpChange">
          <option value="">Any Experience</option>
          <option value="0-1">0-1 Years</option>
          <option value="1-3">1-3 Years</option>
          <option value="3-5">3-5 Years</option>
          <option value="5+">5+ Years</option>
        </select>
      </div>
      <div class="filter-group">
        <select v-model="selectedSort" class="filter-select" @change="onSortChange">
          <option value="date">Newest First</option>
          <option value="experience">Experience</option>
        </select>
      </div>
    </div>
  </section>
</template>

<style scoped>
.jobs-filters {
  padding: 1rem 5%;
  background: var(--glass-bg);
  border-bottom: 1px solid var(--border);
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.filter-group {
  flex: 1;
  min-width: 150px;
}

.filter-input,
.filter-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.9rem;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--acid);
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }
  .filter-group {
    width: 100%;
  }
}
</style>
