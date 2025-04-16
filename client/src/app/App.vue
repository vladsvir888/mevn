<template>
  <Header />
  <main class="pb-5">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense timeout="0">
          <component :is="Component" />
          <template #fallback>
            <Loader />
          </template>
        </Suspense>
      </template>
    </RouterView>
  </main>
  <Toast />
</template>

<script setup lang="ts">
import Loader from '@/shared/ui/loader'
import Header from '@/widgets/header'
import Toast from 'primevue/toast'
</script>
