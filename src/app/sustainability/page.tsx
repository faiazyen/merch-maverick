import { Metadata } from "next";
import Link from "next/link";
import { Leaf, Shield, Users, Globe, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability — Merch Maverick",
  description:
    "Our commitment to ethical sourcing, OEKO-TEX certified materials, cotton-first product options, and transparent production standards.",
};

const pillars = [
  {
    icon: Leaf,
    title: "Sustainable Materials",
    desc: "We offer OEKO-TEX certified fabrics across our core product range with cotton-first, organic, linen, silk, and lower-synthetic options where the product category allows.",
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
    <div className="bg-bg-primary-light dark:bg-bg-primary-dark">
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-teal font-medium text-sm tracking-widest uppercase">
              Sustainability
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-light dark:text-text-dark mt-3 mb-4 tracking-tight">
              Better material choices.
              <br />
              <span className="text-teal">Verified, not just claimed.</span>
            </h1>
            <p className="text-muted-light dark:text-muted-dark text-lg leading-relaxed">
              For brands that care what touches the skin, material quality is
              not a side note. We document certifications, sourcing standards,
              and production practices so your sustainability story has proof
              behind it.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Why this matters */}
        <div className="mb-20 p-8 rounded-2xl border border-teal/30 bg-teal/5 dark:bg-teal/10">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
            Why sustainability matters for B2B procurement
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { stat: "60%+", desc: "of European businesses require sustainability certifications for textile procurement" },
              { stat: "€4B+", desc: "EU workwear market increasingly subject to ESG procurement requirements" },
              { stat: "30–50%", desc: "lower carbon footprint vs. multi-distributor supply chains for equivalent product" },
            ].map((item) => (
              <div key={item.stat}>
                <p className="text-3xl font-bold text-teal mb-1">{item.stat}</p>
                <p className="text-sm text-muted-light dark:text-muted-dark">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 pillars */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                  <pillar.icon size={20} className="text-teal" />
                </div>
                <div>
                  <h3 className="font-bold text-text-light dark:text-text-dark">{pillar.title}</h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark mt-1">{pillar.desc}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-light dark:text-muted-dark">
                    <CheckCircle2 size={14} className="text-teal shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* EU Compliance */}
        <div className="mb-20 p-8 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
            EU Compliance & Data Protection
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "GDPR Compliant", desc: "All client data handled in accordance with EU GDPR regulations. Data stored in EU infrastructure." },
              { title: "EU Product Safety", desc: "All textile products comply with EU REACH regulations and product safety directives." },
              { title: "VAT & Trade Compliance", desc: "Fully compliant with EU import VAT regulations. All orders include compliant commercial invoices." },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark"
              >
                <h3 className="font-semibold text-text-light dark:text-text-dark text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-light dark:text-muted-dark leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16 rounded-2xl bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-3">
            Need sustainability documentation?
          </h2>
          <p className="text-muted-light dark:text-muted-dark text-sm mb-6">
            We provide full supply chain documentation, certifications, and audit reports for procurement teams on request.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-xl bg-teal px-8 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-teal-dark"
            >
              Get a Quote <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-border-light px-8 py-4 font-semibold text-text-light transition-all hover:border-teal hover:text-teal dark:border-border-dark dark:text-text-dark"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
