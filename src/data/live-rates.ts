// src/lib/live-rates.ts
// Live / indicative rates for all banks (updated April 2026)

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

// Current rates as of April 2026 (indicative only)
export const BANK_RATES: BankRate[] = [
  {
    bank: 'sbi',
    personalLoan: 10.49,
    homeLoan: 8.35,
    carLoan: 9.1,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'hdfc',
    personalLoan: 10.75,
    homeLoan: 8.4,
    carLoan: 9.2,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'icici',
    personalLoan: 10.99,
    homeLoan: 8.5,
    carLoan: 9.3,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'axis',
    personalLoan: 11.1,
    homeLoan: 8.75,
    carLoan: 9.4,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'kotak',
    personalLoan: 10.99,
    homeLoan: 8.8,
    carLoan: 9.25,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'pnb',
    personalLoan: 10.75,
    homeLoan: 8.4,
    carLoan: 9.15,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'bob',
    personalLoan: 10.85,
    homeLoan: 8.4,
    carLoan: 9.2,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'canara',
    personalLoan: 10.65,
    homeLoan: 8.65,
    carLoan: 9.05,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'union',
    personalLoan: 10.8,
    homeLoan: 8.7,
    carLoan: 9.1,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'indusind',
    personalLoan: 11.25,
    homeLoan: 8.9,
    carLoan: 9.5,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'idfc-first',
    personalLoan: 10.99,
    homeLoan: 8.75,
    carLoan: 9.35,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'yes',
    personalLoan: 11.5,
    homeLoan: 9.05,
    carLoan: 9.75,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'bajaj',
    personalLoan: 11.0,
    homeLoan: 8.5,
    carLoan: 9.0,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'boi',
    personalLoan: 10.8,
    homeLoan: 8.65,
    carLoan: 9.15,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'indian',
    personalLoan: 10.9,
    homeLoan: 8.7,
    carLoan: 9.2,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'central',
    personalLoan: 10.7,
    homeLoan: 8.55,
    carLoan: 9.1,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'bom',
    personalLoan: 10.6,
    homeLoan: 8.5,
    carLoan: 9.05,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'federal',
    personalLoan: 11.2,
    homeLoan: 9.0,
    carLoan: 9.45,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'tata',
    personalLoan: 11.75,
    homeLoan: 9.2,
    carLoan: 10.0,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'lic-housing',
    personalLoan: 10.8,
    homeLoan: 8.5,
    carLoan: 9.3,
    updatedAt: '2026-04-01',
  },
  {
    bank: 'abc',
    personalLoan: 11.5,
    homeLoan: 9.25,
    carLoan: 9.8,
    updatedAt: '2026-04-01',
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
