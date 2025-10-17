<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from 'radix-vue'
import { useToastStore } from '@/stores/toast'

const store = useToastStore()
const { messages } = storeToRefs(store)

// 🔑 Helper to determine styling based on the message type
function getStyle(type: 'success' | 'error' | 'info') {
  switch (type) {
    case 'success':
      return 'bg-base border-success'
    case 'error':
      return 'bg-base bordererror'
    case 'info':
    default:
      return 'bg-base border-info'
  }
}
</script>

<template>
  <ToastProvider>
    <ToastRoot
      v-for="message in messages"
      :key="message.id"
      :class="getStyle(message.type)"
      class="rounded-4 px-4 py-4 border-3 text-black shadow-lg flex justify-between items-start data-[state=open]:animate-slideIn data-[state=closed]:animate-hide"
      :duration="5000"
      @update:open="(open) => { if (!open) store.removeToast(message.id) }"
    >
      <div class="flex flex-col gap-1">
        <ToastTitle class="body-text font-600">
          {{ message.title }}
        </ToastTitle>
        <ToastDescription class="body-text-sm">
          {{ message.description }}
        </ToastDescription>
      </div>
    </ToastRoot>

    <ToastViewport
      class="fixed bottom-0 right-0 p-6 flex flex-col gap-3 w-[390px] max-w-[100vw] list-none z-200 outline-none"
    />
  </ToastProvider>
</template>

<style lang="postcss" scoped>
@keyframes slideIn {
  from {
    transform: translateX(calc(100% + 24px));
  }
  to {
    transform: translateX(0);
  }
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
