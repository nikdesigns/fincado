import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import MutualFundsClient from './MutualFundsClient';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import FAQSchema from '@/components/FAQSchema';
import { autoLinkContent } from '@/utils/autoLinker';

// --- UI COMPONENTS ---
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  PieChart,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Mutual Fund Calculator 2026 – Portfolio Returns & Asset Allocation',
  description:
    'Plan your mutual fund portfolio with our advanced calculator. Simulate Equity, Debt, and Gold returns. Check Direct vs Regular plan savings and 2026 tax rules.',
  keywords: [
    'Mutual Fund Calculator',
    'Portfolio Return Calculator',
    'Asset Allocation Planner',
    'Direct vs Regular Mutual Fund',
    'Mutual Fund Tax Calculator 2026',
    'Inflation Adjusted Returns',
  ],
  alternates: {
    canonical: 'https://fincado.com/mutual-funds/',
  },
  openGraph: {
    title: 'Mutual Fund Calculator – Optimize Your Portfolio',
    description:
      'Free tool to simulate multi-asset portfolio growth with inflation adjustment.',
    url: 'https://fincado.com/mutual-funds/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function MutualFundPage() {
  const introContent = autoLinkContent(`
    <p>
      Investing isn't just about picking the "best" stock. It's about building a balanced portfolio. 
      <strong>Asset Allocation</strong> is the practice of spreading your investments across different 
      asset classes like <strong>Equity</strong> (for growth), <strong>Debt</strong> (for stability), and 
      <strong>Gold</strong> (for hedging) to minimize risk.
    </p>
    <p>
      This calculator allows you to model a complete portfolio, unlike basic SIP calculators that 
      only look at one fund type.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      <strong>Equity Mutual Funds:</strong> Gains above ₹1.25 Lakh/year (held >1 year) are taxed at 
      <strong>12.5% (LTCG)</strong>. Short-term gains are taxed at 20%.
    </p>
    <p>
      <strong>Debt Mutual Funds:</strong> Profits are added to your income and taxed as per your slab rate 
      (for investments made after April 1, 2023).
    </p>
  `);

  const strategyContent = autoLinkContent(`
    <ul>
      <li><strong>Aggressive (Growth):</strong> High Equity exposure (>70%) for long-term goals (>10 years). Suitable for young investors.</li>
      <li><strong>Balanced (Moderate):</strong> A mix of Equity (50-60%) and Debt (40-50%) to balance growth with stability.</li>
      <li><strong>Conservative (Safety):</strong> High Debt exposure (>70%) to protect capital. Ideal for retirees.</li>
    </ul>
  `);

  const faqItems = [
    {
      question: 'What is Asset Allocation?',
      answer:
        'Asset allocation is the strategy of dividing your investment portfolio across different asset classes like Equity, Debt, and Gold to balance risk and reward.',
    },
    {
      question: 'How does inflation affect my returns?',
      answer:
        'Inflation reduces the purchasing power of money over time. This calculator shows the "Real Value" of your future corpus by adjusting for expected inflation.',
    },
    {
      question: 'What is the 100 minus Age rule?',
      answer:
        'It is a rule of thumb for asset allocation. Subtract your age from 100 to find the percentage of your portfolio that should be in Equity. For example, at age 30, you should have 70% in Equity.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Mutual Fund Portfolio Calculator"
        description="Simulate returns for a multi-asset portfolio including Equity, Debt, and Gold. Check inflation-adjusted corpus."
        url="https://fincado.com/mutual-funds/"
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
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'Mutual Fund Calculator',
              url: 'https://fincado.com/mutual-funds/',
            },
          ]}
        />

        <header className="no-print my-4">
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Mutual Fund Portfolio Planner" />
            <LanguageToggle path="/hi/mutual-funds" />
          </div>

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
              Mutual Fund Calculator
            </span>
            <span className="block mt-2 text-base sm:text-lg font-medium text-lime-700">
              Optimize your portfolio with asset allocation
            </span>
          </h1>

          <div className="mt-4 max-w-3xl text-slate-500 text-base leading-relaxed">
            <WikiText
              content={`
              <p>
                Design your perfect portfolio. Simulate returns across
                <strong>Equity</strong>, <strong>Debt</strong>, and <strong>Gold</strong>
                allocations and see the real value of your wealth after inflation.
              </p>
            `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <Card className="border-slate-200 shadow-sm overflow-visible">
              <CardContent className="p-0">
                <MutualFundsClient />
              </CardContent>
            </Card>

            {/* AD SLOT */}
            <div className="no-print my-8">
              <AdSlot id="mf-after-calc" type="banner" />
            </div>

            {/* PROMO BOX */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 no-print mb-12">
              <div className="bg-white p-3 rounded-full shadow-xs shrink-0">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold text-emerald-900 text-lg">
                  Confused by Direct vs Regular Plans?
                </h4>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  You could lose up to 1.5% annually in commissions. Switching
                  to Direct Plans can significantly boost your corpus.
                </p>
              </div>
              <Link
                href="/guides/mutual-fund-guide/"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-sm shadow-emerald-200"
              >
                Read Guide <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* CONTENT */}
            <article className="prose prose-slate max-w-none">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mt-0">
                <PieChart className="h-6 w-6 text-indigo-600" /> Why Asset
                Allocation Matters?
              </h2>
              <WikiText content={introContent} />

              <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">
                Direct vs Regular Plans: Which is Better?
              </h3>
              <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm mb-8">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-slate-900">
                        Feature
                      </TableHead>
                      <TableHead className="font-bold text-slate-900">
                        Direct Plan
                      </TableHead>
                      <TableHead className="font-bold text-slate-900">
                        Regular Plan
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        Expense Ratio
                      </TableCell>
                      <TableCell className="text-emerald-600 font-bold">
                        Lower (~0.5% - 1%)
                      </TableCell>
                      <TableCell className="text-red-600">
                        Higher (~1.5% - 2.5%)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        Commission
                      </TableCell>
                      <TableCell className="text-emerald-600">
                        Zero Commission
                      </TableCell>
                      <TableCell className="text-red-600">
                        Agent Commission Included
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        Returns
                      </TableCell>
                      <TableCell className="text-emerald-600 font-bold">
                        Higher
                      </TableCell>
                      <TableCell>Lower</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700">
                        How to Buy
                      </TableCell>
                      <TableCell>Directly from AMC/Apps</TableCell>
                      <TableCell>Via Distributor/Agent</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* AD */}
              <div className="my-10 flex justify-center no-print">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" /> Strategies for
                Every Investor
              </h3>
              <WikiText content={strategyContent} />

              <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-lg my-10">
                <h3 className="text-lg font-bold text-slate-900 mt-0 mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-slate-600" /> Taxation on
                  Mutual Funds (2026 Rules)
                </h3>
                <div className="text-slate-700 text-sm leading-relaxed">
                  <WikiText content={taxContent} />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-6">
                How This Calculator Helps You
              </h3>
              <div className="grid md:grid-cols-3 gap-6 not-prose mb-12">
                <Card className="border-indigo-100 bg-indigo-50/50 shadow-sm">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-indigo-900 mb-2">
                      Blended Returns
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      See the weighted average return of your portfolio (e.g.,
                      12% Equity + 7% Debt = Net Return).
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-emerald-100 bg-emerald-50/50 shadow-sm">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-emerald-900 mb-2">
                      Inflation Reality
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      A ₹1 Crore corpus in 20 years might only be worth ₹30
                      Lakhs today. We show &quot;Real Value&quot;.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-amber-100 bg-amber-50/50 shadow-sm">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-amber-900 mb-2">
                      Diversification
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Visualize if you are over-exposed to risky assets or being
                      too conservative with your goals.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </article>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <AdSlot id="mf-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
