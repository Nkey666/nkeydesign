"use client";

// Превью корпоративного сайта для сцены конфигуратора — это админ-дашборд,
// нарисованный кодом (свой UI, своя палитра, не связанная с брендом портфолио).
// Остальные типы (магазин, редизайн, лендинг) — реальные скриншоты, их рисовать
// кодом смысла нет (там фото). Мокап вёрстается в десктопную ширину и ужимается
// обёрткой <Screenshot> через transform: scale() под ширину контейнера, как
// настоящий скриншот: в сцене видно верх, в зуме прокручивается целиком.

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Mail,
  Calendar,
  MoreVertical,
  ArrowRight,
  LayoutGrid,
  Workflow,
  Layers,
  Component,
  Wrench,
  BarChart3,
  Table2,
  Menu,
} from "lucide-react";

/* ============================================================
   Обёртка-скриншот: верстаем в desktop-ширину, ужимаем под контейнер.
   ============================================================ */
function Screenshot({ width, children }: { width: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [h, setH] = useState(0);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const update = () => {
      const s = o.clientWidth / width;
      setScale(s);
      setH(i.offsetHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(o);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outer} className="w-full overflow-hidden" style={{ height: h || undefined }}>
      <div
        ref={inner}
        style={{
          width,
          transformOrigin: "top left",
          transform: scale ? `scale(${scale})` : undefined,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   КОРПОРАТИВНЫЙ — рекреация админ-дашборда (полностью на русском)
   ============================================================ */

const NAV_SECTIONS = [
  {
    title: "Основное",
    items: [
      {
        label: "Дашборды",
        Icon: LayoutGrid,
        active: true,
        sub: [
          { l: "Основной", badge: "Обновлено", active: true },
          { l: "Универсальный", badge: "Обновлено" },
          { l: "Партнёрский", badge: "Обновлено" },
        ],
      },
    ],
  },
  {
    title: "Разделы",
    items: [
      { label: "Страницы", Icon: Layers, chev: true },
      { label: "Сценарии", Icon: Workflow, chev: true },
    ],
  },
  {
    title: "Интерфейс",
    items: [
      { label: "Макет", Icon: LayoutGrid, chev: true },
      { label: "Компоненты", Icon: Component, chev: true },
      { label: "Утилиты", Icon: Wrench, chev: true },
    ],
  },
  {
    title: "Плагины",
    items: [
      { label: "Графики", Icon: BarChart3 },
      { label: "Таблицы", Icon: Table2 },
    ],
  },
] as const;

const ACTIVITY = [
  { t: "27 мин", c: "#1aa260", h: "Новый заказ! Заказ №2912 успешно оформлен." },
  { t: "58 мин", c: "#2b6fe0", h: "Еженедельный отчёт сформирован и готов к просмотру." },
  { t: "2 ч", c: "#7b2fe0", h: "Новый пользователь Валери Луна зарегистрировался." },
  { t: "1 дн", c: "#f0a020", h: "Оповещение монитора активности сервера." },
  { t: "1 дн", c: "#1aa260", h: "Новый заказ! Заказ №2911 успешно оформлен." },
  { t: "1 дн", c: "#7b2fe0", h: "Детали встречи по маркетингу и планированию обновлены." },
  { t: "2 дн", c: "#1aa260", h: "Новый заказ! Заказ №2910 успешно оформлен." },
];

const PROGRESS = [
  { l: "Миграция сервера", p: 20, c: "#e0242b" },
  { l: "Продажи", p: 40, c: "#f0a020" },
  { l: "База клиентов", p: 60, c: "#2b6fe0" },
  { l: "Выплаты", p: 80, c: "#16b6c4" },
  { l: "Настройка аккаунта", p: 100, c: "#1aa260", done: true },
];

const STATS = [
  { t: "Доход за месяц", v: "₽3 200 000", c: "#2b6fe0", a: "Открыть отчёт" },
  { t: "Доход за год", v: "₽38 400 000", c: "#f0a020", a: "Открыть отчёт" },
  { t: "Выполнено задач", v: "24", c: "#1aa260", a: "Открыть задачи" },
  { t: "Запросы в ожидании", v: "17", c: "#e0242b", a: "Открыть запросы" },
];

function DeskFigure() {
  return (
    <svg viewBox="0 0 220 150" className="h-auto w-full max-w-[280px]" aria-hidden>
      <line x1="20" y1="132" x2="200" y2="132" stroke="#cfd6e4" strokeWidth="2" />
      <rect x="64" y="92" width="92" height="10" rx="2" fill="#2b3a55" />
      <rect x="70" y="64" width="80" height="30" rx="2" fill="#3b4d70" />
      <rect x="74" y="68" width="72" height="22" rx="1.5" fill="#cfe0ff" />
      <circle cx="118" cy="46" r="13" fill="#f0c8a8" />
      <path d="M104 64 q14 -12 28 0 l3 30 h-34 z" fill="#2b6fe0" />
      <path d="M132 66 q12 -10 16 -22" stroke="#f0c8a8" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M104 70 l-10 22" stroke="#2b6fe0" strokeWidth="8" strokeLinecap="round" />
      <rect x="40" y="104" width="22" height="6" rx="1.5" fill="#d76a4a" />
      <rect x="42" y="96" width="18" height="8" rx="1.5" fill="#e0a32e" />
      <rect x="44" y="88" width="14" height="8" rx="1.5" fill="#3aa76d" />
    </svg>
  );
}

function CardHead({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#e7ebf2] px-5 py-3.5">
      <span className="text-[16px] font-bold text-[#2b6fe0]">{title}</span>
      <MoreVertical className="size-4 text-[#aab3c4]" />
    </div>
  );
}

function CorporateInner() {
  return (
    <div className="flex w-full bg-[#f3f6fb] font-sans text-[#3d4759]">
      {/* Сайдбар */}
      <aside className="flex w-[240px] shrink-0 flex-col border-r border-[#e7ebf2] bg-white pb-5">
        <div className="space-y-4 px-4 pt-4">
          {NAV_SECTIONS.map((s) => (
            <div key={s.title}>
              <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#aab3c4]">
                {s.title}
              </p>
              {s.items.map((it) => (
                <div key={it.label}>
                  <div
                    className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[15px] font-semibold ${
                      "active" in it && it.active ? "text-[#2b6fe0]" : "text-[#5b6678]"
                    }`}
                  >
                    <it.Icon className="size-[18px] shrink-0" />
                    <span className="flex-1">{it.label}</span>
                    {"sub" in it && it.sub ? (
                      <ChevronDown className="size-4" />
                    ) : "chev" in it && it.chev ? (
                      <ChevronRight className="size-4 text-[#aab3c4]" />
                    ) : null}
                  </div>
                  {"sub" in it && it.sub && (
                    <div className="ml-4 border-l border-[#e7ebf2] pl-3">
                      {it.sub.map((su) => (
                        <div
                          key={su.l}
                          className={`flex items-center justify-between py-1.5 text-[14px] ${
                            "active" in su && su.active ? "font-bold text-[#2b6fe0]" : "text-[#7b8598]"
                          }`}
                        >
                          {su.l}
                          <span className="rounded bg-[#e7f0ff] px-2 py-0.5 text-[10px] font-bold text-[#2b6fe0]">
                            {su.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-[#e7ebf2] px-5 pt-4 text-[13px]">
          <p className="text-[#aab3c4]">Вы вошли как:</p>
          <p className="font-bold text-[#3d4759]">Анна Соколова</p>
        </div>
      </aside>

      {/* Правая часть */}
      <div className="min-w-0 flex-1">
        {/* Топбар */}
        <div className="flex items-center gap-4 border-b border-[#e7ebf2] bg-white px-5 py-3">
          <Menu className="size-5 text-[#5b6678]" />
          <span className="text-[17px] font-bold text-[#2b3650]">БизнесПро</span>
          <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md bg-[#eef2f8] px-4 py-2.5">
            <span className="truncate text-[14px] text-[#9aa3b4]">Поиск…</span>
            <Search className="ml-auto size-4 text-[#9aa3b4]" />
          </div>
          <div className="ml-auto flex items-center gap-4 text-[#7b8598]">
            <span className="text-[14px] font-semibold">Документация</span>
            <Bell className="size-5" />
            <Mail className="size-5" />
            <span className="size-9 rounded-full bg-gradient-to-br from-[#2b6fe0] to-[#7b2fe0]" />
          </div>
        </div>

        {/* Контент */}
        <div className="px-5 pb-7">
          {/* Градиентный хедер */}
          <div className="-mx-5 bg-[linear-gradient(110deg,#1f53e5,#5b2fe0)] px-7 pb-20 pt-7 text-white">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-[30px] font-bold leading-tight">Панель управления</h3>
                <p className="mt-1 text-[15px] text-white/75">Обзор показателей и сводка по разделам</p>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[14px] font-semibold text-[#3d4759] shadow-sm">
                <Calendar className="size-4 text-[#2b6fe0]" />
                11 июня 2026 — 11 июня 2026
                <ChevronDown className="size-4 text-[#9aa3b4]" />
              </div>
            </div>
          </div>

          {/* Три карточки внахлёст на хедер */}
          <div className="-mt-14 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#e7ebf2] bg-white shadow-sm">
              <div className="flex flex-col items-center px-5 py-7 text-center">
                <h4 className="text-[21px] font-bold text-[#2b6fe0]">Добро пожаловать в БизнесПро!</h4>
                <p className="mt-3 text-[14px] leading-relaxed text-[#7b8598]">
                  Готовый набор интерфейсов: страницы, компоненты и утилиты. Загляните в
                  документацию, чтобы начать быстрее.
                </p>
                <div className="mt-5">
                  <DeskFigure />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#e7ebf2] bg-white shadow-sm">
              <CardHead title="Последняя активность" />
              <div className="px-5 py-2.5">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex gap-3 py-2">
                    <span className="w-12 shrink-0 pt-0.5 text-right text-[12px] text-[#aab3c4]">{a.t}</span>
                    <span className="relative flex flex-col items-center">
                      <span className="mt-1 size-2.5 rounded-full" style={{ background: a.c }} />
                      {i < ACTIVITY.length - 1 && <span className="w-px flex-1 bg-[#e7ebf2]" />}
                    </span>
                    <p className="flex-1 pb-1 text-[13.5px] leading-snug text-[#5b6678]">{a.h}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#e7ebf2] bg-white shadow-sm">
              <CardHead title="Отслеживание прогресса" />
              <div className="space-y-4 px-5 py-4">
                {PROGRESS.map((p) => (
                  <div key={p.l}>
                    <div className="flex items-center justify-between text-[14px]">
                      <span className="font-semibold text-[#3d4759]">{p.l}</span>
                      <span className="font-bold" style={{ color: p.done ? "#1aa260" : "#5b6678" }}>
                        {p.done ? "Готово!" : `${p.p}%`}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#eef2f8]">
                      <span className="block h-full rounded-full" style={{ width: `${p.p}%`, background: p.c }} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-[#e7ebf2] pt-3 text-[13.5px] font-semibold text-[#7b8598]">
                  Перейти в центр задач
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          </div>

          {/* 4 стат-карточки */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.t} className="overflow-hidden rounded-xl text-white" style={{ background: s.c }}>
                <div className="px-4 pb-4 pt-4">
                  <p className="text-[13.5px] font-medium text-white/85">{s.t}</p>
                  <p className="mt-1 text-[24px] font-extrabold leading-tight">{s.v}</p>
                </div>
                <div className="flex items-center justify-between bg-black/10 px-4 py-2 text-[13px] font-semibold">
                  {s.a}
                  <ChevronRight className="size-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Корпоративный мокап в desktop-ширине, ужатый <Screenshot> под контейнер.
export function CorporateMockup() {
  return (
    <Screenshot width={1180}>
      <CorporateInner />
    </Screenshot>
  );
}

// Карта «тип проекта -> мокап». Только корпоративный рисуется кодом (чистый
// UI без фото — выглядит как настоящий). Магазин, редизайн и лендинг — реальные
// скриншоты из /public/previews, их рендерит <Image> в конфигураторе.
export const TYPE_MOCKUP: Record<string, ComponentType> = {
  corporate: CorporateMockup,
};
