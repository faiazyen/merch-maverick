"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

export function FounderStorySection() {
  return (
    <section className="bg-bg-primary-light py-24 dark:bg-bg-primary-dark lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal">
            Founder story
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-5xl">
            I grew up watching garments get made before I ever tried to sell one.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-muted-light dark:text-muted-dark">
            <p>
              My mother was a textile engineer. As a kid, I watched her design,
              cut, sew, and solve real garment problems on the machine. That is
              where I learned the difference between product that only looks
              good in a mockup and product that actually feels right in real
              life.
            </p>
            <p>
              Merch Maverick was built from that world, not from reseller
              logic or generic supplier language. It comes from the production
              floor, where material, fit, finishing, and consistency decide
              whether a product deserves your brand.
            </p>
            <p>
              Today, that story is backed by 35+ years of family manufacturing
              experience, 12+ owned factories, and production exposure around
              some of the best-known names in fashion, sportswear, and retail.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid gap-5"
        >
          <div className="rounded-[2rem] border border-border-light/70 bg-white p-6 shadow-[0_22px_60px_rgba(17,17,17,0.06)] dark:border-border-dark dark:bg-card-dark">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <div className="relative aspect-[4/4.5]">
                <Image
                  src="/images/home/founder-story.jpg"
                  alt="Founder portrait for Merch Maverick"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/35 bg-[#121212]/72 px-4 py-3 text-white backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Founder portrait
                </p>
                <p className="mt-2 text-sm leading-6 text-white/88">
                  Built from real garment-floor experience, not reseller
                  positioning.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border-light/70 bg-white p-6 shadow-[0_22px_60px_rgba(17,17,17,0.06)] dark:border-border-dark dark:bg-card-dark">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
              Brand exposure
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text-light dark:text-text-dark">
              Production heritage connected to major global brands.
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {brandNames.map((brand) => (
                <div
                  key={brand}
                  className="rounded-2xl border border-border-light/70 bg-bg-secondary-light/70 px-4 py-3 text-center text-sm font-semibold text-text-light dark:border-border-dark dark:bg-bg-secondary-dark/70 dark:text-text-dark"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
