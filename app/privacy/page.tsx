import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика в отношении обработки персональных данных на сайте Никиты — фронтенд-разработчика. Какие данные собираются, как используются и как защищаются.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="relative mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-fg"
      >
        ← На главную
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-fg md:text-5xl">
        Политика конфиденциальности
      </h1>
      <p className="mt-4 text-sm text-faint">
        Дата обновления: {new Date().getFullYear()}
      </p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-muted">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-fg">
            1. Общие положения
          </h2>
          <p>
            Настоящая Политика определяет порядок обработки и защиты персональных
            данных пользователей сайта (далее — Сайт). Используя Сайт и оставляя
            свои данные, вы соглашаетесь с условиями настоящей Политики.
            Оператором данных выступает владелец Сайта (далее — Оператор).
          </p>
          <p className="text-faint">
            Реквизиты Оператора (ФИО / ИП / организация, контактные данные)
            указываются здесь: [заполняется владельцем].
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-fg">
            2. Какие данные обрабатываются
          </h2>
          <p>
            Оператор может обрабатывать: имя, контактные данные (телефон,
            мессенджеры, e-mail), а также обезличенные данные о посещениях,
            собираемые средствами интернет-статистики (cookie, IP-адрес, данные
            о браузере и устройстве).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-fg">
            3. Цели обработки
          </h2>
          <p>
            Данные обрабатываются для связи с пользователем по его обращению,
            подготовки коммерческого предложения, выполнения работ и улучшения
            работы Сайта. Данные не передаются третьим лицам, за исключением
            случаев, предусмотренных законодательством РФ.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-fg">
            4. Хранение и защита
          </h2>
          <p>
            Оператор принимает разумные организационные и технические меры для
            защиты персональных данных от неправомерного доступа, изменения,
            раскрытия или уничтожения. Данные хранятся не дольше, чем этого
            требуют цели обработки.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-fg">
            5. Права пользователя
          </h2>
          <p>
            Пользователь вправе запросить информацию об обработке своих данных,
            потребовать их уточнения, блокирования или удаления, а также отозвать
            согласие на обработку, направив обращение через указанные на Сайте
            контакты.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-fg">
            6. Cookie и интернет-статистика
          </h2>
          <p>
            Сайт может использовать cookie и сервисы веб-аналитики (например,
            Яндекс Метрика) для сбора обезличенных статистических данных.
            Пользователь может отключить cookie в настройках браузера.
          </p>
        </section>
      </div>
    </main>
  );
}
