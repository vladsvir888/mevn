export interface Validator {
  name: string
  value: string
  isValid: boolean
  validationRule: RegExp
  errorMessage: string
  isTouched: boolean
}
