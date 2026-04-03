/**
 * Migration runner with versioned tracking.
 *
 * Conventions:
 *   - Place migration files in src/data/migrations/
 *   - Name them with a numeric prefix: 001_create_users.ts, 002_add_posts.ts, etc.
 *   - Each file exports an `up(db)` function (required) and optionally a `down(db)` function.
 *   - Run via: bun run db:migrate
 *   - Production: bun run db:migrate:prod (reads .env.production.local)
 *
 * The runner keeps a `_migrations` table to track which versions have been applied.
 * Only unapplied migrations are executed, in numeric order.
 */

import type { Client } from "@libsql/client";
import { getGlobalDb } from "./db";

interface Migration {
  name: string;
  up: (db: Client) => Promise<void>;
  down?: (db: Client) => Promise<void>;
}

async function ensureMigrationsTable(db: Client) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function getAppliedMigrations(db: Client): Promise<Set<string>> {
  const result = await db.execute("SELECT name FROM _migrations ORDER BY id");
  return new Set(result.rows.map((row) => String(row.name)));
}

async function loadMigrations(): Promise<Migration[]> {
  // Import all migration files from the migrations directory.
  // Bun's import.meta.glob is not available in all contexts, so we use
  // a dynamic approach with the file system.
  const { readdir } = await import("node:fs/promises");
  const { join } = await import("node:path");

  const migrationsDir = join(import.meta.dir, "migrations");
  const entries = await readdir(migrationsDir).catch(() => []);

  const tsFiles = entries.filter((f) => f.endsWith(".ts") && !f.startsWith(".")).sort();

  const migrations: Migration[] = [];

  for (const file of tsFiles) {
    const mod = await import(join(migrationsDir, file));

    // Skip files that don't export an up() function (e.g. fully commented examples)
    if (typeof mod.up !== "function") {
      continue;
    }

    migrations.push({
      name: file.replace(/\.ts$/, ""),
      up: mod.up,
      down: typeof mod.down === "function" ? mod.down : undefined,
    });
  }

  return migrations;
}

export async function migrate() {
  const db = getGlobalDb();

  await ensureMigrationsTable(db);
  const applied = await getAppliedMigrations(db);
  const migrations = await loadMigrations();

  const pending = migrations.filter((m) => !applied.has(m.name));

  if (pending.length === 0) {
    console.log("No pending migrations.");
    return;
  }

  for (const migration of pending) {
    console.log(`Applying: ${migration.name}`);
    await migration.up(db);
    await db.execute({
      sql: "INSERT INTO _migrations (name) VALUES (?)",
      args: [migration.name],
    });
    console.log(`Applied:  ${migration.name}`);
  }

  console.log(`Migration complete. Applied ${pending.length} migration(s).`);
}

if (import.meta.main) {
  await migrate();
}
