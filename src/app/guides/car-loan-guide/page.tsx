import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Car,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Key,
  ShieldCheck,
  XCircle,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Car Loan Guide 2025: Rates, Foreclosure & Hypothecation',
  description:
    'Car loan guide 2025: Compare new vs used car interest rates, understand flat vs reducing rates, foreclosure charges, hypothecation removal (Form 35) & more.',
  keywords: [
    'car loan interest rates 2025',
    'new vs used car loan india',
    'flat rate vs reducing balance car loan',
    'remove hypothecation from rc',
    'car loan foreclosure charges',
    'sbi car loan vs hdfc',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/car-loan-guide/',
  },
  openGraph: {
    title:
      'Car Loan Guide 2025: New vs Used Car Interest Rates & Hypothecation',
    description:
      'Don’t get trapped by Flat Rates. Learn how to save lakhs on your car loan and remove hypothecation easily.',
    url: 'https://fincado.com/guides/car-loan-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/car-loan/car-loan-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Happy family with new car keys',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the interest rate on used car loans?',
    answer:
      'Used car loan interest rates typically range from 8.9% to 15% p.a., which is generally 1-3% higher than new car loans.',
  },
  {
    question: 'How do I remove hypothecation from RC?',
    answer:
      'After closing the loan, obtain an NOC from the lender. Submit Form 35 along with the NOC and original RC to your local RTO to remove the hypothecation.',
  },
  {
    question: 'What is the difference between flat and reducing interest rate?',
    answer:
      'Flat rate calculates interest on the full principal for the entire tenure. Reducing rate calculates interest only on the outstanding balance. A 7% Flat Rate is roughly equal to a 13% Reducing Rate.',
  },
];

