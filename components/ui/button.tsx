"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "type" | "onDrag" | "onDragStart" | "onDragEnd"> {
  variant?: "primary" | "secondary" | "outline" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-gold text-[#0B0B0C] hover:bg-gold-hover shadow-lg shadow-gold/10",
      secondary: "bg-card-bg text-foreground hover:bg-[#1E1E22] border border-white/5",
      outline: "border border-gold text-gold hover:bg-gold-glow",
      glass: "glass text-foreground hover:bg-white/5 border border-white/10 hover:border-gold/30",
      ghost: "text-foreground hover:bg-white/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm tracking-wide",
      lg: "px-8 py-4 text-base tracking-wider",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
