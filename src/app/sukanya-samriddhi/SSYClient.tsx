'use client';

import React, { useMemo, useState, useEffect } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  RefreshCcw,
  Baby,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Calculator,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

/* ---------- TYPES ---------- */
interface SSYLabels {
  ageWarning: string;
  ageWarningNote: string;
  ssyCalculator: string;
  reset: string;
  girlAge: string;
  depositFrequency: string;
  monthly: string;
  yearly: string;
  monthlyInvestment: string;
  yearlyInvestment: string;
  interestRate: string;
  showBreakdown: string;
  hideBreakdown: string;
  maturityValue: string;
  taxFree: string;
  maturity: string;
  age: string;
  totalInvestment: string;
  totalInterest: string;
  annualInvestment: string;
  contributionNote: string;
  yearwiseGrowth: string;
  year: string;
  balance: string;
  interest: string;
  compoundingNote: string;
  lockInNote: string;
  saveCalculation: string;
  shareWhatsApp: string;
  savedSSYPlans: string;
  clearAll: string;
  perYear: string;
}

const DEFAULT_LABELS: SSYLabels = {
  ageWarning: 'Note:',
  ageWarningNote:
    'SSY account can only be opened for girls up to age 10. Adjust the age to see accurate calculations.',
  ssyCalculator: 'Sukanya Samriddhi Yojana Calculator',
  reset: 'Reset',
  girlAge: "Girl's Current Age (Years)",
  depositFrequency: 'Deposit Frequency',
  monthly: 'Monthly',
  yearly: 'Yearly',
  monthlyInvestment: 'Monthly Investment (₹)',
  yearlyInvestment: 'Yearly Investment (₹)',
  interestRate: 'Interest Rate (% p.a)',
  showBreakdown: 'Show Year-wise Breakdown',
  hideBreakdown: 'Hide Year-wise Breakdown',
  maturityValue: 'Maturity Value (Tax Free)',
  taxFree: 'Tax Free',
  maturity: 'Maturity:',
  age: 'Age:',
  totalInvestment: 'Total Investment',
  totalInterest: 'Total Interest',
  annualInvestment: 'Annual Investment:',
  contributionNote: '15 years contribution + 6 years interest-only',
  yearwiseGrowth: 'Year-wise Growth (First 5 Years)',
  year: 'Year',
  balance: 'Balance:',
  interest: 'Interest:',
  compoundingNote: 'Continues compounding until maturity at age 21',
  lockInNote:
    'Lock-in: 21 years | Partial withdrawal after age 18 | 100% tax-free',
  saveCalculation: 'Save Calculation',
  shareWhatsApp: 'Share via WhatsApp',
  savedSSYPlans: 'Your Saved SSY Plans',
  clearAll: 'Clear All',
  perYear: '/year',
};

