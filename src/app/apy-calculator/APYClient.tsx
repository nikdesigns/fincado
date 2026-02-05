'use client';

import React, { useMemo, useState } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

/* ------------------ TYPES ------------------ */
export interface APYLabels {
  joiningAge: string;
  desiredPension: string;
  contributionFreq: string;
  contributionYears: string;
  pensionStartsAt: string;
  resetDefaults: string;
  youNeedToPay: string;
  totalInvestment: string;
  corpusToNominee: string;
  guaranteedPension: string;
  forSpouse: string;
  per: string;
  monthly: string;
  quarterly: string;
  halfYearly: string;
  years: string;
}

interface APYClientProps {
  labels?: APYLabels;
}

/* ------------------ HELPERS ------------------ */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ------------------ DATA ------------------ */
// Approx monthly contribution for ₹5,000 pension based on age
const APY_BASE_5000: Record<number, number> = {
  18: 210,
  19: 228,
  20: 248,
  21: 269,
  22: 292,
  23: 318,
  24: 346,
  25: 376,
  26: 409,
  27: 446,
  28: 485,
  29: 529,
  30: 577,
  31: 630,
  32: 689,
  33: 752,
  34: 824,
  35: 902,
  36: 990,
  37: 1087,
  38: 1196,
  39: 1318,
  40: 1454,
};

const PENSION_SLABS = [1000, 2000, 3000, 4000, 5000];
type Frequency = 'Monthly' | 'Quarterly' | 'Half-Yearly';

/* ------------------ COMPONENT ------------------ */

export default function APYClient({ labels }: APYClientProps) {
  /* ---------- LABELS FALLBACK ---------- */
  const t: APYLabels = labels || {
    joiningAge: 'Joining Age (18–40 years)',
    desiredPension: 'Desired Monthly Pension (₹)',
    contributionFreq: 'Contribution Frequency',
    contributionYears: 'Contribution Years',
    pensionStartsAt: 'Pension Starts',
    resetDefaults: 'Reset defaults',
    youNeedToPay: 'You need to pay',
    totalInvestment: 'Total Investment',
    corpusToNominee: 'Corpus to Nominee',
    guaranteedPension: 'Guaranteed Monthly Pension',
    forSpouse: '(for you & spouse)',
    per: '/',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    halfYearly: 'Half-Yearly',
    years: 'years',
  };

  /* ---------- STATE ---------- */
  const [joiningAge, setJoiningAge] = useState<number>(25);
  const [pension, setPension] = useState<string>('5000');
  const [frequency, setFrequency] = useState<Frequency>('Monthly');

  /* ---------- CALCULATION ---------- */
  const result = useMemo(() => {
    const retirementAge = 60;
    const years = Math.max(0, retirementAge - joiningAge);
    const months = years * 12;

    const base5000 = APY_BASE_5000[joiningAge] ?? 210; // Fallback to min
    const pensionVal = parseInt(pension);
    const scale = pensionVal / 5000;

    const monthlyBase = Math.round(base5000 * scale);

    let periodicContribution = monthlyBase;
    if (frequency === 'Quarterly') periodicContribution = monthlyBase * 3;
    if (frequency === 'Half-Yearly') periodicContribution = monthlyBase * 6;

    const totalInvestment = monthlyBase * months;
    const nomineeCorpus = Math.round(850000 * scale);

    const investedPct =
      nomineeCorpus > 0
        ? Math.round((totalInvestment / nomineeCorpus) * 100)
        : 0;

    return {
      years,
      periodicContribution,
      totalInvestment,
      nomineeCorpus,
      investedPct,
      growthPct: Math.max(0, 100 - investedPct),
    };
  }, [joiningAge, pension, frequency]);

  /* ---------- RESET ---------- */
  const resetDefaults = () => {
    setJoiningAge(25);
    setPension('5000');
    setFrequency('Monthly');
  };

  /* ------------------ UI ------------------ */
  return (
    <Card className="border-border shadow-sm bg-card">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ================= INPUTS ================= */}
          <div className="space-y-8">
            <CalculatorField
              label={t.joiningAge}
              value={joiningAge}
              min={18}
              max={40}
              step={1}
              onChange={setJoiningAge}
            />

            {/* Pension Slab */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                {t.desiredPension}
              </Label>
              <Select value={pension} onValueChange={setPension}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Pension" />
                </SelectTrigger>
                <SelectContent>
                  {PENSION_SLABS.map((v) => (
                    <SelectItem key={v} value={v.toString()}>
                      {formatINR(v)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Frequency */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                {t.contributionFreq}
              </Label>
              <Select
                value={frequency}
                onValueChange={(val) => setFrequency(val as Frequency)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">{t.monthly}</SelectItem>
                  <SelectItem value="Quarterly">{t.quarterly}</SelectItem>
                  <SelectItem value="Half-Yearly">{t.halfYearly}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Info Box */}
            <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t.contributionYears}
                </span>
                <span className="font-semibold text-foreground">
                  {result.years} {t.years}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t.pensionStartsAt}
                </span>
                <span className="font-semibold text-foreground">Age 60</span>
              </div>
            </div>

            <button
              onClick={resetDefaults}
              className="text-sm font-medium text-muted-foreground underline hover:text-foreground transition-colors"
            >
              {t.resetDefaults}
            </button>
          </div>

          {/* ================= VISUALS ================= */}
          <div className="flex flex-col items-center justify-center">
            <EMIPieChart
              principalPct={result.investedPct}
              interestPct={result.growthPct}
              size={220}
            />

            <div className="mt-8 w-full space-y-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  {t.youNeedToPay}
                </div>
                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {formatINR(result.periodicContribution)}
                  <span className="ml-1 text-lg font-medium text-muted-foreground">
                    {t.per} {frequency === 'Monthly' ? t.monthly : frequency}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="border-border shadow-none">
                  <CardContent>
                    <div className="text-xs text-muted-foreground truncate">
                      {t.totalInvestment}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-foreground">
                      {formatINR(result.totalInvestment)}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-emerald-100 bg-emerald-50/50 shadow-none">
                  <CardContent>
                    <div className="text-xs text-emerald-700 truncate">
                      {t.corpusToNominee}
                    </div>
                    <div className="mt-1 text-lg font-bold text-emerald-800">
                      {formatINR(result.nomineeCorpus)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-xl border border-lime-200 bg-lime-50 p-4 text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-lime-700">
                  {t.guaranteedPension}
                </div>
                <div className="mt-1 text-2xl font-black text-lime-900">
                  {formatINR(parseInt(pension))}
                </div>
                <div className="text-xs text-lime-600">{t.forSpouse}</div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-slate-500">
          Contribution values are based on standard APY charts published by
          PFRDA and participating banks. Actual deductions may vary slightly by
          bank.
        </p>
      </CardContent>
    </Card>
  );
}
