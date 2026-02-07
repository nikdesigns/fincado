'use client';

import React, { useMemo, useState, useEffect } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  RefreshCcw,
  Wallet,
  Coins,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Calculator,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

/* ---------- TYPES ---------- */
interface SavedCalculation {
  id: number;
  contribution: number;
  currentAge: number;
  roi: number;
  annuityRate: number;
  corpus: number;
  lumpSum: number;
  monthlyPension: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function NPSClient() {
  /* ---------- STATE ---------- */
  const [contribution, setContribution] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [roi, setRoi] = useState(10);
  const [annuityRate, setAnnuityRate] = useState(6);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  // Load saved calculations
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    try {
      const saved = localStorage.getItem('nps_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved NPS calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'NPS',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const retirementAge = 60;

    // Safety check
    if (currentAge >= retirementAge) {
      return {
        corpus: 0,
        invested: 0,
        gains: 0,
        lumpSum: 0,
        monthlyPension: 0,
        investedPct: 0,
        gainsPct: 0,
        yearsToRetirement: 0,
        annuityCorpus: 0,
      };
    }

    const years = retirementAge - currentAge;
    const months = years * 12;
    const monthlyRate = roi / 12 / 100;

    let corpus = 0;
    const invested = contribution * months;

    // Future Value of SIP Formula
    if (monthlyRate === 0) {
      corpus = invested;
    } else {
      corpus =
        contribution *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }

    const gains = Math.max(0, corpus - invested);

    // 60% Withdrawal (Tax Free)
    const lumpSum = Math.round(corpus * 0.6);

    // 40% Annuity Investment
    const annuityCorpus = Math.round(corpus * 0.4);

    // Monthly Pension based on annuity rate
    const monthlyPension = Math.round(annuityCorpus * (annuityRate / 100 / 12));

    const corpusRounded = Math.round(corpus);
    const investedPct =
      corpusRounded > 0 ? Math.round((invested / corpusRounded) * 100) : 0;
    const gainsPct = 100 - investedPct;

    return {
      corpus: corpusRounded,
      invested: Math.round(invested),
      gains: Math.round(gains),
      lumpSum,
      monthlyPension,
      investedPct,
      gainsPct,
      yearsToRetirement: years,
      annuityCorpus,
    };
  }, [contribution, currentAge, roi, annuityRate]);

  /* ---------- HANDLERS ---------- */
  const handleReset = () => {
    setContribution(5000);
    setCurrentAge(30);
    setRoi(10);
    setAnnuityRate(6);
    toast.success('Calculator reset to defaults!');
  };

  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      contribution,
      currentAge,
      roi,
      annuityRate,
      corpus: calculations.corpus,
      lumpSum: calculations.lumpSum,
      monthlyPension: calculations.monthlyPension,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('nps_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving NPS calculation:', error);
    }

