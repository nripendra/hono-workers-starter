/**
 * Example migration file.
 *
 * This file demonstrates the migration convention. Delete or replace it
 * with your own migrations when you start building your schema.
 *
 * Conventions:
 *   - File name: <number>_<description>.ts  (e.g. 001_create_users.ts)
 *   - Export an `up(db)` function that applies the migration (required).
 *   - Optionally export a `down(db)` function to reverse it.
 *   - Use db.execute() for single statements, db.batch() for multiple.
 *   - The migration runner skips files that don't export `up()`.
 *
 * Uncomment the functions below to try it out, then replace with your own schema.
 */

import type { Client } from "@libsql/client";

export type MigrationFn = (db: Client) => Promise<void>;

// export const up: MigrationFn = async (db) => {
//   await db.batch([
//     {
//       sql: `CREATE TABLE IF NOT EXISTS posts (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         slug TEXT NOT NULL UNIQUE,
//         title TEXT NOT NULL,
//         body TEXT NOT NULL,
//         published INTEGER NOT NULL DEFAULT 0,
//         created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
//         updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
//       )`,
//       args: [],
//     },
//     {
//       sql: `CREATE TABLE IF NOT EXISTS tags (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL UNIQUE
//       )`,
//       args: [],
//     },
//     {
//       sql: `CREATE TABLE IF NOT EXISTS post_tags (
//         post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
//         tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
//         PRIMARY KEY (post_id, tag_id)
//       )`,
//       args: [],
//     },
//   ]);
// };
//
// export const down: MigrationFn = async (db) => {
//   await db.batch([
//     { sql: "DROP TABLE IF EXISTS post_tags", args: [] },
//     { sql: "DROP TABLE IF EXISTS tags", args: [] },
//     { sql: "DROP TABLE IF EXISTS posts", args: [] },
//   ]);
// };
