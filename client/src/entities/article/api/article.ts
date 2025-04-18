import $axios from '@/shared/api'
import { type ExtendedArticle } from '../config'

export const article = async (id: string, userEmail?: string) => {
  const result = await $axios.post<ExtendedArticle>(`/article/articleById/${id}`, { userEmail })
  return result
}
