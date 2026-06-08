"use client";

import { Search, Star } from "lucide-react";
import { ChatGptMark } from "./case-mockups";

// Живые мини-графики для тайлов кейсов «Оптимизация» — чёткие на любом размере,
// совпадают по смыслу с тем, что открывается в модалке (без скриншотов-фото).

const skel = "block rounded-full bg-border";

/** Тайл SEO — мини выдача с результатом №1. */
export function SeoTile() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2.5 bg-gradient-to-b from-brand/[0.07] to-bg p-4 transition-transform duration-700 ease-smooth group-hover:scale-[1.03]">
      <div className="flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-2 shadow-[0_6px_18px_-12px_oklch(0.3_0.02_260/0.5)]">
        <Search className="size-3.5 shrink-0 text-muted" strokeWidth={2.2} />
        <span className="truncate text-[11px] font-medium text-fg">
          стоматология в москве
        </span>
      </div>

      <div className="relative rounded-xl border border-brand/30 bg-gradient-to-b from-brand/[0.07] to-bg p-3">
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[9px] font-bold text-white">
          <Star className="size-2.5" fill="currentColor" strokeWidth={0} />1
        </span>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted">
          <span className="inline-flex size-3.5 items-center justify-center rounded bg-brand text-[8px] font-extrabold text-white">
            A
          </span>
          astradent.ru
        </div>
        <p className="mt-1 text-[12px] font-bold leading-tight text-brand-strong">
          AstraDent — стоматология в Москве
        </p>
        <div className="mt-2 space-y-1">
          <span className={`${skel} h-1.5 w-full`} />
          <span className={`${skel} h-1.5 w-2/3`} />
        </div>
      </div>
    </div>
  );
}

/** Тайл ИИ — мини-ответ ChatGPT с цитируемым источником. */
export function AiTile() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2 bg-gradient-to-b from-brand/[0.06] to-bg p-4 transition-transform duration-700 ease-smooth group-hover:scale-[1.03]">
      <div className="flex justify-end">
        <span className="rounded-[12px_12px_4px_12px] bg-fg px-2.5 py-1.5 text-[10px] font-medium text-bg">
          Где купить цветы в Краснодаре?
        </span>
      </div>

      <div className="flex gap-2">
        <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-fg text-bg">
          <ChatGptMark className="size-3.5" />
        </span>
        <div className="min-w-0 flex-1 rounded-xl border border-border bg-bg p-2.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.06em] text-white">
            <Star className="size-2" fill="currentColor" strokeWidth={0} />
            Лучший выбор
          </span>
          <p className="mt-1.5 text-[11px] font-bold leading-tight text-brand-strong">
            Вербена — цветочный бутик
          </p>
          <div className="mt-1.5 space-y-1">
            <span className={`${skel} h-1.5 w-full`} />
            <span className={`${skel} h-1.5 w-3/4`} />
          </div>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-border bg-bg px-1.5 py-0.5 text-[9px] font-semibold text-fg">
            <span className="inline-flex size-3 items-center justify-center rounded-[3px] bg-brand text-[7px] font-extrabold text-white">
              В
            </span>
            verbena-flowers.ru
          </span>
        </div>
      </div>
    </div>
  );
}
