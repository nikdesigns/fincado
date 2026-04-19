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
  Baby,
  TrendingUp,
  ShieldCheck,
  Scale,
  Wallet,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PieChart,
  FileText,
  ListChecks,
  Download,
  HelpCircle,
  Users,
  Landmark,
  Calculator,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Sukanya Samriddhi Yojana (SSY) Guide 2026: Interest Rate, Rules, Tax Benefits & Calculator',
  description:
    'Complete 2026 SSY guide: current 8.2% interest rate, eligibility, deposit limits, withdrawal rules, old tax regime 80C benefit, EEE status, maturity examples, documents and step-by-step account opening. Updated April 2026.',
  keywords: [
    'Sukanya Samriddhi Yojana 2026',
    'SSY interest rate 2026',
    'SSY 8.2%',
    'Sukanya Samriddhi Yojana eligibility',
    'SSY withdrawal rules 2026',
    'SSY calculator 2026',
    'girl child savings scheme 2026',
    'post office SSY account',
    'SSY tax benefits 80C old regime',
    'SSY vs PPF 2026',
    'SSY maturity amount',
    'SSY partial withdrawal rules',
    'how to open SSY account'
  ],
  alternates: {
    canonical:
      'https://fincado.com/guides/sukanya-samriddhi-yojana-guide-2026/',
  },
  openGraph: {
    title:
      'Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Rules & Tax Benefits',
    description:
      'Current SSY interest rate, eligibility, deposit rules, withdrawal conditions, EEE tax treatment and calculator examples for 2026.',
    type: 'article',
    url: 'https://fincado.com/guides/sukanya-samriddhi-yojana-guide-2026/',
    images: [
      {
        url: '/images/guides/ssy/ssy-guide-hero-2026.webp',
        width: 1200,
        height: 630,
        alt: 'Sukanya Samriddhi Yojana 2026 guide',
      }
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the current SSY interest rate in April 2026?',
    answer:
      'The current Sukanya Samriddhi Yojana interest rate is 8.2% per annum, compounded annually, for April–June 2026. The rate is notified by the Government every quarter and can change in future quarters.',
  },
  {
    question: 'Is SSY tax-free in 2026?',
    answer:
      'SSY continues to enjoy EEE tax treatment. Contributions qualify for deduction under Section 80C up to ₹1.5 lakh under the old tax regime, interest earned is tax-free, and the maturity amount is also tax-free.',
  },
  {
    question: 'Is SSY available under the new tax regime?',
    answer:
      'You can still invest in SSY under the new tax regime, but the Section 80C deduction is not available. The interest and maturity amount remain tax-free as per scheme rules.',
  },
  {
    question: 'Who can open an SSY account?',
    answer:
      'A parent or legal guardian can open an SSY account for a resident Indian girl child before she turns 10 years old. A family can usually open up to two accounts, one for each eligible girl child, with exceptions for twins or triplets as per rules.',
  },
  {
    question: 'Can NRI parents open an SSY account?',
    answer:
      'SSY is meant for resident Indian girl children. If residency status changes later, treatment of the account depends on the applicable scheme rules and notifications in force at that time, so you should confirm with the bank or post office before taking action.',
  },
  {
    question: 'What is the minimum and maximum deposit in SSY?',
    answer:
      'The minimum deposit is ₹250 per financial year and the maximum deposit is ₹1.5 lakh per financial year. Deposits are required only for the first 15 years from account opening.',
  },
  {
    question: 'What happens if I miss the minimum SSY deposit in a year?',
    answer:
      'If the minimum deposit is not made in a financial year, the account becomes irregular. It can usually be revived by paying the minimum amount due along with the prescribed penalty, subject to the applicable rules at the time of revival.',
  },
  {
    question: 'When can I make partial withdrawal from SSY?',
    answer:
      'Partial withdrawal is allowed for higher education after the girl turns 18 years old or passes the 10th standard, whichever condition is satisfied as per applicable rules. Up to 50% of the balance at the end of the preceding financial year can be withdrawn.',
  },
  {
    question: 'Do I need to deposit every year for 21 years?',
    answer:
      'No. Deposits are required only for the first 15 years. After that, the account continues to earn interest until maturity at 21 years from the date of opening.',
  },
  {
    question: 'Can SSY be transferred from post office to bank?',
    answer:
      'Yes. The SSY account can generally be transferred between a post office and an authorised bank, or between branches, anywhere in India subject to the transfer process and documentation.',
  },
  {
    question: 'What documents are required to open an SSY account?',
    answer:
      'Commonly required documents include the girl child’s birth certificate, guardian’s Aadhaar, PAN, address proof, photographs, and the duly filled account opening form. Individual banks or post offices may ask for additional KYC documents.',
  },
  {
    question: 'Is SSY better than PPF or FD for a girl child?',
    answer:
      'SSY offers a higher interest rate than PPF at present and typically better post-tax outcomes than many bank FDs because SSY interest and maturity are tax-free. However, it also comes with stricter purpose and tenure conditions, so the best option depends on your goal and liquidity needs.',
  }
];

