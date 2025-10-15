<script lang="ts" setup>
import CoreButton from '@/core/CoreButton.vue'
import CoreInputField from '@/core/CoreInputField.vue'
</script>

<template>
  <section class="flex flex-col h-full w-full items-center justify-center gap-16">
    <img src="@/assets/logo-full.svg" class="h-20" alt="Klontong Logo">
    <div class="flex flex-col justify-center items-center px-6 py-8 gap-8 bg-white rounded-3">
      <h1 class="h4">
        Login
      </h1>
      <form class="flex flex-col gap-4 w-full min-w-[500px]">
        <CoreInputField placeholder="Email" class="mb-4 mt-6" />
        <CoreInputField placeholder="Password" type="password" class="mb-6" />
      </form>
      <CoreButton class="w-full">
        Login
      </CoreButton>
      <span class="body-text">Don't have an account? <RouterLink to="/register">Create one</RouterLink></span>
    </div>
  </section>
</template>

<style lang="postcss" scoped>

</style>
