'use client';

import React, { useMemo, useState, useEffect } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Briefcase,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

/* ---------- TYPES ---------- */
interface SavedCalculation {
  id: number;
  basicSalary: number;
  years: number;
  coveredStatus: 'yes' | 'no';
  gratuity: number;
  exempt: number;
  taxable: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function GratuityClient() {
  /* ---------- STATE ---------- */
  const [basicSalary, setBasicSalary] = useState(50000);
  const [years, setYears] = useState(5);
  const [coveredStatus, setCoveredStatus] = useState<'yes' | 'no'>('yes');

  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  // Load saved calculations
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    try {
      const saved = localStorage.getItem('gratuity_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved gratuity calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'Gratuity',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const result = useMemo(() => {
    let gratuity = 0;
    const isCovered = coveredStatus === 'yes';

    if (years >= 5) {
      if (isCovered) {
        // Formula: (Basic * 15 * Years) / 26
        gratuity = Math.round((basicSalary * 15 * years) / 26);
      } else {
        // Formula: (Basic * 15 * Years) / 30
        gratuity = Math.round((basicSalary * 15 * years) / 30);
      }
    }

    // Tax exemption limit: ₹20 lakh
    const MAX_EXEMPT = 2000000;
    const exempt = Math.min(gratuity, MAX_EXEMPT);
    const taxable = Math.max(0, gratuity - MAX_EXEMPT);

    // Percentages for chart
    const total = gratuity > 0 ? gratuity : 1;
    const exemptPct = Math.round((exempt / total) * 100);
    const taxablePct = 100 - exemptPct;

    // Detailed calculations
    const lastSalary = basicSalary;
    const multiplier = isCovered ? 15 / 26 : 15 / 30;
    const formula = isCovered
      ? '(Basic + DA) × 15/26 × Years'
      : '(Basic + DA) × 15/30 × Years';

    return {
      gratuity,
      exempt,
      taxable,
      exemptPct,
      taxablePct,
      formula,
      lastSalary,
      multiplier,
      isCovered,
    };
  }, [basicSalary, years, coveredStatus]);

  /* ---------- HANDLERS ---------- */
  const handleReset = () => {
    setBasicSalary(50000);
    setYears(5);
    setCoveredStatus('yes');
    toast.success('Calculator reset to defaults!');
  };

  const handleSave = () => {
    if (years < 5) {
      toast.error('Minimum 5 years of service required for gratuity!');
      return;
    }

    const calc: SavedCalculation = {
      id: Date.now(),
      basicSalary,
      years,
      coveredStatus,
      gratuity: result.gratuity,
      exempt: result.exempt,
      taxable: result.taxable,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem(
        'gratuity_calculator_history',
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Error saving gratuity calculation:', error);
    }

    toast.success('Gratuity calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'gratuity_calculation_saved', {
        basic_salary: basicSalary,
        years: years,
        gratuity: result.gratuity,
      });
    }
  };

