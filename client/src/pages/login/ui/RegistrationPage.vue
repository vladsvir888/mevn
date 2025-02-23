<template>
  <div class="registration-page">
    <div class="container">
      <UserForm
        heading-text="Регистрация"
        button-text="Вход"
        button-link="/login"
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

const router = useRouter()
const toast = useToast()

const onSubmit = async (payload: User) => {
  try {
    await registration(payload)
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
