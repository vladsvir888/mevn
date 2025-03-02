<template>
  <Button
    variant="link"
    label="Mevn"
    :as="isLink ? 'router-link' : undefined"
    :to="isLink ? '/' : undefined"
    class="p-0! *:first-letter:italic *:first-letter:font-bold *:first-letter:text-xl no-underline!"
    @click="emit('clicked-logo')"
  />
</template>

<script setup lang="ts">
import Button from 'primevue/button'

type Props = {
  isLink?: boolean
}

const { isLink = true } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'clicked-logo'): void
}>()
</script>
