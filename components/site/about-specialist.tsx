import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";

export function AboutSpecialist() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-3xl scroll-mt-24 px-6 pb-12"
    >
      <Reveal amount={0.3}>
      <SpotlightCard className="rounded-3xl border border-border bg-surface/60 p-8 text-center backdrop-blur-sm md:p-12">
        <p className="text-sm font-semibold text-brand">Обо мне</p>
        <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
          Меня зовут Никита
        </h2>
        <div className="mx-auto mt-4 max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            Фронтенд-разработчик, создающий современные сайты, веб-приложения
            и корпоративные порталы. Разрабатываю быстрые, удобные и надёжные
            интерфейсы, которые помогают бизнесу привлекать клиентов
            и эффективно решать задачи пользователей.
          </p>
          <p>
            Особое внимание уделяю производительности, качеству кода и деталям
            реализации. Также адаптирую проекты под ИИ-поиск, чтобы компании
            могли получать трафик не только из поисковых систем, но и из
            современных нейросетей.
          </p>
          <p>
            Моя цель — создавать продукты, которые не только хорошо выглядят,
            но и приносят реальную пользу бизнесу.
          </p>
        </div>
      </SpotlightCard>
      </Reveal>
    </section>
  );
}
