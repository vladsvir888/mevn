<template>
  <div class="home-page">
    <div class="container">
      <div v-if="isLoading" class="flex">
        <ProgressSpinner />
      </div>
      <template v-else>
        <ArticleCardList v-if="articleList.length" :list="articleList" />
        <p v-else>Статей не найдено</p>
      </template>
      <Paginator
        v-if="pages > 1"
        v-model:first="first"
        :rows="limit"
        :total-records="totalRecords"
        template="PrevPageLink PageLinks NextPageLink "
        @page="handlePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { ArticleCardList, useArticleList } from '@/entities/article'
import { useUserStore } from '@/entities/user'
import Paginator from 'primevue/paginator'
import ProgressSpinner from 'primevue/progressspinner'
import { useMeta } from '@/shared/lib/use'

const userStore = useUserStore()
const { first, limit, totalRecords, pages, articleList, handlePage, isLoading, unwatch } =
  await useArticleList({ userEmail: userStore.user?.email })

onUnmounted(unwatch)

const computedMeta = computed(() => ({
  title: 'Мои статьи - MEVN',
  description: 'Мои статьи - MEVN',
}))
useMeta(computedMeta)
</script>
