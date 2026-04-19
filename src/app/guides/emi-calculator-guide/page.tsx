import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
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
  Landmark,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'EMI Calculator Guide 2026: Formula, Home Loan EMI, Prepayment & Tax Benefits | Fincado',
  description:
    'Complete EMI Calculator Guide 2026: EMI formula, home loan/car loan/personal loan examples, tenure impact, prepayment savings, tax benefits, affordability rules, and practical mistakes to avoid.',
  keywords: [
    'EMI calculator guide 2026',
    'EMI formula',
    'home loan EMI calculator',
    'car loan EMI calculator',
    'personal loan EMI calculator',
    'EMI prepayment savings',
    'EMI tax benefits',
    'loan affordability India',
    'home loan tenure impact',
    'EMI vs tenure'
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/emi-calculator-guide/',
  },
  openGraph: {
    title: 'EMI Calculator Guide 2026: Formula, Prepayment & Tax Benefits',
    description:
      'Learn how EMI is calculated, compare home/car/personal loan examples, reduce interest with prepayment, and plan your loan smarter in 2026.',
    type: 'article',
    url: 'https://fincado.com/guides/emi-calculator-guide/',
    images: [
      {
        url: 'https://fincado.com/images/guides/emi/emi-guide-hero-2026.webp',
        width: 1200,
        height: 630,
        alt: 'EMI Calculator Guide 2026 by Fincado',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMI Calculator Guide 2026: Formula, Prepayment & Tax Benefits',
    description:
      'Understand EMI formula, compare loan examples, and learn how to reduce interest cost.',
    images: ['https://fincado.com/images/guides/emi/emi-guide-hero-2026.webp'],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the EMI formula?',
    answer:
      'EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P is the loan amount, R is the monthly interest rate, and N is the loan tenure in months.',
  },
  {
    question: 'Does a longer tenure reduce EMI?',
    answer:
      'Yes. A longer tenure reduces the monthly EMI, but it usually increases total interest paid significantly over the life of the loan.',
  },
  {
    question: 'Is prepayment useful for reducing home loan interest?',
    answer:
      'Yes. Even small periodic prepayments can reduce your outstanding principal faster, shorten loan tenure, and cut total interest meaningfully.',
  },
  {
    question: 'What is a safe EMI-to-income ratio?',
    answer:
      'A commonly used rule is to keep total EMIs below about 40% of your monthly take-home income, though the ideal number depends on your fixed expenses and emergency fund.',
  },
  {
    question: 'Do home loan EMIs have tax benefits?',
    answer:
      'Home loan EMIs may offer tax benefits on principal repayment under Section 80C and on eligible interest payments under Section 24(b), subject to applicable conditions and limits.',
  },
  {
    question: 'Which is better: lower EMI or shorter tenure?',
    answer:
      'If affordability is comfortable, a shorter tenure is generally better because it reduces total interest outgo. If cash flow is tight, a longer tenure with planned prepayment can be more practical.',
  },
  {
    question:
      'Can I use the same EMI formula for home, car, and personal loans?',
    answer:
      'Yes. The standard reducing-balance EMI formula is broadly the same, but interest rates, tenure ranges, fees, and tax treatment differ by loan type.',
  },
  {
    question: 'Why does most of the early EMI go toward interest?',
    answer:
      'Because interest is calculated on the outstanding principal. In the first years, the outstanding balance is highest, so the interest portion is larger.',
  }
];

const TOC_ITEMS = [
  { href: '#what-is-emi', label: 'What is EMI?' },
  { href: '#formula', label: 'EMI Formula' },
  { href: '#loan-types', label: 'EMI by Loan Type' },
  { href: '#tenure-impact', label: 'EMI vs Tenure' },
  { href: '#interest-rate', label: 'Rate Sensitivity' },
  { href: '#prepayment', label: 'Prepayment Strategies' },
  { href: '#tax-benefits', label: 'Tax Benefits' },
  { href: '#affordability', label: 'How Much EMI Is Safe?' },
  { href: '#mistakes', label: 'Common Mistakes' },
  { href: '#faqs', label: 'FAQs' }
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'EMI Calculator Guide 2026: Formula, Home Loan EMI, Prepayment & Tax Benefits',
  description:
    'Comprehensive EMI guide for 2026 covering formula, examples, loan tenure impact, prepayment savings, tax benefits, and affordability planning.',
  inLanguage: 'en-IN',
  author: {
    '@type': 'Organization',
    name: 'Fincado Research Team',
    url: 'https://fincado.com/about/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fincado',
    logo: {
      '@type': 'ImageObject',
      url: 'https://fincado.com/logo.png',
    },
  },
  datePublished: '2026-04-09',
  dateModified: '2026-04-09',
  image: 'https://fincado.com/images/guides/emi/emi-guide-hero-2026.webp',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://fincado.com/guides/emi-calculator-guide/',
  },
};

