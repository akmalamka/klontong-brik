<script lang="ts" setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import CoreToast from './core/CoreToast.vue'
import LayoutNavigationMenu from './layouts/LayoutNavigationMenu.vue'

const route = useRoute()

const isAuthPage = computed(() =>
  route.path === '/login' || route.path === '/register',
)
</script>

<template>
  <LayoutNavigationMenu />
  <main
    :class="[
      { 'h-[100dvh]': isAuthPage },
      { 'mt-$navbar-height h-[calc(100dvh-var(--navbar-height))]': !isAuthPage }]"
  >
    <RouterView />
  </main>
  <CoreToast />
</template>
