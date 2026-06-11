"use client";

import { useState } from "react";
import { projectTypes, priceOptions } from "@/lib/data/pricing";
import { TELEGRAM_USER } from "@/lib/contact";

/** Формат суммы в рублях с разделителями: 70000 -> "70 000". */
export const ruble = (n: number) => n.toLocaleString("ru-RU");

/**
 * Состояние конфигуратора. Тип проекта ОПЦИОНАЛЕН (старт — пусто, как в
 * автоконфигураторах), услуги живут сами по себе: можно взять только
 * SEO + GEO на существующий сайт, без нового проекта.
 * Итог = (база типа, если выбран) + выбранные услуги.
 */
export function usePriceConfig() {
  const [typeId, setTypeId] = useState<string | null>(null);
  const [opts, setOpts] = useState<Set<string>>(() => new Set());

  const type = typeId
    ? (projectTypes.find((t) => t.id === typeId) ?? null)
    : null;

  // «Редизайн + SEO» уже включает SEO, поэтому платную опцию SEO к нему не
  // плюсуем (чтобы человек не переплачивал дважды за одно и то же).
  const seoIncludedInType = type?.id === "redesign";
  const chosenOptions = priceOptions.filter((o) => opts.has(o.id));
  const billableOptions = chosenOptions.filter(
    (o) => !(o.id === "seo" && seoIncludedInType),
  );
  // SEO «активно» (показываем плашки ТОП-1), если выбрана опция ИЛИ выбран
  // редизайн, который её уже содержит.
  const seoActive = opts.has("seo") || seoIncludedInType;
  // Подсветить подсказку, когда опция SEO выбрана поверх редизайна — лишнее.
  const seoRedundant = seoIncludedInType && opts.has("seo");

  const total =
    (type?.from ?? 0) + billableOptions.reduce((sum, o) => sum + o.add, 0);
  const hasSelection = type !== null || chosenOptions.length > 0;

  /** Повторный клик по выбранному типу снимает выбор — сцена снова пустая. */
  const selectType = (id: string) =>
    setTypeId((prev) => (prev === id ? null : id));

  const toggleOption = (id: string) =>
    setOpts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const reset = () => {
    setTypeId(null);
    setOpts(new Set());
  };

  // Предзаполненное сообщение в Telegram под собранную конфигурацию.
  let summary: string[];
  if (!hasSelection) {
    summary = ["Здравствуйте! Хочу обсудить проект."];
  } else {
    summary = ["Здравствуйте! Собрал на сайте предварительный расчёт:"];
    if (type) summary.push(`Тип: ${type.title}`);
    if (billableOptions.length)
      summary.push(`Услуги: ${billableOptions.map((o) => o.title).join(", ")}`);
    if (!type && billableOptions.length)
      summary.push("Нужно на существующий сайт, без разработки нового.");
    summary.push(`Ориентир: от ${ruble(total)} ₽`);
  }
  const tgLink = `https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(
    summary.join("\n"),
  )}`;

  return {
    typeId,
    selectType,
    opts,
    toggleOption,
    reset,
    type,
    chosenOptions,
    billableOptions,
    seoActive,
    seoIncludedInType,
    seoRedundant,
    total,
    hasSelection,
    tgLink,
  };
}
