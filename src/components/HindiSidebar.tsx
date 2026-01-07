'use client';

import React from 'react';
import Link from 'next/link';
import AdSlot from './AdSlot'; // Assuming you still want the Ad capability
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Languages } from 'lucide-react'; // For the language switcher icon

/* ---------- TYPES ---------- */
type NavItem = {
  href: string;
  label: string;
  icon?: string;
  isNew?: boolean;
};

/* ---------- DATA (HINDI) ---------- */
const HINDI_TOOLS: NavItem[] = [
  { href: '/hi/sip-calculator', label: 'SIP कैलकुलेटर', icon: '📈' },
  { href: '/hi/loans/home-loan', label: 'होम लोन EMI', icon: '🏠' },
  {
    href: '/hi/sukanya-samriddhi',
    label: 'SSY (सुकन्या योजना)',
    icon: '👧',
    isNew: true,
  },
  { href: '/hi/ppf-calculator', label: 'PPF कैलकुलेटर', icon: '💰' },
  { href: '/hi/income-tax-calculator', label: 'इनकम टैक्स (Tax)', icon: '📋' },
  { href: '/hi/fd-calculator', label: 'FD कैलकुलेटर', icon: '📜' },
  { href: '/hi/credit-score', label: 'क्रेडिट स्कोर चेक', icon: '🛡️' },
];

const HINDI_GUIDES: NavItem[] = [
  {
    href: '/hi/guides/sukanya-samriddhi-yojana',
    label: 'सुकन्या समृद्धि योजना 2025: पूरी जानकारी',
  },
  {
    href: '/hi/guides/new-vs-old-tax-regime',
    label: 'नई vs पुरानी टैक्स व्यवस्था: क्या चुनें?',
  },
  {
    href: '/hi/guides/elss-mutual-funds',
    label: 'ELSS: टैक्स बचाने का स्मार्ट तरीका',
  },
  {
    href: '/hi/guides/sovereign-gold-bonds',
    label: 'SGB: सोना खरीदने का सही तरीका',
  },
];

/* ---------- COMPONENT ---------- */
export default function HindiSidebar({ adId }: { adId?: string }) {
  return (
    <aside className="space-y-6">
      {/* 1. AD SLOT (Kept for monetization) */}
      <div className="mb-6">
        <AdSlot id={adId} type="box" label="विज्ञापन" />
      </div>

      {/* 2. POPULAR TOOLS (Design Match) */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold text-slate-900">
            लोकप्रिय टूल्स (Popular Tools)
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-1 p-3">
          {HINDI_TOOLS.map((item) => (
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
                py-2.5
                text-sm
                font-medium
                text-slate-700
                transition-colors
                hover:bg-emerald-50
                hover:text-emerald-700
              "
            >
              <span className="flex items-center gap-3">
                <span className="text-lg leading-none opacity-80 group-hover:opacity-100">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </span>

              {item.isNew && (
                <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 text-[10px] px-2 py-0.5 border-0">
                  NEW
                </Badge>
              )}
            </Link>
          ))}

          <div className="pt-2 mt-2 border-t border-slate-100">
            <Link
              href="/hi/calculators"
              className="
                block
                w-full
                rounded-md
                py-2
                text-center
                text-sm
                font-semibold
                text-emerald-700
                transition
                hover:bg-emerald-50
                hover:underline
              "
            >
              सभी कैलकुलेटर देखें →
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 3. TRENDING GUIDES (Design Match) */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold text-slate-900">
            जरूरी जानकारी (Guides)
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 p-4">
          {HINDI_GUIDES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                group
                flex
                items-start
                gap-2.5
                text-sm
                text-slate-600
                transition-colors
                hover:text-emerald-700
              "
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 group-hover:bg-emerald-500 transition-colors" />
              <span className="leading-relaxed font-medium">{item.label}</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* 4. LANGUAGE SWITCHER (Optional but good for UX) */}
      <Card className="border-slate-200 bg-slate-50 shadow-sm">
        <CardContent className="p-3">
          <Link
            href="/calculators"
            className="
              flex items-center justify-center gap-2 
              w-full rounded-md border border-slate-200 bg-white 
              py-2 text-sm font-semibold text-slate-700 
              transition hover:border-emerald-200 hover:text-emerald-700
            "
          >
            <Languages className="h-4 w-4" />
            Switch to English
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
}
