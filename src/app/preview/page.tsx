"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Circle, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════
   COLOR PALETTE DEFINITIONS
   ═══════════════════════════════════════════ */
const palettes = [
  {
    name: "Tomorrowland Gold",
    description: "Dark luxury + gold — inspired by Tomorrowland Store",
    bg: "#0a0a0a",
    bgLight: "#faf8f3",
    accent: "#c9a84c",
    accentDark: "#b08f3a",
    secondary: "#1a1a1a",
    text: "#ffffff",
    muted: "#737373",
    card: "#141414",
    border: "#262626",
    gradientFrom: "from-amber-500/[0.12]",
    gradientVia: "via-yellow-600/[0.08]",
    gradientTo: "to-orange-500/[0.04]",
  },
  {
    name: "Tomorrowland Monochrome",
    description: "Pure black + white — cinematic minimal luxury",
    bg: "#000000",
    bgLight: "#fafafa",
    accent: "#ffffff",
    accentDark: "#e5e5e5",
    secondary: "#171717",
    text: "#ffffff",
    muted: "#6b6b6b",
    card: "#0d0d0d",
    border: "#1f1f1f",
    gradientFrom: "from-white/[0.06]",
    gradientVia: "via-gray-400/[0.04]",
    gradientTo: "to-white/[0.02]",
  },
  {
    name: "Dark Gold + Warm Ivory",
    description: "Warm luxury — gold accent, ivory highlights",
    bg: "#0c0b09",
    bgLight: "#fdf8ef",
    accent: "#d4af37",
    accentDark: "#b8972e",
    secondary: "#1c1a15",
    text: "#faf5e8",
    muted: "#8a8070",
    card: "#161410",
    border: "#2a2620",
    gradientFrom: "from-yellow-500/[0.12]",
    gradientVia: "via-amber-500/[0.08]",
    gradientTo: "to-orange-600/[0.04]",
  },
  {
    name: "Obsidian + Champagne",
    description: "Deep black + soft champagne/rose gold",
    bg: "#08080a",
    bgLight: "#fdf5f0",
    accent: "#c4a07c",
    accentDark: "#a88a68",
    secondary: "#151518",
    text: "#f5f0eb",
    muted: "#7a7570",
    card: "#111114",
    border: "#252528",
    gradientFrom: "from-orange-300/[0.10]",
    gradientVia: "via-amber-400/[0.06]",
    gradientTo: "to-rose-400/[0.04]",
  },
  {
    name: "Deep Navy + Gold",
    description: "Luxury, premium B2B",
    bg: "#0f172a",
    bgLight: "#f8fafc",
    accent: "#d4a843",
    accentDark: "#b8922e",
    secondary: "#334155",
    text: "#f1f5f9",
    muted: "#94a3b8",
    card: "#1e293b",
    border: "#334155",
    gradientFrom: "from-amber-400/[0.15]",
    gradientVia: "via-yellow-500/[0.1]",
    gradientTo: "to-orange-400/[0.05]",
  },
  {
    name: "Slate + Emerald",
    description: "Modern, fresh, professional",
    bg: "#1a1f2e",
    bgLight: "#f0fdf4",
    accent: "#10b981",
    accentDark: "#059669",
    secondary: "#475569",
    text: "#f0fdf4",
    muted: "#94a3b8",
    card: "#242938",
    border: "#374151",
    gradientFrom: "from-emerald-500/[0.15]",
    gradientVia: "via-green-400/[0.1]",
    gradientTo: "to-teal-500/[0.05]",
  },
  {
    name: "Charcoal + Copper",
    description: "Industrial, premium manufacturing",
    bg: "#1c1917",
    bgLight: "#faf5f0",
    accent: "#c27a3e",
    accentDark: "#a6652f",
    secondary: "#57534e",
    text: "#fafaf9",
    muted: "#a8a29e",
    card: "#292524",
    border: "#44403c",
    gradientFrom: "from-orange-500/[0.15]",
    gradientVia: "via-amber-600/[0.1]",
    gradientTo: "to-yellow-700/[0.05]",
  },
  {
    name: "Dark + Electric Blue",
    description: "Tech-forward, modern",
    bg: "#0a0a0f",
    bgLight: "#f0f4ff",
    accent: "#3b82f6",
    accentDark: "#2563eb",
    secondary: "#374151",
    text: "#f0f4ff",
    muted: "#9ca3af",
    card: "#151520",
    border: "#2d2d3d",
    gradientFrom: "from-blue-500/[0.15]",
    gradientVia: "via-indigo-500/[0.1]",
    gradientTo: "to-cyan-500/[0.05]",
  },
];

