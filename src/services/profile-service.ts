import { BASE_URL } from "~/common/api";
import { setHeaders } from "~/common/headers";
import type { AuthorData } from "~/models/author";

export async function getProfile(username: string, token?: string): Promise<AuthorData> {
  console.log("FETCH", `${BASE_URL}/${username}`);
  try {
    const response = await fetch(`${BASE_URL}/profiles/${username}`, {
      method: "GET",

      headers: setHeaders(token),
    });
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    console.log("FETCH profile resolved");

    const data = await response.json();
    return data.profile;
  } catch (e) {
    return Promise.reject("Error occurred while fetching data");
  }
}

export async function followUser(username: string, token?: string): Promise<Response> {
  return fetch(`${BASE_URL}/profiles/${username}/follow`, {
    method: "POST",
    headers: setHeaders(token),
  });
}

export async function unfollowUser(username: string, token?: string): Promise<Response> {
  return fetch(`${BASE_URL}/profiles/${username}/follow`, {
    method: "DELETE",
    headers: setHeaders(token),
  });
}
