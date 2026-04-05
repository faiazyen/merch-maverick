import { QuoteTool } from "@/components/quote/QuoteTool";
import { Metadata } from "next";
import { Clock, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Instant Quote — Merch Maverick",
  description:
    "Get an instant factory-direct price for your custom merchandise in under 2 minutes. No sales call required.",
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark">
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal font-medium text-sm tracking-widest uppercase">
            AI-Powered Quoting
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mt-3 mb-3 tracking-tight">
            Get your instant quote
          </h1>
          <p className="text-muted-light dark:text-muted-dark">
            Factory-direct pricing. No distributor markups. 30–50% cheaper on average.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mt-5">
            {[
              { Icon: Zap, text: "Instant estimate in 2 minutes" },
              { Icon: Clock, text: "Full quote confirmed within 2 hours" },
              { Icon: Shield, text: "No commitment required" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-muted-light dark:text-muted-dark">
                <Icon size={14} className="text-teal" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QuoteTool />
      </div>
    </div>
  );
}
