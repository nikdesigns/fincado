'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Printer, FileText, IndianRupee, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function RentReceiptClient() {
  // Form State
  const [tenantName, setTenantName] = useState('Rahul Sharma');
  const [landlordName, setLandlordName] = useState('Amit Patel');
  const [pan, setPan] = useState('');
  const [receiptNo, setReceiptNo] = useState(''); // ← New field
  const [rentAmount, setRentAmount] = useState<number | string>(15000);
  const [address, setAddress] = useState(
    'Flat 402, Sunshine Apartments, Indiranagar, Bangalore - 560038',
  );
  const [period, setPeriod] = useState<
    'monthly' | 'quarterly' | 'half-yearly' | 'yearly'
  >('monthly');
  const [receiptDate, setReceiptDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  // Derived dates (automatically calculated based on period)
  const derivedDates = useMemo(() => {
    const today = new Date(receiptDate || new Date());
    const start = new Date(today);
    let end = new Date(today);

    if (period === 'monthly') {
      start.setDate(1);
      end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    } else if (period === 'quarterly') {
      start.setMonth(Math.floor(start.getMonth() / 3) * 3);
      start.setDate(1);
      end = new Date(start.getFullYear(), start.getMonth() + 3, 0);
    } else if (period === 'half-yearly') {
      start.setMonth(Math.floor(start.getMonth() / 6) * 6);
      start.setDate(1);
      end = new Date(start.getFullYear(), start.getMonth() + 6, 0);
    } else if (period === 'yearly') {
      start.setMonth(0);
      start.setDate(1);
      end = new Date(start.getFullYear(), 11, 31);
    }

    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    };
  }, [period, receiptDate]);

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount: number | string) => {
    const num = Number(amount);
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(
      num,
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalRent =
    Number(rentAmount) *
    (period === 'monthly'
      ? 1
      : period === 'quarterly'
        ? 3
        : period === 'half-yearly'
          ? 6
          : 12);

  const showPanWarning = totalRent > 100000 && pan.trim() === '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      {/* FORM SECTION */}
      <div className="lg:col-span-5 space-y-6 print:hidden">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-800">
              <FileText className="h-5 w-5 text-[#577A30]" />
              Receipt Details
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 space-y-5">
            {/* Receipt No. */}
            <div className="space-y-2">
              <Label htmlFor="receiptNo">Receipt No. (Optional)</Label>
              <Input
                id="receiptNo"
                value={receiptNo}
                onChange={(e) => setReceiptNo(e.target.value)}
                placeholder="e.g. RR-20260412 or 001"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tenantName">Tenant Name (You)</Label>
                <Input
                  id="tenantName"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landlordName">Landlord Name</Label>
                <Input
                  id="landlordName"
                  value={landlordName}
                  onChange={(e) => setLandlordName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rentAmount">Monthly Rent (₹)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    id="rentAmount"
                    type="number"
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
                    className="pl-9 font-semibold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">Landlord PAN (Optional)</Label>
                <Input
                  id="pan"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>
            </div>

            {showPanWarning && (
              <Alert className="bg-amber-50 border-amber-200 text-amber-800 py-2">
                <ShieldAlert className="h-4 w-4 text-amber-600 mt-0.5" />
                <AlertDescription className="ml-2 text-xs">
                  Annual rent exceeds ₹1,00,000. Landlord&apos;s PAN is
                  mandatory.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="address">Rented Property Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="resize-none h-20"
              />
            </div>

            <div className="space-y-2">
              <Label>Period</Label>
              <Select
                value={period}
                onValueChange={(
                  value: 'monthly' | 'quarterly' | 'half-yearly' | 'yearly',
                ) => setPeriod(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem className="hover:bg-gray-50" value="monthly">
                    Monthly
                  </SelectItem>
                  <SelectItem className="hover:bg-gray-50" value="quarterly">
                    Quarterly (3 months)
                  </SelectItem>
                  <SelectItem className="hover:bg-gray-50" value="half-yearly">
                    Half-Yearly (6 months)
                  </SelectItem>
                  <SelectItem className="hover:bg-gray-50" value="yearly">
                    Yearly
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div className="space-y-2">
                <Label>Period From</Label>
                <Input type="date" value={derivedDates.start} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Period To</Label>
                <Input type="date" value={derivedDates.end} readOnly />
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-4">
              <Label htmlFor="receiptDate">Receipt Date</Label>
              <Input
                id="receiptDate"
                type="date"
                value={receiptDate}
                onChange={(e) => setReceiptDate(e.target.value)}
              />
            </div>

            <Button
              onClick={handlePrint}
              className="w-full bg-[#577A30] hover:bg-[#466326] text-white font-semibold py-6 text-lg mt-6"
            >
              <Printer className="mr-2 h-5 w-5" /> Download PDF / Print
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* LIVE PREVIEW */}
      <div className="lg:col-span-7 print:col-span-12 print:w-full print:absolute print:top-0 print:left-0 print:m-0 print:p-0">
        <div className="print:hidden mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Live Preview
          </h3>
          <span className="text-xs bg-[#EFFBE2] text-[#577A30] px-2 py-1 rounded font-medium">
            A4 Ready
          </span>
        </div>

        <Card className="border border-slate-300 shadow-lg bg-white print:shadow-none print:border-none print:w-full">
          <CardContent className="p-8 sm:p-12 text-slate-800">
            <div className="text-center border-b-2 border-slate-800 pb-4 mb-8">
              <h2 className="text-3xl font-bold uppercase tracking-widest text-slate-900">
                Rent Receipt
              </h2>
            </div>

            <div className="flex justify-between items-center mb-8 font-medium">
              <div>
                <strong>Receipt No:</strong> {receiptNo || '____________'}
              </div>
              <div>
                <strong>Date:</strong> {formatDate(receiptDate)}
              </div>
            </div>

            <div className="space-y-8 leading-loose text-lg text-justify">
              <p>
                Received with thanks from Mr./Ms.{' '}
                <strong className="border-b border-slate-400 px-2 text-slate-900">
                  {tenantName || '__________________'}
                </strong>
                &nbsp;a sum of{' '}
                <strong className="border-b border-slate-400 px-2 text-slate-900">
                  INR {formatCurrency(totalRent)}/-
                </strong>
              </p>

              <p>
                Towards the rent of property located at: <br />
                <strong className="border-b border-slate-400 px-2 block mt-1 text-slate-900">
                  {address ||
                    '____________________________________________________________________'}
                </strong>
              </p>

              <p>
                For the period from{' '}
                <strong className="border-b border-slate-400 px-2 text-slate-900">
                  {formatDate(derivedDates.start)}
                </strong>
                &nbsp;to{' '}
                <strong className="border-b border-slate-400 px-2 text-slate-900">
                  {formatDate(derivedDates.end)}
                </strong>
                .
              </p>
            </div>

            <div className="mt-16 flex justify-between items-end">
              <div className="space-y-3">
                <p>
                  <strong>Landlord Name:</strong>{' '}
                  {landlordName || '__________________'}
                </p>
                <p>
                  <strong>Landlord PAN:</strong> {pan || '__________________'}
                </p>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="w-24 h-24 border-2 border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 mb-2">
                  Revenue
                  <br />
                  Stamp
                  <br />
                  (If cash)
                </div>
                <div className="w-48 border-t border-slate-800 pt-2 font-semibold">
                  Landlord Signature
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
