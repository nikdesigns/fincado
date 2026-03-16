'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookmarkIcon,
  Share2Icon,
  Zap,
  TrendingDown,
  Calendar,
  IndianRupee,
  Trash2,
  Download,
  Target,
  TrendingUp,
  LineChart,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

/* ---------- TYPES ---------- */
export interface EMILabels {
  calculatorMode: string;
  emiMode: string;
  affordabilityMode: string;
  loanAmount: string;
  interestRate: string;
  loanTenure: string;
  monthlyEMI: string;
  affordableEMI: string;
  maxLoanAmount: string;
  principalAmount: string;
  totalInterest: string;
  totalPayment: string;
  youCanBorrow: string;
  withAffordableEMI: string;
  comparisonMode: string;
  compareBanks: string;
  optionA: string;
  optionB: string;
  whichBetter: string;
  emiDifference: string;
  interestDifference: string;
  winner: string;
  optionSaves: string;
  inInterest: string;
  saveCalculation: string;
  shareWhatsApp: string;
  prepaymentSimulator: string;
  showPrepayment: string;
  hidePrepayment: string;
  prepaymentImpact: string;
  prepaymentDescription: string;
  extraPaymentAmount: string;
  whenToPay: string;
  afterMonths: string;
  makeAfter: string;
  yourSavings: string;
  interestSaved: string;
  tenureReduced: string;
  month: string;
  months: string;
  prepaymentTip: string;
  loanBreakdown: string;
  year: string;
  openingBalance: string;
  principalPaid: string;
  interestPaid: string;
  closingBalance: string;
  downloadReport: string;
  savedCalculations: string;
  clearAll: string;
  calculationSaved: string;
  calculationDeleted: string;
  allCleared: string;
  calculationLoaded: string;
  reportDownloaded: string;
  years: string;
  returnsDisclaimer: string;
  loanGrowthOverTime: string;
}

export interface EMIClientProps {
  labels?: Partial<EMILabels>;
  defaultRate?: number;
  defaultPrincipal?: number;
  defaultTenure?: number;
}

interface SavedCalculation {
  id: number;
  amount: number;
  rate: number;
  tenure: number;
  emi: number;
  totalInterest: number;
  date: string;
  mode?: 'emi' | 'affordability';
}

interface YearlyBreakdown {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
  emiPaid: number;
}

const DEFAULT_LABELS: EMILabels = {
  calculatorMode: 'Calculator Mode',
  emiMode: 'EMI Mode',
  affordabilityMode: 'Affordability Mode',
  loanAmount: 'Loan Amount (₹)',
  interestRate: 'Interest Rate (% p.a)',
  loanTenure: 'Loan Tenure (Years)',
  monthlyEMI: 'Monthly EMI',
  affordableEMI: 'Affordable Monthly EMI (₹)',
  maxLoanAmount: 'Maximum Loan Amount',
  principalAmount: 'Principal Amount',
  totalInterest: 'Total Interest',
  totalPayment: 'Total Payment',
  youCanBorrow: 'You Can Borrow',
  withAffordableEMI: 'With your affordable EMI of',
  comparisonMode: 'Compare Two Loan Options',
  compareBanks: 'Compare banks side-by-side',
  optionA: 'Option A - Current Bank',
  optionB: 'Option B - New Offer',
  whichBetter: 'Which Option is Better?',
  emiDifference: 'EMI Difference',
  interestDifference: 'Interest Difference',
  winner: 'Winner',
  optionSaves: 'saves you',
  inInterest: 'in interest',
  saveCalculation: 'Save Calculation',
  shareWhatsApp: 'Share via WhatsApp',
  prepaymentSimulator: 'Prepayment Simulator',
  showPrepayment: 'Show Prepayment Simulator',
  hidePrepayment: 'Hide Prepayment Simulator',
  prepaymentImpact: 'Prepayment Impact Simulator',
  prepaymentDescription: 'See how much you can save by making extra payments',
  extraPaymentAmount: 'Extra Payment Amount',
  whenToPay: 'When to Pay?',
  afterMonths: 'After {count} {unit}',
  makeAfter: 'Make prepayment after month',
  yourSavings: 'Your Savings',
  interestSaved: 'Interest Saved',
  tenureReduced: 'Tenure Reduced By',
  month: 'month',
  months: 'months',
  prepaymentTip:
    'Making prepayments in the early years saves maximum interest because the principal is still high.',
  loanBreakdown: 'Year-by-Year Loan Breakdown',
  year: 'Year',
  openingBalance: 'Opening Balance',
  principalPaid: 'Principal Paid',
  interestPaid: 'Interest Paid',
  closingBalance: 'Closing Balance',
  downloadReport: 'Download Report',
  savedCalculations: 'Your Saved Calculations',
  clearAll: 'Clear All',
  calculationSaved: 'Calculation saved!',
  calculationDeleted: 'Calculation deleted!',
  allCleared: 'All calculations cleared!',
  calculationLoaded: 'Calculation loaded!',
  reportDownloaded: 'Report downloaded!',
  years: 'years',
  returnsDisclaimer:
    'Calculations are illustrative. Actual EMI may vary based on bank terms.',
  loanGrowthOverTime: 'Loan Repayment Over Time',
};

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

