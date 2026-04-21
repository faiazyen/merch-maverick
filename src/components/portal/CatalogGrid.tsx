"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

import type { CatalogCategory, CatalogItem } from "@/lib/portal/types";

type SortKey = "default" | "name-asc" | "price-asc" | "price-desc" | "moq-asc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Production fit" },
  { value: "name-asc", label: "Name A → Z" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "moq-asc", label: "MOQ: Lowest first" },
];

const LABEL_STYLES: Record<string, string> = {
  "Best Seller": "bg-amber-100 text-amber-800",
  "New": "bg-teal-100 text-teal-800",
  "Eco Friendly": "bg-green-100 text-green-800",
  "Premium Quality": "bg-slate-100 text-slate-700",
};

function PriceDisplay({ item }: { item: CatalogItem }) {
  if (item.pricingType === "sale" && item.salePrice > 0) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-base font-semibold text-[#10233f]">${item.salePrice.toFixed(2)}</span>
        {item.compareAtPrice > item.salePrice && (
          <span className="text-[13px] text-[#9fb0c9] line-through">${item.compareAtPrice.toFixed(2)}</span>
        )}
      </div>
    );
  }
  if (item.pricingType === "fixed") {
    return <span className="text-base font-semibold text-[#10233f]">${item.minPrice.toFixed(2)}</span>;
  }
  if (item.minPrice > 0) {
    return (
      <span className="text-base font-semibold text-[#10233f]">
        ${item.minPrice.toFixed(2)}{item.maxPrice > item.minPrice ? `–$${item.maxPrice.toFixed(2)}` : ""}
      </span>
    );
  }
  return <span className="text-[13px] text-[#73839b]">Request a quote</span>;
}

