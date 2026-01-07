// src/app/compare-loans/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import LoanComparison from '@/components/LoanComparison'; // Your existing logic component
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import ShareTools from '@/components/ShareTools';

// --- UI COMPONENTS ---
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Scale,
  PiggyBank,
  AlertCircle,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Loan Comparison Tool – Compare Interest Rates & EMI | Fincado',
  description:
    'Compare two loan offers side-by-side. Check which loan saves you more money on interest and EMI. Best for Home Loan and Personal Loan comparison.',
  keywords: [
    'Loan Comparison',
    'Compare Loans',
    'Home Loan Comparison',
    'Loan Calculator',
    'EMI Difference',
  ],
};

export default function CompareLoansPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* --- HEADER SECTION --- */}
      <header className="text-center max-w-3xl mx-auto my-12">
        <Badge
          variant="secondary"
          className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 font-semibold uppercase tracking-wider"
        >
          Free Savings Tool
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Compare Loan Offers
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Confused between two bank offers? Don&apos;t just look at the EMI. Use
          this tool to visualize the
          <strong className="text-slate-900">
            {' '}
            total interest difference{' '}
          </strong>
          and find out which loan is actually cheaper in the long run.
        </p>

        <div className="mt-6 flex justify-center">
          <ShareTools title="Compare Loan Offers - Fincado" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
        {/* --- LEFT COLUMN (Main Tool) --- */}
        <div className="lg:col-span-8 min-w-0 space-y-8">
          {/* CALCULATOR CARD */}
          <Card className="border-slate-200 shadow-md overflow-hidden bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <Scale className="h-5 w-5 text-indigo-600" />
                Side-by-Side Comparison
              </CardTitle>
              <CardDescription>
                Enter the details for two different loans to see the breakdown.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {/* Your Existing Widget Logic */}
              <LoanComparison />

              {/* Micro-Trust Indicator below calculator */}
              <div className="mt-6 flex items-start gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-indigo-900">
                    Smart Tip
                  </h4>
                  <p className="text-xs text-indigo-800/80 mt-1">
                    A lower EMI isn&apos;t always better. Sometimes a longer
                    tenure reduces your monthly payment but drastically
                    increases the <strong>Total Interest</strong> you pay.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AD SLOT: Mid Content */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center no-print">
            <AdSlot id="compare-mid" type="leaderboard" label="Sponsored" />
          </div>

          {/* SEO CONTENT: Features Grid */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingDown className="h-6 w-6 text-emerald-600" />
              What to look for when comparing?
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: PiggyBank,
                  color: 'text-emerald-500',
                  title: 'Total Interest Payable',
                  desc: 'This is the real cost of the loan. Always aim for the lowest total interest, not just the lowest EMI.',
                },
                {
                  icon: AlertCircle,
                  color: 'text-amber-500',
                  title: 'Processing Fees',
                  desc: 'Some banks offer low rates but charge high processing fees (up to 1%). Factor this into your decision.',
                },
                {
                  icon: TrendingDown,
                  color: 'text-blue-500',
                  title: 'Prepayment Charges',
                  desc: 'Ensure your loan has zero foreclosure charges so you can pay it off early if you have extra cash.',
                },
                {
                  icon: Scale,
                  color: 'text-purple-500',
                  title: 'Repo Rate Linking',
                  desc: 'For home loans, ensure the rate is linked to the Repo Rate (RLLR) for transparency.',
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5">
                    <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                    <h3 className="font-bold text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-snug">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* SEO CONTENT: FAQs Accordion */}
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Common Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className="bg-white border border-slate-200 rounded-lg mb-3 px-4"
              >
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  Is 8.5% fixed better than 8.4% floating?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pt-2">
                  Usually, floating rates are better for long-term loans (like
                  Home Loans) because they are cheaper and have no prepayment
                  penalties. Fixed rates offer peace of mind but often come with
                  a premium and penalties for early closure.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white border border-slate-200 rounded-lg mb-3 px-4"
              >
                <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                  Should I switch my loan for a 0.25% difference?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pt-2">
                  Yes! On a ₹50 Lakh loan for 20 years, a 0.25% difference saves
                  you approximately ₹1.8 Lakhs. However, check if the
                  &quot;Balance Transfer&quot; fees eat up your savings.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        {/* --- RIGHT COLUMN (Sidebar) --- */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Navigation Widget */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800">
                More Calculators
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <FinancialNavWidget />
            </CardContent>
          </Card>

          {/* Comparison Links */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800">
                Top Bank Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <ul className="divide-y divide-slate-100">
                {/* Hardcoded popular links for quick access */}
                {[
                  { name: 'HDFC vs SBI', url: '/bank-emi/hdfc' },
                  { name: 'ICICI vs Axis', url: '/bank-emi/icici' },
                  { name: 'Kotak vs BoB', url: '/bank-emi/kotak' },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.url}
                      className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors group"
                    >
                      <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">
                        {link.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Sticky Sidebar Ad */}
          <div className="sticky top-24 z-10 no-print">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot type="box" id="compare-sidebar" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
