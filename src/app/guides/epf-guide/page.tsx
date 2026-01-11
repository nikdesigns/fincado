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
  Briefcase,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'EPF Guide 2025: 8.25% Interest, Tax & Withdrawal Rules',
  description:
    'EPF 2025: 8.25% interest rate, EEE tax benefits (Section 80C), 5-year withdrawal rule, EPF vs NPS/PPF comparison & how to build ₹1-2 crore tax-free corpus.',
  keywords: [
    'epf interest rate 2025',
    'employee provident fund withdrawal rules',
    'epf tax on withdrawal before 5 years',
    'uan activation steps',
    'epf vs ppf interest rate',
    'voluntary provident fund vpf',
  ],
  openGraph: {
    title:
      'EPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits (80C)',
    description:
      'The ultimate guide to your Employee Provident Fund. Learn about the 8.25% interest, EEE tax status, and how to avoid tax on withdrawals.',
    url: 'https://fincado.com/guides/epf-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/epf/epf-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'EPF passbook and retirement savings growth chart',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'Is EPF withdrawal taxable?',
    answer:
      'Withdrawal is 100% tax-free if you have completed 5 years of continuous service. If withdrawn before 5 years, it is taxable at your slab rate.',
  },
  {
    question: 'Can I withdraw my full EPF amount?',
    answer:
      'Full withdrawal is allowed only upon retirement (58 years) or if you remain unemployed for 2 months. Partial withdrawals are allowed for specific needs like housing or medical emergencies.',
  },
  {
    question: 'What is the current EPF interest rate?',
    answer: 'The EPF interest rate for FY 2024-25 is 8.25% per annum.',
  },
];

