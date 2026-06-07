"use client";

import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Слово с подчёркиванием, которое прочерчивается слева направо при появлении.
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
      <span className={`relative inline-block ${className ?? ""}`}>
        {children}
        <motion.span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-[0.09em] w-full origin-left rounded-full bg-brand/45"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </MotionConfig>
  );
}
