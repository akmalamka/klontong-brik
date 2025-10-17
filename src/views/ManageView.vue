<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useDrawerStore } from '@/stores/drawer'
import DrawerView from './DrawerView.vue'
import ProductFormView from './ProductFormView.vue'
import TableView from './TableView.vue'

const drawerStore = useDrawerStore()

const { mode, currentProduct } = storeToRefs(drawerStore)
</script>

<template>
  <section class="container flex flex-col items-center justify-center gap-12 pb-16">
    <h1 class="h1">
      Manage Products
    </h1>
    <TableView />
    <DrawerView>
      <div v-if="mode === 'add'">
        <ProductFormView />
      </div>
      <div v-if="mode === 'view' && currentProduct" class="flex flex-col gap-4">
        <img :src="currentProduct.image" alt="Product Image" class="max-w-[200px] h-auto rounded-4">
        <h1 class="h2">
          {{ currentProduct.name }}
        </h1>
        <div class="caption py-1 px-2 bg-[#414142] rounded-4 w-fit color-white">
          {{ currentProduct.categoryName }}
        </div>
        <span class="h3">
          IDR {{ currentProduct.price.toLocaleString() }}
        </span>
        <div>
          <span class="h4">Description</span>
          <p class="body-text-sm">
            {{ currentProduct.description }}
          </p>
        </div>
        <div>
          <span class="h4">Details</span>
          <ul class="list-disc list-inside body-text-sm">
            <li>Weight: {{ currentProduct.weight }} grams</li>
            <li>Length: {{ currentProduct.length }} cm</li>
            <li>Height: {{ currentProduct.height }} cm</li>
            <li>Width: {{ currentProduct.width }} cm</li>
          </ul>
        </div>
      </div>
      <div v-else-if="mode === 'edit'">
        Edit product
      </div>
    </DrawerView>
  </section>
</template>

<style lang="postcss" scoped>

</style>
