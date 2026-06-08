import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/site/lenis-provider";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ContactButton } from "@/components/site/contact-button";
import { SiteHeader } from "@/components/site/site-header";
import { CookieConsent } from "@/components/site/cookie-consent";
import { YandexMetrika } from "@/components/site/yandex-metrika";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — nkeydesign",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "заказать сайт",
    "разработка сайтов",
    "сайт под ключ",
    "веб-разработчик",
    "сайт для бизнеса",
    "лендинг под ключ",
    "интернет-магазин",
    "создание сайта Москва",
    "редизайн сайта",
    "оптимизация сайта под ИИ",
    "Next.js разработка",
  ],
  authors: [{ name: "Никита", url: SITE_URL }],
  creator: "Никита",
  publisher: "Никита",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    title: SITE_TITLE,
    description:
      "Современные сайты для бизнеса, который хочет выделяться. От идеи до запуска.",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Современные сайты для бизнеса, который хочет выделяться. От идеи до запуска.",
  },
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Подтверждение прав в вебмастерах.
  // Google — мета-тег ниже; Яндекс — HTML-файл public/yandex_cf5d8e7c5464f577.html.
  verification: {
    google: "sun2UErO9rlJYwmctHZp4ToJG8vQqFQn3OUqbedb-Io",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="relative min-h-dvh overflow-x-hidden">
        <AuroraBackground />
        <SiteHeader />
        <LenisProvider>{children}</LenisProvider>
        <ContactButton />
        <CookieConsent />
        <YandexMetrika />
      </body>
    </html>
  );
}
