import { watch, type Ref } from 'vue'
import type { Validator } from '@/shared/config'

export const useValidation = (inputs: Ref<Validator>[]) => {
  const handleValidation = () => {
    inputs.forEach((input) => {
      input.value.isValid = input.value.validationRule.test(input.value.value)

      if (input.value.value) {
        input.value.isTouched = true
      }
    })
  }

  watch(inputs, handleValidation, { deep: true })

  return {
    result: inputs,
  }
}
