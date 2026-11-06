import type { GradeId, StageId } from '@/data/types';

// ─── Цветовая система этапов и уровней ──────────────────────────────────────
//
// ЭТАП 1 «8–9 классы» (main)   → ЗЕЛЁНАЯ гамма (emerald/teal), маркер «ОГЭ»
// ЭТАП 2 «10–11 классы» (senior) → ЯНТАРНАЯ гамма (amber/orange), маркер «ЕГЭ»
// УРОВЕНЬ «Базовый»  → наследует цвет этапа (emerald на главном экране)
// УРОВЕНЬ «Углублённый» → ФИОЛЕТОВЫЙ (violet) всюду
//
// Все классы заданы литералами (без конкатенации), чтобы Tailwind находил их
// при сканировании исходников. Каждый токен содержит dark:-варианты.

export interface StageTheme {
  /** Цветной текст для бейджей и подписей */
  text: string;
  /** Усиленный цветной текст для заголовков и иконок */
  textStrong: string;
  /** Приглушённый цветной текст/иконки (пустые кружки прогресса) */
  textFaint: string;
  /** Насыщенный фон + контрастный текст (активные сегменты, иконки) */
  bgSolid: string;
  /** Мягкий цветной фон (чипы, активные строки) */
  bgSoft: string;
  /** Едва заметный цветной фон */
  bgSofter: string;
  /** Цветная рамка (только цвет — ширину задаёт 'border') */
  border: string;
  /** Насыщенная цветная рамка */
  borderStrong: string;
  /** Градиентный фон карточки/баннера этапа (~10–15% непрозрачности) */
  gradient: string;
  /** Усиление градиента карточки при наведении */
  gradientHover: string;
  /** Цветная полоса-маркер (вертикальная/верхняя) */
  bar: string;
  /** Чип иконки: мягкий фон + цветной текст */
  iconBg: string;
  /** Цветовой токен бейджа: мягкий фон + цветной текст (без layout-классов) */
  chip: string;
  /** Бейдж экзамена «ОГЭ»/«ЕГЭ»: фон + текст + рамка (без layout-классов) */
  examBadge: string;
  /** Цветная точка-маркер */
  dot: string;
  /** Кольцо фокуса */
  ring: string;
  /** Активная кнопка навигации: мягкий фон + цветной текст */
  navActive: string;
  /** Ховер строки/кнопки: цветная подсветка этапа */
  hoverBg: string;
  /** Ховер неактивной карточки: цветная рамка этапа */
  hoverBorder: string;
  /** Цветной текст при ховере группы (строки тем) */
  groupHoverText: string;
  /** Перекраска <Progress>: трек + индикатор в цвет этапа */
  progress: string;
}

// ─── Этапы ──────────────────────────────────────────────────────────────────

