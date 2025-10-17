import type { Product } from '@/stores/products' // Assuming your stores are in src/stores
import { BASE_URL } from './constants'

const PRODUCTS_BASE_URL = `${BASE_URL}/products`

export type NewProductPayload = Omit<Product, '_id'>
export type UpdateProductPayload = Omit<Product, '_id'>

/**
 * Fetches all products from the API.
 */
export async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_BASE_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }
  return response.json() as Promise<Product[]>
}

/**
 * Creates a new product on the API.
 */
export async function createProduct(productData: NewProductPayload): Promise<Product> {
  const response = await fetch(PRODUCTS_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    throw new Error(`Failed to create product: ${response.statusText}`)
  }
  return response.json() as Promise<Product>
}

/**
 * Updates an existing product on the API.
 */
export async function updateProduct(_id: string, productData: UpdateProductPayload): Promise<void> {
  const response = await fetch(`${PRODUCTS_BASE_URL}/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    throw new Error(`Failed to update product: ${response.statusText}`)
  }
}

/**
 * Deletes a product from the API.
 */
export async function deleteProductApi(_id: string): Promise<void> {
  const response = await fetch(`${PRODUCTS_BASE_URL}/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete product: ${response.statusText}`)
  }
}
