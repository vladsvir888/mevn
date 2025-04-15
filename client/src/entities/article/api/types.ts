import $axios from '@/shared/api'
import { type ArticleType } from '../config'

export const types = async () => {
  const result = await $axios.get<ArticleType[]>('/article/types')
  return result
}
