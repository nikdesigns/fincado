'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  RefreshCcw,
  Palmtree,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Calculator,
  AlertTriangle,
  Download,
  Target,
  LineChart,
  Heart,
  Home,
  Briefcase,
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { cn } from '@/lib/utils';

/* ---------- TYPES ---------- */
export interface RetirementLabels {
  calculatorMode: string;
  basicPlanning: string;
  comprehensivePlanning: string;
  highSIPWarning: string;
  highSIPMessage: string;
  retirementPlanning: string;
  reset: string;
  currentAge: string;
  retirementAge: string;
  lifeExpectancy: string;
  currentMonthlyExpense: string;
  currentSavings: string;
  showAdvancedRates: string;
  hideAdvancedRates: string;
  inflationRate: string;
  healthcareInflation: string;
  preRetirementReturn: string;
  postRetirementReturn: string;
  targetRetirementCorpus: string;
  retirementYears: string;
  monthlySIPRequired: string;
  perMonth: string;
  forNextYears: string;
  expenseAtRetirement: string;
  monthInflationAdjusted: string;
  currentSavingsFV: string;
  ofTarget: string;
  investmentBreakdown: string;
  gapToFill: string;
  totalSIPInvestment: string;
  expectedReturns: string;
  retirementNote: string;
  savePlan: string;
  shareWhatsApp: string;
  downloadReport: string;
  savedRetirementPlans: string;
  clearAll: string;
  age: string;
  corpus: string;
  sip: string;
  expense: string;
  savings: string;
  returns: string;
  sipRequiredMessage: string;
  savingsSufficient: string;
  additionalIncome: string;
  pensionIncome: string;
  rentalIncome: string;
  otherIncome: string;
  monthlyIncomeTotal: string;
  netMonthlyShortfall: string;
  adjustedCorpusNeeded: string;
  comparisonMode: string;
  compareScenarios: string;
  scenarioA: string;
  scenarioB: string;
  whichBetter: string;
  lowerSIP: string;
  higherCorpus: string;
  yearByYearProjection: string;
  year: string;
  corpusGrowth: string;
  annualSIP: string;
  corpusValue: string;
  calculationSaved: string;
  calculationDeleted: string;
  allCleared: string;
  calculationLoaded: string;
  reportDownloaded: string;
  returnsDisclaimer: string;
  emergencyFund: string;
  emergencyFundNote: string;
  healthcareCosts: string;
  estimatedHealthcare: string;
  perYear: string;
  taxImpact: string;
  showTaxEstimate: string;
  hideTaxEstimate: string;
  estimatedAnnualTax: string;
  taxNote: string;
}

interface SavedCalculation {
  id: number;
  currentAge: number;
  retireAge: number;
  lifeExpectancy: number;
  monthlyExpense: number;
  currentSavings: number;
  inflation: number;
  healthcareInflation: number;
  preReturn: number;
  postReturn: number;
  pensionIncome: number;
  rentalIncome: number;
  otherIncome: number;
  targetCorpus: number;
  sipRequired: number;
  date: string;
  mode?: 'basic' | 'comprehensive';
}

interface YearlyProjection {
  year: number;
  age: number;
  corpusValue: number;
  annualSIP: number;
  cumulativeSIP: number;
  growthEarned: number;
}

