<script setup lang="ts">
import { signInWithEmailAndPassword } from 'firebase/auth'
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
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const error = ref('')

const onSubmit = handleSubmit(async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)

    // redirect after success
    router.push('/')
  }
  catch (err: any) {
    if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-login-credentials' || err.code === 'auth/invalid-credential') {
      error.value = 'E-mail address or password is incorrect'
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
      Login
    </h1>
    <form class="flex flex-col gap-4 w-full md:min-w-[500px]" @submit.prevent="onSubmit">
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
      <p v-if="error" class="text-error body-text mt-1">
        {{ error }}
      </p>
      <!-- TODO: update button styling for submit -->
      <CoreButton
        type="submit"
        :disabled="!!errors.email || !!errors.password || isSubmitting"
        class="w-full py-2 rounded-lg bg-black"
      >
        {{ isSubmitting ? 'Logging in...' : 'Login' }}
      </CoreButton>
    </form>
    <span class="body-text">Don't have an account? <RouterLink to="/register" class="underline color-info">Create one</RouterLink></span>
  </AuthView>
</template>

<style lang="postcss" scoped>

</style>
