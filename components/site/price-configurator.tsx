"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, Lock, ArrowDown, Minus, Square, Info } from "lucide-react";
import { TelegramIcon } from "@/components/ui/telegram-icon";
import { ChatGptMark } from "@/components/ui/case-mockups";
import { TYPE_GLYPH, OPTION_GLYPH, SeoGlyph } from "@/components/ui/config-icons";
import { projectTypes, priceOptions } from "@/lib/data/pricing";
import { TYPE_MOCKUP } from "./config-mockups";
import { usePriceConfig, ruble } from "./use-price-config";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** Одометр: каждая цифра — колонка 0–9, прокручивается transform'ом. */
function Odometer({ value }: { value: number }) {
  const chars = ruble(value).split("");
  return (
    <span aria-hidden className="inline-flex leading-none tabular-nums">
      {chars.map((ch, i) => {
        const key = chars.length - i;
        if (!/\d/.test(ch))
          return (
            <span key={`s${key}`} style={{ whiteSpace: "pre" }}>
              {ch}
            </span>
          );
        return (
          <span
            key={`d${key}`}
            className="relative inline-block overflow-hidden leading-none"
            style={{ width: "1ch" }}
          >
            <span className="invisible">0</span>
            <span
              className="absolute left-0 top-0 flex flex-col leading-none transition-transform duration-[650ms] ease-smooth"
              style={{ transform: `translateY(-${ch}em)` }}
            >
              {DIGITS.map((d) => (
                <span key={d} className="block" style={{ height: "1em" }}>
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

/** Маленькая «галочка-печать» в углу выбранной позиции. */
function Mark({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-5 items-center justify-center rounded-full transition-all duration-300 ease-smooth",
        on ? "scale-100 bg-brand text-white opacity-100" : "scale-75 text-transparent opacity-0",
      )}
    >
      <Check className="size-3" strokeWidth={3.2} />
    </span>
  );
}

export function PriceConfigurator() {
  const {
    typeId,
    selectType,
    opts,
    toggleOption,
    reset,
    type,
    billableOptions,
    seoActive,
    seoIncludedInType,
    seoRedundant,
    total,
    hasSelection,
    tgLink,
  } = usePriceConfig();

  const [stageAnim, setStageAnim] = useState<"arrive" | "left" | "right">("arrive");

  // Кнопки окна: «свернуть» и «закрыть» снимают выбор типа (сцена пустеет),
  // «развернуть» открывает превью на весь экран.
  const closePreview = () => type && selectType(type.id);

  // Полноэкранное превью: пока открыто — блокируем скролл страницы и слушаем Esc.
  // Зависим и от type: если превью закрыли, скролл разблокируется сам.
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    if (!zoom || !type) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoom, type]);

  // Авто-карусель анимаций значков: по очереди подсвечиваем активный глиф
  // (класс .cfg-play), независимо от курсора. Порядок — типы, затем услуги.
  const animOrder = useMemo(
    () => [...projectTypes.map((t) => `t-${t.id}`), ...priceOptions.map((o) => `o-${o.id}`)],
    [],
  );
  const [animKey, setAnimKey] = useState(animOrder[0]);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % animOrder.length;
      setAnimKey(animOrder[i]);
    }, 2200);
    return () => clearInterval(id);
  }, [animOrder]);

  const idx = type ? projectTypes.findIndex((t) => t.id === type.id) : -1;
  const count = projectTypes.length;

  const pick = (id: string) => {
    if (id !== typeId) {
      if (typeId === null) setStageAnim("arrive");
      else setStageAnim(projectTypes.findIndex((t) => t.id === id) > idx ? "right" : "left");
    }
    selectType(id);
  };
  const go = (dir: 1 | -1) => {
    setStageAnim(dir === 1 ? "right" : "left");
    selectType(projectTypes[(idx + dir + count) % count].id);
  };

  const badgesOn = seoActive && type !== null;
  const slideClass =
    stageAnim === "left" ? "animate-stage-in-left" : stageAnim === "right" ? "animate-stage-in-right" : "";

  const chips = [
    ...(type ? [{ id: `t-${type.id}`, label: type.title, remove: () => selectType(type.id) }] : []),
    ...billableOptions.map((o) => ({ id: `o-${o.id}`, label: o.title, remove: () => toggleOption(o.id) })),
  ];

  // Заливка-«поднятие» цвета снизу: clip-path вместо мгновенного фона.
  const fillClip = (active: boolean) => (active ? "inset(0 0 0 0)" : "inset(100% 0 0 0)");

  // Домен в адресной строке делим на имя и зону — зону приглушаем для
  // «дорогого» вида (имя — акцентом, .ру/.рф — тускло).
  const dot = type ? type.domain.lastIndexOf(".") : -1;
  const domainName = type ? (dot > 0 ? type.domain.slice(0, dot) : type.domain) : "";
  const domainTld = type && dot > 0 ? type.domain.slice(dot + 1) : "";

  // Для части типов превью — не картинка, а нарисованный кодом мокап сайта.
  const Mockup = type ? TYPE_MOCKUP[type.id] : undefined;

  return (
    <MotionConfig reducedMotion="never">
      <section id="price" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mb-9 mx-auto max-w-2xl text-center"
          >
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg md:text-5xl">
              Соберите свой сайт
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-base leading-relaxed text-muted">
              Выберите тип проекта и сразу увидите, как он выглядит и сколько стоит.
              Услуги можно взять отдельно, к уже существующему сайту.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-bg/85 shadow-[inset_0_1px_0_oklch(1_0_0/0.75),0_2px_8px_-2px_oklch(0.3_0.03_260/0.18),0_44px_110px_-42px_oklch(0.3_0.05_262/0.6)] backdrop-blur-md"
          >
            {/* Верхняя панель */}
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-3.5 sm:px-7">
              <span className="text-[13px] font-semibold text-fg">Конфигуратор стоимости</span>
              <button
                type="button"
                onClick={reset}
                className={cn(
                  "group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12.5px] font-medium transition-all duration-300 ease-smooth active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                  hasSelection ? "text-muted hover:text-fg" : "pointer-events-none text-faint opacity-40",
                )}
              >
                <RotateCcw className="size-3.5 transition-transform duration-500 ease-smooth group-hover:-rotate-[260deg]" />
                Сбросить
              </button>
            </div>

            {/* Сцена */}
            <div className="relative mx-auto max-w-3xl px-5 pt-7 sm:px-9">
              <div className="relative mb-4 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  {type ? (
                    <h3 key={type.id} className="animate-stage-fade truncate font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
                      {type.title}
                    </h3>
                  ) : (
                    <h3 className="font-display text-xl font-bold tracking-tight text-muted sm:text-2xl">
                      С чего начнём?
                    </h3>
                  )}
                  <p className="mt-0.5 truncate text-[13px] text-muted">
                    {type
                      ? type.blurb
                      : billableOptions.length
                        ? "Услуги для вашего текущего сайта."
                        : "Выберите тип проекта или услугу ниже."}
                  </p>
                </div>
                {hasSelection && (
                  <p aria-hidden className="flex shrink-0 items-baseline gap-1 font-display text-2xl font-extrabold tracking-tight text-fg">
                    <span className="text-sm font-bold text-muted">от</span>
                    <Odometer value={total} />
                    <span className="text-base font-bold">₽</span>
                  </p>
                )}
              </div>

              <div className="relative aspect-[7/5] w-full">
                {type ? (
                  <>
                    <div className="absolute inset-x-6 -bottom-3 h-12 rounded-[50%] bg-[oklch(0.42_0.06_262/0.28)] blur-[42px]" />
                    <div className="animate-stage-arrive absolute inset-0 overflow-hidden rounded-2xl border border-[oklch(0.84_0.008_256)] bg-bg shadow-[inset_0_1px_0_oklch(1_0_0/0.85),inset_0_0_0_1px_oklch(1_0_0/0.4),0_1px_2px_oklch(0.2_0.03_260/0.25),0_16px_28px_-12px_oklch(0.3_0.04_260/0.4),0_50px_90px_-34px_oklch(0.32_0.06_262/0.55)]">
                      {/* заголовок окна — Windows-стиль: адрес слева, кнопки окна справа */}
                      <div className="flex h-10 items-stretch gap-2 border-b border-border/70 bg-surface/80 pl-3">
                        <span
                          key={type.id}
                          className="animate-stage-fade my-1.5 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border/70 bg-gradient-to-b from-bg to-surface/70 px-2.5 text-[11.5px] shadow-[inset_0_1px_0_oklch(1_0_0/0.65)]"
                        >
                          <Lock className="size-3 shrink-0 text-brand" strokeWidth={2.4} aria-hidden />
                          <span className="truncate">
                            <span className="text-faint">https://</span>
                            <span className="font-semibold text-fg">{domainName}</span>
                            <span className="text-faint">.{domainTld}</span>
                          </span>
                        </span>
                        <span className="flex shrink-0 items-stretch text-faint">
                          <button
                            type="button"
                            onClick={closePreview}
                            aria-label="Свернуть превью"
                            className="flex items-center px-3 transition-colors duration-200 hover:bg-[oklch(0.55_0.2_256)] hover:text-white focus-visible:bg-[oklch(0.55_0.2_256)] focus-visible:text-white focus-visible:outline-none active:brightness-90"
                          >
                            <Minus className="size-3.5 transition-transform duration-300 ease-smooth" strokeWidth={1.8} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setZoom(true)}
                            aria-label="Открыть превью на весь экран"
                            className="flex items-center px-3 transition-colors duration-200 hover:bg-border/50 hover:text-fg focus-visible:bg-border/50 focus-visible:text-fg focus-visible:outline-none hover:[&_svg]:scale-[1.35] active:scale-95"
                          >
                            <Square className="size-3 transition-transform duration-300 ease-smooth" strokeWidth={1.8} />
                          </button>
                          <button
                            type="button"
                            onClick={closePreview}
                            aria-label="Закрыть превью"
                            className="flex items-center px-3 transition-colors duration-200 hover:bg-[oklch(0.62_0.21_25)] hover:text-white focus-visible:bg-[oklch(0.62_0.21_25)] focus-visible:text-white focus-visible:outline-none active:brightness-90 hover:[&_svg]:rotate-90"
                          >
                            <X className="size-4 transition-transform duration-300 ease-smooth" strokeWidth={1.8} />
                          </button>
                        </span>
                      </div>
                      {/* сайт на весь кадр — клик по любой точке открывает на весь экран */}
                      <div
                        key={type.id}
                        role="button"
                        tabIndex={0}
                        aria-label="Открыть превью на весь экран"
                        onClick={() => setZoom(true)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setZoom(true);
                          }
                        }}
                        className={cn(
                          "relative h-[calc(100%-2.5rem)] w-full cursor-zoom-in focus-visible:outline-none",
                          slideClass,
                        )}
                      >
                        {Mockup ? (
                          <div className="absolute inset-0 overflow-hidden bg-white">
                            <Mockup />
                          </div>
                        ) : (
                          <Image
                            src={type.image}
                            alt={`Пример сайта: ${type.title}`}
                            fill
                            quality={90}
                            sizes="(max-width: 768px) 92vw, 720px"
                            className="object-cover object-top"
                          />
                        )}
                        {/* утопленность экрана в корпус */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 shadow-[inset_0_10px_18px_-14px_oklch(0.2_0.03_260/0.45),inset_0_0_0_1px_oklch(0.2_0.03_260/0.04)]"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Предыдущий тип"
                      className="absolute -left-1 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/90 text-muted shadow-[0_8px_24px_-10px_oklch(0.3_0.02_260/0.5)] backdrop-blur-sm transition-all duration-300 ease-smooth hover:text-fg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:-left-4"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Следующий тип"
                      className="absolute -right-1 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/90 text-muted shadow-[0_8px_24px_-10px_oklch(0.3_0.02_260/0.5)] backdrop-blur-sm transition-all duration-300 ease-smooth hover:text-fg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:-right-4"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-border bg-bg/40">
                    <a
                      href="#price"
                      aria-label="К конфигуратору"
                      className="animate-float-y inline-flex size-11 items-center justify-center rounded-full border border-border bg-bg text-brand shadow-[0_8px_20px_-10px_oklch(0.48_0.16_256/0.5)] transition-[transform,border-color,color] duration-300 ease-smooth hover:scale-110 hover:border-brand/40 hover:text-brand-strong active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                      <ArrowDown className="size-5" strokeWidth={2} />
                    </a>
                    <p className="px-6 text-center text-[14.5px] font-semibold text-fg">Здесь появится ваш сайт</p>
                    <a
                      href="#price"
                      className="-mt-1 max-w-xs px-6 text-center text-[13px] leading-relaxed text-muted underline-offset-4 transition-colors duration-200 hover:text-fg hover:underline"
                    >
                      Выберите тип проекта в списке ниже.
                    </a>
                  </div>
                )}

                <span
                  aria-hidden={!badgesOn}
                  className={cn(
                    "absolute bottom-3 left-3 z-10 transition-all duration-300 ease-smooth sm:left-6",
                    badgesOn ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                  )}
                >
                  <span className="animate-float-y inline-flex items-center gap-1.5 rounded-full bg-bg/95 px-3 py-1.5 text-[12px] font-semibold text-fg shadow-[0_10px_30px_-12px_oklch(0.3_0.03_260/0.5)] backdrop-blur-sm">
                    <SeoGlyph className="size-3.5 text-brand" />
                    ТОП-1 в Google
                  </span>
                </span>
                <span
                  aria-hidden={!badgesOn}
                  className={cn(
                    "absolute bottom-3 right-3 z-10 transition-all delay-75 duration-300 ease-smooth sm:right-6",
                    badgesOn ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                  )}
                >
                  <span
                    className="animate-float-y inline-flex items-center gap-1.5 rounded-full bg-bg/95 px-3 py-1.5 text-[12px] font-semibold text-fg shadow-[0_10px_30px_-12px_oklch(0.3_0.03_260/0.5)] backdrop-blur-sm"
                    style={{ animationDelay: "1.6s" }}
                  >
                    <ChatGptMark className="size-3.5 text-fg" />
                    ТОП-1 в ответах ChatGPT
                  </span>
                </span>
              </div>
            </div>

            {/* Тип проекта */}
            <div className="mx-auto max-w-3xl px-5 pt-8 sm:px-9">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-[15px] font-bold text-fg">Тип проекта</span>
                <span className="text-[12.5px] text-muted">один на выбор</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {projectTypes.map((t) => {
                  const sel = t.id === typeId;
                  const Glyph = TYPE_GLYPH[t.id];
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => pick(t.id)}
                      aria-pressed={sel}
                      className={cn(
                        "group relative flex flex-col overflow-hidden rounded-2xl border bg-bg p-4 text-left transition-[border-color,transform,box-shadow] duration-300 ease-smooth active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                        sel
                          ? "border-brand/40 shadow-[0_16px_36px_-24px_oklch(0.48_0.16_256/0.6)]"
                          : "border-border hover:-translate-y-0.5 hover:border-brand/30",
                      )}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.58_0.15_256/0.13),oklch(0.5_0.16_257/0.055))] transition-[clip-path] duration-[500ms] ease-smooth"
                        style={{ clipPath: fillClip(sel) }}
                      />
                      <span className="relative flex flex-1 flex-col">
                        <span className="flex items-start justify-between">
                          <Glyph
                            className={cn(
                              "size-7 transition-colors duration-500 ease-smooth",
                              sel ? "text-brand-strong" : "text-faint group-hover:text-muted",
                              animKey === `t-${t.id}` && "cfg-play",
                              animKey === `t-${t.id}` && !sel && "text-muted",
                            )}
                          />
                          <Mark on={sel} />
                        </span>
                        <span
                          className={cn(
                            "mt-3.5 block text-[14px] font-semibold leading-tight transition-colors duration-300",
                            sel ? "text-brand-strong" : "text-fg",
                          )}
                        >
                          {t.title}
                        </span>
                        <span className="mt-auto pt-2 block text-[12.5px] font-bold tabular-nums text-muted">
                          от {ruble(t.from)} ₽
                          <span className="ml-1.5 font-normal text-faint">· {t.term}</span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Услуги */}
            <div className="mx-auto max-w-3xl px-5 pb-6 pt-8 sm:px-9">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-[15px] font-bold text-fg">Услуги</span>
                <span className="text-[12.5px] text-muted">можно отдельно, на текущий сайт</span>
              </div>

              {/* уведомление: SEO уже входит в редизайн — не переплачиваем */}
              <div
                className={cn(
                  "grid transition-all duration-300 ease-smooth",
                  seoRedundant ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="flex items-start gap-2 rounded-xl border border-brand/25 bg-brand/[0.06] px-3.5 py-2.5 text-[12.5px] font-medium leading-relaxed text-brand-strong">
                    <Info className="mt-0.5 size-4 shrink-0" />
                    SEO уже входит в «Редизайн + SEO» — не доплачивайте за него отдельно. В расчёте он не считается дважды.
                  </p>
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {priceOptions.map((o) => {
                  const on = opts.has(o.id);
                  const isSeoIncluded = o.id === "seo" && seoIncludedInType;
                  const Glyph = OPTION_GLYPH[o.id];
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => toggleOption(o.id)}
                      aria-pressed={on}
                      className={cn(
                        "group relative flex flex-col overflow-hidden rounded-2xl border bg-bg p-4 text-left transition-[border-color,transform,box-shadow] duration-300 ease-smooth active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                        on
                          ? "border-brand/40 shadow-[0_16px_36px_-24px_oklch(0.48_0.16_256/0.6)]"
                          : "border-border hover:border-brand/30",
                      )}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.58_0.15_256/0.13),oklch(0.5_0.16_257/0.055))] transition-[clip-path] duration-[500ms] ease-smooth"
                        style={{ clipPath: fillClip(on) }}
                      />
                      <span className="relative flex flex-1 flex-col">
                        <span className="flex items-start justify-between">
                          <Glyph
                            className={cn(
                              "size-7 transition-colors duration-500 ease-smooth",
                              on ? "text-brand-strong" : "text-faint group-hover:text-muted",
                              animKey === `o-${o.id}` && "cfg-play",
                              animKey === `o-${o.id}` && !on && "text-muted",
                            )}
                          />
                          <Mark on={on} />
                        </span>
                        <span className="mt-3.5 block text-[14px] font-semibold text-fg">{o.title}</span>
                        <span className="mt-1 block text-[12.5px] leading-relaxed text-muted">{o.blurb}</span>
                        {isSeoIncluded ? (
                          <span className="mt-auto pt-2.5 block text-[12px] font-semibold text-brand-strong">
                            Уже входит в редизайн
                          </span>
                        ) : (
                          <span
                            className={cn(
                              "mt-auto pt-2.5 block text-[13px] font-bold tabular-nums transition-colors duration-300",
                              on ? "text-brand-strong" : "text-faint",
                            )}
                          >
                            +{ruble(o.add)} ₽
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Итоговая панель */}
            <div className="flex flex-col gap-4 border-t border-border/70 bg-surface/40 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[12px] font-medium text-faint">Итого</p>
                  {hasSelection ? (
                    <p aria-hidden className="flex items-baseline gap-1 font-display text-2xl font-extrabold tracking-tight text-fg">
                      <span className="text-sm font-bold text-muted">от</span>
                      <Odometer value={total} />
                      <span className="text-base font-bold">₽</span>
                    </p>
                  ) : (
                    <p aria-hidden className="font-display text-2xl font-extrabold tracking-tight text-faint/60">— ₽</p>
                  )}
                </div>
                {chips.length > 0 && (
                  <div className="hidden flex-wrap items-center gap-1.5 md:flex">
                    {chips.map((c, i) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={c.remove}
                        aria-label={`Убрать: ${c.label}`}
                        style={{ animationDelay: `${i * 50}ms` }}
                        className="animate-chip-in group inline-flex items-center gap-1 rounded-full border border-brand/25 bg-brand/[0.06] py-1 pl-2.5 pr-1.5 text-[12px] font-semibold text-brand-strong transition-all duration-200 ease-smooth hover:border-brand/45 active:scale-[0.96]"
                      >
                        {c.label}
                        <span className="inline-flex size-4 items-center justify-center rounded-full text-brand/70 transition-colors duration-200 group-hover:bg-brand/10 group-hover:text-brand-strong">
                          <X className="size-3" strokeWidth={2.5} />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a
                href={tgLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(180deg,oklch(0.54_0.17_256),oklch(0.44_0.17_259))] py-3.5 pl-6 pr-2 text-sm font-semibold text-white shadow-[inset_0_1px_0_oklch(0.86_0.09_256/0.55),inset_0_-1px_1px_oklch(0.3_0.12_259/0.4),0_1px_2px_oklch(0.28_0.1_259/0.45),0_14px_30px_-12px_oklch(0.45_0.16_256/0.6),0_5px_12px_-4px_oklch(0.4_0.14_258/0.5)] transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:brightness-[1.08] active:scale-[0.98] active:brightness-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto"
              >
                {hasSelection ? "Обсудить расчёт в Telegram" : "Обсудить проект в Telegram"}
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5">
                  <TelegramIcon className="size-4" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Превью на весь экран — по кнопке «развернуть» в шапке окна */}
        {zoom && type && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              onClick={() => setZoom(false)}
              role="dialog"
              aria-modal="true"
              aria-label={`Превью сайта: ${type.title}`}
            >
              <div className="absolute inset-0 bg-[oklch(0.2_0.02_260/0.62)] backdrop-blur-md" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-6xl overflow-hidden rounded-2xl border border-[oklch(0.84_0.008_256)] bg-bg shadow-[0_50px_120px_-40px_oklch(0.2_0.03_260/0.7)]"
              >
                <div className="flex h-10 items-stretch gap-2 border-b border-border/70 bg-surface/80 pl-3">
                  <span className="my-1.5 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border/70 bg-gradient-to-b from-bg to-surface/70 px-2.5 text-[11.5px] shadow-[inset_0_1px_0_oklch(1_0_0/0.65)]">
                    <Lock className="size-3 shrink-0 text-brand" strokeWidth={2.4} aria-hidden />
                    <span className="truncate">
                      <span className="text-faint">https://</span>
                      <span className="font-semibold text-fg">{domainName}</span>
                      <span className="text-faint">.{domainTld}</span>
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom(false)}
                    aria-label="Закрыть превью"
                    className="flex items-center px-4 text-faint transition-colors duration-200 hover:bg-[oklch(0.62_0.21_25)] hover:text-white focus-visible:bg-[oklch(0.62_0.21_25)] focus-visible:text-white focus-visible:outline-none"
                  >
                    <X className="size-4" strokeWidth={1.8} />
                  </button>
                </div>
                <div data-lenis-prevent className="modal-scroll max-h-[82vh] overflow-y-auto bg-white">
                  {Mockup ? (
                    <Mockup />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={type.image}
                      alt={`Пример сайта: ${type.title}`}
                      className="block h-auto w-full"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
      </section>
    </MotionConfig>
  );
}
