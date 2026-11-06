'use client';

import { useMemo, useState } from 'react';
import type { PElement, PCategory } from '@/data/periodic';
import { ELEMENTS, CATEGORY_LABELS } from '@/data/periodic';
import { ChemText } from '@/components/chem-text';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';

/** Палитра категорий: насыщенные различимые цвета, тёмный текст в светлой теме */
const CAT_STYLE: Record<PCategory, string> = {
  nonmetal:
    'bg-emerald-200/90 hover:bg-emerald-300/90 border-emerald-600/60 text-emerald-950 dark:bg-emerald-500/30 dark:hover:bg-emerald-500/45 dark:border-emerald-400/50 dark:text-emerald-100',
  noble:
    'bg-violet-200/90 hover:bg-violet-300/90 border-violet-600/60 text-violet-950 dark:bg-violet-500/30 dark:hover:bg-violet-500/45 dark:border-violet-400/50 dark:text-violet-100',
  alkali:
    'bg-red-300/80 hover:bg-red-400/70 border-red-700/50 text-red-950 dark:bg-red-500/35 dark:hover:bg-red-500/50 dark:border-red-400/50 dark:text-red-100',
  'alkaline-earth':
    'bg-orange-200/90 hover:bg-orange-300/90 border-orange-600/60 text-orange-950 dark:bg-orange-500/30 dark:hover:bg-orange-500/45 dark:border-orange-400/50 dark:text-orange-100',
  transition:
    'bg-yellow-200 hover:bg-yellow-300 border-yellow-600/60 text-yellow-950 dark:bg-yellow-500/30 dark:hover:bg-yellow-500/45 dark:border-yellow-400/50 dark:text-yellow-100',
  'post-transition':
    'bg-slate-200 hover:bg-slate-300 border-slate-500/70 text-slate-900 dark:bg-slate-500/35 dark:hover:bg-slate-500/50 dark:border-slate-400/50 dark:text-slate-100',
  metalloid:
    'bg-lime-200/90 hover:bg-lime-300/90 border-lime-600/60 text-lime-950 dark:bg-lime-500/30 dark:hover:bg-lime-500/45 dark:border-lime-400/50 dark:text-lime-100',
  halogen:
    'bg-teal-200/90 hover:bg-teal-300/90 border-teal-600/60 text-teal-950 dark:bg-teal-500/30 dark:hover:bg-teal-500/45 dark:border-teal-400/50 dark:text-teal-100',
  lanthanide:
    'bg-fuchsia-200/90 hover:bg-fuchsia-300/90 border-fuchsia-600/60 text-fuchsia-950 dark:bg-fuchsia-500/30 dark:hover:bg-fuchsia-500/45 dark:border-fuchsia-400/50 dark:text-fuchsia-100',
  actinide:
    'bg-fuchsia-400/70 hover:bg-fuchsia-500/60 border-fuchsia-700/50 text-fuchsia-950 dark:bg-fuchsia-500/40 dark:hover:bg-fuchsia-500/55 dark:border-fuchsia-400/50 dark:text-fuchsia-100',
};

