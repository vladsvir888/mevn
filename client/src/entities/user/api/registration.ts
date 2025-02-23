import $axios from '@/shared/api'
import type { User, UserResponse } from '../config'

export const registration = async (payload: User) => {
  const result = await $axios.post<UserResponse>('/auth/registration', payload)
  return result
}
