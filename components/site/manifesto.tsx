"use client";

import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

// Акцентное слово: на hover чуть приподнимается + прочерчивается подчёркивание.
function AccentWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="group/word relative inline-block font-extrabold text-brand transition-transform duration-300 ease-smooth hover:-translate-y-[3px]">
      {children}
      <span
        aria-hidden
        className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-brand/40 transition-transform duration-300 ease-smooth group-hover/word:scale-x-100"
      />
    </span>
  );
}

export function Manifesto() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pt-24 pb-10 sm:pt-32">
      <motion.p
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="font-display text-3xl leading-[1.22] font-semibold text-fg text-balance sm:text-4xl md:text-5xl"
      >
        Разрабатываю современные сайты для большого и малого бизнеса — тем, кто
        хочет <AccentWord>выделиться</AccentWord> среди конкурентов, произвести
        впечатление на клиентов и <AccentWord>усилить бренд</AccentWord>.
      </motion.p>

      <motion.p
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
        className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
      >
        От идеи до запуска: быстрые, адаптивные и визуально продуманные решения,
        которые работают на результат.
      </motion.p>
    </section>
  );
}
