import $axios from '@/shared/api'

export const logout = async () => {
  const result = await $axios.post('/auth/logout')
  return result
}
