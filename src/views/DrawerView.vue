<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { VisuallyHidden } from 'radix-vue'
import { DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTitle } from 'vaul-vue'
import { useDrawerStore } from '@/stores/drawer'

const drawerStore = useDrawerStore()

const { drawerTitle } = storeToRefs(drawerStore)

function handleOpenChange(newOpenState: boolean) {
  // Update your store's state to match the drawer's requested new state
  if (!newOpenState) {
    drawerStore.closeDrawer()
  }
}
</script>

<template>
  <DrawerRoot
    :open="drawerStore.isOpen"
    direction="right"
    @update:open="handleOpenChange"
  >
    <DrawerPortal>
      <DrawerOverlay
        class="fixed inset-0 z-50 data-[state=closed]:animate-out data-[state=open]:animate-in bg-black/80 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
      />

      <DrawerContent
        class="fixed bottom-0 left-0 right-0 top-0 z-50 bg-white md:(left-unset w-45%)"
      >
        <!-- To prevent dialog description missing warning, dialog description must be added -->
        <VisuallyHidden>
          <DrawerDescription />
        </VisuallyHidden>

        <DrawerTitle>
          <div class="flex items-center justify-between px-4 py-5 md:(gap-x-4 body-text)">
            {{ drawerTitle }}
            <DrawerClose class="w-10 h-10 flex justify-center items-center rounded-full bg-black color-white">
              <i
                class="i-lucide:x"
              />
            </DrawerClose>
          </div>
        </DrawerTitle>

        <div class="h-[calc(100dvh-var(--navbar-height))] overflow-y-auto px-5">
          <slot />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
