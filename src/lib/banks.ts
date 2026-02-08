export interface Bank {
  name: string;
  slug: string;
  rate: number; // "Starting From" rate (Kept as number to prevent breaking changes)
  maxRate: number; // New field for the upper limit
}

// Disclaimer to use in your UI when ready
export const RATE_DISCLAIMER =
  'Interest rates are subject to credit score and bank policy.';

export const banks: Bank[] = [
  { name: 'SBI', slug: 'sbi', rate: 8.5, maxRate: 9.65 },
  { name: 'HDFC Bank', slug: 'hdfc', rate: 8.7, maxRate: 9.9 },
  { name: 'ICICI Bank', slug: 'icici', rate: 8.75, maxRate: 9.85 },
  { name: 'Axis Bank', slug: 'axis', rate: 8.75, maxRate: 9.75 },
  { name: 'Kotak Mahindra', slug: 'kotak', rate: 8.8, maxRate: 9.8 },
  { name: 'Punjab National Bank', slug: 'pnb', rate: 8.4, maxRate: 10.15 },
  { name: 'Bank of Baroda', slug: 'bob', rate: 8.4, maxRate: 10.6 },
  { name: 'Canara Bank', slug: 'canara', rate: 8.65, maxRate: 9.55 },
  { name: 'Union Bank of India', slug: 'union', rate: 8.7, maxRate: 9.6 },
  { name: 'IndusInd Bank', slug: 'indusind', rate: 8.9, maxRate: 10.5 },
  { name: 'IDFC First Bank', slug: 'idfc-first', rate: 8.75, maxRate: 10.5 },
  { name: 'Yes Bank', slug: 'yes', rate: 9.05, maxRate: 10.25 },
  { name: 'Bajaj Finserv', slug: 'bajaj', rate: 8.5, maxRate: 12.0 },
  { name: 'Bank of India', slug: 'boi', rate: 8.65, maxRate: 9.45 },
  { name: 'Indian Bank', slug: 'indian', rate: 8.7, maxRate: 9.5 },
  { name: 'Central Bank of India', slug: 'central', rate: 8.55, maxRate: 9.35 },
  { name: 'Bank of Maharashtra', slug: 'bom', rate: 8.5, maxRate: 9.25 },
  { name: 'Federal Bank', slug: 'federal', rate: 9.0, maxRate: 10.2 },
  { name: 'Tata Capital', slug: 'tata', rate: 9.2, maxRate: 11.5 },
  { name: 'LIC Housing', slug: 'lic-housing', rate: 8.5, maxRate: 10.35 },
  { name: 'Aditya Birla Capital', slug: 'abc', rate: 9.25, maxRate: 11.75 }
];
