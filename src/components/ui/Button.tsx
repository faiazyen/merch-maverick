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
          "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-teal text-white hover:bg-teal-dark focus:ring-teal shadow-sm hover:shadow-md":
              variant === "primary",
            "bg-white dark:bg-card-dark text-teal border-2 border-teal hover:bg-teal/5 focus:ring-teal":
              variant === "secondary",
            "bg-transparent text-text-light dark:text-text-dark border border-border-light dark:border-border-dark hover:border-teal hover:text-teal focus:ring-teal":
              variant === "outline",
            "bg-transparent text-muted-light dark:text-muted-dark hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark hover:text-text-light dark:hover:text-text-dark focus:ring-teal":
              variant === "ghost",
            "bg-warning text-white hover:bg-orange-700 focus:ring-warning shadow-sm hover:shadow-md":
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
