// Brands We've Worked With
// Logos to be replaced by founder when real client logos are available

const placeholderBrands = [
  { name: "Hotel Group A", category: "Hospitality" },
  { name: "FitLife Studios", category: "Fitness" },
  { name: "TechCorp EU", category: "Corporate" },
  { name: "BuildForce", category: "Industrial" },
  { name: "Neon Festival", category: "Events" },
  { name: "Grand Resorts", category: "Hospitality" },
  { name: "Iron Gym", category: "Fitness" },
  { name: "Alpine Events", category: "Events" },
];

function PlaceholderLogo({ name, category }: { name: string; category: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center px-8 py-5 rounded-xl transition-all duration-300 cursor-default group"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.05)",
        minWidth: "160px",
      }}
    >
      <div
        className="w-10 h-10 rounded-lg mb-2 flex items-center justify-center text-xs font-bold text-white/60 group-hover:text-purple-400 transition-colors"
        style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
      <span className="text-white/30 text-xs font-medium whitespace-nowrap group-hover:text-white/60 transition-colors">
        {name}
      </span>
      <span className="text-white/15 text-[10px] mt-0.5">{category}</span>
    </div>
  );
}

export function BrandsSection() {
  // Duplicate for seamless scroll loop
  const doubled = [...placeholderBrands, ...placeholderBrands];

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Top divider */}
      <div className="divider-accent mb-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p
          className="text-center text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Trusted by brands across Europe
        </p>
        <p
          className="text-center text-xs"
          style={{ color: "rgba(255,255,255,0.12)" }}
        >
          {/* Remove this note when real logos are added */}
          Placeholder logos — replace with real client logos when available
        </p>
      </div>

      {/* Scrolling logo strip */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #000000, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #000000, transparent)" }}
        />

        <div className="flex animate-scroll-logos gap-4 w-max px-4">
          {doubled.map((brand, i) => (
            <PlaceholderLogo key={i} name={brand.name} category={brand.category} />
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="divider-accent mt-12" />
    </section>
  );
}
