'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articlesData from '@/data/articles.json';
import LanguageToggle from '@/components/LanguageToggle';

// --- UI COMPONENTS ---
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BookOpen,
  CalendarDays,
  ArrowRight,
  SearchX,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

// Define the type
type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  published: string;
  language: string;
  hidden?: boolean;
};

export default function HindiGuidesClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allGuides = useMemo(() => {
    return (articlesData as Article[])
      .filter((article) => article.language === 'hi')
      .filter((article) => !article.hidden)
      .map((article) => ({
        slug: article.slug,
        title: article.title,
        desc:
          article.metaDescription.replace(/<[^>]*>?/gm, '').substring(0, 140) +
          '...',
        href: `/hi/guides/${article.slug}/`,
        category: article.category,
        published: article.published || '2025-01-01',
      }))
      .sort(
        (a, b) =>
          new Date(b.published).getTime() - new Date(a.published).getTime(),
      );
  }, []);

  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(allGuides.map((g) => g.category)));
    return ['All', ...uniqueCats];
  }, [allGuides]);

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

  // Get featured guides (latest 3)
  const featuredGuides = useMemo(() => allGuides.slice(0, 3), [allGuides]);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          {
            name: 'आर्टिकल्स (Guides)',
            url: 'https://fincado.com/hi/guides/',
          },
        ]}
      />

      {/* --- HERO HEADER --- */}
      <header className="mb-10 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50/30 border border-indigo-200/50 rounded-2xl p-8 relative overflow-hidden shadow-sm">
        {/* Decorative Elements */}
        <div className="absolute right-4 top-4 opacity-5">
          <BookOpen className="w-32 h-32 text-indigo-600" />
        </div>
        <div className="absolute -left-12 -bottom-12 opacity-5">
          <TrendingUp className="w-64 h-64 text-purple-600" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <Badge className="w-fit bg-white text-indigo-700 border-indigo-200 px-3 py-1 shadow-sm font-bold">
              {allGuides.length}+ विस्तृत गाइड्स
            </Badge>
            <div className="no-print">
              <LanguageToggle path="/guides" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight">
            फाइनेंशियल{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
              ज्ञान (Guides)
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed mb-6">
            SIP, लोन और टैक्स की जटिल दुनिया को अपनी आसान भाषा में समझें। हमारे
            एक्सपर्ट्स द्वारा लिखे गए लेख जो आपको स्मार्ट निवेशक बनाएंगे।
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: CheckCircle2,
                label: 'एक्सपर्ट द्वारा लिखित',
                color: 'text-emerald-600 bg-emerald-50',
              },
              {
                icon: Clock,
                label: 'नियमित अपडेट',
                color: 'text-blue-600 bg-blue-50',
              },
              {
                icon: BookOpen,
                label: 'आसान भाषा',
                color: 'text-purple-600 bg-purple-50',
              },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-2.5 border border-white shadow-sm"
              >
                <div
                  className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center shrink-0`}
                >
                  <feature.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* --- FEATURED GUIDES (Latest 3) --- */}
      {featuredGuides.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">
              नवीनतम लेख (Latest Articles)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block h-full"
              >
                <Card className="h-full bg-linear-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-5">
                    <Badge className="mb-2 bg-amber-600 text-white text-xs">
                      नया
                    </Badge>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors mb-2 leading-snug line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {guide.desc}
                    </p>
                  </CardContent>
                  <CardFooter className="p-5 pt-0 flex justify-between items-center text-xs border-t border-amber-100">
                    <div className="flex items-center gap-1 text-slate-500">
                      <CalendarDays className="w-3 h-3" />
                      {new Date(guide.published).toLocaleDateString('hi-IN', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <span className="flex items-center font-semibold text-amber-600 group-hover:translate-x-1 transition-transform">
                      पढ़ें <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* --- SEARCH BAR --- */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="गाइड्स खोजें... (उदाहरण: SIP, होम लोन, टैक्स)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-11 text-sm border-slate-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
        </div>
      </div>

      {/* --- CATEGORY FILTERS --- */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full text-xs h-8 transition-all ${
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
        <div className="flex items-center justify-between text-sm mb-6">
          <p className="text-slate-600">
            <strong className="text-slate-900">{filteredGuides.length}</strong>{' '}
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

      {/* --- GUIDES GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group h-full block"
            >
              <Card className="h-full flex flex-col hover:shadow-lg hover:border-indigo-400 transition-all border-slate-200 duration-200">
                <CardContent className="p-5 grow">
                  <div className="mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200 text-xs"
                    >
                      {guide.category}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2 leading-snug line-clamp-2">
                    {guide.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {guide.desc}
                  </p>
                </CardContent>

                <CardFooter className="p-5 pt-0 mt-auto flex justify-between items-center text-xs border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {new Date(guide.published).toLocaleDateString('hi-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <span className="flex items-center font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                    पढ़ें <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl">
            <div className="p-4 bg-white rounded-full mb-4 shadow-sm">
              <SearchX className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-700 font-semibold text-lg mb-1">
              कोई लेख नहीं मिला
            </p>
            <p className="text-slate-500 text-sm mb-4">
              कृपया अन्य श्रेणी चुनें या खोज शब्द बदलें।
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
            >
              सभी गाइड्स देखें
            </Button>
          </div>
        )}
      </div>

      {/* --- SEO CONTENT --- */}
      <section className="mt-12 prose prose-slate max-w-none">
        <div className="bg-indigo-50/50 border border-indigo-200/50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-3">
            क्यों पढ़ें Fincado की गाइड्स?
          </h2>
          <p className="text-sm text-indigo-800/80 leading-relaxed mb-4">
            भारत में वित्तीय साक्षरता (Financial Literacy) को बढ़ावा देना हमारा
            मिशन है। हमारी हर गाइड को{' '}
            <strong className="font-semibold text-indigo-900">
              फाइनेंशियल एक्सपर्ट्स
            </strong>{' '}
            द्वारा लिखा और रिव्यू किया जाता है। SIP से लेकर टैक्स प्लानिंग तक,
            हर विषय को हम आसान हिंदी में समझाते हैं।
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'सरल और सटीक जानकारी',
              'नियमित अपडेट',
              'व्यावहारिक उदाहरण',
              '100% मुफ़्त',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="text-xs font-medium text-indigo-800">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
