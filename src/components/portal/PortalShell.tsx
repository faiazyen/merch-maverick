"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Package,
  Search,
  Settings,
  Shapes,
  UserCircle2,
  WalletCards,
} from "lucide-react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { MaverickLogo } from "@/components/branding/MaverickLogo";
import type { PortalProfile } from "@/lib/portal/types";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/orders", label: "Orders", icon: Package },
  { href: "/portal/catalogue", label: "Catalogue", icon: Shapes },
  { href: "/portal/quotes", label: "Quotes", icon: WalletCards },
  { href: "/portal/assets", label: "Assets", icon: FolderKanban },
  { href: "/portal/account", label: "Account", icon: UserCircle2 },
];

export function PortalShell({
  profile,
  title,
  subtitle,
  children,
}: {
  profile: PortalProfile;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const initials = useMemo(() => {
    return (
      profile.businessName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "MM"
    );
  }, [profile.businessName]);

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <div className="portal-shell min-h-screen bg-[#f7f9fb] text-[#10233f]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[#d9e3ef] bg-[#fbfdff] xl:flex xl:flex-col">
        <div className="border-b border-[#e4ebf3] px-6 py-6">
          <MaverickLogo
            size="sm"
            descriptor="Enterprise Portal"
            surface="light"
            wordmarkClassName="[--maverick-wordmark-plate:transparent] [--maverick-wordmark-text:#1b3f7c]"
            descriptorClassName="text-[#60718d]"
          />
        </div>

        <div className="px-4 py-5">
          <Link
            href="/portal/quotes"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#195fd4_0%,#2d7cff_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(29,101,214,0.22)] transition-transform hover:-translate-y-0.5"
          >
            <WalletCards size={16} />
            New Estimate
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  active
                    ? "bg-[#edf4ff] text-[#215dbe] shadow-[inset_0_0_0_1px_rgba(48,111,212,0.12)]"
                    : "text-[#61728f] hover:bg-[#f1f6fb] hover:text-[#215dbe]"
                )}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#e4ebf3] px-4 py-4">
          <div className="flex items-center gap-3 rounded-2xl bg-[#f4f8fd] px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1e4f97] text-sm font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#0f2340]">{profile.businessName}</p>
              <p className="truncate text-xs text-[#72829a]">{profile.email}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="xl:ml-72">
        <header className="sticky top-0 z-30 border-b border-[#d9e3ef] bg-[rgba(251,253,255,0.9)] backdrop-blur">
          <div className="flex flex-col gap-4 px-5 py-4 md:px-8 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d7d95]">
                Client Workspace
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#10233f]">
                {title}
              </h1>
              <p className="mt-1 text-sm text-[#677992]">{subtitle}</p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <label className="relative block min-w-[280px]">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7e8da3]"
                />
                <input
                  className="w-full rounded-xl border border-[#d7e2ef] bg-white px-10 py-2.5 text-sm text-[#10233f] outline-none transition-shadow placeholder:text-[#93a1b4] focus:shadow-[0_0_0_4px_rgba(47,111,212,0.12)]"
                  placeholder="Search orders, assets, or products..."
                  type="search"
                />
              </label>

              <div className="flex items-center gap-2 self-start md:self-auto">
                {[Bell, Settings].map((Icon, index) => (
                  <button
                    key={index}
                    className="rounded-xl border border-[#d7e2ef] bg-white p-2.5 text-[#6c7d95] transition-colors hover:text-[#215dbe]"
                    type="button"
                  >
                    <Icon size={16} />
                  </button>
                ))}
                <button
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d7e2ef] bg-white px-3 py-2.5 text-sm font-medium text-[#475a76] transition-colors hover:text-[#215dbe]"
                  onClick={handleLogout}
                  type="button"
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="px-5 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
