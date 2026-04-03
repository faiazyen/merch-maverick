import { Metadata } from "next";
import { Music2 } from "lucide-react";
import { VerticalPage } from "@/components/verticals/VerticalPage";

export const metadata: Metadata = {
  title: "Event & Festival Merchandise — Merch Maverick",
  description:
    "Custom festival merchandise, artist merch, and tour merchandise for European events. Proven track record with Melvin & Gatica Bachata. Factory-direct pricing.",
};

export default function EventsPage() {
  return (
    <VerticalPage
      icon={Music2}
      name="Events"
      tagline="Festival merch that sells out — at margins that make it worthwhile."
      description="Custom-branded festival merchandise, artist apparel, and VIP packages for European events and tours. We've already delivered €20K+ in festival merch — we know what works."
      heroColor="text-purple-400"
      heroBg="bg-gradient-to-br from-[#12081a] via-[#1a0d2e] to-[#0c1a2e]"
      aovRange="€2K–€25K"
      orderFrequency="Event-based"
      products={[
        { name: "Festival T-Shirts (screen print)", moq: "100 units", price: "€5–€9" },
        { name: "Event Hoodies", moq: "100 units", price: "€12–€18" },
        { name: "VIP Merchandise Sets", moq: "50 sets", price: "€30–€65/set" },
        { name: "Branded Tote Bags", moq: "100 units", price: "€3–€6" },
        { name: "Artist Merchandise (full range)", moq: "100 units", price: "€5–€22" },
        { name: "Limited Edition Drops", moq: "50 units", price: "€12–€30" },
        { name: "Event Staff Uniforms", moq: "50 units", price: "€18–€35" },
        { name: "Branded Caps & Accessories", moq: "100 units", price: "€4–€9" },
      ]}
      painPoints={[
        "Merchandise arrives late — after the event or at the last minute with no time for issues",
        "Local print shops can't handle event scale: 1,000+ units with consistent quality",
        "Margins destroyed by distributor pricing — you're left with 15–25% on €30 hoodies",
        "No flexibility for last-minute design changes or size distribution adjustments",
        "VIP packages require coordination with 3–4 vendors — a logistical nightmare pre-event",
      ]}
      whyUs={[
        "Proven track record: €20,000–€30,000 in bachata festival merchandise fulfilled in 2025",
        "Rush production available (7–10 days) for tight event timelines",
        "High-margin pricing: sell a €25 hoodie you sourced for €12–€14 and keep 50%+",
        "VIP bundles assembled at factory — hoodie + tote + exclusive item shipped as one kit",
        "AI-generated mockups show you exactly what the merch will look like — before you commit",
        "Post-event inventory management: leftover stock stored in EU warehouse for next event",
      ]}
      testimonial={{
        quote:
          "We've been using Merch Maverick since 2025 for our bachata festival merchandise. The quality is consistently great, the turnaround is fast, and the communication is excellent. Our dancers and attendees love the merch.",
        name: "Melvin de la Cruz",
        role: "Event Director",
        company: "Melvin & Gatica Bachata",
        result: "€20K+ delivered",
      }}
    />
  );
}
