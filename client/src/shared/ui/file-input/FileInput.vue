<template>
  <div class="file-input flex flex-col gap-2 items-start">
    <div
      class="relative flex items-center gap-2 p-2.5 border border-slate-300 hover:border-slate-400 rounded-md text-slate-500 transition w-full"
    >
      <span class="pi pi-paperclip text-current" />
      <label :for="id">{{ localLabel }}</label>
      <input
        :id
        ref="file"
        type="file"
        accept="image/*"
        class="absolute inset-0 text-[0px] cursor-pointer"
        @change="selectFile"
      />
    </div>
    <template v-if="src">
      <Button label="Удалить" size="small" @click="removeFile" />
      <img :src="src" alt="" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'
import Button from 'primevue/button'

interface Props {
  label?: string
}

const LABEL_TEXT = 'Прикрепить изображение*'

const { label = LABEL_TEXT } = defineProps<Props>()

const emit = defineEmits(['select'])

const id = useId()

const localLabel = ref(label)
const file = ref<HTMLInputElement | null>(null)
const src = ref<string | null>(null)
const removeFile = () => {
  src.value = null
  if (file.value) {
    file.value.value = ''
  }
  localLabel.value = LABEL_TEXT
  emit('select', null)
}
const selectFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files === null) {
    return
  }

  if (files.length === 0) {
    removeFile()
    return
  }

  const file = files[0]
  localLabel.value = file.name
  const reader = new FileReader()
  reader.onload = async () => {
    if (typeof reader.result === 'string') {
      src.value = reader.result
    }
  }
  reader.readAsDataURL(file)

  emit('select', file)
}

defineExpose({
  removeFile,
})
</script>
