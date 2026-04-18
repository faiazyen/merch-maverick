"use client";

import Image from "next/image";
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
    positioning: "Built for multi-location consistency",
    image: "/images/solutions/hospitality/hero.jpg",
  },
  {
    icon: Building2,
    title: "Corporate",
    subtitle: "Tech & Office Brands",
    href: "/solutions/corporate",
    products: ["Branded Hoodies", "Polo Shirts", "Tote Bags", "Client Gifts"],
    positioning: "Built for employee pride and gifting",
    image: "/images/solutions/corporate/hero.jpg",
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    subtitle: "Gyms & Activewear",
    href: "/solutions/fitness",
    products: ["Gym Wear Sets", "Tank Tops", "Performance Tees", "Shorts"],
    positioning: "Built for member merch and retail-ready drops",
    image: "/images/solutions/fitness/hero.jpg",
  },
  {
    icon: HardHat,
    title: "Industrial",
    subtitle: "Workwear & PPE",
    href: "/solutions/industrial",
    products: ["Work Uniforms", "Hi-Vis Jackets", "Safety Gear", "Coveralls"],
    positioning: "Built for daily wear and tough conditions",
    image: "/images/solutions/industrial/hero.jpg",
  },
  {
    icon: PartyPopper,
    title: "Events",
    subtitle: "Festivals & Tours",
    href: "/solutions/events",
    products: ["Event Tees", "Crew Apparel", "VIP Merch", "Festival Gear"],
    positioning: "Built for fast-turn launches and sell-through",
    image: "/images/solutions/events/hero.jpg",
  },
  {
    icon: Music2,
    title: "Influencers & Artists",
    subtitle: "Creator Merch",
    href: "/solutions/influencers-artists",
    products: ["Merch Drops", "Branded Apparel", "Community Gear", "Limited Editions"],
    positioning: "Built for drops, loyalty, and repeat demand",
    featured: true,
    image: "/images/solutions/influencers/hero.jpg",
  },
];

export function VerticalsSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-secondary-light dark:bg-bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            Built for Real Business Use Cases
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark">
            From hotels and corporate teams to creators, festivals, fitness
            brands, and industrial operations, every solution is built around
            how the product will actually be used, worn, and reordered.
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
                    className="group h-full rounded-xl border p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border-border-light dark:border-border-dark bg-white dark:bg-card-dark"
                  >
                    <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[1rem]">
                      <Image
                        src={vertical.image}
                        alt={`${vertical.title} merchandise production`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
                    </div>

                    {vertical.featured && (
                      <div className="mb-3">
                        <span className="text-xs font-medium text-teal bg-teal/10 px-2 py-1 rounded-full uppercase tracking-wide">
                          New Vertical
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <Icon size={24} className="text-text-light dark:text-text-dark" />
                      <span className="text-sm font-medium text-muted-light dark:text-muted-dark">
                        {vertical.positioning}
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
                          <div className="w-1 h-1 rounded-full bg-border-light dark:bg-border-dark shrink-0" />
                          {product}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-1 text-sm font-medium text-text-light dark:text-text-dark group-hover:gap-2 transition-all">
                      View {vertical.title} Solutions <ArrowRight size={14} />
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
