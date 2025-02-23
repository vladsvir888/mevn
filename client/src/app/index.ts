import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/index.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import { useUserStore } from '@/entities/user'

const pinia = createPinia()

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(ToastService)

const userStore = useUserStore()
userStore.loadFromLS()

export { app }
