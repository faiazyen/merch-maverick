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
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-bg-primary-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-dark shadow-sm dark:shadow-none"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-semibold text-xl tracking-tight text-text-light dark:text-text-dark">
              Merch Maverick
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Solutions dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors">
                Solutions <ChevronDown size={14} className={cn("transition-transform", solutionsOpen && "rotate-180")} />
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-2 min-w-[260px] shadow-lg">
                    {verticals.map((v) => (
                      <Link
                        key={v.href}
                        href={v.href}
                        className="flex flex-col px-4 py-2.5 rounded-lg hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark transition-colors group"
                      >
                        <span className="font-medium text-text-light dark:text-text-dark text-sm group-hover:text-teal transition-colors">
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
              { label: "Pricing", href: "/pricing" },
              { label: "About", href: "/about" },
              { label: "Sustainability", href: "/sustainability" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg font-medium text-sm text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/portal"
              className="px-4 py-2 rounded-lg font-medium text-sm text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark hover:border-teal hover:text-teal transition-all"
            >
              Client Portal
            </Link>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg border border-border-light dark:border-border-dark hover:border-teal text-muted-light dark:text-muted-dark hover:text-teal transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            <Link
              href="/quote"
              className="bg-teal hover:bg-teal-dark text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Instant Quote
            </Link>
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="flex lg:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-muted-light dark:text-muted-dark hover:text-teal transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <button
              className="p-2 rounded-lg text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border-light dark:border-border-dark bg-white dark:bg-bg-primary-dark">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <p className="text-xs font-semibold text-muted-light dark:text-muted-dark uppercase tracking-widest px-3 py-2">
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
              { label: "Pricing", href: "/pricing" },
              { label: "About", href: "/about" },
              { label: "Sustainability", href: "/sustainability" },
              { label: "Client Portal", href: "/portal" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-lg font-medium text-sm text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link href="/quote" onClick={() => setMobileOpen(false)}>
                <button className="bg-teal hover:bg-teal-dark text-white w-full py-3 rounded-xl font-semibold text-base transition-all">
                  Get Instant Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
