"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  MOQ,
  calculateQuote,
  type ProductCategory,
  type DecorationMethod,
} from "@/lib/pricing";

type Step = 1 | 2 | 3 | 4 | 5;

interface FormData {
  category: ProductCategory | "";
  product: string;
  quantity: number;
  decoration: DecorationMethod | "";
  isRush: boolean;
  // Contact
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

const DECORATION_OPTIONS: { value: DecorationMethod; label: string; desc: string }[] = [
  { value: "screen-print", label: "Screen Print", desc: "Best for simple logos, bold colors" },
  { value: "embroidery", label: "Embroidery", desc: "Premium finish, ideal for uniforms" },
  { value: "dtg", label: "Direct to Garment", desc: "Full-color detail, photographic quality" },
  { value: "sublimation", label: "Sublimation", desc: "All-over print, activewear & sportswear" },
];

const STEPS = [
  { label: "Product", num: 1 },
  { label: "Quantity", num: 2 },
  { label: "Decoration", num: 3 },
  { label: "Quote", num: 4 },
  { label: "Contact", num: 5 },
];

export function QuoteTool() {
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<FormData>({
    category: "",
    product: "",
    quantity: 0,
    decoration: "",
    isRush: false,
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const quote =
    form.category && form.product && form.quantity && form.decoration
      ? calculateQuote(
          form.category as ProductCategory,
          form.product,
          form.quantity,
          form.decoration as DecorationMethod,
          form.isRush
        )
      : null;

  const canProceed = () => {
    if (step === 1) return form.category !== "" && form.product !== "";
    if (step === 2) return form.quantity > 0;
    if (step === 3) return form.decoration !== "";
    if (step === 4) return quote?.valid === true;
    if (step === 5) return form.name && form.email && form.company;
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return <SuccessState form={form} quote={quote} />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
      {/* Progress bar */}
      <div className="bg-[#f8faff] border-b border-neutral-100 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s) => (
            <div key={s.num} className="flex items-center gap-1.5">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step > s.num
                    ? "bg-[#1e3a6e] text-white"
                    : step === s.num
                    ? "bg-[#2351a4] text-white ring-4 ring-[#2351a4]/20"
                    : "bg-neutral-200 text-neutral-400"
                )}
              >
                {step > s.num ? <CheckCircle2 size={14} /> : s.num}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block",
                  step === s.num ? "text-[#1e3a6e]" : "text-neutral-400"
                )}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1e3a6e] to-[#3b6fd4] rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 lg:p-8">
        {/* Step 1: Product Category */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-[#0c1a2e] mb-2">What do you need?</h2>
            <p className="text-neutral-500 text-sm mb-6">Select the product category that best fits your order.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {(Object.entries(CATEGORIES) as [ProductCategory, (typeof CATEGORIES)[ProductCategory]][]).map(
                ([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => setForm((f) => ({ ...f, category: key, product: "" }))}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all",
                      form.category === key
                        ? "border-[#2351a4] bg-[#f0f6ff]"
                        : "border-neutral-200 hover:border-neutral-300 bg-white"
                    )}
                  >
                    <p className="font-semibold text-[#0c1a2e] text-sm">{cat.label}</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      MOQ {MOQ[key].standard} units (rush: {MOQ[key].rush})
                    </p>
                  </button>
                )
              )}
            </div>

            {form.category && (
              <div>
                <p className="text-sm font-semibold text-[#0c1a2e] mb-3">Select specific product:</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES[form.category as ProductCategory].products.map((p) => (
                    <button
                      key={p}
                      onClick={() => setForm((f) => ({ ...f, product: p }))}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-sm font-medium transition-all",
                        form.product === p
                          ? "border-[#2351a4] bg-[#2351a4] text-white"
                          : "border-neutral-200 text-neutral-600 hover:border-[#2351a4] hover:text-[#2351a4]"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Quantity */}
        {step === 2 && form.category && (
          <div>
            <h2 className="text-2xl font-bold text-[#0c1a2e] mb-2">How many units?</h2>
            <p className="text-neutral-500 text-sm mb-6">
              Minimum order: {MOQ[form.category as ProductCategory].standard} units (standard) /{" "}
              {MOQ[form.category as ProductCategory].rush} units (rush).
            </p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#0c1a2e] mb-2">Quantity</label>
              <input
                type="number"
                min={1}
                value={form.quantity || ""}
                onChange={(e) => setForm((f) => ({ ...f, quantity: parseInt(e.target.value) || 0 }))}
                placeholder={`e.g. ${MOQ[form.category as ProductCategory].standard}`}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#2351a4] focus:outline-none text-lg font-semibold text-[#0c1a2e] transition-colors"
              />
            </div>

            {/* Quick select buttons */}
            <p className="text-xs text-neutral-400 mb-3">Quick select:</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {[50, 100, 200, 500, 1000].map((qty) => (
                <button
                  key={qty}
                  onClick={() => setForm((f) => ({ ...f, quantity: qty }))}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                    form.quantity === qty
                      ? "border-[#2351a4] bg-[#2351a4] text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-[#2351a4]"
                  )}
                >
                  {qty} units
                </button>
              ))}
            </div>

            {/* Rush option */}
            <div
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                form.isRush ? "border-[#ea580c] bg-orange-50" : "border-neutral-200 hover:border-orange-200"
              )}
              onClick={() => setForm((f) => ({ ...f, isRush: !f.isRush }))}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all",
                  form.isRush ? "border-[#ea580c] bg-[#ea580c]" : "border-neutral-300"
                )}
              >
                {form.isRush && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-semibold text-sm text-[#0c1a2e]">Rush Order (7–10 days)</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  +{form.category ? Math.round((MOQ[form.category as ProductCategory].rush / MOQ[form.category as ProductCategory].standard) * 100 - 100) : 15}% surcharge for expedited production
                </p>
              </div>
            </div>

            {/* Volume discount info */}
            {form.quantity >= 200 && (
              <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                <p className="text-sm text-green-700 font-medium">
                  🎉 Volume discount applied:{" "}
                  {form.quantity >= 1000
                    ? "20%"
                    : form.quantity >= 500
                    ? "15%"
                    : form.quantity >= 200
                    ? "10%"
                    : "5%"}{" "}
                  off
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Decoration */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-[#0c1a2e] mb-2">Decoration method?</h2>
            <p className="text-neutral-500 text-sm mb-6">
              How do you want your branding applied to the product?
            </p>

            <div className="space-y-3">
              {DECORATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setForm((f) => ({ ...f, decoration: opt.value }))}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
                    form.decoration === opt.value
                      ? "border-[#2351a4] bg-[#f0f6ff]"
                      : "border-neutral-200 hover:border-neutral-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all",
                      form.decoration === opt.value ? "border-[#2351a4] bg-[#2351a4]" : "border-neutral-300"
                    )}
                  >
                    {form.decoration === opt.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0c1a2e] text-sm">{opt.label}</p>
                    <p className="text-xs text-neutral-400">{opt.desc}</p>
                  </div>
                  {opt.value === "embroidery" && (
                    <span className="ml-auto text-xs px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full font-medium">
                      +€1.50/unit
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Quote Result */}
        {step === 4 && quote && (
          <div>
            <h2 className="text-2xl font-bold text-[#0c1a2e] mb-2">Your instant quote</h2>
            <p className="text-neutral-500 text-sm mb-6">
              Factory-direct pricing — no distributor markup included.
            </p>

            {quote.valid ? (
              <div className="space-y-4">
                {/* Main price card */}
                <div className="p-6 bg-gradient-to-br from-[#0c1a2e] to-[#1e3a6e] rounded-2xl text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-neutral-400 text-sm">{form.product} × {form.quantity} units</p>
                      <p className="text-neutral-300 text-xs mt-0.5">{form.decoration} · {form.isRush ? "Rush" : "Standard"}</p>
                    </div>
                    <span className={cn(
                      "text-xs px-2.5 py-1 rounded-full font-medium",
                      form.isRush ? "bg-[#ea580c]/20 text-orange-300 border border-[#ea580c]/30" : "bg-[#2351a4]/30 text-blue-300 border border-[#2351a4]/40"
                    )}>
                      {quote.leadTime}
                    </span>
                  </div>
                  <div className="text-4xl font-bold mb-1">
                    €{quote.totalMin.toLocaleString()}–€{quote.totalMax.toLocaleString()}
                  </div>
                  <p className="text-neutral-400 text-sm">
                    €{quote.unitPriceMin}–€{quote.unitPriceMax} per unit
                  </p>
                </div>

                {/* Comparison */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-sm font-semibold text-green-700 mb-2">vs. Distributor pricing</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-neutral-500">Distributor would charge:</p>
                      <p className="text-lg font-bold text-neutral-400 line-through">
                        €{quote.distributorTotalMin.toLocaleString()}–€{quote.distributorTotalMax.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-green-600">Your savings:</p>
                      <p className="text-2xl font-bold text-green-700">
                        ~€{quote.savings.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Lead Time", value: quote.leadTime },
                    { label: "Min. Order", value: `${quote.moq} units` },
                    { label: "Deposit", value: "50% upfront" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 bg-neutral-50 rounded-xl text-center">
                      <p className="text-xs text-neutral-400">{item.label}</p>
                      <p className="font-semibold text-[#0c1a2e] text-sm mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-neutral-400 text-center">
                  * This is an estimate. Final quote confirmed within 2 hours after you submit your details.
                </p>
              </div>
            ) : (
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-200 text-center">
                <p className="font-semibold text-amber-800">{quote.errorMessage}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setStep(2)}
                >
                  Adjust quantity
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Contact */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold text-[#0c1a2e] mb-2">Get your full quote</h2>
            <p className="text-neutral-500 text-sm mb-6">
              We&apos;ll confirm your detailed quote and send product mockups within 2 hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "name" as const, label: "Full Name", placeholder: "Jan de Vries", required: true },
                { key: "company" as const, label: "Company Name", placeholder: "Hotel Group BV", required: true },
                { key: "email" as const, label: "Business Email", placeholder: "jan@company.com", required: true },
                { key: "phone" as const, label: "Phone (optional)", placeholder: "+31 6 00 000 000", required: false },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-[#0c1a2e] mb-1.5">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={field.key === "email" ? "email" : "text"}
                    value={form[field.key]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-[#2351a4] focus:outline-none text-sm transition-colors"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-[#0c1a2e] mb-1.5">
                Additional notes (optional)
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Logo placement, specific colors, sizing breakdown, delivery address..."
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-[#2351a4] focus:outline-none text-sm resize-none transition-colors"
              />
            </div>

            <p className="text-xs text-neutral-400 mt-4">
              Your information is kept confidential and will never be shared with third parties.
              We&apos;ll respond within 2 business hours.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
          <Button
            variant="ghost"
            size="md"
            onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
            className={step === 1 ? "invisible" : ""}
          >
            <ArrowLeft size={16} /> Back
          </Button>

          {step < 5 ? (
            <Button
              variant="primary"
              size="lg"
              disabled={!canProceed()}
              onClick={() => setStep((s) => ((s + 1) as Step))}
            >
              Continue <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              variant="accent"
              size="lg"
              disabled={!canProceed() || submitting}
              onClick={handleSubmit}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Get My Full Quote <ArrowRight size={16} />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessState({
  form,
  quote,
}: {
  form: FormData;
  quote: ReturnType<typeof calculateQuote> | null;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 size={32} className="text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-[#0c1a2e] mb-2">Quote request received!</h2>
      <p className="text-neutral-500 mb-6">
        Hi {form.name}, we&apos;ll confirm your detailed quote and send product mockups to{" "}
        <strong>{form.email}</strong> within 2 hours.
      </p>

      {quote?.valid && (
        <div className="bg-[#f0f6ff] rounded-xl p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-[#0c1a2e] mb-2">Quote Summary</p>
          <div className="space-y-1 text-sm text-neutral-600">
            <p>{form.product} × {form.quantity} units</p>
            <p className="text-xl font-bold text-[#1e3a6e]">
              €{quote.totalMin.toLocaleString()}–€{quote.totalMax.toLocaleString()}
            </p>
            <p className="text-green-600 font-medium">~€{quote.savings.toLocaleString()} saved vs. distributors</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="primary" size="md">
          <Download size={15} /> Download Quote PDF
        </Button>
        <Button variant="outline" size="md">
          <Calendar size={15} /> Book a Discovery Call
        </Button>
      </div>
    </div>
  );
}
