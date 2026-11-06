'use client';

import { useState } from 'react';
import {
  SOLUBILITY,
  ACTIVITY_SERIES,
  INDICATORS,
  QUALITATIVE_REACTIONS,
  CALC_FORMULAS,
  ORGANIC_SERIES,
  COLORS_NOTE,
  SAFETY_NOTES,
} from '@/data/reference';
import { AR_TABLE } from '@/data/periodic';
import { ChemText } from '@/components/chem-text';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Droplets, Activity, GlassWater, FlaskConical, Sigma, Hexagon, Palette, ShieldAlert, Table2 } from 'lucide-react';

const R_STYLE: Record<string, string> = {
  Р: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
  М: 'bg-amber-500/15 text-amber-800 dark:text-amber-300',
  Н: 'bg-rose-500/15 text-rose-800 dark:text-rose-300',
  '—': 'bg-muted text-muted-foreground',
};

export function ReferenceView() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Справочник</h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Важнейшие таблицы и формулы школьного курса химии — всегда под рукой.
        </p>
      </div>

      <Tabs defaultValue="solubility">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-xl bg-secondary/60 p-1">
          <RefTab value="solubility" icon={<Droplets className="h-4 w-4" />} label="Растворимость" />
          <RefTab value="activity" icon={<Activity className="h-4 w-4" />} label="Активность" />
          <RefTab value="qualitative" icon={<FlaskConical className="h-4 w-4" />} label="Кач. реакции" />
          <RefTab value="indicators" icon={<GlassWater className="h-4 w-4" />} label="Индикаторы" />
          <RefTab value="formulas" icon={<Sigma className="h-4 w-4" />} label="Формулы" />
          <RefTab value="organic" icon={<Hexagon className="h-4 w-4" />} label="Органика" />
          <RefTab value="colors" icon={<Palette className="h-4 w-4" />} label="Цвета" />
          <RefTab value="ar" icon={<Table2 className="h-4 w-4" />} label="Ar элементов" />
          <RefTab value="safety" icon={<ShieldAlert className="h-4 w-4" />} label="Техника безопасности" />
        </TabsList>

        <TabsContent value="solubility" className="mt-4">
          <SolubilityTable />
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <ActivitySeries />
        </TabsContent>
        <TabsContent value="qualitative" className="mt-4">
          <SimpleTable headers={QUALITATIVE_REACTIONS.headers} rows={QUALITATIVE_REACTIONS.rows} />
        </TabsContent>
        <TabsContent value="indicators" className="mt-4">
          <SimpleTable headers={INDICATORS.headers} rows={INDICATORS.rows} />
        </TabsContent>
        <TabsContent value="formulas" className="mt-4">
          <FormulasList />
        </TabsContent>
        <TabsContent value="organic" className="mt-4">
          <SimpleTable headers={ORGANIC_SERIES.headers} rows={ORGANIC_SERIES.rows} />
        </TabsContent>
        <TabsContent value="colors" className="mt-4">
          <SimpleTable headers={COLORS_NOTE.headers} rows={COLORS_NOTE.rows} />
        </TabsContent>
        <TabsContent value="ar" className="mt-4">
          <ArTable />
        </TabsContent>
        <TabsContent value="safety" className="mt-4">
          <SafetyList />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RefTab({ value, icon, label }: { value: string; icon: React.ReactNode; label: string }) {
  return (
    <TabsTrigger
      value={value}
      className="gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:shadow-sm sm:text-sm"
    >
      {icon}
      {label}
    </TabsTrigger>
  );
}

