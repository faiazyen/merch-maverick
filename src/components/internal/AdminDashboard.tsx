"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Package,
  Pencil,
  Search,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { InternalCrmData } from "@/lib/portal/internal-data";
import type { QuoteRequest } from "@/lib/portal/types";
import {
  APPROVAL_STATUS_OPTIONS,
  formatPortalStatusLabel,
  ORDER_STATUS_OPTIONS,
  QUOTE_STATUS_OPTIONS,
} from "@/lib/portal/record-mappers";
import { extractQuoteSignals, inferProductionPath } from "@/lib/portal/workflow";
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [orderQuery, setOrderQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [clientQuery, setClientQuery] = useState("");
  const [pipelineQuery, setPipelineQuery] = useState("");
  const [pipelineStatusFilter, setPipelineStatusFilter] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/");
  }

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

  const filteredOrders = data.recentOrders.filter((order) => {
    const query = orderQuery.trim().toLowerCase();
    const matchesQuery =
      query.length === 0 ||
      order.orderNumber.toLowerCase().includes(query) ||
      order.productName.toLowerCase().includes(query) ||
      order.category.toLowerCase().includes(query) ||
      order.clientName?.toLowerCase().includes(query) ||
      order.clientEmail?.toLowerCase().includes(query);
    const matchesStatus = orderStatusFilter === "all" || order.status === orderStatusFilter;
    return matchesQuery && matchesStatus;
  });

  const filteredClients = data.clients.filter((client) => {
    const query = clientQuery.trim().toLowerCase();
    return (
      query.length === 0 ||
      client.businessName.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query)
    );
  });

  const filteredQuotes = data.recentQuotes.filter((quote) => {
    const query = pipelineQuery.trim().toLowerCase();
    const matchesQuery =
      query.length === 0 ||
      quote.title.toLowerCase().includes(query) ||
      quote.productName.toLowerCase().includes(query) ||
      quote.clientName?.toLowerCase().includes(query) ||
      quote.clientEmail?.toLowerCase().includes(query);
    const matchesStatus = pipelineStatusFilter === "all" || quote.status === pipelineStatusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Top header — Printify-style clean white bar */}
      <header className="border-b border-[#E5E2DB] bg-white px-6 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280]">The Merch Maverick</p>
            <h1 className="mt-0.5 text-3xl font-extrabold tracking-tight text-[#1A1A1A]">Operations</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/catalogue"
              className="rounded-xl border border-[#E5E2DB] bg-white px-4 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F5F4F0]"
            >
              Catalogue →
            </a>
            <button
              onClick={() => void handleSignOut()}
              type="button"
              className="rounded-xl bg-[#2b6b5e] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1f5248]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-[#6B7280]">{stat.label}</p>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2b6b5e]/20">
                  <stat.icon size={16} className="text-[#1A1A1A]" />
                </div>
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">{stat.value}</p>
              <p className="mt-1.5 flex items-center gap-1 text-xs text-[#6B7280]">
                <ArrowUpRight size={11} /> {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Tab navigation */}
        <div className="mt-6 flex items-center gap-1.5 rounded-2xl border border-[#E5E2DB] bg-white p-1.5">
          {(["overview", "orders", "clients", "pipeline"] as const).map((tab) => (
            <button
              key={tab}
              className={cn(
                "rounded-xl px-5 py-2.5 text-sm font-semibold capitalize transition-all",
                activeTab === tab
                  ? "bg-[#1A1A1A] text-white shadow-sm"
                  : "text-[#6B7280] hover:bg-[#F5F4F0] hover:text-[#1A1A1A]"
              )}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="border-b border-[#E5E2DB] px-6 py-5">
                <h2 className="text-xl font-bold text-[#1A1A1A]">Recent Orders</h2>
              </div>
              <div className="divide-y divide-[#F5F4F0]">
                {data.recentOrders.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-4">
                    <div>
                      <p className="text-[15px] font-semibold text-[#1A1A1A]">{order.orderNumber}</p>
                      <p className="text-sm text-[#6B7280]">
                        {order.productName}
                        {order.clientName ? ` · ${order.clientName}` : ""}
                      </p>
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
                      <span className="text-[15px] font-bold text-[#1A1A1A]">
                        €{order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Quote Pipeline</h2>
              <p className="mt-1.5 text-sm text-[#6B7280]">
                Review client intent first, then confirm surcharges, production path, and next actions.
              </p>
              <div className="mt-6 space-y-4">
                <Metric label="Submitted Quotes" value={data.stats.openQuotes} accent="bg-amber-400" />
                <Metric label="Active Production" value={data.stats.activeOrders} accent="bg-[#2b6b5e]" />
                <Metric label="Account Coverage" value={data.stats.activeClients} accent="bg-emerald-400" />
              </div>
            </section>
          </div>
        )}

        {/* Orders tab */}
        {activeTab === "orders" && (
          <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-[#E5E2DB] px-6 py-4 lg:flex-row lg:items-center">
              <SearchField
                onChange={setOrderQuery}
                placeholder="Search order ID, product, client, or email"
                value={orderQuery}
              />
              <FilterSelect
                onChange={setOrderStatusFilter}
                options={["all", ...ORDER_STATUS_OPTIONS]}
                value={orderStatusFilter}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E2DB] bg-[#F5F4F0]">
                    {["Order ID", "Client", "Product", "Value", "Status", "Operations", "Created"].map((header) => (
                      <th
                        key={header}
                        className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F4F0]">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAFAF8]">
                      <td className="px-5 py-4 text-sm font-bold text-[#1A1A1A]">{order.orderNumber}</td>
                      <td className="px-5 py-4">
                        <p className="text-[15px] font-medium text-[#1A1A1A]">{order.clientName ?? "Client"}</p>
                        <p className="text-sm text-[#6B7280]">{order.clientEmail ?? "Portal account"}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-[15px] font-medium text-[#1A1A1A]">{order.productName}</p>
                        <p className="text-sm text-[#6B7280]">{order.category}</p>
                      </td>
                      <td className="px-5 py-4 text-[15px] font-bold text-[#1A1A1A]">
                        €{order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            STATUS_COLORS[order.status] || "bg-neutral-100 text-neutral-600 border-neutral-200"
                          )}
                        >
                          {order.statusLabel}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-3">
                          <button
                            className="flex items-center gap-1.5 rounded-lg border border-[#E5E2DB] bg-white px-3 py-1.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F5F4F0]"
                            onClick={() => setSelectedOrderId(order.id)}
                            type="button"
                          >
                            <Pencil size={13} />
                            Edit order
                          </button>
                          <RecordOpsEditor
                            key={`${order.id}:${order.status}:${order.assignedTo ?? ""}:${order.internalNotes ?? ""}`}
                            currentNotes={order.internalNotes}
                            currentOwner={order.assignedTo}
                            currentStatus={order.status}
                            options={ORDER_STATUS_OPTIONS}
                            recordId={order.id}
                            recordType="orders"
                          />
                          <OrderEventComposer orderId={order.id} />
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#6B7280]">{order.createdAt.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Clients tab */}
        {activeTab === "clients" && (
          <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="border-b border-[#E5E2DB] px-6 py-4">
              <SearchField
                onChange={setClientQuery}
                placeholder="Search client business name or email"
                value={clientQuery}
              />
            </div>
            <div className="divide-y divide-[#F5F4F0]">
              {filteredClients.map((client) => (
                <div key={client.email} className="flex items-center justify-between px-6 py-5 hover:bg-[#FAFAF8]">
                  <div>
                    <p className="text-[15px] font-semibold text-[#1A1A1A]">{client.businessName}</p>
                    <p className="text-sm text-[#6B7280]">{client.email}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs font-medium text-[#6B7280]">Orders</p>
                      <p className="text-lg font-bold text-[#1A1A1A]">{client.orderCount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-[#6B7280]">Quotes</p>
                      <p className="text-lg font-bold text-[#1A1A1A]">{client.quoteCount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-[#6B7280]">Order Value</p>
                      <p className="text-lg font-bold text-[#1A1A1A]">€{client.totalValue.toLocaleString()}</p>
                    </div>
                    <button
                      className="flex items-center gap-1.5 rounded-xl border border-[#E5E2DB] bg-white px-3 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F5F4F0]"
                      onClick={() => setSelectedClientId(client.id)}
                      type="button"
                    >
                      <Pencil size={13} />
                      View / Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pipeline tab */}
        {activeTab === "pipeline" && (
          <div className="mt-6 space-y-6">
            <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
              <SearchField
                onChange={setPipelineQuery}
                placeholder="Search quote title, product, client, or email"
                value={pipelineQuery}
              />
              <FilterSelect
                onChange={setPipelineStatusFilter}
                options={["all", ...QUOTE_STATUS_OPTIONS]}
                value={pipelineStatusFilter}
              />
            </div>
            <section className="grid gap-4 lg:grid-cols-2">
              {filteredQuotes.map((quote) => (
                <div key={quote.id} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                        {formatPortalStatusLabel(quote.status)}
                      </p>
                      <h3 className="mt-1.5 text-xl font-bold text-[#1A1A1A]">{quote.title}</h3>
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
                  <p className="mt-2 text-sm text-[#6B7280]">
                    {quote.clientName ?? "Client"} · {quote.clientEmail ?? "Portal account"}
                  </p>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    {quote.productName} · {quote.quantity} units · {quote.decorationMethod}
                  </p>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    {inferProductionPath(quote).label} · {buildQuoteNextAction(quote)}
                  </p>
                  <p className="mt-4 text-2xl font-extrabold text-[#1A1A1A]">
                    €{quote.totalMax.toLocaleString()}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      className="rounded-xl border border-[#E5E2DB] px-4 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F5F4F0]"
                      onClick={() => setSelectedQuote(quote)}
                      type="button"
                    >
                      View details
                    </button>
                    {(quote.status === "approved" || quote.status === "quoted") && !quote.convertedOrderId ? (
                      <QuoteConversionButton quoteId={quote.id} />
                    ) : null}
                  </div>
                </div>
              ))}
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-[#1A1A1A]">Approvals Queue</h2>
                <p className="mt-1.5 text-sm text-[#6B7280]">
                  Move proof and checkpoint records between pending and approved without hiding client-visible workflow steps.
                </p>
              </div>
              <div className="mt-5 space-y-3">
                {data.approvals.map((approval) => (
                  <div
                    key={approval.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[#E5E2DB] bg-[#F5F4F0] px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div>
                      <p className="text-[15px] font-semibold text-[#1A1A1A]">{approval.title}</p>
                      <p className="mt-1 text-sm text-[#6B7280]">{approval.dueLabel}</p>
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

      {selectedQuote ? <QuoteDetailDrawer onClose={() => setSelectedQuote(null)} quote={selectedQuote} /> : null}
      {selectedOrderId ? (
        <OrderEditDrawer
          onClose={() => setSelectedOrderId(null)}
          order={data.recentOrders.find((o) => o.id === selectedOrderId)!}
        />
      ) : null}
      {selectedClientId ? (
        <ClientDetailDrawer clientId={selectedClientId} onClose={() => setSelectedClientId(null)} />
      ) : null}
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-[#6B7280]">{label}</span>
        <span className="text-base font-bold text-[#1A1A1A]">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#F5F4F0]">
        <div className={cn("h-full rounded-full", accent)} style={{ width: `${Math.min(100, value * 20)}%` }} />
      </div>
    </div>
  );
}

function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-[#E5E2DB] bg-white px-4 py-2.5">
      <Search size={16} className="text-[#6B7280]" />
      <input
        className="w-full bg-transparent text-[15px] text-[#1A1A1A] outline-none placeholder:text-[#9CA3AF]"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function FilterSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      className="rounded-xl border border-[#E5E2DB] bg-white px-4 py-2.5 text-[15px] text-[#1A1A1A] outline-none"
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option === "all" ? "All statuses" : formatPortalStatusLabel(option)}
        </option>
      ))}
    </select>
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
      headers: { "Content-Type": "application/json" },
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
        className="min-w-[140px] rounded-xl border border-[#E5E2DB] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none"
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
        className="rounded-xl bg-[#2b6b5e] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1f5248] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSaving || selectedStatus === currentStatus}
        onClick={() => void handleSave()}
        type="button"
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
      {feedback ? <p className="text-xs text-[#6B7280]">{feedback}</p> : null}
    </div>
  );
}

function RecordOpsEditor({
  recordType,
  recordId,
  currentStatus,
  currentOwner,
  currentNotes,
  options,
}: {
  recordType: "orders" | "quotes";
  recordId: string;
  currentStatus: string;
  currentOwner?: string;
  currentNotes?: string;
  options: readonly string[];
}) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [owner, setOwner] = useState(currentOwner ?? "");
  const [notes, setNotes] = useState(currentNotes ?? "");
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    setFeedback("");

    const response = await fetch(`/api/admin/records/${recordType}/${recordId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: selectedStatus, assignedTo: owner, internalNotes: notes }),
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

  const isDirty =
    selectedStatus !== currentStatus || owner !== (currentOwner ?? "") || notes !== (currentNotes ?? "");

  return (
    <div className="space-y-2 rounded-xl border border-[#E5E2DB] bg-[#F5F4F0] p-3">
      <div className="grid gap-2 lg:grid-cols-[140px_1fr]">
        <select
          className="rounded-xl border border-[#E5E2DB] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none"
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
        <input
          className="rounded-xl border border-[#E5E2DB] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none"
          disabled={isSaving}
          onChange={(event) => setOwner(event.target.value)}
          placeholder="Assigned owner"
          value={owner}
        />
      </div>
      <textarea
        className="min-h-[72px] w-full rounded-xl border border-[#E5E2DB] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none"
        disabled={isSaving}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Ops notes, surcharge rationale, sampling direction, or shipping guidance"
        value={notes}
      />
      <div className="flex items-center gap-2">
        <button
          className="rounded-xl bg-[#2b6b5e] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1f5248] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSaving || !isDirty}
          onClick={() => void handleSave()}
          type="button"
        >
          {isSaving ? "Saving..." : "Save ops update"}
        </button>
        {feedback ? <p className="text-xs text-[#6B7280]">{feedback}</p> : null}
      </div>
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

    const response = await fetch(`/api/admin/quotes/${quoteId}/convert`, { method: "POST" });

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
      className="rounded-xl bg-[#2b6b5e] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1f5248] disabled:opacity-60"
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, state: "current" }),
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
        className="min-w-[160px] rounded-xl border border-[#E5E2DB] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none"
        onChange={(event) => setLabel(event.target.value)}
        placeholder="Add client-visible milestone"
        value={label}
      />
      <button
        className="rounded-xl border border-[#E5E2DB] bg-white px-3 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F5F4F0] disabled:opacity-60"
        disabled={isSaving}
        onClick={() => void handleCreate()}
        type="button"
      >
        {isSaving ? "Adding..." : "Add event"}
      </button>
      {feedback ? <p className="text-xs text-[#6B7280]">{feedback}</p> : null}
    </div>
  );
}

function QuoteDetailDrawer({ quote, onClose }: { quote: QuoteRequest; onClose: () => void }) {
  const productionPath = inferProductionPath(quote);
  const surchargeSignals = extractQuoteSignals(quote.notes);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-[#E5E2DB] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">Quote detail</p>
            <h2 className="mt-1.5 text-2xl font-bold text-[#1A1A1A]">{quote.title}</h2>
          </div>
          <button
            className="rounded-full border border-[#E5E2DB] p-2 text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <section className="rounded-2xl border border-[#E5E2DB] bg-[#F5F4F0] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">Client intent summary</p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#1A1A1A]">{buildClientIntentSummary(quote)}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SignalCard label="Production path" value={productionPath.label} description={productionPath.description} />
              <SignalCard
                label="Next operator action"
                value={buildQuoteNextAction(quote)}
                description="Use the ops controls below after the intent and commercial direction are clear."
              />
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <DetailCard label="Client" value={quote.clientName ?? "Portal account"} />
            <DetailCard label="Client email" value={quote.clientEmail ?? "Not available"} />
            <DetailCard label="Product" value={quote.productName} />
            <DetailCard label="Quantity" value={`${quote.quantity} units`} />
            <DetailCard label="Decoration" value={quote.decorationMethod} />
            <DetailCard label="Destination" value={quote.destination || "Not set"} />
            <DetailCard label="Shipping" value={quote.shippingMethod || "Not set"} />
            <DetailCard label="Lead time" value={quote.leadTime || "Pending"} />
            <DetailCard label="Status" value={formatPortalStatusLabel(quote.status)} />
            <DetailCard label="Linked assets" value={`${quote.linkedAssetIds.length}`} />
          </div>

          <section className="rounded-2xl border border-[#E5E2DB] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">Commercial summary</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SignalCard
                label="Benchmark estimate"
                value={`€${quote.totalMin.toLocaleString()} - €${quote.totalMax.toLocaleString()}`}
                description="This is the catalogue-backed range before any manual surcharge handling."
              />
              <SignalCard
                label="Manual surcharge review"
                value={surchargeSignals.length > 0 ? "Requested extras found" : "No explicit trigger in client notes"}
                description="Fabric upgrades, design support, sampling, paid QC, and shipping exceptions should be added manually through ops review."
              />
            </div>
            {surchargeSignals.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {surchargeSignals.map((signal) => (
                  <span key={signal} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                    {signal}
                  </span>
                ))}
              </div>
            ) : null}
          </section>

          <section className="rounded-2xl border border-[#E5E2DB] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">Portal notes</p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#1A1A1A]">
              {quote.notes || "No client notes were provided on this quote."}
            </p>
          </section>

          <section className="rounded-2xl border border-[#E5E2DB] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">Operations controls</p>
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
              Keep surcharge decisions, production-path confirmation, and execution notes explicit here until structured line items are introduced in a later phase.
            </p>
            <div className="mt-4">
              <RecordOpsEditor
                key={`${quote.id}:${quote.status}:${quote.assignedTo ?? ""}:${quote.internalNotes ?? ""}`}
                currentNotes={quote.internalNotes}
                currentOwner={quote.assignedTo}
                currentStatus={quote.status}
                options={QUOTE_STATUS_OPTIONS}
                recordId={quote.id}
                recordType="quotes"
              />
            </div>
            {(quote.status === "approved" || quote.status === "quoted") && !quote.convertedOrderId ? (
              <div className="mt-4">
                <QuoteConversionButton quoteId={quote.id} />
              </div>
            ) : null}
          </section>

          <div className="rounded-2xl border border-[#E5E2DB] bg-[#F5F4F0] px-5 py-4 text-sm text-[#6B7280]">
            Created: {quote.createdAt.slice(0, 10)} · Updated: {quote.updatedAt.slice(0, 10)} ·
            Estimate range: €{quote.totalMin.toLocaleString()} - €{quote.totalMax.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E2DB] bg-[#F5F4F0] px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{label}</p>
      <p className="mt-2 text-[15px] font-medium text-[#1A1A1A]">{value}</p>
    </div>
  );
}

function SignalCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E2DB] bg-white px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{label}</p>
      <p className="mt-2 text-[15px] font-semibold text-[#1A1A1A]">{value}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">{description}</p>
    </div>
  );
}

function buildClientIntentSummary(quote: QuoteRequest) {
  const pieces = [
    `${quote.clientName ?? "The client"} is requesting ${quote.quantity} units of ${quote.productName}`,
    `with ${quote.decorationMethod.replace("-", " ")} decoration`,
    `shipping toward ${quote.destination || "the target destination"}`,
  ];
  if (quote.notes.trim()) pieces.push("and has left additional brief notes for ops review");
  return `${pieces.join(" ")}.`;
}

function buildQuoteNextAction(quote: QuoteRequest) {
  switch (quote.status) {
    case "submitted": return "Review the brief and confirm whether manual surcharges are needed.";
    case "in-review": return "Align the pricing response, production path, and shipping direction.";
    case "quoted": return "Follow up on approval timing, deposit readiness, and artwork next steps.";
    case "approved": return "Convert the quote to an order and release the first client-visible milestone.";
    case "converted": return "Move execution into the order record and keep progress updated.";
    case "rejected": return "Capture feedback and decide whether a revised quote should be issued.";
    case "draft": return "Wait for submission before operational work begins.";
    default: return "Review the request and confirm the next commercial step.";
  }
}

function OrderEditDrawer({
  order,
  onClose,
}: {
  order: ReturnType<typeof Array.prototype.find> & {
    id: string;
    orderNumber: string;
    productName: string;
    totalAmount: number;
    status: string;
  };
  onClose: () => void;
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(String(order.quantity ?? ""));
  const [unitPrice, setUnitPrice] = useState(String(order.unitPrice ?? ""));
  const [totalValue, setTotalValue] = useState(String(order.totalAmount ?? ""));
  const [catalogItemId, setCatalogItemId] = useState(String(order.catalogItemId ?? ""));
  const [deliveryDate, setDeliveryDate] = useState(String(order.expectedDeliveryDate ?? ""));
  const [cancellationReason, setCancellationReason] = useState(String(order.cancellationReason ?? ""));
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    setFeedback("");

    const payload: Record<string, unknown> = { status: order.status };
    if (quantity.trim()) payload.quantity = Number(quantity);
    if (unitPrice.trim()) payload.unitPrice = Number(unitPrice);
    if (totalValue.trim()) payload.totalValue = Number(totalValue);
    if (catalogItemId.trim()) payload.catalogItemId = catalogItemId.trim();
    if (deliveryDate.trim()) payload.expectedDeliveryDate = deliveryDate.trim();
    if (cancellationReason.trim()) payload.cancellationReason = cancellationReason.trim();

    const response = await fetch(`/api/admin/records/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setFeedback(data?.error ?? "Update failed.");
      setIsSaving(false);
      return;
    }

    setFeedback("Saved");
    router.refresh();
    setIsSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-[#E5E2DB] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">Edit order</p>
            <h2 className="mt-1 text-xl font-bold text-[#1A1A1A]">{order.orderNumber}</h2>
            <p className="text-sm text-[#6B7280]">{order.productName}</p>
          </div>
          <button
            className="rounded-full border border-[#E5E2DB] p-2 text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Quantity</span>
              <input
                className="rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e] focus:ring-2 focus:ring-[#2b6b5e]/20"
                min="1"
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 500"
                type="number"
                value={quantity}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Unit price (€)</span>
              <input
                className="rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e] focus:ring-2 focus:ring-[#2b6b5e]/20"
                min="0"
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="e.g. 18.50"
                step="0.01"
                type="number"
                value={unitPrice}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Total value (€)</span>
              <input
                className="rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e] focus:ring-2 focus:ring-[#2b6b5e]/20"
                min="0"
                onChange={(e) => setTotalValue(e.target.value)}
                placeholder="e.g. 9250.00"
                step="0.01"
                type="number"
                value={totalValue}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Expected delivery</span>
              <input
                className="rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e] focus:ring-2 focus:ring-[#2b6b5e]/20"
                onChange={(e) => setDeliveryDate(e.target.value)}
                type="date"
                value={deliveryDate}
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Catalog item ID</span>
            <input
              className="rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e] focus:ring-2 focus:ring-[#2b6b5e]/20"
              onChange={(e) => setCatalogItemId(e.target.value)}
              placeholder="UUID of the assigned catalog product"
              value={catalogItemId}
            />
          </label>
          {order.status === "cancelled" && (
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Cancellation reason</span>
              <textarea
                className="min-h-[80px] rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e] focus:ring-2 focus:ring-[#2b6b5e]/20"
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Reason for cancellation"
                value={cancellationReason}
              />
            </label>
          )}
          <div className="flex items-center gap-3 pt-2">
            <button
              className="rounded-xl bg-[#2b6b5e] px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1f5248] disabled:opacity-60"
              disabled={isSaving}
              onClick={() => void handleSave()}
              type="button"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
            <button
              className="rounded-xl border border-[#E5E2DB] px-4 py-2.5 text-[15px] font-medium text-[#6B7280] transition-colors hover:bg-[#F5F4F0]"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            {feedback ? (
              <p className={cn("text-sm", feedback === "Saved" ? "text-emerald-600" : "text-red-600")}>
                {feedback}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientDetailDrawer({ clientId, onClose }: { clientId: string; onClose: () => void }) {
  const router = useRouter();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [orders, setOrders] = useState<unknown[]>([]);
  const [quotes, setQuotes] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [businessName, setBusinessName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [suspended, setSuspended] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const response = await fetch(`/api/admin/clients/${clientId}`);
      if (response.ok) {
        const data = (await response.json()) as {
          profile: Record<string, unknown>;
          orders: unknown[];
          quotes: unknown[];
        };
        setProfile(data.profile);
        setOrders(data.orders);
        setQuotes(data.quotes);
        setBusinessName(String(data.profile.business_name ?? ""));
        setFullName(String(data.profile.full_name ?? ""));
        setPhone(String(data.profile.phone ?? ""));
        setCountry(String(data.profile.country ?? ""));
        setIndustry(String(data.profile.industry ?? ""));
        setSuspended(Boolean(data.profile.suspended));
      }
      setIsLoading(false);
    }
    void load();
  }, [clientId]);

  async function handleSave() {
    setIsSaving(true);
    setFeedback("");
    const response = await fetch(`/api/admin/clients/${clientId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessName, fullName, phone, country, industry, suspended }),
    });
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setFeedback(data?.error ?? "Update failed.");
      setIsSaving(false);
      return;
    }
    setFeedback("Saved");
    router.refresh();
    setIsSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-[#E5E2DB] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">Client record</p>
            <h2 className="mt-1 text-xl font-bold text-[#1A1A1A]">
              {isLoading ? "Loading..." : String(profile?.business_name ?? "Client")}
            </h2>
            <p className="text-sm text-[#6B7280]">{String(profile?.email ?? "")}</p>
          </div>
          <button
            className="rounded-full border border-[#E5E2DB] p-2 text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-[15px] text-[#6B7280]">Loading client data...</p>
          </div>
        ) : (
          <div className="space-y-6 px-6 py-6">
            <section className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">Edit profile</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-[#6B7280]">Business name</span>
                  <input
                    className="rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e]"
                    onChange={(e) => setBusinessName(e.target.value)}
                    value={businessName}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-[#6B7280]">Full name</span>
                  <input
                    className="rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e]"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-[#6B7280]">Phone</span>
                  <input
                    className="rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e]"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-[#6B7280]">Country</span>
                  <input
                    className="rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e]"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  />
                </label>
                <label className="flex flex-col gap-1.5 sm:col-span-2">
                  <span className="text-sm font-medium text-[#6B7280]">Industry</span>
                  <input
                    className="rounded-xl border border-[#E5E2DB] px-3 py-2.5 text-[15px] text-[#1A1A1A] outline-none focus:border-[#2b6b5e]"
                    onChange={(e) => setIndustry(e.target.value)}
                    value={industry}
                  />
                </label>
              </div>
              <label className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <input
                  checked={suspended}
                  className="h-4 w-4 rounded border-red-300 text-red-600"
                  onChange={(e) => setSuspended(e.target.checked)}
                  type="checkbox"
                />
                <div>
                  <p className="text-[15px] font-semibold text-red-700">Suspend account</p>
                  <p className="text-sm text-red-600">Client will not be able to access the portal.</p>
                </div>
              </label>
              <div className="flex items-center gap-3">
                <button
                  className="rounded-xl bg-[#2b6b5e] px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1f5248] disabled:opacity-60"
                  disabled={isSaving}
                  onClick={() => void handleSave()}
                  type="button"
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
                {feedback ? (
                  <p className={cn("text-sm", feedback === "Saved" ? "text-emerald-600" : "text-red-600")}>
                    {feedback}
                  </p>
                ) : null}
              </div>
            </section>

            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                Orders ({orders.length})
              </p>
              <div className="space-y-2">
                {orders.length === 0 ? (
                  <p className="text-[15px] text-[#6B7280]">No orders yet.</p>
                ) : (
                  (orders as Array<Record<string, unknown>>).slice(0, 5).map((order) => (
                    <div
                      key={String(order.id)}
                      className="flex items-center justify-between rounded-xl border border-[#E5E2DB] bg-[#F5F4F0] px-4 py-3"
                    >
                      <div>
                        <p className="text-[15px] font-semibold text-[#1A1A1A]">{String(order.order_number ?? "—")}</p>
                        <p className="text-sm text-[#6B7280]">{String(order.product_name ?? "—")}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-xs font-medium",
                            STATUS_COLORS[String(order.status)] ?? "bg-neutral-100 text-neutral-600 border-neutral-200"
                          )}
                        >
                          {String(order.status)}
                        </span>
                        <p className="mt-1 text-sm font-bold text-[#1A1A1A]">
                          €{Number(order.total_amount ?? 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                Quotes ({quotes.length})
              </p>
              <div className="space-y-2">
                {quotes.length === 0 ? (
                  <p className="text-[15px] text-[#6B7280]">No quotes yet.</p>
                ) : (
                  (quotes as Array<Record<string, unknown>>).slice(0, 5).map((quote) => (
                    <div
                      key={String(quote.id)}
                      className="flex items-center justify-between rounded-xl border border-[#E5E2DB] bg-[#F5F4F0] px-4 py-3"
                    >
                      <p className="text-[15px] font-medium text-[#1A1A1A]">{String(quote.product_type ?? "Quote")}</p>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-xs font-medium",
                          STATUS_COLORS[String(quote.status)] ?? "bg-neutral-100 text-neutral-600 border-neutral-200"
                        )}
                      >
                        {String(quote.status)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
