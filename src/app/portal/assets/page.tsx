import { UploadCloud } from "lucide-react";

import { PortalAssetUploader } from "@/components/portal/PortalAssetUploader";
import { getPortalDataBundle } from "@/lib/portal/data";

export default async function PortalAssetsPage() {
  const bundle = await getPortalDataBundle();

  if (!bundle) {
    return null;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-2xl border border-[#dbe5f1] bg-white p-6 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#10233f]">Brand Asset Library</h2>
        <p className="mt-2 text-sm text-[#73839b]">
          Keep production-ready files linked to your account, quotes, and reorders.
        </p>

        <div className="mt-6">
          <PortalAssetUploader />
        </div>

        <div className="mt-6 rounded-2xl border border-[#e4edf7] bg-[#fbfdff] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#215dbe]">
              <UploadCloud size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#10233f]">Storage-backed upload path</p>
              <p className="text-xs text-[#73839b]">
                Uses Supabase Storage bucket `portal-assets` when service-role access is configured.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#dbe5f1] bg-white p-6 shadow-[0_10px_22px_rgba(16,35,63,0.04)]">
        <h3 className="text-lg font-semibold text-[#10233f]">Saved Files</h3>
        <div className="mt-5 space-y-3">
          {bundle.assets.map((asset) => (
            <div key={asset.id} className="rounded-2xl bg-[#f6f9fd] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#10233f]">{asset.name}</p>
                  <p className="mt-1 text-xs text-[#73839b]">
                    {asset.type} · {asset.sizeLabel} · linked to {asset.linkedTo}
                  </p>
                </div>
                <span className="rounded-full bg-[#eaf7ef] px-2.5 py-1 text-xs font-semibold text-[#2d8f59]">
                  {asset.status === "ready" ? "Ready" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
