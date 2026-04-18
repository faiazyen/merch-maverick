import { notFound } from "next/navigation";
import PreviewWorkspace from "@/components/internal/PreviewWorkspace";

const internalRoutesEnabled = process.env.ENABLE_INTERNAL_ROUTES === "true";

export default function PreviewPage() {
  if (!internalRoutesEnabled) {
    notFound();
  }

  return <PreviewWorkspace />;
}
