"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Clock, Download, Package, Truck } from "lucide-react";

import { buildOrderStatusSummary } from "@/lib/portal/workflow";
import type { PortalOrder } from "@/lib/portal/types";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | PortalOrder["status"];

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "confirmed", label: "Confirmed" },
  { key: "in-production", label: "In Production" },
  { key: "quality-control", label: "Quality Control" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

function statusChipClass(status: PortalOrder["status"]) {
  switch (status) {
    case "in-production":   return "bg-[#DBEAFE] text-[#1D4ED8]";
    case "quality-control": return "bg-[#EDE9FE] text-[#6D28D9]";
    case "shipped":         return "bg-[#FEF3C7] text-[#92400E]";
    case "delivered":       return "bg-[#DCFCE7] text-[#166534]";
    case "confirmed":       return "bg-[#F0FDF4] text-[#15803D]";
    case "cancelled":       return "bg-[#FEE2E2] text-[#991B1B]";
    default:                return "bg-[#F3F4F6] text-[#374151]";
  }
}

function TimelineDot({ state }: { state: "done" | "current" | "upcoming" }) {
  if (state === "done")    return <CheckCircle2 size={14} className="shrink-0 text-[#16A34A]" />;
  if (state === "current") return <Clock size={14} className="shrink-0 text-[#2563EB]" />;
  return <Circle size={14} className="shrink-0 text-[#D1D5DB]" />;
}

function OrderCard({ order }: { order: PortalOrder }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      {/* Card header */}
      <div
        className="flex cursor-pointer flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F4EF] text-[#1A1A1A]">
            <Package size={18} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-[#1A1A1A]">{order.orderNumber}</span>
              <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold", statusChipClass(order.status))}>
                {order.statusLabel}
              </span>
            </div>
            <p className="mt-0.5 text-[13px] font-medium text-[#1A1A1A]">{order.productName}</p>
            <p className="text-[12px] text-[#6B7280]">
              {order.category} · {order.quantity} units · ordered{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
          <span className="text-base font-bold text-[#1A1A1A]">${order.totalAmount.toLocaleString()}</span>
          {order.status === "shipped" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF3C7] px-3 py-1 text-[12px] font-semibold text-[#92400E]">
              <Truck size={12} />
              In transit
            </span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
            className="rounded-lg border border-[#E5E2DB] px-3 py-1.5 text-[12px] font-semibold text-[#6B7280] transition-colors hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
          >
            {expanded ? "Collapse" : "Details"}
          </button>
          <Link
            href={`/portal/quotes?reorder=${order.id}`}
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg bg-[#C4F542] px-3 py-1.5 text-[12px] font-semibold text-[#1A1A1A] transition-colors hover:bg-[#b5e13a]"
          >
            Reorder
          </Link>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-[#E5E2DB] bg-[#F7F4EF] px-5 py-5">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Timeline */}
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
                Production Timeline
              </p>
              <div className="space-y-3">
                {order.events.map((event, i) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center pt-0.5">
                      <TimelineDot state={event.state} />
                      {i < order.events.length - 1 && (
                        <div className="mt-1 h-full w-px bg-[#E5E2DB]" />
                      )}
                    </div>
                    <div className="pb-3">
                      <p className="text-[13px] font-semibold text-[#1A1A1A]">{event.label}</p>
                      <p className="mt-0.5 text-[12px] text-[#6B7280]">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order brief */}
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
                Order Brief
              </p>
              <div className="space-y-3 rounded-xl border border-[#E5E2DB] bg-white p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">{order.productName} ({order.quantity} units)</span>
                  <span className="font-semibold text-[#1A1A1A]">${order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="rounded-lg bg-[#F7F4EF] px-3 py-2.5 text-[13px] text-[#1A1A1A]">
                  {buildOrderStatusSummary(order.status)}
                </div>
                <div className="space-y-1.5 text-[12px] text-[#6B7280]">
                  <p>Commercial flow: 60% deposit to release production, 40% due before final dispatch.</p>
                  <p>Shipping is coordinated by air or sea depending on timing and destination.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function OrdersView({ orders }: { orders: PortalOrder[] }) {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");

  const filtered = activeFilter === "all"
    ? orders
    : orders.filter((o) => o.status === activeFilter);

  const availableFilters = STATUS_FILTERS.filter(
    (f) => f.key === "all" || orders.some((o) => o.status === f.key)
  );

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">Order History</h2>
          <p className="mt-1 text-[13px] text-[#6B7280]">
            Every program from deposit through delivery. Click any card to expand the timeline.
          </p>
        </div>
        <button className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-[#E5E2DB] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#6B7280] transition-colors hover:border-[#1A1A1A] hover:text-[#1A1A1A]">
          <Download size={14} />
          Export log
        </button>
      </div>

      {/* Status filter pills */}
      {orders.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {availableFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
                activeFilter === f.key
                  ? "bg-[#1A1A1A] text-white"
                  : "border border-[#E5E2DB] bg-white text-[#6B7280] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
              )}
            >
              {f.label}
              {f.key !== "all" && (
                <span className="ml-1.5 text-[11px] opacity-60">
                  {orders.filter((o) => o.status === f.key).length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Order cards or empty state */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E5E2DB] bg-white px-8 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F7F4EF] text-[#1A1A1A]">
            <Package size={22} />
          </div>
          <p className="mt-5 text-base font-semibold text-[#1A1A1A]">No orders yet</p>
          <p className="mt-2 max-w-sm text-[13px] text-[#6B7280]">
            Your order history will appear here once a quote is approved and the deposit is confirmed.
          </p>
          <Link
            href="/portal/quotes"
            className="mt-6 inline-flex rounded-xl bg-[#C4F542] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-[#b5e13a]"
          >
            Start a quote
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#E5E2DB] bg-white px-8 py-12 text-center">
          <p className="text-sm font-semibold text-[#1A1A1A]">No orders in this status</p>
          <button
            onClick={() => setActiveFilter("all")}
            className="mt-3 text-[13px] font-semibold text-[#1A1A1A] underline underline-offset-2"
          >
            Show all orders
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
