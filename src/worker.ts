import { Hono } from "hono";
import type { AppEnv } from "./env";
import { registerBrandingRoutes } from "./branding/favicon";
import { dbMiddleware } from "./middleware/db";
import { previewGate } from "./middleware/preview";
import site from "./routes/site";
import admin from "./routes/admin";
import { stylesheetPath, stylesheetText } from "./styles-asset";

const app = new Hono<AppEnv>();

app.get(stylesheetPath, (c) => {
  return c.body(stylesheetText, 200, {
    "Content-Type": "text/css",
    "Cache-Control": "public, max-age=31536000, immutable",
  });
});

app.get("/styles.css", (c) => {
  return c.body(stylesheetText, 200, {
    "Content-Type": "text/css",
    "Cache-Control": "no-cache",
  });
});

registerBrandingRoutes(app);
app.use(dbMiddleware);
app.route("/admin", admin);
app.use(previewGate);
app.route("/", site);

export default app;
