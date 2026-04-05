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
    <section className="py-12 border-y border-border-light dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-light dark:text-muted-dark mb-6">
          Trusted by European businesses
        </p>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-logos gap-12">
            {[...placeholderBrands, ...placeholderBrands].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex items-center gap-2 shrink-0 px-4 py-2 rounded-lg border border-border-light dark:border-border-dark"
              >
                <div className="w-6 h-6 rounded bg-teal/10 flex items-center justify-center">
                  <span className="text-teal text-xs font-bold">
                    {brand.name[0]}
                  </span>
                </div>
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
