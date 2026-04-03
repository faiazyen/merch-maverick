"use client";

import { useState } from "react";
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Download,
  Upload,
  BarChart3,
  Bell,
  LogOut,
  ChevronRight,
  Truck,
  Factory,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Demo data — in production this would come from Supabase
const DEMO_CLIENT = {
  name: "Sophie van den Berg",
  company: "Hotel Collection NL",
  email: "sophie@hotelcollection.nl",
  vertical: "Hospitality",
  totalOrders: 4,
  totalSpend: "€28,400",
  savedAmount: "€16,200",
};

const DEMO_ORDERS = [
  {
    id: "MM-2024-041",
    product: "Staff Uniforms + Hotel Towels",
    quantity: "250 uniforms + 1,200 towels",
    value: "€8,400",
    status: "delivered",
    statusLabel: "Delivered",
    date: "Dec 2024",
    trackingSteps: [
      { label: "Order Confirmed", done: true, date: "Nov 15" },
      { label: "Materials Sourced", done: true, date: "Nov 18" },
      { label: "Production", done: true, date: "Nov 25" },
      { label: "QC Passed", done: true, date: "Dec 1" },
      { label: "Shipped", done: true, date: "Dec 3" },
      { label: "Delivered", done: true, date: "Dec 14" },
    ],
    canReorder: true,
  },
  {
    id: "MM-2025-012",
    product: "Staff Polo Shirts (embroidered)",
    quantity: "150 units",
    value: "€2,850",
    status: "in-production",
    statusLabel: "In Production",
    date: "Mar 2025",
    trackingSteps: [
      { label: "Order Confirmed", done: true, date: "Mar 5" },
      { label: "Materials Sourced", done: true, date: "Mar 8" },
      { label: "Production", done: true, date: "Mar 15" },
      { label: "QC Check", done: false, date: "Mar 22" },
      { label: "Shipping", done: false, date: "Mar 28" },
      { label: "Delivery", done: false, date: "Apr 8" },
    ],
    canReorder: false,
  },
  {
    id: "MM-2025-018",
    product: "Bathrobes + Table Linens",
    quantity: "80 bathrobes + 400 linens",
    value: "€5,200",
    status: "quote-approved",
    statusLabel: "Quote Approved",
    date: "Apr 2025",
    trackingSteps: [
      { label: "Quote Approved", done: true, date: "Apr 1" },
      { label: "Deposit Received", done: true, date: "Apr 2" },
      { label: "Production Start", done: false, date: "Apr 5" },
      { label: "QC Check", done: false, date: "Apr 22" },
      { label: "Shipping", done: false, date: "Apr 28" },
      { label: "Delivery", done: false, date: "May 12" },
    ],
    canReorder: false,
  },
];

const SAVED_SPECS = [
  {
    name: "Front-of-House Uniform",
    product: "Staff Uniform Set",
    details: "Navy blue, embroidered logo chest left, 3 sizes (S/M/L)",
    lastOrdered: "Dec 2024",
  },
  {
    name: "Hotel Towels Standard",
    product: "Hotel Bath Towels",
    details: "White, woven logo border, 70x140cm",
    lastOrdered: "Dec 2024",
  },
];

type TabId = "orders" | "specs" | "assets" | "invoices";

