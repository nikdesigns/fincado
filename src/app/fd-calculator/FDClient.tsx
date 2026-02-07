'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import EMIPieChart from '@/components/EMIPieChart';
import {
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Building2,
  Users,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
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
  months: number;
  frequency: CompoundingFreq;
  maturity: number;
  interest: number;
  isSeniorCitizen: boolean;
  date: string;
}

interface BankRate {
  name: string;
  generalRate: number;
  seniorRate: number;
  tenure: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

// Sample bank rates (Feb 2026)
const POPULAR_BANKS: BankRate[] = [
  { name: 'SBI', generalRate: 6.5, seniorRate: 7.5, tenure: '1-2 Years' },
  { name: 'HDFC Bank', generalRate: 7.0, seniorRate: 7.5, tenure: '1-2 Years' },
  {
    name: 'ICICI Bank',
    generalRate: 7.0,
    seniorRate: 7.5,
    tenure: '1-2 Years',
  },
  {
    name: 'Axis Bank',
    generalRate: 7.25,
    seniorRate: 7.75,
    tenure: '1-2 Years',
  },
  {
    name: 'Kotak Mahindra',
    generalRate: 7.1,
    seniorRate: 7.6,
    tenure: '1-2 Years',
  },
  {
    name: 'Punjab National Bank',
    generalRate: 7.0,
    seniorRate: 7.5,
    tenure: '1-2 Years',
  },
];

export default function FDClient() {
  /* ---------- STATE ---------- */
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.0);
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);
  const [frequency, setFrequency] = useState<CompoundingFreq>('quarterly');
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);
  const [showBankRates, setShowBankRates] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  // ✅ FIX 1: Load saved calculations without setting state in effect
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    try {
      const saved = localStorage.getItem('fd_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved FD calculations:', error);
    }
  }, []); // Run once on mount

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'FD',
        page_path: window.location.pathname,
      });
    }
  }, []);

  // ✅ FIX 2: Handle senior citizen toggle without useEffect
  const handleSeniorCitizenToggle = (checked: boolean) => {
    setIsSeniorCitizen(checked);
    if (checked) {
      // Add 0.5% bonus when enabling senior citizen mode
      setRate((prev) => Math.min(prev + 0.5, 15));
      toast.success('Senior citizen bonus (+0.5%) applied!');
    } else {
      // Remove 0.5% bonus when disabling senior citizen mode
      setRate((prev) => Math.max(prev - 0.5, 2));
    }
  };

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const timeInYears = years + months / 12;
    const n = FREQUENCY_MAP[frequency];
    const r = rate / 100;

    let maturityAmount = principal;
    if (rate > 0 && timeInYears > 0) {
      maturityAmount = principal * Math.pow(1 + r / n, n * timeInYears);
    }

    const totalInterest = maturityAmount - principal;

    // TDS Calculation (10% if interest > threshold)
    const annualInterest = totalInterest / Math.max(timeInYears, 1);
    const tdsThreshold = isSeniorCitizen ? 50000 : 40000;
    const tdsDeducted =
      annualInterest > tdsThreshold ? annualInterest * 0.1 : 0;
    const totalTDS = tdsDeducted * timeInYears;

    const principalPct =
      maturityAmount > 0 ? Math.round((principal / maturityAmount) * 100) : 100;
    const interestPct = 100 - principalPct;

    return {
      maturity: Math.round(maturityAmount),
      interest: Math.round(totalInterest),
      netInterest: Math.round(totalInterest - totalTDS),
      tds: Math.round(totalTDS),
      principalPct,
      interestPct,
    };
  }, [principal, rate, years, months, frequency, isSeniorCitizen]);

  /* ---------- HANDLERS ---------- */
  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      principal,
      rate,
      years,
      months,
      frequency,
      maturity: results.maturity,
      interest: results.interest,
      isSeniorCitizen,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('fd_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving FD calculation:', error);
    }

    toast.success('FD calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'fd_calculation_saved', {
        principal,
        rate,
        tenure_years: years,
      });
    }
  };

  const handleShare = () => {
    const tenure =
      months > 0 ? `${years} years ${months} months` : `${years} years`;
    const seniorText = isSeniorCitizen ? ' (Senior Citizen Rate)' : '';

    const message =
      `🏦 Fixed Deposit Calculation\n\n` +
      `Principal: ${formatINR(principal)}\n` +
      `Interest Rate: ${rate}% p.a.${seniorText}\n` +
      `Tenure: ${tenure}\n` +
      `Compounding: ${frequency.charAt(0).toUpperCase() + frequency.slice(1)}\n\n` +
      `💰 Maturity Amount: ${formatINR(results.maturity)}\n` +
      `📊 Interest Earned: ${formatINR(results.interest)}\n` +
      `💼 After TDS: ${formatINR(results.netInterest)}\n\n` +
      `Calculate yours: https://fincado.com/fd-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'fd_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('fd_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating FD history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('fd_calculator_history');
    } catch (error) {
      console.error('Error clearing FD history:', error);
    }
    toast.success('All FD calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setPrincipal(calc.principal);
    setRate(calc.rate);
    setYears(calc.years);
    setMonths(calc.months);
    setFrequency(calc.frequency);
    setIsSeniorCitizen(calc.isSeniorCitizen);
    toast.success('Calculation loaded!');
  };

  const handleApplyBankRate = (bank: BankRate) => {
    const rateToUse = isSeniorCitizen ? bank.seniorRate : bank.generalRate;
    setRate(rateToUse);
    toast.success(`Applied ${bank.name} rate: ${rateToUse}%`);
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Senior Citizen Toggle */}
      <Card className="border-blue-200 bg-linear-to-r from-blue-50 to-indigo-50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch
                checked={isSeniorCitizen}
                onCheckedChange={handleSeniorCitizenToggle}
                id="senior-citizen-mode"
              />
              <label
                htmlFor="senior-citizen-mode"
                className="text-sm font-semibold text-slate-900 cursor-pointer flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Senior Citizen (60+ years)
              </label>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">
              Get extra 0.5% interest rate
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-6">
              <CalculatorField
                label="Deposit Amount (₹)"
                value={principal}
                min={5000}
                max={10000000}
                step={5000}
                onChange={setPrincipal}
              />

              <CalculatorField
                label="Interest Rate (% p.a)"
                value={rate}
                min={2}
                max={15}
                step={0.1}
                onChange={setRate}
              />

              <CalculatorField
                label="Tenure (Years)"
                value={years}
                min={0}
                max={30}
                step={1}
                onChange={setYears}
              />

              <CalculatorField
                label="Additional Months"
                value={months}
                min={0}
                max={11}
                step={1}
                onChange={setMonths}
              />

              {/* Compounding Frequency */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Compounding Frequency
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
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly (Most Common)</option>
                  <option value="half-yearly">Half-Yearly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={results.principalPct}
                interestPct={results.interestPct}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-slate-500">Maturity Amount</div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {formatINR(results.maturity)}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="text-xs text-slate-500">Principal</div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {formatINR(principal)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-lime-200 bg-lime-50">
                    <CardContent className="p-4">
                      <div className="text-xs text-lime-700">
                        Total Interest
                      </div>
                      <div className="mt-1 font-semibold text-lime-700">
                        +{formatINR(results.interest)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* TDS Info */}
                {results.tds > 0 && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-700 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        Estimated TDS (10%):
                      </span>
                      <span className="font-bold text-amber-700">
                        -{formatINR(results.tds)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-amber-300">
                      <span className="text-slate-700">
                        Net Interest (After TDS):
                      </span>
                      <span className="font-bold text-green-700">
                        {formatINR(results.netInterest)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Save Calculation
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share via WhatsApp
        </Button>

        <Button
          onClick={() => setShowBankRates(!showBankRates)}
          variant={showBankRates ? 'default' : 'outline'}
          size="sm"
        >
          <Building2 className="mr-2 h-4 w-4" />
          {showBankRates ? 'Hide' : 'Compare'} Bank Rates
        </Button>
      </div>

      {/* Bank Rates Comparison */}
      {showBankRates && (
        <Card className="border-indigo-200 bg-linear-to-br from-indigo-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Building2 className="h-5 w-5 text-indigo-600" />
              Popular Bank FD Rates (Feb 2026)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {POPULAR_BANKS.map((bank) => (
              <div
                key={bank.name}
                className="p-4 bg-white rounded-lg border border-slate-200 hover:border-indigo-300 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">
                      {bank.name}
                    </h4>
                    <div className="text-xs text-slate-600 mt-1">
                      Tenure: {bank.tenure}
                    </div>
                    <div className="flex gap-4 mt-2 text-sm">
                      <div>
                        <span className="text-slate-600">General: </span>
                        <strong className="text-indigo-700">
                          {bank.generalRate}%
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-600">Senior: </span>
                        <strong className="text-green-700">
                          {bank.seniorRate}%
                        </strong>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleApplyBankRate(bank)}
                    className="ml-4"
                  >
                    Apply Rate
                  </Button>
                </div>
              </div>
            ))}

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mt-4">
              <p className="text-xs text-slate-700">
                <strong>Note:</strong> Rates are indicative and vary by bank,
                tenure, and deposit amount. Check with your bank for current
                rates. Senior citizen rates typically offer 0.25-0.5% extra.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved FD Plans</CardTitle>
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
                          {formatINR(calc.principal)} @ {calc.rate}% for{' '}
                          {calc.years}y {calc.months}m
                          {calc.isSeniorCitizen && (
                            <span className="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                              Senior Citizen
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Maturity: {formatINR(calc.maturity)} | Interest:{' '}
                          {formatINR(calc.interest)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Compounding: {calc.frequency}
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
