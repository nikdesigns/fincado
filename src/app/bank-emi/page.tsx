// src/app/bank-emi/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { banks } from '@/lib/banks';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import TaxUpdateBanner from '@/components/TaxUpdateBanner';
import AuthorBio from '@/components/AuthorBio';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Building2, Percent } from 'lucide-react';

export const dynamic = 'force-static';
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Bank EMI Calculator Comparison – Tax Year 2026-27 | Fincado',
  description:
    'Compare home loan EMI calculators across 21 top banks in India. Check live rate ranges and processing fees for Tax Year 2026-27.',
  alternates: {
    canonical: 'https://fincado.com/bank-emi/',
  },
  openGraph: {
    title: 'Bank EMI Calculator Comparison – Tax Year 2026-27 | Fincado',
    description:
      'Compare live home loan rates from SBI, HDFC, ICICI and 18 more banks. Updated for Tax Year 2026-27.',
    url: 'https://fincado.com/bank-emi/',
    type: 'website',
    siteName: 'Fincado',
  },
};

export default function BankEmiHubPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Banks', url: 'https://fincado.com/bank-emi/' },
        ]}
      />

      <header className="my-10">
        <Badge
          variant="secondary"
          className="mb-4 bg-[#F7FDF1] text-[#577A30] px-3 py-1 font-semibold uppercase tracking-wider"
        >
          Updated for Tax Year 2026-27
        </Badge>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-4">
          Bank EMI Calculator Comparison
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
          Compare home loan EMI calculators across 21 top Indian banks. Check
          live rate ranges and indicative pricing for Tax Year 2026-27.
        </p>
      </header>

      {/* Bank Grid */}
      <section className="mb-12">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Building2 className="h-5 w-5 text-[#577A30]" />
              Explore by Bank
            </CardTitle>
            <CardDescription>
              Choose a bank to view its dedicated EMI calculator and current
              interest rate range.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {banks.map((bank) => (
                <Link
                  key={bank.slug}
                  href={`/bank-emi/${bank.slug}/`}
                  className="group rounded-xl border border-slate-200 bg-white p-5 hover:border-[#B0EC70] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-900 group-hover:text-[#577A30] transition-colors">
                        {bank.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Indicative rate range
                      </p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-full group-hover:bg-[#EFFBE2] transition-colors">
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#577A30]" />
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#EFFBE2] text-[#577A30] px-3 py-1.5 text-sm font-semibold">
                    <Percent className="h-4 w-4" />
                    {bank.rate}% – {bank.maxRate}%
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How to use section */}
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 my-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          How to use this hub
        </h2>
        <ul className="text-sm text-slate-700 space-y-3 list-none pl-0 mb-6">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#577A30]"></div>
            Select a bank to open its dedicated EMI calculator page.
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#577A30]"></div>
            Compare indicative rate bands before shortlisting lenders.
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#577A30]"></div>
            Calculate your total interest outgo using the specific bank&apos;s
            formulas.
          </li>
        </ul>
        <TaxUpdateBanner />
        <div className="mt-6">
          <AuthorBio />
        </div>
      </section>
    </main>
  );
}
