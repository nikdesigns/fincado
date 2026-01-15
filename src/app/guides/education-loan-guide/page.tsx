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
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Landmark,
  FileCheck,
  Plane,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Education Loan Guide: MS in US, 80E Tax & Rates 2025',
  description:
    'Education loan guide for MS in US: Secured vs unsecured rates, Section 80E tax deduction, moratorium strategy, I-20 documents & smart repayment tips 2025.',
  keywords: [
    'education loan for study abroad',
    'section 80E tax deduction',
    'secured vs unsecured education loan',
    'education loan interest rates 2025',
    'moratorium period interest calculation',
    'documents for education loan',
  ],
  openGraph: {
    title:
      'Study Abroad Education Loan Guide: Secured vs Unsecured & Section 80E',
    description:
      'Save lakhs on your education loan. Learn about 80E tax benefits, moratorium strategies, and how to choose between secured and unsecured loans.',
    url: 'https://fincado.com/guides/education-loan-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/education-loan/education-loan-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Student with luggage at airport dreaming of study abroad',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the interest rate on education loans for MS in the US?',
    answer:
      'Secured loans typically range from 8-10% p.a., while unsecured loans range from 11-14% p.a., depending on the lender and credit profile.',
  },
  {
    question: 'What is Section 80E and how does it help?',
    answer:
      'Section 80E allows tax deduction on the entire interest paid on an education loan with no upper limit for up to 8 years. For a parent in the 30% tax bracket, this effectively reduces the interest rate by ~3%.',
  },
  {
    question: 'Should I pay interest during the moratorium period?',
    answer:
      'Yes, if possible. Paying simple interest during the moratorium prevents capitalization (interest on interest) and can save ₹3-5 lakh or more over the loan tenure.',
  },
];

