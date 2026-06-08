"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Слово-хинт: само «нажимается» (короткое вдавливание) примерно раз в 5 секунд,
// чтобы мягко подсказать, что по кейсам можно кликать. Без громкой плашки.
export function PressWord({ children }: { children: ReactNode }) {
  return (
    <motion.span
      className="inline-block font-semibold text-brand-strong"
      animate={{ scale: [1, 0.88, 1], y: [0, 1.5, 0] }}
      transition={{
        duration: 0.36,
        times: [0, 0.4, 1],
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: 5,
      }}
      whileTap={{ scale: 0.88, y: 1.5 }}
    >
      {children}
    </motion.span>
  );
}
