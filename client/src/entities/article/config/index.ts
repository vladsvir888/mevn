export interface ArticleType {
  name: string
  code: string
}

export interface Article {
  title: string
  description: string
  file: File
  type: ArticleType
}