export default function EducationLoanGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Education Loan Guide',
            url: 'https://fincado.com/guides/education-loan-guide/',
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
              'Study Abroad Education Loan Guide: Secured vs Unsecured & Section 80E',
            description:
              'Comprehensive guide on Education Loans for studying abroad: Eligibility, Interest Rates, Section 80E Tax Benefits, and Moratorium strategies.',
            image:
              'https://fincado.com/images/guides/education-loan/education-loan-guide-hero.webp',
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
            datePublished: '2025-01-22',
            dateModified: '2025-01-22',
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
          className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-3 py-1"
        >
          Study Abroad
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Study Abroad Education Loan Guide: Secured vs Unsecured & Section 80E
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
          <ShareTools title="Study Abroad Education Loan Guide" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-slate-100">
          <Image
            src="/images/guides/education-loan/education-loan-guide-hero.webp"
            alt="Student with luggage at airport dreaming of study abroad"
            fill
            priority
            className="object-cover"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
          Pursuing higher education abroad—particularly an <strong>MS in the US</strong>—is a dream for thousands of Indian students every year, but the cost can easily exceed <strong>₹50-80 lakhs</strong>. An <strong>education loan</strong> makes this dream financially feasible, and understanding the difference between secured and unsecured loans, leveraging <strong>Section 80E tax deduction</strong>, and strategically managing the moratorium period can save lakhs in interest over the loan tenure.

          This comprehensive <strong>Study Abroad Education Loan Guide</strong> covers everything from eligibility and interest rates to tax benefits, documentation (I-20, visa), and smart repayment strategies.
        `}
          />
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS EDUCATION LOAN --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" /> What is an
            Education Loan?
          </h2>
          <p className="mb-6 text-slate-700 leading-relaxed">
            An <strong>Education Loan</strong> is a specialized loan designed to
            finance higher education expenses, including tuition fees, living
            costs, travel, books, and other study-related expenses. These loans
            offer unique features like a <strong>moratorium period</strong>{' '}
            (study + job search) where you don&apos;t have to pay full EMIs.
          </p>

          <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
            <h3 className="mb-3 font-semibold text-slate-900">
              Key Components:
            </h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                <span>
                  <strong>Principal Amount:</strong> Total loan sanctioned (₹5
                  Lakhs to ₹1.5 Crore+).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                <span>
                  <strong>Interest Rate:</strong> 8-14% p.a. (Secured vs
                  Unsecured).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                <span>
                  <strong>Tenure:</strong> 10-15 years after course completion.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                <span>
                  <strong>Moratorium:</strong> Grace period during study + 6-12
                  months.
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
                className="hover:text-indigo-600 hover:underline"
              >
                1. How Education Loans Work
              </a>
            </li>
            <li>
              <a
                href="#secured-vs-unsecured"
                className="hover:text-indigo-600 hover:underline"
              >
                2. Secured vs Unsecured Loans
              </a>
            </li>
            <li>
              <a
                href="#section-80e"
                className="hover:text-indigo-600 hover:underline"
              >
                3. Tax Benefits (Section 80E)
              </a>
            </li>
            <li>
              <a
                href="#moratorium-strategy"
                className="hover:text-indigo-600 hover:underline"
              >
                4. Moratorium Strategy (Save Lakhs)
              </a>
            </li>
            <li>
              <a
                href="#documents"
                className="hover:text-indigo-600 hover:underline"
              >
                5. Required Documents
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-indigo-600 hover:underline">
                6. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-edu-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: PROCESS & ELIGIBILITY --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="how-it-works"
            className="mb-4 text-2xl font-bold text-slate-900 scroll-mt-20"
          >
            How Does an Education Loan Work?
          </h2>
          <ol className="list-decimal pl-5 space-y-2 mb-8 text-slate-700 marker:font-bold marker:text-slate-900">
            <li>
              <strong>Admission:</strong> Receive admission letter/I-20 from
              university.
            </li>
            <li>
              <strong>Application:</strong> Apply with co-applicant details and
              collateral (if any).
            </li>
            <li>
              <strong>Sanction:</strong> Lender approves loan based on profile
              and future income potential.
            </li>
            <li>
              <strong>Disbursement:</strong> Fees paid directly to university;
              living expenses to Forex card.
            </li>
            <li>
              <strong>Moratorium:</strong> Study period + 6-12 months (Simple
              interest accrues).
            </li>
            <li>
              <strong>Repayment:</strong> Full EMI starts after moratorium ends.
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
                  <TableCell>16 - 35 Years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Academic
                  </TableCell>
                  <TableCell>Confirmed Admission (I-20 for US)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Co-Applicant
                  </TableCell>
                  <TableCell>Parent/Guardian with stable income</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Credit Score
                  </TableCell>
                  <TableCell>Co-applicant should have 750+</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 3: SECURED VS UNSECURED --- */}
      <section className="mb-12">
        <h2
          id="secured-vs-unsecured"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Secured vs Unsecured Education Loans
        </h2>
        <p className="mb-6 text-slate-700">
          One of the most critical decisions is choosing between pledging
          collateral (Secured) or going without it (Unsecured).
        </p>

        <Card className="mb-6 border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900 w-1/3">
                    Feature
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 w-1/3">
                    Secured Loan
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 w-1/3">
                    Unsecured Loan
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Collateral
                  </TableCell>
                  <TableCell className="text-indigo-600 font-bold">
                    Required (Property/FD)
                  </TableCell>
                  <TableCell className="text-slate-600">Not Required</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Interest Rate
                  </TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    8% - 10% p.a.
                  </TableCell>
                  <TableCell className="text-amber-600 font-bold">
                    11% - 14% p.a.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Max Amount
                  </TableCell>
                  <TableCell>Up to ₹1.5 Crore+</TableCell>
                  <TableCell>₹40 - ₹75 Lakhs</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Approval
                  </TableCell>
                  <TableCell>Easier (Lower Risk)</TableCell>
                  <TableCell>Harder (Strict Income Checks)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Best For
                  </TableCell>
                  <TableCell>High Loan Amounts (&gt;₹50L)</TableCell>
                  <TableCell>Moderate Amounts / No Assets</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="rounded-lg border-l-4 border-l-indigo-500 bg-indigo-50 p-4 text-sm text-indigo-900">
          <strong>Key Insight:</strong> For an MS in the US costing ₹60 Lakh,
          the 2-3% interest difference in a Secured Loan can save you{' '}
          <strong>₹5-10 Lakhs</strong> in total interest.
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-edu-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: TAX BENEFITS --- */}
      <section className="mb-12">
        <h2
          id="section-80e"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Landmark className="h-6 w-6 text-emerald-600" /> Tax Benefits:
          Section 80E Deep Dive
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`<strong>Section 80E</strong> allows you to claim a deduction for the <strong>entire interest amount</strong> paid on an education loan, with <strong>no upper limit</strong>, for up to <strong>8 years</strong>. This effectively reduces your actual cost of borrowing.`}
          />
        </div>

        <Card className="border-emerald-200 bg-emerald-50/50 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-800 text-lg">
              Section 80E Savings Example
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-4">
            <div>
              <strong>Scenario:</strong> Parent in 30% Tax Slab. Loan Amount:
              ₹40 Lakh @ 10% Interest.
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-emerald-200 pt-4">
              <div>
                <span className="block text-slate-500 text-xs">
                  Annual Interest Paid
                </span>
                <span className="text-lg font-bold">₹4,00,000</span>
              </div>
              <div>
                <span className="block text-slate-500 text-xs">
                  Tax Saved (30%)
                </span>
                <span className="text-lg font-bold text-emerald-600">
                  ₹1,20,000
                </span>
              </div>
            </div>
            <div className="bg-white p-3 rounded border border-emerald-100 text-center">
              Effective Interest Rate: <strong>~7%</strong> (down from 10%)
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900">
                    Tax Slab
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Interest Paid
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Tax Saved
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Effective Reduction
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    30%
                  </TableCell>
                  <TableCell>₹4,00,000</TableCell>
                  <TableCell>₹1,20,000</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    ~3.0%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    20%
                  </TableCell>
                  <TableCell>₹4,00,000</TableCell>
                  <TableCell>₹80,000</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    ~2.0%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    5%
                  </TableCell>
                  <TableCell>₹4,00,000</TableCell>
                  <TableCell>₹20,000</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    ~0.5%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>

      {/* --- SECTION 5: MORATORIUM STRATEGY --- */}
      <section className="mb-12">
        <h2
          id="moratorium-strategy"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" /> The
          &quot;Moratorium&quot; Strategy: Save Lakhs
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`The <strong>Moratorium Period</strong> is when you don't *have* to pay EMIs (Course + 1 year). However, simple interest keeps accumulating. You have two choices:
        
        1. <strong>Pay Simple Interest:</strong> Pay small monthly interest during study.
        2. <strong>Defer Interest:</strong> Pay nothing now; interest gets added to principal later.
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
                &quot;I&apos;ll pay everything after I get a job.&quot;
              </p>
              <p className="text-sm text-slate-600">
                If you defer, the accrued interest (e.g., ₹12 Lakhs) gets added
                to your Principal (Capitalization). You will then pay interest
                on this interest for 10-15 years!
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-700 text-lg">
                The Smart Move
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-800 font-medium mb-2">
                Pay Simple Interest During Study
              </p>
              <p className="text-sm text-slate-600">
                Paying the simple interest (approx ₹30k/month) during the course
                prevents capitalization and can save <strong>₹3-5 Lakhs</strong>{' '}
                in the long run.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900">
                    Strategy
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Principal at Repayment Start
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Extra Burden
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Pay Monthly Interest
                  </TableCell>
                  <TableCell>₹40,00,000 (Original)</TableCell>
                  <TableCell>₹0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Defer (Capitalize)
                  </TableCell>
                  <TableCell>₹53,24,000 (Bloated)</TableCell>
                  <TableCell className="text-red-600 font-bold">
                    +₹13.24 Lakhs Debt
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-edu-3" type="leaderboard" />
      </div>

      {/* --- SECTION 6: DOCUMENTS --- */}
      <section className="mb-12">
        <h2
          id="documents"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <FileCheck className="h-6 w-6 text-blue-600" /> Documents Required
          (Study Abroad)
        </h2>
        <p className="mb-6 text-slate-700">
          Ensure these are ready for smooth processing, especially for
          US/UK/Canada visas.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" /> Student Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span> Marksheets (10th,
                  12th, Degree)
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span> GRE/GMAT/IELTS
                  scores
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span> Admission Letter /
                  I-20 Form (US)
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span> KYC: Passport,
                  Aadhaar, PAN
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <Landmark className="h-5 w-5" /> Co-Applicant Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span> Income: Salary
                  Slips (3 months), ITR (2 years)
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span> Bank: Statement
                  (last 6 months)
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-500">•</span> Collateral: Title
                  Deed, Valuation Report
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 7: ROI & RISKS --- */}
      <section className="mb-12">
        <h2
          id="roi"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Returns & Risks Analysis
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg flex items-center gap-2">
                <Plane className="h-5 w-5" /> ROI Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>
                <strong>Total Loan:</strong> ₹50 Lakhs
              </p>
              <p>
                <strong>Salary Post-MS:</strong> $90,000 (~₹75 Lakhs)
              </p>
              <p>
                <strong>Payback Period:</strong> 2-3 Years (if aggressive).
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Risks to Consider
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>
                <strong>Job Market:</strong> Recessions can delay employment.
              </p>
              <p>
                <strong>Exchange Rate:</strong> If INR weakens, loan gets
                costlier to repay from India.
              </p>
              <p>
                <strong>Collateral:</strong> Default risks family property.
              </p>
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
              Can I get an education loan without collateral?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes. <strong>Unsecured loans</strong> are available up to ₹40-75
              Lakhs for premier institutes, but they come with higher interest
              rates (11-14%).
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* --- CONCLUSION CARD --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            An education loan is a powerful tool to unlock global career
            opportunities.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Choose
              Secured (Save 2-3%)
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Maximize 80E
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Pay Interest
              Early
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
      </div>

      <p className="mb-8 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
        Disclaimer: Interest rates, tax laws (Section 80E), and bank policies
        change frequently. This guide is for educational purposes. Please
        consult a qualified financial advisor before taking a loan.
      </p>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-indigo-600 to-violet-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Planning your studies?
          </h2>
          <p className="mb-8 max-w-lg text-indigo-100 text-lg">
            Use our free tools to plan your loan repayment and investments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/loans/education-loan/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-indigo-700 transition hover:bg-indigo-50 shadow-lg"
            >
              Calculate EMI
            </Link>
            <Link
              href="/sip-calculator/"
              className="rounded-lg border border-indigo-400 bg-indigo-800/30 px-8 py-4 font-bold text-white transition hover:bg-indigo-800/50"
            >
              Plan Investments
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-edu-4" type="leaderboard" />
      </div>
    </article>
  );
}