export function PeriodicView() {
  const [selected, setSelected] = useState<PElement | null>(null);
  const [query, setQuery] = useState('');
  const [hoverCat, setHoverCat] = useState<PCategory | null>(null);

  const byId = useMemo(() => new Map(ELEMENTS.map((e) => [e.z, e])), []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return new Set(
      ELEMENTS.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.sym.toLowerCase() === q ||
          String(e.z) === q
      ).map((e) => e.z)
    );
  }, [query]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Периодическая система Д.И. Менделеева</h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Нажмите на элемент, чтобы увидеть свойства. Поиск — по названию, символу или порядковому номеру.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Например: железо, Fe, 26…"
          className="w-full rounded-xl border bg-background py-2.5 pl-9 pr-9 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-label="Поиск элемента"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted"
            aria-label="Очистить поиск"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Таблица (горизонтальный скролл на мобильных) */}
      <div className="overflow-x-auto pb-2 nice-scroll">
        <div className="relative min-w-[920px]">
          {/* Номера групп */}
          <div className="mb-1 grid grid-cols-18 gap-1" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className="text-center text-[10px] font-semibold text-muted-foreground">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-18 gap-1">
            {ELEMENTS.map((e) => (
              <ElementCell
                key={e.z}
                e={e}
                dim={hoverCat !== null && e.cat !== hoverCat}
                highlight={matches?.has(e.z) ?? false}
                isMatch={matches !== null}
                onSelect={() => setSelected(e)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Легенда категорий */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(CATEGORY_LABELS) as PCategory[]).map((cat) => (
          <button
            key={cat}
            onMouseEnter={() => setHoverCat(cat)}
            onMouseLeave={() => setHoverCat(null)}
            className={cn(
              'rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-opacity',
              CAT_STYLE[cat],
              hoverCat !== null && hoverCat !== cat && 'opacity-40'
            )}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Детальная карточка */}
      <AnimatePresence>
        {selected && <ElementCard e={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
      <p className="text-xs text-muted-foreground">
        * лантаноиды (58–71) · ** актиноиды (90–103). Относительные атомные массы даны для природных смесей
        изотопов; в скобках — для самых долгоживущих изотопов.
      </p>
    </div>
  );
}

function ElementCell({
  e,
  dim,
  highlight,
  isMatch,
  onSelect,
}: {
  e: PElement;
  dim: boolean;
  highlight: boolean;
  isMatch: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      style={{ gridColumn: e.x, gridRow: e.y }}
      className={cn(
        'relative flex aspect-square w-full flex-col items-center justify-center rounded-md border text-center transition-all',
        CAT_STYLE[e.cat],
        dim && 'opacity-25',
        highlight && 'ring-2 ring-primary ring-offset-1 ring-offset-background scale-[1.06] z-10',
        isMatch && !highlight && 'opacity-30'
      )}
      title={`${e.name} (${e.sym}), Ar = ${e.mass}`}
      aria-label={`Элемент номер ${e.z}: ${e.name}, ${e.sym}`}
    >
      <span className="absolute left-1 top-0.5 text-[9px] font-semibold opacity-70">{e.z}</span>
      <span className="text-sm font-extrabold leading-none sm:text-base">{e.sym}</span>
      <span className="mt-0.5 hidden truncate px-1 text-[8px] leading-none opacity-80 sm:block">{e.name}</span>
    </button>
  );
}

function ElementCard({ e, onClose }: { e: PElement; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="rounded-2xl border bg-card p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={cn('flex h-16 w-16 flex-col items-center justify-center rounded-xl border', CAT_STYLE[e.cat])}>
            <span className="text-[10px] font-bold opacity-70">{e.z}</span>
            <span className="text-2xl font-extrabold leading-none">{e.sym}</span>
          </div>
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl">{e.name}</h2>
            <p className="text-sm text-muted-foreground">
              {CATEGORY_LABELS[e.cat]} · {e.period}-й период{e.group ? ` · ${e.group}-я группа` : ''}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted"
          aria-label="Закрыть карточку"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Порядковый номер" value={String(e.z)} />
        <MiniStat label="Ar (отн. атомная масса)" value={e.mass} />
        <MiniStat label="Степени окисления" value={e.ox ?? '—'} chem />
        <MiniStat label="Заряд ядра = e⁻" value={`${e.z}`} />
      </dl>

      {e.ec && (
        <div className="mt-4 rounded-xl border bg-muted/30 px-4 py-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Электронная конфигурация</div>
          <div className="mt-1 text-lg font-semibold">
            <ChemText text={e.ec} />
          </div>
        </div>
      )}

      {e.note && (
        <p className="mt-4 rounded-xl border border-primary/25 bg-primary/[0.06] p-4 text-sm leading-relaxed">
          <ChemText text={e.note} />
        </p>
      )}
    </motion.div>
  );
}

function MiniStat({ label, value, chem }: { label: string; value: string; chem?: boolean }) {
  return (
    <div className="rounded-xl border bg-muted/30 px-3 py-2.5">
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-bold">{chem ? <ChemText text={value} /> : value}</dd>
    </div>
  );
}
