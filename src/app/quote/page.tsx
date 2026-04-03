import { QuoteTool } from "@/components/quote/QuoteTool";
import { Metadata } from "next";
import { Clock, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Instant Quote — Merch Maverick",
  description:
    "Get an instant factory-direct price for your custom merchandise in under 2 minutes. No sales call required.",
};

const trustPills = [
  { icon: Zap, text: "Instant estimate in 2 minutes" },
  { icon: Clock, text: "Full quote confirmed within 2 hours" },
  { icon: Shield, text: "No commitment required" },
];

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-[#f8faff] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[#2351a4] font-semibold text-sm tracking-wider uppercase">
            AI-Powered Quoting
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0c1a2e] mt-2 mb-3">
            Get your instant quote
          </h1>
          <p className="text-neutral-500">
            Factory-direct pricing. No distributor markups. 30–50% cheaper on average.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {trustPills.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-neutral-500">
                <Icon size={14} className="text-[#2351a4]" />
                {text}
              </div>
            ))}
          </div>
        </div>

        <QuoteTool />
      </div>
    </div>
  );
}