const DEFAULT_LABELS: RetirementLabels = {
  calculatorMode: 'Calculator Mode',
  basicPlanning: 'Basic Planning',
  comprehensivePlanning: 'Comprehensive Planning',
  highSIPWarning: 'High SIP Required',
  highSIPMessage:
    'Your required monthly SIP is quite high. Consider increasing retirement age, reducing expenses, or boosting current savings.',
  retirementPlanning: 'Retirement Planning Calculator',
  reset: 'Reset',
  currentAge: 'Current Age (Years)',
  retirementAge: 'Retirement Age (Years)',
  lifeExpectancy: 'Life Expectancy (Years)',
  currentMonthlyExpense: 'Current Monthly Expense (₹)',
  currentSavings: 'Current Savings (₹)',
  showAdvancedRates: 'Show Advanced Settings',
  hideAdvancedRates: 'Hide Advanced Settings',
  inflationRate: 'General Inflation (% p.a.)',
  healthcareInflation: 'Healthcare Inflation (% p.a.)',
  preRetirementReturn: 'Pre-Retirement Return (% p.a.)',
  postRetirementReturn: 'Post-Retirement Return (% p.a.)',
  targetRetirementCorpus: 'Target Retirement Corpus',
  retirementYears: 'years of retirement',
  monthlySIPRequired: 'Monthly SIP Required',
  perMonth: '/month',
  forNextYears: 'for next',
  expenseAtRetirement: 'Expense at Retirement',
  monthInflationAdjusted: '/month (inflation adjusted)',
  currentSavingsFV: 'Current Savings FV',
  ofTarget: 'of target',
  investmentBreakdown: 'Investment Breakdown',
  gapToFill: 'Gap to Fill',
  totalSIPInvestment: 'Total SIP Investment',
  expectedReturns: 'Expected Returns',
  retirementNote:
    'Calculations based on your life expectancy and lifestyle assumptions.',
  savePlan: 'Save Plan',
  shareWhatsApp: 'Share via WhatsApp',
  downloadReport: 'Download Report',
  savedRetirementPlans: 'Your Saved Retirement Plans',
  clearAll: 'Clear All',
  age: 'Age',
  corpus: 'Corpus',
  sip: 'SIP',
  expense: 'Expense',
  savings: 'Savings',
  returns: 'Returns',
  sipRequiredMessage: 'You need to invest',
  savingsSufficient: 'Your current savings are sufficient!',
  additionalIncome: 'Additional Retirement Income',
  pensionIncome: 'Monthly Pension (₹)',
  rentalIncome: 'Monthly Rental Income (₹)',
  otherIncome: 'Other Monthly Income (₹)',
  monthlyIncomeTotal: 'Total Monthly Income',
  netMonthlyShortfall: 'Net Monthly Shortfall',
  adjustedCorpusNeeded: 'Adjusted Corpus Needed',
  comparisonMode: 'Compare Retirement Scenarios',
  compareScenarios: 'Compare two retirement strategies side-by-side',
  scenarioA: 'Scenario A - Current Plan',
  scenarioB: 'Scenario B - Alternative',
  whichBetter: 'Which Scenario is Better?',
  lowerSIP: 'Lower SIP Required',
  higherCorpus: 'Higher Corpus',
  yearByYearProjection: 'Year-by-Year Corpus Projection',
  year: 'Year',
  corpusGrowth: 'Corpus Growth Over Time',
  annualSIP: 'Annual SIP',
  corpusValue: 'Corpus Value',
  calculationSaved: 'Retirement plan saved!',
  calculationDeleted: 'Calculation deleted!',
  allCleared: 'All plans cleared!',
  calculationLoaded: 'Plan loaded!',
  reportDownloaded: 'Report downloaded!',
  returnsDisclaimer:
    'Calculations are illustrative. Actual returns may vary based on market conditions.',
  emergencyFund: 'Emergency Fund',
  emergencyFundNote: '6 months of expenses recommended',
  healthcareCosts: 'Healthcare Costs',
  estimatedHealthcare: 'Estimated Healthcare Cost',
  perYear: '/year',
  taxImpact: 'Tax Impact Estimate',
  showTaxEstimate: 'Show Tax Estimate',
  hideTaxEstimate: 'Hide Tax Estimate',
  estimatedAnnualTax: 'Estimated Annual Tax',
  taxNote:
    'Tax estimates are approximate and may vary based on actual income and deductions.',
};

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

const RETIREMENT_STORAGE_KEY = 'retirement_calculator_history';

const getSavedCalculations = (): SavedCalculation[] => {
  if (typeof window === 'undefined') return [];

  try {
    const saved = localStorage.getItem(RETIREMENT_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as SavedCalculation[]) : [];
  } catch (error) {
    console.error('Error loading saved retirement calculations:', error);
    return [];
  }
};

