import { Hono } from "hono";
import type { AppEnv } from "../env";
import { HomePage } from "../views/pages/HomePage";

const app = new Hono<AppEnv>();

app.get("/", (c) => {
  return c.html(<HomePage />);
});

export default app;
