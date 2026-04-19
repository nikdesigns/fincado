'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronRight,
  FileText,
  Home,
  PiggyBank,
  Shield,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { getCurrentFiscalYear, getUpdatedForFYText } from '@/lib/fiscalYear';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type ToolLink = {
  href: string;
  label: string;
  note: string;
  lucideIcon: IconType;
  badge?: string;
  isNew?: boolean;
};

type GuideLink = {
  href: string;
  label: string;
  note: string;
  badge?: string;
};

const TOP_TOOLS: ToolLink[] = [
  {
    href: '/sip-calculator/',
    label: 'SIP Calculator',
    note: 'Estimate long-horizon wealth with monthly investing.',
    lucideIcon: TrendingUp,
  },
  {
    href: '/emi-calculator/',
    label: 'Loan EMI Calculator',
    note: 'Check EMI, total interest, and repayment duration quickly.',
    lucideIcon: Calculator,
  },
  {
    href: '/loans/home-loan/',
    label: 'Home Loan EMI',
    note: 'Validate affordability and tenure scenarios before applying.',
    lucideIcon: Home,
  },
  {
    href: '/sukanya-samriddhi/',
    label: 'Sukanya Samriddhi (SSY)',
    note: 'Track long-term corpus for education and marriage goals.',
    lucideIcon: Sparkles,
    isNew: true,
  },
  {
    href: '/ppf-calculator/',
    label: 'PPF Calculator',
    note: 'Project tax-free maturity with yearly contribution planning.',
    lucideIcon: PiggyBank,
  },
  {
    href: '/income-tax-calculator/',
    label: 'Income Tax Calculator',
    note: 'Compare old vs new regime impact on take-home income.',
    lucideIcon: FileText,
  },
  {
    href: '/credit-score/',
    label: 'Check Credit Score',
    note: 'Understand credit health before loan applications.',
    lucideIcon: Shield,
  },
];

const TRENDING_GUIDES: GuideLink[] = [
  {
    href: '/guides/sukanya-samriddhi-yojana-guide-2026/',
    label: 'Sukanya Samriddhi Yojana Guide',
    note: 'Contribution rules, maturity logic, and withdrawal timing.',
    badge: 'Popular',
  },
  {
    href: '/guides/elss-funds-guide-2026/',
    label: 'ELSS Funds: Save Tax (80C)',
    note: 'Tax-saving equity strategy for long-term growth.',
  },
  {
    href: '/guides/sovereign-gold-bond-sgb-guide/',
    label: 'Sovereign Gold Bonds (SGB)',
    note: 'Compare physical gold vs SGB return and taxation.',
  },
  {
    href: '/guides/health-insurance-buying-guide/',
    label: 'Health Insurance Checklist',
    note: 'Coverage and premium decision framework for families.',
  },
];

export default function FinancialNavWidget() {
  const fy = getCurrentFiscalYear();
  const updatedForFYText = getUpdatedForFYText();

  return (
    <aside className="space-y-5">
      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-linear-to-br from-white to-slate-50 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
                <Calculator className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Sidebar Desk
                </div>
                <div className="text-base font-semibold text-slate-900">
                  Decision Navigation
                </div>
              </div>
            </div>
            <Badge className="border border-brand-200 bg-brand-50 text-[11px] font-bold text-brand-700">
              {fy.fullFormat}
            </Badge>
          </div>
          <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600">
            Move to the exact calculator you need for loan, tax, and savings decisions.
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {TOP_TOOLS.map((item) => {
              const IconComponent = item.lucideIcon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start justify-between gap-3 px-4 py-3 transition-all hover:bg-brand-50/60"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-brand-100 group-hover:text-brand-700">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-slate-800 group-hover:text-brand-800">
                          {item.label}
                        </span>
                        {item.isNew ? (
                          <Badge className="h-5 bg-rose-100 px-1.5 text-[10px] font-bold text-rose-700 hover:bg-rose-100">
                            NEW
                          </Badge>
                        ) : null}
                        {item.badge ? (
                          <Badge className="h-5 bg-brand-50 px-1.5 text-[10px] font-bold text-brand-700 hover:bg-brand-50">
                            {item.badge}
                          </Badge>
                        ) : null}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500">
                        {item.note}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-brand-700" />
                </Link>
              );
            })}
          </div>

          <div className="border-t border-slate-200 bg-slate-50/70 p-4">
            <Link
              href="/calculators/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              <span>Open Full Calculator Directory</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-linear-to-br from-brand-50/50 to-white pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="text-base font-semibold text-slate-900">Trending Guides</div>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-600">
            Playbooks and explainers mapped to current calculator usage.
          </p>
        </CardHeader>

        <CardContent className="space-y-3 p-4">
          {TRENDING_GUIDES.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5 transition-all hover:border-brand-200 hover:bg-brand-50/40"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-700">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-slate-800 group-hover:text-brand-800">
                    {item.label}
                  </span>
                  {item.badge ? (
                    <Badge className="h-5 bg-brand-50 px-1.5 text-[10px] font-bold text-brand-700 hover:bg-brand-50">
                      {item.badge}
                    </Badge>
                  ) : null}
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500">
                  {item.note}
                </p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 group-hover:text-brand-700" />
            </Link>
          ))}

          <div className="pt-1">
            <Link
              href="/guides/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <span>Browse All Guides</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-semibold text-slate-900">Operations Snapshot</div>
            <Badge className="border border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-white">
              Active
            </Badge>
          </div>
          <ul className="space-y-2 text-xs font-medium text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{updatedForFYText}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>Loan, tax, and savings workflows mapped in one sidebar.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>Use Compare Rates to validate lender spreads before applying.</span>
            </li>
          </ul>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-700 hover:text-brand-800"
          >
            Talk to Support
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
}
