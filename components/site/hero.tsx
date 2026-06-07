"use client";

import { motion } from "motion/react";
import { BadgeCheck } from "lucide-react";
import { TelegramIcon } from "@/components/ui/telegram-icon";
import { PhotoMarquee } from "@/components/ui/photo-marquee";
import { CountUp } from "@/components/ui/count-up";
import { heroImages } from "@/lib/data/works";
import { TELEGRAM_LINK as TELEGRAM } from "@/lib/contact";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-28 text-center">
        <motion.span
          {...fade(0)}
          className="badge-pulse mb-7 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.06] px-4 py-2 text-sm font-medium text-fg backdrop-blur-sm"
        >
          <BadgeCheck className="size-4 text-brand" aria-hidden />
          <span>
            <CountUp to={116} className="font-bold text-brand" />
            <span className="font-bold text-brand">+</span> проектов сдано
          </span>
        </motion.span>

        <motion.h1
          {...fade(0.05)}
          className="max-w-4xl font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl"
        >
          Современные сайты, которые продают
        </motion.h1>

        <motion.p
          {...fade(0.15)}
          className="mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg"
        >
          Чистый дизайн, плавные анимации и внимание к деталям — чтобы сайт
          выглядел дорого и запоминался с первого взгляда.
        </motion.p>

        <motion.div
          {...fade(0.3)}
          className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_34px_-12px_oklch(0.27_0.006_265/0.6)] transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-[0_18px_44px_-14px_oklch(0.27_0.006_265/0.7)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto"
          >
            <TelegramIcon className="size-4 transition-transform duration-500 ease-smooth group-hover:translate-x-1 group-hover:-translate-y-1" />
            Сделать быстро и качественно
          </a>
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-border bg-surface/60 px-7 py-3.5 text-sm font-semibold text-fg backdrop-blur-sm transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:border-brand/50 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto"
          >
            <TelegramIcon className="size-4 transition-transform duration-500 ease-smooth group-hover:translate-x-1 group-hover:-translate-y-1" />
            Доделать мой сайт
          </a>
        </motion.div>
      </div>

      <PhotoMarquee images={heroImages} className="pb-12 md:pb-16" />
    </section>
  );
}
