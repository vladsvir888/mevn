import $axios from '@/shared/api'

export const resetPassword = async (payload: { email: string }) => {
  const result = await $axios.post('/auth/reset-password', payload)
  return result
}
