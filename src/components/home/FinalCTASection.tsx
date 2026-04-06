"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Shield, Gift } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-24 lg:py-32 bg-text-light dark:bg-bg-secondary-dark relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white dark:text-text-dark mb-4">
            Stop Overpaying For Merch.
          </h2>
          <p className="text-lg text-white/60 dark:text-muted-dark mb-10 max-w-2xl mx-auto">
            Join European businesses already saving 30-50% on branded
            merchandise. Get your instant quote — no sales call required.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm text-white/60 dark:text-muted-dark">
              <Clock size={16} />
              Response within 2 hours
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60 dark:text-muted-dark">
              <Shield size={16} />
              No commitment required
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60 dark:text-muted-dark">
              <Gift size={16} />
              Free product samples
            </div>
          </div>

          {/* CTA */}
          <Link href="/quote">
            <button className="bg-white dark:bg-text-dark text-text-light dark:text-bg-primary-dark inline-flex items-center gap-2.5 px-10 py-5 rounded-lg font-semibold text-lg transition-all hover:opacity-90 active:scale-[0.98]">
              Get Instant Quote
              <ArrowRight size={20} />
            </button>
          </Link>

          <p className="text-xs text-white/40 dark:text-muted-dark mt-4">
            No credit card required. Detailed quote delivered same day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
