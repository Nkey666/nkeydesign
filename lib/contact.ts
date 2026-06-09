// Контакт в Telegram. ?text — предзаполненное сообщение (как «написать» в 2ГИС).
// Работает в большинстве клиентов; где не поддерживается — чат просто откроется пустым.
export const TELEGRAM_USER = "nkey6";
export const TELEGRAM_MESSAGE = "Здравствуйте! Пишу вам по поводу сайта.";
export const TELEGRAM_LINK = `https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(
  TELEGRAM_MESSAGE,
)}`;

// WhatsApp. wa.me требует номер в международном формате без + и пробелов.
// ?text — предзаполненное сообщение, как в Telegram.
export const WHATSAPP_PHONE = "79134481585";
export const WHATSAPP_DISPLAY = "+7 913 448-15-85";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  TELEGRAM_MESSAGE,
)}`;

// Email. mailto с предзаполненной темой и телом письма.
export const EMAIL = "nikitakrasnoslobodzev@mail.ru";
export const EMAIL_SUBJECT = "Сайт";
export const EMAIL_BODY = "Здравствуйте! Пишу вам по поводу сайта.";
export const EMAIL_LINK = `mailto:${EMAIL}?subject=${encodeURIComponent(
  EMAIL_SUBJECT,
)}&body=${encodeURIComponent(EMAIL_BODY)}`;
