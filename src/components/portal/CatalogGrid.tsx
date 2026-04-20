"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

import type { CatalogItem } from "@/lib/portal/types";

type SortKey = "default" | "name-asc" | "name-desc" | "price-asc" | "price-desc" | "moq-asc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Production fit" },
  { value: "name-asc", label: "Name A → Z" },
  { value: "name-desc", label: "Name Z → A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "moq-asc", label: "MOQ: Lowest first" },
];

const COLOR_SWATCHES: { label: string; hex: string }[] = [
  { label: "All", hex: "" },
  { label: "Navy", hex: "#0f172a" },
  { label: "White", hex: "#ffffff" },
  { label: "Blue", hex: "#215dbe" },
  { label: "Gold", hex: "#9f6b16" },
  { label: "Grey", hex: "#9fb0c9" },
];

interface Props {
  items: CatalogItem[];
}

export function CatalogGrid({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeMaterial, setActiveMaterial] = useState<string>("");
  const [activeColor, setActiveColor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("default");

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))).sort(),
    [items],
  );

  const materials = useMemo(
    () =>
      Array.from(
        new Set(
          items
            .map((i) => i.material)
            .filter(Boolean)
            .map((m) => m.split(",")[0].trim()),
        ),
      ).sort(),
    [items],
  );

  const filtered = useMemo(() => {
    let result = items;

    if (activeCategory) {
      result = result.filter((i) => i.category === activeCategory);
    }
    if (activeMaterial) {
      result = result.filter((i) => i.material.includes(activeMaterial));
    }
    if (activeColor) {
      result = result.filter((i) =>
        i.colorFamily.toLowerCase().includes(activeColor.toLowerCase()),
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.material.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q),
      );
    }

    switch (sortKey) {
      case "name-asc":
        return [...result].sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return [...result].sort((a, b) => b.title.localeCompare(a.title));
      case "price-asc":
        return [...result].sort((a, b) => a.minPrice - b.minPrice);
      case "price-desc":
        return [...result].sort((a, b) => b.minPrice - a.minPrice);
      case "moq-asc":
        return [...result].sort((a, b) => a.moq - b.moq);
      default:
        return result;
    }
  }, [items, activeCategory, activeMaterial, activeColor, searchQuery, sortKey]);

  const hasActiveFilter =
    activeCategory || activeMaterial || activeColor || searchQuery;

  function clearFilters() {
    setActiveCategory("");
    setActiveMaterial("");
    setActiveColor("");
    setSearchQuery("");
  }

  return (
    <section className="flex flex-col gap-6 xl:flex-row">
      {/* Sidebar */}
      <aside className="w-full rounded-2xl border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_22px_rgba(16,35,63,0.04)] xl:w-72 xl:self-start">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#dbe5f1] bg-[#f7fbff] px-4 py-2.5 text-sm text-[#10233f] placeholder:text-[#aab8c8] focus:border-[#215dbe] focus:outline-none"
          />
        </div>

        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">
              Categories
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setActiveCategory("")}
                className={filterItemCls(activeCategory === "")}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? "" : cat)}
                  className={filterItemCls(activeCategory === cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">
              Material
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setActiveMaterial("")}
                className={filterItemCls(activeMaterial === "")}
              >
                All Materials
              </button>
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setActiveMaterial(activeMaterial === mat ? "" : mat)}
                  className={filterItemCls(activeMaterial === mat)}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">
              Primary Color
            </h3>
            <div className="flex flex-wrap gap-3">
              {COLOR_SWATCHES.map(({ label, hex }) => {
                const isActive =
                  label === "All" ? activeColor === "" : activeColor === label;
                return (
                  <button
                    key={label}
                    title={label}
                    onClick={() => setActiveColor(isActive ? "" : label === "All" ? "" : label)}
                    className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
                      isActive ? "border-[#215dbe]" : "border-[#dbe5f1]"
                    }`}
                    style={hex ? { backgroundColor: hex } : { background: "none" }}
                  >
                    {label === "All" && (
                      <span className="text-[8px] font-bold text-[#5f7087]">ALL</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilter && (
            <button
              onClick={clearFilters}
              className="w-full rounded-xl border border-[#dbe5f1] py-2 text-xs font-medium text-[#5f7087] hover:bg-[#f7fbff]"
            >
              Clear filters
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#677992]">
              Factory Direct Precision
            </p>
            <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[#10233f]">
              Curated Collections
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#73839b]">
              Browse benchmark-ready product families with clear materials, MOQ guidance,
              decoration compatibility, and realistic production expectations before you brief
              our team.
            </p>
          </div>

          <div className="flex-shrink-0">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="rounded-xl border border-[#dbe5f1] bg-white px-4 py-3 text-sm font-medium text-[#5f7087] focus:border-[#215dbe] focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort by: {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#dbe5f1] bg-white px-8 py-16 text-center">
            <p className="text-sm font-medium text-[#10233f]">No products match your filters</p>
            <p className="mt-1 text-xs text-[#73839b]">Try adjusting or clearing your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-[#f0f6ff] px-4 py-2 text-xs font-medium text-[#215dbe]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="mb-4 text-xs text-[#73839b]">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              {hasActiveFilter ? " matching your filters" : ""}
            </p>
            <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
              {filtered.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProductCard({ item }: { item: CatalogItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#dbe5f1] bg-white shadow-[0_4px_12px_rgba(16,35,63,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(16,35,63,0.08)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e9eff8]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#dde9f8] to-[#c2d4ef]" />
        )}
        {item.badge && (
          <span className="absolute left-3 top-3 rounded-lg bg-[#215dbe] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {item.badge}
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#215dbe]">
          {item.category}
        </p>
        <h3 className="mt-1.5 text-base font-semibold text-[#10233f]">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#73839b]">{item.description}</p>

        <div className="mt-4 grid gap-2 text-xs text-[#5a6d87]">
          <div className="rounded-xl bg-[#f7fbff] px-3 py-2">
            {item.material} · MOQ {item.moq}
          </div>
          <div className="rounded-xl bg-[#f7fbff] px-3 py-2">
            {item.decorationMethods.map((m) => m.replace("-", " ")).join(", ")}
          </div>
          <div className="rounded-xl bg-[#f7fbff] px-3 py-2">{item.leadTimeLabel}</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#10233f]">
            From ${item.minPrice.toFixed(2)}
          </span>
          <span className="text-xs text-[#73839b]">Spec-led quote</span>
        </div>

        <Link
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,#195fd4_0%,#2d7cff_100%)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
          href={`/portal/quotes?product=${item.slug}`}
        >
          Configure now
        </Link>
      </div>
    </article>
  );
}

function filterItemCls(active: boolean) {
  return `w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
    active
      ? "border-[#215dbe] bg-[#f0f6ff] font-medium text-[#215dbe]"
      : "border-[#dbe5f1] bg-[#f7fbff] text-[#556882] hover:border-[#215dbe]"
  }`;
}
