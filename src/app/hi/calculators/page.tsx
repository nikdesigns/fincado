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
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'सभी फाइनेंशियल कैलकुलेटर (Hindi Calculators) - Fincado',
  description:
    'SIP, EMI, PPF, GST, होम लोन और इनकम टैक्स के लिए सर्वश्रेष्ठ हिंदी कैलकुलेटर। अपनी बचत और निवेश की सटीक गणना करें।',
  alternates: {
    canonical: 'https://fincado.com/hi/calculators/',
  },
};

export default function HindiCalculatorsPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-12">
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="lg:col-span-8 min-w-0">
          {/* HEADER SECTION */}
          <div className="mb-10 bg-linear-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <Badge
                variant="outline"
                className="w-fit bg-white text-orange-700 border-orange-200 px-3 py-1"
              >
                मुफ़्त टूल्स (Free Tools)
              </Badge>
              <LanguageToggle path="/calculators" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              वित्तीय कैलकुलेटर{' '}
              <span className="text-orange-600 block sm:inline">
                (Financial Tools)
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              निवेश, लोन और टैक्स की गणना के लिए भारत के सबसे सटीक टूल्स। अपनी
              भाषा में आसान और तेज़ गणना करें।
            </p>
          </div>

          {/* AD SLOT */}
          <div className="mb-10 bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center no-print">
            <AdSlot type="leaderboard" label="Sponsored" />
          </div>

          {/* --- CALCULATOR CATEGORIES --- */}
          <div className="space-y-12">
            {HINDI_CALCULATOR_CATEGORIES.map((cat) => (
              <section key={cat.name}>
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {cat.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group block h-full"
                    >
                      <Card className="h-full border-slate-200 hover:border-orange-300 hover:shadow-md transition-all duration-200">
                        <CardContent className="p-5 flex items-start gap-4 h-full">
                          <div className="text-3xl p-3 bg-orange-50 rounded-xl shrink-0 group-hover:bg-orange-100 transition-colors flex items-center justify-center w-14 h-14">
                            {tool.icon}
                          </div>
                          <div className="flex flex-col justify-between h-full">
                            <div>
                              <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-orange-700 transition-colors">
                                {tool.title}
                              </h3>
                              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                {tool.desc}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center text-xs font-semibold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                              गणना करें <ArrowRight className="w-3 h-3 ml-1" />
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

          {/* BOTTOM CONTENT / TRUST SIGNALS */}
          <div className="mt-16 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Fincado कैलकुलेटर क्यों इस्तेमाल करें?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                '100% सटीक और भरोसेमंद',
                'पूरी तरह मुफ़्त (Free)',
                'बिना लॉग-इन के उपयोग करें',
                'मोबाइल और डेस्कटॉप फ्रेंडली',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-slate-700 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="sticky top-24 space-y-8">
            <HindiSidebar />

            {/* Sticky Ad Box */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot type="box" id="hindi-calc-sidebar" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
