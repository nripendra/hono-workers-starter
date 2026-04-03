import { Hono } from "hono";
import type { AppEnv } from "../env";
import { AdminDashboardPage } from "../views/pages/AdminDashboardPage";

const app = new Hono<AppEnv>();

app.get("/", (c) => {
  return c.html(<AdminDashboardPage />);
});

export default app;
