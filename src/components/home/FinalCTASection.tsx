import Link from "next/link";
import { ArrowRight, Clock, Zap, Package } from "lucide-react";

function TriangleWatermark() {
  return (
    <svg
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none select-none"
      style={{ opacity: 0.025 }}
    >
      <path d="M100 5L195 170H5L100 5Z" stroke="white" strokeWidth="3" fill="none" />
      <path d="M100 45L160 155H40L100 45Z" stroke="white" strokeWidth="2" fill="none" />
      <path d="M100 80L130 140H70L100 80Z" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function FinalCTASection() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Purple aurora glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,92,246,0.18) 0%, rgba(192,38,211,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Triangle watermark */}
      <TriangleWatermark />

      {/* Top divider */}
      <div className="divider-accent absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8">
          <Zap size={12} className="text-purple-400" />
          <span className="text-purple-300 text-xs font-medium uppercase tracking-widest">
            Quote in under 2 minutes
          </span>
        </div>

        {/* Headline */}
        <h2
          className="text-white leading-none mb-6"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 900,
            fontStyle: "italic",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          Stop Overpaying
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #C026D3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            For Merch.
          </span>
        </h2>

        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.40)" }}>
          Join European businesses already saving 30–50% on branded merchandise.
          Get your instant quote — no sales call required.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/quote">
            <button className="btn-accent flex items-center gap-2.5 px-10 py-4 rounded-xl font-semibold text-base glow-accent">
              Get Instant Quote
              <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/about">
            <button
              className="flex items-center gap-2.5 px-10 py-4 rounded-xl font-semibold text-base transition-all"
              style={{
                color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              Book a Discovery Call
            </button>
          </Link>
        </div>

        {/* Trust signals */}
        <div
          className="flex flex-wrap justify-center gap-6 text-sm"
          style={{ color: "rgba(255,255,255,0.30)" }}
        >
          {[
            { icon: Clock, text: "Response within 2 hours" },
            { icon: Zap, text: "No commitment required" },
            { icon: Package, text: "Free product samples available" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={14} style={{ color: "#8B5CF6" }} />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
