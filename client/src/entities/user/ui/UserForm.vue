<template>
  <div class="auth-form flex flex-col m-auto max-w-96">
    <div class="flex justify-between items-center mb-1">
      <Heading>{{ headingText }}</Heading>
      <Button :label="buttonText" variant="link" as="router-link" :to="buttonLink" class="p-0!" />
    </div>
    <form class="flex flex-col gap-3" novalidate @submit.prevent="onSubmit">
      <IftaLabel>
        <InputText
          v-model="email.value"
          id="email"
          variant="filled"
          class="w-full"
          type="email"
          required
        />
        <label for="email">Электронная почта</label>
        <Message
          v-if="email.value && !email.isValid"
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
        <label for="password">Пароль</label>
        <Message
          v-if="password.value && !password.isValid"
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
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import IftaLabel from 'primevue/iftalabel'
import Heading from '@/shared/ui/heading'
import { useValidation } from '@/shared/lib/use'

interface Props {
  headingText?: string
  buttonText?: string
  buttonLink?: string
}

const {
  headingText = 'Вход',
  buttonText = 'Регистрация',
  buttonLink = '/registration',
} = defineProps<Props>()

const emit = defineEmits(['submit'])

const email = ref({
  name: 'email',
  value: '',
  isValid: false,
  validationRule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  errorMessage: 'Неверный формат электронной почты.',
})
const password = ref({
  name: 'password',
  value: '',
  isValid: false,
  validationRule: /^.{6,}$/,
  errorMessage: 'Минимальная длина пароля — 6 символов.',
})
const { result } = useValidation([email, password])
const isAllowSubmit = computed(() => {
  return result.every((item) => item.value.isValid)
})

const onSubmit = () => {
  const values: Record<string, string> = {}

  for (const item of result) {
    const { name, value } = item.value
    values[name] = value
  }

  emit('submit', values)

  email.value.value = ''
  password.value.value = ''
}
</script>
