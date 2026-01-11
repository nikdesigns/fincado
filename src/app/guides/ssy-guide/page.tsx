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
  TrendingUp,
  ShieldCheck,
  Lock,
  PiggyBank,
  CheckCircle2,
  Lightbulb,
  Clock,
  PieChart,
  Baby,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'SSY vs PPF vs Mutual Funds: Best for Girl Child 2025',
  description:
    'Best investment for girl child: Compare Sukanya Samriddhi (8.2%), PPF, mutual funds. Learn SSY vs PPF, 21-year lock-in & 60-40 strategy for education & marriage.',
  keywords: [
    'sukanya samriddhi vs ppf',
    'ssy vs mutual funds',
    'best investment for girl child india',
    'sukanya samriddhi interest rate 2025',
    'ssy calculator 2025',
    '60-40 investment rule',
  ],
  openGraph: {
    title:
      'Sukanya Samriddhi vs PPF vs Mutual Funds: Best Plan for Girl Child?',
    description:
      'Should you invest in SSY or Mutual Funds? Discover the 60-40 Rule to balance safety and high growth for your daughter.',
    url: 'https://fincado.com/guides/ssy-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/ssy/ssy-concept-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Father and daughter planning financial future',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the best investment for a girl child in India?',
    answer:
      'Sukanya Samriddhi Yojana (SSY) is best for guaranteed returns (8.2%) and tax benefits. However, combining 60% SSY + 40% Mutual Funds offers better growth for long-term goals.',
  },
  {
    question: 'What is the difference between SSY and PPF?',
    answer:
      'SSY offers higher interest (8.2%) but is only for girl children (lock-in 21 years). PPF offers 7.1% interest but is open to all (lock-in 15 years).',
  },
  {
    question: 'Can I withdraw money from SSY before 21 years?',
    answer:
      'Partial withdrawal (50%) is allowed after the girl turns 18 for higher education. Full withdrawal is allowed on maturity (21 years) or marriage after 18.',
  },
];

