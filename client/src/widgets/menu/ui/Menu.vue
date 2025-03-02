<template>
  <Drawer v-model:visible="isVisibleMenu" header="Меню" position="full">
    <template #header>
      <Logo :is-link="false" @clicked-logo="hideMenu" />
    </template>
    <Nav class="flex flex-col items-start gap-2.5" @clicked-link="hideMenu" />
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Drawer from 'primevue/drawer'
import Logo from '@/shared/ui/logo'
import Nav from '@/shared/ui/nav'

const isVisibleMenu = ref(false)
const showMenu = () => {
  isVisibleMenu.value = true
}
const hideMenu = () => {
  isVisibleMenu.value = false
}

defineExpose({
  showMenu,
})
</script>
