'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  RefreshCcw,
  Calculator,
  Receipt,
  ArrowRight,
  BookmarkIcon,
  Share2Icon,
  Trash2,
  Plus,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

/* ---------------- HELPERS ---------------- */
const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(val);

/* ---------------- TYPES ---------------- */
interface GSTLabels {
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
  finalInvoice: string;
  exclusiveNote: string;
  inclusiveNote: string;
}

const DEFAULT_LABELS: GSTLabels = {
  modeLabel: 'Calculation Mode',
  addMode: 'Exclusive (Add GST)',
  removeMode: 'Inclusive (Remove GST)',
  amountLabelAdd: 'Net Price (Pre-Tax)',
  amountLabelRemove: 'Gross Price (MRP)',
  rateLabel: 'GST Rate',
  resultNet: 'Base Amount',
  resultGross: 'Final Invoice Value',
  resultTax: 'Total GST',
  resultBase: 'Base Amount',
  taxSplit: 'Tax Breakdown',
  finalInvoice: 'Final Invoice Value',
  exclusiveNote: 'Use this when you have the Net Price and need to add tax.',
  inclusiveNote:
    'Use this when you have the MRP and need to find the Base Price.',
};

interface SavedGSTCalculation {
  id: number;
  amount: number;
  gstRate: number;
  mode: string;
  net: number;
  gst: number;
  gross: number;
  date: string;
}

interface BulkItem {
  id: number;
  name: string;
  amount: number;
  gstRate: number;
}

