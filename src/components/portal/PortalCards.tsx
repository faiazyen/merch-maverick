import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Package, WalletCards } from "lucide-react";

import { PortalApprovalActions } from "@/components/portal/PortalApprovalActions";
import { formatPortalStatusLabel } from "@/lib/portal/record-mappers";
import { approvalStatusClasses, orderStatusClasses, quoteStatusClasses } from "@/lib/portal/styles";
import type {
  ApprovalItem,
  BrandAsset,
  PortalDashboardData,
  PortalOrder,
  QuoteRequest,
} from "@/lib/portal/types";
import { cn } from "@/lib/utils";

export function PortalStats({ dashboard }: { dashboard: PortalDashboardData }) {
  const stats = [
    { label: "Active Orders", value: dashboard.activeOrders, hint: "Programs moving through production", icon: Package },
    { label: "Total Spent", value: `$${dashboard.totalSpent.toLocaleString()}`, hint: "Across approved and delivered work", icon: WalletCards },
    { label: "Repeat Orders", value: dashboard.repeatOrders, hint: "Reference-ready reorder history", icon: ArrowRight },
    { label: "Pending Approvals", value: dashboard.pendingApprovals, hint: "Proofs or checkpoints awaiting sign-off", icon: Clock3 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#E5E2DB] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4EF] text-[#1A1A1A]">
                <Icon size={18} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
                Live
              </span>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#1A1A1A]">{stat.value}</p>
            <p className="mt-2 text-[13px] text-[#6B7280]">{stat.hint}</p>
          </div>
        );
      })}
    </div>
  );
}

export function ActiveOrdersTable({ orders }: { orders: PortalOrder[] }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E5E2DB] px-6 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#1A1A1A]">Active Orders</h2>
          <p className="text-[13px] text-[#6B7280]">Track production milestones from deposit through delivery.</p>
        </div>
        <Link href="/portal/orders" className="text-[13px] font-semibold text-[#1A1A1A] underline-offset-2 hover:underline">
          View all
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F4EF] text-[#1A1A1A]">
            <Package size={20} />
          </div>
          <p className="mt-4 text-sm font-semibold text-[#1A1A1A]">No active orders yet</p>
          <p className="mt-1 text-[13px] text-[#6B7280]">Once your first quote is approved and deposit confirmed, your order will appear here.</p>
          <Link href="/portal/quotes" className="mt-5 inline-flex rounded-xl bg-[#C4F542] px-4 py-2 text-[13px] font-semibold text-[#1A1A1A] transition-colors hover:bg-[#b5e13a]">
            Start a quote
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px]">
            <thead className="bg-[#F7F4EF]">
              <tr>
                {["Order ID", "Product", "Qty", "Status", "Delivery", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DB]">
              {orders.map((order) => (
                <tr key={order.id} className="align-top">
                  <td className="px-6 py-4 text-sm font-semibold text-[#1A1A1A]">{order.orderNumber}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#1A1A1A]">{order.productName}</p>
                    <p className="text-xs text-[#6B7280]">{order.category}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">{order.quantity}</td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", orderStatusClasses(order.status))}>
                      {order.statusLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">
                    {new Date(order.deliveryDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        className="rounded-lg border border-[#E5E2DB] px-3 py-1.5 text-xs font-semibold text-[#6B7280] transition-colors hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                        href={`/portal/orders#${order.id}`}
                      >
                        Details
                      </Link>
                      <Link
                        className="rounded-lg bg-[#C4F542] px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] transition-colors hover:bg-[#b5e13a]"
                        href={`/portal/quotes?reorder=${order.id}`}
                      >
                        Reorder
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export function QuoteActivity({ quotes }: { quotes: QuoteRequest[] }) {
  return (
    <section className="rounded-2xl border border-[#E5E2DB] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#1A1A1A]">Quote Activity</h2>
          <p className="text-[13px] text-[#6B7280]">Saved benchmarks and reviewed requests.</p>
        </div>
        <Link href="/portal/quotes" className="text-[13px] font-semibold text-[#1A1A1A] underline-offset-2 hover:underline">
          Open configurator
        </Link>
      </div>

      {quotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm font-semibold text-[#1A1A1A]">No quotes yet</p>
          <p className="mt-1 text-[13px] text-[#6B7280]">Use the configurator to build and submit your first quote estimate.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {quotes.map((quote) => (
            <div key={quote.id} className="rounded-xl bg-[#F7F4EF] px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">{quote.title}</p>
                  <p className="mt-0.5 text-xs text-[#6B7280]">
                    {quote.productName} · {quote.quantity} units · {quote.decorationMethod}
                  </p>
                </div>
                <span className={cn("inline-flex shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold", quoteStatusClasses(quote.status))}>
                  {formatPortalStatusLabel(quote.status)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  ${quote.totalMin.toLocaleString()} – ${quote.totalMax.toLocaleString()}
                </p>
                <p className="text-xs text-[#6B7280]">{quote.leadTime}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function AssetPanel({ assets }: { assets: BrandAsset[] }) {
  return (
    <section className="rounded-2xl border border-[#E5E2DB] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#1A1A1A]">Saved Assets</h2>
          <p className="text-[13px] text-[#6B7280]">Linked brand files available for quotes and reorders.</p>
        </div>
        <Link href="/portal/assets" className="text-[13px] font-semibold text-[#1A1A1A] underline-offset-2 hover:underline">
          Manage assets
        </Link>
      </div>
      {assets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm font-semibold text-[#1A1A1A]">No files saved yet</p>
          <p className="mt-1 text-[13px] text-[#6B7280]">Upload your brand logos and guidelines to keep them linked to quotes and reorders.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {assets.map((asset) => (
            <div key={asset.id} className="rounded-xl bg-[#F7F4EF] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#1A1A1A]">{asset.name}</p>
                  <p className="mt-0.5 text-xs text-[#6B7280]">
                    {asset.type} · {asset.sizeLabel}
                  </p>
                </div>
                <span className="inline-flex shrink-0 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[11px] font-semibold text-[#166534]">
                  {asset.status === "ready" ? "Ready" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function ApprovalPanel({ approvals }: { approvals: ApprovalItem[] }) {
  return (
    <section className="rounded-2xl border border-[#E5E2DB] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#1A1A1A]">Approvals</h2>
          <p className="text-[13px] text-[#6B7280]">Proofs and production checkpoints awaiting your sign-off.</p>
        </div>
      </div>
      {approvals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm font-semibold text-[#1A1A1A]">No pending approvals</p>
          <p className="mt-1 text-[13px] text-[#6B7280]">Artwork proofs and production checkpoints will appear here when ready.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {approvals.map((approval) => (
            <div key={approval.id} className="flex items-start gap-3 rounded-xl bg-[#F7F4EF] px-4 py-3">
              <div className="mt-0.5 rounded-full bg-[#FEF9C3] p-1.5 text-[#854D0E]">
                <CheckCircle2 size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#1A1A1A]">{approval.title}</p>
                <p className="mt-0.5 text-xs text-[#6B7280]">{approval.dueLabel}</p>
                <PortalApprovalActions approvalId={approval.id} status={approval.status} />
              </div>
              <span
                className={cn(
                  "inline-flex shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  approvalStatusClasses(approval.status)
                )}
              >
                {formatPortalStatusLabel(approval.status)}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
