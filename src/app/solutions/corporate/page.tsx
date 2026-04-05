import { SolutionPageLayout } from "@/components/verticals/SolutionPageLayout";
import { solutionPages } from "@/lib/solutionData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Solutions — Branded Company Merchandise | Merch Maverick",
  description: "Premium branded hoodies, polo shirts, and corporate merchandise. Factory-direct for tech companies and offices across Europe.",
};

export default function CorporatePage() {
  return <SolutionPageLayout data={solutionPages.corporate} />;
}
