'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EMIPieChart from '@/components/EMIPieChart';
import { BookmarkIcon, Share2Icon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

/* ---------- TYPES ---------- */
interface CAGRLabels {
  initialInvestment: string;
  finalValue: string;
  investmentPeriod: string;
  cagrResult: string;
  absoluteReturn: string;
  totalGain: string;
  totalGainPercent: string;
  saveCalculation: string;
  shareWhatsApp: string;
  savedCalculations: string;
  clearAll: string;
  years: string;
  investment: string;
  final: string;
  period: string;
  cagr: string;
  gain: string;
  perYear: string;
}

const DEFAULT_LABELS: CAGRLabels = {
  initialInvestment: 'Initial Investment (₹)',
  finalValue: 'Final Value (₹)',
  investmentPeriod: 'Investment Period (Years)',
  cagrResult: 'CAGR (Compound Annual Growth Rate)',
  absoluteReturn: 'Absolute Return',
  totalGain: 'Total Wealth Gain',
  totalGainPercent: 'Total Return %',
  saveCalculation: 'Save Calculation',
  shareWhatsApp: 'Share via WhatsApp',
  savedCalculations: 'Your Saved CAGR Calculations',
  clearAll: 'Clear All',
  years: 'years',
  investment: 'Investment:',
  final: 'Final:',
  period: 'Period:',
  cagr: 'CAGR:',
  gain: 'Gain:',
  perYear: 'per year',
};

interface SavedCalculation {
  id: number;
  initial: number;
  final: number;
  years: number;
  cagr: number;
  gain: number;
  gainPercent: number;
  date: string;
}

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

export default function CAGRClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<CAGRLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [finalValue, setFinalValue] = useState(250000);
  const [years, setYears] = useState(5);

  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  // Load saved calculations
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    try {
      const saved = localStorage.getItem('cagr_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved CAGR calculations:', error);
    }
  }, []);

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'CAGR',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------- CALCULATIONS ---------- */
  const results = useMemo(() => {
    if (initialInvestment > 0 && finalValue > 0 && years > 0) {
      // CAGR Formula: ((Final Value / Initial Value) ^ (1 / Years)) - 1
      const cagrValue =
        (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;
      const absoluteReturn = finalValue - initialInvestment;
      const gainPercent =
        ((finalValue - initialInvestment) / initialInvestment) * 100;

      // For pie chart: investment vs gain
      const principalPct =
        finalValue > 0
          ? Math.round((initialInvestment / finalValue) * 100)
          : 100;
      const gainPct = 100 - principalPct;

      return {
        cagr: cagrValue,
        absoluteReturn: Math.round(absoluteReturn),
        gainPercent,
        principalPct,
        gainPct,
      };
    }

    return {
      cagr: 0,
      absoluteReturn: 0,
      gainPercent: 0,
      principalPct: 100,
      gainPct: 0,
    };
  }, [initialInvestment, finalValue, years]);

  /* ---------- HANDLERS ---------- */
  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      initial: initialInvestment,
      final: finalValue,
      years,
      cagr: results.cagr,
      gain: results.absoluteReturn,
      gainPercent: results.gainPercent,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('cagr_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving CAGR calculation:', error);
    }

    toast.success('CAGR calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cagr_calculation_saved', {
        initial: initialInvestment,
        final: finalValue,
        years,
        cagr: results.cagr,
      });
    }
  };

  const handleShare = () => {
    const message =
      `💹 CAGR Calculator Results\n\n` +
      `Initial Investment: ${formatINR(initialInvestment)}\n` +
      `Final Value: ${formatINR(finalValue)}\n` +
      `Period: ${years} years\n\n` +
      `📊 CAGR: ${results.cagr.toFixed(2)}% per year\n` +
      `💰 Total Gain: ${formatINR(results.absoluteReturn)} (${results.gainPercent.toFixed(2)}%)\n\n` +
      `Calculate yours: https://fincado.com/cagr-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cagr_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('cagr_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating CAGR history:', error);
    }

    toast.success('Calculation deleted!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cagr_calculation_deleted', {
        calculations_remaining: updated.length,
      });
    }
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('cagr_calculator_history');
    } catch (error) {
      console.error('Error clearing CAGR history:', error);
    }
    toast.success('All CAGR calculations cleared!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cagr_history_cleared', {
        calculations_cleared: savedCalculations.length,
      });
    }
  };

  const handleLoad = (calc: SavedCalculation) => {
    setInitialInvestment(calc.initial);
    setFinalValue(calc.final);
    setYears(calc.years);
    toast.success('Calculation loaded!');
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Main Calculator */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ---------- INPUTS ---------- */}
            <div className="space-y-6">
              <CalculatorField
                label={t.initialInvestment}
                value={initialInvestment}
                min={1000}
                max={10000000}
                step={1000}
                onChange={setInitialInvestment}
              />

              <CalculatorField
                label={t.finalValue}
                value={finalValue}
                min={1000}
                max={50000000}
                step={1000}
                onChange={setFinalValue}
              />

              <CalculatorField
                label={t.investmentPeriod}
                value={years}
                min={1}
                max={50}
                step={1}
                onChange={setYears}
              />
            </div>

            {/* ---------- VISUALS ---------- */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={results.principalPct}
                interestPct={results.gainPct}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-slate-500">{t.cagrResult}</div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-indigo-700">
                  {results.cagr.toFixed(2)}%
                </div>
                <div className="text-sm text-slate-500 mt-1">{t.perYear}</div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="text-xs text-slate-500 whitespace-nowrap">
                        {t.absoluteReturn}
                      </div>
                      <div className="mt-1 font-semibold text-slate-900 whitespace-nowrap">
                        {formatINR(results.absoluteReturn)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-900/15 dark:border-emerald-900">
                    <CardContent className="p-4">
                      <div className="text-xs text-emerald-700 dark:text-emerald-400">
                        {t.totalGainPercent}
                      </div>
                      <div className="mt-1 font-semibold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                        {results.gainPercent.toFixed(2)}%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-3 text-xs text-slate-500">
                  CAGR smooths volatility and shows average annual growth rate
                </div>
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
                    onClick={() => handleLoad(calc)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          {formatINR(calc.initial)} → {formatINR(calc.final)}{' '}
                          <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded ml-1">
                            {calc.years}y
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {t.cagr} {calc.cagr.toFixed(2)}% | {t.gain}{' '}
                          {formatINR(calc.gain)} ({calc.gainPercent.toFixed(1)}
                          %)
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
