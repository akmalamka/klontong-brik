<script lang="ts" setup>
import { computed, ref } from 'vue'
import productsData from '@/assets/dummyProducts.json'
import CoreButton from '@/core/CoreButton.vue'
import CorePagination from '@/core/CorePagination.vue'

const products = ref(productsData)
const currentPage = ref(1)
// TODO: update ITEMS_PER_PAGE
const ITEMS_PER_PAGE = 3

const displayedProducts = computed(() => {
  return products.value.slice(
    (currentPage.value - 1) * ITEMS_PER_PAGE,
    currentPage.value * ITEMS_PER_PAGE,
  )
})

const productListRef = ref<HTMLElement>()
</script>

<template>
  <section ref="productListRef" class="container flex flex-col items-center justify-center gap-12 pb-16">
    <h1 class="h1">
      Manage Products
    </h1>
    <div>
      Searchbar
    </div>
    <div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="product in displayedProducts" :key="product.id" class="flex flex-col gap-4">
        <img :src="product.image" alt="Product Image" class="w-full h-auto rounded-4">
        <div class="caption py-1 px-2 bg-[#414142] rounded-4 w-fit color-white">
          {{ product.categoryName }}
        </div>
        <span class="h3">
          IDR {{ product.price.toLocaleString() }}
        </span>
        <span class="h4">
          {{ product.name }}
        </span>
        <div class="flex gap-4 flex-wrap">
          <CoreButton class="bg-info color-white flex-1">
            <i class="i-lucide:edit" />
            Edit
          </CoreButton>
          <CoreButton class="bg-error color-white flex-1">
            <i class="i-lucide:trash-2" />
            Delete
          </CoreButton>
          <CoreButton class="grow-2" :to="`/manage/${product.id}`">
            View Details
          </CoreButton>
        </div>
      </div>
    </div>
    <CorePagination
      v-model:page="currentPage"
      :total-items="products.length"
      :items-per-page="ITEMS_PER_PAGE"
      :top-pagination-ref="productListRef"
    />
  </section>
</template>

<style lang="postcss" scoped>

</style>
