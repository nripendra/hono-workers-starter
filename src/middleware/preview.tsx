import { createMiddleware } from "hono/factory";
import { getCookie, setCookie } from "hono/cookie";
import type { AppEnv } from "../env";
import { ComingSoonPage } from "../views/pages/ComingSoonPage";

const COOKIE_NAME = "preview_access";

export const previewGate = createMiddleware<AppEnv>(async (c, next) => {
  const accessKey = c.env?.PREVIEW_ACCESS_KEY ?? process.env.PREVIEW_ACCESS_KEY;

  // If no key is configured, allow all traffic through
  if (!accessKey) {
    return next();
  }

  // Check for ?allow= param on any page — set cookie and redirect to clean URL
  const allowParam = c.req.query("allow");
  if (allowParam === accessKey) {
    setCookie(c, COOKIE_NAME, accessKey, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    const url = new URL(c.req.url);
    url.searchParams.delete("allow");
    return c.redirect(url.pathname + url.search);
  }

  // Check cookie
  const cookie = getCookie(c, COOKIE_NAME);
  if (cookie === accessKey) {
    return next();
  }

  // Block — show coming soon
  return c.html(<ComingSoonPage />, 503);
});
