import { banks } from '@/lib/banks';
import cities from '@/data/cities.json';
import { notFound } from 'next/navigation';
import EMIClient from '@/app/emi-calculator/EMIClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompetitors } from '@/lib/localData';

// --- UI COMPONENTS ---
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
  CheckCircle2,
  TrendingUp,
  MapPin,
  HelpCircle,
  ArrowRight,
  Percent,
  ShieldCheck,
} from 'lucide-react';

/* ---------------- LOGIC (UNTOUCHED) ---------------- */

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

  return {
    title: `${bank.name} EMI Calculator 2025: Check Home Loan Rates`,
    description: `Calculate ${bank.name} Home Loan EMI instantly. Current interest rates start at ${bank.rate}%. Compare repayment schedules and processing fees.`,
    alternates: {
      canonical: `https://www.fincado.com/bank-emi/${bank.slug}`,
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

  // 1. Get Competitor Data for Comparison Table
  const competitorSlugs = getCompetitors(bank.slug);
  const competitorBanks = banks.filter((b) => competitorSlugs.includes(b.slug));

  // 2. Select Top Cities for Internal Linking (Boosts SEO for city pages)
  const topCities = cities.slice(0, 12);

  // 3. Dynamic Schema for FAQs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the current home loan interest rate of ${bank.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${bank.name} home loan interest rates currently start from ${bank.rate}% per annum for eligible borrowers.`,
        },
      },
      {
        '@type': 'Question',
        name: `How can I reduce my ${bank.name} EMI?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can reduce your EMI by making a partial prepayment, opting for a longer tenure, or negotiating a lower interest rate if your credit score has improved.',
        },
      },
    ],
  };

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* --- SCHEMAS --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Banks', url: 'https://www.fincado.com/bank-emi' },
          {
            name: bank.name,
            url: `https://www.fincado.com/bank-emi/${bank.slug}`,
          },
        ]}
      />
      <CalculatorSchema
        name={`${bank.name} EMI Calculator`}
        description={`Official style EMI calculator for ${bank.name} loans with amortization schedule.`}
        url={`https://www.fincado.com/bank-emi/${bank.slug}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* --- LEFT COLUMN (Content) --- */}
        <div className="lg:col-span-8 min-w-0">
          {/* HEADER */}
          <header className="my-10">
            <Badge
              variant="secondary"
              className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-200 px-3 py-1 font-semibold uppercase tracking-wider"
            >
              Updated for 2025
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {bank.name} EMI Calculator
            </h1>

            <div className="mb-6">
              <ShareTools title={`${bank.name} EMI Calculator`} />
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">
              Planning to take a loan from{' '}
              <strong className="text-slate-900">{bank.name}</strong>? Use this
              tool to calculate your monthly EMI instantly. With interest rates
              starting at{' '}
              <strong className="text-emerald-600">{bank.rate}%</strong>,{' '}
              {bank.name} is a top choice for borrowers looking for flexible
              repayment options.
            </p>
          </header>

          {/* AD SLOT: High Visibility */}
          <div className="mb-10 bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center no-print">
            <AdSlot
              id="bank-top-leaderboard"
              type="leaderboard"
              label="Sponsored"
            />
          </div>

          {/* CALCULATOR SECTION */}
          <Card className="mb-12 border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <Percent className="h-5 w-5 text-emerald-600" />
                Calculate Your EMI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 bg-white">
              <EMIClient defaultRate={bank.rate} />

              {/* --- TRUST BUILDER: Rate Variance Explanation --- */}
              <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-full shrink-0">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-blue-900">
                      Why do interest rates vary?
                    </h4>
                    <p className="text-sm text-blue-800/80 leading-relaxed">
                      The rates shown (e.g., {bank.rate}% - {bank.maxRate}%) are
                      based on current market data. Banks determine your final
                      rate based on your <strong>Credit Score</strong>,{' '}
                      <strong>Income Source</strong>, and{' '}
                      <strong>Loan Amount</strong>.
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      *Calculations are estimates for planning purposes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CONTENT SECTION 1: Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-sky-600" />
              Why Choose {bank.name} for Your Home Loan?
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {bank.name} is one of the leading lenders in India, offering
              competitive rates and transparent processing. Key benefits
              include:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Low Interest Rates',
                  desc: `Starting from ${bank.rate}% p.a. based on CIBIL score.`,
                },
                {
                  title: 'Long Tenure',
                  desc: 'Repayment options up to 30 years to reduce monthly burden.',
                },
                {
                  title: 'No Hidden Charges',
                  desc: 'Transparent processing fees (typically 0.5% - 1%).',
                },
                {
                  title: 'Digital Sanction',
                  desc: 'Quick online approval capability for pre-approved customers.',
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="border-l-4 border-l-emerald-500 shadow-sm"
                >
                  <CardContent className="p-4">
                    <h4 className="font-bold text-slate-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CONTENT SECTION 2: Comparison Table */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Compare {bank.name} vs Other Banks
              </h3>
              <p className="text-slate-600 mb-6">
                See how {bank.name} stacks up against its main competitors in
                the market:
              </p>

              <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-slate-700">
                        Bank
                      </TableHead>
                      <TableHead className="font-bold text-slate-700">
                        Interest Rate Range
                      </TableHead>
                      <TableHead className="font-bold text-slate-700">
                        Max Tenure
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Current Bank Row */}
                    <TableRow className="bg-emerald-50/60 hover:bg-emerald-50">
                      <TableCell className="font-bold text-slate-900">
                        {bank.name}
                      </TableCell>
                      <TableCell className="font-bold text-emerald-700">
                        {bank.rate}% - {bank.maxRate}%
                      </TableCell>
                      <TableCell>30 Years</TableCell>
                    </TableRow>

                    {/* Competitor Rows */}
                    {competitorBanks.map((comp) => (
                      <TableRow key={comp.slug}>
                        <TableCell>
                          <Link
                            href={`/bank-emi/${comp.slug}`}
                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                          >
                            {comp.name}
                          </Link>
                        </TableCell>
                        <TableCell>{comp.rate}% Onwards</TableCell>
                        <TableCell>30 Years</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-slate-400 mt-3 italic">
                *Interest rates are subject to change and depend on credit
                profile.
              </p>
            </div>
          </section>

          {/* AD SLOT: Mid Content */}
          <div className="my-10 flex justify-center no-print">
            <AdSlot
              id="bank-mid-rectangle"
              type="rectangle"
              label="Suggested"
            />
          </div>

          {/* CONTENT SECTION 3: Localized Links (Hub & Spoke Strategy) */}
          <Card className="mb-12 bg-slate-50/50 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5 text-red-500" />
                Calculate {bank.name} EMI for Your City
              </CardTitle>
              <CardDescription>
                Interest rates and property norms can vary by location. Select
                your city to get precise details:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {topCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/bank-emi/${bank.slug}/${city.slug}`}
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

          {/* CONTENT SECTION 4: FAQs */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
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
                  As of 2025, {bank.name} offers home loan interest rates
                  starting from <strong>{bank.rate}% p.a.</strong> for salaried
                  employees with a credit score above 750. Rates may be slightly
                  higher for self-employed applicants.
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
                  Standard documents include KYC (Aadhaar/PAN), Income Proof
                  (Salary Slips/ITR), Bank Statements (last 6 months), and
                  Property Documents (Agreement to Sell, Chain Deeds).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        {/* --- RIGHT COLUMN (Sidebar) --- */}
        <aside className="lg:col-span-4 space-y-8 mt-12">
          {/* Comparison Card */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800">
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
                        href={`/bank-emi/${other.slug}`}
                        className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors group"
                      >
                        <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">
                          {other.name}
                        </span>
                        <div className="flex items-center gap-2">
                          {/* Added 'title' for hover tooltip */}
                          <span
                            title="Indicative range. Actual rate depends on credit score."
                            className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full whitespace-nowrap cursor-help"
                          >
                            {other.rate} - {other.maxRate}%*
                          </span>
                          <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-blue-500" />
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>

              {/* --- TRUST BUILDER: Disclaimer Footer --- */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-100">
                <p className="text-[10px] text-slate-500 leading-tight">
                  *Rates are indicative ranges based on recent market trends.
                  <span className="hidden sm:inline">
                    {' '}
                    Visit the specific bank page for exact eligibility details.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sticky Sidebar Ad */}
          <div className="sticky top-24 z-10 no-print">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot type="box" id="bank-sidebar" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
