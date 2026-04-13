'use client';

import React from 'react';
import Link from 'next/link';
// Removed CardTitle from import to use semantic div instead
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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

import { getCurrentFiscalYear } from '@/lib/fiscalYear';

export default function FinancialNavWidget() {
  const fy = getCurrentFiscalYear();

  /* ---------- TOP TOOLS ---------- */
  const TOP_TOOLS = [
    {
      href: '/sip-calculator/',
      label: 'SIP Calculator',
      lucideIcon: TrendingUp,
    },
    {
      href: '/emi-calculator/',
      label: 'Loan EMI Calculator',
      lucideIcon: Calculator,
    },
    {
      href: '/loans/home-loan/',
      label: 'Home Loan EMI',
      lucideIcon: Home,
    },
    {
      href: '/sukanya-samriddhi/',
      label: 'Sukanya Samriddhi (SSY)',
      lucideIcon: Sparkles,
      isNew: true,
    },
    {
      href: '/ppf-calculator/',
      label: 'PPF Calculator',
      lucideIcon: PiggyBank,
    },
    {
      href: '/income-tax-calculator/',
      label: 'Income Tax Calculator',
      lucideIcon: FileText,
      badge: fy.shortYear,
    },
    {
      href: '/credit-score/',
      label: 'Check Credit Score',
      lucideIcon: Shield,
    },
  ];

  /* ---------- TRENDING GUIDES (2026 updated) ---------- */
  const TRENDING_GUIDES = [
    {
      href: '/guides/sukanya-samriddhi-yojana-guide-2026/',
      label: 'Sukanya Samriddhi Yojana Guide',
      badge: 'Popular',
    },
    {
      href: '/guides/elss-funds-guide-2026/',
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

  return (
    <aside className="space-y-6">
      {/* POPULAR TOOLS */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-[#F7FDF1] border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#92C65B] flex items-center justify-center shadow-sm">
              <Calculator className="w-4 h-4 text-white" />
            </div>
            {/* CHANGED: Replaced CardTitle with semantic div */}
            <div className="text-base font-semibold text-slate-900">
              Popular Tools
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Most used calculators &amp; tools
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
                  className="group flex items-center justify-between px-4 py-3 text-sm font-medium text-[#111827] transition-all hover:bg-[#F7FDF1] hover:text-[#111827]"
                >
                  <span className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#EFFBE2] flex items-center justify-center transition-colors shrink-0">
                      {IconComponent && (
                        <IconComponent className="w-4 h-4 text-[#111827] group-hover:text-[#577A30]" />
                      )}
                    </div>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {item.label}
                    </span>
                  </span>

                  <div className="flex items-center gap-2">
                    {item.isNew && (
                      <Badge className="bg-rose-500 text-white text-[10px] px-2 py-0.5 font-semibold">
                        NEW
                      </Badge>
                    )}
                    {item.badge && (
                      <Badge className="bg-[#B0EC70] text-[#1B2E06] text-[10px] px-2 py-0.5 font-semibold">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#577A30] transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-200 bg-slate-50/50">
            <Link
              href="/calculators/"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-[#74A046] hover:text-[#577A30] transition-colors group"
            >
              <span>View All Calculators</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* TRENDING GUIDES */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-[#F7FDF1] border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#92C65B] flex items-center justify-center shadow-sm">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            {/* CHANGED: Replaced CardTitle with semantic div */}
            <div className="text-base font-semibold text-slate-900">
              Trending Guides
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Expert advice updated for 2026
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
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#EFFBE2] text-slate-500 group-hover:text-[#577A30] font-bold text-xs shrink-0 mt-0.5 transition-colors">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <span className="text-slate-700 group-hover:text-[#577A30] leading-relaxed transition-colors font-medium">
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge className="ml-2 bg-[#B0EC70] text-[#1B2E06] text-[10px] px-1.5 py-0 font-bold border border-[#DFF7C6]">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#577A30] opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1" />
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <Link
              href="/guides/"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-[#74A046] hover:text-[#577A30] transition-colors group"
            >
              <span>Browse All Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats / CTA */}
      <Card className="border-slate-200 shadow-sm bg-[#F7FDF1]">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#92C65B] flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {/* Note: Kept h3 here because it usually is the only true sub-heading in the sidebar, but you can change it to div if it still flags! */}
            <h3 className="font-semibold text-[#1B2E06] text-sm">
              Need Expert Advice?
            </h3>
            <p className="text-xs text-[#1B2E06] leading-relaxed font-medium">
              Get personalized financial planning from certified advisors
            </p>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#74A046] hover:text-[#577A30] transition-colors"
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
