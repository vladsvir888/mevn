import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type PageState } from 'primevue/paginator'
import { type ExtendedArticle, list } from '@/entities/article'

interface UseArticleListParams {
  userEmail?: string
}

export const useArticleList = async ({ userEmail }: UseArticleListParams = {}) => {
  const router = useRouter()
  const route = useRoute()

  const first = ref(0)
  const limit = ref(0)
  const totalRecords = ref(0)
  const pages = ref(0)

  const articleList = ref<ExtendedArticle[]>([])
  const getArticleList = async () => {
    try {
      const queryPage = route.query.page ? parseInt(route.query.page as string) : 1
      const data = (await list({ page: queryPage, userEmail })).data

      articleList.value = data.elements
      limit.value = data.limit
      totalRecords.value = data.count
      first.value = data.first
      pages.value = data.pages
    } catch (error) {
      console.log(error)
    }
  }
  await getArticleList()

  const isLoading = ref(false)
  const handlePage = (event: PageState) => {
    const query = {
      page: event.page + 1,
    }
    router.push({ query })
  }

  const unwatch = watch(
    () => route.query.page,
    async () => {
      if (!route.query.page) {
        return
      }

      isLoading.value = true
      await getArticleList()
      isLoading.value = false
    },
  )

  return {
    first,
    limit,
    totalRecords,
    pages,
    articleList,
    handlePage,
    isLoading,
    unwatch,
  }
}
