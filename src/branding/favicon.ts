import type { Hono } from "hono";
import type { AppEnv } from "../env";
import { hashText } from "../hash";

// Simple placeholder favicon — replace with your own design.
const faviconSvg = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="App favicon">
  <rect width="64" height="64" rx="14" fill="#18181b" />
  <text x="32" y="44" text-anchor="middle" font-family="system-ui,sans-serif" font-size="32" font-weight="700" fill="#fafafa">H</text>
</svg>`;

export const faviconPath = `/favicon.${hashText(faviconSvg)}.svg`;

const immutableHeaders = {
  "Content-Type": "image/svg+xml; charset=utf-8",
  "Cache-Control": "public, max-age=31536000, immutable",
} as const;

export function registerBrandingRoutes(app: Hono<AppEnv>) {
  app.get(faviconPath, (c) => c.body(faviconSvg, 200, immutableHeaders));
  app.get("/favicon.ico", (c) => c.redirect(faviconPath, 301));
}
