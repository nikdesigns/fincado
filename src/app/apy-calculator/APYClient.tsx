'use client';

import React, { useMemo, useState, useEffect } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BookmarkIcon, Share2Icon, Trash2, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
export interface APYLabels {
  joiningAge: string;
  desiredPension: string;
  contributionFreq: string;
  contributionYears: string;
  pensionStartsAt: string;
  resetDefaults: string;
  youNeedToPay: string;
  totalInvestment: string;
  corpusToNominee: string;
  guaranteedPension: string;
  forSpouse: string;
  per: string;
  monthly: string;
  quarterly: string;
  halfYearly: string;
  years: string;
}

interface APYClientProps {
  labels?: APYLabels;
}

interface SavedCalculation {
  id: number;
  age: number;
  pension: string;
  frequency: Frequency;
  periodicContribution: number;
  totalInvestment: number;
  date: string;
}

type Frequency = 'Monthly' | 'Quarterly' | 'Half-Yearly';
type PensionAmount = 1000 | 2000 | 3000 | 4000 | 5000;

const isFrequency = (value: unknown): value is Frequency =>
  value === 'Monthly' || value === 'Quarterly' || value === 'Half-Yearly';

const isSavedCalculation = (value: unknown): value is SavedCalculation => {
  if (!value || typeof value !== 'object') return false;

  const entry = value as Partial<SavedCalculation>;
  return (
    typeof entry.id === 'number' &&
    typeof entry.age === 'number' &&
    typeof entry.pension === 'string' &&
    isFrequency(entry.frequency) &&
    typeof entry.periodicContribution === 'number' &&
    typeof entry.totalInvestment === 'number' &&
    typeof entry.date === 'string'
  );
};

const readSavedCalculations = (): SavedCalculation[] => {
  try {
    const saved = localStorage.getItem('apy_history');
    if (!saved) return [];

    const parsed = JSON.parse(saved) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isSavedCalculation);
  } catch (error) {
    console.error('Error loading saved calculations:', error);
    return [];
  }
};

const toPensionNumber = (value: string): number => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 1000;
};

const toPensionAmount = (value: string): PensionAmount => {
  const parsed = toPensionNumber(value);
  return (PENSION_SLABS as readonly number[]).includes(parsed)
    ? (parsed as PensionAmount)
    : 1000;
};

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

/* ---------- DATA ---------- */
const PENSION_SLABS = [1000, 2000, 3000, 4000, 5000] as const;

const APY_NOMINEE_CORPUS: Record<PensionAmount, number> = {
  1000: 170000,
  2000: 340000,
  3000: 510000,
  4000: 680000,
  5000: 850000,
};

type APYContributionRow = Record<PensionAmount, number>;
type APYContributionTable = Record<number, APYContributionRow>;

