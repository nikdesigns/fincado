import { banks, RATE_DISCLAIMER } from '@/lib/banks';
import { notFound } from 'next/navigation';
import EMIClient from '@/app/emi-calculator/EMIClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import ShareTools from '@/components/ShareTools';
import LegalNote from '@/components/LegalNote';
import AuthorBio from '@/components/AuthorBio';
import BankSelector from '@/components/BankSelector';
import StickyCompareFooter from '@/components/StickyCompareFooter';
import CalculatorSchema from '@/components/CalculatorSchema';
import DataSourcesCard from '@/components/DataSourcesCard';
import HelpfulWidget from '@/components/HelpfulWidget';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getCityData,
  getCompetitors,
  cityDetails,
  getStateInfo,
  parsePropertyRate,
} from '@/lib/localData';
import { getBankRates } from '@/lib/getBankRates';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  TrendingUp,
  HelpCircle,
  ArrowRight,
  Percent,
  ShieldCheck,
  FileText,
  Home,
  Info,
  GitCompare,
  Calculator,
  ListChecks,
  Landmark,
  AlertTriangle,
} from 'lucide-react';
import TaxUpdateBanner from '@/components/TaxUpdateBanner';

export const dynamicParams = false;

export async function generateStaticParams(): Promise<
  { bank: string; city: string }[]
