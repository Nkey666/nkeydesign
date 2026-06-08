// Единый источник правды по SEO/GEO. Домен и сущность живут здесь —
// меняешь в одном месте, подтягивается в metadata, robots, sitemap, schema, OG.

import { faqs } from "@/lib/data/faq";
import { services } from "@/lib/data/services";

/** Боевой домен. Поменять тут — обновится везде. */
export const SITE_URL = "https://nkeydesign.ru";

export const SITE_NAME = "nkeydesign";
export const SITE_TITLE = "Разработка сайтов для бизнеса — nkeydesign";
export const SITE_DESCRIPTION =
  "Делаю быстрые, адаптивные и визуально продуманные сайты для бизнеса: лендинги, интернет-магазины, корпоративные сайты, редизайн, SEO и оптимизация под ИИ. От идеи до запуска.";

export const TELEGRAM_URL = "https://t.me/nkey6";

/**
 * sameAs — профили одной и той же персоны. Чем больше реальных ссылок,
 * тем увереннее ИИ и поисковики связывают их в одну сущность «Никита».
 * Добавляй сюда GitHub / VK / Behance / Dprofile, когда появятся.
 */
export const SAME_AS: string[] = [
  TELEGRAM_URL,
  "https://github.com/Nkey666",
  // Добавляй сюда VK / Behance / Dprofile / Хабр, когда появятся.
];

/** Города, по которым работаешь (areaServed). */
export const AREA_SERVED = ["Москва", "Санкт-Петербург", "Россия"];

/** Чем владеешь как эксперт — сигнал экспертности для ИИ (knowsAbout). */
export const KNOWS_ABOUT = [
  "Веб-разработка",
  "Разработка сайтов",
  "Frontend",
  "Next.js",
  "React",
  "TypeScript",
  "Лендинги",
  "Интернет-магазины",
  "Корпоративные сайты",
  "Редизайн сайтов",
  "SEO-оптимизация",
  "Адаптивная вёрстка",
  "Оптимизация сайтов под ИИ",
];

/** Вилка по проектам — для priceRange. */
export const PRICE_RANGE = "40000–90000 ₽";

const personId = `${SITE_URL}/#person`;
const orgId = `${SITE_URL}/#business`;
const siteId = `${SITE_URL}/#website`;

/**
 * Единый @graph со связанными по @id сущностями — современный формат,
 * который лучше всего читают Google Rich Results и ИИ-поисковики.
 */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Краснослободцев Никита Александрович",
        givenName: "Никита",
        familyName: "Краснослободцев",
        jobTitle: "Frontend-разработчик",
        description:
          "Frontend-разработчик из Москвы, 3 года опыта. Делаю современные сайты для бизнеса: лендинги, интернет-магазины, корпоративные сайты, редизайн, SEO и оптимизацию под ИИ. Стек: Next.js, React, TypeScript, Tailwind CSS.",
        url: SITE_URL,
        knowsAbout: KNOWS_ABOUT,
        knowsLanguage: ["ru"],
        sameAs: SAME_AS,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Москва",
          addressCountry: "RU",
        },
        worksFor: { "@id": orgId },
      },
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        priceRange: PRICE_RANGE,
        currenciesAccepted: "RUB",
        inLanguage: "ru",
        founder: { "@id": personId },
        provider: { "@id": personId },
        areaServed: AREA_SERVED.map((name) => ({ "@type": "AdministrativeArea", name })),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Москва",
          addressCountry: "RU",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          url: TELEGRAM_URL,
          availableLanguage: "ru",
        },
        sameAs: SAME_AS,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Услуги по разработке сайтов",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.blurb,
              provider: { "@id": personId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "ru",
        publisher: { "@id": personId },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
