'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/* ---------- TYPES ---------- */
type NavItem = {
  href: string;
  label: string;
  icon?: string;
  isNew?: boolean;
};

/* ---------- DATA ---------- */
const TOP_TOOLS: NavItem[] = [
  { href: '/sip-calculator/', label: 'SIP Calculator', icon: '📈' },
  { href: '/emi-calculator/', label: 'Loan EMI Calculator', icon: '🏠' },
  { href: '/loans/home-loan/', label: 'Home Loan EMI Calculator', icon: '🏡' },
  {
    href: '/sukanya-samriddhi/',
    label: 'SSY Calculator',
    icon: '👧',
    isNew: true,
  },
  { href: '/ppf-calculator/', label: 'PPF Calculator', icon: '💰' },
  { href: '/income-tax-calculator/', label: 'Tax Calculator', icon: '🧾' },
  { href: '/credit-score/', label: 'Check Credit Score', icon: '🛡️' }
];

const TRENDING_GUIDES: NavItem[] = [
  {
    href: '/guides/sukanya-samriddhi-yojana-guide-2025/',
    label: 'Sukanya Samriddhi Yojana Guide 2025',
  },
  {
    href: '/guides/elss-funds-guide-2025/',
    label: 'ELSS Funds: Save Tax (80C)',
  },
  {
    href: '/guides/sovereign-gold-bond-sgb-guide/',
    label: 'Sovereign Gold Bonds (SGB)',
  },
  {
    href: '/guides/health-insurance-buying-guide/',
    label: 'Health Insurance Checklist',
  }
];

/* ---------- COMPONENT ---------- */
export default function FinancialNavWidget() {
  return (
    <aside className="space-y-6">
      {/* --- POPULAR TOOLS --- */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900">
            Popular Tools
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {TOP_TOOLS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                group
                flex
                items-center
                justify-between
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-emerald-50
                hover:text-emerald-700
              "
            >
              <span className="flex items-center gap-3">
                <span className="text-base leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </span>

              {item.isNew && (
                <Badge className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5">
                  NEW
                </Badge>
              )}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-200">
            <Link
              href="/calculators/"
              className="
                block
                text-center
                text-sm
                font-semibold
                text-emerald-700
                hover:underline
              "
            >
              View All Calculators →
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* --- TRENDING GUIDES --- */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900">
            Trending Guides
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {TRENDING_GUIDES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                group
                flex
                items-start
                gap-2
                text-sm
                text-slate-600
                transition
                hover:text-emerald-700
              "
            >
              <span className="mt-1 text-slate-300 group-hover:text-emerald-500">
                •
              </span>
              <span className="leading-relaxed">{item.label}</span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
