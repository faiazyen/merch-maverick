"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight } from "lucide-react";

import { PortalAssetUploader } from "@/components/portal/PortalAssetUploader";
import {
  CATEGORIES,
  MOQ,
  calculateQuote,
  type DecorationMethod,
  type ProductCategory,
} from "@/lib/pricing";
import type { PortalProfile, QuoteRequest } from "@/lib/portal/types";
import { cn } from "@/lib/utils";

type FormState = {
  category: ProductCategory;
  productName: string;
  quantity: number;
  decorationMethod: DecorationMethod;
  rush: boolean;
  destination: string;
  shippingMethod: string;
  notes: string;
  selectedAssetNames: string[];
};

const STORAGE_KEY = "merch-maverick-portal-quote-draft";

const steps = [
  "Product Selection",
  "Quantity & Tiers",
  "Customization",
  "Asset Upload",
  "Shipping Details",
];

const decorationOptions: DecorationMethod[] = ["embroidery", "screen-print", "dtg", "sublimation"];

function buildInitialState(productName?: string): FormState {
  const initialCategory = "basic-apparel" as ProductCategory;
  const categoryEntry = Object.entries(CATEGORIES).find(([, value]) =>
    productName ? value.products.some((item) => item.toLowerCase().replace(/\s+/g, "-") === productName) : false
  ) as [ProductCategory, (typeof CATEGORIES)[ProductCategory]] | undefined;

  const category = categoryEntry?.[0] ?? initialCategory;
  const resolvedProduct =
    categoryEntry?.[1].products.find((item) => item.toLowerCase().replace(/\s+/g, "-") === productName) ??
    CATEGORIES[category].products[0];

  return {
    category,
    productName: resolvedProduct,
    quantity: MOQ[category].standard,
    decorationMethod: "embroidery",
    rush: false,
    destination: "United States",
    shippingMethod: "Standard Ground",
    notes: "",
    selectedAssetNames: [],
  };
}