export const STAGE_THEMES: Record<StageId, StageTheme> = {
  // ЭТАП 1 · 8–9 классы · emerald/teal · ОГЭ
  main: {
    text: 'text-emerald-700 dark:text-emerald-300',
    textStrong: 'text-emerald-600 dark:text-emerald-400',
    textFaint: 'text-emerald-500/40 dark:text-emerald-400/40',
    bgSolid: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950',
    bgSoft: 'bg-emerald-500/10 dark:bg-emerald-400/15',
    bgSofter: 'bg-emerald-500/[0.04] dark:bg-emerald-400/[0.05]',
    border: 'border-emerald-500/30 dark:border-emerald-400/30',
    borderStrong: 'border-emerald-500/60 dark:border-emerald-400/60',
    gradient:
      'bg-gradient-to-br from-emerald-500/[0.12] via-emerald-500/[0.05] to-teal-500/[0.10] dark:from-emerald-400/[0.14] dark:via-emerald-400/[0.06] dark:to-teal-400/[0.12]',
    gradientHover:
      'hover:from-emerald-500/[0.20] hover:via-emerald-500/[0.09] hover:to-teal-500/[0.16] dark:hover:from-emerald-400/[0.22] dark:hover:via-emerald-400/[0.10] dark:hover:to-teal-400/[0.18]',
    bar: 'bg-gradient-to-b from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400',
    iconBg: 'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400',
    chip: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
    examBadge:
      'border border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/20 dark:text-emerald-300',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
    ring: 'focus-visible:ring-emerald-500/40 dark:focus-visible:ring-emerald-400/40',
    navActive: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
    hoverBg: 'hover:bg-emerald-500/[0.05] dark:hover:bg-emerald-400/[0.06]',
    hoverBorder: 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40',
    groupHoverText: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    progress:
      'bg-emerald-500/20 dark:bg-emerald-400/20 [&_[data-slot=progress-indicator]]:bg-emerald-600 dark:[&_[data-slot=progress-indicator]]:bg-emerald-500',
  },
  // ЭТАП 2 · 10–11 классы · amber/orange · ЕГЭ
  senior: {
    text: 'text-amber-700 dark:text-amber-300',
    textStrong: 'text-amber-600 dark:text-amber-400',
    textFaint: 'text-amber-500/40 dark:text-amber-400/40',
    bgSolid: 'bg-amber-500 text-amber-950 dark:bg-amber-400 dark:text-amber-950',
    bgSoft: 'bg-amber-500/10 dark:bg-amber-400/15',
    bgSofter: 'bg-amber-500/[0.04] dark:bg-amber-400/[0.05]',
    border: 'border-amber-500/30 dark:border-amber-400/30',
    borderStrong: 'border-amber-500/60 dark:border-amber-400/60',
    gradient:
      'bg-gradient-to-br from-amber-500/[0.12] via-amber-500/[0.05] to-orange-500/[0.10] dark:from-amber-400/[0.14] dark:via-amber-400/[0.06] dark:to-orange-400/[0.12]',
    gradientHover:
      'hover:from-amber-500/[0.20] hover:via-amber-500/[0.09] hover:to-orange-500/[0.16] dark:hover:from-amber-400/[0.22] dark:hover:via-amber-400/[0.10] dark:hover:to-orange-400/[0.18]',
    bar: 'bg-gradient-to-b from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400',
    iconBg: 'bg-amber-500/15 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400',
    chip: 'bg-amber-500/10 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
    examBadge:
      'border border-amber-500/30 bg-amber-500/15 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/20 dark:text-amber-300',
    dot: 'bg-amber-500 dark:bg-amber-400',
    ring: 'focus-visible:ring-amber-500/40 dark:focus-visible:ring-amber-400/40',
    navActive: 'bg-amber-500/10 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
    hoverBg: 'hover:bg-amber-500/[0.05] dark:hover:bg-amber-400/[0.06]',
    hoverBorder: 'hover:border-amber-500/40 dark:hover:border-amber-400/40',
    groupHoverText: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    progress:
      'bg-amber-500/25 dark:bg-amber-400/25 [&_[data-slot=progress-indicator]]:bg-amber-500 dark:[&_[data-slot=progress-indicator]]:bg-amber-400',
  },
};

/** Маркер экзамена этапа */
export const STAGE_EXAM: Record<StageId, string> = {
  main: 'ОГЭ',
  senior: 'ЕГЭ',
};

// ─── Акценты классов (g8 emerald · g9 teal · g10 amber · g11 orange) ────────

