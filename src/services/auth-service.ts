import { BASE_URL } from "~/common/api";
import { setHeaders } from "~/common/headers";
import type { LoginCredentials, RegisterCredentials } from "~/models/auth";
import type { UpdateUser, UserData } from "~/models/user";

export async function login(credentials: LoginCredentials) {
  return fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({ user: credentials }),
  });
}

export async function register(credentials: RegisterCredentials) {
  return fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({ user: credentials }),
  });
}
export async function getCurrentUser(token: string | undefined): Promise<UserData> {
  return fetch(`${BASE_URL}/user`, {
    method: "GET",
    headers: setHeaders(token),
  })
    .then((res) => res.json())
    .then((res) => res.user);
}

export async function updateUser(user: UpdateUser, token?: string) {
  return fetch(`${BASE_URL}/user`, {
    method: "PUT",
    headers: setHeaders(token),
    body: JSON.stringify({ user }),
  });
}

export async function setAuthCookies(user: UserData) {
  await fetch("/middleware/auth", {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({ token: user.token, username: user.username, image: user.image }),
    credentials: "include",
  });
}

export async function clearAuthToken() {
  await fetch("/middleware/auth", {
    method: "DELETE",
    headers: setHeaders(),
    credentials: "include",
  });
}
