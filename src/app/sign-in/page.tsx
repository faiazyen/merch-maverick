import type { Metadata } from "next";

import { Signup1 } from "@/components/ui/signup-1";

export const metadata: Metadata = {
  title: "Sign In — The Merch Maverick",
  description:
    "Create your client account, save your business details, and sign back in anytime to reorder faster.",
};

type SignInPageProps = {
  searchParams: Promise<{
    error?: string;
    mode?: string;
    next?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const query = await searchParams;
  const initialMode =
    query.mode === "login" || query.mode === "reset" ? query.mode : "signup";
  const errorMessage = query.error ? decodeURIComponent(query.error) : undefined;
  const redirectTo = query.next?.startsWith("/") ? query.next : "/portal";
  const isAdminAccess = redirectTo === "/admin";

  return (
    <Signup1
      initialMode={initialMode}
      errorMessage={errorMessage}
      redirectTo={redirectTo}
      heading={isAdminAccess ? "Internal team sign in" : undefined}
      signupText={isAdminAccess ? "Create internal account" : undefined}
      googleText={isAdminAccess ? "Continue with Google" : undefined}
      loginText={isAdminAccess ? "Need a team account?" : undefined}
    />
  );
}
