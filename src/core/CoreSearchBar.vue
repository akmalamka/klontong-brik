<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import CoreButton from './CoreButton.vue'

interface CoreSearchBarProps {
  modelValue: string
  debounceTime?: number
  placeholder?: string
}

const props = withDefaults(defineProps<CoreSearchBarProps>(), {
  debounceTime: 300, // Default debounce time in ms
  placeholder: 'Search...',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Internal state for the input, which updates instantly
const searchTerm = ref(props.modelValue)
let debounceTimeout: ReturnType<typeof setTimeout> | null = null

/** Clears the current debounce timeout. */
function clearDebounce() {
  if (debounceTimeout !== null) {
    clearTimeout(debounceTimeout)
    debounceTimeout = null
  }
}

function handleInput() {
  clearDebounce() // Clear previous timeout

  // Set a new timeout
  debounceTimeout = setTimeout(() => {
    emit('update:modelValue', searchTerm.value)
  }, props.debounceTime)
}

function handleClear() {
  searchTerm.value = ''
  clearDebounce()
  emit('update:modelValue', '')
}

/** Watch the external modelValue prop to update the internal searchTerm */
watch(
  () => props.modelValue,
  (newVal) => {
    // Only update if the internal value is different (e.g., reset from parent)
    if (newVal !== searchTerm.value) {
      searchTerm.value = newVal
    }
  },
)

// Clear the timeout when the component is unmounted
onBeforeUnmount(() => {
  clearDebounce()
})
</script>

<template>
  <div class="flex items-center gap-2 p-2 border border-gray-300 rounded-4 shadow-sm bg-white">
    <i class="i-lucide:search" />
    <input
      v-model="searchTerm"
      type="search"
      :placeholder="props.placeholder"
      class="core-search-bar__input flex-grow p-1 border-none outline-none text-black bg-transparent"
      @input="handleInput"
    >

    <CoreButton
      variant="filled"
      :disabled="!searchTerm"
      @click="handleClear"
    >
      <i class="i-lucide:x" />
    </CoreButton>
  </div>
</template>

<style lang="postcss" scoped>
/* Disable default clear controls for search inputs */
.core-search-bar__input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
  display: none;
}

.core-search-bar__input[type='search']::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
</style>
