import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import ELSSClient from './ELSSClient';
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
import FAQSchema from '@/components/FAQSchema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';
import { ELSSSchemas } from '@/components/schemas/ELSSSchemas';

const updatedLabel = getCurrentMonthYearLabel();

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'ELSS Calculator 2026 – Tax Saving Mutual Fund Returns Calculator',
  description:
    'Calculate ELSS mutual fund returns and tax savings under Section 80C. Compare ELSS vs PPF, estimate maturity value, and plan tax-efficient investments for 2026.',
  keywords: [
    'ELSS Calculator',
    'Tax Saving Mutual Fund Calculator',
    'ELSS Return Calculator',
    'Section 80C Calculator',
    'SIP Tax Saving',
    'ELSS vs PPF Calculator',
    'ELSS maturity calculator',
    'tax saving calculator india',
  ],
  alternates: {
    canonical: 'https://fincado.com/elss-calculator/',
  },
  openGraph: {
    title: 'ELSS Calculator – Tax Saving Mutual Fund Returns Calculator 2026',
    description:
      'Calculate returns on ELSS Mutual Fund investments. Estimate tax savings under Section 80C and potential long-term wealth creation.',
    url: 'https://fincado.com/elss-calculator/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-elss-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado ELSS Calculator',
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

export default function ELSSPage() {
  const introContent = autoLinkContent(`
    <p>
      An <strong>ELSS (Equity Linked Savings Scheme)</strong> is the only type of Mutual Fund that qualifies for 
      tax deduction under <strong>Section 80C</strong> of the Income Tax Act.
    </p>
    <p class="mt-4">
      It serves a dual purpose: <strong>Tax Saving</strong> and <strong>Wealth Creation</strong>. 
      You can claim a deduction of up to ₹1.5 Lakh per year, potentially saving up to ₹46,800 in taxes 
      (for the 30% tax bracket).
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Lock-in Period:</strong> 3 Years (Shortest among all 80C options).</li>
      <li><strong>Investment Type:</strong> Equity-oriented Mutual Fund.</li>
      <li><strong>Investment Mode:</strong> SIP or Lump Sum.</li>
      <li>
        <strong>Taxation:</strong>
        Returns are taxed as per prevailing Long-Term Capital Gains (LTCG) rules
        applicable to equity mutual funds. Gains up to ₹1.25 lakh per year are tax-free.
      </li>
      <li><strong>Risk Profile:</strong> Moderate to High (equity market-linked).</li>
      <li><strong>Minimum Investment:</strong> ₹500 per month via SIP or ₹500 lump sum.</li>
    </ul>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Shortest Lock-in:</strong> Only 3 years vs 5 years (Tax Saving FD) or 15 years (PPF).</li>
      <li><strong>Higher Returns Potential:</strong> Historically 12-15% p.a. compared to fixed-income options.</li>
      <li><strong>Rupee Cost Averaging:</strong> SIP investments average out market volatility.</li>
      <li><strong>Professional Management:</strong> Managed by experienced fund managers.</li>
      <li><strong>Liquidity:</strong> Can be redeemed fully after 3 years without penalty.</li>
      <li><strong>Tax Efficiency:</strong> Save tax on investment and enjoy tax-free gains up to ₹1.25L.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Can I withdraw money from ELSS after 3 years?',
      answer:
        'Yes. ELSS has a mandatory 3-year lock-in period. After completion, you can redeem your units partially or fully. However, staying invested for 5–7 years is recommended for better long-term returns.',
    },
    {
      id: 'faq-2',
      question: 'Is SIP allowed in ELSS mutual funds?',
      answer:
        'Yes, SIP is the most popular way to invest in ELSS. Note that each SIP installment has its own independent 3-year lock-in period starting from the date of investment.',
    },
    {
      id: 'faq-3',
      question: 'How is ELSS taxed on redemption?',
      answer:
        'ELSS returns are taxed as Long-Term Capital Gains (LTCG). Gains up to ₹1.25 lakh per financial year are tax-free. Any gains above this limit are taxed at 12.5% without indexation.',
    },
    {
      id: 'faq-4',
      question: 'Is ELSS suitable for short-term investment?',
      answer:
        'No. ELSS is an equity-linked product and is best suited for long-term investors (5+ years). Short-term investments may be impacted by market volatility.',
    },
    {
      id: 'faq-5',
      question: 'What happens if I stop my ELSS SIP?',
      answer:
        'You can stop or pause your ELSS SIP anytime without penalty. However, the installments already invested will remain locked until each completes its individual 3-year lock-in period.',
    },
    {
      id: 'faq-6',
      question:
        'Did Budget 2026 change ELSS tax benefits or Section 80C limits?',
      answer:
        'No. Union Budget 2026 did not make any changes to ELSS mutual funds or the Section 80C investment limit. Investors can continue to claim deductions up to the existing limit as per income tax rules.',
    },
    {
      id: 'faq-7',
      question: 'ELSS vs PPF - Which is better?',
      answer:
        'ELSS offers higher return potential (12-15%) and shorter lock-in (3 years) but carries market risk. PPF offers guaranteed returns (7.1%) with 15-year lock-in and complete tax exemption. Choose based on your risk appetite and investment horizon.',
    },
    {
      id: 'faq-8',
      question: 'Can I invest more than ₹1.5 lakh in ELSS?',
      answer:
        "Yes, you can invest any amount in ELSS, but tax deduction under Section 80C is capped at ₹1.5 lakh per year. Additional investments will still generate returns but won't provide extra tax benefits.",
    },
    {
      id: 'faq-9',
      question: 'What is the best ELSS fund to invest in 2026?',
      answer:
        'The best ELSS fund depends on your risk profile and investment goals. Look for funds with consistent 5-10 year track records, reasonable expense ratios (under 2%), and experienced fund managers. Consult a financial advisor for personalized recommendations.',
    },
    {
      id: 'faq-10',
      question: 'Can I switch from one ELSS fund to another?',
      answer:
        'You cannot directly switch between ELSS funds during the 3-year lock-in period. After lock-in expires, you can redeem and reinvest in another ELSS fund, but this will trigger tax on gains and reset the lock-in period for new investments.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'ELSS Calculator',
            url: 'https://fincado.com/elss-calculator/',
          },
        ]}
      />
      <CalculatorSchema
        name="ELSS Calculator India"
        description="Calculate returns and tax savings for ELSS Mutual Funds under Section 80C."
        url="https://fincado.com/elss-calculator/"
      />
      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />
      <ELSSSchemas />
      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="ELSS Calculator — Tax Saving + Growth" />
            <LanguageToggle path="/hi/elss-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-emerald-100 text-lime-700">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                ELSS Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                Save tax under Section 80C and grow long-term wealth
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="elss-top" type="leaderboard" />
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
                      TYPICAL RETURN (ELSS)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Long-term average (5+ years)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      12–15%
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
                      MAX TAX SAVING (30%)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      On ₹1.5L investment annually
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹46,800
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      UPDATED DATA
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Lock-in & tax rules as of
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <ELSSClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="elss-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Investment Tip
                </strong>
                ELSS works best when held for 5+ years. The 3-year lock-in is
                minimum, but staying invested longer helps you ride out market
                volatility and compound your wealth effectively.
              </AlertDescription>
            </Alert>

            {/* ✅ ELSS FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    ELSS Return Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      ELSS returns are calculated differently based on
                      investment mode:
                    </div>

                    {/* SIP Formula */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">
                        For Monthly SIP (Systematic Investment Plan)
                      </h4>
                      <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                        <div className="text-center text-xl font-serif">
                          FV = P × &#123;[(1 + r)<sup>n</sup> − 1] ÷ r&#125; ×
                          (1 + r)
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-slate-700 mt-4">
                        <div className="flex gap-3 items-start">
                          <strong className="min-w-20">Where:</strong>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            FV
                          </span>
                          <span>
                            = Future value / maturity amount of your ELSS
                            investment
                          </span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            P
                          </span>
                          <span>= Monthly SIP amount (in ₹)</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            r
                          </span>
                          <span>
                            = Monthly return rate = Annual return ÷ 12 ÷ 100
                          </span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            n
                          </span>
                          <span>
                            = Total number of SIP installments (years × 12)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Lump Sum Formula */}
                    <div className="pt-6 border-t border-slate-300">
                      <h4 className="font-semibold text-slate-900 mb-3">
                        For Lump Sum Investment
                      </h4>
                      <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                        <div className="text-center text-xl font-serif">
                          FV = P × (1 + r)<sup>n</sup>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-slate-700 mt-4">
                        <div className="flex gap-3 items-start">
                          <strong className="min-w-20">Where:</strong>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            FV
                          </span>
                          <span>= Future value / maturity amount</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            P
                          </span>
                          <span>
                            = Principal lump sum amount invested (in ₹)
                          </span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            r
                          </span>
                          <span>
                            = Annual return rate (as decimal, e.g., 0.14 for
                            14%)
                          </span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            n
                          </span>
                          <span>= Investment period in years</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: ELSS SIP Calculation
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Monthly SIP (P):</strong>
                        </div>
                        <div>₹12,500</div>

                        <div>
                          <strong>Expected Annual Return:</strong>
                        </div>
                        <div>14% p.a.</div>

                        <div>
                          <strong>Investment Period:</strong>
                        </div>
                        <div>5 years (60 months)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Monthly Return Rate (r)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 14 ÷ (12 × 100) = 14 ÷ 1200 = 0.0117
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: (1 + r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          (1 + 0.0117)<sup>60</sup> ≈ 2.007
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Apply ELSS SIP Formula
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV = 12,500 × &#123;[(1.0117)<sup>60</sup> − 1] ÷
                            0.0117&#125; × 1.0117
                          </div>
                          <div>
                            FV = 12,500 × &#123;(2.007 − 1) ÷ 0.0117&#125; ×
                            1.0117
                          </div>
                          <div>FV = 12,500 × (1.007 ÷ 0.0117) × 1.0117</div>
                          <div>FV = 12,500 × 86.07 × 1.0117</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Approx. Maturity Value:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹10,88,000
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Total Amount Invested:</span>
                          <strong>₹7,50,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Wealth Gain:</span>
                          <strong className="text-green-700">
                            ≈ ₹3,38,000
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax Saved (Section 80C @ 30%):</span>
                          <strong className="text-lime-700">≈ ₹2,25,000</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tax Saving Calculation */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Section 80C Tax Saving Calculation
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <div className="p-3 bg-white rounded border border-lime-200">
                        <strong>Annual Tax Saving = </strong>
                        <span className="font-mono">
                          min(Annual Investment, ₹1,50,000) × Tax Rate
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        <strong>Example:</strong> If you invest ₹1,50,000 per
                        year in ELSS and you&apos;re in the 30% tax bracket, you
                        save ₹45,000 in taxes every year. Over 5 years,
                        that&apos;s ₹2,25,000 saved!
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
                        ELSS returns are market-linked and not guaranteed.
                        Historical average is 12-15% p.a.
                      </li>
                      <li>
                        Each SIP installment has a 3-year lock-in from its
                        investment date.
                      </li>
                      <li>
                        LTCG tax applies on redemption: Gains up to ₹1.25L/year
                        are tax-free, above that 12.5% tax applies.
                      </li>
                      <li>
                        Tax savings under 80C are subject to your tax bracket
                        and regime (new vs old tax regime).
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    This ELSS calculator uses standard compound interest
                    formulas for equity mutual funds. Actual returns may vary
                    based on fund performance and market conditions.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo content */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    Want to maximize your Section 80C benefits?
                  </strong>
                  <Link
                    href="/sip-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>Try our SIP Calculator for regular investing</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is ELSS Mutual Fund?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Features of ELSS
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={featuresContent} />
                </div>
                <p className="text-xs text-slate-500 italic">
                  Union Budget 2026 did not change ELSS taxation or Section 80C
                  limits. Investors should verify prevailing tax rules at the
                  time of redemption.
                </p>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="elss-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Benefits of ELSS Investment
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={benefitsContent} />
                </div>
              </section>

              {/* --- COMPARISON TABLE --- */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  ELSS vs Other 80C Options
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Feature</TableHead>
                        <TableHead className="text-left">ELSS</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">
                          Tax Saver FD
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Returns (Expected)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          12% – 15% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% (Fixed)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          6.5% - 7.5%
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Lock-in Period
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          3 Years
                        </TableCell>
                        <TableCell className="text-slate-700">
                          15 Years
                        </TableCell>
                        <TableCell className="text-slate-700">
                          5 Years
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Risk Level
                        </TableCell>
                        <TableCell className="font-semibold text-amber-600">
                          Moderate to High
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Risk Free
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Risk Free
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Tax on Returns
                        </TableCell>
                        <TableCell className="text-slate-700">
                          LTCG: ₹1.25L free, then 12.5%
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
                          Best For
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Long-term wealth + tax saving
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Risk-free retirement planning
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Conservative tax saving
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-12">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this ELSS Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Choose between <strong>Monthly SIP</strong> or{' '}
                    <strong>Lump Sum</strong> investment mode.
                  </li>
                  <li>Enter your investment amount (monthly or one-time).</li>
                  <li>
                    Set expected return rate (typically 12-14% for equity
                    funds).
                  </li>
                  <li>
                    Select investment period (minimum 3 years, recommended 5-7
                    years).
                  </li>
                  <li>Choose your tax bracket to see accurate tax savings.</li>
                  <li>
                    Click <strong>&quot;Compare with PPF&quot;</strong> to see
                    how ELSS stacks up against risk-free options.
                  </li>
                  <li>
                    Save your calculation for future reference or share with
                    family.
                  </li>
                </ol>
              </section>

              {/* Related calculators */}
              <section className="space-y-5 mt-12">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Tax Saving Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
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
                              Risk-free tax saving with guaranteed 7.1% returns.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate Now</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sip-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            📈
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              SIP Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Plan regular mutual fund investments for wealth
                              creation.
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
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="elss-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="elss-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="elss-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="elss-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
