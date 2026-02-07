'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

import {
  RefreshCcw,
  TrendingUp,
  TrendingDown,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------------- HELPERS ---------------- */

/* ---------------- TYPES ---------------- */
interface CreditScoreLabels {
  onTimePayments: string;
  creditUtilization: string;
  avgAge: string;
  activeAccounts: string;
  recentEnquiries: string;
  loanMix: string;
  hasDefaults: string;
  hasSettlements: string;
  estimatedScore: string;
  improveSimulator: string;
  totalCardLimit: string;
  payDownAmount: string;
  newUtil: string;
  improved: string;
  noChange: string;
  disclaimer: string;
}

const DEFAULT_LABELS: CreditScoreLabels = {
  onTimePayments: 'On-Time Payments (%)',
  creditUtilization: 'Credit Utilization (%)',
  avgAge: 'Average Account Age (Years)',
  activeAccounts: 'Active Credit Accounts',
  recentEnquiries: 'Recent Enquiries (Last 6 Months)',
  loanMix: 'Installment Loan Mix (%)',
  hasDefaults: 'Any Defaults?',
  hasSettlements: 'Any Settlements?',
  estimatedScore: 'Estimated Credit Score',
  improveSimulator: 'Improve Score Simulator',
  totalCardLimit: 'Total Card Limit (₹)',
  payDownAmount: 'Pay Down Amount (₹)',
  newUtil: 'New Utilization',
  improved: 'Improved',
  noChange: 'No Change',
  disclaimer:
    '*This is an estimated score for educational purposes. Actual CIBIL / Experian scores may vary.',
};

interface SavedScore {
  id: number;
  score: number;
  onTimePayments: number;
  utilization: number;
  date: string;
}

/* ---------------- COMPONENT ---------------- */
export default function CreditScoreClient({
  labels = {},
}: {
  labels?: Partial<CreditScoreLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------------- STATE ---------------- */
  const [onTimePayments, setOnTimePayments] = useState(95);
  const [utilization, setUtilization] = useState(45);
  const [avgAge, setAvgAge] = useState(5);
  const [accounts, setAccounts] = useState(3);
  const [enquiries, setEnquiries] = useState(2);
  const [loanMix, setLoanMix] = useState(50);

  const [hasDefaults, setHasDefaults] = useState(false);
  const [hasSettlements, setHasSettlements] = useState(false);

  const [totalLimit, setTotalLimit] = useState(200000);
  const [payDown, setPayDown] = useState(0);

  /* ---------- SAVED SCORES STATE ---------- */
  const [savedScores, setSavedScores] = useState<SavedScore[]>([]);
  const [isClient, setIsClient] = useState(false);

  /* ---------- LOAD SAVED SCORES ---------- */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    try {
      const saved = localStorage.getItem('credit_score_history');
      if (saved) {
        setSavedScores(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved scores:', error);
    }
  }, []);

  /* ---------- TRACK CALCULATOR LOAD ---------- */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'Credit_Score',
        page_path: window.location.pathname,
      });
    }
  }, []);

  /* ---------------- SCORE CALCULATION ---------------- */
  const score = useMemo(() => {
    let s = 300;

    // Payment History (35%)
    s += Math.round((onTimePayments / 100) * 210);

    // Utilization (30%)
    if (utilization <= 20) s += 180;
    else s += Math.max(0, Math.round(180 * (1 - (utilization - 20) / 80)));

    // Credit Age (15%)
    s += Math.min(90, Math.round((avgAge / 10) * 90));

    // Enquiries (Penalty)
    s -= Math.min(60, enquiries * 6);

    // Credit Mix (10%)
    s += Math.round((loanMix / 100) * 60);

    // Account count bonus
    if (accounts >= 1 && accounts <= 5) s += 20;

    // Severe negatives
    if (hasDefaults) s -= 150;
    if (hasSettlements) s -= 80;

    return Math.max(300, Math.min(900, s));
  }, [
    onTimePayments,
    utilization,
    avgAge,
    enquiries,
    loanMix,
    accounts,
    hasDefaults,
    hasSettlements,
  ]);

  const scoreLabel =
    score >= 750
      ? 'Excellent'
      : score >= 700
        ? 'Good'
        : score >= 650
          ? 'Fair'
          : score >= 600
            ? 'Average'
            : 'Poor';

  const scoreColor =
    score >= 750
      ? 'text-emerald-600'
      : score >= 700
        ? 'text-lime-600'
        : score >= 650
          ? 'text-yellow-600'
          : score >= 600
            ? 'text-orange-600'
            : 'text-red-600';

  const scoreBgColor =
    score >= 750
      ? 'bg-emerald-50 border-emerald-200'
      : score >= 700
        ? 'bg-lime-50 border-lime-200'
        : score >= 650
          ? 'bg-yellow-50 border-yellow-200'
          : score >= 600
            ? 'bg-orange-50 border-orange-200'
            : 'bg-red-50 border-red-200';

  /* ---------------- PAYDOWN SIMULATOR ---------------- */
  const newUtil = useMemo(() => {
    const balance = (utilization / 100) * totalLimit;
    const newBal = Math.max(0, balance - payDown);
    return totalLimit > 0 ? Math.round((newBal / totalLimit) * 100) : 0;
  }, [utilization, totalLimit, payDown]);

  const utilImproved = newUtil < utilization;

  /* ---------- IMPACT ANALYSIS ---------- */
  const getScoreImpact = () => {
    const impacts = [];

    if (utilization > 30) {
      impacts.push({
        factor: 'High Credit Utilization',
        impact: `Using ${utilization}% of credit limit`,
        suggestion: 'Reduce to below 30% for immediate boost',
        severity: 'high',
      });
    }

    if (onTimePayments < 100) {
      impacts.push({
        factor: 'Missed Payments',
        impact: `${100 - onTimePayments}% payment delays`,
        suggestion: 'Set up auto-pay to never miss EMI',
        severity: 'high',
      });
    }

    if (enquiries > 3) {
      impacts.push({
        factor: 'Too Many Enquiries',
        impact: `${enquiries} hard inquiries in 6 months`,
        suggestion: 'Avoid new applications for 6 months',
        severity: 'medium',
      });
    }

    if (avgAge < 3) {
      impacts.push({
        factor: 'Short Credit History',
        impact: `Average age only ${avgAge} years`,
        suggestion: 'Keep oldest accounts active',
        severity: 'low',
      });
    }

    if (hasDefaults) {
      impacts.push({
        factor: 'Account Defaults',
        impact: 'Default mark on credit report',
        suggestion: 'Clear dues immediately, raise dispute if incorrect',
        severity: 'critical',
      });
    }

    if (hasSettlements) {
      impacts.push({
        factor: 'Settled Accounts',
        impact: 'Settlement status (not closed)',
        suggestion: 'Pay remaining amount for "closed" status',
        severity: 'high',
      });
    }

    return impacts;
  };

  const impacts = getScoreImpact();

  const reset = () => {
    setOnTimePayments(95);
    setUtilization(45);
    setAvgAge(5);
    setAccounts(3);
    setEnquiries(2);
    setLoanMix(50);
    setHasDefaults(false);
    setHasSettlements(false);
    setTotalLimit(200000);
    setPayDown(0);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'credit_score_reset', {
        calculator_type: 'Credit_Score',
      });
    }
  };

  /* ---------- SAVE SCORE ---------- */
  const handleSaveScore = () => {
    const savedScore: SavedScore = {
      id: Date.now(),
      score,
      onTimePayments,
      utilization,
      date: new Date().toISOString(),
    };

    const saved = [...savedScores];
    saved.unshift(savedScore);
    const trimmed = saved.slice(0, 10);

    setSavedScores(trimmed);

    try {
      localStorage.setItem('credit_score_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('Credit score saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'credit_score_saved', {
        score: score,
      });
    }
  };

  /* ---------- DELETE SCORE ---------- */
  const handleDeleteScore = (id: number) => {
    const updated = savedScores.filter((s) => s.id !== id);
    setSavedScores(updated);

    try {
      localStorage.setItem('credit_score_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Score deleted!');
  };

  /* ---------- CLEAR ALL ---------- */
  const handleClearAll = () => {
    setSavedScores([]);

    try {
      localStorage.removeItem('credit_score_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All scores cleared!');
  };

  /* ---------- SHARE ---------- */
  const handleShare = () => {
    const message =
      `📊 My Credit Score Estimate: ${score} (${scoreLabel})\\n\\n` +
      `Factors:\\n` +
      `• On-Time Payments: ${onTimePayments}%\\n` +
      `• Credit Utilization: ${utilization}%\\n` +
      `• Account Age: ${avgAge} years\\n` +
      `• Recent Enquiries: ${enquiries}\\n\\n` +
      `Check yours: https://fincado.com/credit-score/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'credit_score_shared', {
        method: 'whatsapp',
        score: score,
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
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Credit Score Estimator
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* --- LEFT: INPUTS --- */}
            <div className="space-y-6">
              {/* Payment History */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">
                    {t.onTimePayments}
                  </Label>
                  <Badge
                    variant="outline"
                    className={`${onTimePayments >= 95 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                  >
                    {onTimePayments}%
                  </Badge>
                </div>
                <Slider
                  value={[onTimePayments]}
                  onValueChange={(v) => setOnTimePayments(v[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-slate-500">
                  Most critical factor (35% of score)
                </p>
              </div>

              {/* Credit Utilization */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">
                    {t.creditUtilization}
                  </Label>
                  <Badge
                    variant="outline"
                    className={`${utilization <= 30 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}
                  >
                    {utilization}%
                  </Badge>
                </div>
                <Slider
                  value={[utilization]}
                  onValueChange={(v) => setUtilization(v[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-slate-500">
                  Keep below 30% for best score (30% weight)
                </p>
              </div>

              {/* Average Account Age */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">{t.avgAge}</Label>
                  <Badge variant="outline" className="bg-slate-50">
                    {avgAge} years
                  </Badge>
                </div>
                <Slider
                  value={[avgAge]}
                  onValueChange={(v) => setAvgAge(v[0])}
                  min={0}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-slate-500">
                  Older accounts boost score (15% weight)
                </p>
              </div>

              {/* Active Accounts */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">
                    {t.activeAccounts}
                  </Label>
                  <Badge variant="outline" className="bg-slate-50">
                    {accounts}
                  </Badge>
                </div>
                <Slider
                  value={[accounts]}
                  onValueChange={(v) => setAccounts(v[0])}
                  min={0}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Recent Enquiries */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">
                    {t.recentEnquiries}
                  </Label>
                  <Badge
                    variant="outline"
                    className={`${enquiries <= 2 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                  >
                    {enquiries}
                  </Badge>
                </div>
                <Slider
                  value={[enquiries]}
                  onValueChange={(v) => setEnquiries(v[0])}
                  min={0}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-slate-500">
                  Each hard inquiry: -5 to -10 points
                </p>
              </div>

              {/* Loan Mix */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">{t.loanMix}</Label>
                  <Badge variant="outline" className="bg-slate-50">
                    {loanMix}%
                  </Badge>
                </div>
                <Slider
                  value={[loanMix]}
                  onValueChange={(v) => setLoanMix(v[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-slate-500">
                  Mix of secured & unsecured credit (10% weight)
                </p>
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasDefaults}
                    onChange={(e) => setHasDefaults(e.target.checked)}
                    className="w-4 h-4"
                  />
                  {t.hasDefaults}
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSettlements}
                    onChange={(e) => setHasSettlements(e.target.checked)}
                    className="w-4 h-4"
                  />
                  {t.hasSettlements}
                </label>
              </div>
            </div>

            {/* --- RIGHT: RESULTS --- */}
            <div className="flex flex-col h-full space-y-6">
              {/* Score Display */}
              <Card className={`p-6 text-center border-2 ${scoreBgColor}`}>
                <div className="text-sm text-slate-600 mb-2 font-medium">
                  {t.estimatedScore}
                </div>

                {/* Visual Gauge */}
                <div className="relative h-40 flex items-center justify-center mb-2">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 200 120"
                    style={{ overflow: 'visible' }}
                  >
                    {/* Background Arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />

                    {/* Score Arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke={
                        score >= 750
                          ? '#10b981'
                          : score >= 700
                            ? '#84cc16'
                            : score >= 650
                              ? '#eab308'
                              : score >= 600
                                ? '#f97316'
                                : '#ef4444'
                      }
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * (score - 300)) / 600}
                      style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />

                    {/* Center Text - MOVED DOWN */}
                    <text
                      x="100"
                      y="90"
                      textAnchor="middle"
                      className={`text-4xl font-extrabold ${scoreColor}`}
                      fill="currentColor"
                    >
                      {score}
                    </text>
                  </svg>
                </div>

                <div className="mt-1 flex justify-center">
                  <Badge
                    className={
                      score >= 750
                        ? 'bg-emerald-100 text-emerald-800'
                        : score >= 700
                          ? 'bg-lime-100 text-lime-800'
                          : score >= 650
                            ? 'bg-yellow-100 text-yellow-800'
                            : score >= 600
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                    }
                  >
                    {scoreLabel}
                  </Badge>
                </div>
              </Card>

              {/* Impact Analysis */}
              {impacts.length > 0 && (
                <Card className="p-4 bg-slate-50">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-semibold text-slate-900">
                      Factors Impacting Your Score
                    </span>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {impacts.map((impact, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-xs ${
                          impact.severity === 'critical'
                            ? 'bg-red-50 border-red-200'
                            : impact.severity === 'high'
                              ? 'bg-orange-50 border-orange-200'
                              : impact.severity === 'medium'
                                ? 'bg-yellow-50 border-yellow-200'
                                : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="font-semibold text-slate-900 mb-1">
                          {impact.factor}
                        </div>
                        <div className="text-slate-600 mb-1">
                          {impact.impact}
                        </div>
                        <div className="text-slate-700 font-medium">
                          💡 {impact.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <p className="text-xs text-slate-500 text-center">
                {t.disclaimer}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PAYDOWN SIMULATOR */}
      <Card className="border-slate-200 bg-linear-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            {t.improveSimulator}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>{t.totalCardLimit}</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                ₹
              </span>
              <Input
                type="number"
                min={0}
                value={totalLimit}
                onChange={(e) =>
                  setTotalLimit(Math.max(0, Number(e.target.value) || 0))
                }
                className="pl-8 h-11"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>{t.payDownAmount}</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                ₹
              </span>
              <Input
                type="number"
                min={0}
                max={totalLimit}
                value={payDown}
                onChange={(e) =>
                  setPayDown(
                    Math.min(
                      totalLimit,
                      Math.max(0, Number(e.target.value) || 0),
                    ),
                  )
                }
                className="pl-8 h-11"
              />
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-slate-200">
            <div>
              <div className="text-sm text-slate-600">
                {t.newUtil}:{' '}
                <strong className="text-slate-900">{newUtil}%</strong>
              </div>
              {utilImproved && (
                <div className="text-xs text-emerald-600 font-medium mt-1">
                  ✓ Reduced by {utilization - newUtil}% points
                </div>
              )}
            </div>
            <Badge
              className={
                utilImproved
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-700'
              }
            >
              {utilImproved ? t.improved : t.noChange}
            </Badge>
          </div>

          {utilImproved && (
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-800">
                  Paying down ₹{payDown.toLocaleString('en-IN')} can improve
                  your score by approximately{' '}
                  <strong>
                    {Math.round(((utilization - newUtil) / 100) * 180)} points
                  </strong>{' '}
                  over 1-2 months.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSaveScore} variant="outline" size="sm">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Save Score
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share via WhatsApp
        </Button>
      </div>

      {/* Progress Tracking */}
      {isClient && savedScores.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Your Credit Score Journey</CardTitle>
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
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {savedScores.map((saved, idx) => {
                const prevScore = savedScores[idx + 1]?.score;
                const diff = prevScore ? saved.score - prevScore : 0;

                return (
                  <div
                    key={saved.id}
                    className="group p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition relative"
                  >
                    <div className="flex items-center justify-between pr-8">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold ${
                              saved.score >= 750
                                ? 'text-emerald-600'
                                : saved.score >= 700
                                  ? 'text-lime-600'
                                  : saved.score >= 650
                                    ? 'text-yellow-600'
                                    : 'text-orange-600'
                            }`}
                          >
                            {saved.score}
                          </div>
                          <div className="text-xs text-slate-500">
                            {new Date(saved.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </div>
                        </div>

                        <div className="text-sm text-slate-600">
                          <div>
                            Payment: <strong>{saved.onTimePayments}%</strong>
                          </div>
                          <div>
                            Utilization: <strong>{saved.utilization}%</strong>
                          </div>
                        </div>
                      </div>

                      {diff !== 0 && (
                        <Badge
                          variant="outline"
                          className={
                            diff > 0
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }
                        >
                          {diff > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(diff)}
                        </Badge>
                      )}
                    </div>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteScore(saved.id);
                      }}
                      className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
