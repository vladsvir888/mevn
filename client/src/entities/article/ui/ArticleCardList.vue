<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
    <li v-for="item in list" :key="item._id">
      <ArticleCard :card="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ArticleCard, type ExtendedArticle } from '@/entities/article'

interface Props {
  list: ExtendedArticle[]
}

const { list } = defineProps<Props>()
</script>
