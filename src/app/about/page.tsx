import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, Globe, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Merch Maverick",
  description:
    "Learn about Merch Maverick — a factory-owned custom merchandise company built on 35+ years of garment expertise, premium material standards, and direct production control.",
};

const brandNames = [
  "H&M",
  "Zara",
  "Adidas",
  "Nike",
  "The North Face",
  "Vans",
  "Levi's",
  "Gap",
  "Tommy Hilfiger",
  "Hugo Boss",
  "Mango",
  "Umbro",
  "Reebok",
  "Supreme",
  "Crocs",
  "Columbia",
  "Timberland",
  "Bershka",
  "American Eagle",
  "Alo",
  "Icon Amsterdam",
];

const values = [
  {
    icon: Factory,
    title: "Factory-First Transparency",
    desc: "We show you our factories, our process, and our QC checkpoints because trust is built through visibility, not vague promises.",
  },
  {
    icon: Users,
    title: "B2B Partnership Model",
    desc: "We do not treat you like a transaction. We build long-term relationships with recurring clients who need consistency, speed, and pricing control.",
  },
  {
    icon: Zap,
    title: "AI-Powered Efficiency",
    desc: "We use AI to quote faster, track smarter, and reduce friction so our team can move like a much larger operation without adding clutter.",
  },
  {
    icon: Globe,
    title: "Responsible Sourcing",
    desc: "Our factories uphold international standards with cotton-first, OEKO-TEX certified, and skin-conscious material options for brands that care what touches the skin.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-bg-primary-light dark:bg-bg-primary-dark">
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="text-sm font-medium tracking-widest uppercase text-teal">
                About Merch Maverick
              </span>
              <h1 className="mt-3 mb-4 text-4xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-5xl">
                Built in the production room.
                <br />
                <span className="text-teal">Not invented in a sales deck.</span>
              </h1>
              <p className="text-lg leading-relaxed text-muted-light dark:text-muted-dark">
                Merch Maverick is built on a family manufacturing legacy,
                factory ownership, and a belief that branded product should
                feel as good in real life as it looks in a presentation.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-border-light bg-white shadow-[0_28px_70px_rgba(17,17,17,0.08)] dark:border-border-dark dark:bg-card-dark">
              <div className="relative aspect-square">
                <Image
                  src="/images/about/founder-1.jpg"
                  alt="Founder portrait of Merch Maverick"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start mb-24">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-text-light dark:text-text-dark">
              Our story
            </h2>
            <div className="space-y-4 leading-relaxed text-muted-light dark:text-muted-dark">
              <p>
                You could say I learned clothing with my mother&apos;s milk. My
                mum is a textile engineer, and I grew up watching her design,
                cut, sew, and solve real garment problems from childhood. Long
                before Merch Maverick existed, the production DNA was already
                there.
              </p>
              <p>
                She was my biggest inspiration. From her I learned that great
                clothing is not judged by mockups alone. It is judged by
                material choice, fit, stitching, finishing, and whether the
                final product still feels right after real use.
              </p>
              <p>
                Today that instinct is backed by 12+ owned factories, trained
                European design support, and production experience connected to
                major international brands. That is the foundation we are now
                scaling into a multi-vertical merchandise company serving
                hotels, corporate brands, gyms, industrial teams, event
                organizers, and creators across Europe and America.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[1.75rem] border border-border-light bg-white dark:border-border-dark dark:bg-card-dark">
                <div className="relative aspect-square">
                  <Image
                    src="/images/about/founder-2.jpg"
                    alt="Second founder portrait for Merch Maverick"
                    fill
                    sizes="(max-width: 640px) 100vw, 24vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="overflow-hidden rounded-[1.75rem] border border-border-light bg-white dark:border-border-dark dark:bg-card-dark">
                <div className="relative aspect-square">
                  <Image
                    src="/images/about/factory.jpg"
                    alt="Textile factory environment behind Merch Maverick production"
                    fill
                    sizes="(max-width: 640px) 100vw, 24vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal">
              Brand heritage
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-text-light dark:text-text-dark">
              Production experience connected to major names in fashion, sportswear, and retail.
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-light dark:text-muted-dark">
              These names are part of the production environment our family has
              worked around over the years. That experience shapes how we think
              about fit, materials, finish quality, and what makes a product
              feel premium instead of generic.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {brandNames.map((brand) => (
                <div
                  key={brand}
                  className="rounded-2xl border border-border-light/70 bg-bg-secondary-light px-4 py-3 text-center text-sm font-semibold text-text-light dark:border-border-dark dark:bg-bg-secondary-dark dark:text-text-dark"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-24 overflow-hidden rounded-[2rem] border border-border-light bg-white shadow-[0_24px_60px_rgba(17,17,17,0.06)] dark:border-border-dark dark:bg-card-dark">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative min-h-[18rem] lg:min-h-full">
              <Image
                src="/images/about/logistics.jpg"
                alt="Shipping container and logistics operations for Merch Maverick"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
            </div>
            <div className="p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal">
                Global reach
              </p>
              <h2 className="mt-3 text-3xl font-bold text-text-light dark:text-text-dark">
                Production credibility only matters if delivery stays reliable.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-light dark:text-muted-dark">
                Alongside product quality, we care about the systems around the
                garment: packing, logistics, timing, and reorders. That is what
                turns a one-off project into a dependable merchandise program.
              </p>
            </div>
          </div>
        </div>

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

        <div className="text-center py-16 rounded-2xl bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-3">
            Ready to start?
          </h2>
          <p className="text-muted-light dark:text-muted-dark text-sm mb-6">
            Start with a brief, a moodboard, or a working concept. We will turn
            it into pricing, mockups, and a real production path.
          </p>
          <Link href="/quote">
            <button className="bg-teal hover:bg-teal-dark text-white inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]">
              Get Instant Quote
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