function ProductCard({ item }: { item: CatalogItem }) {
  const allImages = item.images?.length
    ? [...item.images].sort((a, b) => a.displayOrder - b.displayOrder)
    : item.image ? [{ id: "legacy", url: item.image, isPrimary: true, altText: item.title, itemId: item.id, displayOrder: 0, createdAt: "" }]
    : [];

  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  const colorVariants = item.productVariants?.filter((v) => v.type === "color") ?? [];

  function selectColor(variantValue: string) {
    // Find an image matching the color — fall back to primary
    const matchIdx = allImages.findIndex((img) =>
      img.altText?.toLowerCase().includes(variantValue.toLowerCase().slice(1))
    );
    if (matchIdx !== -1) setImgIdx(matchIdx);
  }

  const currentImg = allImages[imgIdx];
  const labels = item.labels?.length ? item.labels : item.badge ? [item.badge] : [];

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#e8eef7] bg-white shadow-[0_2px_12px_rgba(16,35,63,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(16,35,63,0.10)]">
      {/* Image area */}
      <div
        className="relative aspect-square overflow-hidden bg-[#f0f4f9]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {currentImg ? (
          <Image
            src={currentImg.url}
            alt={currentImg.altText || item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#b8c8d8] text-[13px]">No image</div>
        )}

        {/* Multi-image nav arrows */}
        {allImages.length > 1 && hovered && (
          <>
            <button
              onClick={() => setImgIdx((i) => (i - 1 + allImages.length) % allImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-[#10233f] shadow-md hover:bg-white"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={() => setImgIdx((i) => (i + 1) % allImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-[#10233f] shadow-md hover:bg-white"
              aria-label="Next image"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {allImages.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
              ))}
            </div>
          </>
        )}

        {/* Labels */}
        {labels.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {labels.slice(0, 2).map((lbl) => (
              <span key={lbl} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${LABEL_STYLES[lbl] ?? "bg-[#eff6ff] text-[#2563EB]"}`}>
                {lbl}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <p className="text-[14px] font-semibold leading-snug text-[#10233f] line-clamp-2">{item.title}</p>
        </div>
        <p className="mb-3 text-[12px] text-[#73839b]">{item.category}</p>

        {/* Price */}
        <div className="mb-3">
          <PriceDisplay item={item} />
          {item.moq > 0 && (
            <p className="mt-0.5 text-[11px] text-[#9fb0c9]">MOQ: {item.moq} units</p>
          )}
        </div>

        {/* Color swatches */}
        {colorVariants.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {colorVariants.slice(0, 8).map((v) => (
              <button
                key={v.id}
                onClick={() => v.value && selectColor(v.value)}
                disabled={!v.isAvailable}
                title={v.label}
                className={`h-4 w-4 rounded-full border transition-transform hover:scale-110 ${v.isAvailable ? "opacity-100" : "opacity-30"}`}
                style={{
                  backgroundColor: v.value || "#ccc",
                  borderColor: v.value === "#ffffff" || v.value === "#fff" ? "#e2e8f0" : v.value || "#e2e8f0",
                  boxShadow: "inset 0 0 0 1.5px rgba(0,0,0,0.08)",
                }}
              />
            ))}
            {colorVariants.length > 8 && (
              <span className="text-[11px] text-[#73839b]">+{colorVariants.length - 8}</span>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          {item.supportsDirectOrder && (
            <Link
              href={`/portal/order/${item.id}`}
              className="block rounded-xl bg-[#0f766e] py-2.5 text-center text-[13px] font-semibold text-white transition-colors hover:bg-[#0d6460]"
            >
              Order Now
            </Link>
          )}
          <Link
            href={`/portal/quotes/new?item=${item.id}`}
            className={`block rounded-xl border py-2.5 text-center text-[13px] font-semibold transition-colors ${item.supportsDirectOrder ? "border-[#dbe5f1] text-[#5f7087] hover:bg-[#f7fbff]" : "border-[#0f766e] bg-transparent text-[#0f766e] hover:bg-[#f0fdfa]"}`}
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

interface Props {
  items: CatalogItem[];
  categories: CatalogCategory[];
}

export function CatalogGrid({ items, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeMaterial, setActiveMaterial] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("default");

  const materials = useMemo(
    () => Array.from(new Set(items.map((i) => i.material).filter(Boolean).map((m) => m.split(",")[0].trim()))).sort(),
    [items],
  );

  const filtered = useMemo(() => {
    let result = items;
    if (activeCategory) {
      result = result.filter((i) => i.categoryId === activeCategory || i.category === activeCategory);
    }
    if (activeMaterial) {
      result = result.filter((i) => i.material.toLowerCase().includes(activeMaterial.toLowerCase()));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q) || i.material.toLowerCase().includes(q));
    }
    switch (sortKey) {
      case "name-asc": return [...result].sort((a, b) => a.title.localeCompare(b.title));
      case "price-asc": return [...result].sort((a, b) => (a.salePrice || a.minPrice) - (b.salePrice || b.minPrice));
      case "price-desc": return [...result].sort((a, b) => (b.salePrice || b.minPrice) - (a.salePrice || a.minPrice));
      case "moq-asc": return [...result].sort((a, b) => a.moq - b.moq);
      default: return result;
    }
  }, [items, activeCategory, activeMaterial, searchQuery, sortKey]);

  // Use dynamic categories from DB, fall back to unique category strings
  const categoryFilters = categories.length > 0
    ? categories
    : Array.from(new Set(items.map((i) => i.category))).map((name) => ({ id: name, name, slug: name.toLowerCase(), description: "", displayOrder: 0, isActive: true, icon: "", createdAt: "" }));

  return (
    <div className="space-y-6">
      {/* Search + sort bar */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search products…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 flex-1 min-w-[180px] rounded-xl border border-[#dbe5f1] bg-white px-4 text-sm text-[#10233f] placeholder:text-[#9fb0c9] focus:border-[#0f766e] focus:outline-none"
        />
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="h-10 rounded-xl border border-[#dbe5f1] bg-white px-3 text-sm text-[#5f7087] focus:border-[#0f766e] focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("")}
          className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${!activeCategory ? "bg-[#10233f] text-white" : "border border-[#dbe5f1] bg-white text-[#5f7087] hover:border-[#10233f]"}`}
        >
          All
        </button>
        {categoryFilters.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? "" : cat.id)}
            className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${activeCategory === cat.id ? "bg-[#10233f] text-white" : "border border-[#dbe5f1] bg-white text-[#5f7087] hover:border-[#10233f]"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Material filter */}
      {materials.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {materials.map((mat) => (
            <button
              key={mat}
              onClick={() => setActiveMaterial(activeMaterial === mat ? "" : mat)}
              className={`rounded-full border px-3 py-1 text-[12px] transition-colors ${activeMaterial === mat ? "border-[#0f766e] bg-[#f0fdfa] text-[#0f766e]" : "border-[#dbe5f1] text-[#73839b] hover:border-[#0f766e]"}`}
            >
              {mat}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#dbe5f1] bg-white px-8 py-16 text-center">
          <p className="text-[15px] font-medium text-[#10233f]">No products found</p>
          <p className="mt-1 text-[13px] text-[#73839b]">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      )}

      <p className="text-center text-[12px] text-[#9fb0c9]">
        Showing {filtered.length} of {items.length} product{items.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
