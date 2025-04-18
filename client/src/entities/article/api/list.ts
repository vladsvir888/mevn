import $axios from '@/shared/api'
import { type ExtendedArticle } from '../config'

interface ListParams {
  userEmail?: string
  page: number
}

interface ListReturnValue {
  elements: ExtendedArticle[]
  pages: number
  page: number
  limit: number
  skip: number
  count: number
  first: number
}

export const list = async ({ userEmail, page }: ListParams) => {
  const result = await $axios.post<ListReturnValue>('/article/list', { userEmail, page })
  return result
}
