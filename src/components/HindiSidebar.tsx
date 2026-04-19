'use client';

import React from 'react';
import Link from 'next/link';
import AdSlot from './AdSlot';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronRight,
  FileText,
  Home,
  Languages,
  PiggyBank,
  Shield,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { getCurrentFiscalYear } from '@/lib/fiscalYear';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type NavItem = {
  href: string;
  label: string;
  note: string;
  lucideIcon: IconType;
  isNew?: boolean;
};

type GuideItem = {
  href: string;
  label: string;
  note: string;
};

const HINDI_TOOLS: NavItem[] = [
  {
    href: '/hi/sip-calculator/',
    label: 'SIP कैलकुलेटर',
    note: 'मासिक निवेश से दीर्घकालिक कॉर्पस का अनुमान लगाएं।',
    lucideIcon: TrendingUp,
  },
  {
    href: '/hi/loans/home-loan/',
    label: 'होम लोन EMI',
    note: 'EMI, अवधि और कुल ब्याज की तुलना करें।',
    lucideIcon: Home,
  },
  {
    href: '/hi/sukanya-samriddhi/',
    label: 'SSY (सुकन्या योजना)',
    note: 'बच्ची के भविष्य लक्ष्यों के लिए लंबी अवधि योजना।',
    lucideIcon: Sparkles,
    isNew: true,
  },
  {
    href: '/hi/ppf-calculator/',
    label: 'PPF कैलकुलेटर',
    note: 'टैक्स-फ्री मैच्योरिटी को सटीक रूप से प्लान करें।',
    lucideIcon: PiggyBank,
  },
  {
    href: '/hi/income-tax-calculator/',
    label: 'इनकम टैक्स कैलकुलेटर',
    note: 'नई और पुरानी टैक्स व्यवस्था की तुलना करें।',
    lucideIcon: FileText,
  },
  {
    href: '/hi/credit-score/',
    label: 'क्रेडिट स्कोर चेक',
    note: 'लोन आवेदन से पहले क्रेडिट प्रोफाइल समझें।',
    lucideIcon: Shield,
  },
];

const HINDI_GUIDES: GuideItem[] = [
  {
    href: '/hi/guides/sukanya-samriddhi-yojana/',
    label: 'सुकन्या समृद्धि योजना गाइड',
    note: 'योग्यता, योगदान, निकासी और मैच्योरिटी नियम।',
  },
  {
    href: '/hi/guides/new-vs-old-tax-regime/',
    label: 'नई vs पुरानी टैक्स व्यवस्था',
    note: 'किस आय स्तर पर कौन सा विकल्प बेहतर है।',
  },
  {
    href: '/hi/guides/elss-mutual-funds/',
    label: 'ELSS से टैक्स बचत',
    note: '80C बचत और लंबी अवधि इक्विटी रणनीति।',
  },
  {
    href: '/hi/guides/sovereign-gold-bonds/',
    label: 'SGB निवेश गाइड',
    note: 'भौतिक सोना बनाम SGB रिटर्न और कर प्रभाव।',
  },
];

export default function HindiSidebar({ adId }: { adId?: string }) {
  const fy = getCurrentFiscalYear();

  return (
    <aside className="space-y-5">
      <div className="mb-1">
        <AdSlot id={adId ?? 'hindi-sidebar-inline'} type="box" label="विज्ञापन" />
      </div>

      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-linear-to-br from-white to-slate-50 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <Calculator className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">लोकप्रिय टूल्स</div>
                <p className="mt-0.5 text-xs font-medium text-slate-600">
                  तेज़ निर्णय के लिए सबसे उपयोगी कैलकुलेटर।
                </p>
              </div>
            </div>
            <Badge className="border border-brand-200 bg-brand-50 text-[10px] font-bold text-brand-700 hover:bg-brand-50">
              {fy.fullFormat}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {HINDI_TOOLS.map((item) => {
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
              href="/hi/calculators/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <span>सभी कैलकुलेटर देखें</span>
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
            <div className="text-base font-semibold text-slate-900">जरूरी गाइड्स</div>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-600">
            कैलकुलेटर उपयोग के बाद अगला सही कदम समझने के लिए।
          </p>
        </CardHeader>

        <CardContent className="space-y-3 p-4">
          {HINDI_GUIDES.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5 transition-all hover:border-brand-200 hover:bg-brand-50/40"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-700">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-slate-800 group-hover:text-brand-800">
                  {item.label}
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500">
                  {item.note}
                </p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 group-hover:text-brand-700" />
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
        <CardContent className="p-3">
          <Link
            href="/calculators/"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-700 transition-all hover:border-brand-200 hover:text-brand-700"
          >
            <Languages className="h-4 w-4" />
            Switch to English
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
}
