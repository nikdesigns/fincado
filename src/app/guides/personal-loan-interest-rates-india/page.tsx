import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear'; // ✅ add
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
  Percent,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Clock,
  Briefcase,
  User,
  Calculator,
  ArrowDownUp,
  Ban,
  Link as LinkIcon, // ✅ optional icon for internal links block
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title:
    'Personal Loan Interest Rates in India (2026): Bank vs NBFC Comparison',
  description:
    'Compare personal loan rates from top banks/NBFCs, flat vs reducing rate cost, CIBIL impact, and negotiation tips to reduce total interest.',
  keywords: [
    'personal loan interest rates india',
    'bank vs nbfc personal loan',
    'personal loan rate comparison',
    'flat vs reducing interest rate',
    'CIBIL score personal loan rate',
    'balance transfer personal loan',
    'personal loan EMI calculator'
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/personal-loan-interest-rates-india/',
  },
  openGraph: {
    title:
      'Personal Loan Interest Rates in India (2026): Bank vs NBFC Comparison',
    description:
      'Compare bank vs NBFC personal loan rates, understand true borrowing cost, and reduce interest with practical negotiation tips.',
    url: 'https://fincado.com/guides/personal-loan-interest-rates-india/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question:
      'What is the current personal loan interest rate range in India for 2026?',
    answer:
      'Personal loan interest rates in India range from 10.5% to 24% annually, depending on your credit score, income level, employment type, and lender category.',
  },
  {
    question: 'How much lower interest rate can I get with a 750+ CIBIL score?',
    answer:
      'A CIBIL score of 750+ can save you 2-4% in interest rates compared to scores below 700. On a ₹5 lakh loan, this saves ₹45,000-₹80,000.',
  },
  {
    question:
      'What is the difference between flat rate and reducing balance interest?',
    answer:
      'Flat rate calculates interest on the original principal throughout, while reducing balance calculates on decreasing outstanding amount. A 10% flat rate is approx 18-20% reducing balance rate.',
  },
  {
    question: 'Can I negotiate personal loan interest rates with banks?',
    answer:
      'Yes! With a good credit profile (750+ CIBIL, stable income), you can negotiate 0.5-2% rate reduction and lower processing fees.',
  },
  {
    question:
      'Is it wise to take a personal loan to invest in stocks or mutual funds?',
    answer:
      'No. Personal loan interest (14-24%) is a guaranteed cost, while investment returns are uncertain. This creates negative arbitrage and potential financial loss.',
  },
  {
    question:
      'What is a good personal loan rate for salaried borrowers in 2026?',
    answer:
      'For salaried borrowers with strong profiles (typically 750+ CIBIL, stable income, low FOIR), rates in the lower band of lender offers are generally considered good. In practical terms, compare at least 3 lenders and focus on total cost (rate + processing fee + insurance + prepayment terms), not just headline APR.',
  },
  {
    question: 'How much can balance transfer save on a ₹5 lakh personal loan?',
    answer:
      'If you shift from a higher rate to a meaningfully lower rate and the remaining tenure is sufficient, balance transfer can save thousands to lakhs depending on tenure and fee structure. Always compare: (old remaining interest) vs (new interest + transfer fees + foreclosure charges).',
  }
];

