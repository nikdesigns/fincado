import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FDClient from './FDClient';
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
import { FDSchemas } from '@/components/schemas/FDSchemas';
import { Info, Shield, Building2, TrendingUp, ArrowRight } from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

const updatedLabel = getCurrentMonthYearLabel();

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'FD Calculator 2026 – Calculate Fixed Deposit Interest & Maturity',
  description:
    'Calculate Fixed Deposit maturity amount with our accurate FD Calculator. Check monthly/quarterly/yearly compounding, TDS deduction, senior citizen rates, and compare bank FD rates for 2026.',
  keywords: [
    'FD Calculator',
    'Fixed Deposit Calculator',
    'FD Interest Calculator',
    'FD Maturity Calculator',
    'FD Interest Rates 2026',
    'Term Deposit Calculator',
    'FD TDS Calculator',
    'Cumulative FD Calculator',
    'Senior Citizen FD Rates',
    'Bank FD Rates India'
  ],
  alternates: {
    canonical: 'https://fincado.com/fd-calculator/',
  },
  openGraph: {
    title: 'FD Calculator 2026 – Fixed Deposit Maturity & Interest Calculator',
    description:
      'Free tool to calculate FD maturity amount, total interest, TDS deduction, and effective yield. Compare bank rates and senior citizen benefits.',
    url: 'https://fincado.com/fd-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-fd-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado FD Calculator',
      }
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

