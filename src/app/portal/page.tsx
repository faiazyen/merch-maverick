"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Package,
  ArrowRight,
  Download,
  Upload,
  LogOut,
  Search,
  Building2,
  Globe,
  MapPin,
  Phone,
  Mail,
  BadgeCheck,
  FolderClock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { MaverickIcon, MaverickLogo } from "@/components/branding/MaverickLogo";

const DEFAULT_CLIENT = {
  name: "Client Account",
  company: "Merch Maverick",
  email: "",
  vertical: "Business profile",
  website: "",
  phone: "",
  country: "",
  marketingOptIn: false,
  profileCompleted: false,
};

type TabId = "orders" | "specs" | "assets" | "invoices";

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState<TabId>("orders");
  const [authState, setAuthState] = useState<
    "loading" | "signed-out" | "signed-in" | "missing-config"
  >("loading");
  const [clientProfile, setClientProfile] = useState(DEFAULT_CLIENT);

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
        .select(
          "full_name,business_name,email,industry,website,phone,country,marketing_opt_in,profile_completed"
        )
        .eq("id", session.user.id)
        .maybeSingle();

      if (isMounted) {
        setClientProfile({
          ...DEFAULT_CLIENT,
          name:
            profile?.full_name ??
            session.user.user_metadata?.full_name ??
            DEFAULT_CLIENT.name,
          company:
            profile?.business_name ??
            session.user.user_metadata?.business_name ??
            DEFAULT_CLIENT.company,
          email: profile?.email ?? session.user.email ?? DEFAULT_CLIENT.email,
          vertical:
            profile?.industry ??
            session.user.user_metadata?.industry ??
            DEFAULT_CLIENT.vertical,
          website:
            profile?.website ??
            session.user.user_metadata?.website ??
            DEFAULT_CLIENT.website,
          phone:
            profile?.phone ??
            session.user.user_metadata?.phone ??
            DEFAULT_CLIENT.phone,
          country:
            profile?.country ??
            session.user.user_metadata?.country ??
            DEFAULT_CLIENT.country,
          marketingOptIn:
            profile?.marketing_opt_in ??
            session.user.user_metadata?.marketing_opt_in ??
            DEFAULT_CLIENT.marketingOptIn,
          profileCompleted:
            profile?.profile_completed ??
            session.user.user_metadata?.profile_completed ??
            DEFAULT_CLIENT.profileCompleted,
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
    if (clientProfile.name === DEFAULT_CLIENT.name) {
      return "Welcome back";
    }
    return `Welcome back, ${clientProfile.name.split(" ")[0]}`;
  }, [clientProfile.name]);

  const profileFields = useMemo(
    () =>
      [
        {
          label: "Business profile",
          value: clientProfile.company,
          icon: Building2,
        },
        {
          label: "Primary email",
          value: clientProfile.email || "Not saved yet",
          icon: Mail,
        },
        {
          label: "Phone",
          value: clientProfile.phone || "Add your business phone on sign up",
          icon: Phone,
        },
        {
          label: "Website",
          value: clientProfile.website || "Add your website for faster quoting",
          icon: Globe,
        },
        {
          label: "Country",
          value: clientProfile.country || "Not set yet",
          icon: MapPin,
        },
        {
          label: "Marketing status",
          value: clientProfile.marketingOptIn
            ? "Subscribed to updates"
            : "Not subscribed yet",
          icon: BadgeCheck,
        },
      ].filter(Boolean),
    [clientProfile]
  );

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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-text-light shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-text-dark">
                <MaverickIcon className="h-6 w-auto" />
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
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <MaverickLogo size="sm" descriptor="Client portal" />
              <button
                className="rounded-full border border-border-light bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-light transition-colors hover:border-teal hover:text-teal dark:border-border-dark dark:bg-card-dark dark:text-muted-dark"
                onClick={handleLogout}
                aria-label="Log out"
              >
                <span className="inline-flex items-center gap-2">
                  <LogOut size={14} />
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.8rem] border border-border-light bg-white p-6 shadow-[0_18px_55px_rgba(17,24,39,0.06)] dark:border-border-dark dark:bg-card-dark">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center rounded-full border border-teal/15 bg-teal/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-teal">
                  Account Overview
                </div>
                <h1 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-text-light dark:text-text-dark sm:text-3xl">
                  Your business profile is now saved inside Merch Maverick.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-light dark:text-muted-dark">
                  This portal is now connected to your live account. As we move into the next build phases, this is where your orders, saved specs, assets, invoices, and reorder actions will live.
                </p>
              </div>
              <div className="rounded-2xl border border-border-light bg-bg-secondary-light px-4 py-3 dark:border-border-dark dark:bg-bg-secondary-dark">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
                  Profile status
                </p>
                <p className="mt-2 text-sm font-semibold text-text-light dark:text-text-dark">
                  {clientProfile.profileCompleted ? "Ready for account use" : "Saved and ready for onboarding"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-border-light bg-white p-6 shadow-[0_18px_55px_rgba(17,24,39,0.05)] dark:border-border-dark dark:bg-card-dark">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
              Next best step
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-text-light dark:text-text-dark">
              Start your first quote or return here once production begins.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-light dark:text-muted-dark">
              Your portal foundation is live. The next product phase will unlock true order history, reorders, document storage, and production updates tied to your business account.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-dark"
              >
                Request a quote
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border-light px-5 py-3 text-sm font-semibold text-text-light transition-all hover:border-teal hover:text-teal dark:border-border-dark dark:text-text-dark"
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
          {[
            { label: "Profile saved", value: "Yes", Icon: BadgeCheck, color: "text-success" },
            { label: "Orders connected", value: "Soon", Icon: Package, color: "text-teal" },
            { label: "Saved specs", value: "Soon", Icon: Search, color: "text-teal" },
            { label: "Portal phase", value: "Phase 1", Icon: FolderClock, color: "text-warning" },
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
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[1.7rem] border border-border-light bg-white p-6 dark:border-border-dark dark:bg-card-dark">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
                Saved business details
              </p>
              <div className="mt-5 grid gap-4">
                {profileFields.map((field) => (
                  <div
                    key={field.label}
                    className="flex items-start gap-3 rounded-2xl border border-border-light bg-bg-secondary-light px-4 py-3 dark:border-border-dark dark:bg-bg-secondary-dark"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                      <field.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
                        {field.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-text-light dark:text-text-dark">
                        {field.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-border-light bg-white p-6 dark:border-border-dark dark:bg-card-dark">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
                Live order space
              </p>
              <div className="mt-5 rounded-[1.6rem] border border-dashed border-border-light bg-bg-secondary-light px-6 py-10 text-center dark:border-border-dark dark:bg-bg-secondary-dark">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-text-light shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-text-dark">
                  <Package size={24} />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-text-light dark:text-text-dark">
                  No live orders are connected yet
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-light dark:text-muted-dark">
                  This is where your real production milestones, approvals, shipping updates, and reorder actions will appear once a project is opened under your account.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-dark"
                  >
                    Start your first order
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border-light px-5 py-3 text-sm font-semibold text-text-light transition-all hover:border-teal hover:text-teal dark:border-border-dark dark:text-text-dark"
                  >
                    Ask about portal rollout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved Specs tab */}
        {activeTab === "specs" && (
          <div className="rounded-[1.7rem] border border-border-light bg-white p-8 text-center dark:border-border-dark dark:bg-card-dark">
            <Search size={30} className="mx-auto text-muted-light dark:text-muted-dark" />
            <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-text-light dark:text-text-dark">
              Saved specs are coming next
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-light dark:text-muted-dark">
              In the next product phase, each business account will keep reusable garment specs, embroidery notes, materials, and brand rules so reorders can happen faster with fewer back-and-forth messages.
            </p>
          </div>
        )}

        {/* Assets tab */}
        {activeTab === "assets" && (
          <div className="rounded-[1.7rem] border border-border-light bg-white p-8 text-center dark:border-border-dark dark:bg-card-dark">
            <Upload size={32} className="text-muted-light dark:text-muted-dark mx-auto mb-3" />
            <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">Brand assets will live here</h3>
            <p className="text-sm leading-7 text-muted-light dark:text-muted-dark mb-4 max-w-2xl mx-auto">
              We&apos;re preparing this area for logos, design files, color references, embroidery placements, and approved brand assets tied directly to your business account.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-teal hover:text-teal transition-all"
            >
              <Upload size={14} /> Request asset onboarding
            </Link>
          </div>
        )}

        {/* Invoices tab */}
        {activeTab === "invoices" && (
          <div className="rounded-[1.7rem] border border-border-light bg-white p-8 text-center dark:border-border-dark dark:bg-card-dark">
            <Download size={32} className="text-muted-light dark:text-muted-dark mx-auto mb-3" />
            <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">Invoices will appear when orders go live</h3>
            <p className="text-sm leading-7 text-muted-light dark:text-muted-dark max-w-2xl mx-auto">
              Once your account has active projects, this tab will store invoices, commercial documents, and downloadable order paperwork in one clean place.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
