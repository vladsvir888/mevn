export interface Validator {
  name: string
  value: any
  isValid: boolean
  validationRule: RegExp
  errorMessage: string
  isTouched: boolean
}
