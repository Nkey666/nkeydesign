export type Shot = { src: string; w: number; h: number; label?: string };

export type CategoryId = "complex" | "landing" | "optimization";

export type Category = {
  id: CategoryId;
  title: string;
  subtitle: string;
};

export type Case = {
  title: string;
  tag: string;
  url: string;
  category: CategoryId;
  thumbnail: string;
  description: string;
  tech: string[];
  shots: Shot[];
  // Живой макет вместо скринов-развёрток (кейсы «Оптимизация»).
  mockup?: "seo" | "ai";
};

const w = (slug: string) => `/cases/works/${slug}`;
// Цельная развёртка страницы (без нарезки). label — подпись страницы, если их несколько.
const page = (slug: string, name: string, sw: number, h: number, label?: string): Shot => ({
  src: `${w(slug)}-${name}.webp`,
  w: sw,
  h,
  label,
});

// Категории — «какого уровня работы я делаю».
export const categories: Category[] = [
  {
    id: "complex",
    title: "Многостраничные и премиум-сайты",
    subtitle:
      "Каталоги, разделы и продуктовые страницы — там, где нужна структура, навигация и сложная механика.",
  },
  {
    id: "landing",
    title: "Лендинги",
    subtitle: "Один экран — одно решение: заявка, запись, заказ. Ничего лишнего.",
  },
  {
    id: "optimization",
    title: "Оптимизация",
    subtitle: "Чтобы сайт находили — и в поиске, и в ответах нейросетей.",
  },
];

export const cases: Case[] = [
  // ── Многостраничные и премиум ────────────────────────────────────
  {
    title: "Вербена — цветочный бутик",
    tag: "интернет-магазин",
    url: "verbena-flowers.ru",
    category: "complex",
    thumbnail: `${w("flowers")}-tile.webp`,
    description:
      "Магазин букетов, где покупают на эмоциях. Каталог, карточки товаров и доставка в день заказа — путь от «красиво» до оплаты без единого лишнего клика.",
    tech: ["Next.js", "React"],
    shots: [page("flowers", "full", 1350, 3767, "Главная"), page("flowers", "full2", 1350, 1529, "Каталог")],
  },
  {
    title: "ПИТ — автосервис",
    tag: "сайт услуг",
    url: "pit-auto.ru",
    category: "complex",
    thumbnail: `${w("auto")}-tile.webp`,
    description:
      "Автосервис, где цены видно ещё до приезда. Услуги, прозрачный прайс отдельной страницей и запись онлайн — доверие включается с первого экрана.",
    tech: ["HTML", "CSS", "JavaScript"],
    shots: [page("auto", "full", 1350, 8277, "Главная"), page("auto", "full2", 1350, 1891, "Страница цен")],
  },
  {
    title: "HELIX — SaaS для продаж",
    tag: "продуктовый сайт",
    url: "helix.ai",
    category: "complex",
    thumbnail: `${w("helix")}-tile.webp`,
    description:
      "Продуктовый сайт уровня мировых SaaS. Анимация на GSAP и Motion, видео и тёмная сцена — продукт выглядит дорого и грузится мгновенно. Мой флагман.",
    tech: ["Next.js 16", "Tailwind v4", "GSAP", "Motion"],
    shots: [page("helix", "full", 1350, 6769)],
  },
  {
    title: "Floria — цветочная студия",
    tag: "премиум-лендинг",
    url: "floria-landing-page.vercel.app",
    category: "complex",
    thumbnail: `${w("floria")}-tile.webp`,
    description:
      "«Botanic Architecture» — флористика как искусство. Тёмная сцена, скульптурные букеты, выверенная типографика и анимация. Премиум, который запоминается с первого касания.",
    tech: ["Next.js", "React"],
    shots: [page("floria", "full", 1354, 7682)],
  },

  // ── Лендинги ─────────────────────────────────────────────────────
  {
    title: "BLADE — барбершоп",
    tag: "лендинг",
    url: "blade-barbershop.ru",
    category: "landing",
    thumbnail: `${w("barbershop")}-tile.webp`,
    description:
      "Барбершоп, который продаёт запись, а не «услуги». Тёмная атмосфера, цены без звонков и бронь в пару касаний — заявка приходит прямо с телефона.",
    tech: ["HTML", "CSS", "JavaScript"],
    shots: [page("barbershop", "full", 1350, 7584)],
  },
  {
    title: "AstraDent — стоматология",
    tag: "сайт клиники",
    url: "astradent.ru",
    category: "landing",
    thumbnail: `${w("stomatology")}-tile.webp`,
    description:
      "Клиника, которой доверяют ещё до визита. Врачи, работы до и после, отзывы — сайт снимает страх перед креслом и спокойно ведёт к записи.",
    tech: ["HTML", "CSS", "JavaScript"],
    shots: [page("stomatology", "full", 1350, 7948)],
  },
  {
    title: "Роща — кофейня",
    tag: "лендинг",
    url: "roshacafe.ru",
    category: "landing",
    thumbnail: `${w("cafe")}-tile.webp`,
    description:
      "Кофейня как место, а не точка с кофе. Меню, атмосфера зала и бронь стола — сайт, в который хочется зайти так же, как в саму кофейню.",
    tech: ["HTML", "CSS", "JavaScript"],
    shots: [page("cafe", "full", 1350, 6491)],
  },
  {
    title: "BLOOM — кофейня",
    tag: "лендинг",
    url: "bloom-coffee.vercel.app",
    category: "landing",
    thumbnail: `${w("bloom")}-tile.webp`,
    description:
      "«Кофе как ритуал» — и сайт под это настроение. Крупное фото, спокойный ритм и бронь стола без лишних шагов. Тёплый, как утренняя чашка.",
    tech: ["HTML", "CSS", "JavaScript"],
    shots: [page("bloom", "full", 1350, 6309)],
  },

  // ── Оптимизация ──────────────────────────────────────────────────
  {
    title: "Редизайн и SEO",
    tag: "seo",
    url: "Поисковая выдача",
    category: "optimization",
    thumbnail: `${w("seo")}-tile.webp`,
    description:
      "Старый сайт превращаю в быстрый, понятный и первый в выдаче. Структура под реальные запросы, скорость по Core Web Vitals и техническая база, которую любят поисковики.",
    tech: ["SEO", "Core Web Vitals", "Schema.org"],
    shots: [],
    mockup: "seo",
  },
  {
    title: "Оптимизация под ИИ",
    tag: "ии-поиск",
    url: "Ответ нейросети",
    category: "optimization",
    thumbnail: `${w("ai")}-tile.webp`,
    description:
      "Делаю так, чтобы вас советовали нейросети. Разметка, llms.txt и чистая фактура — сайт понимают и цитируют ChatGPT и нейропоиск. Это новый канал клиентов.",
    tech: ["JSON-LD", "llms.txt", "Schema.org"],
    shots: [],
    mockup: "ai",
  },
];

// Лента hero — превью сайтов. Файлы в public/cases/1.png … 8.png.
export const heroImages: string[] = [
  "/cases/1.png",
  "/cases/2.png",
  "/cases/3.png",
  "/cases/4.png",
  "/cases/5.png",
  "/cases/6.png",
  "/cases/7.png",
  "/cases/8.png",
];
