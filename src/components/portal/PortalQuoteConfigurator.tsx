"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight } from "lucide-react";

import { PortalAssetUploader } from "@/components/portal/PortalAssetUploader";
import type { BrandAsset, CatalogItem, PortalProfile, QuoteRequest } from "@/lib/portal/types";
import { calculateCatalogQuote, getCatalogDecorationOptions } from "@/lib/portal/workflow";
import { cn } from "@/lib/utils";

type FormState = {
  catalogItemId: string;
  quantity: number;
  decorationMethod: string;
  rush: boolean;
  destination: string;
  shippingMethod: string;
  notes: string;
  selectedAssetIds: string[];
};

const STORAGE_KEY = "merch-maverick-portal-quote-draft";

const steps = [
  "Product Selection",
  "Quantity & Tiers",
  "Decoration & Spec Direction",
  "Asset Upload",
  "Shipping & Ops Notes",
];

function buildInitialState(catalogItems: CatalogItem[], productSlug?: string): FormState {
  const selectedItem =
    catalogItems.find((item) => item.slug === productSlug) ??
    catalogItems[0];

  return {
    catalogItemId: selectedItem?.id ?? "",
    quantity: selectedItem?.moq ?? 50,
    decorationMethod: selectedItem ? getCatalogDecorationOptions(selectedItem)[0] : "embroidery",
    rush: false,
    destination: "United States",
    shippingMethod: "Air Freight Priority",
    notes: "",
    selectedAssetIds: [],
  };
}

