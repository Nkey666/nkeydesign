"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import type { Step } from "@/lib/data/services";
import { EASE_IN_OUT, EASE_BACK } from "@/lib/motion";

// Motion всегда включён (требование владельца — см. globals.css), поэтому
// reducedMotion="never" и никакого useReducedMotion-гейтинга.

// ── Настройки движения ──────────────────────────────────────────
const SWEEP_DESKTOP = 2.4; // сек — один проезд луча по дуге
const SWEEP_MOBILE = 2.1; // сек — один проезд луча по вертикальной рельсе
const ARC_HEIGHT = 48; // px — на сколько дуга поднимается над линией точек
const SVG_BOTTOM_PAD = 16; // px — запас снизу, чтобы свечение не обрезалось
// Допуск, с которым точка считается «достигнутой»: чуть раньше, чем луч
// дойдёт до её центра, иначе заполнение визуально отстаёт от луча.
const REACH_EPSILON_DESKTOP = 0.02;
const REACH_EPSILON_MOBILE = 0.001;

const FILL_GRADIENT =
  "linear-gradient(180deg, oklch(0.62 0.16 256), oklch(0.7 0.15 240))";
const BEAM_BG =
  "radial-gradient(circle at 50% 38%, #f2f7ff, oklch(0.62 0.16 252) 68%)";
const BEAM_SHADOW =
  "0 0 20px 5px oklch(0.6 0.17 252 / 0.55), 0 0 6px 1px oklch(0.7 0.15 245 / 0.9)";

type Center = { x: number; y: number };

/**
 * Меряет центры точек-этапов относительно их контейнера и пересчитывает при
 * ресайзе. Логика общая для десктопа и мобайла, поэтому держим её в одном хуке.
 *
 * Возвращает:
 *  - wrapRef    — вешается на контейнер;
 *  - registerDot(i) — ref-колбэк для i-й точки;
 *  - width      — ширина контейнера (нужна десктопному SVG);
 *  - centers    — центры точек как state (для отрисовки);
 *  - centersRef — те же центры как ref (для useTransform, чтобы читать
 *                 свежую геометрию внутри кадра без устаревших замыканий).
 */
function useDotCenters(count: number) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const centersRef = useRef<Center[]>([]);
  const [geometry, setGeometry] = useState<{ width: number; centers: Center[] }>({
    width: 0,
    centers: [],
  });

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const box = wrap.getBoundingClientRect();
      if (box.width === 0) return;
      const centers = dotRefs.current.map((dot) => {
        if (!dot) return { x: 0, y: 0 };
        const r = dot.getBoundingClientRect();
        return {
          x: r.left - box.left + r.width / 2,
          y: r.top - box.top + r.height / 2,
        };
      });
      centersRef.current = centers;
      setGeometry({ width: box.width, centers });
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (wrapRef.current) observer.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [count]);

  const registerDot = (i: number) => (el: HTMLSpanElement | null) => {
    dotRefs.current[i] = el;
  };

  return { wrapRef, registerDot, centersRef, width: geometry.width, centers: geometry.centers };
}

/** Сколько этапов «пройдено» при текущем прогрессе луча (0..1). */
function countReached(progress: number, count: number, epsilon: number) {
  let reached = 0;
  for (let i = 0; i < count; i++) {
    if (progress >= i / (count - 1) - epsilon) reached = i + 1;
  }
  return reached;
}

/** Точка этапа: ядро заполняется, при достижении — разовый пульс-кольцо. */
function StepDot({
  filled,
  refCb,
}: {
  filled: boolean;
  refCb?: (el: HTMLSpanElement | null) => void;
}) {
  return (
    <span
      ref={refCb}
      className="relative z-10 block size-4 shrink-0 rounded-full border-2 border-brand bg-bg"
    >
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scale: filled ? 1 : 0, opacity: filled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE_BACK }}
        className="absolute inset-[2px] rounded-full bg-brand shadow-[0_0_12px_oklch(0.6_0.17_252/0.8)]"
      />
      {filled && (
        <motion.span
          aria-hidden
          initial={{ scale: 0.5, opacity: 0.55 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-[2px] rounded-full bg-brand/40"
        />
      )}
    </span>
  );
}

