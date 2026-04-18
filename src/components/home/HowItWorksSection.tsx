"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquare, FileCheck, Eye, Truck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Tell us what you need",
    description:
      "Share your product type, quantities, branding, and timeline. We turn it into a clear factory-direct quote and project direction.",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Approve your quote and 3D concept",
    description:
      "Review your pricing, design direction, and photorealistic 3D mockup so you can approve something real before production starts.",
  },
  {
    icon: Eye,
    step: "03",
    title: "Track production in real time",
    description:
      "Follow cutting, sewing, quality control, and packaging through your client portal with clearer production visibility.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Delivered to your door",
    description:
      "Receive professionally packaged merchandise with standard 4-8 week production and rush options in 7-10 days.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-primary-light dark:bg-bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            From Concept to Delivery Without the Usual Chaos
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark">
            A cleaner process means fewer delays, fewer surprises, and more
            confidence between the first brief and the final shipment.
          </p>
        </div>

        <div className="mb-14 overflow-hidden rounded-[2rem] border border-border-light/70 bg-white shadow-[0_24px_60px_rgba(17,17,17,0.06)] dark:border-border-dark dark:bg-card-dark">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[18rem] lg:min-h-full">
              <Image
                src="/images/home/production-process.jpg"
                alt="Bangladesh textile production line used in the Merch Maverick workflow"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                Transparent production
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text-light dark:text-text-dark">
                The workflow your quote moves through once you say yes.
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-light dark:text-muted-dark">
                Every brief moves from pricing and concepting into real factory
                coordination, monitored production, and shipment prep so you
                can see a credible path from idea to delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, i) => {
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <span className="text-5xl font-bold text-border-light dark:text-border-dark">
                  {step.step}
                </span>
                <h3 className="font-semibold text-text-light dark:text-text-dark mt-3 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div>
          <Link href="/quote">
            <button className="bg-text-light dark:bg-text-dark text-white dark:text-text-light inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-base transition-all hover:opacity-90 active:scale-[0.98]">
              Start Your Order
              
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
