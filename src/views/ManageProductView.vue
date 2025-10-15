<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productsData from '@/assets/dummyProducts.json'
import CoreButton from '@/core/CoreButton.vue'

const route = useRoute()
const router = useRouter()
const productId = computed(() => {
  const idString = route.params.productId
  return idString ? Number(idString) : null
})

const productDetail = computed(() => {
  return productsData.find(product => product.id === productId.value)
})

if (!productDetail.value) {
  router.push('/manage')
}
</script>

<template>
  <section v-if="productDetail" class="container flex items-center justify-center gap-12">
    <img :src="productDetail.image" alt="Product Image" class="max-w-[600px] h-auto rounded-4">
    <div class="flex flex-col gap-8">
      <h1 class="h2">
        {{ productDetail.name }}
      </h1>
      <div class="caption py-1 px-2 bg-[#414142] rounded-4 w-fit color-white">
        {{ productDetail.categoryName }}
      </div>
      <span class="h3">
        IDR {{ productDetail.price.toLocaleString() }}
      </span>
      <div>
        <span class="h4">Description</span>
        <p class="body-text-small">
          {{ productDetail.description }}
        </p>
      </div>
      <div>
        <span class="h4">Details</span>
        <ul class="list-disc list-inside body-text-small">
          <li>Weight: {{ productDetail.weight }} grams</li>
          <li>Length: {{ productDetail.length }} cm</li>
          <li>Height: {{ productDetail.height }} cm</li>
          <li>Width: {{ productDetail.width }} cm</li>
        </ul>
      </div>
      <div class="flex gap-4">
        <CoreButton class="bg-info color-white">
          <i class="i-lucide:edit" />
          Edit
        </CoreButton>
        <CoreButton class="bg-error color-white">
          <i class="i-lucide:trash-2" />
          Delete
        </CoreButton>
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>

</style>
