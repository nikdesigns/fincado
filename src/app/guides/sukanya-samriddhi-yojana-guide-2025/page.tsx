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
  Lightbulb,
  PieChart,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Sukanya Samriddhi Yojana (SSY) Guide 2026: Interest Rate & Rules',
  description:
    'Complete guide to SSY 2026. Check current 8.2% interest rate, eligibility, withdrawal rules, tax benefits (80C), and calculator.',
  keywords: [
    'Sukanya Samriddhi Yojana 2026',
    'SSY interest rate 2026',
    'SSY calculator',
    'Sukanya Samriddhi Yojana eligibility',
    'SSY withdrawal rules',
    'girl child savings scheme',
    'post office sukanya samriddhi yojana',
    'tax saving schemes for girl child',
  ],
  alternates: {
    canonical:
      'https://fincado.com/guides/sukanya-samriddhi-yojana-guide-2025/',
  },
  openGraph: {
    title: 'Sukanya Samriddhi Yojana (SSY) Guide 2026',
    description:
      "Invest in your daughter's future with SSY. 8.2% Interest, EEE Tax Benefits, and complete safety. Read the 2025 rules here.",
    type: 'article',
    url: 'https://fincado.com/guides/sukanya-samriddhi-yojana-guide-2025/',
    images: [
      {
        url: '/images/guides/ssy/ssy-guide-hero.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'Can NRI parents open an SSY account?',
    answer:
      'No, only resident Indians can open SSY accounts. If the girl child or guardian becomes an NRI after opening the account, it must be closed.',
  },
  {
    question: 'Can I have an SSY account for 3 daughters?',
    answer:
      'Generally, the limit is 2 accounts per family. However, a third account is allowed if the second delivery results in twins or triplets, supported by medical proof.',
  },
  {
    question: 'What happens if I deposit more than ₹1.5 lakh in a year?',
    answer:
      'Any amount deposited exceeding the ₹1.5 lakh limit in a financial year will not be accepted or will be returned to you without earning any interest.',
  },
  {
    question: 'Can I transfer my SSY account to another bank?',
    answer:
      'Yes, SSY accounts can be transferred easily from a Post Office to a Bank or vice versa, and between branches anywhere in India.',
  },
  {
    question: 'Is SSY better than FD for a girl child?',
    answer:
      'Yes, SSY is generally better because it offers a higher interest rate (8.2%), complete tax exemption (EEE status), and sovereign guarantee, unlike FDs which have taxable interest.',
  },
];

export default function SSYGuide() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sukanya Samriddhi Yojana (SSY) Guide 2026: Rules & Interest',
    description:
      'Complete guide to SSY 2026: Eligibility, 8.2% interest rate, calculator, withdrawal rules, and tax benefits.',
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
    datePublished: '2026-01-01',
    dateModified: '2026-01-01',
    image: 'https://fincado.com/images/guides/ssy/ssy-guide-hero.webp',
  };

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'SSY Guide 2025',
            url: 'https://fincado.com/guides/sukanya-samriddhi-yojana-guide-2025/',
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-pink-100 text-pink-800 hover:bg-pink-200 px-3 py-1"
        >
          Government Schemes
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Sukanya Samriddhi Yojana 2026: Rules, Interest & Benefits
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 10 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Jan 2026</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="Sukanya Samriddhi Yojana 2026 Guide" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Choosing the <strong>best investment for your girl child</strong> is one of the most important financial decisions Indian parents face. With options like <strong>Sukanya Samriddhi Yojana (SSY)</strong> offering 8.2% guaranteed returns and Mutual Funds delivering 12-14% growth, the choice requires careful planning.</p>
            <p>This guide compares <strong>SSY vs PPF vs Mutual Funds</strong> head-to-head, analyzes the <strong>21-year lock-in</strong>, and reveals the strategic <strong>"60-40 Rule"</strong> to secure your daughter's education and marriage goals.</p>`}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-pink-50 rounded-lg overflow-hidden border border-slate-100">
            <Image
              src="/images/guides/ssy/ssy-concept-hero.webp"
              alt="Sukanya Samriddhi Yojana Concept Illustration"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="ssy-guide-top" type="leaderboard" />
      </div>

      {/* --- SECTION 1: WHAT IS SSY --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Baby className="h-6 w-6 text-pink-600" /> What is Sukanya Samriddhi
          Yojana?
        </h2>

        <WikiText
          content={`<p><strong>Sukanya Samriddhi Yojana (SSY)</strong> is a government-backed savings scheme launched as part of the *Beti Bachao, Beti Padhao* campaign. It is designed to build a corpus for a girl child's education and marriage expenses. It currently offers the <strong>highest interest rate</strong> among all small savings schemes in India.</p>`}
        />

        <Card className="border-slate-200 mt-6">
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Interest Rate:</strong> 8.2% p.a. (Tax-Free)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Tenure:</strong> 21 Years (or until marriage)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Wallet className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Deposit:</strong> Min ₹250 / Max ₹1.5 Lakh per year
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Tax Benefit:</strong> EEE Status (Section 80C)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="ssy-guide-eligibility-rect" type="box" />
      </div>

      {/* --- SECTION 2: ELIGIBILITY --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" /> Eligibility &
          Account Rules
        </h2>

        {/* DIAGRAM TRIGGER */}
        <div className="mb-6"></div>

        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900">
              Who Can Open an Account?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>
                  <strong>Girl Child:</strong> Must be below 10 years of age at
                  the time of account opening.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>
                  <strong>Guardian:</strong> A parent or legal guardian can open
                  and operate the account until the girl turns 18.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>
                  <strong>Limit:</strong> Maximum 2 accounts per family (one for
                  each girl child). Exception: 3 accounts allowed in case of
                  twins/triplets.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 3: DEPOSIT RULES --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-blue-600" /> Deposit Limits & Rules
        </h2>

        {/* IMAGE: Deposit Limits */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/ssy/ssy-deposit-rules.webp"
            alt="SSY Deposit Limits and Tenure Explained"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                Minimum Deposit
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2 font-bold text-2xl text-blue-700">₹250</p>
              <p>
                Per financial year. A penalty of ₹50 is levied if the minimum
                deposit is missed.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Maximum Deposit
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2 font-bold text-2xl text-emerald-700">
                ₹1.5 Lakh
              </p>
              <p>
                Per financial year. Amount qualifies for deduction under Section
                80C.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700">
          <strong>Important Note:</strong> You only need to make deposits for{' '}
          <strong>15 years</strong> from the account opening date. The account
          continues to earn interest until maturity (21 years), even without new
          deposits in the last 6 years.
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="ssy-guide-mid-banner" type="leaderboard" />
      </div>

      {/* --- SECTION 4: INTEREST RATE --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-600" /> Interest Rate
          (8.2%)
        </h2>

        {/* DIAGRAM TRIGGER */}
        <div className="mb-6"></div>

        <Card className="border-emerald-200 bg-emerald-50/20 mb-6">
          <CardHeader className="pb-2 border-b border-emerald-100">
            <CardTitle className="text-emerald-900 text-lg">
              Current Rate: 8.2% p.a.
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-emerald-800">
            Compounded annually. Rates are reviewed and revised quarterly by the
            Government of India.
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Period
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Interest Rate
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Q4 FY 2024-25 (Jan-Mar)</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  8.2%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Q3 FY 2024-25 (Oct-Dec)</TableCell>
                <TableCell>8.2%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>FY 2023-24</TableCell>
                <TableCell>8.0%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/sukanya-samriddhi/"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Calculate SSY Returns
          </Link>
        </div>
      </section>

      {/* --- SECTION 5: WITHDRAWAL --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" /> Withdrawal Rules
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6 text-sm text-slate-700">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-amber-100 p-2 rounded-full h-8 w-8 flex items-center justify-center text-amber-700 font-bold text-xs">
                  1
                </div>
                <div>
                  <strong>Partial Withdrawal (Education):</strong> Allowed only
                  after the girl child turns 18 or passes 10th standard. Maximum
                  50% of the balance at the end of the preceding financial year.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-amber-100 p-2 rounded-full h-8 w-8 flex items-center justify-center text-amber-700 font-bold text-xs">
                  2
                </div>
                <div>
                  <strong>Premature Closure (Marriage):</strong> Allowed after
                  the girl turns 18 for marriage expenses. Proof of marriage is
                  required.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-amber-100 p-2 rounded-full h-8 w-8 flex items-center justify-center text-amber-700 font-bold text-xs">
                  3
                </div>
                <div>
                  <strong>Maturity:</strong> The account matures 21 years from
                  the date of opening. The full amount (Principal + Interest) is
                  paid tax-free.
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="ssy-guide-withdrawal-rect" type="box" />
      </div>

      {/* --- SECTION 6: TAX BENEFITS --- */}
      <section className="mb-12">
        <h2
          id="tax-benefits"
          className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Tax Benefits: EEE
          Status
        </h2>

        {/* IMAGE: EEE Tax Benefit */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/ssy/ssy-eee-tax-benefit.webp"
            alt="EEE Tax Benefit Explained for Sukanya Samriddhi"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-6">
            <WikiText
              content={`<p class="mb-4 text-emerald-900">SSY falls under the <strong>EEE (Exempt-Exempt-Exempt)</strong> category, making it one of the most tax-efficient investment vehicles in India.</p>`}
            />
            <ul className="space-y-2 text-sm text-emerald-900">
              <li className="flex justify-between border-b border-emerald-200 pb-2">
                <span>
                  <strong>Investment:</strong>
                </span>
                <span>Section 80C Deduction (up to ₹1.5L)</span>
              </li>
              <li className="flex justify-between border-b border-emerald-200 pb-2">
                <span>
                  <strong>Interest Earned:</strong>
                </span>
                <span>100% Tax-Free</span>
              </li>
              <li className="flex justify-between">
                <span>
                  <strong>Maturity Amount:</strong>
                </span>
                <span>100% Tax-Free</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="ssy-guide-tax-banner" type="leaderboard" />
      </div>

      {/* --- SECTION 7: COMPARISON --- */}
      <section className="mb-12">
        <h2
          id="comparison"
          className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2"
        >
          <Scale className="h-6 w-6 text-purple-600" /> Comparison: SSY vs PPF
          vs Mutual Funds
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
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
                  Interest/Return
                </TableCell>
                <TableCell className="text-pink-600 font-bold">
                  8.2% (Fixed)
                </TableCell>
                <TableCell>7.1% (Fixed)</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  12-14% (Variable)
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
                  Liquid (No Lock-in)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Tax Benefit
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  EEE (Free)
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  EEE (Free)
                </TableCell>
                <TableCell>LTCG (12.5% {'>'} 1.25L)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 8: 60-40 RULE --- */}
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
              Don&apos;t choose just one. Allocate <strong>60% to SSY</strong>{' '}
              for safety (Education base) and{' '}
              <strong>40% to Equity SIPs</strong> for growth (Marriage/Higher
              Studies).
            </p>
            <div className="bg-white p-3 rounded border border-purple-200">
              <strong>Projected Result (18 Years):</strong>
              <br />
              Invest ₹1.5L/yr → <strong>SSY Corpus:</strong> ~₹70 Lakhs (Safe)
              <br />
              Invest ₹1L/yr → <strong>MF Corpus:</strong> ~₹90 Lakhs (Growth @
              12%)
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="ssy-guide-maturity-rect" type="box" />
      </div>

      {/* --- SECTION 9: MATURITY EXAMPLES --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20">
          Maturity Corpus Examples (SSY @ 8.2%)
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Annual Deposit
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Total Invested (15 Yrs)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Maturity Amount (21 Yrs)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>₹50,000</TableCell>
                <TableCell>₹7.5 Lakhs</TableCell>
                <TableCell>~₹23 Lakhs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹1,00,000</TableCell>
                <TableCell>₹15 Lakhs</TableCell>
                <TableCell>~₹46 Lakhs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>₹1,50,000</TableCell>
                <TableCell>₹22.5 Lakhs</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  ~₹69 Lakhs
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
              No. An SSY account can only be opened for a girl child{' '}
              <strong>below 10 years</strong> of age. If she is older, consider
              PPF or Children&apos;s Mutual Funds.
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
              No. The government revises the interest rate{' '}
              <strong>quarterly</strong>. Your balance earns the prevailing rate
              for that quarter.
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
            If you have a daughter below 10 years,{' '}
            <strong>SSY should be your first choice</strong> for the safety
            component of her portfolio. It offers the highest government-backed
            interest rate and zero risk.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Open SSY
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Max Out
              ₹1.5L
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Start SIP
              (40%)
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Interest rates and rules are subject to
          change by the Government of India. This guide is for educational
          purposes. Please consult a financial advisor for personalized
          planning.
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
              href="/sukanya-samriddhi/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-pink-700 transition hover:bg-pink-50 shadow-lg"
            >
              SSY Calculator
            </Link>
            <Link
              href="/sip-calculator/"
              className="rounded-lg border border-pink-400 bg-pink-800/30 px-8 py-4 font-bold text-white transition hover:bg-pink-800/50"
            >
              SIP Calculator
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print mt-8">
        <AdSlot id="ssy-guide-bottom" type="leaderboard" />
      </div>
    </article>
  );
}
