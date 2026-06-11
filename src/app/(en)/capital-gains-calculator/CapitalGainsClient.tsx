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

export default function CapitalGainsClient() {
  const [assetType, setAssetType] = useState<AssetType>('equity');
  const [buyPrice, setBuyPrice] = useState<number>(500000);
  const [sellPrice, setSellPrice] = useState<number>(800000);
  const [holdingPeriod, setHoldingPeriod] = useState<HoldingPeriod>('long');
  const [slabRate, setSlabRate] = useState<number>(30);
  const [unusedExemption, setUnusedExemption] = useState<number>(125000);
  const [propertyAcquiredBeforeJul2024, setPropertyAcquiredBeforeJul2024] =
    useState<boolean>(false);
  const [indexedCost, setIndexedCost] = useState<number>(500000);

  const result = useMemo(() => {
    const totalGain = Math.max(0, sellPrice - buyPrice);
    let taxRate = 0;
    let taxableGain = totalGain;
    let taxDescription = '';
    let baseTax = 0;
    let indexationComparison: {
      withoutIndexation: number;
      withIndexation: number;
      chosen: 'without' | 'with';
    } | null = null;

    if (assetType === 'equity') {
      if (holdingPeriod === 'short') {
        taxRate = 20;
        taxDescription = '20% Flat (STCG)';
        baseTax = taxableGain * 0.2;
      } else {
        taxRate = 12.5;
        taxableGain = Math.max(0, totalGain - unusedExemption);
        taxDescription = `12.5% after ₹1.25L exemption`;
        baseTax = taxableGain * 0.125;
      }
    } else if (assetType === 'debt') {
      taxRate = slabRate;
      taxDescription = `Slab Rate (${slabRate}%)`;
      baseTax = taxableGain * (slabRate / 100);
    } else if (assetType === 'realestate') {
      if (holdingPeriod === 'short') {
        taxRate = slabRate;
        taxDescription = `Slab Rate (${slabRate}%)`;
        baseTax = taxableGain * (slabRate / 100);
      } else {
        if (propertyAcquiredBeforeJul2024) {
          const gainWithoutIndexation = Math.max(0, sellPrice - buyPrice);
          const gainWithIndexation = Math.max(0, sellPrice - indexedCost);
          const taxWithoutIndexation = gainWithoutIndexation * 0.125;
          const taxWithIndexation = gainWithIndexation * 0.2;

          if (taxWithIndexation < taxWithoutIndexation) {
            taxRate = 20;
            taxableGain = gainWithIndexation;
            baseTax = taxWithIndexation;
            taxDescription = '20% with indexation (lower tax option)';
            indexationComparison = {
              withoutIndexation: taxWithoutIndexation,
              withIndexation: taxWithIndexation,
              chosen: 'with',
            };
          } else {
            taxRate = 12.5;
            taxableGain = gainWithoutIndexation;
            baseTax = taxWithoutIndexation;
            taxDescription = '12.5% without indexation (lower tax option)';
            indexationComparison = {
              withoutIndexation: taxWithoutIndexation,
              withIndexation: taxWithIndexation,
              chosen: 'without',
            };
          }
        } else {
          taxRate = 12.5;
          taxDescription = '12.5% Flat (No Indexation)';
          baseTax = taxableGain * 0.125;
        }
      }
    }
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
      indexationComparison,
    };
  }, [
    assetType,
    buyPrice,
    sellPrice,
    holdingPeriod,
    slabRate,
    unusedExemption,
    propertyAcquiredBeforeJul2024,
    indexedCost
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
                Asset Class
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'equity', label: 'Equity / MF', icon: TrendingUp },
                  { id: 'debt', label: 'Debt Funds', icon: Landmark },
                  { id: 'realestate', label: 'Real Estate', icon: Home }
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
                          ? 'border-brand-700 bg-brand-50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${assetType === asset.id ? 'text-brand-700' : 'text-slate-400'}`}
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
                <Label>Purchase Value</Label>
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
                <Label>Sale Value</Label>
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
                Holding Period
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
                  Short Term
                </button>
                <button
                  onClick={() => setHoldingPeriod('long')}
                  className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
                    holdingPeriod === 'long'
                      ? 'bg-white shadow text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  Long Term
                </button>
              </div>
            </div>

            {/* Conditional Fields */}
            {(assetType === 'debt' ||
              (assetType === 'realestate' && holdingPeriod === 'short')) && (
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <Label>Your Income Tax Slab (%)</Label>
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
                        {rate}% Slab
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {assetType === 'equity' && holdingPeriod === 'long' && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between">
                  <Label>Unused ₹1.25 Lakh Exemption</Label>
                  <span className="font-semibold text-brand-700">
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

            {assetType === 'realestate' && holdingPeriod === 'long' && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={propertyAcquiredBeforeJul2024}
                    onChange={(e) =>
                      setPropertyAcquiredBeforeJul2024(e.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-300"
                  />
                  <span>
                    Property acquired before 23 July 2024 (eligible for
                    lower-of comparison: 20% with indexation vs 12.5% without
                    indexation).
                  </span>
                </label>

                {propertyAcquiredBeforeJul2024 && (
                  <div className="space-y-2">
                    <Label>Indexed Cost of Acquisition (₹)</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IndianRupee className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        type="number"
                        value={indexedCost}
                        onChange={(e) =>
                          setIndexedCost(Number(e.target.value) || 0)
                        }
                        className="pl-9 h-11 font-semibold"
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      Enter your CII-indexed cost for the old 20% calculation.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* RESULTS */}
      <div className="lg:col-span-7">
        <Card className="border-brand-400 bg-white shadow-md overflow-hidden h-full flex flex-col">
          <div className="bg-linear-to-br from-brand-50 to-white border-b border-brand-200 p-8">
            <p className="text-sm font-semibold text-brand-700 uppercase tracking-wider mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Net Gain After Tax
            </p>
            <h3 className="text-5xl font-bold text-slate-900 tracking-tighter">
              {formatCurrency(result.netGain)}
            </h3>

            {/* Progress Bar */}
            {result.totalGain > 0 && (
              <div className="mt-8">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-emerald-700">You Keep</span>
                  <span className="text-rose-600">Tax Paid</span>
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
                <span className="text-slate-600">Total Capital Gain</span>
                <span className="font-semibold">
                  {formatCurrency(result.totalGain)}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span className="text-slate-600">Taxable Gain</span>
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
                  + 4% Health & Education Cess
                </span>
                <span className="text-rose-500">
                  {formatCurrency(result.cess)}
                </span>
              </div>

              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex justify-between items-center">
                <span className="font-bold text-rose-900">
                  Total Tax Payable
                </span>
                <span className="font-bold text-rose-700 text-2xl">
                  {formatCurrency(result.totalTax)}
                </span>
              </div>

              {result.indexationComparison && (
                <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm space-y-2">
                  <div className="font-semibold text-brand-900">
                    Property Transitional Rule Comparison
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>12.5% without indexation:</span>
                    <span className="font-medium">
                      {formatCurrency(
                        result.indexationComparison.withoutIndexation,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>20% with indexation:</span>
                    <span className="font-medium">
                      {formatCurrency(result.indexationComparison.withIndexation)}
                    </span>
                  </div>
                  <div className="text-xs text-brand-800">
                    Lower tax option applied:{' '}
                    {result.indexationComparison.chosen === 'with'
                      ? '20% with indexation'
                      : '12.5% without indexation'}
                    .
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
