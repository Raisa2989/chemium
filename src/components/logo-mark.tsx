'use client';

import { cn } from '@/lib/utils';

/**
 * Компактная марка «ХимиУм»: шестиугольник (бензольное кольцо)
 * с атомным ядром внутри. Читается даже в 24px.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={cn('text-primary', className)} aria-hidden="true">
      {/* шестиугольник */}
      <path
        d="M24 5 L39.5 14 L39.5 32 L24 41 L8.5 32 L8.5 14 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* ядро */}
      <circle cx="24" cy="23" r="6.5" fill="currentColor" />
      {/* электроны */}
      <circle cx="33.5" cy="17.5" r="2.4" fill="currentColor" opacity="0.55" />
      <circle cx="14.5" cy="29.5" r="2" fill="currentColor" opacity="0.45" />
    </svg>
  );
}
