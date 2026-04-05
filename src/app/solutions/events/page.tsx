import { SolutionPageLayout } from "@/components/verticals/SolutionPageLayout";
import { solutionPages } from "@/lib/solutionData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events Solutions — Custom Festival & Event Merchandise | Merch Maverick",
  description: "High-quality event merchandise, festival tees, and crew apparel. Fast turnaround with rush production available.",
};

export default function EventsPage() {
  return <SolutionPageLayout data={solutionPages.events} />;
}
