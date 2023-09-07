import { defineMiddleware } from "astro:middleware";
import { getUserSessionData } from "./services/session-service";

export const onRequest = defineMiddleware(async ({ cookies, url, redirect }, next) => {
  const userSession = getUserSessionData(cookies);
  const pathname = url.pathname;
  console.log(pathname);
  // Protect routes
  if (!userSession.isLoggedIn) {
    if (pathname === "/settings") return redirect("/register");
    if (pathname === "/editor") return redirect("/register");
    if (pathname.includes("/editor/")) return redirect("/register");
  }

  return next();
});