export default function FDPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Fixed Deposit (FD)</strong> is a low-risk investment instrument 
      offered by banks and NBFCs where you deposit a lump sum amount 
      for a fixed tenure at a pre-determined interest rate.
    </p>
    <p class="mt-4">
      Unlike stock market investments, FDs offer <strong>guaranteed returns</strong> 
      and capital safety, making them the preferred choice for conservative investors 
      and senior citizens.
    </p>
  `);

  const typesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Regular FD:</strong> Standard fixed deposit with flexible tenure from 7 days to 10 years.</li>
      <li><strong>Tax Saver FD:</strong> 5-year lock-in period with Section 80C benefits up to ₹1.5 lakh.</li>
      <li><strong>Senior Citizen FD:</strong> Additional 0.25-0.5% interest for investors above 60 years.</li>
      <li><strong>Cumulative FD:</strong> Interest compounded and paid at maturity for maximum returns.</li>
      <li><strong>Non-Cumulative FD:</strong> Interest paid monthly/quarterly/yearly for regular income.</li>
      <li><strong>Flexi FD:</strong> Combination of savings and FD with automatic sweep facility.</li>
    </ul>
  `);

  const eligibilityContent = autoLinkContent(`
    <p>
      Almost any investor category can open an FD in India. Common eligibility includes:
    </p>
    <ul class="list-disc pl-5 space-y-2 list-inside mt-2">
      <li><strong>Resident Individuals:</strong> Including minors (with guardians).</li>
      <li><strong>Senior Citizens:</strong> Eligible for higher interest rates (usually 0.25-0.5% extra).</li>
      <li><strong>NRIs:</strong> Can open NRE (repatriable) or NRO (non-repatriable) FDs.</li>
      <li><strong>Organizations:</strong> HUFs, Partnership Firms, Trusts, and Companies.</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Interest earned on Fixed Deposits is <strong>fully taxable</strong> as per your income tax slab. 
      It is added to your annual income under "Income from Other Sources".
    </p>
    <ul class="list-disc pl-5 space-y-2 list-inside mt-2">
      <li><strong>TDS Deduction:</strong> Banks deduct 10% TDS if interest exceeds ₹40,000 in a year (₹50,000 for Senior Citizens).</li>
      <li><strong>Form 15G/15H:</strong> You can submit these forms to the bank to avoid TDS if your total income is below the taxable limit.</li>
      <li><strong>Higher TDS:</strong> 20% TDS if PAN is not provided to the bank.</li>
      <li><strong>Advance Tax:</strong> If TDS is insufficient, you may need to pay advance tax to avoid penalties.</li>
    </ul>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Capital Safety:</strong> FDs up to ₹5 Lakh per bank are insured by DICGC (Deposit Insurance and Credit Guarantee Corporation).</li>
      <li><strong>Guaranteed Returns:</strong> Fixed interest rate locked at the time of deposit, unaffected by market volatility.</li>
      <li><strong>Liquidity:</strong> Premature withdrawal allowed with minimal penalty (0.5-1% usually).</li>
      <li><strong>Tax Saving:</strong> 5-Year Tax Saver FDs qualify for Section 80C deduction up to ₹1.5 lakh.</li>
      <li><strong>Loan Facility:</strong> Get loans against FD (up to 90% of deposit value) at lower interest rates.</li>
      <li><strong>Flexible Tenure:</strong> Choose from 7 days to 10 years based on your financial goals.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'fd-faq-1',
      question: 'Is interest on FD taxable?',
      answer:
        'Yes. Interest earned on Fixed Deposits is fully taxable and added to your total income. Banks deduct 10% TDS if interest exceeds ₹40,000 in a year (₹50,000 for senior citizens). You must declare FD interest in your ITR.',
    },
    {
      id: 'fd-faq-2',
      question: 'Can I withdraw my FD before maturity?',
      answer:
        'Yes, most FDs allow premature withdrawal. However, banks usually charge a penalty of 0.5%–1% on the interest rate. Note that 5-year Tax Saver FDs cannot be withdrawn early under any circumstances.',
    },
    {
      id: 'fd-faq-3',
      question:
        'What is the difference between Cumulative and Non-Cumulative FD?',
      answer:
        'In a Cumulative FD, interest is compounded and paid at maturity, offering higher returns through compounding. In a Non-Cumulative FD, interest is paid monthly, quarterly, half-yearly, or yearly, making it suitable for regular income needs.',
    },
    {
      id: 'fd-faq-4',
      question: 'Is FD safe compared to other investments?',
      answer:
        'FDs are considered very safe as deposits up to ₹5 lakh per bank are insured by DICGC. However, returns may not always beat inflation compared to equity-based investments. FDs are best for capital preservation, not wealth creation.',
    },
    {
      id: 'fd-faq-5',
      question: 'What is the senior citizen FD rate benefit?',
      answer:
        'Senior citizens (60+ years) get an additional 0.25% to 0.5% interest on FDs depending on the bank. Some banks offer up to 0.75% extra. This benefit is available on most FD schemes except corporate FDs.',
    },
    {
      id: 'fd-faq-6',
      question: 'Can I get a loan against my FD?',
      answer:
        'Yes, most banks offer loans against FDs up to 90-95% of the deposit value. The interest rate is typically 1-2% above the FD rate. This is a better option than premature withdrawal as your FD continues to earn interest.',
    },
    {
      id: 'fd-faq-7',
      question: 'Which compounding frequency gives the highest returns?',
      answer:
        'Monthly compounding gives the highest returns, followed by quarterly, half-yearly, and yearly. However, most banks offer quarterly compounding as standard. The difference in returns increases with higher principal and longer tenure.',
    },
    {
      id: 'fd-faq-8',
      question: 'Can I renew my FD automatically?',
      answer:
        'Yes, banks offer auto-renewal facility where your FD is renewed at maturity for the same tenure at prevailing interest rates. You can also choose to receive interest and renew only the principal amount.',
    },
    {
      id: 'fd-faq-9',
      question: 'Are post office FDs better than bank FDs?',
      answer:
        'Post Office Time Deposits (TD) offer slightly higher interest rates and have lower TDS thresholds. However, bank FDs offer more flexibility, better liquidity, and internet banking facilities. Choose based on your priority: higher returns (Post Office) vs convenience (Banks).',
    },
    {
      id: 'fd-faq-10',
      question: 'How to save TDS on FD interest?',
      answer:
        'Submit Form 15G (for individuals below 60) or Form 15H (for senior citizens) to your bank if your total income is below taxable limit. You can also split FDs across family members or spread maturity dates to manage taxable interest.',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'FD Calculator',
            url: 'https://fincado.com/fd-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="Fixed Deposit (FD) Calculator"
        description="Calculate the maturity amount and interest earned on your Fixed Deposits (FD) for all Indian banks."
        url="https://fincado.com/fd-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <FDSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Fixed Deposit (FD) Calculator" />
            <LanguageToggle path="/hi/fd-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-emerald-100 text-lime-700">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Fixed Deposit Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                Calculate FD maturity value with interest & compounding
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="fd-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      AVERAGE FD RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Major banks (1-3 years)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      6.5–7.5%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      SENIOR CITIZEN BONUS
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Extra interest for 60+ age
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      +0.5%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        typical
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      UPDATED DATA
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Bank rates as of
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <FDClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="fd-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Investment Tip
                </strong>
                Consider FD laddering strategy: Split your investment across
                multiple FDs with different maturity dates to balance liquidity
                and returns while taking advantage of changing interest rates.
              </AlertDescription>
            </Alert>

            {/* ✅ FD FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    FD Maturity Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      For compound interest (cumulative) fixed deposits:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        A = P × (1 + r/n)<sup>n×t</sup>
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
                        <span>= Maturity amount (Principal + Interest)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= Principal deposit amount (in ₹)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Annual interest rate (as decimal, e.g., 0.07 for 7%)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = Compounding frequency per year (12=monthly,
                          4=quarterly, 2=half-yearly, 1=yearly)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          t
                        </span>
                        <span>= Tenure in years</span>
                      </div>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: FD Calculation (Quarterly Compounding)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Principal (P):</strong>
                        </div>
                        <div>₹1,00,000</div>

                        <div>
                          <strong>Interest Rate (r):</strong>
                        </div>
                        <div>7% p.a.</div>

                        <div>
                          <strong>Tenure (t):</strong>
                        </div>
                        <div>3 years</div>

                        <div>
                          <strong>Compounding (n):</strong>
                        </div>
                        <div>Quarterly (4 times/year)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Convert Rate to Decimal
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 7 ÷ 100 = 0.07
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate (1 + r/n)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          1 + (0.07 ÷ 4) = 1 + 0.0175 = 1.0175
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Calculate (1 + r/n)<sup>n×t</sup>
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            (1.0175)<sup>4×3</sup> = (1.0175)<sup>12</sup>
                          </div>
                          <div>= 1.2314</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 4: Apply FD Formula
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            A = P × (1 + r/n)<sup>n×t</sup>
                          </div>
                          <div>A = 1,00,000 × 1.2314</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Maturity Amount:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹1,23,140
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Principal Deposited:</span>
                          <strong>₹1,00,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Earned:</span>
                          <strong className="text-green-700">₹23,140</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Effective Return:</span>
                          <strong className="text-lime-700">23.14%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Compounding Impact */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Impact of Compounding Frequency
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        On ₹1 lakh @ 7% for 3 years, different compounding
                        frequencies give:
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                        <div className="p-2 bg-white rounded border">
                          <strong>Monthly:</strong> ₹1,23,334
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <strong>Quarterly:</strong> ₹1,23,140
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <strong>Half-Yearly:</strong> ₹1,22,926
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <strong>Yearly:</strong> ₹1,22,504
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        <strong>Difference:</strong> Monthly compounding gives
                        ₹830 more than yearly compounding on this investment!
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Important Points
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        Most Indian banks offer quarterly compounding as
                        standard.
                      </li>
                      <li>
                        Non-cumulative FDs (regular interest payout) use simple
                        interest, not compound interest.
                      </li>
                      <li>
                        Premature withdrawal penalty typically reduces interest
                        rate by 0.5-1%.
                      </li>
                      <li>
                        TDS of 10% is deducted if annual interest exceeds
                        ₹40,000 (₹50,000 for seniors).
                      </li>
                      <li>
                        Senior citizens get additional 0.25-0.5% on most FDs
                        (varies by bank).
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    This calculator uses the standard compound interest formula
                    for cumulative FDs. Actual returns may vary slightly due to
                    bank-specific policies.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    Looking for guaranteed returns with tax benefits?
                  </strong>
                  <Link
                    href="/ppf-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>Compare with PPF Calculator (EEE tax status)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is a Fixed Deposit (FD)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Types of Fixed Deposits
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={typesContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="fd-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Who is Eligible for Fixed Deposit?
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={eligibilityContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Benefits of Fixed Deposits
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={benefitsContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  FD vs Other Safe Investment Options
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Feature</TableHead>
                        <TableHead className="text-left">Bank FD</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">RD</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Returns
                        </TableCell>
                        <TableCell className="font-semibold text-lime-600">
                          6.5% – 7.5%
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% (Fixed)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          6.5% – 7.5%
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Investment Mode
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Lump Sum
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Lump Sum or Yearly
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Monthly
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Lock-in Period
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Flexible (7 days - 10 yrs)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          15 Years
                        </TableCell>
                        <TableCell className="text-slate-700">
                          6 months - 10 years
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Tax on Returns
                        </TableCell>
                        <TableCell className="text-slate-700">
                          As per tax slab
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Fully Tax Free (EEE)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          As per tax slab
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          80C Benefit
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Yes (5-year FD only)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes
                        </TableCell>
                        <TableCell className="text-slate-700">No</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Liquidity
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          High (with penalty)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Partial (after 7 years)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Low (discouraged)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  TDS on FD Interest (2026 Rules)
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxContent} />
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this FD Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>Enter your deposit amount (principal).</li>
                  <li>
                    Input the interest rate offered by your bank (check latest
                    rates).
                  </li>
                  <li>Select tenure in years and additional months.</li>
                  <li>
                    Choose compounding frequency (quarterly is most common).
                  </li>
                  <li>
                    Enable senior citizen mode if you&apos;re 60+ years for
                    bonus rates.
                  </li>
                  <li>
                    Click <strong>&quot;Compare Bank Rates&quot;</strong> to see
                    current rates from popular banks.
                  </li>
                  <li>
                    Save your calculation or share via WhatsApp for future
                    reference.
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Savings Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/rd-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            🔄
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              RD Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate recurring deposit returns with monthly
                              investments.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                              <span>Calculate Now</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/ppf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🔒
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              PPF Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate PPF returns with EEE tax benefits and
                              7.1% rate.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Try Now</span>
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
              <AdSlot id="fd-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="fd-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="fd-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="fd-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
