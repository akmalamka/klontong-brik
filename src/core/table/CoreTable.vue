<script setup lang="ts">
</script>

<template>
  <div data-slot="table-container" class="relative w-full overflow-auto">
    <table data-slot="table" class="w-full caption-bottom body-text">
      <slot />
    </table>
  </div>
</template>
