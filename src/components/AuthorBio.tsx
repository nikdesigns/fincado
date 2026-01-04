// src/components/AuthorBio.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AuthorBio() {
  return (
    <Card className="no-print mt-10 border-slate-200 bg-white shadow-sm">
      <CardContent className="flex gap-5 p-6 sm:p-8">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
            👨‍💻
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Meta row */}
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700 font-semibold"
            >
              ✔ Fact Checked
            </Badge>

            <span className="text-slate-500">• Last Updated: Jan 2025</span>
          </div>

          {/* Author */}
          <h4 className="text-base font-semibold text-slate-900">
            Fincado Research Team
          </h4>

          {/* Description */}
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Our tools are built using the latest{' '}
            <strong className="font-semibold text-slate-800">
              RBI Guidelines
            </strong>{' '}
            and{' '}
            <strong className="font-semibold text-slate-800">
              Income Tax Act (FY 2024–25)
            </strong>
            . All calculations are reviewed by certified financial planners to
            ensure bank-grade accuracy and transparency.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
