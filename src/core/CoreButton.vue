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
    :disabled="disabled"
    :target="to?.startsWith('/') ? undefined : '_blank'"
    class="core-button"
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
  @apply px-4 py-2 btn-text bg-black color-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-4 transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none hover:scale-101 focus-visible:ring focus-visible:ring-primary focus-visible:ring-[2px] focus-visible:ring-offset-2 aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error
}
.core-button--filled {
  @apply bg-black color-white;
}
</style>
