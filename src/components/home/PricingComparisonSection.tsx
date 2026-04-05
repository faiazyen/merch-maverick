"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const comparisons = [
  { product: "Custom Polo Shirt", distributor: "€18–22", ours: "€9–13", savings: "~50%" },
  { product: "Branded Hoodie", distributor: "€32–40", ours: "€16–22", savings: "~45%" },
  { product: "Uniform Set (Polo + Pants)", distributor: "€45–55", ours: "€24–32", savings: "~45%" },
  { product: "Hotel Towels (Set of 4)", distributor: "€28–35", ours: "€14–20", savings: "~45%" },
  { product: "Gym Tank Top", distributor: "€14–18", ours: "€7–10", savings: "~50%" },
  { product: "Event T-Shirt", distributor: "€12–16", ours: "€6–9", savings: "~50%" },
];

export function PricingComparisonSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-secondary-light dark:bg-bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-teal text-sm font-medium uppercase tracking-widest mb-3">
            Pricing Transparency
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            Factory-Direct vs. Distributor Pricing
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark max-w-2xl mx-auto">
            See the real difference. Same quality, dramatically lower prices — because we cut out the middlemen.
          </p>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark">
            <div className="col-span-1">
              <span className="text-sm font-semibold text-text-light dark:text-text-dark">
                Product
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-semibold text-muted-light dark:text-muted-dark">
                Distributor
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-semibold text-teal">
                Merch Maverick
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-semibold text-text-light dark:text-text-dark">
                You Save
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((item, i) => (
            <div
              key={item.product}
              className={`grid grid-cols-4 gap-4 px-6 py-4 items-center ${
                i < comparisons.length - 1
                  ? "border-b border-border-light dark:border-border-dark"
                  : ""
              }`}
            >
              <div className="col-span-1">
                <span className="text-sm font-medium text-text-light dark:text-text-dark">
                  {item.product}
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm text-muted-light dark:text-muted-dark line-through">
                  {item.distributor}
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-semibold text-teal">
                  {item.ours}
                </span>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                  <Check size={12} />
                  {item.savings}
                </span>
              </div>
            </div>
          ))}

          {/* Footer note */}
          <div className="px-6 py-4 border-t border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark">
            <p className="text-xs text-muted-light dark:text-muted-dark text-center">
              Prices shown per unit. Volume discounts apply for 200+ units.
              All prices include customization (embroidery/print).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
