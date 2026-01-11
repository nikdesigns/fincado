// src/app/calculators/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorsGrid from './CalculatorsGrid';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AdSlot from '@/components/AdSlot';
import LanguageToggle from '@/components/LanguageToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, LineChart } from 'lucide-react';

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: 'All Financial Calculators | EMI, SIP, Inflation & Tax Tools',
  description:
    'Browse our complete suite of professional calculators for Indian investors: EMI, Home Loan, SIP, Inflation, PPF, Retirement Planner, GST Calculator and more.',
  keywords: [
    'financial calculators',
    'EMI calculator',
    'SIP calculator',
    'inflation calculator',
    'loan calculators india',
    'investment calculators',
    'retirement planning tools',
  ],
  openGraph: {
    title: 'All Financial Calculators | Fincado',
    description:
      'Free calculators for loans, investments, inflation, taxes and retirement planning.',
    url: 'https://fincado.com/calculators',
    type: 'website',
  },
};

export default function CalculatorsPage() {
  return (
    <>
      {/* ✅ BREADCRUMB STRUCTURED DATA */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators' },
        ]}
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* -------- MAIN CONTENT (Left Column) -------- */}
          <div className="lg:col-span-8 min-w-0 space-y-12 mt-10">
            {/* --- HEADER --- */}
            <header className="relative">
              <div className="flex justify-between items-start mb-4">
                <Badge
                  variant="outline"
                  className="border-emerald-200 text-emerald-700 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider"
                >
                  Tools & Utilities
                </Badge>
                <div className="no-print">
                  <LanguageToggle path="/hi/calculators" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                All Financial Calculators
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
                Use our free financial calculators to plan loans, investments,
                inflation impact, taxes, and retirement with clarity and
                confidence.
              </p>
            </header>

            {/* Top Ad */}
            <div className="no-print w-full bg-slate-50 min-h-22.5 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden">
              <AdSlot id="calc-hub-top" type="leaderboard" />
            </div>

            {/* --- CALCULATORS GRID COMPONENT --- */}
            <section>
              <CalculatorsGrid />
            </section>

            {/* Mid Ad */}
            <div className="no-print w-full bg-slate-50 min-h-22.5 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden my-8">
              <AdSlot id="calc-hub-mid" type="leaderboard" />
            </div>

            {/* --- SEO CONTENT SECTION --- */}
            <section className="prose prose-slate prose-lg max-w-none">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                <LineChart className="h-7 w-7 text-emerald-600" />
                Why Use Financial Calculators?
              </h2>
              <p className="text-slate-600">
                Financial calculators help you make informed money decisions by
                visualizing real outcomes. Whether you are comparing EMIs,
                planning investments, or estimating inflation impact,
                calculators remove guesswork and provide mathematical certainty.
              </p>
              [Image of compound interest graph growth over time]
              <Card className="my-8 border-slate-200 bg-slate-50/50 not-prose">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-800">
                    Quick Links: Most Popular Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        name: 'EMI Calculator',
                        url: '/emi-calculator',
                        label: 'Plan repayments',
                      },
                      {
                        name: 'SIP Calculator',
                        url: '/sip-calculator',
                        label: 'Grow wealth monthly',
                      },
                      {
                        name: 'Inflation Tool',
                        url: '/inflation-calculator',
                        label: 'Protect power',
                      },
                      {
                        name: 'FD Calculator',
                        url: '/fd-calculator',
                        label: 'Check returns',
                      },
                      {
                        name: 'Retirement Planner',
                        url: '/retirement-calculator',
                        label: 'Long-term security',
                      },
                    ].map((item) => (
                      <li key={item.url}>
                        <Link
                          href={item.url}
                          className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all group"
                        >
                          <div>
                            <span className="block font-bold text-slate-900 text-sm group-hover:text-emerald-700">
                              {item.name}
                            </span>
                            <span className="block text-xs text-slate-500">
                              {item.label}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <h2 className="text-2xl font-bold text-slate-900 mt-10">
                How EMI & Loan Calculators Help
              </h2>
              <p className="text-slate-600 mb-6">
                Loan calculators show how interest rate and tenure affect your
                monthly EMI and total interest. Shorter tenures reduce interest
                but increase EMI, while longer tenures improve cash flow at a
                higher total cost.
              </p>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg not-prose mb-8">
                <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Pro Tip
                </h4>
                <p className="text-sm text-emerald-800">
                  Always check the &quot;Total Interest Payable&quot; field in
                  our calculators. Small changes in interest rates can save you
                  lakhs over 20 years.
                </p>
              </div>
              <Separator className="my-8" />
              <LegalNote />
            </section>

            {/* Bottom Ad */}
            <div className="no-print w-full bg-slate-50 min-h-22.5 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden mt-8">
              <AdSlot id="calc-hub-bottom" type="leaderboard" />
            </div>
          </div>

          {/* -------- SIDEBAR (Right Column) -------- */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Sidebar Ad */}
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white min-h-62.5 flex items-center justify-center no-print">
                <AdSlot id="calc-hub-sidebar" type="box" />
              </div>

              {/* Financial Nav Widget */}
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
