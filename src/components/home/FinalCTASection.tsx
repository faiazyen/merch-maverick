"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Sparkles, WandSparkles } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_#111111_0%,_#181818_100%)] py-24 dark:bg-[linear-gradient(180deg,_#0d0f0e_0%,_#141615_100%)] lg:py-32">
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-teal/18 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/6 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[2.2rem] border border-white/10 bg-white/6 p-8 backdrop-blur md:p-10 lg:p-14"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/60">
                <Sparkles size={14} className="text-teal" />
                Factory-owned merch advantage
              </div>
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Stop paying for middlemen. Start building better merch.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                Work with a team built on real production heritage, 12+ owned
                factories, premium material direction, and a process designed
                to help your brand move faster with more confidence.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.8rem] border border-white/10 bg-black/20 p-6">
                <div className="flex items-start gap-3">
                  <WandSparkles size={18} className="mt-1 shrink-0 text-teal" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
                      Why brands stay
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/76">
                      Come with an idea, a moodboard, or a working concept. We
                      help shape the product, approve it in 3D, and move it into
                      controlled factory production without the usual confusion.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-black/20 p-6">
                <div className="flex items-start gap-3">
                  <Shield size={18} className="mt-1 shrink-0 text-teal" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
                      Material and margin edge
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/76">
                      Factory-direct pricing, premium cotton-first options, and
                      clearer approvals mean stronger products and healthier
                      margins from the start.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-[1.4rem] bg-white px-7 py-4 text-base font-semibold text-text-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f2f2f2]"
              >
                Get Instant Quote
                <ArrowRight size={18} />
              </Link>
              <p className="px-1 text-sm text-white/55">
                No credit card required. No drawn-out sales cycle. Just a clear
                path from brief to production.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
