import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  FileCheck2,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

export default function AuthorBio() {
  const currentDate = getCurrentMonthYearLabel();

  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://fincado.com/#research-team',
    name: 'Fincado Research Team',
    url: 'https://fincado.com/about/',
    parentOrganization: {
      '@id': 'https://fincado.com/#organization',
    },
    email: 'support@fincado.com',
    areaServed: 'IN',
    publishingPrinciples: 'https://fincado.com/editorial-guidelines/',
    knowsAbout: [
      'Personal finance in India',
      'Loan underwriting and EMI planning',
      'Income tax computation',
      'Investment risk and return tradeoffs',
    ],
  };

  return (
    <Card className="no-print mt-16 overflow-hidden border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
        />

        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="mx-auto shrink-0 md:mx-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-100 text-brand-700 shadow-xs">
              <Users className="h-8 w-8" />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="text-xl font-semibold tracking-tight text-slate-900">
                  Fincado Research Team
                </div>
                <Badge className="gap-1.5 border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand-700 hover:bg-brand-50">
                  <ShieldCheck className="h-3 w-3" />
                  Reviewed
                </Badge>
              </div>
            </div>

            <p className="mb-5 text-[15px] leading-relaxed text-slate-700">
              This content is prepared and reviewed using RBI circulars,
              official lender disclosures, and current Indian tax references.
              Numbers are educational estimates, not personalized advice.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <CalendarDays className="h-4 w-4 text-brand-700" />
                  Last Reviewed
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {currentDate}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <FileCheck2 className="h-4 w-4 text-brand-700" />
                  Method
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Source cross-check and periodic QA
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-800">
                <AlertTriangle className="h-4 w-4" />
                Risk Notice
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                Actual outcomes can vary by borrower profile, bank policy,
                market conditions, and future rule changes. Validate important
                decisions with a certified professional.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4">
              <Link
                href="/editorial-guidelines/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700 hover:text-brand-800"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Editorial Policy
              </Link>
              <Link
                href="/disclaimer/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700 hover:text-brand-800"
              >
                <Scale className="h-3.5 w-3.5" />
                Disclaimer
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700 hover:text-brand-800"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
