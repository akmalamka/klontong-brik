<script lang="ts" setup>
import CoreButton from '@/core/CoreButton.vue'
</script>

<template>
  <section class="container relative h-full flex flex-col items-center justify-center gap-6 text-center color-white">
    <div class="background-radial-blur" />

    <h1 class="h1">
      Simplify your food inventory
    </h1>
    <p class="body-text">
      Track, organize, and manage ingredients effortlessly — all in one dashboard.
    </p>
    <CoreButton to="/login">
      Get Started
    </CoreButton>
  </section>
</template>

<style lang="postcss" scoped>

</style>
