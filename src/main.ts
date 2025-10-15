import { createApp } from 'vue'
import { getCurrentUser, VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase'
import App from './App.vue'
import { setupRouter } from './router'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './styles.css'

(async () => {
  const app = createApp(App)

  app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })

  // We need this to make sure we get the user before app mounted
  await getCurrentUser()

  // Init Router
  await setupRouter(app)

  // mount app
  app.mount('#app')
})()
