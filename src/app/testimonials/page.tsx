"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { allTestimonials } from "@/lib/testimonialsData";

const industries = ["All", "Hospitality", "Corporate", "Fitness", "Industrial", "Events", "Influencers"];

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? allTestimonials
    : allTestimonials.filter((t) => t.industry === filter);

  return (
    <div className="bg-bg-primary-light dark:bg-bg-primary-dark">
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            Client Success Stories
          </h1>
          <p className="text-lg text-muted-light dark:text-muted-dark max-w-2xl mx-auto">
            Real brands across Europe and America sharing how they improved
            quality, speed, and margins with Merch Maverick.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setFilter(industry)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === industry
                  ? "bg-teal text-white"
                  : "border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:border-teal hover:text-teal"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-warning fill-warning" />
                ))}
              </div>
              <div className="relative mb-5">
                <Quote size={18} className="absolute -top-1 -left-1 text-teal/20" />
                <p className="text-sm leading-relaxed text-text-light dark:text-text-dark pl-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mb-4">
                <span className="text-xs font-medium text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                  {t.results}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border-light dark:border-border-dark">
                    <Image
                      src={t.avatar}
                      alt={`${t.name} headshot`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-light dark:text-text-dark">{t.name}</p>
                    <p className="text-xs text-muted-light dark:text-muted-dark">{t.role}, {t.company}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                  {t.industry}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
