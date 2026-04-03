import { createMiddleware } from "hono/factory";
import { createDb } from "../data/db";
import type { AppEnv } from "../env";

export const dbMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const url = c.env?.TURSO_DATABASE_URL ?? process.env.TURSO_DATABASE_URL;
  if (url) {
    const token = c.env?.TURSO_AUTH_TOKEN ?? process.env.TURSO_AUTH_TOKEN;
    c.set("db", createDb(url, token));
  }
  await next();
});
