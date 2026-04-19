'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IndianRupee, PieChart, TrendingUp, Target } from 'lucide-react';

type Segment = 'delivery' | 'intraday' | 'futures' | 'options';

export default function BrokerageClient() {
  const [segment, setSegment] = useState<Segment>('intraday');
  const [qty, setQty] = useState<number>(100);
  const [buyPrice, setBuyPrice] = useState<number>(1000);
  const [sellPrice, setSellPrice] = useState<number>(1010);

  const result = useMemo(() => {
    const buyTurnover = buyPrice * qty;
    const sellTurnover = sellPrice * qty;
    const totalTurnover = buyTurnover + sellTurnover;
    const grossPnL = sellTurnover - buyTurnover;

    let brokerage = 0;
    let stt = 0;
    let exchangeCharge = 0;
    let stampDuty = 0;

    // Brokerage
    if (segment === 'delivery') {
      brokerage = 0;
    } else if (segment === 'intraday') {
      brokerage =
        Math.min(20, buyTurnover * 0.0003) +
        Math.min(20, sellTurnover * 0.0003);
    } else if (segment === 'futures') {
      brokerage =
        Math.min(20, buyTurnover * 0.0002) +
        Math.min(20, sellTurnover * 0.0002);
    } else if (segment === 'options') {
      brokerage = 40; // ₹20 per leg
    }

    // STT
    if (segment === 'delivery') {
      stt = Math.round(totalTurnover * 0.001);
    } else if (segment === 'intraday') {
      stt = Math.round(sellTurnover * 0.00025);
    } else if (segment === 'futures') {
      stt = Math.round(sellTurnover * 0.0002);
    } else if (segment === 'options') {
      stt = Math.round(sellTurnover * 0.001);
    }

    // Exchange Charges
    if (segment === 'delivery' || segment === 'intraday') {
      exchangeCharge = totalTurnover * 0.0000297;
    } else if (segment === 'futures') {
      exchangeCharge = totalTurnover * 0.0000173;
    } else if (segment === 'options') {
      exchangeCharge = totalTurnover * 0.0003503;
    }

    const sebiCharge = totalTurnover * 0.000001;
    const gst = (brokerage + sebiCharge + exchangeCharge) * 0.18;

    // Stamp Duty (on buy side)
    if (segment === 'delivery') {
      stampDuty = Math.round(buyTurnover * 0.00015);
    } else if (segment === 'intraday' || segment === 'options') {
      stampDuty = Math.round(buyTurnover * 0.00003);
    } else if (segment === 'futures') {
      stampDuty = Math.round(buyTurnover * 0.00002);
    }

    const totalTaxesAndCharges =
      brokerage + stt + exchangeCharge + stampDuty + sebiCharge + gst;
    const netPnL = grossPnL - totalTaxesAndCharges;
    const breakevenPoints = totalTaxesAndCharges / qty;

    return {
      buyTurnover,
      sellTurnover,
      totalTurnover,
      grossPnL,
      brokerage,
      stt,
      exchangeCharge,
      stampDuty,
      sebiCharge,
      gst,
      totalTaxesAndCharges,
      netPnL,
      breakevenPoints,
    };
  }, [segment, qty, buyPrice, sellPrice]);

  const formatCurrency = (amount: number, digits: number = 2) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(amount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      {/* INPUTS SECTION */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-6">
            {/* Segment Selector */}
            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold text-base">
                Trading Segment
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'delivery', label: 'Delivery (CNC)' },
                  { id: 'intraday', label: 'Intraday (MIS)' },
                  { id: 'futures', label: 'Futures' },
                  { id: 'options', label: 'Options' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSegment(item.id as Segment)}
                    className={`py-3 px-4 text-sm font-semibold rounded-2xl border transition-all ${
                      segment === item.id
                        ? 'bg-brand-100 border-brand-700 text-brand-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={qty || ''}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="h-12 font-semibold text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Buy Price (₹)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    type="number"
                    value={buyPrice || ''}
                    onChange={(e) => setBuyPrice(Number(e.target.value))}
                    className="pl-9 h-12 font-semibold text-lg"
                    step="0.05"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Sell Price (₹)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    type="number"
                    value={sellPrice || ''}
                    onChange={(e) => setSellPrice(Number(e.target.value))}
                    className="pl-9 h-12 font-semibold text-lg"
                    step="0.05"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RESULTS SECTION */}
      <div className="lg:col-span-7">
        <Card
          className={`border shadow-md overflow-hidden h-full flex flex-col ${result.netPnL >= 0 ? 'border-brand-400' : 'border-rose-300'}`}
        >
          <div
            className={`${result.netPnL >= 0 ? 'bg-linear-to-br from-brand-50 to-white border-brand-200' : 'bg-linear-to-br from-rose-50 to-white border-rose-200'} border-b p-6 sm:p-8`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p
                  className={`text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2 ${result.netPnL >= 0 ? 'text-brand-700' : 'text-rose-700'}`}
                >
                  <TrendingUp className="w-4 h-4" /> Net P&L After All Charges
                </p>
                <h3
                  className={`text-4xl sm:text-5xl font-bold tracking-tight ${result.netPnL >= 0 ? 'text-slate-900' : 'text-rose-600'}`}
                >
                  {formatCurrency(result.netPnL)}
                </h3>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Breakeven
                </p>
                <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-800">
                    {result.breakevenPoints.toFixed(2)} pts
                  </span>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-6 sm:p-8 flex-1">
            <h4 className="font-bold text-slate-800 border-b pb-3 mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-slate-500" /> Charges Breakdown
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Brokerage</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(result.brokerage)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">STT</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(result.stt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Exchange Charges</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(result.exchangeCharge)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Stamp Duty</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(result.stampDuty)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">SEBI Charges</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(result.sebiCharge)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">GST (18%)</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(result.gst)}
                </span>
              </div>

              <div className="flex justify-between items-center py-4 mt-4 bg-slate-50 px-4 rounded-2xl border border-slate-200">
                <div className="font-bold text-slate-800">
                  Total Taxes & Charges
                </div>
                <span className="font-bold text-rose-600 text-lg">
                  -{formatCurrency(result.totalTaxesAndCharges)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
