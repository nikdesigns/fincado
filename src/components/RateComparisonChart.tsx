'use client';

import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChart3, IndianRupee, ShieldAlert, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BankRate = { name: string; rate: number; maxRate: number };

interface Props {
  b1: BankRate;
  b2: BankRate;
}

const STARTING_RATE_COLOR = '#577A30';
const MAX_RATE_COLOR = '#1E293B';
const SAMPLE_PRINCIPAL = 5000000; // ₹50L
const SAMPLE_YEARS = 20;

function formatRate(rate: number) {
  return `${rate.toFixed(2)}%`;
}

function formatINR(value: number): string {
  if (!Number.isFinite(value)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function calculateEMI(
  principal: number,
  annualRate: number,
  years: number,
): number {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return 0;
  const monthlyRate = annualRate / (12 * 100);
  const months = years * 12;
  const growth = Math.pow(1 + monthlyRate, months);
  const denominator = growth - 1;
  if (!Number.isFinite(growth) || denominator <= 0) return 0;
  return (principal * monthlyRate * growth) / denominator;
}

function shortBankName(name: string): string {
  if (name.length <= 12) return name;
  const words = name.split(' ').filter(Boolean);
  if (words.length >= 2) return `${words[0]} ${words[1][0]}.`;
  return `${name.slice(0, 11)}…`;
}

export default function RateComparisonChart({ b1, b2 }: Props) {
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsChartReady(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const data = [
    {
      name: b1.name,
      shortName: shortBankName(b1.name),
      startingRate: Number.isFinite(b1.rate) ? b1.rate : 0,
      maxRate: Number.isFinite(b1.maxRate) ? b1.maxRate : 0,
      corridor: Math.max(0, Number((b1.maxRate - b1.rate).toFixed(2))),
      emi: calculateEMI(SAMPLE_PRINCIPAL, b1.rate, SAMPLE_YEARS),
    },
    {
      name: b2.name,
      shortName: shortBankName(b2.name),
      startingRate: Number.isFinite(b2.rate) ? b2.rate : 0,
      maxRate: Number.isFinite(b2.maxRate) ? b2.maxRate : 0,
      corridor: Math.max(0, Number((b2.maxRate - b2.rate).toFixed(2))),
      emi: calculateEMI(SAMPLE_PRINCIPAL, b2.rate, SAMPLE_YEARS),
    }
  ];

  const minRate = Math.min(...data.map((d) => d.startingRate));
  const maxRate = Math.max(...data.map((d) => d.maxRate));
  const chartMin = Math.max(0, Number((minRate - 0.5).toFixed(2)));
  const chartMax = Number(Math.max(maxRate + 0.75, 8.5).toFixed(2));

  const lowerRateBank =
    data[0].startingRate <= data[1].startingRate ? data[0] : data[1];
  const higherRateBank =
    data[0].startingRate <= data[1].startingRate ? data[1] : data[0];
  const rateGap = Number(
    Math.abs(data[0].startingRate - data[1].startingRate).toFixed(2),
  );
  const emiGap = Math.abs(data[0].emi - data[1].emi);
  const lifetimeGap = emiGap * SAMPLE_YEARS * 12;
  const widestCorridor =
    data[0].corridor >= data[1].corridor ? data[0] : data[1];
  const corridorGap = Number(
    Math.abs(data[0].corridor - data[1].corridor).toFixed(2),
  );

  return (
    <Card className="compare-unique-card mt-8 overflow-hidden border-slate-200 shadow-lg">
      <CardHeader className="border-b border-slate-200 bg-slate-50 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <BarChart3 className="h-5 w-5 text-brand-700" />
            Interest Rate Comparison
          </CardTitle>

          <div className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
            <TrendingDown className="h-3.5 w-3.5" />
            {lowerRateBank.name} lower by {formatRate(rateGap)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="compare-field rounded-lg border border-slate-200 bg-white p-3">
            <p className="mb-1 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              Starting Rate Gap
            </p>
            <p className="text-base font-semibold text-slate-900">
              {formatRate(rateGap)}
            </p>
          </div>
          <div className="compare-field rounded-lg border border-slate-200 bg-white p-3">
            <p className="mb-1 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              Monthly EMI Delta
            </p>
            <p className="text-base font-semibold text-slate-900">
              {formatINR(emiGap)}
            </p>
          </div>
          <div className="compare-field rounded-lg border border-slate-200 bg-white p-3">
            <p className="mb-1 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              20Y Repayment Delta
            </p>
            <p className="text-base font-semibold text-slate-900">
              {formatINR(lifetimeGap)}
            </p>
          </div>
          <div className="compare-field rounded-lg border border-slate-200 bg-white p-3">
            <p className="mb-1 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
              Rate Corridor Risk
            </p>
            <p className="text-base font-semibold text-slate-900">
              {widestCorridor.name} (+{widestCorridor.corridor.toFixed(2)}%)
            </p>
          </div>
        </div>

        <div
          className="h-84"
          role="img"
          aria-label={`${b1.name} and ${b2.name} shown with starting and maximum home-loan rates. Lower rate and narrower corridor generally indicate lower borrowing risk.`}
        >
          {isChartReady ? (
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={0}
            >
              <BarChart
                data={data}
                margin={{ top: 16, right: 24, left: 8, bottom: 8 }}
                barCategoryGap="30%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="shortName"
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#334155' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[chartMin, chartMax]}
                  tickFormatter={(value: number) => `${value}%`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  width={42}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }}
                  formatter={(
                    value: number | string | undefined,
                    name: string | undefined,
                  ) => {
                    const numericValue =
                      typeof value === 'number'
                        ? value
                        : Number.isFinite(Number(value))
                          ? Number(value)
                          : 0;

                    if (name === 'startingRate')
                      return [formatRate(numericValue), 'Starting Rate'];
                    if (name === 'maxRate')
                      return [formatRate(numericValue), 'Max Published Rate'];
                    return [String(value ?? ''), name ?? 'Value'];
                  }}
                  contentStyle={{
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 24px -8px rgb(15 23 42 / 0.2)',
                  }}
                  labelStyle={{ color: '#0f172a', fontWeight: 700 }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
                  formatter={(value) =>
                    value === 'startingRate'
                      ? 'Starting Rate'
                      : 'Max Published Rate'
                  }
                />

                <Bar
                  dataKey="startingRate"
                  fill={STARTING_RATE_COLOR}
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                >
                  <LabelList
                    dataKey="startingRate"
                    position="top"
                    formatter={(value) => {
                      const numericValue =
                        typeof value === 'number'
                          ? value
                          : value != null && Number.isFinite(Number(value))
                            ? Number(value)
                            : 0;
                      return formatRate(numericValue);
                    }}
                    fill="#0f172a"
                    fontSize={12}
                    fontWeight={700}
                  />
                </Bar>

                <Bar
                  dataKey="maxRate"
                  fill={MAX_RATE_COLOR}
                  radius={[6, 6, 0, 0]}
                  barSize={18}
                >
                  <LabelList
                    dataKey="maxRate"
                    position="top"
                    formatter={(value) => {
                      const numericValue =
                        typeof value === 'number'
                          ? value
                          : value != null && Number.isFinite(Number(value))
                            ? Number(value)
                            : 0;
                      return formatRate(numericValue);
                    }}
                    fill="#334155"
                    fontSize={11}
                    fontWeight={600}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div aria-hidden className="h-full w-full rounded-md bg-slate-100" />
          )}
        </div>

        <div className="compare-note-rail rounded-lg border border-slate-200 p-3 text-xs text-slate-600">
          <p>
            <strong>{lowerRateBank.name}</strong> currently has the lower
            starting rate ({formatRate(lowerRateBank.startingRate)}) compared
            with{' '}
            <strong>{higherRateBank.name}</strong> (
            {formatRate(higherRateBank.startingRate)}). EMI delta is roughly{' '}
            <strong>{formatINR(emiGap)}</strong>/month on ₹50L over 20 years.
            Corridor spread difference is {formatRate(corridorGap)}, so compare
            fee sheet and reset policy before finalizing.
          </p>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600">
          <IndianRupee className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
          <p>
            EMI impact is an illustration using ₹50,00,000 principal for{' '}
            {SAMPLE_YEARS} years at each bank&apos;s starting rate.
          </p>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
          <p>
            Max-rate bars indicate potential upper-band exposure and should be
            reviewed alongside reset frequency and sanction terms.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
