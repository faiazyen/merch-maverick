"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Custom Polos",
    image: "/images/products/polo.jpg",
    alt: "Premium custom polo shirt with embroidered logo",
  },
  {
    name: "Branded Hoodies",
    image: "/images/products/hoodie.jpg",
    alt: "Custom branded hoodie with embroidered branding",
  },
  {
    name: "Staff Uniforms",
    image: "/images/products/uniform.jpg",
    alt: "Professional branded uniform set",
  },
  {
    name: "Gym Wear",
    image: "/images/products/gymwear.jpg",
    alt: "Custom athletic gym wear set",
  },
  {
    name: "Event Tees",
    image: "/images/products/event-tee.jpg",
    alt: "Custom event t-shirt",
  },
  {
    name: "Towels & Robes",
    image: "/images/products/towels.jpg",
    alt: "Custom hotel towels and robes",
  },
  {
    name: "Workwear",
    image: "/images/products/workwear.jpg",
    alt: "Industrial workwear and PPE",
  },
  {
    name: "Merch Drops",
    image: "/images/products/merch.jpg",
    alt: "Creator and artist merchandise",
  },
  {
    name: "Caps & Beanies",
    image: "/images/products/caps.jpg",
    alt: "Custom branded caps and beanies",
  },
  {
    name: "Tote Bags",
    image: "/images/products/tote.jpg",
    alt: "Branded tote bags",
  },
];

const stats = [
  { value: "1M+", label: "items produced" },
  { value: "12", label: "factory partners" },
  { value: "30–50%", label: "avg. savings" },
];

export function HeroSection() {
  return (
    <section className="relative bg-bg-primary-light dark:bg-bg-primary-dark overflow-hidden">
      {/* ── Hero Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Headline block */}
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] text-text-light dark:text-text-dark"
          >
            Made-to-order:
            <br />
            <span className="text-teal">made to grow</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg sm:text-xl text-muted-light dark:text-muted-dark max-w-2xl leading-relaxed"
          >
            Scale your business with a trusted on-demand manufacturer. Premium
            custom merchandise — factory-direct, designed to perfection, delivered
            across Europe.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/quote">
              <button className="bg-text-light dark:bg-text-dark text-white dark:text-text-light flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg font-semibold text-base transition-all hover:opacity-90 active:scale-[0.98]">
                Get a Quote
                <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/contact">
              <button className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg font-semibold text-base border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark transition-all">
                Meet our team
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-20 flex flex-wrap gap-12 sm:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark">
                {stat.value}
              </p>
              <p className="text-sm text-muted-light dark:text-muted-dark mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Product Grid (Printful-style) ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="border-t border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-bg-secondary-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-sm font-medium text-muted-light dark:text-muted-dark mb-8">
            Products we manufacture
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.05 }}
                className="group cursor-pointer"
              >
                {/* Image placeholder */}
                <div className="aspect-square rounded-xl bg-white dark:bg-card-dark border border-border-light dark:border-border-dark flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-bg-secondary-light dark:bg-bg-secondary-dark flex items-center justify-center">
                      <span className="text-muted-light dark:text-muted-dark text-lg">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-text-light dark:text-text-dark text-center">
                  {product.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
