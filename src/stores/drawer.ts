import type { EnrichedProduct } from './products'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type DrawerMode = 'closed' | 'add' | 'edit' | 'view'

export const useDrawerStore = defineStore('drawer', () => {
  const mode = ref<DrawerMode>('closed')
  const drawerTitle = ref<string>('')

  const currentProduct = ref<EnrichedProduct | null>(null)

  /** True if the drawer is open (not 'closed') */
  const isOpen = computed(() => mode.value !== 'closed')

  const drawerMode = computed(() => mode.value)

  // --- Actions ---
  function openAddProduct(): void {
    mode.value = 'add'
    drawerTitle.value = 'Add New Product'
    currentProduct.value = null // Ensure no residual data
  }

  function openEditProduct(data: EnrichedProduct): void {
    mode.value = 'edit'
    drawerTitle.value = 'Edit Product'
    currentProduct.value = data
  }

  function openViewProduct(data: EnrichedProduct): void {
    mode.value = 'view'
    drawerTitle.value = 'Product Details'
    currentProduct.value = data
  }

  function closeDrawer(): void {
    mode.value = 'closed'
    drawerTitle.value = ''
    currentProduct.value = null
  }

  return {
    mode,
    drawerTitle,
    currentProduct,
    isOpen,
    drawerMode,
    openAddProduct,
    openEditProduct,
    openViewProduct,
    closeDrawer,
  }
})
