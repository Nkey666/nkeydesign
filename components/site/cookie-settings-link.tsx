"use client";

/** Ссылка «Настройки cookie» — переоткрывает баннер согласия, чтобы
 *  пользователь мог изменить или отозвать ранее данное согласие (152-ФЗ). */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("cookie:reopen"))}
      className="text-left transition-colors duration-300 ease-smooth hover:text-fg"
    >
      Настройки cookie
    </button>
  );
}
