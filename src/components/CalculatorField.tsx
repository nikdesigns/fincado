'use client';

import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

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
  // Local state to handle string input (allows user to clear field)
  const [localVal, setLocalVal] = useState(value.toString());

  // Sync local state when parent value changes (e.g. from Slider or defaults)
  useEffect(() => {
    setLocalVal(value.toString());
  }, [value]);

  const handleInputChange = (strVal: string) => {
    setLocalVal(strVal);
    const num = parseFloat(strVal);
    // Only propagate if valid number
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  const handleBlur = () => {
    // Clamp on blur
    let num = parseFloat(localVal);
    if (isNaN(num)) num = min;
    if (num < min) num = min;
    if (num > max) num = max;
    setLocalVal(num.toString());
    onChange(num);
  };

  return (
    <div className="space-y-3 no-print">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-foreground">{label}</label>

        <div className="relative w-36">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              {prefix}
            </span>
          )}

          <Input
            type="number"
            value={localVal}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
            className={`text-right bg-background text-foreground ${
              prefix ? 'pl-7' : ''
            } ${suffix ? 'pr-7' : ''}`}
          />

          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              {suffix}
            </span>
          )}
        </div>
      </div>

      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        className="pt-1"
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>

      {quickSteps && (
        <div className="flex flex-wrap gap-2 pt-1">
          {quickSteps.map((s) => (
            <Button
              key={s}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange(Math.min(max, Math.max(min, value + s)))}
              className="text-xs h-7 px-2"
            >
              {s > 0 ? `+${s}` : s}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
