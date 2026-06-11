import type { Metadata } from 'next';
import Image from 'next/image';
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
  BarChart3,
  Clock,
  Percent,
} from 'lucide-react';
import { banks } from '@/lib/banks';
import { BANK_LOGOS } from '@/lib/bankLogos';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import GuidesShowcase from '@/components/GuidesShowcase';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

export const metadata: Metadata = {
  title: 'Compare Home Loan Rates from 25+ Banks | EMI Calculator | Fincado',
  description:
    'Compare home loan interest rates from 25+ Indian banks and NBFCs side-by-side. Model EMI impact, analyse rate gaps, and make a data-backed borrowing decision. Updated for 2026.',
  alternates: { canonical: 'https://fincado.com/' },
  openGraph: {
    title: 'Compare Home Loan Rates from 25+ Banks | Fincado',
    description:
      "India's most transparent home loan research tool. Compare lenders, model EMI scenarios, and save lakhs over your tenure.",
    url: 'https://fincado.com/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fincado — Compare Home Loan Rates' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Home Loan Rates from 25+ Banks | Fincado',
    description: "India's most transparent home loan research tool. Compare lenders, model EMI scenarios, and save lakhs.",
    images: ['/og-image.png'],
  },
};

const CALCULATOR_TOOLS = [
  { label: 'EMI Calculator',     href: '/emi-calculator/',        icon: '/images/icons/emi.svg',        desc: 'Know your exact monthly repayment & total interest.',       iconBg: 'bg-brand-500/20',   badge: 'Popular' },
  { label: 'SIP Calculator',     href: '/sip-calculator/',        icon: '/images/icons/sip.svg',        desc: 'Project long-horizon wealth from monthly investments.',     iconBg: 'bg-amber-500/20',   badge: 'Popular' },
  { label: 'FD Calculator',      href: '/fd-calculator/',         icon: '/images/icons/fd.svg',         desc: 'Estimate FD maturity with compound interest breakdown.',    iconBg: 'bg-orange-500/20'               },
  { label: 'Income Tax',         href: '/income-tax-calculator/', icon: '/images/icons/tax.svg',        desc: 'Compare old vs new regime impact on your take-home pay.',   iconBg: 'bg-rose-500/20'                 },
  { label: 'PPF Calculator',     href: '/ppf-calculator/',        icon: '/images/icons/ppf.svg',        desc: 'Track tax-free maturity of 15-year PPF contributions.',     iconBg: 'bg-amber-500/20'                },
  { label: 'Home Loan EMI',      href: '/loans/home-loan/',       icon: '/images/icons/home-loan.svg',  desc: 'Model affordability and tenure before you apply.',          iconBg: 'bg-brand-500/20'                },
  { label: 'SWP Calculator',     href: '/swp-calculator/',        icon: '/images/icons/swp.svg',        desc: 'Plan systematic withdrawals to generate regular income.',   iconBg: 'bg-orange-500/20'               },
  { label: 'Retirement Planner', href: '/retirement-calculator/', icon: '/images/icons/retirement.svg', desc: 'Calculate the corpus you need to retire comfortably.',      iconBg: 'bg-pink-500/20'                 },
];


