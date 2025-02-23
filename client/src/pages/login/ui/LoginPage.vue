<template>
  <div class="login-page">
    <div class="container">
      <UserForm @submit="onSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import { useToast } from 'primevue/usetoast'
import type { Error } from '@/shared/config'
import { login, UserForm, useUserStore, type User } from '@/entities/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

const onSubmit = async (payload: User) => {
  try {
    const result = await login(payload)

    localStorage.setItem('token', result.data.accessToken)
    localStorage.setItem('user', result.data.email)

    userStore.setUser(result.data.email)
    userStore.setToken(result.data.accessToken)

    router.push('/')
  } catch (error) {
    const err = error as AxiosError<Error>

    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: err.response?.data.message,
      life: 3000,
    })
  }
}
</script>
