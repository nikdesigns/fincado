// src/app/guides/home-loan-guide/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import LiveRateTable from '@/components/LiveRateTable';
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
} from 'lucide-react';
import HomeLoanCalculatorEmbed from '@/components/HomeLoanCalculatorEmbed';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Home Loan Guide 2026: Eligibility, Interest Rates & Tax Benefits',
  description:
    'Complete home loan guide for India: CIBIL score, FOIR, tax benefits (80C, 24b, 80EEA), RLLR vs MCLR, hidden charges & first-time buyer tips.',
  keywords: [
    'Home Loan Guide India',
    'Home Loan Tax Benefit 2026',
    'Section 80EEA',
    'RLLR vs MCLR',
    'First time home buyer guide',
    'Home Loan Process',
    'CIBIL score for home loan',
  ],
  openGraph: {
    title: 'Home Loan Guide 2026: Eligibility, Interest Rates & Tax Benefits',
    description:
      'Save lakhs on your home loan with these expert tips on tax, interest rates, and eligibility.',
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
    question: 'What are the tax benefits on home loans in 2026?',
    answer:
      'You can save up to ₹3.5 lakh annually: ₹1.5 lakh under Section 80C (principal), ₹2 lakh under Section 24(b) (interest), and additional ₹1.5 lakh under Section 80EEA for eligible first-time buyers.',
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
              'The Complete Home Loan Guide 2026: Eligibility, Tax Benefits & Hidden Charges',
            description:
              'Complete Home Loan Guide 2026 covering eligibility, FOIR, tax benefits, and application steps.',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: '/logo.png',
              },
            },
            datePublished: '2025-01-15',
            dateModified: '2026-02-12',
            image: '/images/guides/home-loan/home-loan-guide-hero.webp',
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
        <Link href="/guides" className="hover:text-lime-600 transition-colors">
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
          The Complete Home Loan Guide 2026: Eligibility, Tax Benefits & Hidden
          Charges
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 15 Min Read
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
              repayment over <strong>5-30 years</strong>.
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
                <div className="text-slate-600 text-xs">Tax Savings</div>
              </div>
              <div className="bg-linear-to-br from-lime-50 to-lime-100/50 p-3 rounded-lg border-2 border-lime-200 text-center">
                <div className="font-bold text-2xl text-lime-800">30 yrs</div>
                <div className="text-slate-600 text-xs">Max Tenure</div>
              </div>
            </div>
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

      {/* Table of Contents */}
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
              href="#eligibility"
              aria-label="Jump to Eligibility Checklist section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">02</span> Eligibility Checklist
            </a>
            <a
              href="#tax-benefits"
              aria-label="Jump to Tax Benefits section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">03</span> Tax Benefits (80C, 24b)
            </a>
            <a
              href="#interest-rates"
              aria-label="Jump to Interest Rates section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">04</span> Interest Rates (RLLR vs
              MCLR)
            </a>
            <a
              href="#hidden-charges"
              aria-label="Jump to Hidden Charges section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">05</span> Hidden Charges
            </a>
            <a
              href="#buy-vs-rent"
              aria-label="Jump to Buy vs Rent section"
              className="flex items-center gap-2 p-2 rounded hover:bg-white hover:shadow-sm transition-all text-slate-700 hover:text-lime-700"
            >
              <span className="text-slate-400">06</span> Buy vs Rent
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
              Buying your first home in India is one of the biggest financial decisions you'll ever make, and choosing the right <strong>Home Loan</strong> can save you lakhs of rupees over the loan tenure. This comprehensive guide covers everything from CIBIL score requirements and tax benefits to hidden charges, helping you make an informed decision before signing on the dotted line.
            </p>
            <p>
              Whether you're a first-time home buyer or looking to refinance, understanding <strong>home loan eligibility criteria</strong>, <strong>tax deductions under Section 80C, 24(b), and 80EEA</strong>, and the difference between <strong>RLLR vs MCLR</strong> will put you in control of your home-buying journey.
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
            residential property.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-600" /> Key Components
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
                <li>
                  <strong>Principal Amount:</strong> Total loan amount borrowed.
                </li>
                <li>
                  <strong>Interest Rate:</strong> Cost of borrowing (fixed or
                  floating).
                </li>
                <li>
                  <strong>Tenure:</strong> Repayment period (5 to 30 years).
                </li>
                <li>
                  <strong>EMI:</strong> Monthly payment (Principal + Interest).
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-600" /> The Process
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 marker:font-bold">
                <li>
                  <strong>Pre-Approval:</strong> Check eligibility & get
                  sanction.
                </li>
                <li>
                  <strong>Property Check:</strong> Legal & technical
                  verification.
                </li>
                <li>
                  <strong>Disbursement:</strong> Funds released to seller.
                </li>
                <li>
                  <strong>Repayment:</strong> Pay EMIs & claim tax benefits.
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 2: ELIGIBILITY --- */}
      <section id="eligibility" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <UserCheck className="h-6 w-6 text-lime-600" /> Eligibility Checklist
        </h2>
        <p className="mb-6 text-slate-700">
          Before you apply, make sure you meet these critical eligibility
          parameters.
        </p>

        <Card className="border border-slate-200 mb-6 shadow-sm">
          <CardHeader className="bg-slate-50 border-b border-slate-200 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-lime-600" /> 1. CIBIL Score
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
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
                        Very high chance
                      </TableCell>
                      <TableCell>Lowest rates</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-900">
                        700-749 (Good)
                      </TableCell>
                      <TableCell>High chances</TableCell>
                      <TableCell>Standard rates</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        650-699 (Fair)
                      </TableCell>
                      <TableCell>Moderate chances</TableCell>
                      <TableCell>Higher rates</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-600">
                        Below 650 (Poor)
                      </TableCell>
                      <TableCell className="text-slate-600">
                        Low chances
                      </TableCell>
                      <TableCell>Very high rates</TableCell>
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
          This calculator uses industry-standard FOIR (40-50%) to estimate
          eligibility.
        </p>
      </section>

      {/* 💰 AD SLOT 2 - After calculator, high engagement area */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-2" type="leaderboard" />
      </div>

      {/* Document Checklist */}
      <Card className="mb-12 border border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
            <FileText className="h-5 w-5 text-lime-600" />
            Document Checklist for Home Loan Application
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-900 mb-3">
                ✅ For Salaried Individuals
              </h4>
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
                  Last 6 months&apos; bank statements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                  PAN card & Aadhaar card
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                  Property documents (sale agreement)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3">
                ✅ For Self-Employed
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                  ITR (last 2-3 years)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                  Audited financial statements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                  Business proof (GST, Shop Act)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                  Last 12 months&apos; bank statements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-lime-600 shrink-0 mt-0.5" />
                  PAN, Aadhaar & property docs
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-900 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
              <span>
                <strong>Pro Tip:</strong> Keep digital copies ready in a single
                folder. This speeds up approval by 7-10 days.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 3: TAX BENEFITS --- */}
      <section id="tax-benefits" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BadgePercent className="h-6 w-6 text-lime-600" /> Tax Benefits: The
          Crucial Section
        </h2>
        <p className="mb-6 text-slate-700">
          One of the biggest advantages of taking a home loan in India is the
          significant tax deductions available under the Income Tax Act, 1961.
        </p>

        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
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
                    <TableCell>All borrowers</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Section 24(b)
                    </TableCell>
                    <TableCell>Interest on loan</TableCell>
                    <TableCell className="font-bold text-lime-700">
                      ₹2,00,000
                    </TableCell>
                    <TableCell>Self-occupied property</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Section 80EEA
                    </TableCell>
                    <TableCell>Additional Interest</TableCell>
                    <TableCell className="font-bold text-lime-700">
                      ₹1,50,000
                    </TableCell>
                    <TableCell>First-time buyers*</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic mb-6">
          *Note: Section 80EEA applies to loans sanctioned between April 1,
          2019, and March 31, 2022, for properties with stamp duty value up to
          ₹45 Lakhs.
        </p>

        <Card className="bg-linear-to-br from-lime-50 to-white border-2 border-lime-200 shadow-sm mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-lime-600" />
              Joint Home Loan Tax Benefit Hack
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            When you take a <strong>joint home loan</strong> with a co-borrower
            (spouse, parent), both can claim{' '}
            <strong>individual deductions</strong> under Section 80C and Section
            24(b). This effectively <strong>doubles</strong> the total tax
            benefit available to the household.
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 3 - Mid-content, after tax benefits */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-3" type="leaderboard" />
      </div>

      {/* --- SECTION 4: INTEREST RATES --- */}
      <section id="interest-rates" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-lime-600" /> Interest Rates: RLLR
          vs MCLR
        </h2>
        <Card className="border border-slate-200 mb-8 shadow-sm">
          <CardContent className="pt-6">
            <p className="text-slate-700 mb-4">
              Home loan interest rates in India are benchmarked to either{' '}
              <strong>MCLR</strong> or <strong>RLLR</strong>. Most experts now
              favor <strong>RLLR (Repo Linked Lending Rate)</strong> because it
              is directly linked to the RBI&apos;s repo rate, offering faster
              transmission of rate cuts and greater transparency.
            </p>
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
            <h3 className="font-bold text-slate-900 mb-4 text-lg">
              Current Home Loan Rates (Live)
            </h3>
            <LiveRateTable type="homeLoan" />
          </CardContent>
        </Card>
      </section>

      {/* Competitor Comparison */}
      <section id="best-banks" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-lime-600" />
          Top 5 Home Loan Banks in India (Updated {updatedLabel})
        </h2>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
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
                    <TableCell className="text-sm">Govt employees</TableCell>
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
                    <TableCell className="text-sm">High CIBIL (750+)</TableCell>
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
                    <TableCell className="text-sm">Quick processing</TableCell>
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
                      Salaried professionals
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
                    <TableCell className="text-sm">Lowest rates</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic mt-4">
          *Rates as of {updatedLabel}. Subject to change. Final rates depend on
          CIBIL score and loan amount.
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
          <AlertTriangle className="h-6 w-6 text-amber-600" /> Hidden Charges
          List
        </h2>
        <p className="mb-6 text-slate-700">
          While the interest rate gets the attention, these charges can increase
          your cost:
        </p>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Processing Fees
                    </TableCell>
                    <TableCell>0.25% - 1% of loan</TableCell>
                    <TableCell className="font-bold text-lime-700">
                      ✅ Yes
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
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Technical Fee
                    </TableCell>
                    <TableCell>₹2,000 - ₹5,000</TableCell>
                    <TableCell className="text-slate-600">Sometimes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Prepayment Penalty
                    </TableCell>
                    <TableCell className="font-bold text-lime-700">
                      Zero
                    </TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>

      {/* Real Example */}
      <Card className="mb-12 border-l-4 border-l-lime-600 bg-linear-to-br from-lime-50/30 to-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-lime-600" />
            Real Example: Amit&apos;s ₹50 Lakh Home Loan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-5 rounded-lg border-2 border-slate-200">
            <h4 className="font-bold text-slate-900 mb-3">Profile</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-slate-600">Salary:</span>{' '}
                <strong>₹12 LPA</strong>
              </div>
              <div>
                <span className="text-slate-600">CIBIL:</span>{' '}
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
                <strong>8.5%</strong>
              </div>
              <div>
                <span className="text-slate-600">EMI:</span>{' '}
                <strong>₹43,391/month</strong>
              </div>
            </div>
          </div>

          <div className="bg-lime-50 p-5 rounded-lg border-2 border-lime-200">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BadgePercent className="h-5 w-5 text-lime-600" />
              Annual Tax Savings Breakdown
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
              while building ₹50L+ equity!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 - Before final sections */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-4" type="leaderboard" />
      </div>

      {/* --- SECTION 6: BUY VS RENT --- */}
      <section id="buy-vs-rent" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-lime-600" /> Home Loan vs Renting
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-slate-200 bg-white shadow-sm hover:border-lime-300 transition-colors">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
                <Home className="h-5 w-5 text-lime-600" />
                Home Loan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-slate-700 space-y-2">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span>Ownership</span>
                <span className="font-medium">Yes, after tenure</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span>Monthly Outgo</span>
                <span className="font-medium">EMI (Principal + Interest)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span>Tax Benefits</span>
                <span className="font-medium text-lime-700">Yes (High)</span>
              </div>
              <div className="flex justify-between">
                <span>Flexibility</span>
                <span className="font-medium text-slate-600">Low</span>
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
            <CardContent className="pt-4 text-sm text-slate-700 space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span>Ownership</span>
                <span className="font-medium">No</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span>Monthly Outgo</span>
                <span className="font-medium">Rent (Expense)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span>Tax Benefits</span>
                <span className="font-medium text-slate-600">
                  No (Except HRA)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Flexibility</span>
                <span className="font-medium text-slate-900">High</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- KEY TAKEAWAYS (Improved Conclusion) --- */}
      <Card className="mb-12 border-2 border-lime-200 bg-linear-to-br from-white via-lime-50/30 to-white shadow-md">
        <CardContent className="p-8 sm:p-10">
          <div className="flex items-start gap-4 mb-6 pb-6 border-b-2 border-lime-100">
            <div className="p-3 bg-lime-100 rounded-xl">
              <Lightbulb className="h-7 w-7 text-lime-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Key Takeaways
              </h2>
              <p className="text-slate-600 text-base">
                Essential points to remember before applying for your home loan
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-5 rounded-xl border-2 border-lime-200 hover:border-lime-400 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-lime-100 rounded-lg shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-lime-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-base">
                    Build Your Credit Score
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Aim for a{' '}
                    <strong className="text-slate-900">
                      CIBIL score of 750+
                    </strong>{' '}
                    before applying to get the lowest interest rates
                    (8.5%-8.75%).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-lime-200 hover:border-lime-400 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-lime-100 rounded-lg shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-lime-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-base">
                    Calculate Your FOIR
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Understand your{' '}
                    <strong className="text-slate-900">
                      Fixed Obligation to Income Ratio
                    </strong>{' '}
                    and don&apos;t over-leverage beyond 50-60%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-lime-200 hover:border-lime-400 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-lime-100 rounded-lg shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-lime-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-base">
                    Maximize Tax Benefits
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Save up to{' '}
                    <strong className="text-slate-900">₹3.5 lakh/year</strong>{' '}
                    through deductions under Sections 80C, 24(b), and 80EEA.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-lime-200 hover:border-lime-400 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-lime-100 rounded-lg shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-lime-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-base">
                    Choose RLLR Loans
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Opt for{' '}
                    <strong className="text-slate-900">
                      RLLR-linked floating rate loans
                    </strong>{' '}
                    for better transparency and faster rate adjustments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-lime-100 p-5 rounded-xl border-2 border-lime-300">
            <p className="text-slate-800 text-sm leading-relaxed">
              <strong className="text-slate-900">Bottom Line:</strong> Whether
              you&apos;re a first-time buyer or upgrading, this guide equips you
              with the knowledge to save lakhs over your loan tenure. Use our
              calculator above to estimate your EMI and start your home-buying
              journey with confidence.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-2 rounded-lg px-4 bg-white hover:border-lime-300 transition-colors"
            >
              <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline hover:text-lime-700">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
          <AccordionItem
            value="item-custom-1"
            className="border-2 rounded-lg px-4 bg-white hover:border-lime-300 transition-colors"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline hover:text-lime-700">
              Can I claim tax benefits on under-construction property?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              No. You can only claim tax benefits (Sec 24b and 80C) starting
              from the financial year in which the construction is completed and
              possession is handed over. However, pre-construction interest can
              be claimed in 5 equal installments after possession.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border-2 rounded-lg px-4 bg-white hover:border-lime-300 transition-colors"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline hover:text-lime-700">
              Is it better to prepay my home loan?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes, especially in the early years. Since the interest component
              is highest in the initial years, even a small prepayment can
              reduce your tenure significantly. Use our calculator to check the
              impact.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-3"
            className="border-2 rounded-lg px-4 bg-white hover:border-lime-300 transition-colors"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline hover:text-lime-700">
              What is the minimum down payment?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Banks typically finance 75% to 90% of the property value (LTV).
              You need to arrange the remaining 10% to 25% from your own funds
              as a down payment.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 💰 AD SLOT 5 - After FAQ, before final CTA */}
      <div className="no-print my-10">
        <AdSlot id="guide-home-5" type="leaderboard" />
      </div>

      {/* --- AUTHOR & DISCLAIMER --- */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-200">
          <strong>Disclaimer:</strong> The information provided in this guide is
          for educational purposes only. Interest rates, tax laws (Section 80C,
          24b), and bank policies change frequently. Please consult a qualified
          financial advisor or CA before making any final borrowing decisions.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-lime-600 to-lime-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <div className="p-4 bg-white/20 rounded-2xl mb-6">
            <Calculator className="h-12 w-12 text-white" />
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to calculate your home loan eligibility?
          </h2>
          <p className="mb-8 max-w-lg text-lime-100 text-lg">
            Use our free Home Loan EMI Calculator to plan your purchase and
            discover how much you can afford!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/loans/home-loan/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-lime-700 transition hover:bg-lime-50 shadow-lg hover:shadow-xl"
            >
              Calculate EMI Now
            </Link>
            <Link
              href="/credit-score/"
              className="rounded-lg border-2 border-white bg-lime-700 px-8 py-4 font-bold text-white transition hover:bg-lime-600"
            >
              Check Credit Score
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 6 - Final sticky ad */}
      <div className="no-print mt-10">
        <AdSlot id="guide-home-6" type="leaderboard" />
      </div>
    </article>
  );
}
