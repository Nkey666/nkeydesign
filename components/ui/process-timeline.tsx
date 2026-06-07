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
  useSpring,
  useTransform,
} from "motion/react";
import type { Step } from "@/lib/data/services";

const FILL_GRADIENT =
  "linear-gradient(180deg, oklch(0.62 0.16 256), oklch(0.7 0.15 240))";
const BEAM_BG =
  "radial-gradient(circle at 50% 38%, #f2f7ff, oklch(0.62 0.16 252) 68%)";
const BEAM_SHADOW =
  "0 0 20px 5px oklch(0.6 0.17 252 / 0.55), 0 0 6px 1px oklch(0.7 0.15 245 / 0.9)";

/** Точка этапа: ядро заполняется, при достижении — разовый пульс-кольцо. */
function StepDot({
  filled,
  reduce,
  refCb,
}: {
  filled: boolean;
  reduce: boolean | null;
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
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute inset-[2px] rounded-full bg-brand shadow-[0_0_12px_oklch(0.6_0.17_252/0.8)]"
      />
      {!reduce && filled && (
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<{ w: number; xs: number[]; cy: number }>({
    w: 0,
    xs: [],
    cy: 0,
  });

  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const offsetDistance = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [reached, setReached] = useState(0);
  const inView = useInView(wrapRef, { once: true, amount: 0.5 });

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wr = wrap.getBoundingClientRect();
      if (wr.width === 0) return;
      const xs = nodeRefs.current.map((n) =>
        n ? n.getBoundingClientRect().left - wr.left + n.getBoundingClientRect().width / 2 : 0,
      );
      const ys = nodeRefs.current.map((n) =>
        n ? n.getBoundingClientRect().top - wr.top + n.getBoundingClientRect().height / 2 : 0,
      );
      setGeo({ w: wr.width, xs, cy: ys[0] ?? 0 });
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

  useMotionValueEvent(progress, "change", (v) => {
    const n = steps.length;
    let r = 0;
    for (let i = 0; i < n; i++) if (v >= i / (n - 1) - 0.02) r = i + 1;
    setReached(r);
  });

  const { w, xs, cy } = geo;
  const ready = w > 0 && xs.length === steps.length && cy > 0;
  const peak = Math.max(cy - 48, 6);
  const svgH = cy + 16;

  let arc = "";
  if (ready) {
    arc = `M ${xs[0]} ${cy}`;
    for (let i = 1; i < xs.length; i++) {
      const mid = (xs[i - 1] + xs[i]) / 2;
      arc += ` Q ${mid} ${peak} ${xs[i]} ${cy}`;
    }
  }

  useEffect(() => {
    if (reduce) {
      setReached(steps.length);
      return;
    }
    if (!inView || !ready) return;
    const controls = animate(progress, 1, { duration: 2.4, ease: [0.45, 0, 0.15, 1] });
    return () => controls.stop();
  }, [reduce, inView, ready, progress, steps.length]);

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
                <StepDot
                  filled={filled}
                  reduce={reduce}
                  refCb={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                />
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const geomRef = useRef({ x: 0, top: 0, h: 0 });
  const [rail, setRail] = useState({ x: 0, top: 0, h: 0 });

  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.85", "end 0.55"],
  });
  // Пружина = плавность: луч не дёргается за скроллом, а мягко догоняет.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.0005,
  });
  const [reached, setReached] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wr = wrap.getBoundingClientRect();
      if (wr.width === 0) return;
      const cxs = dotRefs.current.map((n) =>
        n ? n.getBoundingClientRect().left - wr.left + n.getBoundingClientRect().width / 2 : 0,
      );
      const cys = dotRefs.current.map((n) =>
        n ? n.getBoundingClientRect().top - wr.top + n.getBoundingClientRect().height / 2 : 0,
      );
      const top = cys[0] ?? 0;
      const h = (cys[cys.length - 1] ?? 0) - top;
      geomRef.current = { x: cxs[0] ?? 0, top, h };
      setRail({ x: cxs[0] ?? 0, top, h });
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

  const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const fillH = useTransform(smooth, (v) => geomRef.current.h * clamp(v));
  const headTop = useTransform(smooth, (v) => geomRef.current.top + geomRef.current.h * clamp(v));

  useMotionValueEvent(smooth, "change", (v) => {
    const n = steps.length;
    let r = 0;
    for (let i = 0; i < n; i++) if (v >= i / (n - 1) - 0.001) r = i + 1;
    setReached(r);
  });

  useEffect(() => {
    if (reduce) setReached(steps.length);
  }, [reduce, steps.length]);

  const ready = rail.h > 0 && !reduce;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        ref={wrapRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-md px-2 pt-6"
      >
        {/* фоновая рельса */}
        {rail.h > 0 && (
          <div
            aria-hidden
            className="absolute w-[2px] rounded-full bg-border"
            style={{ left: rail.x - 1, top: rail.top, height: rail.h }}
          />
        )}
        {/* заполнение по скроллу */}
        {ready && (
          <motion.div
            aria-hidden
            className="absolute w-[2px] rounded-full"
            style={{ left: rail.x - 1, top: rail.top, height: fillH, background: FILL_GRADIENT }}
          />
        )}
        {/* светящаяся голова луча */}
        {ready && (
          <motion.div
            aria-hidden
            className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: rail.x, top: headTop, background: BEAM_BG, boxShadow: BEAM_SHADOW }}
          />
        )}

        <ol className="flex flex-col gap-9">
          {steps.map((step, i) => {
            const filled = i < reached;
            const active = i === reached - 1;
            return (
              <li key={step.k} className="flex items-start gap-5">
                <div className="flex flex-col items-center pt-1">
                  <StepDot
                    filled={filled}
                    reduce={reduce}
                    refCb={(el) => {
                      dotRefs.current[i] = el;
                    }}
                  />
                </div>
                <motion.div
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
                </motion.div>
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
