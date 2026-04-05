// src/data/rateRanges.ts
import { BANK_RATES } from './live-rates';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

export interface RateRange {
  label: string;
  range: string; // e.g. "8.35% – 9.65%"
  updatedAt: string;
}

function getMinMaxRate(key: 'homeLoan' | 'personalLoan' | 'carLoan'): string {
  if (BANK_RATES.length === 0) {
    return '—';
  }

  const rates = BANK_RATES.map((b) => b[key]);
  const min = Math.min(...rates);
  const max = Math.max(...rates);

  return `${min}% – ${max}%`;
}

// Dynamic ranges based on live-rates.ts + static categories
export const RATE_RANGES: Record<string, RateRange> = {
  personalLoan: {
    label: 'Personal Loan',
    range: getMinMaxRate('personalLoan'),
    updatedAt: getCurrentMonthYearLabel(),
  },
  homeLoan: {
    label: 'Home Loan',
    range: getMinMaxRate('homeLoan'),
    updatedAt: getCurrentMonthYearLabel(),
  },
  carLoan: {
    label: 'Car Loan',
    range: getMinMaxRate('carLoan'),
    updatedAt: getCurrentMonthYearLabel(),
  },
  fd: {
    label: 'Fixed Deposit',
    range: '6.5% – 8.2%',
    updatedAt: getCurrentMonthYearLabel(),
  },
  sip: {
    label: 'SIP (Market-linked)',
    range: '10% – 15%',
    updatedAt: getCurrentMonthYearLabel(),
  },
  creditCard: {
    label: 'Credit Card APR',
    range: '30% – 42%',
    updatedAt: getCurrentMonthYearLabel(),
  },
};

// Helper to get a single range
export function getRateRange(key: keyof typeof RATE_RANGES): RateRange {
  return RATE_RANGES[key];
}
