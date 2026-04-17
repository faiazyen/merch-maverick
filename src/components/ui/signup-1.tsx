"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Building2, Mail, ShieldCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

interface Signup1Props {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
  initialMode?: AuthMode;
  errorMessage?: string;
}

type AuthMode = "signup" | "login";

const defaultLogo = {
  url: "/",
  src: "/branding/merch-maverick-wordmark.svg",
  alt: "Merch Maverick",
  title: "Merch Maverick",
};

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

export function Signup1({
  heading = "Create your client account",
  logo = defaultLogo,
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
    <section className="bg-muted min-h-screen">
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="border-muted bg-background flex w-full max-w-lg flex-col items-center gap-y-8 rounded-2xl border px-6 py-12 shadow-md sm:px-8">
          <div className="flex flex-col items-center gap-y-2 text-center">
            <div className="flex items-center gap-1 lg:justify-start">
              <Link href={logo.url}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-10 dark:invert"
                  width={180}
                  height={40}
                />
              </Link>
            </div>
            <h1 className="text-3xl font-semibold text-text-light dark:text-text-dark">
              {heading}
            </h1>
            <p className="text-sm leading-6 text-muted-light dark:text-muted-dark">
              Create a client account once, save your business details, and come
              back anytime to reorder faster.
            </p>
          </div>

          <div className="flex w-full rounded-full border border-border-light bg-bg-secondary-light p-1 dark:border-border-dark dark:bg-bg-secondary-dark">
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                resetStatus();
              }}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
                <Input
                  placeholder="Full name"
                  value={signupForm.fullName}
                  onChange={(event) =>
                    handleSignupChange("fullName", event.target.value)
                  }
                  required
                />
                <Input
                  placeholder="Business name"
                  value={signupForm.businessName}
                  onChange={(event) =>
                    handleSignupChange("businessName", event.target.value)
                  }
                  required
                />
                <Input
                  placeholder="Business website"
                  type="url"
                  value={signupForm.website}
                  onChange={(event) =>
                    handleSignupChange("website", event.target.value)
                  }
                />
                <Input
                  placeholder="Phone number"
                  type="tel"
                  value={signupForm.phone}
                  onChange={(event) =>
                    handleSignupChange("phone", event.target.value)
                  }
                />
                <Input
                  placeholder="Industry"
                  value={signupForm.industry}
                  onChange={(event) =>
                    handleSignupChange("industry", event.target.value)
                  }
                  required
                />
                <Input
                  placeholder="Country"
                  value={signupForm.country}
                  onChange={(event) =>
                    handleSignupChange("country", event.target.value)
                  }
                  required
                />
                <div className="sm:col-span-2">
                  <Input
                    type="email"
                    placeholder="Business email"
                    value={signupForm.email}
                    onChange={(event) =>
                      handleSignupChange("email", event.target.value)
                    }
                    required
                  />
                </div>
                <label className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-border-light bg-bg-secondary-light px-4 py-3 text-sm text-muted-light dark:border-border-dark dark:bg-bg-secondary-dark dark:text-muted-dark">
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
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  required
                />
              </div>
            )}

            <div className="grid gap-3">
              <Button
                type="button"
                className="mt-2 w-full"
                onClick={handleEmailAuth}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : submitLabel}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleAuth}
                disabled={isSubmitting}
              >
                <FcGoogle className="mr-2 size-5" />
                {googleText}
              </Button>
            </div>

            {status.type !== "idle" && (
              <div
                className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                  status.type === "success"
                    ? "border-teal/30 bg-teal/10 text-text-light dark:text-text-dark"
                    : "border-error/30 bg-error/10 text-text-light dark:text-text-dark"
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="grid gap-3 rounded-2xl border border-border-light bg-bg-secondary-light p-4 text-sm dark:border-border-dark dark:bg-bg-secondary-dark">
              <div className="flex items-center gap-2 font-medium text-text-light dark:text-text-dark">
                <Building2 size={16} className="text-teal" />
                Business profile saved for future reorders
              </div>
              <div className="flex items-center gap-2 text-muted-light dark:text-muted-dark">
                <Mail size={16} className="text-teal" />
                Passwordless sign in through secure email links
              </div>
              <div className="flex items-center gap-2 text-muted-light dark:text-muted-dark">
                <ShieldCheck size={16} className="text-teal" />
                Data stays ready for portal access, reorders, and future sales follow-ups
              </div>
            </div>
          </div>

          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            {mode === "signup" ? (
              <>
                <p>{loginText}</p>
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    resetStatus();
                  }}
                  className="text-primary font-medium hover:underline"
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
                  className="text-primary font-medium hover:underline"
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
      </div>
    </section>
  );
}
