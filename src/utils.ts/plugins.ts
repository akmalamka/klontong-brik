import type { PiniaPluginContext } from 'pinia'

const STORAGE_PREFIX = 'pinia_'

function localStoragePlugin({ store }: PiniaPluginContext) {
  const storageKey = STORAGE_PREFIX + store.$id

  let storedState = null
  try {
    storedState = localStorage.getItem(storageKey)
  }
  catch (error) {
    console.error(`Error accessing localStorage for ${store.$id}:`, error)
  }

  // If no stored state, save the default state immediately
  if (!storedState) {
    try {
      // The current 'state' object here is the default state
      localStorage.setItem(storageKey, JSON.stringify(store.$state))
    }
    catch (error) {
      console.error(`Error saving default state for ${store.$id}:`, error)
    }
  }
  // If stored state exist, patch the store
  else {
    try {
      store.$patch(JSON.parse(storedState))
    }
    catch (error) {
      console.error(`Error loading state for ${store.$id}:`, error)
    }
  }

  //  Subscribe for changes
  store.$subscribe((_mutation, state) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state))
    }
    catch (error) {
      console.error(`Error saving state on change for ${store.$id}:`, error)
    }
  }, { detached: true })
}

export default localStoragePlugin
