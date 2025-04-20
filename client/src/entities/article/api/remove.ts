import $axios from '@/shared/api'

export const remove = async (id: string) => {
  const result = await $axios.post(`/article/remove`, { id })
  return result
}
