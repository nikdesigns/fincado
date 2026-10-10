// src/lib/live-rates.ts
// Live / indicative rates for all banks (updated September 2026)
// Home loan baseline from src/lib/banks.ts (BankBazaar, June 2026), cross-checked
// against live web rates for SBI/HDFC/ICICI/Axis/Kotak. Personal/car loan rates use
// each bank's prior relative spread applied to the refreshed home-loan baseline.
// Re-verify periodically — these are indicative, not pulled from a live rate API.

export type BankSlug =
  | 'sbi'
  | 'hdfc'
  | 'icici'
  | 'axis'
  | 'kotak'
  | 'pnb'
  | 'bob'
  | 'canara'
  | 'union'
  | 'indusind'
  | 'idfc-first'
  | 'yes'
  | 'bajaj'
  | 'boi'
  | 'indian'
  | 'central'
  | 'bom'
  | 'federal'
  | 'tata'
  | 'lic-housing'
  | 'abc';

export type BankRate = {
  bank: BankSlug;
  personalLoan: number; // Starting rate
  homeLoan: number; // Most important for your site
  carLoan: number;
  updatedAt: string; // YYYY-MM-DD
};

// Current rates as of September 2026 (indicative only)
export const BANK_RATES: BankRate[] = [
  {
    bank: 'sbi',
    personalLoan: 10.0,
    homeLoan: 7.25,
    carLoan: 8.75,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'hdfc',
    personalLoan: 9.99,
    homeLoan: 7.75,
    carLoan: 9.0,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'icici',
    personalLoan: 10.45,
    homeLoan: 7.9,
    carLoan: 8.85,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'axis',
    personalLoan: 10.99,
    homeLoan: 8.0,
    carLoan: 8.65,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'kotak',
    personalLoan: 10.5,
    homeLoan: 7.6,
    carLoan: 8.05,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'pnb',
    personalLoan: 9.55,
    homeLoan: 7.2,
    carLoan: 7.95,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'bob',
    personalLoan: 9.65,
    homeLoan: 7.2,
    carLoan: 8.0,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'canara',
    personalLoan: 9.15,
    homeLoan: 7.15,
    carLoan: 7.55,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'union',
    personalLoan: 9.25,
    homeLoan: 7.15,
    carLoan: 7.55,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'indusind',
    personalLoan: 10.6,
    homeLoan: 8.25,
    carLoan: 8.85,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'idfc-first',
    personalLoan: 9.99,
    homeLoan: 7.75,
    carLoan: 8.35,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'yes',
    personalLoan: 11.1,
    homeLoan: 8.65,
    carLoan: 9.35,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'bajaj',
    personalLoan: 10.49,
    homeLoan: 7.99,
    carLoan: 8.49,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'boi',
    personalLoan: 9.25,
    homeLoan: 7.1,
    carLoan: 7.6,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'indian',
    personalLoan: 9.4,
    homeLoan: 7.2,
    carLoan: 7.7,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'central',
    personalLoan: 9.25,
    homeLoan: 7.1,
    carLoan: 7.65,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'bom',
    personalLoan: 9.2,
    homeLoan: 7.1,
    carLoan: 7.65,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'federal',
    personalLoan: 9.5,
    homeLoan: 7.3,
    carLoan: 7.75,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'tata',
    personalLoan: 10.55,
    homeLoan: 8.0,
    carLoan: 8.8,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'lic-housing',
    personalLoan: 9.45,
    homeLoan: 7.15,
    carLoan: 7.95,
    updatedAt: '2026-09-11',
  },
  {
    bank: 'abc',
    personalLoan: 10.85,
    homeLoan: 8.6,
    carLoan: 9.15,
    updatedAt: '2026-09-11',
  }
];

// Helper to get rate for any bank (with fallback)
export function getBankRates(): BankRate[] {
  return BANK_RATES;
}

export function getLatestHomeRate(bankSlug: string, fallback = 9.0): number {
  const rate = BANK_RATES.find((r) => r.bank === bankSlug);
  return rate ? rate.homeLoan : fallback;
}
