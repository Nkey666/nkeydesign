"use client";

import { motion } from "motion/react";
import { TelegramIcon } from "@/components/ui/telegram-icon";
import { TELEGRAM_LINK as TELEGRAM } from "@/lib/contact";

export function ContactButton() {
  return (
    <motion.a
      href={TELEGRAM}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать Никите в Telegram"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_oklch(0.27_0.006_265/0.6)] transition-colors duration-300 ease-smooth hover:bg-brand-strong sm:bottom-7 sm:right-7"
    >
      <TelegramIcon className="size-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1 group-hover:-translate-y-1" />
      <span>Связаться</span>
    </motion.a>
  );
}
