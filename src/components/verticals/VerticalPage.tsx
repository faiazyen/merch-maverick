import Link from "next/link";
import { ArrowRight, CheckCircle2, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Product {
  name: string;
  moq: string;
  price: string;
}

interface VerticalPageProps {
  icon: LucideIcon;
  name: string;
  tagline: string;
  description: string;
  heroColor: string;
  heroBg: string;
  products: Product[];
  painPoints: string[];
  whyUs: string[];
  aovRange: string;
  orderFrequency: string;
}

export function VerticalPage({
  icon: Icon,
  name,
  tagline,
  description,
  heroColor,
  heroBg,
  products,
  painPoints,
  whyUs,
  aovRange,
  orderFrequency,
}: VerticalPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className={`${heroBg} pt-28 pb-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white mb-4"
                style={{ boxShadow: `0 0 0 1px ${heroColor}33 inset` }}
              >
                <Icon size={12} />
                {name} Solutions
              </div>
              <div
                className="mb-4 h-1.5 w-20 rounded-full"
                style={{ backgroundColor: heroColor }}
              />
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">{tagline}</h1>
              <p className="text-white/80 text-lg mb-8 max-w-xl">{description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/quote">
                  <Button variant="accent" size="lg">
                    Get Instant Quote <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    className="bg-white/10 text-white border border-white/30 hover:bg-white/20"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Average Order Value", value: aovRange },
                { label: "Order Frequency", value: orderFrequency },
                { label: "Lead Time", value: "3–5 weeks" },
                { label: "Min. Order", value: "25–100 units" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 border border-white/20 rounded-xl p-5">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/60 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Products */}
            <div>
              <h2 className="text-2xl font-bold text-[#0c1a2e] mb-6">Products for {name}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.name}
                    className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-[#2351a4] transition-colors"
                  >
                    <h3 className="font-semibold text-[#0c1a2e] mb-1">{p.name}</h3>
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>MOQ: {p.moq}</span>
                      <span className="font-medium text-[#1e3a6e]">{p.price}/unit</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pain points */}
            <div>
              <h2 className="text-2xl font-bold text-[#0c1a2e] mb-4">
                Common pain points we solve for {name}
              </h2>
              <div className="space-y-3">
                {painPoints.map((p) => (
                  <div key={p} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                    <span className="text-red-400 text-lg leading-none mt-0.5">✕</span>
                    <p className="text-sm text-neutral-600">{p}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why us */}
            <div>
              <h2 className="text-2xl font-bold text-[#0c1a2e] mb-4">
                How Merch Maverick solves them
              </h2>
              <div className="space-y-3">
                {whyUs.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#2351a4] shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="p-6 bg-[#0c1a2e] rounded-2xl text-white">
                <h3 className="font-bold text-lg mb-2">Ready to order?</h3>
                <p className="text-neutral-400 text-sm mb-4">
                  Get an instant quote in 2 minutes. No sales call required.
                </p>
                <Link href="/quote" className="block">
                  <Button variant="accent" size="lg" className="w-full">
                    Get Instant Quote <ArrowRight size={16} />
                  </Button>
                </Link>
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs text-neutral-400">
                  <p>✓ Response within 2 hours</p>
                  <p>✓ Free product samples available</p>
                  <p>✓ 50% deposit, 50% on shipment</p>
                  <p>✓ No minimum annual spend</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-neutral-100 shadow-sm">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Not sure yet?
                </p>
                <Link
                  href="/about"
                  className="flex items-center gap-2 text-sm text-[#2351a4] font-medium hover:gap-3 transition-all"
                >
                  See how we work <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
