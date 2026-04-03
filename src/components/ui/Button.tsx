"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            // Primary - deep navy
            "bg-[#1e3a6e] text-white hover:bg-[#142240] focus:ring-[#1e3a6e] shadow-sm hover:shadow-md":
              variant === "primary",
            // Secondary - white with border
            "bg-white text-[#1e3a6e] border-2 border-[#1e3a6e] hover:bg-[#f0f6ff] focus:ring-[#1e3a6e]":
              variant === "secondary",
            // Outline - subtle border
            "bg-transparent text-[#1e3a6e] border border-[#a8c4f4] hover:border-[#1e3a6e] hover:bg-[#f0f6ff] focus:ring-[#1e3a6e]":
              variant === "outline",
            // Ghost
            "bg-transparent text-[#525252] hover:bg-neutral-100 hover:text-[#171717] focus:ring-neutral-300":
              variant === "ghost",
            // Accent - orange for urgency CTAs
            "bg-[#ea580c] text-white hover:bg-[#c2410c] focus:ring-[#ea580c] shadow-sm hover:shadow-md":
              variant === "accent",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
            "px-8 py-4 text-lg": size === "xl",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
