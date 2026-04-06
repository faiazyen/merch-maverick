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
    <section className="py-24 lg:py-32 bg-bg-primary-light dark:bg-bg-primary-dark">
      <div ref={ref} className="scroll-animate max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            We&apos;ll take care of fulfillment
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark">
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
                className="group"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] rounded-xl bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark flex items-center justify-center mb-4 overflow-hidden transition-all duration-300 group-hover:shadow-md">
                  <div className="text-center">
                    <Icon size={28} className="mx-auto text-muted-light dark:text-muted-dark mb-2" />
                    <p className="text-xs text-muted-light dark:text-muted-dark">
                      Factory Photo
                    </p>
                  </div>
                </div>
                {/* Content */}
                <h3 className="font-semibold text-text-light dark:text-text-dark mb-1">
                  {stage.title}
                </h3>
                <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                  {stage.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Factory Locations */}
        <div className="mt-12 flex items-center gap-6">
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
    </section>
  );
}
