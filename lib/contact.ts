// Контакт в Telegram. ?text — предзаполненное сообщение (как «написать» в 2ГИС).
// Работает в большинстве клиентов; где не поддерживается — чат просто откроется пустым.
export const TELEGRAM_USER = "nkey6";
export const TELEGRAM_MESSAGE = "Здравствуйте! Пишу вам по поводу сайта.";
export const TELEGRAM_LINK = `https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(
  TELEGRAM_MESSAGE,
)}`;
