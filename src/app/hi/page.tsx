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
  Shield,
  Zap,
  Users,
} from 'lucide-react';

// --- SEO METADATA (2026 Best Practices) ---
export const metadata: Metadata = {
  title:
    'फाइनेंशियल कैलकुलेटर हिंदी में | EMI, SIP, PPF और Tax Calculator (2026)',
  description:
    'Fincado पर 30+ फ्री फाइनेंशियल कैलकुलेटर हिंदी में। SIP, EMI, होम लोन, PPF, सुकन्या समृद्धि, रिटायरमेंट प्लानिंग और इनकम टैक्स की गणना करें। Budget 2026 के अनुसार अपडेटेड।',
  keywords: [
    'hindi financial calculator',
    'sip calculator hindi',
    'emi calculator hindi',
    'home loan calculator hindi',
    'ppf calculator hindi',
    'sukanya samriddhi calculator',
    'retirement calculator hindi',
    'income tax calculator hindi',
    'mutual fund calculator hindi',
    'loan calculator hindi',
    'investment calculator hindi'
  ],
  authors: [{ name: 'Fincado Team' }],
  creator: 'Fincado',
  publisher: 'Fincado',
  alternates: {
    canonical: 'https://fincado.com/hi/',
    languages: {
      en: 'https://fincado.com/',
      hi: 'https://fincado.com/hi/',
    },
  },
  openGraph: {
    title: 'फाइनेंशियल कैलकुलेटर हिंदी में | Fincado (2026)',
    description:
      '30+ फ्री कैलकुलेटर हिंदी में: SIP, EMI, होम लोन, PPF, सुकन्या समृद्धि और रिटायरमेंट प्लानिंग। Budget 2026 अपडेटेड।',
    url: 'https://fincado.com/hi/',
    siteName: 'Fincado',
    type: 'website',
    locale: 'hi_IN',
    images: [
      {
        url: 'https://fincado.com/og-hindi-calculators.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Hindi Financial Calculators',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'फाइनेंशियल कैलकुलेटर हिंदी में',
    description: 'SIP, EMI, होम लोन और रिटायरमेंट कैलकुलेटर अपनी भाषा में।',
    images: ['https://fincado.com/og-hindi-calculators.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'content-language': 'hi-IN',
  },
};

export default function HindiHubPage() {
  // Fetch only top 3 recent guides for the home page
  const recentGuides = articlesData
    .filter((a) => a.language === 'hi')
    .slice(0, 3);

  // Select "Popular Tools"
  const popularTools = HINDI_CALCULATOR_CATEGORIES[1]?.tools.slice(0, 6) || [];

  // Structured Data - CollectionPage Schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://fincado.com/hi/',
    name: 'फाइनेंशियल कैलकुलेटर हिंदी में',
    description:
      'भारत के लिए 30+ फ्री फाइनेंशियल कैलकुलेटर हिंदी में। SIP, EMI, होम लोन, PPF और रिटायरमेंट प्लानिंग टूल्स।',
    url: 'https://fincado.com/hi/',
    inLanguage: 'hi-IN',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
      name: 'Fincado',
      url: 'https://fincado.com',
    },
    about: {
      '@type': 'Thing',
      name: 'वित्तीय योजना',
    },
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Fincado पर कौन से कैलकुलेटर हिंदी में उपलब्ध हैं?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fincado पर 30+ फ्री कैलकुलेटर हिंदी में उपलब्ध हैं जिनमें SIP कैलकुलेटर, EMI कैलकुलेटर, होम लोन, PPF, सुकन्या समृद्धि, रिटायरमेंट प्लानर, इनकम टैक्स और बहुत कुछ शामिल है।',
        },
      },
      {
        '@type': 'Question',
        name: 'क्या ये कैलकुलेटर फ्री हैं?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'हां, Fincado के सभी कैलकुलेटर 100% फ्री हैं और किसी भी रजिस्ट्रेशन की जरूरत नहीं है। ये Budget 2026 और नई ब्याज दरों के साथ अपडेट किए गए हैं।',
        },
      },
      {
        '@type': 'Question',
        name: 'SIP कैलकुलेटर का उपयोग कैसे करें?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SIP कैलकुलेटर में मासिक निवेश राशि, अवधि (वर्षों में) और अपेक्षित रिटर्न दर डालें। कैलकुलेटर आपको मैच्योरिटी पर मिलने वाली कुल राशि और कमाए गए रिटर्न दिखाएगा।',
        },
      },
      {
        '@type': 'Question',
        name: 'क्या ये कैलकुलेटर सटीक हैं?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'हां, हमारे कैलकुलेटर बैंक-ग्रेड फॉर्मूला का उपयोग करते हैं और नवीनतम Budget 2026 नियमों, RBI दरों और टैक्स स्लैब के अनुसार अपडेट किए जाते हैं।',
        },
      }
    ],
  };

  return (
    <>
      {/* ✅ BREADCRUMB STRUCTURED DATA */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com' },
          { name: 'हिंदी', url: 'https://fincado.com/hi/' }
        ]}
      />

      {/* ✅ COLLECTION PAGE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* ✅ FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-12">
          {/* --- LEFT COLUMN (Content) --- */}
          <div className="lg:col-span-8 min-w-0 space-y-10">
            {/* HERO SECTION - More Subtle */}
            <section className="relative bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50/30 rounded-2xl p-8 sm:p-10 border border-orange-200/50 shadow-sm overflow-hidden">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 opacity-5">
                <Languages className="w-32 h-32 text-orange-600" />
              </div>

              <div className="relative z-10">
                <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1 text-xs font-bold border-orange-200">
                  नमस्ते भारत! 🇮🇳
                </Badge>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                  फाइनेंशियल{' '}
                  <span className="text-orange-600">कैलकुलेटर और गाइड्स</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed mb-6">
                  अब फाइनेंस को समझना हुआ आसान। अपनी मातृभाषा में निवेश, लोन और
                  बचत की सटीक गणना करें। <strong>Budget 2026</strong> के अनुसार
                  अपडेटेड।
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
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

                <div className="flex flex-wrap gap-3">
                  <Link href="/hi/calculators/">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold h-10 px-5">
                      <Calculator className="w-4 h-4 mr-2" />
                      सारे कैलकुलेटर
                    </Button>
                  </Link>
                  <Link href="/hi/guides/">
                    <Button
                      variant="outline"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50 font-semibold h-10 px-5"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      हिंदी गाइड्स
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* AD SLOT */}
            <div className="flex justify-center no-print bg-slate-50 rounded-lg border border-slate-100 p-2">
              <AdSlot type="leaderboard" label="Sponsored" />
            </div>

            {/* SECTION: POPULAR TOOLS - More Subtle */}
            <section>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  लोकप्रिय टूल्स
                </h2>
                <Link
                  href="/hi/calculators/"
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  सभी देखें <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {popularTools.map((tool) => (
                  <Link key={tool.href} href={tool.href} className="group">
                    <Card className="h-full hover:border-orange-300 hover:shadow-md transition-all border-slate-200">
                      <CardContent className="p-3.5 flex items-start gap-3">
                        <div className="text-xl p-1.5 bg-orange-50 rounded-lg shrink-0 group-hover:bg-orange-100 transition-colors">
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-slate-800 group-hover:text-orange-700 transition-colors mb-0.5 truncate">
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

            {/* SECTION: WHY FINCADO HINDI? */}
            <div className="bg-emerald-50/50 border border-emerald-200/50 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-900 mb-3">
                Fincado हिंदी क्यों चुनें?
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  '100% सटीक गणना (Accurate)',
                  'सरल और स्पष्ट हिंदी भाषा',
                  'अपडेटेड ब्याज दरें (Latest Rates)',
                  'मुफ़्त उपयोग (Free to use)'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-xs text-emerald-800 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: RECENT GUIDES */}
            <section>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  हालिया लेख
                </h2>
                <Link
                  href="/hi/guides/"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  सभी लेख <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {recentGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/hi/guides/${guide.slug}/`}
                    className="group block"
                  >
                    <Card className="hover:border-indigo-300 hover:shadow-md transition-all border-slate-200">
                      <CardContent className="p-4 sm:flex justify-between items-center gap-4">
                        <div className="space-y-2 flex-1 min-w-0">
                          <Badge
                            variant="outline"
                            className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs"
                          >
                            {guide.category}
                          </Badge>
                          <h3 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors leading-snug">
                            {guide.title}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {guide.metaDescription.replace(/<[^>]*>?/gm, '')}
                          </p>
                        </div>
                        <div className="hidden sm:flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* SEO Content Section */}
            <article className="prose prose-slate max-w-none">
              <h2
                id="about-hindi-calculators"
                className="text-xl font-bold text-slate-900"
              >
                हिंदी में फाइनेंशियल कैलकुलेटर क्यों जरूरी हैं?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                भारत में करोड़ों लोग अंग्रेजी की जटिल वित्तीय शब्दावली से परेशान
                होते हैं।{' '}
                <Link
                  href="/hi/sip-calculator/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  SIP
                </Link>
                ,{' '}
                <Link
                  href="/hi/emi-calculator/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  EMI
                </Link>
                ,{' '}
                <Link
                  href="/hi/ppf-calculator/"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  PPF
                </Link>{' '}
                जैसे निवेश विकल्पों को समझना और भी मुश्किल हो जाता है। Fincado
                का मिशन है कि हर भारतीय अपनी मातृभाषा में वित्तीय निर्णय ले सके।
              </p>

              <h3 className="text-lg font-bold text-slate-900 mt-6">
                हमारे लोकप्रिय हिंदी कैलकुलेटर
              </h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>
                  <Link
                    href="/hi/sip-calculator/"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    SIP कैलकुलेटर
                  </Link>{' '}
                  - मासिक निवेश से करोड़पति बनें
                </li>
                <li>
                  <Link
                    href="/hi/loans/home-loan/"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    होम लोन कैलकुलेटर
                  </Link>{' '}
                  - घर के लोन की EMI और ब्याज जानें
                </li>
                <li>
                  <Link
                    href="/hi/ppf-calculator/"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    PPF कैलकुलेटर
                  </Link>{' '}
                  - टैक्स-फ्री बचत योजना
                </li>
                <li>
                  <Link
                    href="/hi/sukanya-samriddhi/"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    सुकन्या समृद्धि योजना
                  </Link>{' '}
                  - बेटी के भविष्य के लिए
                </li>
                <li>
                  <Link
                    href="/hi/retirement-calculator/"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    रिटायरमेंट प्लानर
                  </Link>{' '}
                  - भविष्य की सुरक्षा की योजना
                </li>
              </ul>
            </article>
          </div>

          {/* --- RIGHT COLUMN (Sidebar) --- */}
          <aside className="lg:col-span-4 space-y-6 ">
            <div className="sticky top-24 space-y-6">
              <HindiSidebar />

              {/* Sticky Ad below sidebar content */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center">
                <AdSlot type="box" id="hindi-home-sidebar" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