export const GRADE_THEMES: Record<GradeId, StageTheme> = {
  // 8 класс — emerald
  g8: {
    text: 'text-emerald-700 dark:text-emerald-300',
    textStrong: 'text-emerald-600 dark:text-emerald-400',
    textFaint: 'text-emerald-500/40 dark:text-emerald-400/40',
    bgSolid: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950',
    bgSoft: 'bg-emerald-500/10 dark:bg-emerald-400/15',
    bgSofter: 'bg-emerald-500/[0.04] dark:bg-emerald-400/[0.05]',
    border: 'border-emerald-500/30 dark:border-emerald-400/30',
    borderStrong: 'border-emerald-500/60 dark:border-emerald-400/60',
    gradient:
      'bg-gradient-to-br from-emerald-500/[0.10] via-emerald-500/[0.04] to-emerald-500/[0.08] dark:from-emerald-400/[0.12] dark:via-emerald-400/[0.05] dark:to-emerald-400/[0.09]',
    gradientHover:
      'hover:from-emerald-500/[0.18] hover:via-emerald-500/[0.08] hover:to-emerald-500/[0.14] dark:hover:from-emerald-400/[0.20] dark:hover:via-emerald-400/[0.09] dark:hover:to-emerald-400/[0.16]',
    bar: 'bg-emerald-500 dark:bg-emerald-400',
    iconBg: 'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400',
    chip: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
    examBadge:
      'border border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/20 dark:text-emerald-300',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
    ring: 'focus-visible:ring-emerald-500/40 dark:focus-visible:ring-emerald-400/40',
    navActive: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
    hoverBg: 'hover:bg-emerald-500/[0.05] dark:hover:bg-emerald-400/[0.06]',
    hoverBorder: 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40',
    groupHoverText: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    progress:
      'bg-emerald-500/20 dark:bg-emerald-400/20 [&_[data-slot=progress-indicator]]:bg-emerald-600 dark:[&_[data-slot=progress-indicator]]:bg-emerald-500',
  },
  // 9 класс — teal
  g9: {
    text: 'text-teal-700 dark:text-teal-300',
    textStrong: 'text-teal-600 dark:text-teal-400',
    textFaint: 'text-teal-500/40 dark:text-teal-400/40',
    bgSolid: 'bg-teal-600 text-white dark:bg-teal-500 dark:text-teal-950',
    bgSoft: 'bg-teal-500/10 dark:bg-teal-400/15',
    bgSofter: 'bg-teal-500/[0.04] dark:bg-teal-400/[0.05]',
    border: 'border-teal-500/30 dark:border-teal-400/30',
    borderStrong: 'border-teal-500/60 dark:border-teal-400/60',
    gradient:
      'bg-gradient-to-br from-teal-500/[0.10] via-teal-500/[0.04] to-teal-500/[0.08] dark:from-teal-400/[0.12] dark:via-teal-400/[0.05] dark:to-teal-400/[0.09]',
    gradientHover:
      'hover:from-teal-500/[0.18] hover:via-teal-500/[0.08] hover:to-teal-500/[0.14] dark:hover:from-teal-400/[0.20] dark:hover:via-teal-400/[0.09] dark:hover:to-teal-400/[0.16]',
    bar: 'bg-teal-500 dark:bg-teal-400',
    iconBg: 'bg-teal-500/15 text-teal-600 dark:bg-teal-400/20 dark:text-teal-400',
    chip: 'bg-teal-500/10 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300',
    examBadge:
      'border border-teal-500/30 bg-teal-500/15 text-teal-700 dark:border-teal-400/30 dark:bg-teal-400/20 dark:text-teal-300',
    dot: 'bg-teal-500 dark:bg-teal-400',
    ring: 'focus-visible:ring-teal-500/40 dark:focus-visible:ring-teal-400/40',
    navActive: 'bg-teal-500/10 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300',
    hoverBg: 'hover:bg-teal-500/[0.05] dark:hover:bg-teal-400/[0.06]',
    hoverBorder: 'hover:border-teal-500/40 dark:hover:border-teal-400/40',
    groupHoverText: 'group-hover:text-teal-600 dark:group-hover:text-teal-400',
    progress:
      'bg-teal-500/20 dark:bg-teal-400/20 [&_[data-slot=progress-indicator]]:bg-teal-600 dark:[&_[data-slot=progress-indicator]]:bg-teal-500',
  },
  // 10 класс — amber
  g10: {
    text: 'text-amber-700 dark:text-amber-300',
    textStrong: 'text-amber-600 dark:text-amber-400',
    textFaint: 'text-amber-500/40 dark:text-amber-400/40',
    bgSolid: 'bg-amber-500 text-amber-950 dark:bg-amber-400 dark:text-amber-950',
    bgSoft: 'bg-amber-500/10 dark:bg-amber-400/15',
    bgSofter: 'bg-amber-500/[0.04] dark:bg-amber-400/[0.05]',
    border: 'border-amber-500/30 dark:border-amber-400/30',
    borderStrong: 'border-amber-500/60 dark:border-amber-400/60',
    gradient:
      'bg-gradient-to-br from-amber-500/[0.10] via-amber-500/[0.04] to-amber-500/[0.08] dark:from-amber-400/[0.12] dark:via-amber-400/[0.05] dark:to-amber-400/[0.09]',
    gradientHover:
      'hover:from-amber-500/[0.18] hover:via-amber-500/[0.08] hover:to-amber-500/[0.14] dark:hover:from-amber-400/[0.20] dark:hover:via-amber-400/[0.09] dark:hover:to-amber-400/[0.16]',
    bar: 'bg-amber-500 dark:bg-amber-400',
    iconBg: 'bg-amber-500/15 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400',
    chip: 'bg-amber-500/10 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
    examBadge:
      'border border-amber-500/30 bg-amber-500/15 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/20 dark:text-amber-300',
    dot: 'bg-amber-500 dark:bg-amber-400',
    ring: 'focus-visible:ring-amber-500/40 dark:focus-visible:ring-amber-400/40',
    navActive: 'bg-amber-500/10 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
    hoverBg: 'hover:bg-amber-500/[0.05] dark:hover:bg-amber-400/[0.06]',
    hoverBorder: 'hover:border-amber-500/40 dark:hover:border-amber-400/40',
    groupHoverText: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    progress:
      'bg-amber-500/25 dark:bg-amber-400/25 [&_[data-slot=progress-indicator]]:bg-amber-500 dark:[&_[data-slot=progress-indicator]]:bg-amber-400',
  },
  // 11 класс — orange
  g11: {
    text: 'text-orange-700 dark:text-orange-300',
    textStrong: 'text-orange-600 dark:text-orange-400',
    textFaint: 'text-orange-500/40 dark:text-orange-400/40',
    bgSolid: 'bg-orange-500 text-white dark:bg-orange-400 dark:text-orange-950',
    bgSoft: 'bg-orange-500/10 dark:bg-orange-400/15',
    bgSofter: 'bg-orange-500/[0.04] dark:bg-orange-400/[0.05]',
    border: 'border-orange-500/30 dark:border-orange-400/30',
    borderStrong: 'border-orange-500/60 dark:border-orange-400/60',
    gradient:
      'bg-gradient-to-br from-orange-500/[0.10] via-orange-500/[0.04] to-orange-500/[0.08] dark:from-orange-400/[0.12] dark:via-orange-400/[0.05] dark:to-orange-400/[0.09]',
    gradientHover:
      'hover:from-orange-500/[0.18] hover:via-orange-500/[0.08] hover:to-orange-500/[0.14] dark:hover:from-orange-400/[0.20] dark:hover:via-orange-400/[0.09] dark:hover:to-orange-400/[0.16]',
    bar: 'bg-orange-500 dark:bg-orange-400',
    iconBg: 'bg-orange-500/15 text-orange-600 dark:bg-orange-400/20 dark:text-orange-400',
    chip: 'bg-orange-500/10 text-orange-700 dark:bg-orange-400/15 dark:text-orange-300',
    examBadge:
      'border border-orange-500/30 bg-orange-500/15 text-orange-700 dark:border-orange-400/30 dark:bg-orange-400/20 dark:text-orange-300',
    dot: 'bg-orange-500 dark:bg-orange-400',
    ring: 'focus-visible:ring-orange-500/40 dark:focus-visible:ring-orange-400/40',
    navActive: 'bg-orange-500/10 text-orange-700 dark:bg-orange-400/15 dark:text-orange-300',
    hoverBg: 'hover:bg-orange-500/[0.05] dark:hover:bg-orange-400/[0.06]',
    hoverBorder: 'hover:border-orange-500/40 dark:hover:border-orange-400/40',
    groupHoverText: 'group-hover:text-orange-600 dark:group-hover:text-orange-400',
    progress:
      'bg-orange-500/20 dark:bg-orange-400/20 [&_[data-slot=progress-indicator]]:bg-orange-500 dark:[&_[data-slot=progress-indicator]]:bg-orange-400',
  },
};

