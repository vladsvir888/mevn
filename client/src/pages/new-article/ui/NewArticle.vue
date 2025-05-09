<template>
  <div class="new-article">
    <div class="container">
      <ArticleForm :is-loading="isLoading" @submit="onSubmit" class="max-w-2xl m-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { AxiosError } from 'axios'
import { useToast } from 'primevue/usetoast'
import type { Error } from '@/shared/config'
import { ArticleForm, type Article, save } from '@/entities/article'
import { useUserStore } from '@/entities/user'
import { useMeta } from '@/shared/lib/use'

const toast = useToast()
const userStore = useUserStore()

const isLoading = ref(false)

const onSubmit = async (payload: Article) => {
  try {
    isLoading.value = true
    await save({ ...payload, userEmail: userStore.user?.email })
    toast.add({
      severity: 'success',
      detail: 'Добавлена новая статья',
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

const computedMeta = computed(() => ({
  title: 'Новая статья - MEVN',
  description: 'Новая статья - MEVN',
}))
useMeta(computedMeta)
</script>
