import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { HINDI_CALCULATOR_CATEGORIES } from '@/data/hindiTools';
import LanguageToggle from '@/components/LanguageToggle';

// --- UI COMPONENTS ---
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calculator,
  ArrowRight,
  CheckCircle2,
  BadgeCheck,
  TrendingUp,
  LineChart,
} from 'lucide-react';

/* ---------------- SEO METADATA (Updated 2026) ---------------- */
export const metadata: Metadata = {
  title: 'सभी फाइनेंशियल कैलकुलेटर 2026 (Hindi Calculators) - Fincado',
  description:
    'SIP, EMI, PPF, GST, होम लोन और इनकम टैक्स (FY 2026-27) के लिए सर्वश्रेष्ठ हिंदी कैलकुलेटर। बजट 2026 के नियमों के अनुसार अपडेटेड।',
  alternates: {
    canonical: 'https://fincado.com/hi/calculators/',
  },
  openGraph: {
    title: 'सभी फाइनेंशियल कैलकुलेटर - बजट 2026 अपडेटेड',
    description:
      'निवेश, लोन और टैक्स की सटीक गणना करें। Fincado के साथ अपना भविष्य सुरक्षित करें।',
    url: 'https://fincado.com/hi/calculators/',
    type: 'website',
    locale: 'hi_IN',
  },
};

export default function HindiCalculatorsPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-12">
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="lg:col-span-8 min-w-0 space-y-10">
          {/* HEADER SECTION */}
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge
                variant="outline"
                className="border-orange-200 text-orange-700 bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider"
              >
                मुफ़्त टूल्स (Free Tools)
              </Badge>
              {/* ✅ Budget 2026 Badge */}
              <Badge
                variant="outline"
                className="border-emerald-200 text-emerald-700 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
              >
                <BadgeCheck className="w-3 h-3" />
                बजट 2026 अपडेटेड
              </Badge>
              <div className="ml-auto">
                <LanguageToggle path="/calculators" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              वित्तीय कैलकुलेटर{' '}
              <span className="text-orange-600 block sm:inline">
                (Financial Tools)
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              निवेश, लोन और टैक्स की गणना के लिए भारत के सबसे सटीक टूल्स।{' '}
              <strong>FY 2026-27</strong> के नए नियमों के अनुसार अपनी भाषा में
              आसान और तेज़ गणना करें।
            </p>
          </div>

          {/* AD SLOT */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center overflow-hidden no-print">
            <AdSlot type="leaderboard" label="Sponsored" />
          </div>

          {/* --- CALCULATOR CATEGORIES --- */}
          <div className="space-y-12">
            {HINDI_CALCULATOR_CATEGORIES.map((cat) => (
              <section key={cat.name} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {cat.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group block h-full"
                    >
                      <Card className="h-full border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-5 flex items-start gap-4 h-full">
                          <div className="text-3xl p-3 bg-orange-50 rounded-xl shrink-0 group-hover:bg-orange-100 transition-colors flex items-center justify-center w-14 h-14 text-orange-600">
                            {tool.icon}
                          </div>
                          <div className="flex flex-col justify-between h-full w-full">
                            <div>
                              <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-orange-700 transition-colors">
                                {tool.title}
                              </h3>
                              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                                {tool.desc}
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-400 uppercase">
                                गणना करें
                              </span>
                              <ArrowRight className="w-4 h-4 text-orange-500 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* --- SEO CONTENT & VISUALS --- */}
          <section className="mt-12 space-y-8">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-4">
                <LineChart className="w-6 h-6 text-emerald-600" />
                वित्तीय कैलकुलेटर क्यों जरूरी हैं?
              </h2>
              <p className="text-slate-600 leading-relaxed">
                चाहे आप होम लोन ले रहे हों या रिटायरमेंट की योजना बना रहे हों,
                सटीक गणना आपको लाखों रुपये बचाने में मदद कर सकती है। कंपाउंडिंग
                (चक्रवृद्धि ब्याज) की ताकत को समझें और अपने पैसे को बढ़ता हुआ
                देखें।
              </p>
            </div>

            {/* ✅ VISUAL: Compounding Growth Chart (Localized) */}
            <Card className="border-slate-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                    कंपाउंडिंग की शक्ति (Power of Compounding)
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
                  देखें कि कैसे छोटा निवेश समय के साथ तेजी से बढ़ता है
                </p>
              </CardContent>
            </Card>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Fincado कैलकुलेटर की विशेषताएं
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'बजट 2026 के अनुसार अपडेटेड',
                  '100% सटीक और मुफ़्त',
                  'बिना लॉग-इन के उपयोग करें',
                  'मोबाइल पर भी तेज़ और आसान'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm text-slate-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="sticky top-24 space-y-8">
            <HindiSidebar />

            {/* Sticky Ad Box */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center no-print">
              <AdSlot type="box" id="hindi-calc-sidebar" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
