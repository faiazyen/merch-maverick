"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Palette,
  Package,
  Scissors,
  Shirt,
  Sparkles,
} from "lucide-react";

const productionFlow = [
  {
    title: "Design and material direction",
    description:
      "We shape your brief into clear garment direction, material choices, logo placement, trims, and fit logic before production starts.",
    icon: Palette,
  },
  {
    title: "Pattern, fit, and approval",
    description:
      "Patterns, trims, and fit details are aligned with the approved 3D concept so your sample matches the direction you signed off on.",
    icon: Scissors,
  },
  {
    title: "Factory-owned execution",
    description:
      "From creator drops to hospitality uniforms and industrial workwear, each production run moves through owned factories with monitored output.",
    icon: Shirt,
  },
  {
    title: "QC, packaging, and delivery",
    description:
      "Quality checkpoints, packaging, and logistics keep the final product aligned with what was approved before it reaches your door.",
    icon: Package,
  },
];

export function FactoriesSection() {
  return (
    <section className="bg-bg-primary-light py-24 dark:bg-bg-primary-dark lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border-light/70 bg-bg-secondary-light/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-light dark:border-border-dark dark:bg-bg-secondary-dark/70 dark:text-muted-dark">
              <Sparkles size={14} className="text-teal" />
              Built on real production heritage
            </div>
            <h2 className="mt-6 text-4xl font-bold tracking-tight text-text-light sm:text-5xl dark:text-text-dark">
              Most merch suppliers mark it up. We manufacture it.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-light dark:text-muted-dark">
              Merch Maverick is built on 35+ years of garment manufacturing
              experience, 12+ owned factories, and a design-to-production
              system that gives brands more control, better quality, and
              stronger margins.
            </p>

            <div className="mt-8 rounded-[1.8rem] border border-border-light/70 bg-[#151515] p-6 text-white shadow-[0_25px_70px_rgba(17,17,17,0.18)] dark:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
                Why brands switch
              </p>
              <div className="mt-5 space-y-4">
                {[
                  "You buy closer to the source, not through layers of distributors and resellers.",
                  "Premium material options and 3D approval reduce guesswork before production begins.",
                  "The result is better-feeling merchandise, tighter control, and a partner that thinks like a manufacturer.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal" />
                    <p className="text-sm leading-6 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.9rem] border border-border-light/70 bg-white shadow-[0_24px_60px_rgba(17,17,17,0.08)] dark:border-border-dark dark:bg-card-dark">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/home/factory-overview.jpg"
                  alt="Modern textile factory floor used for Merch Maverick production"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {productionFlow.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="rounded-[1.8rem] border border-border-light/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.92)_0%,_rgba(247,247,247,0.92)_100%)] p-6 shadow-[0_22px_60px_rgba(17,17,17,0.06)] dark:border-border-dark dark:bg-[linear-gradient(180deg,_rgba(26,26,26,0.88)_0%,_rgba(18,18,18,0.95)_100%)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-text-light dark:text-text-dark">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-light dark:text-muted-dark">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
