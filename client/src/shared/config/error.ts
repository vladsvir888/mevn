interface AdditionalData {
  isNeedRefresh?: boolean
}

export interface Error {
  status: number
  message: string
  timestamp: string
  errors: unknown[]
  additionalData?: AdditionalData
}
