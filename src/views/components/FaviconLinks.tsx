import type { FC } from "hono/jsx";

export const FaviconLinks: FC = () => (
  <>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
    <link rel="shortcut icon" href="/favicon.svg" />
  </>
);
