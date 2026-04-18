'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChart3, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BankRate = { name: string; rate: number; maxRate: number };

interface Props {
  b1: BankRate;
  b2: BankRate;
}

const CHART_COLORS = ['#577A30', '#FF9F4C'];

function formatRate(rate: number) {
  return `${rate.toFixed(2)}%`;
}

export default function RateComparisonChart({ b1, b2 }: Props) {
  const isChartReady = typeof window !== 'undefined';

  const data = [
    {
      name: b1.name,
      rate: Number.isFinite(b1.rate) ? b1.rate : 0,
      maxRate: Number.isFinite(b1.maxRate) ? b1.maxRate : 0,
      color: CHART_COLORS[0],
    },
    {
      name: b2.name,
      rate: Number.isFinite(b2.rate) ? b2.rate : 0,
      maxRate: Number.isFinite(b2.maxRate) ? b2.maxRate : 0,
      color: CHART_COLORS[1],
    },
  ];

  const minRate = Math.min(...data.map((d) => d.rate));
  const maxRate = Math.max(...data.map((d) => d.rate));
  const chartMin = Math.max(0, Number((minRate - 1).toFixed(2)));
  const chartMax = Number(Math.max(maxRate + 1, 8.5).toFixed(2));

  const lowerRateBank = data[0].rate <= data[1].rate ? data[0] : data[1];
  const higherRateBank = data[0].rate <= data[1].rate ? data[1] : data[0];
  const rateGap = Number(Math.abs(data[0].rate - data[1].rate).toFixed(2));

  return (
    <Card className="mt-8 overflow-hidden border-slate-200 shadow-lg">
      <CardHeader className="border-b border-slate-100 bg-slate-50 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <BarChart3 className="h-5 w-5 text-brand-700" />
            Interest Rate Comparison
          </CardTitle>

          <div className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <TrendingDown className="h-3.5 w-3.5" />
            {lowerRateBank.name} lower by {formatRate(rateGap)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        <div
          className="h-80"
          role="img"
          aria-label={`${b1.name} at ${formatRate(b1.rate)} and ${b2.name} at ${formatRate(b2.rate)}. Lower rate is better.`}
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
                layout="vertical"
                margin={{ top: 8, right: 24, left: 12, bottom: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  type="number"
                  domain={[chartMin, chartMax]}
                  tickFormatter={(value: number) => `${value}%`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 13, fontWeight: 600, fill: '#334155' }}
                  width={110}
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

                    if (name === 'rate')
                      return [formatRate(numericValue), 'Starting Rate'];
                    if (name === 'maxRate')
                      return [formatRate(numericValue), 'Maximum Rate'];
                    return [String(value ?? ''), name ?? 'Value'];
                  }}
                  contentStyle={{
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 24px -8px rgb(15 23 42 / 0.2)',
                  }}
                  labelStyle={{ color: '#0f172a', fontWeight: 700 }}
                />
                <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={34}>
                  <LabelList
                    dataKey="rate"
                    position="right"
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
                  {data.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div aria-hidden className="h-full w-full rounded-md bg-slate-100" />
          )}
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          <p>
            <strong>{lowerRateBank.name}</strong> currently has the lower
            starting rate ({formatRate(lowerRateBank.rate)}) compared with{' '}
            <strong>{higherRateBank.name}</strong> (
            {formatRate(higherRateBank.rate)}). Lower is generally better, but
            compare fees and reset policy too.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