const STATUS_CONFIG = {
  delivered: { color: "bg-green-50 text-green-700 border border-green-200", icon: CheckCircle2, iconColor: "text-green-500" },
  "in-production": { color: "bg-blue-50 text-blue-700 border border-blue-200", icon: Factory, iconColor: "text-blue-500" },
  "quote-approved": { color: "bg-amber-50 text-amber-700 border border-amber-200", icon: Clock, iconColor: "text-amber-500" },
  pending: { color: "bg-neutral-100 text-neutral-600 border border-neutral-200", icon: AlertCircle, iconColor: "text-neutral-400" },
} as const;

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState<TabId>("orders");
  const [expandedOrder, setExpandedOrder] = useState<string | null>("MM-2025-012");

  return (
    <div className="min-h-screen bg-[#f8faff] pt-20">
      {/* Portal header */}
      <div className="bg-[#0c1a2e] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#2351a4] flex items-center justify-center text-white font-bold">
                {DEMO_CLIENT.name[0]}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{DEMO_CLIENT.name}</p>
                <p className="text-neutral-400 text-xs">{DEMO_CLIENT.company} · {DEMO_CLIENT.vertical}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-neutral-400 hover:text-white transition-colors relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#ea580c] rounded-full text-white text-[8px] flex items-center justify-center font-bold">2</span>
              </button>
              <button className="text-neutral-400 hover:text-white transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Orders", value: DEMO_CLIENT.totalOrders, icon: Package, color: "text-[#2351a4]" },
            { label: "Total Spend", value: DEMO_CLIENT.totalSpend, icon: BarChart3, color: "text-[#2351a4]" },
            { label: "Amount Saved", value: DEMO_CLIENT.savedAmount, icon: CheckCircle2, color: "text-green-600" },
            { label: "Active Orders", value: "2", icon: Truck, color: "text-amber-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-neutral-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-neutral-400">{stat.label}</p>
                <stat.icon size={15} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-[#0c1a2e]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Reorder alert */}
        <div className="mb-6 p-4 bg-[#f0f6ff] rounded-xl border border-[#dce9fc] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-[#2351a4]" />
            <div>
              <p className="text-sm font-semibold text-[#0c1a2e]">Reorder reminder</p>
              <p className="text-xs text-neutral-500">
                Your last Staff Uniform order was Dec 2024 — you may need to reorder for summer season
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm">
            <RefreshCw size={13} /> Reorder
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-neutral-100 shadow-sm mb-6 overflow-x-auto">
          {(
            [
              { id: "orders", label: "Orders", icon: Package },
              { id: "specs", label: "Saved Specs", icon: Search },
              { id: "assets", label: "Brand Assets", icon: Upload },
              { id: "invoices", label: "Invoices", icon: Download },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-[#1e3a6e] text-white shadow-sm"
                  : "text-neutral-500 hover:text-[#1e3a6e] hover:bg-neutral-50"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {DEMO_ORDERS.map((order) => {
              const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
              const StatusIcon = statusConfig.icon;
              const isExpanded = expandedOrder === order.id;

              return (
                <div key={order.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                  {/* Order header */}
                  <div
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition-colors"
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", statusConfig.color.includes("green") ? "bg-green-50" : statusConfig.color.includes("blue") ? "bg-blue-50" : "bg-amber-50")}>
                        <StatusIcon size={18} className={statusConfig.iconColor} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-[#0c1a2e] text-sm">{order.product}</p>
                          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", statusConfig.color)}>
                            {order.statusLabel}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400">
                          {order.id} · {order.quantity} · {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-[#0c1a2e]">{order.value}</p>
                      <ChevronRight
                        size={16}
                        className={cn("text-neutral-400 transition-transform", isExpanded && "rotate-90")}
                      />
                    </div>
                  </div>

                  {/* Expanded: production tracker */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-neutral-50">
                      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mt-4 mb-3">
                        Production Tracker
                      </p>
                      <div className="space-y-2.5">
                        {order.trackingSteps.map((step, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                                step.done
                                  ? "border-[#2351a4] bg-[#2351a4]"
                                  : "border-neutral-200 bg-white"
                              )}
                            >
                              {step.done && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 flex justify-between items-center">
                              <span className={cn("text-sm", step.done ? "text-[#0c1a2e] font-medium" : "text-neutral-400")}>
                                {step.label}
                              </span>
                              <span className="text-xs text-neutral-400">{step.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {order.canReorder && (
                        <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                          <p className="text-sm text-neutral-500">Want to reorder this?</p>
                          <Button variant="primary" size="sm">
                            <RefreshCw size={13} /> One-Click Reorder
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* New order CTA */}
            <Link href="/quote">
              <div className="p-5 bg-white rounded-2xl border-2 border-dashed border-neutral-200 hover:border-[#2351a4] hover:bg-[#f0f6ff] transition-all cursor-pointer flex items-center justify-center gap-3 text-neutral-400 hover:text-[#2351a4]">
                <Package size={18} />
                <span className="font-medium text-sm">Start a new order</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        )}

        {/* Saved Specs tab */}
        {activeTab === "specs" && (
          <div className="space-y-4">
            {SAVED_SPECS.map((spec) => (
              <div key={spec.name} className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#0c1a2e]">{spec.name}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{spec.product}</p>
                  <p className="text-sm text-neutral-500 mt-1">{spec.details}</p>
                  <p className="text-xs text-neutral-400 mt-1">Last ordered: {spec.lastOrdered}</p>
                </div>
                <Button variant="primary" size="sm">
                  <RefreshCw size={13} /> Reorder
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Assets tab */}
        {activeTab === "assets" && (
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8 text-center">
            <Upload size={32} className="text-neutral-300 mx-auto mb-3" />
            <h3 className="font-semibold text-[#0c1a2e] mb-2">Brand Assets</h3>
            <p className="text-sm text-neutral-500 mb-4">
              Upload your logo, color swatches, and design files. We&apos;ll use these automatically for all your orders.
            </p>
            <Button variant="outline" size="md">
              <Upload size={14} /> Upload Logo / Assets
            </Button>
          </div>
        )}

        {/* Invoices tab */}
        {activeTab === "invoices" && (
          <div className="space-y-3">
            {DEMO_ORDERS.filter((o) => o.status === "delivered" || o.status === "in-production").map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#0c1a2e] text-sm">{order.id}</p>
                  <p className="text-xs text-neutral-400">{order.product} · {order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-[#0c1a2e]">{order.value}</p>
                  <Button variant="outline" size="sm">
                    <Download size={12} /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
