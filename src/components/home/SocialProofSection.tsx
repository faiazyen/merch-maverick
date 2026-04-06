"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophie van den Berg",
    role: "Operations Manager",
    company: "Hotel Collection NL",
    industry: "Hospitality",
    quote:
      "We manage 12 hotels across Europe and needed a reliable merchandise partner. Merch Maverick delivered 400 custom staff uniforms with exceptional quality and attention to detail. The production tracking portal is brilliant.",
    results: "400 uniforms, €8,400 saved",
  },
  {
    name: "Marco Bianchi",
    role: "Founder",
    company: "FitZone Gyms, Italy",
    industry: "Fitness",
    quote:
      "We wanted branded gym wear for our 3 locations. Got a quote in 90 minutes and the mockups looked amazing. The quality exceeded our expectations and our members love the branded gear.",
    results: "600 items, €3,200 saved",
  },
  {
    name: "Alex Rivera",
    role: "Musician / Artist",
    company: "Independent Artist",
    industry: "Influencers",
    quote:
      "As a musician, I wanted to launch merch for my fans. Merch Maverick made it so easy — they helped with design, production, and logistics. My first merch drop sold out in 2 weeks!",
    results: "500 merch items, €4,000 revenue",
  },
  {
    name: "Anna Schmidt",
    role: "HR Manager",
    company: "TechCorp EU",
    industry: "Corporate",
    quote:
      "We needed branded merchandise for our company rebrand — hoodies, t-shirts, and tote bags. The design support team helped us get the branding exactly right. Quality is premium.",
    results: "500 items, €5,000 saved",
  },
  {
    name: "Melvin de la Cruz",
    role: "Event Director",
    company: "Melvin & Gatica Bachata",
    industry: "Events",
    quote:
      "We've been using Merch Maverick for our bachata festival merchandise for 3 years now. Quality is consistently great, turnaround is fast, and the value for money is unbeatable.",
    results: "€20K+ orders, €6,000+ saved",
  },
  {
    name: "Klaus Mueller",
    role: "Operations Director",
    company: "BuildForce Industrial",
    industry: "Industrial",
    quote:
      "We needed custom work uniforms for our factory with specific safety requirements. Merch Maverick understood our needs immediately and delivered uniforms that met all specifications.",
    results: "200 uniforms, €2,500 saved",
  },
];

export function SocialProofSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-secondary-light dark:bg-bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
            Real Businesses. Real Savings.
          </h2>
          <p className="text-lg text-muted-light dark:text-muted-dark">
            See how businesses across Europe are saving 30-50% on premium custom merchandise.
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
                <div>
                  <p className="font-semibold text-sm text-text-light dark:text-text-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">
                    {testimonial.role}, {testimonial.company}
                  </p>
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
