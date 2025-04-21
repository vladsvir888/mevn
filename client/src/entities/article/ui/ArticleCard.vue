<template>
  <Card class="overflow-hidden">
    <template #header>
      <img
        alt=""
        :src="imagePath"
        :width="imageWidth"
        :height="imageHeight"
        loading="lazy"
        class="h-[200px] w-full object-cover"
      />
    </template>
    <template #title>{{ card.title }}</template>
    <template #subtitle>
      <div class="flex justify-between items-center">
        <p v-tooltip.bottom="'Тип'">{{ card.type.name }}</p>
        <p v-tooltip.bottom="'Дата создания'">{{ preparedDate }}</p>
      </div>
    </template>
    <template #content>
      <p>{{ card.description }}</p>
    </template>
    <template #footer>
      <Button
        v-if="isShowButton"
        label="Подробнее"
        icon="pi pi-arrow-right"
        icon-pos="right"
        class="w-full !no-underline"
        as="router-link"
        size="small"
        :to="`/article/${card._id}`"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import type { ExtendedArticle } from '@/entities/article'
import { useUserStore } from '@/entities/user'
import { useRoute } from 'vue-router'

interface Props {
  card: ExtendedArticle
  imageWidth?: number
  imageHeight?: number
}

const { card, imageWidth = 330, imageHeight = 200 } = defineProps<Props>()

const userStore = useUserStore()
const route = useRoute()

const imagePath = computed(() => {
  if (typeof card.file === 'string') {
    return card.file
  }
})
const preparedDate = computed(() => {
  return new Date(card.createdAt).toLocaleDateString()
})
const isShowButton = computed(() => {
  if (route.params.id) {
    return false
  }

  return userStore.user?.email === card.userEmail
})
</script>
