'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import WikiText from '@/components/WikiText';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, ArrowRight, FileText, SearchX } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming standard Shadcn utils exist

/* ---------- TYPES ---------- */
type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  published: string; // YYYY-MM-DD
  language?: string;
};

/* ---------- HYDRATION-SAFE DATE FORMAT ---------- */
const MONTHS: Record<string, string> = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

function formatDateSafe(dateString: string) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day} ${MONTHS[month]} ${year}`;
}

/* ---------- COMPONENT ---------- */
export default function GuidesGrid({
  allArticles = [],
}: {
  allArticles?: Article[];
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  /* Always safe array */
  const articles = useMemo(
    () => (Array.isArray(allArticles) ? allArticles : []),
    [allArticles]
  );

  /* Categories */
  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return ['All', ...Array.from(set)];
  }, [articles]);

  /* Filtered articles */
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory, articles]);

  /* Empty state */
  if (!articles.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <FileText className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">
          No guides found
        </h3>
        <p className="text-sm mt-1">Check back later for new content.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
      {/* ---------- FILTER PILLS ---------- */}
      <div className="flex flex-wrap gap-2 mb-10 items-center justify-center sm:justify-start">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50'
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ---------- EMPTY STATE (FILTER) ---------- */}
      {filteredArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
          <SearchX className="h-10 w-10 text-slate-300 mb-3" />
          <p>No articles found in this category.</p>
          <Button
            variant="link"
            onClick={() => setActiveCategory('All')}
            className="text-emerald-600"
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* ---------- GRID ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredArticles.map((guide) => (
          <Link
            key={`${guide.slug}-${guide.language || 'en'}`}
            href={`/guides/${guide.slug}/`}
            className="group h-full outline-none"
          >
            <Card className="h-full flex flex-col border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:border-emerald-200 hover:-translate-y-1 overflow-hidden">
              <CardHeader className="pb-3 pt-6 px-6">
                <div className="flex justify-between items-start mb-3">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5"
                  >
                    {guide.category}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {guide.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="grow px-6 py-0">
                <div className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {/* WikiText wrapper div to handle internal paragraphs correctly */}
                  <div className="pointer-events-none">
                    <WikiText content={guide.metaDescription} />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 py-5 mt-auto border-t border-slate-50 flex items-center justify-between bg-slate-50/30 group-hover:bg-emerald-50/10 transition-colors">
                <div className="flex items-center text-xs font-medium text-slate-400">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  {formatDateSafe(guide.published)}
                </div>

                <div className="flex items-center text-sm font-semibold text-emerald-600 opacity-80 group-hover:opacity-100 transition-opacity">
                  Read{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
