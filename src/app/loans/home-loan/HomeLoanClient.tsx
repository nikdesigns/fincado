'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------- TYPES ---------- */
interface HomeLoanLabels {
  loanAmount: string;
  interestRate: string;
  tenure: string;
  monthlyEMI: string;
  principal: string;
  interest: string;
  amortizationSchedule: string;
  yearlyBreakdown: string;
  copy: string;
  export: string;
  print: string;
  month: string;
  balance: string;
}

const DEFAULT_LABELS: HomeLoanLabels = {
  loanAmount: 'Loan Amount (₹)',
  interestRate: 'Interest Rate (% p.a)',
  tenure: 'Tenure (Years)',
  monthlyEMI: 'Monthly EMI',
  principal: 'Principal',
  interest: 'Interest',
  amortizationSchedule: 'Amortization Schedule',
  yearlyBreakdown: 'Month-wise breakdown',
  copy: 'Copy',
  export: 'Export',
  print: 'Print',
  month: 'Month',
  balance: 'Balance',
};

export default function HomeLoanClient({
  labels = {},
}: {
  labels?: Partial<HomeLoanLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;

    let emi = 0;
    if (r === 0) emi = amount / n;
    else emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const totalPayment = emi * n;
    const totalInterest = totalPayment - amount;
    const interestPct = Math.round((totalInterest / totalPayment) * 100);

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      interestPct,
      principalPct: 100 - interestPct,
      months: n,
    };
  }, [amount, rate, tenure]);

  /* ---------- AMORTIZATION ---------- */
  const schedule = useMemo(() => {
    let balance = amount;
    const r = rate / 12 / 100;
    const rows = [];

    for (let i = 1; i <= calculations.months && i <= 360; i++) {
      const interest = balance * r;
      const principal = Math.min(calculations.emi - interest, balance);
      balance -= principal;

      rows.push({
        month: i,
        principal,
        interest,
        balance: Math.max(balance, 0),
      });
    }

    return rows;
  }, [amount, rate, calculations]);

  /* ---------- ACTIONS ---------- */
  const downloadCSV = () => {
    const rows = schedule.map(
      (r) =>
        `${r.month},${Math.round(r.principal)},${Math.round(
          r.interest
        )},${Math.round(r.balance)}`
    );
    const csv =
      'data:text/csv;charset=utf-8,' +
      `${t.month},${t.principal},${t.interest},${t.balance}\n` +
      rows.join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = 'home-loan-schedule.csv';
    link.click();
  };

  const copyToClipboard = () => {
    const text = schedule
      .map(
        (r) =>
          `${r.month}\t${Math.round(r.principal)}\t${Math.round(
            r.interest
          )}\t${Math.round(r.balance)}`
      )
      .join('\n');

    navigator.clipboard.writeText(
      `${t.month}\t${t.principal}\t${t.interest}\t${t.balance}\n${text}`
    );
  };

  /* ---------- UI ---------- */
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        {/* INPUT + VISUAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 not-print:">
          {/* INPUTS */}
          <div className="space-y-6">
            <CalculatorField
              label={t.loanAmount}
              value={amount}
              min={500000}
              max={50000000}
              step={100000}
              onChange={setAmount}
            />

            <CalculatorField
              label={t.interestRate}
              value={rate}
              min={6}
              max={15}
              step={0.05}
              onChange={setRate}
            />

            <CalculatorField
              label={t.tenure}
              value={tenure}
              min={1}
              max={30}
              step={1}
              onChange={setTenure}
            />
          </div>

          {/* VISUAL */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={calculations.principalPct}
              interestPct={calculations.interestPct}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-slate-500">{t.monthlyEMI}</div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                {formatINR(calculations.emi)}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card className="border-slate-200">
                  <CardContent>
                    <div className="text-xs text-slate-500">{t.principal}</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(amount)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent>
                    <div className="text-xs text-red-700">{t.interest}</div>
                    <div className="mt-1 font-semibold text-red-700">
                      {formatINR(calculations.totalInterest)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* AMORTIZATION TABLE */}
        <div className="mt-12">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t.amortizationSchedule}
              </h3>
              <p className="text-sm text-slate-500">{t.yearlyBreakdown}</p>
            </div>

            <div className="flex gap-2 no-print">
              <Button variant="outline" onClick={copyToClipboard}>
                {t.copy}
              </Button>
              <Button variant="outline" onClick={downloadCSV}>
                {t.export}
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                {t.print}
              </Button>
            </div>
          </div>

          <Card className="border-slate-200">
            <CardContent className="p-0">
              <div className="schedule-wrapper max-h-105 overflow-y-auto">
                <Table className="border-collapse-separate border-spacing-0">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky top-0 z-30 bg-white">
                        {t.month}
                      </TableHead>
                      <TableHead className="sticky top-0 z-30 bg-white text-right">
                        {t.principal}
                      </TableHead>
                      <TableHead className="sticky top-0 z-30 bg-white text-right">
                        {t.interest}
                      </TableHead>
                      <TableHead className="sticky top-0 z-30 bg-white text-right">
                        {t.balance}
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {schedule.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell className="text-slate-500">
                          {row.month}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatINR(row.principal)}
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          {formatINR(row.interest)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatINR(row.balance)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <p className="mt-3 text-xs text-slate-500">
            Showing first {schedule.length} months. Export CSV for full
            schedule.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
