'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EMIPieChart from '@/components/EMIPieChart';
import {
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Shield,
  TrendingUp,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface NSCLabels {
  investmentAmount: string;
  interestRate: string;
  tenure: string;
  maturityAmount: string;
  totalInvested: string;
  interestEarned: string;
  effectiveGain: string;
  section80C: string;
  section80CInfo: string;
  showBreakdown: string;
  hideBreakdown: string;
  yearwiseGrowth: string;
  year: string;
  balance: string;
  interest: string;
  accruedInterest: string;
  saveCalculation: string;
  shareWhatsApp: string;
  savedNSCPlans: string;
  clearAll: string;
  maturity: string;
  fixedTenure: string;
  governmentBacked: string;
  taxNote: string;
}

const DEFAULT_LABELS: NSCLabels = {
  investmentAmount: 'Investment Amount (₹)',
  interestRate: 'Interest Rate (% p.a.)',
  tenure: 'Tenure (Years)',
  maturityAmount: 'Maturity Amount',
  totalInvested: 'Total Invested',
  interestEarned: 'Interest Earned',
  effectiveGain: 'Effective Gain:',
  section80C: 'Section 80C Benefits',
  section80CInfo:
    'Principal + Accrued interest (first 4 years) eligible for tax deduction',
  showBreakdown: 'Show Year-wise Breakdown',
  hideBreakdown: 'Hide Year-wise Breakdown',
  yearwiseGrowth: 'Year-wise Growth',
  year: 'Year',
  balance: 'Balance:',
  interest: 'Interest:',
  accruedInterest: 'Accrued Interest:',
  saveCalculation: 'Save Calculation',
  shareWhatsApp: 'Share via WhatsApp',
  savedNSCPlans: 'Your Saved NSC Plans',
  clearAll: 'Clear All',
  maturity: 'Maturity:',
  fixedTenure: '5-Year Fixed Tenure',
  governmentBacked: 'Government Backed • Section 80C Eligible',
  taxNote: 'Interest is taxable, but accrued interest qualifies for 80C',
};

interface SavedCalculation {
  id: number;
  principal: number;
  rate: number;
  maturity: number;
  interest: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function NSCClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<NSCLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.7);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  // NSC has fixed 5-year tenure
  const years = 5;

  // Load saved calculations
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    try {
      const saved = localStorage.getItem('nsc_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved NSC calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'NSC',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const r = rate / 100;

    // Compound Interest Formula: A = P(1 + r)^n
    let maturityAmount = principal;
    if (rate > 0) {
      maturityAmount = principal * Math.pow(1 + r, years);
    }

    const totalInterest = maturityAmount - principal;

    const principalPct =
      maturityAmount > 0 ? Math.round((principal / maturityAmount) * 100) : 100;
    const interestPct = 100 - principalPct;

    // Calculate year-wise breakdown
    const yearlyBreakdown = [];
    let runningBalance = principal;

    for (let year = 1; year <= years; year++) {
      const yearEndBalance = runningBalance * (1 + r);
      const yearInterest = yearEndBalance - runningBalance;
      const totalAccruedInterest = yearEndBalance - principal;

      yearlyBreakdown.push({
        year,
        balance: Math.round(yearEndBalance),
        yearInterest: Math.round(yearInterest),
        totalAccruedInterest: Math.round(totalAccruedInterest),
      });

      runningBalance = yearEndBalance;
    }

    // Section 80C eligible amount (principal + accrued interest for first 4 years)
    const year4AccruedInterest = yearlyBreakdown[3]?.totalAccruedInterest || 0;
    const section80CEligible = Math.min(
      principal + year4AccruedInterest,
      150000,
    );

    return {
      maturity: Math.round(maturityAmount),
      interest: Math.round(totalInterest),
      principalPct,
      interestPct,
      yearlyBreakdown,
      section80CEligible: Math.round(section80CEligible),
      effectiveReturn:
        principal > 0 ? ((totalInterest / principal) * 100).toFixed(2) : '0',
    };
  }, [principal, rate, years]);

  /* ---------- HANDLERS ---------- */
  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      principal,
      rate,
      maturity: results.maturity,
      interest: results.interest,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('nsc_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving NSC calculation:', error);
    }

    toast.success('NSC calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'nsc_calculation_saved', {
        principal,
        rate,
      });
    }
  };

  const handleShare = () => {
    const message =
      `🏛️ NSC Calculation (National Savings Certificate)\n\n` +
      `Investment: ${formatINR(principal)}\n` +
      `Interest Rate: ${rate}% p.a. (Government rate)\n` +
      `Tenure: 5 years (Fixed)\n\n` +
      `💰 Maturity Amount: ${formatINR(results.maturity)}\n` +
      `📊 Interest Earned: ${formatINR(results.interest)}\n` +
      `🎯 Effective Gain: ${results.effectiveReturn}%\n` +
      `💼 Section 80C Eligible: ${formatINR(results.section80CEligible)}\n\n` +
      `✨ Government Backed • Tax Saving under Section 80C\n` +
      `Calculate yours: https://fincado.com/nsc-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'nsc_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('nsc_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating NSC history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('nsc_calculator_history');
    } catch (error) {
      console.error('Error clearing NSC history:', error);
    }
    toast.success('All NSC calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setPrincipal(calc.principal);
    setRate(calc.rate);
    toast.success('Calculation loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* NSC Info Card */}
      <Card className="border-green-200 bg-linear-to-r from-green-50 to-emerald-50">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-green-900 mb-1">
                {t.governmentBacked}
              </h3>
              <p className="text-xs text-slate-700">
                Current NSC rate:{' '}
                <strong className="text-green-700">{rate}%</strong> | 5-year
                fixed tenure | Min: ₹1,000 | Max 80C benefit: ₹1.5L
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Shield className="h-5 w-5 text-green-600" />
            NSC Calculator
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-6">
              <CalculatorField
                label={t.investmentAmount}
                value={principal}
                min={1000}
                max={5000000}
                step={1000}
                onChange={setPrincipal}
              />

              <CalculatorField
                label={t.interestRate}
                value={rate}
                min={4}
                max={12}
                step={0.1}
                onChange={setRate}
              />

              {/* Fixed Tenure Display */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  {t.tenure}
                </label>
                <div className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 cursor-not-allowed">
                  5 Years (Fixed)
                </div>
                <p className="text-xs text-slate-500">
                  NSC has a mandatory 5-year lock-in period
                </p>
              </div>

              {/* Advanced Toggle */}
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  <Info className="mr-2 h-3 w-3" />
                  {showBreakdown ? t.hideBreakdown : t.showBreakdown}
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
                <div className="text-sm text-slate-500">{t.maturityAmount}</div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {formatINR(results.maturity)}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="text-xs text-slate-500">
                        {t.totalInvested}
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {formatINR(principal)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-lime-200 bg-lime-50">
                    <CardContent className="p-4">
                      <div className="text-xs text-lime-700">
                        {t.interestEarned}
                      </div>
                      <div className="mt-1 font-semibold text-lime-700">
                        +{formatINR(results.interest)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      {t.effectiveGain}
                    </span>
                    <span className="font-bold text-emerald-700">
                      {results.effectiveReturn}%
                    </span>
                  </div>
                </div>

                {/* Section 80C Info */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xs font-semibold text-blue-900 mb-1">
                    {t.section80C}
                  </div>
                  <div className="text-sm font-bold text-blue-700">
                    {formatINR(results.section80CEligible)}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {t.section80CInfo}
                  </div>
                </div>

                {/* Year-wise Breakdown */}
                {showBreakdown && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-left">
                    <h4 className="text-xs font-semibold text-slate-900 mb-3">
                      {t.yearwiseGrowth}
                    </h4>
                    <div className="space-y-2">
                      {results.yearlyBreakdown.map((item) => (
                        <div
                          key={item.year}
                          className="flex flex-col text-xs border-b border-slate-200 pb-2 last:border-0"
                        >
                          <div className="flex justify-between font-semibold mb-1">
                            <span className="text-slate-700">
                              {t.year} {item.year}:
                            </span>
                            <span className="text-slate-900">
                              {formatINR(item.balance)}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-600 ml-4">
                            <span>
                              {t.interest} (Year {item.year}):
                            </span>
                            <span className="text-green-600">
                              +{formatINR(item.yearInterest)}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-600 ml-4">
                            <span>{t.accruedInterest}:</span>
                            <span className="text-emerald-600">
                              {formatINR(item.totalAccruedInterest)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t">
                      {t.taxNote}
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
            <CardTitle className="text-lg">{t.savedNSCPlans}</CardTitle>
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
                          {formatINR(calc.principal)} @ {calc.rate}% for 5 years
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {t.maturity} {formatINR(calc.maturity)} |{' '}
                          {t.interestEarned}: {formatINR(calc.interest)}
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
