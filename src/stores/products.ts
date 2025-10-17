import type { NewProductPayload } from '@/api/productApi'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { createProduct, deleteProductApi, fetchAllProducts, updateProduct } from '@/api/productApi'
import { useCategoryStore } from './categories'

export interface Product {
  _id: string
  categoryId: number
  image: string
  sku: string
  name: string
  description: string
  weight: number
  width: number
  length: number
  height: number
  price: number
}

export interface EnrichedProduct extends Product {
  categoryName: string
}

export const useProductsStore = defineStore('products', () => {
  const categoryStore = useCategoryStore()

  const products = ref<Product[]>([])
  const isLoading = ref(false)

  // === GETTERS ===
  const totalProducts = computed(() => products.value.length)

  const enrichedProducts = computed<EnrichedProduct[]>(() => {
    return products.value.map(product => ({
      ...product,
      categoryName: categoryStore.getCategoryName(product.categoryId),
    }))
  })

  const getProductById = computed(() => {
    return (_id: string) => enrichedProducts.value.find(p => p._id === _id)
  })

  // === ACTIONS ===

  async function fetchProducts() {
    isLoading.value = true
    try {
      // Ensure categories are fetched before products for enrichment to work
      await categoryStore.fetchCategories()
      products.value = await fetchAllProducts()
    }
    catch (error) {
      console.error('API Fetch Error:', error)
    }
    finally {
      isLoading.value = false
    }
  }

  async function addProduct(productData: NewProductPayload) {
    try {
      await createProduct(productData)
      await fetchProducts() // Re-fetch all to ensure all state in sync
    }
    catch (error) {
      console.error('API Add Error:', error)
    }
  }

  async function editProduct(updatedProduct: Product) {
    const { _id, ...payload } = updatedProduct

    try {
      await updateProduct(_id, payload)

      products.value = products.value.map(p =>
        p._id === _id ? updatedProduct : p,
      )
    }
    catch (error) {
      console.error('API Edit Error:', error)
    }
  }

  async function deleteProduct(_id: string) {
    try {
      await deleteProductApi(_id)

      products.value = products.value.filter(p => p._id !== _id)
    }
    catch (error) {
      console.error('API Delete Error:', error)
    }
  }

  // --------------------------------------------
  return {
    // State
    products,
    isLoading,

    // Getters
    totalProducts,
    enrichedProducts,
    getProductById,

    // Actions
    addProduct,
    editProduct,
    deleteProduct,
    fetchProducts,
  }
})
