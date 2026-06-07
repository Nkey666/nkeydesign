"use client";

import {
  Search,
  Star,
  ListTree,
  Zap,
  LayoutPanelTop,
  ArrowUpFromLine,
  Sparkles,
  Boxes,
  FileText,
  Code2,
  MessageSquareQuote,
  type LucideIcon,
} from "lucide-react";

/**
 * Живые макеты кейсов «Оптимизация» — отрисованы как настоящий DOM,
 * а не картинка, поэтому остаются идеально резкими на любом масштабе.
 */

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-mockup-frame
      className="overflow-hidden rounded-2xl border border-border bg-[radial-gradient(120%_80%_at_50%_-10%,oklch(0.93_0.05_256/0.5),transparent_60%)] bg-bg"
    >
      <div className="mx-auto max-w-[760px] px-6 py-12 sm:px-10 sm:py-16">
        {children}
      </div>
    </div>
  );
}

function WorkItem({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3.5 rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <span className="grid size-9 flex-none place-items-center rounded-xl bg-brand/[0.08] text-brand">
        <Icon className="size-[18px]" strokeWidth={2.2} />
      </span>
      <div>
        <b className="block text-[15px] font-bold text-fg">{title}</b>
        <span className="mt-0.5 block text-[13px] leading-relaxed text-muted">
          {text}
        </span>
      </div>
    </div>
  );
}

function WorkPanel({
  items,
}: {
  items: { icon: LucideIcon; title: string; text: string }[];
}) {
  return (
    <div className="mt-11 border-t border-border pt-9">
      <h4 className="text-xl font-extrabold tracking-tight text-fg">
        Что входит в работу
      </h4>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <WorkItem key={it.title} {...it} />
        ))}
      </div>
    </div>
  );
}

export function SeoMockup() {
  return (
    <PageFrame>
      <p className="text-[15px] font-semibold text-brand">Редизайн и SEO</p>
      <h3 className="mt-2.5 text-[clamp(1.7rem,4vw,2.4rem)] font-extrabold leading-[1.1] tracking-tight text-fg">
        Сайт, который находят первым
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
        Переделываю устаревший сайт в современный и быстрый — и довожу его до
        верхних позиций в поиске по целевым запросам.
      </p>

      <div className="mt-9 flex items-center gap-3.5 rounded-full border border-border bg-surface px-6 py-4 shadow-[0_18px_40px_-28px_oklch(0.3_0.03_256/0.6)]">
        <Search className="size-[22px] flex-none text-muted" strokeWidth={2.2} />
        <span className="text-[17px] font-medium text-fg">
          стоматология в центре москвы
        </span>
        <span className="ml-auto text-[13px] font-semibold text-faint">
          Поиск
        </span>
      </div>

      <div className="mt-7 flex flex-col gap-4">
        <div className="relative rounded-[18px] border border-brand/35 bg-gradient-to-b from-brand/[0.06] to-surface p-5 shadow-[0_24px_50px_-32px_oklch(0.48_0.16_256/0.55)] sm:p-6">
          <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-[13px] font-bold text-white">
            <Star className="size-3.5 fill-current" strokeWidth={0} />1 позиция
          </span>
          <div className="flex items-center gap-2.5 text-sm font-semibold text-muted">
            <span className="grid size-[22px] place-items-center rounded-md bg-brand text-[12px] font-extrabold text-white">
              A
            </span>
            astradent.ru
          </div>
          <h4 className="mt-2.5 text-[22px] font-bold tracking-tight text-brand-strong">
            AstraDent — стоматология в центре Москвы
          </h4>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
            Лечение без боли, гарантия на работы 5 лет, запись онлайн.
            Современная клиника в центре Москвы — врачи, результаты работ и
            честные цены.
          </p>
        </div>

        {[
          {
            url: "стом-клиника-77.ru",
            h: "Стоматология рядом с метро — недорого",
            p: "Лечение зубов, протезирование, имплантация. Запишитесь на консультацию.",
          },
          {
            url: "dental-moscow.ru",
            h: "Сеть стоматологий в Москве",
            p: "Более 20 филиалов. Акции и скидки на лечение и отбеливание.",
          },
        ].map((r) => (
          <div
            key={r.url}
            className="rounded-[18px] border border-border bg-surface p-5 opacity-55 sm:p-6"
          >
            <div className="text-sm font-semibold text-muted">{r.url}</div>
            <h4 className="mt-2 text-[20px] font-bold tracking-tight text-fg">
              {r.h}
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.p}</p>
          </div>
        ))}
      </div>

      <WorkPanel
        items={[
          {
            icon: ListTree,
            title: "Семантика и структура",
            text: "Карта запросов, чистая иерархия страниц и заголовков",
          },
          {
            icon: Zap,
            title: "Скорость загрузки",
            text: "Core Web Vitals в зелёной зоне, лёгкий код",
          },
          {
            icon: LayoutPanelTop,
            title: "Мета и Open Graph",
            text: "Заголовки, описания и красивые превью для соцсетей",
          },
          {
            icon: ArrowUpFromLine,
            title: "Индексация",
            text: "Sitemap, robots и микроразметка для поисковиков",
          },
        ]}
      />
    </PageFrame>
  );
}

