import { defineConfig } from "vite";
import build from "@hono/vite-build/cloudflare-workers";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    build({
      entry: "./src/worker.ts",
    }),
  ],
});
