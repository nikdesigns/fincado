'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';
import articlesData from '@/data/articles.json';

// --- UI COMPONENTS ---
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CalendarDays, CheckCircle2, BookOpen } from 'lucide-react';

// --- DATA: ALL HINDI CALCULATORS (Untouched) ---
const CALCULATOR_CATEGORIES = [
  {
    name: 'लोन और ईएमआई (Loans)',
    tools: [
      {
        title: 'होम लोन EMI',
        desc: 'घर के लोन की किस्त और ब्याज जानें।',
        href: '/hi/loans/home-loan/',
        icon: '🏠',
      },
      {
        title: 'कार लोन EMI',
        desc: 'नई या पुरानी कार लोन की गणना।',
        href: '/hi/loans/car-loan/',
        icon: '🚗',
      },
      {
        title: 'पर्सनल लोन EMI',
        desc: 'शादी या मेडिकल खर्च के लिए लोन।',
        href: '/hi/loans/personal-loan/',
        icon: '💳',
      },
      {
        title: 'एजुकेशन लोन',
        desc: 'पढ़ाई के लोन और मोरेटोरियम की गणना।',
        href: '/hi/loans/education-loan/',
        icon: '🎓',
      },
      {
        title: 'EMI कैलकुलेटर',
        desc: 'किसी भी लोन की साधारण EMI गणना।',
        href: '/hi/emi-calculator/',
        icon: '🔢',
      }
    ],
  },
  {
    name: 'निवेश और बचत (Investment)',
    tools: [
      {
        title: 'SIP कैलकुलेटर',
        desc: 'मासिक निवेश से करोड़पति बनें।',
        href: '/hi/sip-calculator/',
        icon: '📈',
      },
      {
        title: 'लम्पसम (एकमुश्त)',
        desc: 'एक बार निवेश करने पर रिटर्न।',
        href: '/hi/lumpsum-calculator/',
        icon: '💰',
      },
      {
        title: 'म्यूचुअल फंड',
        desc: 'इक्विटी, डेट और गोल्ड पोर्टफोलियो।',
        href: '/hi/mutual-funds/',
        icon: '📊',
      },
      {
        title: 'PPF कैलकुलेटर',
        desc: 'पब्लिक प्रोविडेंट फंड (टैक्स फ्री)।',
        href: '/hi/ppf-calculator/',
        icon: '🏦',
      },
      {
        title: 'सुकन्या समृद्धि (SSY)',
        desc: 'बेटी के भविष्य के लिए सरकारी योजना।',
        href: '/hi/sukanya-samriddhi/',
        icon: '👧',
      },
      {
        title: 'FD कैलकुलेटर',
        desc: 'फिक्स्ड डिपॉजिट ब्याज की गणना।',
        href: '/hi/fd-calculator/',
        icon: '📜',
      },
      {
        title: 'RD कैलकुलेटर',
        desc: 'रेकरिंग डिपॉजिट (मासिक बचत)।',
        href: '/hi/rd-calculator/',
        icon: '🔄',
      },
      {
        title: 'SWP (पेंशन)',
        desc: 'निवेश से मासिक आय (पेंशन) पाएं।',
        href: '/hi/swp-calculator/',
        icon: '💧',
      }
    ],
  },
  {
    name: 'रिटायरमेंट और पेंशन (Retirement)',
    tools: [
      {
        title: 'रिटायरमेंट प्लानर',
        desc: 'जानें रिटायरमेंट के लिए कितना पैसा चाहिए।',
        href: '/hi/retirement-calculator/',
        icon: '👴',
      },
      {
        title: 'EPF कैलकुलेटर',
        desc: 'सैलरी से कटने वाले PF का हिसाब।',
        href: '/hi/epf-calculator/',
        icon: '🏢',
      },
      {
        title: 'अटल पेंशन (APY)',
        desc: 'सरकारी गारंटीड पेंशन योजना।',
        href: '/hi/apy-calculator/',
        icon: '☂️',
      },
      {
        title: 'ग्रेच्युटी (Gratuity)',
        desc: 'नौकरी छोड़ने पर मिलने वाली रकम।',
        href: '/hi/gratuity-calculator/',
        icon: '🎁',
      },
      {
        title: 'FIRE कैलकुलेटर',
        desc: 'जल्दी रिटायर होने का प्लान बनाएं।',
        href: '/hi/fire-calculator/',
        icon: '🔥',
      }
    ],
  },
  {
    name: 'टैक्स और अन्य टूल्स (Tax & Others)',
    tools: [
      {
        title: 'महंगाई (Inflation)',
        desc: 'जानें भविष्य में पैसे की कीमत क्या होगी।',
        href: '/hi/inflation-calculator/',
        icon: '📉',
      },
      {
        title: 'क्रेडिट स्कोर',
        desc: 'अपना CIBIL स्कोर चेक और सुधारें।',
        href: '/hi/credit-score/',
        icon: '⭐',
      },
      {
        title: 'GST कैलकुलेटर',
        desc: 'कीमत में टैक्स जोड़ें या हटाएं।',
        href: '/hi/gst-calculator/',
        icon: '🧾',
      },
      {
        title: 'कंपाउंड इंटरेस्ट',
        desc: 'चक्रवृद्धि ब्याज (ब्याज पर ब्याज)।',
        href: '/hi/compound-interest-calculator/',
        icon: '🔄',
      },
      {
        title: 'साधारण ब्याज',
        desc: 'साधारण ब्याज की गणना (Simple Interest)।',
        href: '/hi/simple-interest-calculator/',
        icon: '➗',
      }
    ],
  }
];

