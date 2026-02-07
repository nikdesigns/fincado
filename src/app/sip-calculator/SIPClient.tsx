'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import EMIPieChart from '@/components/EMIPieChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  BookmarkIcon,
  Share2Icon,
  TrendingUp,
  Trash2,
  Percent,
  Zap,
  IndianRupee,
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
  stepUpPercent?: number;
}

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(isNaN(val) ? 0 : val);

export default function SIPClient() {
  const [monthlySip, setMonthlySip] = useState(10000); // ₹10k
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12); // 12% p.a.
  const [stepUpPercent, setStepUpPercent] = useState(0);
  const [showStepUp, setShowStepUp] = useState(false);

  // ✅ FIX: Initialize isClient based on window check
  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  // ✅ FIX: Load data in useEffect without setting state directly
  useEffect(() => {
    // Mark as client-side
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    // Load saved calculations
    try {
      const saved = localStorage.getItem('sip_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved SIP calculations:', error);
    }
  }, []); // Run once on mount

  // Track calculator load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'SIP',
        page_path: window.location.pathname,
      });
    }
  }, []);

  // ✅ Standard SIP Calculations (no step-up)
  const standardResults = useMemo(() => {
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

  // ✅ Step-up SIP Calculations
  const stepUpResults = useMemo(() => {
    if (!showStepUp || stepUpPercent === 0) return null;

    const monthlyRate = rate / 12 / 100;
    const annualStepUp = stepUpPercent / 100;

    let currentSip = monthlySip;
    let totalInvested = 0;
    let maturityAmount = 0;

    // Calculate year by year with step-up
    for (let year = 0; year < years; year++) {
      // Calculate for 12 months at current SIP amount
      for (let month = 0; month < 12; month++) {
        totalInvested += currentSip;

        // Calculate how many months this investment will compound
        const remainingMonths = (years - year) * 12 - month;
        const futureValue =
          currentSip * Math.pow(1 + monthlyRate, remainingMonths);
        maturityAmount += futureValue;
      }

      // Increase SIP for next year (except last year)
      if (year < years - 1) {
        currentSip = currentSip * (1 + annualStepUp);
      }
    }

    if (!isFinite(maturityAmount)) maturityAmount = 0;

    const wealthGain = maturityAmount - totalInvested;
    const principalPct =
      maturityAmount > 0
        ? Math.round((totalInvested / maturityAmount) * 100)
        : 0;
    const gainPct = 100 - principalPct;

    // Calculate benefit over standard SIP
    const extraGain = maturityAmount - standardResults.maturityAmount;
    const extraInvestment = totalInvested - standardResults.totalInvested;

    return {
      totalInvested: Math.round(totalInvested),
      maturityAmount: Math.round(maturityAmount),
      wealthGain: Math.round(wealthGain),
      principalPct,
      gainPct,
      extraGain: Math.round(extraGain),
      extraInvestment: Math.round(extraInvestment),
    };
  }, [monthlySip, years, rate, stepUpPercent, showStepUp, standardResults]);

  // Use the appropriate results based on step-up mode
  const results =
    showStepUp && stepUpPercent > 0 ? stepUpResults! : standardResults;

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
      stepUpPercent: showStepUp ? stepUpPercent : undefined,
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
      window.gtag('event', 'sip_calculation_saved', {
        monthly_sip: monthlySip,
        rate,
        years,
        step_up: showStepUp ? stepUpPercent : 0,
      });
    }
  };

  const handleShare = () => {
    const stepUpText =
      showStepUp && stepUpPercent > 0
        ? `\nStep-up: ${stepUpPercent}% annually\n`
        : '\n';

    const message =
      `📈 SIP Calculation\n\n` +
      `Monthly SIP: ${formatINR(monthlySip)}${stepUpText}` +
      `Expected Return: ${rate}% p.a.\n` +
      `Investment Period: ${years} years\n\n` +
      `💼 Total Invested: ${formatINR(results.totalInvested)}\n` +
      `📊 Maturity Amount: ${formatINR(results.maturityAmount)}\n` +
      `💰 Wealth Gain: ${formatINR(results.wealthGain)}\n\n` +
      `Calculate yours: https://fincado.com/sip-calculator/`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sip_calculation_shared', {
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

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sip_calculation_deleted', {
        calculations_remaining: updated.length,
      });
    }
  };

  const handleClearAll = () => {
    setSavedCalculations([]);
    try {
      localStorage.removeItem('sip_calculator_history');
    } catch (error) {
      console.error('Error clearing SIP history:', error);
    }
    toast.success('All SIP calculations cleared!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sip_history_cleared', {
        calculations_cleared: savedCalculations.length,
      });
    }
  };

  const handleLoad = (calc: SavedCalculation) => {
    setMonthlySip(calc.monthlySip);
    setRate(calc.rate);
    setYears(calc.years);
    if (calc.stepUpPercent) {
      setStepUpPercent(calc.stepUpPercent);
      setShowStepUp(true);
    } else {
      setStepUpPercent(0);
      setShowStepUp(false);
    }
    toast.success('Calculation loaded!');
  };

  return (
    <div className="space-y-6">
      {/* ✅ Step-up SIP Toggle */}
      <Card className="border-purple-200 bg-linear-to-r from-purple-50 to-pink-50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch
                checked={showStepUp}
                onCheckedChange={setShowStepUp}
                id="step-up-mode"
              />
              <label
                htmlFor="step-up-mode"
                className="text-sm font-semibold text-slate-900 cursor-pointer"
              >
                Enable Step-up SIP (Increase investment annually)
              </label>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">
              Boost your corpus with yearly increases
            </span>
          </div>
        </CardContent>
      </Card>

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

              {/* ✅ Step-up SIP Control - Only show when enabled */}
              {showStepUp && (
                <div className="space-y-2 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <label className="text-sm font-medium flex items-center gap-2 text-purple-900">
                    <TrendingUp className="h-4 w-4" />
                    Annual SIP Increase (Step-up %)
                  </label>
                  <Slider
                    value={[stepUpPercent]}
                    min={0}
                    max={20}
                    step={1}
                    onValueChange={([v]) => setStepUpPercent(v)}
                    className="py-3"
                  />
                  <div className="flex justify-between text-xs text-purple-700">
                    <span>0% (No increase)</span>
                    <span className="font-semibold">
                      {stepUpPercent}% per year
                    </span>
                  </div>
                  <p className="text-xs text-purple-600 mt-2">
                    💡 Your SIP will increase by {stepUpPercent}% every year.
                    {stepUpPercent > 0 &&
                      ` Starting ₹${monthlySip.toLocaleString('en-IN')}, 
                    ending ₹${Math.round(monthlySip * Math.pow(1 + stepUpPercent / 100, years - 1)).toLocaleString('en-IN')}`}
                  </p>
                </div>
              )}
            </div>

            {/* OUTPUT / VISUALS */}
            <div className="flex flex-col items-center justify-center">
              <EMIPieChart
                principalPct={results.principalPct}
                interestPct={results.gainPct}
              />

              <div className="mt-6 text-center w-full">
                <div className="text-sm text-muted-foreground">
                  {showStepUp && stepUpPercent > 0
                    ? 'Step-up SIP'
                    : 'Standard SIP'}{' '}
                  Maturity Amount
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

      {/* ✅ Step-up Benefits Card */}
      {showStepUp && stepUpPercent > 0 && stepUpResults && (
        <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Zap className="h-5 w-5 text-purple-600" />
              Step-up SIP Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-5 bg-linear-to-br from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Advantage Over Standard SIP
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    Extra Wealth Gained
                  </div>
                  <div className="text-3xl font-bold text-emerald-700">
                    {formatINR(stepUpResults.extraGain)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    Extra Investment Made
                  </div>
                  <div className="text-3xl font-bold text-blue-700">
                    {formatINR(stepUpResults.extraInvestment)}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white rounded border border-emerald-200">
                <p className="text-sm text-slate-700">
                  <strong>Net Benefit:</strong> By investing an extra{' '}
                  {formatINR(stepUpResults.extraInvestment)}
                  over {years} years, you gain an additional{' '}
                  {formatINR(stepUpResults.extraGain)} compared to a standard
                  SIP!
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                <span>💡</span>
                Smart Tip
              </h4>
              <p className="text-sm text-slate-700">
                Step-up SIP is perfect when you expect income growth (salary
                hikes, business growth). A {stepUpPercent}% annual increase
                aligns with typical career progression and helps you build
                wealth faster without feeling the pinch!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
          onClick={() => setShowStepUp(!showStepUp)}
          variant={showStepUp ? 'default' : 'outline'}
          size="sm"
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          {showStepUp ? 'Hide' : 'Show'} Step-up SIP
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
                          {calc.stepUpPercent && (
                            <span className="ml-2 text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded">
                              +{calc.stepUpPercent}% step-up
                            </span>
                          )}
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
