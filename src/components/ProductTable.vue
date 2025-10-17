<script setup lang="ts">
import type { CellContext, ColumnDef, ColumnFiltersState, Table } from '@tanstack/vue-table'
import type { Product } from '@/stores/products'
import { FlexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table'
import { storeToRefs } from 'pinia'
import { computed, h, ref } from 'vue'
import CoreAlert from '@/core/CoreAlert.vue'
import CoreButton from '@/core/CoreButton.vue'
import CoreSearchBar from '@/core/CoreSearchBar.vue'
import { CoreTable, CoreTableBody, CoreTableCell, CoreTableHead, CoreTableHeader, CoreTableRow } from '@/core/table'
import { useDrawerStore } from '@/stores/drawer'
import { useProductsStore } from '@/stores/products'
import { valueUpdater } from '@/utils.ts'

const productsStore = useProductsStore()
const drawerStore = useDrawerStore()
const { enrichedProducts } = storeToRefs(productsStore)
const { deleteProduct, getProductById } = productsStore
const { openAddProduct, openEditProduct, openViewProduct } = drawerStore

const columnFilters = ref<ColumnFiltersState>([])

const globalFilter = computed<string>(() => {
  const nameFilter = columnFilters.value.find(f => f.id === 'name')
  return nameFilter ? nameFilter.value as string : ''
})

function handleDeleteConfirmed(productId?: string) {
  if (productId !== undefined) {
    deleteProduct(productId)
  }
}

function handleViewProduct(productId?: string) {
  if (productId !== undefined) {
    const currentProduct = getProductById(productId)
    if (currentProduct) {
      openViewProduct(currentProduct)
    }
  }
}
function handleEditProduct(productId?: string) {
  if (productId !== undefined) {
    const currentProduct = getProductById(productId)
    if (currentProduct) {
      openEditProduct(currentProduct)
    }
  }
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }: CellContext<Product, unknown>) => row.original.sku,
    enableSorting: false,
  },
  {
    accessorKey: 'categoryName',
    header: 'Category',
    cell: ({ row }: CellContext<Product, unknown>) => h('div', { class: 'capitalize' }, row.original.categoryName),
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    header: () => h('div', { class: 'text-right' }, 'Price'),
    cell: ({ row }: CellContext<Product, unknown>) => {
      const price: number = row.original.price
      const formatted: string = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
      }).format(price)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    enableSorting: false,
    header: 'Actions',
    cell: ({ row }: CellContext<Product, unknown>) => {
      const product: Product = row.original

      const deleteButton = h(CoreButton, {
        class: 'bg-error color-white',
      }, () => [
        h('i', { class: 'i-lucide:trash-2' }),
        'Delete',
      ])

      const deleteAlert = h(CoreAlert, {
        'title': 'Delete this product?',
        'description': `This action will remove ${product.name} from your inventory. You won’t be able to undo this action.`,
        'cancel-text': 'Cancel',
        'apply-text': 'Delete product',
        'onApply': () => handleDeleteConfirmed(product._id),
      }, {
        default: () => deleteButton,
      })
      return h('div', { class: 'flex gap-2' }, [
        h(CoreButton, { onClick: () => handleViewProduct(product._id) }, () => 'View'),
        h(CoreButton, { class: 'bg-info color-white', onClick: () => handleEditProduct(product._id) }, () => [h('i', { class: 'i-lucide:edit' }), 'Edit']),
        deleteAlert,
      ])
    },
  },
]

const table: Table<Product> = useVueTable({
  data: enrichedProducts,
  columns,
  // Feature Models
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),

  // State Handlers
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),

  // State Object
  state: {
    get columnFilters() { return columnFilters.value },
  },
})

function updateSearchTerm(value: string | number | null): void {
  table.getColumn('name')?.setFilterValue(value)
}
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between py-4">
      <CoreSearchBar
        :model-value="globalFilter"
        :debounce-time="400"
        placeholder="Search product..."
        class="w-1/2"
        @update:model-value="updateSearchTerm"
      />
      <CoreButton class="bg-primary color-white" @click="openAddProduct">
        <i class="i-lucide:plus" />
        Add Product
      </CoreButton>
    </div>
    <div class="rounded-md border">
      <CoreTable>
        <CoreTableHeader>
          <CoreTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <CoreTableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </CoreTableHead>
          </CoreTableRow>
        </CoreTableHeader>

        <CoreTableBody>
          <template v-if="table.getRowModel().rows?.length">
            <CoreTableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <CoreTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </CoreTableCell>
            </CoreTableRow>
          </template>

          <CoreTableRow v-else>
            <CoreTableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </CoreTableCell>
          </CoreTableRow>
        </CoreTableBody>
      </CoreTable>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 body-text text-muted-foreground">
        Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
      </div>
      <div class="space-x-2">
        <!-- TODO: make the button outline -->
        <CoreButton
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </CoreButton>
        <CoreButton
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </CoreButton>
      </div>
    </div>
  </div>
</template>
