// src/components/RelatedTopicsSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import articles from '@/data/articles.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdSlot from '@/components/AdSlot';
import { ArrowRight } from 'lucide-react';

type Article = {
  slug: string;
  title: string;
  category: string;
};

interface Props {
  category?: string;
  currentSlug?: string;
}

export default function RelatedTopicsSidebar({ category, currentSlug }: Props) {
  const allArticles = articles as Article[];

  // Related articles from same category
  const relatedArticles = allArticles
    .filter(
      (article) =>
        article.category === category && article.slug !== currentSlug,
    )
    .slice(0, 6);

  // Popular calculators (expanded & consistent with your site)
  const popularCalculators = [
    { title: 'Home Loan EMI Calculator', href: '/emi-calculator/' },
    { title: 'SIP Calculator', href: '/sip-calculator/' },
    { title: 'Income Tax Calculator', href: '/income-tax-calculator/' },
    { title: 'FD Calculator', href: '/fd-calculator/' },
    { title: 'PPF Calculator', href: '/ppf-calculator/' },
    { title: 'Retirement Calculator', href: '/retirement-calculator/' },
  ];

  return (
    <aside className="space-y-8">
      {/* Advertisement Slot */}
      <AdSlot id="sidebar-related-top" type="box" />

      {/* Related Topics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Related Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {relatedArticles.length > 0 ? (
            <ul className="space-y-4">
              {relatedArticles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/guides/${article.slug}/`}
                    className="group flex items-start gap-3 hover:text-brand-700 transition-colors"
                  >
                    <Badge
                      variant="outline"
                      className="text-[10px] font-medium bg-brand-50 text-brand-700 border-brand-400"
                    >
                      {article.category}
                    </Badge>
                    <span className="line-clamp-2 text-sm leading-tight font-medium group-hover:underline">
                      {article.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No related topics yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Popular Calculators */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Popular Calculators
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-3">
            {popularCalculators.map((calc) => (
              <li key={calc.href}>
                <Link
                  href={calc.href}
                  className="flex items-center justify-between text-sm hover:text-brand-700 transition-colors group"
                >
                  <span>{calc.title}</span>
                  <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-brand-700" />
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Trending Guides (client-side placeholder) */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Trending Guides
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div id="trending-guides-root" className="min-h-50">
            {/* Hydrated client-side by TrendingGuides component */}
          </div>
        </CardContent>
      </Card>

      {/* Final Ad Slot */}
      <AdSlot id="sidebar-related-bottom" type="box" />
    </aside>
  );
}
