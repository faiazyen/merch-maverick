import { SolutionPageLayout } from "@/components/verticals/SolutionPageLayout";
import { solutionPages } from "@/lib/solutionData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fitness Solutions — Custom Gym Wear & Activewear | Merch Maverick",
  description: "Custom activewear, gym uniforms, and branded fitness merchandise for gyms and fitness brands across Europe and America.",
};

export default function FitnessPage() {
  return <SolutionPageLayout data={solutionPages.fitness} />;
}
