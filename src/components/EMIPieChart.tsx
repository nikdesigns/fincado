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

  // Clamp percentages to avoid drawing errors if logic fails elsewhere
  const safePrincipal = Math.max(0, principalPct);
  const safeInterest = Math.max(0, interestPct);

  const principalLength = (safePrincipal / 100) * circumference;
  const interestLength = (safeInterest / 100) * circumference;

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
        {/* Background ring (using 'muted' or 'secondary' color) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-muted" // Tailwind class for theme color
          strokeWidth={strokeWidth}
        />

        {/* Principal Segment (Brand Color/Primary) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="text-slate-50 stroke-current transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={`${principalLength} ${circumference}`}
          strokeLinecap="round"
        />

        {/* Interest Segment (Lighter Brand Color or Accent) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="text-lime-400 stroke-current transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={`${interestLength} ${circumference}`}
          strokeDashoffset={-principalLength}
          strokeLinecap="round"
        />
      </svg>

      {/* CENTER LABEL */}
      <div className="absolute text-center">
        <div className="text-xl sm:text-2xl font-bold text-foreground">
          {safePrincipal}% / {safeInterest}%
        </div>
        <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Principal / Interest
        </div>
      </div>
    </div>
  );
}
