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

/* ---------- TYPES ---------- */
interface SIPLabels {
  enableStepUp: string;
  stepUpBoost: string;
  monthlySIP: string;
  investmentPeriod: string;
  expectedReturn: string;
  annualSIPIncrease: string;
  noIncrease: string;
  perYear: string;
  stepUpNote: string;
  starting: string;
  ending: string;
  standardSIP: string;
  stepUpSIP: string;
  maturityAmount: string;
  totalInvested: string;
  wealthGain: string;
  returnsDisclaimer: string;
  stepUpBenefits: string;
  advantageOverStandard: string;
  extraWealthGained: string;
  extraInvestment: string;
  netBenefit: string;
  netBenefitText: string;
  compared: string;
  smartTip: string;
  smartTipText: string;
  saveCalculation: string;
  shareWhatsApp: string;
  showStepUp: string;
  hideStepUp: string;
  savedSIPPlans: string;
  clearAll: string;
  month: string;
  forYears: string;
  stepUp: string;
  invested: string;
  maturity: string;
  gain: string;
}

const DEFAULT_LABELS: SIPLabels = {
  enableStepUp: 'Enable Step-up SIP (Increase investment annually)',
  stepUpBoost: 'Boost your corpus with yearly increases',
  monthlySIP: 'Monthly SIP Amount (₹)',
  investmentPeriod: 'Investment Period (Years)',
  expectedReturn: 'Expected Annual Return (%)',
  annualSIPIncrease: 'Annual SIP Increase (Step-up %)',
  noIncrease: '0% (No increase)',
  perYear: '% per year',
  stepUpNote: 'Your SIP will increase by',
  starting: 'Starting',
  ending: 'ending',
  standardSIP: 'Standard SIP',
  stepUpSIP: 'Step-up SIP',
  maturityAmount: 'Maturity Amount',
  totalInvested: 'Total Amount Invested',
  wealthGain: 'Wealth Gain (Profit)',
  returnsDisclaimer:
    'Assumes constant annual return converted to equivalent monthly rate. Actual mutual fund returns will vary.',
  stepUpBenefits: 'Step-up SIP Benefits',
  advantageOverStandard: 'Advantage Over Standard SIP',
  extraWealthGained: 'Extra Wealth Gained',
  extraInvestment: 'Extra Investment Made',
  netBenefit: 'Net Benefit:',
  netBenefitText: 'By investing an extra',
  compared: 'compared to a standard SIP!',
  smartTip: 'Smart Tip',
  smartTipText:
    'Step-up SIP is perfect when you expect income growth (salary hikes, business growth). A',
  saveCalculation: 'Save Calculation',
  shareWhatsApp: 'Share via WhatsApp',
  showStepUp: 'Show Step-up SIP',
  hideStepUp: 'Hide Step-up SIP',
  savedSIPPlans: 'Your Saved SIP Plans',
  clearAll: 'Clear All',
  month: '/ month',
  forYears: 'for',
  stepUp: 'step-up',
  invested: 'Invested:',
  maturity: 'Maturity:',
  gain: 'Gain:',
};

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

