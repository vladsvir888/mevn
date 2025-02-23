<template>
  <div class="test-page">
    <div class="container">Тестовая страница - {{ res }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import $axios from '@/shared/api'

const res = ref(null)
res.value = (await $axios('/auth/test')).data.msg
</script>
