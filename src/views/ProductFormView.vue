<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'
import CoreButton from '@/core/CoreButton.vue'
import CoreInputField from '@/core/CoreInputField.vue'
import { useProductsStore } from '@/stores/products'

interface Category {
  categoryId: number
  categoryName: string
}

const categories: Category[] = [
  { categoryId: 1, categoryName: 'Snacks' },
  { categoryId: 2, categoryName: 'Beverages' },
  { categoryId: 3, categoryName: 'Dairy & Eggs' },
  { categoryId: 4, categoryName: 'Produce' },
  { categoryId: 5, categoryName: 'Meats & Seafood' },
  { categoryId: 6, categoryName: 'Bakery' },
  { categoryId: 7, categoryName: 'Household' },
  { categoryId: 8, categoryName: 'Personal Care' },
  { categoryId: 9, categoryName: 'Frozen Goods' },
  { categoryId: 10, categoryName: 'Canned Goods' },
]

const schema = yup.object({
  category: yup
    .number()
    .oneOf(categories.map(c => c.categoryId), 'Invalid category selected')
    .required('Category is required'),
  name: yup
    .string()
    .trim()
    .required('Product name is required')
    .max(100, 'Name must be 100 characters or less'),
  description: yup
    .string()
    .trim()
    .max(500, 'Description must be 500 characters or less'),
  image: yup
    .string()
    .url('Must be a valid URL')
    .required('Image URL is required'),
  sku: yup
    .string()
    .trim()
    .required('SKU is required')
    .max(50, 'SKU must be 50 characters or less'),
  weight: yup
    .number()
    .required('Weight is required')
    .min(0.01, 'Weight must be greater than 0'),
  width: yup
    .number()
    .required('Width is required')
    .min(0.01, 'Width must be greater than 0'),
  length: yup
    .number()
    .required('Length is required')
    .min(0.01, 'Length must be greater than 0'),
  height: yup
    .number()
    .required('Height is required')
    .min(0.01, 'Height must be greater than 0'),
  price: yup
    .number()
    .required('Price is required')
    .min(0.01, 'Price must be greater than 0'),
})

const { handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    category: undefined, // undefined for number fields
    name: '',
    description: '',
    image: '',
    sku: '',
    weight: undefined,
    width: undefined,
    length: undefined,
    height: undefined,
    price: 0,
  },
})

// Define all fields for v-model binding
const { value: category } = useField<number | undefined>('category')
const { value: name } = useField<string>('name')
const { value: description } = useField<string>('description')
const { value: image } = useField<string>('image')
const { value: sku } = useField<string>('sku')
const { value: weight } = useField<number | undefined>('weight')
const { value: width } = useField<number | undefined>('width')
const { value: length } = useField<number | undefined>('length')
const { value: height } = useField<number | undefined>('height')
const { value: price } = useField<number>('price')

const formError = ref('')
const successMessage = ref('')

const productsStore = useProductsStore()
const { addProduct } = productsStore

