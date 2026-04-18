"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const proofPoints = [
  "Built on 35+ years of garment manufacturing experience",
  "12+ owned factories with no middlemen between you and production",
  "Photorealistic 3D approval before a single unit goes live",
  "Certified cotton-first, skin-conscious materials for brands moving away from synthetic-heavy merch",
];

const processSteps = [
  { step: "01", label: "Project brief received" },
  { step: "02", label: "Design and pricing aligned" },
  { step: "03", label: "3D approval locked in" },
  { step: "04", label: "Factory production starts" },
];

const stats = [
  { value: "1M+", label: "items produced" },
  { value: "12+", label: "owned factories" },
  { value: "30–50%", label: "potential distributor savings" },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-80, 80], [8, -8]), {
    stiffness: 120,
    damping: 18,
    mass: 0.6,
  });
  const rotateY = useSpring(useTransform(pointerX, [-80, 80], [-10, 10]), {
    stiffness: 120,
    damping: 18,
    mass: 0.6,
  });
  const imageY = useSpring(useTransform(pointerY, [-80, 80], [18, -18]), {
    stiffness: 80,
    damping: 16,
  });
  const imageX = useSpring(useTransform(pointerX, [-80, 80], [-10, 10]), {
    stiffness: 80,
    damping: 16,
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    pointerX.set(x / 5);
    pointerY.set(y / 5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(43,107,94,0.16),_transparent_28%),linear-gradient(180deg,_#f5f4f1_0%,_#f8f6f2_48%,_#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(58,133,117,0.2),_transparent_25%),linear-gradient(180deg,_#0f1110_0%,_#151818_48%,_#111111_100%)]">
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero-background.jpg"
          alt="Wide-angle view of a modern textile production floor"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.16] dark:opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(248,246,242,0.9)_48%,rgba(255,255,255,0.98)_100%)] dark:bg-[linear-gradient(180deg,rgba(9,10,10,0.78)_0%,rgba(17,19,18,0.88)_48%,rgba(17,17,17,0.98)_100%)]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
      <div className="absolute left-[-10%] top-24 h-72 w-72 rounded-full bg-teal/12 blur-3xl" />
      <div className="absolute bottom-12 right-[-12%] h-80 w-80 rounded-full bg-slate-blue/12 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-18 pt-30 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)] lg:items-center lg:px-8 lg:pb-24 lg:pt-36">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-border-light/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-muted-light shadow-sm backdrop-blur dark:border-border-dark dark:bg-card-dark/70 dark:text-muted-dark"
          >
            <Sparkles size={14} className="text-teal" />
            Built from real garment heritage
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-7 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-text-light sm:text-5xl lg:text-[4.15rem] xl:text-[4.75rem] dark:text-text-dark"
          >
            Factory Direct premium custom merchandise manufacturer
            <span className="block text-teal">35+ years of factory heritage with no middlemen</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-muted-light sm:text-xl dark:text-muted-dark"
          >
            Built on 35+ years of manufacturing experience and 12+ owned
            factories, Merch Maverick helps brands across Europe and America
            launch premium cotton-first apparel and merchandise with stronger
            margins, 3D approval, and tighter production control.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-text-light px-7 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(17,17,17,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal dark:bg-text-dark dark:text-bg-primary-dark"
            >
              Get Instant Quote
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border-light bg-white/75 px-7 py-4 text-base font-semibold text-text-light transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:bg-white dark:border-border-dark dark:bg-card-dark/75 dark:text-text-dark dark:hover:border-teal/50"
            >
              See How It Works
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36 }}
            className="mt-10 grid gap-3"
          >
            {proofPoints.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border-light/70 bg-white/70 px-4 py-3 shadow-[0_14px_40px_rgba(17,17,17,0.04)] backdrop-blur dark:border-border-dark dark:bg-card-dark/65"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal" />
                <p className="text-sm text-text-light dark:text-text-dark">{item}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44 }}
            className="mt-10 grid gap-4 md:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-border-light/70 bg-white/75 px-5 py-5 shadow-[0_16px_44px_rgba(17,17,17,0.05)] backdrop-blur dark:border-border-dark dark:bg-card-dark/75"
              >
                <p className="text-2xl font-bold tracking-tight text-text-light dark:text-text-dark">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-light dark:text-muted-dark">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 26 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.16 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          className="relative"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformPerspective: 1800,
                }
          }
        >
          <div className="absolute inset-x-[10%] top-10 h-24 rounded-full bg-teal/25 blur-3xl" />
          <div className="absolute inset-x-[8%] bottom-8 h-24 rounded-full bg-black/12 blur-3xl dark:bg-black/30" />

          <div className="relative rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,_rgba(255,255,255,0.86)_0%,_rgba(247,247,247,0.92)_100%)] p-4 shadow-[0_30px_90px_rgba(20,20,20,0.12)] backdrop-blur dark:border-border-dark dark:bg-[linear-gradient(180deg,_rgba(26,26,26,0.9)_0%,_rgba(17,17,17,0.96)_100%)]">
            <div className="absolute inset-4 rounded-[1.7rem] border border-white/50 dark:border-white/6" />

            <div className="relative overflow-hidden rounded-[1.6rem] border border-black/6 bg-[linear-gradient(180deg,_#e8e5df_0%,_#f7f6f2_100%)] px-4 pb-5 pt-8 dark:border-white/8 dark:bg-[linear-gradient(180deg,_#171918_0%,_#101211_100%)]">
              <div className="absolute inset-x-10 top-4 z-0 h-32 rounded-full bg-white/60 blur-3xl dark:bg-white/6" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(180deg,_transparent_0%,_rgba(17,17,17,0.08)_100%)] dark:bg-[linear-gradient(180deg,_transparent_0%,_rgba(255,255,255,0.04)_100%)]" />

              <div className="relative z-10 flex items-center justify-between gap-3 rounded-2xl border border-black/6 bg-white/68 px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-light backdrop-blur dark:border-white/8 dark:bg-white/6 dark:text-muted-dark">
                <span>3D Approval Stage</span>
                <span className="rounded-full bg-text-light px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white dark:bg-text-dark dark:text-bg-primary-dark">
                  Live concept
                </span>
              </div>

              <motion.div
                className="relative z-10 mx-auto mt-6 max-w-4xl"
                style={shouldReduceMotion ? undefined : { x: imageX, y: imageY }}
              >
                <Image
                  src="/images/home/hero-lineup.jpg"
                  alt="Four premium merch characters presented as the 3D approval start frame"
                  width={1365}
                  height={768}
                  priority
                  className="h-auto w-full object-contain drop-shadow-[0_35px_45px_rgba(17,17,17,0.15)]"
                />

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute left-[6%] top-[22%] hidden max-w-[11rem] rounded-2xl border border-white/70 bg-white/85 p-3 shadow-lg backdrop-blur lg:block dark:border-white/10 dark:bg-card-dark/85"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark">
                    <Layers3 size={14} className="text-teal" />
                    See before you produce
                  </div>
                  <p className="mt-2 text-sm leading-6 text-text-light dark:text-text-dark">
                    Review fit, trims, placement, and material direction in 3D
                    before your order enters production.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75, duration: 0.6 }}
                  className="absolute right-[4%] top-[14%] hidden max-w-[11rem] rounded-2xl border border-white/70 bg-[#161616] p-3 text-white shadow-lg lg:block"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    <WandSparkles size={14} className="text-teal" />
                    Built to scale
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/84">
                    One production system supports hospitality uniforms,
                    creator drops, corporate merch, industrial workwear, and
                    elevated branded apparel.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative z-10 mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]"
          >
            <div className="rounded-[1.75rem] border border-border-light/70 bg-white/82 p-5 shadow-[0_22px_60px_rgba(17,17,17,0.08)] backdrop-blur dark:border-border-dark dark:bg-card-dark/80">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted-light dark:text-muted-dark">
                Production workflow
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {processSteps.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-border-light/70 bg-bg-secondary-light/60 px-4 py-4 dark:border-border-dark dark:bg-bg-secondary-dark/60"
                  >
                    <p className="text-xs font-semibold tracking-[0.2em] text-teal">
                      {item.step}
                    </p>
                    <p className="mt-2 text-sm font-medium text-text-light dark:text-text-dark">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-border-light/70 bg-[#121212] p-3 shadow-[0_22px_60px_rgba(17,17,17,0.18)] dark:border-border-dark">
              <div className="flex items-center justify-between px-2 pb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                <span>Design simulation</span>
                <span>Concept to factory</span>
              </div>
              <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-[18rem] w-full object-cover sm:h-[22rem]"
                  poster="/hero/character-lineup-reference.png"
                >
                  <source src="/hero/design-simulation.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