export function PortalQuoteConfigurator({
  profile,
  existingQuotes,
  availableAssets,
  initialProductSlug,
}: {
  profile: PortalProfile;
  existingQuotes: QuoteRequest[];
  availableAssets: string[];
  initialProductSlug?: string;
}) {
  const [form, setForm] = useState<FormState>(() => buildInitialState(initialProductSlug));
  const [status, setStatus] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Partial<FormState>;
      setForm((current) => ({ ...current, ...parsed }));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const quote = useMemo(() => {
    return calculateQuote(form.category, form.productName, form.quantity, form.decorationMethod, form.rush);
  }, [form.category, form.productName, form.quantity, form.decorationMethod, form.rush]);

  const activeCategoryProducts = CATEGORIES[form.category].products;

  async function persistQuote(nextStatus: "draft" | "submitted") {
    setIsSaving(true);
    setStatus("");

    const payload = {
      title: `${profile.businessName} ${form.productName} ${nextStatus === "draft" ? "draft" : "estimate"}`,
      category: CATEGORIES[form.category].label,
      productName: form.productName,
      quantity: form.quantity,
      decorationMethod: form.decorationMethod,
      rush: form.rush,
      unitPriceMin: quote.unitPriceMin,
      unitPriceMax: quote.unitPriceMax,
      totalMin: quote.totalMin,
      totalMax: quote.totalMax,
      leadTime: quote.leadTime,
      destination: form.destination,
      shippingMethod: form.shippingMethod,
      notes: form.notes,
      status: nextStatus,
      selectedAssetNames: form.selectedAssetNames,
    };

    try {
      const response = await fetch("/api/portal/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("remote-save-failed");
      }

      setStatus(nextStatus === "draft" ? "Draft saved to your workspace." : "Estimate submitted to your portal workspace.");
    } catch {
      const fallbackKey = `${STORAGE_KEY}:${nextStatus}`;
      const existing = JSON.parse(window.localStorage.getItem(fallbackKey) ?? "[]") as object[];
      existing.unshift({ ...payload, savedAt: new Date().toISOString() });
      window.localStorage.setItem(fallbackKey, JSON.stringify(existing.slice(0, 10)));
      setStatus(
        nextStatus === "draft"
          ? "Draft saved locally in this browser. Connect Supabase tables to sync it everywhere."
          : "Estimate saved locally in this browser. Connect Supabase tables to sync it into the shared CRM."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.26fr_1fr_0.32fr]">
      <aside className="rounded-2xl border border-[#dbe5f1] bg-white p-4 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3 rounded-xl px-3 py-3">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                  index === 0 ? "bg-[#215dbe] text-white" : "bg-[#eef2f7] text-[#627590]"
                )}
              >
                {index === 0 ? <Check size={15} /> : `0${index + 1}`}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">
                  Step {index + 1}
                </p>
                <p className="text-sm font-medium text-[#10233f]">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="space-y-6">
        <div className="rounded-2xl border border-[#dbe5f1] bg-white p-6 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">
                Step 1
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#10233f]">
                Product Selection
              </h2>
            </div>
            <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-semibold text-[#215dbe]">
              {Math.round((1 / steps.length) * 100)}% complete
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(Object.entries(CATEGORIES) as [ProductCategory, (typeof CATEGORIES)[ProductCategory]][]).map(
              ([key, category]) => (
                <button
                  key={key}
                  className={cn(
                    "rounded-2xl border px-4 py-4 text-left transition-all",
                    form.category === key
                      ? "border-[#215dbe] bg-[#edf4ff]"
                      : "border-[#dbe5f1] bg-[#fbfdff] hover:border-[#c2d6f0]"
                  )}
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      category: key,
                      productName: category.products[0],
                      quantity: MOQ[key].standard,
                    }))
                  }
                  type="button"
                >
                  <p className="text-sm font-semibold text-[#10233f]">{category.label}</p>
                  <p className="mt-1 text-xs text-[#73839b]">MOQ {MOQ[key].standard} units</p>
                </button>
              )
            )}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {activeCategoryProducts.map((product) => (
              <button
                key={product}
                className={cn(
                  "rounded-2xl border px-4 py-4 text-left transition-all",
                  form.productName === product
                    ? "border-[#215dbe] bg-white shadow-[0_8px_24px_rgba(33,93,190,0.12)]"
                    : "border-[#dbe5f1] bg-[#fbfdff] hover:border-[#c2d6f0]"
                )}
                onClick={() => setForm((current) => ({ ...current, productName: product }))}
                type="button"
              >
                <div className="mb-4 aspect-[4/3] rounded-xl bg-[#e9eff8]" />
                <p className="text-sm font-semibold text-[#10233f]">{product}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ConfigBlock
            title="Quantity & Volume"
            description="Set order size and switch between standard and rush production."
          >
            <input
              className="w-full rounded-xl border border-[#dbe5f1] bg-[#fbfdff] px-4 py-3 text-sm text-[#10233f] outline-none"
              min={1}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  quantity: Number.parseInt(event.target.value, 10) || 0,
                }))
              }
              type="number"
              value={form.quantity}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {[MOQ[form.category].standard, 250, 500, 1000].map((quantity) => (
                <button
                  key={quantity}
                  className={cn(
                    "rounded-xl px-3 py-2 text-xs font-semibold",
                    form.quantity === quantity ? "bg-[#215dbe] text-white" : "bg-[#eef2f7] text-[#5f7087]"
                  )}
                  onClick={() => setForm((current) => ({ ...current, quantity }))}
                  type="button"
                >
                  {quantity}
                </button>
              ))}
            </div>
            <button
              className={cn(
                "mt-4 inline-flex rounded-xl px-4 py-2.5 text-sm font-semibold",
                form.rush ? "bg-[#ffe9d4] text-[#bf6b00]" : "bg-[#eef2f7] text-[#5f7087]"
              )}
              onClick={() => setForm((current) => ({ ...current, rush: !current.rush }))}
              type="button"
            >
              {form.rush ? "Rush production enabled" : "Enable rush production"}
            </button>
          </ConfigBlock>

          <ConfigBlock
            title="Customization"
            description="Choose the decoration method that fits the item and branding system."
          >
            <div className="space-y-2">
              {decorationOptions.map((option) => (
                <button
                  key={option}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all",
                    form.decorationMethod === option
                      ? "border-[#215dbe] bg-[#edf4ff] text-[#215dbe]"
                      : "border-[#dbe5f1] bg-[#fbfdff] text-[#5f7087]"
                  )}
                  onClick={() => setForm((current) => ({ ...current, decorationMethod: option }))}
                  type="button"
                >
                  <span className="font-semibold capitalize">{option.replace("-", " ")}</span>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </ConfigBlock>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ConfigBlock
            title="Logo & Brand Assets"
            description="Attach existing files or note what needs to be uploaded for production-ready review."
          >
            <PortalAssetUploader
              onUploaded={(asset) =>
                setForm((current) => ({
                  ...current,
                  selectedAssetNames: current.selectedAssetNames.includes(asset.name)
                    ? current.selectedAssetNames
                    : [...current.selectedAssetNames, asset.name],
                }))
              }
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {availableAssets.map((assetName) => {
                const selected = form.selectedAssetNames.includes(assetName);
                return (
                  <button
                    key={assetName}
                    className={cn(
                      "rounded-full px-3 py-2 text-xs font-semibold",
                      selected ? "bg-[#215dbe] text-white" : "bg-[#eef2f7] text-[#5f7087]"
                    )}
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        selectedAssetNames: selected
                          ? current.selectedAssetNames.filter((item) => item !== assetName)
                          : [...current.selectedAssetNames, assetName],
                      }))
                    }
                    type="button"
                  >
                    {assetName}
                  </button>
                );
              })}
            </div>
          </ConfigBlock>

          <ConfigBlock
            title="Logistics & Delivery"
            description="Capture the destination and shipping preference for the saved estimate."
          >
            <div className="space-y-3">
              <input
                className="w-full rounded-xl border border-[#dbe5f1] bg-[#fbfdff] px-4 py-3 text-sm text-[#10233f] outline-none"
                onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))}
                placeholder="Destination country"
                type="text"
                value={form.destination}
              />
              <select
                className="w-full rounded-xl border border-[#dbe5f1] bg-[#fbfdff] px-4 py-3 text-sm text-[#10233f] outline-none"
                onChange={(event) =>
                  setForm((current) => ({ ...current, shippingMethod: event.target.value }))
                }
                value={form.shippingMethod}
              >
                <option>Standard Ground</option>
                <option>Maverick Express</option>
                <option>Air Freight Priority</option>
              </select>
              <textarea
                className="min-h-[120px] w-full rounded-xl border border-[#dbe5f1] bg-[#fbfdff] px-4 py-3 text-sm text-[#10233f] outline-none"
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                placeholder="Packaging notes, sizing split, brand constraints, or approval requirements..."
                value={form.notes}
              />
            </div>
          </ConfigBlock>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">Quote Summary</p>
          <div className="mt-4 space-y-3 text-sm text-[#5f7087]">
            <SummaryRow label="Base item" value={form.productName} />
            <SummaryRow label="Units" value={`${form.quantity}`} />
            <SummaryRow label="Decoration" value={form.decorationMethod.replace("-", " ")} />
            <SummaryRow label="Delivery" value={form.destination} />
            <SummaryRow label="Shipping" value={form.shippingMethod} />
          </div>

          <div className="mt-6 rounded-2xl bg-[#fff5e4] px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c67f00]">Estimated Total</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#d27e00]">
              ${quote.totalMin.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-[#7d6f4f]">
              to ${quote.totalMax.toLocaleString()} · {quote.leadTime}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              className="inline-flex w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,#195fd4_0%,#2d7cff_100%)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              disabled={!quote.valid || isSaving}
              onClick={() => persistQuote("submitted")}
              type="button"
            >
              {isSaving ? "Saving..." : "Submit estimate"}
            </button>
            <button
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#dbe5f1] bg-white px-4 py-3 text-sm font-semibold text-[#526883]"
              disabled={!quote.valid || isSaving}
              onClick={() => persistQuote("draft")}
              type="button"
            >
              Save draft
            </button>
          </div>

          {status ? (
            <div className="mt-4 rounded-xl bg-[#eef6ff] px-4 py-3 text-sm text-[#215dbe]">{status}</div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">Recent Estimates</p>
          <div className="mt-4 space-y-3">
            {existingQuotes.slice(0, 4).map((quoteItem) => (
              <div key={quoteItem.id} className="rounded-2xl bg-[#f6f9fd] px-4 py-3">
                <p className="text-sm font-semibold text-[#10233f]">{quoteItem.title}</p>
                <p className="mt-1 text-xs text-[#73839b]">
                  {quoteItem.productName} · ${quoteItem.totalMin.toLocaleString()} - $
                  {quoteItem.totalMax.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

function ConfigBlock({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#dbe5f1] bg-white p-6 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
      <h3 className="text-lg font-semibold text-[#10233f]">{title}</h3>
      <p className="mt-2 text-sm text-[#73839b]">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[#73839b]">{label}</span>
      <span className="text-right font-semibold text-[#10233f]">{value}</span>
    </div>
  );
}
