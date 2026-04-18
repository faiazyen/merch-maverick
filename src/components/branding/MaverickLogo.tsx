"use client";

import Image from "next/image";
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
    wordmark: string;
    gap: string;
    descriptor: string;
  }
> = {
  sm: {
    iconFrame: "h-16 w-16 rounded-[1.3rem]",
    topLine: "gap-1.5",
    the: "text-[0.34rem] tracking-[0.32em]",
    merch: "text-[0.68rem] tracking-[0.24em]",
    wordmark: "h-5.5 w-auto",
    gap: "gap-3",
    descriptor: "text-[0.58rem] tracking-[0.26em]",
  },
  md: {
    iconFrame: "h-[4.25rem] w-[4.25rem] rounded-[1.45rem]",
    topLine: "gap-1.5",
    the: "text-[0.36rem] tracking-[0.34em]",
    merch: "text-[0.76rem] tracking-[0.26em]",
    wordmark: "h-6.5 w-auto",
    gap: "gap-3",
    descriptor: "text-[0.62rem] tracking-[0.28em]",
  },
  lg: {
    iconFrame: "h-[4.75rem] w-[4.75rem] rounded-[1.6rem]",
    topLine: "gap-2",
    the: "text-[0.4rem] tracking-[0.36em]",
    merch: "text-[0.84rem] tracking-[0.28em]",
    wordmark: "h-7.5 w-auto",
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
  const frameClassName =
    surface === "dark"
      ? "border border-white/8 bg-[linear-gradient(180deg,rgba(24,28,30,0.74)_0%,rgba(12,14,16,0.88)_100%)] shadow-[0_12px_26px_rgba(0,0,0,0.2)]"
      : surface === "light"
        ? "border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,247,249,0.96)_100%)] shadow-[0_10px_22px_rgba(15,23,42,0.08)]"
        : "border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,247,249,0.96)_100%)] shadow-[0_10px_22px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(24,28,30,0.74)_0%,rgba(12,14,16,0.88)_100%)] dark:shadow-[0_12px_26px_rgba(0,0,0,0.2)]";

  return (
    <span
      className={cn(
        "relative inline-flex aspect-square shrink-0 overflow-hidden p-[3px] backdrop-blur-sm",
        frameClassName,
        className
      )}
    >
      <span className="relative h-full w-full overflow-hidden rounded-[inherit]">
        <Image
          src="/icon-light-192x192.png"
          alt=""
          fill
          sizes="(max-width: 768px) 64px, 80px"
          className={cn(
            "object-cover",
            surface === "adaptive"
              ? "dark:hidden"
              : showLight
                ? "block"
                : "hidden"
          )}
          aria-hidden="true"
        />
        <Image
          src="/icon-dark-192x192.png"
          alt=""
          fill
          sizes="(max-width: 768px) 64px, 80px"
          className={cn(
            "object-cover",
            surface === "adaptive"
              ? "hidden dark:block"
              : showDark
                ? "block"
                : "hidden"
          )}
          aria-hidden="true"
        />
      </span>
    </span>
  );
}

export function MaverickWordmark({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 701 140"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M 16 121 L 34 35 L 681.49 35 L 663.49 121 Z"
        fill="var(--maverick-wordmark-plate)"
      />
      <g fill="var(--maverick-wordmark-text)">
        <path d="M752 718H574L369 148L361 718H182L57 0H172L278 609L281 0H401L618 609L512 0H627Z" transform="translate(34.00,118) scale(0.13,-0.13)" />
        <path d="M213 148H430L442 0H576L494 718H352L16 0H146ZM394 559 417 272H267Z" transform="translate(122.79,118) scale(0.13,-0.13)" />
        <path d="M304 170 273 718H141L214 0H331L656 718H528Z" transform="translate(199.75,118) scale(0.13,-0.13)" />
        <path d="M620 718H187L62 0H509L531 127H205L237 313H524L546 440H259L285 591H598Z" transform="translate(270.86,118) scale(0.13,-0.13)" />
        <path d="M62 0H182L231 281H358C418 281 440 265 440 220C440 204 438 186 431 145C422 92 418 55 418 27V0H555L558 19C545 27 542 34 542 51C542 65 544 86 548 108C565 209 566 221 566 254C566 298 553 320 514 344C547 359 562 371 583 397C618 440 638 500 638 559C638 660 582 718 485 718H187ZM253 402 286 594H439C486 594 511 570 511 525C511 496 502 463 488 442C470 415 441 402 397 402Z" transform="translate(341.97,118) scale(0.13,-0.13)" />
        <path d="M301 718H178L52 0H175Z" transform="translate(418.93,118) scale(0.13,-0.13)" />
        <path d="M646 483C647 499 647 510 647 519C647 650 563 737 438 737C345 737 262 693 199 609C131 519 88 377 88 241C88 158 113 80 152 39C187 2 242 -19 303 -19C381 -19 453 13 508 74C549 119 573 161 604 246H481C465 205 456 188 439 167C409 130 371 111 327 111C256 111 216 166 216 266C216 359 243 464 283 524C319 579 365 607 418 607C459 607 491 589 506 559C517 538 520 522 522 483Z" transform="translate(448.57,118) scale(0.13,-0.13)" />
        <path d="M236 243 306 315 433 0H592L411 424L703 718H544L268 426L319 718H196L71 0H194Z" transform="translate(525.53,118) scale(0.13,-0.13)" />
        <circle cx="673.5" cy="78.0" r="6" />
      </g>
    </svg>
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
  showTopTag = false,
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
        {showTopTag ? (
          <div className={cn("flex items-end leading-none", styles.topLine)}>
            <span className="font-semibold uppercase text-muted-light/80 dark:text-muted-dark/85">
              <span className={styles.the}>THE</span>
            </span>
            <span
              className={cn(
                "font-semibold uppercase italic text-teal/95 dark:text-teal-light",
                styles.merch,
                merchClassName
              )}
            >
              MERCH
            </span>
          </div>
        ) : null}
        <MaverickWordmark
          className={cn(
            styles.wordmark,
            cn(
              showTopTag ? "mt-1.5" : "mt-0.5",
              "[--maverick-wordmark-plate:transparent] [--maverick-wordmark-text:var(--color-text-light)] dark:[--maverick-wordmark-plate:transparent] dark:[--maverick-wordmark-text:var(--color-text-dark)]"
            ),
            wordmarkClassName
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
