import type { Metadata } from "next";

import { Signup1 } from "@/components/ui/signup-1";

export const metadata: Metadata = {
  title: "Sign In — Merch Maverick",
  description:
    "Create your client account, save your business details, and sign back in anytime to reorder faster.",
};

type SignInPageProps = {
  searchParams: Promise<{
    error?: string;
    mode?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const query = await searchParams;
  const initialMode = query.mode === "login" ? "login" : "signup";
  const errorMessage = query.error ? decodeURIComponent(query.error) : undefined;

  return <Signup1 initialMode={initialMode} errorMessage={errorMessage} />;
}
