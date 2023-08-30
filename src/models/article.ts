import type { AuthorData } from "./author";

export interface ArticleData {
  author: AuthorData;
  tagList: string[];
  title: string;
  description: string;
  createdAt: string;
  updatedAT: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  body: string;
}

export interface ArticlesDTO {
  articles: ArticleData[];
  articlesCount: number;
}

export interface EditArticleData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
