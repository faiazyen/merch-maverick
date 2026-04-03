import { Metadata } from "next";
import { Utensils } from "lucide-react";
import { VerticalPage } from "@/components/verticals/VerticalPage";

export const metadata: Metadata = {
  title: "Hospitality Uniforms & Textiles — Merch Maverick",
  description:
    "Custom staff uniforms, hotel towels, bathrobes, and table linens for hotels and restaurants. Factory-direct pricing, 30–50% cheaper than suppliers.",
};

export default function HospitalityPage() {
  return (
    <VerticalPage
      icon={Utensils}
      name="Hospitality"
      tagline="Dress your hotel or restaurant for success — at factory-direct prices."
      description="Custom staff uniforms, hotel towels, bathrobes, and table linens delivered directly from our Bangladesh factories to your property. 30–50% cheaper than your current supplier."
      heroColor="text-amber-400"
      heroBg="bg-gradient-to-br from-[#1a1a0e] via-[#2d2a14] to-[#0c1a2e]"
      aovRange="€3K–€15K"
      orderFrequency="Quarterly / Biannual"
      products={[
        { name: "Staff Uniforms (Front of House)", moq: "50 units", price: "€22–€38" },
        { name: "Chef Coats & Kitchen Wear", moq: "50 units", price: "€18–€30" },
        { name: "Restaurant Aprons", moq: "50 units", price: "€8–€15" },
        { name: "Hotel Towels (branded)", moq: "200 units", price: "€4–€7" },
        { name: "Bathrobes (embroidered logo)", moq: "100 units", price: "€18–€35" },
        { name: "Table Linens (custom weave)", moq: "200 units", price: "€5–€12" },
        { name: "Bed Linens (hotel grade)", moq: "200 units", price: "€8–€18" },
        { name: "Branded Caps & Accessories", moq: "100 units", price: "€4–€9" },
      ]}
      painPoints={[
        "Current uniform supplier charges €40–€70 per set — you know the quality doesn't justify the price",
        "Ordering from 3 different suppliers for towels, uniforms, and linens means coordination nightmares",
        "Lead times of 8–12 weeks make seasonal refreshes impossible to plan",
        "No QC visibility — you only discover quality issues when the goods arrive at your property",
        "Seasonal staff turnover requires frequent small top-up orders at full price",
      ]}
      whyUs={[
        "One supplier for all your textile needs: uniforms, towels, bathrobes, linens — all from one factory",
        "Pricing 30–50% below European distributors on every product category",
        "3–5 week standard lead time, 7–10 day rush option for seasonal or urgent restocking",
        "QC photos sent at every production checkpoint — you see your goods before they ship",
        "Client portal for one-click reorders with saved specs, sizing breakdowns, and embroidery files",
        "Recurring contract pricing locks in your rate for quarterly or biannual replenishment orders",
      ]}
      testimonial={{
        quote:
          "We ordered 400 custom staff uniforms and 1,200 hotel towels. The quality exceeded what we were getting from our previous supplier — and we paid nearly half the price. The production tracking portal is brilliant.",
        name: "Sophie van den Berg",
        role: "Operations Manager",
        company: "Hotel Collection NL",
        result: "€8,400 saved",
      }}
    />
  );
}
