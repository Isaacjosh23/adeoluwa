import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminRealtimeProvider from "@/components/admin/AdminRealtimeProvider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-(--bg-admin-body) flex">
      <AdminRealtimeProvider />
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className="flex-1 lg:ml-104">{children}</main>
    </div>
  );
}