  const handleShare = () => {
    if (years < 5) {
      toast.error('Minimum 5 years of service required for gratuity!');
      return;
    }

    const message =
      `💼 Gratuity Calculation\n\n` +
      `Basic Salary + DA: ${formatINR(basicSalary)}/month\n` +
      `Years of Service: ${years} years\n` +
      `Gratuity Act Coverage: ${coveredStatus === 'yes' ? 'Yes (26 days)' : 'No (30 days)'}\n` +
      `Formula: ${result.formula}\n\n` +
      `📊 Gratuity Amount:\n` +
      `Total Gratuity: ${formatINR(result.gratuity)}\n` +
      `Tax Exempt (up to ₹20L): ${formatINR(result.exempt)}\n` +
      `Taxable Amount: ${formatINR(result.taxable)}\n\n` +
      `Calculate yours: https://fincado.com/gratuity-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'gratuity_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem(
        'gratuity_calculator_history',
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Error updating gratuity history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('gratuity_calculator_history');
    } catch (error) {
      console.error('Error clearing gratuity history:', error);
    }
    toast.success('All gratuity calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setBasicSalary(calc.basicSalary);
    setYears(calc.years);
    setCoveredStatus(calc.coveredStatus);
    toast.success('Gratuity calculation loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Warning for < 5 years */}
      {years < 5 && (
        <Alert className="border-amber-200 bg-amber-50">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertDescription className="ml-2 text-sm text-amber-800">
            <strong>Minimum Service Required:</strong> Gratuity is payable only
            after completing 5 years of continuous service (or upon
            death/disability).
          </AlertDescription>
        </Alert>
      )}

      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <Briefcase className="h-5 w-5 text-emerald-600" />
              Gratuity Calculator
            </CardTitle>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
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
                step={1000}
                onChange={setBasicSalary}
              />

              <div className="space-y-2">
                <CalculatorField
                  label="Years of Service"
                  value={years}
                  min={1}
                  max={50}
                  step={1}
                  onChange={setYears}
                />
                {years < 5 && (
                  <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block font-medium border border-amber-100">
                    ⚠️ Minimum 5 years required for gratuity eligibility
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700">
                  Is your employer covered under the Gratuity Act?
                </Label>
                <RadioGroup
                  value={coveredStatus}
                  onValueChange={(val) => setCoveredStatus(val as 'yes' | 'no')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-md px-4 py-2 bg-white w-full hover:bg-slate-50 cursor-pointer transition">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="cursor-pointer flex-1">
                      Yes (Covered) - 26 days
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md px-4 py-2 bg-white w-full hover:bg-slate-50 cursor-pointer transition">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="cursor-pointer flex-1">
                      No (Not Covered) - 30 days
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-slate-500 mt-2">
                  Most private companies with 10+ employees are covered under
                  the Payment of Gratuity Act, 1972.
                </p>
              </div>
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col items-center justify-center">
              {/* Custom Pie Chart */}
              <GratuityPieChart
                exemptPct={result.exemptPct}
                taxablePct={result.taxablePct}
              />

              <div className="mt-8 text-center w-full">
                <div className="text-sm font-medium text-slate-500 mb-1">
                  Total Gratuity Payable
                </div>
                <div className="text-4xl font-extrabold text-lime-600 tracking-tight">
                  {formatINR(result.gratuity)}
                </div>
                <div className="mt-2 text-xs font-mono text-slate-400 bg-slate-50 inline-block px-3 py-1.5 rounded">
                  Formula: {result.formula}
                </div>

                {/* Breakdown Cards */}
                <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                  {/* Exempt */}
                  <Card className="bg-lime-50 border-lime-200 shadow-none">
                    <CardContent className="p-4 text-center">
                      <div className="text-xs text-lime-700 font-medium mb-1">
                        Tax Exempt (Max ₹20L)
                      </div>
                      <div className="font-bold text-lime-800 text-lg">
                        {formatINR(result.exempt)}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Taxable */}
                  <Card className="bg-white border-slate-200 shadow-none">
                    <CardContent className="p-4 text-center">
                      <div className="text-xs text-slate-500 font-medium mb-1">
                        Taxable Amount
                      </div>
                      <div className="font-bold text-slate-700 text-lg">
                        {formatINR(result.taxable)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {result.gratuity > 2000000 && (
                  <Alert className="mt-4 bg-amber-50 border-amber-200">
                    <Info className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="ml-2 text-xs text-amber-800">
                      Amount exceeding ₹20 lakh is taxable as per your income
                      tax slab.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleSave}
          variant="outline"
          size="sm"
          disabled={years < 5}
        >
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Save Calculation
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          disabled={years < 5}
        >
          <Share2Icon className="mr-2 h-4 w-4" />
          Share via WhatsApp
        </Button>
      </div>

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">
              Your Saved Gratuity Calculations
            </CardTitle>
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
                          Salary: {formatINR(calc.basicSalary)}/mo |{' '}
                          {calc.years} years |
                          {calc.coveredStatus === 'yes'
                            ? ' 26 days'
                            : ' 30 days'}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Total: {formatINR(calc.gratuity)} | Exempt:{' '}
                          {formatINR(calc.exempt)}
                        </div>
                        {calc.taxable > 0 && (
                          <div className="text-[11px] text-amber-600 mt-0.5">
                            Taxable: {formatINR(calc.taxable)}
                          </div>
                        )}
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

/* -------------------------------------------------
   PRIVATE COMPONENT: Custom Pie Chart for Gratuity
   -------------------------------------------------
*/
function GratuityPieChart({
  exemptPct,
  taxablePct,
}: {
  exemptPct: number;
  taxablePct: number;
}) {
  const size = 220;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const exemptLength = (exemptPct / 100) * circumference;
  const taxableLength = (taxablePct / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        {exemptPct > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#65a30d" // Lime-600
            strokeWidth={strokeWidth}
            strokeDasharray={`${exemptLength} ${circumference}`}
            strokeLinecap="round"
          />
        )}
        {taxablePct > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#fed7aa" // Orange-200
            strokeWidth={strokeWidth}
            strokeDasharray={`${taxableLength} ${circumference}`}
            strokeDashoffset={-exemptLength}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="text-2xl font-bold text-slate-900 leading-none">
          {exemptPct}%
        </div>
        <div className="mt-1 text-sm font-medium text-lime-600">Tax Free</div>
      </div>
    </div>
  );
}
