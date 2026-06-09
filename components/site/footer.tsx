import Link from "next/link";
import { Clock } from "lucide-react";
import { CookieSettingsLink } from "./cookie-settings-link";
import { TelegramIcon } from "@/components/ui/telegram-icon";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { CopyEmail } from "@/components/ui/copy-email";
import { TELEGRAM_LINK, WHATSAPP_LINK, WHATSAPP_DISPLAY } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 pb-28 pt-8 sm:pb-32">
      <div className="flex flex-col items-start justify-between gap-10 border-t border-border pt-8 sm:flex-row">
        <div className="flex flex-col items-start gap-3">
          <p className="font-display text-lg font-bold text-fg">Никита</p>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Фронтенд- и бэкэнд-разработчик современных сайтов для бизнеса
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm text-fg transition-colors duration-300 ease-smooth hover:text-brand-strong"
            >
              <TelegramIcon className="size-4 text-brand transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5" />
              Telegram @nkey6
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm text-fg transition-colors duration-300 ease-smooth hover:text-brand-strong"
            >
              <WhatsappIcon className="size-4 text-brand transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5" />
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <CopyEmail className="font-mono text-sm text-fg" iconClassName="text-brand" />
          </div>
          <p className="flex items-center gap-1.5 text-xs text-faint">
            <Clock className="size-3.5" aria-hidden />
            Москва (UTC+3) · отвечаю в рабочее время
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-muted">
          <p className="mb-1 text-xs uppercase tracking-[0.16em] text-faint">
            Документы
          </p>
          <Link href="/privacy" className="transition-colors duration-300 ease-smooth hover:text-fg">
            Политика конфиденциальности
          </Link>
          <Link href="/consent" className="transition-colors duration-300 ease-smooth hover:text-fg">
            Согласие на обработку персональных данных
          </Link>
          <CookieSettingsLink />
        </nav>
      </div>

      <p className="mt-8 text-sm text-faint">
        © {new Date().getFullYear()} Краснослободцев Никита Александрович
      </p>
    </footer>
  );
}
