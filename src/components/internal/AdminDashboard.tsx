"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Package, TrendingUp, Users, WalletCards } from "lucide-react";

import type { InternalCrmData } from "@/lib/portal/internal-data";
import {
  APPROVAL_STATUS_OPTIONS,
  formatPortalStatusLabel,
  ORDER_STATUS_OPTIONS,
  QUOTE_STATUS_OPTIONS,
} from "@/lib/portal/record-mappers";
import { cn } from "@/lib/utils";

type Tab = "overview" | "orders" | "clients" | "pipeline";

const STATUS_COLORS: Record<string, string> = {
  delivered: "bg-green-50 text-green-700 border-green-200",
  "in-production": "bg-blue-50 text-blue-700 border-blue-200",
  "quality-control": "bg-indigo-50 text-indigo-700 border-indigo-200",
  shipped: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-slate-100 text-slate-700 border-slate-200",
  submitted: "bg-orange-50 text-orange-700 border-orange-200",
  "in-review": "bg-violet-50 text-violet-700 border-violet-200",
  quoted: "bg-cyan-50 text-cyan-700 border-cyan-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  converted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "changes-requested": "bg-rose-50 text-rose-700 border-rose-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function AdminDashboard({ data }: { data: InternalCrmData }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const stats = [
    {
      label: "Total Pipeline",
      value: `€${data.stats.totalPipeline.toLocaleString()}`,
      change: "Shared client record value",
      icon: TrendingUp,
    },
    {
      label: "Active Orders",
      value: `${data.stats.activeOrders}`,
      change: "Portal-synced production",
      icon: Package,
    },
    {
      label: "Active Clients",
      value: `${data.stats.activeClients}`,
      change: "Authenticated accounts",
      icon: Users,
    },
    {
      label: "Open Quotes",
      value: `${data.stats.openQuotes}`,
      change: "Awaiting follow-up",
      icon: WalletCards,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8faff] pt-8">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-2xl bg-[#0c1a2e] px-6 py-5 text-white">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">Internal CRM</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Merch Maverick Operations</h1>
          <p className="mt-2 text-sm text-white/65">
            Shared view of portal-linked clients, quotes, orders, and pipeline status.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-neutral-100 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-neutral-400">{stat.label}</p>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0f6ff]">
                  <stat.icon size={15} className="text-[#2351a4]" />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#0c1a2e]">{stat.value}</p>
              <p className="mt-1 text-xs text-green-600">
                <ArrowUpRight size={11} className="inline" /> {stat.change}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-1 rounded-xl border border-neutral-100 bg-white p-1 shadow-sm">
          {(["overview", "orders", "clients", "pipeline"] as const).map((tab) => (
            <button
              key={tab}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all",
                activeTab === tab
                  ? "bg-[#1e3a6e] text-white shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-[#1e3a6e]"
              )}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
              <div className="border-b border-neutral-100 px-5 py-4">
                <h2 className="font-bold text-[#0c1a2e]">Recent Orders</h2>
              </div>
              <div className="divide-y divide-neutral-50">
                {data.recentOrders.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-[#0c1a2e]">{order.orderNumber}</p>
                      <p className="text-xs text-neutral-400">{order.productName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          STATUS_COLORS[order.status] || "bg-neutral-100 text-neutral-600 border-neutral-200"
                        )}
                      >
                        {order.statusLabel}
                      </span>
                      <span className="text-sm font-bold text-[#0c1a2e]">
                        €{order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-[#0c1a2e]">Quote Pipeline</h2>
              <div className="mt-5 space-y-4">
                <Metric label="Submitted Quotes" value={data.stats.openQuotes} accent="bg-amber-400" />
                <Metric label="Active Production" value={data.stats.activeOrders} accent="bg-blue-400" />
                <Metric label="Account Coverage" value={data.stats.activeClients} accent="bg-green-400" />
              </div>
            </section>
          </div>
        )}

        {activeTab === "orders" && (
          <section className="mt-6 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    {["Order ID", "Product", "Category", "Value", "Status", "Update", "Created"].map((header) => (
                      <th
                        key={header}
                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {data.recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-5 py-3.5 text-xs font-semibold text-[#2351a4]">{order.orderNumber}</td>
                      <td className="px-5 py-3.5 text-sm font-medium text-[#0c1a2e]">{order.productName}</td>
                      <td className="px-5 py-3.5 text-sm text-neutral-500">{order.category}</td>
                      <td className="px-5 py-3.5 text-sm font-bold text-[#0c1a2e]">
                        €{order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={cn(
                            "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            STATUS_COLORS[order.status] || "bg-neutral-100 text-neutral-600 border-neutral-200"
                          )}
                        >
                          {order.statusLabel}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="space-y-3">
                          <RecordStatusUpdater
                            currentStatus={order.status}
                            options={ORDER_STATUS_OPTIONS}
                            recordId={order.id}
                            recordType="orders"
                          />
                          <OrderEventComposer orderId={order.id} />
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-neutral-400">{order.createdAt.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "clients" && (
          <section className="mt-6 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
            <div className="divide-y divide-neutral-50">
              {data.clients.map((client) => (
                <div key={client.email} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-[#0c1a2e]">{client.businessName}</p>
                    <p className="text-xs text-neutral-400">{client.email}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-neutral-400">Orders</p>
                      <p className="font-bold text-[#0c1a2e]">{client.orderCount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-neutral-400">Quotes</p>
                      <p className="font-bold text-[#0c1a2e]">{client.quoteCount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-neutral-400">Order Value</p>
                      <p className="font-bold text-[#0c1a2e]">€{client.totalValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "pipeline" && (
          <div className="mt-6 space-y-6">
            <section className="grid gap-4 lg:grid-cols-2">
              {data.recentQuotes.map((quote) => (
                <div key={quote.id} className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                        {formatPortalStatusLabel(quote.status)}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-[#0c1a2e]">{quote.title}</h3>
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        STATUS_COLORS[quote.status] || "bg-neutral-100 text-neutral-600 border-neutral-200"
                      )}
                    >
                      {formatPortalStatusLabel(quote.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    {quote.productName} · {quote.quantity} units · {quote.decorationMethod}
                  </p>
                  <p className="mt-3 text-xl font-bold text-[#1e3a6e]">
                    €{quote.totalMax.toLocaleString()}
                  </p>
                  <div className="mt-4">
                    <RecordStatusUpdater
                      currentStatus={quote.status}
                      options={QUOTE_STATUS_OPTIONS}
                      recordId={quote.id}
                      recordType="quotes"
                    />
                  </div>
                  {(quote.status === "approved" || quote.status === "quoted") && !quote.convertedOrderId ? (
                    <div className="mt-3">
                      <QuoteConversionButton quoteId={quote.id} />
                    </div>
                  ) : null}
                </div>
              ))}
            </section>

            <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
              <div>
                <h2 className="font-bold text-[#0c1a2e]">Approvals Queue</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Move proof and checkpoint records between pending and approved.
                </p>
              </div>
              <div className="mt-5 space-y-3">
                {data.approvals.map((approval) => (
                  <div
                    key={approval.id}
                    className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 px-4 py-4 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#0c1a2e]">{approval.title}</p>
                      <p className="mt-1 text-xs text-neutral-500">{approval.dueLabel}</p>
                    </div>
                    <div className="flex flex-col gap-3 lg:items-end">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          STATUS_COLORS[approval.status] || "bg-neutral-100 text-neutral-600 border-neutral-200"
                        )}
                      >
                        {formatPortalStatusLabel(approval.status)}
                      </span>
                      <RecordStatusUpdater
                        currentStatus={approval.status}
                        options={APPROVAL_STATUS_OPTIONS}
                        recordId={approval.id}
                        recordType="approvals"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-neutral-500">{label}</span>
        <span className="text-sm font-bold text-[#0c1a2e]">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
        <div className={cn("h-full rounded-full", accent)} style={{ width: `${Math.min(100, value * 20)}%` }} />
      </div>
    </div>
  );
}

function RecordStatusUpdater({
  recordType,
  recordId,
  currentStatus,
  options,
}: {
  recordType: "orders" | "quotes" | "approvals";
  recordId: string;
  currentStatus: string;
  options: readonly string[];
}) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  async function handleSave() {
    setIsSaving(true);
    setFeedback("");

    const response = await fetch(`/api/admin/records/${recordType}/${recordId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: selectedStatus }),
    });

    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setFeedback(payload?.error ?? "Update failed.");
      setIsSaving(false);
      return;
    }

    setFeedback("Saved");
    router.refresh();
    setIsSaving(false);
  }

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
      <select
        className="min-w-[140px] rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-[#0c1a2e] outline-none"
        disabled={isSaving}
        onChange={(event) => setSelectedStatus(event.target.value)}
        value={selectedStatus}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {formatPortalStatusLabel(option)}
          </option>
        ))}
      </select>
      <button
        className="rounded-lg bg-[#1e3a6e] px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSaving || selectedStatus === currentStatus}
        onClick={() => void handleSave()}
        type="button"
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
      {feedback ? <p className="text-xs text-neutral-500">{feedback}</p> : null}
    </div>
  );
}

function QuoteConversionButton({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleConvert() {
    setIsSaving(true);
    setFeedback("");

    const response = await fetch(`/api/admin/quotes/${quoteId}/convert`, {
      method: "POST",
    });

    const payload = (await response.json().catch(() => null)) as { error?: string; orderNumber?: string } | null;
    if (!response.ok) {
      setFeedback(payload?.error ?? "Conversion failed.");
      setIsSaving(false);
      return;
    }

    setFeedback(payload?.orderNumber ? `Created ${payload.orderNumber}` : "Converted");
    router.refresh();
    setIsSaving(false);
  }

  return (
    <button
      className="rounded-lg bg-[#0f7a5d] px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      disabled={isSaving}
      onClick={() => void handleConvert()}
      type="button"
    >
      {isSaving ? "Converting..." : feedback || "Convert to order"}
    </button>
  );
}

function OrderEventComposer({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleCreate() {
    if (!label.trim()) {
      setFeedback("Add a milestone label first.");
      return;
    }

    setIsSaving(true);
    setFeedback("");

    const response = await fetch(`/api/admin/orders/${orderId}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label,
        state: "current",
      }),
    });

    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setFeedback(payload?.error ?? "Milestone update failed.");
      setIsSaving(false);
      return;
    }

    setFeedback("Milestone added");
    setLabel("");
    router.refresh();
    setIsSaving(false);
  }

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
      <input
        className="min-w-[160px] rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-[#0c1a2e] outline-none"
        onChange={(event) => setLabel(event.target.value)}
        placeholder="Add milestone"
        value={label}
      />
      <button
        className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-[#1e3a6e] transition-colors hover:bg-neutral-50 disabled:opacity-60"
        disabled={isSaving}
        onClick={() => void handleCreate()}
        type="button"
      >
        {isSaving ? "Adding..." : "Add event"}
      </button>
      {feedback ? <p className="text-xs text-neutral-500">{feedback}</p> : null}
    </div>
  );
}
