import { Shield, Factory, Clock, Leaf } from "lucide-react";

const advantages = [
  {
    icon: Factory,
    title: "Family-Owned Factories",
    description:
      "Direct access to advanced textile and garment factories in Bangladesh. Zero intermediary markups. We control quality at every step of production.",
    highlight: "0 middlemen",
  },
  {
    icon: Shield,
    title: "Guaranteed Quality",
    description:
      "3-checkpoint quality control with photos sent at each production milestone. Money-back guarantee on first orders. You see what you're getting before it ships.",
    highlight: "100% QC coverage",
  },
  {
    icon: Clock,
    title: "Fastest in Europe",
    description:
      "Standard 3–5 week lead time for full custom production. Rush orders fulfilled in 7–10 days. AI-powered scheduling ensures we never miss a deadline.",
    highlight: "7–10 day rush",
  },
  {
    icon: Leaf,
    title: "Ethical & Sustainable",
    description:
      "Our factories meet international ethical standards. We offer OEKO-TEX certified fabrics and are committed to fair wages and safe working conditions.",
    highlight: "OEKO-TEX certified",
  },
];

const pricingComparison = [
  { product: "Custom Polo (500 units)", distributor: "€12–€18", ours: "€6–€10", saving: "~44%" },
  { product: "Uniform Set (embroidered)", distributor: "€45–€70", ours: "€22–€38", saving: "~48%" },
  { product: "Hotel Towels (1000 units)", distributor: "€8–€14", ours: "€4–€7", saving: "~48%" },
  { product: "Branded Hoodie (200 units)", distributor: "€20–€30", ours: "€10–€16", saving: "~45%" },
];

export function TrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#f8faff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#2351a4] font-semibold text-sm tracking-wider uppercase">
            Why Merch Maverick
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c1a2e] mt-3 mb-4">
            The advantages no competitor
            <br />
            <span className="text-[#2351a4]">can match simultaneously</span>
          </h2>
        </div>

        {/* Advantages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advantages.map((adv) => (
            <div
              key={adv.title}
              className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f0f6ff] flex items-center justify-center mb-4">
                <adv.icon size={22} className="text-[#2351a4]" />
              </div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#dce9fc] text-[#1e3a6e] text-xs font-semibold mb-3">
                {adv.highlight}
              </div>
              <h3 className="font-bold text-[#0c1a2e] mb-2">{adv.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing comparison table */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-100">
            <h3 className="text-xl font-bold text-[#0c1a2e]">Factory-Direct vs. Distributor Pricing</h3>
            <p className="text-neutral-500 text-sm mt-1">
              Real price comparisons. You keep the difference.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Distributor Price
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#2351a4] uppercase tracking-wider">
                    Our Price
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-green-600 uppercase tracking-wider">
                    You Save
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {pricingComparison.map((row) => (
                  <tr key={row.product} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#0c1a2e]">{row.product}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500 line-through">{row.distributor}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#1e3a6e]">{row.ours}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                        {row.saving}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-[#f0f6ff] border-t border-[#dce9fc]">
            <p className="text-xs text-neutral-500 text-center">
              Prices shown per unit. Volume discounts apply for 200+ units. All prices in EUR ex-VAT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
