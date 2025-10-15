<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import CoreButton from '@/core/CoreButton.vue'
import CoreInputField from '@/core/CoreInputField.vue'
import AuthView from './AuthView.vue'

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')

// TODO: handle submit logic
const onSubmit = handleSubmit(async () => {
  // console.log('Form submitted:', values)
})
</script>

<template>
  <AuthView>
    <h1 class="h4">
      Sign up for an account
    </h1>
    <form class="flex flex-col gap-4 w-full min-w-[500px]" @submit.prevent="onSubmit">
      <div>
        <label for="email" class="body-text">Email</label>
        <CoreInputField
          id="email"
          v-model="email"
          type="email"
          placeholder="you@example.com"
          :invalid="!!errors.email"
        />
        <p v-if="errors.email" class="text-error body-text mt-1">
          {{ errors.email }}
        </p>
      </div>
      <div>
        <label for="password" class="body-text">Password</label>
        <CoreInputField
          id="password"
          v-model="password"
          type="password"
          placeholder="••••••••"
          :invalid="!!errors.password"
        />
        <p v-if="errors.password" class="text-error body-text mt-1">
          {{ errors.password }}
        </p>
      </div>
      <div>
        <label for="confirmPassword" class="body-text">Confirm Password</label>
        <CoreInputField
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="••••••••"
          :invalid="!!errors.confirmPassword"
        />
        <p v-if="errors.confirmPassword" class="text-error body-text mt-1">
          {{ errors.confirmPassword }}
        </p>
      </div>
      <!-- TODO: update button styling for submit -->
      <CoreButton
        type="submit"
        :disabled="!!errors.email || !!errors.password || !!errors.confirmPassword || isSubmitting"
        class="w-full py-2 rounded-lg bg-black"
      >
        {{ isSubmitting ? 'Creating account...' : 'Create account' }}
      </CoreButton>
    </form>
    <RouterLink to="/login" class="underline color-info body-text">
      Already have an account? Log in
    </RouterLink>
  </AuthView>
</template>

<style lang="postcss" scoped>

</style>
