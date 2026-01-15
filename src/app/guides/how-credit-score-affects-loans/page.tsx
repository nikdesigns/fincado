import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
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
  CreditCard,
  AlertOctagon,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Ban,
  Wallet,
  FileSearch,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: '7 Proven Ways to Increase Your CIBIL Score Above 750 | Fincado',
  description:
    'Struggling with a low credit score? Here are 7 actionable strategies to repair your CIBIL score, remove errors, and qualify for lower interest rate loans in 2025.',
  keywords: [
    'improve cibil score',
    'increase credit score india',
    'credit repair tips',
    'cibil score above 750',
    'fix low credit score',
    'credit utilization ratio',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/how-credit-score-affects-loans/',
  },
  openGraph: {
    title: '7 Proven Ways to Increase Your CIBIL Score Above 750',
    description:
      'Master your credit profile with these 7 proven strategies. Fix errors, lower utilization, and get approved fast.',
    url: 'https://fincado.com/guides/how-credit-score-affects-loans/',
    type: 'article',
    images: [
      {
        url: 'https://fincado.com/images/og/credit-score-guide.webp',
        width: 1200,
        height: 630,
        alt: 'How to Improve CIBIL Score',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'How fast can I increase my CIBIL score?',
    answer:
      'It typically takes 3 to 6 months to see a significant improvement in your CIBIL score if you pay off dues and lower your credit utilization below 30%.',
  },
  {
    question: 'Does checking my own score lower it?',
    answer:
      'No. Checking your own CIBIL score is considered a "soft inquiry" and has absolutely no impact on your score.',
  },
  {
    question: 'Can I remove a settlement status from my CIBIL report?',
    answer:
      'You can remove a "Settled" status by paying the remaining outstanding amount to the lender and obtaining a "No Due Certificate" (NDC), then asking them to update CIBIL.',
  },
];

export default function BoostCreditScorePage() {
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
            headline: '7 Proven Ways to Increase Your CIBIL Score Above 750',
            description:
              'Actionable guide to improving your CIBIL score in India for 2025.',
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
            datePublished: '2025-12-16',
            dateModified: '2025-12-16',
          }),
        }}
      />

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Boost Credit Score',
            url: 'https://fincado.com/guides/how-credit-score-affects-loans/',
          },
        ]}
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
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Actionable Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          7 Proven Ways to Increase Your CIBIL Score Above 750
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 8 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Expert Reviewed
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="7 Proven Ways to Increase Your CIBIL Score Above 750" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>A <strong>CIBIL score above 750</strong> is the golden ticket to quick loan approvals and the lowest interest rates. If your score is stuck in the 600s, you might face rejections or be forced to pay 2-3% higher interest.</p>
            <p>The good news? Your score is not permanent. With disciplined financial habits, you can repair it.</p>`}
          />
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
                href="#timely-payments"
                className="hover:text-blue-600 hover:underline"
              >
                1. Pay Dues on Time
              </a>
            </li>
            <li>
              <a
                href="#utilization"
                className="hover:text-blue-600 hover:underline"
              >
                2. The 30% Utilization Rule
              </a>
            </li>
            <li>
              <a
                href="#old-cards"
                className="hover:text-blue-600 hover:underline"
              >
                3. Don&apos;t Close Old Cards
              </a>
            </li>
            <li>
              <a
                href="#credit-mix"
                className="hover:text-blue-600 hover:underline"
              >
                4. Diversify Your Credit Mix
              </a>
            </li>
            <li>
              <a href="#errors" className="hover:text-blue-600 hover:underline">
                5. Check Report for Errors
              </a>
            </li>
            <li>
              <a
                href="#inquiries"
                className="hover:text-blue-600 hover:underline"
              >
                6. Avoid Multiple Applications
              </a>
            </li>
            <li>
              <a
                href="#patience"
                className="hover:text-blue-600 hover:underline"
              >
                7. Be Patient & Consistent
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-blue-600 hover:underline">
                FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-boost-credit-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: PAYMENTS --- */}
      <section className="mb-12">
        <h2
          id="timely-payments"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Clock className="h-6 w-6 text-emerald-600" /> 1. Pay Dues on Time,
          Every Time
        </h2>
        <p className="mb-4 text-slate-700">
          Your payment history accounts for roughly{' '}
          <strong>35% of your CIBIL score</strong>. It is the single most
          important factor.
        </p>

        <Card className="border-red-100 bg-red-50/30 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-800 text-lg flex items-center gap-2">
              <AlertOctagon className="h-5 w-5" /> The Impact of One Missed
              Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            A single delay of over 30 days can drop your score by{' '}
            <strong>50-80 points</strong>. It stays on your report for up to 3
            years.
          </CardContent>
        </Card>

        <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-100">
          <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Action Plan
          </h4>
          <ul className="space-y-2 text-sm text-emerald-800">
            <li>• Set up auto-debit for all EMIs and Credit Card bills.</li>
            <li>
              • Ensure your bank account is funded 2 days before the due date.
            </li>
            <li>
              • If you miss a date, pay immediately (within 1-2 days) to avoid
              reporting.
            </li>
          </ul>
        </div>
      </section>

      {/* --- SECTION 2: UTILIZATION --- */}
      <section className="mb-12">
        <h2
          id="utilization"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <CreditCard className="h-6 w-6 text-blue-600" /> 2. Keep Credit
          Utilization Low (Under 30%)
        </h2>
        <p className="mb-6 text-slate-700">
          Just because you have a credit limit of ₹1 Lakh doesn&apos;t mean you
          should spend it all. High utilization signals &quot;credit
          hunger&quot;.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Utilization %
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Score Impact
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>0-30%</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Positive
                </TableCell>
                <TableCell>Excellent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>31-50%</TableCell>
                <TableCell className="text-amber-600 font-medium">
                  Neutral
                </TableCell>
                <TableCell>Acceptable</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>50%+</TableCell>
                <TableCell className="text-red-600 font-bold">
                  Negative
                </TableCell>
                <TableCell>High Risk</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p className="text-sm text-slate-500 italic">
          <strong>Pro Tip:</strong> If you need to spend more, request your bank
          to increase your credit limit. This automatically lowers your
          utilization ratio.
        </p>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-boost-credit-2" type="leaderboard" />
      </div>

      {/* --- SECTION 3: OLD CARDS --- */}
      <section className="mb-12">
        <h2
          id="old-cards"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-amber-600" /> 3. Don&apos;t Close Old
          Credit Cards
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <p className="mb-4 text-slate-700">
              Closing an old card can hurt your score in two ways:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 marker:font-bold">
              <li>
                <strong>Reduces History Length:</strong> A longer history (e.g.,
                5+ years) proves stability. Closing your oldest card shortens
                your average history.
              </li>
              <li>
                <strong>Increases Utilization:</strong> Closing a card removes
                its limit from your total pool, instantly spiking your
                utilization on remaining cards.
              </li>
            </ol>
            <div className="mt-4 p-3 bg-amber-50 rounded text-amber-900 text-sm">
              <strong>Strategy:</strong> Keep the card active by using it for
              one small subscription (like Netflix) and set it to auto-pay.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 4: CREDIT MIX --- */}
      <section className="mb-12">
        <h2
          id="credit-mix"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-indigo-600" /> 4. Diversify Your
          Credit Mix
        </h2>
        <p className="mb-6 text-slate-700">
          Banks love a &quot;balanced&quot; borrower. Ideally, maintain a mix of
          secured and unsecured loans.
        </p>

        <Card className="bg-indigo-50 border-indigo-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-indigo-900 text-lg">
              Ideal Credit Mix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-indigo-800">
              <li className="flex gap-2 items-center">
                <CheckCircle2 className="h-4 w-4" /> 1 Secured Loan (Home or Car
                Loan)
              </li>
              <li className="flex gap-2 items-center">
                <CheckCircle2 className="h-4 w-4" /> 1-2 Unsecured Lines (Credit
                Cards)
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-boost-credit-3" type="leaderboard" />
      </div>

      {/* --- SECTION 5: ERRORS --- */}
      <section className="mb-12">
        <h2
          id="errors"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <FileSearch className="h-6 w-6 text-red-600" /> 5. Check Report for
          Errors
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-lg">
                Common Errors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Closed loan marked &quot;Active&quot;.</li>
                <li>Incorrect personal details merging files.</li>
                <li>Fraudulent loans in your name.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-900 text-lg">The Fix</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Download your CIBIL report annually. File a dispute on the CIBIL
              website immediately if you find discrepancies. They must resolve
              it within 30 days.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 6: INQUIRIES --- */}
      <section className="mb-12">
        <h2
          id="inquiries"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Ban className="h-6 w-6 text-slate-600" /> 6. Avoid Multiple
          Applications
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6 text-slate-700 text-sm">
            <p className="mb-2">
              Every time you apply for a loan, the lender makes a{' '}
              <strong>Hard Inquiry</strong>. This shaves off a few points.
            </p>
            <p>
              Applying for 4-5 cards in a month makes you look &quot;credit
              hungry&quot; and desperate for cash, scaring off lenders.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 7: PATIENCE --- */}
      <section className="mb-12">
        <h2
          id="patience"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> 7. Be Patient &
          Consistent
        </h2>
        <p className="mb-6 text-slate-700">
          Building credit is a marathon. Here is the realistic timeline:
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Action Taken
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Time to Reflect
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Paying off Credit Card Debt</TableCell>
                <TableCell>30-45 Days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Correcting Report Errors</TableCell>
                <TableCell>30-60 Days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Building History from Scratch</TableCell>
                <TableCell>6-12 Months</TableCell>
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
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Improving your CIBIL score is about discipline. A score of 750+ will
            save you lakhs in interest.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Check Errors
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Reduce Debt
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Stop
              Applying
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- AUTHOR BOX --- */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-slate-700">
            <div>
              <span className="block text-slate-500 text-xs uppercase tracking-wide font-bold mb-1">
                Written By
              </span>
              <span className="font-semibold text-slate-900">
                Fincado Research Team
              </span>
            </div>
            <div>
              <span className="block text-slate-500 text-xs uppercase tracking-wide font-bold mb-1">
                Reviewed By
              </span>
              <span className="font-semibold text-slate-900 flex items-center gap-1">
                Certified Financial Planner (India)
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px]">
                  ✓
                </span>
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          Disclaimer: This content is for educational purposes only and does not
          constitute financial advice.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Ready to improve your finances?
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Use our smart calculators to plan your loan repayments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/credit-score/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Check Score
            </Link>
            <Link
              href="/emi-calculator/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Calculate EMI
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-boost-credit-4" type="leaderboard" />
      </div>
    </article>
  );
}
