import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ManageView from '@/views/ManageView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/manage',
    component: ManageView,
    meta: {
      requiresAuth: true,
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const user = useCurrentUser()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user.value?.emailVerified) {
      next()
    }
    else {
      next('/login')
    }
  }
  else {
    next()
  }
})

/** Setup Vue Router */
export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
