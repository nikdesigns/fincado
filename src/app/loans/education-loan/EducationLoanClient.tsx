// src/app/loans/education-loan/EducationLoanClient.tsx
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

/* ---------- LABELS ---------- */
interface EduLoanLabels {
  loanAmount: string;
  interestRate: string;
  moratorium: string;
  repaymentTenure: string;
  payInterestToggle: string;
  monthlyEMI: string;
  principalCap: string;
  totalInterest: string;
  interestSavedMsg: string;
  interestAddedMsg: string;
  repaymentSchedule: string;
  startsAfter: string;
  copy: string;
  export: string;
  print: string;
  month: string;
  principal: string;
  interest: string;
  balance: string;
}

const DEFAULT_LABELS: EduLoanLabels = {
  loanAmount: 'Loan Amount (₹)',
  interestRate: 'Interest Rate (% p.a)',
  moratorium: 'Course Moratorium (Months)',
  repaymentTenure: 'Repayment Tenure (Years)',
  payInterestToggle: 'Pay Interest during Moratorium?',
  monthlyEMI: 'Monthly EMI',
  principalCap: 'Principal at Repayment Start',
  totalInterest: 'Total Interest',
  interestSavedMsg: '✅ You save interest during moratorium',
  interestAddedMsg: '⚠️ Interest added during moratorium:',
  repaymentSchedule: 'Repayment Schedule',
  startsAfter: 'Starts after moratorium period',
  copy: 'Copy',
  export: 'Export',
  print: 'Print',
  month: 'Month',
  principal: 'Principal',
  interest: 'Interest',
  balance: 'Balance',
};

export default function EducationLoanClient({
  labels = {},
}: {
  labels?: Partial<EduLoanLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [rate, setRate] = useState(10.5);
  const [repayYears, setRepayYears] = useState(10);
  const [moratoriumMonths, setMoratoriumMonths] = useState(24);
  const [payInterestDuringMoratorium, setPayInterestDuringMoratorium] =
    useState(false);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const repayMonths = repayYears * 12;

    const moratoriumInterest =
      loanAmount * (rate / 100) * (moratoriumMonths / 12);

    const principalAtRepaymentStart = payInterestDuringMoratorium
      ? loanAmount
      : loanAmount + moratoriumInterest;

    let emi = 0;
    if (principalAtRepaymentStart > 0) {
      emi =
        (principalAtRepaymentStart *
          monthlyRate *
          Math.pow(1 + monthlyRate, repayMonths)) /
        (Math.pow(1 + monthlyRate, repayMonths) - 1);
    }

    const totalRepayment = emi * repayMonths;
    const totalInterest =
      totalRepayment -
      principalAtRepaymentStart +
      (payInterestDuringMoratorium ? moratoriumInterest : 0);

    const totalCost =
      totalRepayment + (payInterestDuringMoratorium ? moratoriumInterest : 0);

    const interestPct = Math.round((totalInterest / totalCost) * 100);

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      moratoriumInterest: Math.round(moratoriumInterest),
      principalAtRepaymentStart: Math.round(principalAtRepaymentStart),
      interestPct,
      principalPct: 100 - interestPct,
      months: repayMonths,
    };
  }, [
    loanAmount,
    rate,
    repayYears,
    moratoriumMonths,
    payInterestDuringMoratorium,
  ]);

  /* ---------- SCHEDULE ---------- */
  const schedule = useMemo(() => {
    let balance = calculations.principalAtRepaymentStart;
    const r = rate / 12 / 100;
    const rows = [];

    for (let i = 1; i <= calculations.months && i <= 120; i++) {
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
  }, [calculations, rate]);

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
    link.download = 'education-loan-schedule.csv';
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* INPUTS */}
          <div className="space-y-6 no-print">
            <CalculatorField
              label={t.loanAmount}
              value={loanAmount}
              min={100000}
              max={10000000}
              step={50000}
              onChange={setLoanAmount}
            />

            <CalculatorField
              label={t.interestRate}
              value={rate}
              min={6}
              max={18}
              step={0.1}
              onChange={setRate}
            />

            <CalculatorField
              label={t.moratorium}
              value={moratoriumMonths}
              min={0}
              max={60}
              step={1}
              onChange={setMoratoriumMonths}
            />

            <CalculatorField
              label={t.repaymentTenure}
              value={repayYears}
              min={1}
              max={15}
              step={1}
              onChange={setRepayYears}
            />

            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={payInterestDuringMoratorium}
                onChange={(e) =>
                  setPayInterestDuringMoratorium(e.target.checked)
                }
              />
              {t.payInterestToggle}
            </label>
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

              <p className="mt-2 text-sm text-slate-600">
                {payInterestDuringMoratorium
                  ? t.interestSavedMsg
                  : `${t.interestAddedMsg} ${formatINR(
                      calculations.moratoriumInterest
                    )}`}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card>
                  <CardContent>
                    <div className="text-xs text-slate-500">
                      {t.principalCap}
                    </div>
                    <div className="font-semibold">
                      {formatINR(calculations.principalAtRepaymentStart)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200">
                  <CardContent>
                    <div className="text-xs text-red-700">
                      {t.totalInterest}
                    </div>
                    <div className="font-semibold text-red-700">
                      {formatINR(calculations.totalInterest)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-12">
          <div className="mb-4 flex flex-wrap justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{t.repaymentSchedule}</h3>
              <p className="text-sm text-slate-500">{t.startsAfter}</p>
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

          <Card>
            <CardContent className="p-0">
              <div className="schedule-wrapper max-h-105 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky top-0 bg-white">
                        {t.month}
                      </TableHead>
                      <TableHead className="sticky top-0 bg-white text-right">
                        {t.principal}
                      </TableHead>
                      <TableHead className="sticky top-0 bg-white text-right">
                        {t.interest}
                      </TableHead>
                      <TableHead className="sticky top-0 bg-white text-right">
                        {t.balance}
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {schedule.map((r) => (
                      <TableRow key={r.month}>
                        <TableCell>{r.month}</TableCell>
                        <TableCell className="text-right">
                          {formatINR(r.principal)}
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          {formatINR(r.interest)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatINR(r.balance)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
