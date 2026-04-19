// src/lib/banks.ts   (or wherever this file lives)

export interface Bank {
  name: string;
  slug: string;
  rate: number; // Starting / best-case rate
  maxRate: number; // Upper limit / worst-case rate
  category?: 'Bank' | 'HFC' | 'NBFC'; // ← optional but useful later
}

// Reusable disclaimer
export const RATE_DISCLAIMER =
  'Interest rates are indicative only. Actual rate depends on credit score, LTV, income profile and bank policy.';

export const banks: Bank[] = [
  { name: 'SBI', slug: 'sbi', rate: 8.5, maxRate: 9.65, category: 'Bank' },
  {
    name: 'HDFC Bank',
    slug: 'hdfc',
    rate: 8.7,
    maxRate: 9.9,
    category: 'Bank',
  },
  {
    name: 'ICICI Bank',
    slug: 'icici',
    rate: 8.75,
    maxRate: 9.85,
    category: 'Bank',
  },
  {
    name: 'Axis Bank',
    slug: 'axis',
    rate: 8.75,
    maxRate: 9.75,
    category: 'Bank',
  },
  {
    name: 'Kotak Mahindra',
    slug: 'kotak',
    rate: 8.8,
    maxRate: 9.8,
    category: 'Bank',
  },
  {
    name: 'Punjab National Bank',
    slug: 'pnb',
    rate: 8.4,
    maxRate: 10.15,
    category: 'Bank',
  },
  {
    name: 'Bank of Baroda',
    slug: 'bob',
    rate: 8.4,
    maxRate: 10.6,
    category: 'Bank',
  },
  {
    name: 'Canara Bank',
    slug: 'canara',
    rate: 8.65,
    maxRate: 9.55,
    category: 'Bank',
  },
  {
    name: 'Union Bank of India',
    slug: 'union',
    rate: 8.7,
    maxRate: 9.6,
    category: 'Bank',
  },
  {
    name: 'IndusInd Bank',
    slug: 'indusind',
    rate: 8.9,
    maxRate: 10.5,
    category: 'Bank',
  },
  {
    name: 'IDFC First Bank',
    slug: 'idfc-first',
    rate: 8.75,
    maxRate: 10.5,
    category: 'Bank',
  },
  {
    name: 'Yes Bank',
    slug: 'yes',
    rate: 9.05,
    maxRate: 10.25,
    category: 'Bank',
  },
  {
    name: 'Bajaj Finserv',
    slug: 'bajaj',
    rate: 8.5,
    maxRate: 12.0,
    category: 'NBFC',
  },
  {
    name: 'Bank of India',
    slug: 'boi',
    rate: 8.65,
    maxRate: 9.45,
    category: 'Bank',
  },
  {
    name: 'Indian Bank',
    slug: 'indian',
    rate: 8.7,
    maxRate: 9.5,
    category: 'Bank',
  },
  {
    name: 'Central Bank of India',
    slug: 'central',
    rate: 8.55,
    maxRate: 9.35,
    category: 'Bank',
  },
  {
    name: 'Bank of Maharashtra',
    slug: 'bom',
    rate: 8.5,
    maxRate: 9.25,
    category: 'Bank',
  },
  {
    name: 'Federal Bank',
    slug: 'federal',
    rate: 9.0,
    maxRate: 10.2,
    category: 'Bank',
  },
  {
    name: 'Tata Capital',
    slug: 'tata',
    rate: 9.2,
    maxRate: 11.5,
    category: 'NBFC',
  },
  {
    name: 'LIC Housing',
    slug: 'lic-housing',
    rate: 8.5,
    maxRate: 10.35,
    category: 'HFC',
  },
  {
    name: 'Aditya Birla Capital',
    slug: 'abc',
    rate: 9.25,
    maxRate: 11.75,
    category: 'NBFC',
  }
];
