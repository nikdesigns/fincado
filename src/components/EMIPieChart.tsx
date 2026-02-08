'use client';

import React from 'react';

export default function EMIPieChart({
  principalPct,
  interestPct,
  size = 200,
}: {
  principalPct: number;
  interestPct: number;
  size?: number;
}) {
  const strokeWidth = 24;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  const dash1 = (principalPct / 100) * circumference;
  const dash2 = (interestPct / 100) * circumference;
  const offset2 = -dash1;

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      <div style={{ width: size, height: size }} className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Principal (Slate/Grey) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#64748b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash1} ${circumference}`}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />

          {/* Interest (Lime/Green) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#84cc16"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash2} ${circumference}`}
            strokeDashoffset={offset2}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Interest
          </span>
          <span className="text-2xl font-bold text-lime-600">
            {interestPct}%
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-500" />
          <span className="text-xs font-medium text-slate-600">Principal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-lime-500" />
          <span className="text-xs font-medium text-slate-600">Interest</span>
        </div>
      </div>
    </div>
  );
}
