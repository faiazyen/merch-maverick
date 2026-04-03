"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown } from "lucide-react";

const verticals = [
  { label: "Hospitality", href: "/hospitality", desc: "Hotels & Restaurants" },
  { label: "Fitness", href: "/fitness", desc: "Gyms & Activewear" },
  { label: "Corporate", href: "/corporate", desc: "Branded Office Merch" },
  { label: "Industrial", href: "/industrial", desc: "Workwear & PPE" },
  { label: "Events", href: "/events", desc: "Festival & Tour Merch" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1e3a6e] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MM</span>
            </div>
            <span
              className={cn(
                "font-bold text-xl tracking-tight transition-colors",
                scrolled ? "text-[#0c1a2e]" : "text-white"
              )}
            >
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
              <button
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors",
                  scrolled
                    ? "text-neutral-700 hover:text-[#1e3a6e] hover:bg-[#f0f6ff]"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                Solutions <ChevronDown size={14} />
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-white rounded-xl shadow-xl border border-neutral-100 p-2 min-w-[240px]">
                    {verticals.map((v) => (
                      <Link
                        key={v.href}
                        href={v.href}
                        className="flex flex-col px-4 py-2.5 rounded-lg hover:bg-[#f0f6ff] transition-colors"
                      >
                        <span className="font-medium text-[#0c1a2e] text-sm">{v.label}</span>
                        <span className="text-neutral-500 text-xs">{v.desc}</span>
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
                className={cn(
                  "px-4 py-2 rounded-lg font-medium text-sm transition-colors",
                  scrolled
                    ? "text-neutral-700 hover:text-[#1e3a6e] hover:bg-[#f0f6ff]"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/portal">
              <Button
                variant={scrolled ? "outline" : "secondary"}
                size="sm"
                className={
                  !scrolled ? "border-white/50 text-white hover:bg-white hover:text-[#1e3a6e]" : ""
                }
              >
                Client Portal
              </Button>
            </Link>
            <Link href="/quote">
              <Button variant="accent" size="sm">
                Get Instant Quote
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-neutral-700" : "text-white"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 py-2">
              Solutions
            </p>
            {verticals.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                onClick={() => setMobileOpen(false)}
                className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-[#f0f6ff] transition-colors"
              >
                <span className="font-medium text-[#0c1a2e] text-sm">{v.label}</span>
                <span className="text-neutral-500 text-xs">{v.desc}</span>
              </Link>
            ))}
            <div className="h-px bg-neutral-100 my-2" />
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
                className="px-3 py-2.5 rounded-lg font-medium text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/quote" onClick={() => setMobileOpen(false)}>
                <Button variant="accent" size="lg" className="w-full">
                  Get Instant Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
