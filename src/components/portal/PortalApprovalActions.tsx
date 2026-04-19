"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PortalApprovalActions({ approvalId, status }: { approvalId: string; status: string }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleAction(nextStatus: "approved" | "changes-requested") {
    setIsSaving(true);
    setFeedback("");

    const response = await fetch(`/api/portal/approvals/${approvalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: nextStatus }),
    });

    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setFeedback(payload?.error ?? "Unable to update approval.");
      setIsSaving(false);
      return;
    }

    setFeedback(nextStatus === "approved" ? "Approved" : "Changes requested");
    router.refresh();
    setIsSaving(false);
  }

  if (status !== "pending") {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        className="rounded-lg bg-[#0f7a5d] px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        disabled={isSaving}
        onClick={() => void handleAction("approved")}
        type="button"
      >
        Approve
      </button>
      <button
        className="rounded-lg border border-[#dbe5f1] px-3 py-2 text-xs font-semibold text-[#8a4a0a] transition-colors hover:bg-[#fff8ee] disabled:opacity-60"
        disabled={isSaving}
        onClick={() => void handleAction("changes-requested")}
        type="button"
      >
        Request changes
      </button>
      {feedback ? <p className="self-center text-xs text-[#73839b]">{feedback}</p> : null}
    </div>
  );
}
