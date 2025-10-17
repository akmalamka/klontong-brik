<script setup lang="ts">
</script>

<template>
  <thead
    data-slot="table-header"
    class="[&_tr]:border-b"
  >
    <slot />
  </thead>
</template>
