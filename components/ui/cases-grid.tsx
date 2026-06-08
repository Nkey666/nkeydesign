"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import {
  X,
  ArrowUpRight,
  ShoppingBag,
  Wrench,
  AppWindow,
  Sparkles,
  LayoutTemplate,
  HeartPulse,
  Search,
  Bot,
  type LucideIcon,
} from "lucide-react";
import type { Case, Category } from "@/lib/data/works";
import { SeoMockup, AiMockup } from "./case-mockups";
import { SeoTile, AiTile } from "./case-tiles";
import { CASE_MOCKUPS } from "@/components/site/case-mockup";

const EASE = [0.22, 1, 0.36, 1] as const;

// Иконка под тип проекта — вместо «кикер-чёрточки» перед тегом.
const TAG_ICON: Record<string, LucideIcon> = {
  "интернет-магазин": ShoppingBag,
  "сайт услуг": Wrench,
  "продуктовый сайт": AppWindow,
  "премиум-лендинг": Sparkles,
  "лендинг": LayoutTemplate,
  "сайт клиники": HeartPulse,
  seo: Search,
  "ии-поиск": Bot,
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.4 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 480, damping: 17, delay: 0.05 },
  },
};

const modalContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const modalItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

function Tile({ c, i, onOpen }: { c: Case; i: number; onOpen: () => void }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: EASE }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full text-left focus-visible:outline-none"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_18px_50px_-30px_oklch(0.3_0.01_265/0.5)] transition-all duration-500 ease-smooth group-hover:-translate-y-1.5 group-hover:border-brand/40 group-hover:shadow-[0_32px_66px_-34px_oklch(0.42_0.1_260/0.55)] group-focus-visible:ring-2 group-focus-visible:ring-brand group-focus-visible:ring-offset-2">
          {c.mockup === "seo" ? (
            <SeoTile />
          ) : c.mockup === "ai" ? (
            <AiTile />
          ) : (
            <Image
              src={c.thumbnail}
              alt={c.title}
              fill
              quality={90}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
              className="object-cover object-top transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.05]"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.03_260/0.5)] via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-smooth group-hover:opacity-100" />
          <span className="pointer-events-none absolute bottom-3 left-3 inline-flex translate-y-2 items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-fg opacity-0 backdrop-blur-sm transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
            Открыть
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
        <div className="mt-3.5 text-center">
          <h3 className="text-[15px] font-semibold text-fg transition-colors duration-300 ease-smooth group-hover:text-brand-strong">
            {c.title}
          </h3>
          <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider text-faint">
            {c.tag}
          </span>
        </div>
      </button>
    </motion.li>
  );
}

// Лендинги и сложные проекты — плотная сетка по 4; оптимизация — две колонки.
function gridClass(id: string) {
  if (id === "optimization")
    return "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2";
  return "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4";
}

export function CasesGrid({
  items,
  categories,
}: {
  items: Case[];
  categories: Category[];
}) {
  const [active, setActive] = useState<Case | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <MotionConfig reducedMotion="never">
      <div className="flex flex-col gap-16 md:gap-24">
        {categories.map((cat) => {
          const group = items.filter((c) => c.category === cat.id);
          if (group.length === 0) return null;
          return (
            <section key={cat.id} id={`works-${cat.id}`} className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mb-9 text-center md:mb-12"
              >
                <h3 className="font-display text-[1.65rem] font-semibold tracking-tight text-fg md:text-3xl">
                  {cat.title}
                </h3>
                <p className="mx-auto mt-3.5 max-w-xl text-pretty text-sm leading-relaxed text-muted md:text-[15px]">
                  {cat.subtitle}
                </p>
              </motion.div>

              <ul className={gridClass(cat.id)}>
                {group.map((c, i) => (
                  <Tile key={c.title} c={c} i={i} onOpen={() => setActive(c)} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div className="absolute inset-0 bg-[oklch(0.2_0.02_260/0.55)] backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-border bg-bg shadow-[0_50px_120px_-40px_oklch(0.2_0.03_260/0.65)]"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Закрыть"
                className="absolute right-5 top-5 z-20 inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface/90 text-muted shadow-sm backdrop-blur-sm transition-all duration-300 ease-smooth hover:rotate-90 hover:text-fg"
              >
                <X className="size-4" />
              </button>

              <motion.div
                variants={modalContainer}
                initial="hidden"
                animate="show"
                data-lenis-prevent
                className="modal-scroll max-h-[88vh] overflow-y-auto"
              >
                <div className="px-7 pb-8 pt-9 md:px-11 md:pb-10 md:pt-12">
                  <motion.div
                    variants={modalItem}
                    className="flex items-center gap-3"
                  >
                    {(() => {
                      const TagIcon = TAG_ICON[active.tag] ?? LayoutTemplate;
                      return (
                        <motion.span
                          variants={iconPop}
                          className="inline-flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand"
                        >
                          <TagIcon className="size-5" strokeWidth={2.2} />
                        </motion.span>
                      );
                    })()}
                    <span className="text-lg font-bold uppercase tracking-[0.14em] text-brand">
                      {active.tag}
                    </span>
                  </motion.div>
                  <motion.h3
                    variants={modalItem}
                    className="mt-4 font-display text-[1.9rem] font-bold leading-[1.06] tracking-tight text-fg md:text-[2.6rem]"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    variants={modalItem}
                    className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base"
                  >
                    {active.description}
                  </motion.p>
                  <motion.div variants={modalItem} className="mt-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                      Технологии
                    </p>
                    <p className="mt-1.5 text-[15px] font-medium text-fg">
                      {active.tech.join(", ")}
                    </p>
                  </motion.div>
                </div>

                <div className="space-y-6 border-t border-border bg-surface/40 px-4 py-6 sm:px-7 sm:py-8 md:px-11 md:py-10">
                  {active.mockup ? (
                    <motion.div variants={modalItem}>
                      {active.mockup === "seo" ? <SeoMockup /> : <AiMockup />}
                    </motion.div>
                  ) : (
                    active.shots.map((shot, i) => (
                    <motion.figure key={i} variants={modalItem}>
                      {shot.label && (
                        <figcaption className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                          <span className="inline-flex size-5 items-center justify-center rounded-md bg-brand/10 text-[11px] font-bold text-brand">
                            {i + 1}
                          </span>
                          {shot.label}
                        </figcaption>
                      )}
                      <Image
                        src={shot.src}
                        alt={`${active.title}${shot.label ? ` — ${shot.label}` : ""}`}
                        width={shot.w}
                        height={shot.h}
                        sizes="(max-width: 768px) 90vw, 940px"
                        className="h-auto w-full rounded-xl border border-border bg-bg shadow-[0_10px_30px_-20px_oklch(0.3_0.02_260/0.5)]"
                      />
                    </motion.figure>
                    ))
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
