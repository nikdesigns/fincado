import type { Metadata } from 'next';
import Image from 'next/image';
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
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  User,
  Lightbulb,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Credit Score Guide 2025: How CIBIL Score Works in India',
  description:
    'Complete Credit Score Guide India 2025: Understand CIBIL score, factors affecting your rating, 30% credit utilization rule, improve score from 600 to 750+, myths debunked & step-by-step fix strategy.',
  keywords: [
    'credit score India',
    'CIBIL score',
    'how to improve credit score',
    'credit score range',
    'CIBIL vs Experian',
    'credit utilization ratio',
    'credit score myths',
    'improve CIBIL score fast',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/how-credit-score-affects-loans/',
  },
  openGraph: {
    title: 'Credit Score Guide 2025 | Master Your CIBIL Score',
    description:
      'Everything you need to know about CIBIL, improving your score, and getting approved for loans.',
    url: 'https://fincado.com/guides/how-credit-score-affects-loans/',
    type: 'article',
    images: [
      {
        url: '/images/og/credit-score-guide.webp',
        width: 1200,
        height: 630,
        alt: 'Credit Score Guide India 2025',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is a good credit score in India?',
    answer:
      'A score of 750 or above is considered "Very Good" to "Excellent" in India. Scores in this range get 90%+ loan approval rates and best interest rates.',
  },
  {
    question: 'Is CIBIL and credit score the same thing?',
    answer:
      'No. CIBIL is one of four credit bureaus in India. "Credit score" is the general term for the 300-900 number. However, CIBIL has 90% market share, so "CIBIL score" is commonly used to refer to any credit score.',
  },
  {
    question: 'How does credit utilization ratio affect my credit score?',
    answer:
      'Credit utilization accounts for 30% of your score. Keep it below 30% for optimal scoring. Utilization above 50% can drop your score by 40-60 points.',
  },
  {
    question: 'Can I improve my credit score from 600 to 750 in 6 months?',
    answer:
      "It's challenging but possible if you reduce utilization below 30% immediately, make 100% on-time payments, and remove errors. Realistic improvement is 80-120 points.",
  },
  {
    question: 'Does checking my own credit score reduce it?',
    answer:
      'No, this is a myth. Checking your own score is a "soft inquiry" and has ZERO impact on your score.',
  },
  {
    question: 'How long does a late payment stay on my credit report?',
    answer:
      'Late payments stay on your credit report for 3 years (for delays under 90 days) and up to 7 years (for defaults). Their impact decreases over time with good behavior.',
  },
  {
    question: 'Will closing my credit card improve my credit score?',
    answer:
      'No, closing credit cards usually hurts your score because it reduces your total available credit (increasing utilization %) and decreases average credit history length.',
  },
];

export default function CreditScoreGuidePage() {
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
              'Credit Score Guide 2025: How CIBIL Score Works in India (Complete Handbook)',
            description:
              'Complete guide to understanding, improving, and mastering your CIBIL score in India for 2025.',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: '/logo.png',
              },
            },
            datePublished: '2025-12-15',
            dateModified: '2025-12-15',
          }),
        }}
      />

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Credit Score Guide',
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
          Flagship Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Credit Score Guide 2025-26: How CIBIL Works in India
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 20 Min Read
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
          <ShareTools title="Credit Score Guide 2025: How CIBIL Works in India" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>A <strong>credit score</strong> is a three-digit number (300-900) that represents your creditworthiness and financial discipline. Think of it as your financial report card that lenders (banks, NBFCs, credit card companies) check before approving any loan or credit card application.</p>`}
          />

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" /> Why It Matters
            </h3>
            <ul className="space-y-1 text-sm text-slate-600 list-disc pl-4">
              <li>
                <strong>Loan Approval:</strong> 750+ score = 90% approval rate.
              </li>
              <li>
                <strong>Interest Rate:</strong> Save ₹3-8 lakh on loans.
              </li>
              <li>
                <strong>Credit Card Limit:</strong> Higher limits for better
                scores.
              </li>
              <li>
                <strong>Pre-Approved Offers:</strong> Instant loans for 750+.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* --- REAL WORLD EXAMPLE --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <User className="h-6 w-6 text-emerald-600" /> Real-World Impact
          Example
        </h2>
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900">
              Two Friends Apply for ₹30 Lakh Home Loan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-bold text-slate-900">
                    Factor
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Rohan (CIBIL 810)
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Amit (CIBIL 650)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Loan Approved?</TableCell>
                  <TableCell className="text-emerald-600 font-medium">
                    Yes, instantly
                  </TableCell>
                  <TableCell className="text-amber-600 font-medium">
                    Yes, with delays
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Interest Rate</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    8.50%
                  </TableCell>
                  <TableCell className="text-red-600 font-bold">
                    10.50%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Processing Fee</TableCell>
                  <TableCell>Waived</TableCell>
                  <TableCell>₹30,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Interest</TableCell>
                  <TableCell>₹32.48 lakh</TableCell>
                  <TableCell>₹42.60 lakh</TableCell>
                </TableRow>
                <TableRow className="bg-red-50">
                  <TableCell className="font-bold text-slate-900">
                    Extra Cost
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="text-red-700 font-bold">
                    ₹10.42 lakh more!
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* --- TOC --- */}
      <Card className="mb-12 border-slate-200 bg-slate-50/50 no-print">
        <CardContent className="p-6">
          <p className="mb-4 text-lg font-bold text-slate-900">
            Table of Contents
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
            <li>
              <a
                href="#bureaus"
                className="hover:text-blue-600 hover:underline"
              >
                1. CIBIL vs Experian vs Equifax
              </a>
            </li>
            <li>
              <a
                href="#score-range"
                className="hover:text-blue-600 hover:underline"
              >
                2. Credit Score Range Explained
              </a>
            </li>
            <li>
              <a
                href="#factors"
                className="hover:text-blue-600 hover:underline"
              >
                3. Factors Affecting Credit Score
              </a>
            </li>
            <li>
              <a
                href="#emi-impact"
                className="hover:text-blue-600 hover:underline"
              >
                4. EMI Payment Impact
              </a>
            </li>
            <li>
              <a
                href="#utilization-rule"
                className="hover:text-blue-600 hover:underline"
              >
                5. The 30% Utilization Rule
              </a>
            </li>
            <li>
              <a
                href="#timelines"
                className="hover:text-blue-600 hover:underline"
              >
                6. Improvement Timelines
              </a>
            </li>
            <li>
              <a href="#myths" className="hover:text-blue-600 hover:underline">
                7. Credit Score Myths Debunked
              </a>
            </li>
            <li>
              <a
                href="#action-plan"
                className="hover:text-blue-600 hover:underline"
              >
                8. Step-by-Step Fix Strategy
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-blue-600 hover:underline">
                9. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-credit-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: BUREAUS --- */}
      <section className="mb-12">
        <h2
          id="bureaus"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <FileText className="h-6 w-6 text-indigo-600" /> CIBIL vs Others:
          Understanding Bureaus
        </h2>
        <p className="mb-6 text-slate-700">
          India has four RBI-licensed Credit Information Companies (CICs). While
          CIBIL is the most popular, understanding all four helps.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  CIBIL
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Experian
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Equifax
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Score Range
                </TableCell>
                <TableCell>300-900</TableCell>
                <TableCell>300-900</TableCell>
                <TableCell>300-900</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Market Share
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  90%
                </TableCell>
                <TableCell>6%</TableCell>
                <TableCell>3%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Used By
                </TableCell>
                <TableCell>Major Banks</TableCell>
                <TableCell>Fintechs</TableCell>
                <TableCell>Credit Cards</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm text-indigo-900">
          <strong>Key Insight:</strong> Your scores may differ across bureaus
          due to reporting differences. Always check CIBIL first as it&apos;s
          the industry standard.
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-credit-2" type="leaderboard" />
      </div>

      {/* --- SECTION 2: SCORE RANGE --- */}
      <section className="mb-12">
        <h2
          id="score-range"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-teal-600" /> Credit Score Range
          Explained
        </h2>

        {/* IMAGE: Score Ranges */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/credit-score/cibil-score-ranges.webp"
            alt="Chart showing credit score ranges from poor to excellent"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Range
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Rating
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Approval Rate
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>300-549</TableCell>
                <TableCell className="text-red-600 font-bold">Poor</TableCell>
                <TableCell>5-10%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>550-649</TableCell>
                <TableCell className="text-orange-600 font-medium">
                  Average
                </TableCell>
                <TableCell>30-40%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>650-699</TableCell>
                <TableCell className="text-yellow-600 font-medium">
                  Fair
                </TableCell>
                <TableCell>50-60%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>700-749</TableCell>
                <TableCell className="text-lime-600 font-medium">
                  Good
                </TableCell>
                <TableCell>75-85%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>750-799</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Very Good
                </TableCell>
                <TableCell>90-95%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>800-900</TableCell>
                <TableCell className="text-green-700 font-bold">
                  Excellent
                </TableCell>
                <TableCell>95-99%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-credit-3" type="leaderboard" />
      </div>

      {/* --- SECTION 3: FACTORS --- */}
      <section className="mb-12">
        <h2
          id="factors"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-purple-600" /> Factors Affecting
          Credit Score
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Factor
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Weightage
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  What It Measures
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Payment History
                </TableCell>
                <TableCell className="font-bold text-slate-900">35%</TableCell>
                <TableCell>On-time EMI/card payments</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Credit Utilization
                </TableCell>
                <TableCell className="font-bold text-slate-900">30%</TableCell>
                <TableCell>% of credit limit used</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  History Length
                </TableCell>
                <TableCell className="font-bold text-slate-900">15%</TableCell>
                <TableCell>Age of oldest account</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Credit Mix
                </TableCell>
                <TableCell className="font-bold text-slate-900">10%</TableCell>
                <TableCell>Secured vs Unsecured mix</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Inquiries
                </TableCell>
                <TableCell className="font-bold text-slate-900">10%</TableCell>
                <TableCell>Hard inquiries in last 6-12 months</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Card className="border-slate-200 bg-slate-50/50">
          <CardContent className="pt-6">
            <h3 className="font-bold text-slate-900 mb-2">
              The Payment History Trap (35%)
            </h3>
            <ul className="space-y-1 text-sm text-slate-700 list-disc pl-4">
              <li>
                <strong>1-30 days late:</strong> -50 to -80 points (Stays 3 yrs)
              </li>
              <li>
                <strong>31-60 days late:</strong> -80 to -120 points (Stays 3
                yrs)
              </li>
              <li>
                <strong>90+ days late:</strong> -150 to -200 points (Stays 7
                yrs)
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-credit-4" type="leaderboard" />
      </div>

      {/* --- SECTION 4: EMI IMPACT --- */}
      <section className="mb-12">
        <h2
          id="emi-impact"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Clock className="h-6 w-6 text-blue-600" /> EMI Payment Impact
        </h2>
        <p className="mb-6 text-slate-700">
          Since payment history accounts for 35%, consistency is key.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Duration
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Improvement
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Effect
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>3 months</TableCell>
                <TableCell className="text-emerald-600">+10 to +20</TableCell>
                <TableCell>Establishes pattern</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>6 months</TableCell>
                <TableCell className="text-emerald-600">+25 to +40</TableCell>
                <TableCell>Builds trust</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>12 months</TableCell>
                <TableCell className="text-emerald-600">+50 to +80</TableCell>
                <TableCell>Strong positive signal</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-900">
          <strong>Tip:</strong> ALWAYS pay full credit card bill. Minimum
          payment technically counts as on-time but keeps utilization high (bad
          for score) and incurs huge interest.
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="guide-credit-5" type="leaderboard" />
      </div>

      {/* --- SECTION 5: UTILIZATION RULE --- */}
      <section className="mb-12">
        <h2
          id="utilization-rule"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <CreditCard className="h-6 w-6 text-orange-500" /> The 30% Utilization
          Rule
        </h2>
        <p className="mb-6 text-slate-700">
          Maintain credit utilization <strong>BELOW 30%</strong> always.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Utilization
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Impact
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Perception
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>0-10%</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  +10 to +20
                </TableCell>
                <TableCell>Excellent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>11-30%</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  +5 to +10
                </TableCell>
                <TableCell>Good</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>31-50%</TableCell>
                <TableCell className="text-amber-600 font-medium">
                  Neutral
                </TableCell>
                <TableCell>Acceptable</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>51-70%</TableCell>
                <TableCell className="text-red-600 font-medium">
                  -20 to -40
                </TableCell>
                <TableCell>Risky</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>71-90%</TableCell>
                <TableCell className="text-red-600 font-bold">
                  -50 to -80
                </TableCell>
                <TableCell>High Risk</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Wins</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <strong>Pay Early:</strong> Pay before statement generation
                date.
              </li>
              <li>
                <strong>Increase Limit:</strong> Ask bank to hike limit (lowers
                ratio).
              </li>
              <li>
                <strong>Split Expense:</strong> Use multiple cards for big buys.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 6: TIMELINES --- */}
      <section className="mb-12">
        <h2
          id="timelines"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Clock className="h-6 w-6 text-slate-600" /> Improvement Timelines
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Start
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Target
                </TableHead>
                <TableHead className="font-bold text-slate-900">Time</TableHead>
                <TableHead className="font-bold text-slate-900">
                  Required Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>300-500</TableCell>
                <TableCell>650</TableCell>
                <TableCell>24-36 mo</TableCell>
                <TableCell>Settle all defaults</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>550-600</TableCell>
                <TableCell>700</TableCell>
                <TableCell>12-18 mo</TableCell>
                <TableCell>Clear dues, on-time pay</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>650-680</TableCell>
                <TableCell>750</TableCell>
                <TableCell>6-12 mo</TableCell>
                <TableCell>Reduce utilization</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>700-730</TableCell>
                <TableCell>780</TableCell>
                <TableCell>3-6 mo</TableCell>
                <TableCell>Optimize utilization</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="guide-credit-6" type="leaderboard" />
      </div>

      {/* --- SECTION 7: MYTHS --- */}
      <section className="mb-12">
        <h2
          id="myths"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-red-500" /> Myths Debunked
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800 font-bold">
                Myth 1: High Salary = High Score
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Income doesn&apos;t affect score. A CEO
              who defaults has a low score.
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800 font-bold">
                Myth 2: Checking Score Lowers It
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Self-checks are soft inquiries with ZERO
              impact.
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800 font-bold">
                Myth 3: Closing Cards Helps
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Closing cards reduces limit & history
              length, hurting score.
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800 font-bold">
                Myth 4: No Loan = Good Score
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> No history means &quot;No Score&quot;
              (NH), viewed as high risk.
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800 font-bold">
                Myth 5: Settlement is Good
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Settlement marks default. Stays on
              report for 7 years.
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-800 font-bold">
                Myth 6: Co-Signing is Safe
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> If primary borrower defaults, YOUR score
              drops too.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print my-8">
        <AdSlot id="guide-credit-7" type="leaderboard" />
      </div>

      {/* --- SECTION 8: ACTION PLAN --- */}
      <section className="mb-12">
        <h2
          id="action-plan"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Step-by-Step Fix
          Strategy
        </h2>

        <div className="space-y-6">
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                Phase 1: Assess (Week 1)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Download reports from all bureaus.</li>
                <li>Review all entries for errors.</li>
                <li>File disputes for incorrect data.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-lg">
                Phase 2: Damage Control (Month 1-2)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Set auto-debit for EMIs.</li>
                <li>Pay cards in full.</li>
                <li>Reduce utilization below 30%.</li>
                <li>Freeze new applications.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Phase 3: Rebuild (Month 3-12)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Zero late payments.</li>
                <li>Snowball debt repayment.</li>
                <li>Optimize credit mix.</li>
              </ul>
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
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Conclusion
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

      {/* --- AUTHOR & DISCLAIMER --- */}
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

      {/* 💰 AD SLOT 8 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-boost-credit-8" type="leaderboard" />
      </div>
    </article>
  );
}