export default function PersonalLoanGuidePage() {
  const updatedLabel = getCurrentMonthYearLabel(); // ✅ dynamic fresh label
  const currentYear = new Date().getFullYear();
  const todayISO = new Date().toISOString().split('T')[0];

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Personal Loan Interest Rates',
            url: 'https://fincado.com/guides/personal-loan-interest-rates-india/', // ✅ fixed
          }
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
              'Personal Loan Interest Rates in India (2026): Bank vs NBFC Comparison',
            description:
              'Compare personal loan rates from top banks/NBFCs, flat vs reducing rate cost, CIBIL impact, and negotiation tips to reduce total interest.',
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
            dateModified: todayISO, // ✅ dynamic
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
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Flagship Guide
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Personal Loan Interest Rates in India ({currentYear}): Bank vs NBFC
          Comparison
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 18 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">{updatedLabel}</strong>{' '}
            {/* ✅ dynamic */}
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Fact-Checked
          </span>
        </div>
        <div className="mt-6">
          <ShareTools
            title={`Personal Loan Interest Rates Guide (${currentYear})`}
          />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>A <strong>personal loan</strong> is an unsecured loan provided by banks and NBFCs for any personal use—medical emergencies, weddings, vacations, debt consolidation, or business needs—without requiring collateral or security.</p>`}
          />

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-blue-600" /> Key
              Characteristics ({currentYear})
            </h3>
            <ul className="space-y-1 text-sm text-slate-600 list-disc pl-4">
              <li>
                <strong>Interest Rates:</strong> 10.5% - 24% p.a.
              </li>
              <li>
                <strong>Tenure:</strong> 1 to 5 years (12-60 months).
              </li>
              <li>
                <strong>Processing:</strong> 24-72 hours (Instant available).
              </li>
              <li>
                <strong>Collateral:</strong> None required (Unsecured).
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Summary Table */}
      {/* --- QUICK DECISION TABLE (NEW) --- */}
      <Card className="mb-10 border-slate-200 bg-slate-50/40 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Quick Snapshot: Best Rate Range by Credit Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Credit Score Band</TableHead>
                  <TableHead>Typical Rate Range</TableHead>
                  <TableHead>Best Lender Type</TableHead>
                  <TableHead>Expected Approval Speed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">750+</TableCell>
                  <TableCell>~10.5% – 13.5%</TableCell>
                  <TableCell>Top Banks / Prime NBFCs</TableCell>
                  <TableCell>24–72 hours</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">700–749</TableCell>
                  <TableCell>~12.5% – 16.5%</TableCell>
                  <TableCell>Banks + Large NBFCs</TableCell>
                  <TableCell>2–5 days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">650–699</TableCell>
                  <TableCell>~15% – 20%</TableCell>
                  <TableCell>NBFC-focused</TableCell>
                  <TableCell>3–7 days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">&lt;650</TableCell>
                  <TableCell>~18% – 24%+</TableCell>
                  <TableCell>Limited / Risk-based</TableCell>
                  <TableCell>Varies, stricter checks</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Ranges are indicative and vary by lender policy, income stability,
            FOIR, and city profile.
          </p>
        </CardContent>
      </Card>

      {/* --- TOC --- */}
      <Card className="mb-12 border-slate-200 bg-slate-50/50 no-print">
        <CardContent className="p-6">
          <p className="mb-4 text-lg font-semibold text-slate-900">
            Table of Contents
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
            <li>
              <a
                href="#rates-comparison"
                className="hover:text-blue-600 hover:underline"
              >
                1. Interest Rates (Banks/NBFCs)
              </a>
            </li>
            <li>
              <a
                href="#cibil-impact"
                className="hover:text-blue-600 hover:underline"
              >
                2. CIBIL Score Impact
              </a>
            </li>
            <li>
              <a
                href="#employment-type"
                className="hover:text-blue-600 hover:underline"
              >
                3. Salary vs Self-Employed
              </a>
            </li>
            <li>
              <a
                href="#flat-vs-reducing"
                className="hover:text-blue-600 hover:underline"
              >
                4. Flat vs Reducing Balance
              </a>
            </li>
            <li>
              <a
                href="#emi-tables"
                className="hover:text-blue-600 hover:underline"
              >
                5. EMI Comparison Tables
              </a>
            </li>
            <li>
              <a
                href="#negotiation"
                className="hover:text-blue-600 hover:underline"
              >
                6. How to Negotiate
              </a>
            </li>
            <li>
              <a
                href="#prepayment"
                className="hover:text-blue-600 hover:underline"
              >
                7. Prepayment Rules
              </a>
            </li>
            <li>
              <a
                href="#red-flags"
                className="hover:text-blue-600 hover:underline"
              >
                8. When NOT to Take a Loan
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

      {/* --- RELATED TOOLS & GUIDES (NEW INTERNAL LINKS) --- */}
      <Card className="mb-12 border-slate-200 bg-white no-print">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-blue-600" />
            Related Tools & Guides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            <li>
              <Link
                className="text-blue-700 hover:underline"
                href="/loans/personal-loan/"
              >
                Personal Loan EMI Calculator
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-700 hover:underline"
                href="/emi-calculator/"
              >
                General EMI Calculator
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-700 hover:underline"
                href="/credit-score/"
              >
                Check Credit Score (Estimator)
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-700 hover:underline"
                href="/guides/how-credit-score-affects-loans/"
              >
                How Credit Score Affects Loans
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-700 hover:underline"
                href="/guides/personal-loan-guide/"
              >
                Personal Loan Guide
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-700 hover:underline"
                href="/guides/personal-loan-interest-rates/"
              >
                Personal Loan Interest Rates (Legacy Guide)
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-700 hover:underline"
                href="/compare-loans/"
              >
                Loan Comparison Hub
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-700 hover:underline"
                href="/guides/emi-calculator-guide/"
              >
                EMI Calculator Guide
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-pl-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: RATES COMPARISON --- */}
      <section className="mb-12">
        <h2
          id="rates-comparison"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-emerald-600" /> Current Interest
          Rates ({currentYear})
        </h2>
        <p className="mb-6 text-slate-700">
          Interest rates vary significantly based on lender type. Here is the
          landscape for {updatedLabel}.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mb-3">Top Banks</h3>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-semibold text-slate-900">
                  Bank
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Rate Range
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Processing Fee
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>SBI</TableCell>
                <TableCell>11.15% - 15.00%</TableCell>
                <TableCell>1.5%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HDFC Bank</TableCell>
                <TableCell>10.50% - 24.00%</TableCell>
                <TableCell>Up to 2.5%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ICICI Bank</TableCell>
                <TableCell>10.75% - 19.00%</TableCell>
                <TableCell>Up to 2.25%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Axis Bank</TableCell>
                <TableCell>10.99% - 21.00%</TableCell>
                <TableCell>Up to 2%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-3">Top NBFCs</h3>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-semibold text-slate-900">
                  NBFC
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Rate Range
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Processing Fee
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Bajaj Finserv</TableCell>
                <TableCell>11.00% - 28.00%</TableCell>
                <TableCell>Up to 3.93%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tata Capital</TableCell>
                <TableCell>10.99% - 27.00%</TableCell>
                <TableCell>Up to 2.75%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Aditya Birla</TableCell>
                <TableCell>11.50% - 24.00%</TableCell>
                <TableCell>Up to 3%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-sm text-emerald-900">
          <strong>Insight:</strong> NBFCs charge 1-3% higher interest but offer
          faster approval (24-48 hours) and more lenient eligibility.
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-pl-2" type="leaderboard" />
      </div>

      {/* --- SECTION 2: CIBIL IMPACT --- */}
      <section className="mb-12">
        <h2
          id="cibil-impact"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-blue-600" /> Credit Score Impact
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`Your <strong>CIBIL score</strong> is the single most important factor determining your interest rate.`}
          />
        </div>

        {/* IMAGE: CIBIL vs Rate */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/personal-loan/cibil-vs-interest-rate.webp"
            alt="Graph showing how interest rates decrease as CIBIL score increases"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-semibold text-slate-900">
                  CIBIL Score
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Rate Impact
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Approval Chance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-emerald-600">
                  800-900
                </TableCell>
                <TableCell className="text-emerald-600">
                  Best (-3% discount)
                </TableCell>
                <TableCell>95%+</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-blue-600">
                  750-799
                </TableCell>
                <TableCell className="text-blue-600">
                  Prime (-2% discount)
                </TableCell>
                <TableCell>90%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-amber-600">
                  650-699
                </TableCell>
                <TableCell className="text-amber-600">
                  Higher (+2-3% premium)
                </TableCell>
                <TableCell>50%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-red-600">
                  &lt; 600
                </TableCell>
                <TableCell className="text-red-600">Max rates</TableCell>
                <TableCell>10-15%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Card className="border-red-100 bg-red-50/20">
          <CardHeader className="pb-2 border-b border-red-100">
            <CardTitle className="text-red-900 text-lg">
              The Cost of Low Score (₹5L Loan)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <p className="mb-2">
              <strong>Scenario:</strong> Borrower with 650 CIBIL vs 800 CIBIL.
            </p>
            <p className="mb-4">
              <strong>Rate Difference:</strong> 24% vs 11%.
            </p>
            <div className="bg-white p-3 rounded border border-red-200 text-center font-semibold text-red-800">
              Extra Interest Paid: ₹1.12 Lakh!
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-pl-3" type="leaderboard" />
      </div>

      {/* --- SECTION 3: EMPLOYMENT TYPE --- */}
      <section className="mb-12">
        <h2
          id="employment-type"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Briefcase className="h-6 w-6 text-indigo-600" /> Salary vs
          Self-Employed Rates
        </h2>
        <p className="mb-6 text-slate-700">
          Self-employed borrowers typically pay{' '}
          <strong>2-4% higher rates</strong>
          due to income variability.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-semibold text-slate-900">
                  Lender
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Salaried Rate
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Self-Employed Rate
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>PSU Banks</TableCell>
                <TableCell>11.4% - 15.5%</TableCell>
                <TableCell>13.5% - 17.8%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Private Banks</TableCell>
                <TableCell>10.5% - 19%</TableCell>
                <TableCell>12.5% - 22%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NBFCs</TableCell>
                <TableCell>11% - 24%</TableCell>
                <TableCell>13% - 28%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-pl-4" type="leaderboard" />
      </div>

      {/* --- SECTION 4: FLAT VS REDUCING --- */}
      <section className="mb-12">
        <h2
          id="flat-vs-reducing"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-red-600" /> The &quot;Flat
          Rate&quot; Trap
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`Some lenders advertise a "Flat Interest Rate" (e.g., 10%) which sounds cheaper than a bank's "Reducing Rate" (e.g., 12%). <strong>This is a marketing trick.</strong>`}
          />
        </div>

        {/* IMAGE: Flat vs Reducing */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/personal-loan/flat-vs-reducing-balance.webp"
            alt="Chart comparing total interest cost between flat rate and reducing balance methods"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-lg">The Trap</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2 font-medium">
                Dealer: &quot;10% Flat Rate&quot;
              </p>
              <p>
                You pay interest on the full principal for the entire tenure,
                even as you repay.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                The Reality
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2 font-medium">Effective: ~18% Reducing</p>
              <p>
                A 10% Flat Rate is actually equal to an{' '}
                <strong>~18% Reducing Rate</strong>. You pay double!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-sm text-red-900 text-center font-semibold">
          Verdict: Always ask for the Reducing Balance Rate (APR).
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="guide-pl-5" type="leaderboard" />
      </div>

      {/* --- SECTION 5: EMI TABLES --- */}
      <section className="mb-12">
        <h2
          id="emi-tables"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-slate-600" /> EMI Comparison Table
          (₹5 Lakh)
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-semibold text-slate-900">
                  Rate
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  1 Year EMI
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  3 Years EMI
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  5 Years EMI
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>11%</TableCell>
                <TableCell>₹43,974</TableCell>
                <TableCell>₹16,350</TableCell>
                <TableCell>₹10,867</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>14%</TableCell>
                <TableCell>₹44,532</TableCell>
                <TableCell>₹17,108</TableCell>
                <TableCell>₹11,654</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>17%</TableCell>
                <TableCell>₹45,095</TableCell>
                <TableCell>₹17,881</TableCell>
                <TableCell>₹12,472</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20%</TableCell>
                <TableCell>₹45,661</TableCell>
                <TableCell>₹18,670</TableCell>
                <TableCell>₹13,320</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>24%</TableCell>
                <TableCell>₹46,420</TableCell>
                <TableCell>₹19,745</TableCell>
                <TableCell>₹14,497</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="guide-pl-6" type="leaderboard" />
      </div>

      {/* --- SECTION 6: NEGOTIATION --- */}
      <section className="mb-12">
        <h2
          id="negotiation"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <User className="h-6 w-6 text-purple-600" /> Negotiation Playbook
        </h2>
        <Card className="border-purple-100 bg-purple-50/30">
          <CardContent className="pt-6 text-sm text-slate-700">
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Know Leverage:</strong> CIBIL 750+ & Stable Job = High
                Leverage.
              </li>
              <li>
                <strong>Get Multiple Offers:</strong> Apply to 3-4 lenders
                within 15 days.
              </li>
              <li>
                <strong>Leverage Relationship:</strong> &ldquo;I&apos;ve been
                banking with you for 5 years.&quot;
              </li>
              <li>
                <strong>Compete:</strong> &ldquo;HDFC offers 12.5%. Can you beat
                it?&quot;
              </li>
              <li>
                <strong>Fees:</strong> Negotiate processing fee caps.
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print my-8">
        <AdSlot id="guide-pl-7" type="leaderboard" />
      </div>

      {/* --- SECTION 7: PREPAYMENT --- */}
      <section className="mb-12">
        <h2
          id="prepayment"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ArrowDownUp className="h-6 w-6 text-orange-600" /> Prepayment &
          Foreclosure
        </h2>
        <p className="mb-6 text-slate-700">
          Personal loans often have penalties.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-semibold text-slate-900">
                  Lender
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Lock-in
                </TableHead>
                <TableHead className="font-semibold text-slate-900">
                  Penalty
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>SBI</TableCell>
                <TableCell>6 months</TableCell>
                <TableCell>3%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HDFC</TableCell>
                <TableCell>12 months</TableCell>
                <TableCell>2-4%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ICICI</TableCell>
                <TableCell>6 months</TableCell>
                <TableCell>4-5%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="p-4 bg-orange-50 border border-orange-100 rounded text-sm text-orange-900">
          <strong>Rule of Thumb:</strong> If loan rate is 16%, prepaying gives
          guaranteed 16% return—better than most investments!
        </div>
      </section>

      {/* --- SECTION 8: RED FLAGS --- */}
      <section className="mb-12">
        <h2
          id="red-flags"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Ban className="h-6 w-6 text-red-600" /> When NOT to Take a Personal
          Loan
        </h2>

        {/* IMAGE: Loan vs Investment */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/personal-loan/loan-vs-investment-returns.webp"
            alt="Graph showing negative returns when borrowing to invest"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-base">
                1. Funding Investments
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Borrowing @ 16% to invest is a guaranteed loss if market dips.
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-base">
                2. Lifestyle
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Don&apos;t pay 30% extra for a vacation or gadget that
              depreciates.
            </CardContent>
          </Card>
        </div>
      </section>

      <Card className="mb-12 border-slate-200 bg-slate-50/60">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
            What Next? Follow the Right Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="mb-2 font-semibold text-slate-900">
              1) Discovery stage: find the right lender band
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="text-blue-700 hover:underline"
                href="/compare-loans/"
              >
                Compare Loans Hub
              </Link>
              <Link
                className="text-blue-700 hover:underline"
                href="/guides/personal-loan-guide/"
              >
                Personal Loan Guide
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="mb-2 font-semibold text-slate-900">
              2) Validation stage: check EMI + profile readiness
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="text-blue-700 hover:underline"
                href="/loans/personal-loan/"
              >
                Personal Loan EMI Calculator
              </Link>
              <Link
                className="text-blue-700 hover:underline"
                href="/credit-score/"
              >
                Credit Score Estimator
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="mb-2 font-semibold text-slate-900">
              3) Decision stage: reduce borrowing cost before applying
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="text-blue-700 hover:underline"
                href="#negotiation"
              >
                Negotiation checklist
              </Link>
              <Link
                className="text-blue-700 hover:underline"
                href="#prepayment"
              >
                Prepayment rules
              </Link>
              <Link className="text-blue-700 hover:underline" href="#red-flags">
                Red-flag checks
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20"
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
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            A Personal Loan is a great tool for emergencies, but a bad habit for
            lifestyle expenses.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Maintain
              CIBIL 750+
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Ask Reducing
              Rate
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Compare Fees
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Interest rates and terms are subject to
          change by lenders. This guide is for educational purposes. Please
          check the loan agreement carefully before signing.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            Need a loan?
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Check your eligibility and calculate your EMI first.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/loans/personal-loan/"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Personal Loan EMI
            </Link>
            <Link
              href="/simple-interest-calculator/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-semibold text-white transition hover:bg-blue-800/50"
            >
              Check Flat Rate
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 8 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-pl-8" type="leaderboard" />
      </div>
    </article>
  );
}
