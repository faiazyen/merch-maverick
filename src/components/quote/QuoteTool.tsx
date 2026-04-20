"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const canProceed = () => {
    if (step === 1) return form.category !== "" && form.product !== "";
    if (step === 2) return form.quantity > 0;
    if (step === 3) return form.decoration !== "";
    if (step === 4) return quote?.valid === true;
    if (step === 5) return Boolean(form.name.trim() && form.company.trim() && emailIsValid);
    return false;
  };

  async function handleSubmit() {
    if (!canProceed()) return;
    setLoading(true);
    setApiError("");
    try {
      const response = await fetch("/api/quote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: form.category,
          product: form.product,
          quantity: form.quantity,
          decoration: form.decoration,
          isRush: form.isRush,
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          message: form.message,
          unitPriceMin: quote?.unitPriceMin ?? 0,
          unitPriceMax: quote?.unitPriceMax ?? 0,
          totalMin: quote?.totalMin ?? 0,
          totalMax: quote?.totalMax ?? 0,
          leadTime: quote?.leadTime ?? "",
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Submission failed.");
      setSubmitted(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-xl">
      <div className="border-b border-neutral-100 bg-[#f8faff] px-6 py-4">
        <div className="mb-3 flex items-center justify-between">
          {STEPS.map((s) => (
            <div key={s.num} className="flex items-center gap-1.5">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all",
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
                  "hidden text-xs font-medium sm:block",
                  step === s.num ? "text-[#1e3a6e]" : "text-neutral-400"
                )}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#1e3a6e] to-[#3b6fd4] transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 lg:p-8">
        {step === 1 && (
          <div>
            <h2 className="mb-2 text-2xl font-bold text-[#0c1a2e]">What do you need?</h2>
            <p className="mb-6 text-sm text-neutral-500">
              Select the product category that best fits your order.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(Object.entries(CATEGORIES) as [ProductCategory, (typeof CATEGORIES)[ProductCategory]][]).map(
                ([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => setForm((f) => ({ ...f, category: key, product: "" }))}
                    className={cn(
                      "rounded-xl border-2 p-4 text-left transition-all",
                      form.category === key
                        ? "border-[#2351a4] bg-[#f0f6ff]"
                        : "border-neutral-200 bg-white hover:border-neutral-300"
                    )}
                  >
                    <p className="text-sm font-semibold text-[#0c1a2e]">{cat.label}</p>
                    <p className="mt-1 text-xs text-neutral-400">
                      MOQ {MOQ[key].standard} units (rush: {MOQ[key].rush})
                    </p>
                  </button>
                )
              )}
            </div>

            {form.category && (
              <div>
                <p className="mb-3 text-sm font-semibold text-[#0c1a2e]">Select specific product:</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES[form.category as ProductCategory].products.map((p) => (
                    <button
                      key={p}
                      onClick={() => setForm((f) => ({ ...f, product: p }))}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
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

        {step === 2 && form.category && (
          <div>
            <h2 className="mb-2 text-2xl font-bold text-[#0c1a2e]">How many units?</h2>
            <p className="mb-6 text-sm text-neutral-500">
              Minimum order: {MOQ[form.category as ProductCategory].standard} units (standard) /{" "}
              {MOQ[form.category as ProductCategory].rush} units (rush).
            </p>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-[#0c1a2e]">Quantity</label>
              <input
                type="number"
                min={1}
                value={form.quantity || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quantity: parseInt(e.target.value, 10) || 0 }))
                }
                placeholder={`e.g. ${MOQ[form.category as ProductCategory].standard}`}
                className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 text-lg font-semibold text-[#0c1a2e] transition-colors focus:border-[#2351a4] focus:outline-none"
              />
            </div>

            <p className="mb-3 text-xs text-neutral-400">Quick select:</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {[50, 100, 200, 500, 1000].map((qty) => (
                <button
                  key={qty}
                  onClick={() => setForm((f) => ({ ...f, quantity: qty }))}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                    form.quantity === qty
                      ? "border-[#2351a4] bg-[#2351a4] text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-[#2351a4]"
                  )}
                >
                  {qty} units
                </button>
              ))}
            </div>

            <button
              type="button"
              className={cn(
                "flex w-full cursor-pointer items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
                form.isRush ? "border-[#ea580c] bg-orange-50" : "border-neutral-200 hover:border-orange-200"
              )}
              onClick={() => setForm((f) => ({ ...f, isRush: !f.isRush }))}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all",
                  form.isRush ? "border-[#ea580c] bg-[#ea580c]" : "border-neutral-300"
                )}
              >
                {form.isRush && (
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0c1a2e]">Rush Order (7-10 days)</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  +
                  {form.category
                    ? Math.round(
                        (MOQ[form.category as ProductCategory].rush /
                          MOQ[form.category as ProductCategory].standard) *
                          100 -
                          100
                      )
                    : 15}
                  % surcharge for expedited production
                </p>
              </div>
            </button>

            {form.quantity >= 200 && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3">
                <p className="text-sm font-medium text-green-700">
                  Volume discount applied:{" "}
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

        {step === 3 && (
          <div>
            <h2 className="mb-2 text-2xl font-bold text-[#0c1a2e]">Decoration method?</h2>
            <p className="mb-6 text-sm text-neutral-500">
              How do you want your branding applied to the product?
            </p>

            <div className="space-y-3">
              {DECORATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setForm((f) => ({ ...f, decoration: opt.value }))}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
                    form.decoration === opt.value
                      ? "border-[#2351a4] bg-[#f0f6ff]"
                      : "border-neutral-200 hover:border-neutral-300"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                      form.decoration === opt.value ? "border-[#2351a4] bg-[#2351a4]" : "border-neutral-300"
                    )}
                  >
                    {form.decoration === opt.value && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0c1a2e]">{opt.label}</p>
                    <p className="text-xs text-neutral-400">{opt.desc}</p>
                  </div>
                  {opt.value === "embroidery" && (
                    <span className="ml-auto rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">
                      +EUR 1.50/unit
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && quote && (
          <div>
            <h2 className="mb-2 text-2xl font-bold text-[#0c1a2e]">Your instant quote</h2>
            <p className="mb-6 text-sm text-neutral-500">
              Factory-direct estimate for planning. Final confirmation still happens with our team.
            </p>

            {quote.valid ? (
              <div className="space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-[#0c1a2e] to-[#1e3a6e] p-6 text-white">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="text-sm text-neutral-400">
                        {form.product} x {form.quantity} units
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-300">
                        {form.decoration} · {form.isRush ? "Rush" : "Standard"}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs font-medium",
                        form.isRush
                          ? "border-[#ea580c]/30 bg-[#ea580c]/20 text-orange-300"
                          : "border-[#2351a4]/40 bg-[#2351a4]/30 text-blue-300"
                      )}
                    >
                      {quote.leadTime}
                    </span>
                  </div>
                  <div className="mb-1 text-4xl font-bold">
                    EUR {quote.totalMin.toLocaleString()}-EUR {quote.totalMax.toLocaleString()}
                  </div>
                  <p className="text-sm text-neutral-400">
                    EUR {quote.unitPriceMin}-EUR {quote.unitPriceMax} per unit
                  </p>
                </div>

                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <p className="mb-2 text-sm font-semibold text-green-700">vs. Distributor pricing</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-neutral-500">Distributor would charge:</p>
                      <p className="text-lg font-bold text-neutral-400 line-through">
                        EUR {quote.distributorTotalMin.toLocaleString()}-EUR {quote.distributorTotalMax.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-green-600">Your savings:</p>
                      <p className="text-2xl font-bold text-green-700">~EUR {quote.savings.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Lead Time", value: quote.leadTime },
                    { label: "Min. Order", value: `${quote.moq} units` },
                    { label: "Deposit", value: "60% on confirmation" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-neutral-50 p-3 text-center">
                      <p className="text-xs text-neutral-400">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-[#0c1a2e]">{item.value}</p>
                    </div>
                  ))}
                </div>

                <p className="text-center text-xs text-neutral-400">
                  Factory-direct estimate. Final pricing confirmed by our production team.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
                <p className="font-semibold text-amber-800">{quote.errorMessage}</p>
                <Button variant="outline" size="sm" className="mt-3" onClick={() => setStep(2)}>
                  Adjust quantity
                </Button>
              </div>
            )}
          </div>
        )}

        {submitted && (
          <div className="rounded-2xl bg-[#eaf7ef] border border-green-200 p-8 text-center">
            <CheckCircle2 size={36} className="mx-auto text-[#2d8f59]" />
            <h3 className="mt-4 text-xl font-semibold text-[#10233f]">Quote request received</h3>
            <p className="mt-2 text-sm text-[#526883]">
              We have your project details and will follow up at{" "}
              <span className="font-semibold">{form.email}</span> within one business day.
            </p>
            <p className="mt-3 text-xs text-[#73839b]">
              Once we confirm your project, you will receive an invitation to your client portal
              where you can track production milestones, upload assets, and manage approvals.
            </p>
            <a
              href="/"
              className="mt-6 inline-flex rounded-xl bg-[#ffac18] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Back to home
            </a>
          </div>
        )}

        {step === 5 && !submitted && (
          <div>
            <h2 className="mb-2 text-2xl font-bold text-[#0c1a2e]">Submit your quote request</h2>
            <p className="mb-6 text-sm text-neutral-500">
              Add your details below and our production team will follow up within one business day with a confirmed quote and next steps.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { key: "name" as const, label: "Full Name", placeholder: "Jan de Vries", required: true },
                { key: "company" as const, label: "Company Name", placeholder: "Hotel Group BV", required: true },
                { key: "email" as const, label: "Business Email", placeholder: "jan@company.com", required: true },
                { key: "phone" as const, label: "Phone (optional)", placeholder: "+31 6 00 000 000", required: false },
              ].map((field) => (
                <div key={field.key}>
                  <label className="mb-1.5 block text-sm font-medium text-[#0c1a2e]">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={field.key === "email" ? "email" : "text"}
                    value={form[field.key]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm transition-colors focus:border-[#2351a4] focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-[#0c1a2e]">
                Additional notes (optional)
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Logo placement, specific colors, sizing breakdown, delivery address..."
                className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-2.5 text-sm transition-colors focus:border-[#2351a4] focus:outline-none"
              />
            </div>

            {form.email && !emailIsValid && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Enter a valid business email to continue.
              </div>
            )}

            {apiError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {apiError}
              </div>
            )}
          </div>
        )}

        {!submitted && (
          <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-6">
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
                disabled={!canProceed() || loading}
                onClick={handleSubmit}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                {loading ? "Submitting..." : "Submit Quote Request"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
