import Link from "next/link";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FinalCTASection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0c1a2e] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2351a4]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#1e3a6e]/30 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium mb-6">
          <Zap size={12} className="text-[#fb923c]" />
          AI-powered quote in under 2 minutes
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Stop overpaying for merch.
          <br />
          <span className="text-[#3b6fd4]">Get factory-direct pricing today.</span>
        </h2>

        <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">
          Join European businesses already saving 30–50% on their branded merchandise. Get your
          instant quote in 2 minutes — no sales call required.
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link href="/quote">
            <Button variant="accent" size="xl" className="w-full sm:w-auto">
              Get Instant Quote
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/about#how-it-works">
            <Button
              variant="secondary"
              size="xl"
              className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
            >
              Book a Discovery Call
            </Button>
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-400">
          {[
            { icon: Clock, text: "Response within 2 hours" },
            { icon: Zap, text: "No commitment required" },
            { icon: ArrowRight, text: "Free product samples available" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={14} className="text-[#3b6fd4]" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
