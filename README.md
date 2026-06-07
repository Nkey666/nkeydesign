# nkeydesign

Сайт-портфолио разработчика: современные сайты для бизнеса — лендинги, интернет-магазины, корпоративные сайты, редизайн, SEO и оптимизация под ИИ-поисковики.

**Живой сайт:** https://nkeydesign.ru

## Стек

- Next.js 16 (App Router, React Server Components)
- React 19, TypeScript
- Tailwind CSS v4 (CSS-first, токены OKLCH)
- Motion, Lenis — анимации и плавный скролл
- SEO/GEO: JSON-LD (`@graph`), llms.txt, динамические OG-изображения

## Структура

```
app/            маршруты, метаданные, robots, sitemap, OG-изображения
components/site/ секции страницы (Hero, Services, Works, FAQ, ...)
components/ui/   переиспользуемые примитивы
lib/seo.ts       единый источник SEO-конфигурации и структурированных данных
lib/data/        типизированные данные (услуги, кейсы, FAQ)
deploy/          конфигурация и runbook для деплоя на VPS
```

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть http://localhost:3000

## Сборка

```bash
npm run build
npm start
```

## Деплой

Полный runbook для VPS (Node + pm2 + nginx + SSL) — в [`deploy/DEPLOY.md`](deploy/DEPLOY.md).
Автоматическая настройка при создании сервера — [`deploy/cloud-init.sh`](deploy/cloud-init.sh).
