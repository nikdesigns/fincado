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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  TrendingUp,
  RefreshCcw,
  Calculator,
  Info,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Sparkles,
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
interface CompoundLabels {
  principal: string;
  rate: string;
  timePeriod: string;
  frequency: string;
  resetDefaults: string;
  totalAmount: string;
  investedAmount: string;
  interestEarned: string;
  yearly: string;
  halfYearly: string;
  quarterly: string;
  monthly: string;
  daily: string;
}

const DEFAULT_LABELS: CompoundLabels = {
  principal: 'Principal Amount (₹)',
  rate: 'Annual Interest Rate (%)',
  timePeriod: 'Time Period (Years)',
  frequency: 'Compounding Frequency',
  resetDefaults: 'Reset',
  totalAmount: 'Maturity Amount',
  investedAmount: 'Invested Amount',
  interestEarned: 'Total Interest Earned',
  yearly: 'Yearly',
  halfYearly: 'Half-Yearly',
  quarterly: 'Quarterly',
  monthly: 'Monthly',
  daily: 'Daily',
};

interface SavedCalculation {
  id: number;
  mode: string;
  principal: number;
  rate: number;
  years: number;
  frequency: number;
  maturity: number;
  interest: number;
  date: string;
}

/* ---------------- CHART COMPONENT ---------------- */
function CompoundInterestDonut({
  principal,
  interest,
}: {
  principal: number;
  interest: number;
}) {
  const total = principal + interest;
  const principalPct = total > 0 ? Math.round((principal / total) * 100) : 0;
  const interestPct = total > 0 ? 100 - principalPct : 0;

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

          {/* Principal (Indigo) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#6366f1"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash1} ${circumference}`}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />

          {/* Interest (Lime) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#84cc16"
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
            Interest
          </span>
          <span className="text-2xl font-bold text-lime-600">
            {interestPct}%
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500" />
          <span className="text-xs font-medium text-slate-600">Principal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-lime-500" />
          <span className="text-xs font-medium text-slate-600">Interest</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function CompoundInterestClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<CompoundLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------------- STATE ---------------- */
  const [mode, setMode] = useState<
    'forward' | 'findPrincipal' | 'findRate' | 'findTime'
  >('forward');
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(4); // 1=Yearly, 2=Half-yearly, 4=Quarterly, 12=Monthly, 365=Daily

  // For reverse calculations
  const [targetAmount, setTargetAmount] = useState(259374);

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
      const saved = localStorage.getItem('ci_history');
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
        calculator_type: 'Compound_Interest',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------------- CALCULATIONS ---------------- */
  const results = useMemo(() => {
    if (mode === 'forward') {
      // Standard: A = P(1 + r/n)^(nt)
      const r = rate / 100;
      const n = frequency;
      const t = years;

      const maturity = principal * Math.pow(1 + r / n, n * t);
      const interest = maturity - principal;

      return {
        principal,
        maturity: Math.round(maturity),
        interest: Math.round(interest),
        rate,
        years,
        frequency,
      };
    } else if (mode === 'findPrincipal') {
      // Find P: P = A / (1 + r/n)^(nt)
      const r = rate / 100;
      const n = frequency;
      const t = years;

      const calculatedPrincipal = targetAmount / Math.pow(1 + r / n, n * t);
      const interest = targetAmount - calculatedPrincipal;

      return {
        principal: Math.round(calculatedPrincipal),
        maturity: targetAmount,
        interest: Math.round(interest),
        rate,
        years,
        frequency,
      };
    } else if (mode === 'findRate') {
      // Find r: r = n * [(A/P)^(1/(nt)) - 1]
      const n = frequency;
      const t = years;

      const calculatedRate =
        n * (Math.pow(targetAmount / principal, 1 / (n * t)) - 1) * 100;
      const interest = targetAmount - principal;

      return {
        principal,
        maturity: targetAmount,
        interest: Math.round(interest),
        rate: parseFloat(calculatedRate.toFixed(2)),
        years,
        frequency,
      };
    } else {
      // Find t: t = ln(A/P) / (n * ln(1 + r/n))
      const r = rate / 100;
      const n = frequency;

      const calculatedTime =
        Math.log(targetAmount / principal) / (n * Math.log(1 + r / n));
      const interest = targetAmount - principal;

      return {
        principal,
        maturity: targetAmount,
        interest: Math.round(interest),
        rate,
        years: parseFloat(calculatedTime.toFixed(2)),
        frequency,
      };
    }
  }, [mode, principal, rate, years, frequency, targetAmount]);

  /* ---------------- YEAR-WISE BREAKDOWN ---------------- */
  const yearwiseBreakdown = useMemo(() => {
    if (mode !== 'forward') return [];

    const breakdown = [];
    const r = rate / 100;
    const n = frequency;

    for (let year = 1; year <= Math.min(years, 15); year++) {
      const amount = principal * Math.pow(1 + r / n, n * year);
      const interest = amount - principal;

      breakdown.push({
        year,
        amount: Math.round(amount),
        interest: Math.round(interest),
      });
    }

    return breakdown;
  }, [principal, rate, years, frequency, mode]);

  /* ---------------- RULE OF 72 (DOUBLING TIME) ---------------- */
  const doublingTime = useMemo(() => {
    if (rate === 0) return Infinity;
    return (72 / rate).toFixed(1);
  }, [rate]);

  /* ---------------- CI vs SI COMPARISON ---------------- */
  const comparisonWithSI = useMemo(() => {
    // Simple Interest
    const siInterest = (principal * rate * years) / 100;
    const siTotal = principal + siInterest;

    // Compound Interest
    const ciTotal = results.maturity;
    const ciInterest = results.interest;

    const extraEarnings = ciTotal - siTotal;
    const percentageGain =
      siTotal > 0 ? ((extraEarnings / siTotal) * 100).toFixed(1) : '0';

    return {
      siTotal: Math.round(siTotal),
      siInterest: Math.round(siInterest),
      ciTotal,
      ciInterest,
      extraEarnings: Math.round(extraEarnings),
      percentageGain,
    };
  }, [principal, rate, years, results]);

  const reset = () => {
    setMode('forward');
    setPrincipal(100000);
    setRate(10);
    setYears(10);
    setFrequency(4);
    setTargetAmount(259374);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ci_reset', {
        calculator_type: 'Compound_Interest',
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
      years: results.years,
      frequency: results.frequency,
      maturity: results.maturity,
      interest: results.interest,
      date: new Date().toISOString(),
    };

    const saved = [...savedCalculations];
    saved.unshift(calculation);
    const trimmed = saved.slice(0, 10);

    setSavedCalculations(trimmed);

    try {
      localStorage.setItem('ci_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('Calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ci_saved', {
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
      localStorage.setItem('ci_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');
  };

  /* ---------- CLEAR ALL ---------- */
  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('ci_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');
  };

  /* ---------- SHARE ---------- */
  const handleShare = () => {
    const frequencyName =
      {
        1: 'Yearly',
        2: 'Half-yearly',
        4: 'Quarterly',
        12: 'Monthly',
        365: 'Daily',
      }[frequency] || 'Quarterly';

    const message =
      `💰 Compound Interest Calculation\\n\\n` +
      `Principal: ${formatINR(results.principal)}\\n` +
      `Rate: ${results.rate}% p.a.\\n` +
      `Time: ${results.years} years\\n` +
      `Frequency: ${frequencyName}\\n\\n` +
      `Maturity: ${formatINR(results.maturity)}\\n` +
      `Interest Earned: ${formatINR(results.interest)}\\n\\n` +
      `Power of Compounding! 🚀\\n\\n` +
      `Calculate yours: https://fincado.com/compound-interest-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ci_shared', {
        method: 'whatsapp',
        principal: results.principal,
      });
    }
  };

  /* ---------- FREQUENCY NAME ---------- */
  const getFrequencyName = (freq: number) => {
    const names: { [key: number]: string } = {
      1: 'Yearly',
      2: 'Half-yearly',
      4: 'Quarterly',
      12: 'Monthly',
      365: 'Daily',
    };
    return names[freq] || 'Quarterly';
  };

  return (
    <div className="space-y-6">
      {/* ============ MAIN CALCULATOR ============ */}
      <Card className="border-border shadow-sm bg-card">
        <CardHeader className="bg-linear-to-r from-indigo-50 to-lime-50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <TrendingUp className="h-5 w-5 text-lime-600" />
              Compound Interest Calculator
            </CardTitle>
            <button
              onClick={reset}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-lime-600 transition-colors"
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
              onValueChange={(v: unknown) => setMode(v)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="forward">
                  <Calculator className="h-4 w-4 mr-2" />
                  Find Maturity
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
                      className="text-lime-600"
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
                      className="text-lime-600"
                    />
                    <div className="flex flex-wrap gap-2">
                      {[6, 8, 10, 12, 15].map((r) => (
                        <Badge
                          key={r}
                          variant={rate === r ? 'default' : 'outline'}
                          className={`cursor-pointer transition ${
                            rate === r
                              ? 'bg-lime-600 hover:bg-lime-700'
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
                      <Label>{t.timePeriod}</Label>
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
                      max={50}
                      step={1}
                      onValueChange={(v) => setYears(v[0])}
                      className="text-lime-600"
                    />
                    <div className="flex flex-wrap gap-2">
                      {[5, 10, 15, 20, 30].map((y) => (
                        <Badge
                          key={y}
                          variant={years === y ? 'default' : 'outline'}
                          className={`cursor-pointer transition ${
                            years === y
                              ? 'bg-lime-600 hover:bg-lime-700'
                              : 'hover:bg-slate-50'
                          }`}
                          onClick={() => setYears(y)}
                        >
                          {y}y
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>{t.frequency}</Label>
                    <Select
                      value={String(frequency)}
                      onValueChange={(v) => setFrequency(Number(v))}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">{t.yearly}</SelectItem>
                        <SelectItem value="2">{t.halfYearly}</SelectItem>
                        <SelectItem value="4">{t.quarterly}</SelectItem>
                        <SelectItem value="12">{t.monthly}</SelectItem>
                        <SelectItem value="365">{t.daily}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Find Principal Mode */}
              {mode === 'findPrincipal' && (
                <>
                  <div className="space-y-4">
                    <Label>Target Maturity Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={targetAmount}
                        onChange={(e) =>
                          setTargetAmount(
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
                      <Badge variant="secondary">{years} Years</Badge>
                    </div>
                    <Slider
                      value={[years]}
                      min={1}
                      max={50}
                      step={1}
                      onValueChange={(v) => setYears(v[0])}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Compounding Frequency</Label>
                    <Select
                      value={String(frequency)}
                      onValueChange={(v) => setFrequency(Number(v))}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yearly</SelectItem>
                        <SelectItem value="2">Half-yearly</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="365">Daily</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label>Target Maturity Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={targetAmount}
                        onChange={(e) =>
                          setTargetAmount(
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
                      <Badge variant="secondary">{years} Years</Badge>
                    </div>
                    <Slider
                      value={[years]}
                      min={1}
                      max={50}
                      step={1}
                      onValueChange={(v) => setYears(v[0])}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Compounding Frequency</Label>
                    <Select
                      value={String(frequency)}
                      onValueChange={(v) => setFrequency(Number(v))}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yearly</SelectItem>
                        <SelectItem value="2">Half-yearly</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="365">Daily</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label>Target Maturity Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={targetAmount}
                        onChange={(e) =>
                          setTargetAmount(
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

                  <div className="space-y-3">
                    <Label>Compounding Frequency</Label>
                    <Select
                      value={String(frequency)}
                      onValueChange={(v) => setFrequency(Number(v))}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yearly</SelectItem>
                        <SelectItem value="2">Half-yearly</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="365">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            {/* --- RIGHT: RESULTS --- */}
            <div className="flex flex-col h-full">
              {/* Pie Chart */}
              <CompoundInterestDonut
                principal={results.principal}
                interest={results.interest}
              />

              {/* Result Summary */}
              <div className="mt-4 text-center">
                <div className="text-sm text-slate-500 mb-1">
                  {mode === 'forward' && 'Maturity Amount'}
                  {mode === 'findPrincipal' && 'Required Principal'}
                  {mode === 'findRate' && 'Required Interest Rate'}
                  {mode === 'findTime' && 'Required Time Period'}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-lime-600">
                  {mode === 'forward' && formatINR(results.maturity)}
                  {mode === 'findPrincipal' && formatINR(results.principal)}
                  {mode === 'findRate' && `${results.rate}% p.a.`}
                  {mode === 'findTime' && `${results.years} years`}
                </div>
              </div>

              {/* Breakdown Cards */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Card className="border-indigo-200 bg-indigo-50">
                  <CardContent className="p-4">
                    <div className="text-xs text-indigo-700 mb-1">
                      Principal
                    </div>
                    <div className="font-semibold text-indigo-900">
                      {formatINR(results.principal)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-lime-50">
                  <CardContent className="p-4">
                    <div className="text-xs text-lime-700 mb-1">
                      Interest Earned
                    </div>
                    <div className="font-semibold text-lime-900">
                      +{formatINR(results.interest)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Rule of 72 */}
              {mode === 'forward' && (
                <div className="mt-4 p-3 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-900">
                      Rule of 72
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Your money will <strong>double</strong> in approximately{' '}
                    <strong className="text-purple-700">
                      {doublingTime} years
                    </strong>{' '}
                    at {rate}% annual return.
                  </p>
                </div>
              )}

              {/* Insight Box */}
              <div className="mt-4 flex gap-3 items-start p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  {mode === 'forward' && (
                    <>
                      With {rate}% compound interest (
                      {getFrequencyName(frequency)}) for {years} years, your{' '}
                      {formatINR(principal)} will grow to{' '}
                      <strong>{formatINR(results.maturity)}</strong>. Compound
                      interest earns you{' '}
                      <strong>{formatINR(results.interest)}</strong>.
                    </>
                  )}
                  {mode === 'findPrincipal' && (
                    <>
                      To reach <strong>{formatINR(targetAmount)}</strong> in{' '}
                      {years} years at {rate}%, invest{' '}
                      <strong>{formatINR(results.principal)}</strong> today.
                    </>
                  )}
                  {mode === 'findRate' && (
                    <>
                      To grow {formatINR(principal)} to{' '}
                      <strong>{formatINR(targetAmount)}</strong> in {years}{' '}
                      years, you need <strong>{results.rate}% p.a.</strong>{' '}
                      return.
                    </>
                  )}
                  {mode === 'findTime' && (
                    <>
                      To grow {formatINR(principal)} to{' '}
                      <strong>{formatINR(targetAmount)}</strong> at {rate}%, it
                      will take <strong>{results.years} years</strong>.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CI vs SI Comparison */}
      {mode === 'forward' && (
        <Card className="border-slate-200 bg-linear-to-br from-slate-50 to-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              Compound vs Simple Interest Comparison
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-100 rounded-lg border border-slate-300">
                <div className="text-xs text-slate-600 mb-1">
                  Simple Interest (Linear)
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {formatINR(comparisonWithSI.siTotal)}
                </div>
                <div className="text-xs text-slate-600 mt-2">
                  Interest: {formatINR(comparisonWithSI.siInterest)}
                </div>
              </div>

              <div className="p-4 bg-linear-to-br from-lime-100 to-lime-50 rounded-lg border border-lime-300">
                <div className="text-xs text-lime-700 mb-1">
                  Compound Interest (Exponential)
                </div>
                <div className="text-2xl font-bold text-lime-900">
                  {formatINR(comparisonWithSI.ciTotal)}
                </div>
                <div className="text-xs text-lime-700 mt-2">
                  Interest: {formatINR(comparisonWithSI.ciInterest)}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-slate-700">
                <strong className="text-emerald-900">
                  Compound interest earns you{' '}
                  {formatINR(comparisonWithSI.extraEarnings)} MORE
                </strong>{' '}
                than simple interest ({comparisonWithSI.percentageGain}% extra)
                due to the power of compounding! 🚀
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Year-wise Breakdown */}
      {mode === 'forward' && years <= 15 && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">
              Year-wise Growth Breakdown
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Maturity Amount</TableHead>
                    <TableHead>Total Interest</TableHead>
                    <TableHead>Growth %</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {yearwiseBreakdown.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell className="font-medium">
                        Year {row.year}
                      </TableCell>
                      <TableCell className="font-semibold text-lime-700">
                        {formatINR(row.amount)}
                      </TableCell>
                      <TableCell>{formatINR(row.interest)}</TableCell>
                      <TableCell className="text-slate-600">
                        +
                        {(((row.amount - principal) / principal) * 100).toFixed(
                          1,
                        )}
                        %
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

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
                      <Badge variant="secondary" className="text-xs">
                        {getFrequencyName(calc.frequency)}
                      </Badge>
                    </div>

                    <div className="text-sm font-semibold text-slate-900">
                      {formatINR(calc.principal)} @ {calc.rate}% for{' '}
                      {calc.years}y
                    </div>

                    <div className="text-xs text-slate-600 mt-1">
                      Maturity: {formatINR(calc.maturity)} • Interest:{' '}
                      {formatINR(calc.interest)}
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
