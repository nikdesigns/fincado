import { banks, RATE_DISCLAIMER } from '@/lib/banks';
import cities from '@/data/cities.json';
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
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  IndianRupee,
  ListChecks,
  MapPin,
  Percent,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

/* ---------------- LOGIC ---------------- */
export async function generateStaticParams() {
  return banks.map((bank) => ({ bank: bank.slug }));
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
  const competitorBanks = banks.filter((b) => competitorSlugs.includes(b.slug));
  const topCities = cities.slice(0, 12);
  const bankHomeRate = getLatestHomeRate(bank.slug, bank.rate);
  const bankMaxRate = Math.max(bank.maxRate, bankHomeRate);
  const avgRate = ((bankHomeRate + bankMaxRate) / 2).toFixed(2);

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
          text: `${bank.name} home loan rates typically start from ${bank.rate}% and may go up to ${bank.maxRate}% depending on credit score, LTV ratio, and borrower profile (Tax Year 2026-27).`,
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
    itemListElement: competitorBanks.slice(0, 5).map((comp, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${comp.name} EMI Calculator`,
      url: `https://fincado.com/bank-emi/${comp.slug}/`,
    })),
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* --- LEFT COLUMN (Content) --- */}
        <div className="lg:col-span-8 min-w-0">
          <header className="my-10">
            {/* Tax Year 2026-27 Banner */}
            <TaxUpdateBanner />

            <Badge
              variant="secondary"
              className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-200 px-3 py-1 font-semibold uppercase tracking-wider"
            >
              Updated for Tax Year 2026-27
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-4">
              {bank.name} EMI Calculator
            </h1>

            <div className="mb-6">
              <ShareTools title={`${bank.name} EMI Calculator`} />
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">
              Use this page to calculate your monthly EMI, total interest outgo,
              and repayment strategy for <strong>{bank.name}</strong> home
              loans. Current indicative rates range between{' '}
              <strong className="text-[#577A30]">{bankHomeRate}%</strong> and{' '}
              <strong className="text-[#577A30]">{bankMaxRate}%</strong>.
            </p>

            <p className="text-sm text-slate-600 mt-2">
              Home loan tax benefits (Section 80C &amp; 24(b)) are available
              only if you opt for the <strong>Old Regime</strong> in Tax Year
              2026-27.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Latest tracked home-loan rate refresh: {latestUpdatedAt}
            </p>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500">Rate starts from</p>
                  <p className="text-xl font-semibold text-[#577A30]">
                    {bankHomeRate}%
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500">Typical upper band</p>
                  <p className="text-xl font-semibold text-slate-900">
                    {bankMaxRate}%
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500">
                    Mid-rate for planning
                  </p>
                  <p className="text-xl font-semibold text-slate-900">
                    {avgRate}%
                  </p>
                </CardContent>
              </Card>
            </div>
          </header>

          <Card className="mb-10 border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Jump to sections</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-2 text-sm">
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#emi-calculator"
              >
                EMI Calculator
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#how-to-use"
              >
                How to use this calculator
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#eligibility-factors"
              >
                Eligibility & pricing factors
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#compare-banks"
              >
                Compare with other banks
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#city-pages"
              >
                City-wise EMI pages
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#faqs"
              >
                FAQs
              </Link>
            </CardContent>
          </Card>

          <div className="mb-10 bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center no-print">
            <AdSlot
              id="bank-top-leaderboard"
              type="leaderboard"
              label="Sponsored"
            />
          </div>

          <Card
            id="emi-calculator"
            className="mb-12 overflow-hidden border-none shadow-none scroll-mt-24"
          >
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                <Percent className="h-5 w-5 text-[#577A30]" />
                Calculate Your EMI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 bg-white">
              <EMIClient defaultRate={bankHomeRate} />

              <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-full shrink-0">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-blue-900">
                      Why does your final rate differ from advertised rates?
                    </h4>
                    <p className="text-sm text-blue-800/80 leading-relaxed">
                      Final loan pricing is based on credit score, income
                      stability, employer profile, LTV ratio, repayment track
                      record, and product type. Use a slightly higher test rate
                      to stress-test affordability.
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      {RATE_DISCLAIMER}
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      Tax benefits under Section 80C and 24(b) available only in
                      Old Regime (Tax Year 2026-27).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section id="how-to-use" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <ListChecks className="h-6 w-6 text-indigo-600" />
              How to use this {bank.name} EMI calculator (correctly)
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: '1) Enter accurate loan amount',
                  desc: 'Use actual sanctioned amount, not property value. Include top-up only if approved.',
                },
                {
                  title: '2) Test with two rates',
                  desc: `Run once at ${bank.rate}% and once near ${bank.maxRate}% to estimate best/worst-case EMI.`,
                },
                {
                  title: '3) Compare tenures',
                  desc: 'A longer tenure lowers EMI but increases total interest. Evaluate total cost, not EMI alone.',
                },
                {
                  title: '4) Plan prepayments',
                  desc: 'Even 1 extra EMI/year can materially reduce total interest and repayment duration.',
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  className="border-l-4 border-l-indigo-500 shadow-sm"
                >
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-sky-600" />
              Why Choose {bank.name} for Your Home Loan?
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {bank.name} offers competitive pricing and broad borrower
              coverage. Key advantages to evaluate before applying:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Competitive interest range',
                  desc: `Indicative spread: ${bank.rate}% to ${bank.maxRate}% based on borrower profile and risk band.`,
                },
                {
                  title: 'Flexible tenure options',
                  desc: 'Tenure options up to 30 years can improve short-term affordability.',
                },
                {
                  title: 'Transparent charges',
                  desc: 'Review sanction letter for processing fee, legal valuation, and admin charges.',
                },
                {
                  title: 'Rate reset opportunities',
                  desc: 'Existing borrowers may negotiate spreads after score/income improvements.',
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  className="border-l-4 border-l-[#B0EC70] shadow-sm"
                >
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="eligibility-factors" className="mb-12 scroll-mt-24">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-[#577A30]" />
              What affects your {bank.name} home loan EMI and approval?
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="font-semibold text-slate-900">Credit profile</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Higher score usually means lower spread and better sanction
                    odds.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="font-semibold text-slate-900">Income & FOIR</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Banks evaluate existing EMIs and disposable income before
                    deciding limit.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="font-semibold text-slate-900">Property & LTV</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Property type, builder quality, and LTV ratio impact pricing
                    and approval.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="compare-banks" className="mb-12 scroll-mt-24">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Compare {bank.name} vs Other Banks
            </h3>
            <p className="text-slate-600 mb-6">
              Compare pricing bands side-by-side before application:
            </p>

            <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">
                      Bank
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Interest Rate Range
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Max Tenure
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-[#F7FDF1] hover:bg-[#EFFBE2]">
                    <TableCell className="font-semibold text-slate-900">
                      {bank.name}
                    </TableCell>
                    <TableCell className="font-semibold text-[#577A30]">
                      {bankHomeRate}% - {bankMaxRate}%
                    </TableCell>
                    <TableCell>30 Years</TableCell>
                  </TableRow>

                  {competitorBanks.map((comp) => (
                    <TableRow key={comp.slug}>
                      <TableCell>
                        <Link
                          href={`/bank-emi/${comp.slug}/`}
                          className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                          {comp.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {getLatestHomeRate(comp.slug, comp.rate)}% -{' '}
                        {Math.max(
                          comp.maxRate,
                          getLatestHomeRate(comp.slug, comp.rate),
                        )}
                        %
                      </TableCell>
                      <TableCell>30 Years</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <DataSourcesCard
              bankName={bank.name}
              bankRateUrl={BANK_SOURCE_URLS[bank.slug]}
              updatedAt={latestUpdatedAt}
            />

            <HelpfulWidget pageKey={`bank-emi-${bank.slug}`} />

            <AuthorBio />
            <p className="text-xs text-slate-400 mt-3 italic">
              {RATE_DISCLAIMER}
            </p>
          </section>

          <div className="my-10 flex justify-center no-print">
            <AdSlot
              id="bank-mid-rectangle"
              type="rectangle"
              label="Suggested"
            />
          </div>

          <Card className="mb-12 bg-slate-50/50 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarClock className="h-5 w-5 text-orange-500" />
                Smart repayment strategies to reduce total interest
              </CardTitle>
              <CardDescription>
                Use these practical methods after sanction to cut lifetime cost.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-semibold text-slate-900 mb-1">
                  Prefer tenure reduction after prepayment
                </h4>
                <p className="text-sm text-slate-600">
                  Reducing tenure usually saves more interest than reducing EMI.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-semibold text-slate-900 mb-1">
                  Increase EMI when income grows
                </h4>
                <p className="text-sm text-slate-600">
                  Even a 5–10% annual step-up can materially lower total
                  interest.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-semibold text-slate-900 mb-1">
                  Review reset-rate notifications
                </h4>
                <p className="text-sm text-slate-600">
                  Track repo-linked reset dates and request spread revision if
                  eligible.
                </p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Avoid stretching EMI beyond comfortable monthly cash flow to
                    prevent stress in emergencies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            id="city-pages"
            className="mb-12 bg-slate-50/50 border-slate-200 scroll-mt-24"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5 text-red-500" />
                Calculate {bank.name} EMI for Your City
              </CardTitle>
              <CardDescription>
                Rates, stamp duty, and affordability trends can differ by city.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {topCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/bank-emi/${bank.slug}/${city.slug}/`}
                  >
                    <Button
                      variant="outline"
                      className="w-full text-slate-600 hover:text-slate-900 bg-white hover:border-slate-400"
                    >
                      {city.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <FileCheck2 className="h-6 w-6 text-teal-600" />
              Documents checklist before applying
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700 list-none p-0">
              {[
                'Identity & address proof (Aadhaar, PAN, Passport, etc.)',
                'Income documents (salary slips / ITR / P&L for self-employed)',
                'Last 6–12 months bank statements',
                'Property papers (agreement, title chain, approved plan)',
                'Existing loan statements (if balance transfer)',
                'Down payment proof and source of funds',
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-slate-200 bg-white p-3"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="faqs" className="mb-12 scroll-mt-24">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-amber-500" />
              Frequently Asked Questions
            </h3>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className="bg-white border rounded-lg mb-3 px-4"
              >
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  📉 What is the current interest rate for {bank.name}?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                  As of 2026, indicative rates start from{' '}
                  <strong>{bank.rate}%</strong> and can go up to{' '}
                  <strong>{bank.maxRate}%</strong> depending on credit score,
                  income profile, and property risk.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white border rounded-lg mb-3 px-4"
              >
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  📄 What documents are required for {bank.name} loan?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                  Typically KYC, income proof, bank statements, and complete
                  property papers are required. Self-employed borrowers may need
                  additional business financials.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-white border rounded-lg mb-3 px-4"
              >
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  🧾 Should I choose lower EMI or shorter tenure?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                  If affordable, shorter tenure is usually better because it
                  reduces total interest significantly. Use this calculator to
                  compare total outgo under both options.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        {/* --- RIGHT COLUMN (Sidebar) --- */}
        <aside className="lg:col-span-4 space-y-8 my-12">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-100">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Compare with Others
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <ul className="divide-y divide-slate-100">
                {banks
                  .filter((b) => b.slug !== bank.slug)
                  .slice(0, 8)
                  .map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/bank-emi/${other.slug}/`}
                        className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors group"
                      >
                        <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">
                          {other.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            title="Indicative range. Actual rate depends on credit score."
                            className="text-xs font-semibold bg-[#EFFBE2] text-[#577A30] px-2 py-0.5 rounded-full whitespace-nowrap cursor-help"
                          >
                            {other.rate} - {other.maxRate}%*
                          </span>
                          <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-blue-500" />
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>

              <div className="bg-slate-50 px-5 py-3 border-t border-slate-100">
                <p className="text-[10px] text-slate-500 leading-tight">
                  *Rates are indicative ranges based on recent market trends.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="sticky top-24 z-10 no-print">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot type="box" id="bank-sidebar" />
            </div>
          </div>
        </aside>
      </div>

      <StickyCompareFooter bankName={bank.name} bankSlug={bank.slug} />
    </main>
  );
}
