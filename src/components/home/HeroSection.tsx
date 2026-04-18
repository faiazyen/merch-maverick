"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
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
    <section className="relative overflow-hidden bg-[#0d1110]">
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero-background-4k.jpg"
          alt="Four models standing in premium apparel and tailoring"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(43,107,94,0.14),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.08),transparent_22%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,10,0.93)_0%,rgba(8,11,10,0.82)_24%,rgba(8,11,10,0.48)_52%,rgba(8,11,10,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,10,0.38)_0%,rgba(8,11,10,0.16)_34%,rgba(8,11,10,0.58)_100%)]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
      <div className="absolute left-[-10%] top-24 h-72 w-72 rounded-full bg-teal/18 blur-3xl" />
      <div className="absolute bottom-12 right-[-12%] h-80 w-80 rounded-full bg-slate-blue/16 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-18 pt-30 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)] lg:items-center lg:px-8 lg:pb-24 lg:pt-36">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/72 shadow-sm backdrop-blur"
          >
            <Sparkles size={14} className="text-teal" />
            Built from real garment heritage
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-7 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4.15rem] xl:text-[4.75rem]"
          >
            Factory Direct premium custom merchandise manufacturer
            <span className="block text-teal">35+ years of factory heritage with no middlemen</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl"
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
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-[#0d1110] shadow-[0_18px_45px_rgba(17,17,17,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal hover:text-white"
            >
              Get Instant Quote
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/8 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:bg-white/12"
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
                className="flex items-start gap-3 rounded-2xl border border-white/12 bg-black/24 px-4 py-3 shadow-[0_14px_40px_rgba(17,17,17,0.18)] backdrop-blur"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal" />
                <p className="text-sm text-white/84">{item}</p>
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
                className="rounded-[1.75rem] border border-white/12 bg-white/8 px-5 py-5 shadow-[0_16px_44px_rgba(17,17,17,0.18)] backdrop-blur"
              >
                <p className="text-2xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/58">
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

          <div className="relative rounded-[2rem] border border-white/14 bg-[linear-gradient(180deg,_rgba(10,12,12,0.78)_0%,_rgba(8,10,10,0.88)_100%)] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur">
            <div className="absolute inset-4 rounded-[1.7rem] border border-white/8" />

            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,_rgba(20,24,23,0.94)_0%,_rgba(10,13,12,0.98)_100%)] px-4 pb-5 pt-8">
              <div className="absolute inset-x-10 top-4 z-0 h-32 rounded-full bg-white/8 blur-3xl" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(180deg,_transparent_0%,_rgba(255,255,255,0.04)_100%)]" />

              <motion.div
                className="relative z-10 mx-auto max-w-4xl"
                style={shouldReduceMotion ? undefined : { x: imageX, y: imageY }}
              >
                <div className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-black/70">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/images/home/hero-video-poster.jpg"
                    className="h-auto w-full object-contain"
                  >
                    <source src="/videos/hero-loop-muted.mp4" type="video/mp4" />
                  </video>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative z-10 mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]"
          >
            <div className="rounded-[1.75rem] border border-white/12 bg-black/26 p-5 shadow-[0_22px_60px_rgba(17,17,17,0.24)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/58">
                Production workflow
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {processSteps.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4"
                  >
                    <p className="text-xs font-semibold tracking-[0.2em] text-teal">
                      {item.step}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/84">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#121212] p-3 shadow-[0_22px_60px_rgba(17,17,17,0.26)]">
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
                  preload="metadata"
                  className="h-[18rem] w-full object-cover sm:h-[22rem]"
                  poster="/images/home/hero-lineup.jpg"
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
