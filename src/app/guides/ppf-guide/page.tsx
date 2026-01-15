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
  PiggyBank,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Landmark,
  Wallet,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'PPF Guide 2025: 7.1% Rate, Withdrawal & Tax Benefits',
  description:
    'PPF 2025 guide: 7.1% interest, EEE tax status (save ₹46K/year), 5th-month deposit rule, withdrawal/loan rules, PPF vs ELSS/EPF & how to earn ₹1 crore+.',
  keywords: [
    'ppf interest rate 2025',
    'public provident fund withdrawal rules',
    'ppf vs elss tax benefit',
    'ppf calculator 15 years',
    'loan against ppf account',
    'ppf account extension rules',
  ],
  openGraph: {
    title:
      'PPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits (80C)',
    description:
      'Turn ₹1.5 Lakh/year into ₹1 Crore tax-free. Master the 5th-of-month rule, extensions, and EEE benefits.',
    url: 'https://fincado.com/guides/ppf-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/ppf/ppf-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Piggy bank with tax-free growth chart',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What happens if I miss a PPF deposit?',
    answer:
      'Your account becomes inactive. You can revive it by paying a penalty of ₹50 per year of default plus the minimum deposit of ₹500 for each missed year.',
  },
  {
    question: 'Can I have more than one PPF account?',
    answer:
      'No. An individual can open only one PPF account in their name. Opening a second account is illegal and will not earn interest.',
  },
  {
    question: 'Is PPF interest taxable?',
    answer:
      'No. PPF falls under the EEE category. The interest earned and the maturity amount are completely tax-free.',
  },
];

