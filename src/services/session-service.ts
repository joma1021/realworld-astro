import type { AstroCookies } from "astro";
import type { UserSessionData } from "../models/user";

const USERNAME_KEY = "username";
const TOKEN_KEY = "authToken";
const IMAGE_KEY = "userImage";
const COOKIE_KEY = "userSession";

export function getUserSessionData(cookies: AstroCookies): UserSessionData {
  const sessionCookies = cookies.get(COOKIE_KEY)?.json();

  if (!sessionCookies) return { username: "", image: "", token: "", isLoggedIn: false };
  const token = sessionCookies.TOKEN_KEY;
  const username = sessionCookies.USERNAME_KEY;
  const image = sessionCookies.IMAGE_KEY;
  if (username && token) return { username: username, image: image, token: token, isLoggedIn: true };
  else {
    return { username: "", image: "", token: "", isLoggedIn: false };
  }
}

export function getToken(cookies: AstroCookies) {
  const sessionCookies = cookies.get(COOKIE_KEY)?.json();
  const token = sessionCookies[TOKEN_KEY];
  return token;
}

export function setSessionCookies({ username, authToken, image, cookies }: { username: string; authToken: string; image: string; cookies: AstroCookies }) {
  const cookieOptions = { httpOnly: true, maxAge: 60 * 60 * 24, path: "/" };
  const userSession = JSON.stringify({ TOKEN_KEY: authToken, USERNAME_KEY: username, IMAGE_KEY: image });
  cookies.set(COOKIE_KEY, userSession, cookieOptions);
}

export function logout(cookies: AstroCookies) {
  cookies.delete(COOKIE_KEY);
}
