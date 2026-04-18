import { Globe, Mail, MapPin, Phone, User2 } from "lucide-react";

import { getPortalDataBundle } from "@/lib/portal/data";

const fields = [
  { key: "fullName", label: "Primary Contact", icon: User2 },
  { key: "email", label: "Business Email", icon: Mail },
  { key: "phone", label: "Phone", icon: Phone },
  { key: "website", label: "Website", icon: Globe },
  { key: "country", label: "Country", icon: MapPin },
] as const;

export default async function PortalAccountPage() {
  const bundle = await getPortalDataBundle();

  if (!bundle) {
    return null;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <section className="rounded-2xl border border-[#dbe5f1] bg-white p-6 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b8aa0]">Business Profile</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#10233f]">
          {bundle.profile.businessName}
        </h2>
        <p className="mt-2 text-sm text-[#73839b]">
          Keep your account foundation ready for repeat estimates, uploads, approvals, and production follow-up.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {fields.map((field) => {
            const Icon = field.icon;
            const value = bundle.profile[field.key];

            return (
              <div key={field.key} className="rounded-2xl bg-[#f6f9fd] px-4 py-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e8f1ff] text-[#215dbe]">
                  <Icon size={18} />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">
                  {field.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#10233f]">{String(value || "Not set")}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-[#dbe5f1] bg-white p-6 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
        <h3 className="text-lg font-semibold text-[#10233f]">Onboarding Signals</h3>
        <div className="mt-5 space-y-4">
          <InfoCard label="Industry" value={bundle.profile.industry || "Business profile"} />
          <InfoCard
            label="Estimated Order Volume"
            value={bundle.profile.estimatedOrderVolume || "Project-based"}
          />
          <InfoCard
            label="Preferred Categories"
            value={
              bundle.profile.preferredCategories.length > 0
                ? bundle.profile.preferredCategories.join(", ")
                : "Not selected yet"
            }
          />
          <InfoCard
            label="Marketing Opt-in"
            value={bundle.profile.marketingOptIn ? "Subscribed" : "Not subscribed"}
          />
        </div>
      </section>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#f6f9fd] px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8aa0]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[#10233f]">{value}</p>
    </div>
  );
}
