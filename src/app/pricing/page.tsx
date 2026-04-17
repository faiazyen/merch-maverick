import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { COMPETITOR_COMPARISON } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing — Merch Maverick",
  description:
    "Transparent factory-direct pricing for custom merchandise with stronger margins, premium material options, and no distributor markup layers.",
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
    a: "We eliminate 2–3 layers of middlemen. Our factories produce directly for you. No importer, no local distributor, no reseller — just factory to your door.",
  },
  {
    q: "What's included in the price?",
    a: "Unit price includes production, branding (screen print or embroidery), and standard quality control. Shipping to EU, customs handling, and packaging are quoted separately.",
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
    <div className="bg-bg-primary-light dark:bg-bg-primary-dark">
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal font-medium text-sm tracking-widest uppercase">
            Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-4 tracking-tight text-text-light dark:text-text-dark">
            Factory-direct pricing.
            <br />
            <span className="text-teal">No markup theater.</span>
          </h1>
          <p className="text-muted-light dark:text-muted-dark text-lg max-w-2xl mx-auto">
            We show the logic behind our pricing so you can see where the
            savings come from: fewer middlemen, tighter production control, and
            better visibility from brief to shipment.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Competitor comparison */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
            Us vs. The Competition
          </h2>
          <p className="text-muted-light dark:text-muted-dark text-sm mb-6">
            Real per-unit comparisons that show what happens when you remove
            importer, distributor, and reseller markup layers.
          </p>
          <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-bg-secondary-light dark:bg-bg-secondary-dark border-b border-border-light dark:border-border-dark">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider">
                      Distributor / Unit
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-teal uppercase tracking-wider">
                      Our Price / Unit
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-success uppercase tracking-wider">
                      You Save
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {COMPETITOR_COMPARISON.map((row) => {
                    const savingPct = Math.round(
                      (1 - (row.ourMin + row.ourMax) / 2 / ((row.distributorMin + row.distributorMax) / 2)) * 100
                    );
                    return (
                      <tr key={row.product} className="hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-text-light dark:text-text-dark">{row.product}</td>
                        <td className="px-6 py-4 text-sm text-muted-light dark:text-muted-dark line-through">
                          &euro;{row.distributorMin}&ndash;&euro;{row.distributorMax}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-teal">
                          &euro;{row.ourMin}&ndash;&euro;{row.ourMax}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-success/10 text-success text-xs font-bold">
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

        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {/* MOQ Table */}
          <div>
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
              Minimum Order Quantities
            </h2>
            <p className="text-muted-light dark:text-muted-dark text-sm mb-6">
              Standard and rush MOQs by product category.
            </p>
            <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-secondary-light dark:bg-bg-secondary-dark border-b border-border-light dark:border-border-dark">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider">
                      Standard
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-warning uppercase tracking-wider">
                      Rush
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider">
                      Rush Fee
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {moqRows.map((row) => (
                    <tr key={row.category} className="hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark transition-colors">
                      <td className="px-5 py-3 text-text-light dark:text-text-dark font-medium">{row.category}</td>
                      <td className="px-4 py-3 text-center text-muted-light dark:text-muted-dark">{row.standard}</td>
                      <td className="px-4 py-3 text-center text-muted-light dark:text-muted-dark">{row.rush}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-warning font-semibold">+{row.surcharge}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Volume discounts + what's included */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
                Volume Discounts
              </h2>
              <p className="text-muted-light dark:text-muted-dark text-sm mb-4">
                Automatically applied to your quote.
              </p>
              <div className="space-y-2">
                {volumeDiscounts.map((row) => (
                  <div
                    key={row.qty}
                    className="flex items-center justify-between p-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark"
                  >
                    <span className="text-sm text-text-light dark:text-text-dark font-medium">{row.qty}</span>
                    <span className="text-teal font-bold">{row.discount} off</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
                What&apos;s Included
              </h2>
              <ul className="space-y-2.5">
                {[
                  "Factory production & quality control",
                  "Single-color or multi-color branding",
                  "Pre-production mockups (AI-generated)",
                  "3-checkpoint QC photos from factory",
                  "Client portal access & production tracking",
                  "Dedicated account support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-light dark:text-muted-dark">
                    <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lead times */}
        <div className="grid sm:grid-cols-2 gap-5 mb-20">
          <div className="p-6 rounded-2xl border border-teal/30 bg-teal/5 dark:bg-teal/10">
            <h3 className="font-bold text-text-light dark:text-text-dark mb-1">Standard Production</h3>
            <p className="text-3xl font-bold text-teal mb-2">4–8 weeks</p>
            <p className="text-sm text-muted-light dark:text-muted-dark">
              Full custom production from factory to EU delivery. Best price, full customization.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-warning/30 bg-warning/5 dark:bg-warning/10">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-text-light dark:text-text-dark">Rush Production</h3>
              <span className="text-xs font-bold text-warning bg-warning/10 px-2 py-0.5 rounded-full">
                +10–25% surcharge
              </span>
            </div>
            <p className="text-3xl font-bold text-warning mb-2">7–10 days</p>
            <p className="text-sm text-muted-light dark:text-muted-dark">
              For urgent orders. Priority production slot, expedited shipping. Lower MOQ applies.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-8">Pricing FAQ</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-card-dark"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-text-light dark:text-text-dark font-medium">
                  {item.q}
                  <ChevronDown size={18} className="text-muted-light dark:text-muted-dark group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16 rounded-2xl bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-3">
            Ready for your exact quote?
          </h2>
          <p className="text-muted-light dark:text-muted-dark text-sm mb-6">
            Use our quote tool for an instant estimate — confirmed by our team within 2 hours.
          </p>
          <Link href="/quote">
            <button className="bg-teal hover:bg-teal-dark text-white inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]">
              Get Instant Quote <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
