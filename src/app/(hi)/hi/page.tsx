import type { Metadata } from 'next';
import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { HINDI_CALCULATOR_CATEGORIES } from '@/data/hindiTools';
import articlesData from '@/data/articles.json';
import { getCurrentFiscalYear } from '@/lib/fiscalYear';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  Compass,
  FileText,
  Landmark,
  Languages,
  LayoutGrid,
  Lightbulb,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  TrendingUp,
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
  icon: LucideIcon;
};

const FY = getCurrentFiscalYear();

const DASHBOARD_INTENTS: DashboardIntent[] = [
  {
    title: 'लोन की योजना',
    desc: 'EMI, अवधि और कुल ब्याज की तुरंत तुलना करें।',
    href: '/hi/loans/home-loan/',
    cta: 'लोन प्लान करें',
    icon: Landmark,
  },
  {
    title: 'निवेश की शुरुआत',
    desc: 'SIP, PPF, ELSS और SSY के साथ लंबी अवधि का कॉर्पस बनाएं।',
    href: '/hi/sip-calculator/',
    cta: 'निवेश शुरू करें',
    icon: TrendingUp,
  },
  {
    title: 'टैक्स की बचत',
    desc: 'नई vs पुरानी टैक्स व्यवस्था, HRA और कटौतियों को साफ़ समझें।',
    href: '/hi/income-tax-calculator/',
    cta: 'टैक्स जांचें',
    icon: FileText,
  },
  {
    title: 'रिटायरमेंट की तैयारी',
    desc: 'EPF, NPS और रिटायरमेंट के बाद की आय को एक साथ प्लान करें।',
    href: '/hi/retirement-calculator/',
    cta: 'भविष्य सुरक्षित करें',
    icon: BriefcaseBusiness,
  },
];

const CATEGORY_ICONS: LucideIcon[] = [Landmark, TrendingUp, PiggyBank, FileText];

// Illustrations that exist for the featured tools; others fall back to an icon tile
const TOOL_ILLUSTRATIONS: Record<string, string> = {
  '/hi/sip-calculator/': '/images/icons/sip.svg',
  '/hi/emi-calculator/': '/images/icons/emi.svg',
  '/hi/income-tax-calculator/': '/images/icons/tax.svg',
  '/hi/credit-score/': '/images/icons/credit.svg',
  '/hi/retirement-calculator/': '/images/icons/retirement.svg',
  '/hi/sukanya-samriddhi/': '/images/icons/ppf.svg',
};

const DECISION_NOTES = [
  'SIP शुरू करने से पहले लक्ष्य की अवधि और जोखिम प्रोफाइल तय करें।',
  'लोन के फैसले में सिर्फ EMI नहीं, कुल ब्याज और प्रीपेमेंट की गुंजाइश भी देखें।',
  'टैक्स बचत में रिटर्न, लॉक-इन और तरलता — तीनों को साथ में परखें।',
];

/* Small pill used above every section heading */
function Eyebrow({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
      <Icon className="h-3.5 w-3.5" /> {children}
    </p>
  );
}

const SECTION_LINK =
  'group inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-900';

const CARD =
  'rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-brand-500 hover:shadow-xl hover:shadow-slate-900/5';

