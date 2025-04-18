<template>
  <nav @click="emit('clicked-link')">
    <Button
      variant="link"
      label="Информация о пользователе"
      as="router-link"
      to="/personal"
      class="p-0!"
    />
    <Button variant="link" label="Все статьи" as="router-link" to="/all-articles" class="p-0!" />
    <Button variant="link" label="Мои статьи" as="router-link" to="/articles" class="p-0!" />
    <Button variant="link" label="Новая статья" as="router-link" to="/new-article" class="p-0!" />
  </nav>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

const emit = defineEmits<{
  (e: 'clicked-link'): void
}>()
</script>
