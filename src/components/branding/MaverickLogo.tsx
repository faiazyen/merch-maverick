"use client";

import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";
type LogoSurface = "adaptive" | "light" | "dark";

const SIZE_STYLES: Record<
  LogoSize,
  {
    iconFrame: string;
    topLine: string;
    the: string;
    merch: string;
    maverick: string;
    mainLine: string;
    gap: string;
    descriptor: string;
  }
> = {
  sm: {
    iconFrame: "h-16 w-16 rounded-[1.3rem]",
    topLine: "gap-1.5",
    the: "text-[0.46rem] tracking-[0.16em]",
    merch: "text-[0.94rem] tracking-[-0.03em]",
    maverick: "text-[0.9rem] tracking-[0.08em]",
    mainLine: "gap-1",
    gap: "gap-2.5",
    descriptor: "text-[0.58rem] tracking-[0.26em]",
  },
  md: {
    iconFrame: "h-[4.25rem] w-[4.25rem] rounded-[1.45rem]",
    topLine: "gap-1.5",
    the: "text-[0.52rem] tracking-[0.16em]",
    merch: "text-[1.08rem] tracking-[-0.03em]",
    maverick: "text-[1.02rem] tracking-[0.09em]",
    mainLine: "gap-1.5",
    gap: "gap-3",
    descriptor: "text-[0.62rem] tracking-[0.28em]",
  },
  lg: {
    iconFrame: "h-[4.75rem] w-[4.75rem] rounded-[1.6rem]",
    topLine: "gap-2",
    the: "text-[0.58rem] tracking-[0.18em]",
    merch: "text-[1.22rem] tracking-[-0.03em]",
    maverick: "text-[1.16rem] tracking-[0.1em]",
    mainLine: "gap-1.5",
    gap: "gap-3.5",
    descriptor: "text-[0.68rem] tracking-[0.3em]",
  },
};

