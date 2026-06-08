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
        <div className="mx-auto mt-4 max-w-2xl space-y-4 text-[15px] leading-relaxed text-fg">
          <p>
            Фронтенд-разработчик из Москвы.{" "}
            <span className="font-semibold text-brand-strong">Три года</span> делаю
            современные сайты, веб-приложения и корпоративные порталы —{" "}
            <span className="font-semibold text-brand-strong">
              быстрые, удобные и надёжные
            </span>{" "}
            интерфейсы, которые помогают бизнесу{" "}
            <span className="font-semibold text-brand-strong">привлекать клиентов</span>.
          </p>
          <p>
            Работаю на современном стеке: Next.js, React, TypeScript, Tailwind
            CSS, анимации на Motion и GSAP. Особое внимание — производительности,
            качеству кода и деталям реализации.
          </p>
          <p>
            Готовлю проекты под ИИ-поиск, чтобы клиенты приходили не только из
            Яндекса и Google, но и{" "}
            <span className="font-semibold text-brand-strong">
              из нейросетей вроде ChatGPT
            </span>
            . Моя цель — продукты, которые приносят{" "}
            <span className="font-semibold text-brand-strong">реальную пользу бизнесу</span>.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {["3 года опыта", "Next.js", "React", "TypeScript", "SEO и ИИ-поиск"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-bg/60 px-3 py-1 text-xs font-medium text-muted"
              >
                {t}
              </span>
            ),
          )}
        </div>
      </SpotlightCard>
      </Reveal>
    </section>
  );
}
