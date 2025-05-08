<template>
  <div class="password-reset-page">
    <div class="container">
      <UserForm
        heading-text="Сброс пароля"
        :is-button="false"
        :is-name="false"
        :is-surname="false"
        :is-password="false"
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
import { UserForm, type User, resetPassword } from '@/entities/user'
import { ref } from 'vue'

const toast = useToast()

const isLoading = ref(false)

const onSubmit = async (payload: { email: string }) => {
  try {
    isLoading.value = true
    await resetPassword(payload)
    toast.add({
      severity: 'warn',
      detail: 'На вашу почту отправлено письмо для восстановления аккаунта',
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
