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

## Adding database support

The database is optional by default. When adding DB support to a project:

1. **`src/env.ts`** — Change `db?: Client` to `db: Client` in the `Variables` type to make it required
2. **`src/middleware/db.ts`** — Add a throw when `TURSO_DATABASE_URL` is missing so misconfiguration is caught early:
   ```ts
   if (!url) {
     throw new Error("TURSO_DATABASE_URL is not set");
   }
   ```
3. **`src/data/migrations/`** — Create your first migration (see `001_example.ts` for the pattern)
4. **`.env`** — Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`

## Adding admin authentication

Auth is intentionally excluded from the template — the schema and session shape are domain-specific. When adding auth, follow this approach:

### Where things go

- **`src/middleware/admin-auth.ts`** — Auth middleware that protects `/admin` routes
- **`src/routes/admin.tsx`** — Mount the auth middleware before admin route handlers
- **`src/data/admin-users.ts`** — User lookup, password verification, session queries
- **`src/views/pages/LoginPage.tsx`** — Login form page

### Implementation steps

1. **Choose an auth strategy** (password, OAuth, or both) and create a migration for the users table. The table schema depends on the strategy — at minimum: `id`, `username`/`email`, `created_at`. Add `password_hash` for password auth, `auth_provider` for OAuth.

2. **Create the auth middleware** (`src/middleware/admin-auth.ts`):
   - Use Hono's `getSignedCookie`/`setSignedCookie` for session cookies
   - Add an `ADMIN_SESSION_SECRET` env var for cookie signing
   - Store session data in the cookie (e.g. `{ userId, email, expiresAt }`)
   - On valid session, set user info on the Hono context via `c.set()` and update `Variables` in `src/env.ts`
   - On invalid/missing session, redirect to the login page

3. **Mount the middleware in `src/routes/admin.tsx`** before route handlers:
   ```ts
   // Public auth routes (login, callback) go BEFORE the middleware
   app.route("/auth", authRoutes);

   // Everything after this requires authentication
   app.use(adminAuthMiddleware);
   app.get("/", (c) => c.html(<AdminDashboardPage />));
   ```

4. **For password auth**: use the Web Crypto API (`crypto.subtle`) for hashing — it works in both Cloudflare Workers and Bun. Use PBKDF2 or import a lightweight library. Do not use `Bun.password` or `bcrypt` as they are not available in the Workers runtime.

5. **For OAuth** (e.g. Google): implement the OAuth flow manually with `fetch()` calls to the provider's token and userinfo endpoints. Store `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and allowed emails as env vars/secrets.

6. **Update `src/env.ts`** — Add auth-related bindings and variables:
   ```ts
   Bindings: {
     ADMIN_SESSION_SECRET: string;
     // ... other auth env vars
   };
   Variables: {
     adminUserId?: number;
     adminEmail?: string;
     // ... other session data
   };
   ```

7. **Update `AdminLayout.tsx`** — Accept and display the authenticated user's identity, add a sign-out link.

### Security notes

- Set session cookies as `httpOnly`, `secure`, `sameSite: "Lax"`
- Use a reasonable expiry (e.g. 7 days) and rotate secrets periodically
- Store secrets via `wrangler secret put`, never in `wrangler.jsonc` vars

## Testing

Use `bun test` to run tests.

```ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```
