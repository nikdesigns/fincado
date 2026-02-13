// src/app/guides/home-loan-guide/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
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
  Home,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  UserCheck,
  Building2,
  Calculator,
  FileText,
  BadgePercent,
  XCircle,
  MapPin,
  Stamp,
  ClipboardCheck,
  IndianRupee,
} from 'lucide-react';
import HomeLoanCalculatorEmbed from '@/components/HomeLoanCalculatorEmbed';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

// --- SEO METADATA (IMPROVED) ---
export const metadata: Metadata = {
  title:
    'Home Loan Guide 2026: Complete Eligibility, Tax Benefits & Application Process',
  description:
    'Complete home loan guide for India 2026: CIBIL score requirements, FOIR calculation, tax benefits under 80C & 24b, RLLR vs MCLR comparison, hidden charges, stamp duty by state, and step-by-step application process for first-time buyers.',
  keywords: [
    'Home Loan Guide India 2026',
    'Home Loan Tax Benefit',
    'Section 80C 24b',
    'RLLR vs MCLR',
    'First time home buyer guide',
    'Home Loan Application Process',
    'CIBIL score for home loan',
    'FOIR calculation',
    'Stamp duty India',
    'Home loan eligibility',
    'Prepayment strategy',
  ],
  openGraph: {
    title:
      'Home Loan Guide 2026: Complete Eligibility, Tax Benefits & Application Process',
    description:
      'Save lakhs on your home loan with expert tips on tax benefits, interest rates, eligibility criteria, and step-by-step application guidance.',
    type: 'article',
    url: 'https://fincado.com/guides/home-loan-guide/',
    images: [
      {
        url: '/images/guides/home-loan/home-loan-guide-hero.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the minimum credit score required for a home loan?',
    answer:
      'Most banks require a CIBIL score of 700+ for approval, though 750+ gets you the best interest rates (8.5%-8.75%). Scores below 650 often lead to rejection or significantly higher interest rates.',
  },
  {
    question: 'How is FOIR calculated for home loans?',
    answer:
      'FOIR = (Total Monthly Obligations ÷ Gross Monthly Income) × 100. Banks typically allow 50-60% FOIR. This includes all existing EMIs, credit card dues, and the proposed home loan EMI.',
  },
  {
    question: 'What is the down payment percentage for home loans in India?',
    answer:
      'Down payment ranges from 10-25% depending on property value: 10% for loans up to ₹30 lakh, 20% for ₹30-75 lakh, and 25% for above ₹75 lakh. This is your equity contribution that must come from your savings.',
  },
  {
    question: 'What are the tax benefits on home loans in 2026?',
    answer:
      'Under the old tax regime, you can save up to ₹3.5 lakh annually: ₹1.5 lakh under Section 80C (principal), ₹2 lakh under Section 24(b) (interest). Note: The new tax regime does not allow these deductions. Section 80EEA (additional ₹1.5 lakh for first-time buyers) expired on March 31, 2022.',
  },
  {
    question: 'Can I claim tax benefits on under-construction property?',
    answer:
      'No. You can only claim tax benefits (Sections 24b and 80C) starting from the financial year in which the construction is completed and possession is handed over. However, pre-construction interest can be claimed in 5 equal installments after possession.',
  },
  {
    question: 'Is it better to prepay my home loan?',
    answer:
      'Yes, especially in the early years. Since the interest component is highest initially, even a small prepayment can reduce your tenure significantly. There are no prepayment penalties on floating rate home loans. Calculate the impact using our prepayment calculator.',
  },
  {
    question: 'What is pre-approval vs final approval?',
    answer:
      'Pre-approval is a preliminary assessment of your loan eligibility based on income and credit score, typically valid for 60-90 days. Final approval comes after property verification, legal checks, and complete documentation, leading to actual disbursement.',
  },
  {
    question: 'Why do home loan applications get rejected?',
    answer:
      'Common rejection reasons include: Low CIBIL score (below 650), high FOIR (above 60%), insufficient income documentation, property legal issues, unstable employment, high existing debt, or discrepancies in application documents.',
  },
];

export default function HomeLoanGuidePage() {
  const updatedLabel = getCurrentMonthYearLabel();

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
              'The Complete Home Loan Guide 2026: Eligibility, Tax Benefits, Application Process & Hidden Charges',
            description:
              'Complete Home Loan Guide 2026 covering eligibility criteria, FOIR calculation, tax benefits under old vs new regime, step-by-step application process, stamp duty costs, and prepayment strategies.',
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
            datePublished: '2025-01-15',
            dateModified: '2026-02-13',
            image:
              'https://fincado.com/images/guides/home-loan/home-loan-guide-hero.webp',
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

      {/* --- HOWTO SCHEMA (NEW) --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Apply for a Home Loan in India',
            description:
              'Step-by-step guide to applying for a home loan in India',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Check Eligibility',
                text: 'Check your CIBIL score (aim for 750+) and calculate FOIR to ensure it stays below 50-60%.',
              },
              {
                '@type': 'HowToStep',
                name: 'Get Pre-Approval',
                text: 'Submit basic documents to get pre-approval letter indicating loan amount you qualify for.',
              },
              {
                '@type': 'HowToStep',
                name: 'Property Selection',
                text: 'Choose property and negotiate price. Ensure property has clear legal title.',
              },
              {
                '@type': 'HowToStep',
                name: 'Submit Documents',
                text: 'Provide all required documents including income proof, property papers, and identity documents.',
              },
              {
                '@type': 'HowToStep',
                name: 'Property Verification',
                text: 'Bank conducts legal and technical verification of the property.',
              },
              {
                '@type': 'HowToStep',
                name: 'Loan Sanction & Disbursement',
                text: 'Receive final sanction letter and loan amount is disbursed to seller after registration.',
              },
            ],
          }),
        }}
      />

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Home Loan Guide 2026',
            url: 'https://fincado.com/guides/home-loan-guide/',
          },
        ]}
      />

      {/* Breadcrumb Visual */}
      <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
        <Link href="/" className="hover:text-lime-600 transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link href="/guides/" className="hover:text-lime-600 transition-colors">
          Guides
        </Link>
        <span>›</span>
        <span className="text-slate-900 font-medium">Home Loan Guide 2026</span>
      </nav>

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-lime-100 text-lime-800 hover:bg-lime-200 px-3 py-1"
        >
          Flagship Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          The Complete Home Loan Guide 2026: Eligibility, Tax Benefits &
          Application Process
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 18 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">{updatedLabel}</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-lime-700">
            <CheckCircle2 className="h-4 w-4" /> Expert Reviewed
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="The Complete Home Loan Guide 2026" />
        </div>
      </header>

      {/* Quick Answer - WITH LIME ACCENT */}
      <Card className="mb-8 border-l-4 border-l-lime-600 bg-linear-to-br from-lime-50/50 via-white to-slate-50/30 shadow-sm">
        <CardHeader className="pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-lime-100 rounded-lg">
              <Lightbulb className="h-6 w-6 text-lime-700" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Quick Answer
              </CardTitle>
              <Badge className="mt-1 bg-lime-600 text-white hover:bg-lime-700">
                30-Second Read
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              <strong>Home loans in India cost 8.5-9.5% interest</strong> and
              require a <strong>750+ CIBIL score</strong> for best rates. You
              can borrow up to <strong>90% of property value</strong> with
              repayment over <strong>5-30 years</strong>. Tax benefits apply
              only under the old tax regime.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-linear-to-br from-lime-50 to-lime-100/50 p-3 rounded-lg border-2 border-lime-200 text-center">
                <div className="font-bold text-2xl text-lime-800">8.5%</div>
                <div className="text-slate-600 text-xs">Starting Rate</div>
              </div>
              <div className="bg-linear-to-br from-lime-50 to-lime-100/50 p-3 rounded-lg border-2 border-lime-200 text-center">
                <div className="font-bold text-2xl text-lime-800">750+</div>
                <div className="text-slate-600 text-xs">Min CIBIL</div>
              </div>
              <div className="bg-linear-to-br from-lime-50 to-lime-100/50 p-3 rounded-lg border-2 border-lime-200 text-center">
                <div className="font-bold text-2xl text-lime-800">₹3.5L</div>
                <div className="text-slate-600 text-xs">Tax Savings*</div>
              </div>
              <div className="bg-linear-to-br from-lime-50 to-lime-100/50 p-3 rounded-lg border-2 border-lime-200 text-center">
                <div className="font-bold text-2xl text-lime-800">30 yrs</div>
                <div className="text-slate-600 text-xs">Max Tenure</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 italic">
              *Only under old tax regime (80C + 24b)
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-slate-700 text-sm mb-3 flex items-start gap-2">
              <Calculator className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
              <span>
                <strong>Want to know your exact EMI?</strong> Calculate loan
                affordability based on your salary in 10 seconds.
              </span>
            </p>
            <Link
              href="/loans/home-loan/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-600 text-white rounded-lg font-semibold hover:bg-lime-700 transition-colors text-sm w-full justify-center shadow-sm"
            >
              <Calculator className="h-4 w-4" />
              Calculate My Home Loan EMI
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Table of Contents (IMPROVED) */}
      <Card className="mb-8 border border-slate-200 bg-slate-50/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-600" />
            Table of Contents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <a
              href="#what-is"
              aria-label="Jump to What is a Home Loan section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">01</span> What is a Home Loan?
            </a>
            <a
              href="#application-process"
              aria-label="Jump to Application Process section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">02</span> Application Process
            </a>
            <a
              href="#eligibility"
              aria-label="Jump to Eligibility Checklist section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">03</span> Eligibility Checklist
            </a>
            <a
              href="#documents"
              aria-label="Jump to Document Checklist section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">04</span> Document Checklist
            </a>
            <a
              href="#tax-benefits"
              aria-label="Jump to Tax Benefits section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">05</span> Tax Benefits (80C, 24b)
            </a>
            <a
              href="#interest-rates"
              aria-label="Jump to Interest Rates section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">06</span> Interest Rates (RLLR vs
              MCLR)
            </a>
            <a
              href="#best-banks"
              aria-label="Jump to Best Banks section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">07</span> Top 5 Banks
            </a>
            <a
              href="#hidden-charges"
              aria-label="Jump to Hidden Charges section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">08</span> Hidden Charges
            </a>
            <a
              href="#stamp-duty"
              aria-label="Jump to Stamp Duty section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">09</span> Stamp Duty by State
            </a>
            <a
              href="#prepayment"
              aria-label="Jump to Prepayment Strategy section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">10</span> Prepayment Strategy
            </a>
            <a
              href="#rejection-reasons"
              aria-label="Jump to Rejection Reasons section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">11</span> Common Rejections
            </a>
            <a
              href="#buy-vs-rent"
              aria-label="Jump to Buy vs Rent section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">12</span> Buy vs Rent Analysis
            </a>
          </nav>
        </CardContent>
      </Card>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              Buying your first home in India is one of the biggest financial decisions you'll ever make, and choosing the right <strong>Home Loan</strong> can save you lakhs of rupees over the loan tenure. This comprehensive guide covers everything from CIBIL score requirements and tax benefits to the complete application process and hidden charges, helping you make an informed decision before signing on the dotted line.
            </p>
            <p>
              Whether you're a first-time home buyer or looking to refinance, understanding <strong>home loan eligibility criteria</strong>, <strong>tax deductions under Section 80C and 24(b)</strong>, the difference between <strong>RLLR vs MCLR</strong>, and the step-by-step application process will put you in control of your home-buying journey. Also learn about <strong>stamp duty variations across states</strong> and smart prepayment strategies.
            </p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/home-loan/happy-couple-new-home.webp"
              alt="First-time home buyers in India celebrating home loan approval with house keys in modern apartment | Home Loan Guide 2026"
              priority
              quality={85}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          <p className="text-center text-xs text-slate-500 italic mt-2">
            Secure your dream home with the right loan strategy.
          </p>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 - After intro, before main content */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: WHAT IS A HOME LOAN --- */}
      <Card
        id="what-is"
        className="mb-12 border border-slate-200 shadow-sm scroll-mt-20"
      >
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Home className="h-6 w-6 text-lime-600" /> What is a Home Loan?
          </h2>
          <p className="mb-6 text-slate-700">
            A <strong>home loan (also called housing loan or mortgage)</strong>{' '}
            is a secured loan provided by banks and housing finance companies
            (HFCs) to help you purchase, construct, renovate, or extend
            residential property. The property itself serves as collateral until
            the loan is fully repaid.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-600" /> Key Components
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
                <li>
                  <strong>Principal Amount:</strong> Total loan amount borrowed
                  from the bank.
                </li>
                <li>
                  <strong>Interest Rate:</strong> Cost of borrowing (fixed or
                  floating), currently 8.5-9.5% p.a.
                </li>
                <li>
                  <strong>Tenure:</strong> Repayment period ranging from 5 to 30
                  years.
                </li>
                <li>
                  <strong>EMI:</strong> Equated Monthly Installment (Principal +
                  Interest).
                </li>
                <li>
                  <strong>LTV Ratio:</strong> Loan-to-Value ratio, typically
                  75-90% of property value.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Home className="h-4 w-4 text-slate-600" /> Types of Home Loans
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-4">
                <li>
                  <strong>Purchase Loan:</strong> For buying ready-to-move-in
                  property
                </li>
                <li>
                  <strong>Construction Loan:</strong> For building on owned land
                </li>
                <li>
                  <strong>Extension Loan:</strong> For expanding existing
                  property
                </li>
                <li>
                  <strong>Balance Transfer:</strong> Shifting loan to another
                  bank
                </li>
                <li>
                  <strong>Top-Up Loan:</strong> Additional loan on existing
                  property
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- NEW SECTION: APPLICATION PROCESS --- */}
      <section id="application-process" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6 text-lime-600" /> Step-by-Step
          Application Process
        </h2>
        <p className="mb-6 text-slate-700">
          Understanding the home loan application journey helps you prepare
          better and avoid delays. Here&apos;s the complete process from
          pre-approval to disbursement.
        </p>

        <div className="space-y-4">
          {/* Step 1 */}
          <Card className="border-l-4 border-l-lime-600">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center font-bold text-lime-700">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Check Eligibility & Get Pre-Approval
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Check your CIBIL score (minimum 700, ideally 750+) and
                    calculate FOIR. Submit basic income documents to get a
                    pre-approval letter indicating the loan amount you qualify
                    for.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Timeline:</strong> 2-3 days |{' '}
                      <strong>Validity:</strong> 60-90 days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Property Selection & Agreement
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Choose your property, negotiate the price, and sign the sale
                    agreement. Ensure the property has clear legal title and
                    approved construction plans.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Key Check:</strong> Verify property documents,
                      builder reputation, and municipal approvals
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-700">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Submit Complete Documentation
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Provide all required documents: income proof, bank
                    statements, property papers, identity documents, and
                    photographs. Ensure all documents are complete to avoid
                    delays.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Pro Tip:</strong> Keep digital and physical copies
                      organized in a folder. Missing documents cause 70% of
                      application delays.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Property Verification (Legal & Technical)
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Bank&apos;s legal team verifies property title, checks for
                    encumbrances, and technical team assesses property valuation
                    and construction quality.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Timeline:</strong> 7-15 days |{' '}
                      <strong>Cost:</strong> ₹2,000-₹5,000 (technical valuation
                      fee)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Final Sanction & Agreement Signing
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Receive final sanction letter with approved loan amount,
                    interest rate, and tenure. Sign the loan agreement and
                    create Memorandum of Deposit of Title Deeds (MODT).
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Timeline:</strong> 2-3 days after verification
                      completion
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 6 */}
          <Card className="border-l-4 border-l-lime-600">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center font-bold text-lime-700">
                  6
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    Disbursement & Property Registration
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Pay stamp duty and registration charges, complete property
                    registration at sub-registrar office. Bank disburses loan
                    amount to seller&apos;s account. EMI repayment starts from
                    the next month.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      <strong>Timeline:</strong> 1-2 days post registration |{' '}
                      <strong>First EMI:</strong> Due within 30 days of
                      disbursement
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-lime-50 p-5 rounded-xl border-2 border-lime-200">
          <p className="text-sm text-slate-900 flex items-start gap-2">
            <Clock className="h-5 w-5 text-lime-600 shrink-0 mt-0.5" />
            <span>
              <strong>Total Timeline:</strong> Expect 15-30 days from
              application to disbursement if all documents are in order.
              Property verification is the longest step.
            </span>
          </p>
        </div>
      </section>

      {/* --- SECTION 2: ELIGIBILITY --- */}
      <section id="eligibility" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <UserCheck className="h-6 w-6 text-lime-600" /> Eligibility Checklist
        </h2>
        <p className="mb-6 text-slate-700">
          Before you apply, make sure you meet these critical eligibility
          parameters. Banks evaluate multiple factors to determine your loan
          amount and interest rate.
        </p>

        <Card className="border border-slate-200 mb-6 shadow-sm">
          <CardHeader className="bg-slate-50 border-b border-slate-200 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-lime-600" /> 1. CIBIL Score
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Score Range
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Eligibility Status
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Interest Rate Impact
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-lime-700">
                      750+ (Excellent)
                    </TableCell>
                    <TableCell className="text-lime-700">
                      Very high chance of approval
                    </TableCell>
                    <TableCell>Lowest rates (8.5%-8.75%)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-900">
                      700-749 (Good)
                    </TableCell>
                    <TableCell>High chances of approval</TableCell>
                    <TableCell>Standard rates (8.75%-9.0%)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      650-699 (Fair)
                    </TableCell>
                    <TableCell>Moderate chances</TableCell>
                    <TableCell>Higher rates (9.0%-9.5%)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-600">
                      Below 650 (Poor)
                    </TableCell>
                    <TableCell className="text-red-600">
                      Low chances / Likely rejection
                    </TableCell>
                    <TableCell>Very high rates or rejected</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* FOIR Card */}
        <Card className="border border-slate-200 mb-6 shadow-sm">
          <CardHeader className="bg-slate-50 border-b border-slate-200 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-lime-600" /> 2. Fixed
              Obligation to Income Ratio (FOIR)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-slate-700 mb-4">
              FOIR measures what percentage of your monthly income goes towards
              debt obligations. Banks typically allow{' '}
              <strong>50-60% FOIR</strong>.
            </p>

            <div className="bg-lime-50 p-5 rounded-xl border-2 border-lime-200 mb-4">
              <h4 className="font-bold text-slate-900 mb-3">FOIR Formula</h4>
              <div className="bg-white p-4 rounded-lg border-2 border-slate-200 font-mono text-sm">
                FOIR = (Total Monthly EMIs + Credit Card Dues) ÷ Gross Monthly
                Income × 100
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border-2 border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-2">
                  Example Calculation
                </h5>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>
                    Monthly Income: <strong>₹80,000</strong>
                  </li>
                  <li>
                    Existing Car Loan EMI: <strong>₹10,000</strong>
                  </li>
                  <li>
                    Proposed Home Loan EMI: <strong>₹30,000</strong>
                  </li>
                  <li className="pt-2 border-t border-slate-200">
                    <strong>
                      FOIR = (10,000 + 30,000) / 80,000 × 100 = 50%
                    </strong>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border-2 border-slate-200">
                <h5 className="font-semibold text-slate-900 mb-2">
                  FOIR Thresholds
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>
                      <strong>Below 50%:</strong> Excellent eligibility
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600" />
                    <span>
                      <strong>50-60%:</strong> Good eligibility
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span>
                      <strong>60-70%:</strong> Marginal, case-by-case
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span>
                      <strong>Above 70%:</strong> Likely rejection
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-900 flex items-start gap-2">
                <Lightbulb className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
                <span>
                  <strong>Tip:</strong> Close small personal loans or credit
                  card dues before applying to improve your FOIR and get higher
                  loan eligibility.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Age & Income Card */}
        <Card className="border border-slate-200 mb-6 shadow-sm">
          <CardHeader className="bg-slate-50 border-b border-slate-200 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-lime-600" /> 3. Age & Income
              Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-slate-900 mb-3">
                  Age Requirements
                </h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Minimum Age</TableCell>
                      <TableCell className="font-bold">21 years</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Maximum Age (at maturity)
                      </TableCell>
                      <TableCell className="font-bold">65-70 years</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Salaried</TableCell>
                      <TableCell>Up to 60 years at retirement</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Self-Employed
                      </TableCell>
                      <TableCell>Up to 65-70 years</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-3">
                  Income Requirements
                </h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Salaried (Metro)
                      </TableCell>
                      <TableCell className="font-bold">
                        ₹25,000+/month
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Salaried (Non-Metro)
                      </TableCell>
                      <TableCell className="font-bold">
                        ₹15,000+/month
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Self-Employed
                      </TableCell>
                      <TableCell className="font-bold">
                        ₹2-3 LPA net profit
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Business Vintage
                      </TableCell>
                      <TableCell>Minimum 2-3 years</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Embedded Calculator */}
        <HomeLoanCalculatorEmbed />

        <p className="text-xs text-slate-500 mt-4 text-center">
          This calculator uses industry-standard FOIR (40-50%) and considers
          your credit score to estimate eligibility accurately.{' '}
          <Link
            href="/loans/home-loan/"
            className="text-lime-600 hover:underline"
          >
            Open full calculator →
          </Link>
        </p>
      </section>

      {/* 💰 AD SLOT 2 - After calculator, high engagement area */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-2" type="leaderboard" />
      </div>

      {/* Document Checklist (IMPROVED) */}
      <section id="documents" className="mb-12 scroll-mt-20">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-xl flex items-center gap-2 text-slate-900">
              <FileText className="h-6 w-6 text-lime-600" />
              Document Checklist for Home Loan Application
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-lime-600" />
                  For Salaried Individuals
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Last 6 months&apos; salary slips
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Form 16 (last 2 years)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Last 6 months&apos; bank statements (salary account)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    PAN card & Aadhaar card
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Property documents (sale agreement, builder NOC)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Employment letter or offer letter
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Passport-size photographs
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-lime-600" />
                  For Self-Employed
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    ITR (last 2-3 years) with computation sheets
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Audited financial statements (P&L, Balance Sheet)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Business proof (GST registration, Shop Act license)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Last 12 months&apos; bank statements (business account)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    PAN, Aadhaar & property documents
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Business continuity proof (2-3 years minimum)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                    Passport-size photographs
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-4">
              <h4 className="font-bold text-slate-900 mb-3">
                Property Documents Required
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                    Sale agreement / Allotment letter
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                    Property title deed (last 13+ years)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                    Encumbrance certificate
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                    Building approved plan
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                    NOC from builder/society
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                    Possession letter (if ready property)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                    Occupancy certificate
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                    Property tax receipts
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-900 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
                <span>
                  <strong>Pro Tip:</strong> Keep digital copies (scanned PDFs)
                  ready in a single folder labeled &quot;Home Loan Docs&quot;.
                  This speeds up approval by 7-10 days and prevents
                  back-and-forth requests from the bank.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 3: TAX BENEFITS (UPDATED) --- */}
      <section id="tax-benefits" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BadgePercent className="h-6 w-6 text-lime-600" /> Tax Benefits Under
          Old Tax Regime
        </h2>

        {/* Important Notice about Tax Regime */}
        <div className="mb-6 bg-red-50 p-5 rounded-xl border-2 border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900 mb-2">
                Critical: Tax Regime Selection Matters!
              </h3>
              <p className="text-sm text-red-800 leading-relaxed">
                The tax benefits mentioned below (Sections 80C, 24b, and 80EEA)
                are <strong>ONLY available under the old tax regime</strong>.
                The new tax regime introduced in FY 2020-21 does NOT allow these
                deductions. Before claiming home loan tax benefits, you must opt
                for the old tax regime when filing your ITR.{' '}
                <Link
                  href="/income-tax-calculator/"
                  className="text-red-900 underline font-semibold"
                >
                  Calculate which regime saves you more →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="mb-6 text-slate-700">
          One of the biggest advantages of taking a home loan in India is the
          significant tax deductions available under the Income Tax Act, 1961
          (if you choose the old tax regime).
        </p>

        <div className="overflow-x-auto mb-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Section
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Covers
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Max Deduction
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Eligibility
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Section 80C
                    </TableCell>
                    <TableCell>Principal Repayment</TableCell>
                    <TableCell className="font-bold text-lime-700">
                      ₹1,50,000
                    </TableCell>
                    <TableCell>All borrowers (old regime only)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Section 24(b)
                    </TableCell>
                    <TableCell>Interest on loan</TableCell>
                    <TableCell className="font-bold text-lime-700">
                      ₹2,00,000
                    </TableCell>
                    <TableCell>Self-occupied property (old regime)</TableCell>
                  </TableRow>
                  <TableRow className="bg-red-50">
                    <TableCell className="font-medium text-slate-700">
                      Section 80EEA{' '}
                      <Badge variant="destructive" className="ml-2">
                        EXPIRED
                      </Badge>
                    </TableCell>
                    <TableCell>Additional Interest</TableCell>
                    <TableCell className="font-bold text-slate-600 line-through">
                      ₹1,50,000
                    </TableCell>
                    <TableCell className="text-slate-600">
                      No longer available (expired March 31, 2022)
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 italic mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <strong>Important Update:</strong> Section 80EEA, which provided an
          additional ₹1.5 lakh deduction for first-time home buyers, applied
          ONLY to loans sanctioned between April 1, 2019, and March 31, 2022,
          for properties with stamp duty value up to ₹45 Lakhs. This benefit is{' '}
          <strong>
            no longer available for loans sanctioned after March 31, 2022
          </strong>
          .
        </p>

        {/* Tax Savings Calculation Example */}
        <Card className="bg-linear-to-br from-lime-50 to-white border-2 border-lime-200 shadow-sm mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-lime-600" />
              Tax Savings Calculation Example (Old Regime)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <div className="bg-white p-5 rounded-lg border-2 border-slate-200 mb-4">
              <h4 className="font-bold text-slate-900 mb-3">
                Annual Deductions Available
              </h4>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Principal Repayment (80C)
                    </TableCell>
                    <TableCell className="text-right font-bold text-lime-700">
                      ₹1,50,000
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Interest Payment (24b)
                    </TableCell>
                    <TableCell className="text-right font-bold text-lime-700">
                      ₹2,00,000
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-lime-100">
                    <TableCell className="font-bold text-slate-900">
                      Total Annual Deduction
                    </TableCell>
                    <TableCell className="text-right font-bold text-lime-800 text-lg">
                      ₹3,50,000
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="bg-lime-50 p-5 rounded-lg border-2 border-lime-200">
              <h4 className="font-bold text-slate-900 mb-3">
                Tax Savings by Income Bracket
              </h4>
              <Table className="text-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead>Tax Bracket</TableHead>
                    <TableHead className="text-right">Annual Savings</TableHead>
                    <TableHead className="text-right">
                      20-Year Savings
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>30% bracket (income above ₹15L)</TableCell>
                    <TableCell className="text-right font-bold">
                      ₹1,05,000
                    </TableCell>
                    <TableCell className="text-right font-bold text-lime-700">
                      ₹21,00,000
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>20% bracket (₹10-15L)</TableCell>
                    <TableCell className="text-right font-bold">
                      ₹70,000
                    </TableCell>
                    <TableCell className="text-right font-bold text-lime-700">
                      ₹14,00,000
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10% bracket (₹5-10L)</TableCell>
                    <TableCell className="text-right font-bold">
                      ₹35,000
                    </TableCell>
                    <TableCell className="text-right font-bold text-lime-700">
                      ₹7,00,000
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Joint Loan Tax Benefit */}
        <Card className="bg-linear-to-br from-lime-50 to-white border-2 border-lime-200 shadow-sm mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-lime-600" />
              Joint Home Loan: Double Tax Benefit Hack
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <p className="mb-4">
              When you take a <strong>joint home loan</strong> with a
              co-borrower (spouse, parent, sibling),{' '}
              <strong>BOTH individuals</strong> can claim{' '}
              <strong>independent deductions</strong> under Section 80C and
              Section 24(b), provided both are co-owners of the property. This
              effectively <strong>doubles</strong> the total tax benefit
              available.
            </p>

            <div className="bg-white p-5 rounded-lg border-2 border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3">
                Joint Loan Tax Math
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-slate-900 mb-2">
                    Single Borrower:
                  </p>
                  <ul className="space-y-1 text-slate-700">
                    <li>80C: ₹1.5 lakh</li>
                    <li>24(b): ₹2 lakh</li>
                    <li className="pt-2 border-t border-slate-200 font-bold">
                      Total: ₹3.5 lakh/year
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-2">
                    Joint Borrowers (Both Co-owners):
                  </p>
                  <ul className="space-y-1 text-slate-700">
                    <li>Borrower 1: ₹3.5 lakh</li>
                    <li>Borrower 2: ₹3.5 lakh</li>
                    <li className="pt-2 border-t border-slate-200 font-bold text-lime-700">
                      Total: ₹7 lakh/year 🎉
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-lime-100 p-4 rounded-lg border border-lime-300">
              <p className="text-xs text-lime-900 font-medium flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Pro Tip:</strong> Ensure both co-borrowers contribute
                  to EMI payments from their respective bank accounts to claim
                  individual deductions. Keep payment proofs for ITR filing.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Link to Tax Calculator */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-700 mb-3 flex items-start gap-2">
            <Calculator className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
            <span>
              <strong>Should you choose old or new tax regime?</strong>{' '}
              Calculate your tax liability under both regimes considering home
              loan deductions.
            </span>
          </p>
          <Link
            href="/income-tax-calculator/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-600 text-white rounded-lg font-semibold hover:bg-lime-700 transition-colors text-sm shadow-sm"
          >
            <Calculator className="h-4 w-4" />
            Compare Tax Regimes Now
          </Link>
        </div>
      </section>

      {/* 💰 AD SLOT 3 - Mid-content, after tax benefits */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-3" type="leaderboard" />
      </div>

      {/* --- SECTION 4: INTEREST RATES --- */}
      <section id="interest-rates" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-lime-600" /> Interest Rates: RLLR
          vs MCLR vs Fixed
        </h2>
        <Card className="border border-slate-200 mb-8 shadow-sm">
          <CardContent className="pt-6">
            <p className="text-slate-700 mb-4">
              Home loan interest rates in India are benchmarked to either{' '}
              <strong>MCLR</strong>, <strong>RLLR</strong>, or are{' '}
              <strong>fixed</strong>. Most experts now favor{' '}
              <strong>RLLR (Repo Linked Lending Rate)</strong> because it is
              directly linked to the RBI&apos;s repo rate, offering faster
              transmission of rate cuts and greater transparency.
            </p>

            {/* Comparison Table */}
            <div className="mb-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Feature
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      RLLR (Best)
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      MCLR
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Fixed Rate
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Rate Adjustment
                    </TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      Immediate (quarterly)
                    </TableCell>
                    <TableCell>Slow (1-3 months lag)</TableCell>
                    <TableCell>Never changes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Transparency</TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      High (tied to RBI repo)
                    </TableCell>
                    <TableCell>Moderate</TableCell>
                    <TableCell>Fixed upfront</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Current Range</TableCell>
                    <TableCell className="font-bold">8.5-9.0%</TableCell>
                    <TableCell>8.75-9.25%</TableCell>
                    <TableCell>9.5-10.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Best For</TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      Long-term borrowers
                    </TableCell>
                    <TableCell>Medium-term loans</TableCell>
                    <TableCell>Rate hike protection</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mb-6 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
              <Image
                src="/images/guides/home-loan/fixed-vs-floating-rates.webp"
                alt="RLLR vs MCLR home loan interest rate comparison chart showing 0.25% difference for floating rate loans in India 2026"
                loading="lazy"
                width={800}
                height={400}
                className="rounded-lg w-full h-auto object-contain"
              />
            </div>

            <p className="text-xs text-slate-500 mt-4 italic">
              Rates updated {updatedLabel}. Final rates depend on CIBIL score,
              loan amount, and customer profile.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Competitor Comparison */}
      <section id="best-banks" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-lime-600" />
          Top 5 Home Loan Banks in India (Updated {updatedLabel})
        </h2>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Bank
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Interest Rate
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Processing Fee
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Max Tenure
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Best For
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-slate-900">
                      SBI
                    </TableCell>
                    <TableCell className="font-medium text-lime-700">
                      8.50%*
                    </TableCell>
                    <TableCell>₹10,000</TableCell>
                    <TableCell>30 years</TableCell>
                    <TableCell className="text-sm">
                      Govt employees, low rates
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-slate-900">
                      HDFC
                    </TableCell>
                    <TableCell className="font-medium text-lime-700">
                      8.60%*
                    </TableCell>
                    <TableCell>0.50% of loan</TableCell>
                    <TableCell>30 years</TableCell>
                    <TableCell className="text-sm">
                      High CIBIL (750+), premium service
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-slate-900">
                      ICICI
                    </TableCell>
                    <TableCell className="font-medium text-lime-700">
                      8.75%*
                    </TableCell>
                    <TableCell>0.50% of loan</TableCell>
                    <TableCell>30 years</TableCell>
                    <TableCell className="text-sm">
                      Quick processing, digital experience
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-slate-900">
                      Axis Bank
                    </TableCell>
                    <TableCell className="font-medium text-lime-700">
                      8.75%*
                    </TableCell>
                    <TableCell>₹10,000</TableCell>
                    <TableCell>30 years</TableCell>
                    <TableCell className="text-sm">
                      Salaried professionals, online approval
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-slate-900">
                      LIC Housing
                    </TableCell>
                    <TableCell className="font-medium text-lime-700">
                      8.40%*
                    </TableCell>
                    <TableCell>0.25% of loan</TableCell>
                    <TableCell>30 years</TableCell>
                    <TableCell className="text-sm">
                      Lowest rates, flexible tenure
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic mt-4">
          *Rates as of {updatedLabel}. Subject to change. Final rates depend on
          CIBIL score, loan amount, and relationship with bank.
        </p>

        <div className="mt-6 bg-lime-50 p-5 rounded-xl border-2 border-lime-200">
          <p className="text-sm text-slate-900 mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-lime-600" />
            <strong>Compare these banks instantly with our calculator:</strong>
          </p>
          <Link
            href="/loans/home-loan/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-600 text-white rounded-lg font-semibold hover:bg-lime-700 transition-colors text-sm shadow-sm"
          >
            Compare Bank EMIs Now
          </Link>
        </div>
      </section>

      {/* --- SECTION 5: HIDDEN CHARGES --- */}
      <section id="hidden-charges" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-600" /> Hidden Charges to
          Watch Out For
        </h2>
        <p className="mb-6 text-slate-700">
          While the interest rate gets the attention, these additional charges
          can significantly increase your home loan cost. Always factor these
          into your total expense calculation.
        </p>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      Charge Type
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Typical Amount
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Negotiable?
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Notes
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Processing Fees
                    </TableCell>
                    <TableCell>0.25% - 1% of loan amount</TableCell>
                    <TableCell className="font-bold text-lime-700">
                      ✅ Yes
                    </TableCell>
                    <TableCell className="text-sm">
                      Often waived during festive offers
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      MODT Charges
                    </TableCell>
                    <TableCell>₹2,000 - ₹10,000</TableCell>
                    <TableCell className="font-bold text-slate-700">
                      ❌ No
                    </TableCell>
                    <TableCell className="text-sm">
                      Memorandum of Deposit of Title Deeds
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Technical/Legal Fee
                    </TableCell>
                    <TableCell>₹2,000 - ₹5,000</TableCell>
                    <TableCell className="text-slate-600">Sometimes</TableCell>
                    <TableCell className="text-sm">
                      Property valuation & verification
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Login Fees
                    </TableCell>
                    <TableCell>₹1,000 - ₹3,000</TableCell>
                    <TableCell className="text-slate-600">Rarely</TableCell>
                    <TableCell className="text-sm">
                      One-time application fee
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-green-50">
                    <TableCell className="font-medium text-slate-700">
                      Prepayment Penalty (Floating Rate)
                    </TableCell>
                    <TableCell className="font-bold text-green-700">
                      Zero (₹0)
                    </TableCell>
                    <TableCell className="font-bold text-green-700">
                      N/A
                    </TableCell>
                    <TableCell className="text-sm">
                      RBI mandated - no charges since 2014
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Prepayment Penalty (Fixed Rate)
                    </TableCell>
                    <TableCell>2-4% of outstanding</TableCell>
                    <TableCell className="font-bold text-slate-700">
                      ❌ No
                    </TableCell>
                    <TableCell className="text-sm">
                      Applies to fixed-rate loans only
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Late Payment Charges
                    </TableCell>
                    <TableCell>2-3% + ₹500 per default</TableCell>
                    <TableCell className="font-bold text-slate-700">
                      ❌ No
                    </TableCell>
                    <TableCell className="text-sm">
                      Plus negative impact on CIBIL score
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Loan Conversion Charges
                    </TableCell>
                    <TableCell>0.5-1% of outstanding</TableCell>
                    <TableCell className="text-slate-600">Sometimes</TableCell>
                    <TableCell className="text-sm">
                      Switching from floating to fixed rate
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
          <p className="text-sm text-amber-900 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
            <span>
              <strong>Negotiation Tip:</strong> Always ask for a waiver on
              processing fees, especially if you have excellent credit score or
              existing relationship with the bank. Many banks waive these during
              festive seasons or for premium customers.
            </span>
          </p>
        </div>
      </section>

      {/* --- NEW SECTION: STAMP DUTY BY STATE --- */}
      <section id="stamp-duty" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Stamp className="h-6 w-6 text-lime-600" /> Stamp Duty & Registration
          Costs by State
        </h2>
        <p className="mb-6 text-slate-700">
          Beyond the home loan, you must pay <strong>stamp duty</strong> and{' '}
          <strong>registration charges</strong> at the time of property
          purchase. These vary significantly by state and can add 5-8% to your
          total property cost. This is a one-time cost paid to the state
          government.
        </p>

        <Card className="border border-slate-200 shadow-sm mb-6">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
              <MapPin className="h-5 w-5 text-lime-600" />
              Stamp Duty Rates Across Major Indian States (2026)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      State
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Stamp Duty (Men)
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Stamp Duty (Women)
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Registration Charge
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Maharashtra (Mumbai)
                    </TableCell>
                    <TableCell>5-6%</TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      4%
                    </TableCell>
                    <TableCell>1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Delhi</TableCell>
                    <TableCell>6%</TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      4%
                    </TableCell>
                    <TableCell>1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Karnataka (Bangalore)
                    </TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      3%
                    </TableCell>
                    <TableCell>1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Tamil Nadu (Chennai)
                    </TableCell>
                    <TableCell>7%</TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      7%
                    </TableCell>
                    <TableCell>1-4%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Telangana (Hyderabad)
                    </TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      5%
                    </TableCell>
                    <TableCell>0.5-1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Gujarat (Ahmedabad)
                    </TableCell>
                    <TableCell>4.9%</TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      4.9%
                    </TableCell>
                    <TableCell>1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Uttar Pradesh (Noida)
                    </TableCell>
                    <TableCell>7%</TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      6%
                    </TableCell>
                    <TableCell>1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      West Bengal (Kolkata)
                    </TableCell>
                    <TableCell>6-7%</TableCell>
                    <TableCell className="text-lime-700 font-semibold">
                      6-7%
                    </TableCell>
                    <TableCell>1%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-lime-50 to-white border-2 border-lime-200 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-bold text-slate-900 mb-4 text-lg">
              Cost Calculation Example
            </h3>
            <div className="bg-white p-5 rounded-lg border-2 border-slate-200">
              <p className="font-medium text-slate-900 mb-3">
                Property in Mumbai valued at ₹1 Crore:
              </p>
              <Table className="text-sm">
                <TableBody>
                  <TableRow>
                    <TableCell>Stamp Duty (Male)</TableCell>
                    <TableCell className="text-right font-bold">
                      ₹6,00,000
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Stamp Duty (Female owner)</TableCell>
                    <TableCell className="text-right font-bold text-lime-700">
                      ₹4,00,000 (Save ₹2L!)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Registration Charge</TableCell>
                    <TableCell className="text-right font-bold">
                      ₹1,00,000
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-slate-50">
                    <TableCell className="font-bold">Total (Male)</TableCell>
                    <TableCell className="text-right font-bold text-lg">
                      ₹7,00,000
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-lime-100">
                    <TableCell className="font-bold">Total (Female)</TableCell>
                    <TableCell className="text-right font-bold text-lime-800 text-lg">
                      ₹5,00,000
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 bg-lime-100 p-4 rounded-lg border border-lime-300">
              <p className="text-sm text-lime-900 font-medium flex items-start gap-2">
                <Lightbulb className="h-5 w-5 shrink-0 mt-0.5 text-lime-600" />
                <span>
                  <strong>Tax Saving Hack:</strong> Register the property in a
                  female family member&apos;s name where applicable to save 1-2%
                  on stamp duty (₹1-2 lakhs on a ₹1 crore property). Ensure she
                  meets co-ownership and loan eligibility criteria.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 4 - Before final sections */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-4" type="leaderboard" />
      </div>

      {/* --- NEW SECTION: PREPAYMENT STRATEGY --- */}
      <section id="prepayment" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <IndianRupee className="h-6 w-6 text-lime-600" /> Smart Prepayment
          Strategy
        </h2>
        <p className="mb-6 text-slate-700">
          Making part prepayments on your home loan can save you lakhs in
          interest and reduce your loan tenure significantly. Since{' '}
          <strong>floating rate loans have ZERO prepayment penalties</strong>{' '}
          (RBI mandated), you should consider regular prepayments whenever you
          have surplus funds.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-200">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
                <CheckCircle2 className="h-5 w-5 text-lime-600" />
                Part Prepayment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-slate-700 mb-3">
                Pay a lump sum amount towards your loan while continuing regular
                EMIs. You can choose to either:
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Reduce tenure:</strong> Keep EMI same, finish loan
                    faster
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Reduce EMI:</strong> Keep tenure same, lower monthly
                    burden
                  </span>
                </li>
              </ul>
              <div className="mt-4 bg-lime-50 p-3 rounded-lg border border-lime-200">
                <p className="text-xs text-lime-900 font-medium">
                  <strong>Recommended:</strong> Reduce tenure for maximum
                  interest savings
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-200">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
                <XCircle className="h-5 w-5 text-slate-600" />
                Full Foreclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-slate-700 mb-3">
                Pay the entire outstanding principal amount and close the loan
                completely. This eliminates all future interest payments.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No penalty:</strong> On floating rate loans
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Property released:</strong> Bank removes mortgage
                    lien
                  </span>
                </li>
              </ul>
              <div className="mt-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-900 font-medium">
                  <strong>Note:</strong> Fixed-rate loans may charge 2-4%
                  penalty
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prepayment Impact Example */}
        <Card className="border-2 border-lime-200 bg-linear-to-br from-lime-50 to-white shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-slate-900">
              <IndianRupee className="h-6 w-6 text-lime-600" />
              Prepayment Impact Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-5 rounded-lg border-2 border-slate-200 mb-4">
              <h4 className="font-bold text-slate-900 mb-3">Loan Details</h4>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                <li>
                  Loan Amount: <strong>₹50 Lakh</strong>
                </li>
                <li>
                  Interest Rate: <strong>8.5% p.a.</strong>
                </li>
                <li>
                  Tenure: <strong>20 years</strong>
                </li>
                <li>
                  EMI: <strong>₹43,391/month</strong>
                </li>
              </ul>
            </div>

            <div className="bg-lime-50 p-5 rounded-lg border-2 border-lime-200">
              <h4 className="font-bold text-slate-900 mb-3">
                Scenario: ₹5 Lakh prepayment after 5 years
              </h4>
              <div className="overflow-x-auto">
                <Table className="text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Option</TableHead>
                      <TableHead className="text-right font-bold">
                        New Tenure
                      </TableHead>
                      <TableHead className="text-right font-bold">
                        Total Interest Saved
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Without Prepayment
                      </TableCell>
                      <TableCell className="text-right">20 years</TableCell>
                      <TableCell className="text-right">-</TableCell>
                    </TableRow>
                    <TableRow className="bg-white">
                      <TableCell className="font-bold">
                        With Prepayment (Reduce Tenure)
                      </TableCell>
                      <TableCell className="text-right font-bold text-lime-700">
                        14 years
                      </TableCell>
                      <TableCell className="text-right font-bold text-lime-700">
                        ₹12,50,000
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-lime-900 mt-3 italic font-medium">
                A ₹5L prepayment saves you ₹12.5L in interest and reduces tenure
                by 6 years!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prepayment Strategy Tips */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
              <Lightbulb className="h-5 w-5 text-lime-600" />
              When to Prepay Your Home Loan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 mb-1">
                    Early Years (First 10 years)
                  </p>
                  <p>
                    Maximum interest savings since 70-80% of EMI goes towards
                    interest. Even small prepayments have huge impact.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-lime-50 rounded-lg border border-lime-200">
                <CheckCircle2 className="h-5 w-5 text-lime-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 mb-1">
                    When You Get Windfall Income
                  </p>
                  <p>
                    Annual bonus, inheritance, sale of investments - use 50-70%
                    towards prepayment instead of new purchases.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 mb-1">
                    Don&apos;t Prepay If...
                  </p>
                  <p>
                    You have high-interest debt (credit cards, personal loans) -
                    pay those first. Or if you&apos;re claiming maximum tax
                    benefits and in 30% bracket.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-700 flex items-start gap-2">
                <Calculator className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Calculate your prepayment impact:</strong> Use our
                  prepayment calculator to see exact savings based on your loan
                  details.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- NEW SECTION: COMMON REJECTION REASONS --- */}
      <section id="rejection-reasons" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <XCircle className="h-6 w-6 text-red-600" /> Why Home Loan
          Applications Get Rejected
        </h2>
        <p className="mb-6 text-slate-700">
          Understanding common rejection reasons helps you prepare better and
          avoid application denials. Here are the top reasons banks reject home
          loan applications and how to fix them.
        </p>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-red-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    1. Low CIBIL Score (Below 650)
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Most common rejection reason. Banks view low scores as high
                    credit risk.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-xs text-red-900">
                      <strong>Solution:</strong> Wait 6-12 months, pay all dues
                      on time, reduce credit utilization below 30%, correct
                      errors in CIBIL report, avoid multiple loan inquiries.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-amber-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    2. High FOIR (Above 60%)
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Too many existing loans eating into your income. Bank doubts
                    your repayment capacity.
                  </p>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <p className="text-xs text-amber-900">
                      <strong>Solution:</strong> Close small personal loans, pay
                      off credit card debt, add co-applicant with income, apply
                      for lower loan amount, wait for salary increment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    3. Property Legal Issues
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Unclear title, pending litigation, unapproved construction,
                    or property in restricted zones.
                  </p>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <p className="text-xs text-purple-900">
                      <strong>Solution:</strong> Get legal opinion from property
                      lawyer before applying, ensure encumbrance certificate is
                      clear, verify builder&apos;s credentials and approvals,
                      choose properties in bank-approved projects.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-blue-100 rounded-lg">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    4. Insufficient or Inconsistent Income Proof
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Self-employed with fluctuating income, cash-based business,
                    or incomplete ITR filings.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-900">
                      <strong>Solution:</strong> File ITR regularly for 3 years,
                      maintain proper business accounts, show consistent profit
                      trends, get CA-certified financial statements, provide GST
                      returns if applicable.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-slate-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-slate-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    5. Job Instability or Frequent Job Changes
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Less than 2 years in current job, multiple job switches in
                    short period, or working in unstable industry.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-900">
                      <strong>Solution:</strong> Wait until you complete 2 years
                      in current organization, provide strong employment
                      continuity letter, show salary growth trajectory, apply
                      through employer tie-ups for better approval chances.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    6. Age Factor (Too Young or Too Old)
                  </h3>
                  <p className="text-slate-700 text-sm mb-3">
                    Below 25 years with limited work experience or above 55-60
                    years nearing retirement.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-xs text-red-900">
                      <strong>Solution:</strong> Add younger co-applicant if
                      you&apos;re near retirement, choose shorter tenure,
                      provide additional income sources (rent, business), opt
                      for lower loan amount with higher down payment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-lime-50 p-5 rounded-xl border-2 border-lime-200">
          <p className="text-sm text-slate-900 flex items-start gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-lime-600 shrink-0 mt-0.5" />
            <span>
              <strong>Pro Tip:</strong> If your application gets rejected, wait
              at least 3-6 months before reapplying. Use this time to fix the
              issues mentioned above. Multiple rejections in short period
              further damage your credit score.
            </span>
          </p>
        </div>
      </section>

      {/* Real Example */}
      <Card className="mb-12 border-l-4 border-l-lime-600 bg-linear-to-br from-lime-50/30 to-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-lime-600" />
            Real Example: Amit&apos;s ₹50 Lakh Home Loan Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-5 rounded-lg border-2 border-slate-200">
            <h4 className="font-bold text-slate-900 mb-3">Borrower Profile</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-slate-600">Annual Salary:</span>{' '}
                <strong>₹12 LPA</strong>
              </div>
              <div>
                <span className="text-slate-600">CIBIL Score:</span>{' '}
                <strong>780</strong>
              </div>
              <div>
                <span className="text-slate-600">Loan Amount:</span>{' '}
                <strong>₹50 Lakh</strong>
              </div>
              <div>
                <span className="text-slate-600">Tenure:</span>{' '}
                <strong>20 years</strong>
              </div>
              <div>
                <span className="text-slate-600">Interest Rate:</span>{' '}
                <strong>8.5% p.a. (RLLR)</strong>
              </div>
              <div>
                <span className="text-slate-600">Monthly EMI:</span>{' '}
                <strong>₹43,391</strong>
              </div>
            </div>
          </div>

          <div className="bg-lime-50 p-5 rounded-lg border-2 border-lime-200">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BadgePercent className="h-5 w-5 text-lime-600" />
              Annual Tax Savings Breakdown (Old Tax Regime)
            </h4>
            <Table className="text-sm">
              <TableBody>
                <TableRow>
                  <TableCell>Principal Repayment (80C)</TableCell>
                  <TableCell className="text-right font-bold">
                    ₹1,50,000
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Interest Payment (24b)</TableCell>
                  <TableCell className="text-right font-bold">
                    ₹2,00,000
                  </TableCell>
                </TableRow>
                <TableRow className="bg-lime-100">
                  <TableCell className="font-bold">Total Deduction</TableCell>
                  <TableCell className="text-right font-bold text-lime-800">
                    ₹3,50,000
                  </TableCell>
                </TableRow>
                <TableRow className="bg-lime-100">
                  <TableCell className="font-bold">
                    Tax Saved (30% bracket)
                  </TableCell>
                  <TableCell className="text-right font-bold text-lime-800">
                    ₹1,05,000/year
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <p className="text-xs text-lime-900 mt-3 italic font-medium">
              Over 20 years, Amit saves <strong>₹21 lakhs in taxes</strong>{' '}
              while building ₹50L+ equity in his property!
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-slate-200">
            <h4 className="font-bold text-slate-900 mb-3">
              Total Cost Breakdown
            </h4>
            <Table className="text-sm">
              <TableBody>
                <TableRow>
                  <TableCell>Loan Principal</TableCell>
                  <TableCell className="text-right">₹50,00,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Interest Paid (20 years)</TableCell>
                  <TableCell className="text-right">₹54,13,840</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Processing Fees (0.5%)</TableCell>
                  <TableCell className="text-right">₹25,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Stamp Duty & Registration (6%)</TableCell>
                  <TableCell className="text-right">₹6,00,000</TableCell>
                </TableRow>
                <TableRow className="bg-slate-50">
                  <TableCell className="font-bold">Total Cost</TableCell>
                  <TableCell className="text-right font-bold text-lg">
                    ₹1,10,38,840
                  </TableCell>
                </TableRow>
                <TableRow className="bg-green-50">
                  <TableCell className="font-bold text-green-900">
                    Minus Tax Savings (20 years)
                  </TableCell>
                  <TableCell className="text-right font-bold text-green-700">
                    - ₹21,00,000
                  </TableCell>
                </TableRow>
                <TableRow className="bg-lime-100">
                  <TableCell className="font-bold text-slate-900">
                    Effective Cost
                  </TableCell>
                  <TableCell className="text-right font-bold text-lime-800 text-lg">
                    ₹89,38,840
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 5 - After real example */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-5" type="leaderboard" />
      </div>

      {/* --- SECTION 6: BUY VS RENT (IMPROVED) --- */}
      <section id="buy-vs-rent" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-lime-600" /> Buy vs Rent: Which
          Makes Financial Sense?
        </h2>
        <p className="mb-6 text-slate-700">
          One of the most critical financial decisions in your 20s-30s is
          whether to buy a home or continue renting. The answer depends on
          multiple factors including your career stability, city of residence,
          and financial goals.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-lime-200 bg-white shadow-sm hover:border-lime-300 transition-colors">
            <CardHeader className="pb-2 border-b border-slate-100 bg-lime-50">
              <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
                <Home className="h-5 w-5 text-lime-600" />
                Buying (Home Loan)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">
                    Ownership & Equity Building
                  </p>
                  <p className="text-slate-600 text-xs">
                    Property becomes yours after tenure. Build ₹50L+ equity
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Tax Benefits</p>
                  <p className="text-slate-600 text-xs">
                    Save ₹1-2L/year under old regime (80C + 24b)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Forced Savings</p>
                  <p className="text-slate-600 text-xs">
                    EMI acts as disciplined wealth creation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">
                    Appreciation Potential
                  </p>
                  <p className="text-slate-600 text-xs">
                    Property values grow 5-8% annually in good locations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Low Flexibility</p>
                  <p className="text-slate-600 text-xs">
                    Can&apos;t move easily for job opportunities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">
                    Maintenance Costs
                  </p>
                  <p className="text-slate-600 text-xs">
                    Property tax, society charges, repairs add up
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 bg-slate-50 shadow-sm">
            <CardHeader className="pb-2 border-b border-slate-200">
              <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-slate-600" />
                Renting
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">High Flexibility</p>
                  <p className="text-slate-600 text-xs">
                    Move cities for better jobs or lifestyle
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">
                    Lower Upfront Cost
                  </p>
                  <p className="text-slate-600 text-xs">
                    No 10-25% down payment needed
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">HRA Tax Benefit</p>
                  <p className="text-slate-600 text-xs">
                    Deduct 50% of rent (metro) or 40% under 80GG
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">
                    No Maintenance Hassle
                  </p>
                  <p className="text-slate-600 text-xs">
                    Owner handles repairs and society issues
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">No Ownership</p>
                  <p className="text-slate-600 text-xs">
                    Rent is pure expense, no equity building
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Rent Increases</p>
                  <p className="text-slate-600 text-xs">
                    Landlord can hike rent 10-15% every 2-3 years
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* When to Buy vs Rent */}
        <Card className="border-2 border-lime-200 bg-linear-to-br from-lime-50 to-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-slate-900">
              <Lightbulb className="h-6 w-6 text-lime-600" />
              Decision Framework: When to Buy vs Rent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
                <h4 className="font-bold text-green-900 mb-3 text-lg">
                  ✅ Buy If...
                </h4>
                <ul className="space-y-2 text-sm text-green-900">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Settled in one city for 7+ years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Stable job/business with good income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Can afford 20-30% down payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>EMI-to-income ratio below 40%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Want to build long-term wealth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Can claim tax benefits (old regime)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
                <h4 className="font-bold text-amber-900 mb-3 text-lg">
                  🤔 Rent If...
                </h4>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Job requires frequent city changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Early in career (first 3-5 years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Can&apos;t afford 20% down payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Rent-to-EMI ratio is less than 50%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Prefer flexibility over stability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Want to invest in higher-return assets</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3 text-lg">
                💡 Smart Strategy: Rent Where You Live, Own Where You Can
              </h4>
              <p className="text-sm text-blue-900 leading-relaxed">
                If you work in expensive metros like Mumbai or Bangalore,
                consider{' '}
                <strong>
                  renting in the city while buying property in your hometown or
                  Tier-2 city
                </strong>
                . This gives you rental income from owned property while
                maintaining job flexibility. Many NRIs and young professionals
                follow this model successfully.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_ITEMS.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border border-slate-200 rounded-lg px-5 bg-white shadow-sm"
            >
              <AccordionTrigger className="text-left text-slate-900 font-semibold hover:text-lime-700 hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* 💰 AD SLOT 6 - Before footer CTA */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-6" type="leaderboard" />
      </div>

      {/* Final CTA */}
      <Card className="mb-12 bg-linear-to-br from-lime-50 via-white to-slate-50 border-2 border-lime-300 shadow-lg">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Calculate Your Home Loan EMI?
          </h3>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            Use our advanced home loan calculator to instantly find your EMI,
            total interest, and eligibility based on your income and credit
            score. Compare multiple banks in one place.
          </p>
          <Link
            href="/loans/home-loan/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-lime-600 text-white text-lg rounded-lg font-bold hover:bg-lime-700 transition-all shadow-md hover:shadow-lg"
          >
            <Calculator className="h-6 w-6" />
            Calculate My Home Loan Now
          </Link>
          <p className="text-xs text-slate-500 mt-4">
            Free • No registration required • Instant results
          </p>
        </CardContent>
      </Card>

      {/* Related Calculators */}
      <Card className="mb-12 border border-slate-200 bg-white shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
            <Calculator className="h-6 w-6 text-lime-600" />
            Related Calculators & Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/loans/home-loan/"
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-lime-300 hover:bg-lime-50 transition-all group"
            >
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-lime-700">
                Home Loan EMI Calculator
              </h4>
              <p className="text-sm text-slate-600">
                Calculate monthly EMI, total interest, and loan eligibility
              </p>
            </Link>

            <Link
              href="/income-tax-calculator/"
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-lime-300 hover:bg-lime-50 transition-all group"
            >
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-lime-700">
                Income Tax Calculator
              </h4>
              <p className="text-sm text-slate-600">
                Compare old vs new tax regime with home loan deductions
              </p>
            </Link>

            <Link
              href="/emi-calculator/"
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-lime-300 hover:bg-lime-50 transition-all group"
            >
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-lime-700">
                Universal EMI Calculator
              </h4>
              <p className="text-sm text-slate-600">
                Calculate EMI for any type of loan with prepayment analysis
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Summary Box */}
      <Card className="mb-12 border-l-4 border-l-lime-600 bg-linear-to-br from-lime-50/50 to-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-lime-600" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-lime-600 shrink-0 mt-0.5" />
              <span>
                <strong>CIBIL score of 750+</strong> gets you the best interest
                rates (8.5-8.75%). Work on improving your credit score before
                applying.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-lime-600 shrink-0 mt-0.5" />
              <span>
                <strong>Tax benefits up to ₹3.5 lakh/year</strong> are available
                only under the old tax regime (Sections 80C and 24b). Calculate
                which regime suits you better.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-lime-600 shrink-0 mt-0.5" />
              <span>
                <strong>RLLR-linked loans</strong> offer better transparency and
                faster rate adjustments compared to MCLR. Most experts recommend
                floating over fixed rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-lime-600 shrink-0 mt-0.5" />
              <span>
                <strong>Prepayment in early years</strong> saves maximum
                interest since 70-80% of initial EMI goes towards interest. No
                penalty on floating rate loans.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-lime-600 shrink-0 mt-0.5" />
              <span>
                <strong>Joint home loans with co-owners</strong> can double your
                tax benefits to ₹7 lakh/year if both borrowers are in the 30%
                tax bracket.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-lime-600 shrink-0 mt-0.5" />
              <span>
                <strong>Stamp duty varies by state</strong> (4-7%) and is lower
                for women in several states. Factor this 5-8% additional cost
                into your budget.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-lime-600 shrink-0 mt-0.5" />
              <span>
                <strong>Keep FOIR below 50-60%</strong> by closing unnecessary
                loans before applying. High FOIR is a major rejection reason.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <Card className="mb-12 border border-slate-200 bg-slate-50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900">
            Explore More Financial Guides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            <Link
              href="/guides/personal-loan-guide/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <FileText className="h-5 w-5 shrink-0" />
              <span className="font-medium">Personal Loan Guide</span>
            </Link>
            <Link
              href="/guides/credit-card-guide/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <FileText className="h-5 w-5 shrink-0" />
              <span className="font-medium">Credit Card Guide</span>
            </Link>
            <Link
              href="/guides/investment-guide/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <FileText className="h-5 w-5 shrink-0" />
              <span className="font-medium">Investment Planning Guide</span>
            </Link>
            <Link
              href="/guides/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <FileText className="h-5 w-5 shrink-0" />
              <span className="font-medium">View All Guides →</span>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Author Bio */}
      {/* Author Bio */}
      <Card className="mb-12 border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center">
              <UserCheck className="h-8 w-8 text-lime-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Written by Fincado Research Team
              </h3>
              <p className="text-sm text-slate-700 mb-3">
                Expert financial analysts specializing in personal finance, home
                loans, and tax planning for Indian consumers.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  Home Loans & Mortgages
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Tax Planning
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Real Estate Finance
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Credit Management
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Share Tools */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <p className="text-sm text-slate-600 mb-4 text-center">
          Found this guide helpful? Share it with friends planning to buy a
          home:
        </p>
        <div className="flex justify-center">
          <ShareTools title="The Complete Home Loan Guide 2026" />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-2 text-sm">Disclaimer</h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          This guide is for informational purposes only and should not be
          considered financial advice. Home loan interest rates, eligibility
          criteria, and tax laws are subject to change. Section 80EEA benefits
          expired on March 31, 2022, and are no longer available. Please consult
          with a certified financial advisor or chartered accountant before
          making any financial decisions. Actual loan approval and terms depend
          on individual circumstances, bank policies, and credit profile.
          Information last updated: {updatedLabel}.
        </p>
      </div>
    </article>
  );
}
