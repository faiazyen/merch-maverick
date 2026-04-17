"use client";

import { useEffect, useMemo, useState } from "react";
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
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

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
  delivered: { color: "bg-success/10 text-success border border-success/20", icon: CheckCircle2, iconColor: "text-success" },
  "in-production": { color: "bg-teal/10 text-teal border border-teal/20", icon: Factory, iconColor: "text-teal" },
  "quote-approved": { color: "bg-warning/10 text-warning border border-warning/20", icon: Clock, iconColor: "text-warning" },
  pending: { color: "bg-muted-light/10 text-muted-light border border-border-light dark:border-border-dark", icon: AlertCircle, iconColor: "text-muted-light dark:text-muted-dark" },
} as const;

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState<TabId>("orders");
  const [expandedOrder, setExpandedOrder] = useState<string | null>("MM-2025-012");
  const [authState, setAuthState] = useState<
    "loading" | "signed-out" | "signed-in" | "missing-config"
  >("loading");
  const [clientProfile, setClientProfile] = useState(DEMO_CLIENT);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!isSupabaseConfigured) {
        if (isMounted) {
          setAuthState("missing-config");
        }
        return;
      }

      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        if (isMounted) {
          setAuthState("missing-config");
        }
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        if (isMounted) {
          setAuthState("signed-out");
        }
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name,business_name,email,industry")
        .eq("id", session.user.id)
        .maybeSingle();

      if (isMounted) {
        setClientProfile({
          ...DEMO_CLIENT,
          name:
            profile?.full_name ??
            session.user.user_metadata?.full_name ??
            DEMO_CLIENT.name,
          company:
            profile?.business_name ??
            session.user.user_metadata?.business_name ??
            DEMO_CLIENT.company,
          email: profile?.email ?? session.user.email ?? DEMO_CLIENT.email,
          vertical:
            profile?.industry ??
            session.user.user_metadata?.industry ??
            DEMO_CLIENT.vertical,
        });
        setAuthState("signed-in");
      }
    }

    loadProfile();

    if (!isSupabaseConfigured) {
      return () => {
        isMounted = false;
      };
    }

    const supabase = getSupabaseBrowserClient();
    const {
      data: { subscription },
    } = supabase?.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
      if (!isMounted) {
        return;
      }

      if (!session?.user) {
        setAuthState("signed-out");
      }
      }
    ) ?? { data: { subscription: null } };

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const greeting = useMemo(() => {
    if (clientProfile.name === DEMO_CLIENT.name) {
      return "Welcome back";
    }
    return `Welcome back, ${clientProfile.name.split(" ")[0]}`;
  }, [clientProfile.name]);

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    window.location.href = "/sign-in";
  };

  if (authState === "missing-config") {
    return (
      <div className="min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-8">
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              Portal setup required
            </h1>
            <p className="text-muted-light dark:text-muted-dark leading-7">
              Add your Supabase project keys to `NEXT_PUBLIC_SUPABASE_URL` and
              `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then run the SQL in
              `supabase/schema.sql` to enable account storage.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-8 text-center">
            <p className="text-muted-light dark:text-muted-dark">
              Loading your client portal...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (authState === "signed-out") {
    return (
      <div className="min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-10 text-center">
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              Sign in to access your portal
            </h1>
            <p className="text-muted-light dark:text-muted-dark leading-7 max-w-2xl mx-auto mb-8">
              Create an account once, save your business information, and return
              anytime to review orders, reuse saved specs, and reorder faster.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-dark"
            >
              Sign in or create your account
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark pt-20">
      {/* Portal header */}
      <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center text-white font-bold">
                {(clientProfile.name || clientProfile.company || "M")[0]}
              </div>
              <div>
                <p className="text-text-light dark:text-text-dark font-semibold text-sm">
                  {greeting}
                </p>
                <p className="text-muted-light dark:text-muted-dark text-xs">
                  {clientProfile.company} · {clientProfile.vertical}
                </p>
                <p className="text-muted-light dark:text-muted-dark text-xs">
                  {clientProfile.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-muted-light dark:text-muted-dark hover:text-teal transition-colors relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-warning rounded-full text-white text-[8px] flex items-center justify-center font-bold">2</span>
              </button>
              <button
                className="text-muted-light dark:text-muted-dark hover:text-teal transition-colors"
                onClick={handleLogout}
                aria-label="Log out"
              >
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
            { label: "Total Orders", value: clientProfile.totalOrders, Icon: Package, color: "text-teal" },
            { label: "Total Spend", value: clientProfile.totalSpend, Icon: BarChart3, color: "text-teal" },
            { label: "Amount Saved", value: clientProfile.savedAmount, Icon: CheckCircle2, color: "text-success" },
            { label: "Active Orders", value: "2", Icon: Truck, color: "text-warning" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-light dark:text-muted-dark">{stat.label}</p>
                <stat.Icon size={15} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-text-light dark:text-text-dark">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Reorder alert */}
        <div className="mb-6 p-4 rounded-xl border border-teal/30 bg-teal/5 dark:bg-teal/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-teal" />
            <div>
              <p className="text-sm font-semibold text-text-light dark:text-text-dark">Reorder reminder</p>
              <p className="text-xs text-muted-light dark:text-muted-dark">
                Your last Staff Uniform order was Dec 2024 — you may need to reorder for summer season
              </p>
            </div>
          </div>
          <button className="bg-teal hover:bg-teal-dark text-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all">
            <RefreshCw size={13} /> Reorder
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 rounded-xl p-1 border border-border-light dark:border-border-dark bg-white dark:bg-card-dark mb-6 overflow-x-auto">
          {(
            [
              { id: "orders", label: "Orders", Icon: Package },
              { id: "specs", label: "Saved Specs", Icon: Search },
              { id: "assets", label: "Brand Assets", Icon: Upload },
              { id: "invoices", label: "Invoices", Icon: Download },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-teal text-white shadow-sm"
                  : "text-muted-light dark:text-muted-dark hover:text-teal hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark"
              )}
            >
              <tab.Icon size={14} />
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
                <div key={order.id} className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden">
                  <div
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark transition-colors"
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        order.status === "delivered" ? "bg-success/10" :
                        order.status === "in-production" ? "bg-teal/10" : "bg-warning/10"
                      )}>
                        <StatusIcon size={18} className={statusConfig.iconColor} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-text-light dark:text-text-dark text-sm">{order.product}</p>
                          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", statusConfig.color)}>
                            {order.statusLabel}
                          </span>
                        </div>
                        <p className="text-xs text-muted-light dark:text-muted-dark">
                          {order.id} · {order.quantity} · {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-text-light dark:text-text-dark">{order.value}</p>
                      <ChevronRight
                        size={16}
                        className={cn("text-muted-light dark:text-muted-dark transition-transform", isExpanded && "rotate-90")}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-border-light dark:border-border-dark">
                      <p className="text-xs font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider mt-4 mb-3">
                        Production Tracker
                      </p>
                      <div className="space-y-2.5">
                        {order.trackingSteps.map((step, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                                step.done
                                  ? "border-teal bg-teal"
                                  : "border-border-light dark:border-border-dark bg-white dark:bg-card-dark"
                              )}
                            >
                              {step.done && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 flex justify-between items-center">
                              <span className={cn("text-sm", step.done ? "text-text-light dark:text-text-dark font-medium" : "text-muted-light dark:text-muted-dark")}>
                                {step.label}
                              </span>
                              <span className="text-xs text-muted-light dark:text-muted-dark">{step.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {order.canReorder && (
                        <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
                          <p className="text-sm text-muted-light dark:text-muted-dark">Want to reorder this?</p>
                          <button className="bg-teal hover:bg-teal-dark text-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all">
                            <RefreshCw size={13} /> One-Click Reorder
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <Link href="/quote">
              <div className="p-5 rounded-2xl border-2 border-dashed border-border-light dark:border-border-dark hover:border-teal bg-white dark:bg-card-dark hover:bg-teal/5 transition-all cursor-pointer flex items-center justify-center gap-3 text-muted-light dark:text-muted-dark hover:text-teal">
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
              <div key={spec.name} className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-light dark:text-text-dark">{spec.name}</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark mt-0.5">{spec.product}</p>
                  <p className="text-sm text-muted-light dark:text-muted-dark mt-1">{spec.details}</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark mt-1">Last ordered: {spec.lastOrdered}</p>
                </div>
                <button className="bg-teal hover:bg-teal-dark text-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all">
                  <RefreshCw size={13} /> Reorder
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Assets tab */}
        {activeTab === "assets" && (
          <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-8 text-center">
            <Upload size={32} className="text-muted-light dark:text-muted-dark mx-auto mb-3" />
            <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">Brand Assets</h3>
            <p className="text-sm text-muted-light dark:text-muted-dark mb-4">
              Upload your logo, color swatches, and design files. We&apos;ll use these automatically for all your orders.
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-teal hover:text-teal transition-all">
              <Upload size={14} /> Upload Logo / Assets
            </button>
          </div>
        )}

        {/* Invoices tab */}
        {activeTab === "invoices" && (
          <div className="space-y-3">
            {DEMO_ORDERS.filter((o) => o.status === "delivered" || o.status === "in-production").map((order) => (
              <div key={order.id} className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-light dark:text-text-dark text-sm">{order.id}</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">{order.product} · {order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-text-light dark:text-text-dark">{order.value}</p>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-teal hover:text-teal transition-all">
                    <Download size={12} /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