export default function EPFGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'EPF Guide 2025',
            url: 'https://fincado.com/guides/epf-guide/',
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
              'EPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits (80C)',
            description:
              'Comprehensive guide to Employee Provident Fund (EPF): Interest rates, contribution split (EPF vs EPS), withdrawal rules, and tax implications.',
            image: 'https://fincado.com/images/guides/epf/epf-guide-hero.webp',
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
            datePublished: '2025-02-22',
            dateModified: '2025-02-22',
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
          className="mb-3 bg-amber-100 text-amber-800 hover:bg-amber-200 px-3 py-1"
        >
          Retirement Savings
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          EPF Guide 2025: Interest Rate, Withdrawal Rules & Tax Benefits
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 13 Min Read
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
          <ShareTools title="EPF Guide 2025" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              The <strong>Employee Provident Fund (EPF)</strong> is India's largest mandatory retirement scheme, offering a government-backed <strong>8.25% interest rate</strong> (FY 2024-25) and <strong>EEE tax status</strong>.
            </p>
            <p>
              However, most employees unknowingly lose money by ignoring the <strong>"EPS Split"</strong> or withdrawing funds prematurely, which attracts tax. This guide covers UAN activation, withdrawal rules, and how to become an EPF Crorepati.
            </p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/epf/epf-guide-hero.webp"
              alt="EPF contribution breakdown pie chart"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS EPF --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-amber-600" /> What is EPF
            (Employee Provident Fund)?
          </h2>
          <WikiText
            content={`<p class="mb-6 text-slate-700"><strong>EPF</strong> is a retirement savings scheme managed by the EPFO. Both employee and employer contribute <strong>12%</strong> of the basic salary. It offers guaranteed returns and capital protection.</p>`}
          />

          <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
            <h3 className="mb-3 font-semibold text-slate-900 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" /> Key Highlights
              (2025):
            </h3>
            <ul className="space-y-3 text-slate-700 text-sm">
              <li className="flex gap-2">
                <span className="font-bold text-amber-700">Interest Rate:</span>{' '}
                8.25% p.a.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-amber-700">Contribution:</span>{' '}
                12% Employee + 12% Employer.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-amber-700">Tax Status:</span>{' '}
                EEE (Exempt-Exempt-Exempt) after 5 years.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-amber-700">Lock-In:</span> Until
                Retirement (58 years).
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
                href="#contribution-split"
                className="hover:text-amber-600 hover:underline"
              >
                1. The 12% Rule (EPF vs EPS)
              </a>
            </li>
            <li>
              <a
                href="#interest-rate"
                className="hover:text-amber-600 hover:underline"
              >
                2. Interest Rate & Calculation
              </a>
            </li>
            <li>
              <a
                href="#tax-benefits"
                className="hover:text-amber-600 hover:underline"
              >
                3. Tax Benefits (The EEE Advantage)
              </a>
            </li>
            <li>
              <a
                href="#withdrawal-rules"
                className="hover:text-amber-600 hover:underline"
              >
                4. Withdrawal Rules (5-Year Clause)
              </a>
            </li>
            <li>
              <a
                href="#epf-vs-ppf"
                className="hover:text-amber-600 hover:underline"
              >
                5. EPF vs PPF vs NPS
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-amber-600 hover:underline">
                6. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-epf-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: CONTRIBUTION SPLIT --- */}
      <section className="mb-12">
        <h2
          id="contribution-split"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Briefcase className="h-6 w-6 text-blue-600" /> EPF Structure: Where
          Does Your Money Go?
        </h2>
        <p className="mb-6 text-slate-700">
          Many believe the employer matches their contribution 100%.{' '}
          <strong>This is a myth.</strong> Here is the real breakdown of the
          employer&apos;s 12%:
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Component
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Share
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Goes To
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Purpose
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Employee Share
                </TableCell>
                <TableCell>12%</TableCell>
                <TableCell className="font-bold text-emerald-700">
                  EPF Account
                </TableCell>
                <TableCell>Your Corpus + Interest</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Employer Share 1
                </TableCell>
                <TableCell>3.67%</TableCell>
                <TableCell className="font-bold text-emerald-700">
                  EPF Account
                </TableCell>
                <TableCell>Your Corpus + Interest</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Employer Share 2
                </TableCell>
                <TableCell>8.33%</TableCell>
                <TableCell className="font-bold text-slate-500">
                  EPS (Pension)
                </TableCell>
                <TableCell>Monthly Pension (No Interest)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  EDLI
                </TableCell>
                <TableCell>0.5%</TableCell>
                <TableCell className="text-slate-500">Insurance Fund</TableCell>
                <TableCell>Life Insurance Cover</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-900 text-lg">
              Reality Check: Only 15.67% goes to PF
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-2">
            <p>
              Your 12% + Employer&apos;s 3.67% = <strong>15.67%</strong> goes to
              your EPF account to earn 8.25% interest.
            </p>
            <p>
              The remaining <strong>8.33%</strong> goes to the Pension Scheme
              (EPS), which does not earn compound interest.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 3: INTEREST RATE --- */}
      <section className="mb-12">
        <h2
          id="interest-rate"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-emerald-600" /> Current EPF
          Interest Rate (2025)
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <p className="mb-4 text-slate-700">
              The interest rate for FY 2024-25 is{' '}
              <span className="text-2xl font-bold text-emerald-600">
                8.25% p.a.
              </span>{' '}
              This is higher than PPF (7.1%) and most Fixed Deposits.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>
                <strong>Calculation:</strong> Monthly (on running balance).
              </li>
              <li>
                <strong>Credit:</strong> Annually (usually by March 31st).
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-epf-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: TAX BENEFITS --- */}
      <section className="mb-12">
        <h2
          id="tax-benefits"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Tax Benefits: The
          EEE Advantage
        </h2>
        <WikiText
          content={`<p class="mb-6 text-slate-700">EPF enjoys <strong>EEE (Exempt-Exempt-Exempt)</strong> status, meaning no tax at contribution, accumulation, or withdrawal stages (conditions apply).</p>`}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-emerald-800">
                1. Contribution
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Your 12% contribution is eligible for tax deduction under{' '}
              <strong>Section 80C</strong> (up to ₹1.5 Lakh limit).
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-emerald-800">
                2. Interest
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Interest earned is tax-free.
              <br />
              <em className="text-xs text-slate-500">
                (Exception: If your own contribution &gt; ₹2.5L/year, excess
                interest is taxable).
              </em>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-emerald-800">
                3. Withdrawal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Withdrawal is <strong>100% tax-free</strong> if you have completed
              5 years of continuous service.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 5: WITHDRAWAL RULES --- */}
      <section className="mb-12">
        <h2
          id="withdrawal-rules"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" /> Withdrawal Rules:
          The Critical 5-Year Rule
        </h2>
        <p className="mb-6 text-slate-700">
          Premature withdrawal is the biggest wealth killer. Here&apos;s why:
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-red-200 bg-red-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-lg">
                Before 5 Years
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-red-600">❌</span>
                  <span>
                    <strong>Taxable:</strong> Employer&apos;s share and Interest
                    are fully taxable as income.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">❌</span>
                  <span>
                    <strong>TDS:</strong> 10% TDS deducted if amount &gt;
                    ₹50,000.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                After 5 Years
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-emerald-600">✅</span>
                  <span>
                    <strong>Tax-Free:</strong> Entire corpus is tax-free.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600">✅</span>
                  <span>
                    <strong>No TDS:</strong> Full amount credited to your bank.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100 text-sm text-amber-900">
          <strong>Pro Tip:</strong> When changing jobs,{' '}
          <strong>TRANSFER</strong> your EPF account (using UAN) instead of
          withdrawing. This maintains your &quot;Continuous Service&quot; record
          for the 5-year rule.
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-epf-3" type="leaderboard" />
      </div>

      {/* --- SECTION 6: COMPARISON --- */}
      <section className="mb-12">
        <h2
          id="epf-vs-ppf"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          EPF vs PPF vs NPS Comparison
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">EPF</TableHead>
                <TableHead className="font-bold text-slate-900">PPF</TableHead>
                <TableHead className="font-bold text-slate-900">NPS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Interest
                </TableCell>
                <TableCell className="font-bold text-emerald-600">
                  8.25% (Fixed)
                </TableCell>
                <TableCell>7.1% (Fixed)</TableCell>
                <TableCell>10-12% (Market)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Eligibility
                </TableCell>
                <TableCell>Salaried Only</TableCell>
                <TableCell>All Residents</TableCell>
                <TableCell>All Residents</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Employer Match
                </TableCell>
                <TableCell className="font-bold text-emerald-600">
                  Yes
                </TableCell>
                <TableCell>No</TableCell>
                <TableCell>Optional</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Tax Status
                </TableCell>
                <TableCell>EEE (Conditional)</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  EEE
                </TableCell>
                <TableCell>EET</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Lock-In
                </TableCell>
                <TableCell>Retirement (58)</TableCell>
                <TableCell>15 Years</TableCell>
                <TableCell>Age 60</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 7: FAQS --- */}
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
              How do I check my EPF balance?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              You can check your balance via the <strong>EPFO Portal</strong>,{' '}
              <strong>UMANG App</strong>, or by giving a missed call to{' '}
              <strong>011-22901406</strong> from your registered mobile number.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              What is VPF (Voluntary Provident Fund)?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              VPF allows you to contribute more than the mandatory 12% to your
              EPF account. It earns the same 8.25% interest and enjoys EEE tax
              benefits (up to ₹2.5L limit).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-3"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Can I withdraw EPF for home loan repayment?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes. You can make a partial withdrawal for home
              purchase/construction or repayment of home loan after completing{' '}
              <strong>5 years of service</strong>.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-4"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Is UAN mandatory?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes. The Universal Account Number (UAN) is mandatory for checking
              balance, transferring accounts, and making withdrawal claims.
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
            EPF is the backbone of retirement planning for salaried employees.
            Maximize it for risk-free, tax-efficient wealth.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Activate UAN
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Transfer,
              Don&apos;t Withdraw
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Wait 5 Years
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- AUTHOR & DISCLAIMER --- */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Interest rates are declared annually by
          the EPFO. Tax rules are subject to change. This guide is for
          educational purposes. Consult a tax advisor for specific queries.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-amber-600 to-orange-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Plan your retirement
          </h2>
          <p className="mb-8 max-w-lg text-amber-100 text-lg">
            Calculate your EPF corpus growth over time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/epf-calculator"
              className="rounded-lg bg-white px-8 py-4 font-bold text-amber-700 transition hover:bg-amber-50 shadow-lg"
            >
              EPF Calculator
            </Link>
            <Link
              href="/ppf-calculator"
              className="rounded-lg border border-amber-300 bg-amber-800/30 px-8 py-4 font-bold text-white transition hover:bg-amber-800/50"
            >
              Compare with PPF
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-epf-4" type="leaderboard" />
      </div>
    </article>
  );
}
