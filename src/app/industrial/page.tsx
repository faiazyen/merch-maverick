import { Metadata } from "next";
import { HardHat } from "lucide-react";
import { VerticalPage } from "@/components/verticals/VerticalPage";

export const metadata: Metadata = {
  title: "Industrial Workwear & Uniforms — Merch Maverick",
  description:
    "Custom workwear, safety vests, coveralls, and branded PPE for factories and industrial companies across Europe. Factory-direct, bulk pricing.",
};

export default function IndustrialPage() {
  return (
    <VerticalPage
      icon={HardHat}
      name="Industrial"
      tagline="Heavy-duty workwear built to last, priced to scale."
      description="Custom work uniforms, safety vests, coveralls, and branded PPE for European industrial companies. Institutional-grade durability at factory-direct prices."
      heroColor="text-orange-400"
      heroBg="bg-gradient-to-br from-[#1a0e0a] via-[#2d1a0d] to-[#0c1a2e]"
      aovRange="€5K–€30K"
      orderFrequency="Biannual / Annual"
      products={[
        { name: "Work Uniforms (sets)", moq: "50 sets", price: "€22–€38/set" },
        { name: "High-Vis Safety Vests", moq: "50 units", price: "€8–€15" },
        { name: "Coveralls & Boiler Suits", moq: "50 units", price: "€18–€35" },
        { name: "Branded Work Caps", moq: "100 units", price: "€4–€8" },
        { name: "Work Trousers & Cargo Pants", moq: "50 units", price: "€14–€22" },
        { name: "Fleece Jackets (lined)", moq: "50 units", price: "€18–€30" },
        { name: "Custom PPE (branded gloves, masks)", moq: "100 units", price: "€2–€8" },
        { name: "Steel-Toe Boot Covers", moq: "100 units", price: "€5–€12" },
      ]}
      painPoints={[
        "Annual uniform contracts with distributors that lock you in at high rates with no quality guarantee",
        "Inconsistent sizing across batches — same order, different fit, constant HR complaints",
        "Long procurement cycles through purchasing departments when urgency is needed",
        "No visibility into where your order is — you find out it's delayed when it doesn't arrive",
        "PPE and workwear from different vendors with inconsistent branding across your workforce",
      ]}
      whyUs={[
        "Institutional-grade fabric with durability specs — not consumer-grade material at industrial pricing",
        "Consistent sizing guaranteed: we hold your size spec chart and match it every order",
        "Annual framework contracts with fixed pricing — no surprises when you reorder",
        "Full production visibility via client portal: real-time status and QC checkpoints with photos",
        "Full uniform program management: we track per-employee allocations and flag reorder timing",
        "OEKO-TEX certified fabric options available for health & safety compliance requirements",
      ]}
      testimonial={{
        quote:
          "We source 500+ uniform sets per year for our factory workers. Merch Maverick's pricing was 40% below our previous supplier and the quality is actually better. The tracking portal means our procurement team always knows where the order stands.",
        name: "Jan Kowalski",
        role: "Procurement Director",
        company: "Manufacturing Co., Poland",
        result: "€12,000 saved annually",
      }}
    />
  );
}
