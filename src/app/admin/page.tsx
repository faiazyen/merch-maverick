"use client";

import { useState } from "react";
import {
  Package,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  ArrowUpRight,
  Zap,
  Factory,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Demo data
const STATS = [
  { label: "Total Revenue (YTD)", value: "€28,400", change: "+42%", icon: TrendingUp, positive: true },
  { label: "Active Orders", value: "3", change: "+1 this week", icon: Package, positive: true },
  { label: "Active Clients", value: "8", change: "+2 this month", icon: Users, positive: true },
  { label: "Avg. Order Value", value: "€3,550", change: "+18%", icon: BarChart3, positive: true },
];

const ORDERS = [
  {
    id: "MM-2025-018",
    client: "Hotel Collection NL",
    vertical: "Hospitality",
    product: "Bathrobes + Table Linens",
    value: "€5,200",
    status: "awaiting-production",
    statusLabel: "Awaiting Production",
    date: "Apr 2, 2025",
    daysLeft: 35,
  },
  {
    id: "MM-2025-012",
    client: "Hotel Collection NL",
    vertical: "Hospitality",
    product: "Staff Polo Shirts",
    value: "€2,850",
    status: "in-production",
    statusLabel: "In Production",
    date: "Mar 5, 2025",
    daysLeft: 7,
  },
  {
    id: "MM-2025-021",
    client: "FitZone Gyms Italy",
    vertical: "Fitness",
    product: "Branded Gym Wear Bundle",
    value: "€4,800",
    status: "quote-sent",
    statusLabel: "Quote Sent",
    date: "Apr 3, 2025",
    daysLeft: null,
  },
  {
    id: "MM-2025-019",
    client: "TechCo Berlin",
    vertical: "Corporate",
    product: "Employee Onboarding Kits",
    value: "€7,200",
    status: "awaiting-deposit",
    statusLabel: "Awaiting Deposit",
    date: "Apr 1, 2025",
    daysLeft: null,
  },
  {
    id: "MM-2024-041",
    client: "Hotel Collection NL",
    vertical: "Hospitality",
    product: "Staff Uniforms + Towels",
    value: "€8,400",
    status: "delivered",
    statusLabel: "Delivered",
    date: "Dec 14, 2024",
    daysLeft: null,
  },
];

const CLIENTS = [
  {
    name: "Hotel Collection NL",
    vertical: "Hospitality",
    contact: "Sophie van den Berg",
    orders: 4,
    spend: "€28,400",
    status: "active",
    lastOrder: "Apr 2025",
  },
  {
    name: "FitZone Gyms",
    vertical: "Fitness",
    contact: "Marco Bianchi",
    orders: 1,
    spend: "€4,800",
    status: "prospect",
    lastOrder: "—",
  },
  {
    name: "TechCo Berlin",
    vertical: "Corporate",
    contact: "Lena Fischer",
    orders: 1,
    spend: "€7,200",
    status: "active",
    lastOrder: "Apr 2025",
  },
  {
    name: "Melvin & Gatica Bachata",
    vertical: "Events",
    contact: "Melvin de la Cruz",
    orders: 3,
    spend: "€18,200",
    status: "active",
    lastOrder: "Mar 2025",
  },
];

const STATUS_COLORS: Record<string, string> = {
  delivered: "bg-green-50 text-green-700 border-green-200",
  "in-production": "bg-blue-50 text-blue-700 border-blue-200",
  "awaiting-production": "bg-purple-50 text-purple-700 border-purple-200",
  "quote-sent": "bg-amber-50 text-amber-700 border-amber-200",
  "awaiting-deposit": "bg-orange-50 text-orange-700 border-orange-200",
};

type Tab = "overview" | "orders" | "clients" | "pipeline";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-[#f8faff] pt-20">
      {/* Admin header */}
      <div className="bg-[#0c1a2e] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold">Admin Dashboard</p>
              <p className="text-neutral-400 text-xs">Merch Maverick Operations</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-green-400">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-neutral-400">{stat.label}</p>
                <div className="w-8 h-8 rounded-lg bg-[#f0f6ff] flex items-center justify-center">
                  <stat.icon size={15} className="text-[#2351a4]" />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#0c1a2e] mb-1">{stat.value}</p>
              <span className={cn("text-xs font-medium", stat.positive ? "text-green-600" : "text-red-500")}>
                <ArrowUpRight size={11} className="inline" /> {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-neutral-100 shadow-sm mb-6">
          {(["overview", "orders", "clients", "pipeline"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                activeTab === tab
                  ? "bg-[#1e3a6e] text-white shadow-sm"
                  : "text-neutral-500 hover:text-[#1e3a6e] hover:bg-neutral-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active orders summary */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
                <h2 className="font-bold text-[#0c1a2e]">Active Orders</h2>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-[#2351a4] font-medium flex items-center gap-1"
                >
                  View all <ChevronRight size={12} />
                </button>
              </div>
              <div className="divide-y divide-neutral-50">
                {ORDERS.filter((o) => o.status !== "delivered").map((order) => (
                  <div key={order.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#f0f6ff] flex items-center justify-center">
                        {order.status === "in-production" ? (
                          <Factory size={14} className="text-[#2351a4]" />
                        ) : order.status === "quote-sent" ? (
                          <Zap size={14} className="text-amber-500" />
                        ) : (
                          <Clock size={14} className="text-neutral-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#0c1a2e]">{order.client}</p>
                        <p className="text-xs text-neutral-400">{order.product}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full border", STATUS_COLORS[order.status] || "bg-neutral-100 text-neutral-600 border-neutral-200")}>
                        {order.statusLabel}
                      </span>
                      <span className="font-bold text-[#0c1a2e] text-sm">{order.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-100">
                <h2 className="font-bold text-[#0c1a2e]">Revenue Pipeline</h2>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { stage: "Quotes Sent", value: "€4,800", count: 1, color: "bg-amber-400" },
                  { stage: "Awaiting Deposit", value: "€7,200", count: 1, color: "bg-orange-400" },
                  { stage: "In Production", value: "€8,050", count: 2, color: "bg-blue-400" },
                  { stage: "Delivered (This Month)", value: "€0", count: 0, color: "bg-green-400" },
                ].map((item) => (
                  <div key={item.stage}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-neutral-500">{item.stage}</span>
                      <span className="text-sm font-bold text-[#0c1a2e]">{item.value}</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", item.color)}
                        style={{ width: item.count > 0 ? "60%" : "0%" }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">{item.count} order{item.count !== 1 ? "s" : ""}</p>
                  </div>
                ))}
                <div className="pt-3 border-t border-neutral-100">
                  <p className="text-xs text-neutral-400">Total Pipeline</p>
                  <p className="text-2xl font-bold text-[#0c1a2e]">€20,050</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="font-bold text-[#0c1a2e]">All Orders</h2>
              <Button variant="accent" size="sm">
                <Package size={13} /> New Order
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100">
                    {["Order ID", "Client", "Product", "Value", "Status", "Date", "Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-3.5 text-xs font-mono text-[#2351a4] font-medium">{order.id}</td>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-[#0c1a2e]">{order.client}</p>
                        <p className="text-xs text-neutral-400">{order.vertical}</p>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-neutral-600">{order.product}</td>
                      <td className="px-5 py-3.5 text-sm font-bold text-[#0c1a2e]">{order.value}</td>
                      <td className="px-5 py-3.5">
                        <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full border", STATUS_COLORS[order.status] || "bg-neutral-100 text-neutral-600 border-neutral-200")}>
                          {order.statusLabel}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-neutral-400">{order.date}</td>
                      <td className="px-5 py-3.5">
                        <button className="text-[#2351a4] text-xs font-medium hover:underline">
                          View →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Clients tab */}
        {activeTab === "clients" && (
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="font-bold text-[#0c1a2e]">Clients</h2>
              <Button variant="primary" size="sm">
                <Users size={13} /> Add Client
              </Button>
            </div>
            <div className="divide-y divide-neutral-50">
              {CLIENTS.map((client) => (
                <div key={client.name} className="px-5 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f0f6ff] flex items-center justify-center text-[#1e3a6e] font-bold text-sm">
                      {client.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0c1a2e] text-sm">{client.name}</p>
                      <p className="text-xs text-neutral-400">{client.contact} · {client.vertical}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <p className="font-bold text-[#0c1a2e]">{client.spend}</p>
                      <p className="text-xs text-neutral-400">{client.orders} order{client.orders !== 1 ? "s" : ""}</p>
                    </div>
                    <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full border", client.status === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-neutral-100 text-neutral-500 border-neutral-200")}>
                      {client.status === "active" ? (
                        <><CheckCircle2 size={10} className="inline mr-1" />Active</>
                      ) : (
                        <><AlertCircle size={10} className="inline mr-1" />Prospect</>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pipeline tab */}
        {activeTab === "pipeline" && (
          <div className="grid lg:grid-cols-4 gap-4">
            {[
              { stage: "Leads", color: "border-t-neutral-300", items: [{ name: "Hotel Group CZ", value: "~€8K", note: "Contacted via LinkedIn" }] },
              { stage: "Quote Sent", color: "border-t-amber-400", items: [{ name: "FitZone Gyms", value: "€4,800", note: "Awaiting approval" }] },
              { stage: "Awaiting Deposit", color: "border-t-orange-400", items: [{ name: "TechCo Berlin", value: "€7,200", note: "Invoice sent Apr 1" }] },
              { stage: "In Production / Won", color: "border-t-green-400", items: [{ name: "Hotel Collection NL", value: "€8,050", note: "2 active orders" }] },
            ].map((col) => (
              <div key={col.stage} className={cn("bg-white rounded-2xl border border-neutral-100 border-t-4 shadow-sm overflow-hidden", col.color)}>
                <div className="px-4 py-3 border-b border-neutral-100">
                  <p className="font-semibold text-[#0c1a2e] text-sm">{col.stage}</p>
                  <p className="text-xs text-neutral-400">{col.items.length} deal{col.items.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="p-3 space-y-2">
                  {col.items.map((item) => (
                    <div key={item.name} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                      <p className="font-medium text-[#0c1a2e] text-sm">{item.name}</p>
                      <p className="text-lg font-bold text-[#1e3a6e]">{item.value}</p>
                      <p className="text-xs text-neutral-400 mt-1">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
