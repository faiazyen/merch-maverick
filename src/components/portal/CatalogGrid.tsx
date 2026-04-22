"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import type { CatalogCategory, CatalogItem } from "@/lib/portal/types";
import { cn } from "@/lib/utils";

type SortKey = "default" | "name-asc" | "price-asc" | "price-desc" | "moq-asc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Production fit" },
  { value: "name-asc", label: "Name A → Z" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "moq-asc", label: "MOQ: Lowest first" },
];

const LABEL_STYLES: Record<string, string> = {
  "Best Seller":      "bg-[#FEF3C7] text-[#92400E]",
  "New":              "bg-[#DCFCE7] text-[#166534]",
  "Eco Friendly":     "bg-[#F0FDF4] text-[#15803D]",
  "Premium Quality":  "bg-[#F3F4F6] text-[#374151]",
};

function PriceDisplay({ item }: { item: CatalogItem }) {
  if (item.pricingType === "sale" && item.salePrice > 0) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-base font-bold text-[#1A1A1A]">${item.salePrice.toFixed(2)}</span>
        {item.compareAtPrice > item.salePrice && (
          <span className="text-[13px] text-[#9CA3AF] line-through">${item.compareAtPrice.toFixed(2)}</span>
        )}
      </div>
    );
  }
  if (item.pricingType === "fixed") {
    return <span className="text-base font-bold text-[#1A1A1A]">${item.minPrice.toFixed(2)}</span>;
  }
  if (item.minPrice > 0) {
    return (
      <span className="text-base font-bold text-[#1A1A1A]">
        ${item.minPrice.toFixed(2)}{item.maxPrice > item.minPrice ? `–$${item.maxPrice.toFixed(2)}` : ""}
      </span>
    );
  }
  return <span className="text-[13px] text-[#6B7280]">Request a quote</span>;
}

const ProductCard = memo(function ProductCard({ item, onLightbox }: { item: CatalogItem; onLightbox: (images: string[], idx: number) => void }) {
  const allImages = item.images?.length
    ? [...item.images].sort((a, b) => a.displayOrder - b.displayOrder)
    : item.image
    ? [{ id: "legacy", url: item.image, isPrimary: true, altText: item.title, itemId: item.id, displayOrder: 0, createdAt: "" }]
    : [];

  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  const colorVariants = item.productVariants?.filter((v) => v.type === "color") ?? [];

  function selectColor(variantValue: string) {
    const matchIdx = allImages.findIndex((img) =>
      img.altText?.toLowerCase().includes(variantValue.toLowerCase().slice(1))
    );
    if (matchIdx !== -1) setImgIdx(matchIdx);
  }

  const currentImg = allImages[imgIdx];
  const labels = item.labels?.length ? item.labels : item.badge ? [item.badge] : [];

  function handleImageClick() {
    if (allImages.length > 0) {
      onLightbox(allImages.map((i) => i.url), imgIdx);
    }
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
      {/* Image area — fixed 1:1 aspect ratio */}
      <div
        className="relative aspect-square cursor-zoom-in overflow-hidden bg-[#F7F4EF]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleImageClick}
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
          <div className="flex h-full items-center justify-center text-[#9CA3AF] text-[13px]">No image</div>
        )}

        {/* Multi-image nav arrows (show on hover) */}
        {allImages.length > 1 && hovered && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + allImages.length) % allImages.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-[#1A1A1A] shadow-md hover:bg-white"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % allImages.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-[#1A1A1A] shadow-md hover:bg-white"
              aria-label="Next image"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-4 bg-white" : "w-1.5 bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Label pills overlay */}
        {labels.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {labels.slice(0, 2).map((lbl) => (
              <span
                key={lbl}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]",
                  LABEL_STYLES[lbl] ?? "bg-[#F7F4EF] text-[#1A1A1A]"
                )}
              >
                {lbl}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="mb-0.5 text-[14px] font-semibold leading-snug text-[#1A1A1A] line-clamp-2">{item.title}</p>
        <p className="mb-3 text-[12px] text-[#6B7280]">{item.category}</p>

        {/* Price + MOQ */}
        <div className="mb-3">
          <PriceDisplay item={item} />
          {item.moq > 0 && (
            <p className="mt-0.5 text-[11px] text-[#9CA3AF]">MOQ: {item.moq} units</p>
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
                className={cn(
                  "h-4 w-4 rounded-full border transition-transform hover:scale-110",
                  v.isAvailable ? "opacity-100" : "opacity-30"
                )}
                style={{
                  backgroundColor: v.value || "#ccc",
                  borderColor: v.value === "#ffffff" || v.value === "#fff" ? "#E5E2DB" : v.value || "#E5E2DB",
                  boxShadow: "inset 0 0 0 1.5px rgba(0,0,0,0.08)",
                }}
              />
            ))}
            {colorVariants.length > 8 && (
              <span className="text-[11px] text-[#6B7280]">+{colorVariants.length - 8}</span>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          {item.supportsDirectOrder && (
            <Link
              href={`/portal/order/${item.id}`}
              className="block rounded-xl bg-[#C4F542] py-2.5 text-center text-[13px] font-semibold text-[#1A1A1A] transition-colors hover:bg-[#b5e13a]"
            >
              Order Now
            </Link>
          )}
          <Link
            href={`/portal/quotes/new?item=${item.id}`}
            className={cn(
              "block rounded-xl border py-2.5 text-center text-[13px] font-semibold transition-colors",
              item.supportsDirectOrder
                ? "border-[#E5E2DB] text-[#6B7280] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                : "border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F7F4EF]"
            )}
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
});