/* ---------- COMPONENT ---------- */
export default function EMIClient({
  labels,
  defaultRate = 8.5,
  defaultPrincipal = 5000000,
  defaultTenure = 20,
}: EMIClientProps) {
  const t = useMemo(() => ({ ...DEFAULT_LABELS, ...labels }), [labels]);

  const [calculatorMode, setCalculatorMode] = useState<'emi' | 'affordability'>(
    'emi',
  );

  const [amount, setAmount] = useState(defaultPrincipal);
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenure);

  const [affordableEMI, setAffordableEMI] = useState(50000);
  const [affordabilityRate, setAffordabilityRate] = useState(defaultRate);
  const [affordabilityTenure, setAffordabilityTenure] = useState(defaultTenure);

  const [showPrepayment, setShowPrepayment] = useState(false);
  const [prepaymentAmount, setPrepaymentAmount] = useState(100000);
  const [prepaymentMonth, setPrepaymentMonth] = useState(12);

  const [comparisonMode, setComparisonMode] = useState(false);
  const [amount2, setAmount2] = useState(defaultPrincipal);
  const [rate2, setRate2] = useState(9.5);
  const [tenure2, setTenure2] = useState(defaultTenure);

  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    try {
      const saved = localStorage.getItem('emi_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved calculations:', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'EMI',
        page_path: window.location.pathname,
      });
    }
  }, []);

  const calculateYearlyBreakdown = useCallback(
    (
      principal: number,
      annualRate: number,
      years: number,
    ): YearlyBreakdown[] => {
      const monthlyRate = annualRate / 12 / 100;
      const totalMonths = years * 12;

      let emi = 0;
      if (annualRate === 0) {
        emi = principal / totalMonths;
      } else {
        emi =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1);
      }

      if (!isFinite(emi)) emi = 0;

      const yearlyData: YearlyBreakdown[] = [];
      let balance = principal;

      for (let year = 1; year <= years; year++) {
        const openingBalance = balance;
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;
        let monthsPaidThisYear = 0;

        for (let month = 0; month < 12; month++) {
          if (balance <= 0) break;

          const interest = balance * monthlyRate;
          const principalPayment = Math.min(balance, emi - interest);

          yearlyInterest += interest;
          yearlyPrincipal += principalPayment;
          balance -= principalPayment;
          monthsPaidThisYear++;
        }

        balance = Math.max(0, balance);

        yearlyData.push({
          year,
          openingBalance: Math.round(openingBalance),
          principalPaid: Math.round(yearlyPrincipal),
          interestPaid: Math.round(yearlyInterest),
          closingBalance: Math.round(balance),
          emiPaid: Math.round(emi * monthsPaidThisYear),
        });

        if (balance <= 0) break;
      }

      return yearlyData;
    },
    [],
  );

  const calculations = useMemo(() => {
    if (calculatorMode === 'affordability') {
      const monthlyRate = affordabilityRate / 12 / 100;
      const totalMonths = affordabilityTenure * 12;

      let maxLoan = 0;
      if (affordabilityRate === 0) {
        maxLoan = affordableEMI * totalMonths;
      } else {
        maxLoan =
          (affordableEMI * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
          (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
      }

      if (!isFinite(maxLoan)) maxLoan = 0;

      const totalPayment = affordableEMI * totalMonths;
      const totalInterest = totalPayment - maxLoan;

      const principalPct =
        totalPayment > 0 ? Math.round((maxLoan / totalPayment) * 100) : 0;
      const interestPct = 100 - principalPct;

      const yearlyBreakdown = calculateYearlyBreakdown(
        maxLoan,
        affordabilityRate,
        affordabilityTenure,
      );

      return {
        emi: Math.round(affordableEMI),
        maxLoan: Math.round(maxLoan),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        principalPct,
        interestPct,
        yearlyBreakdown,
      };
    }

    if (tenure === 0)
      return {
        emi: 0,
        totalInterest: 0,
        principalPct: 0,
        interestPct: 0,
        totalPayment: 0,
        yearlyBreakdown: [],
      };

    const r = rate / 12 / 100;
    const n = tenure * 12;

    let emi = 0;
    if (rate === 0) {
      emi = amount / n;
    } else {
      emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    if (!isFinite(emi)) emi = 0;

    const totalPayment = emi * n;
    const totalInterest = totalPayment - amount;

    const principalPct =
      totalPayment > 0 ? Math.round((amount / totalPayment) * 100) : 0;
    const interestPct = 100 - principalPct;

    const yearlyBreakdown = calculateYearlyBreakdown(amount, rate, tenure);

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPct,
      interestPct,
      yearlyBreakdown,
    };
  }, [
    amount,
    rate,
    tenure,
    calculatorMode,
    affordableEMI,
    affordabilityRate,
    affordabilityTenure,
    calculateYearlyBreakdown,
  ]);

  const calculations2 = useMemo(() => {
    if (!comparisonMode) return null;

    if (tenure2 === 0)
      return {
        emi: 0,
        totalInterest: 0,
        principalPct: 0,
        interestPct: 0,
        totalPayment: 0,
      };

    const r = rate2 / 12 / 100;
    const n = tenure2 * 12;

    let emi = 0;
    if (rate2 === 0) {
      emi = amount2 / n;
    } else {
      emi = (amount2 * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    if (!isFinite(emi)) emi = 0;

    const totalPayment = emi * n;
    const totalInterest = totalPayment - amount2;

    const principalPct =
      totalPayment > 0 ? Math.round((amount2 / totalPayment) * 100) : 0;
    const interestPct = 100 - principalPct;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPct,
      interestPct,
    };
  }, [comparisonMode, amount2, rate2, tenure2]);

  const prepaymentImpact = useMemo(() => {
    if (
      !showPrepayment ||
      prepaymentAmount <= 0 ||
      calculatorMode === 'affordability'
    ) {
      return { interestSaved: 0, tenureReduction: 0, newEmi: 0 };
    }

    const r = rate / 12 / 100;
    const n = tenure * 12;

    const emi =
      rate === 0
        ? amount / n
        : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    if (!isFinite(emi) || emi <= 0) {
      return { interestSaved: 0, tenureReduction: 0, newEmi: 0 };
    }

    let remainingPrincipal = amount;
    const effectivePrepayMonth = Math.min(prepaymentMonth, n);

    for (let i = 0; i < effectivePrepayMonth; i++) {
      if (remainingPrincipal <= 0) break;
      const interestForMonth = remainingPrincipal * r;
      const principalForMonth = Math.min(
        remainingPrincipal,
        emi - interestForMonth,
      );
      remainingPrincipal -= principalForMonth;
    }

    const newPrincipal = Math.max(0, remainingPrincipal - prepaymentAmount);
    const remainingMonths = Math.max(0, n - effectivePrepayMonth);

    let totalInterestWithout = 0;
    let balance = remainingPrincipal;
    for (let i = 0; i < remainingMonths; i++) {
      if (balance <= 0) break;
      const interest = balance * r;
      totalInterestWithout += interest;
      const principalPay = Math.min(balance, emi - interest);
      balance -= principalPay;
    }

    let totalInterestWith = 0;
    let balanceWith = newPrincipal;
    let monthsNeeded = 0;
    while (balanceWith > 0 && monthsNeeded < remainingMonths) {
      const interest = balanceWith * r;
      totalInterestWith += interest;
      const principalPay = Math.min(balanceWith, emi - interest);
      balanceWith -= principalPay;
      monthsNeeded++;
    }

    const interestSaved = Math.round(totalInterestWithout - totalInterestWith);
    const tenureReduction = remainingMonths - monthsNeeded;

    return {
      interestSaved: Math.max(0, interestSaved),
      tenureReduction: Math.max(0, tenureReduction),
      newEmi: Math.round(emi),
    };
  }, [
    showPrepayment,
    prepaymentAmount,
    prepaymentMonth,
    amount,
    rate,
    tenure,
    calculatorMode,
  ]);

  const handleSaveCalculation = useCallback(() => {
    const calculation: SavedCalculation = {
      id: Date.now(),
      amount:
        calculatorMode === 'affordability' ? calculations.maxLoan || 0 : amount,
      rate: calculatorMode === 'affordability' ? affordabilityRate : rate,
      tenure: calculatorMode === 'affordability' ? affordabilityTenure : tenure,
      emi: calculations.emi,
      totalInterest: calculations.totalInterest,
      date: new Date().toISOString(),
      mode: calculatorMode,
    };

    setSavedCalculations((prev) => {
      const updated = [calculation, ...prev].slice(0, 10);
      try {
        localStorage.setItem('emi_history', JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      return updated;
    });

    toast.success(t.calculationSaved);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'emi_saved', {
        loan_amount: calculation.amount,
        interest_rate: calculation.rate,
        tenure_years: calculation.tenure,
        mode: calculatorMode,
      });
    }
  }, [
    amount,
    rate,
    tenure,
    calculatorMode,
    affordabilityRate,
    affordabilityTenure,
    calculations.emi,
    calculations.totalInterest,
    calculations.maxLoan,
    t.calculationSaved,
  ]);

  const handleDeleteCalculation = useCallback(
    (id: number) => {
      let remainingCount = 0;

      setSavedCalculations((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        remainingCount = updated.length;
        try {
          localStorage.setItem('emi_history', JSON.stringify(updated));
        } catch (error) {
          console.error('Error updating localStorage:', error);
        }
        return updated;
      });

      toast.success(t.calculationDeleted);

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'emi_calculation_deleted', {
          calculations_remaining: remainingCount,
        });
      }
    },
    [t.calculationDeleted],
  );

  const handleClearAll = useCallback(() => {
    const clearedCount = savedCalculations.length;
    setSavedCalculations([]);

    try {
      localStorage.removeItem('emi_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success(t.allCleared);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'emi_history_cleared', {
        calculations_cleared: clearedCount,
      });
    }
  }, [savedCalculations.length, t.allCleared]);

  const handleShare = useCallback(() => {
    const isAffordability = calculatorMode === 'affordability';

    const message = isAffordability
      ? `💰 EMI Affordability Calculation\n\n` +
        `Affordable EMI: ${formatINR(affordableEMI)}\n` +
        `Interest Rate: ${affordabilityRate}% p.a.\n` +
        `Tenure: ${affordabilityTenure} years\n\n` +
        `🏠 Maximum Loan: ${formatINR(calculations.maxLoan || 0)}\n` +
        `💸 Total Interest: ${formatINR(calculations.totalInterest)}\n` +
        `💵 Total Payment: ${formatINR(calculations.totalPayment)}\n\n` +
        `Calculate yours: https://fincado.com/emi-calculator/`
      : `💰 EMI Calculation Result\n\n` +
        `Loan Amount: ${formatINR(amount)}\n` +
        `Interest Rate: ${rate}% p.a.\n` +
        `Tenure: ${tenure} years\n\n` +
        `📊 Monthly EMI: ${formatINR(calculations.emi)}\n` +
        `💸 Total Interest: ${formatINR(calculations.totalInterest)}\n` +
        `💵 Total Payment: ${formatINR(calculations.totalPayment)}\n\n` +
        `Calculate yours: https://fincado.com/emi-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'emi_shared', {
        method: 'whatsapp',
        mode: calculatorMode,
      });
    }
  }, [
    calculatorMode,
    affordableEMI,
    affordabilityRate,
    affordabilityTenure,
    amount,
    rate,
    tenure,
    calculations.maxLoan,
    calculations.totalInterest,
    calculations.totalPayment,
    calculations.emi,
  ]);

  const handleDownloadReport = useCallback(() => {
    let csvContent =
      'Year,Opening Balance,Principal Paid,Interest Paid,Closing Balance,Total EMI Paid\n';

    calculations.yearlyBreakdown.forEach((row) => {
      csvContent += `${row.year},${row.openingBalance},${row.principalPaid},${row.interestPaid},${row.closingBalance},${row.emiPaid}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emi-breakdown-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success(t.reportDownloaded);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'emi_report_downloaded', {
        mode: calculatorMode,
      });
    }
  }, [calculations.yearlyBreakdown, calculatorMode, t.reportDownloaded]);

  const handleLoadCalculation = useCallback(
    (calc: SavedCalculation) => {
      if (calc.mode === 'affordability') {
        setCalculatorMode('affordability');
        setAffordableEMI(calc.emi);
        setAffordabilityRate(calc.rate);
        setAffordabilityTenure(calc.tenure);
      } else {
        setCalculatorMode('emi');
        setAmount(calc.amount);
        setRate(calc.rate);
        setTenure(calc.tenure);
      }
      toast.success(t.calculationLoaded);
    },
    [t.calculationLoaded],
  );

  return (
    <div className="space-y-6">
      {/* ✅ Mode Selector */}
      <Card className="bg-card">
        <CardContent className="p-4">
          <Tabs
            value={calculatorMode}
            onValueChange={(v) =>
              setCalculatorMode(v as 'emi' | 'affordability')
            }
          >
            <TabsList className="grid w-full grid-cols-2 h-14 p-1.5 bg-white rounded-xl">
              <TabsTrigger
                value="emi"
                className={cn(
                  'flex items-center justify-center gap-2 font-semibold transition-all rounded-lg',
                  'data-[state=active]:bg-linear-to-r data-[state=active]:from-[#B0EC70] data-[state=active]:to-[#B0EC70]',
                  'data-[state=active]:text-[#111827] data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]',
                  'data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:bg-slate-200/50',
                )}
              >
                <TrendingUp className="h-5 w-5" />
                <span className="hidden sm:inline">{t.emiMode}</span>
                <span className="sm:hidden">EMI</span>
              </TabsTrigger>
              <TabsTrigger
                value="affordability"
                className={cn(
                  'flex items-center justify-center gap-2 font-semibold transition-all rounded-lg',
                  'data-[state=active]:bg-linear-to-r data-[state=active]:from-[#B0EC70] data-[state=active]:to-[#B0EC70]',
                  'data-[state=active]:text-[#111827] data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]',
                  'data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:bg-slate-200/50',
                )}
              >
                <Target className="h-5 w-5" />
                <span className="hidden sm:inline">{t.affordabilityMode}</span>
                <span className="sm:hidden">Affordability</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* ✅ Comparison Mode Toggle - ENHANCED VISIBILITY */}
      {calculatorMode === 'emi' && (
        <Card className="bg-white">
          <CardContent className="py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={cn('', comparisonMode ? '' : '')} />
                  <Switch
                    checked={comparisonMode}
                    onCheckedChange={setComparisonMode}
                    id="comparison-mode"
                    className={cn(
                      'relative scale-100',
                      'data-[state=checked]:bg-[#B0EC70]',
                      'data-[state=unchecked]:bg-[#D1D5DB]',
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="comparison-mode"
                    className="text-base font-semibold text-slate-900 cursor-pointer flex items-center gap-2"
                  >
                    <span>{t.comparisonMode}</span>
                  </label>
                  <p className="text-xs text-slate-600">
                    Compare two loan options side by side
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                  comparisonMode
                    ? 'bg-[#C0F08D] text-[#111827] border-2 border-lime-200'
                    : 'bg-slate-100 text-slate-500 border-2 border-slate-200',
                )}
              >
                {comparisonMode ? '✓ Active' : 'Inactive'}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ✅ Main Calculator(s) */}
      {!comparisonMode ? (
        <Card className="bg-card">
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                {calculatorMode === 'emi' ? (
                  <>
                    <CalculatorField
                      label={t.loanAmount}
                      value={amount}
                      min={100000}
                      max={20000000}
                      step={50000}
                      onChange={setAmount}
                    />

                    <CalculatorField
                      label={t.interestRate}
                      value={rate}
                      min={1}
                      max={20}
                      step={0.1}
                      onChange={setRate}
                    />

                    <CalculatorField
                      label={t.loanTenure}
                      value={tenure}
                      min={1}
                      max={30}
                      step={1}
                      onChange={setTenure}
                    />
                  </>
                ) : (
                  <>
                    <CalculatorField
                      label={t.affordableEMI}
                      value={affordableEMI}
                      min={5000}
                      max={500000}
                      step={1000}
                      onChange={setAffordableEMI}
                    />

                    <CalculatorField
                      label={t.interestRate}
                      value={affordabilityRate}
                      min={1}
                      max={20}
                      step={0.1}
                      onChange={setAffordabilityRate}
                    />

                    <CalculatorField
                      label={t.loanTenure}
                      value={affordabilityTenure}
                      min={1}
                      max={30}
                      step={1}
                      onChange={setAffordabilityTenure}
                    />

                    <div className="bg-[#F7FDF1]  p-4 rounded-lg border border-[#B0EC70]">
                      <div className="text-sm font-medium text-[#577A30] ">
                        {t.maxLoanAmount}
                      </div>
                      <div className="text-2xl font-semibold text-[#74A046]  mt-1">
                        {formatINR(calculations.maxLoan || 0)}
                      </div>
                      <p className="text-xs text-[#577A30] mt-2 font-medium">
                        {t.youCanBorrow} {formatINR(calculations.maxLoan || 0)}{' '}
                        {t.withAffordableEMI} {formatINR(affordableEMI)}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center justify-center">
                <EMIPieChart
                  principalPct={calculations.principalPct}
                  interestPct={calculations.interestPct}
                />

                <div className="mt-6 text-center w-full">
                  <div className="text-sm text-[#6B7280] font-semibold">
                    {calculatorMode === 'affordability'
                      ? t.affordableEMI
                      : t.monthlyEMI}
                  </div>

                  <div className="mt-1 text-3xl sm:text-4xl font-bold text-[#74A046]">
                    {formatINR(calculations.emi)}
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                    <Card className="border-border">
                      <CardContent className="p-4">
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {t.principalAmount}
                        </div>
                        <div className="mt-1 font-semibold text-foreground whitespace-nowrap">
                          {formatINR(
                            calculatorMode === 'affordability'
                              ? calculations.maxLoan || 0
                              : amount,
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-[#FFDFDD]">
                      <CardContent className="p-4">
                        <div className="text-xs text-[#DB3E82] font-semibold">
                          {t.totalInterest}
                        </div>
                        <div className="mt-1 font-semibold text-[#DB3E82] whitespace-nowrap">
                          + {formatINR(calculations.totalInterest)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-3 text-xs text-slate-500">
                    {t.returnsDisclaimer}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EFFBE2] text-sm font-semibold">
                  A
                </span>
                {t.optionA}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.loanAmount}
                value={amount}
                min={100000}
                max={20000000}
                step={50000}
                onChange={setAmount}
              />

              <CalculatorField
                label={t.interestRate}
                value={rate}
                min={1}
                max={20}
                step={0.1}
                onChange={setRate}
              />

              <CalculatorField
                label={t.loanTenure}
                value={tenure}
                min={1}
                max={30}
                step={1}
                onChange={setTenure}
              />

              <div className="pt-4 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-xs text-slate-600">{t.monthlyEMI}</div>
                  <div className="text-2xl font-semibold text-[#74A046] mt-1">
                    {formatINR(calculations.emi)}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    {t.totalInterest}
                  </div>
                  <div className="text-lg font-semibold text-[#FF568E]">
                    {formatINR(calculations.totalInterest)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EFFBE2] text-slate-900 text-sm font-semibold">
                  B
                </span>
                {t.optionB}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.loanAmount}
                value={amount2}
                min={100000}
                max={20000000}
                step={50000}
                onChange={setAmount2}
              />

              <CalculatorField
                label={t.interestRate}
                value={rate2}
                min={1}
                max={20}
                step={0.1}
                onChange={setRate2}
              />

              <CalculatorField
                label={t.loanTenure}
                value={tenure2}
                min={1}
                max={30}
                step={1}
                onChange={setTenure2}
              />

              <div className="pt-4 border-t border-blue-200">
                <div className="text-center">
                  <div className="text-xs text-slate-600">{t.monthlyEMI}</div>
                  <div className="text-2xl font-semibold text-[#74A046] mt-1">
                    {formatINR(calculations2?.emi || 0)}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    {t.totalInterest}
                  </div>
                  <div className="text-lg font-semibold text-[#FF568E]">
                    {formatINR(calculations2?.totalInterest || 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {comparisonMode && calculations2 && (
        <Card className="bg-[#1B2E06]">
          <CardHeader>
            <CardTitle className="text-lg text-[#B0EC70]">
              {t.whichBetter}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-[#D1D5DB] mb-1">
                  {t.emiDifference}
                </div>
                <div
                  className={`text-xl font-semibold ${calculations.emi < calculations2.emi ? 'text-[#74A046]' : 'text-[#FF568E]'}`}
                >
                  {formatINR(Math.abs(calculations.emi - calculations2.emi))}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#D1D5DB] mb-1">
                  {t.interestDifference}
                </div>
                <div
                  className={`text-xl font-semibold ${calculations.totalInterest < calculations2.totalInterest ? 'text-[#74A046]' : 'text-[#FF568E]'}`}
                >
                  {formatINR(
                    Math.abs(
                      calculations.totalInterest - calculations2.totalInterest,
                    ),
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#D1D5DB] mb-1">{t.winner}</div>
                <div className="text-xl font-semibold">
                  {calculations.totalInterest < calculations2.totalInterest ? (
                    <span className="text-[#B0EC70]">🏆 {t.optionA}</span>
                  ) : (
                    <span className="text-[#B0EC70]">🏆 {t.optionB}</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-[#D1D5DB] font-semibold pt-2 border-t">
              {calculations.totalInterest < calculations2.totalInterest
                ? `${t.optionA} ${t.optionSaves} ${formatINR(calculations2.totalInterest - calculations.totalInterest)} ${t.inInterest}`
                : `${t.optionB} ${t.optionSaves} ${formatINR(calculations.totalInterest - calculations2.totalInterest)} ${t.inInterest}`}
            </p>
          </CardContent>
        </Card>
      )}

      {isClient &&
        calculations.yearlyBreakdown &&
        calculations.yearlyBreakdown.length > 0 && (
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                {t.loanGrowthOverTime}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={calculations.yearlyBreakdown}>
                  <defs>
                    <linearGradient
                      id="colorPrincipal"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#B0EC70" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#B0EC70"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorInterest"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#FF99A7" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#FF99A7"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FF99A7" />
                  <XAxis
                    dataKey="year"
                    label={{
                      value: t.year,
                      position: 'insideBottom',
                      offset: -5,
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) =>
                      `₹${(value / 100000).toFixed(0)}L`
                    }
                  />
                  <Tooltip
                    formatter={(value: number | undefined) =>
                      value !== undefined ? formatINR(value) : 'N/A'
                    }
                    labelFormatter={(label) => `${t.year} ${label}`}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="principalPaid"
                    name={t.principalPaid}
                    stackId="1"
                    stroke="#92C65B"
                    fillOpacity={1}
                    fill="url(#colorPrincipal)"
                  />
                  <Area
                    type="monotone"
                    dataKey="interestPaid"
                    name={t.interestPaid}
                    stackId="1"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorInterest)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

      {isClient &&
        calculations.yearlyBreakdown &&
        calculations.yearlyBreakdown.length > 0 && (
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">{t.loanBreakdown}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 font-semibold">{t.year}</th>
                      <th className="text-right p-3 font-semibold">
                        {t.openingBalance}
                      </th>
                      <th className="text-right p-3 font-semibold">
                        {t.principalPaid}
                      </th>
                      <th className="text-right p-3 font-semibold">
                        {t.interestPaid}
                      </th>
                      <th className="text-right p-3 font-semibold">
                        {t.closingBalance}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculations.yearlyBreakdown.map((row, idx) => (
                      <tr
                        key={row.year}
                        className={`border-b border-slate-100 ${
                          idx % 2 === 0 ? 'bg-slate-50/50' : ''
                        }`}
                      >
                        <td className="p-3 font-medium">{row.year}</td>
                        <td className="p-3 text-right text-[#2874A6]">
                          {formatINR(row.openingBalance)}
                        </td>
                        <td className="p-3 text-right text-[#2E7D32]">
                          {formatINR(row.principalPaid)}
                        </td>
                        <td className="p-3 text-right text-[#C45D2C]">
                          {formatINR(row.interestPaid)}
                        </td>
                        <td className="p-3 text-right font-semibold text-[#1E4A6F]">
                          {formatINR(row.closingBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSaveCalculation} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          {t.saveCalculation}
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          {t.shareWhatsApp}
        </Button>

        <Button onClick={handleDownloadReport} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          {t.downloadReport}
        </Button>

        {calculatorMode === 'emi' && !comparisonMode && (
          <Button
            onClick={() => setShowPrepayment(!showPrepayment)}
            variant={showPrepayment ? 'default' : 'outline'}
            size="sm"
          >
            <Zap className="mr-2 h-4 w-4" />
            {showPrepayment ? t.hidePrepayment : t.showPrepayment}
          </Button>
        )}
      </div>

      {showPrepayment && calculatorMode === 'emi' && !comparisonMode && (
        <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Zap className="h-5 w-5 text-purple-600" />
              {t.prepaymentImpact}
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">
              {t.prepaymentDescription}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                {t.extraPaymentAmount}
              </label>
              <CalculatorField
                label=""
                value={prepaymentAmount}
                min={10000}
                max={amount}
                step={10000}
                onChange={setPrepaymentAmount}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                {t.whenToPay} (
                {t.afterMonths
                  .replace('{count}', String(prepaymentMonth))
                  .replace(
                    '{unit}',
                    prepaymentMonth === 1 ? t.month : t.months,
                  )}
                )
              </label>
              <Slider
                value={[prepaymentMonth]}
                onValueChange={([value]) => setPrepaymentMonth(value)}
                min={1}
                max={tenure * 12}
                step={1}
                className="py-4"
              />
              <div className="text-xs text-slate-500">
                {t.makeAfter} {prepaymentMonth} of {tenure * 12}
              </div>
            </div>

            <div className="p-5 bg-linear-to-br from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                {t.yourSavings}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    {t.interestSaved}
                  </div>
                  <div className="text-3xl font-bold text-emerald-700">
                    {formatINR(prepaymentImpact.interestSaved)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {t.tenureReduced}
                  </div>
                  <div className="text-3xl font-bold text-emerald-700">
                    {prepaymentImpact.tenureReduction}{' '}
                    {prepaymentImpact.tenureReduction === 1
                      ? t.month
                      : t.months}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700 mt-4 p-3 bg-white/70 rounded border border-emerald-200">
                💡 <strong>Tip:</strong> {t.prepaymentTip}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">{t.savedCalculations}</CardTitle>
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
                    onClick={() => handleLoadCalculation(calc)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          {formatINR(calc.amount)} @ {calc.rate}% for{' '}
                          {calc.tenure} {t.years}
                          {calc.mode === 'affordability' && (
                            <span className="text-xs text-blue-600 ml-1">
                              ({t.affordabilityMode})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          EMI: {formatINR(calc.emi)} | {t.totalInterest}:{' '}
                          {formatINR(calc.totalInterest)}
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
    </div>
  );
}
