'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------- LABELS ---------- */
interface CarLoanLabels {
  vehiclePrice: string;
  downPayment: string;
  tradeInValue: string;
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

const DEFAULT_LABELS: CarLoanLabels = {
  vehiclePrice: 'Vehicle Price (₹)',
  downPayment: 'Down Payment (₹)',
  tradeInValue: 'Trade-In Value (₹)',
  interestRate: 'Interest Rate (% p.a)',
  tenure: 'Loan Tenure (Years)',
  monthlyEMI: 'Monthly EMI',
  principal: 'Loan Amount',
  interest: 'Total Interest',
  amortizationSchedule: 'Amortization Schedule',
  yearlyBreakdown: 'Monthly repayment breakdown',
  copy: 'Copy',
  export: 'Export',
  print: 'Print',
  month: 'Month',
  balance: 'Balance',
};

/* ---------- COMPONENT ---------- */
export default function CarLoanClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<CarLoanLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [vehiclePrice, setVehiclePrice] = useState(1500000);
  const [downPayment, setDownPayment] = useState(300000);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(5);

  const loanAmount = Math.max(0, vehiclePrice - downPayment - tradeInValue);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;

    let emi = 0;
    if (loanAmount > 0) {
      if (r === 0) {
        emi = loanAmount / n;
      } else {
        emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - loanAmount;
    const principalPct =
      totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 0;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      principalPct,
      interestPct: 100 - principalPct,
      months: n,
    };
  }, [loanAmount, rate, tenure]);

  /* ---------- AMORTIZATION ---------- */
  const schedule = useMemo(() => {
    let balance = loanAmount;
    const r = rate / 12 / 100;
    const data: {
      month: number;
      principal: number;
      interest: number;
      balance: number;
    }[] = [];

    for (let i = 1; i <= calculations.months; i++) {
      const interest = balance * r;
      let principal = calculations.emi - interest;

      if (balance - principal < 0) principal = balance;
      balance -= principal;

      if (i <= 84) {
        data.push({
          month: i,
          principal,
          interest,
          balance: Math.max(0, balance),
        });
      }
    }
    return data;
  }, [loanAmount, rate, calculations]);

  /* ---------- ACTIONS ---------- */
  const downloadCSV = () => {
    const headers = `${t.month},${t.principal},${t.interest},${t.balance}`;
    const rows = schedule.map(
      (r) =>
        `${r.month},${Math.round(r.principal)},${Math.round(
          r.interest
        )},${Math.round(r.balance)}`
    );
    const csv = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = 'car_loan_schedule.csv';
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

  const printPage = () => window.print();

  /* ---------- RENDER ---------- */
  return (
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-6 sm:p-8">
        {/* INPUTS + VISUALS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* INPUTS */}
          <div className="space-y-6">
            <CalculatorField
              label={t.vehiclePrice}
              value={vehiclePrice}
              min={100000}
              max={10000000}
              step={50000}
              onChange={setVehiclePrice}
            />

            <CalculatorField
              label={t.downPayment}
              value={downPayment}
              min={0}
              max={vehiclePrice}
              step={10000}
              onChange={setDownPayment}
            />

            <CalculatorField
              label={t.tradeInValue}
              value={tradeInValue}
              min={0}
              max={vehiclePrice / 2}
              step={10000}
              onChange={setTradeInValue}
            />

            <CalculatorField
              label={t.interestRate}
              value={rate}
              min={5}
              max={20}
              step={0.1}
              onChange={setRate}
            />

            <CalculatorField
              label={t.tenure}
              value={tenure}
              min={1}
              max={10}
              step={1}
              onChange={setTenure}
            />
          </div>

          {/* VISUALS */}
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
                      {formatINR(loanAmount)}
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
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t.amortizationSchedule}
              </h3>
              <p className="text-sm text-slate-500">{t.yearlyBreakdown}</p>
            </div>

            <div className="flex gap-2 no-print">
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                {t.copy}
              </Button>
              <Button size="sm" variant="outline" onClick={downloadCSV}>
                {t.export}
              </Button>
              <Button size="sm" variant="outline" onClick={printPage}>
                {t.print}
              </Button>
            </div>
          </div>

          <div className="schedule-wrapper relative max-h-105 overflow-y-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-slate-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left">{t.month}</th>
                  <th className="px-3 py-2 text-right">{t.principal}</th>
                  <th className="px-3 py-2 text-right">{t.interest}</th>
                  <th className="px-3 py-2 text-right">{t.balance}</th>
                </tr>
              </thead>

              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month} className="border-b last:border-0">
                    <td className="px-3 py-2 text-slate-500">{row.month}</td>
                    <td className="px-3 py-2 text-right font-medium">
                      {formatINR(Math.round(row.principal))}
                    </td>
                    <td className="px-3 py-2 text-right text-red-600">
                      {formatINR(Math.round(row.interest))}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-900">
                      {formatINR(Math.round(row.balance))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Showing first {schedule.length} months. Download CSV for full
            timeline.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
