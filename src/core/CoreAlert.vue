<script setup lang="ts">
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'radix-vue'
import CoreButton from './CoreButton.vue'

interface CoreAlertProps {
  title?: string
  description?: string

  cancelText?: string
  applyText?: string
}

const props = withDefaults(defineProps<CoreAlertProps>(), {
  title: 'Are you absolutely sure?',
  description: 'This action cannot be undone.',
  cancelText: 'Cancel',
  applyText: 'Confirm',
})

const emit = defineEmits<{
  apply: []
}>()

// --- Handlers ---
function handleApply() {
  emit('apply')
}
</script>

<template>
  <AlertDialogRoot>
    <AlertDialogTrigger as-child>
      <slot>
        <CoreButton class="bg-primary color-white">
          Open Alert
        </CoreButton>
      </slot>
    </AlertDialogTrigger>

    <AlertDialogPortal>
      <AlertDialogOverlay class="bg-black/40 fixed inset-0 z-30" />

      <AlertDialogContent
        class="z-[100] fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-2xl focus:outline-none"
      >
        <AlertDialogTitle class="m-0 body-text color-black">
          {{ props.title }}
        </AlertDialogTitle>

        <AlertDialogDescription class="mt-2 mb-5 body-text-sm color-black">
          {{ props.description }}
        </AlertDialogDescription>

        <div class="flex justify-end gap-3">
          <AlertDialogCancel>
            <CoreButton class="bg-white color-black">
              {{ props.cancelText }}
            </CoreButton>
          </AlertDialogCancel>

          <AlertDialogAction
            @click="handleApply"
          >
            <CoreButton class="bg-error color-white">
              {{ props.applyText }}
            </CoreButton>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style lang="postcss" scoped>
</style>
