import { watch, type Ref } from 'vue'

interface Validator {
  name: string
  value: string
  isValid: boolean
  validationRule: RegExp
  errorMessage: string
}

export const useValidation = (inputs: Ref<Validator>[]) => {
  const handleValidation = () => {
    inputs.forEach((input) => {
      input.value.isValid = input.value.validationRule.test(input.value.value)
    })
  }

  watch(inputs, handleValidation, { deep: true })

  return {
    result: inputs,
  }
}
