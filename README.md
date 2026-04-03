# hono-workers-starter

A starter template for full-stack web apps with [Hono](https://hono.dev), [Cloudflare Workers](https://workers.cloudflare.com), [Turso](https://turso.tech) (SQLite), and [Tailwind CSS](https://tailwindcss.com) — built with [Bun](https://bun.sh).

## Quick start

```bash
bun create nripendra/hono-workers-starter my-app
cd my-app
cp .env.example .env
# Edit .env with your Turso credentials
bun run dev
```

## Scripts

| Command                   | Description                       |
| ------------------------- | --------------------------------- |
| `bun run dev`             | Start Vite dev server with HMR    |
| `bun run build:worker`    | Build the Cloudflare Worker       |
| `bun run preview:worker`  | Build and preview with Wrangler   |
| `bun run deploy`          | Build and deploy to Cloudflare    |
| `bun run db:migrate`      | Run database migrations (local)   |
| `bun run db:migrate:prod` | Run migrations against production |
| `bun run db:seed`         | Seed the database                 |

## Project structure

```
├── src/
│   ├── server.ts               # Hono app for local dev (Vite)
│   ├── worker.ts               # Hono app for Cloudflare Workers
│   ├── env.ts                  # AppEnv type (Bindings + Variables)
│   ├── styles.css              # Tailwind CSS entry point
│   ├── styles-asset.ts         # CSS inlining for Worker builds
│   ├── branding/
│   │   └── favicon.ts          # SVG favicon route
│   ├── data/
│   │   ├── db.ts               # Turso client factory
│   │   ├── migrate.ts          # Migration runner
│   │   ├── seed.ts             # Seed script
│   │   └── migrations/         # Migration files (001_*.ts, 002_*.ts, ...)
│   ├── middleware/
│   │   ├── db.ts               # Database context middleware
│   │   └── preview.tsx         # "Coming Soon" preview gate
│   ├── routes/
│   │   ├── site.tsx            # Public routes
│   │   └── admin.tsx           # Admin routes
│   ├── storage/
│   │   └── r2.ts               # R2 / S3-compatible upload helper
│   └── views/
│       ├── components/         # Reusable JSX components
│       ├── layouts/            # BaseLayout, AdminLayout
│       └── pages/              # Page components
├── vite.config.ts              # Vite dev config
├── vite.config.build.ts        # Vite Worker build config
└── wrangler.jsonc              # Cloudflare Workers config
```

## Migrations

Place migration files in `src/data/migrations/` with numeric prefixes:

```
src/data/migrations/
  001_create_users.ts
  002_add_posts.ts
  003_add_comments.ts
```

Each migration exports an `up()` function (required) and optionally a `down()` function:

```ts
import type { Client } from "@libsql/client";

export async function up(db: Client) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function down(db: Client) {
  await db.execute("DROP TABLE IF EXISTS users");
}
```

The runner tracks applied migrations in a `_migrations` table and only runs pending ones.

### Production migrations

1. Create `.env.production.local` with production Turso credentials:

   ```
   TURSO_DATABASE_URL=libsql://your-production-db
   TURSO_AUTH_TOKEN=your-production-token
   ```

2. Run: `bun run db:migrate:prod`

This disables automatic `.env` loading and only reads `.env.production.local`.

## Preview gate

Set `PREVIEW_ACCESS_KEY` in your `.env` to enable a "Coming Soon" page on public routes. Share access via `https://yoursite.com?allow=<key>` — this sets a cookie granting 30-day access.

Leave `PREVIEW_ACCESS_KEY` empty to disable the gate.

## Deployment

1. Configure `wrangler.jsonc` with your Worker name and custom domains
2. Set secrets: `bunx wrangler secret put TURSO_AUTH_TOKEN` (and others)
3. Deploy: `bun run deploy`
