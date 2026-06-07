"use client";

import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Слово с подчёркиванием, которое прочерчивается слева направо при появлении.
// Линия вынесена ниже хвостов букв (descender «р»), чтобы не задевать глифы.
export function UnderlineWord({
  children,
  className,
  delay = 0.35,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <MotionConfig reducedMotion="never">
      <span className={`relative inline-block leading-none ${className ?? ""}`}>
        {children}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-0.32em] h-[0.07em] origin-left rounded-full bg-brand/55"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
    </MotionConfig>
  );
}
