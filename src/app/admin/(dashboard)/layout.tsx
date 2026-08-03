import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin-session";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await getAdminSession();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
