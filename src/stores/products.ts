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
  weight?: number
  width?: number
  length?: number
  height?: number
  price: number
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>(productsData)

  const nextId = ref(7) // State for generating unique IDs

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
    products.value.push(newProduct)
    nextId.value++ // Increment the ID counter
    // console.log(`Product added: ${newProduct.name}`)
  }

  /** Updates an existing product. */
  function editProduct(updatedProduct: Product) {
    const index = products.value.findIndex(p => p.id === updatedProduct.id)

    if (index !== -1) {
      // Replace the old product object with the new one
      products.value.splice(index, 1, updatedProduct)
      // console.log(`Product updated: ${updatedProduct.name}`)
    }
    else {
      console.warn(`Product with ID ${updatedProduct.id} not found for editing.`)
    }
  }

  /** Deletes a product by its ID. */
  function deleteProduct(id: number) {
    const initialLength = products.value.length
    products.value = products.value.filter(p => p.id !== id)

    if (products.value.length < initialLength) {
      // console.log(`Product with ID ${id} deleted.`)
    }
    else {
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
