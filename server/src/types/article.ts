export interface ArticleType {
  name: string;
  code: string;
}

export interface Article {
  userEmail: string;
  title: string;
  description: string;
  file: string;
  type: ArticleType;
}
