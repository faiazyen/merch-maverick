import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Real-life product photos from Unsplash (dark/editorial style)
// Replace src URLs with actual product photos when available
const products = [
  {
    name: "Polo Shirts",
    vertical: "Hospitality",
    verticalColor: "#8B5CF6",
    moq: "MOQ 100",
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  },
  {
    name: "Hoodies",
    vertical: "Fitness",
    verticalColor: "#C026D3",
    moq: "MOQ 50",
    img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
  },
  {
    name: "Gym Wear",
    vertical: "Fitness",
    verticalColor: "#C026D3",
    moq: "MOQ 100",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
  {
    name: "Workwear",
    vertical: "Industrial",
    verticalColor: "#F59E0B",
    moq: "MOQ 50",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
  {
    name: "Custom Caps",
    vertical: "Events",
    verticalColor: "#10B981",
    moq: "MOQ 50",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
  },
  {
    name: "Tote Bags",
    vertical: "Corporate",
    verticalColor: "#3B82F6",
    moq: "MOQ 100",
    img: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=600&q=80",
  },
  {
    name: "Branded Mugs",
    vertical: "Corporate",
    verticalColor: "#3B82F6",
    moq: "MOQ 50",
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
  },
  {
    name: "Custom Lanyards",
    vertical: "Events",
    verticalColor: "#10B981",
    moq: "MOQ 100",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  },
];

export function ProductShowcase() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Product Catalog
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
              What We{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8B5CF6 0%, #C026D3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Make
              </span>
            </h2>
          </div>
          <Link
            href="/quote"
            className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors whitespace-nowrap"
          >
            Get a quote for any product <ArrowRight size={16} />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <Link href="/quote" key={i} className="group block">
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "brightness(0.85)" }}
                  />
                  {/* Overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: "rgba(139,92,246,0.25)" }}
                  >
                    <span className="text-white text-sm font-semibold flex items-center gap-2">
                      Get Quote <ArrowRight size={16} />
                    </span>
                  </div>
                  {/* MOQ badge */}
                  <div
                    className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {product.moq}
                  </div>
                </div>

                {/* Card info */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-1">{product.name}</h3>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: `${product.verticalColor}18`,
                      color: product.verticalColor,
                      border: `1px solid ${product.verticalColor}30`,
                    }}
                  >
                    {product.vertical}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/30 text-sm mb-4">
            Don't see your product? We manufacture almost anything.
          </p>
          <Link href="/quote">
            <button className="btn-accent px-8 py-3 rounded-xl font-semibold text-sm">
              Request a Custom Product Quote
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
