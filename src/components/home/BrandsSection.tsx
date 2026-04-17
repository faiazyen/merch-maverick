"use client";

const industries = [
  "Hospitality Groups",
  "Corporate Teams",
  "Fitness Brands",
  "Industrial Suppliers",
  "Event Producers",
  "Creators & Artists",
];

export function BrandsSection() {
  return (
    <section className="border-y border-border-light/70 bg-[#f4f1eb] py-8 dark:border-border-dark dark:bg-[#141616]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted-light dark:text-muted-dark">
            Trusted by brands across Europe and America
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-light dark:text-muted-dark">
            Premium mockups, cotton-first material options, rapid approvals,
            and factory-direct execution for brands that want merch to feel
            considered before a single unit is produced.
          </p>
        </div>

        <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry}
              className="rounded-2xl border border-border-light/70 bg-white/80 px-4 py-3 text-sm font-medium text-text-light shadow-sm dark:border-border-dark dark:bg-card-dark/70 dark:text-text-dark"
            >
              {industry}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
