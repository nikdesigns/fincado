'use client';

import React, { useState, useMemo, useEffect } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Building2,
  Users,
  AlertCircle,
  Calculator,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface SavedCalculation {
  id: number;
  monthlyDeposit: number;
  rate: number;
  years: number;
  months: number;
  maturity: number;
  investment: number;
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

// Sample bank RD rates (Feb 2026)
const POPULAR_BANKS: BankRate[] = [
  { name: 'SBI', generalRate: 6.7, seniorRate: 7.2, tenure: '1-3 Years' },
  { name: 'HDFC Bank', generalRate: 7.0, seniorRate: 7.5, tenure: '1-3 Years' },
  {
    name: 'ICICI Bank',
    generalRate: 7.0,
    seniorRate: 7.5,
    tenure: '1-3 Years',
  },
  {
    name: 'Post Office',
    generalRate: 6.7,
    seniorRate: 6.7,
    tenure: 'All Tenures',
  },
  {
    name: 'Axis Bank',
    generalRate: 7.25,
    seniorRate: 7.75,
    tenure: '1-3 Years',
  },
  {
    name: 'Kotak Mahindra',
    generalRate: 7.1,
    seniorRate: 7.6,
    tenure: '1-3 Years',
  }
];

export default function RDClient() {
  /* ---------- STATE ---------- */
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(7.0);
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);
  const [showBankRates, setShowBankRates] = useState(false);
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
      const saved = localStorage.getItem('rd_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved RD calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'RD',
        page_path: window.location.pathname,
      });
    }
  }, []);

  // Handle senior citizen toggle
  const handleSeniorCitizenToggle = (checked: boolean) => {
    setIsSeniorCitizen(checked);
    if (checked) {
      setRate((prev) => Math.min(prev + 0.5, 15));
      toast.success('Senior citizen bonus (+0.5%) applied!');
    } else {
      setRate((prev) => Math.max(prev - 0.5, 2));
    }
  };

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const totalMonths = years * 12 + months;
    const r = rate / 100;
    const n = 4; // Quarterly compounding

    let maturityAmount = 0;

    if (rate === 0) {
      maturityAmount = monthlyDeposit * totalMonths;
    } else {
      // Calculate maturity for each monthly installment
      for (let i = 0; i < totalMonths; i++) {
        const monthsRemaining = totalMonths - i;
        const t = monthsRemaining / 12;
        maturityAmount += monthlyDeposit * Math.pow(1 + r / n, n * t);
      }
    }

    const totalInvestment = monthlyDeposit * totalMonths;
    const totalInterest = maturityAmount - totalInvestment;

    // TDS Calculation (10% if interest > threshold)
    const annualInterest = totalInterest / Math.max(years + months / 12, 1);
    const tdsThreshold = isSeniorCitizen ? 50000 : 40000;
    const tdsDeducted =
      annualInterest > tdsThreshold ? annualInterest * 0.1 : 0;
    const totalTDS = tdsDeducted * (years + months / 12);

    const netInterest = totalInterest - totalTDS;
    const finalMaturity = totalInvestment + netInterest;

    const principalPct =
      finalMaturity > 0
        ? Math.round((totalInvestment / finalMaturity) * 100)
        : 0;

    return {
      maturity: Math.round(finalMaturity),
      investment: Math.round(totalInvestment),
      grossInterest: Math.round(totalInterest),
      interest: Math.round(netInterest),
      tds: Math.round(totalTDS),
      principalPct,
      interestPct: 100 - principalPct,
    };
  }, [monthlyDeposit, rate, years, months, isSeniorCitizen]);

  /* ---------- HANDLERS ---------- */
  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      monthlyDeposit,
      rate,
      years,
      months,
      maturity: results.maturity,
      investment: results.investment,
      interest: results.interest,
      isSeniorCitizen,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('rd_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving RD calculation:', error);
    }

    toast.success('RD calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'rd_calculation_saved', {
        monthlyDeposit,
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
      `🔄 Recurring Deposit Calculation\n\n` +
      `Monthly Deposit: ${formatINR(monthlyDeposit)}\n` +
      `Interest Rate: ${rate}% p.a.${seniorText}\n` +
      `Tenure: ${tenure}\n\n` +
      `💰 Maturity Amount: ${formatINR(results.maturity)}\n` +
      `📊 Total Investment: ${formatINR(results.investment)}\n` +
      `💵 Interest Earned: ${formatINR(results.interest)}\n\n` +
      `Calculate yours: https://fincado.com/rd-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'rd_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('rd_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating RD history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('rd_calculator_history');
    } catch (error) {
      console.error('Error clearing RD history:', error);
    }
    toast.success('All RD calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setMonthlyDeposit(calc.monthlyDeposit);
    setRate(calc.rate);
    setYears(calc.years);
    setMonths(calc.months);
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
                id="rd-senior-citizen-mode"
              />
              <label
                htmlFor="rd-senior-citizen-mode"
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
                label="Monthly Deposit (₹)"
                value={monthlyDeposit}
                min={500}
                max={200000}
                step={500}
                onChange={setMonthlyDeposit}
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

              {/* Advanced Toggle */}
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  <Calculator className="mr-2 h-3 w-3" />
                  {showAdvanced ? 'Hide' : 'Show'} Calculation Details
                </Button>
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
                      <div className="text-xs text-slate-500">
                        Total Investment
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {formatINR(results.investment)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-lime-200 bg-lime-50">
                    <CardContent className="p-4">
                      <div className="text-xs text-lime-700">Net Interest</div>
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
                      <span className="text-slate-700">Gross Interest:</span>
                      <span className="font-semibold text-slate-700">
                        {formatINR(results.grossInterest)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Advanced Details */}
                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-left">
                    <h4 className="text-xs font-semibold text-slate-900 mb-3">
                      Calculation Breakdown
                    </h4>
                    <div className="space-y-2 text-xs text-slate-700">
                      <div className="flex justify-between">
                        <span>Monthly Deposit:</span>
                        <strong>{formatINR(monthlyDeposit)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Months:</span>
                        <strong>{years * 12 + months}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Compounding:</span>
                        <strong>Quarterly</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Interest Rate:</span>
                        <strong>{rate}%</strong>
                      </div>
                      <div className="flex justify-between border-t border-slate-300 pt-2 mt-2">
                        <span>Wealth Gain:</span>
                        <strong className="text-green-700">
                          {formatINR(results.interest)}
                        </strong>
                      </div>
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
              Popular Bank RD Rates (Feb 2026)
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
                      {bank.seniorRate > bank.generalRate && (
                        <div>
                          <span className="text-slate-600">Senior: </span>
                          <strong className="text-green-700">
                            {bank.seniorRate}%
                          </strong>
                        </div>
                      )}
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
                tenure, and deposit amount. Post Office RD rates are uniform
                across all tenures. Check with your bank for current rates.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved RD Plans</CardTitle>
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
                          {formatINR(calc.monthlyDeposit)}/month @ {calc.rate}%
                          for {calc.years}y {calc.months}m
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
                          Investment: {formatINR(calc.investment)}
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
