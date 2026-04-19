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
import {
  ArrowRight,
  Building2,
  Gauge,
  Percent,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

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

type BankCategory = 'Bank' | 'HFC' | 'NBFC';

const CATEGORY_TONE: Record<BankCategory, string> = {
  Bank: 'border-blue-200 bg-blue-50 text-blue-700',
  HFC: 'border-violet-200 bg-violet-50 text-violet-700',
  NBFC: 'border-amber-200 bg-amber-50 text-amber-700',
};

export default function BankEmiHubPage() {
  const rankedBanks = [...banks]
    .sort((a, b) => a.rate - b.rate || a.maxRate - b.maxRate)
    .map((bank, index) => ({
      ...bank,
      rank: index + 1,
      corridor: Number((bank.maxRate - bank.rate).toFixed(2)),
      category: (bank.category ?? 'Bank') as BankCategory,
    }));

  const bestStart = rankedBanks[0];
  const narrowestCorridor = [...rankedBanks].sort(
    (a, b) => a.corridor - b.corridor,
  )[0];
  const averageStartRate = (
    rankedBanks.reduce((sum, bank) => sum + bank.rate, 0) / rankedBanks.length
  ).toFixed(2);

  const categoryCoverage = rankedBanks.reduce<Record<BankCategory, number>>(
    (acc, bank) => {
      acc[bank.category] += 1;
      return acc;
    },
    { Bank: 0, HFC: 0, NBFC: 0 },
  );

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Banks', url: 'https://fincado.com/bank-emi/' },
        ]}
      />

      <header className="my-10 space-y-6">
        <div className="overflow-hidden rounded-3xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-7 shadow-xl sm:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge className="border border-brand-300 bg-brand-500/20 px-3 py-1 text-[11px] font-semibold tracking-wider text-brand-200 uppercase">
              Updated for Tax Year 2026-27
            </Badge>
            <Badge className="border border-slate-500 bg-slate-800 px-3 py-1 text-[11px] font-semibold tracking-wider text-slate-200 uppercase">
              Rate Intelligence Desk
            </Badge>
          </div>

          <h1 className="max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Bank EMI Calculator Comparison
          </h1>

          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Benchmark lender-wise starting rates, upper bands, and corridor risk
            before you start documentation. This desk is designed for shortlisting,
            not generic browsing.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-600 bg-slate-800/70 p-4">
              <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                Best Starting Rate
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {bestStart.rate.toFixed(2)}%
              </p>
              <p className="text-xs text-slate-300">{bestStart.name}</p>
            </div>
            <div className="rounded-2xl border border-slate-600 bg-slate-800/70 p-4">
              <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                Average Start Rate
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {averageStartRate}%
              </p>
              <p className="text-xs text-slate-300">Across {rankedBanks.length} lenders</p>
            </div>
            <div className="rounded-2xl border border-slate-600 bg-slate-800/70 p-4">
              <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                Tightest Corridor
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {narrowestCorridor.corridor.toFixed(2)}%
              </p>
              <p className="text-xs text-slate-300">{narrowestCorridor.name}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-10 grid gap-4 lg:grid-cols-2">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <Building2 className="h-5 w-5 text-brand-700" />
              Coverage by Lender Type
            </CardTitle>
            <CardDescription>
              Evaluate lender mix before shortlisting to avoid one-type bias.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            {(
              [
                ['Bank', categoryCoverage.Bank],
                ['HFC', categoryCoverage.HFC],
                ['NBFC', categoryCoverage.NBFC],
              ] as Array<[BankCategory, number]>
            ).map(([label, count]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center"
              >
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {label}
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{count}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <ShieldCheck className="h-5 w-5 text-brand-700" />
              Selection Playbook
            </CardTitle>
            <CardDescription>
              Follow this sequence for cleaner lender decisions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-sm font-semibold text-slate-900">1. Shortlist by starting-rate band</p>
              <p className="mt-1 text-xs text-slate-600">
                Remove lenders that are materially above your target rate corridor.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-sm font-semibold text-slate-900">2. Audit corridor spread</p>
              <p className="mt-1 text-xs text-slate-600">
                Narrower spread usually means lower worst-case EMI drift.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-sm font-semibold text-slate-900">3. Validate on dedicated calculator page</p>
              <p className="mt-1 text-xs text-slate-600">
                Run EMI scenarios on the lender page before paying processing fees.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Card className="overflow-hidden border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-200 bg-slate-50">
            <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
              <Gauge className="h-5 w-5 text-brand-700" />
              Enterprise Lender Benchmark Grid
            </CardTitle>
            <CardDescription>
              Ranked by starting rate with corridor spread visibility for each lender.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {rankedBanks.map((bank) => (
                <Link
                  key={bank.slug}
                  href={`/bank-emi/${bank.slug}/`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-slate-900 px-2 text-xs font-semibold text-white">
                        #{bank.rank}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${CATEGORY_TONE[bank.category]}`}
                      >
                        {bank.category}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-brand-700" />
                  </div>

                  <p className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-brand-700">
                    {bank.name}
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-slate-50 p-2.5">
                      <p className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
                        Start
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {bank.rate.toFixed(2)}%
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2.5">
                      <p className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
                        Upper
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {bank.maxRate.toFixed(2)}%
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2.5">
                      <p className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
                        Corridor
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {bank.corridor.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-semibold text-brand-700">
                    <Percent className="h-3.5 w-3.5" />
                    Open Dedicated EMI Desk
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="my-10 space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <TaxUpdateBanner />
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-slate-900">
            <TrendingUp className="h-5 w-5 text-brand-700" />
            How to use this desk effectively
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            Start with lenders in your preferred starting-rate band, then inspect
            corridor spread and underwriting fit on the bank page. Finalize only
            after stress-testing EMI at both base and upper-band rates.
          </p>
        </div>
        <AuthorBio />
      </section>
    </main>
  );
}
