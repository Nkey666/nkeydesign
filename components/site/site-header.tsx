"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

const NAV = [
  { label: "Услуги", href: "/#services" },
  { label: "Работы", href: "/#works" },
];

const pill =
  "rounded-full border border-border/70 bg-surface/70 px-4 py-2 text-sm font-medium text-fg shadow-[0_6px_20px_-10px_oklch(0.3_0.01_265/0.45)] backdrop-blur-md transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand-strong focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 480);
  });

  // «Главная» видна: всегда на других страницах + на главной после прокрутки hero.
  const showHome = !isHome || scrolled;

  return (
    <MotionConfig reducedMotion="never">
      <nav
        aria-label="Основная навигация"
        className="fixed right-4 top-4 z-40 flex items-center gap-2 sm:right-6 sm:top-6"
      >
        <AnimatePresence>
          {showHome && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 12, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {isHome ? (
                <button
                  type="button"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className={pill}
                >
                  Главная
                </button>
              ) : (
                <Link href="/" className={pill}>
                  Главная
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`hidden sm:inline-flex ${pill}`}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/privacy" className={pill}>
          Документы
        </Link>
      </nav>
    </MotionConfig>
  );
}
