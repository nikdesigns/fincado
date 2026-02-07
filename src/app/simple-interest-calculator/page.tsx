import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SICalculatorClient from './SICalculatorClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import FAQSchema from '@/components/FAQSchema';
import { SimpleInterestSchemas } from '@/components/schemas/SimpleInterestSchemas';
import {
  BadgeCheck,
  Percent,
  ArrowRight,
  AlertTriangle,
  Calculator,
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Simple Interest Calculator India 2026 – Flat Rate Loan Calculator',
  description:
    'Free Simple Interest (SI) calculator for loans and investments. Calculate flat rate interest, convert to reducing balance, understand car loan traps. Year-wise breakdown included.',
  keywords: [
    'Simple Interest Calculator',
    'SI Calculator India',
    'Flat Rate Loan Calculator',
    'Flat vs Reducing Balance',
    'Car Loan Interest Calculator',
    'Simple Interest Formula',
    'SI vs CI Calculator',
    'Gold Loan Interest',
    'Personal Loan Flat Rate',
  ],
  alternates: {
    canonical: 'https://fincado.com/simple-interest-calculator/',
  },
  openGraph: {
    title: 'Simple Interest Calculator 2026 – Avoid Flat Rate Traps',
    description:
      'Calculate simple interest on loans and investments. Convert flat rate to reducing balance. Understand true cost of car loans.',
    url: 'https://fincado.com/simple-interest-calculator/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-simple-interest-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Simple Interest Calculator',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* ---------------- FAQ DATA ---------------- */
const faqItems = [
  {
    id: 'faq-1',
    question: 'What is Simple Interest and how is it calculated?',
    answer:
      'Simple Interest (SI) is interest calculated only on the principal amount, not on accumulated interest. Formula: SI = (P × R × T) / 100, where P is principal, R is annual interest rate, T is time in years. Example: ₹1,00,000 at 8% for 5 years = ₹40,000 interest. Unlike compound interest, SI grows linearly (same amount each year).',
  },
  {
    id: 'faq-2',
    question:
      'What is the difference between Flat Rate and Reducing Balance interest?',
    answer:
      'Flat Rate charges interest on full principal throughout loan tenure even as you repay. Reducing Balance charges interest only on outstanding principal that keeps reducing. Example: ₹5 lakh car loan at 7% flat for 5 years costs ₹1.75L interest vs ₹97,000 in reducing balance. Flat rate effectively costs almost double (7% flat ≈ 13-14% reducing).',
  },
  {
    id: 'faq-3',
    question: 'Do Indian banks use Simple Interest?',
    answer:
      'Most banks use Compound Interest for savings, FDs, and EMI-based loans (home, personal). Simple Interest (flat rate) is used in: (1) Car loans from dealers/NBFCs, (2) Gold loans from some lenders, (3) Short-term personal loans, (4) Informal lending between individuals. Always clarify the interest type before taking a loan.',
  },
  {
    id: 'faq-4',
    question: 'How to convert Flat Rate to Reducing Balance Rate?',
    answer:
      'Approximate formula: Reducing Rate ≈ Flat Rate × 1.85 to 2.0. Examples: 7% flat ≈ 13% reducing, 8% flat ≈ 15% reducing, 10% flat ≈ 19% reducing. Exact conversion depends on loan tenure and EMI frequency. Use EMI calculator with reducing balance to get precise equivalent rate. Always ask lender for IRR (Internal Rate of Return) for accurate comparison.',
  },
  {
    id: 'faq-5',
    question: 'Is Simple Interest better for borrowers?',
    answer:
      'Not always. For short-term loans (1-2 years) with no prepayment, flat rate "might" be simpler. But for longer tenures (3+ years) or if you plan to prepay, reducing balance is ALWAYS cheaper. Car dealers advertise flat rate to make interest sound low (7-9%) when actual cost is 13-18% reducing equivalent. Always compare total interest payable.',
  },
  {
    id: 'faq-6',
    question: 'How to calculate Simple Interest for months or days?',
    answer:
      'Convert time period to years: For months: Time = Months / 12 (e.g., 18 months = 1.5 years). For days: Time = Days / 365 (e.g., 90 days = 0.247 years). Then use standard formula: SI = (P × R × T) / 100. Example: ₹50,000 at 12% for 6 months = (50,000 × 12 × 0.5) / 100 = ₹3,000 interest.',
  },
  {
    id: 'faq-7',
    question: 'Which loans in India use Flat Rate interest?',
    answer:
      'Common flat rate loans: (1) Car loans from dealers/NBFCs (7-10% flat), (2) Two-wheeler loans (8-12% flat), (3) Gold loans from non-banking lenders (7-9% flat), (4) Personal loans from finance companies (12-18% flat), (5) Informal lending between friends/family. Bank home loans, personal loans from banks, and credit cards NEVER use flat rate.',
  },
  {
    id: 'faq-8',
    question: 'What is the car loan flat rate trap?',
    answer:
      'Car dealers advertise "7% interest" which sounds competitive vs bank\'s "8.5%". But dealer\'s 7% is FLAT rate (interest on full ₹5L for 5 years) while bank\'s 8.5% is REDUCING (interest on reducing balance). True cost: Dealer 7% flat = ₹1.75L interest (13% reducing equivalent). Bank 8.5% reducing = ₹1.17L interest. Dealer loan costs ₹58,000 MORE despite lower advertised rate.',
  },
  {
    id: 'faq-9',
    question: 'Can I prepay a Flat Rate loan to save interest?',
    answer:
      "Unlike reducing balance loans where prepayment saves significant interest, flat rate loans offer ZERO benefit from prepayment because interest is calculated upfront on full principal for entire tenure. Some lenders may allow prepayment but won't reduce interest. Always check: (1) Is prepayment allowed? (2) Is there prepayment penalty? (3) Will interest be recalculated? Usually answer is no benefit.",
  },
  {
    id: 'faq-10',
    question: 'Simple Interest vs Compound Interest - which grows faster?',
    answer:
      "Compound Interest grows exponentially faster than Simple Interest. Example: ₹1 lakh at 10% for 10 years: Simple Interest = ₹1 lakh interest (total ₹2L, linear growth). Compound Interest = ₹1.59 lakh interest (total ₹2.59L, exponential growth). Difference increases with time. For investments, always choose compound. For loans, simple (flat) might seem cheaper but usually isn't when properly compared.",
  },
];

/* ---------------- PAGE ---------------- */
export default function SimpleInterestPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Simple Interest (SI)</strong> is a method of calculating interest where interest is charged 
      only on the original principal amount, not on accumulated interest. This makes it a linear, 
      non-compounding form of interest calculation.
    </p>
    <p class="mt-4">
      Simple Interest is commonly used in <strong>flat rate car loans</strong>, gold loans from certain 
      lenders, short-term personal loans, and informal lending. Understanding SI is crucial to avoid the 
      "flat rate trap" where advertised rates look low but actual cost is significantly higher.
    </p>
  `);

  const formulaExplanation = autoLinkContent(`
    <p>
      The Simple Interest formula is straightforward:
    </p>
    <p class="mt-3 font-mono text-sm bg-slate-100 p-2 rounded">
      SI = (P × R × T) / 100
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-3">
      <li><strong>SI</strong> = Simple Interest (interest amount earned or paid)</li>
      <li><strong>P</strong> = Principal (original loan or investment amount)</li>
      <li><strong>R</strong> = Rate of Interest (% per annum)</li>
      <li><strong>T</strong> = Time Period (in years)</li>
    </ul>
    <p class="mt-3">
      <strong>Total Amount</strong> = Principal + Simple Interest
    </p>
  `);

  const flatRateTrap = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">Example: Car Loan Comparison</h4>
    <p class="mt-2">
      You want to buy a car worth ₹8 lakhs with ₹3 lakhs down payment. Loan needed: ₹5 lakhs for 5 years.
    </p>
    
    <div class="mt-4 space-y-3">
      <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="font-semibold text-red-900">Dealer Offer: 7% Flat Rate</p>
        <ul class="text-sm text-slate-700 mt-2 space-y-1">
          <li>• Interest = (5,00,000 × 7 × 5) / 100 = <strong>₹1,75,000</strong></li>
          <li>• Total Payable = ₹5,00,000 + ₹1,75,000 = <strong>₹6,75,000</strong></li>
          <li>• Monthly EMI = ₹6,75,000 / 60 months = <strong>₹11,250</strong></li>
          <li>• Effective Reducing Rate = <strong>≈13% p.a.</strong></li>
        </ul>
      </div>

      <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p class="font-semibold text-emerald-900">Bank Offer: 8.5% Reducing Balance</p>
        <ul class="text-sm text-slate-700 mt-2 space-y-1">
          <li>• Total Interest = <strong>₹1,17,539</strong> (reduces as you pay)</li>
          <li>• Total Payable = <strong>₹6,17,539</strong></li>
          <li>• Monthly EMI = <strong>₹10,292</strong></li>
          <li>• You SAVE = <strong>₹57,461</strong> vs dealer's flat rate</li>
        </ul>
      </div>
    </div>

    <p class="mt-4 text-sm font-semibold text-orange-700">
      ⚠️ Despite lower advertised rate (7% vs 8.5%), the dealer's flat rate loan costs ₹57,000 MORE 
      because interest is calculated on full ₹5L for entire 5 years, not on reducing balance.
    </p>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Simple Interest Calculator',
            url: 'https://fincado.com/simple-interest-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Simple Interest Calculator - Flat Rate Loan Calculator"
        description="Calculate simple interest on loans and investments. Convert flat rate to reducing balance. Understand car loan interest traps."
        url="https://fincado.com/simple-interest-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <SimpleInterestSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Simple Interest Calculator 2026" />
            <LanguageToggle path="/hi/simple-interest-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-brrom-blue-50 to-indigo-100 text-blue-700">
              <Percent className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Simple Interest Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-blue-700">
                Flat Rate Loan & Investment Interest Calculator
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Calculate simple interest on loans and investments. Understand flat rate vs reducing 
                  balance difference. Convert car loan flat rates to actual costs and avoid common traps.
                </p>
              `}
            />
          </div>

          {/* Budget 2026 Status */}
          <div className="mt-6 flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-900">
                Budget 2026: Interest Calculation Rules Unchanged
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                The Union Budget 2026 did not modify standard interest
                calculation methods. Simple Interest formulas remain applicable
                for flat-rate loans as per existing RBI guidelines.
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="si-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      CAR LOAN FLAT RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Common dealer offer
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      7-10%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        flat
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      ≈ 13-19% reducing rate
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-orange-700 mb-1">
                      GOLD LOAN RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      NBFCs & local lenders
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      7-12%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Often simple interest
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-linear-to-br from-red-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-red-700 mb-1">
                      FLAT RATE TRAP
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Actual cost multiplier
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      1.8-2x
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        more
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Than advertised rate
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <SICalculatorClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="si-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-amber-50/50 border-amber-200 text-slate-600">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Car Loan Warning
                </strong>
                Always ask if the interest rate is &quot;flat&quot; or
                &quot;reducing balance&quot;. A 7% flat rate costs almost the
                same as 13% reducing rate. Banks offer reducing rates; dealers
                often use flat rates to make rates look attractive.
              </AlertDescription>
            </Alert>

            {/* Promo Card */}
            <Card className="no-print my-6 border-blue-200 bg-blue-50/50 transition-colors hover:bg-blue-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-blue-900">
                    Planning to buy a car? Check true EMI cost
                  </strong>
                  <p className="text-sm text-slate-700">
                    Use our EMI calculator with reducing balance to compare with
                    dealer&apos;s flat rate offer
                  </p>
                  <Link
                    href="/emi-calculator/"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Calculate EMI →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Simple Interest?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Simple Interest Formula Explained
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={formulaExplanation} />
                </div>

                <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">
                    Mathematical Formula
                  </h4>
                  <div className="overflow-x-auto">
                    <BlockMath math="SI = \frac{P \times R \times T}{100}" />
                  </div>
                  <div className="mt-4">
                    <BlockMath math="Total\ Amount = P + SI" />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Example Calculation
                  </h4>
                  <p className="text-sm text-slate-700 mb-3">
                    Principal = ₹1,00,000 | Rate = 8% p.a. | Time = 5 years
                  </p>
                  <div className="text-sm space-y-2">
                    <p>
                      SI ={' '}
                      <InlineMath math="\frac{100000 \times 8 \times 5}{100}" />{' '}
                      =<strong className="text-blue-900"> ₹40,000</strong>
                    </p>
                    <p>
                      Total Amount = ₹1,00,000 + ₹40,000 =
                      <strong className="text-blue-900"> ₹1,40,000</strong>
                    </p>
                  </div>
                </div>
              </section>

              {/* SI vs CI Comparison */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Simple Interest vs Compound Interest
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Feature</TableHead>
                        <TableHead>Simple Interest (SI)</TableHead>
                        <TableHead>Compound Interest (CI)</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Calculation Method
                        </TableCell>
                        <TableCell>Interest on principal only</TableCell>
                        <TableCell>
                          Interest on principal + accumulated interest
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Growth Pattern
                        </TableCell>
                        <TableCell>Linear (same amount yearly)</TableCell>
                        <TableCell>Exponential (increases yearly)</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Formula Complexity
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          Simple: (P×R×T)/100
                        </TableCell>
                        <TableCell className="text-orange-600">
                          Complex: P(1+r)^n - P
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Returns (10 years)
                        </TableCell>
                        <TableCell>100% return (₹1L → ₹2L)</TableCell>
                        <TableCell className="text-emerald-600 font-semibold">
                          159% return (₹1L → ₹2.59L)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Best For</TableCell>
                        <TableCell>Short-term loans (1-2 years)</TableCell>
                        <TableCell className="text-emerald-600">
                          Long-term investments (5+ years)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Used In</TableCell>
                        <TableCell>
                          Car loans (flat), gold loans, informal lending
                        </TableCell>
                        <TableCell>
                          FDs, mutual funds, home loans (EMI), savings accounts
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Borrower Advantage
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          Looks simpler, but often costs more
                        </TableCell>
                        <TableCell>
                          Transparent, reduces with prepayment
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Investor Advantage
                        </TableCell>
                        <TableCell className="text-red-600">
                          Lower returns
                        </TableCell>
                        <TableCell className="text-emerald-600 font-semibold">
                          Higher returns (power of compounding)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Comparison Example: ₹1,00,000 at 10% for 10 years
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4 mt-3">
                    <div className="p-3 bg-white rounded border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">
                        Simple Interest
                      </div>
                      <div className="text-lg font-bold text-slate-900">
                        ₹2,00,000
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        ₹1L principal + ₹1L interest
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                      <div className="text-xs text-emerald-700 mb-1">
                        Compound Interest
                      </div>
                      <div className="text-lg font-bold text-emerald-900">
                        ₹2,59,374
                      </div>
                      <div className="text-xs text-emerald-700 mt-1">
                        ₹59,374 MORE due to compounding
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="si-mid-content"
                  type="square"
                  label="Advertisement"
                />
              </div>

              {/* The Flat Rate Trap */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  The Flat Rate Loan Trap: Car Loans Exposed
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={flatRateTrap} />
                </div>
              </section>

              {/* Flat vs Reducing Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Flat Rate vs Reducing Balance: True Cost Comparison
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Flat Rate</TableHead>
                        <TableHead>Equivalent Reducing Rate</TableHead>
                        <TableHead>Cost Difference</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold">5% flat</TableCell>
                        <TableCell>≈ 9.5% reducing</TableCell>
                        <TableCell className="text-red-600">
                          90% higher
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">7% flat</TableCell>
                        <TableCell>≈ 13.3% reducing</TableCell>
                        <TableCell className="text-red-600">
                          90% higher
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">8% flat</TableCell>
                        <TableCell>≈ 15.2% reducing</TableCell>
                        <TableCell className="text-red-600">
                          90% higher
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          10% flat
                        </TableCell>
                        <TableCell>≈ 19% reducing</TableCell>
                        <TableCell className="text-red-600">
                          90% higher
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          12% flat
                        </TableCell>
                        <TableCell>≈ 22.8% reducing</TableCell>
                        <TableCell className="text-red-600">
                          90% higher
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-slate-700">
                    <strong className="text-red-900">Key Takeaway:</strong> A
                    flat rate is approximately{' '}
                    <strong>1.9x the reducing balance equivalent</strong>.
                    Always convert flat rate to reducing rate before comparing
                    loan offers. What looks like a &quot;7% loan&quot; is
                    actually closer to &quot;13% loan&quot;.
                  </p>
                </div>
              </section>

              {/* Common Use Cases */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  When is Simple Interest Used in India?
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🚗</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Car & Two-Wheeler Loans
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            Dealers and NBFCs use 7-10% flat rate to make offers
                            look attractive.
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>Tip:</strong> Compare with bank&apos;s
                            reducing rate EMI. Banks are usually 30-40% cheaper
                            despite higher advertised rate.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">💰</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Gold Loans
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            Local lenders and some NBFCs charge 7-12% simple
                            interest.
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>Tip:</strong> Banks like SBI, HDFC offer
                            gold loans at reducing rates (8-10%). Always compare
                            both options.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🎓</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Student Loans
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            Some education loan schemes use simple interest
                            during study period.
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>Tip:</strong> Central government schemes
                            often have lower simple interest (4-6%). Check
                            eligibility.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🤝</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Personal Lending
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            Loans between friends, family, or local lenders
                            typically use simple interest.
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>Tip:</strong> Always document terms clearly.
                            Use SI calculator to agree on total payable amount
                            upfront.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* How to Avoid Traps */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  5 Tips to Avoid Simple Interest Loan Traps
                </h3>

                <div className="space-y-4">
                  <Card className="border-emerald-200 bg-emerald-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-emerald-600 text-white shrink-0">
                          1
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Always Ask: Flat or Reducing?
                          </h4>
                          <p className="text-sm text-slate-700">
                            First question when quoted any interest rate:
                            &quot;Is this flat rate or reducing balance?&quot;
                            If flat, convert to equivalent reducing rate
                            (multiply by ~1.9) before comparing.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-blue-600 text-white shrink-0">
                          2
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Compare Total Interest Payable
                          </h4>
                          <p className="text-sm text-slate-700">
                            Don&apos;t just compare rates. Calculate TOTAL
                            interest payable over entire tenure. Lower rate
                            doesn&apos;t mean lower cost if it&apos;s flat rate.
                            Use calculator to see actual rupee difference.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          3
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Check Bank Offers First
                          </h4>
                          <p className="text-sm text-slate-700">
                            For car/bike loans, always check bank or co-lending
                            fintech (Tata Capital, HDFC, Axis) before dealer
                            finance. Banks almost always cheaper with reducing
                            rates. Pre-approved loans save 5-7%.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          4
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Understand Prepayment Policy
                          </h4>
                          <p className="text-sm text-slate-700">
                            Flat rate loans offer ZERO benefit from prepayment
                            (interest already fixed). If you plan to prepay
                            within 2-3 years, reducing balance is significantly
                            better. Check prepayment penalty clauses.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          5
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Get Written Clarity on IRR
                          </h4>
                          <p className="text-sm text-slate-700">
                            Ask lender for IRR (Internal Rate of Return) or APR
                            (Annual Percentage Rate) in writing. This is the
                            TRUE interest rate including all charges. Compare
                            this number, not advertised rate.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Financial Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/compound-interest-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🔄
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              Compound Interest Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate exponential growth with compounding. See
                              the power of interest-on-interest for long-term
                              wealth.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate CI</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/emi-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                            📊
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                              EMI Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate reducing balance EMI for home, car,
                              personal loans. Compare with flat rate offers.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                              <span>Calculate EMI</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="si-before-faq" type="leaderboard" lazyLoad />
            </div>

            {/* FAQs */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={faqItems[0]?.id}
                    className="space-y-2"
                  >
                    {faqItems.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-slate-900">
                          {faq.question}
                        </AccordionTrigger>

                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="si-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="si-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="si-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
