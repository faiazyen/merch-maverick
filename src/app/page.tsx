import { HeroSection } from "@/components/home/HeroSection";
import { BrandsSection } from "@/components/home/BrandsSection";
import { FounderStorySection } from "@/components/home/FounderStorySection";
import { FactoriesSection } from "@/components/home/FactoriesSection";
import { VerticalsSection } from "@/components/home/VerticalsSection";
import { TrustSection } from "@/components/home/TrustSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PricingComparisonSection } from "@/components/home/PricingComparisonSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { ClientPortalSection } from "@/components/home/ClientPortalSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — 3D product showcase + messaging */}
      <HeroSection />
      {/* Brand trust strip */}
      <BrandsSection />
      {/* Founder story */}
      <FounderStorySection />
      {/* 2. Factory — Production transparency */}
      <FactoriesSection />
      {/* 3. Industry Solutions — 6 vertical cards */}
      <VerticalsSection />
      {/* 4. Why Choose Us — 5 competitive advantages */}
      <TrustSection />
      {/* 5. How It Works — 4-step process */}
      <HowItWorksSection />
      {/* 6. Pricing Comparison — Distributor vs. Us */}
      <PricingComparisonSection />
      {/* 7. Client Success Stories — Testimonials */}
      <SocialProofSection />
      {/* 8. Client Portal Preview — Dashboard mockup */}
      <ClientPortalSection />
      {/* 9. Final CTA — Get instant quote */}
      <FinalCTASection />
      {/* 10. Footer — handled in layout */}
    </>
  );
}
