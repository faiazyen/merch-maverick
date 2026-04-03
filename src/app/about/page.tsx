import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Factory, Users, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About — Merch Maverick",
  description:
    "Learn about Merch Maverick — a Europe-based B2B custom merchandise company with family-owned factories in Bangladesh, AI-powered operations, and €20K+ already delivered.",
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
    detail: "Full-time focus. AI-powered platform, 5 industry verticals, Europe-wide B2B operations.",
  },
  {
    year: "2027",
    event: "€500K+ target",
    detail: "80–120 active clients across Europe. 3–5 team members. EU micro-warehouse operational.",
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
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <div className="bg-[#0c1a2e] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[#3b6fd4] font-semibold text-sm tracking-wider uppercase">
              About Merch Maverick
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
              We cut out the middlemen.
              <br />
              <span className="text-[#3b6fd4]">You keep the savings.</span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Merch Maverick is a Europe-based B2B custom merchandise company built on a single insight:
              the traditional supply chain for branded apparel charges 2–3x what it should. We built
              direct factory relationships in Bangladesh and a technology layer that makes ordering
              effortless — and passed the savings to our clients.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-[#0c1a2e] mb-4">
              Built on a proven foundation
            </h2>
            <div className="space-y-4 text-neutral-500 leading-relaxed">
              <p>
                Before Merch Maverick existed as a company, its founder had already delivered
                €20,000–€30,000 in custom merchandise for European clients — while working a full-time
                job. The flagship client, Melvin & Gatica Bachata, trusted us with their festival
                merchandise across Europe. That validation proved the model works.
              </p>
              <p>
                The competitive advantages are structural, not accidental. Our family-owned factories
                in Bangladesh give us production control, quality visibility, and pricing that no
                European distributor can match. Our AI-first technology layer means a 2-person team
                delivers what used to require 10–15 people.
              </p>
              <p>
                We&apos;re now scaling this into a multi-vertical B2B enterprise serving hotels,
                gyms, corporate brands, industrial companies, and event organizers across Europe.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-14 shrink-0 text-right">
                  <span className="text-xs font-bold text-[#2351a4]">{item.year}</span>
                </div>
                <div className="w-px bg-neutral-200 shrink-0 mx-2" />
                <div className="pb-4">
                  <p className="font-semibold text-[#0c1a2e] text-sm">{item.event}</p>
                  <p className="text-xs text-neutral-500 mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#0c1a2e] mb-8 text-center">What we stand for</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 bg-[#f8faff] rounded-2xl border border-neutral-100">
                <div className="w-11 h-11 rounded-xl bg-[#f0f6ff] flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-[#2351a4]" />
                </div>
                <h3 className="font-bold text-[#0c1a2e] mb-2 text-sm">{v.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works anchor section */}
        <div id="how-it-works" className="mb-20 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#0c1a2e] mb-3">How we work</h2>
          <p className="text-neutral-500 mb-8">
            From first contact to repeat orders, here&apos;s exactly what the process looks like.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "1",
                title: "Instant Quote",
                desc: "Use our AI quote tool. Get an estimate in 2 minutes, confirmed quote in under 2 hours.",
              },
              {
                step: "2",
                title: "Mockup & Approval",
                desc: "We generate product mockups with your branding. You approve before production starts.",
              },
              {
                step: "3",
                title: "Production & QC",
                desc: "Your order enters production with photo updates at each checkpoint via your client portal.",
              },
              {
                step: "4",
                title: "Delivered & Reorder",
                desc: "Shipped to Europe with tracking. One-click reorder from your portal when you're ready.",
              },
            ].map((item) => (
              <div key={item.step} className="p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#1e3a6e] text-white text-sm font-bold flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#0c1a2e] mb-1">{item.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 bg-[#0c1a2e] rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to start?</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Get your instant quote in 2 minutes. No commitment required.
          </p>
          <Link href="/quote">
            <Button variant="accent" size="lg">
              Get Instant Quote <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
