import Link from "next/link";

import {
  ActiveOrdersTable,
  ApprovalPanel,
  AssetPanel,
  PortalStats,
  QuoteActivity,
} from "@/components/portal/PortalCards";
import { getPortalDataBundle } from "@/lib/portal/data";

export default async function PortalDashboardPage() {
  const bundle = await getPortalDataBundle();

  if (!bundle) {
    return null;
  }

  return (
    <div className="space-y-6">
      <PortalStats dashboard={bundle.dashboard} />

      <div className="grid gap-6 2xl:grid-cols-[1.4fr_0.8fr]">
        <ActiveOrdersTable
          orders={bundle.orders.filter((order) => order.status !== "delivered").slice(0, 3)}
        />
        <div className="space-y-6">
          <QuoteActivity quotes={bundle.quotes.slice(0, 3)} />
          <ApprovalPanel approvals={bundle.approvals} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#10233f]">Reorder Suggestions</h2>
              <p className="text-sm text-[#73839b]">
                Rule-based recommendations based on your previous orders and submitted estimates.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {bundle.catalogItems.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-2xl bg-[#f6f9fd] p-4">
                <div className="aspect-[4/3] rounded-xl bg-[#e9eff8]" />
                <p className="mt-4 text-sm font-semibold text-[#10233f]">{item.title}</p>
                <p className="mt-1 text-xs text-[#73839b]">
                  MOQ {item.moq} · from ${item.minPrice.toFixed(2)}
                </p>
                <Link
                  className="mt-4 inline-flex rounded-xl bg-[#ffac18] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  href={`/portal/quotes?product=${item.slug}`}
                >
                  Quick reorder
                </Link>
              </div>
            ))}
          </div>
        </section>

        <AssetPanel assets={bundle.assets.slice(0, 3)} />
      </div>
    </div>
  );
}