const TOC_ITEMS = [
  { href: '#what-is-ssy', label: 'What is SSY?' },
  { href: '#latest-updates', label: 'Latest Updates' },
  { href: '#eligibility', label: 'Eligibility & Account Rules' },
  { href: '#tax-regime', label: 'Old vs New Tax Regime' },
  { href: '#deposit-rules', label: 'Deposit Limits & Rules' },
  { href: '#interest-rate', label: 'Current Interest Rate' },
  { href: '#who-should-open', label: 'Who Should Open SSY?' },
  { href: '#how-to-open', label: 'How to Open SSY Account' },
  { href: '#documents', label: 'Documents Required' },
  { href: '#withdrawal', label: 'Withdrawal & Maturity Rules' },
  { href: '#tax-benefits', label: 'Tax Benefits' },
  { href: '#comparison', label: 'SSY vs PPF vs FD vs SIP' },
  { href: '#strategy', label: 'Safety + Growth Strategy' },
  { href: '#maturity', label: 'Maturity Examples' },
  { href: '#faqs', label: 'FAQs' }
];

export default function SSYGuide2026() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Sukanya Samriddhi Yojana (SSY) Guide 2026: Interest Rate, Rules, Tax Benefits & Calculator',
    description:
      'Comprehensive 2026 guide to Sukanya Samriddhi Yojana covering interest rate, eligibility, deposit rules, tax benefits, withdrawal rules, maturity examples and account opening process.',
    author: { '@type': 'Organization', name: 'Fincado Research Team' },
    publisher: {
      '@type': 'Organization',
      name: 'Fincado',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fincado.com/logo.png',
      },
    },
    datePublished: '2026-04-01',
    dateModified: '2026-04-09',
    image: 'https://fincado.com/images/guides/ssy/ssy-guide-hero-2026.webp',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fincado.com/guides/sukanya-samriddhi-yojana-guide-2026/',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Open a Sukanya Samriddhi Yojana Account',
    description:
      'Step-by-step process to open an SSY account for a girl child through a post office or authorised bank in India.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Visit an authorised branch',
        text: 'Visit a post office or an authorised bank branch offering Sukanya Samriddhi Yojana accounts.',
      },
      {
        '@type': 'HowToStep',
        name: 'Fill the account opening form',
        text: 'Complete the SSY account opening form with details of the girl child and guardian.',
      },
      {
        '@type': 'HowToStep',
        name: 'Submit documents',
        text: 'Submit the birth certificate of the girl child and the guardian’s KYC documents including Aadhaar, PAN and address proof.',
      },
      {
        '@type': 'HowToStep',
        name: 'Make the initial deposit',
        text: 'Deposit at least ₹250 to activate the account.',
      }
    ],
  };

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'SSY Guide 2026',
            url: 'https://fincado.com/guides/sukanya-samriddhi-yojana-guide-2026/',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <header className="mb-8 border-b border-slate-200 pb-6">
        <Badge
          variant="secondary"
          className="mb-3 bg-pink-100 text-pink-800 hover:bg-pink-200"
        >
          Government Scheme • 2026
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Sukanya Samriddhi Yojana 2026: Interest Rate, Rules, Tax Benefits
          &amp; Calculator
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 16 Min Read
          </span>
          <span>
            Updated:{' '}
            <strong className="text-emerald-700">April 09, 2026</strong>
          </span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified by Fincado Research
            Team
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="Sukanya Samriddhi Yojana 2026 Guide" />
        </div>
      </header>

      <Card className="mb-10 border-slate-200 overflow-hidden">
        <div className="relative h-80 w-full bg-pink-50">
          <Image
            src="/images/guides/ssy/ssy-concept-hero-2026.webp"
            alt="Sukanya Samriddhi Yojana 2026 illustration"
            fill
            priority
            className="object-cover"
          />
        </div>
        <CardContent className="pt-6 text-lg text-slate-700 leading-relaxed">
          <WikiText
            content={`<p><strong>Sukanya Samriddhi Yojana (SSY)</strong> remains one of India’s most useful government-backed savings schemes for a girl child in 2026. It currently offers <strong>8.2% annual interest</strong>, sovereign backing, and EEE tax treatment. This guide explains how SSY works, who can open it, deposit rules, tax benefits, partial withdrawal, maturity, and when SSY is better than PPF, FD, or mutual funds.</p>`}
          />
        </CardContent>
      </Card>

      <Card className="mb-10 bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-500" /> Contents
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-700">
            {TOC_ITEMS.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-start gap-2 py-0.5 hover:text-pink-700 transition-colors"
                >
                  <span className="text-slate-400 shrink-0 tabular-nums w-5">
                    {i + 1}.
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="ssy-guide-top" type="leaderboard" />
      </div>

      <section className="mb-12" id="what-is-ssy">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Baby className="h-6 w-6 text-pink-600" /> What is Sukanya Samriddhi
          Yojana?
        </h2>
        <WikiText
          content={`<p>Sukanya Samriddhi Yojana is a government-backed small savings scheme for a girl child. It is designed to help families build a long-term corpus for education and marriage while enjoying sovereign safety and tax advantages.</p>`}
        />

        <Card className="mt-6 border-pink-100 bg-pink-50/30">
          <CardContent className="pt-6 grid sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-emerald-500 mt-0.5" />
              <div>
                <strong>Current Interest Rate</strong>
                <br />
                8.2% p.a. (government notified, not permanent)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-emerald-500 mt-0.5" />
              <div>
                <strong>Maturity</strong>
                <br />
                21 years from account opening
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Wallet className="h-5 w-5 text-emerald-500 mt-0.5" />
              <div>
                <strong>Annual Deposit</strong>
                <br />
                ₹250 to ₹1.5 lakh
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-500 mt-0.5" />
              <div>
                <strong>Tax Status</strong>
                <br />
                EEE; 80C deduction under old regime
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="latest-updates">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" /> Latest Updates – April
          2026
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <CheckCircle2 className="text-emerald-500 shrink-0" /> Current
                SSY interest rate remains 8.2% for April–June 2026.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-emerald-500 shrink-0" /> No change
                in annual deposit limits of ₹250 minimum and ₹1.5 lakh maximum.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-emerald-500 shrink-0" /> EEE tax
                treatment continues; 80C deduction remains relevant under the
                old tax regime.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="text-emerald-500 shrink-0" /> Partial
                withdrawal rules and maturity tenure remain unchanged.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="eligibility">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-emerald-600" /> Eligibility &amp;
          Account Rules
        </h2>
        <Card className="border-emerald-200">
          <CardContent className="pt-6 space-y-4 text-slate-700 text-sm">
            <div className="flex gap-3">
              <span className="font-semibold text-emerald-700">Girl Child</span>{' '}
              — Account must be opened before she turns 10 years old.
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-emerald-700">Guardian</span> —
              Parent or legal guardian opens and manages the account until the
              girl becomes eligible to operate it.
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-emerald-700">Residency</span>{' '}
              — Intended for resident Indian girl children under applicable
              rules.
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-emerald-700">
                Family Limit
              </span>{' '}
              — Usually up to 2 accounts; exceptions may apply in the case of
              twins or triplets as per proof requirements.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="tax-regime">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Landmark className="h-6 w-6 text-amber-500" /> SSY &amp; Tax Regime:
          Old vs New
        </h2>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-slate-800 font-medium mb-4">
              SSY can be opened under either regime, but the Section 80C
              deduction is relevant only under the old tax regime.
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aspect</TableHead>
                    <TableHead>Old Tax Regime</TableHead>
                    <TableHead>New Tax Regime</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Can you invest in SSY?</TableCell>
                    <TableCell className="text-emerald-700">Yes</TableCell>
                    <TableCell className="text-emerald-700">Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>80C deduction on contribution</TableCell>
                    <TableCell className="font-semibold text-emerald-700">
                      Allowed up to ₹1.5L
                    </TableCell>
                    <TableCell className="font-semibold text-red-600">
                      Not available
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Interest earned</TableCell>
                    <TableCell>Tax-free</TableCell>
                    <TableCell>Tax-free</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Maturity amount</TableCell>
                    <TableCell>Tax-free</TableCell>
                    <TableCell>Tax-free</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="deposit-rules">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Wallet className="h-6 w-6 text-blue-600" /> Deposit Limits &amp;
          Rules
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader>
              <CardTitle className="text-blue-800">Minimum Deposit</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-blue-700">
              ₹250
            </CardContent>
            <p className="text-sm text-slate-600 px-6 pb-6">
              Per financial year. If missed, revival may require the prescribed
              penalty and pending minimum deposit.
            </p>
          </Card>
          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Maximum Deposit
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-emerald-700">
              ₹1.5 Lakh
            </CardContent>
            <p className="text-sm text-slate-600 px-6 pb-6">
              Per financial year. Contribution qualifies for Section 80C only
              under the old tax regime.
            </p>
          </Card>
        </div>
        <div className="mt-6 bg-slate-50 p-5 rounded-xl text-sm text-slate-700 border">
          <strong>Important:</strong> Deposits are required only for the first{' '}
          <strong>15 years</strong>. The account continues earning interest
          until completion of <strong>21 years</strong> from opening.
        </div>
      </section>

      <section className="mb-12" id="interest-rate">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-600" /> Current Interest
          Rate (8.2%)
        </h2>
        <Card className="mb-6">
          <CardHeader className="bg-emerald-50">
            <CardTitle className="text-emerald-900">
              8.2% p.a. compounded annually for April–June 2026
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quarter</TableHead>
                  <TableHead className="text-right">Interest Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Apr–Jun 2026</TableCell>
                  <TableCell className="text-right font-semibold text-emerald-600">
                    8.2%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jan–Mar 2026</TableCell>
                  <TableCell className="text-right">8.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Since Jan 2024</TableCell>
                  <TableCell className="text-right">8.2%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-slate-500 mt-4">
              The government reviews small savings rates every quarter. Future
              SSY returns depend on the notified rate applicable during each
              period.
            </p>
          </CardContent>
        </Card>
        <div className="text-center">
          <Link
            href="/sukanya-samriddhi/"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-4 text-white font-semibold hover:bg-emerald-700"
          >
            <Calculator className="mr-2 h-5 w-5" /> Calculate Your SSY Maturity
          </Link>
        </div>
      </section>

      <section className="mb-12" id="who-should-open">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Users className="h-6 w-6 text-violet-600" /> Who Should Open SSY?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-base text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Good fit for
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-700">
                {[
                  'Parents wanting sovereign-backed savings for a girl child',
                  'Families prioritising capital safety over high market-linked returns',
                  'Investors using the old tax regime and looking for 80C deduction',
                  'Long-term goals like higher education or marriage corpus',
                  'Conservative investors who want guaranteed-style small savings exposure'
                ].map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-base text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> May not suit if
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-700">
                {[
                  'You need high liquidity or flexible withdrawals',
                  'You prefer market-linked wealth creation over fixed-rate savings',
                  'You are already in the new tax regime and only want tax deductions',
                  'Your goal is not specifically linked to a girl child corpus',
                  'You want a product without long tenure or usage conditions'
                ].map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12" id="how-to-open">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Download className="h-6 w-6 text-purple-600" /> How to Open SSY
          Account (Step-by-Step)
        </h2>
        <ol className="space-y-6 text-slate-700">
          {[
            'Visit any Post Office or authorised bank branch offering SSY accounts.',
            'Fill the SSY account opening form with details of the girl child and guardian.',
            'Submit the required KYC and birth documents.',
            'Make the initial deposit of at least ₹250.',
            'Collect the passbook or acknowledgement and set a yearly deposit reminder.'
          ].map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="bg-purple-100 text-purple-700 font-semibold w-8 h-8 rounded-2xl flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <div>{step}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12" id="documents">
        <h2 className="mb-6 text-2xl font-semibold">Documents Required</h2>
        <ul className="grid md:grid-cols-2 gap-3 text-sm">
          <li className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border">
            <CheckCircle2 className="text-emerald-500" /> Girl child’s birth
            certificate
          </li>
          <li className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border">
            <CheckCircle2 className="text-emerald-500" /> Guardian’s Aadhaar
            card
          </li>
          <li className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border">
            <CheckCircle2 className="text-emerald-500" /> Guardian’s PAN card
          </li>
          <li className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border">
            <CheckCircle2 className="text-emerald-500" /> Address proof
          </li>
          <li className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border">
            <CheckCircle2 className="text-emerald-500" /> Passport-size
            photographs
          </li>
          <li className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border">
            <CheckCircle2 className="text-emerald-500" /> SSY account opening
            form
          </li>
        </ul>
      </section>

      <section className="mb-12" id="withdrawal">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" /> Withdrawal &amp;
          Maturity Rules
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-6 text-sm text-slate-700">
            <div className="flex gap-4">
              <div className="bg-amber-100 text-amber-700 font-semibold w-8 h-8 rounded-2xl flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <strong>Partial Withdrawal for Education</strong> — Up to 50% of
                the balance at the end of the preceding financial year can be
                withdrawn for higher education, subject to the applicable
                age/education conditions and documentation.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-amber-100 text-amber-700 font-semibold w-8 h-8 rounded-2xl flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <strong>Premature Closure</strong> — Allowed in specified
                situations such as marriage after the eligible age or other
                conditions permitted under scheme rules, with required proof.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-amber-100 text-amber-700 font-semibold w-8 h-8 rounded-2xl flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <strong>Full Maturity</strong> — The account matures after 21
                years from the date of opening, and the entire maturity amount
                is generally payable tax-free under prevailing rules.
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-slate-600">
              Example: If the balance at the end of the previous financial year
              was ₹20 lakh, the maximum partial withdrawal allowed for education
              would generally be up to ₹10 lakh, subject to documentation and
              eligibility.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="tax-benefits">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Tax Benefits –
          EEE Status
        </h2>
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex justify-between gap-4">
                <span>Contribution</span>
                <span className="font-semibold">
                  Section 80C deduction up to ₹1.5 lakh (old regime)
                </span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Interest Earned</span>
                <span className="font-semibold text-emerald-700">
                  100% Tax-Free
                </span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Maturity Amount</span>
                <span className="font-semibold text-emerald-700">
                  100% Tax-Free
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="comparison">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Scale className="h-6 w-6 text-purple-600" /> SSY vs PPF vs FD vs
          Equity SIP (2026)
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>SSY</TableHead>
                <TableHead>PPF</TableHead>
                <TableHead>Bank FD</TableHead>
                <TableHead>Equity SIP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Return Type</TableCell>
                <TableCell className="font-semibold text-emerald-600">
                  Government-notified
                </TableCell>
                <TableCell>Government-notified</TableCell>
                <TableCell>Fixed by bank</TableCell>
                <TableCell>Market-linked</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Indicative Return</TableCell>
                <TableCell className="font-semibold text-emerald-600">
                  8.2%
                </TableCell>
                <TableCell>7.1%</TableCell>
                <TableCell>6.5–7.5%</TableCell>
                <TableCell>10–14% long term (not guaranteed)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Risk</TableCell>
                <TableCell className="text-emerald-600">
                  Very Low / Sovereign-backed
                </TableCell>
                <TableCell className="text-emerald-600">Very Low</TableCell>
                <TableCell>Low</TableCell>
                <TableCell>Medium to High</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lock-in / Tenure</TableCell>
                <TableCell>21 years</TableCell>
                <TableCell>15 years</TableCell>
                <TableCell>Depends on FD</TableCell>
                <TableCell>None</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tax Treatment</TableCell>
                <TableCell className="font-semibold text-emerald-600">
                  EEE
                </TableCell>
                <TableCell className="font-semibold text-emerald-600">
                  EEE
                </TableCell>
                <TableCell>Interest taxable</TableCell>
                <TableCell>Capital gains tax applies</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best Use Case</TableCell>
                <TableCell>Girl child long-term corpus</TableCell>
                <TableCell>General long-term tax saving</TableCell>
                <TableCell>Shorter conservative parking</TableCell>
                <TableCell>Long-term wealth growth</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mb-12" id="strategy">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <PieChart className="h-6 w-6 text-purple-600" /> A Balanced Safety +
          Growth Strategy
        </h2>
        <Card className="border-purple-100 bg-purple-50/30">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4 text-sm">
              A practical way to use SSY is to combine it with equity investing
              instead of relying on just one product. For example, you can
              allocate a part of the annual savings to SSY for certainty and the
              rest to equity SIPs for long-term growth.
            </p>
            <div className="bg-white p-5 rounded-2xl border text-sm">
              <strong>Illustration:</strong>
              <br />
              SSY for the “safe core” of the child corpus.
              <br />
              Equity SIPs for inflation-beating growth over 15–18 years.
              <br />
              This works best for parents who want both predictability and
              upside.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12" id="maturity">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Calculator className="h-6 w-6 text-emerald-600" /> Maturity Corpus
          Examples @ 8.2%
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Annual Deposit</TableHead>
              <TableHead>Total Invested (15 years)</TableHead>
              <TableHead>Estimated Maturity Amount (21 years)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>₹50,000</TableCell>
              <TableCell>₹7.5 Lakh</TableCell>
              <TableCell className="font-semibold">~₹23–24 Lakh</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>₹1,00,000</TableCell>
              <TableCell>₹15 Lakh</TableCell>
              <TableCell className="font-semibold">~₹47–48 Lakh</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>₹1,50,000</TableCell>
              <TableCell>₹22.5 Lakh</TableCell>
              <TableCell className="font-semibold text-emerald-600">
                ~₹71–72 Lakh
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="text-xs text-slate-500 mt-4">
          These are indicative illustrations assuming the notified rate remains
          unchanged for simplicity. Actual maturity depends on the interest rate
          applicable in each quarter over the account tenure.
        </p>
      </section>

      <section className="mb-12" id="faqs">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-slate-500" /> Frequently Asked
          Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {FAQ_ITEMS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border rounded-2xl px-4 bg-white"
            >
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Card className="bg-linear-to-br from-pink-600 to-rose-700 text-white border-0 shadow-2xl mb-12">
        <CardContent className="p-12 text-center">
          <h2 className="text-3xl font-semibold mb-3">
            Plan Your Daughter’s Corpus With More Clarity
          </h2>
          <p className="mb-8 text-pink-100">
            Use the SSY calculator for guaranteed-scheme planning and compare it
            with SIP growth for a balanced strategy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sukanya-samriddhi/"
              className="bg-white text-pink-700 px-8 py-4 rounded-2xl font-semibold text-lg"
            >
              SSY Calculator 2026
            </Link>
            <Link
              href="/sip-calculator/"
              className="border border-white/60 px-8 py-4 rounded-2xl font-semibold text-lg"
            >
              SIP Calculator
            </Link>
            <Link
              href="/guides/ppf-guide/"
              className="border border-white/60 px-8 py-4 rounded-2xl font-semibold text-lg"
            >
              PPF Guide
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="ssy-guide-bottom" type="leaderboard" />
      </div>

      <AuthorBio />
      <div className="text-xs text-slate-500 italic mt-8 bg-slate-50 p-6 rounded-2xl border">
        <strong>Disclaimer:</strong> Interest rates, eligibility conditions and
        withdrawal rules are subject to change based on Government notifications
        and scheme rules. Tax treatment depends on the prevailing law and your
        chosen tax regime; the Section 80C deduction is relevant only under the
        old tax regime. This guide is for educational purposes only and should
        not be treated as personalised financial or tax advice.
      </div>
    </article>
  );
}
