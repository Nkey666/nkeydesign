// Кастомные глифы для конфигуратора. Типы проектов — мини-вайрфреймы их
// структуры (одна страница / много секций / сетка товаров / до-после),
// услуги — осмысленные знаки (ранжирование, редактирование, связи).
// Один стиль: viewBox 24, currentColor, скруглённые штрихи 1.6, лёгкие
// заливки для «контента». Это не дженерик-айконпак, а нарисованное под смысл.

type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

// Лендинг / визитка — один экран с единственным сильным CTA.
// Анимация: кнопка «дышит», подзаголовок набирается слева направо.
export function LandingGlyph({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="5.5" y="3.4" width="13" height="17.2" rx="2.6" />
      <rect x="8.2" y="6.4" width="7.6" height="2.4" rx="1.2" fill="currentColor" stroke="none" />
      <rect className="cfg-land-line" x="8.2" y="10" width="5" height="1.5" rx="0.75" fill="currentColor" stroke="none" opacity="0.4" />
      <rect className="cfg-land-cta" x="8.2" y="14.2" width="7.6" height="3" rx="1.5" />
    </Svg>
  );
}

// Корпоративный — стопка страниц: много разделов и секций.
// Анимация: задняя страница выезжает из стопки, строки набегают каскадом.
export function CorporateGlyph({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect className="cfg-corp-back" x="8.6" y="3.5" width="11" height="14" rx="2.2" opacity="0.45" />
      <rect x="4.4" y="6.5" width="11" height="14" rx="2.2" fill="var(--color-bg)" />
      <path className="cfg-corp-line cfg-corp-line-1" d="M7 10.4 H12.8" />
      <path className="cfg-corp-line cfg-corp-line-2" d="M7 13 H12.8" opacity="0.6" />
      <path className="cfg-corp-line cfg-corp-line-3" d="M7 15.6 H10.4" opacity="0.4" />
    </Svg>
  );
}

// Интернет-магазин — пакет покупок: товар падает внутрь.
// Анимация: товар «падает» в пакет, ручка пружинит.
export function StoreGlyph({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path className="cfg-store-handle" d="M9.2 9 V7.2 a2.8 2.8 0 0 1 5.6 0 V9" />
      <path d="M5.9 9 H18.1 a0.7 0.7 0 0 1 0.7 0.78 L18.1 18.5 a2 2 0 0 1 -2 1.85 H7.9 a2 2 0 0 1 -2 -1.85 L5.2 9.78 A0.7 0.7 0 0 1 5.9 9 Z" />
      <circle className="cfg-store-item" cx="12" cy="14" r="1.7" fill="currentColor" stroke="none" opacity="0.5" />
    </Svg>
  );
}

// Редизайн + SEO — экран с восходящим трендом и сверканием обновления.
// Анимация: график ранжирования прочерчивается, сверкание мигает.
export function RedesignGlyph({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.4" y="5.4" width="12.8" height="13.2" rx="2.4" />
      <path className="cfg-redo-trend" pathLength={1} d="M6.2 14.4 L9 11.4 L11.2 13.2 L14 9.6" />
      <path d="M14 9.6 H11.7 M14 9.6 V11.9" opacity="0.85" />
      <path className="cfg-redo-spark" d="M19 5.2 l0.72 1.96 1.96 0.72 -1.96 0.72 -0.72 1.96 -0.72 -1.96 -1.96 -0.72 1.96 -0.72 Z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

// SEO + GEO — лупа с растущими столбиками: вас находят и поднимают в топ.
// Ховер: лупа приближает, столбики подрастают по очереди.
export function SeoGlyph({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle className="cfg-seo-lens" cx="10.4" cy="10.4" r="6.2" />
      <path className="cfg-seo-lens" d="M15 15 L20 20" />
      <path className="cfg-seo-bar cfg-seo-bar-1" d="M8.2 12.4 V11" />
      <path className="cfg-seo-bar cfg-seo-bar-2" d="M10.4 12.4 V9" />
      <path className="cfg-seo-bar cfg-seo-bar-3" d="M12.6 12.4 V7.5" />
    </Svg>
  );
}

// Админка / CMS — панель контента с карандашом правки.
// Ховер: карандаш «пишет», нижняя строка набирается слева направо.
export function CmsGlyph({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 7 a2.4 2.4 0 0 1 2.4-2.4 h11.2 a2.4 2.4 0 0 1 2.4 2.4 v10 a2.4 2.4 0 0 1 -2.4 2.4 h-11.2 a2.4 2.4 0 0 1 -2.4 -2.4 z" />
      <path d="M4 9 H20" />
      <rect x="6.4" y="11.6" width="6.4" height="1.5" rx="0.75" fill="currentColor" stroke="none" opacity="0.55" />
      <rect className="cfg-cms-line" x="6.4" y="14.4" width="9" height="1.5" rx="0.75" fill="currentColor" stroke="none" opacity="0.3" />
      <g transform="translate(0 -3.4)">
        <g className="cfg-cms-pencil">
          <path d="M16.6 14.9 l1.9 1.9 -2.7 2.7 -1.9 0 0 -1.9 z" />
        </g>
      </g>
    </Svg>
  );
}

// Интеграции — связанные узлы: оплата, CRM, мессенджеры.
// Ховер: связи прочерчиваются между узлами, узлы пульсируют.
export function IntegrationsGlyph({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path className="cfg-int-link cfg-int-link-1" pathLength={1} d="M8.5 8.7 L10.6 15.1" />
      <path className="cfg-int-link cfg-int-link-2" pathLength={1} d="M15.5 8.7 L13.4 15.1" />
      <path className="cfg-int-link cfg-int-link-3" pathLength={1} d="M8.8 7.4 H15.2" />
      <circle className="cfg-int-node cfg-int-node-1" cx="6.5" cy="7.4" r="2.3" />
      <circle className="cfg-int-node cfg-int-node-2" cx="17.5" cy="7.4" r="2.3" />
      <circle className="cfg-int-node cfg-int-node-3" cx="12" cy="16.6" r="2.3" />
    </Svg>
  );
}

import type { ComponentType } from "react";

export const TYPE_GLYPH: Record<string, ComponentType<IconProps>> = {
  landing: LandingGlyph,
  corporate: CorporateGlyph,
  store: StoreGlyph,
  redesign: RedesignGlyph,
};

export const OPTION_GLYPH: Record<string, ComponentType<IconProps>> = {
  seo: SeoGlyph,
  cms: CmsGlyph,
  integrations: IntegrationsGlyph,
};
