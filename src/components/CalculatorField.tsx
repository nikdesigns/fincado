'use client';

import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CalculatorFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  suffix?: string;
  prefix?: string;
  quickSteps?: number[];
}

export default function CalculatorField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
  prefix,
  quickSteps,
}: CalculatorFieldProps) {
  return (
    <div className="space-y-3 no-print">
      {/* LABEL + INPUT */}
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-slate-700">{label}</label>

        <div className="relative w-36">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              {prefix}
            </span>
          )}

          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`text-right ${prefix ? 'pl-7' : ''} ${
              suffix ? 'pr-7' : ''
            }`}
          />

          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              {suffix}
            </span>
          )}
        </div>
      </div>

      {/* SLIDER */}
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        className="pt-1"
      />

      {/* MIN / MAX */}
      <div className="flex justify-between text-xs text-slate-400">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>

      {/* QUICK STEPS (optional but powerful) */}
      {quickSteps && (
        <div className="flex flex-wrap gap-2 pt-1">
          {quickSteps.map((s) => (
            <Button
              key={s}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange(Math.min(max, Math.max(min, value + s)))}
              className="text-xs"
            >
              {s > 0 ? `+${s}` : s}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
