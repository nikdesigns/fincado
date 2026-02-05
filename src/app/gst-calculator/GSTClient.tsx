'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCcw, Calculator, Receipt, ArrowRight } from 'lucide-react';

/* ---------------- HELPERS ---------------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

/* ---------------- COMPONENT ---------------- */
export default function GSTClient() {
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
      gst = net * (gstRate / 100);
      gross = net + gst;
    } else {
      gross = amount;
      net = gross / (1 + gstRate / 100);
      gst = gross - net;
    }

    const roundedGST = Math.round(gst);
    const halfGST = Math.round(roundedGST / 2);

    return {
      net: Math.round(net),
      gst: roundedGST,
      gross: Math.round(gross),
      cgst: halfGST,
      sgst: roundedGST - halfGST,
    };
  }, [amount, gstRate, mode]);

  const reset = () => {
    setAmount(10000);
    setGstRate(18);
    setMode('add');
  };

  return (
    <Card className="border-border shadow-sm bg-card">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Compute GST
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
          <div className="space-y-8">
            {/* Mode Toggle */}
            <div className="space-y-3">
              <Label>Calculation Mode</Label>
              <Tabs
                value={mode}
                onValueChange={(v) => setMode(v as 'add' | 'remove')}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="add">Exclusive (Add GST)</TabsTrigger>
                  <TabsTrigger value="remove">
                    Inclusive (Remove GST)
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <p className="text-xs text-slate-500">
                {mode === 'add'
                  ? 'Use this when you have the Net Price and need to add tax.'
                  : 'Use this when you have the MRP and need to find the Base Price.'}
              </p>
            </div>

            {/* Amount Input */}
            <div className="space-y-3">
              <Label>
                {mode === 'add' ? 'Net Price (Pre-Tax)' : 'Gross Price (MRP)'}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                  ₹
                </span>
                <Input
                  type="number"
                  min={0}
                  value={amount}
                  onChange={(e) =>
                    setAmount(Math.max(0, Number(e.target.value) || 0))
                  }
                  className="pl-8 h-11 text-lg font-medium"
                />
              </div>
            </div>

            {/* Rate Selection */}
            <div className="space-y-3">
              <Label>GST Rate</Label>
              <Select
                value={String(gstRate)}
                onValueChange={(v) => setGstRate(Number(v))}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select Rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% (Exempt)</SelectItem>
                  <SelectItem value="3">3% (Gold/Jewellery)</SelectItem>
                  <SelectItem value="5">5% (Essentials)</SelectItem>
                  <SelectItem value="12">12% (Standard)</SelectItem>
                  <SelectItem value="18">18% (Services/Electronics)</SelectItem>
                  <SelectItem value="28">28% (Luxury Goods)</SelectItem>
                </SelectContent>
              </Select>

              {/* Quick Select Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[3, 5, 12, 18, 28].map((r) => (
                  <Badge
                    key={r}
                    variant={gstRate === r ? 'default' : 'outline'}
                    className={`cursor-pointer px-3 py-1.5 ${
                      gstRate === r
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'hover:bg-slate-50'
                    }`}
                    onClick={() => setGstRate(r)}
                  >
                    {r}%
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT: RESULTS (Invoice Style) --- */}
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Calculation Summary
              </span>
            </div>

            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden">
              {/* Decorative background element */}

              <div className="relative z-10 space-y-6">
                {/* 1. Base Amount */}
                <div className="flex justify-between items-center border-b border-slate-200 pb-3 border-dashed">
                  <span className="text-sm text-slate-600">Base Amount</span>
                  <span className="text-lg font-medium text-slate-900">
                    {formatINR(results.net)}
                  </span>
                </div>

                {/* 2. Tax Breakdown */}
                <div className="space-y-2 pb-3 border-b border-slate-200 border-dashed">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      Total GST ({gstRate}%)
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      + {formatINR(results.gst)}
                    </span>
                  </div>
                  {gstRate > 0 && (
                    <div className="pl-4 text-xs text-slate-400 space-y-1 border-l-2 border-slate-200 ml-1">
                      <div className="flex justify-between">
                        <span>CGST ({gstRate / 2}%)</span>
                        <span>{formatINR(results.cgst)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SGST ({gstRate / 2}%)</span>
                        <span>{formatINR(results.sgst)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Final Total */}
                <div className="pt-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-slate-700">
                      Final Invoice Value
                    </span>
                    <span className="text-3xl font-extrabold text-emerald-600">
                      {formatINR(results.gross)}
                    </span>
                  </div>
                  <p className="text-xs text-right text-slate-400 mt-1">
                    (Inclusive of all taxes)
                  </p>
                </div>
              </div>
            </div>

            {/* Helpful Note */}
            <div className="mt-4 flex gap-2 items-start text-xs text-slate-500 bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
              <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p>
                {mode === 'add'
                  ? `For an item costing ${formatINR(
                      amount,
                    )}, you need to collect ${formatINR(
                      results.gst,
                    )} tax from the customer.`
                  : `For an MRP of ${formatINR(
                      amount,
                    )}, the actual product value is ${formatINR(
                      results.net,
                    )}. The rest is tax.`}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
