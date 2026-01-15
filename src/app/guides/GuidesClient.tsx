'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, ArrowRight, SearchX } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming standard Shadcn utility exists

type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  published: string;
  hidden?: boolean;
};

export default function GuidesClient({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // ✅ 1. Initial Clean: Remove hidden articles immediately
  const visibleArticles = useMemo(() => {
    return articles.filter((a) => !a.hidden);
  }, [articles]);

  // 2. Extract Unique Categories (from visible articles only)
  const categories = useMemo(() => {
    const uniqueCats = Array.from(
      new Set(visibleArticles.map((a) => a.category))
    );
    return ['All', ...uniqueCats.sort()];
  }, [visibleArticles]);

  // 3. Filter Logic (Category based)
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return visibleArticles;
    return visibleArticles.filter((a) => a.category === activeCategory);
  }, [activeCategory, visibleArticles]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- FILTER PILLS --- */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-4 sm:flex-wrap sm:justify-center sm:overflow-visible no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 border',
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100 ring-2 ring-emerald-100 ring-offset-1'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* --- GUIDES GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredArticles.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}/`}
            className="group h-full outline-none"
          >
            <Card className="h-full flex flex-col border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:border-emerald-200 hover:-translate-y-1 overflow-hidden">
              <CardHeader className="p-6 pb-4">
                <div className="mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100 font-bold px-3 py-1"
                  >
                    {guide.category}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  {guide.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="grow px-6 pb-4 pt-0">
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {/* Clean HTML tags and truncate logic preserved */}
                  {guide.metaDescription
                    .replace(/<[^>]+>/g, '')
                    .substring(0, 120)}
                  ...
                </p>
              </CardContent>

              <CardFooter className="px-6 py-5 mt-auto border-t border-slate-50 flex items-center justify-between bg-slate-50/50 group-hover:bg-emerald-50/10 transition-colors">
                <div className="flex items-center text-xs font-semibold text-slate-400">
                  <Calendar className="h-3.5 w-3.5 mr-2" />
                  {new Date(guide.published).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>

                <div className="flex items-center text-sm font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="ml-1.5 h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* --- EMPTY STATE --- */}
      {filteredArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <SearchX className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            No guides found
          </h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            We couldn&apos;t find any articles in this category. Try selecting a
            different category or view all guides.
          </p>
          <Button
            onClick={() => setActiveCategory('All')}
            variant="outline"
            className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 font-semibold"
          >
            View All Guides
          </Button>
        </div>
      )}
    </div>
  );
}
