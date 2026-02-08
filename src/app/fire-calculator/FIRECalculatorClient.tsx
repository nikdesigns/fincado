'use client';

import React, { useMemo, useState, useEffect } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, Share2Icon, Trash2, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

// Helper
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

// Define the shape of the labels object
interface LabelConfig {
  currentAge: string;
  fireAge: string;
  currentAnnualExpense: string;
  currentCorpus: string;
  advancedAssumptions: string;
  inflation: string;
  returnRate: string;
  safeWithdrawalRate: string;
  multiplier: string;
  recommendedSWR: string;
  resetDefaults: string;
  fireNumber: string;
  monthlySavingsNeeded: string;
  perMonth: string;
  futureAnnualExp: string;
  currentCorpusFV: string;
}

interface FIRECalculatorClientProps {
  labels?: LabelConfig;
}

interface SavedCalculation {
  id: number;
  currentAge: number;
  fireAge: number;
  annualExpense: number;
  currentCorpus: number;
  fireNumber: number;
  monthlySIP: number;
  date: string;
}

export default function FIRECalculatorClient({
  labels,
}: FIRECalculatorClientProps) {
  // --- STATE ---
  const [currentAge, setCurrentAge] = useState(30);
  const [fireAge, setFireAge] = useState(45);
  const [annualExpense, setAnnualExpense] = useState(1_000_000);
  const [currentCorpus, setCurrentCorpus] = useState(2_000_000);

  const [inflation, setInflation] = useState(6);
  const [returnRate, setReturnRate] = useState(12);
  const [swr, setSwr] = useState(3.5);

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
      const saved = localStorage.getItem('fire_history');
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
        calculator_type: 'FIRE',
        page_path: window.location.pathname,
      });
    }
  }, []);

  // --- DEFAULT LABELS (English) ---
  const t: LabelConfig = labels || {
    currentAge: 'Current Age',
    fireAge: 'Target FIRE Age',
    currentAnnualExpense: 'Current Annual Expense (₹)',
    currentCorpus: 'Current Savings / Corpus (₹)',
    advancedAssumptions: 'Advanced Assumptions',
    inflation: 'Inflation Rate (%)',
    returnRate: 'Expected Return (%)',
    safeWithdrawalRate: 'Safe Withdrawal Rate (%)',
    multiplier: 'Expense Multiplier',
    recommendedSWR: 'Recommended for India: 3–3.5%',
    resetDefaults: 'Reset Defaults',
    fireNumber: 'Your FIRE Number',
    monthlySavingsNeeded: 'Monthly Savings Needed',
    perMonth: '/mo',
    futureAnnualExp: 'Future Annual Expense',
    currentCorpusFV: 'Current Corpus FV',
  };

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    const yearsToFire = Math.max(1, fireAge - currentAge);
    const months = yearsToFire * 12;

    const futureExpense = Math.round(
      annualExpense * Math.pow(1 + inflation / 100, yearsToFire),
    );

    const multiplierVal = 100 / swr;
    const fireNumber = Math.round(futureExpense * multiplierVal);

    const monthlyRate = returnRate / 12 / 100;
    const futureCorpus = Math.round(
      currentCorpus * Math.pow(1 + monthlyRate, months),
    );

    const gap = Math.max(0, fireNumber - futureCorpus);

    let monthlySIP = 0;
    if (gap > 0) {
      const factor =
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
      monthlySIP = Math.round(gap / factor);
    }

    const achievedPct =
      fireNumber > 0
        ? Math.min(100, Math.round((futureCorpus / fireNumber) * 100))
        : 0;

    return {
      yearsToFire,
      futureExpense,
      fireNumber,
      futureCorpus,
      monthlySIP,
      achievedPct,
      gapPct: 100 - achievedPct,
      multiplier: multiplierVal.toFixed(1),
    };
  }, [
    currentAge,
    fireAge,
    annualExpense,
    currentCorpus,
    inflation,
    returnRate,
    swr
  ]);

  const reset = () => {
    setCurrentAge(30);
    setFireAge(45);
    setAnnualExpense(1_000_000);
    setCurrentCorpus(2_000_000);
    setInflation(6);
    setReturnRate(12);
    setSwr(3.5);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'fire_reset', {
        calculator_type: 'FIRE',
      });
    }
  };

  /* ---------- SAVE CALCULATION ---------- */
  const handleSaveCalculation = () => {
    const calculation: SavedCalculation = {
      id: Date.now(),
      currentAge: currentAge,
      fireAge: fireAge,
      annualExpense: annualExpense,
      currentCorpus: currentCorpus,
      fireNumber: results.fireNumber,
      monthlySIP: results.monthlySIP,
      date: new Date().toISOString(),
    };

    const saved = [...savedCalculations];
    saved.unshift(calculation);
    const trimmed = saved.slice(0, 10);

    setSavedCalculations(trimmed);

    try {
      localStorage.setItem('fire_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('Calculation saved! Access it anytime from your history.');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'fire_saved', {
        current_age: currentAge,
        fire_age: fireAge,
        fire_number: results.fireNumber,
      });
    }
  };

  /* ---------- DELETE SINGLE CALCULATION ---------- */
  const handleDeleteCalculation = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('fire_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');
  };

  /* ---------- CLEAR ALL CALCULATIONS ---------- */
  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('fire_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');
  };

  /* ---------- SHARE VIA WHATSAPP ---------- */
  const handleShare = () => {
    const message =
      `🔥 FIRE Calculator Results\\n\\n` +
      `Current Age: ${currentAge} years\\n` +
      `Target FIRE Age: ${fireAge} years\\n` +
      `Current Annual Expense: ${formatINR(annualExpense)}\\n\\n` +
      `📊 Your FIRE Number: ${formatINR(results.fireNumber)}\\n` +
      `💰 Monthly SIP Needed: ${formatINR(results.monthlySIP)}\\n` +
      `📈 Future Annual Expense: ${formatINR(results.futureExpense)}\\n\\n` +
      `Calculate yours: https://fincado.com/fire-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'fire_shared', {
        method: 'whatsapp',
      });
    }
  };

  /* ---------- LOAD SAVED CALCULATION ---------- */
  const handleLoadCalculation = (calc: SavedCalculation) => {
    setCurrentAge(calc.currentAge);
    setFireAge(calc.fireAge);
    setAnnualExpense(calc.annualExpense);
    setCurrentCorpus(calc.currentCorpus);
    toast.success('Calculation loaded!');
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-none bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT */}
            <div className="space-y-6">
              <CalculatorField
                label={t.currentAge}
                value={currentAge}
                min={18}
                max={fireAge - 1}
                step={1}
                onChange={setCurrentAge}
              />

              <CalculatorField
                label={t.fireAge}
                value={fireAge}
                min={currentAge + 1}
                max={70}
                step={1}
                onChange={setFireAge}
              />

              <CalculatorField
                label={t.currentAnnualExpense}
                value={annualExpense}
                min={300000}
                max={5000000}
                step={50000}
                onChange={setAnnualExpense}
              />

              <CalculatorField
                label={t.currentCorpus}
                value={currentCorpus}
                min={0}
                max={50000000}
                step={100000}
                onChange={setCurrentCorpus}
              />

              <details className="rounded-lg border border-border bg-muted/30 p-4">
                <summary className="cursor-pointer text-sm font-medium text-foreground">
                  {t.advancedAssumptions}
                </summary>

                <div className="mt-4 space-y-4">
                  <CalculatorField
                    label={t.inflation}
                    value={inflation}
                    min={3}
                    max={10}
                    step={0.1}
                    onChange={setInflation}
                  />

                  <CalculatorField
                    label={t.returnRate}
                    value={returnRate}
                    min={6}
                    max={15}
                    step={0.1}
                    onChange={setReturnRate}
                  />

                  <CalculatorField
                    label={t.safeWithdrawalRate}
                    value={swr}
                    min={2}
                    max={6}
                    step={0.1}
                    onChange={setSwr}
                  />

                  <p className="text-xs text-muted-foreground">
                    {t.multiplier} ≈ {results.multiplier}× · {t.recommendedSWR}
                  </p>
                </div>
              </details>

              <button
                onClick={reset}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                {t.resetDefaults}
              </button>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={results.achievedPct}
                interestPct={results.gapPct}
                size={220}
              />

              <div className="mt-8 w-full space-y-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    {t.fireNumber}
                  </div>
                  <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                    {formatINR(results.fireNumber)}
                  </div>
                </div>

                <div className="rounded-xl border-2 border-lime-200 bg-lime-50 p-4 text-center">
                  <div className="text-xs font-semibold text-lime-700">
                    {t.monthlySavingsNeeded}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-lime-700">
                    {formatINR(results.monthlySIP)}
                    <span className="text-base font-normal"> {t.perMonth}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-border shadow-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground truncate">
                        {t.futureAnnualExp}
                      </div>
                      <div className="mt-1 text-lg font-semibold text-red-600">
                        {formatINR(results.futureExpense)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-100 bg-emerald-50/50 shadow-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-emerald-700 truncate">
                        {t.currentCorpusFV}
                      </div>
                      <div className="mt-1 text-lg font-bold text-emerald-800">
                        {formatINR(results.futureCorpus)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {swr > 4 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-700">
                      ⚠ <strong>Warning:</strong> SWR above 4% significantly
                      increases risk in long retirements.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* ✅ FIRE Timeline Visualization */}
      <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Your FIRE Journey Timeline
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-purple-200">
              <div>
                <div className="text-sm text-slate-600">Years to FIRE</div>
                <div className="text-3xl font-bold text-purple-700">
                  {results.yearsToFire} years
                </div>
              </div>
              <div className="text-4xl">🎯</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="text-xs text-slate-600">Starting Point</div>
                <div className="text-lg font-semibold">Age {currentAge}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {formatINR(currentCorpus)} corpus
                </div>
              </div>

              <div className="p-3 bg-linear-to-br from-lime-50 to-emerald-50 rounded-lg border-2 border-lime-300">
                <div className="text-xs text-lime-700 font-semibold">
                  FIRE Goal
                </div>
                <div className="text-lg font-bold text-lime-700">
                  Age {fireAge}
                </div>
                <div className="text-xs text-lime-600 mt-1">
                  {formatINR(results.fireNumber)} needed
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-slate-700">
                <strong>Progress:</strong> You&apos;re currently{' '}
                {results.achievedPct}% towards your FIRE goal. Keep investing{' '}
                {formatINR(results.monthlySIP)}/month to reach financial
                independence by age {fireAge}!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Saved Calculations History */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved Scenarios</CardTitle>
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
                          Age {calc.currentAge} → {calc.fireAge} | FIRE Number:{' '}
                          {formatINR(calc.fireNumber)}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Monthly SIP: {formatINR(calc.monthlySIP)} | Annual
                          Expense: {formatINR(calc.annualExpense)}
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

      <p className="mt-6 text-xs text-slate-500">
        FIRE calculations are estimates based on assumptions of inflation,
        returns, and withdrawal rates. Market volatility, sequence-of-returns
        risk, and personal circumstances can significantly impact outcomes.
        Always maintain an emergency fund and health insurance separately.
      </p>
    </div>
  );
}
