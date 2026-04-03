import type { FC } from "hono/jsx";
import { stylesheetPath } from "../../styles-asset";
import { FaviconLinks } from "../components/FaviconLinks";

export const ComingSoonPage: FC = () => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Coming Soon</title>
        <FaviconLinks />
        <link rel="stylesheet" href={stylesheetPath} />
      </head>
      <body class="min-h-screen flex items-center justify-center bg-zinc-50 text-zinc-900">
        <div class="text-center px-6 py-10 max-w-md mx-4">
          <h1 class="text-3xl font-bold tracking-tight">Coming Soon</h1>
          <p class="mt-4 text-zinc-500">We're working on something new. Check back soon.</p>
        </div>
      </body>
    </html>
  );
};
