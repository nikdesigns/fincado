'use client';

import React, { useMemo, useState, useEffect } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import {
  Building2,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface HRALabels {
  basicSalary: string;
  da: string;
  hraReceived: string;
  rentPaid: string;
  cityType: string;
  exemptHRA: string;
  taxableHRA: string;
  metro: string;
  nonMetro: string;
}

const DEFAULT_LABELS: HRALabels = {
  basicSalary: 'Basic Salary (Yearly)',
  da: 'Dearness Allowance (Yearly)',
  hraReceived: 'HRA Received (Yearly)',
  rentPaid: 'Total Rent Paid (Yearly)',
  cityType: 'City Type',
  exemptHRA: 'Exempt HRA (Tax Free)',
  taxableHRA: 'Taxable HRA',
  metro: 'Metro (50%)',
  nonMetro: 'Non-Metro (40%)',
};

interface SavedHRACalculation {
  id: number;
  basic: number;
  da: number;
  hraReceived: number;
  rentPaid: number;
  isMetro: string;
  exemptHRA: number;
  taxableHRA: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export default function HRAClient({
  labels = {},
}: {
  labels?: Partial<HRALabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [basic, setBasic] = useState(600000);
  const [da, setDA] = useState(0);
  const [hraReceived, setHraReceived] = useState(240000);
  const [rentPaid, setRentPaid] = useState(180000);
  const [isMetro, setIsMetro] = useState<'yes' | 'no'>('yes');

  /* ---------- SAVED CALCULATIONS STATE ---------- */
  const [savedCalculations, setSavedCalculations] = useState<
    SavedHRACalculation[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  /* ---------- LOAD SAVED CALCULATIONS ---------- */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    try {
      const saved = localStorage.getItem('hra_history');
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
        calculator_type: 'HRA',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    const salary = basic + da;

    // Condition 1: Actual HRA Received
    const cond1 = hraReceived;

    // Condition 2: 50% (Metro) or 40% (Non-Metro) of Salary
    const cond2 = salary * (isMetro === 'yes' ? 0.5 : 0.4);

    // Condition 3: Rent Paid - 10% of Salary
    const cond3 = Math.max(0, rentPaid - salary * 0.1);

    // Exempt is the least of the three
    const exemptHRA = Math.min(cond1, cond2, cond3);
    const taxableHRA = Math.max(0, hraReceived - exemptHRA);

    // Percentages for Pie Chart
    const total = hraReceived > 0 ? hraReceived : 1;
    const exemptPct = Math.round((exemptHRA / total) * 100);
    const taxablePct = 100 - exemptPct;

    return {
      exemptHRA,
      taxableHRA,
      exemptPct,
      taxablePct,
      breakdown: { cond1, cond2, cond3 },
      salary,
    };
  }, [basic, da, hraReceived, rentPaid, isMetro]);

  const handleReset = () => {
    setBasic(600000);
    setDA(0);
    setHraReceived(240000);
    setRentPaid(180000);
    setIsMetro('yes');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hra_reset', {
        calculator_type: 'HRA',
      });
    }
  };

  /* ---------- SAVE CALCULATION ---------- */
  const handleSaveCalculation = () => {
    const calculation: SavedHRACalculation = {
      id: Date.now(),
      basic,
      da,
      hraReceived,
      rentPaid,
      isMetro,
      exemptHRA: results.exemptHRA,
      taxableHRA: results.taxableHRA,
      date: new Date().toISOString(),
    };

    const saved = [...savedCalculations];
    saved.unshift(calculation);
    const trimmed = saved.slice(0, 10);

    setSavedCalculations(trimmed);

    try {
      localStorage.setItem('hra_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success(
      'HRA calculation saved! Access it anytime from your history.',
    );

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hra_saved', {
        exempt_amount: results.exemptHRA,
        city_type: isMetro,
      });
    }
  };

  /* ---------- DELETE SINGLE CALCULATION ---------- */
  const handleDeleteCalculation = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('hra_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');
  };

  /* ---------- CLEAR ALL CALCULATIONS ---------- */
  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('hra_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');
  };

  /* ---------- SHARE VIA WHATSAPP ---------- */
  const handleShare = () => {
    const message =
      `🏠 HRA Exemption Calculator Results\\n\\n` +
      `Basic Salary: ${formatINR(basic)}\\n` +
      `DA: ${formatINR(da)}\\n` +
      `HRA Received: ${formatINR(hraReceived)}\\n` +
      `Rent Paid: ${formatINR(rentPaid)}\\n` +
      `City: ${isMetro === 'yes' ? 'Metro (50%)' : 'Non-Metro (40%)'}\\n\\n` +
      `✅ Exempt HRA: ${formatINR(results.exemptHRA)}\\n` +
      `❌ Taxable HRA: ${formatINR(results.taxableHRA)}\\n\\n` +
      `Calculate yours: https://fincado.com/hra-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hra_shared', {
        method: 'whatsapp',
      });
    }
  };

  /* ---------- LOAD SAVED CALCULATION ---------- */
  const handleLoadCalculation = (calc: SavedHRACalculation) => {
    setBasic(calc.basic);
    setDA(calc.da);
    setHraReceived(calc.hraReceived);
    setRentPaid(calc.rentPaid);
    setIsMetro(calc.isMetro as 'yes' | 'no');
    toast.success('Calculation loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm bg-card">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <Building2 className="h-5 w-5 text-emerald-600" />
              HRA Calculator
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
                label={t.basicSalary}
                value={basic}
                min={100000}
                max={10000000}
                step={10000}
                onChange={setBasic}
              />

              <CalculatorField
                label={t.da}
                value={da}
                min={0}
                max={5000000}
                step={5000}
                onChange={setDA}
              />

              <CalculatorField
                label={t.hraReceived}
                value={hraReceived}
                min={10000}
                max={5000000}
                step={5000}
                onChange={setHraReceived}
              />

              <CalculatorField
                label={t.rentPaid}
                value={rentPaid}
                min={0}
                max={5000000}
                step={5000}
                onChange={setRentPaid}
              />

              {/* City Type Radio */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700">
                  {t.cityType}
                </Label>
                <RadioGroup
                  value={isMetro}
                  onValueChange={(v) => setIsMetro(v as 'yes' | 'no')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-md px-4 py-2 bg-white w-full hover:bg-slate-50 cursor-pointer transition">
                    <RadioGroupItem value="yes" id="m-yes" />
                    <Label htmlFor="m-yes" className="cursor-pointer flex-1">
                      {t.metro}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md px-4 py-2 bg-white w-full hover:bg-slate-50 cursor-pointer transition">
                    <RadioGroupItem value="no" id="m-no" />
                    <Label htmlFor="m-no" className="cursor-pointer flex-1">
                      {t.nonMetro}
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-[10px] text-slate-400">
                  *Metro cities: Delhi, Mumbai, Kolkata, Chennai only
                </p>
              </div>
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col items-center justify-center">
              {/* Using EMIPieChart to show Exempt vs Taxable split */}
              <EMIPieChart
                principalPct={results.exemptPct} // Green section (Exempt)
                interestPct={results.taxablePct} // Blue section (Taxable)
                size={200}
              />

              <div className="mt-6 w-full max-w-sm text-center">
                <div className="text-sm text-slate-500 mb-1">{t.exemptHRA}</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                  {formatINR(results.exemptHRA)}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                  <Card className="border-emerald-100 bg-emerald-50">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-800">
                          Exempt
                        </span>
                      </div>
                      <div className="text-sm font-bold text-emerald-900">
                        {formatINR(results.exemptHRA)}
                      </div>
                      <div className="text-xs text-emerald-700 mt-0.5">
                        Tax Free
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 bg-white">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <XCircle className="w-3 h-3 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600">
                          Taxable
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        {formatINR(results.taxableHRA)}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Added to Income
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Calculation Breakdown Logic */}
                <div className="mt-6 border-t border-slate-100 pt-4 text-left">
                  <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                    Exemption Calculation (Lowest of 3):
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li
                      className={`flex justify-between p-2 rounded ${
                        results.exemptHRA === results.breakdown.cond1
                          ? 'bg-emerald-50 font-semibold'
                          : ''
                      }`}
                    >
                      <span>1. Actual HRA Received:</span>
                      <span className="font-mono">
                        {formatINR(results.breakdown.cond1)}
                      </span>
                    </li>
                    <li
                      className={`flex justify-between p-2 rounded ${
                        results.exemptHRA === results.breakdown.cond2
                          ? 'bg-emerald-50 font-semibold'
                          : ''
                      }`}
                    >
                      <span>
                        2. {isMetro === 'yes' ? '50%' : '40%'} of Salary:
                      </span>
                      <span className="font-mono">
                        {formatINR(results.breakdown.cond2)}
                      </span>
                    </li>
                    <li
                      className={`flex justify-between p-2 rounded ${
                        results.exemptHRA === results.breakdown.cond3
                          ? 'bg-emerald-50 font-semibold'
                          : ''
                      }`}
                    >
                      <span>3. Rent Paid - 10% Salary:</span>
                      <span className="font-mono">
                        {formatINR(results.breakdown.cond3)}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3 p-2 bg-purple-50 rounded text-xs text-slate-600">
                    <strong>Salary:</strong> {formatINR(results.salary)} (Basic
                    + DA)
                  </div>
                </div>
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

      {/* ✅ Tax Saving Insight */}
      <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-emerald-900 mb-1">
                Tax Saving Impact
              </div>
              <div className="text-sm text-slate-700">
                Your exempt HRA of{' '}
                <strong>{formatINR(results.exemptHRA)}</strong> reduces taxable
                income. At 30% tax slab, you save approximately{' '}
                <strong className="text-emerald-700">
                  {formatINR(results.exemptHRA * 0.3)}
                </strong>{' '}
                in taxes annually.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Saved Calculations History */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved HRA Scenarios</CardTitle>
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
                          Basic: {formatINR(calc.basic)} | Rent:{' '}
                          {formatINR(calc.rentPaid)} |{' '}
                          {calc.isMetro === 'yes' ? 'Metro' : 'Non-Metro'}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Exempt: {formatINR(calc.exemptHRA)} | Taxable:{' '}
                          {formatINR(calc.taxableHRA)}
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
    </div>
  );
}
