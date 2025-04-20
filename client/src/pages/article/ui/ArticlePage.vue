<template>
  <div class="article-page">
    <div class="container">
      <div class="flex mb-2.5 gap-x-1.5">
        <Button label="Назад" icon="pi pi-arrow-left" size="small" @click="router.back" />
        <Button
          label="Удалить"
          icon="pi pi-trash"
          size="small"
          :loading="isLoadingRemoving"
          @click="removeArticle"
        />
      </div>
      <div v-if="article" class="grid md:grid-cols-[400px_1fr] items-start gap-5">
        <ArticleCard :card="article" />
        <ArticleForm :form="article" :is-loading="isLoading" @submit="onSubmit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AxiosError } from 'axios'
import Button from 'primevue/button'
import { useToast } from 'primevue'
import {
  ArticleCard,
  ArticleForm,
  article as getArticle,
  type Article,
  type ExtendedArticle,
  update,
  remove,
} from '@/entities/article'
import { useUserStore } from '@/entities/user'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const userStore = useUserStore()

const paramId = route.params.id as string

const article = ref<ExtendedArticle | null>(null)
const getArticleById = async () => {
  try {
    article.value = (await getArticle(paramId, userStore.user?.email)).data
  } catch (error) {
    router.push({ name: 'not-found' })
    console.log(error)
  }
}
await getArticleById()

const isLoading = ref(false)
const isLoadingRemoving = ref(false)

const onSubmit = async (payload: Article) => {
  try {
    isLoading.value = true
    await update({ ...payload, userEmail: userStore.user?.email, id: paramId })
    toast.add({
      severity: 'success',
      detail: 'Статья обновлена',
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

const removeArticle = async () => {
  try {
    isLoadingRemoving.value = true
    await remove(paramId)
    toast.add({
      severity: 'success',
      detail: 'Статья удалена',
      life: 3000,
    })
    router.push('/articles')
  } catch (error) {
    const err = error as AxiosError<Error>

    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: err.response?.data.message,
      life: 3000,
    })
  } finally {
    isLoadingRemoving.value = false
  }
}
</script>