export default function SSYGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'SSY vs PPF vs Mutual Funds',
            url: 'https://fincado.com/guides/ssy-guide/',
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
              'Sukanya Samriddhi vs PPF vs Mutual Funds: Best Plan for Girl Child?',
            description:
              'Comprehensive comparison of SSY, PPF, and Mutual Funds. Includes the 60-40 investment strategy for girl child education and marriage.',
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
            datePublished: '2025-02-05',
            dateModified: '2025-02-05',
            image:
              'https://fincado.com/images/guides/ssy/ssy-concept-hero.webp',
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
          className="mb-3 bg-pink-100 text-pink-800 hover:bg-pink-200 px-3 py-1"
        >
          Child Future
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Sukanya Samriddhi vs PPF vs Mutual Funds: Best Plan for Girl Child?
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
          <ShareTools title="SSY vs PPF vs Mutual Funds Guide" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Choosing the <strong>best investment for girl child</strong> is one of the most important financial decisions Indian parents face. With options like <strong>Sukanya Samriddhi Yojana (SSY)</strong> offering 8.2% guaranteed returns and Mutual Funds delivering 12-14% growth, the choice isn't easy.</p>`}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden border border-slate-100">
            <Image
              src="/images/guides/ssy/ssy-concept-hero.webp"
              alt="Concept of growing savings for girl child education"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS SSY --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Baby className="h-6 w-6 text-pink-600" /> What is Sukanya Samriddhi
            Yojana (SSY)?
          </h2>
          <p className="mb-6 text-slate-700">
            <strong>SSY</strong> is a government-backed savings scheme under the
            *Beti Bachao Beti Padhao* campaign. It offers the{' '}
            <strong>highest interest rate</strong> among small savings schemes.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-pink-100 bg-pink-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-pink-800 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Interest Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                8.2% p.a. (Tax-Free).
              </CardContent>
            </Card>
            <Card className="border-pink-100 bg-pink-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-pink-800 flex items-center gap-2">
                  <Baby className="h-4 w-4" /> Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Girl child &lt; 10 years.
              </CardContent>
            </Card>
            <Card className="border-pink-100 bg-pink-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-pink-800 flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Maturity
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                21 Years (or marriage after 18).
              </CardContent>
            </Card>
            <Card className="border-pink-100 bg-pink-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-pink-800 flex items-center gap-2">
                  <PiggyBank className="h-4 w-4" /> Deposit
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                ₹250 - ₹1.5 Lakh per year.
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
                href="#comparison"
                className="hover:text-pink-600 hover:underline"
              >
                1. SSY vs PPF vs Mutual Funds
              </a>
            </li>
            <li>
              <a
                href="#ssy-details"
                className="hover:text-pink-600 hover:underline"
              >
                2. How SSY Works (Rules)
              </a>
            </li>
            <li>
              <a
                href="#tax-benefits"
                className="hover:text-pink-600 hover:underline"
              >
                3. Tax Benefits (EEE Status)
              </a>
            </li>
            <li>
              <a
                href="#lock-in-reality"
                className="hover:text-pink-600 hover:underline"
              >
                4. The 21-Year Lock-In
              </a>
            </li>
            <li>
              <a
                href="#60-40-rule"
                className="hover:text-pink-600 hover:underline"
              >
                5. The &quot;60-40 Rule&quot;
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-pink-600 hover:underline">
                6. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-ssy-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: COMPARISON --- */}
      <section className="mb-12">
        <h2
          id="comparison"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-indigo-600" /> Comparison Table
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">SSY</TableHead>
                <TableHead className="font-bold text-slate-900">PPF</TableHead>
                <TableHead className="font-bold text-slate-900">
                  Mutual Funds
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Return
                </TableCell>
                <TableCell className="text-pink-600 font-bold">
                  8.2% (Fixed)
                </TableCell>
                <TableCell>7.1% (Fixed)</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  12-14% (Var)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Risk
                </TableCell>
                <TableCell className="text-emerald-600">Zero (Govt)</TableCell>
                <TableCell className="text-emerald-600">Zero (Govt)</TableCell>
                <TableCell className="text-amber-600">Medium-High</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Lock-In
                </TableCell>
                <TableCell>21 Years</TableCell>
                <TableCell>15 Years</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Liquid
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Tax
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  EEE (Free)
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  EEE (Free)
                </TableCell>
                <TableCell>LTCG (12.5%)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm text-indigo-900">
          <strong>Verdict:</strong> <strong>SSY</strong> is best for safety.{' '}
          <strong>Mutual Funds</strong> are best for growth.{' '}
          <strong>PPF</strong> is less attractive for girl child goals due to
          lower rates.
        </div>
      </section>

      {/* --- SECTION 3: HOW IT WORKS --- */}
      <section className="mb-12">
        <h2
          id="ssy-details"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PiggyBank className="h-6 w-6 text-emerald-600" /> How SSY Works
        </h2>
        <Card className="border-slate-200 mb-6">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900">
              Rules & Limits
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <ul className="space-y-2 list-disc pl-4">
              <li>Open at Post Office or Bank.</li>
              <li>
                Deposit for <strong>15 years</strong> only. Interest continues
                till 21st year.
              </li>
              <li>Max 2 accounts per family (one per daughter).</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900">Withdrawal</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <ul className="space-y-2 list-disc pl-4">
              <li>
                <strong>Age 18:</strong> 50% withdrawal for higher education.
              </li>
              <li>
                <strong>Age 21:</strong> Full withdrawal allowed; account
                closes.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-ssy-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: TAX BENEFITS --- */}
      <section className="mb-12">
        <h2
          id="tax-benefits"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-blue-600" /> Tax Benefits: EEE
        </h2>
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="pt-6 text-sm text-blue-900">
            <p className="mb-2 font-bold text-lg">Exempt-Exempt-Exempt</p>
            <ul className="space-y-2">
              <li className="flex justify-between border-b border-blue-200 pb-1">
                <span>Investment</span>
                <span>80C Deduction (up to ₹1.5L)</span>
              </li>
              <li className="flex justify-between border-b border-blue-200 pb-1">
                <span>Interest</span>
                <span>Tax-Free (8.2%)</span>
              </li>
              <li className="flex justify-between">
                <span>Maturity</span>
                <span>100% Tax-Free</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 5: LOCK-IN --- */}
      <section className="mb-12">
        <h2
          id="lock-in-reality"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lock className="h-6 w-6 text-red-500" /> The 21-Year Lock-In Reality
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-lg">SSY Limits</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Cannot withdraw before 18 years (even for emergencies). Highly
              illiquid.
            </CardContent>
          </Card>
          <Card className="border-emerald-100 bg-emerald-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Alternative
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Mutual Funds can be withdrawn anytime (T+2 days). Keep emergency
              funds separate.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 6: 60-40 RULE --- */}
      <section className="mb-12">
        <h2
          id="60-40-rule"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-purple-600" /> The &quot;60-40
          Rule&quot; Strategy
        </h2>
        <Card className="border-purple-100 bg-purple-50/30 mb-6">
          <CardHeader className="pb-2 border-b border-purple-100">
            <CardTitle className="text-purple-900 text-lg">
              The Plan: 60% Safe + 40% Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <p className="mb-4">
              Allocate 60% to SSY for <strong>Safety</strong> (Education).
              Allocate 40% to Equity SIPs for <strong>Growth</strong>{' '}
              (Marriage/Higher Studies).
            </p>
            <div className="bg-white p-3 rounded border border-purple-200">
              <strong>Projected Result (18 Years):</strong>
              <br />
              Invest ₹1.5L/yr → <strong>SSY:</strong> ~₹36 Lakhs
              <br />
              Invest ₹1L/yr → <strong>MF:</strong> ~₹50 Lakhs
            </div>
          </CardContent>
        </Card>

        <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
          <h4 className="font-bold mb-2">Why It Works:</h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              <strong>Guaranteed Base:</strong> SSY protects basic needs.
            </li>
            <li>
              <strong>Inflation Beating:</strong> MFs beat education inflation
              (10%).
            </li>
            <li>
              <strong>Liquidity:</strong> MF portion is accessible.
            </li>
          </ol>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-ssy-3" type="leaderboard" />
      </div>

      {/* --- SECTION 7: MATURITY EXAMPLES --- */}
      <section className="mb-12">
        <h2
          id="returns"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Maturity Corpus Examples (SSY)
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Annual Deposit
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Invested (15Y)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Maturity (21Y)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>₹50,000</TableCell>
                <TableCell>₹7.5 Lakhs</TableCell>
                <TableCell>~₹22 Lakhs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹1,00,000</TableCell>
                <TableCell>₹15 Lakhs</TableCell>
                <TableCell>~₹44 Lakhs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹1,50,000</TableCell>
                <TableCell>₹22.5 Lakhs</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  ~₹66 Lakhs
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
              Can I open SSY for my 12-year-old daughter?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              No. Only for girl child below 10 years.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Is the interest rate fixed for 21 years?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              No. It is revised quarterly by the government.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            SSY is a &quot;Must-Have&quot; for safety, but not enough for wealth
            creation.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Open SSY
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Maximize
              1.5L
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Add SIP
              (40%)
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Interest rates are subject to change by
          the government. Mutual fund investments are subject to market risks.
          This guide is for educational purposes. Consult a financial advisor
          for personalized planning.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-pink-600 to-rose-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Plan for her future today
          </h2>
          <p className="mb-8 max-w-lg text-pink-100 text-lg">
            Calculate how much corpus you can build with SSY and SIPs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sukanya-samriddhi"
              className="rounded-lg bg-white px-8 py-4 font-bold text-pink-700 transition hover:bg-pink-50 shadow-lg"
            >
              SSY Calculator
            </Link>
            <Link
              href="/sip-calculator"
              className="rounded-lg border border-pink-400 bg-pink-800/30 px-8 py-4 font-bold text-white transition hover:bg-pink-800/50"
            >
              SIP Calculator
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-ssy-4" type="leaderboard" />
      </div>
    </article>
  );
}
