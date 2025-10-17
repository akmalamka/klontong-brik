import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import productsData from '@/assets/dummyProducts.json'

export interface Product {
  id: number
  categoryId: number
  categoryName: string
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

export type ProductSummary = Pick<Product, 'id' | 'categoryName' | 'name' | 'price'>

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>(productsData)

  const nextId = ref(productsData.length + 1)

  // === GETTERS ===
  const totalProducts = computed(() => products.value.length)

  /** Getter function that returns a function for lookup */
  const getProductById = computed(() => {
    return (id: number) => products.value.find(p => p.id === id)
  })

  // === ACTIONS ===

  /** Adds a new product to the store. */
  function addProduct(productData: Omit<Product, 'id'>) {
    const newProduct: Product = {
      ...productData,
      id: nextId.value, // Assign the next available ID
    }
    products.value = [...products.value, newProduct]
    nextId.value++ // Increment the ID counter
  }

  /** Updates an existing product. */
  function editProduct(updatedProduct: Product) {
    products.value = products.value.map((p) => {
    // If the IDs match, return the updated product.
      if (p.id === updatedProduct.id) {
        return updatedProduct
      }
      // Otherwise, return the original product object.
      return p
    })

    const wasUpdated = products.value.some(p => p.id === updatedProduct.id)
    if (!wasUpdated) {
      console.warn(`Product with ID ${updatedProduct.id} not found for editing.`)
    }
  }

  /** Deletes a product by its ID. */
  function deleteProduct(id: number) {
    const initialLength = products.value.length
    products.value = products.value.filter(p => p.id !== id)

    if (products.value.length >= initialLength) {
      console.warn(`Product with ID ${id} not found for deletion.`)
    }
  }

  /** Simulate an async operation. */
  async function fetchProducts() {
    await new Promise(resolve => setTimeout(resolve, 500))
    // console.log('Simulated product fetch complete.')
    // Logic to update products.value here
  }

  // --------------------------------------------
  return {
    // State
    products,
    nextId,

    // Getters
    totalProducts,
    getProductById,

    // Actions
    addProduct,
    editProduct,
    deleteProduct,
    fetchProducts,
  }
})
