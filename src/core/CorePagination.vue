<script setup lang="ts">
import { PaginationEllipsis, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, PaginationRoot } from 'radix-vue'

interface PaginationProps {
  disabled?: boolean
  totalItems?: number
  itemsPerPage: number
  topPaginationRef?: HTMLElement
}

const { topPaginationRef } = defineProps<PaginationProps>()

function scrollToTopPagination() {
  // TODO: check what's the reason sometimes it scroll up sometimes it doesn't
  topPaginationRef?.scrollIntoView()
}
</script>

<template>
  <PaginationRoot
    :total="totalItems"
    :sibling-count="0"
    show-edges
    :disabled
    :default-page="1"
    :items-per-page="itemsPerPage"
    @update:page="scrollToTopPagination"
  >
    <PaginationList
      v-slot="{ items }"
      class="text-body-medium color-primary flex items-center gap-2"
    >
      <PaginationPrev class="mr-4 size-10 flex items-center justify-center rounded-full hover:bg-black/5 disabled:opacity-50 focus-within:outline-1 focus-within:outline-offset-1 focus-within:outline">
        <i
          class="i-lucide:chevron-left"
        />
      </PaginationPrev>
      <template v-for="(page, index) in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="data-[selected]:bg-primary data-[selected]:color-white data-[selected]:hover:bg-primary/90 size-10 border rounded-full transition hover:bg-black/5 focus-within:outline-1 focus-within:outline-offset-1 focus-within:outline"
          :value="page.value"
        >
          {{ page.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="size-10 flex items-center justify-center"
        >
          &#8230;
        </PaginationEllipsis>
      </template>
      <PaginationNext class="ml-4 size-10 flex items-center justify-center rounded-full hover:bg-black/5 disabled:opacity-50 focus-within:outline-1 focus-within:outline-offset-1 focus-within:outline">
        <i
          class="i-lucide:chevron-right"
        />
      </PaginationNext>
    </PaginationList>
  </PaginationRoot>
</template>
