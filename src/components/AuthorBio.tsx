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

export default function AuthorBio() {
  return (
    <Card className="no-print mt-16 bg-[#1B2E06] shadow-sm overflow-hidden border-l-4 border-[#B0EC70]">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar / Brand Icon */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#B0EC70] shadow-sm text-[#1B2E06]">
              <Users className="w-8 h-8" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <h4 className="text-xl font-semibold text-[#B0EC70] tracking-tight">
                  Fincado Research Team
                </h4>
                <Badge
                  variant="secondary"
                  className="bg-[#577A30] text-[#B0EC70] border-[#B0EC70] gap-1.5 px-2.5 py-0.5 font-semibold text-[11px] uppercase tracking-wider"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Fact Checked
                </Badge>
              </div>
            </div>

            {/* Description */}
            <p className="text-[15px] leading-relaxed text-[#D1D5DB] mb-6">
              Our analysis is built on deep-dive research into{' '}
              <strong className="text-white">RBI Benchmarks</strong> and
              lender-specific disclosures. We verify every interest rate and fee
              structure against real-world borrower approvals to ensure the
              highest level of accuracy for Indian home buyers.
            </p>

            {/* Trust Signals Footer */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-5 border-t border-[#577A30]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D1D5DB] uppercase tracking-wide">
                <CalendarDays className="w-4 h-4 text-lime-500" />
                <span>
                  Verified: <span className="text-white">Feb 2026</span>
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
