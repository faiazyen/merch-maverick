"use client";

const placeholderBrands = [
  { name: "Hotel Collection NL", category: "Hospitality" },
  { name: "FitZone Gyms", category: "Fitness" },
  { name: "TechCorp EU", category: "Corporate" },
  { name: "BuildForce", category: "Industrial" },
  { name: "Melvin & Gatica", category: "Events" },
  { name: "Grand Resorts", category: "Hospitality" },
  { name: "Iron Gym London", category: "Fitness" },
  { name: "Alpine Consulting", category: "Corporate" },
];

export function BrandsSection() {
  return (
    <section className="py-10 border-t border-border-light dark:border-border-dark bg-bg-primary-light dark:bg-bg-primary-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-light dark:text-muted-dark mb-6">
          Trusted by European businesses
        </p>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-logos gap-10">
            {[...placeholderBrands, ...placeholderBrands].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex items-center gap-2 shrink-0 px-3 py-1.5"
              >
                <span className="text-sm font-medium text-muted-light dark:text-muted-dark whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
