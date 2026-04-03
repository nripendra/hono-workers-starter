/**
 * Seed script — populate the database with sample data for development.
 *
 * Run via: bun run db:seed
 *
 * This file is intentionally left empty. Add your seeding logic here
 * once you have migrations in place.
 *
 * Example pattern:
 *
 *   import { getGlobalDb } from "./db";
 *   import { migrate } from "./migrate";
 *
 *   // Ensure schema is up to date before seeding
 *   await migrate();
 *
 *   const db = getGlobalDb();
 *   await db.execute({
 *     sql: "INSERT INTO posts (slug, title, body) VALUES (?, ?, ?)",
 *     args: ["hello-world", "Hello World", "This is a sample post."],
 *   });
 *
 *   console.log("Seeding complete.");
 */

if (import.meta.main) {
  console.log("No seed data configured. Add your seeding logic to src/data/seed.ts.");
}
