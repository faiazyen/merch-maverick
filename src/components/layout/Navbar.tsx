"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";

const verticals = [
  { label: "Hospitality", href: "/solutions/hospitality", desc: "Hotels & Restaurants" },
  { label: "Corporate", href: "/solutions/corporate", desc: "Tech & Office Brands" },
  { label: "Fitness", href: "/solutions/fitness", desc: "Gyms & Activewear" },
  { label: "Industrial", href: "/solutions/industrial", desc: "Workwear & PPE" },
  { label: "Events", href: "/solutions/events", desc: "Festivals & Tours" },
  { label: "Influencers & Artists", href: "/solutions/influencers-artists", desc: "Creator Merch" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border-light/70 bg-white/78 shadow-[0_12px_40px_rgba(17,17,17,0.08)] backdrop-blur-xl dark:border-border-dark dark:bg-bg-primary-dark/82"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur dark:border-border-dark dark:bg-card-dark/80">
              <span className="text-text-light dark:text-text-dark text-sm font-bold">M</span>
            </div>
            <div>
              <span className="block font-semibold text-lg tracking-tight text-text-light dark:text-text-dark">
                Merch Maverick
              </span>
              <span className="hidden text-[11px] uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark sm:block">
                Factory-Owned Production
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/60 bg-white/68 p-1.5 shadow-sm backdrop-blur dark:border-border-dark dark:bg-card-dark/70">
            {/* Solutions dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-text-light transition-colors hover:bg-bg-secondary-light dark:text-text-dark dark:hover:bg-bg-secondary-dark">
                Solutions <ChevronDown size={14} className={cn("transition-transform", solutionsOpen && "rotate-180")} />
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="min-w-[280px] rounded-2xl border border-border-light/70 bg-white/92 p-2 shadow-[0_18px_50px_rgba(17,17,17,0.08)] backdrop-blur dark:border-border-dark dark:bg-card-dark/92">
                    {verticals.map((v) => (
                      <Link
                        key={v.href}
                        href={v.href}
                        className="group flex flex-col rounded-xl px-4 py-3 transition-colors hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark"
                      >
                        <span className="font-medium text-text-light dark:text-text-dark text-sm">
                          {v.label}
                        </span>
                        <span className="text-muted-light dark:text-muted-dark text-xs">
                          {v.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {[
              { label: "Success Stories", href: "/testimonials" },
              { label: "Pricing & Savings", href: "/pricing" },
              { label: "Our Story", href: "/about" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-text-light transition-colors hover:bg-bg-secondary-light dark:text-text-dark dark:hover:bg-bg-secondary-dark"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full border border-white/60 bg-white/68 p-2.5 text-muted-light shadow-sm backdrop-blur transition-all hover:bg-bg-secondary-light dark:border-border-dark dark:bg-card-dark/72 dark:text-muted-dark dark:hover:bg-bg-secondary-dark"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            <Link
              href="/quote"
              className="rounded-full bg-text-light px-5 py-2.5 text-sm font-medium text-white shadow-[0_12px_34px_rgba(17,17,17,0.1)] transition-all hover:-translate-y-0.5 hover:bg-teal dark:bg-text-dark dark:text-bg-primary-dark"
            >
              Get Your Instant Quote
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full border border-white/60 bg-white/72 p-2.5 text-muted-light shadow-sm backdrop-blur transition-colors hover:bg-bg-secondary-light dark:border-border-dark dark:bg-card-dark/72 dark:text-muted-dark dark:hover:bg-bg-secondary-dark"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <button
              className="rounded-full border border-white/60 bg-white/72 p-2.5 text-text-light shadow-sm backdrop-blur transition-colors hover:bg-bg-secondary-light dark:border-border-dark dark:bg-card-dark/72 dark:text-text-dark dark:hover:bg-bg-secondary-dark"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border-light/70 bg-white/92 backdrop-blur-xl dark:border-border-dark dark:bg-bg-primary-dark/92">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-light dark:text-muted-dark uppercase tracking-widest px-3 py-2">
              Solutions
            </p>
            {verticals.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                onClick={() => setMobileOpen(false)}
                className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark transition-colors"
              >
                <span className="font-medium text-text-light dark:text-text-dark text-sm">
                  {v.label}
                </span>
                <span className="text-muted-light dark:text-muted-dark text-xs">
                  {v.desc}
                </span>
              </Link>
            ))}
            <div className="h-px bg-border-light dark:bg-border-dark my-3" />
            {[
              { label: "Success Stories", href: "/testimonials" },
              { label: "Pricing & Savings", href: "/pricing" },
              { label: "Our Story", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm text-text-light dark:text-text-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link href="/quote" onClick={() => setMobileOpen(false)}>
                <button className="w-full rounded-2xl bg-text-light py-3 text-base font-semibold text-white transition-all hover:opacity-90 dark:bg-text-dark dark:text-bg-primary-dark">
                  Get Your Instant Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