// --- 4. Submission Handler ---
const onSubmit = handleSubmit(async (values) => {
  formError.value = ''
  successMessage.value = ''

  const selectedCategory = categories.find(c => c.categoryId === values.category)
  if (!selectedCategory) {
    formError.value = 'Invalid category selected. Please refresh and try again.'
    return
  }

  // Here you would replace the setTimeout with your actual API call
  // console.log('Product Data to Submit:', values)

  const { category, ...rest } = values

  const productData = {
    ...rest,
    categoryId: selectedCategory.categoryId,
    categoryName: selectedCategory.categoryName,
  }

  try {
    // 1. Call the store action

    addProduct(productData)

    // 2. Add a small artificial delay to show 'Logging in...' state (optional but good practice)
    await new Promise(resolve => setTimeout(resolve, 500))

    // 3. Handle success
    successMessage.value = `Successfully added product: ${productData.name}`
    resetForm() // Clear the form fields after success
  }
  catch (err: any) {
    // Handle any potential errors from the addProduct function (e.g., store validation)
    console.error('Submission Error:', err)
    formError.value = 'Failed to save product. Please check your connection and try again.'
  }
})
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">
      Add New Product
    </h1>
    <form class="flex flex-col gap-6 w-full" @submit.prevent="onSubmit">
      <div>
        <label for="category" class="body-text block mb-1 font-medium">Category</label>
        <select
          id="category"
          v-model="category"
          class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
          :class="{ 'border-error': errors.category }"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option v-for="cat in categories" :key="cat.categoryId" :value="cat.categoryId">
            {{ cat.categoryName }}
          </option>
        </select>
        <p v-if="errors.category" class="text-error text-sm mt-1">
          {{ errors.category }}
        </p>
      </div>

      <div>
        <label for="name" class="body-text block mb-1 font-medium">Product Name</label>
        <CoreInputField
          id="name"
          v-model="name"
          type="text"
          placeholder="e.g., Crispy Potato Chips"
          :invalid="!!errors.name"
        />
        <p v-if="errors.name" class="text-error text-sm mt-1">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <label for="description" class="body-text block mb-1 font-medium">Description</label>
        <textarea
          id="description"
          v-model="description"
          rows="3"
          placeholder="Brief description of the product..."
          class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
          :class="{ 'border-error': errors.description }"
        />
        <p v-if="errors.description" class="text-error text-sm mt-1">
          {{ errors.description }}
        </p>
      </div>

      <div>
        <label for="image" class="body-text block mb-1 font-medium">Image URL</label>
        <CoreInputField
          id="image"
          v-model="image"
          type="url"
          placeholder="https://example.com/product.jpg"
          :invalid="!!errors.image"
        />
        <p v-if="errors.image" class="text-error text-sm mt-1">
          {{ errors.image }}
        </p>
      </div>

      <div>
        <label for="sku" class="body-text block mb-1 font-medium">SKU (Stock Keeping Unit)</label>
        <CoreInputField
          id="sku"
          v-model="sku"
          type="text"
          placeholder="SKU-12345"
          :invalid="!!errors.sku"
        />
        <p v-if="errors.sku" class="text-error text-sm mt-1">
          {{ errors.sku }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="price" class="body-text block mb-1 font-medium">Price (IDR)</label>
          <CoreInputField
            id="price"
            v-model.number="price"
            type="number"
            placeholder="0.00"
            :invalid="!!errors.price"
          />
          <p v-if="errors.price" class="text-error text-sm mt-1">
            {{ errors.price }}
          </p>
        </div>

        <div>
          <label for="weight" class="body-text block mb-1 font-medium">Weight (kg)</label>
          <CoreInputField
            id="weight"
            v-model.number="weight"
            type="number"
            step="0.01"
            placeholder="0.00"
            :invalid="!!errors.weight"
          />
          <p v-if="errors.weight" class="text-error text-sm mt-1">
            {{ errors.weight }}
          </p>
        </div>
      </div>

      <h2 class="text-lg font-semibold mt-4 mb-2">
        Package Dimensions (cm)
      </h2>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label for="width" class="body-text block mb-1 font-medium">Width</label>
          <CoreInputField
            id="width"
            v-model.number="width"
            type="number"
            step="0.01"
            placeholder="0.00"
            :invalid="!!errors.width"
          />
          <p v-if="errors.width" class="text-error text-sm mt-1">
            {{ errors.width }}
          </p>
        </div>

        <div>
          <label for="length" class="body-text block mb-1 font-medium">Length</label>
          <CoreInputField
            id="length"
            v-model.number="length"
            type="number"
            step="0.01"
            placeholder="0.00"
            :invalid="!!errors.length"
          />
          <p v-if="errors.length" class="text-error text-sm mt-1">
            {{ errors.length }}
          </p>
        </div>

        <div>
          <label for="height" class="body-text block mb-1 font-medium">Height</label>
          <CoreInputField
            id="height"
            v-model.number="height"
            type="number"
            step="0.01"
            placeholder="0.00"
            :invalid="!!errors.height"
          />
          <p v-if="errors.height" class="text-error text-sm mt-1">
            {{ errors.height }}
          </p>
        </div>
      </div>

      <p v-if="formError" class="text-error text-sm mt-3">
        {{ formError }}
      </p>
      <p v-if="successMessage" class="text-green-500 text-sm mt-3 font-medium">
        {{ successMessage }} 🎉
      </p>

      <CoreButton
        type="submit"
        :disabled="isSubmitting"
        class="w-full py-3 mt-4 rounded-lg bg-black text-white hover:bg-gray-800 transition disabled:bg-gray-400"
      >
        {{ isSubmitting ? 'Saving Product...' : 'Add Product' }}
      </CoreButton>
    </form>
  </div>
</template>
