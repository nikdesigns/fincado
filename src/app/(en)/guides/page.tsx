import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articlesData from '@/data/articles.json';
import GuidesClient from './GuidesClient';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Languages } from 'lucide-react';

// --- METADATA (Server Side) ---
export const metadata: Metadata = {
  title: 'Financial Guides in English | Loans, SIP, Tax & Credit Score (2026)',
  description:
    'Read updated personal finance guides in English on home loans, SIP, mutual funds, taxes, insurance, and credit scores for India.',
  keywords: [
    'financial guides',
    'personal finance articles',
    'investment guides india',
    'home loan guides',
    'SIP investment tips',
    'tax planning guides',
    'credit score tips',
    'financial literacy india'
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/',
    languages: {
      en: 'https://fincado.com/guides/',
      hi: 'https://fincado.com/hi/guides/',
    },
  },
  openGraph: {
    title: 'Financial Guides in English | Loans, SIP, Tax & Credit Score (2026)',
    description:
      'Read updated personal finance guides in English on home loans, SIP, mutual funds, taxes, insurance, and credit scores for India.',
    url: 'https://fincado.com/guides/',
    type: 'website',
  },
};

export default function GuidesPage() {
  type GuideArticle = {
    slug: string;
    title: string;
    category: string;
    metaDescription: string;
    language?: 'en' | 'hi';
    hidden?: boolean;
    published: string;
  };

  // 1. PREPARE DATA (Server Side)
  const uniqueArticles = new Map<string, GuideArticle>();
  (articlesData as GuideArticle[]).forEach((article) => {
    // Only expose index-worthy English guides in hub feeds
    if ((!article.language || article.language === 'en') && !article.hidden) {
      uniqueArticles.set(article.slug, article);
    }
  });

  // Sort by Newest
  const sortedGuides = Array.from(uniqueArticles.values()).sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime(),
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://fincado.com/guides/',
    name: 'Financial Guides in English',
    description:
      'In-depth guides on loans, SIP, mutual funds, taxation, insurance and credit scores in India.',
    url: 'https://fincado.com/guides/',
    inLanguage: 'en-IN',
    numberOfItems: sortedGuides.length,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
      name: 'Fincado',
      url: 'https://fincado.com/',
    },
  };

  return (
    <main className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' }
        ]}
      />

      {/* --- HINDI PROMO BANNER --- */}
      <div className="no-print my-10">
        <Card className="bg-linear-to-r from-[#fff7ed] to-white border-[#FFE4B7] shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ffedd5] text-[#FF9F4C]">
                  <Languages className="h-6 w-6" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-[#933D18] text-lg">
                    हिंदी में पढ़ना चाहते हैं?
                  </h3>
                  <p className="text-sm text-[#933D18] mt-1">
                    हमारे चुनिंदा गाइड्स अब हिंदी में भी उपलब्ध हैं।
                  </p>
                </div>
              </div>

              <Link href="/hi/" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#FFD093] hover:bg-[#FFE4B7] text-[#933D18] font-semibold">
                  हिंदी गाइड्स देखें &rarr;
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- TOP AD SLOT --- */}
      <div className="mb-10 no-print">
        <AdSlot id="guides-top-leaderboard" type="leaderboard" />
      </div>

      {/* --- HERO SECTION --- */}
      <header className="mx-auto max-w-3xl text-center mb-12">
        <Badge
          variant="secondary"
          className="mb-4 bg-brand-100 text-brand-700 hover:bg-brand-200 px-3 py-1 text-xs uppercase tracking-wider font-semibold"
        >
          Financial Wisdom
        </Badge>

        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl mb-6">
          Read. Learn. <span className="text-brand-700">Grow.</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Demystifying money with simple, actionable guides on Loans,
          Investments, and Tax Planning.
        </p>
      </header>

      {/* --- CLIENT GRID & FILTER --- */}
      <GuidesClient articles={sortedGuides} />

      {/* --- BOTTOM AD SLOT --- */}
      <div className="mt-16 pt-8 border-t border-slate-200 no-print">
        <AdSlot id="guides-bottom-leaderboard" type="leaderboard" />
      </div>
    </main>
  );
}
