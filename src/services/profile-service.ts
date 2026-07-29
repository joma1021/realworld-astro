import { BASE_URL, resolveImage } from "../common/api";
import { setHeaders } from "../common/headers";
import type { AuthorData } from "../models/author";

function normalizeProfile(profile: AuthorData): AuthorData {
  return {
    ...profile,
    image: resolveImage(profile.image),
    bio: profile.bio ?? "",
  };
}

export async function getProfile(username: string, token?: string): Promise<AuthorData | null> {
  try {
    const response = await fetch(`${BASE_URL}/profiles/${username}`, {
      method: "GET",
      headers: setHeaders(token),
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.profile ? normalizeProfile(data.profile) : null;
  } catch {
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
