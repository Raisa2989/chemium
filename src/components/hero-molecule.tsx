'use client';

import { cn } from '@/lib/utils';

/**
 * Декоративная молекула для героя: бензольное кольцо с атомами
 * и боковой цепью. Компактная — полностью помещается в карточку.
 */
export function HeroMolecule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" fill="none" className={cn('text-primary', className)} aria-hidden="true">
      {/* связи кольца */}
      <path
        d="M77 68 L121 68 L143 106 L121 144 L77 144 L55 106 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* внутренние двойные связи (ароматичность) */}
      <path d="M83 78 L115 78 M83 134 L115 134 M61 96 L61 116 M137 96 L137 116" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />

      {/* атомы кольца */}
      <circle cx="77" cy="68" r="7" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="121" cy="68" r="7" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="143" cy="106" r="7" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="121" cy="144" r="7" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="77" cy="144" r="7" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="55" cy="106" r="7" stroke="currentColor" strokeWidth="2.5" />

      {/* боковая цепь */}
      <path d="M150 100 L181 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="186" cy="76" r="9" stroke="currentColor" strokeWidth="2.5" />
      <path d="M190 84 L196 104" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="198" cy="110" r="5" stroke="currentColor" strokeWidth="2.2" />

      {/* вторая ветвь вниз */}
      <path d="M121 151 L121 174" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="121" cy="181" r="8" stroke="currentColor" strokeWidth="2.5" />

      {/* электрон на орбите */}
      <circle cx="121" cy="181" r="3" fill="currentColor" opacity="0.7" />

      {/* плавающие атомы */}
      <circle cx="34" cy="52" r="4.5" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <circle cx="170" cy="152" r="3.5" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="90" cy="26" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="47" cy="188" r="3" fill="currentColor" opacity="0.35" />

      {/* связь к плавающему атому */}
      <path d="M83 63 L38 56" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}
