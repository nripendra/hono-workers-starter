import { defineConfig, type Plugin } from "vite";
import devServer, { defaultOptions } from "@hono/vite-dev-server";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import fs from "node:fs";

function serveCss(): Plugin {
  const cssEntry = path.resolve(__dirname, "src/styles.css");
  const stylesheetPathPattern = /^\/assets\/styles\.[a-z0-9]+\.css$/;
  return {
    name: "serve-tailwind-css",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const requestPath = req.url ? (req.url.split("?")[0] ?? "") : "";

        if (requestPath !== "/styles.css" && !stylesheetPathPattern.test(requestPath)) {
          next();
          return;
        }

        const raw = fs.readFileSync(cssEntry, "utf-8");
        const result = await server.transformRequest("/src/styles.css", { ssr: false });
        if (result && typeof result === "object" && "code" in result) {
          const match = result.code.match(/const __vite__css\s*=\s*"([\s\S]*?)"\n/);
          if (match) {
            const css = match[1]!.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
            res.setHeader("Content-Type", "text/css");
            res.end(css);
            return;
          }
        }
        res.setHeader("Content-Type", "text/css");
        res.end(raw);
      });
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    serveCss(),
    devServer({
      entry: "./src/server.ts",
      exclude: ["/assets/*", "/styles.css", ...defaultOptions.exclude],
    }),
  ],
});
