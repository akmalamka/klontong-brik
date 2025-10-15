<script setup lang="ts">
import { useVModel } from '@vueuse/core'

interface CoreInputFieldProps {
  modelValue?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  class?: string
}

const props = withDefaults(defineProps<CoreInputFieldProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  invalid: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const modelValue = useVModel(
  props,
  'modelValue',
  emit,
)
</script>

<template>
  <input
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :aria-invalid="invalid"
    :value="modelValue"
    data-slot="input"
    class="body-text file:text-foreground placeholder:text-muted-foreground selection:bg-base selection:text-primary-foreground
           dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-black shadow-xs
           transition-[color,box-shadow] outline-none
           file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium
           disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
           focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
           aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
  >
</template>
