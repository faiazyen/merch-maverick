import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Factory, Users, Zap, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Merch Maverick",
  description:
    "Learn about Merch Maverick — a Europe-based B2B custom merchandise company with factory-direct access, AI-powered operations, and proven delivery.",
};

const timeline = [
  {
    year: "2024",
    event: "First B2B orders fulfilled",
    detail: "Bachata festival merchandise delivered for Melvin & Gatica Bachata across Europe.",
  },
  {
    year: "2025",
    event: "€20K–€30K in orders",
    detail: "Validated demand while working full-time. Proven supply chain and quality control.",
  },
  {
    year: "2026",
    event: "Merch Maverick launches",
    detail: "Full-time focus. AI-powered platform, 6 industry verticals, Europe-wide B2B operations.",
  },
  {
    year: "2027",
    event: "€500K+ target",
    detail: "80–120 active clients across Europe. Growing team. EU micro-warehouse operational.",
  },
];

const values = [
  {
    icon: Factory,
    title: "Factory-First Transparency",
    desc: "We show you our factories, our process, and our QC checkpoints — because trust is built through transparency, not promises.",
  },
  {
    icon: Users,
    title: "B2B Partnership Model",
    desc: "We don't treat you like a transaction. We build long-term relationships with recurring clients at locked pricing.",
  },
  {
    icon: Zap,
    title: "AI-Powered Efficiency",
    desc: "We use AI to quote faster, track smarter, and serve better — so our lean team delivers service at the level of a 15-person operation.",
  },
  {
    icon: Globe,
    title: "Responsible Sourcing",
    desc: "Our factories uphold international standards. We're committed to fair wages, safe conditions, and OEKO-TEX certified materials.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-bg-primary-light dark:bg-bg-primary-dark">
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-teal font-medium text-sm tracking-widest uppercase">
              About Merch Maverick
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-light dark:text-text-dark mt-3 mb-4 tracking-tight">
              We cut out the middlemen.
              <br />
              <span className="text-teal">You keep the savings.</span>
            </h1>
            <p className="text-muted-light dark:text-muted-dark text-lg leading-relaxed">
              Merch Maverick is a Europe-based B2B custom merchandise company built on a single insight:
              the traditional supply chain for branded apparel charges 2–3x what it should. We built
              direct factory relationships and a technology layer that makes ordering
              effortless — and passed the savings to our clients.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Story + Timeline */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
          <div>
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              Built on a proven foundation
            </h2>
            <div className="space-y-4 text-muted-light dark:text-muted-dark leading-relaxed">
              <p>
                Before Merch Maverick existed as a company, its founder had already delivered
                €20,000–€30,000 in custom merchandise for European clients — while working a full-time
                job. The flagship client, Melvin & Gatica Bachata, trusted us with their festival
                merchandise across Europe. That validation proved the model works.
              </p>
              <p>
                The competitive advantages are structural, not accidental. Our factory partnerships
                give us production control, quality visibility, and pricing that no
                European distributor can match. Our AI-first technology layer means a lean team
                delivers what used to require 10–15 people.
              </p>
              <p>
                We&apos;re now scaling this into a multi-vertical B2B enterprise serving hotels,
                gyms, corporate brands, industrial companies, event organizers, and creators across Europe.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-14 shrink-0 text-right">
                  <span className="text-xs font-bold text-teal">{item.year}</span>
                </div>
                <div className="w-px bg-border-light dark:bg-border-dark shrink-0 mx-2" />
                <div className="pb-4">
                  <p className="font-semibold text-text-light dark:text-text-dark text-sm">{item.event}</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8 text-center">
            What we stand for
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark"
              >
                <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-teal" />
                </div>
                <h3 className="font-semibold text-text-light dark:text-text-dark mb-2 text-sm">
                  {v.title}
                </h3>
                <p className="text-xs text-muted-light dark:text-muted-dark leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16 rounded-2xl bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-3">
            Ready to start?
          </h2>
          <p className="text-muted-light dark:text-muted-dark text-sm mb-6">
            Get your instant quote in 2 minutes. No commitment required.
          </p>
          <Link href="/quote">
            <button className="bg-teal hover:bg-teal-dark text-white inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]">
              Get Instant Quote <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
