"use client";

import { useEffect, useState } from "react";
import { Download, Eye, Loader2, Trash2 } from "lucide-react";

import type { BrandAsset } from "@/lib/portal/types";
import { cn } from "@/lib/utils";

export function PortalAssetLibrary({ assets }: { assets: BrandAsset[] }) {
  const [localAssets, setAssets] = useState(assets);
  const [activeKey, setActiveKey] = useState("");
  const [message, setMessage] = useState("");
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string>("");

  useEffect(() => {
    setAssets(assets);
  }, [assets]);

  async function openAsset(assetId: string, mode: "preview" | "download") {
    setActiveKey(`${assetId}:${mode}`);
    setMessage("");

    try {
      const response = await fetch(`/api/portal/assets/${assetId}?mode=${mode}&format=json`);
      const payload = (await response.json()) as { error?: string; url?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Unable to open asset.");
      }

      window.open(payload.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to open asset.");
    } finally {
      setActiveKey("");
    }
  }

  async function handleDelete(assetId: string) {
    setDeletingId(assetId);
    setDeleteError("");

    try {
      const res = await fetch(`/api/portal/assets/${assetId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Delete failed.");
      }

      setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeletingId(null);
      setConfirmingId(null);
    }
  }

  return (
    <section className="rounded-2xl border border-[#E5E2DB] bg-white p-6 shadow-[0_2px_8px_rgba(16,35,63,0.04)]">
      <h3 className="text-lg font-semibold text-[#10233f]">Saved Files</h3>
      {localAssets.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center py-10 text-center">
          <p className="text-sm font-semibold text-[#10233f]">No files uploaded yet</p>
          <p className="mt-1 text-xs text-[#73839b]">Upload your brand assets above to keep them ready for quotes and production handoffs.</p>
        </div>
      ) : null}
      <div className="mt-5 space-y-3">
        {localAssets.map((asset) => {
          const canOpenFromStorage = Boolean(asset.storagePath && !asset.storagePath.startsWith("mock/"));

          return (
            <div key={asset.id} className="rounded-2xl border border-[#E5E2DB] bg-white px-4 py-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#10233f]">{asset.name}</p>
                  <p className="mt-1 text-xs text-[#73839b]">
                    {asset.type} · {asset.sizeLabel} · linked to {asset.linkedTo}
                  </p>
                  {asset.linkedId ? (
                    <p className="mt-1 text-xs text-[#8a9ab0]">Reference: {asset.linkedId}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 lg:items-end">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      asset.status === "ready"
                        ? "bg-[#eaf7ef] text-[#2d8f59]"
                        : "bg-[#fff4d9] text-[#d18600]"
                    )}
                  >
                    {asset.status === "ready" ? "Ready" : "Pending"}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    <button
                      className="inline-flex items-center gap-2 rounded-xl border border-[#E5E2DB] bg-white px-3 py-2 text-xs font-semibold text-[#47607f] transition-colors hover:text-[#1A1A1A] disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!canOpenFromStorage || activeKey.length > 0}
                      onClick={() => void openAsset(asset.id, "preview")}
                      type="button"
                    >
                      {activeKey === `${asset.id}:preview` ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Eye size={14} />
                      )}
                      Preview
                    </button>
                    <button
                      className="inline-flex items-center gap-2 rounded-xl border border-[#E5E2DB] bg-white px-3 py-2 text-xs font-semibold text-[#47607f] transition-colors hover:text-[#1A1A1A] disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!canOpenFromStorage || activeKey.length > 0}
                      onClick={() => void openAsset(asset.id, "download")}
                      type="button"
                    >
                      {activeKey === `${asset.id}:download` ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Download size={14} />
                      )}
                      Download
                    </button>
                    {confirmingId === asset.id ? (
                      <span className="flex items-center gap-2 text-sm">
                        <span className="text-red-600">Delete?</span>
                        <button
                          disabled={deletingId === asset.id}
                          onClick={() => void handleDelete(asset.id)}
                          className="rounded px-2 py-1 bg-red-600 text-white text-xs font-medium hover:bg-red-700 disabled:opacity-50"
                          type="button"
                        >
                          {deletingId === asset.id ? "Deleting…" : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmingId(null)}
                          className="rounded px-2 py-1 text-xs text-gray-500 hover:text-gray-800"
                          type="button"
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setConfirmingId(asset.id)}
                        className="rounded p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete asset"
                        type="button"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  {!canOpenFromStorage ? (
                    <p className="text-xs text-[#8a9ab0]">
                      Preview and download become available for storage-backed uploads.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {message ? <p className="mt-4 text-sm text-[#b24a3b]">{message}</p> : null}
      {deleteError && <p className="mt-2 text-sm text-red-600">{deleteError}</p>}
    </section>
  );
}
