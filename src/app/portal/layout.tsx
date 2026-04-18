import { redirect } from "next/navigation";

import { PortalShell } from "@/components/portal/PortalShell";
import { getPortalDataBundle } from "@/lib/portal/data";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bundle = await getPortalDataBundle();

  if (!bundle) {
    redirect("/sign-in?mode=login");
  }

  return (
    <PortalShell
      profile={bundle.profile}
      title="Client Dashboard"
      subtitle="Track orders, save estimates, manage assets, and keep your production workflow moving."
    >
      {children}
    </PortalShell>
  );
}