export default function PPFGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'PPF Guide 2025',
            url: 'https://fincado.com/guides/ppf-guide/',
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
              'PPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits (80C)',
            description:
              'Complete guide to Public Provident Fund (PPF): Interest calculation, withdrawal rules, loan facility, and comparison with ELSS/EPF.',
            image: 'https://fincado.com/images/guides/ppf/ppf-guide-hero.webp',
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
            datePublished: '2025-02-18',
            dateModified: '2025-02-18',
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
          className="mb-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1"
        >
          Tax Saving
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          PPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits (80C)
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 12 Min Read
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
          <ShareTools title="PPF Guide 2025" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              Understanding <strong>PPF (Public Provident Fund)</strong> is essential for long-term wealth creation. With a <strong>7.1% tax-free interest rate</strong> and sovereign guarantee, it remains India's favorite tax-saving tool.
            </p>
            <p>
              However, missing the <strong>"5th of the Month" rule</strong> can cost you thousands in interest. This guide covers interest calculation, <strong>80C benefits</strong>, withdrawal rules, and how to become a <strong>Crorepati</strong> using PPF extensions.
            </p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/ppf/ppf-guide-hero.webp"
              alt="Growth of PPF investment over 15 years"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS PPF --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-emerald-600" /> What is PPF
            (Public Provident Fund)?
          </h2>
          <p className="mb-6 text-slate-700">
            <strong>PPF</strong> is a government-backed savings scheme with a{' '}
            <strong>15-year lock-in</strong>. It offers guaranteed returns and
            complete tax exemption under the <strong>EEE</strong>{' '}
            (Exempt-Exempt-Exempt) status.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-emerald-100 bg-emerald-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-emerald-800 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Interest Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                7.1% p.a. (Compounded Annually).
              </CardContent>
            </Card>
            <Card className="border-emerald-100 bg-emerald-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-emerald-800 flex items-center gap-2">
                  <Wallet className="h-4 w-4" /> Deposit
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Min ₹500 / Max ₹1.5 Lakh per year.
              </CardContent>
            </Card>
            <Card className="border-emerald-100 bg-emerald-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-emerald-800 flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Tenure
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                15 Years (Extendable by 5 years).
              </CardContent>
            </Card>
            <Card className="border-emerald-100 bg-emerald-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-emerald-800 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Tax Benefit
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Section 80C (up to ₹1.5L).
              </CardContent>
            </Card>
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
                href="#interest-rate"
                className="hover:text-emerald-600 hover:underline"
              >
                1. Interest Rate & &quot;5th Day&quot; Rule
              </a>
            </li>
            <li>
              <a
                href="#eligibility"
                className="hover:text-emerald-600 hover:underline"
              >
                2. Eligibility & Account Rules
              </a>
            </li>
            <li>
              <a
                href="#tax-benefits"
                className="hover:text-emerald-600 hover:underline"
              >
                3. The EEE Tax Advantage
              </a>
            </li>
            <li>
              <a
                href="#withdrawal-rules"
                className="hover:text-emerald-600 hover:underline"
              >
                4. Withdrawal, Loan & Closure
              </a>
            </li>
            <li>
              <a
                href="#ppf-vs-alternatives"
                className="hover:text-emerald-600 hover:underline"
              >
                5. PPF vs ELSS vs EPF
              </a>
            </li>
            <li>
              <a
                href="#crorepati-strategy"
                className="hover:text-emerald-600 hover:underline"
              >
                6. How to build ₹1 Crore
              </a>
            </li>
            <li>
              <a
                href="#faqs"
                className="hover:text-emerald-600 hover:underline"
              >
                7. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-ppf-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: 5TH DAY RULE --- */}
      <section className="mb-12">
        <h2
          id="interest-rate"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" /> The &quot;5th of
          the Month&quot; Rule
        </h2>
        <p className="mb-6 text-slate-700">
          The current rate is <strong>7.1%</strong>. Interest is calculated
          monthly but credited annually on March 31st.
        </p>

        <Card className="border-l-4 border-l-amber-500 bg-amber-50/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-800 text-lg">
              Crucial Rule: Deposit BEFORE the 5th
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-3">
            <p>
              Interest is calculated on the <strong>lowest balance</strong>{' '}
              between the 5th and the last day of the month.
            </p>
            <div className="bg-white p-3 rounded border border-amber-200">
              If you deposit on the <strong>6th</strong>, you lose interest on
              that amount for the <strong>entire month</strong>.
            </div>
            <p className="font-medium text-amber-900">
              Pro Tip: Set SIP date to 1st or 2nd.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 3: ELIGIBILITY --- */}
      <section className="mb-12">
        <h2
          id="eligibility"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <CheckCircle2 className="h-6 w-6 text-emerald-600" /> Eligibility &
          Rules
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>
                  <strong>Residents Only:</strong> Only Indian residents can
                  open. NRIs cannot open new accounts.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>
                  <strong>One Account:</strong> Only one account per individual
                  is allowed.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>
                  <strong>Minors:</strong> Parents can open for minors (Guardian
                  operated).
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>
                  <strong>Limit:</strong> Max ₹1.5 Lakh per FY (Self + Minor
                  combined).
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-ppf-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: TAX BENEFITS --- */}
      <section className="mb-12">
        <h2
          id="tax-benefits"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Tax Benefits: EEE
          Advantage
        </h2>
        <p className="mb-6 text-slate-700">
          <strong>EEE</strong> stands for Exempt-Exempt-Exempt. You pay{' '}
          <strong>Zero Tax</strong> at all three stages.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Stage
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Tax Treatment
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Benefit
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Investment
                </TableCell>
                <TableCell>Section 80C</TableCell>
                <TableCell className="text-emerald-600">
                  Deduction up to ₹1.5L
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Interest
                </TableCell>
                <TableCell>Tax-Free</TableCell>
                <TableCell className="text-emerald-600">
                  7.1% Fully Exempt
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Maturity
                </TableCell>
                <TableCell>Tax-Free</TableCell>
                <TableCell className="text-emerald-600">100% Exempt</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 5: WITHDRAWAL --- */}
      <section className="mb-12">
        <h2
          id="withdrawal-rules"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Landmark className="h-6 w-6 text-blue-600" /> Withdrawal, Loan &
          Closure
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                1. Loan Facility
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>From 3rd to 6th year.</li>
                <li>Up to 25% of balance.</li>
                <li>
                  Interest: <strong>1% p.a.</strong>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                2. Partial Withdrawal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>From 7th year.</li>
                <li>Max 50% of balance.</li>
                <li>One withdrawal/year.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                3. Premature Closure
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>After 5 years.</li>
                <li>Valid reasons only.</li>
                <li>Penalty: 1% interest cut.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-ppf-3" type="leaderboard" />
      </div>

      {/* --- SECTION 6: COMPARISON --- */}
      <section className="mb-12">
        <h2
          id="ppf-vs-alternatives"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          PPF vs ELSS vs EPF
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">PPF</TableHead>
                <TableHead className="font-bold text-slate-900">ELSS</TableHead>
                <TableHead className="font-bold text-slate-900">EPF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Returns
                </TableCell>
                <TableCell>7.1% (Fixed)</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  12-15% (Var)
                </TableCell>
                <TableCell>8.25% (Fixed)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Lock-In
                </TableCell>
                <TableCell>15 Years</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  3 Years
                </TableCell>
                <TableCell>Retirement</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Risk
                </TableCell>
                <TableCell className="text-emerald-600">Zero (Govt)</TableCell>
                <TableCell className="text-amber-600">High (Market)</TableCell>
                <TableCell className="text-emerald-600">Zero (Govt)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Tax Status
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  EEE
                </TableCell>
                <TableCell>EET (LTCG)</TableCell>
                <TableCell className="text-emerald-600">EEE</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 7: CROREPATI STRATEGY --- */}
      <section className="mb-12">
        <h2
          id="crorepati-strategy"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-purple-600" /> How to Become a
          Crorepati
        </h2>
        <p className="mb-6 text-slate-700">
          The magic of PPF lies in <strong>Extensions</strong>. After 15 years,
          you can extend indefinitely in blocks of 5 years.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Tenure
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Total Invested
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Maturity (@7.1%)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>15 Years</TableCell>
                <TableCell>₹22.5 Lakh</TableCell>
                <TableCell>₹40.7 Lakh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20 Years (1 Ext)</TableCell>
                <TableCell>₹30 Lakh</TableCell>
                <TableCell>₹66.6 Lakh</TableCell>
              </TableRow>
              <TableRow className="bg-purple-50">
                <TableCell className="font-bold text-purple-900">
                  25 Years (2 Ext)
                </TableCell>
                <TableCell className="font-bold text-purple-900">
                  ₹37.5 Lakh
                </TableCell>
                <TableCell className="font-bold text-purple-700 text-lg">
                  ₹1.03 Crore
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
              Can I open a PPF account in a private bank?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes, authorized private banks like HDFC, ICICI, and Axis Bank
              offer PPF accounts. The rules and interest rates are exactly the
              same as Post Office PPF.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Is the interest rate fixed for 15 years?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              No. The government reviews and revises the interest rate
              quarterly. Your balance earns the prevailing rate for that
              quarter.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-3"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Can I transfer my PPF account?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes, you can transfer your PPF account from a Post Office to a
              Bank, or from one bank branch to another.
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
            PPF is the cornerstone of a safe retirement portfolio.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Deposit by
              5th
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Extend for
              Wealth
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Combine with
              ELSS
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Interest rates are subject to change by
          the government. This guide is for educational purposes. Please consult
          a financial advisor for personalized advice.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-emerald-600 to-teal-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Plan your tax savings
          </h2>
          <p className="mb-8 max-w-lg text-emerald-100 text-lg">
            Calculate your PPF maturity amount and tax benefits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/ppf-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-emerald-700 transition hover:bg-emerald-50 shadow-lg"
            >
              PPF Calculator
            </Link>
            <Link
              href="/sip-calculator/"
              className="rounded-lg border border-emerald-400 bg-emerald-800/30 px-8 py-4 font-bold text-white transition hover:bg-emerald-800/50"
            >
              Compare with ELSS
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-ppf-4" type="leaderboard" />
      </div>
    </article>
  );
}
