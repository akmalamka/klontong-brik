<template>
  <nav class="fixed left-0 top-0 z-10 w-screen transition-colors,opacity-280">
    <div class="h-$navbar-height flex items-center justify-between container mx-auto">
      <RouterLink to="/" aria-label="Go to home">
        <img src="./assets/logo-full.svg" class="h-10" alt="Klontong Logo">
      </RouterLink>
      <RouterLink to="/manage" aria-label="Go to manage product" class="h4">
        Manage Products
      </RouterLink>
      <RouterLink to="/login" aria-label="Go to login" class="h4">
        Login
      </RouterLink>
    </div>
  </nav>
  <main class="pt-$navbar-height min-h-[calc(100dvh-var(--navbar-height))]">
    <RouterView />
  </main>
</template>
