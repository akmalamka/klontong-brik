<template>
  <h1>Hello App!</h1>
  <nav>
    <RouterLink to="/">
      Go to Home
    </RouterLink>
    <RouterLink to="/login">
      Go to Login
    </RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
