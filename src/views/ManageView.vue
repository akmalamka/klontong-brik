<script lang="ts" setup>
import { ref } from 'vue'
import productsData from '@/assets/dummyProducts.json'
import CoreButton from '@/core/CoreButton.vue'
import CorePagination from '@/core/CorePagination.vue'

const products = ref(productsData)
const currentPage = ref(1)
const ITEMS_PER_PAGE = 3
</script>

<template>
  <section class="container flex flex-col items-center justify-center gap-12 pb-16">
    <h1 class="h1">
      Manage Products
    </h1>
    <div>
      Searchbar
    </div>
    <div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="product in products" :key="product.id" class="flex flex-col gap-4">
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
            Edit
          </CoreButton>
          <CoreButton class="bg-error color-white flex-1">
            Delete
          </CoreButton>
          <CoreButton class="grow-2">
            View Details
          </CoreButton>
        </div>
      </div>
    </div>
    <CorePagination
      v-model:page="currentPage"
      :total-items="products.length"
      :items-per-page="ITEMS_PER_PAGE"
    />
  </section>
</template>

<style lang="postcss" scoped>

</style>
