"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Factory,
  Layers3,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { MaverickLogo } from "@/components/branding/MaverickLogo";

type AuthMode = "signup" | "login" | "reset";

interface Signup1Props {
  heading?: string;
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
  initialMode?: AuthMode;
  errorMessage?: string;
}

const defaultSignupForm = {
  fullName: "",
  businessName: "",
  jobTitle: "",
  website: "",
  phone: "",
  industry: "",
  country: "",
  estimatedOrderVolume: "",
  preferredCategories: "",
  email: "",
  password: "",
  marketingOptIn: true,
};

const defaultLoginForm = {
  email: "",
  password: "",
};

const defaultResetForm = {
  password: "",
  confirmPassword: "",
};

const trustPoints = [
  {
    icon: Factory,
    title: "Factory heritage",
    body: "Built on 35+ years of production experience, not reseller markup.",
  },
  {
    icon: Layers3,
    title: "Business data saved",
    body: "Your profile stays ready for reorders, custom specs, and faster approvals.",
  },
  {
    icon: ShieldCheck,
    title: "Secure access",
    body: "Email/password access, Google sign-in, and secure password recovery.",
  },
];

function formatAuthMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Invalid email or password. If this account was created during the earlier email-link flow, use Forgot password to finish setting your password first.";
  }

  if (normalized.includes("provider is not enabled") || normalized.includes("unsupported provider")) {
    return "Google sign-in is not enabled yet in Supabase Auth. Turn on the Google provider and verify its redirect URLs, then try again.";
  }

  if (normalized.includes("redirect") && normalized.includes("url")) {
    return "Google sign-in is blocked by an OAuth redirect mismatch. Check the Google provider callback URLs in Supabase and Google Cloud.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Your email exists, but it has not been confirmed in Supabase. If confirmation is now disabled, reset your password once or create a fresh account.";
  }

  return message;
}

