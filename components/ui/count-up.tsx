"use client";

import { useEffect, useRef, useState } from "react";

// Плавный «выезд» к финалу — близко к ease [0.22, 1, 0.36, 1].
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({
  to,
  duration = 1.6,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Стартуем сразу с финального значения: серверный HTML и краулеры без JS
  // видят «116», а не «0». Счёт ниже — только прогрессивное улучшение.
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Свой rAF-счёт намеренно идёт всегда (как «живой» вопрос в FAQ):
    // imperative animate() из motion глушится prefers-reduced-motion,
    // а здесь короткий декоративный счётчик нужен всегда.
    const run = () => {
      if (started.current) return;
      started.current = true;
      let raf = 0;
      let start = 0;
      const tick = (now: number) => {
        if (!start) start = now;
        const p = Math.min((now - start) / (duration * 1000), 1);
        setValue(Math.round(easeOut(p) * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      cleanup = () => cancelAnimationFrame(raf);
    };
    let cleanup = () => {};

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.6)) {
          run();
          io.disconnect();
        }
      },
      { threshold: [0, 0.6, 1] },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cleanup();
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
