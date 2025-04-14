<template>
  <div class="login-page">
    <div class="container">
      <UserForm :is-name="false" :is-surname="false" :is-loading="isLoading" @submit="onSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import { useToast } from 'primevue/usetoast'
import type { Error } from '@/shared/config'
import { login, UserForm, useUserStore, type User } from '@/entities/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

const isLoading = ref(false)

const onSubmit = async (payload: User) => {
  try {
    isLoading.value = true

    const result = await login(payload)

    localStorage.setItem('token', result.data.accessToken)
    localStorage.setItem('user', JSON.stringify(result.data.user))

    userStore.setUser(result.data.user)
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
  } finally {
    isLoading.value = false
  }
}
</script>
