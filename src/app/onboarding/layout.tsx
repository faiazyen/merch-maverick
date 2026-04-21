import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome — The Merch Maverick",
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {children}
    </div>
  );
}
