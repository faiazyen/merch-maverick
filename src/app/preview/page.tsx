import { notFound } from "next/navigation";
import PreviewWorkspace from "@/components/internal/PreviewWorkspace";
import { requireInternalRouteAccess } from "@/lib/portal/admin-auth";

export default async function PreviewPage() {
  const access = await requireInternalRouteAccess();
  if ("error" in access) {
    notFound();
  }

  return <PreviewWorkspace />;
}
