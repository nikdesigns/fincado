'use client';

import React, { useMemo, useState, useEffect } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BookmarkIcon, Share2Icon, Trash2, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
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

interface SavedCalculation {
  id: number;
  age: number;
  pension: string;
  frequency: Frequency;
  periodicContribution: number;
  totalInvestment: number;
  date: string;
}

type Frequency = 'Monthly' | 'Quarterly' | 'Half-Yearly';

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

/* ---------- DATA ---------- */
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

/* ---------- COMPONENT ---------- */
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

  /* ---------- MAIN STATE ---------- */
  const [joiningAge, setJoiningAge] = useState<number>(25);
  const [pension, setPension] = useState<string>('5000');
  const [frequency, setFrequency] = useState<Frequency>('Monthly');

  /* ---------- COMPARISON MODE STATE ---------- */
  const [comparisonMode, setComparisonMode] = useState(false);
  const [joiningAge2, setJoiningAge2] = useState<number>(30);
  const [pension2, setPension2] = useState<string>('5000');
  const [frequency2, setFrequency2] = useState<Frequency>('Monthly');

  /* ---------- SAVED CALCULATIONS STATE ---------- */
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  /* ---------- LOAD SAVED CALCULATIONS AFTER MOUNT ---------- */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    try {
      const saved = localStorage.getItem('apy_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved calculations:', error);
    }
  }, []);

  /* ---------- TRACK CALCULATOR LOAD ---------- */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'APY',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- MAIN CALCULATION ---------- */
  const calculations = useMemo(() => {
    const retirementAge = 60;
    const years = Math.max(0, retirementAge - joiningAge);
    const months = years * 12;

    const base5000 = APY_BASE_5000[joiningAge] ?? 210;
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
      monthlyBase,
      periodicContribution,
      totalInvestment,
      nomineeCorpus,
      investedPct,
      growthPct: Math.max(0, 100 - investedPct),
    };
  }, [joiningAge, pension, frequency]);

  /* ---------- COMPARISON CALCULATION ---------- */
  const calculations2 = useMemo(() => {
    if (!comparisonMode) return null;

    const retirementAge = 60;
    const years = Math.max(0, retirementAge - joiningAge2);
    const months = years * 12;

    const base5000 = APY_BASE_5000[joiningAge2] ?? 210;
    const pensionVal = parseInt(pension2);
    const scale = pensionVal / 5000;

    const monthlyBase = Math.round(base5000 * scale);

    let periodicContribution = monthlyBase;
    if (frequency2 === 'Quarterly') periodicContribution = monthlyBase * 3;
    if (frequency2 === 'Half-Yearly') periodicContribution = monthlyBase * 6;

    const totalInvestment = monthlyBase * months;
    const nomineeCorpus = Math.round(850000 * scale);

    const investedPct =
      nomineeCorpus > 0
        ? Math.round((totalInvestment / nomineeCorpus) * 100)
        : 0;

    return {
      years,
      monthlyBase,
      periodicContribution,
      totalInvestment,
      nomineeCorpus,
      investedPct,
      growthPct: Math.max(0, 100 - investedPct),
    };
  }, [comparisonMode, joiningAge2, pension2, frequency2]);

  /* ---------- RESET ---------- */
  const resetDefaults = () => {
    setJoiningAge(25);
    setPension('5000');
    setFrequency('Monthly');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apy_reset', {
        calculator_type: 'APY',
      });
    }
  };

  /* ---------- SAVE CALCULATION ---------- */
  const handleSaveCalculation = () => {
    const calculation: SavedCalculation = {
      id: Date.now(),
      age: joiningAge,
      pension: pension,
      frequency: frequency,
      periodicContribution: calculations.periodicContribution,
      totalInvestment: calculations.totalInvestment,
      date: new Date().toISOString(),
    };

    const saved = [...savedCalculations];
    saved.unshift(calculation);
    const trimmed = saved.slice(0, 10);

    setSavedCalculations(trimmed);

    try {
      localStorage.setItem('apy_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('Calculation saved! Access it anytime from your history.');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apy_saved', {
        joining_age: joiningAge,
        pension_amount: pension,
        frequency: frequency,
      });
    }
  };

  /* ---------- DELETE SINGLE CALCULATION ---------- */
  const handleDeleteCalculation = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('apy_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apy_calculation_deleted', {
        calculations_remaining: updated.length,
      });
    }
  };

  /* ---------- CLEAR ALL CALCULATIONS ---------- */
  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('apy_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apy_history_cleared', {
        calculations_cleared: savedCalculations.length,
      });
    }
  };

  /* ---------- SHARE VIA WHATSAPP ---------- */
  const handleShare = () => {
    const message =
      `🏛️ Atal Pension Yojana (APY) Calculation\n\n` +
      `Joining Age: ${joiningAge} years\n` +
      `Desired Pension: ${formatINR(parseInt(pension))}/month\n` +
      `Contribution Frequency: ${frequency}\n\n` +
      `📊 You need to pay: ${formatINR(calculations.periodicContribution)}/${frequency === 'Monthly' ? 'month' : frequency === 'Quarterly' ? 'quarter' : 'half-year'}\n` +
      `💰 Total Investment: ${formatINR(calculations.totalInvestment)}\n` +
      `🎯 Corpus to Nominee: ${formatINR(calculations.nomineeCorpus)}\n\n` +
      `Calculate yours: https://fincado.com/apy-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apy_shared', {
        method: 'whatsapp',
      });
    }
  };

  /* ---------- LOAD SAVED CALCULATION ---------- */
  const handleLoadCalculation = (calc: SavedCalculation) => {
    setJoiningAge(calc.age);
    setPension(calc.pension);
    setFrequency(calc.frequency);
    toast.success('Calculation loaded!');
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="space-y-6">
      {/* ✅ Comparison Mode Toggle */}
      <Card className="border-slate-200 bg-linear-to-r from-blue-50 to-indigo-50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch
                checked={comparisonMode}
                onCheckedChange={setComparisonMode}
                id="comparison-mode"
              />
              <label
                htmlFor="comparison-mode"
                className="text-sm font-semibold text-slate-900 cursor-pointer"
              >
                Compare Two Pension Scenarios
              </label>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">
              Compare different ages or pension amounts
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Main Calculator(s) */}
      {!comparisonMode ? (
        // Single Calculator
        <Card className="border-none shadow-none bg-card">
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* INPUTS */}
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
                      <SelectItem value="Half-Yearly">
                        {t.halfYearly}
                      </SelectItem>
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
                      {calculations.years} {t.years}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.pensionStartsAt}
                    </span>
                    <span className="font-semibold text-foreground">
                      Age 60
                    </span>
                  </div>
                </div>

                <button
                  onClick={resetDefaults}
                  className="text-sm font-medium text-muted-foreground underline hover:text-foreground transition-colors"
                >
                  {t.resetDefaults}
                </button>
              </div>

              {/* VISUALS */}
              <div className="flex flex-col items-center justify-center">
                <EMIPieChart
                  principalPct={calculations.investedPct}
                  interestPct={calculations.growthPct}
                />

                <div className="mt-8 w-full space-y-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      {t.youNeedToPay}
                    </div>
                    <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                      {formatINR(calculations.periodicContribution)}
                      <span className="ml-1 text-lg font-medium text-muted-foreground">
                        {t.per}{' '}
                        {frequency === 'Monthly'
                          ? t.monthly
                          : frequency === 'Quarterly'
                            ? 'Quarter'
                            : 'Half-Year'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-border shadow-none">
                      <CardContent className="p-4">
                        <div className="text-xs text-muted-foreground truncate">
                          {t.totalInvestment}
                        </div>
                        <div className="mt-1 text-lg font-semibold text-foreground">
                          {formatINR(calculations.totalInvestment)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-emerald-100 bg-emerald-50/50 shadow-none">
                      <CardContent className="p-4">
                        <div className="text-xs text-emerald-700 truncate">
                          {t.corpusToNominee}
                        </div>
                        <div className="mt-1 text-lg font-bold text-emerald-800">
                          {formatINR(calculations.nomineeCorpus)}
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
          </CardContent>
        </Card>
      ) : (
        // Comparison Mode - Two Calculators
        <div className="grid md:grid-cols-2 gap-6">
          {/* Calculator 1 */}
          <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                  A
                </span>
                Scenario A - Early Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.joiningAge}
                value={joiningAge}
                min={18}
                max={40}
                step={1}
                onChange={setJoiningAge}
              />

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {t.desiredPension}
                </Label>
                <Select value={pension} onValueChange={setPension}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
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

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {t.contributionFreq}
                </Label>
                <Select
                  value={frequency}
                  onValueChange={(val) => setFrequency(val as Frequency)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">{t.monthly}</SelectItem>
                    <SelectItem value="Quarterly">{t.quarterly}</SelectItem>
                    <SelectItem value="Half-Yearly">{t.halfYearly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t border-emerald-200">
                <div className="text-center">
                  <div className="text-xs text-slate-600">
                    {frequency} Contribution
                  </div>
                  <div className="text-2xl font-bold text-emerald-700 mt-1">
                    {formatINR(calculations.periodicContribution)}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    Total Investment
                  </div>
                  <div className="text-lg font-semibold text-slate-700">
                    {formatINR(calculations.totalInvestment)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculator 2 */}
          <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                  B
                </span>
                Scenario B - Late Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.joiningAge}
                value={joiningAge2}
                min={18}
                max={40}
                step={1}
                onChange={setJoiningAge2}
              />

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {t.desiredPension}
                </Label>
                <Select value={pension2} onValueChange={setPension2}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
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

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {t.contributionFreq}
                </Label>
                <Select
                  value={frequency2}
                  onValueChange={(val) => setFrequency2(val as Frequency)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">{t.monthly}</SelectItem>
                    <SelectItem value="Quarterly">{t.quarterly}</SelectItem>
                    <SelectItem value="Half-Yearly">{t.halfYearly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t border-blue-200">
                <div className="text-center">
                  <div className="text-xs text-slate-600">
                    {frequency2} Contribution
                  </div>
                  <div className="text-2xl font-bold text-blue-700 mt-1">
                    {formatINR(calculations2?.periodicContribution || 0)}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    Total Investment
                  </div>
                  <div className="text-lg font-semibold text-slate-700">
                    {formatINR(calculations2?.totalInvestment || 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ✅ Comparison Summary */}
      {comparisonMode && calculations2 && (
        <Card className="border-purple-200 bg-linear-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-lg">Comparison Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-slate-600 mb-1">
                  Monthly Contribution Difference
                </div>
                <div className="text-xl font-bold text-purple-700">
                  {formatINR(
                    Math.abs(
                      calculations.monthlyBase - calculations2.monthlyBase,
                    ),
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-1">
                  Total Investment Difference
                </div>
                <div className="text-xl font-bold text-purple-700">
                  {formatINR(
                    Math.abs(
                      calculations.totalInvestment -
                        calculations2.totalInvestment,
                    ),
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-1">Better Option</div>
                <div className="text-xl font-bold">
                  {calculations.totalInvestment <
                  calculations2.totalInvestment ? (
                    <span className="text-emerald-600">Scenario A 🏆</span>
                  ) : (
                    <span className="text-blue-600">Scenario B 🏆</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-slate-600 pt-2 border-t">
              💡 Starting earlier means{' '}
              <strong>
                {formatINR(
                  Math.abs(
                    calculations.totalInvestment -
                      calculations2.totalInvestment,
                  ),
                )}
              </strong>{' '}
              less total contribution for the same pension!
            </p>
          </CardContent>
        </Card>
      )}

      {/* ✅ Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSaveCalculation} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Save Calculation
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share via WhatsApp
        </Button>
      </div>

      {/* ✅ Age Impact Simulator */}
      {!comparisonMode && (
        <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="h-5 w-5 text-amber-600" />
              Impact of Joining Age
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">
              See how your monthly contribution changes with different joining
              ages
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[20, 25, 30, 35].map((age) => {
                const base = APY_BASE_5000[age] ?? 210;
                const scale = parseInt(pension) / 5000;
                const monthly = Math.round(base * scale);

                return (
                  <div
                    key={age}
                    className={`p-4 rounded-lg border-2 transition ${
                      age === joiningAge
                        ? 'border-amber-500 bg-amber-100'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="text-xs text-slate-600 mb-1">Age {age}</div>
                    <div className="text-2xl font-bold text-amber-700">
                      {formatINR(monthly)}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">/month</div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-700 mt-4 p-3 bg-white/70 rounded border border-amber-200">
              💡 <strong>Tip:</strong> Joining 5 years earlier can reduce your
              monthly contribution by up to 30-40%!
            </p>
          </CardContent>
        </Card>
      )}

      {/* ✅ Saved Calculations History */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved Calculations</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {savedCalculations.map((calc) => (
                <div
                  key={calc.id}
                  className="group p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition relative"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleLoadCalculation(calc)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          Age {calc.age} | Pension:{' '}
                          {formatINR(parseInt(calc.pension))}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Contribution: {formatINR(calc.periodicContribution)} /{' '}
                          {calc.frequency} | Total:{' '}
                          {formatINR(calc.totalInvestment)}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(calc.date).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCalculation(calc.id);
                    }}
                    className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <p className="mt-10 text-xs text-slate-500">
        Contribution values are based on standard APY charts published by PFRDA
        and participating banks. Actual deductions may vary slightly by bank.
      </p>
    </div>
  );
}
