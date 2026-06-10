// src/lib/banks.ts

export interface Bank {
  name: string;
  slug: string;
  rate: number;    // Starting / best-case rate
  maxRate: number; // Upper limit / worst-case rate
  category?: 'Bank' | 'HFC' | 'NBFC';
}

// Reusable disclaimer
export const RATE_DISCLAIMER =
  'Interest rates are indicative only. Actual rate depends on credit score, LTV, income profile and bank policy.';

// Rates sourced from BankBazaar — June 2026
// PSU banks reflect post-RBI-cut EBLR/MCLR-linked pricing
export const banks: Bank[] = [
  // ── PSU Banks (generally lowest rates) ─────────────────────────────
  { name: 'Bank of Maharashtra',  slug: 'bom',      rate: 7.10, maxRate: 8.75,  category: 'Bank' },
  { name: 'Bank of India',        slug: 'boi',      rate: 7.10, maxRate: 10.65, category: 'Bank' },
  { name: 'Central Bank of India',slug: 'central',  rate: 7.10, maxRate: 8.85,  category: 'Bank' },
  { name: 'Canara Bank',          slug: 'canara',   rate: 7.15, maxRate: 10.00, category: 'Bank' },
  { name: 'LIC Housing',          slug: 'lic-housing', rate: 7.15, maxRate: 9.25, category: 'HFC' },
  { name: 'Union Bank of India',  slug: 'union',    rate: 7.15, maxRate: 11.40, category: 'Bank' },
  { name: 'Punjab National Bank', slug: 'pnb',      rate: 7.20, maxRate: 8.20,  category: 'Bank' },
  { name: 'Bank of Baroda',       slug: 'bob',      rate: 7.20, maxRate: 8.90,  category: 'Bank' },
  { name: 'Indian Bank',          slug: 'indian',   rate: 7.20, maxRate: 9.00,  category: 'Bank' },
  { name: 'SBI',                  slug: 'sbi',      rate: 7.25, maxRate: 9.15,  category: 'Bank' },
  { name: 'Federal Bank',         slug: 'federal',  rate: 7.30, maxRate: 9.50,  category: 'Bank' },

  // ── Private Banks ───────────────────────────────────────────────────
  { name: 'Kotak Mahindra',       slug: 'kotak',    rate: 7.60, maxRate: 12.00, category: 'Bank' },
  { name: 'HDFC Bank',            slug: 'hdfc',     rate: 7.75, maxRate: 9.40,  category: 'Bank' },
  { name: 'IDFC First Bank',      slug: 'idfc-first', rate: 7.75, maxRate: 9.50, category: 'Bank' },
  { name: 'ICICI Bank',           slug: 'icici',    rate: 7.90, maxRate: 9.45,  category: 'Bank' },
  { name: 'Bajaj Finserv',        slug: 'bajaj',    rate: 7.99, maxRate: 12.00, category: 'NBFC' },
  { name: 'Axis Bank',            slug: 'axis',     rate: 8.00, maxRate: 12.00, category: 'Bank' },
  { name: 'Tata Capital',         slug: 'tata',     rate: 8.00, maxRate: 11.00, category: 'NBFC' },
  { name: 'IndusInd Bank',        slug: 'indusind', rate: 8.25, maxRate: 10.75, category: 'Bank' },
  { name: 'Yes Bank',             slug: 'yes',      rate: 8.65, maxRate: 10.00, category: 'Bank' },
  { name: 'Aditya Birla Capital', slug: 'abc',      rate: 8.60, maxRate: 11.50, category: 'NBFC' },
];
