import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { HINDI_CALCULATOR_CATEGORIES } from '@/data/hindiTools';
import articlesData from '@/data/articles.json';
import { getCurrentFiscalYear } from '@/lib/fiscalYear';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  ChartNoAxesColumn,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Landmark,
  Languages,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';

type GuideRecord = {
  slug: string;
  title: string;
  category?: string;
  metaDescription?: string;
  language?: string;
  hidden?: boolean;
  published?: string;
};

type DashboardIntent = {
  title: string;
  desc: string;
  href: string;
  cta: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
};

const FY = getCurrentFiscalYear();

const DASHBOARD_INTENTS: DashboardIntent[] = [
  {
    title: 'लोन निर्णय डेस्क',
    desc: 'EMI, अवधि और कुल ब्याज का तुरंत तुलनात्मक विश्लेषण करें।',
    href: '/hi/loans/home-loan/',
    cta: 'लोन प्लान करें',
    icon: Landmark,
    tone: 'border-blue-200 bg-linear-to-br from-blue-50 to-white',
  },
  {
    title: 'निवेश कमांड सेंटर',
    desc: 'SIP, PPF, ELSS और SSY के साथ दीर्घकालिक कॉर्पस रणनीति बनाएं।',
    href: '/hi/sip-calculator/',
    cta: 'निवेश शुरू करें',
    icon: TrendingUp,
    tone: 'border-emerald-200 bg-linear-to-br from-emerald-50 to-white',
  },
  {
    title: 'टैक्स ऑप्टिमाइज़ेशन',
    desc: 'नई vs पुरानी टैक्स व्यवस्था, HRA और कटौतियों का स्पष्ट मूल्यांकन।',
    href: '/hi/income-tax-calculator/',
    cta: 'टैक्स जांचें',
    icon: FileText,
    tone: 'border-amber-200 bg-linear-to-br from-amber-50 to-white',
  },
  {
    title: 'रिटायरमेंट ब्लूप्रिंट',
    desc: 'EPF, NPS और रिटायरमेंट कैश फ्लो को एक ही फ्रेमवर्क में प्लान करें।',
    href: '/hi/retirement-calculator/',
    cta: 'भविष्य सुरक्षित करें',
    icon: BriefcaseBusiness,
    tone: 'border-violet-200 bg-linear-to-br from-violet-50 to-white',
  },
];

const CATEGORY_TONES = [
  {
    card: 'border-blue-200 bg-linear-to-br from-blue-50/70 to-white',
    iconWrap: 'bg-blue-100 text-blue-700',
    cta: 'text-blue-700 hover:text-blue-800',
  },
  {
    card: 'border-emerald-200 bg-linear-to-br from-emerald-50/70 to-white',
    iconWrap: 'bg-emerald-100 text-emerald-700',
    cta: 'text-emerald-700 hover:text-emerald-800',
  },
  {
    card: 'border-violet-200 bg-linear-to-br from-violet-50/70 to-white',
    iconWrap: 'bg-violet-100 text-violet-700',
    cta: 'text-violet-700 hover:text-violet-800',
  },
  {
    card: 'border-amber-200 bg-linear-to-br from-amber-50/70 to-white',
    iconWrap: 'bg-amber-100 text-amber-700',
    cta: 'text-amber-700 hover:text-amber-800',
  },
] as const;

const FEATURED_TOOL_PATHS = [
  '/hi/sip-calculator/',
  '/hi/emi-calculator/',
  '/hi/income-tax-calculator/',
  '/hi/credit-score/',
  '/hi/retirement-calculator/',
  '/hi/sukanya-samriddhi/',
];

