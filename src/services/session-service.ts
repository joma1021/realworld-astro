import type { AstroCookies } from "astro";
import { resolveImage } from "../common/api";
import type { UserSessionData } from "../models/user";

const USERNAME_KEY = "username";
const TOKEN_KEY = "authToken";
const IMAGE_KEY = "userImage";
const COOKIE_KEY = "userSession";

type SessionCookiePayload = {
  [TOKEN_KEY]?: string;
  [USERNAME_KEY]?: string;
  [IMAGE_KEY]?: string;
  // Legacy keys written by older builds (identifier names, not constant values)
  TOKEN_KEY?: string;
  USERNAME_KEY?: string;
  IMAGE_KEY?: string;
};

function readSession(cookies: AstroCookies): SessionCookiePayload | undefined {
  return cookies.get(COOKIE_KEY)?.json() as SessionCookiePayload | undefined;
}

function resolveSession(sessionCookies: SessionCookiePayload | undefined): UserSessionData {
  if (!sessionCookies) {
    return { username: "", image: "", token: "", isLoggedIn: false };
  }

  const token = sessionCookies[TOKEN_KEY] ?? sessionCookies.TOKEN_KEY ?? "";
  const username = sessionCookies[USERNAME_KEY] ?? sessionCookies.USERNAME_KEY ?? "";
  const image = resolveImage(sessionCookies[IMAGE_KEY] ?? sessionCookies.IMAGE_KEY);

  if (username && token) {
    return { username, image, token, isLoggedIn: true };
  }

  return { username: "", image: "", token: "", isLoggedIn: false };
}

export function getUserSessionData(cookies: AstroCookies): UserSessionData {
  return resolveSession(readSession(cookies));
}

export function getToken(cookies: AstroCookies) {
  return resolveSession(readSession(cookies)).token || undefined;
}

export function setSessionCookies({
  username,
  authToken,
  image,
  cookies,
}: {
  username: string;
  authToken: string;
  image?: string | null;
  cookies: AstroCookies;
}) {
  const cookieOptions = { httpOnly: true, maxAge: 60 * 60 * 24, path: "/" };
  const userSession = {
    [TOKEN_KEY]: authToken,
    [USERNAME_KEY]: username,
    [IMAGE_KEY]: resolveImage(image),
  };
  cookies.set(COOKIE_KEY, JSON.stringify(userSession), cookieOptions);
}

export function logout(cookies: AstroCookies) {
  cookies.delete(COOKIE_KEY, { path: "/" });
}
