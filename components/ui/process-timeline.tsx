"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { Step } from "@/lib/data/services";

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<{
    w: number;
    xs: number[];
    ys: number[];
    singleRow: boolean;
  }>({ w: 0, xs: [], ys: [], singleRow: false });

  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const offsetDistance = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [reached, setReached] = useState(0);
  const inView = useInView(wrapRef, { once: true, amount: 0.35 });

  // Прокрутка секции — драйвер для вертикального (мобильного) луча.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.85", "end 0.55"],
  });

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wr = wrap.getBoundingClientRect();
      const xs = nodeRefs.current.map((n) =>
        n ? n.getBoundingClientRect().left - wr.left + n.getBoundingClientRect().width / 2 : 0,
      );
      const ys = nodeRefs.current.map((n) =>
        n ? n.getBoundingClientRect().top - wr.top + n.getBoundingClientRect().height / 2 : 0,
      );
      const singleRow = ys.length > 0 && Math.max(...ys) - Math.min(...ys) < 12;
      setGeo({ w: wr.width, xs, ys, singleRow });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [steps.length]);

  // Точки заполняются по мере прохождения луча.
  useMotionValueEvent(progress, "change", (v) => {
    const n = steps.length;
    let r = 0;
    for (let i = 0; i < n; i++) {
      if (v >= i / (n - 1) - 0.02) r = i + 1;
    }
    setReached(r);
  });

  const { w, xs, ys, singleRow } = geo;
  const ready =
    w > 0 && xs.length === steps.length && ys.length === steps.length && Math.max(...ys) > 0;

  const cy = ys[0] ?? 0;
  const peak = Math.max(cy - 48, 6);
  const maxY = ys.length ? Math.max(...ys) : 0;
  const svgH = (singleRow ? cy : maxY) + 16;

  let arc = "";
  if (ready) {
    if (singleRow) {
      // Десктоп — пологая дуга через точки.
      arc = `M ${xs[0]} ${cy}`;
      for (let i = 1; i < xs.length; i++) {
        const mid = (xs[i - 1] + xs[i]) / 2;
        arc += ` Q ${mid} ${peak} ${xs[i]} ${cy}`;
      }
    } else {
      // Мобайл — вертикальная линия через центры точек.
      arc = `M ${xs[0]} ${ys[0]}`;
      for (let i = 1; i < xs.length; i++) {
        arc += ` L ${xs[i]} ${ys[i]}`;
      }
    }
  }

  // Десктоп: разовый прогон по времени при попадании в экран.
  useEffect(() => {
    if (reduce || !singleRow || !inView || !ready) return;
    const controls = animate(progress, 1, {
      duration: 2.4,
      ease: [0.45, 0, 0.15, 1],
    });
    return () => controls.stop();
  }, [reduce, singleRow, inView, ready, progress]);

  // Мобайл: прогресс луча привязан к скроллу секции.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce || singleRow || !ready) return;
    progress.set(v < 0 ? 0 : v > 1 ? 1 : v);
  });

  // Reduced-motion / до измерения геометрии — показываем точки заполненными.
  useEffect(() => {
    if (reduce) setReached(steps.length);
  }, [reduce, steps.length]);

  const showBeam = ready && !reduce;

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={wrapRef}
        className="relative left-1/2 w-[94vw] max-w-[1480px] -translate-x-1/2 px-2 pt-16"
      >
        {showBeam && (
          <>
            <svg
              aria-hidden
              width="100%"
              height={svgH}
              viewBox={`0 0 ${w} ${svgH}`}
              preserveAspectRatio="none"
              className="pointer-events-none absolute left-0 top-0 overflow-visible"
            >
              <defs>
                <linearGradient id="beam-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.62 0.16 256)" />
                  <stop offset="100%" stopColor="oklch(0.7 0.15 240)" />
                </linearGradient>
                <filter id="trail-glow" x="-40%" y="-120%" width="180%" height="340%">
                  <feGaussianBlur stdDeviation="2.4" />
                </filter>
              </defs>
              {/* мягкий след под линией */}
              <motion.path
                d={arc}
                fill="none"
                stroke="url(#beam-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#trail-glow)"
                style={{ pathLength: progress }}
              />
              <motion.path
                d={arc}
                fill="none"
                stroke="url(#beam-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: progress }}
              />
            </svg>

            {/* луч — яркий заполненный шарик со свечением */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute left-0 top-0 size-4 rounded-full"
              style={{
                offsetPath: `path("${arc}")`,
                offsetDistance,
                offsetRotate: "0deg",
                background:
                  "radial-gradient(circle at 50% 38%, #f2f7ff, oklch(0.62 0.16 252) 68%)",
                boxShadow:
                  "0 0 20px 5px oklch(0.6 0.17 252 / 0.6), 0 0 6px 1px oklch(0.7 0.15 245 / 0.9)",
              }}
            />
          </>
        )}

        <ol className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          {steps.map((step, i) => {
            const filled = i < reached;
            return (
              <li
                key={step.k}
                className="relative flex flex-col items-center text-center lg:w-[15rem] lg:shrink-0"
              >
                {/* Точка не трансформируется — её позицию замеряет луч. */}
                <span
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className="relative z-10 block size-4 rounded-full border-2 border-brand bg-bg"
                >
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={{ scale: filled ? 1 : 0, opacity: filled ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    className="absolute inset-[2px] rounded-full bg-brand shadow-[0_0_12px_oklch(0.6_0.17_252/0.8)]"
                  />
                </span>
                {/* Текст — лёгкий вход со стаггером, не влияет на замер точки. */}
                {/* initial одинаков на сервере и клиенте — без hydration mismatch.
                    При reduced-motion motion мгновенно ставит конечное состояние. */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="mt-4 font-display text-xl font-medium text-fg">
                    {step.title}
                  </p>
                  <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-muted">
                    {step.blurb}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </MotionConfig>
  );
}
