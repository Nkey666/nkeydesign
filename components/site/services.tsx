"use client";

import { motion, MotionConfig } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { services, steps } from "@/lib/data/services";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import { EASE_OUT } from "@/lib/motion";

export function Services() {
  return (
    <MotionConfig reducedMotion="never">
      <section
        id="services"
        className="relative mx-auto max-w-6xl scroll-mt-24 px-6 pb-24 pt-16 md:pb-32 md:pt-24"
      >
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-display text-4xl font-bold tracking-tight text-fg md:text-5xl">
              Что я делаю
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
              Не шаблоны из конструктора, а сайты под конкретную задачу бизнеса —
              от первого экрана до оплаты.
            </p>
          </div>

          <ul className="flex flex-col">
            {services.map((service, i) => (
              <motion.li
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE_OUT }}
                className="group border-t border-border py-7 transition-colors duration-500 ease-smooth first:border-t-0 first:pt-0 hover:border-brand/40 sm:py-8"
              >
                <a
                  href={service.href}
                  className="flex items-start justify-between gap-6 transition-transform duration-500 ease-smooth focus-visible:outline-none group-hover:translate-x-3"
                  aria-label={`${service.title} — смотреть кейсы в портфолио`}
                >
                  <div>
                    <h3 className="font-display text-2xl font-medium text-fg transition-colors duration-500 ease-smooth group-hover:text-brand-strong sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                      {service.blurb}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 size-6 shrink-0 text-faint transition-all duration-500 ease-smooth group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand" />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Процесс — по линии летит светящийся луч между этапами */}
        <div className="mt-24 md:mt-32">
          <h3 className="mb-2 font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
            От идеи до запуска
          </h3>
          <ProcessTimeline steps={steps} />
        </div>
      </section>
    </MotionConfig>
  );
}
