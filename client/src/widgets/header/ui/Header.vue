<template>
  <header class="header py-2.5">
    <div class="container">
      <div class="flex justify-between items-center">
        <Button
          variant="link"
          label="Mevn"
          as="router-link"
          to="/"
          class="p-0! *:first-letter:italic *:first-letter:font-bold *:first-letter:text-xl"
        />
        <div class="flex gap-x-4">
          <Button
            v-if="userStore.isAuth"
            variant="link"
            label="Личный кабинет"
            as="router-link"
            to="/personal"
            class="p-0!"
          />
        </div>
        <Button v-if="!userStore.isAuth" label="Войти" as="router-link" to="/login" />
        <Button v-if="userStore.isAuth" label="Выйти" @click="userLogout" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useUserStore, logout } from '@/entities/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const userLogout = async () => {
  await logout()
  userStore.logout()
  router.push('/')
}
</script>
