import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GoalPlanningClient from './GoalPlanningClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import FAQSchema from '@/components/FAQSchema';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Target, Info, ArrowRight } from 'lucide-react';
import { GoalPlanningSchemas } from '@/components/schemas/GoalPlanningSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

const updatedLabel = getCurrentMonthYearLabel();

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'Goal Planning Calculator 2026 – Financial Goal Planning India',
  description:
    'Free Goal Planning Calculator for India. Calculate monthly SIP, lump sum needed for retirement, education, house purchase, and other financial goals. Plan with inflation adjustment.',
  keywords: [
    'goal planning calculator',
    'financial goal calculator',
    'retirement goal calculator',
    'education goal calculator',
    'house purchase calculator',
    'goal based investment calculator',
    'sip for goals calculator',
    'inflation adjusted goal calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/goal-planning-calculator/',
  },
  openGraph: {
    title: 'Goal Planning Calculator – Plan Your Financial Goals',
    description:
      'Calculate how much to invest monthly or as lump sum to achieve your financial goals. Account for inflation and investment returns.',
    url: 'https://fincado.com/goal-planning-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-goal-planning-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Goal Planning Calculator',
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

export default function GoalPlanningCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Goal Planning Calculator</strong> helps you determine how much you need to invest 
      today or monthly to achieve specific financial goals like <strong>retirement</strong>, 
      <strong>children's education</strong>, <strong>buying a house</strong>, or any major expense. 
      It accounts for <strong>inflation</strong> to give you realistic targets and shows whether 
      SIP, lump sum, or a combination works best.
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Clear Roadmap:</strong> Know exactly how much to save every month to reach your goals.</li>
      <li><strong>Inflation Adjustment:</strong> Automatically adjusts goal amount for inflation, so your target remains realistic.</li>
      <li><strong>Multiple Goals:</strong> Plan for retirement, education, house, vacation, or any custom goal with different timelines.</li>
      <li><strong>SIP vs Lump Sum:</strong> Compare whether monthly SIP or one-time investment works better for your situation.</li>
      <li><strong>Track Progress:</strong> Use the calculator regularly to review and adjust your savings strategy.</li>
    </ul>
  `);

  const goalTypesContent = autoLinkContent(`
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-3 text-left font-semibold border">Goal Type</th>
            <th class="p-3 text-left font-semibold border">Typical Timeline</th>
            <th class="p-3 text-left font-semibold border">Recommended Investment</th>
            <th class="p-3 text-left font-semibold border">Expected Return</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Retirement</td>
            <td class="p-3 border">20-40 years</td>
            <td class="p-3 border">Equity SIP + PPF + NPS</td>
            <td class="p-3 border text-emerald-700">10-12% p.a.</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Child Education</td>
            <td class="p-3 border">10-18 years</td>
            <td class="p-3 border">Balanced Mutual Funds + SIP</td>
            <td class="p-3 border text-emerald-700">9-11% p.a.</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">House Purchase</td>
            <td class="p-3 border">5-15 years</td>
            <td class="p-3 border">Debt + Equity Mix</td>
            <td class="p-3 border text-emerald-700">8-10% p.a.</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Marriage</td>
            <td class="p-3 border">5-10 years</td>
            <td class="p-3 border">Hybrid Funds + SIP</td>
            <td class="p-3 border text-emerald-700">9-10% p.a.</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Vacation / Car</td>
            <td class="p-3 border">1-5 years</td>
            <td class="p-3 border">Debt Funds + FD + RD</td>
            <td class="p-3 border text-emerald-700">6-8% p.a.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is goal-based financial planning?',
      answer:
        'Goal-based planning is an investment approach where you first identify specific financial goals (like retirement, education, house), then calculate how much to invest monthly or as lump sum to achieve them. It helps you stay disciplined and track progress toward real-life objectives.',
    },
    {
      id: 'faq-2',
      question: 'How does inflation affect my financial goals?',
      answer:
        "Inflation reduces purchasing power over time. If you need ₹50 lakh for your child's education today, assuming 6% education inflation, you would need ₹89.5 lakh after 10 years. Goal planning calculators adjust your target amount for inflation automatically.",
    },
    {
      id: 'faq-3',
      question: 'Should I use SIP or lump sum for goal planning?',
      answer:
        'It depends on your cash flow. If you have regular income, SIP is better as it builds discipline and averages cost. If you have a windfall (bonus, inheritance), combine lump sum with SIP for faster goal achievement. Use the calculator to compare both approaches.',
    },
    {
      id: 'faq-4',
      question: 'Can I plan for multiple goals at once?',
      answer:
        'Yes! It is recommended to create separate investment buckets for each goal. For example, run the calculator for retirement, child education, and house separately, then sum up the monthly SIPs. This prevents mixing funds and helps with disciplined withdrawals.',
    },
    {
      id: 'faq-5',
      question: 'What return should I assume for different goals?',
      answer:
        'For goals 10+ years away, assume 10-12% for equity funds. For 5-10 year goals, use 8-10% (balanced/hybrid funds). For short-term goals (1-5 years), assume 6-8% (debt funds, FD). Always be conservative with return assumptions.',
    },
    {
      id: 'faq-6',
      question: 'What if I already have some savings for my goal?',
      answer:
        'Use the existing corpus field in the calculator. It calculates how much this amount will grow by your goal date and reduces your required monthly SIP or additional lump sum accordingly. Existing savings significantly reduce monthly burden.',
    },
    {
      id: 'faq-7',
      question: 'How often should I review my goal plan?',
      answer:
        'Review at least once a year or whenever there is a major life change (salary hike, new expense, marriage). Adjust your SIP amounts, rebalance between equity and debt, and update inflation assumptions based on recent trends.',
    },
    {
      id: 'faq-8',
      question: 'What happens if I miss my SIP installments?',
      answer:
        'Missing SIP installments delays goal achievement. If you must stop, restart as soon as possible or increase SIP amount later. The calculator shows how even small delays push your target date forward or require higher monthly contributions.',
    },
    {
      id: 'faq-9',
      question: 'Is goal planning suitable for short-term goals?',
      answer:
        'Yes, but with lower risk. For goals under 3 years, avoid equity-heavy investments. Use debt mutual funds, recurring deposits, or fixed deposits. Goal planning works for any timeline, but asset allocation differs based on horizon.',
    },
    {
      id: 'faq-10',
      question: 'Can I use goal planning for retirement?',
      answer:
        'Absolutely! Retirement is the most important financial goal. Input your desired retirement corpus (accounting for inflation and life expectancy), years to retirement, and expected returns. The calculator shows if you are on track or need to save more monthly.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Goal Planning Calculator',
            url: 'https://fincado.com/goal-planning-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Goal Planning Calculator"
        description="Calculate monthly SIP or lump sum investment needed to achieve your financial goals like retirement, education, house purchase with inflation adjustment."
        url="https://fincado.com/goal-planning-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <GoalPlanningSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Goal Planning Calculator – Plan Your Financial Goals" />
            <LanguageToggle path="/hi/goal-planning-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Goal Planning Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-indigo-700">
                Plan Financial Goals with Inflation-Adjusted Targets
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="goal-planning-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-indigo-200 bg-linear-to-br from-indigo-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-indigo-700 mb-1">
                      Average Inflation (India)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      General expenses (2015-2025)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      5–6%
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
                      Education Inflation
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      School and college fees (India)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8–10%
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
                      Updated Data
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Last reviewed calculation
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <GoalPlanningClient />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="goal-planning-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-indigo-50/50 border-indigo-200 text-slate-600">
              <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Start Early, Stay Consistent
                </strong>
                The earlier you start planning for goals, the lower your
                required monthly SIP. Compounding and time work in your favor.
                Even a 5-year head start can reduce monthly burden by 40-50%.
              </AlertDescription>
            </Alert>

            {/* Benefits & Concepts */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Benefits of Goal-Based Planning
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #3: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="goal-planning-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      How to Use This Goal Planning Calculator Effectively
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        Identify all major financial goals with specific
                        timelines (retirement, education, house, marriage).
                      </li>
                      <li>
                        Research current costs (e.g., engineering college fees
                        today) and use realistic inflation rates (6-10% for
                        education, 5-6% for general).
                      </li>
                      <li>
                        Input any existing savings or investments earmarked for
                        this goal to reduce monthly SIP burden.
                      </li>
                      <li>
                        Choose expected returns based on asset allocation:
                        10-12% for equity (long-term), 7-9% for balanced, 6-7%
                        for debt.
                      </li>
                      <li>
                        Review annually and adjust SIP amounts if income
                        increases, goal timelines change, or returns deviate
                        from expectations.
                      </li>
                    </ul>
                  </section>

                  {/* Related calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Calculators
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/sip-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                📊
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  SIP Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate SIP returns and plan systematic
                                  investments.
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

                      <Link href="/retirement-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                                🧓
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                                  Retirement Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Plan your retirement corpus with detailed
                                  analysis.
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                                  <span>Plan Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* Goal Types Table */}
            <section className="no-print mt-10">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Recommended Investment Strategy by Goal Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-slate-700 leading-relaxed">
                    <WikiText content={goalTypesContent} />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="goal-planning-before-faq"
                type="leaderboard"
                lazyLoad={true}
              />
            </div>

            {/* FAQ */}
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

            {/* 🎯 AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="goal-planning-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #6: SIDEBAR TOP */}
              <AdSlot id="goal-planning-sidebar-top" type="skyscraper" />

              <FinancialNavWidget />
              <SidebarCompareWidget />

              {/* 🎯 AD #7: SIDEBAR BOTTOM */}
              <AdSlot
                id="goal-planning-sidebar-bottom"
                type="box"
                lazyLoad={true}
              />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
