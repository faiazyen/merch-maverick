"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

const verticals = [
  { label: "Hospitality", href: "/hospitality", desc: "Hotels & Restaurants" },
  { label: "Fitness", href: "/fitness", desc: "Gyms & Activewear" },
  { label: "Corporate", href: "/corporate", desc: "Branded Office Merch" },
  { label: "Industrial", href: "/industrial", desc: "Workwear & PPE" },
  { label: "Events", href: "/events", desc: "Festival & Tour Merch" },
];

// Triangle SVG mark from brand identity
function TriangleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer triangle */}
      <path
        d="M20 2L38 34H2L20 2Z"
        stroke="url(#navGrad)"
        strokeWidth="2"
        fill="none"
      />
      {/* Inner triangle (inverted, smaller) */}
      <path
        d="M20 10L31 30H9L20 10Z"
        stroke="url(#navGrad)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="navGrad" x1="0" y1="0" x2="40" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

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
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <TriangleMark className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
            <span
              className="font-display font-black italic text-xl tracking-tight text-white uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
            >
              MAVERICK<span style={{ color: "#8B5CF6" }}>.</span>
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
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm text-white/70 hover:text-white transition-colors">
                Solutions <ChevronDown size={14} />
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div
                    className="rounded-xl border border-white/10 p-2 min-w-[240px]"
                    style={{ background: "#111111" }}
                  >
                    {verticals.map((v) => (
                      <Link
                        key={v.href}
                        href={v.href}
                        className="flex flex-col px-4 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <span className="font-medium text-white text-sm group-hover:text-purple-400 transition-colors">{v.label}</span>
                        <span className="text-white/40 text-xs">{v.desc}</span>
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
                className="px-4 py-2 rounded-lg font-medium text-sm text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/portal"
              className="px-4 py-2 rounded-lg font-medium text-sm text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Client Portal
            </Link>
            <Link
              href="/quote"
              className="btn-accent px-5 py-2 rounded-lg font-semibold text-sm"
            >
              Get Instant Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/5" style={{ background: "#0A0A0A" }}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest px-3 py-2">
              Solutions
            </p>
            {verticals.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                onClick={() => setMobileOpen(false)}
                className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-white text-sm">{v.label}</span>
                <span className="text-white/40 text-xs">{v.desc}</span>
              </Link>
            ))}
            <div className="divider-accent my-3" />
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
                className="px-3 py-2.5 rounded-lg font-medium text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link href="/quote" onClick={() => setMobileOpen(false)}>
                <button className="btn-accent w-full py-3 rounded-xl font-semibold text-base">
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
