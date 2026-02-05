'use client';

import React, { useMemo, useState } from 'react';
import CalculatorField from '@/components/CalculatorField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RotateCcw, Briefcase } from 'lucide-react';

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
  coveredFlag: 'Is your employer covered under the Gratuity Act?',
  resetDefaults: 'Reset',
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

    // Default to 20L for private sector. Users can infer 25L from page text if Govt.
    const MAX_EXEMPT = 2000000;
    const exempt = Math.min(gratuity, MAX_EXEMPT);
    const taxable = Math.max(0, gratuity - MAX_EXEMPT);

    // Percentages for chart
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
    <Card className="border-border shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Briefcase className="h-5 w-5 text-emerald-600" />
            Gratuity Estimator
          </CardTitle>
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
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
                <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block font-medium border border-amber-100">
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
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-md px-4 py-2 bg-white w-full hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="cursor-pointer flex-1">
                    Yes (Covered)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md px-4 py-2 bg-white w-full hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="cursor-pointer flex-1">
                    No (Not Covered)
                  </Label>
                </div>
              </RadioGroup>
            </div>
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
              <div className="text-4xl font-extrabold text-lime-600 tracking-tight">
                {formatINR(result.gratuity)}
              </div>
              <div className="mt-2 text-xs font-mono text-slate-400 bg-slate-50 inline-block px-2 py-1 rounded">
                Formula: {result.formula}
              </div>

              {/* Breakdown Cards */}
              <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                {/* Exempt */}
                <Card className="bg-lime-50 border-lime-200 shadow-none">
                  <CardContent className="p-3 text-center">
                    <div className="text-xs text-lime-700 font-medium mb-1">
                      {t.exemptGratuity}
                    </div>
                    <div className="font-bold text-lime-800 text-lg">
                      {formatINR(result.exempt)}
                    </div>
                  </CardContent>
                </Card>

                {/* Taxable */}
                <Card className="bg-white border-slate-200 shadow-none">
                  <CardContent className="p-3 text-center">
                    <div className="text-xs text-slate-500 font-medium mb-1">
                      {t.taxableGratuity}
                    </div>
                    <div className="font-bold text-slate-700 text-lg">
                      {formatINR(result.taxable)}
                    </div>
                  </CardContent>
                </Card>
              </div>
              {result.gratuity > 2000000 && (
                <p className="mt-3 text-xs text-amber-600">
                  Note: Tax exemption is capped at ₹20 Lakhs.
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------
   PRIVATE COMPONENT: Custom Pie Chart for Gratuity
   (Same logic as EMIPieChart but inline for simplicity if needed)
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
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        {exemptPct > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#65a30d" // Lime-600
            strokeWidth={strokeWidth}
            strokeDasharray={`${exemptLength} ${circumference}`}
            strokeLinecap="round"
          />
        )}
        {taxablePct > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#ecfccb" // Lime-100
            strokeWidth={strokeWidth}
            strokeDasharray={`${taxableLength} ${circumference}`}
            strokeDashoffset={-exemptLength}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="text-2xl font-bold text-slate-900 leading-none">
          {exemptPct}%
        </div>
        <div className="mt-1 text-sm font-medium text-lime-600">Tax Free</div>
      </div>
    </div>
  );
}
