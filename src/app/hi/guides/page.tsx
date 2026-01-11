'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articlesData from '@/data/articles.json';
import LanguageToggle from '@/components/LanguageToggle';

// --- UI COMPONENTS ---
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CalendarDays, ArrowRight, SearchX } from 'lucide-react';

// Define the type to avoid TS errors
type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  published: string;
  language: string;
  hidden?: boolean;
};

export default function HindiGuidesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const allGuides = useMemo(() => {
    return (articlesData as Article[])
      .filter((article) => article.language === 'hi')
      .filter((article) => !article.hidden)
      .map((article) => ({
        slug: article.slug,
        title: article.title,
        desc:
          article.metaDescription.replace(/<[^>]*>?/gm, '').substring(0, 120) +
          '...',
        href: `/hi/guides/${article.slug}/`,
        category: article.category,
        published: article.published || '2025-01-01',
      }));
  }, []);

  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(allGuides.map((g) => g.category)));
    return ['All', ...uniqueCats];
  }, [allGuides]);

  const filteredGuides = useMemo(() => {
    if (activeCategory === 'All') return allGuides;
    return allGuides.filter((g) => g.category === activeCategory);
  }, [activeCategory, allGuides]);

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

      {/* --- HEADER SECTION --- */}
      <div className="mb-10 bg-linear-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative Icon */}
        <div className="absolute right-4 top-4 opacity-5">
          <BookOpen className="w-32 h-32 text-orange-600" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <Badge
              variant="outline"
              className="w-fit bg-white text-orange-700 border-orange-200 px-3 py-1 shadow-sm"
            >
              वित्तीय साक्षरता (Financial Literacy)
            </Badge>
            <LanguageToggle path="/guides" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            फाइनेंशियल <span className="text-orange-600">ज्ञान (Guides)</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            SIP, लोन और टैक्स की जटिल दुनिया को अपनी आसान भाषा में समझें। हमारे
            एक्सपर्ट्स द्वारा लिखे गए लेख।
          </p>
        </div>
      </div>

      {/* --- CATEGORY FILTERS --- */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group h-full block"
            >
              <Card className="h-full flex flex-col hover:shadow-lg hover:border-emerald-400 transition-all border-slate-200 duration-200">
                <CardContent className="p-6 grow">
                  <div className="mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100"
                    >
                      {guide.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-3 leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {guide.desc}
                  </p>
                </CardContent>

                <CardFooter className="p-6 pt-0 mt-auto flex justify-between items-center text-xs text-slate-400 border-t border-slate-50">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {new Date(guide.published).toLocaleDateString('hi-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <span className="flex items-center font-bold text-emerald-600 group-hover:translate-x-1 transition-transform text-sm">
                    पढ़ें <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl">
            <div className="p-3 bg-white rounded-full mb-3 shadow-sm">
              <SearchX className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">
              कोई लेख उपलब्ध नहीं है।
            </p>
            <p className="text-slate-400 text-sm">
              कृपया कोई अन्य श्रेणी चुनें।
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
