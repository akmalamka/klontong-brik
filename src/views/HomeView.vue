<script lang="ts" setup>
import { useCurrentUser } from 'vuefire'
import CoreButton from '@/core/CoreButton.vue'

const user = useCurrentUser()
</script>

<template>
  <section class="container relative h-full flex flex-col items-center justify-center gap-6 text-center color-white">
    <div class="background-radial-blur" />
    {{ user?.email }}

    <h1 class="h1">
      {{ user ? 'Welcome back! 👋' : 'Simplify your food inventory' }}
    </h1>
    <p class="body-text">
      {{ user ? 'Easily manage and track your food inventory from one place.' : 'Track, organize, and manage ingredients effortlessly — all in one dashboard.' }}
    </p>
    <CoreButton v-if="user" to="/manage">
      Manage Products
    </CoreButton>
    <CoreButton v-else to="/login">
      Get Started
    </CoreButton>
  </section>
</template>

<style lang="postcss" scoped>

</style>
