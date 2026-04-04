import { HeroSection } from "@/components/home/HeroSection";
import { BrandsSection } from "@/components/home/BrandsSection";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { FactoriesSection } from "@/components/home/FactoriesSection";
import { VerticalsSection } from "@/components/home/VerticalsSection";
import { TrustSection } from "@/components/home/TrustSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsSection />
      <ProductShowcase />
      <FactoriesSection />
      <VerticalsSection />
      <TrustSection />
      <HowItWorksSection />
      <SocialProofSection />
      <FinalCTASection />
    </>
  );
}
