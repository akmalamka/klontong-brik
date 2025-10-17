import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useIsDesktop() {
  const breakpoints = useBreakpoints(breakpointsTailwind)

  return breakpoints.greaterOrEqual('md')
}
