<script setup lang="ts">
</script>

<template>
  <tr
    data-slot="table-row"
    class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
  >
    <slot />
  </tr>
</template>
