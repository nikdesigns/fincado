// src/app/bank-emi/[bank]/page.tsx

import { banks, RATE_DISCLAIMER } from '@/lib/banks';
import { notFound } from 'next/navigation';
import EMIClient from '@/app/emi-calculator/EMIClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import StickyCompareFooter from '@/components/StickyCompareFooter';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompetitors } from '@/lib/localData';
import { getBankRates } from '@/lib/getBankRates';
import AuthorBio from '@/components/AuthorBio';
import DataSourcesCard from '@/components/DataSourcesCard';
import HelpfulWidget from '@/components/HelpfulWidget';
import TaxUpdateBanner from '@/components/TaxUpdateBanner';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarClock,
  Clock3,
  FileCheck2,
  Gauge,
  HelpCircle,
  IndianRupee,
  ListChecks,
  Percent,
  Scale,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

/* ---------------- LOGIC ---------------- */
export async function generateStaticParams() {
  return banks.map((bank) => ({ bank: bank.slug }));
}

function formatRate(value: number): string {
  return `${value.toFixed(2)}%`;
}

function formatUpdatedLabel(value: string): string {
  if (value === 'N/A') return value;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString().slice(0, 10);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bank: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const bank = banks.find((b) => b.slug === resolvedParams.bank);
  if (!bank) return {};

  const liveRates = await getBankRates();
  const latestHomeRate =
    liveRates.find((r) => r.bank === bank.slug)?.homeLoan ?? bank.rate;
  const upperRate = Math.max(bank.maxRate, latestHomeRate);

  const title = `${bank.name} EMI Calculator 2026-27 – Tax Year 2026-27 | Income Tax Act 2025`;
  const description = `Calculate ${bank.name} home loan EMI instantly for Tax Year 2026-27. Updated rates ${latestHomeRate}%–${upperRate}%. Tax benefits under Section 80C & 24(b) available only in Old Regime. Compare tenure, total interest & eligibility.`;

  const url = `https://fincado.com/bank-emi/${bank.slug}/`;

  return {
    title,
    description,
    keywords: [
      `${bank.name} EMI calculator`,
      `${bank.name} home loan EMI 2026-27`,
      `${bank.name} home loan tax benefits`,
      `${bank.name} home loan interest rate 2026`,
      `Tax Year 2026-27 ${bank.name} EMI`,
      `${bank.name} home loan calculator 2026-27`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'Fincado',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/* ---------------- PAGE COMPONENT ---------------- */

export default async function BankPage({
  params,
}: {
  params: Promise<{ bank: string }>;
}) {
  const resolvedParams = await params;
  const bank = banks.find((b) => b.slug === resolvedParams.bank);

  if (!bank) notFound();

  const liveRates = await getBankRates();
  const getLatestHomeRate = (slug: string, fallback: number) =>
    liveRates.find((r) => r.bank === slug)?.homeLoan ?? fallback;
  const latestUpdatedAt = liveRates.length > 0 ? liveRates[0].updatedAt : 'N/A';

  const competitorSlugs = getCompetitors(bank.slug);
  const fallbackCompetitors = banks
    .filter((b) => b.slug !== bank.slug)
    .sort((a, b) => Math.abs(a.rate - bank.rate) - Math.abs(b.rate - bank.rate))
    .slice(0, 8)
    .map((b) => b.slug);

  const relatedCompetitorSlugs =
    competitorSlugs.length > 0 ? competitorSlugs : fallbackCompetitors;

  const relatedCompetitorBanks = banks
    .filter((b) => relatedCompetitorSlugs.includes(b.slug))
    .slice(0, 8);

  const bankHomeRate = getLatestHomeRate(bank.slug, bank.rate);
  const bankMaxRate = Math.max(bank.maxRate, bankHomeRate);
  const avgRate = ((bankHomeRate + bankMaxRate) / 2).toFixed(2);
  const bankCorridor = Number((bankMaxRate - bankHomeRate).toFixed(2));

  const allBanksWithLiveRates = banks.map((entry) => {
    const startRate = getLatestHomeRate(entry.slug, entry.rate);
    const upperRate = Math.max(entry.maxRate, startRate);
    return {
      ...entry,
      startRate,
      upperRate,
      corridor: Number((upperRate - startRate).toFixed(2)),
    };
  });
  const rankedByStartRate = [...allBanksWithLiveRates].sort(
    (a, b) => a.startRate - b.startRate || a.upperRate - b.upperRate,
  );
  const marketRankBySlug = new Map(
    rankedByStartRate.map((entry, index) => [entry.slug, index + 1]),
  );

  const marketBestStart = Math.min(...allBanksWithLiveRates.map((b) => b.startRate));
  const marketAverageStart =
    allBanksWithLiveRates.reduce((sum, b) => sum + b.startRate, 0) /
    allBanksWithLiveRates.length;
  const cheaperOptionsCount = allBanksWithLiveRates.filter(
    (b) => b.slug !== bank.slug && b.startRate < bankHomeRate,
  ).length;

  const benchmarkRows = [
    {
      bank,
      startRate: bankHomeRate,
      upperRate: bankMaxRate,
      corridor: bankCorridor,
      isCurrent: true,
    },
    ...relatedCompetitorBanks.map((comp) => {
      const startRate = getLatestHomeRate(comp.slug, comp.rate);
      const upperRate = Math.max(comp.maxRate, startRate);
      return {
        bank: comp,
        startRate,
        upperRate,
        corridor: Number((upperRate - startRate).toFixed(2)),
        isCurrent: false,
      };
    }),
  ].sort((a, b) => a.startRate - b.startRate);

  const relatedSidebarRows = relatedCompetitorBanks
    .map((other) => {
      const metrics = allBanksWithLiveRates.find((entry) => entry.slug === other.slug);
      const startRate = metrics?.startRate ?? other.rate;
      const upperRate = metrics?.upperRate ?? Math.max(other.maxRate, startRate);
      const corridor =
        metrics?.corridor ?? Number((upperRate - startRate).toFixed(2));
      const deltaVsCurrent = Number((startRate - bankHomeRate).toFixed(2));

      return {
        ...other,
        startRate,
        upperRate,
        corridor,
        deltaVsCurrent,
        rank: marketRankBySlug.get(other.slug) ?? null,
      };
    })
    .sort((a, b) => a.startRate - b.startRate || a.upperRate - b.upperRate);
  const relatedLowerStartCount = relatedSidebarRows.filter(
    (row) => row.deltaVsCurrent < 0,
  ).length;

  const BANK_SOURCE_URLS: Record<string, string> = {
    sbi: 'https://sbi.co.in/',
    hdfc: 'https://www.hdfcbank.com/',
    icici: 'https://www.icicibank.com/',
    axis: 'https://www.axisbank.com/',
    kotak: 'https://www.kotak.com/',
    pnb: 'https://www.pnbindia.in/',
    bob: 'https://www.bankofbaroda.in/',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the current home loan interest rate of ${bank.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${bank.name} home loan rates typically start from ${formatRate(bankHomeRate)} and may go up to ${formatRate(bankMaxRate)} depending on credit score, LTV ratio, and borrower profile (Tax Year 2026-27).`,
        },
      },
      {
        '@type': 'Question',
        name: `How can I reduce my ${bank.name} EMI?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can reduce EMI by extending tenure, improving credit score before sanction, choosing step-up income plans carefully, switching to lower spreads, and making part-prepayments whenever possible.',
        },
      },
      {
        '@type': 'Question',
        name: `What credit score is good for ${bank.name} home loans?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A score of 750+ is generally considered strong for better pricing, while borrowers with lower scores may still get loans at comparatively higher rates.',
        },
      },
      {
        '@type': 'Question',
        name: `Does prepayment reduce EMI or tenure in ${bank.name} home loan?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most borrowers benefit more by keeping EMI the same and reducing tenure, because this lowers total interest outgo significantly over the life of the loan.',
        },
      },
      {
        '@type': 'Question',
        name: `Are home loan tax benefits available under the New Regime in Tax Year 2026-27?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Tax deductions under Section 80C (principal) and Section 24(b) (interest) are available only if you opt for the Old Regime. The New Regime is the default from Tax Year 2026-27.',
        },
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: relatedCompetitorBanks.slice(0, 5).map((comp, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${comp.name} EMI Calculator`,
      url: `https://fincado.com/bank-emi/${comp.slug}/`,
    })),
  };

  const borrowerFitBlocks = [
    {
      title: 'Rate-First Borrowers',
      icon: Percent,
      fit: `Strong when ${bank.name} remains near the lower-rate cluster`,
      action:
        'Run affordability scenarios at both starting and upper-band rates before you lock your lender.',
      risk:
        'Small headline-rate advantage can disappear after add-on fees and slower reset behavior.',
    },
    {
      title: 'Fast Disbursal Need',
      icon: Clock3,
      fit: 'Better for cases where process SLAs and document turnaround are critical',
      action:
        'Validate legal/valuation queue times and branch execution quality before paying processing fees.',
      risk:
        'Faster sanction does not always mean better lifetime borrowing cost.',
    },
    {
      title: 'Long-Tenure Planning',
      icon: Scale,
      fit: 'Useful when tenure optimization and periodic prepayment are part of your plan',
      action:
        'Track annual prepayment capacity and rate-reset windows as part of your repayment strategy.',
      risk:
        'Ignoring reset clauses can push your effective cost above initial projections.',
    },
  ];

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Banks', url: 'https://fincado.com/bank-emi/' },
          {
            name: bank.name,
            url: `https://fincado.com/bank-emi/${bank.slug}/`,
          },
        ]}
      />
      <CalculatorSchema
        name={`${bank.name} EMI Calculator`}
        description={`EMI calculator for ${bank.name} home loans with amortization and repayment insights.`}
        url={`https://fincado.com/bank-emi/${bank.slug}/`}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-8">
          <TaxUpdateBanner />

          <header className="my-10 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-7 shadow-xl sm:p-9">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border border-brand-300 bg-brand-500/20 px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-200 uppercase">
                    Updated for Tax Year 2026-27
                  </Badge>
                  <Badge className="border border-slate-500 bg-slate-800 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-200 uppercase">
                    {bank.category ?? 'Bank'} Lending Desk
                  </Badge>
                </div>
                <div className="no-print">
                  <ShareTools title={`${bank.name} EMI Calculator`} />
                </div>
              </div>

              <h1 className="text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {bank.name} EMI Calculator
              </h1>

              <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Model monthly EMI, interest outgo, and tenure trade-offs with a
                lender-specific rate corridor. Use this page as a decision desk,
                not a one-click estimate.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-xl border border-slate-600 bg-slate-800/80 p-3">
                  <p className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
                    Start Rate
                  </p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {formatRate(bankHomeRate)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-600 bg-slate-800/80 p-3">
                  <p className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
                    Upper Band
                  </p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {formatRate(bankMaxRate)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-600 bg-slate-800/80 p-3">
                  <p className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
                    Rate Corridor
                  </p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {formatRate(bankCorridor)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-600 bg-slate-800/80 p-3">
                  <p className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
                    Market Delta
                  </p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {(bankHomeRate - marketAverageStart).toFixed(2)}%
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-300">
                Latest tracked home-loan refresh: {formatUpdatedLabel(latestUpdatedAt)}.
                Tax deductions under Section 80C and 24(b) remain available only in the Old Regime.
              </p>
            </div>
          </header>

          <Card className="mb-10 border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-slate-900">Decision Map</CardTitle>
              <CardDescription>
                Navigate the sections below in the same order lenders evaluate your file.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
              {[
                ['EMI Calculator', '#emi-calculator'],
                ['Execution Playbook', '#execution-playbook'],
                ['Borrower Fit Matrix', '#borrower-fit'],
                ['Eligibility Levers', '#eligibility-factors'],
                ['Benchmark vs Other Banks', '#compare-banks'],
                ['FAQs', '#faqs'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </CardContent>
          </Card>

          <div className="no-print mb-10 flex justify-center rounded-lg border border-slate-100 bg-slate-50 p-2">
            <AdSlot
              id="bank-top-leaderboard"
              type="leaderboard"
              label="Sponsored"
            />
          </div>

          <Card
            id="emi-calculator"
            className="mb-12 scroll-mt-24 overflow-hidden border-slate-200 shadow-sm"
          >
            <CardHeader className="border-b border-slate-200 bg-slate-50 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <Gauge className="h-5 w-5 text-brand-700" />
                Calculate Your EMI
              </CardTitle>
              <CardDescription>
                Use lender-specific rate assumptions and stress-test for worst-case affordability.
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white p-2 sm:p-6">
              <EMIClient defaultRate={bankHomeRate} />

              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-full bg-blue-100 p-2">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-blue-900">
                      Why does your sanctioned rate differ from published rates?
                    </h4>
                    <p className="text-sm leading-relaxed text-blue-800/90">
                      Final pricing depends on credit score, income consistency,
                      LTV, employer profile, and underwriting policy. Always test
                      EMI at both starting and upper-band assumptions.
                    </p>
                    <p className="text-xs text-blue-700">{RATE_DISCLAIMER}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section id="execution-playbook" className="mb-12 scroll-mt-24">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
              <ListChecks className="h-6 w-6 text-indigo-600" />
              Execution Playbook for {bank.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: '1) Start with sanctioned amount, not property value',
                  desc: 'Use your expected disbursal amount to avoid underestimating EMI and total outgo.',
                },
                {
                  title: '2) Run best-case and stress-case rates',
                  desc: `Test at ${formatRate(bankHomeRate)} and around ${formatRate(bankMaxRate)} to understand band risk.`,
                },
                {
                  title: '3) Compare tenure by total repayment',
                  desc: 'Lower EMI alone is not enough. Evaluate full lifetime cost before selecting tenure.',
                },
                {
                  title: '4) Plan annual prepayments upfront',
                  desc: 'A disciplined prepayment schedule materially reduces total interest and loan life.',
                },
              ].map((item) => (
                <Card key={item.title} className="border-l-4 border-l-indigo-500 shadow-sm">
                  <CardContent className="p-4">
                    <h4 className="mb-1 font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="borrower-fit" className="mb-12 scroll-mt-24">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
              <Building2 className="h-6 w-6 text-brand-700" />
              Borrower Fit Matrix
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {borrowerFitBlocks.map((block) => {
                const Icon = block.icon;
                return (
                  <Card key={block.title} className="border-slate-200 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                        <Icon className="h-4.5 w-4.5 text-brand-700" />
                        {block.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-900">Fit: </span>
                        {block.fit}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-900">Action: </span>
                        {block.action}
                      </p>
                      <p className="text-amber-800">
                        <span className="font-semibold text-amber-900">Risk: </span>
                        {block.risk}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section id="eligibility-factors" className="mb-12 scroll-mt-24">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-900">
              <IndianRupee className="h-5 w-5 text-brand-700" />
              What affects EMI and approval quality?
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="font-semibold text-slate-900">Credit Profile</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Higher score generally improves spread and sanction confidence.
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Improve by: clearing revolving dues before application.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="font-semibold text-slate-900">Income & FOIR</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Lenders evaluate existing EMIs vs disposable income to set limits.
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Improve by: reducing unsecured obligations pre-sanction.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="font-semibold text-slate-900">Property & LTV</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Property quality and LTV ratio influence pricing and approval terms.
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Improve by: cleaner title documents and stronger down payment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="compare-banks" className="mb-12 scroll-mt-24">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-900">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Benchmark {bank.name} vs Similar Lenders
            </h3>
            <p className="mb-6 text-slate-600">
              Ranked by starting rate with upper-band and corridor comparison.
            </p>

            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Rank</TableHead>
                    <TableHead className="font-semibold text-slate-700">Bank</TableHead>
                    <TableHead className="font-semibold text-slate-700">Start</TableHead>
                    <TableHead className="font-semibold text-slate-700">Upper</TableHead>
                    <TableHead className="font-semibold text-slate-700">Corridor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {benchmarkRows.map((row, index) => (
                    <TableRow
                      key={row.bank.slug}
                      className={row.isCurrent ? 'bg-brand-50 hover:bg-brand-100' : ''}
                    >
                      <TableCell className="font-semibold text-slate-700">#{index + 1}</TableCell>
                      <TableCell className="font-medium text-slate-900">
                        {row.isCurrent ? (
                          row.bank.name
                        ) : (
                          <Link
                            href={`/bank-emi/${row.bank.slug}/`}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {row.bank.name}
                          </Link>
                        )}
                      </TableCell>
                      <TableCell className={row.isCurrent ? 'font-semibold text-brand-700' : ''}>
                        {formatRate(row.startRate)}
                      </TableCell>
                      <TableCell>{formatRate(row.upperRate)}</TableCell>
                      <TableCell>{formatRate(row.corridor)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p>
                Market best start rate in tracked set: <strong>{formatRate(marketBestStart)}</strong>.
                Current page lender vs market average: <strong>{(bankHomeRate - marketAverageStart).toFixed(2)}%</strong>.
                Lenders currently cheaper than {bank.name}: <strong>{cheaperOptionsCount}</strong>.
              </p>
            </div>

            <DataSourcesCard
              bankName={bank.name}
              bankRateUrl={BANK_SOURCE_URLS[bank.slug]}
              updatedAt={latestUpdatedAt}
            />

            <HelpfulWidget pageKey={`bank-emi-${bank.slug}`} />

            <AuthorBio />
            <p className="mt-3 text-xs text-slate-400 italic">{RATE_DISCLAIMER}</p>
          </section>

          <div className="no-print my-10 flex justify-center">
            <AdSlot id="bank-mid-rectangle" type="rectangle" label="Suggested" />
          </div>

          <Card className="mb-12 border-slate-200 bg-slate-50/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarClock className="h-5 w-5 text-orange-500" />
                Interest Reduction Operating Plan
              </CardTitle>
              <CardDescription>
                Practical post-sanction actions that materially lower lifetime outgo.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="mb-1 font-semibold text-slate-900">Prioritize tenure reduction on prepayment</h4>
                <p className="text-sm text-slate-600">
                  Lower tenure typically saves more total interest than reducing EMI.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="mb-1 font-semibold text-slate-900">Step up EMI with income growth</h4>
                <p className="text-sm text-slate-600">
                  Even a 5-10% annual increase can cut repayment duration significantly.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="mb-1 font-semibold text-slate-900">Monitor reset-cycle communications</h4>
                <p className="text-sm text-slate-600">
                  Re-evaluate spread when benchmark rates or your profile improves.
                </p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600" />
                  <p className="text-sm text-amber-800">
                    Do not stretch EMI beyond resilient monthly cash flow. Liquidity stress erodes repayment discipline.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="mb-12">
            <h3 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
              <FileCheck2 className="h-6 w-6 text-teal-600" />
              Documentation Readiness Checklist
            </h3>
            <ul className="grid list-none gap-3 p-0 text-sm text-slate-700 sm:grid-cols-2">
              {[
                'Identity and address proof (Aadhaar, PAN, Passport, etc.)',
                'Income proof (salary slips or ITR/P&L for self-employed)',
                'Recent bank statements for 6-12 months',
                'Property papers (agreement, title chain, approved plan)',
                'Existing loan statements for balance transfer cases',
                'Down-payment source and funds trail',
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-slate-200 bg-white p-3"
                >
                  <span className="font-semibold text-brand-700">Check:</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="faqs" className="mb-12 scroll-mt-24">
            <h3 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
              <HelpCircle className="h-6 w-6 text-amber-500" />
              Frequently Asked Questions
            </h3>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="mb-3 rounded-lg border bg-white px-4">
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  What is the current interest rate range for {bank.name}?
                </AccordionTrigger>
                <AccordionContent className="pt-2 leading-relaxed text-slate-600">
                  Current indicative corridor is typically between{' '}
                  <strong>{formatRate(bankHomeRate)}</strong> and{' '}
                  <strong>{formatRate(bankMaxRate)}</strong>, subject to profile-level underwriting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="mb-3 rounded-lg border bg-white px-4">
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  Which documents are usually required for sanction?
                </AccordionTrigger>
                <AccordionContent className="pt-2 leading-relaxed text-slate-600">
                  Standard documents include KYC, income proof, bank statements, and complete property papers.
                  Self-employed applicants may need additional business financials.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="mb-3 rounded-lg border bg-white px-4">
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  Should I prefer lower EMI or shorter tenure?
                </AccordionTrigger>
                <AccordionContent className="pt-2 leading-relaxed text-slate-600">
                  If cash flow permits, shorter tenure generally reduces total interest substantially.
                  Validate both scenarios in the EMI calculator before finalizing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        <aside className="my-12 space-y-6 lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <Card className="overflow-hidden border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 shadow-lg">
              <CardHeader className="border-b border-slate-700 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <ShieldCheck className="h-5 w-5 text-brand-300" />
                  Decision Brief
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-5 text-sm text-slate-200">
                <p>
                  <span className="font-semibold text-white">Start rate:</span>{' '}
                  {formatRate(bankHomeRate)} ({bank.name})
                </p>
                <p>
                  <span className="font-semibold text-white">Planner midpoint:</span>{' '}
                  {formatRate(Number(avgRate))}
                </p>
                <p>
                  <span className="font-semibold text-white">Corridor risk:</span>{' '}
                  {formatRate(bankCorridor)}
                </p>
                <p>
                  <span className="font-semibold text-white">Market context:</span>{' '}
                  best tracked start rate is {formatRate(marketBestStart)}.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200 bg-slate-50 pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Related Bank Calculators
                </CardTitle>
                <CardDescription>
                  Compare lender-specific corridors and ranking before shortlisting.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                    <p className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
                      Lower Start Rate
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {relatedLowerStartCount}/{relatedSidebarRows.length}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                    <p className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
                      Best In Set
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {relatedSidebarRows[0]?.name ?? 'N/A'}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {relatedSidebarRows.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/bank-emi/${other.slug}/`}
                        className="group block rounded-xl border border-slate-200 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700">
                              {other.name}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Market rank #{other.rank ?? '-'}
                            </p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-brand-700" />
                        </div>

                        <div className="grid grid-cols-3 gap-1.5">
                          <div className="rounded-md bg-slate-50 px-2 py-1.5">
                            <p className="text-[9px] font-semibold tracking-wide text-slate-500 uppercase">
                              Start
                            </p>
                            <p className="text-[11px] font-semibold text-slate-900">
                              {formatRate(other.startRate)}
                            </p>
                          </div>
                          <div className="rounded-md bg-slate-50 px-2 py-1.5">
                            <p className="text-[9px] font-semibold tracking-wide text-slate-500 uppercase">
                              Upper
                            </p>
                            <p className="text-[11px] font-semibold text-slate-900">
                              {formatRate(other.upperRate)}
                            </p>
                          </div>
                          <div className="rounded-md bg-slate-50 px-2 py-1.5">
                            <p className="text-[9px] font-semibold tracking-wide text-slate-500 uppercase">
                              Corridor
                            </p>
                            <p className="text-[11px] font-semibold text-slate-900">
                              {formatRate(other.corridor)}
                            </p>
                          </div>
                        </div>

                        <p
                          className={`mt-2 text-[11px] font-medium ${
                            other.deltaVsCurrent < 0
                              ? 'text-emerald-700'
                              : other.deltaVsCurrent > 0
                                ? 'text-amber-700'
                                : 'text-slate-600'
                          }`}
                        >
                          {other.deltaVsCurrent < 0
                            ? `${Math.abs(other.deltaVsCurrent).toFixed(2)}% lower than ${bank.name} start rate`
                            : other.deltaVsCurrent > 0
                              ? `${Math.abs(other.deltaVsCurrent).toFixed(2)}% higher than ${bank.name} start rate`
                              : `At par with ${bank.name} starting rate`}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] leading-relaxed text-slate-500">
                  Sidebar rates are indicative and profile-sensitive. Validate
                  sanction letter terms before paying processing fees.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-slate-900">Next Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full bg-slate-900 text-white hover:bg-slate-800">
                  <Link href="/compare-loans/">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Compare More Lenders
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-slate-300 text-slate-700">
                  <Link href="/emi-calculator/">
                    <Percent className="mr-2 h-4 w-4" />
                    Open General EMI Tool
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <div className="no-print z-10 min-h-62.5 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <AdSlot type="box" id="bank-sidebar" />
            </div>
          </div>
        </aside>
      </div>

      <StickyCompareFooter bankName={bank.name} bankSlug={bank.slug} />
    </main>
  );
}