/* ──────────────────────────  ДЕСКТОП  ────────────────────────── */
function DesktopTimeline({ steps }: { steps: Step[] }) {
  const { wrapRef, registerDot, width, centers } = useDotCenters(steps.length);

  const progress = useMotionValue(0);
  const offsetDistance = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [reached, setReached] = useState(0);
  const inView = useInView(wrapRef, { once: true, amount: 0.5 });

  useMotionValueEvent(progress, "change", (v) => {
    setReached(countReached(v, steps.length, REACH_EPSILON_DESKTOP));
  });

  // Геометрия готова, когда контейнер измерен и все точки получили координаты.
  const ready = width > 0 && centers.length === steps.length && (centers[0]?.y ?? 0) > 0;
  const baselineY = centers[0]?.y ?? 0; // линия, на которой стоят точки
  const peakY = Math.max(baselineY - ARC_HEIGHT, 6); // вершина дуги между точками
  const svgHeight = baselineY + SVG_BOTTOM_PAD;

  // Дуга: квадратичные кривые от точки к точке с подъёмом в peakY посередине.
  let arc = "";
  if (ready) {
    arc = `M ${centers[0].x} ${baselineY}`;
    for (let i = 1; i < centers.length; i++) {
      const midX = (centers[i - 1].x + centers[i].x) / 2;
      arc += ` Q ${midX} ${peakY} ${centers[i].x} ${baselineY}`;
    }
  }

  // Луч проезжает дугу один раз, когда секция появилась в экране.
  useEffect(() => {
    if (!inView || !ready) return;
    const controls = animate(progress, 1, { duration: SWEEP_DESKTOP, ease: EASE_IN_OUT });
    return () => controls.stop();
  }, [inView, ready, progress]);

  return (
    <MotionConfig reducedMotion="never">
      <div
        ref={wrapRef}
        className="relative left-1/2 w-[94vw] max-w-[1480px] -translate-x-1/2 px-2 pt-16"
      >
        {ready && (
          <>
            <svg
              aria-hidden
              width="100%"
              height={svgHeight}
              viewBox={`0 0 ${width} ${svgHeight}`}
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
              {/* Размытый след под чёткой линией — даёт свечение. */}
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
            {/* Светящаяся «голова» луча, едущая по той же дуге. */}
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
                background: BEAM_BG,
                boxShadow: BEAM_SHADOW,
              }}
            />
          </>
        )}

        <ol className="flex items-start justify-between gap-6">
          {steps.map((step, i) => {
            const filled = i < reached;
            const active = i === reached - 1;
            return (
              <li key={step.k} className="flex w-[15rem] shrink-0 flex-col items-center text-center">
                <StepDot filled={filled} refCb={registerDot(i)} />
                <p
                  className="mt-4 font-display text-xl font-medium transition-colors duration-500"
                  style={{ color: active ? "var(--color-brand-strong)" : "var(--color-fg)" }}
                >
                  {step.title}
                </p>
                <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-muted">
                  {step.blurb}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </MotionConfig>
  );
}

/* ──────────────────────────  МОБАЙЛ  ────────────────────────── */
function MobileTimeline({ steps }: { steps: Step[] }) {
  const { wrapRef, registerDot, centersRef, centers } = useDotCenters(steps.length);

  // Разовый проезд вниз при попадании в экран — луч НЕ следует за скроллом.
  const progress = useMotionValue(0);
  const inView = useInView(wrapRef, { once: true, amount: 0.3 });
  const [reached, setReached] = useState(0);

  // Вертикальная рельса: верх = центр первой точки, низ = центр последней.
  const railX = centers[0]?.x ?? 0;
  const railTop = centers[0]?.y ?? 0;
  const railHeight = (centers[centers.length - 1]?.y ?? 0) - railTop;
  const ready = railHeight > 0;

  // Транзформы читают геометрию из centersRef, чтобы внутри кадра всегда была
  // свежая высота рельсы (без устаревшего замыкания на старый рендер).
  const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const railSpan = () => {
    const c = centersRef.current;
    if (c.length < 2) return { top: 0, height: 0 };
    const top = c[0].y;
    return { top, height: c[c.length - 1].y - top };
  };
  const fillH = useTransform(progress, (v) => railSpan().height * clamp(v));
  const headTop = useTransform(progress, (v) => {
    const { top, height } = railSpan();
    return top + height * clamp(v);
  });

  useMotionValueEvent(progress, "change", (v) => {
    setReached(countReached(v, steps.length, REACH_EPSILON_MOBILE));
  });

  // Луч едет вниз один раз, когда секция появилась.
  useEffect(() => {
    if (!inView || !ready) return;
    const controls = animate(progress, 1, { duration: SWEEP_MOBILE, ease: EASE_IN_OUT });
    return () => controls.stop();
  }, [inView, ready, progress]);

  return (
    <MotionConfig reducedMotion="never">
      <motion.div
        ref={wrapRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: EASE_IN_OUT }}
        className="relative mx-auto max-w-md px-2 pt-6"
      >
        {/* фоновая рельса */}
        {ready && (
          <div
            aria-hidden
            className="absolute w-[2px] rounded-full bg-border"
            style={{ left: railX - 1, top: railTop, height: railHeight }}
          />
        )}
        {/* заполнение по ходу луча */}
        {ready && (
          <motion.div
            aria-hidden
            className="absolute w-[2px] rounded-full"
            style={{ left: railX - 1, top: railTop, height: fillH, background: FILL_GRADIENT }}
          />
        )}
        {/* светящаяся голова луча */}
        {ready && (
          <motion.div
            aria-hidden
            className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: railX, top: headTop, background: BEAM_BG, boxShadow: BEAM_SHADOW }}
          />
        )}

        <ol className="flex flex-col gap-9">
          {steps.map((step, i) => {
            const filled = i < reached;
            const active = i === reached - 1;
            return (
              <li key={step.k} className="flex items-start gap-5">
                <div className="flex flex-col items-center pt-1">
                  <StepDot filled={filled} refCb={registerDot(i)} />
                </div>
                <div
                  className="flex-1 transition-transform duration-500"
                  style={{ transform: active ? "scale(1.015)" : "scale(1)", transformOrigin: "left center" }}
                >
                  <p
                    className="font-display text-lg font-medium transition-colors duration-500"
                    style={{ color: active ? "var(--color-brand-strong)" : "var(--color-fg)" }}
                  >
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.blurb}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </motion.div>
    </MotionConfig>
  );
}

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopTimeline steps={steps} />
      </div>
      <div className="lg:hidden">
        <MobileTimeline steps={steps} />
      </div>
    </>
  );
}
