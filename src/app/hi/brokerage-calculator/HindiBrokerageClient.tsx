'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IndianRupee, PieChart, TrendingUp, Target } from 'lucide-react';

type Segment = 'delivery' | 'intraday' | 'futures' | 'options';

export default function HindiBrokerageClient() {
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

    // Brokerage (Zerodha/Groww/Upstox Standard Model)
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
      brokerage = 40; // ₹20 Buy + ₹20 Sell
    }

    // STT (Securities Transaction Tax) - Updated Rates
    if (segment === 'delivery') {
      stt = Math.round(totalTurnover * 0.001); // 0.1% on both
    } else if (segment === 'intraday') {
      stt = Math.round(sellTurnover * 0.00025); // 0.025% on sell
    } else if (segment === 'futures') {
      stt = Math.round(sellTurnover * 0.0002); // 0.02% on sell
    } else if (segment === 'options') {
      stt = Math.round(sellTurnover * 0.001); // 0.1% on sell premium
    }

    // Exchange Charges (NSE True-to-Label)
    if (segment === 'delivery' || segment === 'intraday') {
      exchangeCharge = totalTurnover * 0.0000297;
    } else if (segment === 'futures') {
      exchangeCharge = totalTurnover * 0.0000173;
    } else if (segment === 'options') {
      exchangeCharge = totalTurnover * 0.0003503;
    }

    // SEBI Charges (₹10 per crore)
    const sebiCharge = totalTurnover * 0.000001;

    // Stamp Duty (On Buy Side Only)
    if (segment === 'delivery') {
      stampDuty = Math.round(buyTurnover * 0.00015);
    } else if (segment === 'intraday' || segment === 'options') {
      stampDuty = Math.round(buyTurnover * 0.00003);
    } else if (segment === 'futures') {
      stampDuty = Math.round(buyTurnover * 0.00002);
    }

    // GST 18% on (Brokerage + SEBI + Exchange)
    const gst = (brokerage + sebiCharge + exchangeCharge) * 0.18;

    const totalTaxesAndCharges =
      brokerage + stt + exchangeCharge + stampDuty + sebiCharge + gst;
    const netPnL = grossPnL - totalTaxesAndCharges;

    // Breakeven Points calculation
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
                ट्रेडिंग सेगमेंट (Trading Segment)
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'delivery', label: 'डिलीवरी (CNC)' },
                  { id: 'intraday', label: 'इंट्राडे (MIS)' },
                  { id: 'futures', label: 'फ्यूचर्स (Futures)' },
                  { id: 'options', label: 'ऑप्शंस (Options)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSegment(item.id as Segment)}
                    className={`py-3 px-4 text-sm font-semibold rounded-2xl border transition-all ${
                      segment === item.id
                        ? 'bg-[#EFFBE2] border-[#577A30] text-[#577A30] shadow-sm'
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
                <Label className="text-slate-700 font-semibold">
                  मात्रा (Quantity)
                </Label>
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
                <Label className="text-slate-700 font-semibold">
                  खरीद मूल्य (Buy Price)
                </Label>
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
                <Label className="text-slate-700 font-semibold">
                  बिक्री मूल्य (Sell Price)
                </Label>
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
          className={`border shadow-md overflow-hidden h-full flex flex-col ${result.netPnL >= 0 ? 'border-[#B0EC70]' : 'border-rose-300'}`}
        >
          <div
            className={`${result.netPnL >= 0 ? 'bg-linear-to-br from-[#F7FDF1] to-white border-[#DFF7C6]' : 'bg-linear-to-br from-rose-50 to-white border-rose-200'} border-b p-6 sm:p-8`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p
                  className={`text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2 ${result.netPnL >= 0 ? 'text-[#577A30]' : 'text-rose-700'}`}
                >
                  <TrendingUp className="w-4 h-4" /> शुद्ध लाभ/हानि (Net P&L)
                </p>
                <h3
                  className={`text-4xl sm:text-5xl font-bold tracking-tight ${result.netPnL >= 0 ? 'text-slate-900' : 'text-rose-600'}`}
                >
                  {formatCurrency(result.netPnL)}
                </h3>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  ब्रेकइवन (Breakeven)
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
              <PieChart className="w-5 h-5 text-slate-500" /> शुल्कों का विवरण
              (Charges)
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">ब्रोकरेज (Brokerage)</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(result.brokerage)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">
                  STT (Securities Transaction Tax)
                </span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(result.stt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">
                  एक्सचेंज शुल्क (Exchange Charges)
                </span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(result.exchangeCharge)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">
                  स्टाम्प ड्यूटी (Stamp Duty)
                </span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(result.stampDuty)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">SEBI शुल्क</span>
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
                  कुल टैक्स और शुल्क (Total Charges)
                </div>
                <span className="font-bold text-rose-600 text-lg">
                  -{formatCurrency(result.totalTaxesAndCharges)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 px-2">
                <div className="font-medium text-slate-500">
                  ग्रॉस P&L (बिना टैक्स के)
                </div>
                <span
                  className={`font-bold ${result.grossPnL >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}
                >
                  {formatCurrency(result.grossPnL)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
