import { HeroSection } from "@/components/home/HeroSection";
import { VerticalsSection } from "@/components/home/VerticalsSection";
import { TrustSection } from "@/components/home/TrustSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VerticalsSection />
      <TrustSection />
      <HowItWorksSection />
      <SocialProofSection />
      <FinalCTASection />
    </>
  );
}
