"use client";

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
            <div className="flex min-h-[18rem] items-end rounded-[1.5rem] border border-dashed border-border-light/80 bg-[radial-gradient(circle_at_top,_rgba(43,107,94,0.12),_transparent_48%),linear-gradient(180deg,_#f7f3eb_0%,_#efeae0_100%)] p-6 dark:border-border-dark dark:bg-[radial-gradient(circle_at_top,_rgba(58,133,117,0.16),_transparent_44%),linear-gradient(180deg,_rgba(26,28,27,0.95)_0%,_rgba(18,20,19,1)_100%)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
                  Founder portrait
                </p>
                <p className="mt-3 max-w-xs text-sm leading-7 text-muted-light dark:text-muted-dark">
                  This space is ready for your photo. Once you add it, this
                  story block will feel even more personal and sales-driven.
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
