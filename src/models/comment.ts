import type { AuthorData } from "./author";

export interface CommentData {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: AuthorData;
}
