import { SolutionPageLayout } from "@/components/verticals/SolutionPageLayout";
import { solutionPages } from "@/lib/solutionData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Solutions — Branded Company Merchandise | The Merch Maverick",
  description: "Premium branded hoodies, polo shirts, onboarding kits, and corporate merchandise for companies across Europe and America.",
};

export default function CorporatePage() {
  return <SolutionPageLayout data={solutionPages.corporate} />;
}