// ─── Уровень «Углублённый» — ФИОЛЕТОВЫЙ (violet) всюду ──────────────────────

export interface LevelTheme {
  /** Цветной текст для бейджей */
  text: string;
  /** Усиленный цветной текст */
  textStrong: string;
  /** Насыщенный фон + контрастный текст (активный сегмент) */
  bgSolid: string;
  /** Мягкий цветной фон */
  bgSoft: string;
  /** Цветная рамка */
  border: string;
  /** Насыщенная цветная рамка */
  borderStrong: string;
  /** Цветовой токен бейджа (без layout-классов) */
  chip: string;
  /** Чип иконки: мягкий фон + цветной текст */
  iconBg: string;
  /** Цветная точка-маркер */
  dot: string;
  /** Кольцо фокуса */
  ring: string;
}

export const LEVEL_THEME: LevelTheme = {
  text: 'text-violet-700 dark:text-violet-300',
  textStrong: 'text-violet-600 dark:text-violet-400',
  bgSolid: 'bg-violet-600 text-white dark:bg-violet-500 dark:text-white',
  bgSoft: 'bg-violet-500/10 dark:bg-violet-400/15',
  border: 'border-violet-500/30 dark:border-violet-400/30',
  borderStrong: 'border-violet-500/60 dark:border-violet-400/60',
  chip: 'bg-violet-500/10 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300',
  iconBg: 'bg-violet-500/15 text-violet-600 dark:bg-violet-400/20 dark:text-violet-400',
  dot: 'bg-violet-500 dark:bg-violet-400',
  ring: 'focus-visible:ring-violet-500/40 dark:focus-visible:ring-violet-400/40',
};