interface Props {
  items: CatalogItem[];
  categories: CatalogCategory[];
}

export function CatalogGrid({ items, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeMaterial, setActiveMaterial] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [lightbox, setLightbox] = useState<{ images: string[]; idx: number } | null>(null);
  const openLightbox = useCallback((images: string[], idx: number) => setLightbox({ images, idx }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const materials = useMemo(
    () =>
      Array.from(
        new Set(items.map((i) => i.material).filter(Boolean).map((m) => m.split(",")[0].trim()))
      ).sort(),
    [items]
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
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.material.toLowerCase().includes(q)
      );
    }
    switch (sortKey) {
      case "name-asc":   return [...result].sort((a, b) => a.title.localeCompare(b.title));
      case "price-asc":  return [...result].sort((a, b) => (a.salePrice || a.minPrice) - (b.salePrice || b.minPrice));
      case "price-desc": return [...result].sort((a, b) => (b.salePrice || b.minPrice) - (a.salePrice || a.minPrice));
      case "moq-asc":    return [...result].sort((a, b) => a.moq - b.moq);
      default:           return result;
    }
  }, [items, activeCategory, activeMaterial, searchQuery, sortKey]);

  const categoryFilters = categories.length > 0
    ? categories
    : Array.from(new Set(items.map((i) => i.category))).map((name) => ({
        id: name, name, slug: name.toLowerCase(), description: "", displayOrder: 0, isActive: true, icon: "", createdAt: "",
      }));

  return (
    <div className="space-y-5">
      {/* Search + sort toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative flex-1 min-w-[180px]">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-[#E5E2DB] bg-white pl-9 pr-4 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#1A1A1A] focus:outline-none"
          />
        </label>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-[#9CA3AF]" />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="h-10 rounded-xl border border-[#E5E2DB] bg-white px-3 text-sm text-[#6B7280] focus:border-[#1A1A1A] focus:outline-none"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("")}
          className={cn(
            "rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
            !activeCategory
              ? "bg-[#1A1A1A] text-white"
              : "border border-[#E5E2DB] bg-white text-[#6B7280] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
          )}
        >
          All
        </button>
        {categoryFilters.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? "" : cat.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
              activeCategory === cat.id
                ? "bg-[#1A1A1A] text-white"
                : "border border-[#E5E2DB] bg-white text-[#6B7280] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
            )}
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
              className={cn(
                "rounded-full border px-3 py-1 text-[12px] transition-colors",
                activeMaterial === mat
                  ? "border-[#C4F542] bg-[#C4F542] text-[#1A1A1A]"
                  : "border-[#E5E2DB] text-[#6B7280] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
              )}
            >
              {mat}
            </button>
          ))}
        </div>
      )}

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#E5E2DB] bg-white px-8 py-16 text-center">
          <p className="text-[15px] font-semibold text-[#1A1A1A]">No products found</p>
          <p className="mt-1 text-[13px] text-[#6B7280]">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onLightbox={openLightbox}
            />
          ))}
        </div>
      )}

      <p className="text-center text-[12px] text-[#9CA3AF]">
        Showing {filtered.length} of {items.length} product{items.length !== 1 ? "s" : ""}
      </p>

      {/* Lightbox */}
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          startIndex={lightbox.idx}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}

/* ── Inline lightbox (keeps CatalogGrid self-contained) ── */
function ImageLightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Main image */}
      <div
        className="relative flex h-[90vh] w-[90vw] max-w-5xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[idx]}
          alt={`Product image ${idx + 1}`}
          fill
          className="object-contain"
          unoptimized
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-0 top-0 -translate-y-full rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
        >
          ✕ Close
        </button>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); }}
              className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Counter */}
      {images.length > 1 && (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/60">
          {idx + 1} / {images.length}
        </p>
      )}
    </div>
  );
}
