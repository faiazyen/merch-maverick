import { SolutionPageLayout } from "@/components/verticals/SolutionPageLayout";
import { solutionPages } from "@/lib/solutionData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Influencers & Artists — Custom Merch for Creators | The Merch Maverick",
  description: "One-stop merch solution for musicians, artists, and content creators. Design, production, and logistics — we handle everything.",
};

export default function InfluencersArtistsPage() {
  return <SolutionPageLayout data={solutionPages["influencers-artists"]} />;
}
