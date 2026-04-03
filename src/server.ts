import { Hono } from "hono";
import type { AppEnv } from "./env";
import { registerBrandingRoutes } from "./branding/favicon";
import { dbMiddleware } from "./middleware/db";
import { previewGate } from "./middleware/preview";
import site from "./routes/site";
import admin from "./routes/admin";

const app = new Hono<AppEnv>();

registerBrandingRoutes(app);
app.use(dbMiddleware);
app.route("/admin", admin);
app.use(previewGate);
app.route("/", site);

export default app;
