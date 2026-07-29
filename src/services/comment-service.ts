import { BASE_URL, resolveImage } from "../common/api";
import { setHeaders } from "../common/headers";
import type { CommentData } from "../models/comment";

function normalizeComment(comment: CommentData): CommentData {
  return {
    ...comment,
    author: {
      ...comment.author,
      image: resolveImage(comment.author.image),
      bio: comment.author.bio ?? "",
    },
  };
}

export async function getComments(slug: string, token?: string): Promise<CommentData[]> {
  const response = await fetch(`${BASE_URL}/articles/${slug}/comments`, {
    method: "GET",
    headers: setHeaders(token),
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const data = await response.json();
  return (data.comments ?? []).map(normalizeComment);
}

export async function createComment(slug: string, body: string, token?: string): Promise<Response> {
  return fetch(`${BASE_URL}/articles/${slug}/comments`, {
    method: "POST",
    headers: setHeaders(token),
    body: JSON.stringify({
      comment: {
        body,
      },
    }),
  });
}

export async function deleteComment(slug: string, id: number, token?: string): Promise<Response> {
  return fetch(`${BASE_URL}/articles/${slug}/comments/${id}`, {
    method: "DELETE",
    headers: setHeaders(token),
  });
}
