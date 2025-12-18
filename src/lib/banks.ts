export interface Bank {
  name: string;
  slug: string;
  rate: number;
}

export const banks: Bank[] = [
  { name: 'SBI', slug: 'sbi', rate: 8.5 },
  { name: 'HDFC Bank', slug: 'hdfc', rate: 8.7 },
  { name: 'ICICI Bank', slug: 'icici', rate: 8.75 },
  { name: 'Axis Bank', slug: 'axis', rate: 8.75 },
  { name: 'Kotak Mahindra', slug: 'kotak', rate: 8.8 },
  { name: 'Punjab National Bank', slug: 'pnb', rate: 8.6 },
  { name: 'Bank of Baroda', slug: 'bob', rate: 8.6 },
  { name: 'Canara Bank', slug: 'canara', rate: 8.65 },
  { name: 'Union Bank of India', slug: 'union', rate: 8.7 },
  { name: 'IndusInd Bank', slug: 'indusind', rate: 8.9 },
  { name: 'IDFC First Bank', slug: 'idfc', rate: 8.95 },
  { name: 'Yes Bank', slug: 'yes', rate: 9.05 },
  { name: 'Bajaj Finserv', slug: 'bajaj', rate: 9.1 },
  { name: 'Bank of India', slug: 'boi', rate: 8.65 },
  { name: 'Indian Bank', slug: 'indian', rate: 8.7 },
  { name: 'Central Bank of India', slug: 'central', rate: 8.55 },
  { name: 'Bank of Maharashtra', slug: 'bom', rate: 8.5 },
  { name: 'Federal Bank', slug: 'federal', rate: 9.0 },
  { name: 'Tata Capital', slug: 'tata', rate: 9.2 },
  { name: 'Aditya Birla Capital', slug: 'abc', rate: 9.25 },
];
