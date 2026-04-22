import Link from "next/link";
import { FolderKanban, Package, WalletCards } from "lucide-react";

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
      {/* Stat cards */}
      <PortalStats dashboard={bundle.dashboard} />

      {/* Quick Actions */}
      <section className="rounded-2xl border border-[#E5E2DB] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">Quick Actions</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/portal/quotes"
            className="group flex items-center gap-3 rounded-xl border border-[#E5E2DB] bg-[#F7F4EF] px-4 py-3.5 transition-colors hover:border-[#C4F542] hover:bg-white"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C4F542] text-[#1A1A1A]">
              <WalletCards size={17} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">Start a Quote</p>
              <p className="text-[12px] text-[#6B7280]">Request pricing for any product</p>
            </div>
          </Link>
          <Link
            href="/portal/catalogue"
            className="group flex items-center gap-3 rounded-xl border border-[#E5E2DB] bg-[#F7F4EF] px-4 py-3.5 transition-colors hover:border-[#C4F542] hover:bg-white"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1A1A1A] text-[#C4F542]">
              <Package size={17} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">Browse Catalogue</p>
              <p className="text-[12px] text-[#6B7280]">Explore our full product range</p>
            </div>
          </Link>
          <Link
            href="/portal/assets"
            className="group flex items-center gap-3 rounded-xl border border-[#E5E2DB] bg-[#F7F4EF] px-4 py-3.5 transition-colors hover:border-[#C4F542] hover:bg-white"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E5E2DB] text-[#1A1A1A]">
              <FolderKanban size={17} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">Upload Assets</p>
              <p className="text-[12px] text-[#6B7280]">Save logos and brand files</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Active orders + sidebar panels */}
      <div className="grid gap-6 2xl:grid-cols-[1.4fr_0.8fr]">
        <ActiveOrdersTable
          orders={bundle.orders.filter((order) => order.status !== "delivered").slice(0, 3)}
        />
        <div className="space-y-6">
          <QuoteActivity quotes={bundle.quotes.slice(0, 3)} />
          <ApprovalPanel approvals={bundle.approvals} />
        </div>
      </div>

      {/* Reorder suggestions + asset panel */}
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-2xl border border-[#E5E2DB] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#1A1A1A]">Reorder Suggestions</h2>
              <p className="text-[13px] text-[#6B7280]">
                Products you&apos;ve ordered before or saved to quotes.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {bundle.catalogItems.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-xl border border-[#E5E2DB] bg-[#F7F4EF] p-4">
                <div className="aspect-square rounded-lg bg-[#E5E2DB]" />
                <p className="mt-3 text-sm font-semibold text-[#1A1A1A] line-clamp-2">{item.title}</p>
                <p className="mt-0.5 text-[12px] text-[#6B7280]">
                  MOQ {item.moq} · from ${item.minPrice.toFixed(2)}
                </p>
                <Link
                  className="mt-3 inline-flex rounded-lg bg-[#C4F542] px-3 py-1.5 text-[12px] font-semibold text-[#1A1A1A] transition-colors hover:bg-[#b5e13a]"
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
