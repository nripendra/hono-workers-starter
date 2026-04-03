import type { FC, PropsWithChildren } from "hono/jsx";
import { stylesheetPath } from "../../styles-asset";
import { FaviconLinks } from "../components/FaviconLinks";

interface Props {
  title?: string;
}

export const BaseLayout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
  const pageTitle = title ? `${title} | My App` : "My App";
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <FaviconLinks />
        <link rel="stylesheet" href={stylesheetPath} />
      </head>
      <body class="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
        <header class="border-b border-zinc-200 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
            <a href="/" class="text-lg font-bold tracking-tight">
              My App
            </a>
            <nav class="flex gap-6 text-sm font-medium">
              <a href="/" class="text-zinc-600 hover:text-zinc-900 transition-colors">
                Home
              </a>
              <a href="/admin" class="text-zinc-600 hover:text-zinc-900 transition-colors">
                Admin
              </a>
            </nav>
          </div>
        </header>
        <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">{children}</main>
        <footer class="mt-auto border-t border-zinc-200 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-zinc-400">
            Built with Hono + Cloudflare Workers
          </div>
        </footer>
      </body>
    </html>
  );
};
