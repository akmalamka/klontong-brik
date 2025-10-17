<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
import { signOut } from 'firebase/auth'
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import { useIsDesktop } from '@/composables'
import CoreButton from '@/core/CoreButton.vue'
import CoreDrawer from '@/core/CoreDrawer.vue'
import { auth } from '@/firebase'
import { useDrawerStore } from '@/stores/drawer'

const route = useRoute()
const router = useRouter()
const isDesktop = useIsDesktop()
const drawerStore = useDrawerStore()

function handleOpenNav() {
  drawerStore.openDrawer()
}

/* We need to close the mobile menu if screensize is larger than md (768px) */
watch(
  isDesktop,
  (isDesktop_) => {
    if (isDesktop_) {
      drawerStore.closeDrawer()
    }
  },
)

// Close the mobile menu when route changes
watch(
  () => route.path,
  () => {
    drawerStore.closeDrawer()
  },
)

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

const refSentinel = ref()

const hasScrolled = ref(false)

useIntersectionObserver(
  refSentinel,
  ([elSentinel]) => {
    if (!elSentinel) {
      return
    }

    hasScrolled.value = !elSentinel.isIntersecting
  },
  {
    root: null,
    threshold: 0,
    // This is the height of the navbar in mobile but we make it a little bit smaller so that the blur can appear right away. It's too complicated to calculate it dynamically, so we just hardcode it.
    rootMargin: '20px',
  },
)
</script>

<template>
  <header
    v-if="!isAuthPage"
    :class="{
      'backdrop-blur-lg': hasScrolled,
    }" class="fixed left-0 top-0 z-10 w-screen transition-colors,opacity-280"
  >
    <div class="h-$navbar-height container mx-auto flex justify-between md:grid grid-cols-6 items-center">
      <RouterLink to="/" aria-label="Go to home col-span-1">
        <img src="@/assets/logo-full.svg" class="h-10" alt="Klontong Logo">
      </RouterLink>
      <div class="h4 hidden md:block col-span-4 text-center">
        <RouterLink v-if="user" to="/manage" aria-label="Go to manage product">
          Manage
        </RouterLink>
      </div>
      <div class="col-span-1 hidden md:block">
        <CoreButton v-if="user" aria-label="Logout" @click="handleLogout">
          Logout
        </CoreButton>
        <CoreButton v-else to="/login" aria-label="Go to login" class="h4">
          Login
        </CoreButton>
      </div>
      <button
        class="flex items-center justify-center relative w-10 h-10 rounded-full transition-colors-280 md:hidden bg-black"
        @click="handleOpenNav"
      >
        <i class="i-lucide:menu color-white" />
      </button>
      <CoreDrawer>
        <div class="px-9 py-12 h-full flex flex-col gap-4">
          <RouterLink v-if="user" to="/manage" aria-label="Go to manage product">
            Manage
          </RouterLink>
          <CoreButton v-if="user" aria-label="Logout" @click="handleLogout">
            Logout
          </CoreButton>
          <CoreButton v-else to="/login" aria-label="Go to login" class="h4">
            Login
          </CoreButton>
        </div>
      </CoreDrawer>
    </div>
  </header>
  <div
    ref="refSentinel"
    class="absolute h-1px w-full top-0"
  />
</template>
