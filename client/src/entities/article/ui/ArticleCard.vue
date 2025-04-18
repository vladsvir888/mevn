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
        <p>{{ card.type.name }}</p>
        <p>{{ preparedDate }}</p>
      </div>
    </template>
    <template #content>
      <p>{{ card.description }}</p>
    </template>
    <template #footer>
      <Button
        v-if="userStore.user?.email === card.userEmail"
        label="Больше"
        class="w-full"
        as="router-link"
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

interface Props {
  card: ExtendedArticle
  imageWidth?: number
  imageHeight?: number
}

const { card, imageWidth = 330, imageHeight = 200 } = defineProps<Props>()

const userStore = useUserStore()

const imagePath = computed(() => {
  if (typeof card.file === 'string') {
    return card.file
  }
})
const preparedDate = computed(() => {
  return new Date(card.createdAt).toLocaleDateString()
})
</script>
