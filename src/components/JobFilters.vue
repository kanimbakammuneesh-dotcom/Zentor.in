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
  padding: 3rem 0;
  border-bottom: 1px solid rgba(0, 24, 25, 0.05);
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(0, 24, 25, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.filter-group {
  flex: 1;
  min-width: 180px;
}

.filter-group.search {
  flex: 2;
  min-width: 280px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  color: var(--primary);
  opacity: 0.5;
  pointer-events: none;
}

.filter-input {
  padding-left: 3rem !important;
}

.filter-input,
.filter-select {
  width: 100%;
  padding: 0.875rem 1.25rem;
  background: var(--bg);
  border: 1px solid rgba(0, 24, 25, 0.05);
  border-radius: var(--radius-md);
  color: var(--primary);
  font-family: 'Manrope', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  transition: all 0.3s ease;
  appearance: none;
}

.filter-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23001819' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--secondary);
  background: white;
  box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.1);
}

.filter-input::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}

@media (max-width: 768px) {
  .jobs-filters { padding: 2rem 0; }
  .filter-bar { padding: 0.75rem; gap: 0.75rem; }
  .filter-group { flex: none; width: 100%; }
}
</style>
