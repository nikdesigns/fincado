import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import {
  Calculator,
  CheckCircle2,
  Clock,
  HelpCircle,
  IndianRupee,
  Info,
  Percent,
  Scale,
  TrendingDown,
  Users,
  XCircle,
  Zap,
} from 'lucide-react';
import { banks } from '@/lib/banks';
import { getCurrentFiscalYear } from '@/lib/fiscalYear';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';
import RateComparisonChart from '@/components/RateComparisonChart';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FAQSchema from '@/components/FAQSchema';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AuthorBio from '@/components/AuthorBio';
import ShareTools from '@/components/ShareTools';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const dynamicParams = false;

type ComparisonPageParams = { slug: string };

const PSU_SLUG_HINTS = ['sbi', 'pnb', 'bob', 'canara', 'union', 'iob'];
const PRIVATE_SLUG_HINTS = ['hdfc', 'icici', 'axis', 'kotak', 'yes', 'idfc'];

function isPsuBank(slug: string): boolean {
  return PSU_SLUG_HINTS.some((hint) => slug.includes(hint));
}

function isPrivateBank(slug: string): boolean {
  return PRIVATE_SLUG_HINTS.some((hint) => slug.includes(hint));
}

function parseCompareSlug(slug: string) {
  const parts = slug.split('-vs-');
  if (parts.length !== 2 || parts[0] === parts[1]) return null;

  const [s1, s2] = parts;
  const b1 = banks.find((b) => b.slug === s1);
  const b2 = banks.find((b) => b.slug === s2);
  if (!b1 || !b2) return null;

  return { b1, b2 };
}

function toCanonicalCompareSlug(s1: string, s2: string): string {
  return [s1, s2].sort().join('-vs-');
}

function calculateEMI(
  principal: number,
  annualRate: number,
  years: number,
): number {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return 0;

  const monthlyRate = annualRate / (12 * 100);
  const months = years * 12;
  const growth = Math.pow(1 + monthlyRate, months);
  const denominator = growth - 1;

  if (!Number.isFinite(growth) || denominator <= 0) return 0;
  return (principal * monthlyRate * growth) / denominator;
}

