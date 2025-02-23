export interface Error {
  status: number
  message: string
  timestamp: string
  errors: unknown[]
}
