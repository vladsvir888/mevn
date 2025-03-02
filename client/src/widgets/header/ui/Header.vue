<template>
  <header class="header py-2.5">
    <div class="container">
      <div class="flex justify-between items-center">
        <Logo />
        <Nav v-if="userStore.isAuth" class="hidden sm:flex gap-x-4" />
        <div class="flex items-center gap-2.5">
          <Button
            v-if="userStore.isAuth"
            icon="pi pi-bars"
            aria-label="Открыть"
            class="sm:hidden! flex"
            @click="menuRef?.showMenu"
          />
          <Button v-if="!userStore.isAuth" label="Войти" as="router-link" to="/login" />
          <Button v-if="userStore.isAuth" label="Выйти" @click="userLogout" />
        </div>
      </div>
    </div>
    <Menu ref="menu" />
  </header>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import Logo from '@/shared/ui/logo'
import Nav from '@/shared/ui/nav'
import Menu from '@/widgets/menu'
import Button from 'primevue/button'
import { useUserStore, logout } from '@/entities/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const menuRef = useTemplateRef('menu')

const userLogout = async () => {
  await logout()
  userStore.logout()
  router.push('/')
}
</script>
