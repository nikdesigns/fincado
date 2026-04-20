import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import LanguageToggle from '@/components/LanguageToggle';

// --- UI COMPONENTS ---
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  CheckCircle2,
  BadgeCheck,
  TrendingUp,
  LineChart,
  Shield,
  Zap,
  Users,
  Sparkles,
} from 'lucide-react';

// --- COMPLETE HINDI CALCULATOR DATA (synced with English coverage) ---
const HINDI_CALCULATOR_CATEGORIES = [
  {
    name: 'लोन और ईएमआई (Loans)',
    id: 'loans',
    tools: [
      {
        title: 'होम लोन EMI',
        desc: 'घर के लोन की किस्त और ब्याज जानें।',
        href: '/hi/loans/home-loan/',
        icon: '🏠',
      },
      {
        title: 'कार लोन EMI',
        desc: 'नई या पुरानी कार लोन की गणना।',
        href: '/hi/loans/car-loan/',
        icon: '🚗',
      },
      {
        title: 'पर्सनल लोन EMI',
        desc: 'शादी या मेडिकल खर्च के लिए लोन।',
        href: '/hi/loans/personal-loan/',
        icon: '💳',
      },
      {
        title: 'एजुकेशन लोन',
        desc: 'पढ़ाई के लोन और मोरेटोरियम की गणना।',
        href: '/hi/loans/education-loan/',
        icon: '🎓',
      },
      {
        title: 'EMI कैलकुलेटर',
        desc: 'किसी भी लोन की साधारण EMI गणना।',
        href: '/hi/emi-calculator/',
        icon: '🔢',
      },
      {
        title: 'EMI प्रीपेमेंट',
        desc: 'आंशिक प्रीपेमेंट से ब्याज और अवधि में बचत देखें।',
        href: '/hi/emi-prepayment-calculator/',
        icon: '📉',
      }
    ],
  },
  {
    name: 'निवेश और बचत (Investment & Savings)',
    id: 'investment',
    tools: [
      {
        title: 'SIP कैलकुलेटर',
        desc: 'मासिक निवेश से करोड़पति बनें।',
        href: '/hi/sip-calculator/',
        icon: '📈',
      },
      {
        title: 'लम्पसम (एकमुश्त)',
        desc: 'एक बार निवेश करने पर रिटर्न।',
        href: '/hi/lumpsum-calculator/',
        icon: '💰',
      },
      {
        title: 'ELSS कैलकुलेटर',
        desc: 'टैक्स बचत (80C) और ELSS म्यूचुअल फंड रिटर्न।',
        href: '/hi/elss-calculator/',
        icon: '📊',
      },
      {
        title: 'म्यूचुअल फंड',
        desc: 'इक्विटी, डेट और गोल्ड पोर्टफोलियो।',
        href: '/hi/mutual-funds/',
        icon: '📊',
      },
      {
        title: 'PPF कैलकुलेटर',
        desc: 'पब्लिक प्रोविडेंट फंड (टैक्स फ्री)।',
        href: '/hi/ppf-calculator/',
        icon: '🏦',
      },
      {
        title: 'सुकन्या समृद्धि (SSY)',
        desc: 'बेटी के भविष्य के लिए सरकारी योजना।',
        href: '/hi/sukanya-samriddhi/',
        icon: '👧',
      },
      {
        title: 'FD कैलकुलेटर',
        desc: 'फिक्स्ड डिपॉजिट ब्याज की गणना।',
        href: '/hi/fd-calculator/',
        icon: '📜',
      },
      {
        title: 'RD कैलकुलेटर',
        desc: 'रेकरिंग डिपॉजिट (मासिक बचत)।',
        href: '/hi/rd-calculator/',
        icon: '🔄',
      },
      {
        title: 'SWP कैलकुलेटर',
        desc: 'निवेश से मासिक आय (पेंशन) पाएं।',
        href: '/hi/swp-calculator/',
        icon: '💧',
      },
      {
        title: 'POMIS कैलकुलेटर',
        desc: 'पोस्ट ऑफिस MIS से मासिक आय और मैच्योरिटी जानें।',
        href: '/hi/pomis-calculator/',
        icon: '📮',
      },
      {
        title: 'KVP कैलकुलेटर',
        desc: 'किसान विकास पत्र में पैसा दोगुना होने की समयसीमा ट्रैक करें।',
        href: '/hi/kvp-calculator/',
        icon: '⏱️',
      },
      {
        title: 'NSC कैलकुलेटर',
        desc: 'नेशनल सेविंग्स सर्टिफिकेट रिटर्न और टैक्स बेनिफिट।',
        href: '/hi/nsc-calculator/',
        icon: '📄',
      },
      {
        title: 'CAGR कैलकुलेटर',
        desc: 'निवेश की वार्षिक वृद्धि दर (Compound Annual Growth Rate)।',
        href: '/hi/cagr-calculator/',
        icon: '🎯',
      }
    ],
  },
  {
    name: 'रिटायरमेंट और पेंशन (Retirement & Pension)',
    id: 'retirement',
    tools: [
      {
        title: 'रिटायरमेंट प्लानर',
        desc: 'जानें रिटायरमेंट के लिए कितना पैसा चाहिए।',
        href: '/hi/retirement-calculator/',
        icon: '👴',
      },
      {
        title: 'NPS कैलकुलेटर',
        desc: 'नेशनल पेंशन स्कीम कॉर्पस और मासिक पेंशन।',
        href: '/hi/nps-calculator/',
        icon: '🛡️',
      },
      {
        title: 'EPF कैलकुलेटर',
        desc: 'सैलरी से कटने वाले PF का हिसाब।',
        href: '/hi/epf-calculator/',
        icon: '🏢',
      },
      {
        title: 'ग्रेच्युटी कैलकुलेटर',
        desc: 'नौकरी छोड़ने पर मिलने वाली रकम।',
        href: '/hi/gratuity-calculator/',
        icon: '🎁',
      },
      {
        title: 'अटल पेंशन (APY)',
        desc: 'सरकारी गारंटीड पेंशन योजना।',
        href: '/hi/apy-calculator/',
        icon: '☂️',
      },
      {
        title: 'SCSS कैलकुलेटर',
        desc: 'सीनियर सिटिजन सेविंग्स स्कीम का तिमाही ब्याज और मैच्योरिटी देखें।',
        href: '/hi/scss-calculator/',
        icon: '👴',
      },
      {
        title: 'FIRE कैलकुलेटर',
        desc: 'जल्दी रिटायर होने का प्लान बनाएं।',
        href: '/hi/fire-calculator/',
        icon: '🔥',
      },
      {
        title: 'गोल प्लानिंग',
        desc: 'अपने सभी वित्तीय लक्ष्यों की योजना बनाएं।',
        href: '/hi/goal-planning-calculator/',
        icon: '🎯',
      }
    ],
  },
  {
    name: 'टैक्स और अन्य टूल्स (Tax & Other Tools)',
    id: 'tax-tools',
    tools: [
      {
        title: 'इनकम टैक्स कैलकुलेटर',
        desc: 'नई vs पुरानी टैक्स रिजीम की तुलना (FY 2026-27)।',
        href: '/hi/income-tax-calculator/',
        icon: '📋',
      },
      {
        title: 'HRA कैलकुलेटर',
        desc: 'हाउस रेंट अलाउंस टैक्स छूट की गणना।',
        href: '/hi/hra-calculator/',
        icon: '🏘️',
      },
      {
        title: 'सैलरी कैलकुलेटर',
        desc: 'CTC से इन-हैंड सैलरी का अनुमान लगाएं।',
        href: '/hi/salary-calculator/',
        icon: '💼',
      },
      {
        title: 'कैपिटल गेन्स कैलकुलेटर',
        desc: 'शेयर, म्यूचुअल फंड और प्रॉपर्टी पर STCG/LTCG टैक्स निकालें।',
        href: '/hi/capital-gains-calculator/',
        icon: '📊',
      },
      {
        title: 'ब्रोकरेज कैलकुलेटर',
        desc: 'ट्रेडिंग में ब्रोकरेज, GST, STT और नेट P&L देखें।',
        href: '/hi/brokerage-calculator/',
        icon: '📉',
      },
      {
        title: 'रेंट रसीद जनरेटर',
        desc: 'HRA क्लेम के लिए तुरंत वैध रेंट रसीद बनाएं।',
        href: '/hi/rent-receipt-generator/',
        icon: '🧾',
      },
      {
        title: 'GST कैलकुलेटर',
        desc: 'कीमत में टैक्स जोड़ें या हटाएं।',
        href: '/hi/gst-calculator/',
        icon: '🧾',
      },
      {
        title: 'महंगाई कैलकुलेटर',
        desc: 'जानें भविष्य में पैसे की कीमत क्या होगी।',
        href: '/hi/inflation-calculator/',
        icon: '📉',
      },
      {
        title: 'क्रेडिट स्कोर एस्टीमेटर',
        desc: 'अपना CIBIL स्कोर चेक और सुधारें।',
        href: '/hi/credit-score/',
        icon: '⭐',
      },
      {
        title: 'साधारण ब्याज',
        desc: 'साधारण ब्याज की गणना (Simple Interest)।',
        href: '/hi/simple-interest-calculator/',
        icon: '➗',
      },
      {
        title: 'कंपाउंड इंटरेस्ट',
        desc: 'चक्रवृद्धि ब्याज (ब्याज पर ब्याज)।',
        href: '/hi/compound-interest-calculator/',
        icon: '🔄',
      }
    ],
  }
];

