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
  Calculator,
  CheckCircle2,
  Clock,
  TrendingUp,
  Percent,
  Home,
  Car,
  Wallet,
  AlertTriangle,
  Lightbulb,
  FileText,
  ShieldCheck,
  Ban,
  ChevronRight,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'EMI Calculator Guide 2025: Formula, Tax Benefits & Prepayment Tricks',
  description:
    'Complete EMI Calculator Guide 2025: Learn EMI formula, calculation for home/car/personal loans, prepayment strategies & RBI guidelines. Calculate & save ₹lakhs!',
  keywords: [
    'EMI calculator',
    'EMI formula',
    'home loan EMI',
    'car loan EMI',
    'personal loan EMI',
    'RBI EMI rules 2025',
    'prepayment calculator',
    'reduce EMI interest',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides/emi-calculator-guide',
  },
  openGraph: {
    title: 'EMI Calculator Guide 2025 | Save Lakhs on Interest',
    description:
      'Master your loan EMI. Learn the formula, tax benefits, and RBI 2025 rules to save money.',
    url: 'https://www.fincado.com/guides/emi-calculator-guide',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the EMI formula for calculating monthly payments?',
    answer:
      'EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P = Principal, R = Monthly interest rate, N = Tenure in months.',
  },
  {
    question: 'Can I reduce my EMI by prepaying part of my loan?',
    answer:
      'Yes. Prepaying ₹1 lakh annually on a ₹40 lakh loan can save over ₹16 lakh in interest and reduce tenure by around 9 years.',
  },
  {
    question: 'Are there any prepayment charges on home loans?',
    answer:
      'Floating-rate home loans sanctioned to individuals generally do not carry prepayment charges under current RBI directions.',
  },
  {
    question: 'What happens if I miss an EMI payment?',
    answer:
      'Missed EMIs can attract penal charges, late fees, and a sharp drop in credit score, and prolonged default can lead to the account being classified as NPA.',
  },
  {
    question: 'How does EMI affect my credit score?',
    answer:
      'Consistent on-time EMI payments help gradually increase your score, while late or missed EMIs cause significant negative impact.',
  },
  {
    question: 'What is the ideal EMI-to-income ratio?',
    answer:
      'Keeping total EMIs below about 40% of your monthly income is considered safer for long-term financial stability.',
  },
  {
    question: 'Can I change my EMI amount after loan approval?',
    answer:
      'Yes, many lenders allow changes via tenure adjustments, rate changes, or prepayments under their restructuring policies.',
  },
  {
    question:
      'What is the difference between floating and fixed interest rates?',
    answer:
      'Floating rates move with benchmark rates like RBI repo, while fixed rates remain constant for a set period but usually start higher.',
  },
  {
    question: 'Do EMIs qualify for tax deductions?',
    answer:
      'For home loans, principal repaid can qualify under Section 80C and interest under Section 24(b), subject to prevailing limits, while personal and car loans generally do not get such benefits.',
  },
  {
    question: "What is the RBI's new EMI rule for 2025?",
    answer:
      'New RBI guidelines on penal charges and prepayment have made EMI structures more transparent and borrower-friendly, including replacing penal interest with clearly defined penal charges.',
  },
];

