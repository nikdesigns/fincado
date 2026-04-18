'use client';

import React, { useMemo, useState, useEffect } from 'react';
import EMIPieChart from '@/components/EMIPieChart';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RefreshCcw,
  Briefcase,
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
  basicSalary: number;
  employeePct: number;
  years: number;
  annualRate: number;
  maturity: number;
  totalEmp: number;
  totalEmployer: number;
  interest: number;
  employerWageCeilingEnabled?: boolean;
  date: string;
}

const isSavedCalculation = (value: unknown): value is SavedCalculation => {
  if (!value || typeof value !== 'object') return false;

  const entry = value as Partial<SavedCalculation>;
  return (
    typeof entry.id === 'number' &&
    typeof entry.basicSalary === 'number' &&
    typeof entry.employeePct === 'number' &&
    typeof entry.years === 'number' &&
    typeof entry.annualRate === 'number' &&
    typeof entry.maturity === 'number' &&
    typeof entry.totalEmp === 'number' &&
    typeof entry.totalEmployer === 'number' &&
    typeof entry.interest === 'number' &&
    (typeof entry.employerWageCeilingEnabled === 'undefined' ||
      typeof entry.employerWageCeilingEnabled === 'boolean') &&
    typeof entry.date === 'string'
  );
};

const readSavedCalculations = (): SavedCalculation[] => {
  try {
    const saved = localStorage.getItem('epf_calculator_history');
    if (!saved) return [];

    const parsed = JSON.parse(saved) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isSavedCalculation).map((entry) => ({
      ...entry,
      employerWageCeilingEnabled: Boolean(entry.employerWageCeilingEnabled),
    }));
  } catch (error) {
    console.error('Error loading saved EPF calculations:', error);
    return [];
  }
};

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function EPFClient() {
  /* ---------- STATE ---------- */
  const [basicSalary, setBasicSalary] = useState(40000);
  const [employeePct, setEmployeePct] = useState(12);
  const [years, setYears] = useState(20);
  const [annualRate, setAnnualRate] = useState(8.25);
  const [employerWageCeilingEnabled, setEmployerWageCeilingEnabled] =
    useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >(() => {
    if (typeof window === 'undefined') return [];
    return readSavedCalculations();
  });

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'EPF',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const empMonthly = (basicSalary * employeePct) / 100;
    // Employer contributes 3.67% to EPF (remaining 8.33% goes to EPS)
    const employerContributionBase = employerWageCeilingEnabled
      ? Math.min(basicSalary, 15000)
      : basicSalary;
    const employerMonthly = (employerContributionBase * 3.67) / 100;

    let balance = 0;
    let totalEmp = 0;
    let totalEmployer = 0;

    // Year-wise calculation for compounding
    for (let y = 0; y < years; y++) {
      for (let m = 0; m < 12; m++) {
        balance += empMonthly + employerMonthly;
        totalEmp += empMonthly;
        totalEmployer += employerMonthly;
        // Monthly compounding
        balance += (balance * annualRate) / 100 / 12;
      }
    }

    const maturity = Math.round(balance);
    const invested = Math.round(totalEmp + totalEmployer);
    const interest = Math.round(maturity - invested);

    const principalPct =
      maturity > 0 ? Math.round((invested / maturity) * 100) : 0;
    const interestPct = 100 - principalPct;

    // Additional calculations
    const monthlyEmpContribution = Math.round(empMonthly);
    const monthlyEmployerContribution = Math.round(employerMonthly);
    const totalMonthlyContribution =
      monthlyEmpContribution + monthlyEmployerContribution;

    return {
      maturity,
      totalEmp: Math.round(totalEmp),
      totalEmployer: Math.round(totalEmployer),
      interest,
      principalPct,
      interestPct,
      monthlyEmpContribution,
      monthlyEmployerContribution,
      totalMonthlyContribution,
      invested,
    };
  }, [basicSalary, employeePct, years, annualRate, employerWageCeilingEnabled]);

  /* ---------- HANDLERS ---------- */
  const handleReset = () => {
    setBasicSalary(40000);
    setEmployeePct(12);
    setYears(20);
    setAnnualRate(8.25);
    setEmployerWageCeilingEnabled(false);
    toast.success('Calculator reset to defaults!');
  };

  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      basicSalary,
      employeePct,
      years,
      annualRate,
      maturity: results.maturity,
      totalEmp: results.totalEmp,
      totalEmployer: results.totalEmployer,
      interest: results.interest,
      employerWageCeilingEnabled,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('epf_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving EPF calculation:', error);
    }

    toast.success('EPF plan saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'epf_calculation_saved', {
        basic_salary: basicSalary,
        years: years,
        maturity: results.maturity,
        employer_wage_ceiling_enabled: employerWageCeilingEnabled,
      });
    }
  };

  const handleShare = () => {
    const message =
      `💼 Employee Provident Fund (EPF) Calculation\n\n` +
      `Basic Salary + DA: ${formatINR(basicSalary)}/month\n` +
      `Your Contribution: ${employeePct}% (${formatINR(results.monthlyEmpContribution)}/mo)\n` +
      `Employer Contribution: 3.67% (${formatINR(results.monthlyEmployerContribution)}/mo${employerWageCeilingEnabled ? ', capped at ₹15,000 base' : ''})\n` +
      `Employment Period: ${years} years\n` +
      `Interest Rate: ${annualRate}% p.a.\n\n` +
      `📊 EPF Maturity:\n` +
      `Total Corpus: ${formatINR(results.maturity)}\n` +
      `Your Share: ${formatINR(results.totalEmp)}\n` +
      `Employer Share: ${formatINR(results.totalEmployer)}\n` +
      `Total Interest: ${formatINR(results.interest)}\n\n` +
      `💰 100% Tax-Free Withdrawal!\n\n` +
      `Calculate yours: https://fincado.com/epf-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'epf_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('epf_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating EPF history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('epf_calculator_history');
    } catch (error) {
      console.error('Error clearing EPF history:', error);
    }
    toast.success('All EPF calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setBasicSalary(calc.basicSalary);
    setEmployeePct(calc.employeePct);
    setYears(calc.years);
    setAnnualRate(calc.annualRate);
    setEmployerWageCeilingEnabled(Boolean(calc.employerWageCeilingEnabled));
    toast.success('EPF plan loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Info Alert */}
      <Alert className="border-brand-200 bg-brand-50">
        <Info className="h-4 w-4 text-brand-700" />
        <AlertDescription className="ml-2 text-sm text-brand-900">
          <strong>Note:</strong> Employer&apos;s 8.33% contribution to EPS
          (Employee Pension Scheme) is not included in EPF corpus as it provides
          monthly pension separately.
        </AlertDescription>
      </Alert>

      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-800">
              <Briefcase className="h-5 w-5 text-brand-700" />
              Employee Provident Fund (EPF) Calculator
            </CardTitle>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-brand-700 transition-colors"
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
                label="Monthly Basic Salary + DA (₹)"
                value={basicSalary}
                min={10000}
                max={500000}
                step={5000}
                onChange={setBasicSalary}
              />

              <CalculatorField
                label="Your Contribution (%)"
                value={employeePct}
                min={1}
                max={20}
                step={0.5}
                onChange={setEmployeePct}
              />

              <CalculatorField
                label="Employment Period (Years)"
                value={years}
                min={5}
                max={40}
                step={1}
                onChange={setYears}
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
                    label="EPF Interest Rate (% p.a.)"
                    value={annualRate}
                    min={7}
                    max={9}
                    step={0.05}
                    onChange={setAnnualRate}
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Current EPF rate: 8.25% (FY 2025-26). Rates are revised
                    annually by EPFO.
                  </p>

                  <label className="mt-3 flex items-start gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={employerWageCeilingEnabled}
                      onChange={(e) =>
                        setEmployerWageCeilingEnabled(e.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-300"
                    />
                    <span>
                      Apply statutory ₹15,000 wage ceiling to employer EPF share
                      (3.67%).
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={results.principalPct}
                interestPct={results.interestPct}
                size={200}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-slate-500">
                  Estimated EPF Corpus
                </div>
                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-brand-700">
                  {formatINR(results.maturity)}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  After {years} years (100% Tax-Free)
                </div>
              </div>

              {/* Monthly Contributions */}
              <div className="mt-6 w-full p-4 bg-brand-50 rounded-lg border border-brand-200">
                <h4 className="text-xs font-semibold text-brand-700 mb-3">
                  Monthly Contributions
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Your Contribution:</span>
                    <strong className="text-slate-900">
                      {formatINR(results.monthlyEmpContribution)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">
                      Employer Contribution:
                    </span>
                    <strong className="text-slate-900">
                      {formatINR(results.monthlyEmployerContribution)}
                    </strong>
                  </div>
                  {employerWageCeilingEnabled && (
                    <div className="text-[11px] text-slate-500">
                      Employer share calculated on capped ₹15,000 wage base.
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 text-base">
                    <span className="font-semibold text-brand-700">
                      Total/Month:
                    </span>
                    <strong className="text-brand-700">
                      {formatINR(results.totalMonthlyContribution)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-4">
                    <div className="text-xs text-slate-500">Your Share</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(results.totalEmp)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-4">
                    <div className="text-xs text-slate-500">Employer Share</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {formatINR(results.totalEmployer)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Interest Card */}
              <div className="mt-4 w-full rounded-lg border-2 border-brand-300 bg-brand-50 p-4 text-center">
                <div className="text-xs text-brand-700 font-semibold">
                  Total Interest Earned
                </div>
                <div className="mt-1 text-2xl font-semibold text-brand-700">
                  +{formatINR(results.interest)}
                </div>
              </div>

              <p className="mt-4 text-xs text-center text-slate-400">
                EPF withdrawal after 5 years is 100% tax-free. Early withdrawal
                attracts tax.
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
      {savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved EPF Plans</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-[#FF568E] hover:text-[#DB3E82] hover:bg-red-50"
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
                          Salary: {formatINR(calc.basicSalary)}/mo |{' '}
                          {calc.years} years
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Corpus: {formatINR(calc.maturity)} | Interest:{' '}
                          {formatINR(calc.interest)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Your: {formatINR(calc.totalEmp)} | Employer:{' '}
                          {formatINR(calc.totalEmployer)}
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