/* ---------------- COMPONENT ---------------- */
export default function GSTClient({
  labels = {},
}: {
  labels?: Partial<GSTLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };

  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  /* ---------- BULK CALCULATION STATE ---------- */
  const [showBulk, setShowBulk] = useState(false);
  const [bulkItems, setBulkItems] = useState<BulkItem[]>([
    { id: 1, name: 'Item 1', amount: 10000, gstRate: 18 },
  ]);

  /* ---------- SAVED CALCULATIONS STATE ---------- */
  const [savedCalculations, setSavedCalculations] = useState<
    SavedGSTCalculation[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  /* ---------- LOAD SAVED CALCULATIONS ---------- */
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem('gst_history');
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved calculations:', error);
    }
  }, []);

  /* ---------- TRACK CALCULATOR LOAD ---------- */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_loaded', {
        calculator_type: 'GST',
        page_path: window.location.pathname,
      });
    }
  }, []);

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

    const roundedGST = Math.round(gst * 100) / 100;
    const halfGST = Math.round((roundedGST / 2) * 100) / 100;

    return {
      net: Math.round(net * 100) / 100,
      gst: roundedGST,
      gross: Math.round(gross * 100) / 100,
      cgst: halfGST,
      sgst: roundedGST - halfGST,
    };
  }, [amount, gstRate, mode]);

  /* ---------- BULK CALCULATIONS ---------- */
  const bulkResults = useMemo(() => {
    let totalNet = 0;
    let totalGst = 0;
    let totalGross = 0;

    const itemResults = bulkItems.map((item) => {
      const net = item.amount;
      const gst = net * (item.gstRate / 100);
      const gross = net + gst;

      // eslint-disable-next-line react-hooks/immutability
      totalNet += net;
      totalGst += gst;
      totalGross += gross;

      return {
        ...item,
        net,
        gst,
        gross,
      };
    });

    return {
      items: itemResults,
      totalNet: Math.round(totalNet * 100) / 100,
      totalGst: Math.round(totalGst * 100) / 100,
      totalGross: Math.round(totalGross * 100) / 100,
    };
  }, [bulkItems]);

  const reset = () => {
    setAmount(10000);
    setGstRate(18);
    setMode('add');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'gst_reset', {
        calculator_type: 'GST',
      });
    }
  };

  /* ---------- SAVE CALCULATION ---------- */
  const handleSaveCalculation = () => {
    const calculation: SavedGSTCalculation = {
      id: Date.now(),
      amount,
      gstRate,
      mode,
      net: results.net,
      gst: results.gst,
      gross: results.gross,
      date: new Date().toISOString(),
    };

    const saved = [...savedCalculations];
    saved.unshift(calculation);
    const trimmed = saved.slice(0, 10);

    setSavedCalculations(trimmed);

    try {
      localStorage.setItem('gst_history', JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    toast.success('GST calculation saved!');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'gst_saved', {
        gst_rate: gstRate,
        mode: mode,
      });
    }
  };

  /* ---------- DELETE SINGLE CALCULATION ---------- */
  const handleDeleteCalculation = (id: number) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);

    try {
      localStorage.setItem('gst_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    toast.success('Calculation deleted!');
  };

  /* ---------- CLEAR ALL CALCULATIONS ---------- */
  const handleClearAll = () => {
    setSavedCalculations([]);

    try {
      localStorage.removeItem('gst_history');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    toast.success('All calculations cleared!');
  };

  /* ---------- SHARE VIA WHATSAPP ---------- */
  const handleShare = () => {
    const message =
      `📊 GST Calculation Results\\n\\n` +
      `Mode: ${mode === 'add' ? 'Exclusive (Add GST)' : 'Inclusive (Remove GST)'}\\n` +
      `Amount: ${formatINR(amount)}\\n` +
      `GST Rate: ${gstRate}%\\n\\n` +
      `Base Amount: ${formatINR(results.net)}\\n` +
      `GST Amount: ${formatINR(results.gst)}\\n` +
      `  • CGST (${gstRate / 2}%): ${formatINR(results.cgst)}\\n` +
      `  • SGST (${gstRate / 2}%): ${formatINR(results.sgst)}\\n` +
      `Final Invoice: ${formatINR(results.gross)}\\n\\n` +
      `Calculate yours: https://fincado.com/gst-calculator/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'gst_shared', {
        method: 'whatsapp',
      });
    }
  };

  /* ---------- LOAD SAVED CALCULATION ---------- */
  const handleLoadCalculation = (calc: SavedGSTCalculation) => {
    setAmount(calc.amount);
    setGstRate(calc.gstRate);
    setMode(calc.mode as 'add' | 'remove');
    toast.success('Calculation loaded!');
  };

  /* ---------- BULK ITEM MANAGEMENT ---------- */
  const addBulkItem = () => {
    setBulkItems([
      ...bulkItems,
      {
        id: Date.now(),
        name: `Item ${bulkItems.length + 1}`,
        amount: 10000,
        gstRate: 18,
      },
    ]);
  };

  const removeBulkItem = (id: number) => {
    if (bulkItems.length > 1) {
      setBulkItems(bulkItems.filter((item) => item.id !== id));
    }
  };

  const updateBulkItem = (
    id: number,
    field: keyof BulkItem,
    value: string | number,
  ) => {
    setBulkItems(
      bulkItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Toggle Between Single and Bulk */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowBulk(!showBulk)}
        >
          {showBulk ? 'Single Item' : 'Bulk Calculator'}
        </Button>
      </div>

      {!showBulk ? (
        /* ============ SINGLE CALCULATOR ============ */
        <Card className="border-border shadow-sm bg-card">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <Calculator className="h-5 w-5 text-emerald-600" />
                {mode === 'add' ? 'Add GST' : 'Remove GST'}
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
                  <Label>{t.modeLabel}</Label>
                  <Tabs
                    value={mode}
                    onValueChange={(v) => setMode(v as 'add' | 'remove')}
                    className="w-full"
                  >
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="add">{t.addMode}</TabsTrigger>
                      <TabsTrigger value="remove">{t.removeMode}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <p className="text-xs text-slate-500">
                    {mode === 'add' ? t.exclusiveNote : t.inclusiveNote}
                  </p>
                </div>

                {/* Amount Input */}
                <div className="space-y-3">
                  <Label>
                    {mode === 'add' ? t.amountLabelAdd : t.amountLabelRemove}
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
                  <Label>{t.rateLabel}</Label>
                  <Select
                    value={String(gstRate)}
                    onValueChange={(v) => setGstRate(Number(v))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select Rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0% (Exempt)</SelectItem>
                      <SelectItem value="0.25">
                        0.25% (Rough Diamonds)
                      </SelectItem>
                      <SelectItem value="3">3% (Gold/Jewellery)</SelectItem>
                      <SelectItem value="5">5% (Essentials)</SelectItem>
                      <SelectItem value="12">12% (Standard)</SelectItem>
                      <SelectItem value="18">
                        18% (Services/Electronics)
                      </SelectItem>
                      <SelectItem value="28">28% (Luxury Goods)</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[3, 5, 12, 18, 28].map((r) => (
                      <Badge
                        key={r}
                        variant={gstRate === r ? 'default' : 'outline'}
                        className={`cursor-pointer px-3 py-1.5 transition ${
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
                    {t.taxSplit}
                  </span>
                </div>

                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                    {/* 1. Base Amount */}
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3 border-dashed">
                      <span className="text-sm text-slate-600">
                        {t.resultBase}
                      </span>
                      <span className="text-lg font-medium text-slate-900">
                        {formatINR(results.net)}
                      </span>
                    </div>

                    {/* 2. Tax Breakdown */}
                    <div className="space-y-2 pb-3 border-b border-slate-200 border-dashed">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">
                          {t.resultTax} ({gstRate}%)
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
                          {t.resultGross}
                        </span>
                        <span className="text-3xl font-extrabold text-emerald-600">
                          {formatINR(results.gross)}
                        </span>
                      </div>
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
      ) : (
        /* ============ BULK CALCULATOR ============ */
        <Card className="border-border shadow-sm bg-card">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
              <Calculator className="h-5 w-5 text-emerald-600" />
              Bulk GST Calculator
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              {bulkItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-3 items-end p-4 bg-slate-50 rounded-lg"
                >
                  <div className="col-span-4">
                    <Label className="text-xs">Item Name</Label>
                    <Input
                      value={item.name}
                      onChange={(e) =>
                        updateBulkItem(item.id, 'name', e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="col-span-3">
                    <Label className="text-xs">Amount (₹)</Label>
                    <Input
                      type="number"
                      value={item.amount}
                      onChange={(e) =>
                        updateBulkItem(
                          item.id,
                          'amount',
                          Number(e.target.value),
                        )
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label className="text-xs">GST %</Label>
                    <Select
                      value={String(item.gstRate)}
                      onValueChange={(v) =>
                        updateBulkItem(item.id, 'gstRate', Number(v))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="3">3%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="12">12%</SelectItem>
                        <SelectItem value="18">18%</SelectItem>
                        <SelectItem value="28">28%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2">
                    <Label className="text-xs">Total</Label>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      {formatINR(item.amount * (1 + item.gstRate / 100))}
                    </div>
                  </div>

                  <div className="col-span-1 flex justify-end">
                    {bulkItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeBulkItem(item.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={addBulkItem}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>

              {/* Bulk Results Summary */}
              <Card className="border-emerald-200 bg-emerald-50/30 mt-6">
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Total Base Amount:</span>
                      <span className="font-semibold text-slate-900">
                        {formatINR(bulkResults.totalNet)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Total GST:</span>
                      <span className="font-semibold text-red-600">
                        {formatINR(bulkResults.totalGst)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg border-t border-emerald-200 pt-3">
                      <span className="font-bold text-slate-700">
                        Grand Total:
                      </span>
                      <span className="font-extrabold text-emerald-700">
                        {formatINR(bulkResults.totalGross)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {!showBulk && (
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleSaveCalculation} variant="outline" size="sm">
            <BookmarkIcon className="mr-2 h-4 w-4" />
            Save Calculation
          </Button>

          <Button onClick={handleShare} variant="outline" size="sm">
            <Share2Icon className="mr-2 h-4 w-4" />
            Share via WhatsApp
          </Button>
        </div>
      )}

      {/* Saved Calculations History */}
      {isClient && savedCalculations.length > 0 && !showBulk && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">
              Your Saved GST Calculations
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {savedCalculations.map((calc) => (
                <div
                  key={calc.id}
                  className="group p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition relative"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleLoadCalculation(calc)}
                  >
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <div className="font-semibold text-sm">
                          {calc.mode === 'add' ? 'Add GST' : 'Remove GST'} |
                          Rate: {calc.gstRate}%
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Amount: {formatINR(calc.amount)} → Final:{' '}
                          {formatINR(calc.gross)} | GST: {formatINR(calc.gst)}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(calc.date).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCalculation(calc.id);
                    }}
                    className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
