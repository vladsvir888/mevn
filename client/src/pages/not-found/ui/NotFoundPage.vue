<template>
  <div class="not-found-page">
    <div class="container">
      <div class="flex items-center justify-center flex-col text-center">
        <Heading size="small">
          <span class="sr-only">Страница</span>
          404
        </Heading>
        <Button variant="link" label="Вернуться домой" as="router-link" to="/" class="p-0!" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Heading from '@/shared/ui/heading'
</script>
