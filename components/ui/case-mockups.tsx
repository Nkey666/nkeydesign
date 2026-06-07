"use client";

import { motion } from "motion/react";
import { Search, Sparkles, Star, AlignLeft, Zap, LayoutGrid, ArrowUp, Database, FileText, Code2, Compass, MapPin, ArrowUpRight, Mic, Plus, Settings2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function FeatureItem({
  Icon,
  title,
  text,
}: {
  Icon: typeof Search;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      variants={item}
      className="flex items-start gap-3.5 rounded-2xl border border-border bg-bg px-5 py-4"
    >
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon className="size-[18px]" strokeWidth={2.2} />
      </span>
      <div>
        <p className="text-[15px] font-bold text-fg">{title}</p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{text}</p>
      </div>
    </motion.div>
  );
}

export function SeoMockup() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="rounded-2xl border border-border bg-gradient-to-b from-brand/[0.04] to-bg p-7 md:p-10"
    >
      {/* Поисковая строка */}
      <motion.div
        variants={item}
        className="flex items-center gap-3 rounded-full border border-border bg-bg px-5 py-3.5 shadow-[0_10px_30px_-20px_oklch(0.3_0.02_260/0.5)]"
      >
        <Search className="size-[18px] text-muted" strokeWidth={2.2} />
        <span className="text-[15px] font-medium text-fg">
          стоматология в центре москвы
        </span>
        <span className="ml-auto text-xs font-semibold text-faint">Поиск</span>
      </motion.div>

      {/* Результаты */}
      <div className="mt-6 flex flex-col gap-3">
        <motion.div
          variants={item}
          className="relative rounded-2xl border border-brand/30 bg-gradient-to-b from-brand/[0.06] to-bg p-5 shadow-[0_18px_44px_-28px_oklch(0.48_0.16_256/0.5)]"
        >
          <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
            <Star className="size-3" fill="currentColor" />
            1 позиция
          </div>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-muted">
            <span className="inline-flex size-5 items-center justify-center rounded-md bg-brand text-[11px] font-extrabold text-white">
              A
            </span>
            astradent.ru
          </div>
          <h4 className="mt-2 text-[17px] font-bold text-brand-strong">
            AstraDent — стоматология в центре Москвы
          </h4>
          <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-muted">
            Лечение без боли, гарантия на работы 5 лет, запись онлайн. Современная
            клиника в центре Москвы — врачи, результаты работ и честные цены.
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="rounded-2xl border border-border bg-bg p-5 opacity-60"
        >
          <p className="text-[13px] text-muted">стом-клиника-77.ru</p>
          <h4 className="mt-1 text-[15px] font-semibold text-faint">
            Стоматология рядом с метро — недорого
          </h4>
          <p className="mt-1 text-[13px] text-muted">
            Лечение зубов, протезирование, имплантация. Запись на консультацию.
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="rounded-2xl border border-border bg-bg p-5 opacity-60"
        >
          <p className="text-[13px] text-muted">dental-moscow.ru</p>
          <h4 className="mt-1 text-[15px] font-semibold text-faint">
            Сеть стоматологий в Москве
          </h4>
          <p className="mt-1 text-[13px] text-muted">
            Более 20 филиалов. Акции и скидки на лечение и отбеливание.
          </p>
        </motion.div>
      </div>

      {/* Что входит */}
      <motion.div variants={item} className="mt-8 border-t border-border pt-7">
        <h4 className="text-[17px] font-bold text-fg">Что входит в работу</h4>
        <motion.div
          variants={stagger}
          className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <FeatureItem
            Icon={AlignLeft}
            title="Семантика и структура"
            text="Карта запросов, чистая иерархия страниц и заголовков"
          />
          <FeatureItem
            Icon={Zap}
            title="Скорость загрузки"
            text="Core Web Vitals в зелёной зоне, лёгкий код"
          />
          <FeatureItem
            Icon={LayoutGrid}
            title="Мета и Open Graph"
            text="Заголовки, описания и красивые превью для соцсетей"
          />
          <FeatureItem
            Icon={ArrowUp}
            title="Индексация"
            text="Sitemap, robots и микроразметка для поисковиков"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Лого OpenAI (официальный path) — «цветок-узел».
function ChatGptMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.787a4.49 4.49 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
      />
    </svg>
  );
}

function ChatPlace({
  badge,
  badgeTone,
  title,
  meta,
  desc,
  highlighted = false,
}: {
  badge: string;
  badgeTone: "muted" | "brand";
  title: string;
  meta: string;
  desc: string;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      variants={item}
      className={
        "rounded-2xl border p-3 transition-colors sm:p-4 " +
        (highlighted
          ? "border-brand/35 bg-brand/[0.04] shadow-[0_18px_40px_-30px_oklch(0.48_0.16_256/0.5)]"
          : "border-border bg-bg")
      }
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span
          className={
            "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] " +
            (badgeTone === "brand"
              ? "bg-brand text-white"
              : "bg-surface text-muted")
          }
        >
          {badgeTone === "brand" && <Star className="size-3" fill="currentColor" />}
          {badge}
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] text-faint">
          <MapPin className="size-3 shrink-0" />
          {meta}
        </span>
      </div>
      <div className="mt-2 flex items-start justify-between gap-3">
        <p
          className={
            "text-[15px] font-bold " +
            (highlighted ? "text-brand-strong" : "text-fg")
          }
        >
          {title}
        </p>
        {highlighted && (
          <ArrowUpRight className="size-4 shrink-0 text-brand" strokeWidth={2.4} />
        )}
      </div>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{desc}</p>
    </motion.div>
  );
}

