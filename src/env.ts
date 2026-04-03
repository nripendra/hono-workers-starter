import type { Client } from "@libsql/client";

export type AppEnv = {
  Bindings: {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
    PREVIEW_ACCESS_KEY: string;
    R2_ENDPOINT: string;
    R2_ACCESS_KEY_ID: string;
    R2_SECRET_ACCESS_KEY: string;
    R2_PUBLIC_URL: string;
  };
  Variables: {
    db: Client;
  };
};