export default function CarLoanGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Car Loan Guide',
            url: 'https://fincado.com/guides/car-loan-guide/',
          },
        ]}
      />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'Car Loan Guide 2025: New vs Used Car Interest Rates & Hypothecation',
            description:
              'Complete guide on Car Loans in India: Interest rates, Flat vs Reducing balance, and Hypothecation removal process.',
            image:
              'https://fincado.com/images/guides/car-loan/car-loan-guide-hero.webp',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://fincado.com/logo.png',
              },
            },
            datePublished: '2025-01-20',
            dateModified: '2025-01-20',
          }),
        }}
      />

      {/* --- FAQ SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-lime-100 text-lime-800 hover:bg-lime-200 px-3 py-1"
        >
          Auto Finance
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Car Loan Guide 2025: Rates, Hypothecation & Hidden Traps
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 15 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Jan 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="Car Loan Guide 2025: Rates & Hypothecation" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-slate-100">
          <Image
            src="/images/guides/car-loan/car-loan-guide-hero.webp"
            alt="Indian family celebrating new car delivery"
            fill
            priority
            className="object-cover"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
          Buying a car—whether new or used—is a major financial decision, and choosing the right <strong>car loan</strong> can save you lakhs over the loan tenure. This comprehensive <strong>Car Loan Guide 2025</strong> covers everything from interest rate differences between new and used car loans, the hidden "flat rate" trap, hypothecation removal after loan closure, and smart foreclosure strategies.

          Whether you're hunting for the best <strong>used car loan interest rate</strong> or trying to understand <strong>car loan foreclosure charges</strong>, this guide provides clear, actionable insights to help you make informed decisions.
        `}
          />
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS A CAR LOAN --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Car className="h-6 w-6 text-lime-600" /> What is a Car Loan?
          </h2>
          <p className="mb-6 text-slate-700 leading-relaxed">
            A <strong>car loan</strong> is a secured loan provided by banks,
            NBFCs, and financial institutions to help you purchase a new or used
            car. The vehicle itself serves as collateral, and the lender holds a
            &quot;hypothecation&quot; over the car until the loan is fully
            repaid.
          </p>

          <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
            <h3 className="mb-3 font-semibold text-slate-900">
              Key Components:
            </h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime-500" />
                <span>
                  <strong>Principal Amount:</strong> The loan amount borrowed
                  (typically 70-90% of value).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime-500" />
                <span>
                  <strong>Interest Rate:</strong> Cost of borrowing (percentage
                  per annum).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime-500" />
                <span>
                  <strong>Tenure:</strong> Repayment period, usually 1 to 7
                  years.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime-500" />
                <span>
                  <strong>Hypothecation:</strong> Lender&apos;s legal claim on
                  the vehicle until repayment.
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* --- TOC --- */}
      <Card className="mb-12 border-slate-200 bg-slate-50/50 no-print">
        <CardContent className="p-6">
          <p className="mb-4 text-lg font-bold text-slate-900">
            Table of Contents
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
            <li>
              <a
                href="#how-it-works"
                className="hover:text-lime-600 hover:underline"
              >
                1. How Car Loans Work
              </a>
            </li>
            <li>
              <a
                href="#new-vs-used"
                className="hover:text-lime-600 hover:underline"
              >
                2. New vs Used Car Loans
              </a>
            </li>
            <li>
              <a
                href="#flat-rate-trap"
                className="hover:text-lime-600 hover:underline"
              >
                3. The &ldquo;Flat Rate&ldquo; Trap
              </a>
            </li>
            <li>
              <a
                href="#tax-benefits"
                className="hover:text-lime-600 hover:underline"
              >
                4. Tax Benefits & Risks
              </a>
            </li>
            <li>
              <a
                href="#hypothecation"
                className="hover:text-lime-600 hover:underline"
              >
                5. Hypothecation Removal
              </a>
            </li>
            <li>
              <a
                href="#foreclosure"
                className="hover:text-lime-600 hover:underline"
              >
                6. Foreclosure & Prepayment
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-lime-600 hover:underline">
                7. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-car-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: PROCESS & ELIGIBILITY --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="how-it-works"
            className="mb-4 text-2xl font-bold text-slate-900 scroll-mt-20"
          >
            How Does a Car Loan Work in India?
          </h2>
          <ol className="list-decimal pl-5 space-y-2 mb-8 text-slate-700 marker:font-bold marker:text-slate-900">
            <li>
              <strong>Eligibility Check:</strong> Verify income, credit score,
              and age.
            </li>
            <li>
              <strong>Loan Approval:</strong> Lender issues sanction letter with
              terms.
            </li>
            <li>
              <strong>Documentation:</strong> Sign agreement; lender marks
              &quot;hypothecation&quot; on RC.
            </li>
            <li>
              <strong>Disbursement:</strong> Amount paid directly to
              dealer/seller.
            </li>
            <li>
              <strong>Repayment:</strong> Pay monthly EMIs.
            </li>
            <li>
              <strong>Closure:</strong> Get NOC and remove hypothecation from
              RC.
            </li>
          </ol>

          <h2
            id="eligibility"
            className="mb-4 text-2xl font-bold text-slate-900 scroll-mt-20"
          >
            Eligibility, Limits & Rules
          </h2>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-900">
                    Criteria
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Requirement
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Age
                  </TableCell>
                  <TableCell>21 to 65 years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Min Income
                  </TableCell>
                  <TableCell>₹15,000 - ₹25,000/month</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Credit Score
                  </TableCell>
                  <TableCell>750+ ideal (650+ considered)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    LTV Ratio
                  </TableCell>
                  <TableCell>Up to 90% (New) / 80% (Used)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 3: NEW VS USED --- */}
      <section className="mb-12">
        <h2
          id="new-vs-used"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          New vs Used Car Loans: Detailed Comparison
        </h2>
        <p className="mb-6 text-slate-700">
          One of the most critical decisions is whether to finance a new or used
          car. Interest rates, tenure, and Loan-to-Value (LTV) ratios differ
          significantly.
        </p>

        <Card className="mb-6 border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900 w-1/3">
                    Parameter
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 w-1/3">
                    New Car Loan
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 w-1/3">
                    Used Car Loan
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Interest Rate
                  </TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    7.6% - 10% p.a.
                  </TableCell>
                  <TableCell className="text-amber-600 font-bold">
                    8.9% - 15% p.a.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Max Tenure
                  </TableCell>
                  <TableCell>Up to 7 Years</TableCell>
                  <TableCell>Up to 5 Years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    LTV Ratio
                  </TableCell>
                  <TableCell>85-90% of On-Road Price</TableCell>
                  <TableCell>70-85% of Market Value</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Processing Fees
                  </TableCell>
                  <TableCell>Low (₹3k - ₹10k)</TableCell>
                  <TableCell>High (1% - 2% of loan)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="rounded-lg border-l-4 border-l-lime-500 bg-lime-50 p-4 text-sm text-lime-900">
          <strong>Key Takeaway:</strong> New car loans offer lower interest
          rates and longer tenure. Used car loans are costlier but allow you to
          buy a car at a lower upfront price.
        </div>
      </section>

      {/* --- SECTION 4: FLAT RATE TRAP --- */}
      <section className="mb-12">
        <h2
          id="flat-rate-trap"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-red-500" /> The &quot;Flat
          Rate&ldquo; Trap
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`Many car dealers advertise attractive offers like <strong>"Car loan at just 7% flat rate!"</strong>—but this is misleading.
        
        <ul class="list-disc list-inside">
          <li><strong>Flat Rate:</strong> Interest is calculated on the *original loan amount* for the entire tenure.</li>
          <li><strong>Reducing Balance Rate:</strong> Interest is calculated on the *outstanding principal*, which reduces every month.</li>
        </ul>
        `}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-700 text-lg">The Trap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-800 font-medium mb-2">
                Dealer says: &quot;7% Interest Rate (Flat)&quot;
              </p>
              <p className="text-sm text-slate-600">
                On a ₹5 Lakh loan for 5 years, you pay interest on the full ₹5
                Lakhs even in the last year (when you owe much less).
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-700 text-lg">
                The Truth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-800 font-medium mb-2">
                Real Cost: ~13% Reducing Rate
              </p>
              <p className="text-sm text-slate-600">
                A 7% Flat Rate is actually equal to a{' '}
                <strong>~13% Reducing Balance Rate</strong>. You are paying
                almost double the interest!
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200 shadow-sm overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900">
                    Aspect
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    7% Flat Rate
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    ~7% Reducing Rate
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Total Interest
                  </TableCell>
                  <TableCell>₹1,75,000</TableCell>
                  <TableCell>~₹95,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Total Repaid
                  </TableCell>
                  <TableCell>₹6,75,000</TableCell>
                  <TableCell>~₹5,95,000</TableCell>
                </TableRow>
                <TableRow className="bg-slate-50">
                  <TableCell className="font-bold text-slate-900">
                    Actual Cost
                  </TableCell>
                  <TableCell className="text-red-600 font-bold">
                    Much Higher
                  </TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Transparent & Lower
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
        <p className="text-sm text-slate-500 italic">
          <strong>Pro Tip:</strong> Always ask for the &quot;Annual Percentage
          Rate (APR)&quot; in reducing balance terms.
        </p>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-car-2" type="leaderboard" />
      </div>

      {/* --- SECTION 5: TAX BENEFITS --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="tax-benefits"
            className="mb-4 text-2xl font-bold text-slate-900 scroll-mt-20"
          >
            Tax Benefits on Car Loans
          </h2>
          <p className="mb-6 text-slate-700">
            Unlike home loans,{' '}
            <strong>personal car loans do NOT offer tax deductions</strong> for
            salaried individuals.
          </p>

          <div className="rounded-lg bg-amber-50 border border-amber-100 p-5">
            <h4 className="font-semibold text-amber-900 mb-2">
              Exception: Business Use
            </h4>
            <p className="text-amber-800 text-sm mb-3">
              If you are self-employed or use the car for business purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800">
              <li>
                <strong>Interest:</strong> Can be claimed as a business expense.
              </li>
              <li>
                <strong>Depreciation:</strong> Can be claimed as a business
                asset (15% p.a.).
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 6: HYPOTHECATION --- */}
      <section className="mb-12">
        <h2
          id="hypothecation"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <FileText className="h-6 w-6 text-slate-600" /> Hypothecation Removal
          Guide
        </h2>
        <p className="mb-6 text-slate-700">
          Once you pay off your car loan, the lender&apos;s hypothecation must
          be removed from the <strong>RC (Registration Certificate)</strong>. If
          skipped, you technically cannot sell the car easily.
        </p>

        <Card className="border-slate-200 bg-slate-50">
          <CardContent className="pt-6">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {/* Step 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  1
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">Get NOC</div>
                  </div>
                  <div className="text-slate-600 text-sm">
                    Request &quot;No Objection Certificate&quot; and Form 35
                    from lender after loan closure.
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-lime-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">
                      Collect Documents
                    </div>
                  </div>
                  <div className="text-slate-600 text-sm">
                    Original RC, PUC, Insurance, ID Proof, and Bank NOC/Form 35.
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-indigo-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">Visit RTO</div>
                  </div>
                  <div className="text-slate-600 text-sm">
                    Submit documents to your registered RTO and pay fee
                    (₹100-₹300).
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-purple-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  4
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">Update RC</div>
                  </div>
                  <div className="text-slate-600 text-sm">
                    Receive updated RC Smart Card without hypothecation in 15-30
                    days.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 7: FORECLOSURE --- */}
      <section className="mb-12">
        <h2
          id="foreclosure"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Key className="h-6 w-6 text-amber-500" /> Car Loan Foreclosure
        </h2>
        <p className="mb-6 text-slate-700">
          <strong>Foreclosure</strong> means paying off the loan before tenure
          ends. <strong>Prepayment</strong> is partial payment.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Charges Table */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3 bg-slate-50">
              <CardTitle className="text-base text-slate-900">
                Foreclosure Charges
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">6-12 Months</TableCell>
                    <TableCell>5-6% of Principal</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">13-24 Months</TableCell>
                    <TableCell>3-5% of Principal</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      After 24 Months
                    </TableCell>
                    <TableCell>2-3% (or 0%)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Break Even Analysis */}
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader className="pb-3 border-b border-emerald-100">
              <CardTitle className="text-base text-emerald-900">
                Example: Should You Foreclose?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm space-y-2 text-emerald-800">
              <p>
                <strong>Outstanding Principal:</strong> ₹3,20,000
              </p>
              <p>
                <strong>Remaining Interest:</strong> ₹62,464
              </p>
              <p className="text-red-600">
                <strong>Foreclosure Penalty (4%):</strong> - ₹12,800
              </p>
              <div className="pt-2 border-t border-emerald-200 font-bold text-lg text-emerald-700">
                Net Savings: ₹49,664 ✅
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-car-3" type="leaderboard" />
      </div>

      {/* --- SECTION 8: ALTERNATIVES & CONCLUSION --- */}
      <section className="mb-12">
        <h2
          id="alternatives"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Car Loan vs Alternatives
        </h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200 mb-8 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Aspect
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Car Loan
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Cash Purchase
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Subscription
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Ownership
                </TableCell>
                <TableCell>Yes (End of tenure)</TableCell>
                <TableCell>Yes (Immediate)</TableCell>
                <TableCell>No</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Upfront Cost
                </TableCell>
                <TableCell>10-20%</TableCell>
                <TableCell>100%</TableCell>
                <TableCell>Minimal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Total Cost
                </TableCell>
                <TableCell className="text-amber-600">
                  High (Interest)
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Lowest
                </TableCell>
                <TableCell className="text-red-600">Highest</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-t-4 border-t-emerald-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Who Should
                Take a Loan?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✅ Salaried Professionals (Budgeting)</li>
                <li>✅ Business Owners (Liquidity)</li>
                <li>✅ First-Time Buyers (Credit History)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" /> Who Should Avoid?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>❌ Unstable Income Sources</li>
                <li>❌ Already Over-Leveraged</li>
                <li>❌ Pure Investment Perspective</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Frequently Asked Questions (FAQs)
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-4 bg-white"
            >
              <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
          <AccordionItem
            value="item-custom-1"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Can I get tax benefits on car loans?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              No, not for personal use. Self-employed individuals can claim
              interest as business expense.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* --- CONCLUSION CARD --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            A car loan makes ownership accessible but requires smart choices.
            Remember to choose <strong>New Car Loans</strong> for lower rates,
            beware of <strong>Flat Rates</strong>, and always remove{' '}
            <strong>Hypothecation</strong> after closure.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Check APR
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Compare LTV
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Foreclose
              Smartly
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
      </div>

      <p className="mb-8 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
        Disclaimer: Interest rates and terms change. This guide is for
        educational purposes. Check latest terms with your lender.
      </p>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-lime-600 to-lime-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Buying a car soon?
          </h2>
          <p className="mb-8 max-w-lg text-lime-100 text-lg">
            Use our smart calculator to compare Flat vs Reducing rates and find
            your true EMI instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/loans/car-loan"
              className="rounded-lg bg-white px-8 py-4 font-bold text-lime-700 transition hover:bg-lime-50 shadow-lg"
            >
              Calculate Car EMI
            </Link>
            <Link
              href="/simple-interest-calculator"
              className="rounded-lg border border-lime-400 bg-lime-800/30 px-8 py-4 font-bold text-white transition hover:bg-lime-800/50"
            >
              Check Flat Rate Truth
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-car-4" type="leaderboard" />
      </div>
    </article>
  );
}
