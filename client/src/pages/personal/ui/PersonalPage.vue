<template>
  <div class="personal-page">
    <div class="container">
      <dl class="grid grid-cols-2 gap-3 max-w-lg">
        <div v-for="(item, index) in data" :key="index">
          <dt class="text-neutral-500 text-xs">{{ item.term }}</dt>
          <dd>
            <Button
              v-if="item.name === 'email'"
              as="a"
              :label="item.descr"
              :href="`mailto:${item.descr}`"
              variant="link"
              class="p-0!"
            />
            <span v-else>{{ item.descr }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import { useUserStore } from '@/entities/user'
import { useMeta } from '@/shared/lib/use'

const userStore = useUserStore()

const data = [
  {
    name: 'name',
    term: 'Имя',
    descr: userStore.user?.name,
  },
  {
    name: 'surname',
    term: 'Фамилия',
    descr: userStore.user?.surname,
  },
  {
    name: 'email',
    term: 'Электронная почта',
    descr: userStore.user?.email,
  },
]

const computedMeta = computed(() => ({
  title: 'Информация о пользователе - MEVN',
  description: 'Информация о пользователе - MEVN',
}))
useMeta(computedMeta)
</script>
