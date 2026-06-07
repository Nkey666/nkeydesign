"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { Cookie } from "lucide-react";
import { YandexMetrika } from "./yandex-metrika";

const KEY = "cookie-consent-v1";
const EASE = [0.22, 1, 0.36, 1] as const;

type Choice = "accepted" | "declined";

export function CookieConsent() {
  // undefined — ещё не прочитали localStorage (SSR/первый рендер): ничего не рисуем,
  // чтобы не было мигания и расхождения гидрации. null — выбор не сделан → баннер.
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    setChoice(saved === "accepted" || saved === "declined" ? (saved as Choice) : null);

    // Переоткрытие баннера из футера («Настройки cookie») — отзыв/смена согласия.
    const reopen = () => setChoice(null);
    window.addEventListener("cookie:reopen", reopen);
    return () => window.removeEventListener("cookie:reopen", reopen);
  }, []);

  const decide = (value: Choice) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setChoice(value);
  };

  return (
    <MotionConfig reducedMotion="never">
      {/* Аналитика грузится только после явного согласия. */}
      {choice === "accepted" && <YandexMetrika />}

      <AnimatePresence>
        {choice === null && (
          <motion.div
            key="cookie"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: EASE }}
            role="dialog"
            aria-label="Согласие на использование cookie"
            className="fixed bottom-4 left-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border bg-bg/95 p-5 shadow-[0_24px_60px_-28px_oklch(0.3_0.03_260/0.6)] backdrop-blur-md sm:bottom-6 sm:left-6"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Cookie className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-fg">Файлы cookie</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">
                  Используем cookie и аналитику, чтобы сайт работал корректно и
                  становился лучше. Подробнее — в{" "}
                  <Link
                    href="/privacy"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    политике конфиденциальности
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2.5">
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="flex-1 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-smooth hover:bg-brand-strong active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Принять
              </button>
              <button
                type="button"
                onClick={() => decide("declined")}
                className="rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted transition-all duration-300 ease-smooth hover:text-fg active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Отклонить
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
