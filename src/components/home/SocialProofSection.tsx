import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie van den Berg",
    role: "Operations Manager",
    company: "Hotel Collection NL",
    vertical: "Hospitality",
    verticalColor: "#8B5CF6",
    quote:
      "We ordered 400 custom staff uniforms and 1,200 hotel towels. The quality exceeded what we were getting from our previous supplier — and we paid nearly half the price. The production tracking portal is brilliant.",
    order: "400 uniforms + 1,200 towels",
    saving: "€8,400 saved",
    rating: 5,
  },
  {
    name: "Marco Bianchi",
    role: "Founder",
    company: "FitZone Gyms, Italy",
    vertical: "Fitness",
    verticalColor: "#C026D3",
    quote:
      "We needed branded gym wear for 3 locations. Got a quote in 90 minutes and the mockups looked amazing. Lead time was 4 weeks and everything was perfect. Already reordering for our 4th location.",
    order: "600 branded gym wear items",
    saving: "€3,200 saved",
    rating: 5,
  },
  {
    name: "Melvin de la Cruz",
    role: "Event Director",
    company: "Melvin & Gatica Bachata",
    vertical: "Events",
    verticalColor: "#10B981",
    quote:
      "We've been using Merch Maverick since 2025 for our bachata festival merchandise. Quality is consistently great, turnaround is fast, and the communication is excellent. Our dancers love the merch.",
    order: "Multiple orders (€20K+)",
    saving: "€6,000+ saved",
    rating: 5,
  },
];

export function SocialProofSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 100% 0%, rgba(139,92,246,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Client Success
          </p>
          <h2
            className="text-white leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              fontStyle: "italic",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            Real Businesses.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #C026D3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Real Savings.
            </span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl p-6"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: `2px solid ${t.verticalColor}`,
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Large quote mark */}
              <div
                className="text-6xl font-black leading-none mb-3 -mt-2"
                style={{
                  fontFamily: "Georgia, serif",
                  background: "linear-gradient(135deg, #8B5CF6 0%, #C026D3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  opacity: 0.6,
                }}
              >
                "
              </div>

              {/* Quote text */}
              <p className="text-white/50 text-sm leading-relaxed flex-1 mb-5">
                {t.quote}
              </p>

              {/* Order result */}
              <div
                className="rounded-xl p-3 mb-5 flex items-center justify-between"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div>
                  <p className="text-white/25 text-xs">Order</p>
                  <p className="text-white text-xs font-medium mt-0.5">{t.order}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/25 text-xs">Result</p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: "#10B981" }}>{t.saving}</p>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.verticalColor}40, ${t.verticalColor}20)`, border: `1px solid ${t.verticalColor}30` }}
                >
                  {t.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm chrome-text">{t.name}</p>
                  <p className="text-white/30 text-xs truncate">
                    {t.role} · {t.company}
                  </p>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{
                    background: `${t.verticalColor}15`,
                    color: t.verticalColor,
                    border: `1px solid ${t.verticalColor}25`,
                  }}
                >
                  {t.vertical}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