interface SavedCalculation {
  id: number;
  currentAge: number;
  depositMode: 'monthly' | 'yearly';
  monthlyDeposit: number;
  yearlyDeposit: number;
  annualRate: number;
  maturityAmount: number;
  totalInvested: number;
  totalInterest: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function SSYClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<SSYLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [currentAge, setCurrentAge] = useState(5);
  const [depositMode, setDepositMode] = useState<'monthly' | 'yearly'>(
    'monthly',
  );
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [yearlyDeposit, setYearlyDeposit] = useState(60000);
  const [annualRate, setAnnualRate] = useState(8.2);
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
      const saved = localStorage.getItem('ssy_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved SSY calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'SSY',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const maturityYears = 21;
    const depositYears = 15;
    const rate = annualRate / 100;

    let balance = 0;
    let totalInvested = 0;

    const annualInvestment =
      depositMode === 'monthly' ? monthlyDeposit * 12 : yearlyDeposit;

    // Year-wise breakdown for first 5 years
    const yearlyBreakdown = [];

    for (let year = 1; year <= maturityYears; year++) {
      if (year <= depositYears) {
        balance += annualInvestment;
        totalInvested += annualInvestment;
      }
      balance += balance * rate;

      // Store yearly data for first 5 years
      if (year <= 5) {
        yearlyBreakdown.push({
          year,
          investment: year <= depositYears ? annualInvestment : 0,
          balance: Math.round(balance),
          interest: Math.round(balance - totalInvested),
        });
      }
    }

    const maturityAmount = Math.round(balance);
    const totalInterest = Math.max(0, maturityAmount - totalInvested);

    const totalValue = maturityAmount;
    const principalPct =
      totalValue > 0 ? Math.round((totalInvested / totalValue) * 100) : 0;
    const interestPct = 100 - principalPct;

    const maturityAge = currentAge + 21;
    const maturityYear = new Date().getFullYear() + (21 - currentAge);
    const canOpen = currentAge <= 10;

    return {
      maturityAmount,
      totalInvested,
      totalInterest,
      principalPct,
      interestPct,
      maturityAge,
      maturityYear,
      canOpen,
      yearlyBreakdown,
      annualInvestment,
    };
  }, [currentAge, depositMode, monthlyDeposit, yearlyDeposit, annualRate]);

  /* ---------- HANDLERS ---------- */
  const handleReset = () => {
    setCurrentAge(5);
    setDepositMode('monthly');
    setMonthlyDeposit(5000);
    setYearlyDeposit(60000);
    setAnnualRate(8.2);
    toast.success('Calculator reset to defaults!');
  };

  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      currentAge,
      depositMode,
      monthlyDeposit,
      yearlyDeposit,
      annualRate,
      maturityAmount: results.maturityAmount,
      totalInvested: results.totalInvested,
      totalInterest: results.totalInterest,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('ssy_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving SSY calculation:', error);
    }

    toast.success('SSY calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ssy_calculation_saved', {
        age: currentAge,
        deposit_mode: depositMode,
        annual_investment: results.annualInvestment,
      });
    }
  };

  const handleShare = () => {
    const message =
      `🎀 Sukanya Samriddhi Yojana (SSY) Calculation\n\n` +
      `Girl's Age: ${currentAge} years\n` +
      `Deposit: ${formatINR(results.annualInvestment)}/year (${depositMode})\n` +
      `Interest Rate: ${annualRate}% p.a.\n\n` +
      `📊 At Maturity (Age ${results.maturityAge}):\n` +
      `Total Invested: ${formatINR(results.totalInvested)}\n` +
      `Maturity Value: ${formatINR(results.maturityAmount)}\n` +
      `Total Interest: ${formatINR(results.totalInterest)}\n\n` +
      `💰 100% Tax-Free Returns!\n\n` +
      `Calculate yours: https://fincado.com/sukanya-samriddhi/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ssy_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('ssy_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating SSY history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('ssy_calculator_history');
    } catch (error) {
      console.error('Error clearing SSY history:', error);
    }
    toast.success('All SSY calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setCurrentAge(calc.currentAge);
    setDepositMode(calc.depositMode);
    setMonthlyDeposit(calc.monthlyDeposit);
    setYearlyDeposit(calc.yearlyDeposit);
    setAnnualRate(calc.annualRate);
    toast.success('Calculation loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Age Warning */}
      {!results.canOpen && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="ml-2 text-sm text-amber-800">
            <strong>{t.ageWarning}</strong> {t.ageWarningNote}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm bg-card">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <Baby className="h-5 w-5 text-emerald-600" />
              {t.ssyCalculator}
            </CardTitle>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" /> {t.reset}
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-6">
              <CalculatorField
                label={t.girlAge}
                value={currentAge}
                min={0}
                max={10}
                step={1}
                onChange={setCurrentAge}
              />

              {/* Deposit Frequency */}
              <div className="space-y-2">
                <Label>{t.depositFrequency}</Label>
                <Select
                  value={depositMode}
                  onValueChange={(v) =>
                    setDepositMode(v as 'monthly' | 'yearly')
                  }
                >
                  <SelectTrigger className="bg-white h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">{t.monthly}</SelectItem>
                    <SelectItem value="yearly">{t.yearly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <CalculatorField
                label={
                  depositMode === 'monthly'
                    ? t.monthlyInvestment
                    : t.yearlyInvestment
                }
                value={
                  depositMode === 'monthly' ? monthlyDeposit : yearlyDeposit
                }
                min={depositMode === 'monthly' ? 250 : 1000}
                max={depositMode === 'monthly' ? 12500 : 150000}
                step={depositMode === 'monthly' ? 250 : 1000}
                onChange={
                  depositMode === 'monthly'
                    ? setMonthlyDeposit
                    : setYearlyDeposit
                }
              />

              <CalculatorField
                label={t.interestRate}
                value={annualRate}
                min={7}
                max={9}
                step={0.1}
                onChange={setAnnualRate}
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
                  {showAdvanced ? t.hideBreakdown : t.showBreakdown}
                </Button>
              </div>
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={results.principalPct}
                interestPct={results.interestPct}
                size={200}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-slate-500">{t.maturityValue}</div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {formatINR(results.maturityAmount)}
                </div>

                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  {t.maturity} {results.maturityYear} ({t.age}{' '}
                  {results.maturityAge})
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <Card className="border-slate-200 shadow-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-slate-500">
                        {t.totalInvestment}
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {formatINR(results.totalInvested)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-lime-200 bg-lime-50 shadow-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-lime-700">
                        {t.totalInterest}
                      </div>
                      <div className="mt-1 font-semibold text-lime-700">
                        +{formatINR(results.totalInterest)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{t.annualInvestment}</span>
                    <span className="font-bold text-blue-700">
                      {formatINR(results.annualInvestment)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    {t.contributionNote}
                  </div>
                </div>

                {/* Year-wise Breakdown */}
                {showAdvanced && results.yearlyBreakdown.length > 0 && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-left">
                    <h4 className="text-xs font-semibold text-slate-900 mb-3">
                      {t.yearwiseGrowth}
                    </h4>
                    <div className="space-y-2">
                      {results.yearlyBreakdown.map((item) => (
                        <div
                          key={item.year}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-slate-600">
                            {t.year} {item.year}:
                          </span>
                          <div className="flex gap-3">
                            <span className="text-slate-700">
                              {t.balance}{' '}
                              <strong>{formatINR(item.balance)}</strong>
                            </span>
                            <span className="text-lime-700">
                              {t.interest}{' '}
                              <strong>{formatINR(item.interest)}</strong>
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="text-[11px] text-slate-500 mt-2 pt-2 border-t">
                        {t.compoundingNote}
                      </div>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-xs text-center text-slate-400">
                  {t.lockInNote}
                </p>
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
            <CardTitle className="text-lg">{t.savedSSYPlans}</CardTitle>
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
                          {t.age} {calc.currentAge} |{' '}
                          {formatINR(
                            calc.depositMode === 'monthly'
                              ? calc.monthlyDeposit * 12
                              : calc.yearlyDeposit,
                          )}
                          {t.perYear}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {calc.annualRate}% | {t.maturity}{' '}
                          {formatINR(calc.maturityAmount)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {t.interest} {formatINR(calc.totalInterest)}
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
