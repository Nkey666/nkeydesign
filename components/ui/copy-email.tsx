"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Mail, Check } from "lucide-react";
import { EMAIL } from "@/lib/contact";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// Клик по почте копирует её в буфер и показывает рядом плашку «Скопировано».
export function CopyEmail({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Фолбэк для старых/небезопасных контекстов без Clipboard API.
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* no-op */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Скопировать почту ${EMAIL}`}
      className={cn(
        "group relative inline-flex cursor-pointer items-center gap-2 transition-colors duration-300 ease-smooth hover:text-brand-strong focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        className,
      )}
    >
      <Mail
        className={cn(
          "size-4 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5",
          iconClassName,
        )}
        aria-hidden
      />
      {EMAIL}

      <AnimatePresence>
        {copied && (
          <motion.span
            role="status"
            initial={{ opacity: 0, y: reduced ? 0 : 6, scale: reduced ? 1 : 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : -4, scale: reduced ? 1 : 0.9 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="pointer-events-none absolute -top-8 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-brand/25 bg-brand/[0.08] px-2.5 py-1 text-xs font-medium text-brand-strong shadow-[0_8px_24px_-12px_oklch(0.27_0.006_265/0.5)] backdrop-blur-sm"
          >
            <Check className="size-3 text-brand" aria-hidden />
            Скопировано
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
