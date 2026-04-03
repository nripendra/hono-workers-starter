import { createClient, type Client } from "@libsql/client";

export type { Client };

export function createDb(url: string, authToken?: string): Client {
  return createClient({ url, authToken });
}

/** Global singleton for CLI scripts (migrate, seed) */
let _globalDb: Client | undefined;
export function getGlobalDb(): Client {
  if (!_globalDb) {
    const url = process.env.TURSO_DATABASE_URL;
    if (!url) {
      throw new Error("TURSO_DATABASE_URL is not set");
    }
    _globalDb = createDb(url, process.env.TURSO_AUTH_TOKEN);
  }
  return _globalDb;
}
