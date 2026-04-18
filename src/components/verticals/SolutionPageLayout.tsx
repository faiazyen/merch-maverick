"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Dumbbell,
  HardHat,
  Music2,
  PartyPopper,
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  utensils: Utensils,
  building2: Building2,
  dumbbell: Dumbbell,
  hardhat: HardHat,
  partypopper: PartyPopper,
  music2: Music2,
};

interface Product {
  name: string;
  description: string;
  moq: string;
  priceRange: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  results: string;
}

export interface SolutionPageData {
  slug: string;
  icon: string;
  title: string;
  subtitle: string;
  heroHeadline: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  overview: string;
  productShowcaseImage: string;
  productShowcaseAlt: string;
  productShowcasePosition?: string;
  productShowcaseAspect?: "landscape" | "square";
  products: Product[];
  processImage: string;
  processImageAlt: string;
  supportImage: string;
  supportImageAlt: string;
  testimonial: Testimonial;
  faqs: FAQ[];
  ctaText: string;
  relatedVerticals: { label: string; href: string }[];
}

export function SolutionPageLayout({ data }: { data: SolutionPageData }) {
  const Icon = iconMap[data.icon] || Utensils;

  return (
    <div className="bg-bg-primary-light dark:bg-bg-primary-dark">
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0">
          <Image
            src={data.heroImage}
            alt={data.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,20,18,0.92)_0%,rgba(15,20,18,0.78)_42%,rgba(15,20,18,0.58)_100%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                  <Icon size={24} className="text-teal" />
                </div>
                <span className="text-sm font-medium uppercase tracking-widest text-teal">
                  {data.subtitle}
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {data.heroHeadline}
              </h1>
              <p className="mb-8 max-w-2xl text-lg text-white/78">
                {data.heroDescription}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/quote"
                  className="flex items-center gap-2 rounded-xl bg-teal px-8 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-teal-dark"
                >
                  Get Quote for {data.title}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center gap-2 rounded-xl border border-white/25 px-8 py-4 font-semibold text-white transition-all hover:border-teal hover:text-teal"
                >
                  See Pricing & Savings
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Average Order Value", value: "Mid to high margin" },
                { label: "Order Frequency", value: "Repeat-ready programs" },
                { label: "Lead Time", value: "3–5 weeks" },
                { label: "Min. Order", value: "25–100 units" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/14 bg-white/8 p-5 backdrop-blur"
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-3xl">
              <h2 className="mb-4 text-2xl font-bold text-text-light dark:text-text-dark sm:text-3xl">
                Why This Solution Works
              </h2>
              <p className="leading-relaxed text-muted-light dark:text-muted-dark">
                {data.overview}
              </p>
            </div>

            <div className="w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(17,17,17,0.08)] lg:max-w-[560px] lg:justify-self-end dark:bg-card-dark">
              <div
                className={
                  data.productShowcaseAspect === "square"
                    ? "relative aspect-square"
                    : "relative aspect-[5/4] sm:aspect-[4/3]"
                }
              >
                <Image
                  src={data.productShowcaseImage}
                  alt={data.productShowcaseAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: data.productShowcasePosition ?? "center center" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-secondary-light py-20 dark:bg-bg-secondary-dark lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-2xl font-bold text-text-light dark:text-text-dark sm:text-3xl">
            What We Can Produce
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-2xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-card-dark"
              >
                <h3 className="mb-2 text-lg font-semibold text-text-light dark:text-text-dark">
                  {product.name}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-light dark:text-muted-dark">
                  {product.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-light dark:text-muted-dark">
                    MOQ:{" "}
                    <span className="font-medium text-text-light dark:text-text-dark">
                      {product.moq}
                    </span>
                  </span>
                  <span className="font-semibold text-teal">
                    {product.priceRange}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                title: "Production process",
                description:
                  "Sampling, trims, print execution, and quality control stay closer to the factory floor so the final output feels considered, not generic.",
                image: data.processImage,
                alt: data.processImageAlt,
              },
              {
                title: "Supporting production systems",
                description:
                  "From packaging and logistics to finishing and specialist equipment, the surrounding systems are what keep repeat orders reliable.",
                image: data.supportImage,
                alt: data.supportImageAlt,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[2rem] border border-border-light bg-white shadow-[0_20px_50px_rgba(17,17,17,0.06)] dark:border-border-dark dark:bg-card-dark"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-light dark:text-muted-dark">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border-light bg-white p-8 dark:border-border-dark dark:bg-card-dark lg:p-12">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
              Success Story
            </p>
            <p className="mb-6 text-lg leading-relaxed text-text-light dark:text-text-dark lg:text-xl">
              &ldquo;{data.testimonial.quote}&rdquo;
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-text-light dark:text-text-dark">
                  {data.testimonial.name}
                </p>
                <p className="text-sm text-muted-light dark:text-muted-dark">
                  {data.testimonial.role}, {data.testimonial.company}
                </p>
              </div>
              <span className="rounded-full bg-teal/10 px-3 py-1 text-sm font-medium text-teal">
                {data.testimonial.results}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-secondary-light py-20 dark:bg-bg-secondary-dark lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-2xl font-bold text-text-light dark:text-text-dark sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border-light bg-white dark:border-border-dark dark:bg-card-dark"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-text-light dark:text-text-dark">
                  {faq.question}
                  <ChevronDown
                    size={18}
                    className="text-muted-light transition-transform group-open:rotate-180 dark:text-muted-dark"
                  />
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed text-muted-light dark:text-muted-dark">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-text-light dark:text-text-dark sm:text-4xl">
            {data.ctaText}
          </h2>
          <p className="mb-8 text-muted-light dark:text-muted-dark">
            Get a quote with pricing guidance, timelines, and a clear approval
            path for your next launch.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-xl bg-teal px-10 py-5 text-lg font-semibold text-white shadow-lg shadow-teal/20 transition-all hover:scale-[1.02] hover:bg-teal-dark"
          >
            Get Quote for {data.title}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="border-t border-border-light bg-bg-secondary-light py-12 dark:border-border-dark dark:bg-bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-medium text-muted-light dark:text-muted-dark">
            Other Solutions
          </p>
          <div className="flex flex-wrap gap-3">
            {data.relatedVerticals.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="rounded-lg border border-border-light px-4 py-2 text-sm text-text-light transition-all hover:border-teal hover:text-teal dark:border-border-dark dark:text-text-dark"
              >
                {v.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
