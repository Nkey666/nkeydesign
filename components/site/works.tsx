import { CasesGrid } from "@/components/ui/cases-grid";
import { Reveal } from "@/components/ui/reveal";
import { UnderlineWord } from "@/components/ui/underline-word";
import { cases, categories } from "@/lib/data/works";

export function Works() {
  return (
    <section id="works" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 text-center md:mb-20" amount={0.6}>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-fg md:text-6xl">
            Сайты, которые
            <br />
            <UnderlineWord className="text-brand">работают</UnderlineWord> на бизнес
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Несколько кейсов под разные ниши. Нажмите на проект — покажу, что это
            за сайт, какие технологии и как он выглядит.
          </p>
        </Reveal>

        <CasesGrid items={cases} categories={categories} />
      </div>
    </section>
  );
}
