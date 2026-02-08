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
import {
  CheckCircle2,
  ArrowRight,
  LineChart,
  BadgeCheck,
  TrendingUp,
} from 'lucide-react';

// --- 1. SEO METADATA (Updated 2026) ---
export const metadata: Metadata = {
  title: 'All Financial Calculators | EMI, SIP, Tax & Retirement (2026)',
  description:
    'Browse our complete suite of professional calculators for Indian investors: EMI, Home Loan, SIP, Inflation, PPF, Retirement Planner, GST Calculator and more. Updated for Budget 2026.',
  keywords: [
    'financial calculators',
    'EMI calculator',
    'SIP calculator',
    'inflation calculator',
    'loan calculators india',
    'investment calculators',
    'retirement planning tools',
    'budget 2026 calculators'
  ],
  openGraph: {
    title: 'All Financial Calculators | Fincado (2026 Edition)',
    description:
      'Free calculators for loans, investments, inflation, taxes and retirement planning. Verified for FY 2026-27.',
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
          { name: 'Calculators', url: 'https://fincado.com/calculators' }
        ]}
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* -------- MAIN CONTENT (Left Column) -------- */}
          <div className="lg:col-span-8 min-w-0 space-y-12 mt-10">
            {/* --- HEADER --- */}
            <header className="relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="border-slate-200 text-slate-700 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider"
                  >
                    Tools & Utilities
                  </Badge>
                  {/* ✅ Budget 2026 Badge */}
                  <Badge
                    variant="outline"
                    className="border-emerald-200 text-emerald-700 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <BadgeCheck className="w-3 h-3" />
                    Budget 2026 Ready
                  </Badge>
                </div>
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
                confidence. Updated for <strong>FY 2026-27</strong>.
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

              {/* ✅ VISUAL: Compounding Growth Chart (CSS Only) */}
              <Card className="my-8 border-slate-200 bg-white not-prose">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                      The Power of Compounding
                    </h3>
                  </div>
                  <div className="flex items-end gap-2 h-40 w-full sm:w-2/3 mx-auto">
                    {/* Bars representing exponential growth */}
                    {[10, 15, 22, 32, 45, 60, 80, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-emerald-100 rounded-t-sm relative group"
                        style={{ height: `${h}%` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 w-full bg-emerald-500 rounded-t-sm transition-all duration-1000 group-hover:bg-emerald-600"
                          style={{ height: `${h * 0.7}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    Visualizing how small investments grow exponentially over
                    time
                  </p>
                </CardContent>
              </Card>

              {/* Quick Links Card */}
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
                        name: 'Compare Loan Rates',
                        url: '/compare-loans',
                        label: 'Save on Interest',
                        highlight: true,
                      },
                      {
                        name: 'Income Tax Calc',
                        url: '/income-tax-calculator',
                        label: 'New vs Old Regime',
                      },
                      {
                        name: 'SIP Calculator',
                        url: '/sip-calculator',
                        label: 'Grow wealth monthly',
                      },
                      {
                        name: 'Home Loan EMI',
                        url: '/loans/home-loan',
                        label: 'Plan housing loan',
                      },
                      {
                        name: 'Retirement Planner',
                        url: '/retirement-calculator',
                        label: 'Long-term security',
                      },
                      {
                        name: 'Inflation Tool',
                        url: '/inflation-calculator',
                        label: 'Protect power',
                      }
                    ].map((item) => (
                      <li key={item.url}>
                        <Link
                          href={item.url}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-all group ${
                            item.highlight
                              ? 'bg-white border-emerald-200 hover:border-emerald-400 shadow-sm'
                              : 'bg-white border-slate-200 hover:border-emerald-300'
                          }`}
                        >
                          <div>
                            <span
                              className={`block font-bold text-sm group-hover:text-emerald-700 ${
                                item.highlight
                                  ? 'text-emerald-700'
                                  : 'text-slate-900'
                              }`}
                            >
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
          <aside className="lg:col-span-4 space-y-8 mb-10">
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
