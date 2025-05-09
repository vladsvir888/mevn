<template>
  <div class="home-page">
    <div class="container">
      <p>
        <b v-if="userStore.fullName">{{ userStore.fullName }},</b>
        {{ userStore.isAuth ? 'д' : 'Д' }}обро пожаловать на сайт по обзору статей!
      </p>
      <p v-if="!userStore.isAuth">Зарегистрируйтесь, чтобы воспользоваться функционалом.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/entities/user'
import { useMeta } from '@/shared/lib/use'
import { computed } from 'vue'

const userStore = useUserStore()

const computedMeta = computed(() => ({
  title: 'Главная - MEVN',
  description: 'Главная - MEVN',
}))
useMeta(computedMeta)
</script>
