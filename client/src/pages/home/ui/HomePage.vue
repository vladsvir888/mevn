<template>
  <div class="home-page">
    <div class="container">
      <div class="overflow-x-auto pb-2.5">
        <SelectButton
          v-if="articleTypes.length"
          v-model="articleType"
          :options="articleTypes"
          option-label="name"
          :allow-empty="false"
        />
      </div>
      <ArticleCardList v-if="filteredArticleList.length" :list="filteredArticleList" />
      <p v-else>Статей не найдено</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SelectButton from 'primevue/selectbutton'
import {
  type ExtendedArticle,
  type ArticleType,
  ArticleCardList,
  list,
  types,
} from '@/entities/article'

const articleTypes = ref<ArticleType[]>([])
const articleType = ref<ArticleType | null>(null)
const getArticleTypes = async () => {
  try {
    let result = (await types()).data
    result = [{ name: 'Все', code: 'all' }, ...result]

    if (result.length) {
      articleTypes.value = result
      articleType.value = result[0]
    }
  } catch (error) {
    console.log(error)
  }
}

const articleList = ref<ExtendedArticle[]>([])
const getArticleList = async () => {
  try {
    articleList.value = (await list()).data
  } catch (error) {
    console.log(error)
  }
}
const filteredArticleList = computed(() => {
  if (articleType.value?.code === 'all') {
    return articleList.value
  }

  return articleList.value.filter((item) => item.type.code === articleType.value?.code)
})

await Promise.all([getArticleTypes(), getArticleList()])
</script>
