"use client";

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
