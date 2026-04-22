"use client";

import Image from "next/image";
import { useState } from "react";

import type { CatalogCategory, CatalogItem, ProductImage, ProductVariant } from "@/lib/portal/types";

const DECORATION_METHODS = ["embroidery", "screen-print", "dtg", "laser", "deboss", "sublimation", "heat-transfer"];
const LABEL_OPTIONS = ["Best Seller", "New", "Eco Friendly", "Premium Quality"];
const PRICING_TYPES = ["range", "fixed", "sale"] as const;
type Tab = "details" | "images" | "variants" | "pricing" | "labels";

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type FormState = {
  id?: string;
  title: string; slug: string; sku: string;
  categoryId: string; category: string; subcategory: string;
  description: string; material: string; colorFamily: string;
  moq: number; leadTimeDays: number; leadTimeLabel: string;
  decorationMethods: string[];
  // pricing
  pricingType: "range" | "fixed" | "sale";
  minPrice: number; maxPrice: number; salePrice: number; compareAtPrice: number;
  // labels + toggles
  labels: string[];
  supportsDirectOrder: boolean;
  isActive: boolean;
};

function emptyForm(): FormState {
  return {
    title: "", slug: "", sku: "", categoryId: "", category: "", subcategory: "",
    description: "", material: "", colorFamily: "",
    moq: 50, leadTimeDays: 21, leadTimeLabel: "3–5 weeks production + shipping",
    decorationMethods: [],
    pricingType: "range", minPrice: 0, maxPrice: 0, salePrice: 0, compareAtPrice: 0,
    labels: [], supportsDirectOrder: false, isActive: true,
  };
}

interface Props {
  initialItems: CatalogItem[];
  categories: CatalogCategory[];
}