export default function HindiHubClient() {
  const [activeCategory, setActiveCategory] = useState('All');

  // 1. Prepare Articles Data (Memoized)
  const allGuides = useMemo(() => {
    return articlesData
      .filter((article) => article.language === 'hi')
      .map((article) => ({
        slug: article.slug,
        title: article.title,
        desc:
          article.metaDescription.replace(/<[^>]*>?/gm, '').substring(0, 150) +
          '...',
        href: `/hi/guides/${article.slug}/`,
        category: article.category,
        published: article.published || '2025-01-01',
      }));
  }, []);

  // 2. Extract Categories for Guides
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(allGuides.map((g) => g.category)));
    return ['All', ...uniqueCats];
  }, [allGuides]);

  // 3. Filter Guides Logic
  const filteredGuides = useMemo(() => {
    if (activeCategory === 'All') return allGuides;
    return allGuides.filter((g) => g.category === activeCategory);
  }, [activeCategory, allGuides]);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* --- HERO HEADER --- */}
      <header className="text-center mb-12 bg-linear-to-br from-orange-50 to-amber-50/50 border border-orange-100 rounded-3xl p-8 sm:p-12 shadow-sm">
        <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1 font-semibold border-orange-200 tracking-wide">
          FINCADO HINDI 🇮🇳
        </Badge>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          फाइनेंशियल{' '}
          <span className="text-orange-600">कैलकुलेटर और गाइड्स</span>
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
          अब फाइनेंस को समझना हुआ आसान। अपनी भाषा में निवेश, लोन और बचत की सटीक
          गणना करें और एक्सपर्ट गाइड्स पढ़ें।
        </p>

        <div className="flex justify-center">
          <ShareTools title="Fincado हिंदी गाइड्स और टूल्स" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* --- LEFT: CONTENT --- */}
        <div className="lg:col-span-8 min-w-0">
          <div className="mb-8 no-print flex justify-center bg-slate-50 border border-slate-100 rounded-lg p-2">
            <AdSlot type="leaderboard" label="Sponsored" />
          </div>

          {/* --- CALCULATORS SECTION (Iterate over Categories) --- */}
          <div className="space-y-12">
            {CALCULATOR_CATEGORIES.map((cat) => (
              <section key={cat.name}>
                <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-slate-100 flex items-center">
                  {cat.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {cat.tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} className="group">
                      <Card className="h-full hover:shadow-md hover:border-orange-300 transition-all cursor-pointer border-slate-200">
                        <CardContent className="p-4 flex items-start gap-3">
                          <div className="text-2xl p-2 bg-orange-50 rounded-lg shrink-0 group-hover:bg-orange-100 transition-colors">
                            {tool.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 text-sm group-hover:text-orange-700 transition-colors mb-1">
                              {tool.title}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                              {tool.desc}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* AD BREAK */}
          <div className="my-12 no-print flex justify-center">
            <AdSlot type="leaderboard" />
          </div>

          {/* SECTION 2: LATEST GUIDES */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-500" />
              नवीनतम लेख (Latest Guides)
            </h2>

            {/* --- FILTER PILLS --- */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border
                    ${
                      activeCategory === cat
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
                    }
                  `}
                >
                  {cat === 'All' ? 'सभी (All)' : cat}
                </button>
              ))}
            </div>

            {/* --- GUIDES GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="group h-full block"
                  >
                    <Card className="h-full flex flex-col hover:shadow-lg hover:border-emerald-400 transition-all border-slate-200">
                      <CardContent className="p-5 grow">
                        <div className="mb-3">
                          <Badge
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100"
                          >
                            {guide.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 leading-snug">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {guide.desc}
                        </p>
                      </CardContent>

                      <CardFooter className="p-5 pt-0 mt-auto flex justify-between items-center text-xs text-slate-400 border-t border-slate-50">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {new Date(guide.published).toLocaleDateString(
                            'hi-IN',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                        </div>
                        <span className="flex items-center font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                          पढ़ें <ArrowRight className="w-3 h-3 ml-1" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                  कोई लेख उपलब्ध नहीं है।
                </div>
              )}
            </div>
          </section>

          {/* SECTION 3: WHY FINCADO HINDI */}
          <section className="mt-12 bg-indigo-50/50 border border-indigo-100 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">
              Fincado हिंदी क्यों?
            </h3>
            <p className="text-indigo-800/80 leading-relaxed">
              भारत में वित्तीय साक्षरता (Financial Literacy) को बढ़ावा देने के
              लिए हमने अपने प्रमुख टूल्स को हिंदी में उपलब्ध कराया है। अक्सर
              फाइनेंस की जटिल शर्तें आम लोगों को समझ नहीं आतीं। Fincado का
              प्रयास है कि{' '}
              <strong className="font-semibold text-indigo-900">SIP</strong>,
              <strong className="font-semibold text-indigo-900"> EMI</strong> और{' '}
              <strong className="font-semibold text-indigo-900">Tax </strong>
              जैसे विषयों को आप अपनी मातृभाषा में आसानी से समझ सकें।
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {['सरल भाषा', 'सटीक गणना', 'मुफ़्त टूल्स', 'एक्सपर्ट सलाह'].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-800">
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </section>
        </div>

        {/* --- RIGHT: SIDEBAR --- */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="sticky top-24 space-y-8">
            <HindiSidebar />
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot id="hindi-sidebar-sticky" type="box" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
