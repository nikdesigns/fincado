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

type LoanType = 'homeLoan' | 'personalLoan' | 'carLoan' | 'educationLoan';

interface Props {
  type?: LoanType | string;
}

export default function LiveRateTable({ type = 'homeLoan' }: Props) {
  const ranges = {
    homeLoan: {
      title: 'Home Loan Interest Rates 2025',
      data: [
        {
          category: 'Public Sector Banks',
          rate: '8.35% — 9.50%',
          fee: 'Low (Max ₹10k)',
        },
        {
          category: 'Private Sector Banks',
          rate: '8.75% — 10.50%',
          fee: 'Medium (0.5% - 1%)',
        },
        {
          category: 'HFCs (Housing Finance)',
          rate: '9.00% — 11.50%',
          fee: 'Medium (0.5% - 2%)',
        }
      ],
    },
    personalLoan: {
      title: 'Personal Loan Interest Rates 2025',
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
      title: 'Car Loan Interest Rates 2025',
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
        {
          category: 'Used Car Loans',
          rate: '12.00% — 18.00%',
          fee: '1% - 2%',
        }
      ],
    },
    educationLoan: {
      title: 'Education Loan Rates 2025',
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

  const selected = ranges[type as keyof typeof ranges] || ranges.homeLoan;

  return (
    <section className="mt-8 no-print">
      <Card className="border-slate-200 bg-white">
        {/* HEADER */}
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-slate-900">
            {selected.title}
          </CardTitle>
        </CardHeader>

        {/* TABLE */}
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
                    <TableCell className="font-semibold text-emerald-600">
                      {row.rate}
                    </TableCell>
                    <TableCell className="text-slate-600">{row.fee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* NOTE */}
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            <strong className="font-semibold text-slate-700">Note:</strong>{' '}
            Rates mentioned above are indicative market ranges for borrowers
            with a Credit Score &gt; 750. Actual rates may vary based on your
            profile.
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