/** Базовый уровень — нейтрально-зелёный (emerald) для глобальных переключателей */
export const BASE_LEVEL_THEME: LevelTheme = {
  text: 'text-emerald-700 dark:text-emerald-300',
  textStrong: 'text-emerald-600 dark:text-emerald-400',
  bgSolid: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950',
  bgSoft: 'bg-emerald-500/10 dark:bg-emerald-400/15',
  border: 'border-emerald-500/30 dark:border-emerald-400/30',
  borderStrong: 'border-emerald-500/60 dark:border-emerald-400/60',
  chip: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
  iconBg: 'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400',
  dot: 'bg-emerald-500 dark:bg-emerald-400',
  ring: 'focus-visible:ring-emerald-500/40 dark:focus-visible:ring-emerald-400/40',
};

// ─── Helper-функции ─────────────────────────────────────────────────────────

/** Тема этапа: 'main' → emerald, 'senior' → amber */
export function stageTheme(stage: StageId): StageTheme {
  return STAGE_THEMES[stage];
}

/** Тема акцента класса: g8 emerald · g9 teal · g10 amber · g11 orange */
export function gradeTheme(grade: GradeId): StageTheme {
  return GRADE_THEMES[grade];
}

/** Этап по классу: 8–9 классы → main, 10–11 классы → senior */
export function gradeStage(grade: GradeId): StageId {
  return grade === 'g8' || grade === 'g9' ? 'main' : 'senior';
}
