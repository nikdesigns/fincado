'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  BookmarkIcon,
  Share2Icon,
  TrendingUp,
  Trash2,
  Percent,
} from 'lucide-react';
import { toast } from 'sonner';

interface SavedCalculation {
  id: number;
  monthlySip: number;
  rate: number;
  years: number;
  totalInvested: number;
  maturityAmount: number;
  wealthGain: number;
  date: string;
}

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

export default function SIPCalculatorClient() {
  const [monthlySip, setMonthlySip] = useState(10000); // ₹10k
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12); // 12% p.a.
  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);
  const [stepUpPercent, setStepUpPercent] = useState(0); // future enhancement display-only for now

  // Replace the existing useEffect with this:
  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem('sip_calculator_history');
        if (saved) {
          setSavedCalculations(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading saved SIP calculations:', error);
      }
    };

    loadData();
  }, []); // Empty dependency array - runs once

  const results = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;

    let maturityAmount = 0;

    if (monthlyRate === 0) {
      maturityAmount = monthlySip * months;
    } else {
      // Standard SIP formula: FV = P * {[(1+r)^n - 1] / r} * (1 + r)
      const factor = Math.pow(1 + monthlyRate, months);
      maturityAmount =
        monthlySip * ((factor - 1) / monthlyRate) * (1 + monthlyRate);
    }

    if (!isFinite(maturityAmount)) maturityAmount = 0;

    const totalInvested = monthlySip * months;
    const wealthGain = maturityAmount - totalInvested;

    const principalPct =
      maturityAmount > 0
        ? Math.round((totalInvested / maturityAmount) * 100)
        : 0;
    const gainPct = 100 - principalPct;

    return {
      totalInvested: Math.round(totalInvested),
      maturityAmount: Math.round(maturityAmount),
      wealthGain: Math.round(wealthGain),
      principalPct,
      gainPct,
    };
  }, [monthlySip, years, rate]);

  const handleSave = () => {
    const calc: SavedCalculation = {
      id: Date.now(),
      monthlySip,
      rate,
      years,
      totalInvested: results.totalInvested,
      maturityAmount: results.maturityAmount,
      wealthGain: results.wealthGain,
      date: new Date().toISOString(),
    };

    const updated = [calc, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('sip_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving SIP calculation:', error);
    }

    toast.success('SIP calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag!('event', 'sip_calculation_saved', {
        monthly_sip: monthlySip,
        rate,
        years,
      });
    }
  };

  const handleShare = () => {
    const message =
      `📈 SIP Calculation\n\n` +
      `Monthly SIP: ${formatINR(monthlySip)}\n` +
      `Expected Return: ${rate}% p.a.\n` +
      `Investment Period: ${years} years\n\n` +
      `💼 Total Invested: ${formatINR(results.totalInvested)}\n` +
      `📊 Maturity Amount: ${formatINR(results.maturityAmount)}\n` +
      `💰 Wealth Gain: ${formatINR(results.wealthGain)}\n\n` +
      `Calculate yours: https://fincado.com/sip-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag!('event', 'sip_calculation_shared', {
        method: 'whatsapp',
      });
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('sip_calculator_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating SIP history:', error);
    }

    toast.success('Calculation deleted!');
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('sip_calculator_history');
    } catch (error) {
      console.error('Error clearing SIP history:', error);
    }
    toast.success('All SIP calculations cleared!');
  };

  const handleLoad = (calc: SavedCalculation) => {
    setMonthlySip(calc.monthlySip);
    setRate(calc.rate);
    setYears(calc.years);
    toast.success('Calculation loaded!');
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator */}
      <Card className="border-none shadow-none bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* INPUTS */}
            <div className="space-y-6">
              <CalculatorField
                label="Monthly SIP Amount (₹)"
                value={monthlySip}
                min={500}
                max={500000}
                step={500}
                onChange={setMonthlySip}
              />

              <CalculatorField
                label="Investment Period (Years)"
                value={years}
                min={1}
                max={40}
                step={1}
                onChange={setYears}
              />

              <CalculatorField
                label="Expected Annual Return (%)"
                value={rate}
                min={4}
                max={20}
                step={0.5}
                onChange={setRate}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  Optional: Future SIP Increase (% per year)
                  <Percent className="h-3 w-3 text-slate-400" />
                </label>
                <Slider
                  value={[stepUpPercent]}
                  min={0}
                  max={20}
                  step={1}
                  onValueChange={([v]) => setStepUpPercent(v)}
                  className="py-3"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0% (No increase)</span>
                  <span>{stepUpPercent}% per year (for planning only)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  This slider is for planning; current calculator assumes a
                  constant monthly SIP. Step-up SIP calculator will be added
                  soon.
                </p>
              </div>
            </div>

            {/* OUTPUT / VISUALS */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={results.principalPct}
                interestPct={results.gainPct}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-muted-foreground">
                  Estimated Maturity Amount
                </div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-indigo-700">
                  {formatINR(results.maturityAmount)}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        Total Amount Invested
                      </div>
                      <div className="mt-1 font-semibold text-foreground whitespace-nowrap">
                        {formatINR(results.totalInvested)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-900/15 dark:border-emerald-900">
                    <CardContent className="p-4">
                      <div className="text-xs text-emerald-700 dark:text-emerald-400">
                        Wealth Gain (Profit)
                      </div>
                      <div className="mt-1 font-semibold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                        +{formatINR(results.wealthGain)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-3 text-xs text-slate-500">
                  Assumes constant annual return converted to equivalent monthly
                  rate. Actual mutual fund returns will vary.
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
          Save Calculation
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share via WhatsApp
        </Button>

        <Button
          onClick={() =>
            toast.info(
              'Step-up SIP feature is in planning. For now, use the slider for rough planning only.',
            )
          }
          variant="outline"
          size="sm"
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Step-up SIP (Coming Soon)
        </Button>
      </div>

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Saved SIP Plans</CardTitle>
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
                          {formatINR(calc.monthlySip)} / month @ {calc.rate}%
                          for {calc.years} years
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Invested: {formatINR(calc.totalInvested)} | Maturity:{' '}
                          {formatINR(calc.maturityAmount)}
                        </div>
                        <div className="text-[11px] text-emerald-700 mt-0.5">
                          Gain: {formatINR(calc.wealthGain)}
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
