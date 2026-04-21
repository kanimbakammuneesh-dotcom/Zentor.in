<script setup>
import { ref } from 'vue'

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
      <div class="filter-group search">
        <div class="input-wrapper">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input 
            v-model="searchCompany" 
            type="text" 
            placeholder="Search company..." 
            class="filter-input" 
            @input="debouncedSearch" 
          />
        </div>
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
      <div class="filter-group sort">
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
  padding: 2rem 0;
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
  min-width: 160px;
}

.filter-group.search {
  flex: 2;
  min-width: 250px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--muted);
  pointer-events: none;
}

.filter-input {
  padding-left: 2.75rem !important;
}

.filter-input,
.filter-select {
  width: 100%;
  padding: 0.875rem 1.25rem;
  background: var(--glass-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-size: 0.95rem;
  transition: all 0.2s;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--acid);
  background: var(--bg);
  box-shadow: 0 0 0 4px rgba(167, 138, 254, 0.1);
}

@media (max-width: 768px) {
  .jobs-filters {
    padding: 1.5rem 0;
  }
  .filter-group {
    flex: none;
    width: 100%;
    min-width: 0;
  }
}
</style>
