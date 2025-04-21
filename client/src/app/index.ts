import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'primeicons/primeicons.css'
import './styles/index.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
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

app.directive('tooltip', Tooltip)

const userStore = useUserStore()
userStore.loadFromLS()

export { app }
