'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/* ---------------- LABELS ---------------- */

interface CreditScoreLabels {
  onTimePayments: string;
  creditUtilization: string;
  avgAge: string;
  activeAccounts: string;
  recentEnquiries: string;
  loanMix: string;
  hasDefaults: string;
  hasSettlements: string;
  estimatedScore: string;
  improveSimulator: string;
  totalCardLimit: string;
  payDownAmount: string;
  newUtil: string;
  noChange: string;
  points: string;
  priorityActions: string;
  disclaimer: string;
}

const DEFAULT_LABELS: CreditScoreLabels = {
  onTimePayments: 'On-Time Payments (%)',
  creditUtilization: 'Credit Utilization (%)',
  avgAge: 'Average Account Age (Years)',
  activeAccounts: 'Active Credit Accounts',
  recentEnquiries: 'Recent Enquiries (Last 6 Months)',
  loanMix: 'Installment Loan Mix (%)',
  hasDefaults: 'Any Defaults?',
  hasSettlements: 'Any Settlements?',
  estimatedScore: 'Estimated Credit Score',
  improveSimulator: 'Improve Score Simulator',
  totalCardLimit: 'Total Card Limit (₹)',
  payDownAmount: 'Pay Down Amount (₹)',
  newUtil: 'New Utilization',
  noChange: 'No Change',
  points: 'points',
  priorityActions: 'Priority Actions',
  disclaimer:
    '*This is an estimated score for educational purposes. Actual CIBIL / Experian scores may vary.',
};

/* ---------------- COMPONENT ---------------- */

export default function CreditScoreClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<CreditScoreLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------------- STATE ---------------- */

  const [onTimePayments, setOnTimePayments] = useState(95);
  const [utilization, setUtilization] = useState(45);
  const [avgAge, setAvgAge] = useState(5);
  const [accounts, setAccounts] = useState(3);
  const [enquiries, setEnquiries] = useState(2);
  const [loanMix, setLoanMix] = useState(50);

  const [hasDefaults, setHasDefaults] = useState(false);
  const [hasSettlements, setHasSettlements] = useState(false);

  const [totalLimit, setTotalLimit] = useState(200000);
  const [payDown, setPayDown] = useState(0);

  /* ---------------- SCORE CALC ---------------- */

  const getScoreColorClass = (score: number) => {
    if (score >= 750) return 'text-emerald-600';
    if (score >= 650) return 'text-orange-500';
    return 'text-red-600';
  };

  const score = useMemo(() => {
    let s = 300;

    s += Math.round((onTimePayments / 100) * 210);

    if (utilization <= 20) s += 180;
    else s += Math.max(0, Math.round(180 * (1 - (utilization - 20) / 80)));

    s += Math.min(90, Math.round((avgAge / 10) * 90));
    s -= Math.min(60, enquiries * 6);
    s += Math.round((loanMix / 100) * 60);

    if (accounts >= 1 && accounts <= 5) s += 20;
    if (hasDefaults) s -= 150;
    if (hasSettlements) s -= 80;

    return Math.max(300, Math.min(900, s));
  }, [
    onTimePayments,
    utilization,
    avgAge,
    enquiries,
    loanMix,
    accounts,
    hasDefaults,
    hasSettlements,
  ]);

  const scoreLabel =
    score >= 750 ? 'Excellent' : score >= 650 ? 'Good' : 'Poor';

  /* ---------------- PAYDOWN SIM ---------------- */

  const newUtil = useMemo(() => {
    const balance = (utilization / 100) * totalLimit;
    const newBal = Math.max(0, balance - payDown);
    return totalLimit > 0 ? Math.round((newBal / totalLimit) * 100) : 0;
  }, [utilization, totalLimit, payDown]);

  /* ---------------- UI ---------------- */

  return (
    <Card className="calculator-card">
      <CardContent className="calc-grid">
        {/* -------- INPUTS -------- */}
        <div className="calc-inputs space-y-5">
          <CalculatorField
            label={t.onTimePayments}
            value={onTimePayments}
            min={0}
            max={100}
            step={1}
            onChange={setOnTimePayments}
          />

          <CalculatorField
            label={t.creditUtilization}
            value={utilization}
            min={0}
            max={100}
            step={1}
            onChange={setUtilization}
          />

          <CalculatorField
            label={t.avgAge}
            value={avgAge}
            min={0}
            max={30}
            step={1}
            onChange={setAvgAge}
          />

          <CalculatorField
            label={t.activeAccounts}
            value={accounts}
            min={0}
            max={20}
            step={1}
            onChange={setAccounts}
          />

          <CalculatorField
            label={t.recentEnquiries}
            value={enquiries}
            min={0}
            max={20}
            step={1}
            onChange={setEnquiries}
          />

          <CalculatorField
            label={t.loanMix}
            value={loanMix}
            min={0}
            max={100}
            step={5}
            onChange={setLoanMix}
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={hasDefaults}
                onChange={(e) => setHasDefaults(e.target.checked)}
              />
              {t.hasDefaults}
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={hasSettlements}
                onChange={(e) => setHasSettlements(e.target.checked)}
              />
              {t.hasSettlements}
            </label>
          </div>
        </div>

        {/* -------- RESULTS -------- */}
        <div className="calc-visuals space-y-6">
          <Card className="p-6 text-center">
            <div className="text-sm text-slate-500 mb-1">
              {t.estimatedScore}
            </div>

            <div
              className={`text-5xl font-extrabold leading-none ${getScoreColorClass(
                score
              )}`}
            >
              {score}
            </div>

            <div className="mt-3 flex justify-center">
              <Badge
                className={
                  score >= 750
                    ? 'bg-emerald-100 text-emerald-700'
                    : score >= 650
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-red-100 text-red-700'
                }
              >
                {scoreLabel}
              </Badge>
            </div>
          </Card>

          <Card className="p-5 bg-slate-50">
            <div className="font-semibold mb-4">{t.improveSimulator}</div>

            <CalculatorField
              label={t.totalCardLimit}
              value={totalLimit}
              min={0}
              max={5000000}
              step={10000}
              onChange={setTotalLimit}
            />

            <CalculatorField
              label={t.payDownAmount}
              value={payDown}
              min={0}
              max={totalLimit}
              step={5000}
              onChange={setPayDown}
            />

            <div className="flex justify-between text-sm mt-2">
              <span>
                {t.newUtil}: <strong>{newUtil}%</strong>
              </span>
              <span className="text-emerald-600 font-semibold">
                {newUtil < utilization ? `+${t.points}` : t.noChange}
              </span>
            </div>
          </Card>

          <p className="text-xs text-slate-500">{t.disclaimer}</p>
        </div>
      </CardContent>
    </Card>
  );
}
