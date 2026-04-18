import { notFound, redirect } from "next/navigation";

import AdminDashboard from "@/components/internal/AdminDashboard";
import { getInternalCrmData } from "@/lib/portal/internal-data";
import { getPortalSessionUser, isInternalUser } from "@/lib/portal/data";

const internalRoutesEnabled = process.env.ENABLE_INTERNAL_ROUTES === "true";

export default async function AdminPage() {
  if (!internalRoutesEnabled) {
    notFound();
  }

  const user = await getPortalSessionUser();
  if (!user) {
    redirect("/sign-in?mode=login");
  }

  const allowed = await isInternalUser();
  if (!allowed) {
    notFound();
  }

  const data = await getInternalCrmData();

  return <AdminDashboard data={data} />;
}
