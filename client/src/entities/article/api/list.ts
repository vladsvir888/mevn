import $axios from '@/shared/api'
import { type ExtendedArticle } from '../config'

export const list = async () => {
  const result = await $axios.get<ExtendedArticle[]>('/article/list')
  return result
}
