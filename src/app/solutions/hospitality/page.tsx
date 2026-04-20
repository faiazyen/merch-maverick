import { SolutionPageLayout } from "@/components/verticals/SolutionPageLayout";
import { solutionPages } from "@/lib/solutionData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospitality Solutions — Custom Hotel & Restaurant Uniforms | The Merch Maverick",
  description: "Premium custom uniforms, towels, and branded merchandise for hotels and restaurants. Factory-direct, 30–50% cheaper than distributors.",
};

export default function HospitalityPage() {
  return <SolutionPageLayout data={solutionPages.hospitality} />;
}
