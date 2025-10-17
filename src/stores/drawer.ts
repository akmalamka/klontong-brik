import type { Product } from './products'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type DrawerMode = 'closed' | 'add' | 'edit' | 'view'

export const useDrawerStore = defineStore('drawer', () => {
  /** Current mode of the drawer: 'closed', 'add', 'edit', or 'view' */
  const mode = ref<DrawerMode>('closed')
  const drawerTitle = ref<string>('')

  /** Data of the product being viewed or edited (null if in 'add' mode or 'closed') */
  const currentProduct = ref<Product | null>(null)

  /** True if the drawer is open (not 'closed') */
  const isOpen = computed(() => mode.value !== 'closed')

  /** Returns the data of the product currently being handled. */
  const productData = computed(() => currentProduct.value)

  /** Returns the current drawer mode. */
  const drawerMode = computed(() => mode.value)

  // --- Actions ---
  /**
   * Sets the drawer state to 'add' mode. Clears any existing product data.
   */
  function openAddProduct(): void {
    mode.value = 'add'
    drawerTitle.value = 'Add New Product'
    currentProduct.value = null // Ensure no residual data
  }

  /**
   * Sets the drawer state to 'edit' mode and saves the product data.
   * @param data The full product data object to be edited.
   */
  function openEditProduct(data: Product): void {
    mode.value = 'edit'
    drawerTitle.value = 'Edit Product'
    currentProduct.value = data
  }

  /**
   * Sets the drawer state to 'view' mode and saves the product data.
   * @param data The full product data object to be viewed.
   */
  function openViewProduct(data: Product): void {
    mode.value = 'view'
    drawerTitle.value = 'Product Details'
    currentProduct.value = data
  }

  /**
   * Closes the drawer and clears the product data.
   */
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
    productData,
    drawerMode,
    openAddProduct,
    openEditProduct,
    openViewProduct,
    closeDrawer,
  }
})
