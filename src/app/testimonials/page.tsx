"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const allTestimonials = [
  {
    name: "Sophie van den Berg", role: "Operations Manager", company: "Hotel Collection NL", industry: "Hospitality",
    quote: "We manage 12 hotels across Europe and needed a reliable merchandise partner. Merch Maverick delivered 400 custom staff uniforms with exceptional quality and attention to detail. The production tracking portal is brilliant — we could see exactly what was happening at every stage. Already reordering for our other properties.",
    results: "400 uniforms, €8,400 saved",
  },
  {
    name: "Marco Bianchi", role: "Founder", company: "FitZone Gyms, Italy", industry: "Fitness",
    quote: "We wanted branded gym wear for our 3 locations with our logo and colors. Got a quote in 90 minutes and the mockups looked amazing. The quality exceeded our expectations and the lead time was perfect. Our members love the branded gear and we're already planning our next order.",
    results: "600 items, €3,200 saved",
  },
  {
    name: "Melvin de la Cruz", role: "Event Director", company: "Melvin & Gatica Bachata", industry: "Events",
    quote: "We've been using Merch Maverick for our bachata festival merchandise for 3 years now. Quality is consistently great, turnaround is fast, and the communication is excellent. Our dancers and attendees absolutely love the merch. The value for money is unbeatable.",
    results: "€20K+ orders, €6,000+ saved",
  },
  {
    name: "Anna Schmidt", role: "HR Manager", company: "TechCorp EU", industry: "Corporate",
    quote: "We needed branded merchandise for our company rebrand — hoodies, t-shirts, and tote bags. The design support team helped us get the branding exactly right. The quality is premium and our employees love the gear. Highly recommend for any corporate merchandise needs.",
    results: "500 items, €5,000 saved",
  },
  {
    name: "Klaus Mueller", role: "Operations Director", company: "BuildForce Industrial", industry: "Industrial",
    quote: "We needed custom work uniforms for our factory with specific safety requirements. Merch Maverick understood our needs immediately and delivered uniforms that met all our specifications. The quality is durable and professional. Great partnership.",
    results: "200 uniforms, €2,500 saved",
  },
  {
    name: "Alex Rivera", role: "Musician / Artist", company: "Independent Artist", industry: "Influencers",
    quote: "As a musician, I wanted to launch merch for my fans. Merch Maverick made it so easy — they helped with design, production, and logistics. My first merch drop sold out in 2 weeks! The quality is amazing and my fans are already asking for the next drop.",
    results: "500 merch items, €4,000 revenue",
  },
  {
    name: "Jennifer Lee", role: "Marketing Director", company: "Alpine Consulting", industry: "Corporate",
    quote: "We needed branded merchandise for our client gifts. The quote process was fast, the mockups were perfect, and the delivery was on time. Our clients loved the quality and presentation. Definitely using Merch Maverick again.",
    results: "300 items, €2,800 saved",
  },
  {
    name: "David Thompson", role: "Studio Owner", company: "Iron Gym London", industry: "Fitness",
    quote: "We wanted to create a sense of community with branded merchandise for our members. Merch Maverick's team understood our vision and delivered exactly what we needed. The quality is premium and our members feel like part of something special.",
    results: "400 items, €3,600 saved",
  },
  {
    name: "Maria Santos", role: "Dance School Director", company: "Santos Dance Academy", industry: "Influencers",
    quote: "I run a dance school and wanted branded apparel for my students. Merch Maverick helped us design and produce custom dance wear. The process was seamless and the quality is fantastic. My students feel proud wearing our branded gear.",
    results: "150 items, €1,200 saved",
  },
  {
    name: "Roberto Rossi", role: "General Manager", company: "Rossi Restaurant Group", industry: "Hospitality",
    quote: "We manage a restaurant group and needed consistent branded merchandise across all locations. Merch Maverick delivered on time, on budget, and with exceptional quality. The production tracking made everything transparent. Highly recommend.",
    results: "800 items, €6,500 saved",
  },
];

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
                <div>
                  <p className="font-semibold text-sm text-text-light dark:text-text-dark">{t.name}</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">{t.role}, {t.company}</p>
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
