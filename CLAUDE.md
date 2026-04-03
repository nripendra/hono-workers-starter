Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`
- Bun automatically loads .env, so don't use dotenv.

## Stack

- **Runtime:** Bun (local dev) / Cloudflare Workers (production)
- **Framework:** Hono with JSX/TSX views
- **Database:** Turso (managed SQLite via @libsql/client)
- **CSS:** Tailwind CSS 4
- **Build:** Vite with @hono/vite-dev-server + @hono/vite-build
- **Storage:** R2 via s3mini (optional)

## Project conventions

- Routes go in `src/routes/` — each file exports a Hono sub-app
- Views go in `src/views/pages/`, layouts in `src/views/layouts/`, components in `src/views/components/`
- Database queries go in `src/data/` — one file per domain area
- Migrations go in `src/data/migrations/` with numeric prefixes (001*, 002*, etc.)
- Each migration exports `up(db)` (required) and optionally `down(db)`
- Middleware goes in `src/middleware/`
- `src/server.ts` is the local dev entry, `src/worker.ts` is the Cloudflare Worker entry
- Environment types are defined in `src/env.ts`

## Testing

Use `bun test` to run tests.

```ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```
