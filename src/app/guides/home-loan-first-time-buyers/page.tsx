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
  CheckCircle2,
  Clock,
  TrendingUp,
  Percent,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  FileCheck,
  UserCheck,
  Building2,
  Calculator,
  XCircle,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Home Loan Guide 2025: Eligibility, Tax Benefits & FOIR Rules',
  description:
    'Complete Home Loan Guide 2025 for first-time buyers: Eligibility, FOIR calculation, tax benefits (80C/24B), hidden charges & step-by-step application checklist.',
  keywords: [
    'home loan first time buyer India',
    'home loan eligibility 2025',
    'FOIR calculation',
    'home loan tax benefits',
    '80C 24B deduction',
    'fixed vs floating interest rate',
    'home loan application process',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides/home-loan-for-first-time-buyers',
  },
  openGraph: {
    title: 'Home Loan Guide 2025 | First-Time Buyer Handbook',
    description:
      'Everything you need to know about Home Loans: FOIR, Tax Hacks, and Interest Rates.',
    url: 'https://www.fincado.com/guides/home-loan-for-first-time-buyers',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the minimum credit score required for a home loan?',
    answer:
      'Most banks require a CIBIL score of 700+ for approval, though 750+ gets you the best interest rates (8.5%-8.75%).',
  },
  {
    question: 'How is FOIR calculated for home loans?',
    answer:
      'FOIR = (Total Monthly Obligations ÷ Gross Monthly Income) × 100. Banks typically allow 50-60% FOIR.',
  },
  {
    question: 'What is the down payment percentage for home loans in India?',
    answer:
      'Down payment ranges from 10-25% depending on property value: 10% for loans up to ₹30 lakh, 20% for ₹30-75 lakh, and 25% for above ₹75 lakh.',
  },
  {
    question: 'What are the tax benefits on home loans in 2025?',
    answer:
      'You can save up to ₹3.5 lakh annually: ₹1.5 lakh under Section 80C (principal), ₹2 lakh under Section 24(b) (interest), and additional ₹1.5 lakh under Section 80EEA for eligible first-time buyers.',
  },
];