export function AiMockup() {
  return (
    <PageFrame>
      <p className="text-[15px] font-semibold text-brand">Оптимизация под ИИ</p>
      <h3 className="mt-2.5 text-[clamp(1.7rem,4vw,2.4rem)] font-extrabold leading-[1.1] tracking-tight text-fg">
        Сайт, который советуют нейросети
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
        Готовлю сайт так, чтобы его понимали и цитировали ИИ-помощники и
        нейропоиск — новый источник клиентов помимо обычного поиска.
      </p>

      <div className="mt-9 rounded-[20px] border border-border bg-surface p-5 shadow-[0_24px_55px_-34px_oklch(0.3_0.03_256/0.55)] sm:p-7">
        <div className="ml-auto w-fit max-w-[75%] rounded-2xl rounded-br-md bg-fg px-4 py-2.5 text-[15px] font-medium text-bg">
          Посоветуй надёжный автосервис в Москве
        </div>

        <div className="mt-6 flex gap-3.5">
          <span className="grid size-9 flex-none place-items-center rounded-full bg-brand text-white">
            <Sparkles className="size-[18px]" strokeWidth={2.2} />
          </span>
          <div>
            <div className="text-[13px] font-bold uppercase tracking-[0.12em] text-faint">
              Ответ ИИ
            </div>
            <p className="mt-1.5 text-[15px] leading-relaxed text-fg">
              Из проверенных вариантов в Москве хорошо подойдёт{" "}
              <b className="font-bold">автосервис «ПИТ»</b> — полный цикл
              обслуживания, прозрачные цены и гарантия на работы. Запись доступна
              онлайн на сайте{" "}
              <span className="font-semibold text-brand-strong">
                pit-auto.ru
              </span>
              .
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-faint">
                Источник
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 text-[13px] font-semibold text-fg">
                <span className="grid size-[18px] place-items-center rounded bg-brand text-[11px] font-extrabold text-white">
                  П
                </span>
                pit-auto.ru
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] font-medium text-muted">
                +2 источника
              </span>
            </div>
          </div>
        </div>
      </div>

      <WorkPanel
        items={[
          {
            icon: Boxes,
            title: "Структурированная разметка",
            text: "JSON-LD: организация, услуги, отзывы и контакты",
          },
          {
            icon: FileText,
            title: "llms.txt",
            text: "Карта сайта для языковых моделей — что и где цитировать",
          },
          {
            icon: Code2,
            title: "Чистая семантика",
            text: "Понятная структура контента и заголовков для парсинга",
          },
          {
            icon: MessageSquareQuote,
            title: "Фактура для ответов",
            text: "Чёткие описания услуг, цен и преимуществ — то, что цитирует ИИ",
          },
        ]}
      />
    </PageFrame>
  );
}

export const CASE_MOCKUPS = { seo: SeoMockup, ai: AiMockup } as const;
export type MockupKey = keyof typeof CASE_MOCKUPS;
