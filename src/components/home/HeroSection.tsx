"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

function TriangleWatermark() {
  return (
    <svg
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none select-none animate-float"
      style={{ opacity: 0.04 }}
    >
      <path d="M100 5L195 170H5L100 5Z" stroke="white" strokeWidth="3" fill="none" />
      <path d="M100 45L160 155H40L100 45Z" stroke="white" strokeWidth="2" fill="none" />
      <path d="M100 80L130 140H70L100 80Z" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

const stats = [
  { value: "30–50%", label: "cheaper than distributors" },
  { value: "4–8 wks", label: "factory to your door" },
  { value: "MOQ 50", label: "units minimum order" },
  { value: "< 2 hrs", label: "quote response time" },
];

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Aurora glow — top center */}
      <div
        className="absolute inset-0 pointer-events-none animate-aurora"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(139,92,246,0.38) 0%, rgba(192,38,211,0.18) 40%, transparent 70%)",
        }}
      />
      {/* Secondary glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(139,92,246,0.10) 0%, transparent 60%)",
        }}
      />

      {/* Triangle watermark */}
      <TriangleWatermark />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        <div className="max-w-4xl">

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10">
              <Zap size={12} className="text-purple-400" />
              <span className="text-purple-300 text-xs font-medium uppercase tracking-widest">
                Factory-Direct B2B Merch · Europe
              </span>
            </div>
          </div>

          {/* Main headline */}
          <h1
            className="text-white leading-none mb-6"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            No Middlemen.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #C026D3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              No Compromise.
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Premium custom merchandise sourced direct from vetted factories in
            Bangladesh and China — for hospitality, fitness, corporate, industrial,
            and events brands across Europe.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link href="/quote">
              <button className="btn-accent flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base glow-accent">
                Get an Instant Quote
                <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/pricing">
              <button
                className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base transition-all"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.10)";
                }}
              >
                See Our Pricing
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center px-4 py-5 text-center"
                style={{
                  background: "#0A0A0A",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                }}
              >
                <span
                  className="text-2xl sm:text-3xl font-black mb-1"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    background: "linear-gradient(135deg, #8B5CF6 0%, #C026D3 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs uppercase tracking-wide"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
      />
    </section>
  );
}
