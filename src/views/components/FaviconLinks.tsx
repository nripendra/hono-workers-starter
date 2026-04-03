import type { FC } from "hono/jsx";
import { faviconPath } from "../../branding/favicon";

export const FaviconLinks: FC = () => (
  <>
    <link rel="icon" href={faviconPath} type="image/svg+xml" sizes="any" />
    <link rel="shortcut icon" href={faviconPath} />
  </>
);