const APY_MONTHLY_TABLE: APYContributionTable = {
  18: { 1000: 42, 2000: 84, 3000: 126, 4000: 168, 5000: 210 },
  19: { 1000: 46, 2000: 92, 3000: 138, 4000: 183, 5000: 228 },
  20: { 1000: 50, 2000: 100, 3000: 150, 4000: 198, 5000: 248 },
  21: { 1000: 54, 2000: 108, 3000: 162, 4000: 215, 5000: 269 },
  22: { 1000: 59, 2000: 117, 3000: 177, 4000: 234, 5000: 292 },
  23: { 1000: 64, 2000: 127, 3000: 192, 4000: 254, 5000: 318 },
  24: { 1000: 70, 2000: 139, 3000: 208, 4000: 277, 5000: 346 },
  25: { 1000: 76, 2000: 151, 3000: 226, 4000: 301, 5000: 376 },
  26: { 1000: 82, 2000: 164, 3000: 246, 4000: 327, 5000: 409 },
  27: { 1000: 90, 2000: 178, 3000: 268, 4000: 356, 5000: 446 },
  28: { 1000: 97, 2000: 194, 3000: 292, 4000: 388, 5000: 485 },
  29: { 1000: 106, 2000: 212, 3000: 318, 4000: 423, 5000: 529 },
  30: { 1000: 116, 2000: 231, 3000: 347, 4000: 462, 5000: 577 },
  31: { 1000: 126, 2000: 252, 3000: 379, 4000: 504, 5000: 630 },
  32: { 1000: 138, 2000: 276, 3000: 414, 4000: 551, 5000: 689 },
  33: { 1000: 151, 2000: 302, 3000: 453, 4000: 602, 5000: 752 },
  34: { 1000: 165, 2000: 330, 3000: 495, 4000: 659, 5000: 824 },
  35: { 1000: 181, 2000: 362, 3000: 543, 4000: 722, 5000: 902 },
  36: { 1000: 198, 2000: 396, 3000: 594, 4000: 792, 5000: 990 },
  37: { 1000: 218, 2000: 436, 3000: 654, 4000: 870, 5000: 1087 },
  38: { 1000: 240, 2000: 480, 3000: 720, 4000: 957, 5000: 1196 },
  39: { 1000: 264, 2000: 528, 3000: 792, 4000: 1054, 5000: 1318 },
  40: { 1000: 291, 2000: 582, 3000: 873, 4000: 1164, 5000: 1454 },
};

const APY_QUARTERLY_TABLE: APYContributionTable = {
  18: { 1000: 127, 2000: 254, 3000: 381, 4000: 507, 5000: 634 },
  19: { 1000: 139, 2000: 278, 3000: 417, 4000: 553, 5000: 689 },
  20: { 1000: 151, 2000: 302, 3000: 453, 4000: 598, 5000: 749 },
  21: { 1000: 163, 2000: 326, 3000: 489, 4000: 649, 5000: 812 },
  22: { 1000: 178, 2000: 353, 3000: 535, 4000: 707, 5000: 882 },
  23: { 1000: 193, 2000: 384, 3000: 580, 4000: 767, 5000: 960 },
  24: { 1000: 211, 2000: 420, 3000: 628, 4000: 837, 5000: 1045 },
  25: { 1000: 230, 2000: 456, 3000: 683, 4000: 909, 5000: 1136 },
  26: { 1000: 248, 2000: 495, 3000: 743, 4000: 988, 5000: 1235 },
  27: { 1000: 272, 2000: 538, 3000: 809, 4000: 1075, 5000: 1347 },
  28: { 1000: 293, 2000: 586, 3000: 882, 4000: 1172, 5000: 1465 },
  29: { 1000: 320, 2000: 640, 3000: 960, 4000: 1277, 5000: 1598 },
  30: { 1000: 350, 2000: 698, 3000: 1048, 4000: 1395, 5000: 1743 },
  31: { 1000: 381, 2000: 761, 3000: 1145, 4000: 1522, 5000: 1903 },
  32: { 1000: 417, 2000: 834, 3000: 1250, 4000: 1664, 5000: 2081 },
  33: { 1000: 456, 2000: 912, 3000: 1368, 4000: 1818, 5000: 2271 },
  34: { 1000: 498, 2000: 997, 3000: 1495, 4000: 1990, 5000: 2489 },
  35: { 1000: 547, 2000: 1093, 3000: 1640, 4000: 2180, 5000: 2724 },
  36: { 1000: 598, 2000: 1196, 3000: 1794, 4000: 2392, 5000: 2990 },
  37: { 1000: 658, 2000: 1317, 3000: 1975, 4000: 2627, 5000: 3283 },
  38: { 1000: 725, 2000: 1450, 3000: 2174, 4000: 2890, 5000: 3612 },
  39: { 1000: 797, 2000: 1595, 3000: 2392, 4000: 3183, 5000: 3980 },
  40: { 1000: 879, 2000: 1758, 3000: 2636, 4000: 3515, 5000: 4391 },
};