export default function HomeLoanGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'Home Loan for First-Time Buyers in India: Complete Guide 2025',
            description:
              'Complete Home Loan Guide 2025 covering eligibility, FOIR, tax benefits, and application steps.',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-15',
            dateModified: '2025-12-15',
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

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Home Loan Guide',
            url: 'https://www.fincado.com/guides/home-loan-for-first-time-buyers',
          },
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Flagship Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Home Loan Guide 2025-26: Eligibility & Tax Benefits
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 15 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Expert Reviewed
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="Home Loan Guide 2025" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p>A <strong>home loan</strong> (also called housing loan or mortgage) is a secured loan provided by banks and housing finance companies (HFCs) to help you purchase, construct, renovate, or extend residential property in India. The property itself serves as collateral, which is why home loans offer lower interest rates (8.5%-9.5% in 2025) compared to personal loans.</p>
          `}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Types:</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Home Purchase Loan</li>
                <li>Home Construction Loan</li>
                <li>Home Improvement Loan</li>
                <li>Balance Transfer Loan</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Key Features
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  <strong>LTV:</strong> Up to 90%
                </li>
                <li>
                  <strong>Rate:</strong> 8.50% - 9.50%
                </li>
                <li>
                  <strong>Tenure:</strong> 5 - 30 Years
                </li>
                <li>
                  <strong>Tax:</strong> Save up to ₹3.5L
                </li>
              </ul>
            </div>
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
                href="#eligibility"
                className="hover:text-blue-600 hover:underline"
              >
                1. Eligibility Criteria
              </a>
            </li>
            <li>
              <a href="#foir" className="hover:text-blue-600 hover:underline">
                2. FOIR Calculation
              </a>
            </li>
            <li>
              <a
                href="#down-payment"
                className="hover:text-blue-600 hover:underline"
              >
                3. Down Payment Rules
              </a>
            </li>
            <li>
              <a
                href="#interest-types"
                className="hover:text-blue-600 hover:underline"
              >
                4. Fixed vs Floating Rates
              </a>
            </li>
            <li>
              <a
                href="#hidden-charges"
                className="hover:text-blue-600 hover:underline"
              >
                5. Hidden Charges
              </a>
            </li>
            <li>
              <a
                href="#tax-benefits"
                className="hover:text-blue-600 hover:underline"
              >
                6. Tax Benefits (80C/24b)
              </a>
            </li>
            <li>
              <a
                href="#amortization"
                className="hover:text-blue-600 hover:underline"
              >
                7. EMI & Amortization
              </a>
            </li>
            <li>
              <a
                href="#mistakes"
                className="hover:text-blue-600 hover:underline"
              >
                8. Common Mistakes
              </a>
            </li>
            <li>
              <a
                href="#checklist"
                className="hover:text-blue-600 hover:underline"
              >
                9. Application Checklist
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-blue-600 hover:underline">
                10. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-home-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: ELIGIBILITY --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="eligibility"
            className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2"
          >
            <UserCheck className="h-6 w-6 text-blue-600" /> Home Loan
            Eligibility (2025)
          </h2>
          <p className="mb-6 text-slate-700">
            Understanding eligibility is the first step toward successful loan
            approval. Here is what major Indian lenders evaluate:
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            1. Age Requirements
          </h3>
          <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900">
                    Bank/HFC
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Min Age
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Max Age (Maturity)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>SBI, HDFC, ICICI</TableCell>
                  <TableCell>21 years</TableCell>
                  <TableCell>70 years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Axis Bank</TableCell>
                  <TableCell>21 years</TableCell>
                  <TableCell>70 years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PNB Housing</TableCell>
                  <TableCell>21 years</TableCell>
                  <TableCell>75 years</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            2. Income & Credit Score
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-slate-200 bg-slate-50/50">
              <CardContent className="pt-4 text-sm text-slate-700">
                <strong className="block text-slate-900 mb-2">
                  Income Criteria
                </strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>
                    <strong>Min Salary:</strong> ₹25k - ₹40k/mo
                  </li>
                  <li>
                    <strong>Business Income:</strong> ₹2L+ Annual
                  </li>
                  <li>
                    <strong>Work Exp:</strong> 2-3 Years Total
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-slate-50/50">
              <CardContent className="pt-4 text-sm text-slate-700">
                <strong className="block text-slate-900 mb-2">
                  Credit Score (CIBIL)
                </strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>
                    <strong>750+:</strong> Excellent (8.5%)
                  </li>
                  <li>
                    <strong>700-749:</strong> Good (8.75%)
                  </li>
                  <li>
                    <strong>&lt;650:</strong> High Risk
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-home-2" type="leaderboard" />
      </div>

      {/* --- SECTION 2: FOIR --- */}
      <section className="mb-12">
        <h2
          id="foir"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-indigo-600" /> FOIR Explained
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`<strong>FOIR (Fixed Obligations to Income Ratio)</strong> is the percentage of your monthly income that goes toward fixed financial obligations. Banks use FOIR to determine your repayment capacity.`}
          />
        </div>

        {/* IMAGE: FOIR Calculation */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/home-loan/foir-calculation.webp"
            alt="FOIR calculation example showing income vs obligations"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="border-indigo-100 bg-indigo-50/30 mb-6">
          <CardHeader className="pb-2 border-b border-indigo-100">
            <CardTitle className="text-indigo-900 text-lg">
              Example Calculation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="block text-xs text-slate-500">
                  Gross Income
                </span>
                <span className="text-lg font-bold">₹80,000</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500">
                  Total Obligations
                </span>
                <span className="text-lg font-bold">₹48,000</span>
              </div>
            </div>
            <div className="bg-white p-3 rounded border border-indigo-100 text-center font-bold text-indigo-800">
              FOIR = (48k / 80k) * 100 = 60%
            </div>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Lender Type
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Max FOIR
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Your Take-Home
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Most Banks</TableCell>
                <TableCell>50-55%</TableCell>
                <TableCell>45-50%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HFCs</TableCell>
                <TableCell>55-60%</TableCell>
                <TableCell>40-45%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Govt Banks</TableCell>
                <TableCell>50%</TableCell>
                <TableCell>50%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-home-3" type="leaderboard" />
      </div>

      {/* --- SECTION 3: DOWN PAYMENT --- */}
      <section className="mb-12">
        <h2
          id="down-payment"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Building2 className="h-6 w-6 text-emerald-600" /> Down Payment Rules
        </h2>
        <p className="mb-6 text-slate-700">
          Banks finance only 75-90% of property value. You must pay the rest
          upfront.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Property Value
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Max LTV (Loan)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Your Payment
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Up to ₹30L</TableCell>
                <TableCell>90%</TableCell>
                <TableCell className="text-emerald-700 font-bold">
                  10%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹30L - ₹75L</TableCell>
                <TableCell>80%</TableCell>
                <TableCell className="text-emerald-700 font-bold">
                  20%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Above ₹75L</TableCell>
                <TableCell>75%</TableCell>
                <TableCell className="text-emerald-700 font-bold">
                  25%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900 border border-blue-100">
          <strong>Don&apos;t Forget:</strong> Stamp Duty (5-7%) and Registration
          (1%) are extra costs not covered by the loan.
        </div>
      </section>

      {/* --- SECTION 4: INTEREST TYPES --- */}
      <section className="mb-12">
        <h2
          id="interest-types"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-teal-600" /> Fixed vs Floating Rates
        </h2>

        {/* IMAGE: Rates Graph */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/home-loan/fixed-vs-floating-rates.webp"
            alt="Comparison graph of fixed vs floating interest rates over time"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-teal-100 bg-teal-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-teal-800 text-lg">
                Floating Rate (Popular)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">Changes with RBI Repo Rate.</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>✅ Lower starting rate (8.5%)</li>
                <li>✅ Zero prepayment charges</li>
                <li>❌ EMI fluctuates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-slate-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">
                Fixed Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">Constant for 3-5 years.</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>✅ EMI certainty</li>
                <li>❌ Higher starting rate (9%+)</li>
                <li>❌ Prepayment penalties apply</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-home-4" type="leaderboard" />
      </div>

      {/* --- SECTION 5: HIDDEN CHARGES --- */}
      <section className="mb-12">
        <h2
          id="hidden-charges"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" /> Hidden Charges
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Type</TableHead>
                <TableHead className="font-bold text-slate-900">
                  Amount
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Negotiable?
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Processing Fee</TableCell>
                <TableCell>0.25% - 1%</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Yes ✅
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Admin Fee</TableCell>
                <TableCell>₹5k - ₹15k</TableCell>
                <TableCell className="text-amber-600">Maybe ⚠️</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Legal/Valuation</TableCell>
                <TableCell>₹3k - ₹10k</TableCell>
                <TableCell className="text-red-600 font-bold">No ❌</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 6: TAX BENEFITS --- */}
      <section className="mb-12">
        <h2
          id="tax-benefits"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Tax Benefits:
          Save ₹3.5 Lakh
        </h2>

        {/* IMAGE: Tax Benefits */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/home-loan/tax-benefits-80c-24b.webp"
            alt="Infographic showing tax savings under section 80C and 24b"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Section 80C
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Principal Repayment</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Max ₹1.5 Lakh/year.</li>
                <li>Includes Stamp Duty.</li>
                <li>Lock-in: 5 Years.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Section 24(b)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Interest Payment</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Max ₹2 Lakh/year (Self-occupied).</li>
                <li>Unlimited (Let-out property).</li>
                <li>Must complete construction in 5 yrs.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="guide-home-5" type="leaderboard" />
      </div>

      {/* --- SECTION 7: AMORTIZATION --- */}
      <section className="mb-12">
        <h2
          id="amortization"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-indigo-600" /> EMI Amortization
          Reality
        </h2>
        <p className="mb-6 text-slate-700">
          First-time buyers are often shocked: Initial EMIs are mostly interest!
        </p>

        {/* IMAGE: Amortization */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/home-loan/amortization-schedule-graph.webp"
            alt="Amortization graph showing principal vs interest component over tenure"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Year</TableHead>
                <TableHead className="font-bold text-slate-900">
                  EMI Split
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Year 1</TableCell>
                <TableCell>
                  <span className="text-red-600 font-bold">82% Interest</span> /
                  18% Principal
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Year 10</TableCell>
                <TableCell>64% Interest / 36% Principal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Year 20</TableCell>
                <TableCell>
                  1% Interest /{' '}
                  <span className="text-emerald-600 font-bold">
                    99% Principal
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 8: MISTAKES --- */}
      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <XCircle className="h-6 w-6 text-red-500" /> Common Mistakes
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-red-100 bg-red-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800">
                1. Buying Beyond Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Spending &gt;50% of income on EMI.
              <br />
              <strong>Fix:</strong> Follow 30-35% Rule.
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800">
                2. Ignoring Hidden Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Forgetting maintenance/furnishing costs.
              <br />
              <strong>Fix:</strong> Budget extra 15-20%.
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800">
                3. Not Checking CIBIL
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Applying with low score gets rejected.
              <br />
              <strong>Fix:</strong> Check 6mo prior.
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800">
                4. Max Tenure
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Paying 2-3x property value in interest.
              <br />
              <strong>Fix:</strong> Stick to 15-20 yrs.
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800">
                5. Not Comparing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Sticking to 1 bank.
              <br />
              <strong>Fix:</strong> Get 4-5 quotes.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="guide-home-6" type="leaderboard" />
      </div>

      {/* --- SECTION 9: CHECKLIST --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="checklist"
            className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
          >
            <FileCheck className="h-6 w-6 text-emerald-600" /> Application
            Checklist
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Phase 1: Pre-Application
              </h3>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Check Credit Score (Target 750+).</li>
                <li>Calculate Affordability.</li>
                <li>Save Down Payment (20-25%).</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Phase 2: Application
              </h3>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Gather KYC & Income Docs.</li>
                <li>Apply to 3-4 Lenders.</li>
                <li>Property Valuation.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Phase 3: Disbursement
              </h3>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Sign Agreement & Pay Stamp Duty.</li>
                <li>Buy Insurance.</li>
                <li>Collect Original Deeds (Post-repayment).</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

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
              Can I prepay my home loan without penalty?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes, floating rate home loans taken by individuals have zero
              prepayment or foreclosure charges as per RBI guidelines.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            With eligibility criteria becoming transparent and tax benefits
            saving up to ₹3.5 lakh annually, 2025 is an excellent time for
            first-time buyers.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Check CIBIL
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Keep FOIR
              Low
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Plan
              Prepayments
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
      </div>

      <p className="mb-8 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
        Disclaimer: This content is for educational purposes only. Loan terms
        vary. Always consult your bank or financial advisor.
      </p>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Buying a home soon?
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Use our smart calculator to compare Flat vs Reducing rates and find
            your true EMI instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/emi-calculator"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Calculate EMI
            </Link>
            <Link
              href="/credit-score"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Check Eligibility
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-home-7" type="leaderboard" />
      </div>
    </article>
  );
}
