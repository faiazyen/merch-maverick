import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

// Factory photos — replace with real facility photos when available
const factoryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Production floor — placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1609748340878-a1cd1f2f3bdb?w=600&q=80",
    alt: "Embroidery machines — placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    alt: "Quality control — placeholder",
  },
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    alt: "Packing and shipping — placeholder",
  },
];

const stats = [
  { value: "2", label: "Vetted Factory Partners" },
  { value: "500K+", label: "Units Produced Annually" },
  { value: "ISO", label: "Certified QC Process" },
  { value: "12+", label: "Years Combined Experience" },
];

const vetReasons = [
  "On-site audits before any partnership — we visit every factory in person",
  "Multi-stage QC: pre-production samples, in-line inspection, final check before shipment",
  "Ethical sourcing standards — BSCI certified, living wage compliance",
];

export function FactoriesSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Purple glow left */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 0% 50%, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4 text-center"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Where Your Products Are Made
        </p>

        <h2
          className="text-center text-white leading-none mb-16"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 900,
            fontStyle: "italic",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
          }}
        >
          Our{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #C026D3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Factories
          </span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Photo grid */}
          <div className="grid grid-cols-2 gap-3">
            {factoryPhotos.map((photo, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden aspect-square relative"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  style={{ filter: "brightness(0.75) saturate(0.8)" }}
                />
              </div>
            ))}
            <p
              className="col-span-2 text-center text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.12)" }}
            >
              Placeholder photos — replace with real factory images when available
            </p>
          </div>

          {/* Right: Stats + copy */}
          <div>
            {/* Origin badges */}
            <div className="flex gap-3 mb-8">
              {[
                { flag: "🇧🇩", country: "Bangladesh", focus: "Apparel & Uniforms" },
                { flag: "🇨🇳", country: "China", focus: "Accessories & Hard Goods" },
              ].map((origin) => (
                <div
                  key={origin.country}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span className="text-2xl">{origin.flag}</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{origin.country}</p>
                    <p className="text-white/30 text-xs">{origin.focus}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="px-4 py-4 rounded-xl"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <p
                    className="text-2xl font-black mb-1"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      background: "linear-gradient(135deg, #8B5CF6 0%, #C026D3 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Narrative */}
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              We don't work with anonymous factories from a marketplace. Every partner
              has been visited in person, audited for quality and ethics, and has
              a proven track record of delivering on spec.
            </p>

            {/* Vet reasons */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "#0A0A0A",
                borderLeft: "2px solid #8B5CF6",
                border: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#8B5CF6" }}>
                Why we vet differently
              </p>
              <ul className="space-y-3">
                {vetReasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                    <CheckCircle2 size={15} className="text-purple-500 mt-0.5 shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
