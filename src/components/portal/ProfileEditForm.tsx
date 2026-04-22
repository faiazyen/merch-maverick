"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ProfileEditFormProps {
  profile: {
    fullName: string;
    email: string;
    businessName: string;
    phone: string;
    country: string;
  };
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const [form, setForm] = useState({
    full_name: profile.fullName ?? "",
    business_name: profile.businessName ?? "",
    phone: profile.phone ?? "",
    country: profile.country ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
    setError("");
  }

  async function handleSave() {
    setSaving(true);
    setSuccess(false);
    setError("");
    try {
      const res = await fetch("/api/portal/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to save.");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0] mb-2">
          Business Email <span className="normal-case font-normal text-[#8a9ab0]">(cannot be changed)</span>
        </label>
        <input
          type="email"
          value={profile.email}
          disabled
          className="w-full rounded-2xl border border-[#E5E2DB] bg-[#F5F4F0] px-4 py-3 text-sm text-[#8a9ab0] cursor-not-allowed"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0] mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={form.full_name}
            onChange={(e) => handleChange("full_name", e.target.value)}
            className="w-full rounded-2xl border border-[#E5E2DB] bg-white px-4 py-3 text-sm text-[#10233f] placeholder-[#a0aec0] focus:outline-none focus:border-[#C4F542] transition-colors"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0] mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={form.business_name}
            onChange={(e) => handleChange("business_name", e.target.value)}
            className="w-full rounded-2xl border border-[#E5E2DB] bg-white px-4 py-3 text-sm text-[#10233f] placeholder-[#a0aec0] focus:outline-none focus:border-[#C4F542] transition-colors"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0] mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full rounded-2xl border border-[#E5E2DB] bg-white px-4 py-3 text-sm text-[#10233f] placeholder-[#a0aec0] focus:outline-none focus:border-[#C4F542] transition-colors"
            placeholder="+1 555 000 0000"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0] mb-2">
            Country
          </label>
          <input
            type="text"
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className="w-full rounded-2xl border border-[#E5E2DB] bg-white px-4 py-3 text-sm text-[#10233f] placeholder-[#a0aec0] focus:outline-none focus:border-[#C4F542] transition-colors"
            placeholder="United States"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={() => void handleSave()}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[#C4F542] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-opacity hover:bg-[#b5e13a] disabled:opacity-50"
        >
          {saving && <Loader2 size={15} className="animate-spin" />}
          {saving ? "Saving…" : "Save changes"}
        </button>
        {success && (
          <span className="text-sm font-medium text-[#2d8f59]">Profile updated.</span>
        )}
        {error && (
          <span className="text-sm text-[#b24a3b]">{error}</span>
        )}
      </div>
    </div>
  );
}
