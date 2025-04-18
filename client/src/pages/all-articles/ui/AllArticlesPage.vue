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
import { onUnmounted } from 'vue'
import { ArticleCardList, useArticleList } from '@/entities/article'
import Paginator from 'primevue/paginator'
import ProgressSpinner from 'primevue/progressspinner'

const { first, limit, totalRecords, pages, articleList, handlePage, isLoading, unwatch } =
  await useArticleList()

onUnmounted(unwatch)
</script>
