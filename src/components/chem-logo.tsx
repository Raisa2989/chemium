'use client';

import { cn } from '@/lib/utils';

/** Декоративный логотип: колба с молекулами */
export function ChemLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={cn('text-primary', className)} aria-hidden="true">
      <circle cx="24" cy="30" r="7" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="46" cy="18" r="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M28 35 L43 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M46 24 L60 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* колба */}
      <path
        d="M62 52 L62 30 C62 27 64 25 67 25 L74 25 C77 25 79 27 79 30 L79 52 L96 84 C100 91 95 98 87 98 L54 98 C46 98 41 91 45 84 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* жидкость */}
      <path
        d="M58 68 L45 84 C41 91 46 95 54 95 L87 95 C95 95 100 91 96 84 L83 68 Z"
        fill="currentColor"
        opacity="0.35"
      />
      <circle cx="66" cy="78" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="75" cy="86" r="2.2" fill="currentColor" opacity="0.6" />
      <circle cx="71" cy="72" r="1.8" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
