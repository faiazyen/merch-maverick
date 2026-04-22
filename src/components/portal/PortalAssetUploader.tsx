"use client";

import { useRef, useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";

import type { BrandAsset } from "@/lib/portal/types";

export function PortalAssetUploader({
  linkedTo = "account",
  linkedId,
  onUploaded,
}: {
  linkedTo?: "account" | "quote" | "order";
  linkedId?: string;
  onUploaded?: (asset: BrandAsset) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string>("");

  async function handleFiles(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("linkedTo", linkedTo);
      if (linkedId) {
        formData.append("linkedId", linkedId);
      }

      const response = await fetch("/api/portal/assets", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { asset?: BrandAsset; error?: string };
      if (!response.ok || !payload.asset) {
        throw new Error(payload.error ?? "Upload failed.");
      }

      onUploaded?.(payload.asset);
      setMessage("Asset uploaded and linked successfully.");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-dashed border-[#E5E2DB] bg-[#F5F4F0] px-6 py-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#4B5563]">
        {isUploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
      </div>
      <p className="mt-4 text-sm font-semibold text-[#10233f]">Upload production-ready files</p>
      <p className="mt-2 text-xs leading-6 text-[#73839b]">
        SVG, PNG, PDF, AI, and PSD files can be attached to your account or a live estimate.
      </p>
      <input
        ref={inputRef}
        className="mt-4 block w-full text-sm text-[#5f7087] file:mr-4 file:rounded-xl file:border-0 file:bg-[#2b6b5e] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:cursor-pointer"
        onChange={(event) => void handleFiles(event.target.files)}
        type="file"
      />
      {message ? <p className="mt-3 text-sm text-[#4B5563]">{message}</p> : null}
    </div>
  );
}