> {
  const params: { bank: string; city: string }[] = [];
  const supportedCities = Object.keys(cityDetails);

  for (const bank of banks) {
    for (const citySlug of supportedCities) {
      if (citySlug !== 'default') {
        params.push({ bank: bank.slug, city: citySlug });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bank: string; city: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const bank = banks.find((b) => b.slug === resolvedParams.bank);
  if (!bank) return {};

  const cityData = getCityData(resolvedParams.city);
  const liveRates = await getBankRates();

  const latestHomeRate =
    liveRates.find((r) => r.bank === bank.slug)?.homeLoan ?? bank.rate;
  const upperRate = Math.max(bank.maxRate, latestHomeRate);

  const title = `${bank.name} Home Loan in ${cityData.name} 2026-27: EMI, Rates & Tax Benefits`;
  const description = `Calculate ${bank.name} home loan EMI in ${cityData.name} for Tax Year 2026-27 under Income Tax Act 2025. Updated rates ${latestHomeRate}%–${upperRate}%. Section 80C & 24(b) tax benefits available only in Old Regime. Local property rates, documents & eligibility.`;

  const url = `https://fincado.com/bank-emi/${bank.slug}/${cityData.slug}/`;

  return {
    title,
    description,
    keywords: [
      `${bank.name} home loan ${cityData.name}`,
      `${bank.name} EMI calculator ${cityData.name}`,
      `${cityData.name} home loan interest rate 2026-27`,
      `${bank.name} home loan tax benefits ${cityData.name}`,
      `Tax Year 2026-27 ${bank.name} ${cityData.name}`,
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

function calculateEMI(principal: number, rate: number, years: number) {
  const r = rate / 12 / 100;
  const n = years * 12;

  if (principal <= 0 || rate <= 0 || years <= 0) return 0;

  const denominator = Math.pow(1 + r, n) - 1;
  if (denominator <= 0) return 0;

  return Math.round((principal * r * Math.pow(1 + r, n)) / denominator);
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0);
}

export default async function BankCityPage({
  params,
}: {
  params: Promise<{ bank: string; city: string }>;
}) {
  const resolvedParams = await params;
  const bank = banks.find((b) => b.slug === resolvedParams.bank);
  if (!bank) return notFound();

  const cityData = getCityData(resolvedParams.city);
  const liveRates = await getBankRates();

  const getLatestHomeRate = (slug: string, fallback: number) =>
    liveRates.find((r) => r.bank === slug)?.homeLoan ?? fallback;

  const latestUpdatedAt =
    liveRates.length > 0
      ? [...liveRates].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
          .updatedAt
      : 'N/A';

  const bankHomeRate = getLatestHomeRate(bank.slug, bank.rate);
  const bankMaxRate = Math.max(bank.maxRate, bankHomeRate);

  const competitorSlugs = getCompetitors(bank.slug);
  const competitorBanks = banks.filter((b) => competitorSlugs.includes(b.slug));
  const stateInfo = getStateInfo(resolvedParams.city);
  const rates = parsePropertyRate(cityData.avgPropertyRate);

  const avgHomeSize = 1000;
  const estimatedHomeCost = rates.avg * avgHomeSize;
  const loanAmount = Math.round(estimatedHomeCost * 0.8);
  const estimatedEMI = calculateEMI(loanAmount, bankHomeRate, 20);
  const allInInterest = estimatedEMI * 12 * 20 - loanAmount;
  const otherArea = cityData.areas[1] || cityData.areas[0] || cityData.name;

  const BANK_SOURCE_URLS: Record<string, string> = {
    sbi: 'https://sbi.co.in/',
    hdfc: 'https://www.hdfcbank.com/',
    icici: 'https://www.icicibank.com/',
    axis: 'https://www.axisbank.com/',
    kotak: 'https://www.kotak.com/',
    pnb: 'https://www.pnbindia.in/',
    bob: 'https://www.bankofbaroda.in/',
  };

  const bankRateSourceUrl =
    BANK_SOURCE_URLS[bank.slug] ?? 'https://fincado.com/';

  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: `${bank.name} Home Loan in ${cityData.name}`,
    provider: {
      '@type': 'BankOrCreditUnion',
      name: bank.name,
    },
    areaServed: cityData.name,
    interestRate: `${bankHomeRate}%`,
    loanTerm: 'P20Y',
    url: `https://fincado.com/bank-emi/${bank.slug}/${cityData.slug}/`,
    description: `Home loan EMI and rate comparison for ${cityData.name}.`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${bank.name} home loan interest rate in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${bank.name} rates in ${cityData.name} generally start from ${bankHomeRate}% and may go up to ${bankMaxRate}% based on credit score, income, and property profile.`,
        },
      },
      {
        '@type': 'Question',
        name: `How much EMI for a typical home in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `At an estimated property value based on ${cityData.avgPropertyRate} and 80% LTV, EMI works out to around ${formatCurrency(estimatedEMI)} for 20 years at ${bankHomeRate}%.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which approvals are important in ${cityData.name} home loan files?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Projects with valid ${cityData.authority} and ${stateInfo.regulator} aligned approvals usually move faster in legal and technical checks.`,
        },
      },
      {
        '@type': 'Question',
        name: `Are home loan tax benefits available in the New Regime in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `No. Section 80C and Section 24(b) deductions are available only in the Old Regime. New Regime is the default from Tax Year 2026-27. Use our Income Tax Calculator to compare both regimes.`,
        },
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: competitorBanks.slice(0, 6).map((comp, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${comp.name} Home Loan in ${cityData.name}`,
      url: `https://fincado.com/bank-emi/${comp.slug}/${cityData.slug}/`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Banks', url: 'https://fincado.com/bank-emi/' },
          {
            name: bank.name,
            url: `https://fincado.com/bank-emi/${bank.slug}/`,
          },
          {
            name: cityData.name,
            url: `https://fincado.com/bank-emi/${bank.slug}/${cityData.slug}/`,
          },
        ]}
      />

      <CalculatorSchema
        name={`${bank.name} EMI Calculator in ${cityData.name}`}
        description={`EMI calculator for ${bank.name} home loans in ${cityData.name} with local affordability and documentation insights.`}
        url={`https://fincado.com/bank-emi/${bank.slug}/${cityData.slug}/`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 min-w-0 my-12">
          <header className="my-10">
            {/* Tax Year 2026-27 Banner - Consistent across all calculators */}
            <TaxUpdateBanner />

            <Badge
              variant="secondary"
              className="mb-4 bg-[#EFFBE2] text-[#577A30] hover:bg-[#DFF7C6] px-3 py-1 font-semibold uppercase tracking-wider"
            >
              Tax Year 2026-27 • {cityData.name}
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-4">
              {bank.name} Home Loan in {cityData.name}
            </h1>

            <div className="mb-6">
              <ShareTools title={`${bank.name} Loan in ${cityData.name}`} />
            </div>

            <p className="text-base text-slate-700 leading-relaxed">
              Looking for the best home loan option in {cityData.name}? Current
              tracked rates start around {bankHomeRate}% for eligible borrowers,
              but final pricing depends on credit score, income, and property
              profile. Use this page to compare major lenders, estimate EMI
              instantly, and review local document requirements before applying.
            </p>
            <p className="text-sm text-slate-600 mt-3">
              Home loan tax benefits under <strong>Section 80C</strong>{' '}
              (principal) and <strong>Section 24(b)</strong> (interest) are
              available <strong>only if you opt for the Old Regime</strong> in
              Tax Year 2026-27. New Regime is the default.
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
                  <p className="text-xs text-slate-500">Rate can go up to</p>
                  <p className="text-xl font-semibold text-slate-900">
                    {bankMaxRate}%
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500">Avg city rate</p>
                  <p className="text-xl font-semibold text-slate-900">
                    {cityData.avgPropertyRate}
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
                href="#city-calculator"
              >
                EMI estimator
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#affordability"
              >
                City affordability snapshot
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#documents"
              >
                Documents checklist
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#comparison"
              >
                Bank comparison
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#faqs"
              >
                City FAQs
              </Link>
            </CardContent>
          </Card>

          <div className="mb-10 bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center no-print">
            <AdSlot
              id="bank-city-top-ad"
              type="leaderboard"
              label="Sponsored"
            />
          </div>

          <Card
            id="affordability"
            className="mb-12 bg-white text-slate-800 border border-slate-200 overflow-hidden relative scroll-mt-24"
          >
            <div className="absolute top-0 right-0 p-32 bg-slate-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-6 sm:p-8 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-slate-500" />
                <h2 className="text-xl font-semibold">
                  Real cost snapshot for {cityData.name}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Estimated property cost ({avgHomeSize} sqft)
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-800">
                    {formatCurrency(estimatedHomeCost)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Computed from average city range {cityData.avgPropertyRate}
                  </p>
                </div>

                <div>
                  <p className="text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Estimated loan amount (80% LTV)
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-800">
                    {formatCurrency(loanAmount)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Higher down payment can reduce both EMI and total interest
                  </p>
                </div>

                <div className="bg-[#F7FDF1] rounded-xl p-4 border border-[#DFF7C6]">
                  <p className="text-[#577A30] text-xs uppercase tracking-wider mb-1 font-semibold">
                    Estimated EMI (20 years)
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold text-[#1B2E06]">
                    {formatCurrency(estimatedEMI)}
                  </p>
                  <p className="text-xs text-[#577A30] mt-1">
                    At {bankHomeRate}% p.a. with {bank.name}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                Estimated lifetime interest at this scenario:{' '}
                <strong>{formatCurrency(allInInterest)}</strong>. Always compare
                total outgo, not EMI only.
              </div>
            </CardContent>
          </Card>

          <Card
            id="city-calculator"
            className="mb-12 border-slate-200 shadow-sm overflow-hidden scroll-mt-24"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                <Percent className="h-5 w-5 text-[#577A30]" />
                EMI Estimator for {cityData.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 bg-white">
              <EMIClient
                defaultRate={bankHomeRate}
                defaultPrincipal={loanAmount}
                defaultTenure={20}
              />

              <Alert className="mt-6 bg-blue-50/50 border-blue-100 rounded-xl">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-800 leading-relaxed italic">
                  <strong>Planning tip:</strong> Run this calculator at both{' '}
                  {bankHomeRate}% and {bankMaxRate}% to prepare for best-case
                  and conservative EMI scenarios.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <GitCompare className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-slate-900">
                Compare {bank.name} vs Others in {cityData.name}
              </h2>
            </div>
            <BankSelector />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Home className="h-6 w-6 text-[#577A30]" />
              {cityData.name} market insights for borrowers
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-slate-900 text-sm mb-2 uppercase tracking-wide">
                    Avg property rate
                  </h4>
                  <p className="text-xl font-semibold text-[#577A30]">
                    {cityData.avgPropertyRate}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Per square foot in {cityData.name}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-slate-900 text-sm mb-2 uppercase tracking-wide">
                    Primary authority
                  </h4>
                  <p className="text-xl font-semibold text-slate-800">
                    {cityData.authority}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Approval alignment speeds up legal checks
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-slate-900 text-sm mb-2 uppercase tracking-wide">
                    Local hotspot coverage
                  </h4>
                  <p className="text-sm text-slate-700">
                    {cityData.areas.slice(0, 4).join(', ')}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Useful while checking branch/legal facilitation availability
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <ListChecks className="h-6 w-6 text-indigo-600" />
              Smart repayment strategy in {cityData.name}
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Choose EMI under 35-40% of monthly take-home for flexibility.',
                'Keep emergency reserve before increasing down payment too aggressively.',
                'Use annual bonus for part-prepayment and reduce tenure, not EMI.',
                `Track reset cycles: rate changes impact floating loans in ${cityData.name} markets as well.`,
              ].map((tip) => (
                <Card
                  key={tip}
                  className="border-l-4 border-l-indigo-500 shadow-sm"
                >
                  <CardContent className="p-4 text-sm text-slate-700">
                    {tip}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              Keep buffer for maintenance, taxes, and fit-out costs which are
              often underestimated in city purchases.
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Landmark className="h-6 w-6 text-emerald-600" />
              {bank.name} loan file signals in {cityData.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-slate-200">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Local approval and regulator alignment
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    For {cityData.name} applications, title and sanction flow is
                    generally smoother when project documents are aligned with{' '}
                    <strong>{cityData.authority}</strong> and{' '}
                    <strong>{stateInfo.regulator}</strong> norms.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Postal-zone and micro-market checks
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Properties in {cityData.pincodeStart}*** ranges around{' '}
                    <strong>{cityData.areas[0]}</strong> and{' '}
                    <strong>{otherArea}</strong> may show different valuation
                    outcomes, which can influence approved amount and EMI.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-sm text-slate-600 mt-4">
              Need broader city coverage? Explore all regions on{' '}
              <Link
                href="/locations/"
                className="text-blue-600 hover:underline"
              >
                city pages
              </Link>{' '}
              or compare lenders from the{' '}
              <Link href="/bank-emi/" className="text-blue-600 hover:underline">
                bank EMI hub
              </Link>
              .
            </p>
          </section>

          <section
            id="documents"
            className="mb-12 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm scroll-mt-24"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-sky-600" />
              Documents for {stateInfo.state}
            </h3>

            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed">
              <p>
                For {bank.name} file processing in{' '}
                <strong>{cityData.name}</strong>, keep KYC, income, and property
                papers ready as per <strong>{stateInfo.regulator}</strong> and
                local authority requirements.
              </p>

              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                {stateInfo.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                    {doc}
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                  {cityData.authority} approved plan / sanctioned map
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                  Latest property tax receipt and utility dues status
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                  6–12 months bank statement and salary/ITR proof
                </li>
              </ul>
            </div>
          </section>

          <section id="comparison" className="mb-12 scroll-mt-24">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Bank rate comparison in {cityData.name}
            </h3>

            <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">
                      Lender
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Interest Range
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Coverage
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-[#F7FDF1]/60 hover:bg-[#F7FDF1]">
                    <TableCell className="font-semibold text-slate-900">
                      {bank.name}
                    </TableCell>
                    <TableCell className="font-semibold text-[#577A30]">
                      {bankHomeRate}% - {bankMaxRate}%
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {cityData.areas[0]}, {otherArea}
                    </TableCell>
                  </TableRow>

                  {competitorBanks.map((comp) => (
                    <TableRow key={comp.slug}>
                      <TableCell>
                        <Link
                          href={`/bank-emi/${comp.slug}/${resolvedParams.city}/`}
                          className="text-blue-600 font-medium hover:underline"
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
                      <TableCell className="text-xs text-slate-500">
                        City-wide
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <p className="text-xs text-slate-500 mt-3">{RATE_DISCLAIMER}</p>
          </section>

          <section id="faqs" className="mb-12 scroll-mt-24">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-amber-500" />
              {cityData.name} home loan FAQs
            </h3>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className="bg-white border rounded-lg mb-3 px-4"
              >
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  📍 Where are {bank.name} branches in {cityData.name}?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                  {bank.name} generally supports borrowers across key areas like{' '}
                  {cityData.areas[0]} and {otherArea}. Exact processing branch
                  can vary by project location and loan type.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white border rounded-lg mb-3 px-4"
              >
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  🏢 Are {cityData.authority} approved projects easier for loan
                  sanction?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                  Usually yes. Files with cleaner title chain and correct
                  authority/regulator compliance are often processed faster in
                  legal and technical checks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-white border rounded-lg mb-3 px-4"
              >
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  💡 Should I reduce EMI or tenure after prepayment?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                  In most cases, tenure reduction saves more total interest. Use
                  the calculator above to compare both outcomes before choosing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <DataSourcesCard
            bankName={bank.name}
            bankRateUrl={bankRateSourceUrl}
            updatedAt={latestUpdatedAt}
          />

          <HelpfulWidget pageKey={`bank-emi-${bank.slug}-${cityData.slug}`} />

          <LegalNote />
          <AuthorBio />
        </div>

        <aside className="lg:col-span-4 space-y-8 my-12">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-100">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Top Banks in {cityData.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <ul className="divide-y divide-slate-100">
                {banks
                  .filter((b) => b.slug !== bank.slug)
                  .slice(0, 10)
                  .map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/bank-emi/${other.slug}/${resolvedParams.city}/`}
                        className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors group"
                      >
                        <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">
                          {other.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-[#F7FDF1] text-[#577A30] border-none font-semibold"
                          >
                            {other.rate}%
                          </Badge>
                          <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-blue-500" />
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[#DFF7C6] bg-[#F7FDF1]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-[#1B2E06] flex items-center gap-2">
                <Landmark className="h-4 w-4" /> Local compliance signal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-[#577A30] space-y-1">
              <p>
                State: <strong>{stateInfo.state}</strong>
              </p>
              <p>
                Regulator: <strong>{stateInfo.regulator}</strong>
              </p>
              <p>
                Authority: <strong>{cityData.authority}</strong>
              </p>
            </CardContent>
          </Card>

          <div className="sticky top-24 z-10 no-print space-y-6">
            <div className="bg-[#F7FDF1] border border-[#EFFBE2] rounded-xl p-6">
              <ShieldCheck className="w-8 h-8 text-[#577A30] mb-3" />
              <h4 className="font-semibold text-[#1B2E06] text-sm mb-1">
                RBI-linked floating rates
              </h4>
              <p className="text-xs text-[#577A30] font-medium leading-relaxed italic">
                Floating rates for {cityData.name} properties can change with
                repo and spread revisions. Recheck before final sanction.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot id="bank-city-sidebar-sticky" type="box" />
            </div>
          </div>
        </aside>
      </div>

      <StickyCompareFooter bankName={bank.name} bankSlug={bank.slug} />
    </main>
  );
}
