import type { FC } from "hono/jsx";
import { AdminLayout } from "../layouts/AdminLayout";

export const AdminDashboardPage: FC = () => {
  return (
    <AdminLayout title="Dashboard" activePage="dashboard">
      <div class="bg-white rounded-lg border border-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-900 mb-2">Welcome to the admin panel</h2>
        <p class="text-sm text-slate-500">
          This is a placeholder dashboard. Add your admin features by creating new routes in{" "}
          <code class="bg-slate-100 px-1.5 py-0.5 rounded text-xs">src/routes/admin.tsx</code> and
          pages in <code class="bg-slate-100 px-1.5 py-0.5 rounded text-xs">src/views/pages/</code>.
        </p>
      </div>
    </AdminLayout>
  );
};
