<template>
  <div class="auth-form flex flex-col m-auto max-w-md relative">
    <div class="flex justify-between items-center mb-1">
      <Heading>{{ headingText }}</Heading>
      <Button :label="buttonText" variant="link" as="router-link" :to="buttonLink" class="p-0!" />
    </div>
    <form
      class="flex flex-col gap-3"
      :class="{ 'opacity-50': isLoading, 'pointer-events-none': isLoading }"
      novalidate
      @submit.prevent="onSubmit"
    >
      <IftaLabel v-if="isName">
        <InputText
          v-model="name.value"
          id="name"
          variant="filled"
          class="w-full"
          type="text"
          required
        />
        <label for="name">Имя*</label>
        <Message
          v-if="name.isTouched && !name.isValid"
          severity="error"
          variant="simple"
          size="small"
          >{{ name.errorMessage }}</Message
        >
      </IftaLabel>
      <IftaLabel v-if="isSurname">
        <InputText
          v-model="surname.value"
          id="surname"
          variant="filled"
          class="w-full"
          type="text"
          required
        />
        <label for="surname">Фамилия*</label>
        <Message
          v-if="surname.isTouched && !surname.isValid"
          severity="error"
          variant="simple"
          size="small"
          >{{ surname.errorMessage }}</Message
        >
      </IftaLabel>
      <IftaLabel>
        <InputText
          v-model="email.value"
          id="email"
          variant="filled"
          class="w-full"
          type="email"
          required
        />
        <label for="email">Электронная почта*</label>
        <Message
          v-if="email.isTouched && !email.isValid"
          severity="error"
          variant="simple"
          size="small"
          >{{ email.errorMessage }}</Message
        >
      </IftaLabel>
      <IftaLabel>
        <Password
          v-model="password.value"
          id="password"
          class="w-full *:w-full"
          :feedback="false"
          toggleMask
          required
        />
        <label for="password">Пароль*</label>
        <Message
          v-if="password.isTouched && !password.isValid"
          severity="error"
          variant="simple"
          size="small"
          >{{ password.errorMessage }}</Message
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
import { computed, ref, type Ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import IftaLabel from 'primevue/iftalabel'
import Heading from '@/shared/ui/heading'
import { useValidation } from '@/shared/lib/use'
import type { Validator } from '@/shared/config'
import ProgressSpinner from 'primevue/progressspinner'
import RequiredFieldsAlert from '@/shared/ui/required-fields-alert'

interface Props {
  headingText?: string
  buttonText?: string
  buttonLink?: string
  isName?: boolean
  isSurname?: boolean
  isLoading?: boolean
}

const {
  headingText = 'Вход',
  buttonText = 'Регистрация',
  buttonLink = '/registration',
  isName = true,
  isSurname = true,
  isLoading = false,
} = defineProps<Props>()

const emit = defineEmits(['submit'])

const name = ref({
  name: 'name',
  value: '',
  isValid: false,
  validationRule: /.+/,
  errorMessage: 'Обязательное поле.',
  isTouched: false,
}) as Ref<Validator>
const surname = ref({
  name: 'surname',
  value: '',
  isValid: false,
  validationRule: /.+/,
  errorMessage: 'Обязательное поле.',
  isTouched: false,
}) as Ref<Validator>
const email = ref({
  name: 'email',
  value: '',
  isValid: false,
  validationRule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  errorMessage: 'Неверный формат электронной почты.',
  isTouched: false,
}) as Ref<Validator>
const password = ref({
  name: 'password',
  value: '',
  isValid: false,
  validationRule: /^.{6,}$/,
  errorMessage: 'Минимальная длина пароля — 6 символов.',
  isTouched: false,
}) as Ref<Validator>
const inputs = [isName && name, isSurname && surname, email, password].filter(
  Boolean,
) as Ref<Validator>[]
const { result } = useValidation(inputs)
const isAllowSubmit = computed(() => {
  return result.every((item) => item.value.isValid)
})

const resetFields = () => {
  email.value.value = ''
  email.value.isTouched = false
  password.value.value = ''
  password.value.isTouched = false
  name.value.value = ''
  name.value.isTouched = false
  surname.value.value = ''
  surname.value.isTouched = false
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