export default function EmiGuidePage() {
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
              'EMI Calculator – Complete Guide: Master Your Loan EMI in 2025',
            description:
              'Complete EMI Calculator Guide 2025 covering EMI formula, loan types, prepayment strategies, RBI rules, and credit score impact.',
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
            name: 'EMI Calculator Guide',
            url: 'https://www.fincado.com/guides/emi-calculator-guide',
          },
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-purple-100 text-purple-800 hover:bg-purple-200 px-3 py-1"
        >
          Flagship Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          EMI Calculator Guide 2025-26: Formulas & Tax Benefits
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 12 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified
          </span>
        </div>

        <div className="mt-6">
          <ShareTools title="EMI Calculator Guide 2025" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              <strong>EMI (Equated Monthly Installment)</strong> is the fixed monthly payment you make to repay a loan, combining both principal and interest components. The Reserve Bank of India (RBI) regulates lending practices to ensure transparent EMI structures across banks and NBFCs.
            </p>
          `}
          />

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" /> Key Components
              </h3>
              <ul className="space-y-1 text-sm text-slate-600 list-disc pl-4">
                <li>
                  <strong>Principal:</strong> Original loan amount.
                </li>
                <li>
                  <strong>Interest Rate:</strong> Annual percentage charged.
                </li>
                <li>
                  <strong>Tenure:</strong> Repayment period.
                </li>
                <li>
                  <strong>Fees:</strong> Processing charges (0.5% - 2%).
                </li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 flex flex-col justify-center">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 block mb-1">
                    RBI Update 2025
                  </strong>
                  <span className="text-emerald-800 text-sm">
                    New guidelines on penal charges and prepayment have reduced
                    punitive costs and increased transparency for borrowers.
                  </span>
                </div>
              </div>
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
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 text-sm text-slate-700">
            <li>
              <a
                href="#formula"
                className="hover:text-purple-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 1. EMI Formula Explained
              </a>
            </li>
            <li>
              <a
                href="#loan-types"
                className="hover:text-purple-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 2. Calculations by Loan
                Type
              </a>
            </li>
            <li>
              <a
                href="#tenure-impact"
                className="hover:text-purple-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 3. EMI vs Tenure Impact
              </a>
            </li>
            <li>
              <a
                href="#interest-rate"
                className="hover:text-purple-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 4. Interest Rate
                Sensitivity
              </a>
            </li>
            <li>
              <a
                href="#prepayment"
                className="hover:text-purple-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 5. Prepayment Strategies
              </a>
            </li>
            <li>
              <a
                href="#myths"
                className="hover:text-purple-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 6. Common EMI Myths
              </a>
            </li>
            <li>
              <a
                href="#credit-score"
                className="hover:text-purple-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 7. Credit Score Impact
              </a>
            </li>
            <li>
              <a
                href="#rejection"
                className="hover:text-purple-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 8. Loan Rejection Reasons
              </a>
            </li>
            <li>
              <a
                href="#tips"
                className="hover:text-purple-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 9. Expert Planning Tips
              </a>
            </li>
            <li>
              <a
                href="#faqs"
                className="hover:text-purple-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 10. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-emi-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: FORMULA --- */}
      <section className="mb-12">
        <h2
          id="formula"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-purple-600" /> EMI Formula
          Explained
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6">
            <WikiText
              content={`
              <p class="mb-4 text-slate-700">The standard EMI calculation formula used by Indian lenders is:</p>
              <div class="bg-slate-100 p-4 rounded text-center font-mono text-slate-800 text-lg mb-4 border border-slate-300">
                EMI = [P × R × (1 + R)<sup>N</sup>] / [(1 + R)<sup>N</sup> − 1]
              </div>
            `}
            />
            <div className="bg-slate-50 p-4 rounded-lg">
              <strong className="block text-sm text-slate-900 mb-2">
                Where:
              </strong>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                <li>
                  <strong>P</strong> = Principal loan amount (₹)
                </li>
                <li>
                  <strong>R</strong> = Monthly interest rate = Annual rate ÷ (12
                  × 100)
                </li>
                <li>
                  <strong>N</strong> = Loan tenure in months
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm mt-6">
          <Image
            src="/images/guides/emi/emi-formula-breakdown.webp"
            alt="EMI formula breakdown showing principal, interest rate and tenure"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2 border-b border-purple-100">
            <CardTitle className="text-purple-900 text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5" /> Practical Example
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <div className="mb-4 space-y-1">
              <p>
                <strong>Loan Details:</strong> ₹40,00,000 @ 8.5% for 20 years
                (240 months)
              </p>
              <p>Monthly rate R = 8.5 ÷ (12 × 100) ≈ 0.00708</p>
              <p>
                Using the formula, the monthly EMI comes to approximately{' '}
                <strong>₹34,699</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between items-center bg-white p-4 rounded border border-purple-100 shadow-sm gap-4">
              <div className="text-center sm:text-left">
                <span className="block text-slate-500 text-xs uppercase tracking-wide font-bold">
                  Monthly EMI
                </span>
                <span className="text-3xl font-bold text-slate-900">
                  ₹34,699
                </span>
              </div>
              <div className="h-px w-full sm:h-12 sm:w-px bg-purple-100"></div>
              <div className="text-center sm:text-right">
                <span className="block text-slate-500 text-xs uppercase tracking-wide font-bold">
                  Total Interest Payable
                </span>
                <span className="text-2xl font-bold text-red-600">
                  ₹43.27 Lakhs
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-emi-2" type="leaderboard" />
      </div>

      {/* --- SECTION 2: LOAN TYPES --- */}
      <section className="mb-12">
        <h2
          id="loan-types"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Calculations by Loan Type
        </h2>

        <div className="space-y-8">
          {/* Home Loan */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-600" /> 1. Home Loan EMI
            </h3>
            <WikiText
              content={`<p class="text-sm text-slate-600 mb-3">Home loans typically have the longest tenure (15–30 years) and relatively lower interest rates (around 8.5%–9.5% in 2025).</p>`}
            />
            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Loan Amount</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Total Interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹50 lakh</TableCell>
                    <TableCell>8.5%</TableCell>
                    <TableCell>20 yrs</TableCell>
                    <TableCell>₹43,391</TableCell>
                    <TableCell>₹54.14 lakh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹50 lakh</TableCell>
                    <TableCell>9.0%</TableCell>
                    <TableCell>20 yrs</TableCell>
                    <TableCell>₹44,986</TableCell>
                    <TableCell>₹57.97 lakh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹50 lakh</TableCell>
                    <TableCell>8.5%</TableCell>
                    <TableCell>30 yrs</TableCell>
                    <TableCell>₹38,448</TableCell>
                    <TableCell className="text-red-600 font-medium">
                      ₹88.41 lakh
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="mt-2 text-xs text-slate-500 italic">
              <strong>Key Insight:</strong> A 0.5% rate increase adds about
              ₹3.83 lakh to your total interest over 20 years.
            </p>
          </div>

          {/* Personal Loan */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-emerald-600" /> 2. Personal Loan
              EMI
            </h3>
            <WikiText
              content={`<p class="text-sm text-slate-600 mb-3">Personal loans carry higher rates (roughly 10.5%–24%) with shorter tenures of 1–5 years.</p>`}
            />
            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Loan Amount</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Total Interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹5 lakh</TableCell>
                    <TableCell>12%</TableCell>
                    <TableCell>3 yrs</TableCell>
                    <TableCell>₹16,607</TableCell>
                    <TableCell>₹97,852</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹5 lakh</TableCell>
                    <TableCell>18%</TableCell>
                    <TableCell>3 yrs</TableCell>
                    <TableCell>₹18,076</TableCell>
                    <TableCell className="text-red-600 font-medium">
                      ₹1,50,736
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Car Loan */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Car className="h-5 w-5 text-amber-600" /> 3. Car Loan EMI
            </h3>
            <WikiText
              content={`<p class="text-sm text-slate-600 mb-3">Auto loans usually range around 8.5%–12% with tenures of 3–7 years.</p>`}
            />
            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Loan Amount</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Total Interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹8 lakh</TableCell>
                    <TableCell>9.5%</TableCell>
                    <TableCell>5 yrs</TableCell>
                    <TableCell>₹16,744</TableCell>
                    <TableCell>₹2,04,640</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹8 lakh</TableCell>
                    <TableCell>9.5%</TableCell>
                    <TableCell>7 yrs</TableCell>
                    <TableCell>₹12,756</TableCell>
                    <TableCell className="text-red-600 font-medium">
                      ₹2,71,504
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="mt-2 text-xs text-slate-500 italic">
              <strong>Pro Tip:</strong> Shorter tenure saves about ₹66,864 in
              interest, but increases monthly EMI by roughly ₹3,988.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TENURE IMPACT --- */}
      <section className="mb-12">
        <h2
          id="tenure-impact"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Clock className="h-6 w-6 text-indigo-600" /> EMI vs Tenure Impact
        </h2>
        <WikiText
          content={`<p class="mb-6 text-slate-700">For a ₹50 lakh home loan at 8.5%, the choice of tenure dramatically changes your interest outgo.</p>`}
        />

        {/* IMAGE: Tenure vs Interest */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/emi/emi-tenure-vs-interest.webp"
            alt="Graph showing how longer loan tenure increases total interest cost"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Tenure
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Monthly EMI
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Total Interest
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Interest vs Principal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>10 years</TableCell>
                <TableCell>₹62,137</TableCell>
                <TableCell>₹24.56 lakh</TableCell>
                <TableCell className="text-emerald-600">49%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15 years</TableCell>
                <TableCell>₹49,147</TableCell>
                <TableCell>₹38.46 lakh</TableCell>
                <TableCell className="text-emerald-600">77%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20 years</TableCell>
                <TableCell>₹43,391</TableCell>
                <TableCell>₹54.14 lakh</TableCell>
                <TableCell className="text-amber-600">108%</TableCell>
              </TableRow>
              <TableRow className="bg-red-50/50">
                <TableCell className="font-medium">30 years</TableCell>
                <TableCell>₹38,448</TableCell>
                <TableCell className="font-bold text-red-700">
                  ₹88.41 lakh
                </TableCell>
                <TableCell className="text-red-600 font-bold">177%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg bg-indigo-50 p-5 text-sm text-indigo-900 border border-indigo-100">
          <WikiText
            content={`
            <p class="mb-2"><strong>Doubling tenure from 15 to 30 years:</strong></p>
            <ul class="list-disc pl-5 mb-4 space-y-1">
              <li>Reduces EMI by only about <strong>22%</strong></li>
              <li>But increases total interest by roughly <strong>130%</strong> (around ₹49.95 lakh extra)</li>
            </ul>
            <p><strong>Decision Framework:</strong> Choose longer tenure if cash flow is tight and you plan to prepay later. Choose shorter tenure if your income is stable and you want to minimise interest paid.</p>
          `}
          />
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-emi-4" type="leaderboard" />
      </div>

      {/* --- SECTION 4: RATE SENSITIVITY --- */}
      <section className="mb-12">
        <h2
          id="interest-rate"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-teal-600" /> Interest Rate
          Sensitivity
        </h2>
        <WikiText
          content={`<p class="mb-6 text-slate-700">Small changes in interest rates have a large impact over long tenures, especially on home loans.</p>`}
        />

        <Card className="border-slate-200 mb-6">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Monthly EMI</TableHead>
                  <TableHead>Total Interest</TableHead>
                  <TableHead>Difference (from 8.5%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>7.5%</TableCell>
                  <TableCell>₹40,280</TableCell>
                  <TableCell>₹46.67 lakh</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Save ₹7.47 lakh
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>8.0%</TableCell>
                  <TableCell>₹41,822</TableCell>
                  <TableCell>₹50.37 lakh</TableCell>
                  <TableCell className="text-emerald-600 font-medium">
                    Save ₹3.77 lakh
                  </TableCell>
                </TableRow>
                <TableRow className="bg-slate-50/50">
                  <TableCell className="font-medium">8.5% (Base)</TableCell>
                  <TableCell>₹43,391</TableCell>
                  <TableCell>₹54.14 lakh</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>9.0%</TableCell>
                  <TableCell>₹44,986</TableCell>
                  <TableCell>₹57.97 lakh</TableCell>
                  <TableCell className="text-red-500 font-medium">
                    Pay ₹3.83 lakh more
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>9.5%</TableCell>
                  <TableCell>₹46,605</TableCell>
                  <TableCell>₹61.85 lakh</TableCell>
                  <TableCell className="text-red-500 font-medium">
                    Pay ₹7.71 lakh more
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10.0%</TableCell>
                  <TableCell>₹48,251</TableCell>
                  <TableCell>₹65.80 lakh</TableCell>
                  <TableCell className="text-red-600 font-bold">
                    Pay ₹11.66 lakh more
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="bg-white p-5 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">
            Rate Negotiation Tips
          </h3>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Compare at least 4–5 lenders; rates can differ by 0.5%–1%.</li>
            <li>Use a strong credit score (typically 750+) as leverage.</li>
            <li>
              Track RBI repo trends to time fixed-rate and balance transfer
              decisions.
            </li>
          </ul>
        </div>
      </section>

      {/* --- SECTION 5: PREPAYMENT --- */}
      <section className="mb-12">
        <h2
          id="prepayment"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-emerald-600" /> How Prepayment
          Reduces EMI & Interest
        </h2>
        <p className="mb-6 text-slate-700">
          <strong>Example Scenario:</strong> ₹40 Lakh, 20-Year Home Loan @ 8.5%
        </p>

        {/* IMAGE: Prepayment */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/emi/emi-prepayment-savings.webp"
            alt="Chart showing interest savings from regular EMI prepayment"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-800">
                Strategy 1: Prepay ₹1 Lakh/Year
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>
                By paying just one extra lakh per year (or ~₹8,300/month extra):
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Interest Saved:</strong> ₹16,32,142
                </li>
                <li>
                  <strong>Tenure Reduced:</strong> From 20 to about 11 years
                </li>
                <li>
                  <span className="bg-emerald-100 text-emerald-800 px-1 rounded font-medium">
                    Savings: ~40% of interest
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">
                Strategy 2: Step-Up EMI (10%/Year)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>Increase your EMI by 10% every year as your income grows:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Year 1–2: ₹34,699</li>
                <li>Year 3–4: ₹38,169</li>
                <li>
                  <strong>Result:</strong> Clear loan in around 12–13 years
                </li>
                <li>
                  <span className="bg-blue-100 text-blue-800 px-1 rounded font-medium">
                    Save ₹18+ lakh in interest
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="guide-emi-6" type="leaderboard" />
      </div>

      {/* --- SECTION 6: MYTHS --- */}
      <section className="mb-12">
        <h2
          id="myths"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" /> EMI Myths Busted
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-bold">
                Myth 1: EMI stays constant forever
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> With floating rates, your EMI or tenure
              can change periodically based on RBI repo rate adjustments.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-bold">
                Myth 2: Prepaying reduces EMI automatically
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> You must choose whether to reduce EMI or
              tenure. Banks usually default to tenure reduction (which saves
              more interest).
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-bold">
                Myth 3: Processing Fees are fixed
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> During festive seasons or special
              campaigns, banks may waive 50%–100% of fees. Always negotiate.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-bold">
                Myth 4: EMI goes 100% to Principal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> In the early years, roughly 70–80% of
              each EMI goes toward interest. Principal repayment accelerates
              later.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-bold">
                Myth 5: Max Tenure is always best
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Only if you invest the EMI difference at
              higher returns (12%+). Otherwise, it increases total interest
              drastically.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-bold">
                Myth 6: EMI stops if I lose my job
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> EMIs remain payable. Missing payments
              damages your score. Seek moratorium/restructuring immediately.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 7: CREDIT SCORE --- */}
      <section className="mb-12">
        <h2
          id="credit-score"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-blue-600" /> EMI Impact on Credit
          Score
        </h2>

        {/* IMAGE: Credit Score */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/emi/emi-cibil-score-ranges.webp"
            alt="CIBIL score ranges from poor to excellent with color indicators"
            width={800}
            height={333}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Action</TableHead>
                <TableHead>Impact on Score</TableHead>
                <TableHead>Timeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>On-time EMI payments</TableCell>
                <TableCell className="text-emerald-600 font-medium">
                  +10–30 points/year
                </TableCell>
                <TableCell>12+ months</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1–30 days late</TableCell>
                <TableCell className="text-amber-600">
                  −50 to −100 points
                </TableCell>
                <TableCell>Immediate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>31–60 days late</TableCell>
                <TableCell className="text-orange-600">
                  −100 to −150 points
                </TableCell>
                <TableCell>Immediate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>60+ days late</TableCell>
                <TableCell className="text-red-600 font-bold">
                  −150+ points
                </TableCell>
                <TableCell>Immediate + stays up to 7 years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Loan settlement</TableCell>
                <TableCell className="text-red-600 font-bold">
                  Similar to default
                </TableCell>
                <TableCell>Stays up to 7 years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Full prepayment</TableCell>
                <TableCell className="text-emerald-600">
                  Neutral to positive
                </TableCell>
                <TableCell>Immediate</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p className="text-slate-700 mb-4">
          Maintaining a strong{' '}
          <Link href="/credit-score" className="text-blue-600 hover:underline">
            CIBIL score
          </Link>{' '}
          is crucial for securing lower EMI rates and faster approvals.
        </p>

        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="pt-6">
            <h3 className="font-bold text-blue-900 mb-2">
              EMI-to-Income Ratio
            </h3>
            <WikiText
              content={`
              <p class="text-sm text-blue-800 mb-2">Formula: <strong>(Total EMIs ÷ Monthly Income) × 100</strong></p>
              <ul class="list-disc pl-5 text-sm text-blue-800">
                <li><strong>Ideal zone:</strong> Below ~40%</li>
                <li><strong>Risky zone:</strong> Above ~50%</li>
              </ul>
            `}
            />
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 8 */}
      <div className="no-print my-8">
        <AdSlot id="guide-emi-8" type="leaderboard" />
      </div>

      {/* --- SECTION 8: REJECTION REASONS --- */}
      <section className="mb-12">
        <h2
          id="rejection"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Ban className="h-6 w-6 text-red-600" /> When EMI is Rejected
        </h2>

        <p className="text-slate-600 mb-6">
          If your loan application was denied, it is likely due to one of these
          common red flags.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <Card className="border-red-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-700">
                1. Low CIBIL Score (&lt;650)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-3">Lenders see low scores as high risk.</p>
              <div className="bg-red-50 text-red-800 px-2 py-1 rounded inline-block text-xs font-medium border border-red-100">
                Fix: Pay dues, rebuild credit (6-12 mo).
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="border-red-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-700">
                2. High Debt Ratio
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-3">Existing EMIs consume &gt;50% income.</p>
              <div className="bg-red-50 text-red-800 px-2 py-1 rounded inline-block text-xs font-medium border border-red-100">
                Fix: Close smaller loans/add co-applicant.
              </div>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="border-red-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-700">
                3. Income Proof Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-3">Missing ITRs, slips, or erratic banking.</p>
              <div className="bg-red-50 text-red-800 px-2 py-1 rounded inline-block text-xs font-medium border border-red-100">
                Fix: Include other income sources.
              </div>
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card className="border-red-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-700">
                4. Job Instability
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-3">
                &lt;1 year in current job or frequent hops.
              </p>
              <div className="bg-red-50 text-red-800 px-2 py-1 rounded inline-block text-xs font-medium border border-red-100">
                Fix: Wait to complete 12 months.
              </div>
            </CardContent>
          </Card>

          {/* Card 5 */}
          <Card className="border-red-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-700">
                5. Property Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-3">Unapproved layouts or unclear titles.</p>
              <div className="bg-red-50 text-red-800 px-2 py-1 rounded inline-block text-xs font-medium border border-red-100">
                Fix: Verify legal docs upfront.
              </div>
            </CardContent>
          </Card>

          {/* Card 6 */}
          <Card className="border-red-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-700">
                6. Documentation Errors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-3">Missing KYC, signatures, or old proofs.</p>
              <div className="bg-red-50 text-red-800 px-2 py-1 rounded inline-block text-xs font-medium border border-red-100">
                Fix: Submit complete verified set.
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-slate-50 border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-slate-900">
              Alternative Options If Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2 items-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Reduce
                loan amount by 20–30%
              </li>
              <li className="flex gap-2 items-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Add a
                co-applicant (Spouse/Parent)
              </li>
              <li className="flex gap-2 items-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Apply
                after 12 on-time EMI payments
              </li>
              <li className="flex gap-2 items-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Try NBFCs
                (Lenient criteria but higher rates)
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* --- TIPS --- */}
      <section className="mb-12">
        <h2
          id="tips"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lightbulb className="h-6 w-6 text-yellow-500" /> Expert Planning Tips
          2025
        </h2>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <ul className="space-y-4 text-slate-800">
              <li className="flex gap-3">
                <div className="bg-yellow-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-yellow-800 shrink-0">
                  1
                </div>
                <div>
                  <strong>The 40-30-20 Rule:</strong> Keep home loan EMI within
                  40% of monthly income. Aim for all EMIs combined to stay near
                  30–40%. Reserve at least 20% for savings/investments.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-yellow-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-yellow-800 shrink-0">
                  2
                </div>
                <div>
                  <strong>Timing Matters:</strong> Look out for New Year and
                  festive-season rate offers and fee waivers. Consider
                  quarter-ends when lenders push to meet disbursement targets.
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          FAQs
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
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Conclusion:
            Master Your EMI
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Understanding how EMIs are calculated gives you control over your
            loans. Negotiate rates, prepay early, and protect your credit score.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Verify
              Calculations
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Negotiate
              Rates
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Prepay
              Aggressively
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- AUTHOR & DISCLAIMER --- */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> This content is for educational purposes
          only and does not constitute financial advice. Loan terms, interest
          rates, and RBI regulations may vary by lender and over time. Always
          consult your bank or financial advisor before making loan decisions.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-purple-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Ready to calculate your EMI?
          </h2>
          <p className="mb-8 max-w-lg text-purple-100 text-lg">
            Plan your loan smartly and save thousands in interest with Fincado.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/emi-calculator"
              className="rounded-lg bg-white px-8 py-4 font-bold text-purple-700 transition hover:bg-purple-50 shadow-lg"
            >
              Calculate EMI
            </Link>
            <Link
              href="/sip-calculator"
              className="rounded-lg border border-purple-400 bg-purple-800/30 px-8 py-4 font-bold text-white transition hover:bg-purple-800/50"
            >
              Start Investing
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 11 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-emi-11" type="leaderboard" />
      </div>
    </article>
  );
}
