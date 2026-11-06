'use client';

import { parseChemTokens } from '@/lib/chem';
import { cn } from '@/lib/utils';

interface ChemTextProps {
  text: string;
  className?: string;
}

/** Рендер текста с химической разметкой _{} и ^{} */
export function ChemText({ text, className }: ChemTextProps) {
  return <span className={cn('chem', className)}>{parseChemTokens(text)}</span>;
}