export function Signup1({
  heading = "Create your client account",
  googleText = "Continue with Google",
  signupText = "Create account",
  loginText = "Already have an account?",
  loginUrl = "/sign-in",
  initialMode = "signup",
  errorMessage,
}: Signup1Props) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [signupForm, setSignupForm] = useState(defaultSignupForm);
  const [loginForm, setLoginForm] = useState(defaultLoginForm);
  const [resetRequestEmail, setResetRequestEmail] = useState("");
  const [resetForm, setResetForm] = useState(defaultResetForm);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (errorMessage) {
      setStatus({ type: "error", message: formatAuthMessage(errorMessage) });
    }
  }, [errorMessage]);

  const submitLabel = useMemo(() => {
    if (mode === "signup") {
      return signupText;
    }

    if (mode === "reset") {
      return "Save your new password";
    }

    return "Sign in to your portal";
  }, [mode, signupText]);

  const introCopy =
    mode === "signup"
      ? "Open your client account, save your business details, and make future reorders frictionless."
      : mode === "reset"
      ? "Create a new password for your client portal, then continue into your saved workspace."
      : "Sign back in with your business email and go straight into your saved portal.";

  const handleSignupChange = (
    key: keyof typeof defaultSignupForm,
    value: string | boolean
  ) => {
    setSignupForm((current) => ({ ...current, [key]: value }));
  };

  const resetStatus = () => {
    if (status.type !== "idle") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const getRecoveryRedirect = () => {
    const url = new URL("/auth/callback", window.location.origin);
    url.searchParams.set("next", "/sign-in?mode=reset");
    return url.toString();
  };

  const getPortalRedirect = () => {
    const url = new URL("/auth/callback", window.location.origin);
    url.searchParams.set("next", "/portal");
    return url.toString();
  };

  const buildProfileMetadata = () => ({
    full_name: signupForm.fullName,
    business_name: signupForm.businessName,
    job_title: signupForm.jobTitle,
    website: signupForm.website,
    phone: signupForm.phone,
    industry: signupForm.industry,
    country: signupForm.country,
    estimated_order_volume: signupForm.estimatedOrderVolume,
    preferred_categories: signupForm.preferredCategories
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    marketing_opt_in: signupForm.marketingOptIn,
  });

  const upsertCurrentProfile = async (
    supabase: NonNullable<ReturnType<typeof getSupabaseBrowserClient>>,
    metadata?: Record<string, unknown>
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return;
    }

    const resolvedMetadata = metadata ?? (user.user_metadata as Record<string, unknown> | undefined) ?? {};

    await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: user.email,
        full_name: typeof resolvedMetadata.full_name === "string" ? resolvedMetadata.full_name : null,
        business_name:
          typeof resolvedMetadata.business_name === "string" ? resolvedMetadata.business_name : null,
        website: typeof resolvedMetadata.website === "string" ? resolvedMetadata.website : null,
        phone: typeof resolvedMetadata.phone === "string" ? resolvedMetadata.phone : null,
        industry: typeof resolvedMetadata.industry === "string" ? resolvedMetadata.industry : null,
        country: typeof resolvedMetadata.country === "string" ? resolvedMetadata.country : null,
        job_title: typeof resolvedMetadata.job_title === "string" ? resolvedMetadata.job_title : null,
        estimated_order_volume:
          typeof resolvedMetadata.estimated_order_volume === "string"
            ? resolvedMetadata.estimated_order_volume
            : null,
        preferred_categories: Array.isArray(resolvedMetadata.preferred_categories)
          ? resolvedMetadata.preferred_categories.map(String)
          : [],
        marketing_opt_in: Boolean(resolvedMetadata.marketing_opt_in),
        profile_completed: true,
      },
      { onConflict: "id" }
    );
  };

  async function handleEmailAuth() {
    resetStatus();

    if (!isSupabaseConfigured) {
      setStatus({
        type: "error",
        message:
          "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY first.",
      });
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus({
        type: "error",
        message: "Supabase client could not be created.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        const requiredFields = [
          signupForm.fullName,
          signupForm.businessName,
          signupForm.industry,
          signupForm.country,
          signupForm.email,
          signupForm.password,
        ];

        if (requiredFields.some((value) => !value.trim())) {
          throw new Error(
            "Please complete your name, business name, industry, country, email, and password before continuing."
          );
        }

        const profileMetadata = buildProfileMetadata();
        const { data, error } = await supabase.auth.signUp({
          email: signupForm.email,
          password: signupForm.password,
          options: {
            emailRedirectTo: getPortalRedirect(),
            data: profileMetadata,
          },
        });

        if (error) {
          throw error;
        }

        if (data.session) {
          await upsertCurrentProfile(supabase, profileMetadata);
          router.push("/portal");
          router.refresh();
          return;
        }

        setStatus({
          type: "success",
          message:
            "Account created. If email confirmation is enabled in Supabase, confirm your email first, then sign in to enter the portal.",
        });
        setMode("login");
        setLoginForm({
          email: signupForm.email,
          password: "",
        });
        return;
      }

      if (mode === "login") {
        if (!loginForm.email.trim() || !loginForm.password.trim()) {
          throw new Error("Please enter your email and password to continue.");
        }

        const { error } = await supabase.auth.signInWithPassword({
          email: loginForm.email,
          password: loginForm.password,
        });

        if (error) {
          throw error;
        }

        await upsertCurrentProfile(supabase);
        router.push("/portal");
        router.refresh();
        return;
      }

      if (!resetForm.password.trim() || !resetForm.confirmPassword.trim()) {
        throw new Error("Please enter and confirm your new password.");
      }

      if (resetForm.password !== resetForm.confirmPassword) {
        throw new Error("Your password confirmation does not match.");
      }

      const { error } = await supabase.auth.updateUser({
        password: resetForm.password,
      });

      if (error) {
        throw error;
      }

      setStatus({
        type: "success",
        message: "Password updated. Redirecting you to your client portal...",
      });
      router.push("/portal");
      router.refresh();
    } catch (error) {
      setStatus({
          type: "error",
          message:
            error instanceof Error
              ? formatAuthMessage(error.message)
              : "Something went wrong while processing authentication.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleForgotPassword() {
    resetStatus();

    if (!isSupabaseConfigured) {
      setStatus({
        type: "error",
        message:
          "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY first.",
      });
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus({
        type: "error",
        message: "Supabase client could not be created.",
      });
      return;
    }

    if (!resetRequestEmail.trim()) {
      setStatus({
        type: "error",
        message: "Enter your account email first, then request a password reset.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetRequestEmail, {
        redirectTo: getRecoveryRedirect(),
      });

      if (error) {
        throw error;
      }

      setStatus({
        type: "success",
        message:
          "Password reset email sent. Open the Supabase recovery link, then create your new password here.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? formatAuthMessage(error.message) : "Unable to send the password reset email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleAuth() {
    resetStatus();

    if (!isSupabaseConfigured) {
      setStatus({
        type: "error",
        message:
          "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY first.",
      });
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus({
        type: "error",
        message: "Supabase client could not be created.",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getPortalRedirect(),
      },
    });

    if (error) {
      setStatus({ type: "error", message: formatAuthMessage(error.message) });
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(43,107,94,0.18),_transparent_30%),linear-gradient(180deg,_#fbfaf6_0%,_#f5f1e8_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(43,107,94,0.2),_transparent_30%),linear-gradient(180deg,_#0f1715_0%,_#111d1a_100%)]">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-[8%] top-24 h-40 w-40 rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute bottom-12 right-[10%] h-52 w-52 rounded-full bg-[#d8c7a1]/20 blur-3xl dark:bg-[#c2a978]/10" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-2 rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)] backdrop-blur xl:p-8 dark:border-white/8 dark:bg-[#111917]/85 dark:shadow-[0_24px_80px_rgba(0,0,0,0.28)] lg:order-1">
            <div className="mb-8">
              <div className="mb-5 inline-flex items-center rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-teal">
                Client Access
              </div>
              <div className="flex items-center gap-1">
                <Link href="/">
                  <MaverickLogo size="md" descriptor="Secure client portal" surface="adaptive" />
                </Link>
              </div>
              <h1 className="mt-6 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-text-light sm:text-4xl dark:text-text-dark">
                {heading}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-light dark:text-muted-dark">
                {introCopy}
              </p>
            </div>

            <div className="mb-6 flex w-full rounded-full border border-border-light bg-bg-secondary-light p-1 dark:border-border-dark dark:bg-bg-secondary-dark">
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  resetStatus();
                }}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  mode === "signup"
                    ? "bg-white text-text-light shadow-sm dark:bg-card-dark dark:text-text-dark"
                    : "text-muted-light dark:text-muted-dark"
                }`}
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  resetStatus();
                }}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  mode === "login"
                    ? "bg-white text-text-light shadow-sm dark:bg-card-dark dark:text-text-dark"
                    : "text-muted-light dark:text-muted-dark"
                }`}
              >
                Sign in
              </button>
            </div>

            <div className="flex w-full flex-col gap-6">
              {mode === "signup" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    value={signupForm.fullName}
                    onChange={(value) => handleSignupChange("fullName", value)}
                    placeholder="Faiaz Hossain Mazumder"
                    required
                  />
                  <Field
                    label="Business name"
                    value={signupForm.businessName}
                    onChange={(value) => handleSignupChange("businessName", value)}
                    placeholder="Merch Maverick"
                    required
                  />
                  <Field
                    label="Business website"
                    value={signupForm.website}
                    onChange={(value) => handleSignupChange("website", value)}
                    placeholder="https://yourcompany.com"
                    type="url"
                  />
                  <Field
                    label="Job title"
                    value={signupForm.jobTitle}
                    onChange={(value) => handleSignupChange("jobTitle", value)}
                    placeholder="Procurement Lead"
                  />
                  <Field
                    label="Phone number"
                    value={signupForm.phone}
                    onChange={(value) => handleSignupChange("phone", value)}
                    placeholder="+420 ..."
                    type="tel"
                  />
                  <Field
                    label="Industry"
                    value={signupForm.industry}
                    onChange={(value) => handleSignupChange("industry", value)}
                    placeholder="Hospitality, corporate, fitness..."
                    required
                  />
                  <Field
                    label="Country"
                    value={signupForm.country}
                    onChange={(value) => handleSignupChange("country", value)}
                    placeholder="Germany"
                    required
                  />
                  <Field
                    label="Order volume"
                    value={signupForm.estimatedOrderVolume}
                    onChange={(value) => handleSignupChange("estimatedOrderVolume", value)}
                    placeholder="Quarterly programs, seasonal drops..."
                  />
                  <Field
                    label="Preferred categories"
                    value={signupForm.preferredCategories}
                    onChange={(value) => handleSignupChange("preferredCategories", value)}
                    placeholder="Hoodies, drinkware, uniforms"
                  />
                  <Field
                    label="Business email"
                    value={signupForm.email}
                    onChange={(value) => handleSignupChange("email", value)}
                    placeholder="hello@yourcompany.com"
                    type="email"
                    required
                    wide
                  />
                  <Field
                    label="Password"
                    value={signupForm.password}
                    onChange={(value) => handleSignupChange("password", value)}
                    placeholder="Create a secure password"
                    type="password"
                    required
                    wide
                  />
                  <label className="sm:col-span-2 flex items-start gap-3 rounded-2xl border border-white/70 bg-[#faf6ef] px-4 py-3 text-sm text-muted-light dark:border-white/10 dark:bg-white/5 dark:text-muted-dark">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-border-light text-teal focus:ring-teal"
                      checked={signupForm.marketingOptIn}
                      onChange={(event) =>
                        handleSignupChange("marketingOptIn", event.target.checked)
                      }
                    />
                    <span>
                      I agree to receive product updates, reorder reminders, and business communications from Merch Maverick.
                    </span>
                  </label>
                </div>
              ) : mode === "login" ? (
                <div className="grid gap-4">
                  <Field
                    label="Business email"
                    value={loginForm.email}
                    onChange={(value) => {
                      setLoginForm((current) => ({ ...current, email: value }));
                      setResetRequestEmail(value);
                    }}
                    placeholder="hello@yourcompany.com"
                    type="email"
                    required
                  />
                  <Field
                    label="Password"
                    value={loginForm.password}
                    onChange={(value) => setLoginForm((current) => ({ ...current, password: value }))}
                    placeholder="Enter your password"
                    type="password"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => void handleForgotPassword()}
                      className="text-sm font-medium text-text-light hover:underline dark:text-text-dark"
                      disabled={isSubmitting}
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  <Field
                    label="New password"
                    value={resetForm.password}
                    onChange={(value) => setResetForm((current) => ({ ...current, password: value }))}
                    placeholder="Create your new password"
                    type="password"
                    required
                  />
                  <Field
                    label="Confirm new password"
                    value={resetForm.confirmPassword}
                    onChange={(value) =>
                      setResetForm((current) => ({ ...current, confirmPassword: value }))
                    }
                    placeholder="Repeat your new password"
                    type="password"
                    required
                  />
                </div>
              )}

              <div className="grid gap-3">
                <Button
                  type="button"
                  className="mt-1 h-11 w-full rounded-xl bg-teal text-white hover:bg-teal-dark dark:bg-teal dark:text-white"
                  onClick={() => void handleEmailAuth()}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait..." : submitLabel}
                  {!isSubmitting ? <ArrowRight className="ml-2 size-4" /> : null}
                </Button>
                {mode !== "reset" ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full rounded-xl border-white/60 bg-white/80 text-text-light shadow-sm hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-text-dark dark:hover:bg-white/10"
                    onClick={() => void handleGoogleAuth()}
                    disabled={isSubmitting}
                  >
                    <FcGoogle className="mr-2 size-5" />
                    {googleText}
                  </Button>
                ) : null}
              </div>

              {status.type !== "idle" ? (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                    status.type === "success"
                      ? "border-teal/30 bg-teal/10 text-text-light dark:text-text-dark"
                      : "border-error/30 bg-error/10 text-text-light dark:text-text-dark"
                  }`}
                >
                  {status.message}
                </div>
              ) : null}

              <div className="grid gap-3 rounded-[1.4rem] border border-white/70 bg-[#f8f4ec] p-4 text-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-2 font-medium text-text-light dark:text-text-dark">
                  <Building2 size={16} className="text-teal" />
                  Built for returning business clients
                </div>
                <div className="flex items-center gap-2 text-muted-light dark:text-muted-dark">
                  <Mail size={16} className="text-teal" />
                  Password reset emails handled through Supabase recovery links
                </div>
                <div className="flex items-center gap-2 text-muted-light dark:text-muted-dark">
                  <ShieldCheck size={16} className="text-teal" />
                  Ready for reorders, saved specs, and future sales follow-ups
                </div>
              </div>
            </div>

            <div className="mt-7 flex justify-center gap-1 text-sm text-muted-light dark:text-muted-dark">
              {mode === "signup" ? (
                <>
                  <p>{loginText}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      resetStatus();
                    }}
                    className="font-medium text-text-light hover:underline dark:text-text-dark"
                  >
                    Login
                  </button>
                </>
              ) : mode === "login" ? (
                <>
                  <p>New here?</p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      resetStatus();
                    }}
                    className="font-medium text-text-light hover:underline dark:text-text-dark"
                  >
                    Create your account
                  </button>
                </>
              ) : (
                <>
                  <p>Remembered it?</p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      resetStatus();
                    }}
                    className="font-medium text-text-light hover:underline dark:text-text-dark"
                  >
                    Back to sign in
                  </button>
                </>
              )}
              <Link href={loginUrl} className="sr-only">
                Authentication page
              </Link>
            </div>
          </div>

          <div className="order-1 flex flex-col justify-center lg:order-2 lg:pl-8">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center rounded-full border border-white/50 bg-white/60 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-text-light backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-text-dark">
                Merch Maverick Portal
              </div>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-text-light sm:text-5xl dark:text-text-dark">
                Branded client access built for faster reorders, cleaner approvals, and stronger account continuity.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-light dark:text-muted-dark">
                Save your business profile once, return with a password or Google sign-in, and keep every future order closer to factory-direct execution.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <MetricCard
                title="Production"
                value="35+"
                body="Years of factory heritage behind every order."
              />
              <MetricCard
                title="Margin"
                value="Direct"
                body="No-middleman workflow built for better pricing control."
              />
              <MetricCard
                title="Materials"
                value="Cotton"
                body="Premium, skin-conscious options over synthetic-heavy merch."
              />
            </div>

            <div className="mt-8 grid gap-4">
              {trustPoints.map((point) => (
                <div
                  key={point.title}
                  className="flex items-start gap-4 rounded-[1.6rem] border border-white/55 bg-white/60 p-5 shadow-[0_18px_55px_rgba(17,24,39,0.05)] backdrop-blur dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                    <point.icon size={18} />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-text-light dark:text-text-dark">
                      {point.title}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-muted-light dark:text-muted-dark">
                      {point.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  wide = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  wide?: boolean;
}) {
  return (
    <label
      className={`grid gap-2 text-sm text-text-light dark:text-text-dark ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <span className="font-medium">{label}</span>
      <Input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="h-11 rounded-xl border-white/60 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5"
      />
    </label>
  );
}

function MetricCard({
  title,
  value,
  body,
}: {
  title: string;
  value: string;
  body: string;
}) {
  return (
    <div className="rounded-[1.6rem] border border-white/60 bg-white/70 p-5 shadow-[0_18px_55px_rgba(17,24,39,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
        {title}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-text-light dark:text-text-dark">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-light dark:text-muted-dark">{body}</p>
    </div>
  );
}
