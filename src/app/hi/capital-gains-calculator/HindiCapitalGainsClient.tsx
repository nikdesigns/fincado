'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Landmark, TrendingUp, IndianRupee, Home } from 'lucide-react';

type AssetType = 'equity' | 'debt' | 'realestate';
type HoldingPeriod = 'short' | 'long';

export default function HindiCapitalGainsClient() {
  const [assetType, setAssetType] = useState<AssetType>('equity');
  const [buyPrice, setBuyPrice] = useState<number>(500000);
  const [sellPrice, setSellPrice] = useState<number>(800000);
  const [holdingPeriod, setHoldingPeriod] = useState<HoldingPeriod>('long');
  const [slabRate, setSlabRate] = useState<number>(30);
  const [unusedExemption, setUnusedExemption] = useState<number>(125000);

  const result = useMemo(() => {
    const totalGain = Math.max(0, sellPrice - buyPrice);
    let taxRate = 0;
    let taxableGain = totalGain;
    let taxDescription = '';

    if (assetType === 'equity') {
      if (holdingPeriod === 'short') {
        taxRate = 20;
        taxDescription = '20% फ्लैट (STCG)';
      } else {
        taxRate = 12.5;
        taxableGain = Math.max(0, totalGain - unusedExemption);
        taxDescription = `12.5% (₹1.25L छूट के बाद)`;
      }
    } else if (assetType === 'debt') {
      taxRate = slabRate;
      taxDescription = `स्लैब दर (${slabRate}%)`;
    } else if (assetType === 'realestate') {
      if (holdingPeriod === 'short') {
        taxRate = slabRate;
        taxDescription = `स्लैब दर (${slabRate}%)`;
      } else {
        taxRate = 12.5;
        taxDescription = '12.5% फ्लैट (बिना इंडेक्सेशन)';
      }
    }

    const baseTax = taxableGain * (taxRate / 100);
    const cess = baseTax * 0.04;
    const totalTax = baseTax + cess;
    const netGain = totalGain - totalTax;

    return {
      totalGain,
      taxableGain,
      baseTax,
      cess,
      totalTax,
      netGain,
      taxRate,
      taxDescription,
    };
  }, [
    assetType,
    buyPrice,
    sellPrice,
    holdingPeriod,
    slabRate,
    unusedExemption,
  ]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      {/* INPUTS */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-6">
            {/* Asset Type */}
            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold text-base">
                एसेट क्लास (Asset Class)
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'equity', label: 'इक्विटी / MF', icon: TrendingUp },
                  { id: 'debt', label: 'डेट फंड्स', icon: Landmark },
                  { id: 'realestate', label: 'रियल एस्टेट', icon: Home },
                ].map((asset) => {
                  const Icon = asset.icon;
                  return (
                    <button
                      key={asset.id}
                      onClick={() => {
                        setAssetType(asset.id as AssetType);
                        if (asset.id === 'debt') setHoldingPeriod('short');
                      }}
                      className={`flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border transition-all ${
                        assetType === asset.id
                          ? 'border-[#577A30] bg-[#F7FDF1] shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${assetType === asset.id ? 'text-[#577A30]' : 'text-slate-400'}`}
                      />
                      <span className="text-sm font-medium">{asset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Buy & Sell */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>खरीद मूल्य (Purchase Value)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(Number(e.target.value) || 0)}
                    className="pl-9 h-11 font-semibold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>बिक्री मूल्य (Sale Value)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Number(e.target.value) || 0)}
                    className="pl-9 h-11 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Holding Period */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <Label className="text-slate-700 font-semibold">
                होल्डिंग अवधि (Holding Period)
              </Label>
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button
                  onClick={() => setHoldingPeriod('short')}
                  className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
                    holdingPeriod === 'short'
                      ? 'bg-white shadow text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  शॉर्ट टर्म (STCG)
                </button>
                <button
                  onClick={() => setHoldingPeriod('long')}
                  className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
                    holdingPeriod === 'long'
                      ? 'bg-white shadow text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  लॉन्ग टर्म (LTCG)
                </button>
              </div>
            </div>

            {/* Conditional Fields */}
            {(assetType === 'debt' ||
              (assetType === 'realestate' && holdingPeriod === 'short')) && (
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <Label>आपका इनकम टैक्स स्लैब (%)</Label>
                <Select
                  value={slabRate.toString()}
                  onValueChange={(v) => setSlabRate(Number(v))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {[5, 10, 15, 20, 30].map((rate) => (
                      <SelectItem
                        className="hover:bg-gray-50"
                        key={rate}
                        value={rate.toString()}
                      >
                        {rate}% स्लैब (Slab)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {assetType === 'equity' && holdingPeriod === 'long' && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between">
                  <Label>बची हुई ₹1.25 लाख की छूट</Label>
                  <span className="font-semibold text-[#577A30]">
                    {new Intl.NumberFormat('en-IN').format(unusedExemption)}
                  </span>
                </div>
                <Slider
                  value={[unusedExemption]}
                  min={0}
                  max={125000}
                  step={5000}
                  onValueChange={(val) => setUnusedExemption(val[0])}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* RESULTS */}
      <div className="lg:col-span-7">
        <Card className="border-[#B0EC70] bg-white shadow-md overflow-hidden h-full flex flex-col">
          <div className="bg-linear-to-br from-[#F7FDF1] to-white border-b border-[#DFF7C6] p-8">
            <p className="text-sm font-semibold text-[#577A30] uppercase tracking-wider mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> टैक्स के बाद शुद्ध लाभ (Net
              Gain)
            </p>
            <h3 className="text-5xl font-bold text-slate-900 tracking-tighter">
              {formatCurrency(result.netGain)}
            </h3>

            {/* Progress Bar */}
            {result.totalGain > 0 && (
              <div className="mt-8">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-emerald-700">
                    आपकी कमाई (Take Home)
                  </span>
                  <span className="text-rose-600">टैक्स दिया (Tax Paid)</span>
                </div>
                <div className="h-3 bg-rose-100 rounded-2xl overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{
                      width: `${(result.netGain / result.totalGain) * 100}%`,
                    }}
                  />
                  <div
                    className="h-full bg-rose-500 transition-all"
                    style={{
                      width: `${(result.totalTax / result.totalGain) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <CardContent className="p-8 flex-1">
            <div className="space-y-5">
              <div className="flex justify-between py-3 border-b">
                <span className="text-slate-600">
                  कुल कैपिटल गेन (Total Gain)
                </span>
                <span className="font-semibold">
                  {formatCurrency(result.totalGain)}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span className="text-slate-600">
                  टैक्सेबल गेन (Taxable Gain)
                </span>
                <span className="font-semibold">
                  {formatCurrency(result.taxableGain)}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span className="text-slate-600 flex items-center gap-2">
                  <Landmark className="w-4 h-4" />
                  {result.taxDescription}
                </span>
                <span className="font-semibold text-rose-600">
                  {formatCurrency(result.baseTax)}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b text-sm">
                <span className="text-slate-500">
                  + 4% हेल्थ एंड एजुकेशन सेस (Cess)
                </span>
                <span className="text-rose-500">
                  {formatCurrency(result.cess)}
                </span>
              </div>

              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex justify-between items-center">
                <span className="font-bold text-rose-900">
                  कुल देय टैक्स (Total Tax Payable)
                </span>
                <span className="font-bold text-rose-700 text-2xl">
                  {formatCurrency(result.totalTax)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