const faqSchema = {
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
};

export default function EmiGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'EMI Calculator Guide',
            url: 'https://fincado.com/guides/emi-calculator-guide/',
          }
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="mb-8 border-b border-slate-200 pb-6">
        <Badge
          variant="secondary"
          className="mb-3 bg-violet-100 px-3 py-1 text-violet-800"
        >
          Loans • Flagship Guide • 2026
        </Badge>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          EMI Calculator Guide 2026: Formula, Prepayment, Tenure & Tax Benefits
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 14 min read
          </span>
          <span>
            Updated: <strong className="text-slate-700">April 09, 2026</strong>
          </span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Reviewed by Fincado Research
            Team
          </span>
        </div>
      </header>

      <Card className="mb-10 overflow-hidden border-slate-200">
        <div className="relative h-72 w-full bg-slate-50 sm:h-80">
          <Image
            src="/images/guides/emi/emi-guide-hero-2026.webp"
            alt="EMI calculator guide showing loan planning, tenure and interest concepts"
            fill
            priority
            className="object-cover"
          />
        </div>
        <CardContent className="pt-6 text-lg leading-relaxed text-slate-700">
          <WikiText
            content={`<p><strong>EMI (Equated Monthly Installment)</strong> is the fixed monthly amount you pay to repay a loan over a chosen tenure. Whether you are using a <a href="/emi-calculator/">home loan EMI calculator</a>, checking a car loan offer, or comparing personal loan costs, understanding how EMI works helps you avoid over-borrowing, reduce interest cost, and choose a better repayment strategy.</p>`}
          />
        </CardContent>
      </Card>

      <Card className="mb-10 border-slate-200 bg-slate-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-slate-500" /> Contents
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="grid gap-x-8 gap-y-2 text-sm text-slate-700 sm:grid-cols-2">
            {TOC_ITEMS.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-start gap-2 py-0.5 transition-colors hover:text-violet-700"
                >
                  <span className="w-5 shrink-0 text-slate-400 tabular-nums">
                    {i + 1}.
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <section className="mb-12" id="what-is-emi">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <Calculator className="h-6 w-6 text-violet-600" /> What is EMI?
        </h2>

        <Card>
          <CardContent className="pt-6">
            <p className="mb-4 text-slate-700">
              EMI combines two parts: principal repayment and interest. In the
              early years of a reducing-balance loan, a larger share of the EMI
              goes toward interest, and later the principal component starts
              increasing faster.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Wallet className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <strong>Principal</strong>
                  <p className="text-sm text-slate-600">
                    The amount borrowed from the lender.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Percent className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <strong>Interest rate</strong>
                  <p className="text-sm text-slate-600">
                    The annual percentage cost charged on the outstanding
                    balance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <strong>Tenure</strong>
                  <p className="text-sm text-slate-600">
                    The total repayment period, usually expressed in months or
                    years.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Landmark className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
                <div>
                  <strong>Fees and terms</strong>
                  <p className="text-sm text-slate-600">
                    Processing fees, reset clauses, insurance, and prepayment
                    terms also affect total borrowing cost.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="formula">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <Calculator className="h-6 w-6 text-violet-600" /> EMI Formula
        </h2>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4 text-slate-700">
              The standard reducing-balance EMI formula used by lenders is:
            </p>

            <div className="mb-4 rounded-lg border border-slate-300 bg-slate-100 p-4 text-center font-mono text-lg text-slate-800">
              EMI = [P × R × (1 + R)<sup>N</sup>] / [(1 + R)<sup>N</sup> − 1]
            </div>

            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                <strong>P</strong> = loan amount
              </li>
              <li>
                <strong>R</strong> = monthly interest rate = annual rate ÷ 12 ÷
                100
              </li>
              <li>
                <strong>N</strong> = tenure in months
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-violet-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-violet-900">
              <Lightbulb className="h-5 w-5" /> Example
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <p className="mb-2">
              For a ₹40 lakh home loan at 8.5% for 20 years, the EMI is about{' '}
              <strong>₹34,699</strong>.
            </p>
            <p>
              That feels manageable monthly, but total interest still becomes
              very large over a long tenure, which is why tenure and prepayment
              planning matter.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="loan-types">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          EMI by Loan Type
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Home className="h-5 w-5 text-blue-600" /> Home loan EMI
            </h3>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Loan amount</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Total interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹50 lakh</TableCell>
                    <TableCell>8.5%</TableCell>
                    <TableCell>20 years</TableCell>
                    <TableCell>₹43,391</TableCell>
                    <TableCell>₹54.14 lakh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹50 lakh</TableCell>
                    <TableCell>9.0%</TableCell>
                    <TableCell>20 years</TableCell>
                    <TableCell>₹44,986</TableCell>
                    <TableCell>₹57.97 lakh</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Car className="h-5 w-5 text-amber-600" /> Car loan EMI
            </h3>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Loan amount</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Total interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹8 lakh</TableCell>
                    <TableCell>9.5%</TableCell>
                    <TableCell>5 years</TableCell>
                    <TableCell>₹16,744</TableCell>
                    <TableCell>₹2.05 lakh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹8 lakh</TableCell>
                    <TableCell>9.5%</TableCell>
                    <TableCell>7 years</TableCell>
                    <TableCell>₹12,756</TableCell>
                    <TableCell>₹2.72 lakh</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Wallet className="h-5 w-5 text-emerald-600" /> Personal loan EMI
            </h3>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Loan amount</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Total interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹5 lakh</TableCell>
                    <TableCell>12%</TableCell>
                    <TableCell>3 years</TableCell>
                    <TableCell>₹16,607</TableCell>
                    <TableCell>₹97,852</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹5 lakh</TableCell>
                    <TableCell>18%</TableCell>
                    <TableCell>3 years</TableCell>
                    <TableCell>₹18,076</TableCell>
                    <TableCell>₹1.51 lakh</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12" id="tenure-impact">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <Clock className="h-6 w-6 text-indigo-600" /> EMI vs Tenure
        </h2>

        <p className="mb-6 text-slate-700">
          A longer tenure lowers EMI, but the trade-off is much higher total
          interest.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Tenure</TableHead>
                <TableHead>Monthly EMI</TableHead>
                <TableHead>Total interest</TableHead>
                <TableHead>Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>10 years</TableCell>
                <TableCell>₹62,137</TableCell>
                <TableCell>₹24.56 lakh</TableCell>
                <TableCell>Fast repayment, lower total cost</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15 years</TableCell>
                <TableCell>₹49,147</TableCell>
                <TableCell>₹38.46 lakh</TableCell>
                <TableCell>Balanced option for many borrowers</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20 years</TableCell>
                <TableCell>₹43,391</TableCell>
                <TableCell>₹54.14 lakh</TableCell>
                <TableCell>Common but costlier</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>30 years</TableCell>
                <TableCell>₹38,448</TableCell>
                <TableCell>₹88.41 lakh</TableCell>
                <TableCell>Lowest EMI, highest total interest</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mb-12" id="interest-rate">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <Percent className="h-6 w-6 text-teal-600" /> Rate Sensitivity
        </h2>

        <Card>
          <CardContent className="pt-6">
            <p className="mb-4 text-slate-700">
              Even a 0.5% or 1% difference in interest rate can change your
              long-term cost materially, especially on home loans.
            </p>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Rate</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Total interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>8.0%</TableCell>
                    <TableCell>₹41,822</TableCell>
                    <TableCell>₹50.37 lakh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>8.5%</TableCell>
                    <TableCell>₹43,391</TableCell>
                    <TableCell>₹54.14 lakh</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>9.0%</TableCell>
                    <TableCell>₹44,986</TableCell>
                    <TableCell>₹57.97 lakh</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="prepayment">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <TrendingUp className="h-6 w-6 text-emerald-600" /> Prepayment
          Strategies
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-800">
                Annual part-prepayment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Paying an extra lump sum every year can reduce outstanding
              principal much faster than waiting for scheduled EMIs alone.
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">
                Step-up EMI
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              If your salary is expected to increase, raising EMI gradually
              every year can shorten tenure and save interest without stressing
              current cash flow too much.
            </CardContent>
          </Card>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          For many borrowers, the best structure is a comfortable initial tenure
          plus disciplined prepayment rather than choosing the maximum tenure
          and doing nothing later.
        </p>
      </section>

      <section className="mb-12" id="tax-benefits">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Tax Benefits
        </h2>

        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="pt-6 text-sm text-slate-700">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Home loan principal repayment may qualify under Section 80C,
                subject to the overall limit and applicable conditions.
              </li>
              <li>
                Eligible home loan interest may qualify under Section 24(b),
                subject to prevailing rules.
              </li>
              <li>
                Personal loan and car loan EMIs usually do not get the same
                broad tax treatment as owner-occupied home loans, though
                specific business-use cases can differ.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="affordability">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          How Much EMI Is Safe?
        </h2>

        <Card>
          <CardContent className="pt-6">
            <p className="mb-4 text-slate-700">
              A practical affordability rule is to keep total EMIs below about
              40% of monthly take-home income.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-emerald-50 p-4">
                <strong className="block text-emerald-800">Below 30%</strong>
                <p className="mt-1 text-sm text-slate-700">
                  Usually comfortable for most households.
                </p>
              </div>
              <div className="rounded-lg border bg-amber-50 p-4">
                <strong className="block text-amber-800">30%–40%</strong>
                <p className="mt-1 text-sm text-slate-700">
                  Manageable if emergency savings are strong.
                </p>
              </div>
              <div className="rounded-lg border bg-red-50 p-4">
                <strong className="block text-red-800">Above 40%</strong>
                <p className="mt-1 text-sm text-slate-700">
                  Can become risky if income changes or expenses rise.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="mistakes">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <AlertTriangle className="h-6 w-6 text-amber-500" /> Common Mistakes
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6 text-sm text-slate-700">
              Choosing the maximum possible loan only because the EMI looks
              manageable.
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-sm text-slate-700">
              Ignoring total interest cost and focusing only on monthly EMI.
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-sm text-slate-700">
              Not comparing rates, reset clauses, and processing fees across
              lenders.
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-sm text-slate-700">
              Taking a long tenure but never using bonuses or surplus cash for
              prepayment.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12" id="faqs">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">FAQs</h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="rounded-lg border bg-white px-4"
            >
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-slate-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Use the EMI calculator before you borrow
          </h2>
          <p className="mb-6 text-slate-300">
            EMI planning is not only about affordability today. It is about how
            much interest you will still be paying years later.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/emi-calculator/"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Open EMI Calculator
            </Link>
            <Link
              href="/loans/home-loan/"
              className="rounded-lg border border-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Home Loan Calculator
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-4 text-xs italic text-slate-500">
          <strong>Disclaimer:</strong> This article is for educational purposes
          only. Loan terms, lender policies, tax rules, and interest rates may
          change. Verify details with your lender or tax advisor before making
          financial decisions.
        </p>
      </div>
    </article>
  );
}
