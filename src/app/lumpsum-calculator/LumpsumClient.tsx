'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EMIPieChart from '@/components/EMIPieChart';
import { BookmarkIcon, Share2Icon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface LumpsumLabels {
  investment: string;
  rate: string;
  time: string;
  frequency: string;
  futureVal: string;
  invested: string;
  wealthGained: string;
  quarterly: string;
  monthly: string;
  halfYearly: string;
  yearly: string;
  investmentAmount: string;
  expectedReturn: string;
  timePeriod: string;
  compoundingFreq: string;
  mostCommon: string;
  futureValue: string;
  investedAmount: string;
  totalWealth: string;
  saveCalculation: string;
  shareWhatsApp: string;
  savedPlans: string;
  clearAll: string;
  compounding: string;
}

const DEFAULT_LABELS: LumpsumLabels = {
  investment: 'Investment Amount (₹)',
  rate: 'Expected Return Rate (% p.a.)',
  time: 'Time Period (Years)',
  frequency: 'Compounding Frequency',
  futureVal: 'Future Value',
  invested: 'Invested Amount',
  wealthGained: 'Wealth Gained',
  quarterly: 'Quarterly',
  monthly: 'Monthly',
  halfYearly: 'Half-Yearly',
  yearly: 'Yearly',
  investmentAmount: 'Investment Amount (₹)',
  expectedReturn: 'Expected Return Rate (% p.a.)',
  timePeriod: 'Time Period (Years)',
  compoundingFreq: 'Compounding Frequency',
  mostCommon: 'Most Common',
  futureValue: 'Future Value',
  investedAmount: 'Invested Amount',
  totalWealth: 'Total Wealth Gained',
  saveCalculation: 'Save Calculation',
  shareWhatsApp: 'Share via WhatsApp',
  savedPlans: 'Your Saved Plans',
  clearAll: 'Clear All',
  compounding: 'Compounding:',
};

type CompoundingFreq = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

const FREQUENCY_MAP: Record<CompoundingFreq, number> = {
  monthly: 12,
  quarterly: 4,
  'half-yearly': 2,
  yearly: 1,
};

interface SavedCalculation {
  id: number;
  principal: number;
  rate: number;
  years: number;
  frequency: CompoundingFreq;
  futureValue: number;
  wealth: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function LumpsumClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<LumpsumLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState<CompoundingFreq>('yearly');

  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  // Load saved calculations
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    try {
      const saved = localStorage.getItem('lumpsum_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved lumpsum calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'Lumpsum',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const n = FREQUENCY_MAP[frequency];
    const r = rate / 100;

    let futureValue = principal;
    if (rate > 0 && years > 0) {
      futureValue = principal * Math.pow(1 + r / n, n * years);
    }

    const wealth = futureValue - principal;

    const principalPct =
      futureValue > 0 ? Math.round((principal / futureValue) * 100) : 100;
    const wealthPct = 100 - principalPct;

    return {
      futureValue: Math.round(futureValue),
      wealth: Math.round(wealth),
      principalPct,
      wealthPct,
    };
  }, [principal, rate, years, frequency]);

  /* ---------- HANDLERS ---------- */
  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      principal,
      rate,
      years,
      frequency,
      futureValue: results.futureValue,
      wealth: results.wealth,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem(
        'lumpsum_calculator_history',
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Error saving lumpsum calculation:', error);
    }

    toast.success('Calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lumpsum_calculation_saved', {
        principal,
        rate,
        years,
      });
    }
  };

  const handleShare = () => {
    const message =
      `📈 Lumpsum Investment Calculation\n\n` +
      `Investment: ${formatINR(principal)}\n` +
      `Expected Return: ${rate}% p.a.\n` +
      `Time Period: ${years} years\n` +
      `Compounding: ${frequency.charAt(0).toUpperCase() + frequency.slice(1)}\n\n` +
      `💰 Future Value: ${formatINR(results.futureValue)}\n` +
      `📊 Wealth Gained: ${formatINR(results.wealth)}\n\n` +
      `Calculate yours: https://fincado.com/lumpsum-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lumpsum_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem(
        'lumpsum_calculator_history',
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Error updating lumpsum history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('lumpsum_calculator_history');
    } catch (error) {
      console.error('Error clearing lumpsum history:', error);
    }
    toast.success('All calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setPrincipal(calc.principal);
    setRate(calc.rate);
    setYears(calc.years);
    setFrequency(calc.frequency);
    toast.success('Calculation loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-6">
              <CalculatorField
                label={t.investmentAmount}
                value={principal}
                min={1000}
                max={10000000}
                step={1000}
                onChange={setPrincipal}
              />

              <CalculatorField
                label={t.expectedReturn}
                value={rate}
                min={1}
                max={30}
                step={0.5}
                onChange={setRate}
              />

              <CalculatorField
                label={t.timePeriod}
                value={years}
                min={1}
                max={40}
                step={1}
                onChange={setYears}
              />

              {/* Compounding Frequency */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  {t.compoundingFreq}
                </label>
                <select
                  value={frequency}
                  onChange={(e) =>
                    setFrequency(e.target.value as CompoundingFreq)
                  }
                  className="
                    w-full rounded-md border border-slate-300
                    bg-white px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-lime-500
                  "
                >
                  <option value="monthly">{t.monthly}</option>
                  <option value="quarterly">{t.quarterly}</option>
                  <option value="half-yearly">{t.halfYearly}</option>
                  <option value="yearly">
                    {t.yearly} ({t.mostCommon})
                  </option>
                </select>
              </div>
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={results.principalPct}
                interestPct={results.wealthPct}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-slate-500">{t.futureValue}</div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {formatINR(results.futureValue)}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="text-xs text-slate-500">
                        {t.investedAmount}
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {formatINR(principal)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-lime-200 bg-lime-50">
                    <CardContent className="p-4">
                      <div className="text-xs text-lime-700">
                        {t.totalWealth}
                      </div>
                      <div className="mt-1 font-semibold text-lime-700">
                        +{formatINR(results.wealth)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          {t.saveCalculation}
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          {t.shareWhatsApp}
        </Button>
      </div>

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">{t.savedPlans}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {t.clearAll}
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
                    onClick={() => handleLoad(calc)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          {formatINR(calc.principal)} @ {calc.rate}% for{' '}
                          {calc.years}y
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {t.futureVal}: {formatINR(calc.futureValue)} |{' '}
                          {t.wealthGained}: {formatINR(calc.wealth)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {t.compounding} {calc.frequency}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(calc.date).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(calc.id);
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
    </div>
  );
}
