"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Shield, Gift } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-primary-light dark:bg-bg-primary-dark relative overflow-hidden">
      {/* Subtle accent background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal/5 dark:bg-teal/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            Stop Overpaying For Merch.
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark mb-10 max-w-2xl mx-auto">
            Join European businesses already saving 30–50% on branded
            merchandise. Get your instant quote — no sales call required.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm text-muted-light dark:text-muted-dark">
              <Clock size={16} className="text-teal" />
              Response within 2 hours
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-light dark:text-muted-dark">
              <Shield size={16} className="text-teal" />
              No commitment required
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-light dark:text-muted-dark">
              <Gift size={16} className="text-teal" />
              Free product samples
            </div>
          </div>

          {/* CTA */}
          <Link href="/quote">
            <button className="bg-teal hover:bg-teal-dark text-white inline-flex items-center gap-2.5 px-10 py-5 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-teal/20">
              Get Instant Quote
              <ArrowRight size={20} />
            </button>
          </Link>

          <p className="text-xs text-muted-light dark:text-muted-dark mt-4">
            No credit card required. Detailed quote delivered same day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
