import type { Metadata } from 'next';
import Link from 'next/link';
import EMIClient from '../EMIClient';
import citiesData from '@/data/cities.json';
import AdSlot from '@/components/AdSlot';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import LiveRateTable from '@/components/LiveRateTable';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import LegalNote from '@/components/LegalNote';
import ShareTools from '@/components/ShareTools';
import CalculatorSchema from '@/components/CalculatorSchema';
import {
  getCityData,
  cityDetails,
  getStateInfo,
  parsePropertyRate,
} from '@/lib/localData';
import { banks } from '@/lib/banks';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  CheckCircle2,
  Info,
  FileText,
  TrendingUp,
  ChevronRight,
  Building2,
  Lightbulb,
  Calculator,
  AlertTriangle,
  ListChecks,
  Landmark,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface CityType {
  name: string;
  slug: string;
}

export async function generateStaticParams() {
  const supportedCities = Object.keys(cityDetails);

  return supportedCities
    .filter((slug) => slug !== 'default')
    .map((slug) => ({ city: slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityData(city);

  const title = `EMI Calculator in ${cityData.name} 2026: Home, Car & Personal Loan EMI Guide`;
  const description = `Calculate EMI in ${cityData.name} using current property context (${cityData.avgPropertyRate}), compare lender options, and review ${cityData.authority} / ${cityData.name} documentation checkpoints.`;
  const url = `https://fincado.com/emi-calculator/${city}/`;

  return {
    title,
    description,
    keywords: [
      `EMI calculator ${cityData.name}`,
      `${cityData.name} home loan EMI`,
      `${cityData.name} car loan EMI calculator`,
      `${cityData.name} property loan planning`,
      `${cityData.authority} home loan documents`,
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

export default async function CityEMIPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = getCityData(city);

  const stateInfo = getStateInfo(city);
  const rates = parsePropertyRate(cityData.avgPropertyRate);

  const avgHomeSize = 1000;
  const estimatedHomeCost = rates.avg * avgHomeSize;
  const loanAmount = Math.round(estimatedHomeCost * 0.8);
  const benchmarkRate = 8.75;
  const estimatedEMI = calculateEMI(loanAmount, benchmarkRate, 20);
  const totalInterest = estimatedEMI * 12 * 20 - loanAmount;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is a realistic EMI for buying in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Using average property rates of ${cityData.avgPropertyRate} and 80% LTV, estimated EMI is around ${formatCurrency(estimatedEMI)} at ${benchmarkRate}% for 20 years.`,
        },
      },
      {
        '@type': 'Question',
        name: `How to reduce EMI burden in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Increase down payment, choose manageable tenure, maintain high credit score, and make periodic prepayments to reduce total interest outgo.',
        },
      },
      {
        '@type': 'Question',
        name: `Which authority approvals matter in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Projects with proper ${cityData.authority} and ${stateInfo.regulator} aligned compliance usually face fewer legal/document hurdles during sanction.`,
        },
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: banks.slice(0, 8).map((bank, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${bank.name} loan options in ${cityData.name}`,
      url: `https://fincado.com/bank-emi/${bank.slug}/${city}/`,
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
          {
            name: 'EMI Calculator',
            url: 'https://fincado.com/emi-calculator/',
          },
          {
            name: cityData.name,
            url: `https://fincado.com/emi-calculator/${city}/`,
          },
        ]}
      />
      <CalculatorSchema
        name={`EMI Calculator in ${cityData.name}`}
        description={`Loan EMI calculator for ${cityData.name} with local property context, bank links, and repayment strategy guidance.`}
        url={`https://fincado.com/emi-calculator/${city}/`}
      />

      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 no-print">
        <Link href="/" className="hover:text-[#577A30] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href="/emi-calculator/"
          className="hover:text-[#577A30] transition-colors"
        >
          EMI Calculator
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-medium">{cityData.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8 min-w-0 my-12">
          <header className="mb-10">
            <Badge
              variant="secondary"
              className="mb-4 bg-[#EFFBE2] text-[#577A30] hover:bg-[#DFF7C6] px-3 py-1 font-semibold uppercase tracking-wider text-[10px]"
            >
              {cityData.name} Local Finance Guide
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-6">
              EMI Calculator in{' '}
              <span className="text-[#577A30]">{cityData.name}</span>
            </h1>

            <div className="mb-8 pt-4 border-t border-slate-100">
              <ShareTools title={`EMI Calculator in ${cityData.name} 2026`} />
            </div>

            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Planning to buy a vehicle or property in{' '}
              <strong>{cityData.name}</strong>? Use this EMI calculator with
              local property context ({cityData.avgPropertyRate}) to estimate
              realistic monthly outgo and total repayment burden.
            </p>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500">
                    Average city property range
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {cityData.avgPropertyRate}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500">
                    Primary approval authority
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {cityData.authority}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500">
                    Planning benchmark rate
                  </p>
                  <p className="text-lg font-semibold text-[#577A30]">
                    {benchmarkRate}%
                  </p>
                </CardContent>
              </Card>
            </div>
          </header>

          <Card className="mb-8 border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Jump to sections</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-2 text-sm">
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#city-cost"
              >
                City cost snapshot
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#emi-tool"
              >
                EMI tool
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#bank-offers"
              >
                Bank offers
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#eligibility-docs"
              >
                Eligibility & docs
              </Link>
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="#city-faqs"
              >
                FAQs
              </Link>
            </CardContent>
          </Card>

          <div className="mb-10 no-print flex justify-center">
            <AdSlot id="city-top-leaderboard" type="leaderboard" />
          </div>

          <Card
            id="city-cost"
            className="mb-12 bg-white text-slate-800 border border-slate-200 overflow-hidden relative scroll-mt-24"
          >
            <div className="absolute top-0 right-0 p-32 bg-slate-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-6 sm:p-8 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-slate-500" />
                <h2 className="text-xl font-semibold">
                  Real cost in {cityData.name}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <p className="text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Avg. 2BHK Cost ({avgHomeSize} sqft)
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-800">
                    {formatCurrency(estimatedHomeCost)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Based on avg rate: {cityData.avgPropertyRate}/sqft
                  </p>
                </div>
                <div>
                  <p className="text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Estimated Loan Amount (80% LTV)
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-800">
                    {formatCurrency(loanAmount)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Down-payment size directly changes total interest
                  </p>
                </div>
                <div className="bg-[#F7FDF1] rounded-xl p-4 border border-[#DFF7C6]">
                  <p className="text-[#577A30] text-xs uppercase tracking-wider mb-1 font-semibold">
                    Est. Monthly EMI
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-800">
                    {formatCurrency(estimatedEMI)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    @{benchmarkRate}% for 20 years
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                Total interest outgo (illustrative):{' '}
                <strong>{formatCurrency(totalInterest)}</strong>. Check both EMI
                and total repayment before finalizing tenure.
              </div>
            </CardContent>
          </Card>

          <Card
            id="emi-tool"
            className="mb-12 border-slate-200 shadow-sm overflow-hidden scroll-mt-24"
          >
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                <TrendingUp className="h-5 w-5 text-[#577A30]" />
                Monthly Repayment Estimator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-8 bg-white">
              <EMIClient
                defaultPrincipal={loanAmount}
                defaultRate={benchmarkRate}
              />
              <Alert className="mt-6 bg-slate-50/50 border-slate-200 text-slate-600">
                <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
                <AlertDescription className="ml-2 text-sm leading-relaxed">
                  EMIs are calculated using reducing-balance formulas. Final
                  rates and repayment terms vary by bank, profile, and property
                  quality.
                </AlertDescription>
              </Alert>

              <Alert className="mt-6 bg-blue-50/50 border-blue-100 rounded-xl">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-800 leading-relaxed italic">
                  Pre-filled loan amount: {formatCurrency(loanAmount)} based on{' '}
                  {cityData.name} average property context.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <section id="bank-offers" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-sky-600" />
              Bank offers in {cityData.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {banks.slice(0, 6).map((bank) => (
                <Link key={bank.slug} href={`/bank-emi/${bank.slug}/${city}/`}>
                  <Card className="hover:border-[#D0F4A9] transition-colors cursor-pointer h-full group">
                    <CardContent className="p-4 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <span className="font-semibold text-slate-800 group-hover:text-[#577A30]">
                          {bank.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[10px] whitespace-nowrap"
                        >
                          {bank.rate}%
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">
                        View {cityData.name} bank-specific page →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">
                National Rate Comparison
              </h3>
            </div>
            <LiveRateTable type="homeLoan" />
          </section>

          <section id="eligibility-docs" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-[#577A30]" />
              Loan eligibility & documentation in {cityData.name}
            </h2>

            <Card className="mb-6 border-slate-200">
              <CardContent className="p-5 text-sm text-slate-700 space-y-3">
                <p>
                  Lenders typically assess income stability, repayment track
                  record, existing EMI obligations, and property compliance
                  before sanction.
                </p>
                <p>
                  In {cityData.name}, projects aligned with{' '}
                  <strong>{cityData.authority}</strong> and{' '}
                  <strong>{stateInfo.regulator}</strong> requirements often have
                  smoother verification flows.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50/50 border-slate-200 rounded-2xl mb-8">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-sky-600" />
                  Required Documents ({stateInfo.state})
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-slate-600">
                    {stateInfo.documents.map((doc) => (
                      <li key={doc} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-[#F7FDF1]0" />{' '}
                        {doc}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-[#F7FDF1]0" />{' '}
                      {cityData.authority} sanctioned plan
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-[#F7FDF1]0" />{' '}
                      Salary slips / ITR and bank statements
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-[#F7FDF1]0" /> KYC +
                      address proof + PAN
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="bg-[#F7FDF1] border border-[#EFFBE2] rounded-2xl p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-[#577A30]" />
                <h4 className="font-semibold text-[#1B2E06]">
                  Practical tip for {cityData.name} buyers
                </h4>
              </div>
              <p className="text-sm text-[#577A30] leading-relaxed">
                Compare at least 2–3 lenders for both rate and legal turnaround
                time. A slightly lower rate with delayed disbursement can still
                be costly if your builder payment schedule is time-bound.
              </p>
            </div>

            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              Keep buffer for registration charges, taxes, and interior
              costs—these are usually outside pure EMI planning.
            </div>
          </section>

          <section id="city-faqs" className="mb-12 scroll-mt-24">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <ListChecks className="w-6 h-6 text-[#577A30]" />
              Frequently asked questions ({cityData.name})
            </h3>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-slate-50 border border-slate-200 rounded-lg"
            >
              <AccordionItem value="q1" className="border-none px-4">
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline py-3 text-sm">
                  Does Budget 2026 change EMI formulas in {cityData.name}?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">
                  No. EMI formula remains standard reducing-balance. What
                  changes over time is the linked lending rate/spread and your
                  profile-based final offer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2" className="border-none px-4">
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline py-3 text-sm">
                  Which banks should I compare first in {cityData.name}?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">
                  Start with lenders that have active processing coverage in
                  your micro-market, then compare rate range, processing fee,
                  and legal TAT.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3" className="border-none px-4">
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline py-3 text-sm">
                  Is lower EMI always better?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">
                  Not always. Lower EMI can mean longer tenure and higher total
                  interest. Evaluate both monthly affordability and lifetime
                  repayment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="mb-12 border-t border-slate-100 pt-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF568E]" />
              Explore Other Major Cities
            </h3>
            <div className="flex flex-wrap gap-3">
              {citiesData.slice(0, 12).map((c: CityType) => (
                <Link key={c.slug} href={`/emi-calculator/${c.slug}/`}>
                  <Button
                    variant="outline"
                    className="rounded-full bg-white hover:border-[#F7FDF1]0 hover:text-[#577A30] transition-all text-xs h-9"
                  >
                    {c.name}
                  </Button>
                </Link>
              ))}
            </div>
          </section>

          <Card className="mb-12 border-[#DFF7C6] bg-[#F7FDF1]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-[#1B2E06]">
                <Landmark className="h-4 w-4" /> Local compliance snapshot
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

          <LegalNote />
        </div>

        <aside className="lg:col-span-4 space-y-8 my-12">
          <div className="sticky top-28 space-y-8 no-print">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot id="city-sidebar" type="box" />
            </div>

            <FinancialNavWidget />
          </div>
        </aside>
      </div>
    </main>
  );
}
