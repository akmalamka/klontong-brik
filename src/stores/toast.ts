import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ToastMessage {
  id: number
  title: string
  description: string
  type: 'success' | 'error' | 'info'
}

export const useToastStore = defineStore('toast', () => {
  const messages = ref<ToastMessage[]>([])

  // Use a counter to ensure unique IDs for each toast
  let nextId = 0

  /**
   * Adds a new message to the queue to be displayed.
   */
  function showToast(title: string, description: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const newMessage: ToastMessage = {
      id: nextId++,
      title,
      description,
      type,
    }
    // Add the new message to the queue
    messages.value.push(newMessage)
  }

  /**
   * Removes a toast message when it's closed (either manually or by timeout).
   */
  function removeToast(id: number): void {
    messages.value = messages.value.filter(m => m.id !== id)
  }

  return {
    messages,
    showToast,
    removeToast,
  }
})
