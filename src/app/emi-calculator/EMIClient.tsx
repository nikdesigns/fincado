'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent } from '@/components/ui/card';

/* ---------- TYPES ---------- */
interface LabelConfig {
  loanAmount: string;
  rate: string;
  tenure: string;
  monthlyEMI: string;
  principal: string;
  totalInterest: string;
}

interface EMIClientProps {
  labels?: LabelConfig;
  defaultRate?: number;
  defaultPrincipal?: number; // ✅ Passed from Parent
  defaultTenure?: number; // ✅ Passed from Parent
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

/* ---------- COMPONENT ---------- */
export default function EMIClient({
  labels,
  defaultRate = 8.5, // Set default directly here
  defaultPrincipal = 5000000, // Default fallback if no city data
  defaultTenure = 20, // Default fallback
}: EMIClientProps) {
  // ✅ NOW USING THE PROPS TO INITIALIZE STATE
  const [amount, setAmount] = useState(defaultPrincipal);
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenure);

  const t: LabelConfig = labels || {
    loanAmount: 'Loan Amount (₹)',
    rate: 'Interest Rate (% p.a)',
    tenure: 'Loan Tenure (Years)',
    monthlyEMI: 'Monthly EMI',
    principal: 'Principal Amount',
    totalInterest: 'Total Interest',
  };

  const calculations = useMemo(() => {
    // Prevent division by zero
    if (tenure === 0)
      return { emi: 0, totalInterest: 0, principalPct: 0, interestPct: 0 };

    const r = rate / 12 / 100;
    const n = tenure * 12;

    let emi = 0;
    if (rate === 0) {
      emi = amount / n;
    } else {
      emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    // Safety check for Infinity/NaN
    if (!isFinite(emi)) emi = 0;

    const totalPayment = emi * n;
    const totalInterest = totalPayment - amount;

    // Avoid NaN in percentages
    const principalPct =
      totalPayment > 0 ? Math.round((amount / totalPayment) * 100) : 0;
    const interestPct = 100 - principalPct;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      principalPct,
      interestPct,
    };
  }, [amount, rate, tenure]);

  return (
    <Card className="border-none shadow-none bg-card">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* INPUTS */}
          <div className="space-y-6">
            <CalculatorField
              label={t.loanAmount}
              value={amount}
              min={100000}
              max={20000000} // Increased max for expensive cities (Mumbai)
              step={50000}
              onChange={setAmount}
            />

            <CalculatorField
              label={t.rate}
              value={rate}
              min={1}
              max={20}
              step={0.1}
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

          {/* VISUALS */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={calculations.principalPct}
              interestPct={calculations.interestPct}
            />

            <div className="mt-6 text-center">
              <div className="text-sm text-muted-foreground">
                {t.monthlyEMI}
              </div>

              <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-700">
                {formatINR(calculations.emi)}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm text-left">
                <Card className="border-border">
                  <CardContent>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {t.principal}
                    </div>
                    <div className="mt-1 font-semibold text-foreground whitespace-nowrap">
                      {formatINR(amount)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900">
                  <CardContent>
                    <div className="text-xs text-red-700 dark:text-red-400">
                      {t.totalInterest}
                    </div>
                    <div className="mt-1 font-semibold text-red-700 dark:text-red-400 whitespace-nowrap">
                      +{formatINR(calculations.totalInterest)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
