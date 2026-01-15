'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { GitCompare, ArrowRight } from 'lucide-react';

const banks = [
  { slug: 'sbi', name: 'SBI' },
  { slug: 'hdfc', name: 'HDFC' },
  { slug: 'icici', name: 'ICICI' },
  { slug: 'axis', name: 'Axis' },
  { slug: 'kotak', name: 'Kotak' },
];

export default function BankSelector() {
  const [bank1, setBank1] = useState<string>('');
  const [bank2, setBank2] = useState<string>('');
  const router = useRouter();

  const handleCompare = () => {
    if (bank1 && bank2 && bank1 !== bank2) {
      router.push(`/compare/${bank1}-vs-${bank2}/`);
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Bank 1 Selection */}
        <div className="w-full">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
            First Bank
          </label>
          <Select onValueChange={setBank1}>
            <SelectTrigger className="w-full border-slate-200 h-11 focus:ring-lime-500 rounded-xl">
              <SelectValue placeholder="Select Bank" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((b) => (
                <SelectItem key={b.slug} value={b.slug}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden sm:block text-slate-300">
          <GitCompare className="w-5 h-5" />
        </div>

        {/* Bank 2 Selection */}
        <div className="w-full">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
            Second Bank
          </label>
          <Select onValueChange={setBank2}>
            <SelectTrigger className="w-full border-slate-200 h-11 focus:ring-lime-500 rounded-xl">
              <SelectValue placeholder="Select Bank" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((b) => (
                <SelectItem key={b.slug} value={b.slug}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleCompare}
        disabled={!bank1 || !bank2 || bank1 === bank2}
        className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold h-12 rounded-xl transition-all disabled:opacity-50"
      >
        Start Comparison <ArrowRight className="ml-2 w-4 h-4" />
      </Button>

      {bank1 && bank2 && bank1 === bank2 && (
        <p className="text-[11px] text-red-500 font-medium text-center italic">
          Please select two different banks to compare.
        </p>
      )}
    </div>
  );
}
