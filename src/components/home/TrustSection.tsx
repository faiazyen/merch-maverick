"use client";

import { motion } from "framer-motion";
import { Factory, Palette, ShieldCheck, Zap, Leaf } from "lucide-react";

const advantages = [
  {
    icon: Factory,
    title: "12+ Owned Factories",
    description:
      "Your project moves through owned factory capacity, not a chain of intermediaries. That gives you tighter control over quality, timelines, and pricing.",
    highlight: "0 middlemen",
  },
  {
    icon: Palette,
    title: "European Design Support",
    description:
      "Designers trained across Europe help shape garments that look stronger on-screen, on-body, and in production, not just in a flat mockup.",
    highlight: "Design-led execution",
  },
  {
    icon: ShieldCheck,
    title: "Premium Material Standards",
    description:
      "We prioritize cotton-first, natural-fiber, organic, and skin-conscious material options so your merch feels like a real product worth keeping.",
    highlight: "Cotton-first options",
  },
  {
    icon: Zap,
    title: "Faster Launches, More Control",
    description:
      "Rush orders in 7-10 days and standard production in 4-8 weeks help brands move faster because the factory relationship is already built in.",
    highlight: "7-10 day rush",
  },
  {
    icon: Leaf,
    title: "Certified Quality and QC",
    description:
      "Certified material standards, in-line quality checks, and pre-shipment review help keep the final product aligned with what you approved.",
    highlight: "Certified standards",
  },
];

export function TrustSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-secondary-light dark:bg-bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            Why Merch Maverick Wins
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark">
            We combine manufacturing legacy, factory ownership, premium
            material direction, and 3D-led approvals to give brands a better
            way to build merch.
          </p>
        </div>

        {/* Advantage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, i) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`group ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="mb-4">
                  <Icon size={28} className="text-teal" />
                </div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
                  {advantage.highlight}
                </p>
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
