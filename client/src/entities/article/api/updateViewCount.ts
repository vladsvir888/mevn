import $axios from '@/shared/api'

export const updateViewCount = async (id: string, userEmail?: string) => {
  const result = await $axios.post('/article/updateViewCount', { id, userEmail })
  return result
}