/* ═══════════════════════════════════════════
   HERO OPTION 1: HeroGeometric (Shape Landing)
   ═══════════════════════════════════════════ */
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/[0.12]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.08)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({ palette }: { palette: (typeof palettes)[0] }) {
  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl"
      style={{ background: palette.bg, height: 520 }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 blur-3xl"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${palette.accent}15 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, ${palette.accent}10 0%, transparent 50%)`,
        }}
      />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.2}
          width={350}
          height={85}
          rotate={12}
          gradient={palette.gradientFrom.replace("from-", "from-") }
          className="left-[-5%] top-[18%]"
        />
        <ElegantShape
          delay={0.4}
          width={280}
          height={70}
          rotate={-15}
          gradient={palette.gradientFrom}
          className="right-[-2%] top-[68%]"
        />
        <ElegantShape
          delay={0.3}
          width={180}
          height={50}
          rotate={-8}
          gradient={palette.gradientFrom}
          className="left-[8%] bottom-[8%]"
        />
        <ElegantShape
          delay={0.5}
          width={120}
          height={35}
          rotate={20}
          gradient={palette.gradientFrom}
          className="right-[18%] top-[12%]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
          style={{
            background: `${palette.accent}08`,
            border: `1px solid ${palette.accent}20`,
          }}
        >
          <Circle
            className="h-2 w-2"
            style={{ fill: palette.accent, color: palette.accent }}
          />
          <span style={{ color: palette.muted }} className="text-sm tracking-wide">
            Factory-Direct B2B Merch
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-[1.1]"
        >
          <span style={{ color: palette.text }}>Premium Custom Merchandise. </span>
          <span style={{ color: palette.accent }}>Factory Direct.</span>
          <br />
          <span style={{ color: palette.muted }}>Designed to Perfection.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base mb-8 max-w-lg mx-auto"
          style={{ color: palette.muted }}
        >
          Custom-branded apparel sourced direct from vetted factories — for
          hospitality, fitness, corporate, and creator brands across Europe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex gap-3 justify-center"
        >
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02]"
            style={{ background: palette.accent }}
          >
            Get Instant Quote <ArrowRight size={16} />
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{
              color: palette.text,
              border: `1px solid ${palette.border}`,
            }}
          >
            View Solutions <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${palette.bg}, transparent)`,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO OPTION 2: Hero with Mockup + Glow
   ═══════════════════════════════════════════ */
function HeroMockupGlow({ palette }: { palette: (typeof palettes)[0] }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ background: palette.bg, height: 520 }}
    >
      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[60%] w-[80%] h-[300px] rounded-[50%] blur-[80px]"
          style={{ background: `${palette.accent}20` }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center pt-14 px-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4"
          style={{
            background: `linear-gradient(to bottom, ${palette.text}, ${palette.muted})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Premium Custom Merchandise.
          <br />
          Factory Direct. Designed to Perfection.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-base max-w-lg mb-8"
          style={{ color: palette.muted }}
        >
          Custom-branded apparel sourced direct from vetted factories — for
          hospitality, fitness, corporate, and creator brands across Europe.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex gap-3 mb-10"
        >
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white shadow-lg transition-all hover:scale-[1.02]"
            style={{
              background: `linear-gradient(to bottom, ${palette.accent}, ${palette.accentDark})`,
              boxShadow: `0 8px 24px ${palette.accent}30`,
            }}
          >
            Get Instant Quote <ArrowRight size={16} />
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ color: `${palette.text}cc` }}
          >
            View Solutions
          </button>
        </motion.div>

        {/* Product Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-2xl rounded-xl overflow-hidden"
          style={{
            border: `1px solid ${palette.border}`,
            boxShadow: `0 0 50px -12px ${palette.accent}30`,
          }}
        >
          <div
            className="w-full h-48 flex items-center justify-center"
            style={{ background: palette.card }}
          >
            <div className="grid grid-cols-4 gap-3 px-6">
              {["Polo", "Hoodie", "Uniform", "Gym Wear"].map((name, i) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg"
                  style={{ background: `${palette.accent}08`, border: `1px solid ${palette.border}` }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold"
                    style={{ background: `${palette.accent}15`, color: palette.accent }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs font-medium" style={{ color: palette.text }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO OPTION 3: Split Layout with Products
   ═══════════════════════════════════════════ */
function HeroSplitProducts({ palette }: { palette: (typeof palettes)[0] }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ background: palette.bg, height: 520 }}
    >
      {/* Accent blurs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"
        style={{ background: `${palette.accent}08` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"
        style={{ background: `${palette.accent}06` }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-14 h-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                border: `1px solid ${palette.accent}30`,
                background: `${palette.accent}08`,
              }}
            >
              <span
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: palette.accent }}
              >
                Factory-Direct B2B Merch
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight mb-4"
            >
              <span style={{ color: palette.text }}>Premium Custom Merchandise. </span>
              <span style={{ color: palette.accent }}>Factory Direct. </span>
              <span style={{ color: palette.muted }}>Designed to Perfection.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm leading-relaxed mb-8 max-w-md"
              style={{ color: palette.muted }}
            >
              Custom-branded apparel sourced direct from vetted factories — for
              hospitality, fitness, corporate, and creator brands across Europe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex gap-3 mb-8"
            >
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02] shadow-lg"
                style={{
                  background: palette.accent,
                  boxShadow: `0 4px 16px ${palette.accent}30`,
                }}
              >
                Get Instant Quote <ArrowRight size={16} />
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{
                  color: palette.text,
                  border: `1px solid ${palette.border}`,
                }}
              >
                View Solutions
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-4 rounded-xl overflow-hidden"
              style={{ border: `1px solid ${palette.border}` }}
            >
              {[
                { value: "30-50%", label: "cheaper" },
                { value: "4-8 wks", label: "delivery" },
                { value: "MOQ 50", label: "minimum" },
                { value: "< 2 hrs", label: "quote time" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center py-3 px-2 text-center"
                  style={{
                    background: palette.card,
                    borderRight: i < 3 ? `1px solid ${palette.border}` : "none",
                  }}
                >
                  <span
                    className="text-lg font-bold"
                    style={{ color: palette.accent }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide" style={{ color: palette.muted }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Product Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Premium Polo", num: 1 },
                { name: "Custom Hoodie", num: 2 },
                { name: "Branded Uniform", num: 3 },
                { name: "Gym Wear", num: 4 },
              ].map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: `1px solid ${palette.border}`,
                    background: `linear-gradient(to bottom, ${palette.card}, ${palette.bg})`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-3">
                      <div
                        className="w-14 h-14 mx-auto mb-2 rounded-full flex items-center justify-center"
                        style={{ background: `${palette.accent}12` }}
                      >
                        <span
                          className="text-xl font-bold"
                          style={{ color: palette.accent }}
                        >
                          {product.num}
                        </span>
                      </div>
                      <p className="font-semibold text-sm" style={{ color: palette.text }}>
                        {product.name}
                      </p>
                      <p className="text-[10px] mt-1" style={{ color: palette.muted }}>
                        AI Product Render
                      </p>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 p-2"
                    style={{
                      background: `linear-gradient(to top, ${palette.bg}dd, transparent)`,
                    }}
                  >
                    <p className="text-xs font-medium" style={{ color: palette.text }}>
                      {product.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO OPTION 4: Tomorrowland Cinematic
   Full-bleed, editorial, ultra-minimal
   ═══════════════════════════════════════════ */
function HeroCinematic({ palette }: { palette: (typeof palettes)[0] }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl flex flex-col"
      style={{ background: palette.bg, height: 520 }}
    >
      {/* Full-bleed background image placeholder */}
      <div className="absolute inset-0">
        {/* Simulated cinematic product image area */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, ${palette.bg} 0%, ${palette.card} 40%, ${palette.bg} 100%)
            `,
          }}
        />
        {/* Large product silhouettes */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
          <div className="grid grid-cols-3 gap-16">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: i * 0.3 }}
                className="w-40 h-56 rounded-2xl"
                style={{
                  background: `linear-gradient(to bottom, ${palette.accent}40, transparent)`,
                }}
              />
            ))}
          </div>
        </div>
        {/* Cinematic vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, ${palette.bg} 80%)`,
          }}
        />
      </div>

      {/* Thin accent line at top */}
      <div
        className="relative z-10 w-full h-[1px]"
        style={{
          background: `linear-gradient(to right, transparent, ${palette.accent}40, transparent)`,
        }}
      />

      {/* Content — ultra minimal, centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {/* Small top label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-[10px] uppercase tracking-[0.4em] mb-8"
          style={{ color: palette.accent }}
        >
          Factory-Direct Custom Merchandise
        </motion.span>

        {/* Main headline — large, editorial */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-center leading-[1.1] mb-4"
          style={{ color: palette.text }}
        >
          Designed to
          <br />
          <span className="font-bold italic" style={{ color: palette.accent }}>
            Perfection
          </span>
        </motion.h1>

        {/* Subtle divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-16 h-[1px] mb-6"
          style={{ background: palette.accent }}
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm text-center max-w-md mb-10 leading-relaxed"
          style={{ color: palette.muted }}
        >
          Premium branded apparel, sourced factory-direct.
          <br />
          30–50% less than distributors. No middlemen. No compromise.
        </motion.p>

        {/* CTA — minimal, elegant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex gap-6 items-center"
        >
          <button
            className="group flex items-center gap-3 px-8 py-3.5 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: palette.accent,
              color: palette.bg,
            }}
          >
            Get a Quote
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            className="text-sm tracking-wide uppercase transition-all duration-300 hover:opacity-80"
            style={{
              color: palette.text,
              borderBottom: `1px solid ${palette.accent}50`,
              paddingBottom: 2,
            }}
          >
            Explore
          </button>
        </motion.div>

        {/* Bottom stats — ultra minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center gap-12"
        >
          {[
            { value: "30–50%", label: "Savings" },
            { value: "4–8 Wks", label: "Delivery" },
            { value: "MOQ 50", label: "Minimum" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-sm font-semibold tracking-wide" style={{ color: palette.accent }}>
                {stat.value}
              </p>
              <p className="text-[9px] uppercase tracking-[0.25em] mt-1" style={{ color: palette.muted }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PALETTE SWATCH CARD
   ═══════════════════════════════════════════ */
function PaletteCard({
  palette,
  isActive,
  onClick,
}: {
  palette: (typeof palettes)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left w-full",
        isActive
          ? "border-white/50 shadow-lg scale-[1.02]"
          : "border-white/10 hover:border-white/25"
      )}
      style={{ background: palette.bg }}
    >
      {isActive && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <Check size={14} className="text-black" />
        </div>
      )}
      {/* Color swatches */}
      <div className="flex gap-2">
        <div className="w-10 h-10 rounded-lg" style={{ background: palette.bg }} title="Background" />
        <div className="w-10 h-10 rounded-lg" style={{ background: palette.accent }} title="Accent" />
        <div className="w-10 h-10 rounded-lg" style={{ background: palette.card }} title="Card" />
        <div className="w-10 h-10 rounded-lg" style={{ background: palette.secondary }} title="Secondary" />
        <div className="w-10 h-10 rounded-lg" style={{ background: palette.muted }} title="Muted" />
      </div>
      <div>
        <p className="font-bold text-sm" style={{ color: palette.text }}>{palette.name}</p>
        <p className="text-xs" style={{ color: palette.muted }}>{palette.description}</p>
      </div>
      {/* Mini text preview */}
      <div className="flex gap-2 items-center">
        <span className="text-xs font-bold" style={{ color: palette.accent }}>
          Accent
        </span>
        <span className="text-xs" style={{ color: palette.text }}>
          Heading
        </span>
        <span className="text-xs" style={{ color: palette.muted }}>
          Body text
        </span>
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════
   MAIN PREVIEW PAGE
   ═══════════════════════════════════════════ */
export default function PreviewPage() {
  const [activePalette, setActivePalette] = useState(0);
  const [activeHero, setActiveHero] = useState(0);

  const heroOptions = [
    {
      name: "Geometric Shapes",
      description:
        "Floating animated glass shapes, centered text, gradient overlays. Most creative & unique.",
      component: HeroGeometric,
    },
    {
      name: "Mockup + Glow",
      description:
        "Centered layout, gradient text, product mockup frame with glow effect underneath.",
      component: HeroMockupGlow,
    },
    {
      name: "Split Layout",
      description:
        "Your current layout style refined — text left, product grid right, stats bar.",
      component: HeroSplitProducts,
    },
    {
      name: "Cinematic (Tomorrowland)",
      description:
        "Ultra-minimal, editorial, full-bleed cinematic hero. Inspired by Tomorrowland Store — elegant typography, lots of negative space, accent line details, subtle animations.",
      component: HeroCinematic,
    },
  ];

  const ActiveHeroComponent = heroOptions[activeHero].component;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Merch Maverick — Design Preview</h1>
            <p className="text-sm text-white/50">
              Select a color palette + hero style to preview combinations
            </p>
          </div>
          <Link
            href="/"
            className="text-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
          >
            Back to Site
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* ── SECTION 1: Color Palettes ── */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Step 1: Choose Color Palette</h2>
          <p className="text-white/50 mb-6">
            Click a palette to see it applied to all hero options below
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {palettes.map((p, i) => (
              <PaletteCard
                key={p.name}
                palette={p}
                isActive={activePalette === i}
                onClick={() => setActivePalette(i)}
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 2: Hero Style Selector ── */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Step 2: Choose Hero Style</h2>
          <p className="text-white/50 mb-6">
            Each hero shown with your selected palette:{" "}
            <span className="font-semibold text-white">
              {palettes[activePalette].name}
            </span>
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {heroOptions.map((hero, i) => (
              <button
                key={hero.name}
                onClick={() => setActiveHero(i)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeHero === i
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/70 hover:bg-white/15"
                )}
              >
                {hero.name}
              </button>
            ))}
          </div>

          {/* Active Hero Preview */}
          <div className="mb-3">
            <p className="text-sm text-white/40 mb-4">
              {heroOptions[activeHero].description}
            </p>
            <ActiveHeroComponent palette={palettes[activePalette]} />
          </div>
        </section>

        {/* ── SECTION 3: All Combos Grid ── */}
        <section>
          <h2 className="text-2xl font-bold mb-2">
            Full Comparison: All Palettes x Current Hero
          </h2>
          <p className="text-white/50 mb-6">
            See your selected hero style ({heroOptions[activeHero].name}) across
            all 4 palettes at once
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {palettes.map((p, i) => (
              <div key={p.name}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full" style={{ background: p.bg, border: "1px solid rgba(255,255,255,0.2)" }} />
                    <div className="w-4 h-4 rounded-full" style={{ background: p.accent }} />
                    <div className="w-4 h-4 rounded-full" style={{ background: p.card, border: "1px solid rgba(255,255,255,0.1)" }} />
                  </div>
                  <span className="text-sm font-semibold">{p.name}</span>
                  <span className="text-xs text-white/40">{p.description}</span>
                </div>
                <div className="transform scale-100">
                  <ActiveHeroComponent palette={p} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer note */}
      <div className="text-center py-10 text-white/30 text-sm">
        Preview page — select your favorites and tell me which combo to implement
      </div>
    </div>
  );
}