export default function HomePage() {
  const monthYear   = getCurrentMonthYearLabel();
  const sortedBanks = [...banks].sort((a, b) => a.rate - b.rate);
  const lowestRate  = sortedBanks[0].rate;
  const topFiveBanks = sortedBanks.slice(0, 5);
  const topSixBanks  = sortedBanks.slice(0, 6);

  const featuredPairs = [
    { b1: sortedBanks[0], b2: sortedBanks[1] },
    { b1: sortedBanks[0], b2: sortedBanks[2] },
    { b1: sortedBanks[1], b2: sortedBanks[2] },
    { b1: sortedBanks[0], b2: sortedBanks[3] },
  ];

  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://fincado.com/#webpage',
    url: 'https://fincado.com/',
    name: 'Compare Home Loan Rates from 25+ Banks | Fincado',
    description: 'Compare home loan interest rates from 25+ Indian banks and NBFCs side-by-side. Model EMI impact, analyse rate gaps, and make a data-backed borrowing decision.',
    inLanguage: 'en-IN',
    isPartOf: { '@id': 'https://fincado.com/#website' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fincado.com/' }],
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />

      {/* ══════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-125 w-125 rounded-full bg-brand-500/8 blur-[140px]" />
          <div className="absolute -bottom-32 right-0 h-100 w-100 rounded-full bg-brand-400/6 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

            {/* Left */}
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                </span>
                Rates updated — {monthYear}
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Find India&apos;s{' '}
                <span className="relative">
                  <span className="text-brand-600">best home loan</span>
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none" aria-hidden="true">
                    <path d="M1 5.5C60 2 120 1 180 3.5C240 6 270 7 299 5" stroke="#92c65b" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>{' '}
                rate. No guesswork.
              </h1>

              <p className="mb-4 text-lg leading-relaxed text-slate-600">
                Compare rates from{' '}
                <strong className="font-semibold text-slate-900">{banks.length}+ lenders</strong>{' '}
                side-by-side. Model EMI impact. Save lakhs over your tenure.
              </p>
              <p className="mb-8 text-base text-slate-500">
                Market-low starting from{' '}
                <span className="rounded-md bg-brand-100 px-2 py-0.5 font-bold text-brand-700">
                  {lowestRate}% p.a.
                </span>
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 bg-brand-600 px-6 font-semibold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700">
                  <Link href="/compare-loans/"><Scale className="mr-2 h-5 w-5" />Compare All Banks</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-slate-300 px-6 text-slate-700 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700">
                  <Link href="/emi-calculator/"><Calculator className="mr-2 h-5 w-5" />EMI Calculator</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                {['No sign-up required', 'Updated monthly', 'Free to use'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-500" />{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — live rates card */}
            <div className="w-full">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Current Home Loan Rates</p>
                    <p className="text-xs text-slate-500">Indicative starting rates — {monthYear}</p>
                  </div>
                  <Badge className="border-brand-200 bg-brand-100 text-xs text-brand-700">Live</Badge>
                </div>

                <div className="divide-y divide-slate-100">
                  {topFiveBanks.map((bank, i) => {
                    const isLowest = i === 0;
                    const logo = BANK_LOGOS[bank.slug];
                    return (
                      <Link key={bank.slug} href={`/bank-emi/${bank.slug}/`}
                        className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${isLowest ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'}`}>
                            {i + 1}
                          </span>
                          {logo ? (
                            <Image src={logo} alt={bank.name} width={28} height={28} className="rounded-sm object-contain" />
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-slate-100 text-[9px] font-bold text-slate-600">
                              {bank.name.slice(0, 3).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{bank.name}</p>
                            <p className="text-[11px] text-slate-400">up to {bank.maxRate}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-base font-bold ${isLowest ? 'text-brand-600' : 'text-slate-800'}`}>
                            {bank.rate}%
                          </span>
                          {isLowest && (
                            <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                              Lowest
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-slate-100 px-5 py-3">
                  <Link href="/bank-emi/" className="flex items-center justify-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
                    View all {banks.length} lenders <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-slate-500">
                Rates are indicative. Actual offer depends on credit profile & income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRUST BAR
          ══════════════════════════════════════════════════════ */}
      <div className="border-y border-brand-200 bg-brand-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-brand-200 sm:grid-cols-4">
            {[
              { label: 'Lenders tracked',   value: `${banks.length}+`, icon: ShieldCheck  },
              { label: 'Lowest rate now',   value: `${lowestRate}%`,   icon: TrendingDown },
              { label: 'Avg. savings found',value: '₹4.2L',            icon: IndianRupee  },
              { label: 'Data freshness',    value: 'Monthly',          icon: Zap          },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 px-6 py-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <s.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-lg font-bold leading-none text-brand-800">{s.value}</p>
                  <p className="mt-0.5 text-xs text-brand-600">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          COMPACT RATE LEADERBOARD
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-600">Live data</p>
              <h2 className="text-2xl font-bold text-slate-900">Rate Leaderboard</h2>
              <p className="mt-1 text-sm text-slate-500">Top 6 lenders by starting rate — {monthYear}</p>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0 border-slate-300 text-xs">
              <Link href="/bank-emi/">All {banks.length} lenders <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topSixBanks.map((bank, i) => {
              const isLowest = i === 0;
              const logo = BANK_LOGOS[bank.slug];
              const slug = [sortedBanks[0].slug, bank.slug].sort().join('-vs-');
              return (
                <div key={bank.slug}
                  className={`group relative flex items-center justify-between rounded-xl border p-4 transition-all hover:shadow-md ${isLowest ? 'border-brand-200 bg-brand-50/60' : 'border-slate-200 bg-white hover:border-brand-200'}`}>
                  {isLowest && (
                    <div className="absolute -top-2.5 left-4 rounded-full border border-brand-200 bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                      Market Low
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isLowest ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {i + 1}
                    </span>
                    {logo ? (
                      <Image src={logo} alt={bank.name} width={32} height={32} className="rounded object-contain" />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-[9px] font-bold tracking-tighter text-slate-600">
                        {bank.name.slice(0, 4).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{bank.name}</p>
                      <p className="text-xs text-slate-400">{bank.rate}–{bank.maxRate}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-black ${isLowest ? 'text-brand-600' : 'text-slate-900'}`}>
                      {bank.rate}%
                    </span>
                    {i > 0 && (
                      <Link href={`/compare/${slug}/`}
                        className="hidden items-center gap-0.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-600 shadow-sm transition-all hover:border-brand-300 hover:text-brand-700 group-hover:flex">
                        vs #{1} <ChevronRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-center text-xs text-slate-400">
            Rates are indicative. Actual offer varies by credit score, LTV, income, and lender policy.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CALCULATOR TOOLS — DARK FEATURE SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="bg-brand-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-600">Free tools</p>
              <h2 className="text-3xl font-bold text-slate-900">Popular Calculators</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
                Every calculator you need — from EMI to retirement — built for India.
              </p>
            </div>
            <Button asChild variant="outline" size="sm"
              className="shrink-0 border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-700">
              <Link href="/calculators/">View all tools <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
            </Button>
          </div>

          {/* 2×4 card grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {CALCULATOR_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/10"
              >
                {/* badge */}
                {tool.badge && (
                  <span className="absolute top-4 right-4 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700 ring-1 ring-brand-200">
                    {tool.badge}
                  </span>
                )}

                {/* icon */}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${tool.iconBg} transition-transform duration-200 group-hover:scale-110`}>
                  <Image src={tool.icon} alt={tool.label} width={26} height={26} className="object-contain" />
                </div>

                {/* text */}
                <p className="mb-1.5 text-sm font-bold leading-snug text-slate-900">{tool.label}</p>
                <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{tool.desc}</p>

                {/* CTA arrow */}
                <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 opacity-0 transition-all duration-200 group-hover:opacity-100">
                  Calculate <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-600">The process</p>
            <h2 className="text-3xl font-bold text-slate-900">Make a smarter decision in 3 steps</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { step: '01', icon: BarChart3, title: 'Benchmark rates',      desc: 'See starting rates from 25+ lenders sorted and ranked in one place.',                               href: '/bank-emi/',      cta: 'View rate table'     },
              { step: '02', icon: Calculator, title: 'Model your EMI',       desc: 'Enter your amount, tenure, and rate. See how 0.25% changes total repayment.',                       href: '/loans/home-loan/', cta: 'Open EMI calculator' },
              { step: '03', icon: Scale,      title: 'Compare head-to-head', desc: 'Pick any two lenders — get rate gap, lifetime saving, fees, and borrower fit.',                   href: '/compare-loans/',  cta: 'Compare banks'       },
            ].map((item) => (
              <div key={item.step} className="group relative overflow-hidden rounded-2xl bg-slate-50 p-8 ring-1 ring-slate-200 transition-shadow hover:shadow-md">
                <div className="absolute -top-4 -right-4 select-none text-[80px] font-black leading-none text-slate-100">
                  {item.step}
                </div>
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 shadow-sm transition-transform group-hover:scale-105">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  <Link href={item.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700">
                    {item.cta} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          POPULAR COMPARISONS
          ══════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-600">Head-to-head</p>
              <h2 className="text-3xl font-bold text-slate-900">Popular lender matchups</h2>
              <p className="mt-2 text-sm text-slate-500">The most-researched rate comparisons this month.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0 border-slate-300">
              <Link href="/compare-loans/">All matchups <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featuredPairs.map(({ b1, b2 }) => {
              const slug     = [b1.slug, b2.slug].sort().join('-vs-');
              const rateDiff = Math.abs(b1.rate - b2.rate).toFixed(2);
              const lower    = b1.rate <= b2.rate ? b1 : b2;
              const higher   = b1.rate <= b2.rate ? b2 : b1;
              return (
                <Link key={slug} href={`/compare/${slug}/`}
                  className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand-300 hover:shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-center">
                      <p className="text-xs font-medium text-slate-500">{lower.name}</p>
                      <p className="text-xl font-bold text-brand-600">{lower.rate}%</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Scale className="h-4 w-4 text-slate-300" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">vs</span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-slate-500">{higher.name}</p>
                      <p className="text-xl font-bold text-slate-700">{higher.rate}%</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-center">
                    <p className="text-xs text-slate-500">Rate gap</p>
                    <p className="text-sm font-bold text-slate-900">
                      {rateDiff}% &mdash;{' '}
                      <span className="font-normal text-slate-500">{lower.name} leads</span>
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

      {/* ══════════════════════════════════════════════════════
          GUIDES — editorial image cards
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-600">Research library</p>
              <h2 className="text-3xl font-bold text-slate-900">Expert guides for every stage</h2>
            </div>
            <Button asChild variant="ghost" className="text-brand-600 hover:text-brand-700">
              <Link href="/guides/">Browse all guides <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <GuidesShowcase />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY FINCADO
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-600">Why Fincado</p>
              <h2 className="mb-6 text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
                Data-first. No hidden agendas.{' '}
                <span className="text-brand-600">Just numbers.</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                We don&apos;t sell loans. We research them. Our only job is to make sure you walk into a bank
                negotiation with better data than the bank has.
              </p>
              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, title: 'No affiliate bias',        desc: 'We earn from ads, not loan referrals. Every ranking is based purely on rate data.'            },
                  { icon: Clock,       title: 'Updated regularly',         desc: 'Rates are reviewed every month so you never rely on stale benchmarks.'                       },
                  { icon: Users,       title: 'Built for Indian borrowers', desc: 'PSU vs private, MCLR vs EBLR, floating vs fixed — we cover the nuances that matter in India.'},
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                      <item.icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid with image */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative h-52">
                  <Image
                    src="/images/guides/home-loan/happy-couple-new-home.webp"
                    alt="Happy family with new home"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/65 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-lg font-bold text-white">Make your best financial decision</p>
                    <p className="text-sm text-slate-200">Backed by data, not sales pitches.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: `${banks.length}+`, label: 'Lenders in database',   sub: 'Banks, HFCs & NBFCs'         },
                  { stat: '₹4.2L',            label: 'Avg. savings identified', sub: 'On a ₹50L / 20Y example'  },
                  { stat: '45+',              label: 'Comparison pairs',        sub: 'Full head-to-head analysis' },
                  { stat: 'Free',             label: 'Always free to use',      sub: 'No registration needed'    },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-3xl font-bold text-brand-600">{item.stat}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TOOLS & NAV WIDGET
          ══════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">

            {/* Left — category showcase */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-600">Quick access</p>
                <h2 className="mb-2 text-2xl font-bold text-slate-900">All financial tools</h2>
                <p className="text-slate-500 leading-relaxed">
                  Every calculator you need for loans, tax, investments, and retirement — free, no sign-up.
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '25+', label: 'Calculators' },
                  { value: '30+', label: 'Guides'       },
                  { value: '100%', label: 'Free to use' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
                    <p className="text-2xl font-black text-brand-600">{s.value}</p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Category cards 2×2 */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: Scale,
                    title: 'Loans & EMI',
                    count: 6,
                    color: 'bg-brand-50 text-brand-700',
                    iconBg: 'bg-brand-500/15',
                    examples: ['Home Loan EMI', 'Personal Loan', 'Car Loan'],
                    href: '/loans/',
                  },
                  {
                    icon: TrendingDown,
                    title: 'Investments',
                    count: 11,
                    color: 'bg-violet-50 text-violet-700',
                    iconBg: 'bg-violet-500/15',
                    examples: ['SIP Calculator', 'FD Calculator', 'ELSS / PPF'],
                    href: '/calculators/',
                  },
                  {
                    icon: IndianRupee,
                    title: 'Tax Planning',
                    count: 6,
                    color: 'bg-orange-50 text-orange-700',
                    iconBg: 'bg-orange-500/15',
                    examples: ['Income Tax', 'Capital Gains', 'HRA / GST'],
                    href: '/income-tax-calculator/',
                  },
                  {
                    icon: Users,
                    title: 'Retirement',
                    count: 8,
                    color: 'bg-amber-50 text-amber-700',
                    iconBg: 'bg-amber-500/15',
                    examples: ['EPF / NPS', 'Retirement Plan', 'FIRE Calculator'],
                    href: '/retirement-calculator/',
                  },
                ].map((cat) => (
                  <Link
                    key={cat.title}
                    href={cat.href}
                    className={`group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${cat.iconBg}`}>
                        <cat.icon className={`h-4.5 w-4.5 ${cat.color.split(' ')[1]}`} />
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${cat.color}`}>
                        {cat.count} tools
                      </span>
                    </div>
                    <p className="mb-2 text-sm font-bold text-slate-900 group-hover:text-brand-800">{cat.title}</p>
                    <ul className="space-y-0.5">
                      {cat.examples.map((ex) => (
                        <li key={ex} className="flex items-center gap-1.5 text-xs text-slate-500">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </Link>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-brand-500 font-semibold text-slate-950 hover:bg-brand-400">
                  <Link href="/calculators/"><BarChart3 className="mr-2 h-4 w-4" />All Calculators</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-300">
                  <Link href="/guides/">All Guides <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>

            {/* Right — nav widget */}
            <div className="lg:col-span-7">
              <FinancialNavWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLOSING CTA
          ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-900 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-brand-700/50 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-brand-600/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            <Percent className="h-3.5 w-3.5" />
            Market-low {lowestRate}% available now
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Don&apos;t accept the first rate you&apos;re offered.
          </h2>
          <p className="mb-8 text-lg text-brand-100">
            Most borrowers never negotiate. The ones who do — and use data to back their ask —
            consistently get better terms.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-12 bg-white px-8 font-semibold text-brand-700 shadow-lg hover:bg-brand-50">
              <Link href="/compare-loans/"><Scale className="mr-2 h-5 w-5" />Start comparing banks</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-white/30 bg-white/10 px-8 font-semibold text-white backdrop-blur-sm hover:bg-white/20">
              <Link href="/emi-calculator/"><Calculator className="mr-2 h-5 w-5" />Calculate EMI</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