function formatINR(value: number): string {
  if (!Number.isFinite(value)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatLakhs(value: number): string {
  if (!Number.isFinite(value)) return '0.0';
  return (value / 100000).toFixed(1);
}

function getComparisonAngle(opts: {
  b1Name: string;
  b2Name: string;
  rateDiff: number;
  likelyPrivate: string | null;
  likelyPsu: string | null;
}): { label: string; body: string } {
  const { b1Name, b2Name, rateDiff, likelyPrivate, likelyPsu } = opts;

  if (rateDiff < 0.15) {
    return {
      label: 'Close-rate matchup',
      body: `${b1Name} and ${b2Name} are currently in a tight rate band. In close-rate cases, processing speed, sanction consistency, and reset behavior often matter more than headline rate alone.`,
    };
  }

  if (likelyPrivate && likelyPsu) {
    return {
      label: 'Speed vs cost trade-off',
      body: `This is a classic private-vs-PSU decision profile: ${likelyPrivate} may be faster on digital journey, while ${likelyPsu} can remain competitive on long-tenure repayment cost.`,
    };
  }

  return {
    label: 'Rate-led decision setup',
    body: `The current rate gap is meaningful enough to justify a repayment-first decision. Still compare total cost levers like fees, reset frequency, and prepayment flexibility before finalizing.`,
  };
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  for (let i = 0; i < banks.length; i++) {
    for (let j = 0; j < banks.length; j++) {
      if (i !== j)
        params.push({ slug: `${banks[i].slug}-vs-${banks[j].slug}` });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ComparisonPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fy = getCurrentFiscalYear();
  const monthYear = getCurrentMonthYearLabel();
  const parsed = parseCompareSlug(slug);

  if (!parsed) return {};

  const { b1, b2 } = parsed;
  const canonicalSlug = toCanonicalCompareSlug(b1.slug, b2.slug);
  const isCanonicalSlug = slug === canonicalSlug;
  const lowerRateBank = b1.rate <= b2.rate ? b1 : b2;
  const rateDiff = Math.abs(b1.rate - b2.rate).toFixed(2);

  return {
    title: `${b1.name} vs ${b2.name} Home Loan (${fy.shortYear}): Rates, EMI Difference & Best Choice`,
    description: `Compare ${b1.name} and ${b2.name} on interest rate, 20-year EMI impact, approval speed, and borrower fit. Current lower-rate option: ${lowerRateBank.name} by ${rateDiff}%. Updated for ${monthYear}.`,
    keywords: [
      `${b1.name} vs ${b2.name}`,
      `${b1.name} ${b2.name} home loan comparison`,
      `${b1.name} interest rate ${fy.shortYear}`,
      `${b2.name} interest rate ${fy.shortYear}`,
      `${b1.name} vs ${b2.name} which is better`,
      'home loan comparison india',
      'best bank for home loan',
      'home loan rate comparison',
      'EMI difference calculator',
    ],
    authors: [{ name: 'Fincado Research Team' }],
    creator: 'Fincado',
    publisher: 'Fincado',
    alternates: {
      canonical: `https://fincado.com/compare/${canonicalSlug}/`,
    },
    openGraph: {
      title: `${b1.name} vs ${b2.name} Home Loan (${fy.shortYear})`,
      description: `Compare ${b1.name} (${b1.rate}%) vs ${b2.name} (${b2.rate}%) with EMI impact, approval speed, and borrower-fit guidance.`,
      url: `https://fincado.com/compare/${canonicalSlug}/`,
      siteName: 'Fincado',
      type: 'article',
      images: [
        {
          url: `https://fincado.com/og-compare-${b1.slug}-vs-${b2.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${b1.name} vs ${b2.name} Home Loan Comparison`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${b1.name} vs ${b2.name} Home Loan Comparison`,
      description: `${b1.rate}% vs ${b2.rate}% — compare EMI impact, fees, and approval speed.`,
      images: [`https://fincado.com/og-compare-${b1.slug}-vs-${b2.slug}.jpg`],
    },
    robots: isCanonicalSlug
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<ComparisonPageParams>;
}) {
  const { slug } = await params;
  const fy = getCurrentFiscalYear();
  const monthYear = getCurrentMonthYearLabel();
  const parsed = parseCompareSlug(slug);
  if (!parsed) notFound();

  const { b1, b2 } = parsed;
  const canonicalSlug = toCanonicalCompareSlug(b1.slug, b2.slug);

  // Redirect reverse-order slug to canonical slug
  if (slug !== canonicalSlug) {
    permanentRedirect(`/compare/${canonicalSlug}/`);
  }

  const currentDateISO = new Date().toISOString().split('T')[0];
  const lowerRateBank = b1.rate <= b2.rate ? b1 : b2;
  const higherRateBank = b1.rate <= b2.rate ? b2 : b1;
  const rateDiff = Math.abs(b1.rate - b2.rate);

  const samplePrincipal = 5000000; // ₹50 lakh
  const sampleYears = 20;

  const emi1 = calculateEMI(samplePrincipal, b1.rate, sampleYears);
  const emi2 = calculateEMI(samplePrincipal, b2.rate, sampleYears);
  const monthlySaving = Math.abs(emi1 - emi2);
  const lifetimeSaving = monthlySaving * sampleYears * 12;

  const likelyPsu = isPsuBank(b1.slug) ? b1 : isPsuBank(b2.slug) ? b2 : null;
  const likelyPrivate = isPrivateBank(b1.slug)
    ? b1
    : isPrivateBank(b2.slug)
      ? b2
      : null;
  const comparisonAngle = getComparisonAngle({
    b1Name: b1.name,
    b2Name: b2.name,
    rateDiff,
    likelyPrivate: likelyPrivate?.name ?? null,
    likelyPsu: likelyPsu?.name ?? null,
  });

  const faqs = [
    {
      question: `Which is better for long-tenure home loans: ${b1.name} or ${b2.name}?`,
      answer: `${lowerRateBank.name} currently has the lower starting rate (${lowerRateBank.rate}% vs ${higherRateBank.rate}%). On a ₹50 lakh, 20-year example, that can mean roughly ${formatINR(lifetimeSaving)} lower total repayment. Compare this with processing speed, service quality, and sanction terms before deciding.`,
    },
    {
      question: `How much does a ${rateDiff.toFixed(2)}% rate difference matter in practice?`,
      answer: `Even a small rate gap matters over long tenures. In this comparison, the monthly EMI difference is about ${formatINR(monthlySaving)}, which compounds significantly over 20 years.`,
    },
    {
      question: `Does CIBIL score affect ${b1.name} and ${b2.name} similarly?`,
      answer: `Both lenders generally reward higher credit scores (usually 750+) with better terms. If your score is below 700, approval terms can tighten and your offered rate may move toward the upper band.`,
    },
    {
      question: 'Which lender is usually faster for approval?',
      answer: `${likelyPrivate ? `${likelyPrivate.name} (private-bank style)` : 'Private-bank style lenders'} often move faster on digital workflows (frequently 3–7 days), while ${likelyPsu ? `${likelyPsu.name} (PSU style)` : 'PSU style lenders'} may take longer but can be competitive on long-term rates. Actual timelines vary by city and property profile.`,
    },
    {
      question: 'Should I evaluate only headline interest rates?',
      answer:
        'No. Compare effective borrowing cost: starting rate, reset behavior, fees, legal/valuation costs, insurance bundling, prepayment flexibility, and processing time. The cheapest headline rate is not always the cheapest end-to-end loan.',
    },
    {
      question: 'What is reset-period risk in floating home loans?',
      answer:
        'Floating-rate loans do not always reprice instantly with policy rate changes. Different lenders may reset monthly/quarterly/half-yearly and use different benchmark spreads. Slower or less transparent reset mechanics can increase your effective borrowing cost even when market rates soften.',
    },
    {
      question:
        'How should I compare total effective cost beyond headline rate?',
      answer:
        'Use a full-cost checklist: interest rate, processing fee, legal/valuation charges, mandatory insurance, reset spread, prepayment terms, and turnaround delay cost. Always compare total repayment and not just first-month EMI.',
    },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${b1.name} vs ${b2.name} Home Loan Comparison (${monthYear})`,
    description: `Data-backed comparison of ${b1.name} and ${b2.name} on rates, repayment impact, and borrower fit for ${monthYear}.`,
    datePublished: currentDateISO,
    dateModified: currentDateISO,
    author: {
      '@type': 'Organization',
      name: 'Fincado Research Team',
      url: 'https://fincado.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fincado',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fincado.com/logo.png',
      },
    },
    image: `https://fincado.com/og-compare-${b1.slug}-vs-${b2.slug}.jpg`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fincado.com/compare/${canonicalSlug}/`,
    },
  };

  const comparisonListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${b1.name} vs ${b2.name} Home Loan Comparison`,
    description: `Side-by-side comparison for ${b1.name} and ${b2.name} home loan benchmarks.`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: `${b1.name} Home Loan`,
        description: `Rate: ${b1.rate}%, max rate: ${b1.maxRate}%, indicative processing fee up to 0.50%`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${b2.name} Home Loan`,
        description: `Rate: ${b2.rate}%, max rate: ${b2.maxRate}%, indicative processing fee up to 0.50%`,
      },
    ],
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          {
            name: 'Loan Comparisons',
            url: 'https://fincado.com/compare-loans/',
          },
          {
            name: `${b1.name} vs ${b2.name}`,
            url: `https://fincado.com/compare/${canonicalSlug}/`,
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comparisonListSchema),
        }}
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mx-auto my-12 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-brand-200 bg-linear-to-br from-brand-50 via-brand-50 to-brand-50/30 p-8 shadow-sm">
            <div className="absolute -right-12 -top-12 opacity-5">
              <Scale className="h-64 w-64 text-brand-700" />
            </div>

            <div className="relative z-10">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <Badge className="border-brand-300 bg-white px-4 py-1.5 font-semibold tracking-wider text-brand-700 uppercase shadow-sm">
                  Expert Reviewed · {monthYear}
                </Badge>
                <div className="no-print">
                  <ShareTools
                    title={`${b1.name} vs ${b2.name} Home Loan Comparison`}
                  />
                </div>
              </div>

              <h1 className="mb-4 text-3xl leading-tight font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
                {b1.name}{' '}
                <span className="bg-linear-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
                  vs
                </span>{' '}
                {b2.name}
              </h1>

              <p className="mb-5 text-base leading-relaxed text-slate-700 sm:text-lg">
                Practical home-loan comparison for FY {fy.startYear}-
                {String(fy.endYear).slice(-2)} using rate bands, estimated
                repayment impact, and borrower-fit guidance.
              </p>

              <p className="mb-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                <strong>{comparisonAngle.label}:</strong> {comparisonAngle.body}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-brand-100 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
                  <div className="mb-1 flex items-center gap-2">
                    <Percent className="h-4 w-4 text-brand-700" />
                    <span className="text-xs font-medium text-slate-600">
                      {b1.name}
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-brand-700">
                    {b1.rate}%
                  </p>
                </div>

                <div className="rounded-lg border border-teal-100 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
                  <div className="mb-1 flex items-center gap-2">
                    <Percent className="h-4 w-4 text-brand-500" />
                    <span className="text-xs font-medium text-slate-600">
                      {b2.name}
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-[#FF9F4C]">
                    {b2.rate}%
                  </p>
                </div>

                <div className="rounded-lg border border-amber-100 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
                  <div className="mb-1 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-amber-600" />
                    <span className="text-xs font-medium text-slate-600">
                      Rate Gap
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-amber-600">
                    {rateDiff.toFixed(2)}%
                  </p>
                </div>

                <div className="rounded-lg border border-brand-100 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
                  <div className="mb-1 flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-brand-700" />
                    <span className="text-xs font-medium text-slate-600">
                      20Y Impact*
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-brand-700">
                    ₹{formatLakhs(lifetimeSaving)}L
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs italic text-slate-500">
                *Illustration on ₹50 lakh for 20 years. Your actual offer can
                vary by profile, location, and policy updates.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="mb-12 space-y-10 lg:col-span-8">
            {/* --- QUICK VERDICT TABLE (NEW, ABOVE FOLD) --- */}
            <section className="mx-auto mb-8 max-w-5xl">
              <Card className="border-brand-200 bg-white shadow-sm">
                <CardHeader className="border-b border-slate-200 bg-brand-50">
                  <CardTitle className="text-lg font-semibold text-brand-900">
                    Quick Verdict: {b1.name} vs {b2.name}
                  </CardTitle>
                  <CardDescription>
                    Fast decision summary for a ₹50L / 20-year illustration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Decision Factor</TableHead>
                          <TableHead>Current Winner</TableHead>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Lowest rate now
                          </TableCell>
                          <TableCell className="font-semibold text-brand-700">
                            {lowerRateBank.name}
                          </TableCell>
                          <TableCell>
                            {lowerRateBank.rate}% vs {higherRateBank.rate}% (
                            {rateDiff.toFixed(2)}% gap)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            EMI difference (₹50L/20Y)
                          </TableCell>
                          <TableCell className="font-semibold text-brand-700">
                            {formatINR(monthlySaving)}/month
                          </TableCell>
                          <TableCell>
                            Approx {formatINR(lifetimeSaving)} lifetime
                            repayment difference
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Processing fee band
                          </TableCell>
                          <TableCell>Similar</TableCell>
                          <TableCell>
                            Typically up to ~0.50% (lender policy dependent)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Best for
                          </TableCell>
                          <TableCell>{lowerRateBank.name}</TableCell>
                          <TableCell>
                            Low-cost focus; for faster approval, verify digital
                            workflow and local branch turnaround.
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {rateDiff > 0 && (
              <div className="flex items-start gap-4 rounded-xl border border-brand-200 bg-linear-to-r from-brand-50 to-brand-50 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-700 shadow-md">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="mb-1 font-semibold text-brand-900">
                    Lower-Rate Leader
                  </h2>
                  <p className="text-sm leading-relaxed text-brand-700">
                    <strong>{lowerRateBank.name}</strong> is currently lower at{' '}
                    <strong>{lowerRateBank.rate}%</strong> vs{' '}
                    <strong>{higherRateBank.rate}%</strong> from{' '}
                    {higherRateBank.name}. Estimated EMI difference:{' '}
                    <strong>{formatINR(monthlySaving)}/month</strong> (₹50 lakh,
                    20 years).
                  </p>
                </div>
              </div>
            )}

            <Card className="border-slate-200 shadow-md">
              <CardHeader className="border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 shadow-sm">
                    <Scale className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      Comparison Snapshot
                    </CardTitle>
                    <CardDescription>
                      Core metrics and practical decision indicators.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">
                          Parameter
                        </TableHead>
                        <TableHead className="font-semibold">
                          {b1.name}
                        </TableHead>
                        <TableHead className="font-semibold">
                          {b2.name}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Starting Interest Rate
                        </TableCell>
                        <TableCell
                          className={
                            b1.rate <= b2.rate
                              ? 'font-semibold text-brand-700'
                              : 'font-semibold text-slate-700'
                          }
                        >
                          {b1.rate}% p.a.
                        </TableCell>
                        <TableCell
                          className={
                            b2.rate <= b1.rate
                              ? 'font-semibold text-brand-700'
                              : 'font-semibold text-slate-700'
                          }
                        >
                          {b2.rate}% p.a.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Maximum Interest Rate
                        </TableCell>
                        <TableCell>{b1.maxRate}%</TableCell>
                        <TableCell>{b2.maxRate}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Illustrative EMI (₹50L, 20Y)
                        </TableCell>
                        <TableCell>{formatINR(emi1)}</TableCell>
                        <TableCell>{formatINR(emi2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Processing Fee (indicative)
                        </TableCell>
                        <TableCell>Up to 0.50%</TableCell>
                        <TableCell>Up to 0.50%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Digital Journey
                        </TableCell>
                        <TableCell>
                          {isPsuBank(b1.slug) ? 'Moderate' : 'Strong'}
                        </TableCell>
                        <TableCell>
                          {isPsuBank(b2.slug) ? 'Moderate' : 'Strong'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Prepayment on floating HL
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-brand-700">
                            Typically Nil*
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-brand-700">
                            Typically Nil*
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <p className="px-6 pb-5 text-xs text-slate-500">
                  *Subject to product terms and latest lender policy.
                </p>
              </CardContent>
            </Card>

            <RateComparisonChart b1={b1} b2={b2} />

            {/* --- RELATED PAGES (NEW INTERNAL LINKS) --- */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200 bg-slate-50">
                <CardTitle className="text-lg font-semibold">
                  Related Tools & Guides
                </CardTitle>
                <CardDescription>
                  Use these pages to validate rate choice, EMI impact, and
                  borrower readiness.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Link
                    className="text-sm text-brand-700 hover:underline"
                    href="/compare-loans/"
                  >
                    Compare Loans Hub
                  </Link>
                  <Link
                    className="text-sm text-brand-700 hover:underline"
                    href="/loans/home-loan/"
                  >
                    Home Loan EMI Calculator
                  </Link>
                  <Link
                    className="text-sm text-brand-700 hover:underline"
                    href="/emi-calculator/"
                  >
                    General EMI Calculator
                  </Link>
                  <Link
                    className="text-sm text-brand-700 hover:underline"
                    href="/guides/home-loan-guide/"
                  >
                    Home Loan Guide
                  </Link>
                  <Link
                    className="text-sm text-brand-700 hover:underline"
                    href="/guides/home-loan-first-time-buyers/"
                  >
                    First-Time Home Buyer Guide
                  </Link>
                  <Link
                    className="text-sm text-brand-700 hover:underline"
                    href="/guides/personal-loan-interest-rates-india/"
                  >
                    Personal Loan Rates India Guide
                  </Link>
                  <Link
                    className="text-sm text-brand-700 hover:underline"
                    href="/credit-score/"
                  >
                    Credit Score Estimator
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="no-print flex justify-center rounded-lg border border-slate-100 bg-slate-50 p-2">
              <AdSlot id="compare-mid-1" type="leaderboard" />
            </div>

            <section aria-labelledby="profile-fit-heading">
              <h2
                id="profile-fit-heading"
                className="mb-6 flex items-center gap-2 text-2xl font-semibold"
              >
                <Users className="h-6 w-6 text-brand-700" />
                Borrower Profile Fit
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-slate-200 transition-shadow hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 shadow-sm">
                      <Users className="h-5 w-5 text-brand-700" />
                    </div>
                    <p className="mb-2 font-semibold text-slate-900">
                      Salaried Borrowers
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Prioritize stability of income proof and clean bureau
                      history. Rate leader is currently{' '}
                      <strong>{lowerRateBank.name}</strong>.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 transition-shadow hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 shadow-sm">
                      <Clock className="h-5 w-5 text-brand-700" />
                    </div>
                    <p className="mb-2 font-semibold text-slate-900">
                      Faster Disbursal Need
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Private-bank workflows can be faster with digital docs;
                      PSU banks can be slower but sometimes more conservative on
                      underwriting.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 transition-shadow hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 shadow-sm">
                      <IndianRupee className="h-5 w-5 text-amber-600" />
                    </div>
                    <p className="mb-2 font-semibold text-slate-900">
                      Lowest Lifetime Cost
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">
                      For long tenure, small rate differences compound
                      meaningfully. Estimate total cost before choosing, not
                      just month-1 EMI.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 transition-shadow hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 shadow-sm">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="mb-2 font-semibold text-slate-900">
                      Self-Employed Cases
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Evaluate income assessment flexibility, additional
                      documentation load, and consistency of bank statement
                      treatment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <div className="no-print flex justify-center rounded-lg border border-slate-100 bg-slate-50 p-2">
              <AdSlot id="compare-mid-2" type="leaderboard" />
            </div>

            <section aria-labelledby="pros-cons-heading">
              <h2
                id="pros-cons-heading"
                className="mb-6 text-2xl font-semibold"
              >
                Pros & Cons
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <Card className="border-slate-200">
                  <CardHeader className="border-b border-slate-200 bg-slate-50">
                    <CardTitle className="text-lg">{b1.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-5">
                    <div>
                      <h3 className="mb-2 flex items-center gap-2 font-semibold text-brand-700">
                        <CheckCircle2 className="h-4 w-4" /> Pros
                      </h3>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Current starting rate: {b1.rate}%</li>
                        <li>• Max published band: {b1.maxRate}%</li>
                        <li>
                          •{' '}
                          {isPsuBank(b1.slug)
                            ? 'Strong branch-led service footprint'
                            : 'Generally strong digital customer journey'}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 flex items-center gap-2 font-semibold text-red-700">
                        <XCircle className="h-4 w-4" /> Cons
                      </h3>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Final offered rate depends on profile quality</li>
                        <li>
                          • Turnaround can vary by city/property complexity
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader className="border-b border-slate-200 bg-slate-50">
                    <CardTitle className="text-lg">{b2.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-5">
                    <div>
                      <h3 className="mb-2 flex items-center gap-2 font-semibold text-brand-700">
                        <CheckCircle2 className="h-4 w-4" /> Pros
                      </h3>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Current starting rate: {b2.rate}%</li>
                        <li>• Max published band: {b2.maxRate}%</li>
                        <li>
                          •{' '}
                          {isPsuBank(b2.slug)
                            ? 'Strong branch-led service footprint'
                            : 'Generally strong digital customer journey'}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 flex items-center gap-2 font-semibold text-red-700">
                        <XCircle className="h-4 w-4" /> Cons
                      </h3>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Final offered rate depends on profile quality</li>
                        <li>
                          • Turnaround can vary by city/property complexity
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200 bg-slate-50">
                <CardTitle className="text-lg font-semibold">
                  Choose Your Next Step by Intent
                </CardTitle>
                <CardDescription>
                  Follow the path that matches your stage: discovery,
                  validation, or decision.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-5">
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="mb-2 text-sm font-semibold text-slate-900">
                    1) I&apos;m still shortlisting lenders
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <Link
                      className="text-brand-700 hover:underline"
                      href="/compare-loans/"
                    >
                      Compare Loans Hub
                    </Link>
                    <Link
                      className="text-brand-700 hover:underline"
                      href="/home-loan-rates/"
                    >
                      Current Home Loan Rates
                    </Link>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="mb-2 text-sm font-semibold text-slate-900">
                    2) I want to validate affordability
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <Link
                      className="text-brand-700 hover:underline"
                      href="/loans/home-loan/"
                    >
                      Home Loan EMI Calculator
                    </Link>
                    <Link
                      className="text-brand-700 hover:underline"
                      href="/emi-calculator/"
                    >
                      General EMI Calculator
                    </Link>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="mb-2 text-sm font-semibold text-slate-900">
                    3) I&apos;m close to decision and documentation
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <Link
                      className="text-brand-700 hover:underline"
                      href="/guides/home-loan-guide/"
                    >
                      Home Loan Guide
                    </Link>
                    <Link
                      className="text-brand-700 hover:underline"
                      href="/guides/home-loan-first-time-buyers/"
                    >
                      First-Time Buyer Checklist
                    </Link>
                    <Link
                      className="text-brand-700 hover:underline"
                      href="/credit-score/"
                    >
                      Credit Score Estimator
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <section aria-labelledby="comparison-faq-heading">
              <h2
                id="comparison-faq-heading"
                className="mb-6 flex items-center gap-2 text-2xl font-semibold"
              >
                <HelpCircle className="h-6 w-6 text-brand-700" />
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.question}
                    value={`faq-${i}`}
                    className="rounded-lg border border-slate-200 bg-white px-5"
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-800 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 leading-relaxed text-slate-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <FAQSchema faqs={faqs} />
            </section>

            <Card className="border-brand-200 bg-linear-to-br from-brand-50 to-brand-50 shadow-md">
              <CardContent className="space-y-5 p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 shadow-lg">
                    <TrendingDown className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-brand-900">
                    Final Verdict
                  </h2>
                </div>

                <p className="leading-relaxed text-brand-900">
                  If your top priority is minimizing long-term repayment,{' '}
                  <strong>{lowerRateBank.name}</strong> currently leads on rate.
                  If your top priority is faster process and app-driven
                  servicing, compare turnaround and digital journey quality
                  before finalizing. <strong>Pair-specific lens:</strong>{' '}
                  {comparisonAngle.body}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="bg-brand-600 text-white shadow-md hover:bg-brand-700"
                  >
                    <Link href="/emi-calculator/">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate EMI Impact
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-brand-500 text-brand-600 hover:bg-brand-50"
                  >
                    <Link href="/compare-loans/">
                      <Scale className="mr-2 h-4 w-4" />
                      Compare More Banks
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <AuthorBio />
          </div>

          <aside className="mb-12 space-y-6 lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <Card className="border-slate-200 shadow-md">
                <CardHeader className="border-b border-slate-200 bg-linear-to-r from-brand-50 to-brand-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 shadow-sm">
                      <Calculator className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-base font-semibold">
                      Calculate Your EMI
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-5">
                  <p className="text-sm leading-relaxed text-slate-600">
                    Check exact EMI impact between {b1.name} and {b2.name} using
                    your own amount, tenure, and expected rate.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-brand-700 text-white hover:bg-brand-700"
                  >
                    <Link href="/emi-calculator/">
                      <Calculator className="mr-2 h-4 w-4" />
                      Open EMI Calculator
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader className="border-b border-slate-200 bg-slate-50">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <Info className="h-4 w-4 text-brand-700" />
                    Key Takeaways
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    <p className="text-sm text-slate-600">
                      <strong>{lowerRateBank.name}</strong> has the lower
                      published starting rate by {rateDiff.toFixed(2)}%.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    <p className="text-sm text-slate-600">
                      Illustrative savings: {formatINR(lifetimeSaving)} over 20
                      years (₹50 lakh sample).
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    <p className="text-sm text-slate-600">
                      Compare sanction terms, reset frequency, and all fees
                      before locking your lender.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <FinancialNavWidget />

              <div className="no-print flex min-h-62.5 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <AdSlot id="compare-sidebar" type="box" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
