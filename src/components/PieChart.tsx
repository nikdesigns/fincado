'use client';
import React from 'react';

type PieChartProps = {
  principalPct: number;
  interestPct: number;
  size?: number;
};

export default function PieChart({
  principalPct,
  interestPct,
  size = 240,
}: PieChartProps) {
  // Calculate dimensions
  const strokeWidth = Math.round(size * 0.18); // Thick ring (18% of size)
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const interestLength = (interestPct / 100) * circumference;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        margin: '0 auto',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Principal vs Interest"
      >
        {/* 1. Base ring (Principal) - Pale Green */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f2fce9"
          strokeWidth={strokeWidth}
        />

        {/* 2. Interest Arc (Overlay) - Brand Green */}
        {/* Rotated -90deg so it starts at the top (12 o'clock) */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#a1e76f"
            strokeWidth={strokeWidth}
            strokeDasharray={`${interestLength} ${circumference}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </g>

        {/* 3. Center Hole (White background for text) */}
        <circle cx={cx} cy={cy} r={r * 0.52} fill="#ffffff" />

        {/* 4. Center Text Labels */}
        <text
          x={cx}
          y={cy - 5}
          textAnchor="middle"
          fontWeight={700}
          fontSize={size * 0.08} // Scales with size
          fill="#0f172a"
        >
          {principalPct}% / {interestPct}%
        </text>
        <text
          x={cx}
          y={cy + size * 0.07}
          textAnchor="middle"
          fontSize={size * 0.05} // Scales with size
          fill="#6b7280"
          fontWeight={500}
        >
          Principal / Interest
        </text>
      </svg>
    </div>
  );
}
