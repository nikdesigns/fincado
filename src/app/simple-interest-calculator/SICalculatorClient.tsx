'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Percent,
  RefreshCcw,
  Calculator,
  TrendingUp,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  ArrowRight,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------------- HELPERS ---------------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------------- TYPES ---------------- */
interface SimpleInterestLabels {
  principal: string;
  rate: string;
  time: string;
  maturityVal: string;
  resultPrincipal: string;
  resultInterest: string;
}

const DEFAULT_LABELS: SimpleInterestLabels = {
  principal: 'Principal Amount (₹)',
  rate: 'Interest Rate (% p.a)',
  time: 'Time Period (Years)',
  maturityVal: 'Total Maturity Value',
  resultPrincipal: 'Invested Amount',
  resultInterest: 'Total Interest',
};

interface SavedCalculation {
  id: number;
  mode: string;
  principal: number;
  rate: number;
  time: number;
  interest: number;
  total: number;
  date: string;
}

/* ---------------- PIE CHART COMPONENT ---------------- */
function InterestPieChart({
  principalPct,
  interestPct,
}: {
  principalPct: number;
  interestPct: number;
}) {
  const size = 200;
  const strokeWidth = 24;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  const dash1 = (principalPct / 100) * circumference;
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

          {/* Principal (Blue) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash1} ${circumference}`}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />

          {/* Interest (Emerald) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#10b981"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash2} ${circumference}`}
            strokeDashoffset={offset2}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Principal
          </span>
          <span className="text-2xl font-bold text-blue-600">
            {principalPct}%
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-xs font-medium text-slate-600">Principal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-slate-600">Interest</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function SICalculatorClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<SimpleInterestLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------------- STATE ---------------- */
  const [mode, setMode] = useState<
    'forward' | 'findPrincipal' | 'findRate' | 'findTime'
  >('forward');
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(5);
  const [targetInterest, setTargetInterest] = useState(40000);

  /* Flat Rate Converter */
  const [flatRate, setFlatRate] = useState(7);

  /* ---------- SAVED CALCULATIONS STATE ---------- */
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  /* ---------- LOAD SAVED CALCULATIONS ---------- */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    try {
      const saved = localStorage.getItem('si_history');
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
        calculator_type: 'Simple_Interest',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------------- CALCULATIONS ---------------- */
  const results = useMemo(() => {
    if (mode === 'forward') {
      // Standard: SI = (P * R * T) / 100
      const interest = Math.round((principal * rate * time) / 100);
      const totalAmount = principal + interest;
      const principalPct = Math.round((principal / totalAmount) * 100);
      const interestPct = 100 - principalPct;

      return {
        principal,
        interest,
        totalAmount,
        principalPct,
        interestPct,
        rate,
        time,
      };
    } else if (mode === 'findPrincipal') {
      // Find P: P = (SI * 100) / (R * T)
      const calculatedPrincipal = Math.round(
        (targetInterest * 100) / (rate * time),
      );
      const totalAmount = calculatedPrincipal + targetInterest;
      const principalPct = Math.round(
        (calculatedPrincipal / totalAmount) * 100,
      );
      const interestPct = 100 - principalPct;

      return {
        principal: calculatedPrincipal,
        interest: targetInterest,
        totalAmount,
        principalPct,
        interestPct,
        rate,
        time,
      };
    } else if (mode === 'findRate') {
      // Find R: R = (SI * 100) / (P * T)
      const calculatedRate = (
        (targetInterest * 100) /
        (principal * time)
      ).toFixed(2);
      const totalAmount = principal + targetInterest;
      const principalPct = Math.round((principal / totalAmount) * 100);
      const interestPct = 100 - principalPct;

      return {
        principal,
        interest: targetInterest,
        totalAmount,
        principalPct,
        interestPct,
        rate: parseFloat(calculatedRate),
        time,
      };
    } else {
      // Find T: T = (SI * 100) / (P * R)
      const calculatedTime = (
        (targetInterest * 100) /
        (principal * rate)
      ).toFixed(2);
      const totalAmount = principal + targetInterest;
      const principalPct = Math.round((principal / totalAmount) * 100);
      const interestPct = 100 - principalPct;

      return {
        principal,
        interest: targetInterest,
        totalAmount,
        principalPct,
        interestPct,
        rate,
        time: parseFloat(calculatedTime),
      };
    }
  }, [mode, principal, rate, time, targetInterest]);

  /* ---------------- YEAR-WISE BREAKDOWN ---------------- */
  const yearwiseBreakdown = useMemo(() => {
    const breakdown = [];
    const annualInterest = Math.round((principal * rate) / 100);

    for (let year = 1; year <= Math.min(time, 10); year++) {
      const cumulativeInterest = annualInterest * year;
      const totalAmount = principal + cumulativeInterest;

      breakdown.push({
        year,
        interest: cumulativeInterest,
        total: totalAmount,
      });
    }

    return breakdown;
  }, [principal, rate, time]);

  /* ---------------- FLAT TO REDUCING CONVERTER ---------------- */
  const reducingRate = useMemo(() => {
    // Approximate formula: Reducing ≈ Flat × 1.85 to 2.0
    return (flatRate * 1.9).toFixed(2);
  }, [flatRate]);

  const reset = () => {
    setMode('forward');
    setPrincipal(100000);
    setRate(8);
    setTime(5);
    setTargetInterest(40000);
    setFlatRate(7);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'si_reset', {
        calculator_type: 'Simple_Interest',
      });
    }
  };

  /* ---------- SAVE CALCULATION ---------- */
  const handleSaveCalculation = () => {
    const calculation: SavedCalculation = {
      id: Date.now(),
      mode,
      principal: results.principal,
      rate: results.rate,
      time: results.time,
      interest: results.interest,
      total: results.totalAmount,
      date: new Date().toISOString(),
    };

    const saved = [...savedCalculations];
    saved.unshift(calculation);
    const trimmed = saved.slice(0, 10);

    setSavedCalculations(trimmed);

    try {
      localStorage.setItem('si_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('Calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'si_saved', {
        mode: mode,
        principal: results.principal,
        rate: results.rate,
      });
    }
  };

  /* ---------- DELETE CALCULATION ---------- */
  const handleDeleteCalculation = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('si_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');
  };

  /* ---------- CLEAR ALL ---------- */
  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('si_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');
  };

  /* ---------- SHARE ---------- */
  const handleShare = () => {
    const message =
      `💰 Simple Interest Calculation\\n\\n` +
      `Principal: ${formatINR(results.principal)}\\n` +
      `Rate: ${results.rate}% p.a.\\n` +
      `Time: ${results.time} years\\n\\n` +
      `Total Interest: ${formatINR(results.interest)}\\n` +
      `Maturity Value: ${formatINR(results.totalAmount)}\\n\\n` +
      `Calculate yours: https://fincado.com/simple-interest-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'si_shared', {
        method: 'whatsapp',
        principal: results.principal,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* ============ MAIN CALCULATOR ============ */}
      <Card className="border-border shadow-sm bg-card">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <Percent className="h-5 w-5 text-emerald-600" />
              Simple Interest Calculator
            </CardTitle>
            <button
              onClick={reset}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6 lg:p-8">
          {/* Mode Selection */}
          <div className="mb-8">
            <Label className="mb-3 block">Calculation Mode</Label>
            <Tabs
              value={mode}
              onValueChange={(v) =>
                setMode(
                  v as 'forward' | 'findPrincipal' | 'findRate' | 'findTime',
                )
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="forward">
                  <Calculator className="h-4 w-4 mr-2" />
                  Find Interest
                </TabsTrigger>
                <TabsTrigger value="findPrincipal">Find Principal</TabsTrigger>
                <TabsTrigger value="findRate">Find Rate</TabsTrigger>
                <TabsTrigger value="findTime">Find Time</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* --- LEFT: INPUTS --- */}
            <div className="space-y-6">
              {/* Forward Mode */}
              {mode === 'forward' && (
                <>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>{t.principal}</Label>
                      <Badge
                        variant="secondary"
                        className="font-mono text-slate-700"
                      >
                        {formatINR(principal)}
                      </Badge>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={principal}
                        onChange={(e) =>
                          setPrincipal(Math.max(0, Number(e.target.value) || 0))
                        }
                        className="pl-8 h-11"
                      />
                    </div>
                    <Slider
                      value={[principal]}
                      min={1000}
                      max={10000000}
                      step={1000}
                      onValueChange={(v) => setPrincipal(v[0])}
                      className="text-emerald-600"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>{t.rate}</Label>
                      <Badge
                        variant="secondary"
                        className="font-mono text-slate-700"
                      >
                        {rate}%
                      </Badge>
                    </div>
                    <Slider
                      value={[rate]}
                      min={1}
                      max={30}
                      step={0.1}
                      onValueChange={(v) => setRate(v[0])}
                      className="text-emerald-600"
                    />
                    <div className="flex flex-wrap gap-2">
                      {[6, 8, 10, 12, 15].map((r) => (
                        <Badge
                          key={r}
                          variant={rate === r ? 'default' : 'outline'}
                          className={`cursor-pointer transition ${
                            rate === r
                              ? 'bg-emerald-600 hover:bg-emerald-700'
                              : 'hover:bg-slate-50'
                          }`}
                          onClick={() => setRate(r)}
                        >
                          {r}%
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>{t.time}</Label>
                      <Badge
                        variant="secondary"
                        className="font-mono text-slate-700"
                      >
                        {time} Years
                      </Badge>
                    </div>
                    <Slider
                      value={[time]}
                      min={1}
                      max={30}
                      step={1}
                      onValueChange={(v) => setTime(v[0])}
                      className="text-emerald-600"
                    />
                    <div className="flex flex-wrap gap-2">
                      {[1, 3, 5, 7, 10].map((y) => (
                        <Badge
                          key={y}
                          variant={time === y ? 'default' : 'outline'}
                          className={`cursor-pointer transition ${
                            time === y
                              ? 'bg-emerald-600 hover:bg-emerald-700'
                              : 'hover:bg-slate-50'
                          }`}
                          onClick={() => setTime(y)}
                        >
                          {y}y
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Find Principal Mode */}
              {mode === 'findPrincipal' && (
                <>
                  <div className="space-y-4">
                    <Label>Target Interest Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={targetInterest}
                        onChange={(e) =>
                          setTargetInterest(
                            Math.max(0, Number(e.target.value) || 0),
                          )
                        }
                        className="pl-8 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Interest Rate (% p.a)</Label>
                      <Badge variant="secondary">{rate}%</Badge>
                    </div>
                    <Slider
                      value={[rate]}
                      min={1}
                      max={30}
                      step={0.1}
                      onValueChange={(v) => setRate(v[0])}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Time Period (Years)</Label>
                      <Badge variant="secondary">{time} Years</Badge>
                    </div>
                    <Slider
                      value={[time]}
                      min={1}
                      max={30}
                      step={1}
                      onValueChange={(v) => setTime(v[0])}
                    />
                  </div>
                </>
              )}

              {/* Find Rate Mode */}
              {mode === 'findRate' && (
                <>
                  <div className="space-y-4">
                    <Label>Principal Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={principal}
                        onChange={(e) =>
                          setPrincipal(Math.max(0, Number(e.target.value) || 0))
                        }
                        className="pl-8 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Target Interest Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={targetInterest}
                        onChange={(e) =>
                          setTargetInterest(
                            Math.max(0, Number(e.target.value) || 0),
                          )
                        }
                        className="pl-8 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Time Period (Years)</Label>
                      <Badge variant="secondary">{time} Years</Badge>
                    </div>
                    <Slider
                      value={[time]}
                      min={1}
                      max={30}
                      step={1}
                      onValueChange={(v) => setTime(v[0])}
                    />
                  </div>
                </>
              )}

              {/* Find Time Mode */}
              {mode === 'findTime' && (
                <>
                  <div className="space-y-4">
                    <Label>Principal Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={principal}
                        onChange={(e) =>
                          setPrincipal(Math.max(0, Number(e.target.value) || 0))
                        }
                        className="pl-8 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Target Interest Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={targetInterest}
                        onChange={(e) =>
                          setTargetInterest(
                            Math.max(0, Number(e.target.value) || 0),
                          )
                        }
                        className="pl-8 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Interest Rate (% p.a)</Label>
                      <Badge variant="secondary">{rate}%</Badge>
                    </div>
                    <Slider
                      value={[rate]}
                      min={1}
                      max={30}
                      step={0.1}
                      onValueChange={(v) => setRate(v[0])}
                    />
                  </div>
                </>
              )}
            </div>

            {/* --- RIGHT: RESULTS --- */}
            <div className="flex flex-col h-full">
              {/* Pie Chart */}
              <InterestPieChart
                principalPct={results.principalPct}
                interestPct={results.interestPct}
              />

              {/* Result Summary */}
              <div className="mt-4 text-center">
                <div className="text-sm text-slate-500 mb-1">
                  {mode === 'forward' && 'Total Maturity Value'}
                  {mode === 'findPrincipal' && 'Required Principal Amount'}
                  {mode === 'findRate' && 'Required Interest Rate'}
                  {mode === 'findTime' && 'Required Time Period'}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                  {mode === 'forward' && formatINR(results.totalAmount)}
                  {mode === 'findPrincipal' && formatINR(results.principal)}
                  {mode === 'findRate' && `${results.rate}% p.a.`}
                  {mode === 'findTime' && `${results.time} years`}
                </div>
              </div>

              {/* Breakdown Cards */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="text-xs text-blue-700 mb-1">Principal</div>
                    <div className="font-semibold text-blue-900">
                      {formatINR(results.principal)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent className="p-4">
                    <div className="text-xs text-emerald-700 mb-1">
                      Total Interest
                    </div>
                    <div className="font-semibold text-emerald-900">
                      +{formatINR(results.interest)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Insight Box */}
              <div className="mt-4 flex gap-3 items-start p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  {mode === 'forward' && (
                    <>
                      With {rate}% simple interest for {time} years, you&apos;ll
                      earn <strong>{formatINR(results.interest)}</strong> on
                      principal of {formatINR(principal)}.
                    </>
                  )}
                  {mode === 'findPrincipal' && (
                    <>
                      To earn <strong>{formatINR(targetInterest)}</strong>{' '}
                      interest in {time} years at {rate}%, invest{' '}
                      <strong>{formatINR(results.principal)}</strong>.
                    </>
                  )}
                  {mode === 'findRate' && (
                    <>
                      To earn <strong>{formatINR(targetInterest)}</strong> on{' '}
                      {formatINR(principal)} in {time} years, you need{' '}
                      <strong>{results.rate}% p.a.</strong> interest rate.
                    </>
                  )}
                  {mode === 'findTime' && (
                    <>
                      To earn <strong>{formatINR(targetInterest)}</strong> on{' '}
                      {formatINR(principal)} at {rate}%, it will take{' '}
                      <strong>{results.time} years</strong>.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Year-wise Breakdown */}
      {mode === 'forward' && time <= 10 && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">
              Year-wise Interest Breakdown
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Cumulative Interest</TableHead>
                    <TableHead>Total Amount</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {yearwiseBreakdown.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell className="font-medium">
                        Year {row.year}
                      </TableCell>
                      <TableCell>{formatINR(row.interest)}</TableCell>
                      <TableCell className="font-semibold text-emerald-700">
                        {formatINR(row.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Flat to Reducing Converter */}
      <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Flat Rate to Reducing Balance Converter
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Flat Interest Rate (% p.a)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[flatRate]}
                min={5}
                max={20}
                step={0.5}
                onValueChange={(v) => setFlatRate(v[0])}
                className="flex-1"
              />
              <Badge variant="secondary" className="min-w-15 justify-center">
                {flatRate}%
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
            <div>
              <div className="text-sm text-slate-600 mb-1">
                Equivalent Reducing Balance Rate
              </div>
              <div className="text-2xl font-bold text-orange-600">
                ≈ {reducingRate}% p.a.
              </div>
            </div>
            <ArrowRight className="h-6 w-6 text-slate-400" />
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-slate-700">
              <strong>Car Loan Warning:</strong> A &quot;7% flat&quot; car loan
              is equivalent to approximately <strong>13-14% reducing</strong>{' '}
              rate. Always ask for reducing balance rate before signing.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
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

      {/* Saved Calculations History */}
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
                  <div className="pr-8">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {calc.mode === 'forward'
                          ? 'Forward'
                          : calc.mode.replace('find', 'Found ')}
                      </Badge>
                    </div>

                    <div className="text-sm font-semibold text-slate-900">
                      {formatINR(calc.principal)} @ {calc.rate}% for {calc.time}
                      y
                    </div>

                    <div className="text-xs text-slate-600 mt-1">
                      Interest: {formatINR(calc.interest)} • Total:{' '}
                      {formatINR(calc.total)}
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      {new Date(calc.date).toLocaleDateString('en-IN')}
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
