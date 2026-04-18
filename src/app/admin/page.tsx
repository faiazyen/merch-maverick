import { notFound } from "next/navigation";
import AdminDashboard from "@/components/internal/AdminDashboard";

const internalRoutesEnabled = process.env.ENABLE_INTERNAL_ROUTES === "true";

export default function AdminPage() {
  if (!internalRoutesEnabled) {
    notFound();
  }

  return <AdminDashboard />;
}
