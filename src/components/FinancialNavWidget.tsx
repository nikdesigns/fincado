'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calculator,
  Home,
  PiggyBank,
  TrendingUp,
  FileText,
  Shield,
  Sparkles,
  ArrowRight,
  BookOpen,
  ChevronRight,
} from 'lucide-react';

/* ---------- TYPES ---------- */
type NavItem = {
  href: string;
  label: string;
  icon?: string;
  lucideIcon?: React.ElementType;
  isNew?: boolean;
  badge?: string;
};

/* ---------- DATA ---------- */
const TOP_TOOLS: NavItem[] = [
  {
    href: '/sip-calculator/',
    label: 'SIP Calculator',
    icon: '📈',
    lucideIcon: TrendingUp,
  },
  {
    href: '/emi-calculator/',
    label: 'Loan EMI Calculator',
    icon: '🏠',
    lucideIcon: Calculator,
  },
  {
    href: '/loans/home-loan/',
    label: 'Home Loan EMI',
    icon: '🏡',
    lucideIcon: Home,
  },
  {
    href: '/sukanya-samriddhi/',
    label: 'SSY Calculator',
    icon: '👧',
    lucideIcon: Sparkles,
    isNew: true,
  },
  {
    href: '/ppf-calculator/',
    label: 'PPF Calculator',
    icon: '💰',
    lucideIcon: PiggyBank,
  },
  {
    href: '/income-tax-calculator/',
    label: 'Tax Calculator',
    icon: '🧾',
    lucideIcon: FileText,
    badge: '2026',
  },
  {
    href: '/credit-score/',
    label: 'Check Credit Score',
    icon: '🛡️',
    lucideIcon: Shield,
  },
];

const TRENDING_GUIDES: NavItem[] = [
  {
    href: '/guides/sukanya-samriddhi-yojana-guide-2025/',
    label: 'Sukanya Samriddhi Yojana Guide',
    badge: 'Popular',
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
  },
];

/* ---------- COMPONENT ---------- */
export default function FinancialNavWidget() {
  return (
    <aside className="space-y-6">
      {/* --- POPULAR TOOLS --- */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-linear-to-r from-emerald-50 to-teal-50 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm">
              <Calculator className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-base font-bold text-slate-900">
              Popular Tools
            </CardTitle>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Most used calculators & tools
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
                  className="group flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <span className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center transition-colors shrink-0">
                      {IconComponent ? (
                        <IconComponent className="w-4 h-4 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                      ) : (
                        <span className="text-base leading-none">
                          {item.icon}
                        </span>
                      )}
                    </div>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {item.label}
                    </span>
                  </span>

                  <div className="flex items-center gap-2">
                    {item.isNew && (
                      <Badge className="bg-rose-500 hover:bg-rose-600 text-white text-[10px] px-2 py-0.5 font-bold shadow-sm">
                        NEW
                      </Badge>
                    )}
                    {item.badge && !item.isNew && (
                      <Badge className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 font-bold border border-blue-200">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-200 bg-slate-50/50">
            <Link
              href="/calculators/"
              className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors group"
            >
              <span>View All Calculators</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* --- TRENDING GUIDES --- */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-linear-to-r from-amber-50 to-orange-50 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center shadow-sm">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-base font-bold text-slate-900">
              Trending Guides
            </CardTitle>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Expert financial advice & tips
          </p>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-3">
            {TRENDING_GUIDES.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-3 text-sm transition-all hover:translate-x-1"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 group-hover:bg-amber-100 text-slate-500 group-hover:text-amber-700 font-bold text-xs shrink-0 mt-0.5 transition-colors">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <span className="text-slate-700 group-hover:text-amber-700 leading-relaxed transition-colors font-medium">
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge className="ml-2 bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0 font-bold border border-amber-200">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1" />
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <Link
              href="/guides/"
              className="flex items-center justify-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors group"
            >
              <span>Browse All Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* --- QUICK STATS (Optional Bonus) --- */}
      <Card className="border-slate-200 shadow-sm bg-linear-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Need Expert Advice?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get personalized financial planning from certified advisors
            </p>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
            >
              Contact Us
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
