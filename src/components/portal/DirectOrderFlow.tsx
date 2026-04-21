"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { CatalogItem, ProductVariant } from "@/lib/portal/types";

interface Props {
  item: CatalogItem;
  cancelled?: boolean;
}

export default function DirectOrderFlow({ item, cancelled }: Props) {
  const colorVariants = item.productVariants?.filter((v) => v.type === "color" && v.isAvailable) ?? [];
  const sizeVariants = item.productVariants?.filter((v) => v.type === "size" && v.isAvailable) ?? [];

  const allImages = item.images?.length
    ? [...item.images].sort((a, b) => a.displayOrder - b.displayOrder)
    : item.image ? [{ id: "legacy", url: item.image, isPrimary: true, altText: item.title, itemId: item.id, displayOrder: 0, createdAt: "" }]
    : [];

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(item.moq);
  const [imgIdx, setImgIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleVariant(v: ProductVariant, type: "color" | "size") {
    if (type === "color") {
      setSelectedColors((prev) =>
        prev.includes(v.id) ? prev.filter((x) => x !== v.id) : [...prev, v.id]
      );
    } else {
      setSelectedSizes((prev) =>
        prev.includes(v.id) ? prev.filter((x) => x !== v.id) : [...prev, v.id]
      );
    }
  }

  const unitPrice = (() => {
    if (item.pricingType === "sale" && item.salePrice > 0) return item.salePrice;
    if (item.pricingType === "fixed") return item.minPrice;
    return item.minPrice;
  })();

  const totalPrice = unitPrice * quantity;
  const depositPrice = totalPrice * 0.6;
  const allVariantIds = [...selectedColors, ...selectedSizes];
  const currentImg = allImages[imgIdx];

  async function handleCheckout() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/portal/orders/direct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          catalogItemId: item.id,
          variantIds: allVariantIds,
          quantity,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; checkoutUrl?: string | null; message?: string; error?: string; orderId?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed to create order");

      if (json.checkoutUrl) {
        window.location.href = json.checkoutUrl;
      } else {
        // Stripe not configured — redirect to orders with info
        window.location.href = `/portal/orders?order=${json.orderId}`;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      {cancelled && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Your previous checkout was cancelled. Your order was not placed — you can try again below.
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Left — product images */}
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-2xl bg-[#f0f4f9] aspect-square">
            {currentImg ? (
              <Image src={currentImg.url} alt={currentImg.altText || item.title} fill className="object-cover" unoptimized />
            ) : (
              <div className="flex h-full items-center justify-center text-[#9fb0c9] text-sm">No image</div>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImages.map((img, i) => (
                <button key={img.id} onClick={() => setImgIdx(i)}
                  className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${i === imgIdx ? "border-[#0f766e]" : "border-transparent"}`}>
                  <Image src={img.url} alt={img.altText || ""} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — order form */}
        <div className="space-y-6">
          <div>
            <p className="text-[13px] text-[#73839b]">{item.category}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#10233f]">{item.title}</h1>
            {item.description && (
              <p className="mt-2 text-sm text-[#5f7087] leading-relaxed">{item.description}</p>
            )}
          </div>

          {/* Pricing */}
          <div className="rounded-xl border border-[#dbe5f1] bg-[#f7fbff] p-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#10233f]">
                {unitPrice > 0 ? `$${unitPrice.toFixed(2)}` : "POA"}
              </span>
              {item.pricingType === "sale" && item.compareAtPrice > unitPrice && (
                <span className="text-[15px] text-[#9fb0c9] line-through">${item.compareAtPrice.toFixed(2)}</span>
              )}
              {item.pricingType === "range" && item.maxPrice > item.minPrice && (
                <span className="text-sm text-[#73839b]">– ${item.maxPrice.toFixed(2)} per unit</span>
              )}
            </div>
            <p className="mt-1 text-[12px] text-[#73839b]">
              MOQ: {item.moq} units · {item.leadTimeLabel || `${item.leadTimeDays} days lead time`}
            </p>
          </div>

          {/* Color variants */}
          {colorVariants.length > 0 && (
            <div>
              <p className="mb-2 text-[13px] font-semibold text-[#10233f]">Colours</p>
              <div className="flex flex-wrap gap-2">
                {colorVariants.map((v) => (
                  <button key={v.id} onClick={() => toggleVariant(v, "color")} title={v.label}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[12px] transition-colors ${selectedColors.includes(v.id) ? "border-[#0f766e] bg-[#f0fdfa] text-[#0f766e]" : "border-[#dbe5f1] text-[#5f7087] hover:border-[#0f766e]"}`}>
                    {v.value && <span className="h-3 w-3 rounded-full border border-[#e2e8f0]" style={{ backgroundColor: v.value }} />}
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size variants */}
          {sizeVariants.length > 0 && (
            <div>
              <p className="mb-2 text-[13px] font-semibold text-[#10233f]">Sizes</p>
              <div className="flex flex-wrap gap-2">
                {sizeVariants.map((v) => (
                  <button key={v.id} onClick={() => toggleVariant(v, "size")}
                    className={`rounded-xl border px-4 py-2 text-[13px] font-medium transition-colors ${selectedSizes.includes(v.id) ? "border-[#0f766e] bg-[#f0fdfa] text-[#0f766e]" : "border-[#dbe5f1] text-[#5f7087] hover:border-[#0f766e]"}`}>
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#10233f]">
              Quantity <span className="font-normal text-[#73839b]">(min {item.moq})</span>
            </label>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity((q) => Math.max(item.moq, q - (item.moq >= 100 ? 50 : item.moq >= 10 ? 10 : 1)))}
                className="h-10 w-10 rounded-xl border border-[#dbe5f1] text-lg text-[#5f7087] hover:bg-[#f7fbff]">−</button>
              <input type="number" min={item.moq} value={quantity}
                onChange={(e) => setQuantity(Math.max(item.moq, parseInt(e.target.value) || item.moq))}
                className="h-10 w-24 rounded-xl border border-[#dbe5f1] bg-white px-3 text-center text-sm text-[#10233f] focus:border-[#0f766e] focus:outline-none" />
              <button onClick={() => setQuantity((q) => q + (item.moq >= 100 ? 50 : item.moq >= 10 ? 10 : 1))}
                className="h-10 w-10 rounded-xl border border-[#dbe5f1] text-lg text-[#5f7087] hover:bg-[#f7fbff]">+</button>
            </div>
          </div>

          {/* Order summary */}
          {unitPrice > 0 && (
            <div className="rounded-xl border border-[#dbe5f1] bg-white p-4 space-y-2">
              <div className="flex justify-between text-sm text-[#5f7087]">
                <span>{quantity} units × ${unitPrice.toFixed(2)}</span>
                <span className="font-medium text-[#10233f]">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#5f7087]">
                <span>60% deposit due now</span>
                <span className="font-semibold text-[#10233f]">${depositPrice.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#dbe5f1] pt-2 text-[11px] text-[#73839b]">
                Remaining 40% (${(totalPrice * 0.4).toFixed(2)}) is due before shipment.
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          <button
            onClick={handleCheckout}
            disabled={submitting}
            className="w-full rounded-2xl bg-[#0f766e] py-4 text-[15px] font-semibold text-white shadow-md transition-colors hover:bg-[#0d6460] disabled:opacity-50"
          >
            {submitting ? "Creating order…" : "Proceed to Checkout →"}
          </button>

          <div className="text-center">
            <Link href={`/portal/quotes/new?item=${item.id}`} className="text-[13px] text-[#73839b] hover:text-[#5f7087]">
              Request a Quote instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
