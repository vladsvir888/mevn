<template>
  <div class="registration-page">
    <div class="container">
      <UserForm
        heading-text="Регистрация"
        button-text="Вход"
        button-link="/login"
        :is-loading="isLoading"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import { useToast } from 'primevue/usetoast'
import type { Error } from '@/shared/config'
import { registration, UserForm, type User } from '@/entities/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const toast = useToast()

const isLoading = ref(false)

const onSubmit = async (payload: User) => {
  try {
    isLoading.value = true
    await registration(payload)
    router.push('/')
    toast.add({
      severity: 'success',
      summary: 'Ошибка',
      detail: 'На вашу почту отправлено письмо для активации аккаунта',
      life: 3000,
    })
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
