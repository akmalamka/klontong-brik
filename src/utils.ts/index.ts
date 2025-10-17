import type { Ref } from 'vue'

// A utility function to update a ref's value, either by setting it directly or via an updater function.
export function valueUpdater<T>(updaterOrValue: T | ((prev: T) => T), ref: Ref<T>) {
  ref.value = typeof updaterOrValue === 'function'
    ? (updaterOrValue as (prev: T) => T)(ref.value)
    : updaterOrValue
}