const APY_HALF_YEARLY_TABLE: APYContributionTable = {
  18: { 1000: 256, 2000: 512, 3000: 769, 4000: 1025, 5000: 1281 },
  19: { 1000: 281, 2000: 561, 3000: 842, 4000: 1116, 5000: 1391 },
  20: { 1000: 305, 2000: 610, 3000: 915, 4000: 1208, 5000: 1513 },
  21: { 1000: 329, 2000: 659, 3000: 988, 4000: 1312, 5000: 1641 },
  22: { 1000: 360, 2000: 714, 3000: 1080, 4000: 1428, 5000: 1781 },
  23: { 1000: 390, 2000: 775, 3000: 1171, 4000: 1550, 5000: 1940 },
  24: { 1000: 427, 2000: 848, 3000: 1269, 4000: 1690, 5000: 2111 },
  25: { 1000: 464, 2000: 921, 3000: 1379, 4000: 1836, 5000: 2294 },
  26: { 1000: 500, 2000: 1001, 3000: 1501, 4000: 1995, 5000: 2495 },
  27: { 1000: 549, 2000: 1086, 3000: 1635, 4000: 2172, 5000: 2721 },
  28: { 1000: 592, 2000: 1184, 3000: 1781, 4000: 2367, 5000: 2959 },
  29: { 1000: 647, 2000: 1293, 3000: 1940, 4000: 2581, 5000: 3227 },
  30: { 1000: 708, 2000: 1409, 3000: 2117, 4000: 2819, 5000: 3520 },
  31: { 1000: 769, 2000: 1537, 3000: 2312, 4000: 3075, 5000: 3844 },
  32: { 1000: 842, 2000: 1684, 3000: 2526, 4000: 3362, 5000: 4204 },
  33: { 1000: 921, 2000: 1842, 3000: 2764, 4000: 3673, 5000: 4588 },
  34: { 1000: 1007, 2000: 2013, 3000: 3020, 4000: 4020, 5000: 5027 },
  35: { 1000: 1104, 2000: 2209, 3000: 3313, 4000: 4405, 5000: 5503 },
  36: { 1000: 1208, 2000: 2416, 3000: 3624, 4000: 4832, 5000: 6040 },
  37: { 1000: 1330, 2000: 2660, 3000: 3990, 4000: 5308, 5000: 6632 },
  38: { 1000: 1464, 2000: 2928, 3000: 4393, 4000: 5839, 5000: 7297 },
  39: { 1000: 1611, 2000: 3221, 3000: 4832, 4000: 6430, 5000: 8041 },
  40: { 1000: 1775, 2000: 3551, 3000: 5326, 4000: 7101, 5000: 8871 },
};

const APY_TABLE_BY_FREQUENCY: Record<Frequency, APYContributionTable> = {
  Monthly: APY_MONTHLY_TABLE,
  Quarterly: APY_QUARTERLY_TABLE,
  'Half-Yearly': APY_HALF_YEARLY_TABLE,
};

const getAPYContribution = (
  age: number,
  pension: PensionAmount,
  frequency: Frequency,
) => {
  const table = APY_TABLE_BY_FREQUENCY[frequency];
  const row = table[age] ?? table[18];
  return row[pension];
};

