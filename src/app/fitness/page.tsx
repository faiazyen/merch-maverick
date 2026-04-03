import { Metadata } from "next";
import { Dumbbell } from "lucide-react";
import { VerticalPage } from "@/components/verticals/VerticalPage";

export const metadata: Metadata = {
  title: "Gym & Fitness Branded Apparel — Merch Maverick",
  description:
    "Custom branded gym wear, staff uniforms, and retail merchandise for gyms and fitness studios. Factory-direct from Bangladesh, 30–50% cheaper.",
};

export default function FitnessPage() {
  return (
    <VerticalPage
      icon={Dumbbell}
      name="Fitness"
      tagline="Build your gym brand with premium apparel at factory-direct prices."
      description="Custom-branded activewear, staff uniforms, gym towels, and retail merchandise for gyms and fitness studios across Europe. Sell your own brand — not a reseller's."
      heroColor="text-green-400"
      heroBg="bg-gradient-to-br from-[#0a1a0d] via-[#0f2310] to-[#0c1a2e]"
      aovRange="€1K–€8K"
      orderFrequency="Monthly / Quarterly"
      products={[
        { name: "Branded Gym T-Shirts", moq: "100 units", price: "€5–€9" },
        { name: "Performance Hoodies", moq: "100 units", price: "€12–€18" },
        { name: "Gym Leggings & Shorts", moq: "100 units", price: "€8–€16" },
        { name: "Staff Polo Shirts (embroidered)", moq: "50 units", price: "€10–€18" },
        { name: "Gym Towels (branded)", moq: "200 units", price: "€4–€7" },
        { name: "Resistance Bands (branded)", moq: "100 units", price: "€2–€5" },
        { name: "Equipment Bags", moq: "100 units", price: "€6–€14" },
        { name: "Branded Caps & Beanies", moq: "100 units", price: "€4–€8" },
      ]}
      painPoints={[
        "Paying retail or near-retail prices for staff uniforms from local print shops — with slow turnaround",
        "Retail merchandise (hoodies, tees) priced too high to sell competitively in your gym shop",
        "No consistency across locations — every order looks slightly different due to inconsistent suppliers",
        "Small batch orders are expensive — you can't afford to stock new designs without high MOQs",
        "Members want your branded apparel but your current supplier's pricing makes margins impossible",
      ]}
      whyUs={[
        "Factory-direct pricing means your gym retail merchandise has 60–80% margins instead of 20–30%",
        "Consistent quality and color matching across all orders — same factory, same specs every time",
        "Low rush MOQs (50 units) let you test new designs without over-committing stock",
        "Full-color sublimation printing available for technical activewear — all-over print at no extra complexity",
        "Saved specs in your client portal mean reorders take 60 seconds — not another spec sheet email",
        "Multi-location management: order for all your sites in one transaction, deliver to different addresses",
      ]}
      testimonial={{
        quote:
          "We needed branded gym wear for 3 locations. Merch Maverick gave us a quote in 90 minutes and the mockups looked amazing. Lead time was 4 weeks and everything was perfect. Already reordering for our 4th location.",
        name: "Marco Bianchi",
        role: "Founder",
        company: "FitZone Gyms, Italy",
        result: "€3,200 saved",
      }}
    />
  );
}
