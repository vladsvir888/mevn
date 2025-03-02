import HomePage from '@/pages/home/ui/HomePage.vue'
import { RegistrationPage, LoginPage } from '@/pages/login'
import PersonalPage from '@/pages/personal'
import NotFoundPage from '@/pages/not-found'
import ArticlesPage from '@/pages/articles'
import NewArticle from '@/pages/new-article'
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
    path: '/personal',
    component: PersonalPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
  },
  {
    path: '/articles',
    component: ArticlesPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/new-article',
    component: NewArticle,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuth = userStore.isAuth
  const isAuthRequired = to.meta.requiresAuth
  const isLoginOrRegistration = to.path === '/login' || to.path === '/registration'

  if (isLoginOrRegistration && isAuth) {
    next('/')
  } else if (isAuthRequired && !isAuth) {
    next('/login')
  } else {
    next()
  }
})

export { router }
