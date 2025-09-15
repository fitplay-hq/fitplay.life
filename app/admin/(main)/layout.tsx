import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayoutWithNavigation } from "@/app/components/admin/DashboardLayout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    session.user.role !== "ADMIN" ||
    session.user.email !== process.env.ADMIN_EMAIL
  ) {
    redirect("/admin/login");
  }

  return (
    <DashboardLayoutWithNavigation
      userRole="admin"
      currentPage="admin-products"
      onPageChange={() => {}}
    >
      {children}
    </DashboardLayoutWithNavigation>
  );
}
