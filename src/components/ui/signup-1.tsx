"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

type AuthMode = "signup" | "login";

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
  website: "",
  phone: "",
  industry: "",
  country: "",
  email: "",
  marketingOptIn: true,
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
    body: "Passwordless sign in through private email links and protected portal access.",
  },
];

export function Signup1({
  heading = "Create your client account",
  googleText = "Continue with Google",
  signupText = "Get your secure sign in link",
  loginText = "Already have an account?",
  loginUrl = "/sign-in",
  initialMode = "signup",
  errorMessage,
}: Signup1Props) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [signupForm, setSignupForm] = useState(defaultSignupForm);
  const [loginEmail, setLoginEmail] = useState("");
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
      setStatus({ type: "error", message: errorMessage });
    }
  }, [errorMessage]);

  const submitLabel = useMemo(
    () =>
      mode === "signup" ? signupText : "Email me a secure sign in link",
    [mode, signupText]
  );

  const introCopy =
    mode === "signup"
      ? "Open your client account, save your business details, and make future reorders frictionless."
      : "Sign back in with your business email and step straight into your saved portal.";

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

  const handleEmailAuth = async () => {
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
        ];

        if (requiredFields.some((value) => !value.trim())) {
          throw new Error(
            "Please complete your name, business name, industry, country, and email before continuing."
          );
        }
      } else if (!loginEmail.trim()) {
        throw new Error("Please enter your email to continue.");
      }

      const email = mode === "signup" ? signupForm.email : loginEmail;
      const emailRedirectTo = `${window.location.origin}/auth/callback?next=/portal`;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo,
          shouldCreateUser: mode === "signup",
          data:
            mode === "signup"
              ? {
                  full_name: signupForm.fullName,
                  business_name: signupForm.businessName,
                  website: signupForm.website,
                  phone: signupForm.phone,
                  industry: signupForm.industry,
                  country: signupForm.country,
                  marketing_opt_in: signupForm.marketingOptIn,
                }
              : undefined,
        },
      });

      if (error) {
        throw error;
      }

      setStatus({
        type: "success",
        message:
          mode === "signup"
            ? "Check your email for the secure sign in link. Your business details will be saved as soon as you complete sign in."
            : "Check your email for the secure sign in link.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while requesting your sign in link.";
      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
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
        redirectTo: `${window.location.origin}/auth/callback?next=/portal`,
      },
    });

    if (error) {
      setStatus({ type: "error", message: error.message });
      setIsSubmitting(false);
    }
  };

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
                  <MaverickLogo size="md" descriptor="Secure client portal" />
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
                  <label className="grid gap-2 text-sm text-text-light dark:text-text-dark">
                    <span className="font-medium">Full name</span>
                    <Input
                      placeholder="Faiaz Hossain Mazumder"
                      value={signupForm.fullName}
                      onChange={(event) =>
                        handleSignupChange("fullName", event.target.value)
                      }
                      required
                      className="h-11 rounded-xl border-white/60 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-text-light dark:text-text-dark">
                    <span className="font-medium">Business name</span>
                    <Input
                      placeholder="Merch Maverick"
                      value={signupForm.businessName}
                      onChange={(event) =>
                        handleSignupChange("businessName", event.target.value)
                      }
                      required
                      className="h-11 rounded-xl border-white/60 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-text-light dark:text-text-dark">
                    <span className="font-medium">Business website</span>
                    <Input
                      placeholder="https://yourcompany.com"
                      type="url"
                      value={signupForm.website}
                      onChange={(event) =>
                        handleSignupChange("website", event.target.value)
                      }
                      className="h-11 rounded-xl border-white/60 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-text-light dark:text-text-dark">
                    <span className="font-medium">Phone number</span>
                    <Input
                      placeholder="+420 ..."
                      type="tel"
                      value={signupForm.phone}
                      onChange={(event) =>
                        handleSignupChange("phone", event.target.value)
                      }
                      className="h-11 rounded-xl border-white/60 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-text-light dark:text-text-dark">
                    <span className="font-medium">Industry</span>
                    <Input
                      placeholder="Hospitality, corporate, fitness..."
                      value={signupForm.industry}
                      onChange={(event) =>
                        handleSignupChange("industry", event.target.value)
                      }
                      required
                      className="h-11 rounded-xl border-white/60 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-text-light dark:text-text-dark">
                    <span className="font-medium">Country</span>
                    <Input
                      placeholder="Germany"
                      value={signupForm.country}
                      onChange={(event) =>
                        handleSignupChange("country", event.target.value)
                      }
                      required
                      className="h-11 rounded-xl border-white/60 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-text-light dark:text-text-dark sm:col-span-2">
                    <span className="font-medium">Business email</span>
                    <Input
                      type="email"
                      placeholder="hello@yourcompany.com"
                      value={signupForm.email}
                      onChange={(event) =>
                        handleSignupChange("email", event.target.value)
                      }
                      required
                      className="h-11 rounded-xl border-white/60 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5"
                    />
                  </label>
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
                      I agree to receive product updates, reorder reminders, and
                      business communications from Merch Maverick.
                    </span>
                  </label>
                </div>
              ) : (
                <div className="grid gap-4">
                  <label className="grid gap-2 text-sm text-text-light dark:text-text-dark">
                    <span className="font-medium">Business email</span>
                    <Input
                      type="email"
                      placeholder="hello@yourcompany.com"
                      value={loginEmail}
                      onChange={(event) => setLoginEmail(event.target.value)}
                      required
                      className="h-11 rounded-xl border-white/60 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5"
                    />
                  </label>
                </div>
              )}

              <div className="grid gap-3">
                <Button
                  type="button"
                  className="mt-1 h-11 w-full rounded-xl bg-teal text-white hover:bg-teal-dark dark:bg-teal dark:text-white"
                  onClick={handleEmailAuth}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait..." : submitLabel}
                  {!isSubmitting && <ArrowRight className="ml-2 size-4" />}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full rounded-xl border-white/60 bg-white/80 text-text-light shadow-sm hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-text-dark dark:hover:bg-white/10"
                  onClick={handleGoogleAuth}
                  disabled={isSubmitting}
                >
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button>
              </div>

              {status.type !== "idle" && (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                    status.type === "success"
                      ? "border-teal/30 bg-teal/10 text-text-light dark:text-text-dark"
                      : "border-error/30 bg-error/10 text-text-light dark:text-text-dark"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="grid gap-3 rounded-[1.4rem] border border-white/70 bg-[#f8f4ec] p-4 text-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-2 font-medium text-text-light dark:text-text-dark">
                  <Building2 size={16} className="text-teal" />
                  Built for returning business clients
                </div>
                <div className="flex items-center gap-2 text-muted-light dark:text-muted-dark">
                  <Mail size={16} className="text-teal" />
                  Passwordless sign in through secure email links
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
              ) : (
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
                Save your business profile once, return with a secure sign-in link,
                and keep every future order closer to factory-direct execution.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.6rem] border border-white/60 bg-white/70 p-5 shadow-[0_18px_55px_rgba(17,24,39,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
                  Production
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-text-light dark:text-text-dark">
                  35+
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-light dark:text-muted-dark">
                  Years of factory heritage behind every order.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-white/60 bg-white/70 p-5 shadow-[0_18px_55px_rgba(17,24,39,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
                  Margin
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-text-light dark:text-text-dark">
                  Direct
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-light dark:text-muted-dark">
                  No-middleman workflow built for better pricing control.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-white/60 bg-white/70 p-5 shadow-[0_18px_55px_rgba(17,24,39,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-light dark:text-muted-dark">
                  Materials
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-text-light dark:text-text-dark">
                  Cotton
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-light dark:text-muted-dark">
                  Premium, skin-conscious options over synthetic-heavy merch.
                </p>
              </div>
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
