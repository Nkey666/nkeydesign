"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Плавный скролл включён всегда (как и вся анимация сайта — требование
    // владельца): prefers-reduced-motion намеренно НЕ учитываем.

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      lerp: 0.1,
    });
    // Делаем инстанс доступным (на случай ручного scrollTo из других мест).
    (window as unknown as { __appLenis?: Lenis }).__appLenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Lenis виртуализирует скролл, поэтому нативные якоря (#price и т.п.) не
    // прокручивают. Перехватываем клики по ссылкам на текущую страницу и
    // прокручиваем через lenis.scrollTo — иначе кнопки вроде «Узнать цену»
    // меняют адрес, но визуально «не работают».
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const hashAt = href.indexOf("#");
      if (hashAt === -1) return;
      const path = href.slice(0, hashAt);
      // только ссылки на текущую страницу ("#x" или "/#x" на главной)
      if (path && path !== "/" && path !== window.location.pathname) return;
      if (path === "/" && window.location.pathname !== "/") return;
      const target = document.querySelector(href.slice(hashAt));
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      history.pushState(null, "", href);
      const top = window.scrollY + target.getBoundingClientRect().top - 24;
      lenis.scrollTo(top, { duration: 1.1 });
    };
    // capture: перехватываем раньше Next.js Link, иначе он preventDefault'ит
    // первым и наш скролл не запускается.
    document.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
