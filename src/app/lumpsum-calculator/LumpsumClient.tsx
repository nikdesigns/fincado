'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TrendingUp,
  RefreshCcw,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Calculator,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface SavedCalculation {
  id: number;
  principal: number;
  annualRate: number;
  years: number;
  frequency: number;
  futureValue: number;
  wealthGained: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

const FREQUENCY_MAP: Record<number, string> = {
  1: 'Annually',
  2: 'Half-Yearly',
  4: 'Quarterly',
  12: 'Monthly',
};

/* ---------------- CHART COMPONENT ---------------- */
function LumpsumDonut({
  principal,
  wealth,
}: {
  principal: number;
  wealth: number;
}) {
  const total = principal + wealth;
  const principalPct = total > 0 ? (principal / total) * 100 : 0;
  const interestPct = total > 0 ? (wealth / total) * 100 : 0;

  const size = 200;
  const strokeWidth = 24;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  // Segment 1: Principal (Slate/Gray)
  const dash1 = (principalPct / 100) * circumference;

  // Segment 2: Interest (Lime - Your Brand Color)
  const dash2 = (interestPct / 100) * circumference;
  const offset2 = -dash1;

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      <div style={{ width: size, height: size }} className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Principal (Slate-300) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash1} ${circumference}`}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />

          {/* Wealth Gained (Lime-600) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#65a30d"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash2} ${circumference}`}
            strokeDashoffset={offset2}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
            Total Value
          </span>
          <span className="text-xl font-bold text-slate-900">
            {formatINR(total)}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <span className="text-xs font-medium text-slate-600">Principal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-lime-600" />
          <span className="text-xs font-medium text-slate-600">Returns</span>
        </div>
      </div>
    </div>
  );
}

