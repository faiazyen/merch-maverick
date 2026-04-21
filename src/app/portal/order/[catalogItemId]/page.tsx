import { notFound, redirect } from "next/navigation";

import DirectOrderFlow from "@/components/portal/DirectOrderFlow";
import { getCatalogItemById } from "@/lib/portal/catalog";
import { getPortalSessionUser } from "@/lib/portal/data";

type Props = {
  params: Promise<{ catalogItemId: string }>;
  searchParams: Promise<{ cancelled?: string }>;
};

export default async function DirectOrderPage({ params, searchParams }: Props) {
  const user = await getPortalSessionUser();
  if (!user) redirect("/sign-in?mode=login");

  const { catalogItemId } = await params;
  const sp = await searchParams;
  const cancelled = sp.cancelled === "true";

  const item = await getCatalogItemById(catalogItemId);

  if (!item || !item.supportsDirectOrder || !item.isActive) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <a href="/portal/catalogue" className="text-sm text-[#73839b] hover:text-[#5f7087]">
          ← Back to catalogue
        </a>
        <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[#10233f]">Place an Order</h2>
      </div>
      <DirectOrderFlow item={item} cancelled={cancelled} />
    </div>
  );
}
