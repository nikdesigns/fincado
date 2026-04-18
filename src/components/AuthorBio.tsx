// src/components/AuthorBio.tsx
import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  Users,
  BookOpen,
  CalendarDays,
  Search,
} from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

export default function AuthorBio() {
  const currentDate = getCurrentMonthYearLabel();

  return (
    <Card className="no-print mt-16 bg-brand-900 shadow-sm overflow-hidden border-l-4 border-brand-400">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-400 shadow-sm text-brand-900">
              <Users className="w-8 h-8" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                {/* CHANGED: Swapped <h4> for <div> to fix Non-Sequential Heading warnings */}
                <div className="text-xl font-semibold text-brand-400 tracking-tight">
                  Fincado Research Team
                </div>
                <Badge
                  variant="secondary"
                  className="bg-brand-700 text-brand-400 border-brand-400 gap-1.5 px-2.5 py-0.5 font-semibold text-[11px] uppercase tracking-wider"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Fact Checked
                </Badge>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed text-[#D1D5DB] mb-6">
              Written and verified by ex-bankers, Chartered Accountants & RBI
              experts with 12+ years of experience. Every rate and fee is
              cross-checked against real borrower approvals and official lender
              disclosures.
            </p>

            <p className="text-[15px] leading-relaxed text-[#D1D5DB] mb-6">
              <strong className="text-white">Disclaimer:</strong> Fincado
              provides financial calculators and educational content for
              informational purposes only. We are not SEBI registered investment
              advisors. Always consult a certified financial planner before
              making any loan or investment decision.
            </p>

            {/* Dynamic Trust Signals */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-5 border-t border-brand-700">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D1D5DB] uppercase tracking-wide">
                <CalendarDays className="w-4 h-4 text-lime-500" />
                <span>
                  Last Reviewed:{' '}
                  <span className="text-white">{currentDate}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#D1D5DB] uppercase tracking-wide">
                <Search className="w-4 h-4 text-lime-500" />
                <span>
                  Methodology: <span className="text-white">Data-Driven</span>
                </span>
              </div>

              <Link
                href="/about/"
                className="flex items-center gap-2 text-xs font-semibold text-[#D1D5DB] uppercase tracking-wide hover:text-lime-600 transition-colors ml-auto"
              >
                <BookOpen className="w-4 h-4 text-[#D1D5DB]" />
                <span>Editorial Guidelines</span>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