const HINDI_TOOL_MATRIX = [
  {
    title: 'SIP कैलकुलेटर',
    href: '/hi/sip-calculator/',
    useCase: 'लंबी अवधि निवेश लक्ष्य (10-20 वर्ष)',
    output: 'मासिक निवेश, अनुमानित कॉर्पस, अपेक्षित रिटर्न',
  },
  {
    title: 'होम लोन EMI कैलकुलेटर',
    href: '/hi/loans/home-loan/',
    useCase: 'घर खरीदने से पहले EMI क्षमता जांच',
    output: 'EMI, कुल ब्याज, अवधि तुलना और भुगतान बोझ',
  },
  {
    title: 'इनकम टैक्स कैलकुलेटर',
    href: '/hi/income-tax-calculator/',
    useCase: 'नई vs पुरानी टैक्स व्यवस्था का चयन',
    output: 'टैक्स देयता, बचत अंतर, बेहतर रिजीम सिफारिश',
  },
  {
    title: 'सुकन्या समृद्धि कैलकुलेटर',
    href: '/hi/sukanya-samriddhi/',
    useCase: 'बेटी की शिक्षा/भविष्य के लिए सुरक्षित योजना',
    output: 'वार्षिक निवेश, मैच्योरिटी मूल्य, अनुमानित वृद्धि',
  },
  {
    title: 'रिटायरमेंट कैलकुलेटर',
    href: '/hi/retirement-calculator/',
    useCase: 'रिटायरमेंट बाद आय और खर्च का संतुलन',
    output: 'आवश्यक कॉर्पस, मासिक जरूरत, कमी/अधिशेष संकेत',
  },
];

const sanitizeText = (value?: string): string =>
  (value ?? '').replace(/<[^>]*>?/gm, '').trim();

const cleanCategoryName = (value: string): string =>
  value.split(' (')[0]?.trim() ?? value;

const TOTAL_HINDI_CALCULATORS = HINDI_CALCULATOR_CATEGORIES.reduce(
  (total, category) => total + category.tools.length,
  0,
);

