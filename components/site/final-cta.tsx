"use client";

import { motion } from "motion/react";
import { TelegramIcon } from "@/components/ui/telegram-icon";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { CopyEmail } from "@/components/ui/copy-email";
import { TELEGRAM_LINK as TELEGRAM, WHATSAPP_LINK } from "@/lib/contact";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative mx-auto flex max-w-3xl scroll-mt-24 flex-col items-center px-6 py-28 text-center sm:py-36"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <h2 className="font-display text-4xl font-bold tracking-tight text-fg md:text-6xl">
          Обсудим ваш проект?
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          Напишите в Telegram — отвечу, задам пару вопросов и прикину, что можно
          сделать. Это ни к чему не обязывает.
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white shadow-[0_14px_40px_-14px_oklch(0.27_0.006_265/0.6)] transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-[0_22px_54px_-16px_oklch(0.27_0.006_265/0.7)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto"
          >
            <TelegramIcon className="size-5 transition-transform duration-500 ease-smooth group-hover:translate-x-1 group-hover:-translate-y-1" />
            Сделать быстро и качественно
          </a>
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-border bg-surface/60 px-8 py-4 text-base font-semibold text-fg backdrop-blur-sm transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:border-brand/50 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto"
          >
            <TelegramIcon className="size-5 transition-transform duration-500 ease-smooth group-hover:translate-x-1 group-hover:-translate-y-1" />
            Доделать мой сайт
          </a>
        </div>

        <div className="mt-7 flex flex-col items-center gap-x-6 gap-y-3 text-sm text-muted sm:flex-row">
          <span className="text-faint">Или так:</span>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-medium text-fg transition-colors duration-300 ease-smooth hover:text-brand-strong focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <WhatsappIcon className="size-4 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5" />
            WhatsApp
          </a>
          <CopyEmail className="font-medium text-fg" />
        </div>
      </motion.div>
    </section>
  );
}
