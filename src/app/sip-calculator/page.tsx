import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SIPClient from './SIPClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title:
    'SIP Calculator 2025 – Calculate Mutual Fund Returns (Inflation Adjusted)',
  description:
    'Calculate future value of monthly SIPs with our Mutual Fund Calculator. Check returns with inflation adjustment, tax implications (LTCG), and step-up growth.',
  keywords: [
    'SIP Calculator',
    'Mutual Fund Calculator',
    'Systematic Investment Plan',
    'SIP Return Calculator',
    'Inflation Adjusted SIP Calculator',
    'SIP Tax Calculator',
    'LTCG Tax on SIP',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/sip-calculator',
  },
  openGraph: {
    title: 'SIP Calculator – The Power of Compounding',
    description:
      'Visualize how small monthly investments grow into a large corpus over time.',
    url: 'https://www.fincado.com/sip-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function SIPPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Systematic Investment Plan (SIP)</strong> is a disciplined method of investing in 
      <strong>Mutual Funds</strong>. It allows you to invest a fixed amount regularly (monthly or quarterly), 
      helping you build wealth over the long term through the power of compounding.
    </p>
    <p>
      SIPs work on the principle of <strong>Rupee Cost Averaging</strong>—you buy more units when the market 
      is low and fewer units when the market is high, averaging out your cost of investment.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <p>
      Unlike loans, there are no strict eligibility criteria based on income or credit score. 
      Any individual can start a SIP if they meet these basic requirements:
    </p>
    <ul>
      <li><strong>KYC Compliant:</strong> You must have a PAN Card and be KYC verified.</li>
      <li><strong>Bank Account:</strong> An active savings account is needed for auto-debit mandates.</li>
      <li><strong>Minimum Age:</strong> Anyone above 18 years can invest. Parents can also invest in the name of a minor.</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      SIP returns are taxed based on the type of mutual fund (Equity vs Debt) and the holding period. 
      For <strong>Equity Mutual Funds</strong> (holding > 65% in stocks):
    </p>
    <ul>
      <li><strong>Short Term (STCG):</strong> If sold before 1 year, gains are taxed at 20%.</li>
      <li><strong>Long Term (LTCG):</strong> If sold after 1 year, gains above ₹1.25 Lakh/year are taxed at 12.5%.</li>
    </ul>
  `);

  const advantagesContent = autoLinkContent(`
    <ul>
      <li><strong>Rupee Cost Averaging:</strong> Automatically buy low and sell high.</li>
      <li><strong>Disciplined Savings:</strong> Auto-debit ensures you save first, spend later.</li>
      <li><strong>Flexibility:</strong> You can pause, stop, or increase (step-up) your investment amount anytime.</li>
      <li><strong>Power of Compounding:</strong> Returns earned on your returns accelerate wealth creation over time.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Can I withdraw my SIP money anytime?',
      answer:
        'Yes, for open-ended mutual funds you can withdraw anytime. However, ELSS (tax-saving SIPs) have a mandatory 3-year lock-in period.',
    },
    {
      id: 'faq-2',
      question: 'What happens if I miss a monthly SIP installment?',
      answer:
        'Nothing major happens. Your bank may charge a small NACH bounce penalty, but the SIP is not cancelled and continues from the next month.',
    },
    {
      id: 'faq-3',
      question: 'Which date is best for SIP investment?',
      answer:
        'Over the long term, the SIP date has negligible impact on returns. Choose a date shortly after your salary credit (such as the 5th or 7th) to maintain discipline.',
    },
    {
      id: 'faq-4',
      question: 'What is a Step-Up SIP?',
      answer:
        'A Step-Up SIP allows you to increase your SIP amount every year (for example by 10%) as your income grows, significantly boosting long-term wealth.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="SIP Calculator India"
        description="Free SIP Calculator to estimate returns on your Systematic Investment Plan (SIP) with inflation adjustment."
        url="https://www.fincado.com/sip-calculator"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://www.fincado.com' },
            { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
            {
              name: 'SIP Calculator',
              url: 'https://www.fincado.com/sip-calculator',
            },
          ]}
        />

        <header className="no-print my-4">
          {/* Top actions */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="SIP Calculator" />
            <LanguageToggle path="/hi/sip-calculator" />
          </div>

          {/* Title */}
          <h1
            className="
      text-[clamp(1.9rem,4vw,2.6rem)]
      font-semibold
      leading-tight
      tracking-[-0.02em]
      text-slate-900
    "
          >
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              SIP Calculator
            </span>
            <span className="block mt-2 text-base sm:text-lg font-medium text-lime-700">
              Plan your wealth creation with disciplined investing
            </span>
          </h1>

          {/* Description */}
          <div className="mt-4 max-w-3xl text-slate-500 text-base leading-relaxed">
            <WikiText
              content={`
        <p>
          See the magic of <strong>compounding</strong>. Calculate how your small
          monthly SIP investments grow over time and plan confidently for
          long-term goals.
          <strong> Accurate. Free. Inflation-adjusted.</strong>
        </p>
      `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <SIPClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="sip-after-calc" type="banner" />
            </div>

            {/* --- MOBILE ONLY: RELATED TOOLS --- */}
            <div className="block lg:hidden my-8 no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                More Investment Tools
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/step-up-sip-calculator" className="group">
                  <Card className="border-slate-200 transition hover:-translate-y-0.5 hover:shadow-sm">
                    <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                      <span className="mb-2 text-xl">📈</span>
                      <span className="text-sm font-medium text-slate-900 group-hover:text-emerald-700">
                        Step-up SIP
                      </span>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/lumpsum-calculator" className="group">
                  <Card className="border-slate-200 transition hover:-translate-y-0.5 hover:shadow-sm">
                    <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                      <span className="mb-2 text-xl">💰</span>
                      <span className="text-sm font-medium text-slate-900 group-hover:text-emerald-700">
                        Lumpsum Calculator
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            {/* --- PROMO BOX --- */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-4 sm:p-6">
                {/* Icon */}
                <span className="text-2xl leading-none">🏆</span>

                {/* Content */}
                <div>
                  <strong className="block text-base font-semibold text-emerald-800">
                    Where to invest in 2025?
                  </strong>

                  <Link
                    href="/guides/sip-investment-guide"
                    className="
          mt-1 inline-block
          text-sm
          font-semibold
          text-emerald-700
          underline
          underline-offset-4
          hover:text-emerald-800
        "
                  >
                    Read our Guide: Best SIP Investment Strategies →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- WHAT IS SIP --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is a Systematic Investment Plan (SIP)?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- ELIGIBILITY --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Who Can Invest in SIP?
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={eligibilityContent} />
                    </div>
                  </section>

                  {/* --- AD SLOT (UNCHANGED POSITION) --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- HOW CALCULATOR HELPS --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How This SIP Calculator Helps Your Wealth Planning
                    </h3>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <p>
                Investing without a target is like driving without a destination.
                This calculator helps you <strong>visualize long-term growth</strong>
                and understand the impact of <strong>inflation</strong> on your wealth.
              </p>
            `}
                      />
                    </div>

                    {/* Advantage Grid — SAME SYSTEM AS OTHER PAGES */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-slate-200">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Visualize Growth
                          </h4>
                          <p className="text-sm text-slate-600">
                            See how a ₹5,000 monthly SIP can grow into crores
                            over 20–30 years due to compounding.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-200">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Goal Mapping
                          </h4>
                          <p className="text-sm text-slate-600">
                            Reverse-calculate your SIP by entering a target
                            corpus like ₹1 crore for retirement.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-200">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Inflation Awareness
                          </h4>
                          <p className="text-sm text-slate-600">
                            Understand the <em>real value</em> of returns — ₹10
                            lakh today won’t buy the same in 10 years.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* --- TAXATION --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Taxation on SIP Returns (Updated 2025)
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxContent} />
                    </div>
                  </section>

                  {/* --- FORMULA --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SIP Calculation Formula
                    </h3>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <p>
                SIP returns are calculated using the <strong>Future Value of Annuity Due</strong>
                formula, as investments are made at the beginning of each period.
              </p>
            `}
                      />
                    </div>

                    {/* Formula Box — EXACT EMI STYLE */}
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <BlockMath math="FV = P \\times \\frac{(1 + i)^n - 1}{i} \\times (1 + i)" />
                    </div>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <ul>
                <li><strong>FV</strong> = Future Value</li>
                <li><strong>P</strong> = Monthly Investment Amount</li>
                <li><strong>i</strong> = Monthly Rate (Annual Rate ÷ 1200)</li>
                <li><strong>n</strong> = Total Number of Months</li>
              </ul>
            `}
                      />
                    </div>
                  </section>

                  {/* --- ADVANTAGES --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Key Advantages of SIP Investing
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={advantagesContent} />
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* --- FAQ SECTION --- */}
            <section className="no-print my-12">
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

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <AdSlot id="sip-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