export default function LumpsumClient() {
  /* ---------- STATE ---------- */
  const [principal, setPrincipal] = useState(100000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(1);
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
      const saved = localStorage.getItem('lumpsum_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved Lumpsum calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'Lumpsum',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const calculations = useMemo(() => {
    const r = annualRate / 100 / frequency;
    const n = frequency * years;

    if (principal <= 0 || n <= 0) {
      return {
        futureValue: 0,
        wealthGained: 0,
        cagr: 0,
        multipleOfInvestment: 0,
      };
    }

    const futureValue = Math.round(principal * Math.pow(1 + r, n));
    const wealthGained = futureValue - principal;
    const cagr = annualRate; // CAGR is same as annual rate for lumpsum
    const multipleOfInvestment = (futureValue / principal).toFixed(2);

    return {
      futureValue,
      wealthGained,
      cagr: cagr.toFixed(2),
      multipleOfInvestment,
    };
  }, [principal, annualRate, years, frequency]);

  /* ---------- HANDLERS ---------- */
  const handleReset = () => {
    setPrincipal(100000);
    setAnnualRate(12);
    setYears(10);
    setFrequency(1);
    toast.success('Calculator reset to defaults!');
  };

  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      principal,
      annualRate,
      years,
      frequency,
      futureValue: calculations.futureValue,
      wealthGained: calculations.wealthGained,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem(
        'lumpsum_calculator_history',
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Error saving Lumpsum calculation:', error);
    }

    toast.success('Lumpsum calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lumpsum_calculation_saved', {
        principal,
        rate: annualRate,
        years,
      });
    }
  };

  const handleShare = () => {
    const message =
      `💰 Lumpsum Investment Calculation\n\n` +
      `Investment Amount: ${formatINR(principal)}\n` +
      `Expected Return: ${annualRate}% p.a.\n` +
      `Investment Period: ${years} years\n` +
      `Compounding: ${FREQUENCY_MAP[frequency]}\n\n` +
      `📈 Future Value: ${formatINR(calculations.futureValue)}\n` +
      `💵 Wealth Gained: ${formatINR(calculations.wealthGained)}\n` +
      `🎯 Investment Multiple: ${calculations.multipleOfInvestment}x\n\n` +
      `Calculate yours: https://fincado.com/lumpsum-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lumpsum_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem(
        'lumpsum_calculator_history',
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Error updating Lumpsum history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('lumpsum_calculator_history');
    } catch (error) {
      console.error('Error clearing Lumpsum history:', error);
    }
    toast.success('All Lumpsum calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setPrincipal(calc.principal);
    setAnnualRate(calc.annualRate);
    setYears(calc.years);
    setFrequency(calc.frequency);
    toast.success('Calculation loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Main Calculator */}
      <Card className="border-border shadow-sm bg-card">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <TrendingUp className="h-5 w-5 text-lime-600" />
              Lumpsum Returns
            </CardTitle>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-lime-600 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-8">
              {/* 1. Investment Amount */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Investment Amount (₹)</Label>
                  <Badge
                    variant="secondary"
                    className="font-mono text-slate-700"
                  >
                    {formatINR(principal)}
                  </Badge>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    ₹
                  </span>
                  <Input
                    type="number"
                    min={1000}
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="pl-7 h-11"
                  />
                </div>
                <Slider
                  value={[principal]}
                  min={5000}
                  max={10000000}
                  step={5000}
                  onValueChange={(v) => setPrincipal(v[0])}
                  className="text-lime-600"
                />
              </div>

              {/* 2. Rate */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Expected Return (% p.a)</Label>
                  <Badge
                    variant="secondary"
                    className="font-mono text-slate-700"
                  >
                    {annualRate}%
                  </Badge>
                </div>
                <Slider
                  value={[annualRate]}
                  min={1}
                  max={30}
                  step={0.1}
                  onValueChange={(v) => setAnnualRate(v[0])}
                  className="text-lime-600"
                />
                <div className="flex gap-2 pt-1">
                  {[8, 10, 12, 15].map((r) => (
                    <Badge
                      key={r}
                      variant="outline"
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => setAnnualRate(r)}
                    >
                      {r}%
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 3. Time */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Time Period (Years)</Label>
                  <Badge
                    variant="secondary"
                    className="font-mono text-slate-700"
                  >
                    {years} Years
                  </Badge>
                </div>
                <Slider
                  value={[years]}
                  min={1}
                  max={40}
                  step={1}
                  onValueChange={(v) => setYears(v[0])}
                  className="text-lime-600"
                />
              </div>

              {/* 4. Frequency */}
              <div className="space-y-2">
                <Label>Compounding Frequency</Label>
                <Select
                  value={String(frequency)}
                  onValueChange={(v) => setFrequency(Number(v))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Annually (Standard)</SelectItem>
                    <SelectItem value="2">Half-Yearly</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Advanced Toggle */}
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  <Calculator className="mr-2 h-3 w-3" />
                  {showAdvanced ? 'Hide' : 'Show'} Advanced Metrics
                </Button>
              </div>
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col h-full">
              <LumpsumDonut
                principal={principal}
                wealth={calculations.wealthGained}
              />

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-xs text-slate-500 font-medium mb-1">
                    Invested Amount
                  </div>
                  <div className="text-lg font-semibold text-slate-700">
                    {formatINR(principal)}
                  </div>
                </div>

                <div className="bg-lime-50 border border-lime-200 rounded-lg p-3">
                  <div className="text-xs text-lime-700 font-medium mb-1">
                    Wealth Gained
                  </div>
                  <div className="text-lg font-bold text-lime-700">
                    +{formatINR(calculations.wealthGained)}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-slate-900 rounded-xl text-center text-white shadow-lg">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">
                  Estimated Future Value
                </p>
                <div className="text-2xl font-bold tracking-tight">
                  {formatINR(calculations.futureValue)}
                </div>
              </div>

              {/* Advanced Metrics */}
              {showAdvanced && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-xs font-semibold text-slate-900 mb-3">
                    Investment Metrics
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">CAGR:</span>
                      <strong className="text-blue-700">
                        {calculations.cagr}%
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">
                        Investment Multiple:
                      </span>
                      <strong className="text-emerald-700">
                        {calculations.multipleOfInvestment}x
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Compounding:</span>
                      <strong className="text-slate-700">
                        {FREQUENCY_MAP[frequency]}
                      </strong>
                    </div>
                    <div className="flex justify-between border-t border-blue-300 pt-2 mt-2">
                      <span className="text-slate-600">Absolute Return:</span>
                      <strong className="text-lime-700">
                        {(
                          (calculations.wealthGained / principal) *
                          100
                        ).toFixed(2)}
                        %
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              <p className="mt-4 text-xs text-center text-slate-400">
                Compounding set to {FREQUENCY_MAP[frequency]}. Actual returns
                depend on fund performance & NAV.
              </p>
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
      </div>

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved Calculations</CardTitle>
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
                          {formatINR(calc.principal)} @ {calc.annualRate}% for{' '}
                          {calc.years}y
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Future Value: {formatINR(calc.futureValue)} | Gain:{' '}
                          {formatINR(calc.wealthGained)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Compounding: {FREQUENCY_MAP[calc.frequency]}
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
