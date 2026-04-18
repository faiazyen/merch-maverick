import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Package, WalletCards } from "lucide-react";

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
    { label: "Active Orders", value: dashboard.activeOrders, hint: "Production in flight", icon: Package },
    { label: "Total Spent", value: `$${dashboard.totalSpent.toLocaleString()}`, hint: "Across all records", icon: WalletCards },
    { label: "Repeat Orders", value: dashboard.repeatOrders, hint: "Historical line items", icon: ArrowRight },
    { label: "Pending Approvals", value: dashboard.pendingApprovals, hint: "Needs your review", icon: Clock3 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#2463c4]">
                <Icon size={18} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">
                Live
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#10233f]">{stat.value}</p>
            <p className="mt-2 text-sm text-[#73839b]">{stat.hint}</p>
          </div>
        );
      })}
    </div>
  );
}

export function ActiveOrdersTable({ orders }: { orders: PortalOrder[] }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#dbe5f1] bg-white shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
      <div className="flex items-center justify-between border-b border-[#edf2f7] px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-[#10233f]">Active Orders</h2>
          <p className="text-sm text-[#73839b]">Track current production milestones and reorder from proven specs.</p>
        </div>
        <Link href="/portal/orders" className="text-sm font-semibold text-[#215dbe]">
          View full history
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px]">
          <thead className="bg-[#f6f9fd]">
            <tr>
              {["Order ID", "Product", "Qty", "Status", "Delivery", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf2f7]">
            {orders.map((order) => (
              <tr key={order.id} className="align-top">
                <td className="px-6 py-4 text-sm font-semibold text-[#215dbe]">{order.orderNumber}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-[#10233f]">{order.productName}</p>
                  <p className="text-xs text-[#75849b]">{order.category}</p>
                </td>
                <td className="px-6 py-4 text-sm text-[#425873]">{order.quantity}</td>
                <td className="px-6 py-4">
                  <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", statusClasses(order.status))}>
                    {order.statusLabel}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#425873]">
                  {new Date(order.deliveryDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      className="rounded-lg border border-[#dbe5f1] px-3 py-2 text-xs font-semibold text-[#526883] transition-colors hover:text-[#215dbe]"
                      href={`/portal/orders#${order.id}`}
                    >
                      Details
                    </Link>
                    <Link
                      className="rounded-lg bg-[#ffac18] px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
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
    </section>
  );
}

export function QuoteActivity({ quotes }: { quotes: QuoteRequest[] }) {
  return (
    <section className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#10233f]">Quote Activity</h2>
          <p className="text-sm text-[#73839b]">Saved estimates and manual review requests from your team.</p>
        </div>
        <Link href="/portal/quotes" className="text-sm font-semibold text-[#215dbe]">
          Open configurator
        </Link>
      </div>

      <div className="space-y-3">
        {quotes.map((quote) => (
          <div key={quote.id} className="rounded-2xl bg-[#f6f9fd] px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#10233f]">{quote.title}</p>
                <p className="mt-1 text-xs text-[#73839b]">
                  {quote.productName} · {quote.quantity} units · {quote.decorationMethod}
                </p>
              </div>
              <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", quote.status === "submitted" ? "bg-[#e8f1ff] text-[#215dbe]" : "bg-[#eef1f5] text-[#60718d]")}>
                {quote.status === "submitted" ? "Submitted" : "Draft"}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#10233f]">
                ${quote.totalMin.toLocaleString()} - ${quote.totalMax.toLocaleString()}
              </p>
              <p className="text-xs text-[#73839b]">{quote.leadTime}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AssetPanel({ assets }: { assets: BrandAsset[] }) {
  return (
    <section className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#10233f]">Saved Assets</h2>
          <p className="text-sm text-[#73839b]">Linked brand files available for quotes and reorders.</p>
        </div>
        <Link href="/portal/assets" className="text-sm font-semibold text-[#215dbe]">
          Manage assets
        </Link>
      </div>
      <div className="space-y-3">
        {assets.map((asset) => (
          <div key={asset.id} className="rounded-2xl bg-[#f6f9fd] px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#10233f]">{asset.name}</p>
                <p className="mt-1 text-xs text-[#73839b]">
                  {asset.type} · {asset.sizeLabel}
                </p>
              </div>
              <span className="inline-flex rounded-full bg-[#eaf7ef] px-2.5 py-1 text-xs font-semibold text-[#2d8f59]">
                {asset.status === "ready" ? "Ready" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ApprovalPanel({ approvals }: { approvals: ApprovalItem[] }) {
  return (
    <section className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#10233f]">Approvals</h2>
          <p className="text-sm text-[#73839b]">Final proofs and operational checkpoints that need your sign-off.</p>
        </div>
      </div>
      <div className="space-y-3">
        {approvals.map((approval) => (
          <div key={approval.id} className="flex items-start gap-3 rounded-2xl bg-[#f6f9fd] px-4 py-3">
            <div className="mt-0.5 rounded-full bg-[#e8f1ff] p-1.5 text-[#215dbe]">
              <CheckCircle2 size={14} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#10233f]">{approval.title}</p>
              <p className="mt-1 text-xs text-[#73839b]">{approval.dueLabel}</p>
            </div>
            <span className="inline-flex rounded-full bg-[#fff4d9] px-2.5 py-1 text-xs font-semibold text-[#d18600]">
              {approval.status === "pending" ? "Pending" : "Approved"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function statusClasses(status: PortalOrder["status"]) {
  switch (status) {
    case "in-production":
      return "bg-[#e8f1ff] text-[#215dbe]";
    case "shipped":
      return "bg-[#fff2df] text-[#d17a00]";
    case "delivered":
      return "bg-[#eaf7ef] text-[#2d8f59]";
    case "confirmed":
      return "bg-[#edf3ff] text-[#215dbe]";
    default:
      return "bg-[#eef1f5] text-[#60718d]";
  }
}