    toast.success('NPS plan saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'nps_calculation_saved', {
        current_age: currentAge,
        contribution: contribution,
        corpus: calculations.corpus,
      });
    }
  };

  const handleShare = () => {
    const message =
      `💼 National Pension System (NPS) Calculation\n\n` +
      `Monthly Investment: ${formatINR(contribution)}\n` +
      `Current Age: ${currentAge} | Retirement: 60\n` +
      `Expected Return: ${roi}% p.a. | Annuity: ${annuityRate}%\n\n` +
      `📊 At Retirement (Age 60):\n` +
      `Total Corpus: ${formatINR(calculations.corpus)}\n` +
      `Total Invested: ${formatINR(calculations.invested)}\n` +
      `Total Gains: ${formatINR(calculations.gains)}\n\n` +
      `💰 Withdrawal (60:40 Rule):\n` +
      `Lump Sum (Tax-Free): ${formatINR(calculations.lumpSum)}\n` +
      `Monthly Pension: ${formatINR(calculations.monthlyPension)}\n\n` +
      `Plan your NPS: https://fincado.com/nps-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'nps_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('nps_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating NPS history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('nps_calculator_history');
    } catch (error) {
      console.error('Error clearing NPS history:', error);
    }
    toast.success('All NPS calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setContribution(calc.contribution);
    setCurrentAge(calc.currentAge);
    setRoi(calc.roi);
    setAnnuityRate(calc.annuityRate);
    toast.success('NPS plan loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Age Warning */}
      {currentAge >= 60 && (
        <Alert className="border-amber-200 bg-amber-50">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertDescription className="ml-2 text-sm text-amber-800">
            <strong>Note:</strong> NPS retirement age is 60. Please set current
            age below 60 to see accurate calculations.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              National Pension System (NPS) Calculator
            </CardTitle>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-6">
              <CalculatorField
                label="Monthly Investment (₹)"
                value={contribution}
                min={500}
                max={150000}
                step={500}
                onChange={setContribution}
              />

              <CalculatorField
                label="Current Age (Years)"
                value={currentAge}
                min={18}
                max={59}
                step={1}
                onChange={setCurrentAge}
              />

              <CalculatorField
                label="Expected Return (% p.a.)"
                value={roi}
                min={5}
                max={15}
                step={0.5}
                onChange={setRoi}
              />

              {/* Advanced Toggle */}
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  <Calculator className="mr-2 h-3 w-3" />
                  {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                </Button>
              </div>

              {showAdvanced && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <CalculatorField
                    label="Annuity Rate (% p.a.)"
                    value={annuityRate}
                    min={4}
                    max={10}
                    step={0.5}
                    onChange={setAnnuityRate}
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Expected return from annuity for monthly pension calculation
                  </p>
                </div>
              )}
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={calculations.investedPct}
                interestPct={calculations.gainsPct}
                size={200}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-slate-500">
                  Total Corpus at Age 60
                </div>
                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {formatINR(calculations.corpus)}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  In {calculations.yearsToRetirement} years
                </div>
              </div>

              {/* Summary Cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-4">
                    <div className="text-xs text-slate-500">Total Invested</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(calculations.invested)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-lime-50 shadow-none">
                  <CardContent className="p-4">
                    <div className="text-xs text-lime-700">Total Gains</div>
                    <div className="mt-1 font-semibold text-lime-700">
                      +{formatINR(calculations.gains)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Withdrawal Split */}
              <div className="mt-6 border-t border-slate-100 pt-6 w-full">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">
                  Withdrawal Distribution (60:40 Rule)
                </p>
                <div className="grid grid-cols-2 gap-4 text-left">
                  {/* Lump Sum */}
                  <div className="flex flex-col gap-1 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Wallet className="w-4 h-4" />
                      <span className="text-xs font-semibold">
                        Lump Sum (60%)
                      </span>
                    </div>
                    <span className="text-lg font-bold text-emerald-900">
                      {formatINR(calculations.lumpSum)}
                    </span>
                    <Badge
                      variant="outline"
                      className="w-fit text-[10px] border-emerald-300 text-emerald-700 bg-white"
                    >
                      Tax Free
                    </Badge>
                  </div>

                  {/* Pension */}
                  <div className="flex flex-col gap-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-1.5 text-blue-700">
                      <Coins className="w-4 h-4" />
                      <span className="text-xs font-semibold">
                        Monthly Pension
                      </span>
                    </div>
                    <span className="text-lg font-bold text-blue-900">
                      {formatINR(calculations.monthlyPension)}
                    </span>
                    <Badge
                      variant="outline"
                      className="w-fit text-[10px] border-blue-300 text-blue-700 bg-white"
                    >
                      Taxable
                    </Badge>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-purple-50 rounded border border-purple-200">
                  <p className="text-xs text-slate-700">
                    <strong>Annuity Corpus (40%):</strong>{' '}
                    {formatINR(calculations.annuityCorpus)}
                    invested with insurance company for lifelong pension
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-center text-slate-400">
                NPS offers dual tax benefits: 80C (₹1.5L) + 80CCD(1B) (₹50k) +
                EEE status
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Save Plan
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share via WhatsApp
        </Button>
      </div>

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved NPS Plans</CardTitle>
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
                    onClick={() => handleLoad(calc)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          {formatINR(calc.contribution)}/mo | Age{' '}
                          {calc.currentAge}→60
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Corpus: {formatINR(calc.corpus)} | Pension:{' '}
                          {formatINR(calc.monthlyPension)}/mo
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Return: {calc.roi}% | Annuity: {calc.annuityRate}%
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