export const metadata: Metadata = {
  title: `फाइनेंशियल कैलकुलेटर हिंदी में | EMI, SIP, PPF और Tax Calculator (${FY.endYear})`,
  description: `Fincado पर ${TOTAL_HINDI_CALCULATORS}+ फ्री फाइनेंशियल कैलकुलेटर हिंदी में। SIP, EMI, होम लोन, PPF, सुकन्या समृद्धि, रिटायरमेंट प्लानिंग और इनकम टैक्स की गणना करें। ${FY.fullFormat} के अनुसार अपडेटेड।`,
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
    'investment calculator hindi',
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
    title: `फाइनेंशियल कैलकुलेटर हिंदी में | Fincado (${FY.endYear})`,
    description: `${TOTAL_HINDI_CALCULATORS}+ फ्री कैलकुलेटर हिंदी में: SIP, EMI, होम लोन, PPF, सुकन्या समृद्धि और रिटायरमेंट प्लानिंग। ${FY.fullFormat} अपडेटेड।`,
    url: 'https://fincado.com/hi/',
    siteName: 'Fincado',
    type: 'website',
    locale: 'hi_IN',
    images: [
      {
        url: 'https://fincado.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fincado Hindi Financial Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'फाइनेंशियल कैलकुलेटर हिंदी में',
    description: 'SIP, EMI, होम लोन और रिटायरमेंट कैलकुलेटर अपनी भाषा में।',
    images: ['https://fincado.com/og-image.png'],
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
  const hindiGuides = (articlesData as GuideRecord[]).filter(
    (article) => article.language === 'hi' && !article.hidden,
  );
  const recentGuides = hindiGuides.slice(0, 4);

  const allHindiTools = HINDI_CALCULATOR_CATEGORIES.flatMap(
    (category) => category.tools,
  );
  const totalTools = allHindiTools.length;
  const totalGuides = hindiGuides.length;

  const featuredTools = FEATURED_TOOL_PATHS.map((path) =>
    allHindiTools.find((tool) => tool.href === path),
  ).filter((tool): tool is (typeof allHindiTools)[number] => Boolean(tool));

  const homeStats = [
    { label: 'हिंदी कैलकुलेटर', value: `${totalTools}+`, icon: Calculator },
    { label: 'हिंदी गाइड्स', value: `${totalGuides}+`, icon: BookOpen },
    { label: 'नवीनतम चक्र', value: FY.fullFormat, icon: CircleDollarSign },
    { label: 'प्राथमिक भाषा', value: 'हिंदी + English', icon: Languages },
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://fincado.com/hi/',
    name: 'फाइनेंशियल कैलकुलेटर हिंदी में',
    description:
      `भारत के लिए ${totalTools}+ फ्री फाइनेंशियल कैलकुलेटर हिंदी में। SIP, EMI, होम लोन, PPF और रिटायरमेंट प्लानिंग टूल्स।`,
    url: 'https://fincado.com/hi/',
    inLanguage: 'hi-IN',
    numberOfItems: totalTools + totalGuides,
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Fincado पर कौन से कैलकुलेटर हिंदी में उपलब्ध हैं?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Fincado पर ${totalTools}+ फ्री कैलकुलेटर हिंदी में उपलब्ध हैं जिनमें SIP कैलकुलेटर, EMI कैलकुलेटर, होम लोन, PPF, सुकन्या समृद्धि, रिटायरमेंट प्लानर, इनकम टैक्स और बहुत कुछ शामिल है।`,
        },
      },
      {
        '@type': 'Question',
        name: 'क्या ये कैलकुलेटर फ्री हैं?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `हां, Fincado के सभी कैलकुलेटर 100% फ्री हैं और किसी भी रजिस्ट्रेशन की जरूरत नहीं है। ये ${FY.fullFormat} और नई ब्याज दरों के साथ अपडेट किए गए हैं।`,
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
          text: 'हां, हमारे कैलकुलेटर बैंक-ग्रेड फॉर्मूला का उपयोग करते हैं और नवीनतम बजट नियमों, RBI रेफरेंस और टैक्स स्लैब के अनुसार अपडेट किए जाते हैं।',
        },
      },
    ],
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com' },
          { name: 'हिंदी', url: 'https://fincado.com/hi/' },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="container mx-auto mt-8 mb-10 max-w-7xl px-4 py-8 sm:mt-10 sm:mb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 my-10">
          <div className="min-w-0 space-y-10 lg:col-span-8">
            <section className="relative overflow-hidden rounded-3xl border border-brand-200 bg-linear-to-br from-brand-50/70 via-white to-slate-50 p-6 shadow-sm sm:p-10">
              <div className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-brand-200/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-emerald-200/25 blur-3xl" />

              <div className="relative z-10">
                <Badge className="mb-4 border-brand-200 bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800 hover:bg-brand-100">
                  हिंदी फाइनेंस कमांड सेंटर
                </Badge>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  फाइनेंशियल निर्णय अब
                  <span className="block text-brand-700">
                    एंटरप्राइज़-ग्रेड स्पष्टता के साथ
                  </span>
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
                  लोन, निवेश, टैक्स और रिटायरमेंट की पूरी योजना एक ही हिंदी
                  डैशबोर्ड में बनाएं। हर टूल {FY.fullFormat} नियमों के अनुरूप
                  अपडेटेड और व्यावहारिक निर्णय के लिए डिज़ाइन किया गया है।
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/hi/calculators/">
                    <Button className="h-11 bg-brand-700 px-5 font-semibold text-white hover:bg-brand-800">
                      <Calculator className="mr-2 h-4 w-4" />
                      सारे कैलकुलेटर
                    </Button>
                  </Link>
                  <Link href="/hi/guides/">
                    <Button
                      variant="outline"
                      className="h-11 border-brand-300 px-5 font-semibold text-brand-800 hover:bg-brand-50"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      हिंदी गाइड्स
                    </Button>
                  </Link>
                  <Link href="/calculators/">
                    <Button
                      variant="ghost"
                      className="h-11 px-4 font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <Languages className="mr-2 h-4 w-4" />
                      English Version
                    </Button>
                  </Link>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {homeStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/80 bg-white/75 p-3 shadow-xs backdrop-blur-sm"
                    >
                      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-extrabold text-slate-900">
                        {item.value}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Sparkles className="h-5 w-5 text-brand-700" />
                  Choose Your Next Step by Intent
                </h2>
                <Link
                  href="/hi/calculators/"
                  className="flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800"
                >
                  सब कैटेगरी देखें <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {DASHBOARD_INTENTS.map((item) => (
                  <Link key={item.title} href={item.href} className="group">
                    <Card
                      className={`h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${item.tone}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-xs">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-base text-slate-900">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm leading-relaxed text-slate-600">
                          {item.desc}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                          {item.cta}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <div className="no-print rounded-xl border border-slate-100 bg-slate-50 p-2">
              <div className="flex justify-center">
                <AdSlot type="leaderboard" label="Sponsored" />
              </div>
            </div>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <ChartNoAxesColumn className="h-5 w-5 text-brand-700" />
                  Calculator Category Dashboard
                </h2>
                <Link
                  href="/hi/calculators/"
                  className="flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800"
                >
                  Full Directory <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {HINDI_CALCULATOR_CATEGORIES.map((category, index) => {
                  const tone = CATEGORY_TONES[index % CATEGORY_TONES.length];
                  const categoryTitle = cleanCategoryName(category.name);

                  return (
                    <Card
                      key={category.name}
                      className={`${tone.card} transition-all duration-300 hover:shadow-md`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone.iconWrap}`}
                          >
                            <CircleDollarSign className="h-4 w-4" />
                          </div>
                          <Badge className="border border-white/70 bg-white text-slate-700 hover:bg-white">
                            {category.tools.length} टूल्स
                          </Badge>
                        </div>
                        <CardTitle className="text-base leading-snug text-slate-900">
                          {categoryTitle}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          {category.tools.slice(0, 3).map((tool) => (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              className="flex items-start gap-2 rounded-lg border border-white/70 bg-white/80 px-3 py-2 transition-colors hover:bg-white"
                            >
                              <span className="text-sm">{tool.icon}</span>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-800">
                                  {tool.title}
                                </p>
                                <p className="line-clamp-1 text-xs text-slate-500">
                                  {tool.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 border-t border-white/80 pt-3">
                          <Link
                            href="/hi/calculators/"
                            className={`inline-flex items-center gap-1 text-xs font-semibold ${tone.cta}`}
                          >
                            पूरे सेक्शन में जाएं{' '}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <TrendingUp className="h-5 w-5 text-emerald-700" />
                  आज के लोकप्रिय टूल्स
                </h2>
                <Link
                  href="/hi/calculators/"
                  className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  सब देखें <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {featuredTools.map((tool) => (
                  <Link key={tool.href} href={tool.href} className="group">
                    <Card className="h-full border-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
                      <CardContent className="flex h-full flex-col p-4">
                        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-lg">
                          {tool.icon}
                        </div>
                        <h3 className="mb-1 text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                          {tool.title}
                        </h3>
                        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
                          {tool.desc}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          खोलें <ArrowRight className="h-3 w-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <BookOpen className="h-5 w-5 text-indigo-700" />
                  हालिया हिंदी गाइड्स
                </h2>
                <Link
                  href="/hi/guides/"
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-700 hover:text-indigo-800"
                >
                  सभी लेख <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {recentGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/hi/guides/${guide.slug}/`}
                    className="group block"
                  >
                    <Card className="border-slate-200 transition-all duration-300 hover:border-indigo-300 hover:shadow-md">
                      <CardContent className="p-4 sm:flex sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className="border-indigo-200 bg-indigo-50 text-xs text-indigo-700"
                            >
                              {guide.category ?? 'हिंदी गाइड'}
                            </Badge>
                            <span className="text-[11px] font-medium text-slate-500">
                              {guide.published ?? FY.longFormat}
                            </span>
                          </div>
                          <h3 className="text-sm font-semibold leading-snug text-slate-800 group-hover:text-indigo-700">
                            {guide.title}
                          </h3>
                          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
                            {sanitizeText(guide.metaDescription)}
                          </p>
                        </div>
                        <div className="mt-3 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 sm:flex">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-white p-5">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-900">
                <ShieldCheck className="h-5 w-5" />
                Risk-Aware Hindi Financial Guidance
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'बैंक-ग्रेड फॉर्मूला आधारित परिणाम',
                  `${FY.fullFormat} के अनुसार नियमित अपडेट`,
                  'लोकल भाषा में स्पष्ट डिस्क्लेमर और निर्णय संदर्भ',
                  'गणना + गाइड + अगला कदम एक ही कार्यप्रवाह में',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span className="text-sm font-medium text-emerald-900">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/editorial-guidelines/"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900"
                >
                  Editorial Guidelines <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/disclaimer/"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900"
                >
                  Disclaimer <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </section>

            <article className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="space-y-2">
                <h2
                  id="about-hindi-calculators"
                  className="text-xl font-bold text-slate-900"
                >
                  हिंदी में फाइनेंशियल कैलकुलेटर क्यों जरूरी हैं?
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  भारत में बहुत से उपयोगकर्ता निवेश, लोन और टैक्स निर्णय लेते
                  समय अंग्रेजी फाइनेंशियल टर्म्स की वजह से कन्फ्यूज हो जाते हैं।
                  हिंदी कैलकुलेटर इस गैप को भरते हैं, क्योंकि वे सिर्फ संख्या
                  नहीं दिखाते, बल्कि निर्णय का संदर्भ भी स्पष्ट करते हैं।
                </p>
                <p className="text-sm leading-relaxed text-slate-600">
                  Fincado का मॉडल है:{' '}
                  <strong>Context + Calculation + Action</strong>. यानी पहले
                  समस्या समझें, फिर सटीक गणना देखें, और अंत में अगला सही कदम
                  चुनें।
                </p>
              </header>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                    Context
                  </p>
                  <p className="mt-1 text-sm font-medium text-blue-900">
                    सरल हिंदी में निर्णय संदर्भ
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                    Calculation
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-900">
                    बैंक-ग्रेड फॉर्मूला और अपडेटेड नियम
                  </p>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                    Action
                  </p>
                  <p className="mt-1 text-sm font-medium text-amber-900">
                    अगला व्यावहारिक कदम और तुलना संकेत
                  </p>
                </div>
              </div>

              <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <h3 className="text-lg font-bold text-slate-900">
                  आपके लिए सबसे उपयोगी हिंदी टूल्स
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-600">
                  नीचे दिए गए टूल्स को आय, लक्ष्य और जोखिम-प्रोफाइल के आधार पर
                  चुना गया है।
                </p>

                <div className="mt-3 space-y-2">
                  {HINDI_TOOL_MATRIX.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group block rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition-all hover:border-emerald-300 hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                            {tool.title}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-600">
                            <span className="font-semibold text-slate-700">
                              कब उपयोग करें:
                            </span>{' '}
                            {tool.useCase}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-600">
                            <span className="font-semibold text-slate-700">
                              क्या मिलेगा:
                            </span>{' '}
                            {tool.output}
                          </p>
                        </div>
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-emerald-700" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </article>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <HindiSidebar />

              <Card className="border-slate-200 bg-linear-to-br from-slate-50 to-white shadow-sm">
                <CardContent className="p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Wallet className="h-4 w-4 text-brand-700" />
                    Quick Decision Notes
                  </h3>
                  <div className="space-y-2 text-xs font-medium text-slate-600">
                    <p className="rounded-lg border border-slate-200 bg-white p-2.5">
                      SIP शुरू करने से पहले लक्ष्य अवधि और जोखिम प्रोफाइल तय
                      करें।
                    </p>
                    <p className="rounded-lg border border-slate-200 bg-white p-2.5">
                      लोन निर्णय में सिर्फ EMI नहीं, कुल ब्याज और प्रीपेमेंट
                      क्षमता देखें।
                    </p>
                    <p className="rounded-lg border border-slate-200 bg-white p-2.5">
                      टैक्स बचत में रिटर्न, लॉक-इन और तरलता तीनों को साथ में
                      परखें।
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex min-h-62.5 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <AdSlot type="box" id="hindi-home-sidebar" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
