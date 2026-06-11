// Общий плавный скролл через инстанс Lenis (его кладёт LenisProvider в
// window.__appLenis). Нативный window.scroll/scrollIntoView конфликтует с Lenis
// и срабатывает через раз, поэтому везде скроллим через него — с фолбэком на
// нативный, если Lenis ещё не инициализирован.

type Lenis = {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { offset?: number; duration?: number },
  ) => void;
};

function getLenis() {
  return (window as unknown as { __appLenis?: Lenis }).__appLenis;
}

export function smoothScrollTo(
  target: number | HTMLElement,
  options?: { offset?: number; duration?: number },
) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.1, ...options });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
