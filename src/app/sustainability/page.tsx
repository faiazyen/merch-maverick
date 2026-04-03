import { Metadata } from "next";
import Link from "next/link";
import { Leaf, Shield, Users, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sustainability — Merch Maverick",
  description:
    "Our commitment to ethical sourcing, OEKO-TEX certified materials, fair wages, and sustainable production in Bangladesh.",
};

const pillars = [
  {
    icon: Leaf,
    title: "Sustainable Materials",
    desc: "We offer OEKO-TEX certified fabrics across our core product range. Organic cotton, recycled polyester, and low-impact dyes available on request.",
    items: [
      "OEKO-TEX Standard 100 certified textiles",
      "GOTS certified organic cotton on request",
      "Recycled polyester activewear options",
      "Water-based, low-VOC printing inks",
    ],
  },
  {
    icon: Users,
    title: "Ethical Labor",
    desc: "Our family-owned factories in Bangladesh maintain international labor standards. Fair wages, safe working conditions, and no child labor — verified and audited.",
    items: [
      "Above-industry-average wages for all workers",
      "Safe working conditions (fire safety, ventilation, equipment)",
      "No child labor — strict zero-tolerance policy",
      "Workers with freedom of association rights",
    ],
  },
  {
    icon: Shield,
    title: "Supply Chain Transparency",
    desc: "Unlike distributors who source from anonymous factories, we know exactly where every product is made. You can ask us anything about our production.",
    items: [
      "Single family-owned factory — no sub-contracting",
      "Open to factory video tours on request",
      "QC photo documentation at every stage",
      "Direct relationships with fabric suppliers",
    ],
  },
  {
    icon: Globe,
    title: "Environmental Impact",
    desc: "Factory-direct shipping reduces our carbon footprint versus multi-hop distributor chains. We're working toward carbon-neutral shipping for EU orders.",
    items: [
      "Direct Bangladesh-to-EU shipping (vs. 3-hop distributor chain)",
      "EU micro-warehouse to minimize last-mile impact",
      "Minimal packaging with recycled materials",
      "Carbon offset program in development for 2026",
    ],
  },
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0a1a0d] via-[#0d2015] to-[#0c1a2e] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-green-400 font-semibold text-sm tracking-wider uppercase">
              Sustainability
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
              Ethical sourcing.
              <br />
              <span className="text-green-400">Verified, not just claimed.</span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Over 60% of European businesses now require sustainability certifications for textile
              procurement. We don&apos;t just meet that bar — we document it, because transparency is
              the only thing that makes a sustainability claim meaningful.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Why this matters */}
        <div className="mb-16 p-8 bg-green-50 rounded-2xl border border-green-200">
          <h2 className="text-2xl font-bold text-[#0c1a2e] mb-3">Why sustainability matters for B2B procurement</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { stat: "60%+", desc: "of European businesses require sustainability certifications for textile procurement" },
              { stat: "€4B+", desc: "EU workwear market increasingly subject to ESG procurement requirements" },
              { stat: "30–50%", desc: "lower carbon footprint vs. multi-distributor supply chains for equivalent product" },
            ].map((item) => (
              <div key={item.stat}>
                <p className="text-3xl font-bold text-green-700 mb-1">{item.stat}</p>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 pillars */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <pillar.icon size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0c1a2e]">{pillar.title}</h3>
                  <p className="text-sm text-neutral-500 mt-1">{pillar.desc}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* EU Compliance */}
        <div className="mb-16 p-6 bg-[#f0f6ff] rounded-2xl border border-[#dce9fc]">
          <h2 className="text-2xl font-bold text-[#0c1a2e] mb-4">EU Compliance & Data Protection</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "GDPR Compliant", desc: "All client data handled in accordance with EU GDPR regulations. Data stored in EU infrastructure." },
              { title: "EU Product Safety", desc: "All textile products comply with EU REACH regulations and product safety directives." },
              { title: "VAT & Trade Compliance", desc: "Fully compliant with EU import VAT regulations. All orders include compliant commercial invoices." },
            ].map((item) => (
              <div key={item.title} className="p-4 bg-white rounded-xl border border-[#dce9fc]">
                <h3 className="font-semibold text-[#0c1a2e] text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 bg-[#0c1a2e] rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-3">Need sustainability documentation?</h2>
          <p className="text-neutral-400 text-sm mb-6">
            We provide full supply chain documentation, certifications, and audit reports for procurement teams on request.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote">
              <Button variant="accent" size="lg">
                Get a Quote <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
