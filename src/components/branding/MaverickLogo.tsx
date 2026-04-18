"use client";

import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

const SIZE_STYLES: Record<
  LogoSize,
  {
    icon: string;
    merch: string;
    wordmark: string;
    gap: string;
  }
> = {
  sm: {
    icon: "h-8 w-auto",
    merch: "text-[0.52rem] tracking-[0.34em]",
    wordmark: "h-5 w-auto",
    gap: "gap-2.5",
  },
  md: {
    icon: "h-10 w-auto",
    merch: "text-[0.58rem] tracking-[0.38em]",
    wordmark: "h-6 w-auto",
    gap: "gap-3",
  },
  lg: {
    icon: "h-12 w-auto",
    merch: "text-[0.66rem] tracking-[0.42em]",
    wordmark: "h-7 w-auto",
    gap: "gap-3.5",
  },
};

export function MaverickIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 584 824"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M291 173 L219 314 L265 456 L248 316 Z" />
      <path d="M295 172 L338 315 L321 457 L368 316 Z" />
      <path d="M192 342 L65 593 L227 593 L221 573 L107 571 L187 414 L282 641 Z" />
      <path d="M390 342 L296 638 L394 414 L470 571 L357 572 L349 593 L511 593 Z" />
    </svg>
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
  descriptor,
}: {
  className?: string;
  size?: LogoSize;
  align?: "left" | "center";
  iconClassName?: string;
  wordmarkClassName?: string;
  merchClassName?: string;
  descriptor?: string;
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
      <div className="relative">
        <div className="absolute inset-0 scale-[1.12] rounded-full bg-teal/12 blur-xl dark:bg-teal/20" />
        <div className="relative rounded-2xl border border-teal/18 bg-white/88 p-2 shadow-[0_10px_28px_rgba(17,17,17,0.08)] backdrop-blur dark:border-teal/25 dark:bg-[#182321]/88">
          <MaverickIcon
            className={cn(
              styles.icon,
              "text-teal dark:text-[#dff6f0]",
              iconClassName
            )}
          />
        </div>
      </div>

      <div className={cn("flex flex-col", align === "center" && "items-center")}>
        <span
          className={cn(
            "font-semibold uppercase italic leading-none text-teal/90 dark:text-teal",
            styles.merch,
            merchClassName
          )}
        >
          Merch
        </span>
        <MaverickWordmark
          className={cn(
            styles.wordmark,
            "mt-1 [--maverick-wordmark-plate:var(--color-teal)] [--maverick-wordmark-text:#ffffff] dark:[--maverick-wordmark-plate:var(--color-teal-light)] dark:[--maverick-wordmark-text:#f7fffd]",
            wordmarkClassName
          )}
        />
        {descriptor ? (
          <span className="mt-1 text-[0.62rem] uppercase tracking-[0.28em] text-muted-light dark:text-muted-dark">
            {descriptor}
          </span>
        ) : null}
      </div>
    </div>
  );
}
