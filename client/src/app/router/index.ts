import HomePage from '@/pages/home/ui/HomePage.vue'
import { RegistrationPage, LoginPage } from '@/pages/login'
import TestPage from '@/pages/test'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/entities/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: false },
  },
  {
    path: '/registration',
    component: RegistrationPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/test',
    component: TestPage,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if ((to.path === '/login' || to.path === '/registration') && userStore.isAuth) {
    next('/')
    return
  }

  if (to.meta.requiresAuth) {
    if (userStore.isAuth) {
      next()
      return
    }

    next('/login')
  } else {
    next()
  }
})

export { router }
