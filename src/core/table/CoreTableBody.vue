<script setup lang="ts">

</script>

<template>
  <tbody
    data-slot="table-body"
    class="[&_tr:last-child]:border-0"
  >
    <slot />
  </tbody>
</template>