/* ---------- COMPONENT ---------- */
export default function RetirementCalculatorClient({
  labels,
}: {
  labels?: Partial<RetirementLabels>;
}) {
  const t = useMemo(() => ({ ...DEFAULT_LABELS, ...labels }), [labels]);

  // ✅ Calculator Mode
  const [calculatorMode, setCalculatorMode] = useState<
    'basic' | 'comprehensive'
  >('basic');

  // ✅ Basic Inputs
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpense, setMonthlyExpense] = useState(30000);
  const [currentSavings, setCurrentSavings] = useState(500000);

  // ✅ Advanced Settings
  const [inflation, setInflation] = useState(6);
  const [healthcareInflation, setHealthcareInflation] = useState(8);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(8);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ✅ Comprehensive Mode - Additional Inputs
  const [pensionIncome, setPensionIncome] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);

  // ✅ Tax Calculator
  const [showTaxEstimate, setShowTaxEstimate] = useState(false);

  // ✅ Comparison Mode
  const [comparisonMode, setComparisonMode] = useState(false);
  const [retireAge2, setRetireAge2] = useState(65);
  const [monthlyExpense2, setMonthlyExpense2] = useState(25000);
  const [currentSavings2, setCurrentSavings2] = useState(750000);

  // ✅ Saved Calculations
  const isClient = typeof window !== 'undefined';
  const [savedCalculations, setSavedCalculations] =
    useState<SavedCalculation[]>(getSavedCalculations);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'Retirement',
        page_path: window.location.pathname,
      });
    }
  }, []);

  // ✅ Calculate Retirement Corpus
  const calculateRetirement = useCallback(
    (
      age: number,
      retire: number,
      life: number,
      expense: number,
      savings: number,
      inflRate: number,
      healthInflRate: number,
      preRet: number,
      postRet: number,
      pension: number,
      rental: number,
      other: number,
    ) => {
      const yearsToRetire = Math.max(0, retire - age);
      const monthsToRetire = yearsToRetire * 12;
      const retirementYears = Math.max(0, life - retire);

      const monthlyInflation = inflRate / 12 / 100;
      const monthlyPreReturn = preRet / 12 / 100;

      // Future expense at retirement
      const expenseAtRetirement =
        expense * Math.pow(1 + monthlyInflation, monthsToRetire);

      // Healthcare costs (estimated 20% of expenses with higher inflation)
      const healthcareCostAtRetirement =
        expense * 0.2 * Math.pow(1 + healthInflRate / 12 / 100, monthsToRetire);

      const totalMonthlyExpenseAtRetirement =
        expenseAtRetirement + healthcareCostAtRetirement;

      // Total additional income
      const totalAdditionalIncome = pension + rental + other;

      // Net monthly shortfall
      const netMonthlyShortfall = Math.max(
        0,
        totalMonthlyExpenseAtRetirement - totalAdditionalIncome,
      );

      const annualExpenseAtRetirement = netMonthlyShortfall * 12;

      // Real return adjusted for inflation
      const realReturn = (1 + postRet / 100) / (1 + inflRate / 100) - 1;

      // Target corpus using annuity formula
      let targetCorpus = 0;
      if (realReturn <= 0) {
        targetCorpus = annualExpenseAtRetirement * retirementYears;
      } else {
        targetCorpus =
          annualExpenseAtRetirement *
          ((1 - Math.pow(1 + realReturn, -retirementYears)) / realReturn);
      }

      // Emergency fund (6 months of expenses)
      const emergencyFund = totalMonthlyExpenseAtRetirement * 6;
      targetCorpus += emergencyFund;

      // Future value of current savings
      const savingsFV =
        savings * Math.pow(1 + monthlyPreReturn, monthsToRetire);

      // Gap to fill
      const gap = Math.max(0, targetCorpus - savingsFV);

      // Required monthly SIP
      let sip = 0;
      if (gap > 0 && monthsToRetire > 0) {
        if (monthlyPreReturn <= 0) {
          sip = gap / monthsToRetire;
        } else {
          sip =
            gap /
            (((Math.pow(1 + monthlyPreReturn, monthsToRetire) - 1) /
              monthlyPreReturn) *
              (1 + monthlyPreReturn));
        }
      }

      const securedPct =
        targetCorpus > 0
          ? Math.min(100, Math.round((savingsFV / targetCorpus) * 100))
          : 0;

      const gapPct = 100 - securedPct;

      const totalSIPInvestment = sip * monthsToRetire;
      const sipGrowth = gap - totalSIPInvestment;

      const isShortfall = gap > 0;

      // Year-by-year projection
      const yearlyProjection: YearlyProjection[] = [];
      let corpus = savings;
      let cumulativeSIP = 0;

      for (let y = 1; y <= yearsToRetire; y++) {
        const annualSIP = sip * 12;
        cumulativeSIP += annualSIP;

        // Growth for the year
        corpus =
          corpus * (1 + preRet / 100) + annualSIP * (1 + preRet / 100 / 2);

        yearlyProjection.push({
          year: y,
          age: age + y,
          corpusValue: Math.round(corpus),
          annualSIP: Math.round(annualSIP),
          cumulativeSIP: Math.round(cumulativeSIP),
          growthEarned: Math.round(corpus - savings - cumulativeSIP),
        });
      }

      // Tax estimate (simplified)
      const annualCorpusWithdrawal = netMonthlyShortfall * 12;
      const estimatedTax =
        annualCorpusWithdrawal > 250000 ? annualCorpusWithdrawal * 0.2 : 0;

      return {
        targetCorpus: Math.round(targetCorpus),
        expenseAtRetirement: Math.round(totalMonthlyExpenseAtRetirement),
        savingsFV: Math.round(savingsFV),
        sip: Math.round(sip),
        securedPct,
        gapPct,
        gap: Math.round(gap),
        yearsToRetire,
        retirementYears,
        isShortfall,
        totalSIPInvestment: Math.round(totalSIPInvestment),
        sipGrowth: Math.round(sipGrowth),
        totalAdditionalIncome,
        netMonthlyShortfall: Math.round(netMonthlyShortfall),
        yearlyProjection,
        emergencyFund: Math.round(emergencyFund),
        healthcareCostAtRetirement: Math.round(healthcareCostAtRetirement),
        estimatedTax: Math.round(estimatedTax),
      };
    },
    [],
  );

  // ✅ Main Calculations
  const results = useMemo(() => {
    return calculateRetirement(
      currentAge,
      retireAge,
      lifeExpectancy,
      monthlyExpense,
      currentSavings,
      inflation,
      healthcareInflation,
      preReturn,
      postReturn,
      pensionIncome,
      rentalIncome,
      otherIncome,
    );
  }, [
    currentAge,
    retireAge,
    lifeExpectancy,
    monthlyExpense,
    currentSavings,
    inflation,
    healthcareInflation,
    preReturn,
    postReturn,
    pensionIncome,
    rentalIncome,
    otherIncome,
    calculateRetirement
  ]);

  // ✅ Comparison Calculations
  const results2 = useMemo(() => {
    if (!comparisonMode) return null;

    return calculateRetirement(
      currentAge,
      retireAge2,
      lifeExpectancy,
      monthlyExpense2,
      currentSavings2,
      inflation,
      healthcareInflation,
      preReturn,
      postReturn,
      pensionIncome,
      rentalIncome,
      otherIncome,
    );
  }, [
    comparisonMode,
    currentAge,
    retireAge2,
    lifeExpectancy,
    monthlyExpense2,
    currentSavings2,
    inflation,
    healthcareInflation,
    preReturn,
    postReturn,
    pensionIncome,
    rentalIncome,
    otherIncome,
    calculateRetirement
  ]);

  // ✅ Handlers
  const handleReset = useCallback(() => {
    setCurrentAge(30);
    setRetireAge(60);
    setLifeExpectancy(85);
    setMonthlyExpense(30000);
    setCurrentSavings(500000);
    setInflation(6);
    setHealthcareInflation(8);
    setPreReturn(12);
    setPostReturn(8);
    setPensionIncome(0);
    setRentalIncome(0);
    setOtherIncome(0);
    toast.success('Calculator reset to defaults!');
  }, []);

  const handleSave = useCallback(() => {
    const calc: SavedCalculation = {
      id: savedCalculations.length
        ? Math.max(...savedCalculations.map((item) => item.id)) + 1
        : 1,
      currentAge,
      retireAge,
      lifeExpectancy,
      monthlyExpense,
      currentSavings,
      inflation,
      healthcareInflation,
      preReturn,
      postReturn,
      pensionIncome,
      rentalIncome,
      otherIncome,
      targetCorpus: results.targetCorpus,
      sipRequired: results.sip,
      date: new Date().toISOString(),
      mode: calculatorMode,
    };

    setSavedCalculations((prev) => {
      const updated = [calc, ...prev].slice(0, 10);
      try {
        localStorage.setItem(RETIREMENT_STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving retirement calculation:', error);
      }
      return updated;
    });

    toast.success(t.calculationSaved);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'retirement_calculation_saved', {
        current_age: currentAge,
        retire_age: retireAge,
        target_corpus: results.targetCorpus,
        mode: calculatorMode,
      });
    }
  }, [
    currentAge,
    retireAge,
    lifeExpectancy,
    monthlyExpense,
    currentSavings,
    inflation,
    healthcareInflation,
    preReturn,
    postReturn,
    pensionIncome,
    rentalIncome,
    otherIncome,
    results.targetCorpus,
    results.sip,
    savedCalculations,
    calculatorMode,
    t.calculationSaved
  ]);

  const handleShare = useCallback(() => {
    const message =
      `🏖️ Retirement Planning Calculation\n\n` +
      `Current Age: ${currentAge} | Retirement Age: ${retireAge}\n` +
      `Years to Retire: ${results.yearsToRetire} years\n` +
      `Life Expectancy: ${lifeExpectancy} years\n` +
      `Current Monthly Expense: ${formatINR(monthlyExpense)}\n\n` +
      `📊 Retirement Goals:\n` +
      `Target Corpus: ${formatINR(results.targetCorpus)}\n` +
      `Monthly Expense at Retirement: ${formatINR(results.expenseAtRetirement)}\n` +
      `Current Savings Future Value: ${formatINR(results.savingsFV)}\n\n` +
      `💰 Action Required:\n` +
      `Monthly SIP Required: ${formatINR(results.sip)}\n` +
      `Investment Period: ${results.yearsToRetire} years\n\n` +
      `Plan your retirement: https://fincado.com/retirement-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'retirement_calculation_shared', {
        method: 'whatsapp',
      });
    }
  }, [
    currentAge,
    retireAge,
    lifeExpectancy,
    monthlyExpense,
    results.yearsToRetire,
    results.targetCorpus,
    results.expenseAtRetirement,
    results.savingsFV,
    results.sip
  ]);

  const handleDownloadReport = useCallback(() => {
    let csvContent =
      'Year,Age,Corpus Value,Annual SIP,Cumulative SIP,Growth Earned\n';

    results.yearlyProjection.forEach((row) => {
      csvContent += `${row.year},${row.age},${row.corpusValue},${row.annualSIP},${row.cumulativeSIP},${row.growthEarned}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `retirement-plan-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success(t.reportDownloaded);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'retirement_report_downloaded', {
        mode: calculatorMode,
      });
    }
  }, [results.yearlyProjection, calculatorMode, t.reportDownloaded]);

  const handleDelete = useCallback(
    (id: number) => {
      setSavedCalculations((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        try {
          localStorage.setItem(RETIREMENT_STORAGE_KEY, JSON.stringify(updated));
        } catch (error) {
          console.error('Error updating retirement history:', error);
        }
        return updated;
      });

      toast.success(t.calculationDeleted);
    },
    [t.calculationDeleted],
  );

  const handleClearAll = useCallback(() => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem(RETIREMENT_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing retirement history:', error);
    }
    toast.success(t.allCleared);
  }, [t.allCleared]);

  const handleLoad = useCallback(
    (calc: SavedCalculation) => {
      setCalculatorMode(calc.mode || 'basic');
      setCurrentAge(calc.currentAge);
      setRetireAge(calc.retireAge);
      setLifeExpectancy(calc.lifeExpectancy);
      setMonthlyExpense(calc.monthlyExpense);
      setCurrentSavings(calc.currentSavings);
      setInflation(calc.inflation);
      setHealthcareInflation(calc.healthcareInflation);
      setPreReturn(calc.preReturn);
      setPostReturn(calc.postReturn);
      setPensionIncome(calc.pensionIncome);
      setRentalIncome(calc.rentalIncome);
      setOtherIncome(calc.otherIncome);
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
              setCalculatorMode(v as 'basic' | 'comprehensive')
            }
          >
            <TabsList className="grid w-full grid-cols-2 h-14 p-1.5 bg-slate-100 rounded-xl">
              <TabsTrigger
                value="basic"
                className={cn(
                  'flex items-center justify-center gap-2 font-semibold transition-all rounded-lg',
                  'data-[state=active]:bg-brand-400',
                  'data-[state=active]:text-[#111827] data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]',
                  'data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:bg-slate-200/50',
                )}
              >
                <Calculator className="h-5 w-5" />
                <span className="hidden sm:inline">{t.basicPlanning}</span>
                <span className="sm:hidden">Basic</span>
              </TabsTrigger>
              <TabsTrigger
                value="comprehensive"
                className={cn(
                  'flex items-center justify-center gap-2 font-semibold transition-all rounded-lg',
                  'data-[state=active]:bg-brand-400',
                  'data-[state=active]:text-[#111827] data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]',
                  'data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:bg-slate-200/50',
                )}
              >
                <Target className="h-5 w-5" />
                <span className="hidden sm:inline">
                  {t.comprehensivePlanning}
                </span>
                <span className="sm:hidden">Comprehensive</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* ✅ Comparison Mode Toggle */}
      {calculatorMode === 'basic' && (
        <Card className="border-2 border-slate-200 bg-white">
          <CardContent className="py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className={cn(
                      'absolute inset-0 rounded-full blur-md transition-all',
                      comparisonMode ? 'bg-brand-300' : 'bg-slate-200',
                    )}
                  />
                  <Switch
                    checked={comparisonMode}
                    onCheckedChange={setComparisonMode}
                    id="comparison-mode"
                    className={cn(
                      'relative scale-110',
                      'data-[state=checked]:bg-brand-400',
                      'data-[state=unchecked]:bg-slate-400',
                      'shadow-md',
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
                  <p className="text-xs text-slate-600">{t.compareScenarios}</p>
                </div>
              </div>

              {comparisonMode && (
                <span className="text-xs font-semibold text-[#111827] bg-brand-400 px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shortfall Warning */}
      {results.isShortfall &&
        results.sip > monthlyExpense * 0.5 &&
        !comparisonMode && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="ml-2 text-sm text-amber-800">
              <strong>{t.highSIPWarning}:</strong> {formatINR(results.sip)}{' '}
              {t.perMonth}. {t.highSIPMessage}
            </AlertDescription>
          </Alert>
        )}

      {/* ✅ Main Calculator(s) */}
      {!comparisonMode ? (
        // Single Calculator
        <Card className="bg-card">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                <Palmtree className="h-5 w-5 text-brand-700" />
                {t.retirementPlanning}
              </CardTitle>
              <button
                onClick={handleReset}
                className="text-xs text-slate-500 flex items-center gap-1 hover:text-brand-700 transition-colors"
              >
                <RefreshCcw className="w-3 h-3" /> {t.reset}
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* INPUTS */}
              <div className="space-y-6">
                <CalculatorField
                  label={t.currentAge}
                  value={currentAge}
                  min={18}
                  max={retireAge - 1}
                  step={1}
                  onChange={setCurrentAge}
                />

                <CalculatorField
                  label={t.retirementAge}
                  value={retireAge}
                  min={currentAge + 1}
                  max={75}
                  step={1}
                  onChange={setRetireAge}
                />

                <CalculatorField
                  label={t.lifeExpectancy}
                  value={lifeExpectancy}
                  min={retireAge + 1}
                  max={100}
                  step={1}
                  onChange={setLifeExpectancy}
                />

                <CalculatorField
                  label={t.currentMonthlyExpense}
                  value={monthlyExpense}
                  min={10000}
                  max={500000}
                  step={5000}
                  onChange={setMonthlyExpense}
                />

                <CalculatorField
                  label={t.currentSavings}
                  value={currentSavings}
                  min={0}
                  max={10000000}
                  step={50000}
                  onChange={setCurrentSavings}
                />

                {/* Comprehensive Mode - Additional Income */}
                {calculatorMode === 'comprehensive' && (
                  <Card className="border-brand-200 bg-white">
                    <CardContent className="py-4 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-4 w-4 text-brand-700" />
                        <h4 className="text-sm font-semibold text-slate-900">
                          {t.additionalIncome}
                        </h4>
                      </div>

                      <CalculatorField
                        label={t.pensionIncome}
                        value={pensionIncome}
                        min={0}
                        max={100000}
                        step={1000}
                        onChange={setPensionIncome}
                      />

                      <CalculatorField
                        label={t.rentalIncome}
                        value={rentalIncome}
                        min={0}
                        max={200000}
                        step={1000}
                        onChange={setRentalIncome}
                      />

                      <CalculatorField
                        label={t.otherIncome}
                        value={otherIncome}
                        min={0}
                        max={100000}
                        step={1000}
                        onChange={setOtherIncome}
                      />

                      {results.totalAdditionalIncome > 0 && (
                        <div className="pt-2 border-t border-brand-200">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-700">
                              {t.monthlyIncomeTotal}:
                            </span>
                            <span className="font-semibold text-brand-700">
                              {formatINR(results.totalAdditionalIncome)}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Advanced Settings */}
                <div className="pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-xs text-slate-600 hover:text-slate-900"
                  >
                    <Calculator className="mr-2 h-3 w-3" />
                    {showAdvanced ? t.hideAdvancedRates : t.showAdvancedRates}
                  </Button>
                </div>

                {showAdvanced && (
                  <div className="space-y-6 p-4 bg-white rounded-lg border border-brand-200">
                    <CalculatorField
                      label={t.inflationRate}
                      value={inflation}
                      min={2}
                      max={10}
                      step={0.1}
                      onChange={setInflation}
                    />
                    <CalculatorField
                      label={t.healthcareInflation}
                      value={healthcareInflation}
                      min={4}
                      max={15}
                      step={0.1}
                      onChange={setHealthcareInflation}
                    />
                    <CalculatorField
                      label={t.preRetirementReturn}
                      value={preReturn}
                      min={4}
                      max={18}
                      step={0.1}
                      onChange={setPreReturn}
                    />
                    <CalculatorField
                      label={t.postRetirementReturn}
                      value={postReturn}
                      min={3}
                      max={12}
                      step={0.1}
                      onChange={setPostReturn}
                    />
                  </div>
                )}
              </div>

              {/* VISUALS */}
              <div className="flex flex-col items-center text-center space-y-6">
                <EMIPieChart
                  principalPct={results.securedPct}
                  interestPct={results.gapPct}
                  size={200}
                />

                <div>
                  <div className="text-sm text-muted-foreground">
                    {t.targetRetirementCorpus}
                  </div>
                  <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-brand-700">
                    {formatINR(results.targetCorpus)}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    For {results.retirementYears} {t.retirementYears}
                  </div>
                </div>

                {results.isShortfall && (
                  <div className="rounded-xl border-2 border-brand-300 bg-brand-50 px-6 py-4 w-full max-w-xs">
                    <div className="text-xs font-semibold text-brand-700">
                      {t.monthlySIPRequired}
                    </div>
                    <div className="mt-1 text-2xl font-extrabold text-brand-700">
                      {formatINR(results.sip)}
                      <span className="text-sm font-medium"> {t.perMonth}</span>
                    </div>
                    <div className="text-[11px] text-brand-700 mt-1">
                      {t.forNextYears} {results.yearsToRetire} years
                    </div>
                  </div>
                )}

                {!results.isShortfall && (
                  <div className="rounded-xl border-2 border-brand-300 bg-brand-50 px-6 py-4 w-full max-w-xs">
                    <div className="text-sm font-semibold text-brand-700">
                      🎉 {t.savingsSufficient}
                    </div>
                    <div className="text-xs text-brand-700 mt-2">
                      Your current savings will grow to{' '}
                      {formatINR(results.savingsFV)}, which exceeds your target
                      corpus.
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <Card className="border-border bg-white shadow-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">
                        {t.expenseAtRetirement}
                      </div>
                      <div className="mt-1 font-semibold text-[#DB3E82] whitespace-nowrap">
                        {formatINR(results.expenseAtRetirement)}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {t.monthInflationAdjusted}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-white shadow-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">
                        {t.currentSavingsFV}
                      </div>
                      <div className="mt-1 font-semibold text-muted-foreground whitespace-nowrap">
                        {formatINR(results.savingsFV)}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {results.securedPct}% {t.ofTarget}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Emergency Fund & Healthcare */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <Card className="border-border bg-white shadow-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Home className="h-3 w-3" />
                        {t.emergencyFund}
                      </div>
                      <div className="mt-1 font-semibold text-muted-foreground whitespace-nowrap">
                        {formatINR(results.emergencyFund)}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {t.emergencyFundNote}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-white shadow-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {t.healthcareCosts}
                      </div>
                      <div className="mt-1 font-semibold text-muted-foreground whitespace-nowrap">
                        {formatINR(results.healthcareCostAtRetirement * 12)}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {t.perYear}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Investment Breakdown */}
                {results.isShortfall && (
                  <div className="w-full p-4 bg-brand-50 rounded-lg border border-brand-200 text-left">
                    <h4 className="text-xs font-semibold text-brand-900 mb-2">
                      {t.investmentBreakdown}
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-700">{t.gapToFill}:</span>
                        <strong className="text-brand-700">
                          {formatINR(results.gap)}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">
                          {t.totalSIPInvestment}:
                        </span>
                        <strong className="text-slate-900">
                          {formatINR(results.totalSIPInvestment)}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">
                          {t.expectedReturns}:
                        </span>
                        <strong className="text-brand-700">
                          {formatINR(results.sipGrowth)}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-xs text-slate-400 italic">
                  {t.retirementNote}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Comparison Mode - Two Scenarios
        <div className="grid md:grid-cols-2 gap-6">
          {/* Scenario A */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-sm font-semibold">
                  A
                </span>
                {t.scenarioA}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.retirementAge}
                value={retireAge}
                min={currentAge + 1}
                max={75}
                step={1}
                onChange={setRetireAge}
              />

              <CalculatorField
                label={t.currentMonthlyExpense}
                value={monthlyExpense}
                min={10000}
                max={500000}
                step={5000}
                onChange={setMonthlyExpense}
              />

              <CalculatorField
                label={t.currentSavings}
                value={currentSavings}
                min={0}
                max={10000000}
                step={50000}
                onChange={setCurrentSavings}
              />

              <div className="pt-4 border-t border-brand-200">
                <div className="text-center space-y-3">
                  <div>
                    <div className="text-xs text-slate-600">
                      {t.targetRetirementCorpus}
                    </div>
                    <div className="text-2xl font-semibold text-brand-700 mt-1">
                      {formatINR(results.targetCorpus)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">
                      {t.monthlySIPRequired}
                    </div>
                    <div className="text-lg font-semibold text-brand-700">
                      {formatINR(results.sip)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario B */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-sm font-semibold">
                  B
                </span>
                {t.scenarioB}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.retirementAge}
                value={retireAge2}
                min={currentAge + 1}
                max={75}
                step={1}
                onChange={setRetireAge2}
              />

              <CalculatorField
                label={t.currentMonthlyExpense}
                value={monthlyExpense2}
                min={10000}
                max={500000}
                step={5000}
                onChange={setMonthlyExpense2}
              />

              <CalculatorField
                label={t.currentSavings}
                value={currentSavings2}
                min={0}
                max={10000000}
                step={50000}
                onChange={setCurrentSavings2}
              />

              <div className="pt-4 border-t border-brand-200">
                <div className="text-center space-y-3">
                  <div>
                    <div className="text-xs text-slate-600">
                      {t.targetRetirementCorpus}
                    </div>
                    <div className="text-2xl font-semibold text-brand-700 mt-1">
                      {formatINR(results2?.targetCorpus || 0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">
                      {t.monthlySIPRequired}
                    </div>
                    <div className="text-lg font-semibold text-brand-700">
                      {formatINR(results2?.sip || 0)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ✅ Comparison Summary */}
      {comparisonMode && results2 && (
        <Card className="border-brand-400 bg-brand-900">
          <CardHeader>
            <CardTitle className="text-lg text-[#FFFFFF]">
              {t.whichBetter}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs font-medium text-[#D1D5DB] mb-1">
                  {t.lowerSIP}
                </div>
                <div
                  className={`text-xl font-semibold ${results.sip < results2.sip ? 'text-brand-400' : 'text-brand-400'}`}
                >
                  {formatINR(Math.abs(results.sip - results2.sip))}
                </div>
                <div className="text-xs text-[#D1D5DB] mt-1">per month</div>
              </div>
              <div>
                <div className="text-xs font-medium text-[#D1D5DB] mb-1">
                  {t.higherCorpus}
                </div>
                <div
                  className={`text-xl font-semibold ${results.targetCorpus > results2.targetCorpus ? 'text-brand-400' : 'text-brand-400'}`}
                >
                  {formatINR(
                    Math.abs(results.targetCorpus - results2.targetCorpus),
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-[#D1D5DB] mb-1">
                  Winner
                </div>
                <div className="text-xl font-semibold">
                  {results.sip < results2.sip ? (
                    <span className="text-brand-400">🏆 {t.scenarioA}</span>
                  ) : (
                    <span className="text-brand-400">🏆 {t.scenarioB}</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ✅ Tax Estimate */}
      {!comparisonMode && calculatorMode === 'comprehensive' && (
        <Card className="border-brand-200 bg-linear-to-br from-brand-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-brand-700" />
                {t.taxImpact}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTaxEstimate(!showTaxEstimate)}
                className="text-xs"
              >
                {showTaxEstimate ? t.hideTaxEstimate : t.showTaxEstimate}
              </Button>
            </div>
          </CardHeader>

          {showTaxEstimate && (
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-brand-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">
                    {t.estimatedAnnualTax}:
                  </span>
                  <span className="font-semibold text-[#FF568E]">
                    {formatINR(results.estimatedTax)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 p-3 bg-slate-50 rounded border border-slate-200">
                💡 {t.taxNote}
              </p>
            </CardContent>
          )}
        </Card>
      )}

      {/* ✅ Year-by-Year Projection Chart */}
      {isClient &&
        results.yearlyProjection &&
        results.yearlyProjection.length > 0 && (
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <LineChart className="h-5 w-5 text-brand-700" />
                {t.corpusGrowth}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer
                width="100%"
                height={300}
                minWidth={0}
                minHeight={0}
              >
                <AreaChart data={results.yearlyProjection}>
                  <defs>
                    <linearGradient
                      id="colorCorpus"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#B0EC70" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#B0EC70" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="age"
                    label={{
                      value: 'Age',
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
                    labelFormatter={(label) => `Age ${label}`}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="corpusValue"
                    name={t.corpusValue}
                    stroke="#577A30"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCorpus)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

      {/* ✅ Year-by-Year Table */}
      {isClient &&
        results.yearlyProjection &&
        results.yearlyProjection.length > 0 && (
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">
                {t.yearByYearProjection}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 font-semibold">{t.year}</th>
                      <th className="text-left p-3 font-semibold">{t.age}</th>
                      <th className="text-right p-3 font-semibold">
                        {t.annualSIP}
                      </th>
                      <th className="text-right p-3 font-semibold">
                        Growth Earned
                      </th>
                      <th className="text-right p-3 font-semibold text-brand-700">
                        {t.corpusValue}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyProjection.slice(0, 10).map((row, idx) => (
                      <tr
                        key={row.year}
                        className={`border-b border-slate-100 ${
                          idx % 2 === 0 ? 'bg-slate-50/50' : ''
                        }`}
                      >
                        <td className="p-3 font-medium">{row.year}</td>
                        <td className="p-3">{row.age}</td>
                        <td className="p-3 text-right text-brand-700">
                          {formatINR(row.annualSIP)}
                        </td>
                        <td className="p-3 text-right text-brand-700">
                          {formatINR(row.growthEarned)}
                        </td>
                        <td className="p-3 text-right font-semibold text-brand-700">
                          {formatINR(row.corpusValue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {results.yearlyProjection.length > 10 && (
                  <div className="text-xs text-slate-500 text-center mt-3">
                    Showing first 10 years. Download full report for complete
                    projection.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

      {/* ✅ Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSave} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          {t.savePlan}
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          {t.shareWhatsApp}
        </Button>

        <Button onClick={handleDownloadReport} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          {t.downloadReport}
        </Button>
      </div>

      {/* ✅ Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">{t.savedRetirementPlans}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-[#FF568E] hover:text-[#DB3E82] hover:bg-red-50"
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
                          {t.age} {calc.currentAge}→{calc.retireAge} |{' '}
                          {t.corpus} {formatINR(calc.targetCorpus)}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {t.sip} {formatINR(calc.sipRequired)}/mo | {t.expense}{' '}
                          {formatINR(calc.monthlyExpense)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {t.savings} {formatINR(calc.currentSavings)} |{' '}
                          {t.returns} {calc.preReturn}%/{calc.postReturn}%
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
                    className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-[#FF568E] hover:bg-red-50"
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
