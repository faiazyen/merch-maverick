import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Package, WalletCards } from "lucide-react";

import { PortalApprovalActions } from "@/components/portal/PortalApprovalActions";
import { formatPortalStatusLabel } from "@/lib/portal/record-mappers";
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
          <p className="text-sm text-[#73839b]">Track transparent production milestones from deposit and artwork approval through QC, shipment, and delivery.</p>
        </div>
        <Link href="/portal/orders" className="text-sm font-semibold text-[#215dbe]">
          View full history
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#215dbe]">
            <Package size={20} />
          </div>
          <p className="mt-4 text-sm font-semibold text-[#10233f]">No active orders yet</p>
          <p className="mt-1 text-xs text-[#73839b]">Once your first quote is approved and deposit confirmed, your order will appear here.</p>
          <Link href="/portal/quotes" className="mt-5 inline-flex rounded-xl bg-[#ffac18] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90">
            Start a quote
          </Link>
        </div>
      ) : (
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
      )}
    </section>
  );
}

export function QuoteActivity({ quotes }: { quotes: QuoteRequest[] }) {
  return (
    <section className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#10233f]">Quote Activity</h2>
          <p className="text-sm text-[#73839b]">Saved benchmarks and reviewed requests, including any manual surcharge or spec follow-up from our team.</p>
        </div>
        <Link href="/portal/quotes" className="text-sm font-semibold text-[#215dbe]">
          Open configurator
        </Link>
      </div>

      {quotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm font-semibold text-[#10233f]">No quotes yet</p>
          <p className="mt-1 text-xs text-[#73839b]">Use the configurator to build and submit your first quote estimate.</p>
        </div>
      ) : (
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
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                    quoteStatusClasses(quote.status)
                  )}
                >
                  {formatPortalStatusLabel(quote.status)}
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
      )}
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
      {assets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm font-semibold text-[#10233f]">No files saved yet</p>
          <p className="mt-1 text-xs text-[#73839b]">Upload your brand logos and guidelines to keep them linked to quotes and reorders.</p>
        </div>
      ) : (
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
      )}
    </section>
  );
}

export function ApprovalPanel({ approvals }: { approvals: ApprovalItem[] }) {
  return (
    <section className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#10233f]">Approvals</h2>
          <p className="text-sm text-[#73839b]">Proofs, artwork checkpoints, and production approvals that need your sign-off before the next release step.</p>
        </div>
      </div>
      {approvals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm font-semibold text-[#10233f]">No pending approvals</p>
          <p className="mt-1 text-xs text-[#73839b]">Artwork proofs and production checkpoints will appear here when they need your sign-off.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {approvals.map((approval) => (
            <div key={approval.id} className="flex items-start gap-3 rounded-2xl bg-[#f6f9fd] px-4 py-3">
              <div className="mt-0.5 rounded-full bg-[#e8f1ff] p-1.5 text-[#215dbe]">
                <CheckCircle2 size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#10233f]">{approval.title}</p>
                <p className="mt-1 text-xs text-[#73839b]">{approval.dueLabel}</p>
                <PortalApprovalActions approvalId={approval.id} status={approval.status} />
              </div>
              <span
                className={cn(
                  "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
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

function statusClasses(status: PortalOrder["status"]) {
  switch (status) {
    case "in-production":
      return "bg-[#e8f1ff] text-[#215dbe]";
    case "quality-control":
      return "bg-[#eef0ff] text-[#5347c6]";
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

function quoteStatusClasses(status: QuoteRequest["status"]) {
  switch (status) {
    case "submitted":
      return "bg-[#e8f1ff] text-[#215dbe]";
    case "in-review":
      return "bg-[#eef0ff] text-[#5347c6]";
    case "quoted":
      return "bg-[#edfaff] text-[#006680]";
    case "approved":
      return "bg-[#eaf7ef] text-[#2d8f59]";
    case "rejected":
      return "bg-[#fff1eb] text-[#c55a11]";
    case "converted":
      return "bg-[#e8f8ee] text-[#0f7a5d]";
    default:
      return "bg-[#eef1f5] text-[#60718d]";
  }
}

function approvalStatusClasses(status: ApprovalItem["status"]) {
  switch (status) {
    case "approved":
      return "bg-[#eaf7ef] text-[#2d8f59]";
    case "changes-requested":
      return "bg-[#fff1eb] text-[#c55a11]";
    default:
      return "bg-[#fff4d9] text-[#d18600]";
  }
}
