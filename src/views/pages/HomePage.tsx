import type { FC } from "hono/jsx";
import { BaseLayout } from "../layouts/BaseLayout";

export const HomePage: FC = () => {
  return (
    <BaseLayout>
      <div class="text-center py-20">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Welcome</h1>
        <p class="mt-4 text-lg text-zinc-500 max-w-xl mx-auto">
          Your Hono + Cloudflare Workers app is running. Edit{" "}
          <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-sm">src/routes/site.tsx</code> to get
          started.
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <a
            href="/admin"
            class="inline-flex items-center px-5 py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </BaseLayout>
  );
};
