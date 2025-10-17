<script setup lang="ts">
</script>

<template>
  <section class="flex flex-col h-full w-full items-center justify-center gap-16">
    <img src="@/assets/logo-full.svg" class="w-40" alt="Klontong Logo">
    <div class="flex flex-col justify-center items-center px-6 py-8 gap-8 bg-white rounded-3">
      <slot />
    </div>
  </section>
</template>

<style lang="postcss" scoped>

</style>
