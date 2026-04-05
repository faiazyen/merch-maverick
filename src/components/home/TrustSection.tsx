"use client";

import { motion } from "framer-motion";
import { Factory, Palette, ShieldCheck, Zap, Leaf } from "lucide-react";

const advantages = [
  {
    icon: Factory,
    title: "Factory-Direct Access",
    description:
      "Direct access to vetted factories in Bangladesh and China. Zero intermediary markups. We control quality at every step of production.",
    highlight: "0 middlemen",
  },
  {
    icon: Palette,
    title: "Design Support + Logistics",
    description:
      "Professional design assistance from concept to production. Integrated logistics partnerships for seamless delivery across Europe.",
    highlight: "End-to-end service",
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed Quality",
    description:
      "100% quality control coverage on every order. Every garment is inspected before shipping. No exceptions, no compromises.",
    highlight: "100% QC coverage",
  },
  {
    icon: Zap,
    title: "Fastest in Europe",
    description:
      "Rush orders in 7–10 days. Standard production in 4–8 weeks. We move faster than any distributor because we own the relationship with the factory.",
    highlight: "7–10 day rush",
  },
  {
    icon: Leaf,
    title: "Ethical & Sustainable",
    description:
      "OEKO-TEX certified materials. Fair labor practices audited in person. We believe great merchandise doesn't require cutting ethical corners.",
    highlight: "OEKO-TEX certified",
  },
];

export function TrustSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-secondary-light dark:bg-bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-teal text-sm font-medium uppercase tracking-widest mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            The Advantages No Competitor Can Match Simultaneously
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark max-w-2xl mx-auto">
            Five core advantages that make Merch Maverick the clear choice for
            European businesses seeking premium custom merchandise.
          </p>
        </div>

        {/* Advantage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, i) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`group rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-teal" />
                  </div>
                  <span className="text-xs font-semibold text-teal bg-teal/10 px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {advantage.highlight}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-text-light dark:text-text-dark mb-2">
                  {advantage.title}
                </h3>
                <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
