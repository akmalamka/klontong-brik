<script lang="ts" setup>
import { signOut } from 'firebase/auth'
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import CoreButton from './core/CoreButton.vue'
import { auth } from './firebase'

const route = useRoute()
const router = useRouter()

const isAuthPage = computed(() =>
  route.path === '/login' || route.path === '/register',
)

const user = useCurrentUser()

async function handleLogout() {
  try {
    await signOut(auth)
    router.push('/login')
  }
  catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <!-- TODO: add navbar in layout structure -->
  <nav v-if="!isAuthPage" class="fixed left-0 top-0 z-10 w-screen transition-colors,opacity-280">
    <div class="h-$navbar-height flex items-center justify-between container mx-auto">
      <RouterLink to="/" aria-label="Go to home">
        <img src="./assets/logo-full.svg" class="h-10" alt="Klontong Logo">
      </RouterLink>
      <RouterLink v-if="user" to="/manage" aria-label="Go to manage product" class="h4">
        Manage Products
      </RouterLink>

      <CoreButton v-if="user" aria-label="Logout" @click="handleLogout">
        Logout
      </CoreButton>
      <CoreButton v-else to="/login" aria-label="Go to login" class="h4">
        Login
      </CoreButton>
    </div>
  </nav>
  <main
    class="" :class="[
      { 'h-[100dvh]': isAuthPage },
      { 'mt-$navbar-height h-[calc(100dvh-var(--navbar-height))]': !isAuthPage }]"
  >
    <RouterView />
  </main>
</template>
