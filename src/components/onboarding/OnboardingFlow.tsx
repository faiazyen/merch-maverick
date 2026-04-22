"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "mm-onboarding-progress";

type Answers = {
  teamSize?: string;
  businessType?: string;
  orderFrequency?: string;
  brandAssets?: string;
  interests?: string[];
};

const STEPS = [
  {
    key: "teamSize" as const,
    question: "How large is your team or organisation?",
    type: "single" as const,
    options: ["Solo", "2–25", "26–200", "200+"],
  },
  {
    key: "businessType" as const,
    question: "What best describes your business?",
    type: "single" as const,
    options: ["Corporate", "Events", "Hospitality", "Fitness & Sport", "Retail & Influencer", "Other"],
  },
  {
    key: "orderFrequency" as const,
    question: "How often do you expect to order?",
    type: "single" as const,
    options: ["One-off", "Quarterly", "Monthly", "Ongoing"],
  },
  {
    key: "brandAssets" as const,
    question: "Do you have existing brand assets?",
    type: "single" as const,
    options: ["Yes, ready to go", "In progress", "Starting from scratch"],
  },
  {
    key: "interests" as const,
    question: "What are you most interested in?",
    type: "multi" as const,
    options: ["Apparel", "Headwear", "Accessories", "Bags", "Office", "Stationery", "Tech"],
  },
] as const;

interface Props {
  firstName: string;
  initialStep?: number;
  initialAnswers?: Partial<Answers>;
}

function readStoredProgress(): { step: number; answers: Answers } | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as { step?: number; answers?: Answers };
    if (parsed.step !== undefined && parsed.answers) return { step: parsed.step, answers: parsed.answers };
  } catch {}
  return null;
}

export default function OnboardingFlow({ firstName, initialStep = 0, initialAnswers = {} }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(() => readStoredProgress()?.step ?? initialStep);
  const [answers, setAnswers] = useState<Answers>(() => readStoredProgress()?.answers ?? initialAnswers);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(false);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  function persist(newStep: number, newAnswers: Answers) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: newStep, answers: newAnswers }));
    } catch {}
  }

  async function saveProgress(newAnswers: Answers, completed: boolean) {
    try {
      await fetch("/api/portal/account/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: completed ? STEPS.length : step + 1,
          answers: newAnswers,
          completed,
        }),
      });
    } catch {}
  }

  function animateTo(nextStep: number, cb: () => void) {
    setExiting(true);
    setTimeout(() => {
      if (!mountedRef.current) return;
      cb();
      setExiting(false);
      setEntering(true);
      setTimeout(() => { if (mountedRef.current) setEntering(false); }, 50);
    }, 220);
  }

  async function handleSingleSelect(option: string) {
    const current = STEPS[step];
    const newAnswers = { ...answers, [current.key]: option };
    setAnswers(newAnswers);
    persist(step + 1, newAnswers);
    setSaving(true);
    await saveProgress(newAnswers, false);
    setSaving(false);

    if (step < STEPS.length - 1) {
      animateTo(step + 1, () => setStep(step + 1));
    } else {
      await handleComplete(newAnswers);
    }
  }

  function toggleInterest(opt: string) {
    const current = answers.interests ?? [];
    setAnswers((prev) => ({
      ...prev,
      interests: current.includes(opt) ? current.filter((x) => x !== opt) : [...current, opt],
    }));
  }

  async function handleComplete(finalAnswers?: Answers) {
    const ans = finalAnswers ?? answers;
    setSaving(true);
    await saveProgress(ans, true);
    setSaving(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setDone(true);
  }

  async function handleSkip() {
    const newAnswers = answers;
    persist(step + 1, newAnswers);
    await saveProgress(newAnswers, step === STEPS.length - 1);
    if (step < STEPS.length - 1) {
      animateTo(step + 1, () => setStep(step + 1));
    } else {
      await handleComplete();
    }
  }

  async function handleCompleteLater() {
    setSaving(true);
    await saveProgress(answers, true);
    setSaving(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    router.push("/portal");
  }

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 text-5xl font-bold tracking-[-0.03em] text-white">
          You&rsquo;re all set{firstName ? `, ${firstName}` : ""}
        </div>
        <p className="mb-10 text-lg text-[#8fa3bf]">Your preferences have been saved. Welcome to The Merch Maverick.</p>
        <button
          onClick={() => router.push("/portal")}
          className="rounded-2xl bg-[#2b6b5e] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#1f5248]"
        >
          Enter your portal →
        </button>
      </div>
    );
  }

  const current = STEPS[step];
  const isMulti = current.type === "multi";
  const currentInterests = answers.interests ?? [];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      {/* Progress dots */}
      <div className="mb-12 flex items-center gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${i === step ? "h-2.5 w-6 bg-white" : i < step ? "h-2 w-2 bg-[#3b82f6]" : "h-2 w-2 bg-[#1e3a5f]"}`}
          />
        ))}
      </div>

      {/* Question card */}
      <div
        className={`w-full max-w-lg transition-all duration-200 ${exiting ? "translate-y-4 opacity-0" : entering ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <h2 className="mb-8 text-center text-2xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-3xl">
          {current.question}
        </h2>

        {!isMulti && (
          <div className="space-y-3">
            {current.options.map((opt) => {
              const selected = (answers as Record<string, unknown>)[current.key] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleSingleSelect(opt)}
                  disabled={saving}
                  className={`w-full rounded-2xl border px-6 py-4 text-left text-base font-medium transition-all ${selected ? "border-[#3b82f6] bg-[#1e3a5f] text-white" : "border-[#1e3a5f] bg-[#0f1f38] text-[#c8d8ec] hover:border-[#3b82f6] hover:bg-[#1e3a5f]"}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {isMulti && (
          <>
            <div className="flex flex-wrap gap-3 justify-center">
              {current.options.map((opt) => {
                const selected = currentInterests.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleInterest(opt)}
                    className={`rounded-2xl border px-5 py-3 text-[15px] font-medium transition-all ${selected ? "border-[#3b82f6] bg-[#1e3a5f] text-white" : "border-[#1e3a5f] bg-[#0f1f38] text-[#c8d8ec] hover:border-[#3b82f6]"}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => handleComplete()}
                disabled={saving || currentInterests.length === 0}
                className="rounded-2xl bg-[#2563EB] px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-[#1d4ed8] disabled:opacity-40"
              >
                {saving ? "Saving…" : "Continue →"}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <button
          onClick={handleSkip}
          disabled={saving}
          className="text-[13px] text-[#4a6a8a] hover:text-[#8fa3bf] disabled:opacity-50"
        >
          Skip this question
        </button>
        {step === 0 && (
          <button
            onClick={handleCompleteLater}
            disabled={saving}
            className="text-[12px] text-[#2a4a6a] hover:text-[#4a6a8a] disabled:opacity-50"
          >
            Complete later — go to portal
          </button>
        )}
      </div>
    </div>
  );
}
