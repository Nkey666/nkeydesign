"use client";

import { useRef, useState } from "react";
import { Mail, Check } from "lucide-react";
import { EMAIL } from "@/lib/contact";
import { cn } from "@/lib/utils";

// Клик по почте копирует её в буфер. Подтверждение — прямо в самой кнопке:
// иконка письма сменяется галочкой, а адрес на секунду превращается в
// «Скопировано». Без всплывающих плашек, чтобы не выглядело шаблонно.
// Свопы — на CSS-переходах opacity/scale: два состояния, motion тут лишний.
export function CopyEmail({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  const [copied, setCopied] = useState(false);
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
        "group inline-flex cursor-pointer items-center gap-2 transition-colors duration-300 ease-smooth hover:text-brand-strong focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        copied && "text-brand-strong",
        className,
      )}
    >
      {/* Иконка: письмо → галочка (оба наложены, переключаются по opacity). */}
      <span className="relative inline-flex size-4 items-center justify-center">
        <Mail
          aria-hidden
          className={cn(
            "absolute size-4 transition-all duration-200 ease-smooth group-hover:-translate-y-0.5",
            copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
            iconClassName,
          )}
        />
        <Check
          aria-hidden
          className={cn(
            "absolute size-4 text-brand-strong transition-all duration-200 ease-smooth",
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        />
      </span>

      {/* Адрес → «Скопировано». Невидимый адрес держит ширину, чтобы при
          смене текста кнопка не дёргалась. */}
      <span className="relative inline-block">
        <span
          aria-hidden={copied}
          className={cn("transition-opacity duration-200 ease-smooth", copied && "opacity-0")}
        >
          {EMAIL}
        </span>
        <span
          role="status"
          aria-hidden={!copied}
          className={cn(
            "absolute inset-y-0 left-0 inline-flex items-center font-semibold text-brand-strong transition-opacity duration-200 ease-smooth",
            copied ? "opacity-100" : "opacity-0",
          )}
        >
          {copied ? "Скопировано" : ""}
        </span>
      </span>
    </button>
  );
}