function SolubilityTable() {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-2xl border nice-scroll">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="bg-primary/[0.08]">
              <th className="px-3 py-2.5 text-left font-bold text-primary">Катион \ Анион</th>
              {SOLUBILITY.anions.map((a) => (
                <th key={a} className="px-2 py-2.5 text-center font-bold text-primary">
                  <ChemText text={a} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SOLUBILITY.cations.map((row) => (
              <tr key={row.cation} className="border-t">
                <td className="whitespace-nowrap px-3 py-2 font-semibold">
                  <ChemText text={row.cation} />
                </td>
                {row.values.map((v, i) => (
                  <td key={i} className="p-1 text-center">
                    <span className={cn('inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold', R_STYLE[v] ?? '')}>
                      {v}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
        {SOLUBILITY.legend.map((l) => (
          <li key={l.code} className="flex items-center gap-2">
            <span className={cn('inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold', R_STYLE[l.code] ?? '')}>
              {l.code}
            </span>
            {l.meaning}
          </li>
        ))}
      </ul>
      <p className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-3.5 text-sm">
        Все соли азотной кислоты (нитраты) и все соли натрия, калия и аммония растворимы. Помните про правило
        ионного обмена: реакция идёт, если образуется осадок (Н или М), газ или вода.
      </p>
    </div>
  );
}

function ActivitySeries() {
  const hIndex = ACTIVITY_SERIES.indexOf('(H₂)');
  return (
    <div className="space-y-4">
      <h3 className="font-bold">Электрохимический ряд напряжений металлов</h3>
      <div className="overflow-x-auto rounded-2xl border bg-card p-4 nice-scroll">
        <div className="flex min-w-max items-stretch gap-1">
          {ACTIVITY_SERIES.map((m, i) => {
            const isH = m === '(H₂)';
            return (
              <div
                key={m}
                className={cn(
                  'flex min-w-12 flex-col items-center justify-center rounded-lg border px-2 py-2.5 text-sm font-bold transition-transform hover:scale-105',
                  isH && 'border-destructive/40 bg-destructive/10 text-destructive',
                  !isH && i < hIndex && 'border-primary/30 bg-primary/10 text-primary',
                  !isH && i > hIndex && 'border-amber-400/30 bg-amber-400/10 text-amber-700 dark:text-amber-300'
                )}
              >
                {m}
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <span>← активность уменьшается →</span>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-primary/30 bg-primary/[0.06] p-4 text-sm leading-relaxed">
          <b className="text-primary">До H (активные):</b> вытесняют водород из растворов кислот (кроме HNO_{3}),
          реагируют с водой при нагревании или на холоде (Li, Na, K — бурно).
        </div>
        <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm leading-relaxed">
          <b className="text-amber-700 dark:text-amber-300">После H (малоактивные):</b> не вытесняют водород из
          кислот; растворяются в окислительных кислотах (конц. H_{2}SO_{4}, HNO_{3}).
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Каждый металл вытесняет менее активные металлы из растворов их солей (исключение — щелочные и
        щёлочноземельные металлы в водных растворах).
      </p>
    </div>
  );
}

function SimpleTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border nice-scroll">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="bg-primary/[0.08]">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2.5 text-left font-bold text-primary">
                <ChemText text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={cn('border-t', ri % 2 === 1 && 'bg-muted/30')}>
              {row.map((cell, ci) => (
                <td key={ci} className={cn('px-3 py-2.5', ci === 0 && 'font-medium')}>
                  <ChemText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FormulasList() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {CALC_FORMULAS.map((f) => (
        <div key={f.formula} className="rounded-xl border bg-card p-4">
          <div className="chem text-lg font-bold">
            <ChemText text={f.formula} />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            <ChemText text={f.caption} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ArTable() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Относительные атомные массы для расчётов (округлённые школьные значения).
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {AR_TABLE.map((e) => (
          <div key={e.sym} className="rounded-xl border bg-card px-3 py-2.5 text-center">
            <div className="text-lg font-extrabold text-primary">{e.sym}</div>
            <div className="text-xs capitalize text-muted-foreground">{e.name}</div>
            <div className="text-sm font-bold">{e.ar}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SafetyList() {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/[0.05] p-5">
      <h3 className="mb-3 flex items-center gap-2 font-bold text-destructive">
        <ShieldAlert className="h-5 w-5" /> Техника безопасности при работе с веществами
      </h3>
      <ul className="space-y-2.5">
        {SAFETY_NOTES.map((n, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}
