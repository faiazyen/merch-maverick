"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Utensils, Building2, Dumbbell, HardHat, PartyPopper, Music2 } from "lucide-react";
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
  overview: string;
  products: Product[];
  testimonial: Testimonial;
  faqs: FAQ[];
  ctaText: string;
  relatedVerticals: { label: string; href: string }[];
}

export function SolutionPageLayout({ data }: { data: SolutionPageData }) {
  const Icon = iconMap[data.icon] || Utensils;

  return (
    <div className="bg-bg-primary-light dark:bg-bg-primary-dark">
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                <Icon size={24} className="text-teal" />
              </div>
              <span className="text-sm font-medium text-teal uppercase tracking-widest">
                {data.subtitle}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-light dark:text-text-dark mb-6">
              {data.heroHeadline}
            </h1>
            <p className="text-lg text-muted-light dark:text-muted-dark mb-8 max-w-2xl">
              {data.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote">
                <button className="bg-teal hover:bg-teal-dark text-white flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]">
                  Get Quote for {data.title}
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/pricing">
                <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-teal hover:text-teal transition-all">
                  View Pricing
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Overview */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              Industry Overview
            </h2>
            <p className="text-muted-light dark:text-muted-dark leading-relaxed">
              {data.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Products & Services */}
      <section className="py-20 lg:py-24 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark mb-10">
            Products & Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-6"
              >
                <h3 className="font-semibold text-lg text-text-light dark:text-text-dark mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-light dark:text-muted-dark mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-light dark:text-muted-dark">
                    MOQ: <span className="text-text-light dark:text-text-dark font-medium">{product.moq}</span>
                  </span>
                  <span className="text-teal font-semibold">{product.priceRange}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Case Study */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-8 lg:p-12">
            <p className="text-teal text-sm font-medium uppercase tracking-widest mb-4">
              Case Study
            </p>
            <p className="text-lg lg:text-xl text-text-light dark:text-text-dark leading-relaxed mb-6">
              &ldquo;{data.testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold text-text-light dark:text-text-dark">
                  {data.testimonial.name}
                </p>
                <p className="text-sm text-muted-light dark:text-muted-dark">
                  {data.testimonial.role}, {data.testimonial.company}
                </p>
              </div>
              <span className="text-sm font-medium text-teal bg-teal/10 px-3 py-1 rounded-full">
                {data.testimonial.results}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-text-light dark:text-text-dark font-medium">
                  {faq.question}
                  <ChevronDown size={18} className="text-muted-light dark:text-muted-dark group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mb-4">
            {data.ctaText}
          </h2>
          <p className="text-muted-light dark:text-muted-dark mb-8">
            Get a detailed quote with pricing, timelines, and mockups within 2 hours.
          </p>
          <Link href="/quote">
            <button className="bg-teal hover:bg-teal-dark text-white inline-flex items-center gap-2 px-10 py-5 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] shadow-lg shadow-teal/20">
              Get Quote for {data.title}
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      {/* Related Verticals */}
      <section className="py-12 border-t border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-muted-light dark:text-muted-dark mb-4">
            Other Solutions
          </p>
          <div className="flex flex-wrap gap-3">
            {data.relatedVerticals.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="px-4 py-2 rounded-lg border border-border-light dark:border-border-dark text-sm text-text-light dark:text-text-dark hover:border-teal hover:text-teal transition-all"
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