export default function AdminCatalogManager({ initialItems, categories }: Props) {
  const [items, setItems] = useState<CatalogItem[]>(initialItems);
  const [panel, setPanel] = useState<"closed" | "add" | "edit">("closed");
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [form, setForm] = useState<FormState>(emptyForm());
  const [editImages, setEditImages] = useState<ProductImage[]>([]);
  const [editVariants, setEditVariants] = useState<ProductVariant[]>([]);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ text: string; type: "ok" | "err" } | null>(null);

  // Image upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Variant add state
  const [variantType, setVariantType] = useState<"color" | "size">("color");
  const [variantLabel, setVariantLabel] = useState("");
  const [variantHex, setVariantHex] = useState("#000000");
  const [addingVariant, setAddingVariant] = useState(false);

  // Search/filter
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");

  function openAdd() {
    setForm(emptyForm());
    setEditImages([]);
    setEditVariants([]);
    setFormError(null);
    setActiveTab("details");
    setPanel("add");
  }

  function openEdit(item: CatalogItem) {
    setForm({
      id: item.id,
      title: item.title, slug: item.slug, sku: item.sku,
      categoryId: item.categoryId ?? "", category: item.category, subcategory: item.subcategory,
      description: item.description, material: item.material, colorFamily: item.colorFamily,
      moq: item.moq, leadTimeDays: item.leadTimeDays, leadTimeLabel: item.leadTimeLabel,
      decorationMethods: item.decorationMethods,
      pricingType: item.pricingType, minPrice: item.minPrice, maxPrice: item.maxPrice,
      salePrice: item.salePrice, compareAtPrice: item.compareAtPrice,
      labels: item.labels, supportsDirectOrder: item.supportsDirectOrder, isActive: item.isActive,
    });
    setEditImages(item.images ?? []);
    setEditVariants(item.productVariants ?? []);
    setFormError(null);
    setImageError(null);
    setActiveTab("details");
    setPanel("edit");
  }

  async function handleSave() {
    if (!form.title.trim() || !form.slug.trim() || !form.sku.trim()) {
      setFormError("Title, slug, and SKU are required.");
      setActiveTab("details");
      return;
    }
    setFormError(null);
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(), slug: form.slug.trim(), sku: form.sku.trim(),
        categoryId: form.categoryId || null, category: form.category.trim(), subcategory: form.subcategory.trim(),
        description: form.description.trim(), material: form.material.trim(), colorFamily: form.colorFamily.trim(),
        moq: Number(form.moq), leadTimeDays: Number(form.leadTimeDays), leadTimeLabel: form.leadTimeLabel.trim(),
        decorationMethods: form.decorationMethods,
        pricingType: form.pricingType, minPrice: Number(form.minPrice), maxPrice: Number(form.maxPrice),
        salePrice: Number(form.salePrice), compareAtPrice: Number(form.compareAtPrice),
        labels: form.labels, supportsDirectOrder: form.supportsDirectOrder, isActive: form.isActive,
      };

      if (panel === "add") {
        const res = await fetch("/api/admin/catalog", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
        const json = (await res.json()) as { item?: CatalogItem; error?: string };
        if (!res.ok) throw new Error(json.error ?? "Failed to create product");
        setItems((prev) => [{ ...json.item!, images: [], productVariants: [] }, ...prev]);
        setBanner({ text: "Product created.", type: "ok" });
        setPanel("closed");
      } else if (panel === "edit" && form.id) {
        const res = await fetch(`/api/admin/catalog/${form.id}`, {
          method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
        const json = (await res.json()) as { item?: CatalogItem; error?: string };
        if (!res.ok) throw new Error(json.error ?? "Failed to update product");
        setItems((prev) => prev.map((i) => i.id === form.id ? { ...json.item!, images: editImages, productVariants: editVariants } : i));
        setBanner({ text: "Product updated.", type: "ok" });
        setPanel("closed");
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(itemId: string) {
    setDeletingId(itemId);
    try {
      const res = await fetch(`/api/admin/catalog/${itemId}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json() as { error?: string }).error ?? "Delete failed");
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      setConfirmDeleteId(null);
      setBanner({ text: "Product removed.", type: "ok" });
    } catch (err) {
      setBanner({ text: err instanceof Error ? err.message : "Delete failed", type: "err" });
    } finally {
      setDeletingId(null);
    }
  }

  async function handleImageUpload(files: FileList | null) {
    if (!files || files.length === 0 || !form.id) return;
    setUploadingImage(true);
    setImageError(null);
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append("files", f));
      const res = await fetch(`/api/admin/catalog/${form.id}/images`, { method: "POST", body: fd });
      const json = (await res.json()) as { images?: ProductImage[]; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setEditImages((prev) => [...prev, ...(json.images ?? [])]);
    } catch (err) {
      setImageError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSetPrimary(imageId: string) {
    if (!form.id) return;
    const res = await fetch(`/api/admin/catalog/${form.id}/images/${imageId}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isPrimary: true }),
    });
    if (res.ok) {
      setEditImages((prev) => prev.map((img) => ({ ...img, isPrimary: img.id === imageId })));
    }
  }

  async function handleDeleteImage(imageId: string) {
    if (!form.id) return;
    const res = await fetch(`/api/admin/catalog/${form.id}/images/${imageId}`, { method: "DELETE" });
    if (res.ok) setEditImages((prev) => prev.filter((img) => img.id !== imageId));
  }

  async function handleAddVariant() {
    if (!form.id || !variantLabel.trim()) return;
    setAddingVariant(true);
    try {
      const res = await fetch(`/api/admin/catalog/${form.id}/variants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: variantType, label: variantLabel.trim(), value: variantType === "color" ? variantHex : null }),
      });
      const json = (await res.json()) as { variant?: ProductVariant; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed");
      setEditVariants((prev) => [...prev, json.variant!]);
      setVariantLabel("");
    } finally {
      setAddingVariant(false);
    }
  }

  async function handleDeleteVariant(variantId: string) {
    if (!form.id) return;
    const res = await fetch(`/api/admin/catalog/${form.id}/variants/${variantId}`, { method: "DELETE" });
    if (res.ok) setEditVariants((prev) => prev.filter((v) => v.id !== variantId));
  }

  async function toggleVariantAvailability(v: ProductVariant) {
    if (!form.id) return;
    const res = await fetch(`/api/admin/catalog/${form.id}/variants/${v.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isAvailable: !v.isAvailable }),
    });
    if (res.ok) setEditVariants((prev) => prev.map((x) => x.id === v.id ? { ...x, isAvailable: !x.isAvailable } : x));
  }

  async function toggleActive(item: CatalogItem) {
    const res = await fetch(`/api/admin/catalog/${item.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: !item.isActive }),
    });
    if (res.ok) setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, isActive: !i.isActive } : i));
  }

  const filtered = items.filter((item) => {
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || item.categoryId === filterCat || item.category === filterCat;
    return matchSearch && matchCat;
  });

  const primaryImage = (item: CatalogItem) => item.images?.find((img) => img.isPrimary)?.url ?? item.image;

  const pricingDisplay = (item: CatalogItem) => {
    if (item.pricingType === "fixed") return `$${item.minPrice.toFixed(2)}`;
    if (item.pricingType === "sale") return `$${item.salePrice.toFixed(2)}`;
    return `$${item.minPrice.toFixed(2)}–$${item.maxPrice.toFixed(2)}`;
  };

  return (
    <div className="relative">
      {/* Banner */}
      {banner && (
        <div className={`mb-4 flex items-center justify-between rounded-xl border px-4 py-3 text-[13px] ${banner.type === "ok" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-600"}`}>
          {banner.text}
          <button onClick={() => setBanner(null)} className="ml-3 opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 flex-1 min-w-[160px] rounded-lg border border-[#E5E2DB] bg-white px-3 text-[13px] text-[#10233f] placeholder:text-[#aab8c8] focus:border-[#2b6b5e] focus:outline-none"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="h-9 rounded-lg border border-[#E5E2DB] bg-white px-3 text-[13px] text-[#5f7087] focus:border-[#2b6b5e] focus:outline-none"
        >
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <span className="text-[13px] text-[#73839b]">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
        <button
          onClick={openAdd}
          className="ml-auto rounded-xl bg-[#2b6b5e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1f5248]"
        >
          + Add Product
        </button>
      </div>

      {/* Product table */}
      <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_2px_8px_rgba(16,35,63,0.04)]">
        {filtered.length === 0 ? (
          <div className="px-8 py-16 text-center text-[13px] text-[#73839b]">
            {items.length === 0 ? "No products yet. Add your first product." : "No products match your filters."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px]">
              <thead>
                <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                  {["Product", "Category", "Pricing", "Status", "Direct Order", "Actions"].map((h) => (
                    <th key={h} className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7b8aa0] ${h === "Actions" ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#f8fafc]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg bg-[#e9eff8]">
                          {primaryImage(item) && (
                            <Image src={primaryImage(item)!} alt={item.title} fill className="object-cover" unoptimized />
                          )}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-[#10233f]">{item.title}</p>
                          <p className="text-[11px] font-mono text-[#73839b]">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-[#F5F4F0] px-2 py-0.5 text-[11px] font-medium text-[#4B5563]">{item.category}</span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#5f7087]">{pricingDisplay(item)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(item)}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${item.isActive ? "bg-emerald-50 text-emerald-700" : "bg-[#f1f5f9] text-[#73839b]"}`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {item.supportsDirectOrder && (
                        <span className="rounded-full bg-[#fef9c3] px-2 py-0.5 text-[11px] font-medium text-amber-700">Direct</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {confirmDeleteId === item.id ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="text-[11px] text-[#73839b]">Delete?</span>
                          <button disabled={deletingId === item.id} onClick={() => handleDelete(item.id)} className="rounded-lg bg-red-500 px-3 py-1 text-[11px] font-medium text-white disabled:opacity-50">
                            {deletingId === item.id ? "…" : "Confirm"}
                          </button>
                          <button onClick={() => setConfirmDeleteId(null)} className="rounded-lg border border-[#e2e8f0] px-3 py-1 text-[11px] text-[#5f7087]">Cancel</button>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <button onClick={() => openEdit(item)} className="rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-[11px] font-medium text-[#5f7087] hover:bg-[#f8fafc]">Edit</button>
                          <button onClick={() => setConfirmDeleteId(item.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-[11px] font-medium text-red-500 hover:bg-red-50">Delete</button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Side panel */}
      {panel !== "closed" && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setPanel("closed")} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e2e8f0] px-6 py-4">
              <h2 className="text-[15px] font-semibold text-[#10233f]">
                {panel === "add" ? "Add Product" : `Edit — ${form.title || "Product"}`}
              </h2>
              <button onClick={() => setPanel("closed")} className="text-[#73839b] hover:text-[#10233f]">✕</button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#E5E2DB] bg-[#F5F4F0]">
              {(["details", "images", "variants", "pricing", "labels"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3.5 text-sm font-semibold capitalize transition-colors ${activeTab === tab ? "border-b-2 border-[#2b6b5e] text-[#1A1A1A]" : "text-[#6B7280] hover:text-[#1A1A1A]"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {formError && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{formError}</div>
              )}

              {/* ── DETAILS ── */}
              {activeTab === "details" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Title *">
                      <input type="text" value={form.title}
                        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value, slug: p.slug === "" || p.slug === toSlug(p.title) ? toSlug(e.target.value) : p.slug }))}
                        className={inputCls} />
                    </Field>
                    <Field label="Slug *">
                      <input type="text" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} className={`${inputCls} font-mono`} />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="SKU *">
                      <input type="text" value={form.sku} onChange={(e) => setForm((p) => ({ ...p, sku: e.target.value }))} className={inputCls} />
                    </Field>
                    <Field label="Category">
                      <select value={form.categoryId}
                        onChange={(e) => {
                          const cat = categories.find((c) => c.id === e.target.value);
                          setForm((p) => ({ ...p, categoryId: e.target.value, category: cat?.name ?? p.category }));
                        }}
                        className={inputCls}
                      >
                        <option value="">Select…</option>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Subcategory">
                      <input type="text" value={form.subcategory} onChange={(e) => setForm((p) => ({ ...p, subcategory: e.target.value }))} className={inputCls} />
                    </Field>
                    <Field label="Material">
                      <input type="text" value={form.material} onChange={(e) => setForm((p) => ({ ...p, material: e.target.value }))} className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className={`${inputCls} resize-none`} />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="MOQ">
                      <input type="number" min={1} value={form.moq} onChange={(e) => setForm((p) => ({ ...p, moq: parseInt(e.target.value) || 1 }))} className={inputCls} />
                    </Field>
                    <Field label="Lead Time (days)">
                      <input type="number" min={1} value={form.leadTimeDays} onChange={(e) => setForm((p) => ({ ...p, leadTimeDays: parseInt(e.target.value) || 21 }))} className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Lead Time Label">
                    <input type="text" value={form.leadTimeLabel} onChange={(e) => setForm((p) => ({ ...p, leadTimeLabel: e.target.value }))} className={inputCls} />
                  </Field>
                  <div>
                    <label className={labelCls}>Decoration Methods</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {DECORATION_METHODS.map((m) => (
                        <button key={m} type="button"
                          onClick={() => setForm((p) => ({ ...p, decorationMethods: p.decorationMethods.includes(m) ? p.decorationMethods.filter((x) => x !== m) : [...p.decorationMethods, m] }))}
                          className={`rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors ${form.decorationMethods.includes(m) ? "border-[#2b6b5e] bg-[#2b6b5e] text-white" : "border-[#E5E2DB] bg-white text-[#5f7087] hover:border-[#2b6b5e]"}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── IMAGES ── */}
              {activeTab === "images" && (
                <div className="space-y-5">
                  {panel === "add" && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-700">
                      Save the product first (Details tab), then return here to upload images.
                    </div>
                  )}
                  {panel === "edit" && (
                    <>
                      {imageError && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{imageError}</div>
                      )}
                      <div>
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-[13px] font-medium text-[#5f7087] hover:bg-[#f8fafc]">
                          {uploadingImage ? "Uploading…" : "+ Upload Images"}
                          <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="hidden"
                            disabled={uploadingImage}
                            onChange={(e) => handleImageUpload(e.target.files)} />
                        </label>
                        <p className="mt-1.5 text-[11px] text-[#73839b]">JPEG, PNG, WebP, AVIF · max 10 MB each</p>
                      </div>
                      {editImages.length === 0 ? (
                        <p className="text-[13px] text-[#73839b]">No images yet.</p>
                      ) : (
                        <div className="grid grid-cols-3 gap-3">
                          {editImages.sort((a, b) => a.displayOrder - b.displayOrder).map((img) => (
                            <div key={img.id} className="group relative overflow-hidden rounded-xl border border-[#e2e8f0]">
                              <div className="relative aspect-square bg-[#f8fafc]">
                                <Image src={img.url} alt={img.altText || ""} fill className="object-cover" unoptimized />
                              </div>
                              <div className="flex items-center justify-between border-t border-[#e2e8f0] bg-white px-2 py-1.5">
                                <button onClick={() => handleSetPrimary(img.id)}
                                  className={`text-[11px] font-medium ${img.isPrimary ? "text-[#5a6e00]" : "text-[#73839b] hover:text-[#1A1A1A]"}`}>
                                  {img.isPrimary ? "★ Primary" : "Set primary"}
                                </button>
                                <button onClick={() => handleDeleteImage(img.id)} className="text-[11px] text-red-400 hover:text-red-600">Delete</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* ── VARIANTS ── */}
              {activeTab === "variants" && (
                <div className="space-y-6">
                  {panel === "add" && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-700">
                      Save the product first, then add variants here.
                    </div>
                  )}
                  {panel === "edit" && (
                    <>
                      {/* Add variant form */}
                      <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 space-y-3">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7b8aa0]">Add Variant</p>
                        <div className="flex gap-3">
                          <select value={variantType} onChange={(e) => setVariantType(e.target.value as "color" | "size")} className={`w-28 ${inputCls}`}>
                            <option value="color">Color</option>
                            <option value="size">Size</option>
                          </select>
                          <input type="text" placeholder="Label (e.g. Navy Blue or XL)" value={variantLabel}
                            onChange={(e) => setVariantLabel(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddVariant(); } }}
                            className={`flex-1 ${inputCls}`} />
                          {variantType === "color" && (
                            <input type="color" value={variantHex} onChange={(e) => setVariantHex(e.target.value)}
                              className="h-9 w-14 cursor-pointer rounded-lg border border-[#e2e8f0] bg-white p-1" />
                          )}
                          <button onClick={handleAddVariant} disabled={addingVariant || !variantLabel.trim()}
                            className="rounded-xl bg-[#2b6b5e] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#1f5248] disabled:opacity-50">
                            {addingVariant ? "…" : "Add"}
                          </button>
                        </div>
                      </div>

                      {/* Color variants */}
                      {editVariants.filter((v) => v.type === "color").length > 0 && (
                        <div>
                          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7b8aa0]">Color Variants</p>
                          <div className="space-y-2">
                            {editVariants.filter((v) => v.type === "color").sort((a, b) => a.displayOrder - b.displayOrder).map((v) => (
                              <div key={v.id} className="flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-white px-3 py-2">
                                <div className="flex items-center gap-3">
                                  {v.value && <span className="h-5 w-5 flex-shrink-0 rounded-full border border-[#e2e8f0]" style={{ backgroundColor: v.value }} />}
                                  <span className="text-[13px] text-[#10233f]">{v.label}</span>
                                  {v.value && <span className="font-mono text-[11px] text-[#73839b]">{v.value}</span>}
                                </div>
                                <div className="flex items-center gap-2">
                                  <button onClick={() => toggleVariantAvailability(v)}
                                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${v.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-[#f1f5f9] text-[#73839b]"}`}>
                                    {v.isAvailable ? "Available" : "Unavailable"}
                                  </button>
                                  <button onClick={() => handleDeleteVariant(v.id)} className="text-[11px] text-red-400 hover:text-red-600">Delete</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Size variants */}
                      {editVariants.filter((v) => v.type === "size").length > 0 && (
                        <div>
                          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7b8aa0]">Size Variants</p>
                          <div className="space-y-2">
                            {editVariants.filter((v) => v.type === "size").sort((a, b) => a.displayOrder - b.displayOrder).map((v) => (
                              <div key={v.id} className="flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-white px-3 py-2">
                                <span className="text-[13px] text-[#10233f]">{v.label}</span>
                                <div className="flex items-center gap-2">
                                  <button onClick={() => toggleVariantAvailability(v)}
                                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${v.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-[#f1f5f9] text-[#73839b]"}`}>
                                    {v.isAvailable ? "Available" : "Unavailable"}
                                  </button>
                                  <button onClick={() => handleDeleteVariant(v.id)} className="text-[11px] text-red-400 hover:text-red-600">Delete</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {editVariants.length === 0 && <p className="text-[13px] text-[#73839b]">No variants yet.</p>}
                    </>
                  )}
                </div>
              )}

              {/* ── PRICING ── */}
              {activeTab === "pricing" && (
                <div className="space-y-5">
                  <div>
                    <label className={labelCls}>Pricing Type</label>
                    <div className="mt-2 flex gap-3">
                      {PRICING_TYPES.map((pt) => (
                        <button key={pt} type="button"
                          onClick={() => setForm((p) => ({ ...p, pricingType: pt }))}
                          className={`flex-1 rounded-xl border py-3 text-[13px] font-medium capitalize transition-colors ${form.pricingType === pt ? "border-[#2b6b5e] bg-[#2b6b5e] text-white" : "border-[#E5E2DB] bg-white text-[#5f7087] hover:border-[#2b6b5e]"}`}>
                          {pt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {form.pricingType === "range" && (
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Min Price (USD)">
                        <input type="number" min={0} step={0.01} value={form.minPrice}
                          onChange={(e) => setForm((p) => ({ ...p, minPrice: parseFloat(e.target.value) || 0 }))}
                          className={inputCls} />
                      </Field>
                      <Field label="Max Price (USD)">
                        <input type="number" min={0} step={0.01} value={form.maxPrice}
                          onChange={(e) => setForm((p) => ({ ...p, maxPrice: parseFloat(e.target.value) || 0 }))}
                          className={inputCls} />
                      </Field>
                    </div>
                  )}

                  {form.pricingType === "fixed" && (
                    <Field label="Price (USD)">
                      <input type="number" min={0} step={0.01} value={form.minPrice}
                        onChange={(e) => setForm((p) => ({ ...p, minPrice: parseFloat(e.target.value) || 0, maxPrice: parseFloat(e.target.value) || 0 }))}
                        className={inputCls} />
                    </Field>
                  )}

                  {form.pricingType === "sale" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Sale Price (USD)">
                          <input type="number" min={0} step={0.01} value={form.salePrice}
                            onChange={(e) => setForm((p) => ({ ...p, salePrice: parseFloat(e.target.value) || 0 }))}
                            className={inputCls} />
                        </Field>
                        <Field label="Compare-At Price (USD)">
                          <input type="number" min={0} step={0.01} value={form.compareAtPrice}
                            onChange={(e) => setForm((p) => ({ ...p, compareAtPrice: parseFloat(e.target.value) || 0 }))}
                            className={inputCls} />
                        </Field>
                      </div>
                      {form.salePrice > 0 && form.compareAtPrice > form.salePrice && (
                        <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3">
                          <p className="text-[12px] text-[#7b8aa0]">Preview</p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-lg font-semibold text-[#10233f]">${form.salePrice.toFixed(2)}</span>
                            <span className="text-[13px] text-[#73839b] line-through">${form.compareAtPrice.toFixed(2)}</span>
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-600">
                              -{Math.round((1 - form.salePrice / form.compareAtPrice) * 100)}%
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* ── LABELS ── */}
              {activeTab === "labels" && (
                <div className="space-y-6">
                  <div>
                    <label className={labelCls}>Labels</label>
                    <div className="mt-3 space-y-2">
                      {LABEL_OPTIONS.map((lbl) => {
                        const checked = form.labels.includes(lbl);
                        return (
                          <label key={lbl} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e2e8f0] px-4 py-3 hover:bg-[#f8fafc]">
                            <input type="checkbox" checked={checked}
                              onChange={() => setForm((p) => ({ ...p, labels: checked ? p.labels.filter((x) => x !== lbl) : [...p.labels, lbl] }))}
                              className="h-4 w-4 rounded border-[#E5E2DB] accent-[#2b6b5e]" />
                            <span className="text-[13px] font-medium text-[#10233f]">{lbl}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-3 border-t border-[#e2e8f0] pt-5">
                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e2e8f0] px-4 py-3 hover:bg-[#f8fafc]">
                      <div>
                        <p className="text-[13px] font-medium text-[#10233f]">Supports Direct Order</p>
                        <p className="text-[11px] text-[#73839b]">Allow clients to purchase this product directly without a quote</p>
                      </div>
                      <div className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${form.supportsDirectOrder ? "bg-[#2b6b5e]" : "bg-[#E5E2DB]"}`}
                        onClick={() => setForm((p) => ({ ...p, supportsDirectOrder: !p.supportsDirectOrder }))}>
                        <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.supportsDirectOrder ? "translate-x-6" : "translate-x-1"}`} />
                      </div>
                    </label>
                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e2e8f0] px-4 py-3 hover:bg-[#f8fafc]">
                      <div>
                        <p className="text-[13px] font-medium text-[#10233f]">Active</p>
                        <p className="text-[11px] text-[#73839b]">Show this product in the client catalog</p>
                      </div>
                      <div className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${form.isActive ? "bg-[#2b6b5e]" : "bg-[#E5E2DB]"}`}
                        onClick={() => setForm((p) => ({ ...p, isActive: !p.isActive }))}>
                        <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.isActive ? "translate-x-6" : "translate-x-1"}`} />
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-[#E5E2DB] px-6 py-4">
              <button onClick={() => setPanel("closed")} disabled={saving}
                className="rounded-xl border border-[#E5E2DB] px-5 py-2.5 text-sm font-medium text-[#6B7280] hover:bg-[#F5F4F0] disabled:opacity-50">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="rounded-xl bg-[#2b6b5e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1f5248] disabled:opacity-50">
                {saving ? "Saving…" : panel === "add" ? "Create Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const labelCls = "block text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]";
const inputCls = "w-full rounded-xl border border-[#E5E2DB] bg-white px-3 py-2.5 text-[15px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:border-[#2b6b5e] focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={`mb-1.5 ${labelCls}`}>{label}</label>
      {children}
    </div>
  );
}
