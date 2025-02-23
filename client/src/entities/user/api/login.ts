import $axios from '@/shared/api'
import type { User, UserResponse } from '../config'

export const login = async (payload: User) => {
  const result = await $axios.post<UserResponse>('/auth/login', payload)
  return result
}
