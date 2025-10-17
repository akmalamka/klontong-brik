import type { Category } from '@/api/categoryApi'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchAllCategories } from '@/api/categoryApi'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const isLoading = ref(false)

  // === GETTERS ===
  /** Returns a Map for fast lookup of category names by categoryId. */
  const categoryMap = computed(() => {
    const map = new Map<number, string>()
    categories.value.forEach((c) => {
      map.set(c.categoryId, c.categoryName)
    })
    return map
  })

  /** Function to retrieve category name by categoryId */
  const getCategoryName = computed(() => {
    return (categoryId: number) => categoryMap.value.get(categoryId) || 'Unknown Category'
  })

  // === ACTIONS ===
  async function fetchCategories() {
    isLoading.value = true
    try {
      categories.value = await fetchAllCategories()
    }
    catch (error) {
      console.error('API Category Fetch Error:', error)
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    // State
    categories,
    isLoading,
    // Getters
    getCategoryName,
    // Actions
    fetchCategories,
  }
})
