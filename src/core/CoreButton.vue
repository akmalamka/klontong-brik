<script lang="ts" setup>
import { RouterLink } from 'vue-router'

interface CoreButtonProps {
  to?: string
  variant?: 'filled'
  disabled?: boolean
}

withDefaults(defineProps<CoreButtonProps>(), {
  variant: 'filled',
  disabled: false,
})
</script>

<template>
  <Component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :target="to?.startsWith('/') ? undefined : '_blank'"
    class="core-button flex items-center justify-center gap-2 rounded-full text-center outline-none"
    :class="[
      `core-button--${variant}`]"
    :tabindex="disabled ? -1 : 0"
    :aria-disabled="disabled ? 'true' : 'false'"
  >
    <slot />
  </Component>
</template>

<style lang="postcss">
.core-button {
  @apply px-4 py-2 btn-text transition-colors transition-transform duration-280 md:hover:scale-102;
}
.core-button--filled {
  @apply bg-black color-white;
}
</style>
