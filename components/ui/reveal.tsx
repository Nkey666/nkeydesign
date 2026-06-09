"use client";

import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

// Мягкое появление при попадании в экран. Motion всегда включён (как весь сайт).
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  amount = 0.4,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  return (
    <MotionConfig reducedMotion="never">
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount }}
        transition={{ duration: 0.65, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