export function PortalQuoteConfigurator({
  profile,
  existingQuotes,
  availableAssets,
  catalogItems,
  initialProductSlug,
}: {
  profile: PortalProfile;
  existingQuotes: QuoteRequest[];
  availableAssets: BrandAsset[];
  catalogItems: CatalogItem[];
  initialProductSlug?: string;
}) {
  const [form, setForm] = useState<FormState>(() => buildInitialState(catalogItems, initialProductSlug));
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

  const selectedItem = useMemo(
    () => catalogItems.find((item) => item.id === form.catalogItemId) ?? catalogItems[0],
    [catalogItems, form.catalogItemId]
  );

  const groupedCategories = useMemo(() => {
    return catalogItems.reduce<Record<string, CatalogItem[]>>((acc, item) => {
      acc[item.category] = acc[item.category] ? [...acc[item.category], item] : [item];
      return acc;
    }, {});
  }, [catalogItems]);

  const selectedCategory = selectedItem?.category ?? Object.keys(groupedCategories)[0] ?? "Catalogue";
  const selectedCategoryItems = groupedCategories[selectedCategory] ?? [];
  const decorationOptions = selectedItem ? getCatalogDecorationOptions(selectedItem) : [];
  const quote = selectedItem
    ? calculateCatalogQuote({
        item: selectedItem,
        quantity: form.quantity,
        decorationMethod: form.decorationMethod,
        rush: form.rush,
      })
    : null;

  async function persistQuote(nextStatus: "draft" | "submitted") {
    if (!selectedItem || !quote) {
      return;
    }

    setIsSaving(true);
    setStatus("");

    const payload = {
      catalogItemId: selectedItem.id,
      quantity: form.quantity,
      decorationMethod: form.decorationMethod,
      rush: form.rush,
      destination: form.destination,
      shippingMethod: form.shippingMethod,
      notes: form.notes,
      status: nextStatus,
      selectedAssetIds: form.selectedAssetIds,
    };

    try {
      const response = await fetch("/api/portal/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to save the estimate.");
      }

      setStatus(
        nextStatus === "draft"
          ? "Draft saved to your workspace."
          : "Estimate submitted to your portal workspace."
      );
    } catch (error) {
      const fallbackKey = `${STORAGE_KEY}:${nextStatus}`;
      const existing = JSON.parse(window.localStorage.getItem(fallbackKey) ?? "[]") as object[];
      existing.unshift({ ...payload, savedAt: new Date().toISOString() });
      window.localStorage.setItem(fallbackKey, JSON.stringify(existing.slice(0, 10)));
      setStatus(
        error instanceof Error
          ? `${error.message} Saved locally in this browser as a fallback.`
          : "Estimate saved locally in this browser as a fallback."
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
            {Object.keys(groupedCategories).map((category) => (
              <button
                key={category}
                className={cn(
                  "rounded-2xl border px-4 py-4 text-left transition-all",
                  selectedCategory === category
                    ? "border-[#215dbe] bg-[#edf4ff]"
                    : "border-[#dbe5f1] bg-[#fbfdff] hover:border-[#c2d6f0]"
                )}
                onClick={() => {
                  const nextItem = groupedCategories[category][0];
                  setForm((current) => ({
                    ...current,
                    catalogItemId: nextItem.id,
                    quantity: nextItem.moq,
                    decorationMethod: getCatalogDecorationOptions(nextItem)[0],
                  }));
                }}
                type="button"
              >
                <p className="text-sm font-semibold text-[#10233f]">{category}</p>
                <p className="mt-1 text-xs text-[#73839b]">{groupedCategories[category].length} product options</p>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {selectedCategoryItems.map((item) => (
              <button
                key={item.id}
                className={cn(
                  "rounded-2xl border px-4 py-4 text-left transition-all",
                  form.catalogItemId === item.id
                    ? "border-[#215dbe] bg-white shadow-[0_8px_24px_rgba(33,93,190,0.12)]"
                    : "border-[#dbe5f1] bg-[#fbfdff] hover:border-[#c2d6f0]"
                )}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    catalogItemId: item.id,
                    quantity: Math.max(current.quantity, item.moq),
                    decorationMethod: getCatalogDecorationOptions(item)[0],
                  }))
                }
                type="button"
              >
                <div className="mb-4 aspect-[4/3] rounded-xl bg-[#e9eff8]" />
                <p className="text-sm font-semibold text-[#10233f]">{item.title}</p>
                <p className="mt-1 text-xs text-[#73839b]">{item.sku} · MOQ {item.moq}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ConfigBlock
            title="Quantity & Volume"
            description="Set the benchmark quantity and timing for your base quote before any manual surcharges are reviewed."
          >
            <input
              className="w-full rounded-xl border border-[#dbe5f1] bg-[#fbfdff] px-4 py-3 text-sm text-[#10233f] outline-none"
              min={selectedItem?.moq ?? 1}
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
              {[selectedItem?.moq ?? 50, 250, 500, 1000].map((quantity) => (
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
              {form.rush ? "Rush production enabled" : "Enable rush quote timing"}
            </button>
          </ConfigBlock>

          <ConfigBlock
            title="Customization"
            description="Choose the benchmark decoration method. Special fabrication, GSM upgrades, designer support, and packaging changes can be added in the notes for manual review."
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
            <div className="mt-4 rounded-2xl border border-[#dbe5f1] bg-[#f8fbff] px-4 py-4 text-sm text-[#526883]">
              This quote starts from the catalogue benchmark. If you need heavier GSM, custom fabrication, a 3D design pass, sampling, or paid QC support, describe it below and our team will price it manually.
            </div>
          </ConfigBlock>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ConfigBlock
            title="Logo & Brand Assets"
            description="Attach saved files to the quote so operations can review complete artwork context."
          >
            <PortalAssetUploader
              onUploaded={(asset) =>
                setForm((current) => ({
                  ...current,
                  selectedAssetIds: current.selectedAssetIds.includes(asset.id)
                    ? current.selectedAssetIds
                    : [...current.selectedAssetIds, asset.id],
                }))
              }
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {availableAssets.map((asset) => {
                const selected = form.selectedAssetIds.includes(asset.id);
                return (
                  <button
                    key={asset.id}
                    className={cn(
                      "rounded-full px-3 py-2 text-xs font-semibold",
                      selected ? "bg-[#215dbe] text-white" : "bg-[#eef2f7] text-[#5f7087]"
                    )}
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        selectedAssetIds: selected
                          ? current.selectedAssetIds.filter((item) => item !== asset.id)
                          : [...current.selectedAssetIds, asset.id],
                      }))
                    }
                    type="button"
                  >
                    {asset.name}
                  </button>
                );
              })}
            </div>
          </ConfigBlock>

          <ConfigBlock
            title="Logistics & Delivery"
            description="Capture shipping direction and the operational notes our team needs before they finalize the commercial response."
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
                <option>Air Freight Priority</option>
                <option>Sea Freight</option>
                <option>Need routing advice</option>
              </select>
              <textarea
                className="min-h-[120px] w-full rounded-xl border border-[#dbe5f1] bg-[#fbfdff] px-4 py-3 text-sm text-[#10233f] outline-none"
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                placeholder="Add special requests here: higher GSM, fabric changes, 3D design support, sample approval, paid QC, packaging direction, VAT/shipping notes, or any surcharge-sensitive request..."
                value={form.notes}
              />
            </div>
            <div className="mt-4 rounded-2xl border border-[#dbe5f1] bg-[#f8fbff] px-4 py-4 text-sm text-[#526883]">
              Our team will use these notes to recommend sampling or direct production, confirm air versus sea freight, and flag any surcharge items before the quote is finalized.
            </div>
          </ConfigBlock>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">Quote Summary</p>
          <div className="mt-4 space-y-3 text-sm text-[#5f7087]">
            <SummaryRow label="Business" value={profile.businessName} />
            <SummaryRow label="Base item" value={selectedItem?.title ?? "Select product"} />
            <SummaryRow label="SKU" value={selectedItem?.sku ?? "-"} />
            <SummaryRow label="Material" value={selectedItem?.material ?? "-"} />
            <SummaryRow label="Units" value={`${form.quantity}`} />
            <SummaryRow label="Decoration" value={form.decorationMethod.replace("-", " ")} />
            <SummaryRow label="MOQ benchmark" value={`${selectedItem?.moq ?? "-"}`} />
            <SummaryRow label="Delivery" value={form.destination} />
            <SummaryRow label="Shipping" value={form.shippingMethod} />
          </div>

          <div className="mt-6 rounded-2xl bg-[#fff5e4] px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c67f00]">Estimated Total</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#d27e00]">
              ${quote?.totalMin.toLocaleString() ?? "0"}
            </p>
            <p className="mt-1 text-sm text-[#7d6f4f]">
              to ${quote?.totalMax.toLocaleString() ?? "0"} · {quote?.leadTime ?? "Lead time pending"}
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-[#dbe5f1] bg-[#f8fbff] px-4 py-4 text-sm text-[#526883]">
            {selectedItem?.description}
          </div>

          <div className="mt-4 rounded-2xl border border-[#dbe5f1] bg-white px-4 py-4 text-sm text-[#526883]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">What happens next</p>
            <p className="mt-3 leading-6">
              Your team will review the base benchmark, assess any manual surcharge requests, confirm whether sampling is needed, and advise on air or sea shipping before final approval.
            </p>
            <p className="mt-3 leading-6">
              Standard commercial flow: 60% deposit to release production, remaining 40% before final dispatch.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              className="inline-flex w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,#195fd4_0%,#2d7cff_100%)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              disabled={!selectedItem || !quote || isSaving || form.quantity < (selectedItem?.moq ?? 0)}
              onClick={() => void persistQuote("submitted")}
              type="button"
            >
              {isSaving ? "Saving..." : "Submit estimate"}
            </button>
            <button
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#dbe5f1] bg-white px-4 py-3 text-sm font-semibold text-[#526883]"
              disabled={!selectedItem || !quote || isSaving || form.quantity < (selectedItem?.moq ?? 0)}
              onClick={() => void persistQuote("draft")}
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
  children: ReactNode;
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
