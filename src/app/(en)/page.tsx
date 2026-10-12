import type { Metadata } from 'next';
import type React from 'react';
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
  BookOpen,
  Trophy,
  Sparkles,
  LayoutGrid,
} from 'lucide-react';
import { banks } from '@/lib/banks';
import { BANK_LOGOS } from '@/lib/bankLogos';
import { BRAND } from '@/lib/brand';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import GuidesShowcase from '@/components/GuidesShowcase';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

const HOME_TITLE = 'Fincado: Compare Home Loan Rates & EMI Calculators in India';
const HOME_DESCRIPTION = `Fincado compares home loan rates from ${banks.length}+ Indian banks and NBFCs side by side. Model your EMI, then plan SIPs, tax and retirement with free calculators in English and Hindi.`;

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  applicationName: BRAND.name,
  alternates: {
    canonical: 'https://fincado.com/',
    languages: {
      'en-IN': 'https://fincado.com/',
      'hi-IN': 'https://fincado.com/hi/',
      'x-default': 'https://fincado.com/',
    },
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://fincado.com/',
    siteName: BRAND.name,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fincado — Compare Home Loan Rates' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ['/og-image.png'],
  },
};

const FEATURED_TOOLS = [
  {
    label: 'EMI Calculator',
    href: '/emi-calculator/',
    image: '/images/icons/emi-lg.webp',
    category: 'Loans',
    desc: 'Know your exact monthly repayment and total interest for a home, car or personal loan — before you apply.',
    points: ['Full repayment schedule', 'Prepayment impact', 'Bank rate comparison'],
  },
  {
    label: 'SIP Calculator',
    href: '/sip-calculator/',
    image: '/images/icons/sip-lg.webp',
    category: 'Investing',
    desc: 'Project the long-horizon wealth your monthly investments can build, and see how invested amount and returns add up.',
    points: ['Year-by-year growth', 'Step-up SIP', 'Goal-based planning'],
  },
];

const CALCULATOR_TOOLS = [
  { label: 'FD Calculator',      href: '/fd-calculator/',         icon: '/images/icons/fd.svg',         category: 'Savings',    desc: 'Estimate FD maturity with compound interest breakdown.'  },
  { label: 'Income Tax',         href: '/income-tax-calculator/', icon: '/images/icons/tax.svg',        category: 'Tax',        desc: 'Compare old vs new regime impact on your take-home pay.' },
  { label: 'PPF Calculator',     href: '/ppf-calculator/',        icon: '/images/icons/ppf.svg',        category: 'Savings',    desc: 'Track tax-free maturity of 15-year PPF contributions.'   },
  { label: 'Home Loan EMI',      href: '/loans/home-loan/',       icon: '/images/icons/home-loan.svg',  category: 'Loans',      desc: 'Model affordability and tenure before you apply.'        },
  { label: 'SWP Calculator',     href: '/swp-calculator/',        icon: '/images/icons/swp.svg',        category: 'Investing',  desc: 'Plan systematic withdrawals to generate regular income.' },
  { label: 'Retirement Planner', href: '/retirement-calculator/', icon: '/images/icons/retirement.svg', category: 'Retirement', desc: 'Calculate the corpus you need to retire comfortably.'    },
];


/* Small pill used above every section heading */
function Eyebrow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
      <Icon className="h-3.5 w-3.5" /> {children}
    </p>
  );
}

const SECTION_LINK =
  'group inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-900';

