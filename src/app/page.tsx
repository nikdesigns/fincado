import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  ChevronRight,
  IndianRupee,
  Scale,
  ShieldCheck,
  TrendingDown,
  Users,
  Zap,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Clock,
} from 'lucide-react';
import { banks } from '@/lib/banks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

export const metadata: Metadata = {
  title: 'Compare Home Loan Rates from 25+ Banks | EMI Calculator | Fincado',
  description:
    'Compare home loan interest rates from 25+ Indian banks and NBFCs side-by-side. Model EMI impact, analyse rate gaps, and make a data-backed borrowing decision. Updated for 2026.',
  alternates: {
    canonical: 'https://fincado.com/',
  },
  openGraph: {
    title: 'Compare Home Loan Rates from 25+ Banks | Fincado',
    description:
      "India's most transparent home loan research tool. Compare lenders, model EMI scenarios, and save lakhs over your tenure.",
    url: 'https://fincado.com/',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fincado — Compare Home Loan Rates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Home Loan Rates from 25+ Banks | Fincado',
    description:
      "India's most transparent home loan research tool. Compare lenders, model EMI scenarios, and save lakhs.",
    images: ['/og-image.png'],
  },
};

export default function HomePage() {
  const monthYear = getCurrentMonthYearLabel();
  const sortedBanks = [...banks].sort((a, b) => a.rate - b.rate);
  const lowestRate = sortedBanks[0].rate;
  const topFiveBanks = sortedBanks.slice(0, 5);

  const featuredPairs: Array<{ b1: (typeof banks)[0]; b2: (typeof banks)[0] }> =
    [
      { b1: sortedBanks[0], b2: sortedBanks[1] },
      { b1: sortedBanks[0], b2: sortedBanks[2] },
      { b1: sortedBanks[1], b2: sortedBanks[2] },
      { b1: sortedBanks[0], b2: sortedBanks[3] },
    ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">

      {/* ═══════════════════════════════════════════
          HERO — split layout with live rate preview
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Background glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-125 w-125 rounded-full bg-brand-600/20 blur-[120px]" />
          <div className="absolute -bottom-32 right-0 h-100 w-100 rounded-full bg-brand-500/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 h-150 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-brand-500/10 to-transparent" />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

            {/* Left: headline + CTAs */}
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
                </span>
                Rates updated — {monthYear}
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find India&apos;s{' '}
                <span className="relative">
                  <span className="text-brand-400">best home loan</span>
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 300 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 5.5C60 2 120 1 180 3.5C240 6 270 7 299 5"
                      stroke="#92c65b"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                rate. No guesswork.
              </h1>

              <p className="mb-4 text-lg leading-relaxed text-slate-300 sm:text-xl">
                Compare rates from{' '}
                <strong className="font-semibold text-white">
                  {banks.length}+ lenders
                </strong>{' '}
                side-by-side. Model EMI impact. Save lakhs over your tenure.
              </p>

              <p className="mb-8 text-base text-slate-400">
                Market-low starting from{' '}
                <span className="rounded-md bg-brand-500/20 px-2 py-0.5 font-bold text-brand-300">
                  {lowestRate}% p.a.
                </span>
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-brand-500 px-6 text-slate-950 font-semibold hover:bg-brand-400 shadow-lg shadow-brand-500/25 transition-all"
                >
                  <Link href="/compare-loans/">
                    <Scale className="mr-2 h-5 w-5" />
                    Compare All Banks
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-slate-700 bg-white/5 px-6 text-white backdrop-blur-sm hover:bg-white/10 hover:border-slate-600"
                >
                  <Link href="/emi-calculator/">
                    <Calculator className="mr-2 h-5 w-5" />
                    EMI Calculator
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                {['No sign-up required', 'Updated monthly', 'Free to use'].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-500" />
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Right: live rate preview card */}
            <div className="w-full">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Current Home Loan Rates
                    </p>
                    <p className="text-xs text-slate-500">
                      Indicative starting rates — {monthYear}
                    </p>
                  </div>
                  <Badge className="border-brand-500/40 bg-brand-500/15 text-brand-300 text-xs">
                    Live
                  </Badge>
                </div>

                <div className="divide-y divide-slate-800/60">
                  {topFiveBanks.map((bank, i) => {
                    const isLowest = i === 0;
                    return (
                      <Link
                        key={bank.slug}
                        href={`/bank-emi/${bank.slug}/`}
                        className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-slate-800/50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-400">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {bank.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              up to {bank.maxRate}%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-base font-bold ${isLowest ? 'text-brand-400' : 'text-white'}`}
                          >
                            {bank.rate}%
                          </span>
                          {isLowest && (
                            <span className="rounded-full bg-brand-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-300">
                              Lowest
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-slate-800 px-5 py-3">
                  <Link
                    href="/bank-emi/"
                    className="flex items-center justify-center gap-1.5 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    View all {banks.length} lenders
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-slate-600">
                Rates are indicative. Actual offer depends on credit profile &
                income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST BAR — floating stat cards
          ═══════════════════════════════════════════ */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-slate-100 sm:grid-cols-4">
            {[
              {
                label: 'Lenders tracked',
                value: `${banks.length}+`,
                icon: ShieldCheck,
              },
              {
                label: 'Lowest rate now',
                value: `${lowestRate}%`,
                icon: TrendingDown,
              },
              {
                label: 'Avg. savings found',
                value: '₹4.2L',
                icon: IndianRupee,
              },
              { label: 'Data freshness', value: 'Monthly', icon: Zap },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-6 py-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <stat.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-lg font-bold leading-none text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          RATE TABLE — the product, front and centre
          ═══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
                Live data
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                Home Loan Rate Benchmark
              </h2>
              <p className="mt-2 text-slate-500">
                All lenders ranked by starting rate — {monthYear}
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 border-slate-300">
              <Link href="/compare-loans/">
                Compare Any Two Banks{' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-3.5 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-5 py-3.5 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider">
                      Lender
                    </th>
                    <th className="px-5 py-3.5 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider">
                      Starting Rate
                    </th>
                    <th className="hidden px-5 py-3.5 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider sm:table-cell">
                      Max Rate
                    </th>
                    <th className="hidden px-5 py-3.5 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider md:table-cell">
                      Rate Band
                    </th>
                    <th className="px-5 py-3.5 text-right font-semibold text-slate-500 text-xs uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedBanks.map((bank, i) => {
                    const isLowest = i === 0;
                    const rateSpread = bank.maxRate - bank.rate;
                    const globalMin = sortedBanks[0].rate;
                    const globalMax = Math.max(
                      ...sortedBanks.map((b) => b.maxRate),
                    );
                    const barFill =
                      ((bank.rate - globalMin) / (globalMax - globalMin)) * 100;
                    const barWidth =
                      (rateSpread / (globalMax - globalMin)) * 100;

                    return (
                      <tr
                        key={bank.slug}
                        className={`group transition-colors hover:bg-slate-50 ${isLowest ? 'bg-brand-50/40' : ''}`}
                      >
                        <td className="px-5 py-4 text-slate-400 font-medium">
                          {i + 1}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">
                              {bank.name}
                            </span>
                            {isLowest && (
                              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                                Lowest
                              </span>
                            )}
                            {bank.category && (
                              <span className="hidden rounded px-1.5 py-0.5 text-[10px] font-medium text-slate-400 ring-1 ring-slate-200 sm:inline">
                                {bank.category}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`text-base font-bold ${isLowest ? 'text-brand-600' : 'text-slate-900'}`}
                          >
                            {bank.rate}%
                          </span>
                        </td>
                        <td className="hidden px-5 py-4 text-slate-500 sm:table-cell">
                          {bank.maxRate}%
                        </td>
                        <td className="hidden px-5 py-4 md:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="relative h-1.5 w-32 rounded-full bg-slate-200">
                              <div
                                className="absolute top-0 h-1.5 rounded-full bg-brand-400"
                                style={{
                                  left: `${barFill}%`,
                                  width: `${Math.max(barWidth, 8)}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs text-slate-400">
                              {bank.rate}–{bank.maxRate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            href={`/bank-emi/${bank.slug}/`}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:border-brand-300 hover:text-brand-700 group-hover:shadow"
                          >
                            Details
                            <ChevronRight className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-400">
              Rates are indicative starting rates. Actual offer depends on
              credit score, LTV ratio, income, and lender policy. Updated{' '}
              {monthYear}.
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — 3 steps
          ═══════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
              The process
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Make a smarter borrowing decision in 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                step: '01',
                icon: BarChart3,
                title: 'Benchmark rates',
                desc: 'See live starting rates from 25+ lenders in one place — sorted, ranked, and easy to compare.',
                href: '/bank-emi/',
                cta: 'View rate table',
              },
              {
                step: '02',
                icon: Calculator,
                title: 'Model your EMI',
                desc: 'Enter your loan amount, tenure, and rate. See exactly how a 0.25% difference impacts total repayment.',
                href: '/loans/home-loan/',
                cta: 'Open EMI calculator',
              },
              {
                step: '03',
                icon: Scale,
                title: 'Compare head-to-head',
                desc: 'Pick any two lenders and get a full side-by-side: rate gap, lifetime saving, fees, and borrower fit.',
                href: '/compare-loans/',
                cta: 'Compare banks',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md"
              >
                <div className="absolute -top-4 -right-4 text-[80px] font-black text-slate-50 select-none leading-none">
                  {item.step}
                </div>
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-brand-400 shadow-md transition-transform group-hover:scale-105">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    {item.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          POPULAR COMPARISONS
          ═══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
                Head-to-head
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                Popular lender matchups
              </h2>
              <p className="mt-2 text-slate-500">
                The most-researched rate comparisons this month.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 border-slate-300">
              <Link href="/compare-loans/">
                All matchups <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featuredPairs.map(({ b1, b2 }) => {
              const slug = [b1.slug, b2.slug].sort().join('-vs-');
              const rateDiff = Math.abs(b1.rate - b2.rate).toFixed(2);
              const lower = b1.rate <= b2.rate ? b1 : b2;
              const higher = b1.rate <= b2.rate ? b2 : b1;
              return (
                <Link
                  key={slug}
                  href={`/compare/${slug}/`}
                  className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-center">
                      <p className="text-xs font-medium text-slate-500">
                        {lower.name}
                      </p>
                      <p className="text-xl font-bold text-brand-600">
                        {lower.rate}%
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Scale className="h-4 w-4 text-slate-300" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        vs
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-slate-500">
                        {higher.name}
                      </p>
                      <p className="text-xl font-bold text-slate-700">
                        {higher.rate}%
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-center">
                    <p className="text-xs text-slate-500">Rate gap</p>
                    <p className="text-sm font-bold text-slate-900">
                      {rateDiff}% &mdash;{' '}
                      <span className="font-normal text-slate-500">
                        {lower.name} leads
                      </span>
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-600 opacity-0 transition-all group-hover:opacity-100">
                    Full comparison <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY FINCADO — trust / differentiation
          ═══════════════════════════════════════════ */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-400">
                Why Fincado
              </p>
              <h2 className="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl">
                Data-first. No hidden agendas.{' '}
                <span className="text-brand-400">Just numbers.</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-400">
                We don't sell loans. We research them. Our only job is to make
                sure you walk into a bank negotiation with better data than the
                bank has.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: ShieldCheck,
                    title: 'No affiliate bias',
                    desc: 'We earn from ads, not loan referrals. Every ranking is based purely on rate data.',
                  },
                  {
                    icon: Clock,
                    title: 'Updated regularly',
                    desc: 'Rates are reviewed every month so you never rely on stale benchmarks.',
                  },
                  {
                    icon: Users,
                    title: 'Built for Indian borrowers',
                    desc: 'PSU vs private, MCLR vs EBLR, floating vs fixed — we cover the nuances that matter in India.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
                      <item.icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm leading-relaxed text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  stat: `${banks.length}+`,
                  label: 'Lenders in database',
                  sub: 'Banks, HFCs & NBFCs',
                },
                {
                  stat: '₹4.2L',
                  label: 'Avg. savings identified',
                  sub: 'On a ₹50L / 20Y example',
                },
                {
                  stat: '45+',
                  label: 'Comparison pairs',
                  sub: 'Full head-to-head analysis',
                },
                {
                  stat: 'Free',
                  label: 'Always free to use',
                  sub: 'No registration needed',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                >
                  <p className="text-3xl font-bold text-brand-400">
                    {item.stat}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GUIDES + NAV WIDGET
          ═══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-600">
                Research library
              </p>
              <h2 className="mb-8 text-3xl font-bold text-slate-900">
                Expert guides for every stage
              </h2>
              <div className="space-y-3">
                {[
                  {
                    title: 'First-Time Home Buyer Checklist',
                    desc: 'From site visit to final disbursal — avoid every common trap.',
                    href: '/guides/home-loan-first-time-buyers/',
                    tag: 'Guide',
                  },
                  {
                    title: 'The Ultimate Home Loan Guide',
                    desc: 'MCLR vs EBLR, reset periods, spread mechanics — all decoded.',
                    href: '/guides/home-loan-guide/',
                    tag: 'Deep dive',
                  },
                  {
                    title: 'How Credit Score Affects Your Rate',
                    desc: 'Every 50-point CIBIL improvement can save you 0.25–0.5% on your rate.',
                    href: '/credit-score/',
                    tag: 'Tool',
                  },
                  {
                    title: 'Personal Loan Rate Guide',
                    desc: 'Bank vs NBFC rates, flat vs reducing interest, and negotiation tips.',
                    href: '/guides/personal-loan-interest-rates/',
                    tag: 'Guide',
                  },
                ].map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-300 hover:bg-brand-50/20 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-brand-100 group-hover:text-brand-600">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 group-hover:text-brand-800">
                            {guide.title}
                          </span>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                            {guide.tag}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-slate-500">
                          {guide.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-brand-500" />
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/guides/"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Browse all guides <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <aside className="lg:col-span-5">
              <div className="sticky top-24">
                <FinancialNavWidget />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CLOSING CTA
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-600 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-brand-500/40 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-brand-700/60 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Don&apos;t accept the first rate you&apos;re offered.
          </h2>
          <p className="mb-8 text-lg text-brand-100">
            Most borrowers never negotiate. The ones who do — and use
            data to back their ask — consistently get better terms.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 bg-slate-950 px-8 font-semibold text-white hover:bg-slate-900 shadow-lg"
            >
              <Link href="/compare-loans/">
                <Scale className="mr-2 h-5 w-5" />
                Start comparing banks
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-brand-400/60 bg-white/10 px-8 font-semibold text-white backdrop-blur-sm hover:bg-white/20 hover:border-brand-300"
            >
              <Link href="/emi-calculator/">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate EMI
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
