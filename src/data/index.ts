import type { GradeId, Level, Section, StageId, Topic } from './types';

// ─── Метаданные классов ─────────────────────────────────────────────────────

export interface GradeMeta {
  id: GradeId;
  stage: StageId;
  title: string;
  shortTitle: string;
  subtitle: string;
  accent: 'emerald' | 'teal' | 'amber' | 'orange';
}

export const GRADES: GradeMeta[] = [
  { id: 'g8', stage: 'main', title: '8 класс', shortTitle: '8 кл.', subtitle: 'Первоначальные понятия, классы веществ, строение атома', accent: 'emerald' },
  { id: 'g9', stage: 'main', title: '9 класс', shortTitle: '9 кл.', subtitle: 'Реакции и растворы, неметаллы и металлы', accent: 'teal' },
  { id: 'g10', stage: 'senior', title: '10 класс', shortTitle: '10 кл.', subtitle: 'Органическая химия: от метана до полимеров', accent: 'amber' },
  { id: 'g11', stage: 'senior', title: '11 класс', shortTitle: '11 кл.', subtitle: 'Общая и неорганическая химия, химия и жизнь', accent: 'orange' },
];

export const STAGES: { id: StageId; title: string; shortTitle: string; description: string; grades: GradeId[] }[] = [
  {
    id: 'main',
    title: 'Основное общее образование',
    shortTitle: '8–9 классы',
    description:
      'Первые химические понятия, важнейшие классы неорганических веществ, строение атома, Периодический закон, реакции в растворах, неметаллы и металлы. Подготовка к ОГЭ.',
    grades: ['g8', 'g9'],
  },
  {
    id: 'senior',
    title: 'Среднее общее образование',
    shortTitle: '10–11 классы',
    description:
      'Органическая химия (углеводороды, кислород- и азотсодержащие соединения, полимеры), теоретические основы, неорганическая химия и химия в жизни. Подготовка к ЕГЭ.',
    grades: ['g10', 'g11'],
  },
];

// ─── Ленивая загрузка контента классов ─────────────────────────────────────

const loaders: Record<GradeId, () => Promise<Section[]>> = {
  g8: () => import('./grade8').then((m) => m.sections),
  g9: () => import('./grade9').then((m) => m.sections),
  g10: () => import('./grade10').then((m) => m.sections),
  g11: () => import('./grade11').then((m) => m.sections),
};

const cache = new Map<GradeId, Section[]>();

export async function loadGrade(id: GradeId): Promise<Section[]> {
  const hit = cache.get(id);
  if (hit) return hit;
  const sections = await loaders[id]();
  cache.set(id, sections);
  return sections;
}

export function getCachedGrade(id: GradeId): Section[] | undefined {
  return cache.get(id);
}

// ─── Фильтрация по уровню ───────────────────────────────────────────────────

/** Темы секции с учётом уровня (база / углубление) */
export function topicsForLevel(sections: Section[], level: Level): Section[] {
  return sections.map((sec) => ({
    ...sec,
    topics: sec.topics.filter((t) => t.only === undefined || level === 'advanced'),
  }));
}

/** Вопросы темы с учётом уровня */
export function questionsForLevel(topic: Topic, level: Level) {
  return topic.questions.filter((q) => level === 'advanced' || !q.advanced);
}

export function topicById(sections: Section[], topicId: string): Topic | undefined {
  for (const sec of sections) {
    const t = sec.topics.find((x) => x.id === topicId);
    if (t) return t;
  }
  return undefined;
}

/** Идентификатор класса по теме: 'g8-s1-t3' → 'g8' */
export function gradeOfTopic(topicId: string): GradeId {
  const m = topicId.match(/^(g\d+)/);
  if (m && (m[1] === 'g8' || m[1] === 'g9' || m[1] === 'g10' || m[1] === 'g11')) return m[1];
  return 'g8';
}

// ─── Сводная статистика ───────────────────────────────────────────────────

export const PROGRAM_STATS = {
  topics: 75,
  questions: 752,
  sections: 14,
  years: 4,
};
