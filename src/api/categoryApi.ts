import { BASE_URL } from './constants'

export interface Category {
  _id: string
  categoryId: number
  categoryName: string
}

const CATEGORIES_BASE_URL = `${BASE_URL}/categories`

/**
 * Fetches all categories from the API.
 */
export async function fetchAllCategories(): Promise<Category[]> {
  const response = await fetch(CATEGORIES_BASE_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`)
  }
  return response.json() as Promise<Category[]>
}