const CARD =
  'rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-brand-500 hover:shadow-xl hover:shadow-slate-900/5';

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
    name: HOME_TITLE,
    description: HOME_DESCRIPTION,
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

              <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
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
                <Button asChild size="lg" className="h-12 rounded-lg bg-brand-400 px-6 font-semibold text-slate-900 hover:bg-brand-500">
                  <Link href="/compare-loans/"><Scale className="mr-2 h-5 w-5" />Compare All Banks</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-lg border-slate-300 bg-white px-6 font-semibold text-slate-900 hover:border-slate-900 hover:bg-white hover:text-slate-900">
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
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
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
      <div className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-slate-200">
            {[
              { label: 'Lenders tracked',    value: `${banks.length}+`, icon: ShieldCheck  },
              { label: 'Lowest rate now',    value: `${lowestRate}%`,   icon: TrendingDown },
              { label: 'Avg. savings found', value: '₹4.2L',            icon: IndianRupee  },
              { label: 'Data freshness',     value: 'Monthly',          icon: Zap          },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4 px-2 py-6 sm:px-6 lg:py-8">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-400 text-slate-900">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <dd className="text-2xl font-bold leading-none tracking-tight text-slate-900 sm:text-3xl">{s.value}</dd>
                  <dt className="mt-1.5 text-sm text-slate-500">{s.label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          COMPACT RATE LEADERBOARD
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <Eyebrow icon={Trophy}>Live data</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Rate Leaderboard</h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Top 6 lenders by starting home loan rate — {monthYear}.
              </p>
            </div>
            <Link href="/bank-emi/" className={SECTION_LINK}>
              All {banks.length} lenders
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topSixBanks.map((bank, i) => {
              const isLowest = i === 0;
              const logo = BANK_LOGOS[bank.slug];
              const slug = [sortedBanks[0].slug, bank.slug].sort().join('-vs-');
              return (
                <div
                  key={bank.slug}
                  className={`group relative flex flex-col rounded-2xl border bg-white p-6 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/5 ${isLowest ? 'border-brand-500 ring-4 ring-brand-100' : 'border-slate-200 hover:border-brand-500'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {logo ? (
                        <Image src={logo} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-lg border border-slate-100 object-contain p-1" />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600">
                          {bank.name.slice(0, 3).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-slate-900">{bank.name}</h3>
                        <p className="text-xs text-slate-500">{bank.category ?? 'Lender'}</p>
                      </div>
                    </div>
                    {isLowest ? (
                      <span className="shrink-0 rounded-full bg-brand-400 px-2.5 py-1 text-[11px] font-semibold text-slate-900">
                        Market low
                      </span>
                    ) : (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                        {i + 1}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Starting from</p>
                      <p className="mt-1 text-4xl font-bold leading-none tracking-tight text-slate-900">
                        {bank.rate}
                        <span className="ml-0.5 text-xl font-semibold text-slate-500">%</span>
                      </p>
                    </div>
                    <p className="pb-1 text-right text-xs text-slate-500">
                      up to <span className="font-semibold text-slate-700">{bank.maxRate}%</span>
                      <br />
                      p.a.
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-semibold">
                    <Link href={`/bank-emi/${bank.slug}/`} className="inline-flex items-center gap-1 text-slate-900 hover:text-brand-700">
                      EMI details <ChevronRight className="h-4 w-4" />
                    </Link>
                    {i > 0 && (
                      <Link href={`/compare/${slug}/`} className="ml-auto inline-flex items-center gap-1 text-slate-500 hover:text-brand-700">
                        Compare with #1 <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Rates are indicative. Actual offer varies by credit score, LTV, income, and lender policy.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CALCULATOR TOOLS — DARK FEATURE SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                <Calculator className="h-3.5 w-3.5" /> Free tools
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Popular Calculators</h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Every calculator you need — from EMI to retirement — built for India.
              </p>
            </div>
            <Link
              href="/calculators/"
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-900"
            >
              View all tools
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Featured: the two most-used calculators */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {FEATURED_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative flex items-center gap-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-brand-500 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="rounded-full bg-brand-400 px-2.5 py-1 text-[11px] font-semibold text-slate-900">
                      Most used
                    </span>
                    <span className="text-xs font-medium text-slate-500">{tool.category}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{tool.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{tool.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {tool.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors group-hover:bg-brand-500">
                    Open calculator
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
                <Image
                  src={tool.image}
                  alt=""
                  width={160}
                  height={160}
                  className="hidden h-36 w-36 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:block lg:h-40 lg:w-40"
                />
              </Link>
            ))}
          </div>

          {/* The rest: compact rows */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CALCULATOR_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-brand-500 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <Image
                  src={tool.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{tool.category}</p>
                  <h3 className="mt-0.5 text-base font-semibold text-slate-900">{tool.label}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-500">{tool.desc}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-slate-900">
                  <ArrowRight className="h-4 w-4" />
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
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow icon={Sparkles}>The process</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Make a smarter decision in 3 steps
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              From first benchmark to final shortlist, without a single sales call.
            </p>
          </div>

          <ol className="relative grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              { step: 1, icon: BarChart3,  title: 'Benchmark rates',      desc: `See starting rates from ${banks.length}+ lenders sorted and ranked in one place.`,            href: '/bank-emi/',        cta: 'View rate table'     },
              { step: 2, icon: Calculator, title: 'Model your EMI',       desc: 'Enter your amount, tenure, and rate. See how 0.25% changes total repayment.',     href: '/loans/home-loan/', cta: 'Open EMI calculator' },
              { step: 3, icon: Scale,      title: 'Compare head-to-head', desc: 'Pick any two lenders — get rate gap, lifetime saving, fees, and borrower fit.',   href: '/compare-loans/',   cta: 'Compare banks'       },
            ].map((item) => (
              <li key={item.step} className="relative">
                <Link href={item.href} className={`group flex h-full flex-col p-6 sm:p-8 ${CARD}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-brand-400">
                      <item.icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                      Step {item.step} of 3
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    {item.cta}
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 transition-colors group-hover:border-brand-400 group-hover:bg-brand-400">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          POPULAR COMPARISONS
          ══════════════════════════════════════════════════════ */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <Eyebrow icon={Scale}>Head-to-head</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Popular lender matchups</h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                The most-researched rate comparisons this month.
              </p>
            </div>
            <Link href="/compare-loans/" className={SECTION_LINK}>
              All matchups
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featuredPairs.map(({ b1, b2 }) => {
              const slug     = [b1.slug, b2.slug].sort().join('-vs-');
              const rateDiff = Math.abs(b1.rate - b2.rate).toFixed(2);
              const lower    = b1.rate <= b2.rate ? b1 : b2;
              const higher   = b1.rate <= b2.rate ? b2 : b1;
              const isTie    = b1.rate === b2.rate;
              return (
                <Link key={slug} href={`/compare/${slug}/`} className={`group flex flex-col p-6 ${CARD}`}>
                  <div className="space-y-3">
                    {[lower, higher].map((bank, idx) => {
                      const logo = BANK_LOGOS[bank.slug];
                      const leads = idx === 0 && !isTie;
                      return (
                        <div key={bank.slug} className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            {logo ? (
                              <Image src={logo} alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-md border border-slate-100 object-contain p-0.5" />
                            ) : (
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[9px] font-bold text-slate-600">
                                {bank.name.slice(0, 3).toUpperCase()}
                              </div>
                            )}
                            <p className="truncate text-sm font-semibold text-slate-900">{bank.name}</p>
                          </div>
                          <p className={`shrink-0 text-lg font-bold tracking-tight ${leads ? 'text-slate-900' : 'text-slate-500'}`}>
                            {bank.rate}%
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Rate gap</p>
                    <p className="rounded-full bg-brand-400 px-2.5 py-1 text-xs font-semibold text-slate-900">
                      {isTie ? 'Level' : `${rateDiff}%`}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm font-semibold text-slate-900">
                    <span>{isTie ? 'See the full comparison' : `${lower.name} leads`}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-slate-900">
                      <ArrowRight className="h-4 w-4" />
                    </span>
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
          <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <Eyebrow icon={BookOpen}>Research library</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Expert guides for every stage</h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                Plain-English explainers on loans, tax, investing and retirement in India.
              </p>
            </div>
            <Link href="/guides/" className={SECTION_LINK}>
              Browse all guides
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <GuidesShowcase />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY FINCADO
          ══════════════════════════════════════════════════════ */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow icon={ShieldCheck}>Why Fincado</Eyebrow>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Data-first. No hidden agendas.{' '}
                <span className="rounded-md bg-brand-300 px-2 box-decoration-clone">Just numbers.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                We don&apos;t sell loans. We research them. Our only job is to make sure you walk into a bank
                negotiation with better data than the bank has.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  { icon: ShieldCheck, title: 'No affiliate bias',         desc: 'We earn from ads, not loan referrals. Every ranking is based purely on rate data.'             },
                  { icon: Clock,       title: 'Updated regularly',          desc: 'Rates are reviewed every month so you never rely on stale benchmarks.'                        },
                  { icon: Users,       title: 'Built for Indian borrowers', desc: 'PSU vs private, MCLR vs EBLR, floating vs fixed — we cover the nuances that matter in India.' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-brand-400">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image + stats */}
            <div className="space-y-4">
              <div className="relative h-64 overflow-hidden rounded-2xl sm:h-72">
                <Image
                  src="/images/guides/home-loan/happy-couple-new-home.webp"
                  alt="Happy family with new home"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xl font-bold tracking-tight text-white">Make your best financial decision</p>
                  <p className="mt-1 text-sm text-slate-200">Backed by data, not sales pitches.</p>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-4">
                {[
                  { stat: `${banks.length}+`, label: 'Lenders in database',     sub: 'Banks, HFCs & NBFCs'        },
                  { stat: '₹4.2L',            label: 'Avg. savings identified', sub: 'On a ₹50L / 20Y example'    },
                  { stat: '45+',              label: 'Comparison pairs',        sub: 'Full head-to-head analysis' },
                  { stat: 'Free',             label: 'Always free to use',      sub: 'No registration needed'     },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <dd className="text-3xl font-bold tracking-tight text-slate-900">{item.stat}</dd>
                    <dt className="mt-2 text-sm font-semibold text-slate-900">{item.label}</dt>
                    <p className="mt-0.5 text-xs text-slate-500">{item.sub}</p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TOOLS & NAV WIDGET
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">

            {/* Left — category showcase */}
            <div className="flex flex-col gap-8 lg:col-span-5">
              <div>
                <Eyebrow icon={LayoutGrid}>Quick access</Eyebrow>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">All financial tools</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Every calculator you need for loans, tax, investments, and retirement — free, no sign-up.
                </p>
              </div>

              {/* Quick stats */}
              <dl className="grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                {[
                  { value: '25+',  label: 'Calculators' },
                  { value: '30+',  label: 'Guides'      },
                  { value: '100%', label: 'Free to use' },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-5 text-center">
                    <dd className="text-2xl font-bold tracking-tight text-slate-900">{s.value}</dd>
                    <dt className="mt-1 text-xs font-medium text-slate-500">{s.label}</dt>
                  </div>
                ))}
              </dl>

              {/* Categories */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { icon: Scale,        title: 'Loans & EMI',  count: 6,  examples: 'Home, personal & car loans',  href: '/loans/'                 },
                  { icon: TrendingDown, title: 'Investments',  count: 11, examples: 'SIP, FD, ELSS & PPF',         href: '/calculators/'           },
                  { icon: IndianRupee,  title: 'Tax Planning', count: 6,  examples: 'Income tax, HRA & GST',       href: '/income-tax-calculator/' },
                  { icon: Users,        title: 'Retirement',   count: 8,  examples: 'EPF, NPS & FIRE',             href: '/retirement-calculator/' },
                ].map((cat) => (
                  <Link key={cat.title} href={cat.href} className={`group flex items-center gap-4 p-4 ${CARD}`}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-400 group-hover:text-slate-900">
                      <cat.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                        {cat.title}
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{cat.count}</span>
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-slate-500">{cat.examples}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link href="/calculators/" className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand-400 px-6 text-sm font-semibold text-slate-900 transition-colors hover:bg-brand-500">
                  <BarChart3 className="h-4 w-4" /> All calculators
                </Link>
                <Link href="/guides/" className="group inline-flex h-12 items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-900">
                  All guides <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
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
      <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-brand-300">
              <Percent className="h-3.5 w-3.5" />
              Market-low {lowestRate}% available now
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Don&apos;t accept the first rate you&apos;re offered.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Most borrowers never negotiate. The ones who do — and use data to back their ask —
              consistently get better terms.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/compare-loans/" className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand-400 px-7 text-sm font-semibold text-slate-900 transition-colors hover:bg-brand-300">
                <Scale className="h-5 w-5" /> Start comparing banks
              </Link>
              <Link href="/emi-calculator/" className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                <Calculator className="h-5 w-5" /> Calculate EMI
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
