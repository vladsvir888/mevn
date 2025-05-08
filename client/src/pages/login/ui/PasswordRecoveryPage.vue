<template>
  <div class="password-recovery-page">
    <div class="container">
      <UserForm
        heading-text="Восстановление пароля"
        password-label="Новый пароль"
        :is-button="false"
        :is-name="false"
        :is-surname="false"
        :is-email="false"
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
import { UserForm, type User, recoveryPassword } from '@/entities/user'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
const route = useRoute()

const isLoading = ref(false)

const onSubmit = async (payload: { password: string }) => {
  try {
    isLoading.value = true
    await recoveryPassword({ ...payload, link: route.params.id as string })
    toast.add({
      severity: 'success',
      detail: 'Пароль сброшен',
      life: 3000,
    })
    router.push('/login')
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
