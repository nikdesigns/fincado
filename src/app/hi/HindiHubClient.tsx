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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  BookOpen,
  Search,
  Languages,
  Shield,
  Zap,
  Users,
} from 'lucide-react';

// --- DATA: ALL HINDI CALCULATORS ---
const CALCULATOR_CATEGORIES = [
  {
    name: 'लोन और ईएमआई (Loans)',
    id: 'loans',
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
    id: 'investment',
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
    id: 'retirement',
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
    id: 'tax-tools',
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
  const [searchQuery, setSearchQuery] = useState('');

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
    let guides = allGuides;

    // Filter by category
    if (activeCategory !== 'All') {
      guides = guides.filter((g) => g.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      guides = guides.filter(
        (g) =>
          g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.desc.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return guides;
  }, [activeCategory, allGuides, searchQuery]);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* --- HERO HEADER - More Subtle --- */}
      <header className="relative text-center mb-10 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50/30 border border-orange-200/50 rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 opacity-5">
          <Languages className="w-32 h-32 text-orange-600" />
        </div>

        <div className="relative z-10">
          <Badge className="mb-3 bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1 text-xs font-bold border-orange-200">
            FINCADO HINDI 🇮🇳
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            फाइनेंशियल{' '}
            <span className="text-orange-600">कैलकुलेटर और गाइड्स</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed mb-6">
            अब फाइनेंस को समझना हुआ आसान। अपनी भाषा में निवेश, लोन और बचत की
            सटीक गणना करें और एक्सपर्ट गाइड्स पढ़ें।
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 max-w-3xl mx-auto">
            {[
              {
                icon: Shield,
                label: 'बैंक-ग्रेड सटीकता',
                color: 'text-blue-600 bg-blue-50',
              },
              {
                icon: Zap,
                label: 'तुरंत परिणाम',
                color: 'text-amber-600 bg-amber-50',
              },
              {
                icon: Users,
                label: '10 लाख+ उपयोगकर्ता',
                color: 'text-emerald-600 bg-emerald-50',
              }
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-2.5 border border-white shadow-sm"
              >
                <div
                  className={`w-7 h-7 rounded-lg ${feature.color} flex items-center justify-center shrink-0`}
                >
                  <feature.icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <ShareTools title="Fincado हिंदी गाइड्स और टूल्स" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* --- LEFT: CONTENT --- */}
        <div className="lg:col-span-8 min-w-0 space-y-10">
          {/* Top Ad */}
          <div className="no-print flex justify-center bg-slate-50 border border-slate-100 rounded-lg p-2">
            <AdSlot type="leaderboard" label="Sponsored" />
          </div>

          {/* --- CALCULATORS SECTION - More Subtle --- */}
          <div className="space-y-10">
            {CALCULATOR_CATEGORIES.map((cat) => (
              <section key={cat.id} id={cat.id}>
                <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 flex items-center">
                  {cat.name}
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-slate-100 text-slate-600 text-xs"
                  >
                    {cat.tools.length}
                  </Badge>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {cat.tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} className="group">
                      <Card className="h-full hover:border-orange-300 hover:shadow-md transition-all border-slate-200">
                        <CardContent className="p-3.5 flex items-start gap-3">
                          <div className="text-xl p-1.5 bg-orange-50 rounded-lg shrink-0 group-hover:bg-orange-100 transition-colors">
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-slate-800 group-hover:text-orange-700 transition-colors mb-0.5 line-clamp-1">
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
          <div className="no-print flex justify-center bg-slate-50 border border-slate-100 rounded-lg p-2">
            <AdSlot type="leaderboard" />
          </div>

          {/* SECTION 2: LATEST GUIDES - More Subtle */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              नवीनतम लेख (Latest Guides)
            </h2>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="लेख खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 text-sm border-slate-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            {/* --- FILTER PILLS - Smaller --- */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full text-xs h-7 transition-all ${
                    activeCategory === cat
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  {cat === 'All' ? 'सभी (All)' : cat}
                </Button>
              ))}
            </div>

            {/* Results Count */}
            {(searchQuery !== '' || activeCategory !== 'All') && (
              <div className="flex items-center justify-between text-sm mb-4">
                <p className="text-slate-600">
                  <strong className="text-slate-900">
                    {filteredGuides.length}
                  </strong>{' '}
                  लेख मिले
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-7"
                >
                  फ़िल्टर हटाएं
                </Button>
              </div>
            )}

            {/* --- GUIDES GRID - More Compact --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="group h-full block"
                  >
                    <Card className="h-full flex flex-col hover:border-indigo-300 hover:shadow-md transition-all border-slate-200">
                      <CardContent className="p-4 grow">
                        <Badge
                          variant="secondary"
                          className="mb-2 bg-indigo-50 text-indigo-700 border-indigo-200 text-xs"
                        >
                          {guide.category}
                        </Badge>
                        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2 leading-snug line-clamp-2">
                          {guide.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {guide.desc}
                        </p>
                      </CardContent>

                      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center text-xs border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <CalendarDays className="w-3 h-3" />
                          {new Date(guide.published).toLocaleDateString(
                            'hi-IN',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            },
                          )}
                        </div>
                        <span className="flex items-center font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                          पढ़ें <ArrowRight className="w-3 h-3 ml-1" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                  <Search className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm">कोई लेख नहीं मिला।</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                    className="mt-3 text-indigo-600 hover:bg-indigo-50"
                  >
                    सभी लेख देखें
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 3: WHY FINCADO HINDI - More Subtle */}
          <section className="bg-indigo-50/50 border border-indigo-200/50 rounded-xl p-5">
            <h3 className="text-base font-bold text-indigo-900 mb-3">
              Fincado हिंदी क्यों?
            </h3>
            <p className="text-sm text-indigo-800/80 leading-relaxed mb-4">
              भारत में वित्तीय साक्षरता (Financial Literacy) को बढ़ावा देने के
              लिए हमने अपने प्रमुख टूल्स को हिंदी में उपलब्ध कराया है। अक्सर
              फाइनेंस की जटिल शर्तें आम लोगों को समझ नहीं आतीं। Fincado का
              प्रयास है कि{' '}
              <Link
                href="/hi/sip-calculator/"
                className="text-indigo-900 font-semibold hover:underline"
              >
                SIP
              </Link>
              ,{' '}
              <Link
                href="/hi/emi-calculator/"
                className="text-indigo-900 font-semibold hover:underline"
              >
                EMI
              </Link>{' '}
              और{' '}
              <Link
                href="/hi/income-tax-calculator/"
                className="text-indigo-900 font-semibold hover:underline"
              >
                Tax
              </Link>{' '}
              जैसे विषयों को आप अपनी मातृभाषा में आसानी से समझ सकें।
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {['सरल भाषा', 'सटीक गणना', 'मुफ़्त टूल्स', 'एक्सपर्ट सलाह'].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="text-xs font-medium text-indigo-800">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </section>
        </div>

        {/* --- RIGHT: SIDEBAR --- */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
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
