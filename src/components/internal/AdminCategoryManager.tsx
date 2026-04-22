"use client";

import { useState } from "react";

import type { CatalogCategory } from "@/lib/portal/types";

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

interface Props {
  initialCategories: CatalogCategory[];
}

type FormState = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
};

function emptyForm(displayOrder: number): FormState {
  return { name: "", slug: "", description: "", icon: "", isActive: true, displayOrder };
}

export default function AdminCategoryManager({ initialCategories }: Props) {
  const [categories, setCategories] = useState<CatalogCategory[]>(
    [...initialCategories].sort((a, b) => a.displayOrder - b.displayOrder)
  );
  const [panel, setPanel] = useState<"closed" | "add" | "edit">("closed");
  const [form, setForm] = useState<FormState>(emptyForm(0));
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  function openAdd() {
    setForm(emptyForm(categories.length));
    setError(null);
    setPanel("add");
  }

  function openEdit(cat: CatalogCategory) {
    setForm({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon,
      isActive: cat.isActive,
      displayOrder: cat.displayOrder,
    });
    setError(null);
    setPanel("edit");
  }

  function handleNameChange(name: string) {
    setForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug === "" || prev.slug === toSlug(prev.name) ? toSlug(name) : prev.slug,
    }));
  }

  async function handleSave() {
    if (!form.name.trim() || !form.slug.trim()) {
      setError("Name and slug are required.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      if (panel === "add") {
        const res = await fetch("/api/admin/catalog/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            slug: form.slug.trim(),
            description: form.description.trim(),
            icon: form.icon.trim(),
            isActive: form.isActive,
            displayOrder: form.displayOrder,
          }),
        });
        const json = (await res.json()) as { category?: CatalogCategory; error?: string };
        if (!res.ok) throw new Error(json.error ?? "Failed to create category");
        setCategories((prev) => [...prev, json.category!].sort((a, b) => a.displayOrder - b.displayOrder));
        setBanner("Category created.");
      } else if (panel === "edit" && form.id) {
        const res = await fetch(`/api/admin/catalog/categories/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            slug: form.slug.trim(),
            description: form.description.trim(),
            icon: form.icon.trim(),
            isActive: form.isActive,
            displayOrder: form.displayOrder,
          }),
        });
        const json = (await res.json()) as { category?: CatalogCategory; error?: string };
        if (!res.ok) throw new Error(json.error ?? "Failed to update category");
        setCategories((prev) =>
          prev.map((c) => (c.id === form.id ? json.category! : c)).sort((a, b) => a.displayOrder - b.displayOrder)
        );
        setBanner("Category updated.");
      }
      setPanel("closed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(catId: string) {
    setDeletingId(catId);
    try {
      const res = await fetch(`/api/admin/catalog/categories/${catId}`, { method: "DELETE" });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Delete failed");
      }
      setCategories((prev) => prev.filter((c) => c.id !== catId));
      setConfirmDeleteId(null);
      setBanner("Category removed.");
    } catch (err) {
      setBanner(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  async function moveOrder(catId: string, direction: "up" | "down") {
    const idx = categories.findIndex((c) => c.id === catId);
    if (idx === -1) return;
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === categories.length - 1) return;

    const newCats = [...categories];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [newCats[idx], newCats[swapIdx]] = [newCats[swapIdx], newCats[idx]];
    const updated = newCats.map((c, i) => ({ ...c, displayOrder: i }));
    setCategories(updated);

    // Persist both swapped items
    await Promise.all([
      fetch(`/api/admin/catalog/categories/${updated[idx].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: updated[idx].displayOrder }),
      }),
      fetch(`/api/admin/catalog/categories/${updated[swapIdx].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: updated[swapIdx].displayOrder }),
      }),
    ]);
  }

  async function toggleActive(cat: CatalogCategory) {
    const res = await fetch(`/api/admin/catalog/categories/${cat.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !cat.isActive }),
    });
    if (res.ok) {
      setCategories((prev) =>
        prev.map((c) => (c.id === cat.id ? { ...c, isActive: !c.isActive } : c))
      );
    }
  }

  return (
    <div className="relative">
      {banner && (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {banner}
          <button onClick={() => setBanner(null)} className="ml-3 text-green-500 hover:text-green-700">✕</button>
        </div>
      )}

      <div className="mb-5 flex items-center justify-between">
        <p className="text-[13px] text-[#5f7087]">{categories.length} categories</p>
        <button
          onClick={openAdd}
          className="rounded-xl bg-[#2b6b5e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm hover:bg-[#1f5248]"
        >
          + Add Category
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white shadow-[0_2px_8px_rgba(16,35,63,0.04)]">
        {categories.length === 0 ? (
          <div className="px-8 py-12 text-center text-[13px] text-[#73839b]">
            No categories yet. Add your first one.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E2DB] bg-[#F5F4F0]">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">Order</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">Name</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">Slug</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">Status</th>
                <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat.id} className="border-b border-[#E5E2DB] last:border-0 hover:bg-[#F5F4F0]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveOrder(cat.id, "up")}
                        disabled={idx === 0}
                        className="rounded p-1 text-[#7b8aa0] hover:bg-[#e2e8f0] disabled:opacity-30"
                        aria-label="Move up"
                      >▲</button>
                      <button
                        onClick={() => moveOrder(cat.id, "down")}
                        disabled={idx === categories.length - 1}
                        className="rounded p-1 text-[#7b8aa0] hover:bg-[#e2e8f0] disabled:opacity-30"
                        aria-label="Move down"
                      >▼</button>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-[13px] font-medium text-[#10233f]">{cat.name}</span>
                    {cat.description && (
                      <p className="mt-0.5 text-[11px] text-[#73839b] line-clamp-1">{cat.description}</p>
                    )}
                  </td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[#73839b]">{cat.slug}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleActive(cat)}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                        cat.isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-[#f1f5f9] text-[#73839b]"
                      }`}
                    >
                      {cat.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {confirmDeleteId === cat.id ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="text-[11px] text-[#73839b]">Delete?</span>
                        <button
                          disabled={deletingId === cat.id}
                          onClick={() => handleDelete(cat.id)}
                          className="rounded-lg bg-red-500 px-3 py-1 text-[11px] font-medium text-white disabled:opacity-50"
                        >
                          {deletingId === cat.id ? "…" : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-lg border border-[#e2e8f0] px-3 py-1 text-[11px] text-[#5f7087]"
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEdit(cat)}
                          className="rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-[11px] font-medium text-[#5f7087] hover:bg-[#f8fafc]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(cat.id)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-[11px] font-medium text-red-500 hover:bg-red-50"
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
        )}
      </div>

      {/* Side panel */}
      {panel !== "closed" && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setPanel("closed")} />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E2DB] px-6 py-4">
              <h2 className="text-[15px] font-semibold text-[#10233f]">
                {panel === "add" ? "Add Category" : "Edit Category"}
              </h2>
              <button onClick={() => setPanel("closed")} className="text-[#73839b] hover:text-[#10233f]">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</div>
              )}
              <Field label="Name *">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Slug *">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  className={`${inputCls} font-mono`}
                />
              </Field>
              <Field label="Description">
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className={`${inputCls} resize-none`}
                />
              </Field>
              <Field label="Icon (emoji or code)">
                <input
                  type="text"
                  placeholder="e.g. 👕 or shirt"
                  value={form.icon}
                  onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                  className={inputCls}
                />
              </Field>
              <div className="flex items-center gap-3">
                <input
                  id="cat-active"
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))}
                  className="h-4 w-4 rounded border-[#E5E2DB] accent-[#2b6b5e]"
                />
                <label htmlFor="cat-active" className="text-[13px] text-[#5f7087]">Active (visible in portal)</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#E5E2DB] px-6 py-4">
              <button
                onClick={() => setPanel("closed")}
                disabled={saving}
                className="rounded-xl border border-[#E5E2DB] px-5 py-2.5 text-[13px] font-medium text-[#5f7087] hover:bg-[#F5F4F0] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-[#2b6b5e] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1f5248] disabled:opacity-50"
              >
                {saving ? "Saving…" : panel === "add" ? "Create" : "Save"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-[#E5E2DB] bg-white px-3 py-2 text-[13px] text-[#10233f] placeholder:text-[#aab8c8] focus:border-[#2b6b5e] focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7b8aa0]">{label}</label>
      {children}
    </div>
  );
}
