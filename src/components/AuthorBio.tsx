// src/components/AuthorBio.tsx
import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Users, BookOpen, CalendarDays } from 'lucide-react';

export default function AuthorBio() {
  return (
    <Card className="no-print mt-12 border-slate-200 bg-slate-50/50 shadow-sm overflow-hidden">
      {/* Decorative Top Accent */}
      <div className="h-1.5 w-full bg-linear-to-r from-emerald-500 to-emerald-300" />

      <CardContent className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8">
        {/* Avatar / Icon */}
        <div className="shrink-0 flex justify-center sm:justify-start">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-emerald-600">
            <Users className="w-8 h-8" />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-center sm:text-left">
          {/* Header & Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-3">
            <h4 className="text-lg font-bold text-slate-900">
              Fincado Research Team
            </h4>
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 gap-1.5 px-2.5 py-0.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Fact Checked
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-600 mb-5 max-w-2xl mx-auto sm:mx-0">
            Our content is meticulously researched and built using the latest{' '}
            <strong className="font-semibold text-slate-900">
              RBI Guidelines
            </strong>{' '}
            and{' '}
            <strong className="font-semibold text-slate-900">
              Income Tax Act laws
            </strong>
            . All financial calculations are reviewed by certified experts to
            ensure bank-grade accuracy and transparency.
          </p>

          {/* Footer Metadata */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-xs font-medium text-slate-500 border-t border-slate-200/60 pt-4 mt-auto">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
              <span>
                Last Updated: <strong>Jan 2025</strong>
              </span>
            </div>

            {/* Optional: Add a link to an About or Editorial page if you have one */}
            <Link
              href="/about"
              className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>Editorial Guidelines</span>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
