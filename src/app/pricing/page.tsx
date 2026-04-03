import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPETITOR_COMPARISON, MOQ, RUSH_SURCHARGE } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing — Merch Maverick",
  description:
    "Transparent factory-direct pricing for custom merchandise. 30–50% cheaper than European distributors. See MOQs, surcharges, and volume discounts.",
};

const moqRows = [
  { category: "Basic Apparel (T-shirts, Polos)", standard: 100, rush: 50, surcharge: "15%" },
  { category: "Uniforms & Workwear", standard: 50, rush: 25, surcharge: "20%" },
  { category: "Embroidered Items", standard: 50, rush: 25, surcharge: "15%" },
  { category: "Towels & Linens", standard: 200, rush: 100, surcharge: "10%" },
  { category: "Footwear", standard: 200, rush: 100, surcharge: "25%" },
  { category: "Accessories (Caps, Bags)", standard: 100, rush: 50, surcharge: "15%" },
];

const volumeDiscounts = [
  { qty: "100–199 units", discount: "5%" },
  { qty: "200–499 units", discount: "10%" },
  { qty: "500–999 units", discount: "15%" },
  { qty: "1,000+ units", discount: "20%" },
];

const faq = [
  {
    q: "Why are your prices so much lower than distributors?",
    a: "We eliminate 2–3 layers of middlemen. Our family-owned factories in Bangladesh produce directly for you. No importer, no local distributor, no reseller — just factory to your door.",
  },
  {
    q: "What's included in the price?",
    a: "Unit price includes production, branding (screen print or embroidery), and standard quality control. Shipping to EU, customs handling, and packaging are quoted separately based on your location.",
  },
  {
    q: "Do you offer samples before the full order?",
    a: "Yes. Sample orders are available at rush MOQ quantities (+25% surcharge). For recurring clients, we ship pre-production samples at cost.",
  },
  {
    q: "What payment terms do you offer?",
    a: "50% deposit to start production, 50% before shipment. For recurring clients on quarterly contracts, we offer 30-day payment terms.",
  },
  {
    q: "Are prices in EUR inclusive of VAT?",
    a: "All prices shown are ex-VAT. EU VAT rules apply based on your country of registration. We provide VAT-compliant invoices for all orders.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <div className="bg-[#0c1a2e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#3b6fd4] font-semibold text-sm tracking-wider uppercase">
            Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Factory-direct pricing.
            <br />
            <span className="text-[#3b6fd4]">No surprises.</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            We publish our pricing ranges so you know exactly what to expect — before you even contact us.
            No hidden fees. No minimum annual spend.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Competitor comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#0c1a2e] mb-2">Us vs. The Competition</h2>
          <p className="text-neutral-500 text-sm mb-6">
            Real price comparisons per unit. Distributor prices sourced from publicly available rates.
          </p>
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Distributor / Unit
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-[#2351a4] uppercase tracking-wider">
                      Our Price / Unit
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-green-600 uppercase tracking-wider">
                      You Save
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {COMPETITOR_COMPARISON.map((row) => {
                    const savingPct = Math.round(
                      (1 - (row.ourMin + row.ourMax) / 2 / ((row.distributorMin + row.distributorMax) / 2)) * 100
                    );
                    return (
                      <tr key={row.product} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-[#0c1a2e]">{row.product}</td>
                        <td className="px-6 py-4 text-sm text-neutral-400 line-through">
                          €{row.distributorMin}–€{row.distributorMax}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-[#1e3a6e]">
                          €{row.ourMin}–€{row.ourMax}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                            ~{savingPct}% less
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* MOQ Table */}
          <div>
            <h2 className="text-2xl font-bold text-[#0c1a2e] mb-2">Minimum Order Quantities</h2>
            <p className="text-neutral-500 text-sm mb-6">
              Standard and rush MOQs by product category.
            </p>
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Standard
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-orange-500 uppercase tracking-wider">
                      Rush
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Rush Fee
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {moqRows.map((row) => (
                    <tr key={row.category} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-3 text-neutral-700 font-medium">{row.category}</td>
                      <td className="px-4 py-3 text-center text-neutral-600">{row.standard}</td>
                      <td className="px-4 py-3 text-center text-neutral-600">{row.rush}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-orange-600 font-semibold">+{row.surcharge}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Volume discounts + what's included */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0c1a2e] mb-2">Volume Discounts</h2>
              <p className="text-neutral-500 text-sm mb-4">Automatically applied to your quote.</p>
              <div className="space-y-2">
                {volumeDiscounts.map((row) => (
                  <div
                    key={row.qty}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-100 shadow-sm"
                  >
                    <span className="text-sm text-neutral-700 font-medium">{row.qty}</span>
                    <span className="text-[#2351a4] font-bold">{row.discount} off</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0c1a2e] mb-4">What&apos;s Included</h2>
              <ul className="space-y-2.5">
                {[
                  "Factory production & quality control",
                  "Single-color or multi-color branding",
                  "Pre-production mockups (AI-generated)",
                  "3-checkpoint QC photos from factory",
                  "Client portal access & production tracking",
                  "Dedicated account support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <CheckCircle2 size={16} className="text-[#2351a4] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lead times */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          <div className="p-6 bg-[#f0f6ff] rounded-2xl border border-[#dce9fc]">
            <h3 className="font-bold text-[#0c1a2e] mb-1">Standard Production</h3>
            <p className="text-3xl font-bold text-[#1e3a6e] mb-2">3–5 weeks</p>
            <p className="text-sm text-neutral-500">
              Full custom production from factory to EU delivery. Best price, full customization.
            </p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-[#0c1a2e]">Rush Production</h3>
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                +10–25% surcharge
              </span>
            </div>
            <p className="text-3xl font-bold text-[#ea580c] mb-2">7–10 days</p>
            <p className="text-sm text-neutral-500">
              For urgent orders. Priority production slot, expedited shipping. Lower MOQ applies.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#0c1a2e] mb-8">Pricing FAQ</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                <h3 className="font-semibold text-[#0c1a2e] mb-2">{item.q}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 bg-[#0c1a2e] rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-3">Ready for your exact quote?</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Use our quote tool for an instant estimate — confirmed by our team within 2 hours.
          </p>
          <Link href="/quote">
            <Button variant="accent" size="lg">
              Get Instant Quote <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
