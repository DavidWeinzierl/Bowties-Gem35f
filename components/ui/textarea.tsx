import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-lg border border-white/10 bg-[#121214] px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
