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
            <span className="font-semibold text-brand-strong">
              Фронтенд-разработчик
            </span>{" "}
            из Москвы. Три года делаю{" "}
            <span className="font-semibold text-brand-strong">современные</span>{" "}
            сайты, веб-приложения и корпоративные порталы — быстрые, удобные и
            надёжные интерфейсы, которые{" "}
            <span className="font-semibold text-brand-strong">помогают</span>{" "}
            бизнесу привлекать клиентов.
          </p>
          <p>
            Работаю на современном стеке: Next.js, React, TypeScript, Tailwind
            CSS, анимации на Motion и GSAP. Особое внимание — производительности,
            качеству кода и деталям реализации.
          </p>
          <p>
            Готовлю проекты под{" "}
            <span className="font-semibold text-brand-strong">ИИ-поиск</span>,
            чтобы клиенты приходили не только из Яндекса и Google, но и из
            нейросетей вроде ChatGPT. Моя цель — продукты, которые приносят
            реальную пользу бизнесу.
          </p>
        </div>
      </SpotlightCard>
      </Reveal>
    </section>
  );
}
