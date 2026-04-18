"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { featuredTestimonials as testimonials } from "@/lib/testimonialsData";

export function SocialProofSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-secondary-light dark:bg-bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            Real Brands. Real Production Results.
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark">
            See how brands use Merch Maverick to solve quality, speed, margin,
            and visibility problems without settling for generic merchandise.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark p-6 transition-all duration-300 hover:shadow-md"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="text-warning fill-warning"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-5">
                <Quote size={18} className="absolute -top-1 -left-1 text-border-light dark:text-border-dark" />
                <p className="text-sm leading-relaxed text-text-light dark:text-text-dark pl-5">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Results badge */}
              <div className="mb-4">
                <span className="text-xs font-medium text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                  {testimonial.results}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border-light dark:border-border-dark">
                    <Image
                      src={testimonial.avatar}
                      alt={`${testimonial.name} headshot`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-light dark:text-text-dark">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-light dark:text-muted-dark">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-light dark:text-muted-dark px-2 py-0.5 rounded-full border border-border-light dark:border-border-dark">
                  {testimonial.industry}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
