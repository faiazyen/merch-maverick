"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Premium Polo",
    image: "/images/products/polo.jpg",
    alt: "Premium custom polo shirt with embroidered logo",
  },
  {
    name: "Custom Hoodie",
    image: "/images/products/hoodie.jpg",
    alt: "Custom branded hoodie with embroidered branding",
  },
  {
    name: "Branded Uniform",
    image: "/images/products/uniform.jpg",
    alt: "Professional branded uniform set",
  },
  {
    name: "Gym Wear",
    image: "/images/products/gymwear.jpg",
    alt: "Custom athletic gym wear set",
  },
];

const stats = [
  { value: "30–50%", label: "cheaper than distributors" },
  { value: "4–8 wks", label: "factory to your door" },
  { value: "MOQ 50", label: "units minimum order" },
  { value: "< 2 hrs", label: "quote response time" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg-primary-light dark:bg-bg-primary-dark">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/5 dark:bg-teal/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-blue/5 dark:bg-slate-blue/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/30 bg-teal/5 dark:bg-teal/10">
                <span className="text-teal text-xs font-medium uppercase tracking-widest">
                  Factory-Direct B2B Merch &middot; Europe
                </span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-text-light dark:text-text-dark"
            >
              Premium Custom Merchandise.{" "}
              <span className="text-teal">Factory Direct.</span>{" "}
              <span className="text-muted-light dark:text-muted-dark">
                Designed to Perfection.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg leading-relaxed mb-10 max-w-xl text-muted-light dark:text-muted-dark"
            >
              Custom-branded apparel, uniforms, and merchandise sourced direct
              from vetted factories — for hospitality, fitness, corporate,
              industrial, events, and creator brands across Europe.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/quote">
                <button className="bg-teal hover:bg-teal-dark text-white flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-teal/20">
                  Get Instant Quote
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/solutions/hospitality">
                <button className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-teal hover:text-teal transition-all">
                  View Solutions
                  <ArrowRight size={18} />
                </button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden border border-border-light dark:border-border-dark"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center justify-center px-4 py-5 text-center bg-white dark:bg-card-dark ${
                    i < 3 ? "border-r border-border-light dark:border-border-dark" : ""
                  } ${i < 2 ? "border-b sm:border-b-0 border-border-light dark:border-border-dark" : ""}`}
                >
                  <span className="text-2xl sm:text-3xl font-bold mb-1 text-teal">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted-light dark:text-muted-dark">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {products.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-border-light dark:border-border-dark bg-bg-secondary-light dark:bg-card-dark hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Placeholder for AI-generated product images */}
                  <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary-light dark:from-bg-secondary-dark to-border-light dark:to-border-dark flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-teal/10 flex items-center justify-center">
                        <span className="text-teal text-2xl font-bold">
                          {i + 1}
                        </span>
                      </div>
                      <p className="font-semibold text-sm text-text-light dark:text-text-dark">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-light dark:text-muted-dark mt-1">
                        3D Product Render
                      </p>
                    </div>
                  </div>
                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                    <p className="text-white text-sm font-medium">
                      {product.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
