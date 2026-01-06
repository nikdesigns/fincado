'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';

/* ---------------- TYPES ---------------- */

interface LabelConfig {
  modeLabel: string;
  addMode: string;
  removeMode: string;
  amountLabelAdd: string;
  amountLabelRemove: string;
  rateLabel: string;
  resultNet: string;
  resultGross: string;
  resultTax: string;
  resultBase: string;
  taxSplit: string;
}

interface GSTClientProps {
  labels?: Partial<LabelConfig>;
}

/* ---------------- HELPERS ---------------- */

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------------- DEFAULT LABELS ---------------- */

const DEFAULT_LABELS: LabelConfig = {
  modeLabel: 'Calculation Mode',
  addMode: 'Add GST (Exclusive)',
  removeMode: 'Remove GST (Inclusive)',
  amountLabelAdd: 'Net Price (Pre-Tax)',
  amountLabelRemove: 'Gross Price (MRP)',
  rateLabel: 'GST Rate',
  resultNet: 'Calculated Net Price',
  resultGross: 'Final Price (Incl. GST)',
  resultTax: 'Total GST',
  resultBase: 'Base Amount',
  taxSplit: 'CGST / SGST Split',
};

/* ---------------- COMPONENT ---------------- */

export default function GSTClient({ labels = {} }: GSTClientProps) {
  const t = { ...DEFAULT_LABELS, ...labels };

  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  /* ---------------- CALCULATIONS ---------------- */

  const results = useMemo(() => {
    let net = 0;
    let gst = 0;
    let gross = 0;

    if (mode === 'add') {
      net = amount;
      gst = amount * (gstRate / 100);
      gross = net + gst;
    } else {
      gross = amount;
      net = gross / (1 + gstRate / 100);
      gst = gross - net;
    }

    return {
      net: Math.round(net),
      gst: Math.round(gst),
      gross: Math.round(gross),
      cgst: Math.round(gst / 2),
      sgst: Math.round(gst / 2),
    };
  }, [amount, gstRate, mode]);

  const reset = () => {
    setAmount(10000);
    setGstRate(18);
    setMode('add');
  };

  /* ---------------- UI ---------------- */

  return (
    <Card className="calculator-card">
      <CardContent className="p-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ================= LEFT ================= */}
          <div className="space-y-6">
            {/* Mode */}
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                {t.modeLabel}
              </p>
              <ToggleGroup
                type="single"
                value={mode}
                onValueChange={(v) => v && setMode(v as 'add' | 'remove')}
                className="grid grid-cols-2 gap-2 "
              >
                <ToggleGroupItem value="add">{t.addMode}</ToggleGroupItem>
                <ToggleGroupItem value="remove">{t.removeMode}</ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {mode === 'add' ? t.amountLabelAdd : t.amountLabelRemove}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            {/* GST Rate */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {t.rateLabel}
              </label>
              <Select
                value={String(gstRate)}
                onValueChange={(v) => setGstRate(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select GST rate" />
                </SelectTrigger>
                <SelectContent>
                  {[0.25, 3, 5, 12, 18, 28].map((r) => (
                    <SelectItem key={r} value={String(r)}>
                      {r}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-3 flex flex-wrap gap-2">
                {[5, 12, 18, 28].map((r) => (
                  <Button
                    key={r}
                    size="sm"
                    variant={gstRate === r ? 'default' : 'outline'}
                    onClick={() => setGstRate(r)}
                  >
                    {r}%
                  </Button>
                ))}
              </div>
            </div>

            <Button
              variant="link"
              className="px-0 text-sm font-normal text-slate-500"
              onClick={reset}
            >
              Reset defaults
            </Button>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-6">
            {/* Main Result */}
            <Card className="bg-lime-50">
              <CardContent className="text-center">
                <p className="text-sm text-slate-500">
                  {mode === 'add' ? t.resultGross : t.resultNet}
                </p>
                <p className="mt-1 text-3xl font-extrabold text-lime-600">
                  {formatINR(mode === 'add' ? results.gross : results.net)}
                </p>
              </CardContent>
            </Card>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="flex flex-col space-y-1 items-center">
                  <p className="text-xs text-slate-500">{t.resultTax}</p>
                  <p className="font-semibold text-red-600">
                    {formatINR(results.gst)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col space-y-1 items-center">
                  <p className="text-xs text-slate-500">{t.resultBase}</p>
                  <p className="font-semibold">{formatINR(results.net)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Split */}
            <Card>
              <CardContent className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 mb-4">
                  {t.taxSplit}
                </p>

                <div className="flex justify-between text-sm">
                  <span>CGST ({gstRate / 2}%)</span>
                  <span>{formatINR(results.cgst)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>SGST ({gstRate / 2}%)</span>
                  <span>{formatINR(results.sgst)}</span>
                </div>

                <div className="pt-2 text-center bg-white">
                  <Badge variant="outline">Total GST: {gstRate}%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
