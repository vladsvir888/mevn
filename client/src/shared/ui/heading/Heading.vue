<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'small' | 'normal' | 'large'
}

const { level = 1, size: propSize = 'normal' } = defineProps<Props>()

const sizes = {
  small: 'font-medium text-xl',
  normal: 'font-medium text-2xl',
  large: 'font-medium text-3xl',
}
const size = computed(() => sizes[propSize])

const tag = computed(() => `h${level}`)

const classes = ref(['heading', size.value])
</script>
