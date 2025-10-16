<script setup lang="ts">
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import CoreButton from '@/core/CoreButton.vue'
import CoreInputField from '@/core/CoreInputField.vue'
import { auth } from '@/firebase'
import AuthView from './AuthView.vue'

const router = useRouter()
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
const error = ref('')

const onSubmit = handleSubmit(async ({ email, password }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)

    // redirect after success
    router.push('/')
  }
  catch (err: any) {
    if (err instanceof FirebaseError && err.code === 'auth/email-already-in-use') {
      error.value = 'Unfortunately, creating your account failed. An account already exists with this email address.'
    }
    else {
      error.value = 'Something went wrong, please try again.'
    }
  }
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
        <p v-if="error" class="text-error body-text mt-1">
          {{ error }}
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