export function AiMockup() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="rounded-2xl border border-border bg-gradient-to-b from-brand/[0.04] to-bg p-3 sm:p-5 md:p-7"
    >
      {/* ChatGPT-окно */}
      <motion.div
        variants={item}
        className="overflow-hidden rounded-3xl border border-border bg-bg shadow-[0_30px_70px_-36px_oklch(0.3_0.03_256/0.5)]"
      >
        {/* Шапка чата */}
        <div className="flex items-center gap-3 border-b border-border bg-surface/60 px-5 py-3.5">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-fg text-bg">
            <ChatGptMark className="size-4" />
          </span>
          <div className="leading-tight">
            <p className="text-[13.5px] font-bold text-fg">ChatGPT</p>
            <p className="text-[11px] text-faint">Цветы · Краснодар</p>
          </div>
          <span className="ml-auto flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-[oklch(0.78_0.13_150)]" />
            <span className="text-[11px] font-medium text-muted">онлайн</span>
          </span>
        </div>

        {/* Тело чата */}
        <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-5 md:px-7 md:py-6">
          {/* Сообщение пользователя */}
          <div className="flex justify-end">
            <span className="max-w-[85%] rounded-[20px_20px_6px_20px] bg-fg px-4 py-2.5 text-[14.5px] font-medium text-bg">
              Посоветуй, где можно купить цветы в Краснодаре
            </span>
          </div>

          {/* Ответ ChatGPT */}
          <div className="flex gap-2.5 sm:gap-3.5">
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-fg text-bg sm:size-9">
              <ChatGptMark className="size-4 sm:size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] leading-[1.62] text-fg">
                Вот три проверенных места в Краснодаре, где можно купить цветы —
                от авторских букетов до быстрой доставки:
              </p>

              <motion.div
                variants={stagger}
                className="mt-4 flex flex-col gap-2.5"
              >
                <ChatPlace
                  badge="Лучший выбор"
                  badgeTone="brand"
                  title="Вербена — цветочный бутик"
                  meta="центр, ул. Красная"
                  desc="Авторские букеты и редкие сорта пионов, орхидей и роз. Сезонные композиции от флориста, доставка в день заказа. Подойдёт, если нужен запоминающийся букет."
                  highlighted
                />
                <ChatPlace
                  badge="Сеть"
                  badgeTone="muted"
                  title="Цветочная База №1"
                  meta="несколько точек по городу"
                  desc="Демократичные цены, большой выбор готовых букетов. Подойдёт, если нужен недорогой и быстрый вариант поблизости."
                />
                <ChatPlace
                  badge="Маркетплейс"
                  badgeTone="muted"
                  title="FlowWow Краснодар"
                  meta="доставка от местных флористов"
                  desc="Агрегатор частных флористов с фото готовых работ. Удобно сравнивать стили, но качество зависит от конкретного исполнителя."
                />
              </motion.div>

              <p className="mt-4 text-[14px] leading-[1.62] text-muted">
                Если нужен букет «на эмоцию» — рекомендую{" "}
                <span className="font-bold text-brand-strong">Вербену</span>: у
                них самая сильная флористика в городе и аккуратная доставка.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-faint">
                  Источник
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-2.5 py-1 text-[12px] font-semibold text-fg">
                  <span className="inline-flex size-[16px] items-center justify-center rounded-[4px] bg-brand text-[9px] font-extrabold text-white">
                    В
                  </span>
                  verbena-flowers.ru
                </span>
                <span className="inline-flex items-center rounded-full border border-border bg-bg px-2.5 py-1 text-[12px] font-medium text-muted">
                  +2 источника
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Input в стиле ChatGPT (декоративный) */}
        <div className="border-t border-border bg-surface/40 px-4 py-3.5">
          <div className="flex items-center gap-2 rounded-[20px] border border-border bg-bg px-3 py-2 shadow-[0_2px_10px_-6px_oklch(0.3_0.02_260/0.3)]">
            <button
              type="button"
              className="inline-flex size-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface"
              aria-label="Прикрепить"
              tabIndex={-1}
            >
              <Plus className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[12.5px] font-medium text-muted transition-colors hover:bg-surface"
              tabIndex={-1}
            >
              <Settings2 className="size-3.5" />
              Tools
            </button>
            <span className="ml-2 flex-1 truncate text-[14px] text-faint">
              Спросить ещё...
            </span>
            <button
              type="button"
              className="inline-flex size-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface"
              aria-label="Голосовой ввод"
              tabIndex={-1}
            >
              <Mic className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex size-7 items-center justify-center rounded-full bg-fg text-bg"
              aria-label="Отправить"
              tabIndex={-1}
            >
              <ArrowUp className="size-4" strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Что входит */}
      <motion.div variants={item} className="mt-8 border-t border-border pt-7">
        <h4 className="text-[17px] font-bold text-fg">Что входит в работу</h4>
        <motion.div
          variants={stagger}
          className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <FeatureItem
            Icon={Database}
            title="Структурированная разметка"
            text="JSON-LD: организация, услуги, отзывы и контакты"
          />
          <FeatureItem
            Icon={FileText}
            title="llms.txt"
            text="Карта сайта для языковых моделей — что и где цитировать"
          />
          <FeatureItem
            Icon={Code2}
            title="Чистая семантика"
            text="Понятная структура контента и заголовков для парсинга"
          />
          <FeatureItem
            Icon={Compass}
            title="Фактура для ответов"
            text="Чёткие описания услуг, цен и преимуществ — то, что цитирует ИИ"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
