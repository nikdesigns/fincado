'use client';
import React, { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { TAX_RULES, computeTax, inHand, inr } from '@/lib/incomeTax';

interface Props {
  defaultSalary?: number;
}

const PRESETS = [8_00_000, 12_75_000, 15_00_000, 20_00_000, 30_00_000];

function MoneyInput({
  id,
  label,
  value,
  onChange,
  hint,
  step,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  hint?: string;
  step?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">₹</span>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-7 font-semibold text-slate-900 tabular-nums outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>
      {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default function InlineTaxCalculator({ defaultSalary = 15_00_000 }: Props) {
  const [income, setIncome] = useState(defaultSalary);
  const [deductions, setDeductions] = useState(1_75_000);

  const r = useMemo(() => {
    const ded = Math.min(deductions, Math.max(0, income - TAX_RULES.old.standardDeduction));
    const n = computeTax(income, 'new');
    const o = computeTax(income, 'old', ded);
    return {
      n,
      o,
      handNew: inHand(income, 'new').monthly,
      handOld: inHand(income, 'old', ded).monthly,
    };
  }, [income, deductions]);

  const newBetter = r.n.total <= r.o.total;
  const diff = Math.abs(r.o.total - r.n.total);

  const tile = (name: string, tax: number, hand: number, best: boolean) => (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        best ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{name}</p>
        {best && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-brand-400">
            <Check className="h-3 w-3" /> Lower tax
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold tabular-nums text-slate-900">{inr(tax)}</p>
      <p className="mt-1 text-xs text-slate-500">In-hand ≈ {inr(hand)}/month</p>
    </div>
  );

  return (
    <div className="no-print rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">Quick tax check · {TAX_RULES.fy}</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setIncome(p)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                income === p
                  ? 'border-slate-900 bg-slate-900 text-brand-400'
                  : 'border-slate-200 text-slate-600 hover:border-brand-500'
              }`}
            >
              ₹{p / 1_00_000}L
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-2">
        <MoneyInput id="itc-income" label="Annual gross salary" value={income} onChange={setIncome} step={50_000} />
        <MoneyInput
          id="itc-deductions"
          label="Old-regime deductions"
          value={deductions}
          onChange={setDeductions}
          step={25_000}
          hint="80C, 80D, HRA exemption, home-loan interest, NPS. Standard deduction is added for you."
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {tile('New regime', r.n.total, r.handNew, newBetter)}
        {tile('Old regime', r.o.total, r.handOld, !newBetter)}
      </div>

      <p className="mt-4 rounded-lg bg-slate-900 px-4 py-3 text-center text-sm text-white" aria-live="polite">
        {diff === 0 ? (
          'Both regimes cost the same at these numbers.'
        ) : (
          <>
            {newBetter ? 'New' : 'Old'} regime saves you{' '}
            <strong className="text-brand-400">{inr(diff)}</strong> a year.
          </>
        )}
      </p>
    </div>
  );
}