const TOTAL_HINDI_CALCULATORS = HINDI_CALCULATOR_CATEGORIES.reduce(
  (total, category) => total + category.tools.length,
  0,
);

/* ---------------- ENHANCED SEO METADATA (2026) ---------------- */
export const metadata: Metadata = {
  title: `${TOTAL_HINDI_CALCULATORS}+ फाइनेंशियल कैलकुलेटर हिंदी में | SIP, EMI, PPF, Home Loan (2026)`,
  description:
    `Fincado पर ${TOTAL_HINDI_CALCULATORS}+ फ्री कैलकुलेटर: SIP, EMI, होम लोन, पर्सनल लोन, PPF, सुकन्या समृद्धि, NPS, EPF, रिटायरमेंट, सैलरी, कैपिटल गेन्स और इनकम टैक्स। Budget 2026 और FY 2026-27 के अनुसार अपडेटेड। सभी टूल्स 100% फ्री और सटीक।`,
  keywords: [
    'financial calculator hindi',
    'sip calculator hindi',
    'emi calculator hindi',
    'home loan calculator hindi',
    'ppf calculator hindi',
    'sukanya samriddhi calculator',
    'nps calculator hindi',
    'epf calculator hindi',
    'retirement calculator hindi',
    'income tax calculator hindi 2026',
    'personal loan calculator hindi',
    'fd calculator hindi',
    'mutual fund calculator hindi',
    'inflation calculator hindi',
    'gst calculator hindi',
    'hra calculator hindi',
    'gratuity calculator hindi',
    'cagr calculator hindi'
  ],
  authors: [{ name: 'Fincado Team' }],
  creator: 'Fincado',
  publisher: 'Fincado',
  alternates: {
    canonical: 'https://fincado.com/hi/calculators/',
    languages: {
      en: 'https://fincado.com/calculators/',
      hi: 'https://fincado.com/hi/calculators/',
    },
  },
  openGraph: {
    title: `${TOTAL_HINDI_CALCULATORS}+ फाइनेंशियल कैलकुलेटर हिंदी में (2026)`,
    description:
      'SIP, EMI, होम लोन, PPF, सुकन्या समृद्धि, NPS, EPF और रिटायरमेंट कैलकुलेटर। Budget 2026 अपडेटेड। 100% फ्री और सटीक।',
    url: 'https://fincado.com/hi/calculators/',
    siteName: 'Fincado',
    type: 'website',
    locale: 'hi_IN',
    images: [
      {
        url: 'https://fincado.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fincado Hindi Financial Calculators',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TOTAL_HINDI_CALCULATORS}+ फाइनेंशियल कैलकुलेटर हिंदी में`,
    description:
      'SIP, EMI, होम लोन, NPS, EPF और रिटायरमेंट कैलकुलेटर। Budget 2026 अपडेटेड।',
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

export default function HindiCalculatorsPage() {
  const totalCalculators = TOTAL_HINDI_CALCULATORS;

  // Get popular calculators (first 6)
  const popularCalculators = HINDI_CALCULATOR_CATEGORIES.flatMap((cat) =>
    cat.tools.slice(0, 2),
  ).slice(0, 6);

  // Structured Data - CollectionPage Schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://fincado.com/hi/calculators/',
    name: 'फाइनेंशियल कैलकुलेटर हिंदी में',
    description:
      `${TOTAL_HINDI_CALCULATORS}+ फ्री फाइनेंशियल कैलकुलेटर: SIP, EMI, होम लोन, PPF, सुकन्या समृद्धि, NPS, EPF, रिटायरमेंट, सैलरी और टैक्स कैलकुलेटर।`,
    url: 'https://fincado.com/hi/calculators/',
    inLanguage: 'hi-IN',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
      name: 'Fincado',
      url: 'https://fincado.com',
    },
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'कौन से कैलकुलेटर हिंदी में उपलब्ध हैं?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Fincado पर ${TOTAL_HINDI_CALCULATORS}+ कैलकुलेटर हिंदी में उपलब्ध हैं: SIP, EMI, होम लोन, पर्सनल लोन, कार लोन, PPF, सुकन्या समृद्धि, FD, RD, POMIS, KVP, SCSS, NPS, EPF, रिटायरमेंट प्लानर, इनकम टैक्स, सैलरी, HRA, कैपिटल गेन्स, ब्रोकरेज, GST, महंगाई, CAGR और क्रेडिट स्कोर कैलकुलेटर।`,
        },
      },
      {
        '@type': 'Question',
        name: 'क्या ये कैलकुलेटर मुफ़्त हैं?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'हां, सभी कैलकुलेटर 100% मुफ़्त हैं। कोई रजिस्ट्रेशन या लॉग-इन की जरूरत नहीं है।',
        },
      },
      {
        '@type': 'Question',
        name: 'EMI कैलकुलेटर का उपयोग कैसे करें?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'EMI कैलकुलेटर में लोन राशि, ब्याज दर और अवधि (महीनों में) डालें। कैलकुलेटर आपको मासिक EMI, कुल ब्याज और कुल भुगतान दिखाएगा।',
        },
      },
      {
        '@type': 'Question',
        name: 'SIP कैलकुलेटर क्या है?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SIP (सिस्टमैटिक इन्वेस्टमेंट प्लान) कैलकुलेटर यह बताता है कि मासिक निवेश से आपको कितना रिटर्न मिलेगा। यह म्यूचुअल फंड में निवेश की योजना बनाने में मदद करता है।',
        },
      }
    ],
  };

  return (
    <>
      {/* ✅ BREADCRUMB STRUCTURED DATA */}
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' }
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* --- LEFT COLUMN: CONTENT --- */}
          <div className="lg:col-span-8 min-w-0 space-y-10 my-12">
            {/* HERO HEADER */}
            <header className="relative bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50/30 rounded-2xl p-8 border border-orange-200/50 shadow-sm overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white border-orange-300 text-orange-700 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm">
                      {totalCalculators}+ मुफ़्त टूल्स
                    </Badge>
                    <Badge className="bg-orange-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <BadgeCheck className="w-3 h-3" />
                      बजट 2026
                    </Badge>
                  </div>
                  <div className="no-print">
                    <LanguageToggle path="/calculators" />
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 leading-tight">
                  वित्तीय कैलकुलेटर हिंदी में
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl mb-6">
                  निवेश, लोन और टैक्स की गणना के लिए भारत के सबसे सटीक टूल्स।{' '}
                  <strong>Budget 2026</strong> और <strong>FY 2026-27</strong> के
                  नियमों के अनुसार अपडेटेड।
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
              </div>
            </header>

            {/* Top Ad */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center overflow-hidden no-print">
              <AdSlot type="leaderboard" label="Sponsored" />
            </div>

            {/* Popular Calculators Section */}
            <section className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  लोकप्रिय कैलकुलेटर
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {popularCalculators.map((tool) => (
                  <Link key={tool.href} href={tool.href} className="group">
                    <Card className="h-full border-slate-200 bg-white hover:border-orange-300 hover:shadow-md transition-all duration-200">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-lg group-hover:bg-orange-100 transition-colors">
                            {tool.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-slate-900 group-hover:text-orange-700 transition-colors truncate">
                              {tool.title}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-1">
                              त्वरित उपयोग
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-600 transition-colors shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Calculator Categories */}
            <div className="space-y-10">
              {HINDI_CALCULATOR_CATEGORIES.map((cat) => (
                <section key={cat.id} id={cat.id} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-5">
                    <h2 className="text-lg font-bold text-slate-900">
                      {cat.name}
                    </h2>
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-600 text-xs"
                    >
                      {cat.tools.length}
                    </Badge>
                    <div className="h-px bg-slate-200 grow" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cat.tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="group block h-full"
                      >
                        <Card className="h-full flex flex-col border border-slate-200 bg-white transition-all duration-200 hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5">
                          <CardContent className="p-4 flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="shrink-0 w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-xl group-hover:bg-orange-100 transition-colors">
                                {tool.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-orange-700 transition-colors leading-snug mb-1">
                                  {tool.title}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                  {tool.desc}
                                </p>
                              </div>
                            </div>

                            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                                मुफ़्त
                              </span>
                              <div className="flex items-center gap-1 text-xs font-medium text-orange-600 group-hover:text-orange-700 transition-colors">
                                गणना करें
                                <ArrowRight className="h-3 w-3" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Mid Ad */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-center overflow-hidden no-print">
              <AdSlot type="leaderboard" />
            </div>

            {/* SEO Content */}
            <article className="space-y-8 prose prose-slate max-w-none">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4">
                  <LineChart className="w-5 h-5 text-emerald-600" />
                  वित्तीय कैलकुलेटर क्यों जरूरी हैं?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  चाहे आप{' '}
                  <Link
                    href="/hi/loans/home-loan/"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    होम लोन
                  </Link>{' '}
                  ले रहे हों या{' '}
                  <Link
                    href="/hi/retirement-calculator/"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    रिटायरमेंट
                  </Link>{' '}
                  की योजना बना रहे हों, सटीक गणना आपको लाखों रुपये बचाने में मदद
                  कर सकती है।{' '}
                  <Link
                    href="/hi/compound-interest-calculator/"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    कंपाउंडिंग (चक्रवृद्धि ब्याज)
                  </Link>{' '}
                  की ताकत को समझें और अपने पैसे को बढ़ता हुआ देखें।
                </p>
              </div>

              {/* Compounding Chart */}
              <Card className="border-slate-200 bg-linear-to-br from-emerald-50 to-teal-50 not-prose">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                        कंपाउंडिंग की शक्ति
                      </h3>
                      <p className="text-xs text-slate-600">
                        देखें कि निवेश समय के साथ कैसे बढ़ता है
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-inner min-h-62.5">
                    <div className="flex items-end justify-between gap-2 h-48">
                      {[
                        { h: 15, label: '1 वर्ष', value: '₹1.5L' },
                        { h: 22, label: '3 वर्ष', value: '₹3.2L' },
                        { h: 32, label: '5 वर्ष', value: '₹5.8L' },
                        { h: 45, label: '10 वर्ष', value: '₹12.5L' },
                        { h: 60, label: '15 वर्ष', value: '₹24.2L' },
                        { h: 78, label: '20 वर्ष', value: '₹45.8L' },
                        { h: 92, label: '25 वर्ष', value: '₹78.5L' },
                        { h: 100, label: '30 वर्ष', value: '₹1.2Cr' }
                      ].map((bar, i) => (
                        <div
                          key={i}
                          className="flex-1 flex flex-col items-center gap-2 group"
                        >
                          <div className="relative w-full flex flex-col items-center">
                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              <div className="bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                {bar.value}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                              </div>
                            </div>

                            <div
                              className="w-full bg-linear-to-t from-emerald-600 via-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:from-emerald-700 hover:via-emerald-600 hover:to-emerald-500"
                              style={{ height: `${bar.h * 1.92}px` }}
                            />
                          </div>

                          <span className="text-xs text-slate-600 font-semibold">
                            {bar.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                      <span className="text-xs text-slate-500">
                        निवेश वृद्धि
                      </span>
                      <span className="text-xs text-slate-400">होवर करें</span>
                    </div>
                  </div>

                  <p className="text-center text-xs text-slate-600 mt-4 leading-relaxed">
                    उदाहरण: ₹10,000 मासिक SIP @ 12% वार्षिक रिटर्न।
                    <span className="font-semibold text-emerald-700">
                      {' '}
                      कंपाउंड इंटरेस्ट आपका पैसा बढ़ाता है!
                    </span>
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 not-prose">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Fincado कैलकुलेटर की विशेषताएं
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'बजट 2026 के अनुसार अपडेटेड',
                    '100% सटीक और मुफ़्त',
                    'बिना लॉग-इन के उपयोग करें',
                    'मोबाइल पर भी तेज़ और आसान'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-xs text-slate-700 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internal Linking */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  सभी कैलकुलेटर श्रेणियां
                </h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>
                    <strong>लोन कैलकुलेटर:</strong>{' '}
                    <Link
                      href="/hi/loans/home-loan/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      होम लोन
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/loans/car-loan/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      कार लोन
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/loans/personal-loan/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      पर्सनल लोन
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/emi-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      EMI
                    </Link>
                  </li>
                  <li>
                    <strong>निवेश कैलकुलेटर:</strong>{' '}
                    <Link
                      href="/hi/sip-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      SIP
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/ppf-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      PPF
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/sukanya-samriddhi/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      सुकन्या समृद्धि
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/fd-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      FD
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/elss-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      ELSS
                    </Link>
                  </li>
                  <li>
                    <strong>रिटायरमेंट कैलकुलेटर:</strong>{' '}
                    <Link
                      href="/hi/retirement-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      रिटायरमेंट प्लानर
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/nps-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      NPS
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/epf-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      EPF
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/gratuity-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      ग्रेच्युटी
                    </Link>
                  </li>
                  <li>
                    <strong>टैक्स कैलकुलेटर:</strong>{' '}
                    <Link
                      href="/hi/income-tax-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      इनकम टैक्स
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/hra-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      HRA
                    </Link>
                    ,{' '}
                    <Link
                      href="/hi/gst-calculator/"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      GST
                    </Link>
                  </li>
                </ul>
              </div>
            </article>
          </div>

          {/* --- RIGHT COLUMN: SIDEBAR --- */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              <HindiSidebar />
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center no-print">
                <AdSlot type="box" id="hindi-calc-sidebar" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
