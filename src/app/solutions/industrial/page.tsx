import { SolutionPageLayout } from "@/components/verticals/SolutionPageLayout";
import { solutionPages } from "@/lib/solutionData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Solutions — Custom Workwear & Safety Uniforms | Merch Maverick",
  description: "Durable industrial workwear, hi-vis jackets, and branded uniforms for factories and construction teams across Europe and America.",
};

export default function IndustrialPage() {
  return <SolutionPageLayout data={solutionPages.industrial} />;
}
