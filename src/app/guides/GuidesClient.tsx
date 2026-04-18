'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, ArrowRight, SearchX, Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming standard Shadcn utility exists

type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  published: string;
  hidden?: boolean;
};

const cleanSnippet = (text: string, maxLength: number) => {
  const sanitized = text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (sanitized.length <= maxLength) return sanitized;
  return `${sanitized.substring(0, maxLength).trimEnd()}...`;
};

export default function GuidesClient({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ 1. Initial Clean: Remove hidden articles immediately
  const visibleArticles = useMemo(() => {
    return articles.filter((a) => !a.hidden);
  }, [articles]);

  // 2. Extract Unique Categories (from visible articles only)
  const categories = useMemo(() => {
    const uniqueCats = Array.from(
      new Set(visibleArticles.map((a) => a.category)),
    );
    return ['All', ...uniqueCats.sort()];
  }, [visibleArticles]);

  // 3. Filter Logic (Category based)
  const filteredArticles = useMemo(() => {
    let filtered = visibleArticles;
    if (activeCategory !== 'All') {
      filtered = filtered.filter((a) => a.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          cleanSnippet(a.metaDescription, 220).toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [activeCategory, visibleArticles, searchQuery]);

  const featuredArticles = useMemo(
    () => visibleArticles.slice(0, 3),
    [visibleArticles],
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {featuredArticles.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-brand-700" />
            <h2 className="text-lg font-semibold text-slate-900">
              Editor Picks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredArticles.map((guide) => (
              <Link
                key={`featured-${guide.slug}`}
                href={`/guides/${guide.slug}/`}
                className="group block h-full"
              >
                <Card className="h-full bg-linear-to-br from-[#F0F9E8] to-[#F0F9E8] border-brand-400 hover:border-brand-700 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-5">
                    <Badge className="mb-2 bg-brand-400 text-[#111827] text-xs">
                      Featured
                    </Badge>
                    <h3 className="font-semibold text-sm text-slate-900 group-hover:text-brand-700 transition-colors mb-2 leading-snug line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {cleanSnippet(guide.metaDescription, 110)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search guides (e.g., tax, SIP, home loan)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-11 text-sm border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          />
        </div>
      </div>

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
                  ? 'bg-brand-400 text-[#111827] border-brand-400 shadow-md shadow-[#EFFBE2] ring-2 ring-[#EFFBE2] ring-offset-1'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700',
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {(searchQuery !== '' || activeCategory !== 'All') && (
        <div className="flex items-center justify-between text-sm mb-6">
          <p className="text-slate-600">
            <strong className="text-slate-900">
              {filteredArticles.length}
            </strong>{' '}
            guides found
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-7"
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* --- GUIDES GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredArticles.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}/`}
            className="group h-full outline-none"
          >
            <Card className="h-full flex flex-col border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:border-brand-200 hover:-translate-y-1 overflow-hidden">
              <CardHeader className="p-6 pb-4">
                <div className="mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-brand-50 text-brand-700 hover:bg-brand-100 border-brand-100 font-semibold px-3 py-1"
                  >
                    {guide.category}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-semibold text-slate-900 leading-snug group-hover:text-brand-700 transition-colors">
                  {guide.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="grow px-6 pb-4 pt-0">
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {/* Clean HTML tags and truncate logic preserved */}
                  {cleanSnippet(guide.metaDescription, 120)}
                </p>
              </CardContent>

              <CardFooter className="px-6 py-5 mt-auto border-t border-slate-50 flex items-center justify-between bg-slate-50/50 group-hover:bg-brand-50/10 transition-colors">
                <div className="flex items-center text-xs font-semibold text-slate-400">
                  <Calendar className="h-3.5 w-3.5 mr-2" />
                  {new Date(guide.published).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>

                <div className="flex items-center text-sm font-semibold text-[#111827] group-hover:translate-x-1 transition-transform">
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
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No guides found
          </h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            We couldn&apos;t find any articles in this category. Try selecting a
            different category or view all guides.
          </p>
          <Button
            onClick={() => setActiveCategory('All')}
            variant="outline"
            className="text-brand-400 border-brand-200 hover:bg-brand-50 hover:text-brand-700 font-semibold"
          >
            View All Guides
          </Button>
        </div>
      )}
    </div>
  );
}