export default function SIPClient({
  labels = DEFAULT_LABELS,
}: {
  labels?: Partial<SIPLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  const [monthlySip, setMonthlySip] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [stepUpPercent, setStepUpPercent] = useState(0);
  const [showStepUp, setShowStepUp] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState<
    SavedCalculation[]
  >([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    try {
      const saved = localStorage.getItem('sip_calculator_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved SIP calculations:', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'SIP',
        page_path: window.location.pathname,
      });
    }
  }, []);

  const standardResults = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;

    let maturityAmount = 0;

    if (monthlyRate === 0) {
      maturityAmount = monthlySip * months;
    } else {
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

  const stepUpResults = useMemo(() => {
    if (!showStepUp || stepUpPercent === 0) return null;

    const monthlyRate = rate / 12 / 100;
    const annualStepUp = stepUpPercent / 100;

    let currentSip = monthlySip;
    let totalInvested = 0;
    let maturityAmount = 0;

    for (let year = 0; year < years; year++) {
      for (let month = 0; month < 12; month++) {
        totalInvested += currentSip;

        const remainingMonths = (years - year) * 12 - month;
        const futureValue =
          currentSip * Math.pow(1 + monthlyRate, remainingMonths);
        maturityAmount += futureValue;
      }

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
      {/* Step-up SIP Toggle */}
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
                {t.enableStepUp}
              </label>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">
              {t.stepUpBoost}
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
                label={t.monthlySIP}
                value={monthlySip}
                min={500}
                max={500000}
                step={500}
                onChange={setMonthlySip}
              />

              <CalculatorField
                label={t.investmentPeriod}
                value={years}
                min={1}
                max={40}
                step={1}
                onChange={setYears}
              />

              <CalculatorField
                label={t.expectedReturn}
                value={rate}
                min={4}
                max={20}
                step={0.5}
                onChange={setRate}
              />

              {/* Step-up SIP Control */}
              {showStepUp && (
                <div className="space-y-2 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <label className="text-sm font-medium flex items-center gap-2 text-purple-900">
                    <TrendingUp className="h-4 w-4" />
                    {t.annualSIPIncrease}
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
                    <span>{t.noIncrease}</span>
                    <span className="font-semibold">
                      {stepUpPercent}
                      {t.perYear}
                    </span>
                  </div>
                  <p className="text-xs text-purple-600 mt-2">
                    💡 {t.stepUpNote} {stepUpPercent}% every year.
                    {stepUpPercent > 0 &&
                      ` ${t.starting} ₹${monthlySip.toLocaleString('en-IN')}, 
                    ${t.ending} ₹${Math.round(monthlySip * Math.pow(1 + stepUpPercent / 100, years - 1)).toLocaleString('en-IN')}`}
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
                    ? t.stepUpSIP
                    : t.standardSIP}{' '}
                  {t.maturityAmount}
                </div>

                <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-indigo-700">
                  {formatINR(results.maturityAmount)}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mx-auto text-left">
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        {t.totalInvested}
                      </div>
                      <div className="mt-1 font-semibold text-foreground whitespace-nowrap">
                        {formatINR(results.totalInvested)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-900/15 dark:border-emerald-900">
                    <CardContent className="p-4">
                      <div className="text-xs text-emerald-700 dark:text-emerald-400">
                        {t.wealthGain}
                      </div>
                      <div className="mt-1 font-semibold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                        +{formatINR(results.wealthGain)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-3 text-xs text-slate-500">
                  {t.returnsDisclaimer}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-up Benefits Card */}
      {showStepUp && stepUpPercent > 0 && stepUpResults && (
        <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Zap className="h-5 w-5 text-purple-600" />
              {t.stepUpBenefits}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-5 bg-linear-to-br from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {t.advantageOverStandard}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    {t.extraWealthGained}
                  </div>
                  <div className="text-3xl font-bold text-emerald-700">
                    {formatINR(stepUpResults.extraGain)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    {t.extraInvestment}
                  </div>
                  <div className="text-3xl font-bold text-blue-700">
                    {formatINR(stepUpResults.extraInvestment)}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white rounded border border-emerald-200">
                <p className="text-sm text-slate-700">
                  <strong>{t.netBenefit}</strong> {t.netBenefitText}{' '}
                  {formatINR(stepUpResults.extraInvestment)} over {years} years,
                  you gain an additional {formatINR(stepUpResults.extraGain)}{' '}
                  {t.compared}
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                <span>💡</span>
                {t.smartTip}
              </h4>
              <p className="text-sm text-slate-700">
                {t.smartTipText} {stepUpPercent}% annual increase aligns with
                typical career progression and helps you build wealth faster
                without feeling the pinch!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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

        <Button
          onClick={() => setShowStepUp(!showStepUp)}
          variant={showStepUp ? 'default' : 'outline'}
          size="sm"
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          {showStepUp ? t.hideStepUp : t.showStepUp}
        </Button>
      </div>

      {/* Saved Calculations */}
      {isClient && savedCalculations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">{t.savedSIPPlans}</CardTitle>
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
                          {formatINR(calc.monthlySip)} {t.month} @ {calc.rate}%{' '}
                          {t.forYears} {calc.years} years
                          {calc.stepUpPercent && (
                            <span className="ml-2 text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded">
                              +{calc.stepUpPercent}% {t.stepUp}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {t.invested} {formatINR(calc.totalInvested)} |{' '}
                          {t.maturity} {formatINR(calc.maturityAmount)}
                        </div>
                        <div className="text-[11px] text-emerald-700 mt-0.5">
                          {t.gain} {formatINR(calc.wealthGain)}
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
