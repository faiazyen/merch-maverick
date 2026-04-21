import { redirect } from "next/navigation";

import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { getPortalDataBundle } from "@/lib/portal/data";

export default async function OnboardingPage() {
  const bundle = await getPortalDataBundle();

  if (!bundle) {
    redirect("/sign-in?mode=login");
  }

  // If already completed, skip to portal
  if (bundle.profile.onboardingCompleted) {
    redirect("/portal");
  }

  const firstName = bundle.profile.fullName?.split(" ")[0] ?? "";

  return (
    <OnboardingFlow
      firstName={firstName}
      initialStep={bundle.profile.onboardingStep ?? 0}
    />
  );
}
