import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { HINDI_CALCULATOR_CATEGORIES } from '@/data/hindiTools';
import articlesData from '@/data/articles.json';

// --- UI COMPONENTS ---
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Calculator,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  Languages,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fincado हिंदी: फाइनेंशियल कैलकुलेटर और गाइड्स',
  description:
    'Fincado पर हिंदी में सभी वित्तीय कैलकुलेटर और गाइड्स प्राप्त करें। SIP, EMI, PPF, Sukanya Samriddhi और होम लोन की जानकारी अपनी भाषा में।',
  alternates: { canonical: 'https://www.fincado.com/hi/' },
};

export default function HindiHubPage() {
  // Fetch only top 3 recent guides for the home page
  const recentGuides = articlesData
    .filter((a) => a.language === 'hi')
    .slice(0, 3);

  // Select "Popular Tools" (Taking items from the 'Investments' category usually index 1)
  const popularTools = HINDI_CALCULATOR_CATEGORIES[1]?.tools.slice(0, 6) || [];

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'हिंदी', url: 'https://www.fincado.com/hi/' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
        {/* --- LEFT COLUMN (Content) --- */}
        <div className="lg:col-span-8 min-w-0">
          {/* HERO SECTION */}
          <section className="text-center mb-12 bg-linear-to-br from-amber-50 to-orange-50/30 border border-orange-100 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Languages className="w-32 h-32 text-orange-600" />
            </div>

            <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1 font-semibold border-orange-200">
              नमस्ते भारत! 🇮🇳
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              फाइनेंशियल{' '}
              <span className="text-orange-600">कैलकुलेटर और गाइड्स</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
              अब फाइनेंस को समझना हुआ आसान। अपनी मातृभाषा में निवेश, लोन और बचत
              की सटीक गणना करें।
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/hi/calculators">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6">
                  <Calculator className="w-4 h-4 mr-2" />
                  सारे कैलकुलेटर
                </Button>
              </Link>
              <Link href="/hi/guides">
                <Button
                  variant="outline"
                  className="border-orange-200 text-orange-700 hover:bg-orange-50 font-semibold px-6"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  हिंदी गाइड्स
                </Button>
              </Link>
            </div>
          </section>

          {/* AD SLOT */}
          <div className="mb-10 flex justify-center no-print bg-slate-50 rounded-lg border border-slate-100 p-2">
            <AdSlot type="leaderboard" label="Sponsored" />
          </div>

          {/* SECTION: POPULAR TOOLS */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                लोकप्रिय टूल्स
              </h2>
              <Link
                href="/hi/calculators"
                className="text-sm font-semibold text-orange-600 hover:underline flex items-center"
              >
                सभी देखें <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {popularTools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group">
                  <Card className="h-full hover:shadow-md hover:border-orange-300 transition-all cursor-pointer border-slate-200">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="text-2xl p-2 bg-orange-50 rounded-lg shrink-0 group-hover:bg-orange-100 transition-colors">
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm group-hover:text-orange-700 transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {tool.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* SECTION: WHY FINCADO HINDI? (Trust Builder) */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-12">
            <h3 className="text-lg font-bold text-emerald-900 mb-4">
              Fincado हिंदी क्यों चुनें?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                '100% सटीक गणना (Accurate Calculations)',
                'सरल और स्पष्ट हिंदी भाषा',
                'अपडेटेड ब्याज दरें (Interest Rates)',
                'मुफ़्त उपयोग (Free to use)',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-sm text-emerald-800 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: RECENT GUIDES */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-500" />
                हालिया लेख
              </h2>
              <Link
                href="/hi/guides"
                className="text-sm font-semibold text-indigo-600 hover:underline flex items-center"
              >
                सभी लेख पढ़ें <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/hi/guides/${guide.slug}`}
                  className="group block"
                >
                  <Card className="hover:shadow-md hover:border-indigo-300 transition-all border-slate-200">
                    <CardContent className="p-5 sm:flex justify-between items-center gap-4">
                      <div className="space-y-2">
                        <Badge
                          variant="outline"
                          className="bg-indigo-50 text-indigo-700 border-indigo-200"
                        >
                          {guide.category}
                        </Badge>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2">
                          {guide.metaDescription.replace(/<[^>]*>?/gm, '')}
                        </p>
                      </div>
                      <div className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN (Sidebar) --- */}
        <aside className="lg:col-span-4 space-y-8 my-12">
          {/* Reusing your HindiSidebar component but wrapping it for consistent spacing if needed */}
          <div className="sticky top-24">
            <HindiSidebar />

            {/* Sticky Ad below sidebar content */}
            <div className="mt-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center">
              <AdSlot type="box" id="hindi-home-sidebar" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
