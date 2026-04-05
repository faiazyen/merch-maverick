"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Utensils, Dumbbell, Building2, HardHat, Music2, PartyPopper } from "lucide-react";

const verticals = [
  {
    icon: Utensils,
    title: "Hospitality",
    subtitle: "Hotels & Restaurants",
    href: "/solutions/hospitality",
    products: ["Staff Uniforms", "Chef Coats", "Hotel Towels", "Bathrobes"],
    priceRange: "€3K–€15K",
  },
  {
    icon: Building2,
    title: "Corporate",
    subtitle: "Tech & Office Brands",
    href: "/solutions/corporate",
    products: ["Branded Hoodies", "Polo Shirts", "Tote Bags", "Client Gifts"],
    priceRange: "€2K–€10K",
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    subtitle: "Gyms & Activewear",
    href: "/solutions/fitness",
    products: ["Gym Wear Sets", "Tank Tops", "Performance Tees", "Shorts"],
    priceRange: "€3K–€12K",
  },
  {
    icon: HardHat,
    title: "Industrial",
    subtitle: "Workwear & PPE",
    href: "/solutions/industrial",
    products: ["Work Uniforms", "Hi-Vis Jackets", "Safety Gear", "Coveralls"],
    priceRange: "€5K–€20K",
  },
  {
    icon: PartyPopper,
    title: "Events",
    subtitle: "Festivals & Tours",
    href: "/solutions/events",
    products: ["Event Tees", "Crew Apparel", "VIP Merch", "Festival Gear"],
    priceRange: "€2K–€8K",
  },
  {
    icon: Music2,
    title: "Influencers & Artists",
    subtitle: "Creator Merch",
    href: "/solutions/influencers-artists",
    products: ["Merch Drops", "Branded Apparel", "Community Gear", "Limited Editions"],
    priceRange: "€1K–€10K",
    featured: true,
  },
];

export function VerticalsSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-primary-light dark:bg-bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-teal text-sm font-medium uppercase tracking-widest mb-3">
            Industry Solutions
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            Built for Your Industry, Not a Generic Catalog
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark max-w-2xl mx-auto">
            Each vertical gets a dedicated product range, pricing structure, and
            production workflow tailored to their specific needs.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {verticals.map((vertical, i) => {
            const Icon = vertical.icon;
            return (
              <motion.div
                key={vertical.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link href={vertical.href}>
                  <div
                    className={`group h-full rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      vertical.featured
                        ? "border-teal bg-teal/5 dark:bg-teal/10"
                        : "border-border-light dark:border-border-dark bg-white dark:bg-card-dark"
                    }`}
                  >
                    {vertical.featured && (
                      <div className="mb-3">
                        <span className="text-xs font-medium text-teal bg-teal/10 px-2 py-1 rounded-full uppercase tracking-wide">
                          New Vertical
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                        <Icon size={24} className="text-teal" />
                      </div>
                      <span className="text-sm font-semibold text-teal">
                        {vertical.priceRange}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg text-text-light dark:text-text-dark mb-1">
                      {vertical.title}
                    </h3>
                    <p className="text-sm text-muted-light dark:text-muted-dark mb-4">
                      {vertical.subtitle}
                    </p>

                    <ul className="space-y-1.5 mb-5">
                      {vertical.products.map((product) => (
                        <li
                          key={product}
                          className="text-sm text-muted-light dark:text-muted-dark flex items-center gap-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-teal shrink-0" />
                          {product}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-1 text-sm font-medium text-teal group-hover:gap-2 transition-all">
                      View Solutions <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