export function MaverickIcon({
  className,
  surface = "adaptive",
}: {
  className?: string;
  surface?: LogoSurface;
}) {
  const showLight = surface !== "dark";
  const showDark = surface !== "light";

  return (
    <span className={cn("relative inline-flex aspect-square shrink-0", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="44 144 488 520"
        fill="none"
        aria-hidden="true"
        className={cn(
          "h-full w-full",
          surface === "adaptive"
            ? "dark:hidden"
            : showLight
              ? "block"
              : "hidden"
        )}
      >
        <defs>
          <linearGradient id="maverick-light-main" x1="68" y1="118" x2="468" y2="654" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6dc7b7" />
            <stop offset="0.45" stopColor="#2b6b5e" />
            <stop offset="1" stopColor="#194c43" />
          </linearGradient>
          <linearGradient id="maverick-light-edge" x1="91" y1="144" x2="423" y2="604" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d9fff6" stopOpacity="0.9" />
            <stop offset="0.35" stopColor="#8ce4d0" stopOpacity="0.65" />
            <stop offset="1" stopColor="#2b6b5e" stopOpacity="0" />
          </linearGradient>
          <filter id="maverick-light-shadow" x="20" y="110" width="520" height="600" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#0d2d27" floodOpacity="0.18" />
          </filter>
        </defs>
        <g filter="url(#maverick-light-shadow)">
          <path d="M291 173 L219 314 L265 456 L248 316 Z" fill="url(#maverick-light-main)" />
          <path d="M295 172 L338 315 L321 457 L368 316 Z" fill="url(#maverick-light-main)" />
          <path d="M192 342 L65 593 L227 593 L221 573 L107 571 L187 414 L282 641 Z" fill="url(#maverick-light-main)" />
          <path d="M390 342 L296 638 L394 414 L470 571 L357 572 L349 593 L511 593 Z" fill="url(#maverick-light-main)" />
          <path d="M291 173 L219 314 L265 456 L248 316 Z" fill="url(#maverick-light-edge)" />
          <path d="M295 172 L338 315 L321 457 L368 316 Z" fill="url(#maverick-light-edge)" />
          <path d="M192 342 L65 593 L227 593 L221 573 L107 571 L187 414 L282 641 Z" fill="url(#maverick-light-edge)" />
          <path d="M390 342 L296 638 L394 414 L470 571 L357 572 L349 593 L511 593 Z" fill="url(#maverick-light-edge)" />
        </g>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="44 144 488 520"
        fill="none"
        aria-hidden="true"
        className={cn(
          "h-full w-full",
          surface === "adaptive"
            ? "hidden dark:block"
            : showDark
              ? "block"
              : "hidden"
        )}
      >
        <defs>
          <linearGradient id="maverick-dark-main" x1="68" y1="118" x2="468" y2="654" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#9af3e1" />
            <stop offset="0.38" stopColor="#4ca391" />
            <stop offset="1" stopColor="#173d36" />
          </linearGradient>
          <linearGradient id="maverick-dark-edge" x1="97" y1="128" x2="436" y2="592" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ecfffb" stopOpacity="0.95" />
            <stop offset="0.42" stopColor="#91efda" stopOpacity="0.58" />
            <stop offset="1" stopColor="#2b6b5e" stopOpacity="0" />
          </linearGradient>
          <filter id="maverick-dark-shadow" x="18" y="108" width="524" height="604" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000000" floodOpacity="0.34" />
          </filter>
        </defs>
        <g filter="url(#maverick-dark-shadow)">
          <path d="M291 173 L219 314 L265 456 L248 316 Z" fill="url(#maverick-dark-main)" />
          <path d="M295 172 L338 315 L321 457 L368 316 Z" fill="url(#maverick-dark-main)" />
          <path d="M192 342 L65 593 L227 593 L221 573 L107 571 L187 414 L282 641 Z" fill="url(#maverick-dark-main)" />
          <path d="M390 342 L296 638 L394 414 L470 571 L357 572 L349 593 L511 593 Z" fill="url(#maverick-dark-main)" />
          <path d="M291 173 L219 314 L265 456 L248 316 Z" fill="url(#maverick-dark-edge)" />
          <path d="M295 172 L338 315 L321 457 L368 316 Z" fill="url(#maverick-dark-edge)" />
          <path d="M192 342 L65 593 L227 593 L221 573 L107 571 L187 414 L282 641 Z" fill="url(#maverick-dark-edge)" />
          <path d="M390 342 L296 638 L394 414 L470 571 L357 572 L349 593 L511 593 Z" fill="url(#maverick-dark-edge)" />
        </g>
      </svg>
    </span>
  );
}

export function MaverickWordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: LogoSize;
}) {
  const styles = SIZE_STYLES[size];

  return (
    <span
      aria-hidden="true"
      className={className}
    >
      <span className="sr-only">the Merch Maverick</span>
      <span
        className={cn(
          "inline-flex flex-col leading-none [color:var(--maverick-wordmark-text)]"
        )}
      >
        <span
          className={cn(
            "ml-[0.14em] lowercase font-medium italic opacity-80",
            styles.the
          )}
        >
          the
        </span>
        <span className={cn("mt-0.5 inline-flex items-baseline", styles.mainLine)}>
          <span
            className={cn(
              "font-semibold italic [color:var(--maverick-wordmark-accent)]",
              styles.merch
            )}
          >
            Merch
          </span>
          <span
            className={cn(
              "font-semibold uppercase [color:var(--maverick-wordmark-text)]",
              styles.maverick
            )}
          >
            Maverick
          </span>
        </span>
      </span>
    </span>
  );
}

export function MaverickLogo({
  className,
  size = "md",
  align = "left",
  iconClassName,
  wordmarkClassName,
  merchClassName,
  descriptorClassName,
  descriptor,
  showDescriptor = true,
  showTopTag = true,
  surface = "adaptive",
}: {
  className?: string;
  size?: LogoSize;
  align?: "left" | "center";
  iconClassName?: string;
  wordmarkClassName?: string;
  merchClassName?: string;
  descriptorClassName?: string;
  descriptor?: string;
  showDescriptor?: boolean;
  showTopTag?: boolean;
  surface?: LogoSurface;
}) {
  const styles = SIZE_STYLES[size];

  return (
    <div
      className={cn(
        "inline-flex items-center",
        styles.gap,
        align === "center" ? "justify-center text-center" : "justify-start",
        className
      )}
    >
      <MaverickIcon
        surface={surface}
        className={cn(
          styles.iconFrame,
          iconClassName
        )}
      />

      <div className={cn("flex flex-col", align === "center" && "items-center")}>
        <MaverickWordmark
          size={size}
          className={cn(
            cn(
              showTopTag ? "mt-0.5" : "mt-0.5",
              "[--maverick-wordmark-text:var(--color-text-light)] [--maverick-wordmark-accent:var(--color-teal)] dark:[--maverick-wordmark-text:var(--color-text-dark)] dark:[--maverick-wordmark-accent:var(--color-teal-light)]"
            ),
            wordmarkClassName,
            merchClassName
          )}
        />
        {descriptor && showDescriptor ? (
          <span
            className={cn(
              "mt-1.5 uppercase text-muted-light dark:text-muted-dark",
              styles.descriptor,
              descriptorClassName
            )}
          >
            {descriptor}
          </span>
        ) : null}
      </div>
    </div>
  );
}
