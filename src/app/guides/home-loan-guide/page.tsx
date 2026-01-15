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

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Home Loan Guide 2025: Eligibility, Tax Benefits & Hidden Charges',
  description:
    'Complete home loan guide for India: CIBIL score, FOIR, tax benefits (80C, 24b, 80EEA), RLLR vs MCLR, hidden charges & first-time buyer tips.',
  keywords: [
    'Home Loan Guide India',
    'Home Loan Tax Benefit 2025',
    'Section 80EEA',
    'RLLR vs MCLR',
    'First time home buyer guide',
    'Home Loan Process',
    'CIBIL score for home loan',
  ],
  openGraph: {
    title: 'Home Loan Guide 2025: Eligibility, Tax Benefits & Hidden Charges',
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
              'The Complete Home Loan Guide 2025: Eligibility, Tax Benefits & Hidden Charges',
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
                url: 'https://fincado.com/logo.png',
              },
            },
            datePublished: '2025-01-15',
            dateModified: '2025-01-15',
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

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Home Loan Guide 2025',
            url: 'https://fincado.com/guides/home-loan-guide/',
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
          The Complete Home Loan Guide 2025: Eligibility, Tax Benefits & Hidden
          Charges
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
            <CheckCircle2 className="h-4 w-4" /> Expert Reviewed
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="The Complete Home Loan Guide 2025" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
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
              alt="Happy Indian couple holding house keys in a sun-lit modern apartment"
              fill
              priority
              className="object-cover"
            />
          </div>
          <p className="text-center text-xs text-slate-500 italic mt-2">
            Secure your dream home with the right loan strategy.
          </p>
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS A HOME LOAN --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-600" /> What is a Home Loan?
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
                <FileText className="h-4 w-4" /> Key Components
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

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" /> The Process
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-blue-800 marker:font-bold">
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

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-home-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: ELIGIBILITY --- */}
      <section className="mb-12">
        <h2
          id="eligibility"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <UserCheck className="h-6 w-6 text-emerald-600" /> Eligibility
          Checklist
        </h2>
        <p className="mb-6 text-slate-700">
          Before you apply, make sure you meet these critical eligibility
          parameters.
        </p>

        <Card className="border-slate-200 mb-6">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> 1. CIBIL
              Score Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
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
                  <TableCell className="font-bold text-emerald-600">
                    750+ (Excellent)
                  </TableCell>
                  <TableCell className="text-emerald-600">
                    Very high chance
                  </TableCell>
                  <TableCell>Lowest rates</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-blue-600">
                    700-749 (Good)
                  </TableCell>
                  <TableCell>High chances</TableCell>
                  <TableCell>Standard rates</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-amber-600">
                    650-699 (Fair)
                  </TableCell>
                  <TableCell>Moderate chances</TableCell>
                  <TableCell>Higher rates</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-red-600">
                    Below 650 (Poor)
                  </TableCell>
                  <TableCell className="text-red-600">Low chances</TableCell>
                  <TableCell>Very high rates</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-500" /> 2. FOIR (Fixed
              Obligation to Income Ratio)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-700 mb-4">
              <strong>FOIR</strong> is the ratio of your total monthly debt
              obligations to your gross monthly income. Most lenders prefer a
              FOIR of <strong>40-50%</strong> or lower.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
              <h4 className="font-bold text-blue-900 mb-2">
                Check Your Eligibility Now
              </h4>
              <p className="text-sm text-blue-800 mb-3">
                Use our advanced calculator to see exactly how much loan you can
                afford based on your salary and existing EMIs.
              </p>
              <Link
                href="/loans/home-loan/"
                className="inline-block bg-white text-blue-700 font-semibold py-2 px-4 rounded border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
              >
                Home Loan EMI Calculator
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 3: TAX BENEFITS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <BadgePercent className="h-6 w-6 text-emerald-600" /> Tax Benefits:
          The Crucial Section
        </h2>
        <p className="mb-6 text-slate-700">
          One of the biggest advantages of taking a home loan in India is the
          significant tax deductions available under the Income Tax Act, 1961.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
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
                <TableCell className="font-bold text-emerald-600">
                  ₹1,50,000
                </TableCell>
                <TableCell>All borrowers</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Section 24(b)
                </TableCell>
                <TableCell>Interest on loan</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  ₹2,00,000
                </TableCell>
                <TableCell>Self-occupied property</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Section 80EEA
                </TableCell>
                <TableCell>Additional Interest</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  ₹1,50,000
                </TableCell>
                <TableCell>First-time buyers*</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-500 italic mb-6">
          *Note: Section 80EEA applies to loans sanctioned between April 1,
          2019, and March 31, 2022, for properties with stamp duty value up to
          ₹45 Lakhs.
        </p>

        <Card className="bg-emerald-50 border-emerald-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-900 text-lg">
              Joint Home Loan Tax Benefit Hack
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-emerald-800">
            When you take a <strong>joint home loan</strong> with a co-borrower
            (spouse, parent), both can claim{' '}
            <strong>individual deductions</strong> under Section 80C and Section
            24(b). This effectively <strong>doubles</strong> the total tax
            benefit available to the household.
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-home-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: INTEREST RATES --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-indigo-600" /> Interest Rates:
          RLLR vs MCLR
        </h2>
        <Card className="border-slate-200 mb-8">
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
                alt="Comparison of RLLR vs MCLR home loan interest rates"
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

      {/* --- SECTION 5: HIDDEN CHARGES --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" /> Hidden Charges
          List
        </h2>
        <p className="mb-6 text-slate-700">
          While the interest rate gets the attention, these charges can increase
          your cost:
        </p>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
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
                <TableCell className="text-emerald-600 font-bold">
                  ✅ Yes
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  MODT Charges
                </TableCell>
                <TableCell>₹2,000 - ₹10,000</TableCell>
                <TableCell className="text-red-600 font-bold">❌ No</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Technical Fee
                </TableCell>
                <TableCell>₹2,000 - ₹5,000</TableCell>
                <TableCell className="text-amber-600">Sometimes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Prepayment Penalty
                </TableCell>
                <TableCell className="font-bold text-emerald-600">
                  Zero
                </TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 6: BUY VS RENT --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-purple-600" /> Home Loan vs Renting
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-purple-100 bg-purple-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-800 text-lg">
                Home Loan
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <div className="flex justify-between border-b border-purple-100 pb-2">
                <span>Ownership</span>
                <span className="font-medium">Yes, after tenure</span>
              </div>
              <div className="flex justify-between border-b border-purple-100 pb-2">
                <span>Monthly Outgo</span>
                <span className="font-medium">EMI (Principal + Interest)</span>
              </div>
              <div className="flex justify-between border-b border-purple-100 pb-2">
                <span>Tax Benefits</span>
                <span className="font-medium text-emerald-600">Yes (High)</span>
              </div>
              <div className="flex justify-between">
                <span>Flexibility</span>
                <span className="font-medium text-red-600">Low</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-slate-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">Renting</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
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
                <span className="font-medium text-amber-600">
                  No (Except HRA)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Flexibility</span>
                <span className="font-medium text-emerald-600">High</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-12 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Buying a home in India is a strategic financial decision. To make
            the smartest choice:
          </p>
          <ul className="space-y-3 mb-6 text-slate-300">
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Aim for a <strong>CIBIL score of 750+</strong> before applying.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Understand your <strong>FOIR</strong> and don&apos;t
                over-leverage.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Maximize <strong>tax benefits</strong> under Sections 80C and
                24(b).
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Choose <strong>RLLR-linked floating rate loans</strong> for
                better transparency.
              </span>
            </li>
          </ul>
          <p className="text-slate-400 text-sm italic">
            Whether you&apos;re a first-time buyer or upgrading, this guide
            equips you with the knowledge to save lakhs over your loan tenure.
          </p>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-home-3" type="leaderboard" />
      </div>

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
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
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
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
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

      {/* --- AUTHOR & DISCLAIMER --- */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> The information provided in this guide is
          for educational purposes only. Interest rates, tax laws (Section 80C,
          24b), and bank policies change frequently. Please consult a qualified
          financial advisor or CA before making any final borrowing decisions.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Ready to calculate your home loan eligibility?
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Use our free Home Loan EMI Calculator to plan your purchase and
            discover how much you can afford!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/loans/home-loan/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Calculate EMI
            </Link>
            <Link
              href="/credit-score/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Check Credit Score
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-home-4" type="leaderboard" />
      </div>
    </article>
  );
}
