"use client";

import Image from "next/image";
import { useState } from "react";

import type { CatalogItem } from "@/lib/portal/types";

const DECORATION_METHODS = [
  "embroidery",
  "screen-print",
  "dtg",
  "laser",
  "deboss",
  "sublimation",
  "heat-transfer",
];

const CATEGORIES = [
  "Apparel",
  "Accessories",
  "Office",
  "Drinkware",
  "Headwear",
  "Bags",
  "Tech",
  "Stationery",
];

type FormState = {
  id?: string;
  slug: string;
  title: string;
  sku: string;
  category: string;
  subcategory: string;
  description: string;
  material: string;
  colorFamily: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  badge: string;
  moq: number;
  leadTimeDays: number;
  leadTimeLabel: string;
  decorationMethods: string[];
  variants: string[];
};

function emptyForm(): FormState {
  return {
    slug: "",
    title: "",
    sku: "",
    category: "",
    subcategory: "",
    description: "",
    material: "",
    colorFamily: "",
    minPrice: 0,
    maxPrice: 0,
    image: "",
    badge: "",
    moq: 50,
    leadTimeDays: 21,
    leadTimeLabel: "3-5 weeks production plus shipping",
    decorationMethods: [],
    variants: [],
  };
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface Props {
  initialItems: CatalogItem[];
}

export default function AdminCatalogManager({ initialItems }: Props) {
  const [items, setItems] = useState<CatalogItem[]>(initialItems);
  const [panel, setPanel] = useState<"closed" | "add" | "edit">("closed");
  const [form, setForm] = useState<FormState>(emptyForm());
  const [variantInput, setVariantInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  function openAdd() {
    setForm(emptyForm());
    setImageFile(null);
    setImagePreview("");
    setVariantInput("");
    setFormError(null);
    setPanel("add");
  }

  function openEdit(item: CatalogItem) {
    setForm({
      id: item.id,
      slug: item.slug,
      title: item.title,
      sku: item.sku,
      category: item.category,
      subcategory: item.subcategory,
      description: item.description,
      material: item.material,
      colorFamily: item.colorFamily,
      minPrice: item.minPrice,
      maxPrice: item.maxPrice,
      image: item.image,
      badge: item.badge ?? "",
      moq: item.moq,
      leadTimeDays: item.leadTimeDays,
      leadTimeLabel: item.leadTimeLabel,
      decorationMethods: item.decorationMethods,
      variants: item.variants,
    });
    setImageFile(null);
    setImagePreview(item.image || "");
    setVariantInput("");
    setFormError(null);
    setPanel("edit");
  }

  function closePanel() {
    setPanel("closed");
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug:
        prev.slug === "" || prev.slug === toSlug(prev.title)
          ? toSlug(title)
          : prev.slug,
    }));
  }

  function toggleDecoration(method: string) {
    setForm((prev) => ({
      ...prev,
      decorationMethods: prev.decorationMethods.includes(method)
        ? prev.decorationMethods.filter((m) => m !== method)
        : [...prev.decorationMethods, method],
    }));
  }

  function addVariant() {
    const v = variantInput.trim();
    if (!v || form.variants.includes(v)) {
      setVariantInput("");
      return;
    }
    setForm((prev) => ({ ...prev, variants: [...prev.variants, v] }));
    setVariantInput("");
  }

  function removeVariant(v: string) {
    setForm((prev) => ({ ...prev, variants: prev.variants.filter((x) => x !== v) }));
  }

  function handleImageFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage(itemId: string, file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`/api/admin/catalog/${itemId}/image`, {
      method: "POST",
      body: fd,
    });
    const json = (await res.json()) as { url?: string; error?: string };
    if (!res.ok) throw new Error(json.error ?? "Image upload failed");
    return json.url!;
  }

  async function handleSave() {
    setFormError(null);
    setSaving(true);

    try {
      const payload = {
        ...form,
        badge: form.badge || undefined,
        minPrice: Number(form.minPrice),
        maxPrice: Number(form.maxPrice),
        moq: Number(form.moq),
        leadTimeDays: Number(form.leadTimeDays),
      };

      if (panel === "add") {
        const res = await fetch("/api/admin/catalog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json()) as { item?: CatalogItem; error?: string };
        if (!res.ok) throw new Error(json.error ?? "Failed to create product");

        let newItem = json.item!;

        if (imageFile) {
          const url = await uploadImage(newItem.id, imageFile);
          newItem = { ...newItem, image: url };
        }

        setItems((prev) => [newItem, ...prev]);
        setBanner("Product created successfully.");
        setPanel("closed");
      } else if (panel === "edit" && form.id) {
        if (imageFile) {
          const url = await uploadImage(form.id, imageFile);
          payload.image = url;
        }

        const res = await fetch(`/api/admin/catalog/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json()) as { item?: CatalogItem; error?: string };
        if (!res.ok) throw new Error(json.error ?? "Failed to update product");

        const updated = json.item!;
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
        setBanner("Product updated successfully.");
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
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Delete failed");
      }
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      setConfirmDeleteId(null);
      setBanner("Product removed.");
    } catch (err) {
      setBanner(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  const currentPreview = imageFile ? imagePreview : form.image;

  return (
    <div className="relative">
      {banner && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {banner}
          <button
            onClick={() => setBanner(null)}
            className="ml-3 text-green-500 hover:text-green-700"
          >
            ✕
          </button>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[#5f7087]">
          {items.length} product{items.length !== 1 ? "s" : ""} in catalog
        </p>
        <button
          onClick={openAdd}
          className="rounded-xl bg-[linear-gradient(135deg,#195fd4_0%,#2d7cff_100%)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-opacity hover:opacity-90"
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#dbe5f1] bg-white shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
        {items.length === 0 ? (
          <div className="px-8 py-16 text-center text-sm text-[#73839b]">
            No catalog items yet. Add your first product to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#dbe5f1] bg-[#f7fbff]">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">
                    Product
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">
                    Category
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">
                    SKU
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">
                    MOQ
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">
                    Price Range
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`border-b border-[#dbe5f1] last:border-0 ${
                      idx % 2 === 1 ? "bg-[#fafcff]" : "bg-white"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-[#e9eff8]">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#10233f]">{item.title}</p>
                          {item.badge && (
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#215dbe]">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#5f7087]">{item.category}</td>
                    <td className="px-5 py-4 font-mono text-xs text-[#73839b]">{item.sku}</td>
                    <td className="px-5 py-4 text-sm text-[#5f7087]">{item.moq}</td>
                    <td className="px-5 py-4 text-sm text-[#5f7087]">
                      ${item.minPrice.toFixed(2)}–${item.maxPrice.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {confirmDeleteId === item.id ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xs text-[#73839b]">Delete?</span>
                          <button
                            disabled={deletingId === item.id}
                            onClick={() => handleDelete(item.id)}
                            className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white disabled:opacity-50"
                          >
                            {deletingId === item.id ? "Deleting…" : "Confirm"}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-lg border border-[#dbe5f1] px-3 py-1 text-xs text-[#5f7087]"
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="rounded-lg border border-[#dbe5f1] px-3 py-1.5 text-xs font-medium text-[#5f7087] hover:bg-[#f7fbff]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(item.id)}
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
                          >
                            Delete
                          </button>
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

      {panel !== "closed" && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={closePanel} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#dbe5f1] px-6 py-4">
              <h2 className="text-base font-semibold text-[#10233f]">
                {panel === "add" ? "Add Product" : "Edit Product"}
              </h2>
              <button
                onClick={closePanel}
                className="text-lg text-[#73839b] hover:text-[#10233f]"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {formError && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              <div className="space-y-5">
                {/* Image */}
                <div>
                  <label className={labelCls}>Product Image</label>
                  <div className="mt-2 flex items-start gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[#e9eff8]">
                      {currentPreview && (
                        <Image
                          src={currentPreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Paste image URL"
                        value={imageFile ? "" : form.image}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, image: e.target.value }));
                          setImagePreview(e.target.value);
                          setImageFile(null);
                        }}
                        className={inputCls}
                      />
                      <label className="inline-block cursor-pointer rounded-lg border border-[#dbe5f1] px-3 py-1.5 text-xs font-medium text-[#5f7087] hover:bg-[#f7fbff]">
                        Upload file
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageFileChange}
                        />
                      </label>
                      {imageFile && (
                        <p className="text-[10px] text-[#73839b]">
                          {imageFile.name} · will upload on save
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title + Slug */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Title *">
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Slug *">
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* SKU + Category */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="SKU *">
                    <input
                      type="text"
                      value={form.sku}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, sku: e.target.value }))
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Category *">
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, category: e.target.value }))
                      }
                      className={inputCls}
                    >
                      <option value="">Select…</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Subcategory + Badge */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Subcategory">
                    <input
                      type="text"
                      value={form.subcategory}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, subcategory: e.target.value }))
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Badge (optional)">
                    <input
                      type="text"
                      placeholder="e.g. Best Seller"
                      value={form.badge}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, badge: e.target.value }))
                      }
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Description */}
                <Field label="Description">
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {/* Material + Color Family */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Material">
                    <input
                      type="text"
                      value={form.material}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, material: e.target.value }))
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Color Family">
                    <input
                      type="text"
                      value={form.colorFamily}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, colorFamily: e.target.value }))
                      }
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Min Price (USD)">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={form.minPrice}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          minPrice: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Max Price (USD)">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={form.maxPrice}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          maxPrice: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* MOQ + Lead Time */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="MOQ">
                    <input
                      type="number"
                      min={1}
                      value={form.moq}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          moq: parseInt(e.target.value) || 1,
                        }))
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Lead Time (days)">
                    <input
                      type="number"
                      min={1}
                      value={form.leadTimeDays}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          leadTimeDays: parseInt(e.target.value) || 21,
                        }))
                      }
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Lead Time Label */}
                <Field label="Lead Time Label">
                  <input
                    type="text"
                    placeholder="e.g. 3-5 weeks production plus shipping"
                    value={form.leadTimeLabel}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, leadTimeLabel: e.target.value }))
                    }
                    className={inputCls}
                  />
                </Field>

                {/* Decoration Methods */}
                <div>
                  <label className={labelCls}>Decoration Methods</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {DECORATION_METHODS.map((method) => {
                      const active = form.decorationMethods.includes(method);
                      return (
                        <button
                          key={method}
                          type="button"
                          onClick={() => toggleDecoration(method)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                            active
                              ? "border-[#215dbe] bg-[#215dbe] text-white"
                              : "border-[#dbe5f1] bg-white text-[#5f7087] hover:border-[#215dbe]"
                          }`}
                        >
                          {method}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Variants */}
                <div>
                  <label className={labelCls}>Color Variants</label>
                  {form.variants.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {form.variants.map((v) => (
                        <span
                          key={v}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#dbe5f1] bg-[#f7fbff] px-2.5 py-1 text-xs text-[#5f7087]"
                        >
                          {v}
                          <button
                            onClick={() => removeVariant(v)}
                            className="text-[#73839b] hover:text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add variant (e.g. Navy)…"
                      value={variantInput}
                      onChange={(e) => setVariantInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addVariant();
                        }
                      }}
                      className={`flex-1 ${inputCls}`}
                    />
                    <button
                      type="button"
                      onClick={addVariant}
                      className="rounded-lg border border-[#dbe5f1] px-3 py-2 text-xs font-medium text-[#5f7087] hover:bg-[#f7fbff]"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#dbe5f1] px-6 py-4">
              <button
                onClick={closePanel}
                disabled={saving}
                className="rounded-xl border border-[#dbe5f1] px-5 py-2.5 text-sm font-medium text-[#5f7087] hover:bg-[#f7fbff] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-[linear-gradient(135deg,#195fd4_0%,#2d7cff_100%)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving…" : panel === "add" ? "Create Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const labelCls =
  "block text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]";

const inputCls =
  "w-full rounded-lg border border-[#dbe5f1] bg-white px-3 py-2 text-sm text-[#10233f] placeholder:text-[#aab8c8] focus:border-[#215dbe] focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={`mb-1.5 ${labelCls}`}>{label}</label>
      {children}
    </div>
  );
}
