export interface ArticleType {
  name: string
  code: string
}

export interface Article {
  title: string
  description: string
  file: File | string
  type: ArticleType
}

export interface ExtendedArticle extends Article {
  _id: string
  createdAt: Date
  updatedAt: Date
  userEmail: string
}
