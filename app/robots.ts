import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Явно пускаем поисковики и ИИ-краулеры. Для ИИ-видимости важно, чтобы
// боты ChatGPT/Claude/Perplexity/Gemini могли читать и цитировать сайт.
const AI_AND_SEARCH_BOTS = [
  // OpenAI / ChatGPT
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (обычный + расширенный для Gemini/AI Overviews)
  "Googlebot",
  "Google-Extended",
  // Microsoft / Bing / Copilot
  "Bingbot",
  // Apple Intelligence
  "Applebot",
  "Applebot-Extended",
  // Common Crawl (база для многих ИИ)
  "CCBot",
  // Яндекс
  "YandexBot",
  "Mail.RU_Bot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