/* ---------- COMPONENT ---------- */
export default function APYClient({ labels }: APYClientProps) {
  /* ---------- LABELS FALLBACK ---------- */
  const t: APYLabels = labels || {
    joiningAge: 'Joining Age (18–40 years)',
    desiredPension: 'Desired Monthly Pension (₹)',
    contributionFreq: 'Contribution Frequency',
    contributionYears: 'Contribution Years',
    pensionStartsAt: 'Pension Starts',
    resetDefaults: 'Reset defaults',
    youNeedToPay: 'You need to pay',
    totalInvestment: 'Total Investment',
    corpusToNominee: 'Corpus to Nominee',
    guaranteedPension: 'Guaranteed Monthly Pension',
    forSpouse: '(for you & spouse)',
    per: '/',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    halfYearly: 'Half-Yearly',
    years: 'years',
  };

  /* ---------- MAIN STATE ---------- */
  const [joiningAge, setJoiningAge] = useState<number>(25);
  const [pension, setPension] = useState<string>('5000');
  const [frequency, setFrequency] = useState<Frequency>('Monthly');

  /* ---------- COMPARISON MODE STATE ---------- */
  const [comparisonMode, setComparisonMode] = useState(false);
  const [joiningAge2, setJoiningAge2] = useState<number>(30);
  const [pension2, setPension2] = useState<string>('5000');
  const [frequency2, setFrequency2] = useState<Frequency>('Monthly');

  /* ---------- SAVED CALCULATIONS STATE ---------- */
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >(() => {
    if (typeof window === 'undefined') return [];
    return readSavedCalculations();
  });

  /* ---------- TRACK CALCULATOR LOAD ---------- */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'APY',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- MAIN CALCULATION ---------- */
  const calculations = useMemo(() => {
    const retirementAge = 60;
    const years = Math.max(0, retirementAge - joiningAge);
    const pensionVal = toPensionAmount(pension);
    const monthlyBase = getAPYContribution(joiningAge, pensionVal, 'Monthly');
    const periodicContribution = getAPYContribution(
      joiningAge,
      pensionVal,
      frequency,
    );
    const totalPeriods =
      frequency === 'Monthly'
        ? years * 12
        : frequency === 'Quarterly'
          ? years * 4
          : years * 2;
    const totalInvestment = periodicContribution * totalPeriods;
    const nomineeCorpus = APY_NOMINEE_CORPUS[pensionVal];

    const investedPct =
      nomineeCorpus > 0
        ? Math.round((totalInvestment / nomineeCorpus) * 100)
        : 0;

    return {
      years,
      monthlyBase,
      periodicContribution,
      totalInvestment,
      nomineeCorpus,
      investedPct,
      growthPct: Math.max(0, 100 - investedPct),
    };
  }, [joiningAge, pension, frequency]);

  /* ---------- COMPARISON CALCULATION ---------- */
  const calculations2 = useMemo(() => {
    if (!comparisonMode) return null;

    const retirementAge = 60;
    const years = Math.max(0, retirementAge - joiningAge2);
    const pensionVal = toPensionAmount(pension2);
    const monthlyBase = getAPYContribution(joiningAge2, pensionVal, 'Monthly');
    const periodicContribution = getAPYContribution(
      joiningAge2,
      pensionVal,
      frequency2,
    );
    const totalPeriods =
      frequency2 === 'Monthly'
        ? years * 12
        : frequency2 === 'Quarterly'
          ? years * 4
          : years * 2;
    const totalInvestment = periodicContribution * totalPeriods;
    const nomineeCorpus = APY_NOMINEE_CORPUS[pensionVal];

    const investedPct =
      nomineeCorpus > 0
        ? Math.round((totalInvestment / nomineeCorpus) * 100)
        : 0;

    return {
      years,
      monthlyBase,
      periodicContribution,
      totalInvestment,
      nomineeCorpus,
      investedPct,
      growthPct: Math.max(0, 100 - investedPct),
    };
  }, [comparisonMode, joiningAge2, pension2, frequency2]);

  /* ---------- RESET ---------- */
  const resetDefaults = () => {
    setJoiningAge(25);
    setPension('5000');
    setFrequency('Monthly');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apy_reset', {
        calculator_type: 'APY',
      });
    }
  };

  /* ---------- SAVE CALCULATION ---------- */
  const handleSaveCalculation = () => {
    const calculation: SavedCalculation = {
      id: Date.now(),
      age: joiningAge,
      pension: pension,
      frequency: frequency,
      periodicContribution: calculations.periodicContribution,
      totalInvestment: calculations.totalInvestment,
      date: new Date().toISOString(),
    };

    const saved = [...savedCalculations];
    saved.unshift(calculation);
    const trimmed = saved.slice(0, 10);

    setSavedCalculations(trimmed);

    try {
      localStorage.setItem('apy_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('Calculation saved! Access it anytime from your history.');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apy_saved', {
        joining_age: joiningAge,
        pension_amount: pension,
        frequency: frequency,
      });
    }
  };

  /* ---------- DELETE SINGLE CALCULATION ---------- */
  const handleDeleteCalculation = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('apy_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apy_calculation_deleted', {
        calculations_remaining: updated.length,
      });
    }
  };

  /* ---------- CLEAR ALL CALCULATIONS ---------- */
  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('apy_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apy_history_cleared', {
        calculations_cleared: savedCalculations.length,
      });
    }
  };

  /* ---------- SHARE VIA WHATSAPP ---------- */
  const handleShare = () => {
    const message =
      `🏛️ Atal Pension Yojana (APY) Calculation\n\n` +
      `Joining Age: ${joiningAge} years\n` +
      `Desired Pension: ${formatINR(toPensionNumber(pension))}/month\n` +
      `Contribution Frequency: ${frequency}\n\n` +
      `📊 You need to pay: ${formatINR(calculations.periodicContribution)}/${frequency === 'Monthly' ? 'month' : frequency === 'Quarterly' ? 'quarter' : 'half-year'}\n` +
      `💰 Total Investment: ${formatINR(calculations.totalInvestment)}\n` +
      `🎯 Corpus to Nominee: ${formatINR(calculations.nomineeCorpus)}\n\n` +
      `Calculate yours: https://fincado.com/apy-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apy_shared', {
        method: 'whatsapp',
      });
    }
  };

  /* ---------- LOAD SAVED CALCULATION ---------- */
  const handleLoadCalculation = (calc: SavedCalculation) => {
    setJoiningAge(calc.age);
    setPension(calc.pension);
    setFrequency(calc.frequency);
    toast.success('Calculation loaded!');
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="space-y-6">
      {/* ✅ Comparison Mode Toggle */}
      <Card className="border-slate-200">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch
                checked={comparisonMode}
                onCheckedChange={setComparisonMode}
                className="data-[state=checked]:bg-brand-400 data-[state=unchecked]:bg-slate-300"
                id="comparison-mode"
              />
              <label
                htmlFor="comparison-mode"
                className="text-sm font-semibold text-slate-900 cursor-pointer"
              >
                Compare Two Pension Scenarios
              </label>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">
              Compare different ages or pension amounts
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Main Calculator(s) */}
      {!comparisonMode ? (
        // Single Calculator
        <Card className="bg-card">
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* INPUTS */}
              <div className="space-y-8">
                <CalculatorField
                  label={t.joiningAge}
                  value={joiningAge}
                  min={18}
                  max={40}
                  step={1}
                  onChange={setJoiningAge}
                />

                {/* Pension Slab */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">
                    {t.desiredPension}
                  </Label>
                  <Select value={pension} onValueChange={setPension}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Pension" />
                    </SelectTrigger>
                    <SelectContent>
                      {PENSION_SLABS.map((v) => (
                        <SelectItem key={v} value={v.toString()}>
                          {formatINR(v)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Frequency */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">
                    {t.contributionFreq}
                  </Label>
                  <Select
                    value={frequency}
                    onValueChange={(val) => setFrequency(val as Frequency)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">{t.monthly}</SelectItem>
                      <SelectItem value="Quarterly">{t.quarterly}</SelectItem>
                      <SelectItem value="Half-Yearly">
                        {t.halfYearly}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Info Box */}
                <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.contributionYears}
                    </span>
                    <span className="font-semibold text-foreground">
                      {calculations.years} {t.years}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t.pensionStartsAt}
                    </span>
                    <span className="font-semibold text-foreground">
                      Age 60
                    </span>
                  </div>
                </div>

                <button
                  onClick={resetDefaults}
                  className="text-sm font-medium text-muted-foreground underline hover:text-foreground transition-colors"
                >
                  {t.resetDefaults}
                </button>
              </div>

              {/* VISUALS */}
              <div className="flex flex-col items-center justify-center">
                <EMIPieChart
                  principalPct={calculations.investedPct}
                  interestPct={calculations.growthPct}
                />

                <div className="mt-8 w-full space-y-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      {t.youNeedToPay}
                    </div>
                    <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-brand-700">
                      {formatINR(calculations.periodicContribution)}
                      <span className="ml-1 text-lg font-medium text-muted-foreground">
                        {t.per}{' '}
                        {frequency === 'Monthly'
                          ? t.monthly
                          : frequency === 'Quarterly'
                            ? 'Quarter'
                            : 'Half-Year'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-border shadow-none">
                      <CardContent className="p-4">
                        <div className="text-xs text-muted-foreground truncate">
                          {t.totalInvestment}
                        </div>
                        <div className="mt-1 text-lg font-semibold text-foreground">
                          {formatINR(calculations.totalInvestment)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-brand-300 bg-brand-50 shadow-none">
                      <CardContent className="p-4">
                        <div className="text-xs text-brand-700 truncate">
                          {t.corpusToNominee}
                        </div>
                        <div className="mt-1 text-lg font-semibold text-brand-900">
                          {formatINR(calculations.nomineeCorpus)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-xl border border-brand-400 bg-brand-50 p-4 text-center">
                    <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                      {t.guaranteedPension}
                    </div>
                    <div className="mt-1 text-2xl font-black text-brand-900">
                      {formatINR(toPensionNumber(pension))}
                    </div>
                    <div className="text-xs text-brand-700">{t.forSpouse}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Comparison Mode - Two Calculators
        <div className="grid md:grid-cols-2 gap-6">
          {/* Calculator 1 */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-sm font-semibold">
                  A
                </span>
                Scenario A - Early Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.joiningAge}
                value={joiningAge}
                min={18}
                max={40}
                step={1}
                onChange={setJoiningAge}
              />

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {t.desiredPension}
                </Label>
                <Select value={pension} onValueChange={setPension}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PENSION_SLABS.map((v) => (
                      <SelectItem key={v} value={v.toString()}>
                        {formatINR(v)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {t.contributionFreq}
                </Label>
                <Select
                  value={frequency}
                  onValueChange={(val) => setFrequency(val as Frequency)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">{t.monthly}</SelectItem>
                    <SelectItem value="Quarterly">{t.quarterly}</SelectItem>
                    <SelectItem value="Half-Yearly">{t.halfYearly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t border-brand-200">
                <div className="text-center">
                  <div className="text-xs text-slate-600">
                    {frequency} Contribution
                  </div>
                  <div className="text-2xl font-semibold text-brand-700 mt-1">
                    {formatINR(calculations.periodicContribution)}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    Total Investment
                  </div>
                  <div className="text-lg font-semibold text-slate-700">
                    {formatINR(calculations.totalInvestment)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculator 2 */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-sm font-semibold">
                  B
                </span>
                Scenario B - Late Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalculatorField
                label={t.joiningAge}
                value={joiningAge2}
                min={18}
                max={40}
                step={1}
                onChange={setJoiningAge2}
              />

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {t.desiredPension}
                </Label>
                <Select value={pension2} onValueChange={setPension2}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PENSION_SLABS.map((v) => (
                      <SelectItem key={v} value={v.toString()}>
                        {formatINR(v)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {t.contributionFreq}
                </Label>
                <Select
                  value={frequency2}
                  onValueChange={(val) => setFrequency2(val as Frequency)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">{t.monthly}</SelectItem>
                    <SelectItem value="Quarterly">{t.quarterly}</SelectItem>
                    <SelectItem value="Half-Yearly">{t.halfYearly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t border-brand-200">
                <div className="text-center">
                  <div className="text-xs text-slate-600">
                    {frequency2} Contribution
                  </div>
                  <div className="text-2xl font-semibold text-brand-700 mt-1">
                    {formatINR(calculations2?.periodicContribution || 0)}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    Total Investment
                  </div>
                  <div className="text-lg font-semibold text-slate-700">
                    {formatINR(calculations2?.totalInvestment || 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ✅ Comparison Summary */}
      {comparisonMode && calculations2 && (
        <Card className="border-brand-200 bg-brand-900">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Comparison Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-[#D1D5DB] mb-1">
                  Monthly Contribution Difference
                </div>
                <div className="text-xl font-semibold text-brand-400">
                  {formatINR(
                    Math.abs(
                      calculations.monthlyBase - calculations2.monthlyBase,
                    ),
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#D1D5DB] mb-1">
                  Total Investment Difference
                </div>
                <div className="text-xl font-semibold text-brand-400">
                  {formatINR(
                    Math.abs(
                      calculations.totalInvestment -
                        calculations2.totalInvestment,
                    ),
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#D1D5DB] mb-1">Better Option</div>
                <div className="text-xl font-semibold">
                  {calculations.totalInvestment <
                  calculations2.totalInvestment ? (
                    <span className="text-brand-400">🏆 Scenario A</span>
                  ) : calculations.totalInvestment >
                    calculations2.totalInvestment ? (
                    <span className="text-brand-400">🏆 Scenario B</span>
                  ) : (
                    <span className="text-brand-400">Both Equal</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-[#D1D5DB] pt-2 border-t">
              💡 Starting earlier means{' '}
              <strong>
                {formatINR(
                  Math.abs(
                    calculations.totalInvestment -
                      calculations2.totalInvestment,
                  ),
                )}
              </strong>{' '}
              less total contribution for the same pension!
            </p>
          </CardContent>
        </Card>
      )}

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

      {/* ✅ Age Impact Simulator */}
      {!comparisonMode && (
        <Card className="border-brand-200 bg-linear-to-br from-brand-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="h-5 w-5 text-brand-700" />
              Impact of Joining Age
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">
              See how your monthly contribution changes with different joining
              ages
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[20, 25, 30, 35].map((age) => {
                const pensionAmount = toPensionAmount(pension);
                const monthly = getAPYContribution(
                  age,
                  pensionAmount,
                  'Monthly',
                );

                return (
                  <div
                    key={age}
                    className={`p-4 rounded-lg border-2 transition ${
                      age === joiningAge
                        ? 'border-brand-50 bg-brand-100'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="text-xs text-slate-600 mb-1">Age {age}</div>
                    <div className="text-2xl font-semibold text-brand-700">
                      {formatINR(monthly)}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">/month</div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-700 mt-4 p-3 bg-white/70 rounded border border-brand-200">
              💡 <strong>Tip:</strong> Joining 5 years earlier can reduce your
              monthly contribution by up to 30-40%!
            </p>
          </CardContent>
        </Card>
      )}

      {/* ✅ Saved Calculations History */}
      {savedCalculations.length > 0 && (
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
                    onClick={() => handleLoadCalculation(calc)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          Age {calc.age} | Pension:{' '}
                          {formatINR(toPensionNumber(calc.pension))}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Contribution: {formatINR(calc.periodicContribution)} /{' '}
                          {calc.frequency} | Total:{' '}
                          {formatINR(calc.totalInvestment)}
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

      <p className="mt-10 text-xs text-slate-500">
        Contribution values are based on standard APY charts published by PFRDA
        and participating banks. Actual deductions may vary slightly by bank.
      </p>
    </div>
  );
}
