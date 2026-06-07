"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data/faq";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// Знак вопроса — живой «кивок»: бесконечный мягкий подскок + наклон, без рамки.
function QuestionMark() {
  return (
    <motion.span
      className="inline-block font-display text-4xl font-extrabold leading-none text-fg md:text-5xl"
      animate={{ y: [0, -5, 0], rotate: [0, -8, 8, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      ?
    </motion.span>
  );
}

export function Faq() {
  // Можно держать открытыми сразу несколько — чтобы пользователь спокойно
  // сфоткал 3 вопроса разом, а не по одному.
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  // Автозакрытие — только когда секция полностью ушла из вьюпорта.
  // Пока FAQ виден хоть краем, всё остаётся раскрытым.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setOpen(new Set());
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="never">
      <section
        id="faq"
        ref={sectionRef}
        className="relative mx-auto max-w-3xl scroll-mt-24 px-6 py-24 md:py-32"
      >
        <div className="mb-12 text-center md:mb-16">
          <div className="flex items-center justify-center gap-3">
            <h2 className="font-display text-4xl font-bold tracking-tight text-fg md:text-5xl">
              Частые вопросы
            </h2>
            <QuestionMark />
          </div>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Отвечаю на то, что обычно спрашивают перед стартом.
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div key={item.q} className="py-1">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                >
                  <span
                    className={cn(
                      "font-display text-lg font-semibold transition-colors duration-500 ease-smooth group-hover:text-brand-strong md:text-xl",
                      isOpen ? "text-brand-strong" : "text-fg",
                    )}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "size-5 shrink-0 transition-all duration-500 ease-smooth group-hover:text-muted",
                      isOpen ? "rotate-180 text-brand" : "text-faint",
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-5 pr-9 text-[15px] leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </MotionConfig>
  );
}
