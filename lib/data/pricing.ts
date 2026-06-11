// Данные для калькулятора цены. ВСЕ ЦИФРЫ — ПЛЕЙСХОЛДЕРЫ (round-числа),
// владелец подставит реальные. Меняешь суммы только здесь.
//
// Иконки не храним в данных (данные чистые, без JSX) — они мапятся по id
// в самих компонентах.

export type ProjectType = {
  id: string;
  title: string;
  blurb: string;
  /** Базовая вилка «от», ₽. Плейсхолдер. */
  from: number;
  /** Ориентир по сроку — подпись, не множитель. */
  term: string;
  /** Картинка сайта для «сцены» конфигуратора. Мапинг легко поменять. */
  image: string;
  /** Домен в адресной строке браузера на сцене. Пара к image. */
  domain: string;
};

export type PriceOption = {
  id: string;
  title: string;
  blurb: string;
  /** Надбавка, ₽. Плейсхолдер. */
  add: number;
};

export const projectTypes: ProjectType[] = [
  {
    id: "landing",
    title: "Лендинг / визитка",
    blurb: "Один экран под одну цель: заявку, запись или звонок.",
    from: 30000,
    term: "от 5 дней",
    image: "/previews/landing-v2.webp",
    domain: "вашновыйсайт.ру",
  },
  {
    id: "corporate",
    title: "Корпоративный сайт",
    blurb: "Многостраничник с разделами, услугами и структурой.",
    from: 50000,
    term: "от 2 недель",
    image: "/cases/3.png",
    domain: "вашновыйсайт.ру",
  },
  {
    id: "store",
    title: "Интернет-магазин",
    blurb: "Каталог, карточки, корзина и онлайн-оплата.",
    from: 70000,
    term: "от 3 недель",
    image: "/previews/store-v4.webp",
    domain: "вашновыйсайт.ру",
  },
  {
    id: "redesign",
    title: "Редизайн + SEO",
    blurb: "Переделка устаревшего сайта и вывод в поисковую выдачу.",
    from: 25000,
    term: "от 1.5 недель",
    image: "/previews/redesign-v2.webp",
    domain: "вашновыйсайт.ру",
  },
];

export const priceOptions: PriceOption[] = [
  {
    id: "seo",
    title: "SEO + GEO под ключ",
    blurb: "Семантика, скорость, разметка и оптимизация под ИИ-поиск. Можно отдельно, на ваш текущий сайт.",
    add: 10000,
  },
  {
    id: "cms",
    title: "Админка / CMS",
    blurb: "Сами меняете тексты, товары и картинки без разработчика.",
    add: 20000,
  },
  {
    id: "integrations",
    title: "Интеграции",
    blurb: "Оплата, CRM, заявки в Telegram, аналитика.",
    add: 12000,
  },
];
