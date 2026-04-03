import type { FC, PropsWithChildren } from "hono/jsx";
import { stylesheetPath } from "../../styles-asset";
import { FaviconLinks } from "../components/FaviconLinks";

interface Props {
  title?: string;
  activePage?: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard", page: "dashboard" },
  // Add your admin nav items here
];

export const AdminLayout: FC<PropsWithChildren<Props>> = ({ title, activePage, children }) => {
  const pageTitle = title ? `${title} | Admin` : "Admin";
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <FaviconLinks />
        <link rel="stylesheet" href={stylesheetPath} />
      </head>
      <body class="bg-slate-50 text-slate-900 min-h-screen flex">
        {/* Backdrop overlay for mobile sidebar */}
        <div
          id="sidebar-backdrop"
          class="fixed inset-0 z-30 bg-black/50 hidden md:hidden"
          onclick="document.getElementById('sidebar').classList.add('-translate-x-full');this.classList.add('hidden')"
        />

        <aside
          id="sidebar"
          class="w-64 bg-slate-900 text-white flex flex-col min-h-screen fixed z-40 transition-transform duration-200 -translate-x-full md:translate-x-0"
        >
          <div class="px-6 py-5 border-b border-slate-700 flex items-center justify-between">
            <div>
              <a href="/admin" class="text-lg font-bold tracking-tight">
                My App
              </a>
              <p class="text-xs text-slate-400 mt-1">Admin Panel</p>
            </div>
            <button
              type="button"
              class="md:hidden text-slate-400 hover:text-white p-1"
              onclick="document.getElementById('sidebar').classList.add('-translate-x-full');document.getElementById('sidebar-backdrop').classList.add('hidden')"
              aria-label="Close menu"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav class="flex-1 px-3 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                href={item.href}
                class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activePage === item.page
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div class="px-6 py-4 border-t border-slate-700">
            <a href="/" class="text-xs text-slate-500 hover:text-slate-300 inline-block">
              Back to site
            </a>
          </div>
        </aside>
        <div class="flex-1 md:ml-64">
          <header class="bg-white border-b border-slate-200 px-4 py-4 md:px-8 flex items-center gap-3">
            <button
              type="button"
              class="md:hidden text-slate-600 hover:text-slate-900 p-1 -ml-1"
              onclick="document.getElementById('sidebar').classList.remove('-translate-x-full');document.getElementById('sidebar-backdrop').classList.remove('hidden')"
              aria-label="Open menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 class="text-xl font-semibold text-slate-900">{title ?? "Dashboard"}</h1>
          </header>
          <main class="px-4 py-4 md:px-8 md:py-6">{children}</main>
        </div>
      </body>
    </html>
  );
};
