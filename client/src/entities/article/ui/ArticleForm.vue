<template>
  <div class="relative">
    <form
      class="article-form flex flex-col m-auto gap-3 max-w-2xl"
      :class="{ 'opacity-50': isLoading, 'pointer-events-none': isLoading }"
      novalidate
      @submit.prevent="onSubmit"
    >
      <FileInput @select="handleSelectFile" ref="fileInput" />
      <IftaLabel>
        <InputText
          v-model="title.value"
          id="title"
          variant="filled"
          class="w-full"
          type="text"
          required
        />
        <label for="title">Заголовок*</label>
        <Message
          v-if="title.isTouched && !title.isValid"
          severity="error"
          variant="simple"
          size="small"
          >{{ title.errorMessage }}</Message
        >
      </IftaLabel>
      <IftaLabel v-if="articleTypes.length">
        <Select
          v-model="type.value"
          input-id="type"
          :options="articleTypes"
          option-label="name"
          class="w-full"
          variant="filled"
        />
        <label for="type">Тип*</label>
      </IftaLabel>
      <IftaLabel>
        <Textarea
          id="description"
          v-model="description.value"
          class="w-full resize-none"
          rows="5"
        />
        <label for="description">Текст*</label>
        <Message
          v-if="description.isTouched && !description.isValid"
          severity="error"
          variant="simple"
          size="small"
          >{{ description.errorMessage }}</Message
        >
      </IftaLabel>
      <Button
        type="submit"
        severity="secondary"
        label="Отправить"
        class="w-full"
        :disabled="!isAllowSubmit"
      />
      <RequiredFieldsAlert class="flex justify-end" />
    </form>
    <ProgressSpinner v-if="isLoading" class="absolute! top-[50%] left-[50%] translate-[-50%]" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref, useTemplateRef } from 'vue'
import Message from 'primevue/message'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { useValidation } from '@/shared/lib/use'
import type { Validator } from '@/shared/config'
import type { ArticleType } from '../config'
import { types } from '../api/types'
import RequiredFieldsAlert from '@/shared/ui/required-fields-alert'
import FileInput from '@/shared/ui/file-input'

interface Props {
  isLoading?: boolean
}

const { isLoading = false } = defineProps<Props>()

const emit = defineEmits(['submit'])

const title = ref({
  name: 'title',
  value: '',
  isValid: false,
  validationRule: /.+/,
  errorMessage: 'Обязательное поле.',
  isTouched: false,
})
const description = ref({
  name: 'description',
  value: '',
  isValid: false,
  validationRule: /.+/,
  errorMessage: 'Обязательное поле.',
  isTouched: false,
})
const type = ref({
  name: 'type',
  value: null,
  isValid: false,
  validationRule: /.+/,
  isTouched: false,
})

const fileInput = useTemplateRef('fileInput')
const file = ref({
  name: 'file',
  value: null,
  isValid: false,
  validationRule: /.+/,
  isTouched: false,
})
const handleSelectFile = (payload: any) => {
  file.value.value = payload
}

const articleTypes = ref<ArticleType[]>([])
const getArticleTypes = async () => {
  try {
    const result = (await types()).data

    if (result.length) {
      articleTypes.value = result
    }
  } catch (error) {
    console.log(error)
  }
}
await getArticleTypes()

const inputs = [title, description, articleTypes.value.length && type, file].filter(
  Boolean,
) as Ref<Validator>[]
const { result } = useValidation(inputs)
const isAllowSubmit = computed(() => {
  return result.every((item) => item.value.isValid)
})

const resetFields = () => {
  title.value.value = ''
  title.value.isTouched = false
  description.value.value = ''
  description.value.isTouched = false
  type.value.value = null
  type.value.isTouched = false
  file.value.value = null
  file.value.isTouched = false
  fileInput.value?.removeFile()
}

const onSubmit = () => {
  const values: Record<string, string> = {}

  for (const item of result) {
    const { name, value } = item.value
    values[name] = value
  }

  emit('submit', values)
  resetFields()
}
</script>
