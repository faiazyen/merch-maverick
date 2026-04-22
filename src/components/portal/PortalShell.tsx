"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Shapes,
  UserCircle2,
  WalletCards,
  X,
} from "lucide-react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { MaverickLogo } from "@/components/branding/MaverickLogo";
import type { PortalProfile } from "@/lib/portal/types";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/portal/orders", label: "Orders", icon: Package, exact: false },
  { href: "/portal/catalogue", label: "Catalogue", icon: Shapes, exact: false },
  { href: "/portal/quotes", label: "Quotes", icon: WalletCards, exact: false },
  { href: "/portal/assets", label: "Assets", icon: FolderKanban, exact: false },
  { href: "/portal/account", label: "Account", icon: UserCircle2, exact: false },
];

function SidebarNav({
  pathname,
  profile,
  initials,
  onLogout,
  onClose,
}: {
  pathname: string;
  profile: PortalProfile;
  initials: string;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo header */}
      <div className="flex items-center justify-between border-b border-[#E5E2DB] px-5 py-5">
        <MaverickLogo
          size="sm"
          descriptor="Client Portal"
          surface="light"
          wordmarkClassName="[--maverick-wordmark-plate:transparent] [--maverick-wordmark-text:#1A1A1A]"
          descriptorClassName="text-[#6B7280]"
        />
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#6B7280] transition-colors hover:bg-[#F7F4EF] hover:text-[#1A1A1A]"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* New Estimate CTA */}
      <div className="px-4 py-4">
        <Link
          href="/portal/quotes"
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C4F542] px-4 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-[#b5e13a] active:scale-[0.98]"
        >
          <WalletCards size={15} />
          New Estimate
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-0.5 px-3 pb-4">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#F7F4EF] text-[#1A1A1A]"
                  : "text-[#6B7280] hover:bg-[#F7F4EF] hover:text-[#1A1A1A]"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#C4F542]" />
              )}
              <Icon size={16} className={active ? "text-[#1A1A1A]" : "text-[#9CA3AF]"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Account block */}
      <div className="border-t border-[#E5E2DB] px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-[11px] font-bold text-[#C4F542]">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#1A1A1A]">{profile.businessName}</p>
            <p className="truncate text-xs text-[#6B7280]">{profile.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="rounded-lg p-1.5 text-[#6B7280] transition-colors hover:bg-[#F7F4EF] hover:text-[#1A1A1A]"
            title="Sign out"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    if (supabase) await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  }

  const navProps = { pathname, profile, initials, onLogout: handleLogout };

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      {/* Desktop sidebar — fixed, always visible at lg+ */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-[#E5E2DB] shadow-[1px_0_0_0_#E5E2DB] lg:block">
        <SidebarNav {...navProps} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed inset-y-0 left-0 z-50 w-60 border-r border-[#E5E2DB] lg:hidden"
            >
              <SidebarNav {...navProps} onClose={() => setDrawerOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="lg:ml-60">
        {/* Lean header */}
        <header className="sticky top-0 z-30 border-b border-[#E5E2DB] bg-[#F7F4EF]/95 backdrop-blur-sm">
          <div className="flex h-14 items-center gap-3 px-5 md:px-8">
            <button
              className="rounded-lg p-1.5 text-[#6B7280] transition-colors hover:bg-white hover:text-[#1A1A1A] lg:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-semibold text-[#1A1A1A]">{title}</h1>
              {subtitle && (
                <p className="hidden truncate text-xs text-[#6B7280] sm:block">{subtitle}</p>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-5 py-6 md:px-8">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
