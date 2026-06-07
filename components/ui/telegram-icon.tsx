// Узнаваемый самолётик Telegram (залитый, одноцветный — наследует currentColor).
export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M21.94 4.6 18.86 19.1c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.95.46l.34-4.78 8.7-7.86c.38-.34-.08-.53-.59-.19L6.73 13.2l-4.63-1.45c-1.01-.31-1.02-1 .21-1.48l18.1-6.98c.84-.31 1.58.2 1.3 1.49z" />
    </svg>
  );
}
