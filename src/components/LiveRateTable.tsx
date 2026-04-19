'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BANK_RATES } from '@/data/live-rates';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

type LoanType = 'homeLoan' | 'personalLoan' | 'carLoan' | 'educationLoan';

interface CategoryRow {
  category: string;
  rate: string;
  fee: string;
}

interface RateRange {
  title: string;
  data: CategoryRow[];
}

interface Props {
  type?: LoanType | string;
}

export default function LiveRateTable({ type = 'homeLoan' }: Props) {
  const currentDate = getCurrentMonthYearLabel();

  // === HOME LOAN - Show actual banks (most important) ===
  if (type === 'homeLoan') {
    const homeRates = BANK_RATES.slice(0, 8);

    return (
      <section className="mt-8 no-print">
        <Card className="border-slate-200 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center justify-between">
              <span>Home Loan Interest Rates – April 2026</span>
              <span className="text-xs font-normal text-slate-500">
                Updated {currentDate}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[35%]">Bank</TableHead>
                    <TableHead className="w-[30%]">
                      Interest Rate (p.a.)
                    </TableHead>
                    <TableHead className="w-[35%]">Processing Fee</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {homeRates.map((bank) => (
                    <TableRow key={bank.bank}>
                      <TableCell className="font-medium text-slate-700 capitalize">
                        {bank.bank}
                      </TableCell>
                      <TableCell className="font-semibold text-brand-600">
                        {bank.homeLoan}%
                      </TableCell>
                      <TableCell className="text-slate-600">
                        0.25% – 1%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <strong>Note:</strong> Rates are indicative. Actual rate depends
              on your credit score, LTV, and profile.
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  // === OTHER LOAN TYPES - Category view ===
  const ranges: Record<Exclude<LoanType, 'homeLoan'>, RateRange> = {
    personalLoan: {
      title: 'Personal Loan Interest Rates 2026',
      data: [
        {
          category: 'PSU Banks (Salary Account)',
          rate: '10.50% — 13.00%',
          fee: '1% - 2%',
        },
        {
          category: 'Private Banks',
          rate: '10.99% — 16.00%',
          fee: '1.5% - 3%',
        },
        {
          category: 'NBFCs & Fintech Apps',
          rate: '14.00% — 24.00%',
          fee: '2% - 4%',
        }
      ],
    },
    carLoan: {
      title: 'Car Loan Interest Rates 2026',
      data: [
        {
          category: 'New Car (PSU Banks)',
          rate: '8.70% — 9.20%',
          fee: 'Zero or Low',
        },
        {
          category: 'New Car (Private Banks)',
          rate: '9.00% — 11.00%',
          fee: '0.5% - 1%',
        },
        { category: 'Used Car Loans', rate: '12.00% — 18.00%', fee: '1% - 2%' }
      ],
    },
    educationLoan: {
      title: 'Education Loan Rates 2026',
      data: [
        {
          category: 'Public Banks (India)',
          rate: '9.00% — 11.00%',
          fee: 'Nil',
        },
        {
          category: 'Study Abroad (Secured)',
          rate: '10.00% — 12.50%',
          fee: '0.5% - 1%',
        },
        {
          category: 'Unsecured Loans',
          rate: '11.50% — 14.00%',
          fee: '1% - 2%',
        }
      ],
    },
  };

  const selected =
    ranges[type as Exclude<LoanType, 'homeLoan'>] || ranges.personalLoan;

  return (
    <section className="mt-8 no-print">
      <Card className="border-slate-200 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-slate-900">
            {selected.title} – {currentDate}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Lender Category</TableHead>
                  <TableHead className="w-[30%]">
                    Interest Rate (p.a.)
                  </TableHead>
                  <TableHead className="w-[30%]">Processing Fee</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {selected.data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-slate-700">
                      {row.category}
                    </TableCell>
                    <TableCell className="font-semibold text-brand-600">
                      {row.rate}
                    </TableCell>
                    <TableCell className="text-slate-600">{row.fee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            <strong>Note:</strong> Rates are indicative market ranges. Actual
            rates depend on your profile.
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
