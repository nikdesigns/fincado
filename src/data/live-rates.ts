export type BankRate = {
  bank: 'sbi' | 'hdfc' | 'icici';
  personalLoan: number;
  homeLoan: number;
  carLoan: number;
  updatedAt: string;
};

export const BANK_RATES: BankRate[] = [
  {
    bank: 'sbi',
    personalLoan: 10.49,
    homeLoan: 8.35,
    carLoan: 9.1,
    updatedAt: new Date().toISOString(),
  },
  {
    bank: 'hdfc',
    personalLoan: 10.75,
    homeLoan: 8.4,
    carLoan: 9.2,
    updatedAt: new Date().toISOString(),
  },
  {
    bank: 'icici',
    personalLoan: 10.99,
    homeLoan: 8.5,
    carLoan: 9.3,
    updatedAt: new Date().toISOString(),
  },
];
