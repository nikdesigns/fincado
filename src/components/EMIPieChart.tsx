'use client';

import React from 'react';

interface EMIPieChartProps {
  principalPct: number;
  interestPct: number;
  size?: number;
}

export default function EMIPieChart({
  principalPct,
  interestPct,
  size = 220,
}: EMIPieChartProps) {
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const principalLength = (principalPct / 100) * circumference;
  const interestLength = (interestPct / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-label="Principal vs Interest chart"
        role="img"
      >
        {/* Base ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#9ae600"
          strokeWidth={strokeWidth}
        />

        {/* Principal */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f8fee7"
          strokeWidth={strokeWidth}
          strokeDasharray={`${principalLength} ${circumference}`}
          strokeLinecap="round"
        />

        {/* Interest */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#9ae600"
          strokeWidth={strokeWidth}
          strokeDasharray={`${interestLength} ${circumference}`}
          strokeDashoffset={-principalLength}
          strokeLinecap="round"
        />
      </svg>

      {/* CENTER LABEL */}
      <div className="absolute text-center">
        <div className="text-xl sm:text-2xl font-bold text-slate-900">
          {principalPct}% / {interestPct}%
        </div>
        <div className="mt-1 text-xs sm:text-sm text-slate-500">
          Principal / Interest
        </div>
      </div>
    </div>
  );
}
