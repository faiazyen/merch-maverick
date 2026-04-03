import { Metadata } from "next";
import { Building2 } from "lucide-react";
import { VerticalPage } from "@/components/verticals/VerticalPage";

export const metadata: Metadata = {
  title: "Corporate Branded Merchandise — Merch Maverick",
  description:
    "Custom branded hoodies, polo shirts, onboarding kits, and corporate merchandise for tech and office brands across Europe. Factory-direct pricing.",
};

export default function CorporatePage() {
  return (
    <VerticalPage
      icon={Building2}
      name="Corporate"
      tagline="Branded merch your employees will actually wear."
      description="Premium custom hoodies, polo shirts, onboarding kits, and event merchandise for European companies. Factory-direct quality at 30–50% less than what you're paying now."
      heroColor="text-blue-400"
      heroBg="bg-gradient-to-br from-[#0a0e1a] via-[#0d1530] to-[#0c1a2e]"
      aovRange="€2K–€20K"
      orderFrequency="Quarterly / Event-based"
      products={[
        { name: "Branded Hoodies & Sweatshirts", moq: "100 units", price: "€10–€16" },
        { name: "Polo Shirts (embroidered logo)", moq: "100 units", price: "€7–€12" },
        { name: "Employee Onboarding Kits", moq: "50 sets", price: "€25–€55/set" },
        { name: "Custom Tote Bags", moq: "100 units", price: "€2.50–€5" },
        { name: "Event T-Shirts", moq: "100 units", price: "€4–€8" },
        { name: "Branded Caps", moq: "100 units", price: "€4–€9" },
        { name: "Custom Notebooks & Stationery", moq: "100 units", price: "€3–€8" },
        { name: "Corporate Jackets", moq: "50 units", price: "€22–€45" },
      ]}
      painPoints={[
        "Paying €25–€40 per hoodie through distributors for company merch that costs €10–€16 to produce",
        "Ordering kits from 4 different suppliers — coordination overhead costs more than the products",
        "Event merchandise arrives late or with quality issues, damaging the company's brand perception",
        "No single supplier for both daily office wear and event merchandise — constant switching",
        "Remote-first teams need merchandise shipped to individual addresses, not just one office",
      ]}
      whyUs={[
        "End-to-end kit assembly at factory: hoodies + totes + notebooks shipped as one box per employee",
        "Custom packaging included — branded boxes, tissue paper, insert cards at factory cost",
        "Onboarding kit program: set up once, reorder monthly as your team grows — zero admin overhead",
        "Event batch ordering with multi-address drop shipping across Europe available",
        "Sustainable material options (organic cotton, recycled polyester) for ESG-conscious companies",
        "Dedicated account manager for corporate accounts — not a ticket system",
      ]}
      testimonial={{
        quote:
          "We needed onboarding kits for 150 new hires and custom event merch for our annual conference. Merch Maverick handled everything — the quality was excellent and we saved significantly over our previous vendor.",
        name: "Lena Fischer",
        role: "Head of People & Culture",
        company: "SaaS Startup, Berlin",
        result: "€6,500 saved",
      }}
    />
  );
}
