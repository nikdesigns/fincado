'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface Props {
  b1: { name: string; rate: number; maxRate: number };
  b2: { name: string; rate: number; maxRate: number };
}

export default function RateComparisonChart({ b1, b2 }: Props) {
  const data = [
    {
      name: b1.name,
      rate: b1.rate,
      color: '#4f46e5', // Indigo-600
    },
    {
      name: b2.name,
      rate: b2.rate,
      color: '#059669', // Emerald-600
    }
  ];

  return (
    <Card className="border-slate-200 shadow-lg mt-8 overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
          <BarChart3 className="h-5 w-5 text-lime-600" />
          Interest Rate Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#e2e8f0"
            />
            <XAxis type="number" domain={[0, 12]} hide />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 14, fontWeight: 600, fill: '#334155' }}
              width={100}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-center text-xs text-slate-400 mt-2">
          *Lower is better. Rates are p.a.
        </p>
      </CardContent>
    </Card>
  );
}