const H2 = 'text-3xl font-bold leading-snug tracking-tight text-slate-900 sm:text-4xl sm:leading-snug';

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
  authors: [{ name: 'Nitin Kaushik', url: 'https://fincado.com/about/' }],
  creator: 'Fincado',
  publisher: 'Fincado',
  alternates: {
    canonical: 'https://fincado.com/hi/',
    languages: {
      'en-IN': 'https://fincado.com/',
      'hi-IN': 'https://fincado.com/hi/',
      'x-default': 'https://fincado.com/',
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
    { label: 'वित्त वर्ष के अनुसार अपडेटेड', value: FY.fullFormat, icon: CircleDollarSign },
    { label: 'दोनों भाषाओं में', value: 'हिंदी + English', icon: Languages },
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
          { name: 'Home', url: 'https://fincado.com/' },
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

      <div className="flex flex-col bg-slate-50">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-32 -left-32 h-125 w-125 rounded-full bg-brand-500/8 blur-[140px]" />
            <div className="absolute -bottom-32 right-0 h-100 w-100 rounded-full bg-brand-400/6 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="max-w-xl">
                <Eyebrow icon={Languages}>हिंदी में फाइनेंशियल टूल्स</Eyebrow>
                <h1 className="text-4xl font-bold leading-[1.25] tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.25]">
                  पैसों के फैसले,{' '}
                  <span className="rounded-lg bg-brand-300 px-2 box-decoration-clone">
                    अब अपनी भाषा में।
                  </span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  लोन, निवेश, टैक्स और रिटायरमेंट की पूरी योजना हिंदी में
                  बनाएं। हर कैलकुलेटर {FY.fullFormat} के नियमों के अनुसार
                  अपडेटेड है।
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/hi/calculators/"
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand-400 px-6 text-sm font-semibold text-slate-900 transition-colors hover:bg-brand-500"
                  >
                    <Calculator className="h-5 w-5" />
                    सारे कैलकुलेटर
                  </Link>
                  <Link
                    href="/hi/guides/"
                    className="inline-flex h-12 items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-900"
                  >
                    <BookOpen className="h-5 w-5" />
                    हिंदी गाइड्स
                  </Link>
                </div>

                <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                  {['बिल्कुल फ्री', 'रजिस्ट्रेशन की जरूरत नहीं', 'English में भी उपलब्ध'].map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular tools card */}
              <div className="w-full">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">लोकप्रिय कैलकुलेटर</p>
                      <p className="text-xs text-slate-500">सबसे ज़्यादा इस्तेमाल होने वाले टूल्स</p>
                    </div>
                    <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700">
                      {FY.fullFormat}
                    </span>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {featuredTools.slice(0, 5).map((tool) => {
                      const illustration = TOOL_ILLUSTRATIONS[tool.href];
                      return (
                        <li key={tool.href}>
                          <Link
                            href={tool.href}
                            className="group flex items-center gap-4 px-5 py-3 transition-colors hover:bg-slate-50"
                          >
                            {illustration ? (
                              <Image src={illustration} alt="" width={44} height={44} className="h-11 w-11 shrink-0 object-contain" />
                            ) : (
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                                <Calculator className="h-5 w-5" />
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-slate-900">{tool.title}</p>
                              <p className="truncate text-xs text-slate-500">{tool.desc}</p>
                            </div>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-slate-900">
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-slate-100 px-5 py-3">
                    <Link href="/hi/calculators/" className="flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-brand-700">
                      सभी {totalTools} कैलकुलेटर देखें <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAND ───────────────────────────────────── */}
        <div className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-slate-200">
              {homeStats.map((item) => (
                <div key={item.label} className="flex items-center gap-4 px-2 py-6 sm:px-6 lg:py-8">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-400 text-slate-900">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <dd className="text-2xl font-bold leading-none tracking-tight text-slate-900">{item.value}</dd>
                    <dt className="mt-1.5 text-sm text-slate-500">{item.label}</dt>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── INTENTS ──────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <Eyebrow icon={Compass}>शुरुआत यहां से</Eyebrow>
              <h2 className={H2}>आज आप क्या प्लान करना चाहते हैं?</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                अपनी ज़रूरत चुनें और सीधे सही कैलकुलेटर पर पहुंचें।
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DASHBOARD_INTENTS.map((item) => (
                <Link key={item.title} href={item.href} className={`group flex flex-col p-6 ${CARD}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-brand-400">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold leading-snug tracking-tight text-slate-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    {item.cta}
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 transition-colors group-hover:border-brand-400 group-hover:bg-brand-400">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="no-print mx-auto flex w-full max-w-5xl justify-center px-4 pb-12">
          <AdSlot type="leaderboard" label="Sponsored" />
        </div>

        {/* ── CATEGORIES ───────────────────────────────────── */}
        <section className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <Eyebrow icon={LayoutGrid}>सभी कैटेगरी</Eyebrow>
                <h2 className={H2}>कैटेगरी के अनुसार कैलकुलेटर</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                  {totalTools} कैलकुलेटर, चार कैटेगरी में — लोन से लेकर रिटायरमेंट तक।
                </p>
              </div>
              <Link href="/hi/calculators/" className={SECTION_LINK}>
                पूरी सूची देखें
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {HINDI_CALCULATOR_CATEGORIES.map((category, index) => {
                const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
                return (
                  <div key={category.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-brand-400">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="flex-1 text-base font-semibold leading-snug text-slate-900">
                        {cleanCategoryName(category.name)}
                      </h3>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                        {category.tools.length}
                      </span>
                    </div>
                    <ul className="mt-3 flex-1 space-y-0.5">
                      {category.tools.slice(0, 5).map((tool) => (
                        <li key={tool.href}>
                          <Link
                            href={tool.href}
                            className="group/item flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                          >
                            <span className="truncate">{tool.title}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 opacity-0 transition-opacity group-hover/item:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {category.tools.length > 5 && (
                      <Link
                        href="/hi/calculators/"
                        className="mt-3 inline-flex items-center gap-1 border-t border-slate-100 px-2 pt-3 text-sm font-semibold text-slate-900 hover:text-brand-700"
                      >
                        +{category.tools.length - 5} और देखें <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── GUIDES ───────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <Eyebrow icon={BookOpen}>सीखें</Eyebrow>
                <h2 className={H2}>हिंदी गाइड्स</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                  लोन, टैक्स और निवेश को सरल हिंदी में समझें।
                </p>
              </div>
              <Link href="/hi/guides/" className={SECTION_LINK}>
                सभी {totalGuides} गाइड्स
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {recentGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/hi/guides/${guide.slug}/`}
                  className={`group flex items-start gap-4 p-6 ${CARD}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {guide.category ?? 'हिंदी गाइड'}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold leading-snug text-slate-900">{guide.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {sanitizeText(guide.metaDescription)}
                    </p>
                  </div>
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-slate-900">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY HINDI ────────────────────────────────────── */}
        <section className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <article>
                <Eyebrow icon={Sparkles}>हिंदी में क्यों</Eyebrow>
                <h2 id="about-hindi-calculators" className={H2}>
                  हिंदी में फाइनेंशियल कैलकुलेटर क्यों जरूरी हैं?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  भारत में बहुत से उपयोगकर्ता निवेश, लोन और टैक्स निर्णय लेते
                  समय अंग्रेजी फाइनेंशियल टर्म्स की वजह से कन्फ्यूज हो जाते हैं।
                  हिंदी कैलकुलेटर इस गैप को भरते हैं, क्योंकि वे सिर्फ संख्या
                  नहीं दिखाते, बल्कि निर्णय का संदर्भ भी स्पष्ट करते हैं।
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Fincado का तरीका सीधा है: पहले समस्या समझें, फिर सटीक गणना
                  देखें, और अंत में अगला सही कदम चुनें।
                </p>

                <ol className="mt-8 space-y-3">
                  {[
                    { step: 'संदर्भ', desc: 'सरल हिंदी में निर्णय का संदर्भ' },
                    { step: 'गणना', desc: 'बैंक-ग्रेड फॉर्मूला और अपडेटेड नियम' },
                    { step: 'अगला कदम', desc: 'व्यावहारिक सुझाव और तुलना' },
                  ].map((item, index) => (
                    <li key={item.step} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-brand-400">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{item.step}</h3>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>

              <div>
                <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-900">
                  आपके लिए सबसे उपयोगी हिंदी टूल्स
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  किस ज़रूरत के लिए कौन सा कैलकुलेटर, और उससे क्या पता चलेगा।
                </p>
                <div className="mt-6 space-y-3">
                  {HINDI_TOOL_MATRIX.map((tool) => (
                    <Link key={tool.href} href={tool.href} className={`group block p-5 ${CARD}`}>
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-base font-semibold text-slate-900">{tool.title}</h4>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-slate-900" />
                      </div>
                      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                        <div>
                          <dt className="text-xs font-semibold text-slate-400">कब उपयोग करें</dt>
                          <dd className="mt-0.5 text-slate-600">{tool.useCase}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold text-slate-400">क्या मिलेगा</dt>
                          <dd className="mt-0.5 text-slate-600">{tool.output}</dd>
                        </div>
                      </dl>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST + NOTES ────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-8">
                <Eyebrow icon={ShieldCheck}>भरोसेमंद गणना</Eyebrow>
                <h2 className={H2}>साफ़ जानकारी, सोच-समझकर फैसला</h2>
                <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    'बैंक-ग्रेड फॉर्मूला आधारित परिणाम',
                    `${FY.fullFormat} के अनुसार नियमित अपडेट`,
                    'सरल भाषा में स्पष्ट डिस्क्लेमर और संदर्भ',
                    'गणना, गाइड और अगला कदम — सब एक जगह',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                      <span className="text-sm font-medium text-slate-900">{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-12 flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
                  <Lightbulb className="h-5 w-5 text-brand-600" />
                  फैसले से पहले याद रखें
                </h3>
                <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                  {DECISION_NOTES.map((note) => (
                    <li key={note} className="rounded-2xl bg-slate-50 p-5 text-sm leading-relaxed text-slate-700">
                      {note}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                  <Link href="/editorial-guidelines/" className="inline-flex items-center gap-1 text-slate-900 hover:text-brand-700">
                    Editorial Guidelines <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link href="/disclaimer/" className="inline-flex items-center gap-1 text-slate-900 hover:text-brand-700">
                    Disclaimer <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="no-print flex min-h-62.5 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-4">
                <AdSlot type="box" id="hindi-home-sidebar" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ──────────────────────────────────── */}
        <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />
              <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-brand-300">
                <CircleDollarSign className="h-3.5 w-3.5" />
                {totalTools} कैलकुलेटर, बिल्कुल फ्री
              </p>
              <h2 className="text-3xl font-bold leading-snug tracking-tight text-white sm:text-4xl sm:leading-snug">
                अपनी पहली गणना अभी शुरू करें।
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
                EMI हो, SIP हो या टैक्स — सही आंकड़े देखकर ही फैसला लें।
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link href="/hi/emi-calculator/" className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand-400 px-7 text-sm font-semibold text-slate-900 transition-colors hover:bg-brand-300">
                  <Calculator className="h-5 w-5" /> EMI कैलकुलेटर
                </Link>
                <Link href="/hi/sip-calculator/" className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  <TrendingUp className="h-5 w-5" /> SIP कैलकुलेटर
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
