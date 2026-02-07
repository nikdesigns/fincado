import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SSYClient from './SSYClient';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { SSYSchemas } from '@/components/schemas/SSYSchemas';
import { Info, Baby, ArrowRight, Shield, Gift } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Sukanya Samriddhi Yojana Calculator 2026 – SSY Calculator',
  description:
    'Calculate Sukanya Samriddhi Yojana returns for girl child. Check maturity value, tax benefits, interest rates, and investment planning for SSY 2026.',
  keywords: [
    'Sukanya Samriddhi Yojana Calculator',
    'SSY Calculator',
    'Sukanya Samriddhi Calculator',
    'Girl Child Savings Scheme',
    'SSY Interest Rate 2026',
    'Sukanya Yojana Calculator',
    'SSY Maturity Calculator',
    'Tax Free Investment',
    'Beti Bachao Scheme',
    'SSY Account Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/sukanya-samriddhi/',
  },
  openGraph: {
    title: 'Sukanya Samriddhi Yojana Calculator 2026 – Plan Girl Child Future',
    description:
      'Free SSY calculator for girl child education and marriage planning. Calculate maturity value, tax-free returns, and investment strategies.',
    url: 'https://fincado.com/sukanya-samriddhi/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-ssy-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Sukanya Samriddhi Yojana Calculator',
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

/* ---------------- PAGE ---------------- */

export default function SSYPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Sukanya Samriddhi Yojana (SSY)</strong> is a government-backed savings scheme 
      launched under the <em>Beti Bachao Beti Padhao</em> campaign. It is designed specifically 
      for the education and marriage expenses of girl children. The scheme offers one of the 
      <strong>highest interest rates</strong> among small savings schemes with <strong>100% 
      tax-free returns</strong>.
    </p>
    <p class="mt-4">
      An SSY account can be opened for a girl child from birth until she turns 10 years old. 
      The account matures when the girl turns 21, or upon marriage after 18 years of age. 
      Parents or legal guardians can invest a minimum of ₹250 per year (₹21/month) up to a 
      maximum of ₹1.5 lakh per year.
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Highest Interest Rate:</strong> Currently 8.2% p.a. (revised quarterly by Govt. of India)</li>
      <li><strong>100% Tax-Free:</strong> Contributions (80C), interest earned, and maturity amount - all tax-free</li>
      <li><strong>Government Guarantee:</strong> Sovereign guarantee ensures zero risk and capital protection</li>
      <li><strong>Flexible Deposits:</strong> Monthly, quarterly, yearly, or lump sum - choose your convenience</li>
      <li><strong>Partial Withdrawal:</strong> Withdraw up to 50% after girl turns 18 for education expenses</li>
      <li><strong>Premature Closure:</strong> Allowed in case of girl's marriage after age 18 or medical emergencies</li>
      <li><strong>Nationwide Transfer:</strong> Transfer account from any post office to another across India</li>
    </ul>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Girl Child Age:</strong> Must be below 10 years at the time of account opening</li>
      <li><strong>Parents/Guardians:</strong> Natural or legal guardian can open the account</li>
      <li><strong>Number of Accounts:</strong> Maximum 2 accounts - one for each girl child</li>
      <li><strong>Twin/Triplet Exception:</strong> Third account allowed in case of twins/triplets born after first child</li>
      <li><strong>Documents Required:</strong> Birth certificate of girl child, guardian's identity & address proof, photographs</li>
      <li><strong>Opening Location:</strong> Any authorized post office or participating bank branches</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Sukanya Samriddhi Yojana offers <strong>EEE (Exempt-Exempt-Exempt)</strong> tax status, 
      making it one of the most tax-efficient investment schemes in India:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">Triple Tax Benefits:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Investment Deduction:</strong> Up to ₹1.5 lakh per year under Section 80C</li>
      <li><strong>Interest Exemption:</strong> Annual interest earned is completely tax-free (no TDS)</li>
      <li><strong>Maturity Tax-Free:</strong> The entire maturity amount is exempt from income tax</li>
    </ul>
    <p class="mt-4 font-semibold text-emerald-700">
      Example: If maturity value is ₹65 lakhs, you receive the full ₹65 lakhs without any 
      tax deduction - unlike FDs where TDS applies on interest.
    </p>
  `);

  const faqItems = [
    {
      id: 'ssy-faq-1',
      question: 'What is Sukanya Samriddhi Yojana?',
      answer:
        'Sukanya Samriddhi Yojana (SSY) is a government savings scheme for girl children under the Beti Bachao Beti Padhao campaign. It offers high interest rates (currently 8.2% p.a.), 100% tax-free returns, and is designed for education and marriage expenses.',
    },
    {
      id: 'ssy-faq-2',
      question: 'What is the current SSY interest rate in 2026?',
      answer:
        'As of 2026, the SSY interest rate is 8.2% per annum, compounded annually. The rate is revised quarterly by the Government of India and announced in the official gazette.',
    },
    {
      id: 'ssy-faq-3',
      question: 'What is the minimum and maximum investment in SSY?',
      answer:
        'Minimum investment: ₹250 per year (approx ₹21/month). Maximum investment: ₹1,50,000 per financial year. You can deposit in lump sum or installments throughout the year.',
    },
    {
      id: 'ssy-faq-4',
      question: 'Can I open SSY account online?',
      answer:
        'No, SSY accounts cannot be opened online. You must visit a post office or authorized bank branch with required documents (birth certificate, guardian ID/address proof, photos) to open the account.',
    },
    {
      id: 'ssy-faq-5',
      question: 'When does SSY account mature?',
      answer:
        'SSY account matures when the girl child turns 21 years old. However, premature closure is allowed after the girl turns 18 for marriage purposes. Deposits are required only for 15 years, then it earns interest for remaining 6 years.',
    },
    {
      id: 'ssy-faq-6',
      question: 'Is SSY withdrawal allowed before maturity?',
      answer:
        'Partial withdrawal of up to 50% of the balance is allowed after the girl turns 18, specifically for higher education expenses. Full premature closure is permitted for marriage after age 18 or in case of life-threatening medical emergencies.',
    },
    {
      id: 'ssy-faq-7',
      question: 'What happens if I miss SSY payment for a year?',
      answer:
        'If you miss payment, the account becomes discontinuous but does NOT close. You can revive it by paying ₹50 penalty per year of default plus the pending minimum deposit. The account continues to earn interest even if discontinuous.',
    },
    {
      id: 'ssy-faq-8',
      question: 'Can NRIs open SSY account?',
      answer:
        'No, NRIs (Non-Resident Indians) cannot open a new SSY account. However, if an account was opened while the guardian/girl was a resident and later became NRI, the account can continue till maturity without further deposits.',
    },
    {
      id: 'ssy-faq-9',
      question: 'SSY vs PPF - which is better?',
      answer:
        'SSY offers higher interest (8.2% vs 7.1% for PPF) and is 100% tax-free. However, SSY is only for girl children with 21-year lock-in, while PPF is for anyone with 15-year lock-in. For girl child, SSY is clearly better.',
    },
    {
      id: 'ssy-faq-10',
      question: 'How much will I get after 21 years in SSY?',
      answer:
        'It depends on your investment amount and interest rate. For example, investing ₹1.5 lakh/year for 15 years at 8.2% p.a. will give approximately ₹65-67 lakhs at maturity (21 years). Use the calculator above for exact estimates.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Sukanya Samriddhi Calculator',
            url: 'https://fincado.com/sukanya-samriddhi/',
          },
        ]}
      />

      <CalculatorSchema
        name="Sukanya Samriddhi Yojana (SSY) Calculator"
        description="Calculate maturity value for girl child savings scheme with 100% tax-free returns and government guarantee."
        url="https://fincado.com/sukanya-samriddhi/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <SSYSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Sukanya Samriddhi Yojana Calculator" />
            <LanguageToggle path="/hi/sukanya-samriddhi" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-pink-50 to-rose-100 text-pink-700">
              <Baby className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Sukanya Samriddhi Yojana Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-pink-700">
                Plan your girl child&apos;s future with tax-free returns
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="ssy-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-pink-200 bg-linear-to-br from-pink-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-pink-700 mb-1">
                      CURRENT INTEREST RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Revised quarterly by Govt.
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8.2%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      TAX BENEFIT
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      EEE status - Triple tax exemption
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      100%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        Tax-Free
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      MATURITY PERIOD
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      When girl child turns 21
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      21
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        years
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <SSYClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="ssy-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-pink-50/50 border-pink-200 text-slate-600">
              <Info className="h-4 w-4 text-pink-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Investment Tip
                </strong>
                Open SSY account as early as possible (preferably at birth) to
                maximize compounding benefits. Invest maximum ₹1.5L annually to
                get highest returns and full 80C deduction.
              </AlertDescription>
            </Alert>

            {/* ✅ SSY FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    SSY Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      SSY uses compound interest with deposits for 15 years and
                      continued compounding until maturity (21 years). The
                      maturity value is calculated as:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-lg font-serif">
                          A = P × [(1 + r)<sup>n</sup> - 1] / r × (1 + r)
                          <sup>m</sup>
                        </div>
                        <div className="text-sm text-slate-600">
                          For deposits during 15 years + 6 years interest-only
                          period
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          A
                        </span>
                        <span>= Maturity amount (total corpus at age 21)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= Annual deposit amount (₹250 to ₹1,50,000)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Annual interest rate (currently 8.2% = 0.082)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>= Deposit period (15 years)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          m
                        </span>
                        <span>
                          = Additional interest-only period (6 years till age
                          21)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>Note:</strong> Deposits are mandatory only for
                        15 years. After that, the accumulated corpus continues
                        to earn interest until maturity.
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: Maximum Annual Investment
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Annual Deposit (P):</strong>
                        </div>
                        <div>₹1,50,000</div>

                        <div>
                          <strong>Interest Rate (r):</strong>
                        </div>
                        <div>8.2% p.a.</div>

                        <div>
                          <strong>Deposit Period (n):</strong>
                        </div>
                        <div>15 years</div>

                        <div>
                          <strong>Interest-Only (m):</strong>
                        </div>
                        <div>6 years</div>

                        <div>
                          <strong>Total Period:</strong>
                        </div>
                        <div>21 years</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Calculate Future Value after 15 years of
                          deposits
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV<sub>15</sub> = 1,50,000 × [(1.082)<sup>15</sup> -
                            1] / 0.082
                          </div>
                          <div>
                            FV<sub>15</sub> = 1,50,000 × [3.271 - 1] / 0.082
                          </div>
                          <div>
                            FV<sub>15</sub> = 1,50,000 × 27.695
                          </div>
                          <div>
                            FV<sub>15</sub> ≈ ₹41,54,250
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Compound for remaining 6 years (no deposits)
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV<sub>21</sub> = 41,54,250 × (1.082)<sup>6</sup>
                          </div>
                          <div>
                            FV<sub>21</sub> = 41,54,250 × 1.616
                          </div>
                          <div>
                            FV<sub>21</sub> ≈ ₹67,13,000
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Total Investment (15 years):</span>
                            <strong className="text-slate-900">
                              ₹22,50,000
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest Earned:</span>
                            <strong className="text-emerald-700">
                              ₹44,63,000
                            </strong>
                          </div>
                          <div className="flex justify-between border-t pt-2 text-lg">
                            <span className="font-semibold">
                              Maturity Value:
                            </span>
                            <strong className="text-emerald-700">
                              ₹67,13,000
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300">
                        <p className="text-xs text-slate-600">
                          <strong>Tax Benefit:</strong> Entire ₹67.13 lakh is
                          100% tax-free! Plus, annual deposits get ₹1.5L
                          deduction under Section 80C.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Investment Timeline */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      SSY Investment Timeline
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-700 min-w-16">
                          Year 1-15:
                        </span>
                        <span>
                          Make annual deposits (₹250 to ₹1.5L). Interest
                          compounds annually.
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-700 min-w-16">
                          Year 16-21:
                        </span>
                        <span>
                          No deposits required. Corpus continues earning 8.2%
                          interest.
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-700 min-w-16">
                          Age 18:
                        </span>
                        <span>
                          Withdraw up to 50% for higher education expenses.
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-purple-700 min-w-16">
                          Age 21:
                        </span>
                        <span>
                          Full maturity - withdraw entire amount tax-free.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    This calculator assumes annual compounding. Actual interest
                    rates are revised quarterly by the Government of India.
                    Current rate: 8.2% p.a.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-pink-200 bg-pink-50/50 transition-colors hover:bg-pink-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                  <Gift className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-pink-900">
                    Looking for other girl child benefits?
                  </strong>
                  <Link
                    href="/ppf-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-pink-700 hover:text-pink-800"
                  >
                    <span>Explore PPF for additional long-term savings</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Sukanya Samriddhi Yojana (SSY)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Benefits of Sukanya Samriddhi Yojana
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={benefitsContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="ssy-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Eligibility for SSY Account
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={eligibilityContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  SSY vs PPF vs FD - Which is Best?
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Feature</TableHead>
                        <TableHead className="text-left">SSY</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">FD</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Interest Rate
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          8.2% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          6-7% p.a.
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Tax Status
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% Tax-Free)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% Tax-Free)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Interest taxable
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Lock-in Period
                        </TableCell>
                        <TableCell className="text-slate-700">
                          21 years
                        </TableCell>
                        <TableCell className="text-slate-700">
                          15 years
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          7 days - 10 years
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Min Investment
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹250/year
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹500/year
                        </TableCell>
                        <TableCell className="text-slate-700">₹1,000</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Max Investment
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L/year
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L/year
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          No limit
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          80C Deduction
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (₹1.5L)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (₹1.5L)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Only for 5Y Tax Saver FD
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Partial Withdrawal
                        </TableCell>
                        <TableCell className="text-slate-700">
                          50% after age 18
                        </TableCell>
                        <TableCell className="text-slate-700">
                          After 5 years
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Anytime (penalty may apply)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Eligibility
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Girl child up to 10 years
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Any Indian citizen
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Anyone
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Risk Level
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Zero (Govt. Guaranteed)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Zero (Govt. Guaranteed)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Very Low (DICGC insured)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Best For
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Girl child education/marriage
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Long-term savings, retirement
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Short-term, guaranteed returns
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Expert Verdict:</strong> For girl children, SSY is
                    the clear winner with highest interest rate (8.2%), 100%
                    tax-free returns, and government guarantee. It beats PPF by
                    1.1% and offers better returns than FDs while being
                    completely tax-free.
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Taxation on SSY
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxContent} />
                </div>
              </section>

              {/* How to Open Account */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Open SSY Account
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong>Visit Post Office or Bank:</strong> Go to nearest
                    post office or authorized bank branch (SBI, PNB, ICICI,
                    HDFC, Axis, BOB, etc.).
                  </li>
                  <li>
                    <strong>Carry Documents:</strong> Girl child&apos;s birth
                    certificate, parent/guardian&apos;s ID proof (Aadhaar/PAN),
                    address proof, and 2 passport photos each.
                  </li>
                  <li>
                    <strong>Fill Account Opening Form:</strong> Complete the SSY
                    account opening form with girl&apos;s and guardian&apos;s
                    details.
                  </li>
                  <li>
                    <strong>Make Initial Deposit:</strong> Deposit minimum ₹250
                    (can be more) via cash, cheque, DD, or online transfer.
                  </li>
                  <li>
                    <strong>Receive Passbook:</strong> Get SSY passbook
                    immediately with account number and first deposit entry.
                  </li>
                  <li>
                    <strong>Set Up Auto-Debit (Optional):</strong> Link bank
                    account for automatic monthly/yearly deposits for
                    convenience.
                  </li>
                </ol>
              </section>

              {/* Investment Strategy */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Optimal SSY Investment Strategy
                </h3>
                <div className="text-slate-700 leading-relaxed space-y-3">
                  <p>
                    <strong>1. Open Early:</strong> Open account at girl&apos;s
                    birth for maximum 21-year compounding benefit. Earlier you
                    start, higher the maturity corpus.
                  </p>
                  <p>
                    <strong>2. Invest Maximum:</strong> Deposit full ₹1.5 lakh
                    annually if possible. This maximizes tax deduction (80C) and
                    gives ₹65-70 lakh at maturity.
                  </p>
                  <p>
                    <strong>3. Monthly SIP:</strong> Set up monthly auto-debit
                    of ₹12,500 instead of yearly lump sum for better cash flow
                    management.
                  </p>
                  <p>
                    <strong>4. Don&apos;t Miss Payments:</strong> Defaulting
                    attracts ₹50/year penalty. Keep deposits regular to avoid
                    discontinuous account status.
                  </p>
                  <p>
                    <strong>5. Plan Partial Withdrawal:</strong> Use 50%
                    withdrawal at age 18 only for higher education. Leaving it
                    untouched gives maximum compounding till 21.
                  </p>
                  <p>
                    <strong>6. Consider Multiple Daughters:</strong> If you have
                    2 daughters, open accounts for both and invest ₹75,000 each
                    (₹1.5L total) for full 80C benefit.
                  </p>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this SSY Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Enter your girl child&apos;s current age (0-10 years).
                  </li>
                  <li>Select deposit frequency: Monthly or Yearly.</li>
                  <li>
                    Enter monthly investment (₹250-₹12,500) or yearly
                    (₹1,000-₹1,50,000).
                  </li>
                  <li>
                    Set current interest rate (default 8.2% - update if govt.
                    revises rate).
                  </li>
                  <li>View maturity value when girl turns 21 years old.</li>
                  <li>
                    Check total investment for 15 years and interest earned.
                  </li>
                  <li>
                    Enable <strong>&quot;Year-wise Breakdown&quot;</strong> to
                    see growth over first 5 years.
                  </li>
                  <li>Save calculation or share on WhatsApp for reference.</li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Savings Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/ppf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              PPF Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate Public Provident Fund returns with
                              tax-free interest.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                              <span>Try Now</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/fd-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              FD Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate fixed deposit maturity value and
                              interest earned.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate</span>
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
              <AdSlot id="ssy-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="ssy-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="ssy-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="ssy-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
