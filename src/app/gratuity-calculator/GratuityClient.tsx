'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

/* ---------- HELPERS ---------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

interface GratuityLabels {
  basicSalary: string;
  yearsOfService: string;
  coveredFlag: string;
  resetDefaults: string;
  totalGratuity: string;
  exemptGratuity: string;
  taxableGratuity: string;
}

const DEFAULT_LABELS: GratuityLabels = {
  basicSalary: 'Monthly Basic Salary + DA (₹)',
  yearsOfService: 'Years of Service',
  coveredFlag: 'Covered under Gratuity Act?',
  resetDefaults: 'Reset Defaults',
  totalGratuity: 'Total Gratuity Payable',
  exemptGratuity: 'Tax Exempt',
  taxableGratuity: 'Taxable Amount',
};

export default function GratuityClient({
  labels = {},
}: {
  labels?: Partial<GratuityLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  /* ---------- STATE ---------- */
  const [basicSalary, setBasicSalary] = useState(50000);
  const [years, setYears] = useState(5);
  const [coveredStatus, setCoveredStatus] = useState<'yes' | 'no'>('yes');

  /* ---------- CALCULATIONS ---------- */
  const result = useMemo(() => {
    let gratuity = 0;
    const isCovered = coveredStatus === 'yes';

    if (years >= 5) {
      if (isCovered) {
        // Formula: (Basic * 15 * Years) / 26
        gratuity = Math.round((basicSalary * 15 * years) / 26);
      } else {
        // Formula: (Basic * 15 * Years) / 30
        gratuity = Math.round((basicSalary * 15 * years) / 30);
      }
    }

    const MAX_EXEMPT = 2000000; // ₹20 Lakh Limit
    const exempt = Math.min(gratuity, MAX_EXEMPT);
    const taxable = Math.max(0, gratuity - MAX_EXEMPT);

    // Percentages for chart (Avoid divide by zero)
    const total = gratuity > 0 ? gratuity : 1;
    const exemptPct = Math.round((exempt / total) * 100);
    const taxablePct = 100 - exemptPct;

    return {
      gratuity,
      exempt,
      taxable,
      exemptPct,
      taxablePct,
      formula: isCovered
        ? '(Basic + DA) × 15/26 × Years'
        : '(Basic + DA) × 15/30 × Years',
    };
  }, [basicSalary, years, coveredStatus]);

  const handleReset = () => {
    setBasicSalary(50000);
    setYears(5);
    setCoveredStatus('yes');
  };

  return (
    <Card className="border-slate-200 shadow-sm bg-white">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ---------- INPUTS SECTION ---------- */}
          <div className="space-y-8">
            <CalculatorField
              label={t.basicSalary}
              value={basicSalary}
              min={10000}
              max={500000}
              step={1000}
              onChange={setBasicSalary}
            />

            <div className="space-y-2">
              <CalculatorField
                label={t.yearsOfService}
                value={years}
                min={1}
                max={50}
                step={1}
                onChange={setYears}
              />
              {years < 5 && (
                <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block font-medium">
                  ⚠️ Minimum 5 years required
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">
                {t.coveredFlag}
              </Label>
              <RadioGroup
                defaultValue="yes"
                value={coveredStatus}
                onValueChange={(val) => setCoveredStatus(val as 'yes' | 'no')}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="font-normal text-slate-600">
                    Yes (Covered)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="font-normal text-slate-600">
                    No (Not Covered)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-0 h-auto font-normal flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.resetDefaults}
            </Button>
          </div>

          {/* ---------- VISUALS SECTION ---------- */}
          <div className="flex flex-col items-center justify-center">
            {/* Custom Pie Chart */}
            <GratuityPieChart
              exemptPct={result.exemptPct}
              taxablePct={result.taxablePct}
            />

            <div className="mt-8 text-center w-full">
              <div className="text-sm font-medium text-slate-500 mb-1">
                {t.totalGratuity}
              </div>
              {/* BRAND COLOR: Lime-600 to match EMI/SIP */}
              <div className="text-4xl font-extrabold text-lime-600 tracking-tight">
                {formatINR(result.gratuity)}
              </div>
              <div className="mt-2 text-xs font-mono text-slate-400 bg-slate-50 inline-block px-2 py-1 rounded">
                Formula: {result.formula}
              </div>

              {/* Breakdown Cards - Matched to SIP Style */}
              <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                {/* Exempt - Highlighted (Green) */}
                <Card className="bg-lime-50 border-lime-200 shadow-none">
                  <CardContent className="text-center">
                    <div className="text-xs text-lime-700 font-medium mb-1">
                      {t.exemptGratuity}
                    </div>
                    <div className="font-bold text-lime-800 text-lg">
                      {formatINR(result.exempt)}
                    </div>
                  </CardContent>
                </Card>

                {/* Taxable - Neutral (Slate) */}
                <Card className="bg-white border-slate-200 shadow-none">
                  <CardContent className="text-center">
                    <div className="text-xs text-slate-500 font-medium mb-1">
                      {t.taxableGratuity}
                    </div>
                    <div className="font-bold text-slate-700 text-lg">
                      {formatINR(result.taxable)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------
   PRIVATE COMPONENT: Custom Pie Chart for Gratuity
   (Fixed: Hides 0% segments to prevent artifacts)
   (Colors: Matches EMI Calculator - #9ae600 & #ecfccb)
   -------------------------------------------------
*/
function GratuityPieChart({
  exemptPct,
  taxablePct,
}: {
  exemptPct: number;
  taxablePct: number;
}) {
  const size = 220;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Length calculations
  const exemptLength = (exemptPct / 100) * circumference;
  const taxableLength = (taxablePct / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-label="Gratuity Breakdown"
      >
        {/* Base Ring (Background) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9" // slate-100
          strokeWidth={strokeWidth}
        />

        {/* Segment 1: Exempt (Brand Lime Green) - Only render if > 0 */}
        {exemptPct > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#9ae600" // BRAND COLOR from EMIPieChart
            strokeWidth={strokeWidth}
            strokeDasharray={`${exemptLength} ${circumference}`}
            strokeLinecap="round"
          />
        )}

        {/* Segment 2: Taxable (Light Lime / Pale) - Only render if > 0 */}
        {taxablePct > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#ecfccb" // lime-100 (Secondary)
            strokeWidth={strokeWidth}
            strokeDasharray={`${taxableLength} ${circumference}`}
            strokeDashoffset={-exemptLength} // Start where green ends
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Center Text (Dynamic Labels) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
          {exemptPct}%
        </div>
        <div className="mt-1 text-xs sm:text-sm font-medium text-lime-600">
          Tax Exempt
        </div>
      </div>
    </div>
  );
}
