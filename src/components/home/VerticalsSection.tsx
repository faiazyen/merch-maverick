import Link from "next/link";
import { ArrowRight, Utensils, Dumbbell, Building2, HardHat, Music2 } from "lucide-react";

const verticals = [
  {
    icon: Utensils,
    title: "Hospitality",
    subtitle: "Hotels & Restaurants",
    href: "/hospitality",
    products: ["Staff Uniforms", "Chef Coats & Aprons", "Hotel Towels & Linens", "Bathrobes"],
    aov: "€3K–€15K per order",
    color: "from-amber-500/10 to-amber-600/5",
    border: "border-amber-200",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-50 text-amber-700",
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    subtitle: "Gyms & Activewear",
    href: "/fitness",
    products: ["Branded Gym Wear", "Staff Uniforms", "Gym Towels", "Retail Merch"],
    aov: "€1K–€8K per order",
    color: "from-green-500/10 to-green-600/5",
    border: "border-green-200",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    badgeBg: "bg-green-50 text-green-700",
  },
  {
    icon: Building2,
    title: "Corporate",
    subtitle: "Tech & Office Brands",
    href: "/corporate",
    products: ["Branded Hoodies", "Polo Shirts", "Onboarding Kits", "Tote Bags"],
    aov: "€2K–€20K per order",
    color: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-200",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-50 text-blue-700",
  },
  {
    icon: HardHat,
    title: "Industrial",
    subtitle: "Factories & Workwear",
    href: "/industrial",
    products: ["Work Uniforms", "Safety Vests", "Coveralls", "Branded PPE"],
    aov: "€5K–€30K per order",
    color: "from-orange-500/10 to-orange-600/5",
    border: "border-orange-200",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    badgeBg: "bg-orange-50 text-orange-700",
  },
  {
    icon: Music2,
    title: "Events",
    subtitle: "Festivals & Tours",
    href: "/events",
    products: ["Festival Merch", "Artist Merchandise", "VIP Packages", "Promo Items"],
    aov: "€2K–€25K per order",
    color: "from-purple-500/10 to-purple-600/5",
    border: "border-purple-200",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    badgeBg: "bg-purple-50 text-purple-700",
  },
];

export function VerticalsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#2351a4] font-semibold text-sm tracking-wider uppercase">
            Industry Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c1a2e] mt-3 mb-4">
            Built for your industry,
            <br />
            <span className="text-[#2351a4]">not a generic catalog</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Unlike competitors who sell the same products to everyone, we specialize in the exact
            needs of your vertical — with pricing, MOQs, and products designed for your business.
          </p>
        </div>

        {/* Verticals grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {verticals.slice(0, 3).map((v) => (
            <VerticalCard key={v.title} {...v} />
          ))}
          <div className="md:col-span-2 lg:col-span-1">
            <VerticalCard {...verticals[3]} />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <VerticalCard {...verticals[4]} featured />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-500 text-sm mb-4">
            Not sure which vertical fits your needs?
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 text-[#2351a4] font-semibold hover:gap-3 transition-all"
          >
            Get a custom quote for your business <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function VerticalCard({
  icon: Icon,
  title,
  subtitle,
  href,
  products,
  aov,
  color,
  border,
  iconBg,
  iconColor,
  badgeBg,
  featured = false,
}: (typeof verticals)[number] & { featured?: boolean }) {
  return (
    <Link href={href} className="group block h-full">
      <div
        className={`h-full p-6 rounded-2xl border bg-gradient-to-br ${color} ${border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
            <Icon size={20} className={iconColor} />
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeBg}`}>{aov}</span>
        </div>

        <h3 className="text-xl font-bold text-[#0c1a2e] mb-1 group-hover:text-[#2351a4] transition-colors">
          {title}
        </h3>
        <p className="text-neutral-500 text-sm mb-4">{subtitle}</p>

        <ul className={`space-y-1.5 ${featured ? "grid grid-cols-2 space-y-0 gap-1.5" : ""}`}>
          {products.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-neutral-600">
              <span className="w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-1.5 text-[#2351a4] text-sm font-semibold group-hover:gap-2.5 transition-all">
          View solutions <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
