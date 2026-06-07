"use client";

import { useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Карточка со «spotlight»: мягкое голубое свечение следует за курсором.
 * Позиция мыши хранится в motion values (без ре-рендеров на каждый кадр).
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, oklch(0.66 0.15 238 / 0.24), transparent 68%)`;

  return (
    <div
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("group relative overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-smooth"
        style={{ background, opacity: hovered ? 1 : 0 }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
