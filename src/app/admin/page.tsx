import { notFound, redirect } from "next/navigation";

import AdminDashboard from "@/components/internal/AdminDashboard";
import { internalRoutesEnabled } from "@/lib/portal/admin-auth";
import { getInternalCrmData } from "@/lib/portal/internal-data";
import { getPortalSessionUser, isInternalUser } from "@/lib/portal/data";

export default async function AdminPage() {
  if (!internalRoutesEnabled) {
    notFound();
  }

  const user = await getPortalSessionUser();
  if (!user) {
    redirect("/sign-in?mode=login&next=%2Fadmin");
  }

  const allowed = await isInternalUser();
  if (!allowed) {
    notFound();
  }

  const data = await getInternalCrmData();

  return <AdminDashboard data={data} />;
}
