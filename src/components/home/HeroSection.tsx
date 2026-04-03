"use client";

import Link from "next/link";
import { ArrowRight, Star, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

const stats = [
  { value: "30–50%", label: "Cheaper than distributors" },
  { value: "3–5 wks", label: "Standard lead time" },
  { value: "€20K+", label: "Already delivered in 2025" },
  { value: "5 verticals", label: "Industries served" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0c1a2e]">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#2351a4]/20 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1e3a6e]/30 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#142240]/40 blur-[120px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium mb-6">
              <Zap size={12} className="text-[#fb923c]" />
              AI-Powered · Factory-Direct · Europe-Based
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Custom Merch.{" "}
              <span className="text-[#3b6fd4]">Factory Prices.</span>
              <br />
              No Middlemen.
            </h1>

            <p className="text-lg text-neutral-400 leading-relaxed mb-8 max-w-xl">
              We connect European businesses directly to our family-owned factories in Bangladesh.
              Premium custom apparel, uniforms, and branded merchandise — 30–50% cheaper than
              distributors, with AI-powered quoting and real-time production tracking.
            </p>

            {/* Key promises */}
            <ul className="space-y-2.5 mb-8">
              {[
                "Get an instant quote in under 2 minutes",
                "Factory-direct pricing — no distributor markups",
                "Real-time production tracking from factory to door",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-neutral-300">
                  <CheckCircle2 size={16} className="text-[#3b6fd4] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA group */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button variant="accent" size="xl" className="w-full sm:w-auto">
                  Get Instant Quote
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/about#how-it-works">
                <Button
                  variant="secondary"
                  size="xl"
                  className="w-full sm:w-auto border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Social proof mini */}
            <div className="flex items-center gap-3 mt-8 pt-8 border-t border-white/10">
              <div className="flex -space-x-2">
                {["H", "G", "F", "B"].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0c1a2e] bg-gradient-to-br from-[#2351a4] to-[#1e3a6e] flex items-center justify-center text-white text-xs font-bold"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-[#fb923c] fill-[#fb923c]" />
                  ))}
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Trusted by 20+ European businesses
                </p>
              </div>
            </div>
          </div>

          {/* Right: Stats card grid */}
          <div className="lg:pl-8">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 transition-colors"
                >
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quote time badge */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#1e3a6e]/60 to-[#2351a4]/40 border border-[#3b6fd4]/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">AI Quote Engine</p>
                  <p className="text-neutral-400 text-xs mt-0.5">
                    24hrs → <span className="text-[#3b6fd4] font-medium">under 2 hours</span>
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#2351a4]/50 flex items-center justify-center">
                  <Zap size={18} className="text-[#6a99e8]" />
                </div>
              </div>
              <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-[#2351a4] to-[#3b6fd4] rounded-full" />
              </div>
              <p className="text-xs text-neutral-500 mt-1.5">80% faster than industry average</p>
            </div>

            {/* Verticals served */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Hotels & Restaurants", "Gyms & Fitness", "Corporate", "Industrial", "Events"].map(
                (v) => (
                  <span
                    key={v}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/8 border border-white/10 text-neutral-300"
                  >
                    {v}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
