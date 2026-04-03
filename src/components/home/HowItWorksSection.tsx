import { MessageSquare, FileText, Package, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Tell us what you need",
    description:
      "Use our AI quote tool or chat with our assistant. Tell us your product type, quantity, and branding. Get an instant price estimate in under 2 minutes.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Approve your quote & mockup",
    description:
      "Receive a detailed quote with an AI-generated product mockup showing your branding. Review, approve, and submit your 50% deposit to start production.",
  },
  {
    icon: Package,
    step: "03",
    title: "Track production in real time",
    description:
      "Log in to your client portal to watch your order progress through each production stage. QC photos sent at every checkpoint — full transparency.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Delivered to your door",
    description:
      "Your order ships from Bangladesh directly to your European address. EU customs handled. You'll receive tracking and delivery confirmation automatically.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Steps */}
          <div>
            <span className="text-[#2351a4] font-semibold text-sm tracking-wider uppercase">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0c1a2e] mt-3 mb-10">
              From quote to delivery
              <br />
              in 4 simple steps
            </h2>

            <div className="relative">
              {/* Connector line */}
              <div className="absolute left-5 top-8 bottom-8 w-px bg-gradient-to-b from-[#2351a4] to-[#dce9fc]" />

              <div className="space-y-8">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {/* Icon */}
                    <div className="relative z-10 w-10 h-10 rounded-xl bg-[#1e3a6e] flex items-center justify-center shrink-0">
                      <step.icon size={17} className="text-white" />
                    </div>
                    {/* Content */}
                    <div className="pb-2">
                      <span className="text-xs font-bold text-[#3b6fd4] tracking-wider uppercase">
                        Step {step.step}
                      </span>
                      <h3 className="font-bold text-[#0c1a2e] text-lg mt-1 mb-2">{step.title}</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Client portal preview card */}
          <div className="bg-[#0c1a2e] rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider">Client Portal</p>
                <h3 className="font-bold text-lg mt-1">Hotel Uniform Order</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#2351a4]/30 border border-[#2351a4]/40 text-[#6a99e8] text-xs font-medium">
                In Production
              </span>
            </div>

            {/* Production tracker */}
            <div className="space-y-3 mb-6">
              {[
                { label: "Order Confirmed", done: true, date: "Mar 15" },
                { label: "Materials Sourced", done: true, date: "Mar 18" },
                { label: "Production Started", done: true, date: "Mar 22" },
                { label: "Quality Control", done: false, date: "Mar 28" },
                { label: "Shipping to EU", done: false, date: "Apr 2" },
              ].map((stage, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      stage.done
                        ? "border-[#2351a4] bg-[#2351a4]"
                        : "border-white/20 bg-transparent"
                    }`}
                  >
                    {stage.done && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className={`text-sm ${stage.done ? "text-white" : "text-neutral-500"}`}>
                      {stage.label}
                    </span>
                    <span className="text-xs text-neutral-500">{stage.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="border-t border-white/10 pt-4 grid grid-cols-3 gap-3 text-center mb-6">
              {[
                { val: "250", label: "Uniforms" },
                { val: "€6,200", label: "Order Value" },
                { val: "8 days", label: "Est. Arrival" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-bold text-white">{item.val}</p>
                  <p className="text-xs text-neutral-500">{item.label}</p>
                </div>
              ))}
            </div>

            <Link href="/portal">
              <Button
                variant="secondary"
                size="sm"
                className="w-full border-white/20 text-white bg-white/10 hover:bg-white/20"
              >
                Access Client Portal →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
