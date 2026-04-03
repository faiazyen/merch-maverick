import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophie van den Berg",
    role: "Operations Manager",
    company: "Hotel Collection NL",
    vertical: "Hospitality",
    quote:
      "We ordered 400 custom staff uniforms and 1,200 hotel towels. The quality exceeded what we were getting from our previous supplier — and we paid nearly half the price. The production tracking portal is brilliant.",
    order: "400 uniforms + 1,200 towels",
    saving: "€8,400 saved vs. previous supplier",
    rating: 5,
  },
  {
    name: "Marco Bianchi",
    role: "Founder",
    company: "FitZone Gyms, Italy",
    vertical: "Fitness",
    quote:
      "We needed branded gym wear for 3 locations. Merch Maverick gave us a quote in 90 minutes and the mockups looked amazing. Lead time was 4 weeks and everything was perfect. Already reordering for our 4th location.",
    order: "600 branded gym wear items",
    saving: "€3,200 saved vs. previous supplier",
    rating: 5,
  },
  {
    name: "Melvin de la Cruz",
    role: "Event Director",
    company: "Melvin & Gatica Bachata",
    vertical: "Events",
    quote:
      "We've been using Merch Maverick since 2025 for our bachata festival merchandise. The quality is consistently great, the turnaround is fast, and the communication is excellent. Our dancers and attendees love the merch.",
    order: "Multiple festival merch orders (€20K+)",
    saving: "Our flagship case study",
    rating: 5,
  },
];

const partners = ["4 Star Hotels", "Independent Gym Chains", "Tech Startups", "Festival Brands", "Industrial SMEs"];

export function SocialProofSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#f8faff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#2351a4] font-semibold text-sm tracking-wider uppercase">
            Client Success
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c1a2e] mt-3 mb-4">
            Real businesses.
            <span className="text-[#2351a4]"> Real savings.</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            We&apos;ve already delivered €20,000–€30,000 in custom merchandise for European businesses.
            Here&apos;s what they say.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <Quote size={20} className="text-[#dce9fc] absolute -top-1 -left-1" />
                <p className="text-neutral-600 text-sm leading-relaxed pl-4">{t.quote}</p>
              </div>

              {/* Order stats */}
              <div className="mt-5 pt-4 border-t border-neutral-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Order:</span>
                  <span className="text-neutral-700 font-medium">{t.order}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Result:</span>
                  <span className="text-green-600 font-semibold">{t.saving}</span>
                </div>
              </div>

              {/* Author */}
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2351a4] to-[#1e3a6e] flex items-center justify-center text-white text-sm font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-[#0c1a2e] text-sm">{t.name}</p>
                  <p className="text-xs text-neutral-400">
                    {t.role} · {t.company}
                  </p>
                </div>
                <span className="ml-auto text-xs px-2 py-0.5 bg-[#f0f6ff] text-[#2351a4] rounded-full font-medium">
                  {t.vertical}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Partner types */}
        <div className="text-center">
          <p className="text-sm text-neutral-400 mb-5">Trusted by businesses across Europe in</p>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((p) => (
              <span
                key={p}
                className="px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-600 text-sm font-medium shadow-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
