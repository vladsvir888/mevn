import HomePage from '@/pages/home/ui/HomePage.vue'
import { RegistrationPage, LoginPage } from '@/pages/login'
import PersonalPage from '@/pages/personal'
import NotFoundPage from '@/pages/not-found'
import ArticlesPage from '@/pages/articles'
import NewArticle from '@/pages/new-article'
import AllArticlesPage from '@/pages/all-articles'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/entities/user'
import ArticlePage from '@/pages/article'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: HomePage,
    meta: { requiresAuth: false },
  },
  {
    name: 'registration',
    path: '/registration',
    component: RegistrationPage,
    meta: { requiresAuth: false },
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    name: 'personal',
    path: '/personal',
    component: PersonalPage,
    meta: { requiresAuth: true },
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
  },
  {
    name: 'articles',
    path: '/articles',
    component: ArticlesPage,
    meta: { requiresAuth: true },
  },
  {
    name: 'all-articles',
    path: '/all-articles',
    component: AllArticlesPage,
    meta: { requiresAuth: true },
  },
  {
    name: 'new-article',
    path: '/new-article',
    component: NewArticle,
    meta: { requiresAuth: true },
  },
  {
    name: 'article-id',
    path: '/article/:id',
    component: ArticlePage,
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
