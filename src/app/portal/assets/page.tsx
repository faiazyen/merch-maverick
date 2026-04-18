import { UploadCloud } from "lucide-react";

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

        <div className="mt-6 rounded-2xl border border-dashed border-[#cddbef] bg-[#f7fbff] px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f1ff] text-[#215dbe]">
            <UploadCloud size={22} />
          </div>
          <p className="mt-4 text-lg font-semibold text-[#10233f]">Upload new brand assets</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-[#73839b]">
            Upload flow is available inside the configurator so assets stay attached to the right estimate. This library shows the files already connected to your account.
          </p>
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
