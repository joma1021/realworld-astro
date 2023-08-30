import { BASE_URL } from "~/common/api";
import { setHeaders } from "~/common/headers";
import type { CommentData } from "~/models/comment";

export async function getComments(slug: string, token?: string): Promise<CommentData[]> {
  console.log("FETCH", `${BASE_URL}/articles/${slug}/comments`);
  try {
    const response = await fetch(`${BASE_URL}/articles/${slug}/comments`, {
      method: "GET",
      headers: setHeaders(token),
    });
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    console.log("FETCH comments resolved");
    const data = await response.json();
    return data.comments;
  } catch (e) {
    return Promise.reject("Error occurred while fetching data");
  }
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
