import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import APYClient from './APYClient';
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
import { APYSchemas } from '@/components/schemas/APYSchemas';
import { Info, Shield, ArrowRight, TrendingUp, Users } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'APY Calculator 2026 – Atal Pension Yojana Contribution Calculator',
  description:
    'Free APY Calculator to calculate monthly contribution for Atal Pension Yojana. Check guaranteed pension (₹1000-₹5000), nominee corpus, and age-wise contribution chart. Compare pension scenarios instantly.',
  keywords: [
    'APY Calculator',
    'Atal Pension Yojana Calculator',
    'APY Contribution Chart',
    'Pension Scheme Calculator',
    'APY vs NPS',
    'Government Pension Scheme',
    'Guaranteed Pension Calculator',
    'PFRDA Pension'
  ],
  alternates: {
    canonical: 'https://fincado.com/apy-calculator/',
  },
  openGraph: {
    title: 'APY Calculator 2026 – Guaranteed Pension for Life',
    description:
      'Calculate monthly APY contributions based on age and desired pension. Get guaranteed pension backed by Government of India.',
    url: 'https://fincado.com/apy-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-apy-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado APY Calculator',
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

export default function APYCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Atal Pension Yojana (APY)</strong> is a government-sponsored pension scheme 
      launched by the Government of India to provide social security for workers in the 
      unorganized sector. It offers a <strong>guaranteed monthly pension</strong> ranging 
      from ₹1,000 to ₹5,000 starting at age 60, backed by government guarantee.
    </p>
    <p class="mt-4">
      APY is administered by the <strong>Pension Fund Regulatory and Development Authority 
      (PFRDA)</strong> and ensures that subscribers receive fixed pension income post-retirement. 
      The scheme covers over 6 crore subscribers across India, making it one of the largest 
      social security programs for the unorganized sector.
    </p>
  `);

  const keyFeaturesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Guaranteed Pension:</strong> Government guarantees minimum pension from ₹1,000 to ₹5,000 per month</li>
      <li><strong>Age Eligibility:</strong> Join between 18-40 years, receive pension from age 60</li>
      <li><strong>Fixed Contributions:</strong> Monthly/quarterly/half-yearly contributions based on age and pension choice</li>
      <li><strong>Spouse Benefit:</strong> Same pension continues to spouse after subscriber's death</li>
      <li><strong>Nominee Corpus:</strong> Accumulated corpus (₹1.7L to ₹8.5L) goes to nominee after both deaths</li>
      <li><strong>Auto-debit Facility:</strong> Automatic deduction from savings account ensures regular payments</li>
      <li><strong>Non-Tax Payers Only:</strong> Exclusively for non-income tax payers (as per Oct 2022 rules)</li>
      <li><strong>Government Co-contribution:</strong> Central Government contributed 50% of contribution (for 5 years till FY 2020) for eligible subscribers</li>
    </ul>
  `);

  const eligibilityContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">Who Can Join APY?</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Age Criteria:</strong> Must be between 18 and 40 years at the time of joining</li>
      <li><strong>Citizenship:</strong> Must be an Indian citizen with valid Aadhaar and PAN</li>
      <li><strong>Bank Account:</strong> Must have active savings bank account linked to Aadhaar</li>
      <li><strong>Tax Status:</strong> Non-income tax payers only (as per rules from October 1, 2022)</li>
      <li><strong>Mobile Number:</strong> Registered mobile number for SMS alerts and updates</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Who CANNOT Join APY?</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Income tax payers (disqualified after Oct 1, 2022 rule change)</li>
      <li>Those already covered under EPF, NPS (government sector), or ESIC</li>
      <li>Members of any other statutory social security scheme</li>
    </ul>
  `);

  const contributionRulesContent = autoLinkContent(`
    <p>
      APY contributions vary based on your <strong>joining age</strong> and <strong>desired 
      pension amount</strong>. Younger subscribers pay significantly less due to longer 
      investment horizon:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">Contribution Frequency Options:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Monthly:</strong> Deducted on 1st of every month</li>
      <li><strong>Quarterly:</strong> Deducted 4 times a year (every 3 months)</li>
      <li><strong>Half-Yearly:</strong> Deducted twice a year (every 6 months)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Late Payment Penalty:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>₹1 per month for every ₹100 of contribution (or part thereof)</li>
      <li>Account frozen after 6 months of non-payment</li>
      <li>Account closed after 12 months - corpus returned minus penalties</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Upgrading Pension Amount:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Can upgrade to higher pension slab once per financial year</li>
      <li>Must pay differential amount for past period with accrued interest</li>
      <li>Example: Upgrading from ₹1,000 to ₹5,000 requires paying difference retrospectively</li>
    </ul>
    <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <p class="text-sm text-slate-700">
        <strong>Example:</strong> Age 25 subscriber wants ₹5,000 pension. Monthly contribution 
        is ₹376 for 35 years. Total investment = ₹1,58,760. Nominee receives ₹8.5 lakh corpus 
        after both subscriber and spouse pass away.
      </p>
    </div>
  `);

  const withdrawalRulesContent = autoLinkContent(`
    <p>
      APY follows strict withdrawal rules to ensure guaranteed pension benefits:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">1. Normal Pension (Age 60+):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Subscriber receives guaranteed monthly pension from age 60 till death</li>
      <li>After subscriber's death, spouse receives same pension for life</li>
      <li>After both deaths, accumulated corpus goes to nominee</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">2. Premature Exit (Before Age 60):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Death:</strong> Spouse can continue or opt for corpus return</li>
      <li><strong>Terminal Illness:</strong> Can exit and receive accumulated corpus</li>
      <li><strong>Voluntary Exit:</strong> Not allowed - only in exceptional circumstances</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">3. Account Closure:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>If stopped paying: Account frozen after 6 months, closed after 12 months</li>
      <li>On closure, contributions + interest returned (minus penalties and charges)</li>
      <li>Guaranteed pension benefit is forfeited on premature closure</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'apy-faq-1',
      question: 'What is Atal Pension Yojana (APY)?',
      answer:
        'APY is a government-backed pension scheme for workers in the unorganized sector. It provides guaranteed monthly pension ranging from ₹1,000 to ₹5,000 starting at age 60. Administered by PFRDA, contributions are auto-debited from your bank account monthly/quarterly/half-yearly.',
    },
    {
      id: 'apy-faq-2',
      question: 'How is APY contribution calculated?',
      answer:
        'APY contributions depend on your joining age (18-40 years) and desired pension amount. Younger subscribers pay less because they have more years to contribute. For example, at age 25 for ₹5,000 pension, monthly contribution is ₹376, while at age 35, it increases to ₹902.',
    },
    {
      id: 'apy-faq-3',
      question: 'What happens if I stop paying APY contributions?',
      answer:
        'If you stop paying, the account may be frozen after 6 months and closed after 12 months of non-payment. You will receive your accumulated corpus (contributions + interest) minus applicable penalties and bank charges. The guaranteed pension benefit is forfeited.',
    },
    {
      id: 'apy-faq-4',
      question: 'Can I increase my pension amount later?',
      answer:
        'Yes. You can upgrade to a higher pension slab once per financial year by paying the differential amount for past periods. For example, you can upgrade from ₹2,000 to ₹5,000 pension by paying the difference plus accrued interest.',
    },
    {
      id: 'apy-faq-5',
      question: 'What happens after the subscriber dies?',
      answer:
        "After the subscriber's death, the spouse continues to receive the same guaranteed pension. After both subscriber and spouse pass away, the accumulated corpus (up to ₹8.5 lakhs for ₹5,000 pension) is returned to the nominee.",
    },
    {
      id: 'apy-faq-6',
      question: 'Is there a penalty for delayed APY payment?',
      answer:
        'Yes. Banks charge ₹1 per month penalty for every ₹100 of contribution for delayed payments. For example, if your monthly contribution is ₹500 and you pay 2 months late, the penalty would be ₹10 (₹5 per month × 2 months).',
    },
    {
      id: 'apy-faq-7',
      question: 'Who is NOT eligible for APY?',
      answer:
        'Income tax payers are NOT eligible for APY (as per rules from October 1, 2022). Also, those who are already covered under statutory social security schemes like EPF, NPS (government sector), or ESIC cannot join APY.',
    },
    {
      id: 'apy-faq-8',
      question: 'APY vs NPS - Which is better?',
      answer:
        'APY is better for guaranteed fixed pension (max ₹5,000/month) with government backing. NPS is better for higher pension potential (market-linked returns of 9-12%) but with investment risk. APY suits low-income workers; NPS suits salaried professionals seeking higher retirement corpus.',
    },
    {
      id: 'apy-faq-9',
      question: 'Can I withdraw APY money before 60?',
      answer:
        'Premature exit is allowed only in exceptional cases like terminal illness or death. In such cases, the accumulated corpus is returned. Normal withdrawals before age 60 are not permitted, making APY a long-term commitment.',
    },
    {
      id: 'apy-faq-10',
      question: 'Did Union Budget 2026 change APY rules?',
      answer:
        'Union Budget 2026 did not introduce any changes to APY contribution rates, pension amounts, or eligibility criteria. The scheme continues to operate as per existing PFRDA guidelines with the same 5 pension slabs (₹1,000 to ₹5,000).',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'APY Calculator',
            url: 'https://fincado.com/apy-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="Atal Pension Yojana (APY) Calculator"
        description="Calculate monthly contribution for APY pension scheme. Check guaranteed pension from ₹1000 to ₹5000, total investment, and nominee corpus based on your joining age."
        url="https://fincado.com/apy-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <APYSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="APY Calculator" />
            <LanguageToggle path="/hi/apy-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-teal-100 text-emerald-700">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                APY Calculator (Atal Pension Yojana)
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                Calculate guaranteed government pension
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="apy-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      MOST POPULAR
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹5,000 Pension (Age 25)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹376
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /month
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      JOINING AGE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Eligible age range
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      18-40
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        years
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      MAX CORPUS
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Nominee receives
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹8.5L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        max
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <APYClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="apy-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Government Guarantee
                </strong>
                APY offers guaranteed pension backed by Government of India. If
                actual returns are lower than promised pension, the government
                makes up the difference from the Consolidated Fund of India.
              </AlertDescription>
            </Alert>

            {/* ✅ APY FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    APY Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      APY contributions are based on pre-defined tables
                      published by PFRDA. The formula is reverse-engineered to
                      achieve target pension corpus:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          Monthly Contribution Calculation
                        </div>
                        <div className="text-lg font-serif space-y-1">
                          <div>
                            Monthly Contribution = Base Amount × (Pension /
                            5000)
                          </div>
                          <div className="text-sm text-slate-600 mt-2">
                            where Base Amount depends on joining age
                          </div>
                        </div>
                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          Total Investment
                        </div>
                        <div className="text-lg font-serif">
                          Total = Monthly Contribution × [(60 - Age) × 12]
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Base Amount:</strong>
                        <span>
                          Pre-defined contribution for ₹5,000 pension at
                          different ages (published by PFRDA)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Pension:</strong>
                        <span>
                          Desired monthly pension (₹1,000, ₹2,000, ₹3,000,
                          ₹4,000, or ₹5,000)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Age:</strong>
                        <span>Joining age (18-40 years)</span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Nominee Corpus:</strong>
                        <span>
                          Fixed corpus for each pension slab (₹1.7L to ₹8.5L)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>Note:</strong> APY uses actuarial tables
                        considering life expectancy, interest rates, and
                        government backing. Unlike market-linked NPS, APY
                        guarantees fixed pension regardless of actual returns.
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: Age 25 Subscriber for ₹5,000 Pension
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Joining Age:</strong>
                        </div>
                        <div>25 years</div>

                        <div>
                          <strong>Retirement Age:</strong>
                        </div>
                        <div>60 years</div>

                        <div>
                          <strong>Contribution Period:</strong>
                        </div>
                        <div>35 years (420 months)</div>

                        <div>
                          <strong>Desired Pension:</strong>
                        </div>
                        <div>₹5,000/month</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Get Base Amount for Age 25
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          Base Amount (for ₹5,000 pension at age 25) =
                          ₹376/month
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate Contribution for Desired Pension
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>Monthly Contribution = ₹376 × (5000 / 5000)</div>
                          <div>Monthly Contribution = ₹376</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Calculate Total Investment
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>Total Months = (60 - 25) × 12 = 420 months</div>
                          <div>Total Investment = ₹376 × 420 = ₹1,57,920</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 4: Nominee Corpus (Pre-defined by PFRDA)
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            Nominee Corpus for ₹5,000 pension = ₹8,50,000
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-slate-700 mb-2">
                            APY Benefits Summary:
                          </div>
                          <div className="flex justify-between">
                            <span>Total Investment (35 years):</span>
                            <strong className="text-slate-900">
                              ₹1,57,920
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Guaranteed Monthly Pension:</span>
                            <strong className="text-emerald-700">₹5,000</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Spouse Gets Same Pension:</span>
                            <strong className="text-emerald-700">₹5,000</strong>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-base">
                              <span className="font-semibold">
                                Nominee Receives Corpus:
                              </span>
                              <strong className="text-emerald-700">
                                ₹8,50,000
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300">
                        <p className="text-xs text-slate-600">
                          <strong>Benefit Analysis:</strong> For ₹1.58 lakh
                          investment over 35 years, you get ₹5,000/month
                          lifelong pension (₹60,000/year). Pension continues to
                          spouse. If you live 25 years post-retirement, total
                          pension received = ₹15 lakh + ₹8.5L corpus to nominee
                          = ₹23.5L total benefit!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Age vs Contribution */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Impact of Joining Age (₹5,000 Pension)
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <div className="p-3 bg-white rounded border border-purple-200">
                        <div className="font-mono text-sm space-y-1">
                          <div>Age 18: ₹210/month × 504 months = ₹1,05,840</div>
                          <div>Age 25: ₹376/month × 420 months = ₹1,57,920</div>
                          <div>Age 30: ₹577/month × 360 months = ₹2,07,720</div>
                          <div>Age 35: ₹902/month × 300 months = ₹2,70,600</div>
                          <div>
                            Age 40: ₹1,454/month × 240 months = ₹3,48,960
                          </div>
                          <div className="mt-2 font-semibold text-purple-700">
                            Joining at 18 vs 40: Save ₹2.43 lakh (70% less!)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    APY contributions are fixed by PFRDA and may be revised
                    periodically. Always check with your bank for latest
                    contribution rates. Calculations assume regular payments
                    without defaults.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Want higher retirement corpus?
                  </strong>
                  <Link
                    href="/nps-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      Try NPS Calculator for market-linked pension with tax
                      benefits
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Atal Pension Yojana (APY)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Features of APY
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={keyFeaturesContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="apy-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Eligibility Criteria for APY
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={eligibilityContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  APY vs NPS vs EPF Comparison
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Feature</TableHead>
                        <TableHead className="text-left">APY</TableHead>
                        <TableHead className="text-left">NPS</TableHead>
                        <TableHead className="text-left">EPF</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Pension Amount
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Fixed (₹1k-₹5k)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Market-linked (No limit)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Not pension (Lump sum)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Government Guarantee
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (100% guaranteed)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          No (Market risk)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (Fixed 8.25%)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Eligibility
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Non-tax payers 18-40
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          All citizens 18-70
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Salaried employees
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Tax Deduction
                        </TableCell>
                        <TableCell className="text-slate-700">
                          No (for non-tax payers)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹2L (80C + 80CCD(1B))
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L (80C)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Contribution
                        </TableCell>
                        <TableCell className="text-slate-700">
                          As low as ₹42/month
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Minimum ₹500/year
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          12% + 3.67% (employer)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Spouse Benefit
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (Same pension)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Yes (via annuity)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Nominee gets corpus
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Premature Exit
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Difficult (Special cases)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Allowed (Partial 25%)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (after conditions)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Best For
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Unorganized sector
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Extra tax benefit
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Salaried with employer
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Expert Verdict:</strong> APY is ideal for low-income
                    workers in unorganized sector seeking guaranteed pension
                    security. For salaried professionals, combine EPF
                    (mandatory) + NPS (₹50k extra tax benefit) for comprehensive
                    retirement planning.
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  APY Contribution Rules and Penalties
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={contributionRulesContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Withdrawal Rules and Exit Policy
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={withdrawalRulesContent} />
                </div>
              </section>

              {/* How to Open */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Open APY Account
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong>Visit Your Bank:</strong> Approach any
                    APY-authorized bank (SBI, HDFC, ICICI, PNB, BoB, Axis, etc.)
                    with savings account
                  </li>
                  <li>
                    <strong>Submit Documents:</strong> Provide Aadhaar card, PAN
                    card, bank passbook, and registered mobile number
                  </li>
                  <li>
                    <strong>Fill APY Form:</strong> Complete subscriber
                    registration form with age proof and nominee details
                  </li>
                  <li>
                    <strong>Choose Pension Amount:</strong> Select desired
                    monthly pension (₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000)
                  </li>
                  <li>
                    <strong>Set Contribution Frequency:</strong> Choose
                    monthly/quarterly/half-yearly auto-debit from your account
                  </li>
                  <li>
                    <strong>Receive PRAN:</strong> Get Permanent Retirement
                    Account Number (PRAN) via SMS and email confirmation
                  </li>
                </ol>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this APY Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>Select your joining age (18-40 years).</li>
                  <li>
                    Choose desired monthly pension amount (₹1,000 to ₹5,000).
                  </li>
                  <li>
                    Select contribution frequency
                    (Monthly/Quarterly/Half-Yearly).
                  </li>
                  <li>
                    View required periodic contribution amount based on your age
                    and pension choice.
                  </li>
                  <li>
                    Check total investment needed till age 60 and nominee corpus
                    amount.
                  </li>
                  <li>
                    Use comparison mode to compare two different scenarios
                    side-by-side.
                  </li>
                  <li>
                    Review Age Impact Simulator to see how joining age affects
                    contribution.
                  </li>
                  <li>
                    Save calculation to history and share via WhatsApp for
                    family planning.
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Retirement Planning Tools
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/nps-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💼
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              NPS Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate National Pension System with ₹2L tax
                              benefits and market-linked returns.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate NPS</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/retirement-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                            🏖️
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                              Retirement Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Plan complete retirement corpus for comfortable
                              post-retirement life.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                              <span>Plan Retirement</span>
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
              <AdSlot id="apy-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="apy-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="apy-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="apy-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
