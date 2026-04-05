"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { Scissors, Settings, CheckCircle, Package } from "lucide-react";

const factoryStages = [
  {
    title: "Cutting Room",
    description: "Precision fabric cutting using industrial patterns and templates",
    icon: Scissors,
  },
  {
    title: "Sewing & Assembly",
    description: "Skilled workers and industrial machines for garment assembly",
    icon: Settings,
  },
  {
    title: "Quality Control",
    description: "100% inspection coverage on every garment before packaging",
    icon: CheckCircle,
  },
  {
    title: "Packaging & Shipping",
    description: "Professional packaging and international logistics coordination",
    icon: Package,
  },
];

export function FactoriesSection() {
  const ref = useScrollAnimation();

  return (
    <section className="py-24 lg:py-32 bg-bg-secondary-light dark:bg-bg-secondary-dark">
      <div ref={ref} className="scroll-animate max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-teal text-sm font-medium uppercase tracking-widest mb-3">
            Production Transparency
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            Where Your Products Are Made
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark max-w-2xl mx-auto">
            We don&apos;t work with anonymous factories. Every partner has been
            visited in person, audited for quality and ethics.
          </p>
        </div>

        {/* Factory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {factoryStages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-border-light dark:border-border-dark bg-white dark:bg-card-dark hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-bg-secondary-light dark:bg-bg-secondary-dark flex items-center justify-center">
                  <div className="text-center">
                    <Icon size={32} className="mx-auto text-teal mb-2" />
                    <p className="text-xs text-muted-light dark:text-muted-dark">
                      Factory Photo
                    </p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-text-light dark:text-text-dark mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Factory Locations */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full border border-border-light dark:border-border-dark bg-white dark:bg-card-dark">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal" />
              <span className="text-sm text-muted-light dark:text-muted-dark">
                Bangladesh <span className="text-text-light dark:text-text-dark font-medium">(Apparel)</span>
              </span>
            </div>
            <div className="w-px h-4 bg-border-light dark:bg-border-dark" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-blue" />
              <span className="text-sm text-muted-light dark:text-muted-dark">
                China <span className="text-text-light dark:text-text-dark font-medium">(Accessories)</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
