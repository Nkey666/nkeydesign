"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Слово-«клавиша»: лёгкий подъём на hover и тактильное вдавливание при нажатии.
export function PressWord({ children }: { children: ReactNode }) {
  return (
    <motion.span
      role="button"
      tabIndex={0}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.9, y: 1 }}
      transition={{ type: "spring", stiffness: 600, damping: 18 }}
      className="mx-0.5 inline-flex cursor-pointer select-none items-center rounded-md bg-brand/10 px-1.5 py-0.5 font-semibold text-brand-strong shadow-[inset_0_-2px_0_oklch(0.48_0.16_256/0.18)] transition-colors duration-300 hover:bg-brand/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      {children}
    </motion.span>
  );
}
