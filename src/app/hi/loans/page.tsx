import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import FAQSchema from '@/components/FAQSchema';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import HindiSidebar from '@/components/HindiSidebar';
import TaxUpdateBanner from '@/components/TaxUpdateBanner';
import AuthorBio from '@/components/AuthorBio';
import ShareTools from '@/components/ShareTools';
import { getCurrentFiscalYear } from '@/lib/fiscalYear';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowRight,
  Banknote,
  Car,
  Clock,
  GraduationCap,
  HelpCircle,
  Home,
  LockKeyhole,
  Percent,
  ShieldCheck,
  TrendingUp,
  Unlock,
  type LucideIcon,
} from 'lucide-react';

const PAGE_URL = 'https://fincado.com/hi/loans/';
const FY = getCurrentFiscalYear();

const HINDI_LOAN_LINKS: {
  href: string;
  title: string;
  desc: string;
  insight: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}[] = [
  {
    href: '/hi/loans/home-loan/',
    title: 'होम लोन',
    desc: 'EMI, ब्याज, अवधि और कुल भुगतान की तुलना करें।',
    insight: 'लंबी अवधि में 0.50% दर अंतर भी कुल पुनर्भुगतान पर बड़ा असर डाल सकता है।',
    icon: Home,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    href: '/hi/loans/personal-loan/',
    title: 'पर्सनल लोन',
    desc: 'फ्लेक्सिबल अवधि के साथ EMI और कुल लागत देखें।',
    insight: 'केवल EMI नहीं, APR और प्रोसेसिंग फीस जोड़कर वास्तविक लागत देखें।',
    icon: Banknote,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
  },
  {
    href: '/hi/loans/car-loan/',
    title: 'कार लोन',
    desc: 'डाउन पेमेंट और अवधि के आधार पर सही योजना बनाएं।',
    insight: 'डाउन पेमेंट बढ़ाने से EMI और ब्याज दोनों में स्पष्ट राहत मिलती है।',
    icon: Car,
    color: 'text-amber-600',
    bg: 'bg-amber-100',
  },
  {
    href: '/hi/loans/education-loan/',
    title: 'एजुकेशन लोन',
    desc: 'मोराटोरियम और बाद की EMI का प्रभाव समझें।',
    insight: 'Section 80E के तहत ब्याज कटौती आपकी प्रभावी लागत कम कर सकती है।',
    icon: GraduationCap,
    color: 'text-violet-600',
    bg: 'bg-violet-100',
  },
  {
    href: '/hi/emi-calculator/',
    title: 'जनरल EMI कैलकुलेटर',
    desc: 'किसी भी लोन पर EMI का बेसिक अनुमान तुरंत निकालें।',
    insight: 'एक ही राशि पर अलग दर/अवधि के साथ तुरंत विकल्प तुलना करें।',
    icon: TrendingUp,
    color: 'text-slate-600',
    bg: 'bg-slate-100',
  },
];

export const metadata: Metadata = {
  title:
    'हिंदी लोन हब | होम, पर्सनल, कार और एजुकेशन EMI कैलकुलेटर | Fincado',
  description:
    'हिंदी में होम, पर्सनल, कार और एजुकेशन लोन के EMI कैलकुलेटर, पात्रता संकेत और निर्णय गाइड देखें।',
  keywords: [
    'Hindi loan calculator',
    'Home loan EMI Hindi',
    'Personal loan EMI Hindi',
    'Car loan calculator Hindi',
    'Education loan calculator Hindi',
    'Loan comparison India Hindi',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      hi: PAGE_URL,
      en: 'https://fincado.com/loans/',
    },
  },
  openGraph: {
    title: 'हिंदी लोन हब | EMI और लोन निर्णय टूल्स',
    description:
      'लोन निर्णय के लिए हिंदी में होम, कार, पर्सनल और एजुकेशन EMI टूल्स और गाइड्स।',
    url: PAGE_URL,
    type: 'website',
    locale: 'hi_IN',
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
};

export default function HindiLoansHubPage() {
  const faqItems = [
    {
      question: 'हिंदी लोन हब में कौन-कौन से कैलकुलेटर उपलब्ध हैं?',
      answer:
        'यहां होम लोन, पर्सनल लोन, कार लोन, एजुकेशन लोन और जनरल EMI कैलकुलेटर उपलब्ध हैं।',
    },
    {
      question: 'लोन चुनते समय सबसे पहले क्या देखना चाहिए?',
      answer:
        'केवल ब्याज दर नहीं, बल्कि कुल भुगतान, प्रोसेसिंग फीस, अवधि और प्रीपेमेंट शर्तें साथ में देखें।',
    },
    {
      question: 'क्या यह पेज भारतीय उपयोगकर्ताओं के लिए अपडेटेड है?',
      answer:
        `हाँ, कंटेंट ${FY.fullFormat} संदर्भ के साथ भारतीय लोन निर्णय उपयोग मामलों के अनुसार संरचित है।`,
    },
    {
      question: 'क्या मैं यहां से सीधे EMI तुलना कर सकता हूं?',
      answer:
        'हाँ, हर लोन सेक्शन में राशि, दर और अवधि बदलकर EMI और कुल ब्याज का प्रभाव तुरंत देखा जा सकता है।',
    },
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': PAGE_URL,
    name: 'हिंदी लोन हब',
    description:
      'होम, पर्सनल, कार और एजुकेशन लोन के लिए हिंदी EMI कैलकुलेटर और निर्णय गाइड।',
    inLanguage: 'hi-IN',
    url: PAGE_URL,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
      name: 'Fincado',
      url: 'https://fincado.com/',
    },
  };

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'लोन', url: PAGE_URL },
        ]}
      />

      <FAQSchema faqs={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8 min-w-0 mt-12">
          <div className="mb-8 no-print flex justify-center rounded-lg border border-slate-100 bg-slate-50 p-2">
            <AdSlot id="hi-loans-top-leaderboard" type="leaderboard" />
          </div>

          <section className="mb-12 rounded-3xl border border-slate-200 bg-linear-to-b from-emerald-50/50 to-white p-8 text-center shadow-sm sm:p-12">
            <Badge className="mb-4 bg-brand-50 px-3 py-1 font-semibold text-brand-700 hover:bg-brand-200">
              हिंदी लोन कमांड सेंटर · {FY.fullFormat}
            </Badge>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              सही लोन चुनें, गणना साफ़ रखें,
              <br />
              <span className="text-brand-700">निर्णय बेहतर बनाएं</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              EMI, कुल ब्याज, अवधि और पात्रता संकेतों के आधार पर होम, पर्सनल,
              कार और एजुकेशन लोन का स्पष्ट तुलनात्मक निर्णय लें।
            </p>
            <div className="mt-6 flex justify-center">
              <ShareTools title="हिंदी लोन हब | Fincado" />
            </div>
          </section>

          <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {HINDI_LOAN_LINKS.map((loan) => (
              <Link key={loan.href} href={loan.href} className="group h-full">
                <Card className="flex h-full cursor-pointer flex-col transition-all duration-200 hover:border-brand-400 hover:shadow-lg">
                  <CardHeader className="flex-row items-start gap-4 space-y-0 pb-2">
                    <div
                      className={`h-12 w-12 shrink-0 rounded-xl ${loan.bg} flex items-center justify-center transition-transform group-hover:scale-105`}
                    >
                      <loan.icon className={`h-6 w-6 ${loan.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-slate-900 transition-colors group-hover:text-brand-700">
                        {loan.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="grow space-y-2 pt-2">
                    <CardDescription className="text-sm leading-relaxed text-slate-600">
                      {loan.desc}
                    </CardDescription>
                    <p className="text-xs leading-relaxed text-slate-500">
                      {loan.insight}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-4 border-t border-slate-50 pt-0">
                    <div className="flex items-center pt-4 text-sm font-semibold text-brand-700 transition-transform group-hover:translate-x-1">
                      कैलकुलेटर खोलें <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </section>

          <div className="my-12 no-print flex justify-center">
            <AdSlot id="hi-loans-mid-leaderboard" type="leaderboard" />
          </div>

          <section className="space-y-8">
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-slate-900">
                <ShieldCheck className="h-6 w-6 text-brand-700" />
                भारत में लोन को समझें
              </h2>
              <p className="leading-relaxed text-slate-600">
                लोन वह राशि है जो बैंक या NBFC से एक तय अवधि के लिए ली जाती है और
                उस पर ब्याज सहित पुनर्भुगतान करना होता है। सही निर्णय के लिए EMI
                के साथ कुल लागत देखना जरूरी है।
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-slate-200 bg-slate-50 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
                    <LockKeyhole className="h-4 w-4 text-indigo-500" />
                    1. सिक्योर्ड लोन
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-slate-600">
                    संपत्ति/एसेट के बदले मिलने वाले लोन। जोखिम कम होने की वजह से
                    दरें आमतौर पर कम रहती हैं।
                  </CardDescription>
                  <p className="mt-3 text-xs italic text-slate-500">
                    उदाहरण: होम लोन, कार लोन
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-slate-50 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
                    <Unlock className="h-4 w-4 text-amber-500" />
                    2. अनसिक्योर्ड लोन
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-slate-600">
                    बिना संपार्श्विक के, मुख्य रूप से क्रेडिट प्रोफाइल पर आधारित।
                    सुविधा तेज़ होती है, पर दरें अपेक्षाकृत अधिक हो सकती हैं।
                  </CardDescription>
                  <p className="mt-3 text-xs italic text-slate-500">
                    उदाहरण: पर्सनल लोन
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">
                EMI को प्रभावित करने वाले मुख्य कारक
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Banknote,
                    title: 'मूलधन (Principal)',
                    desc: 'उधार राशि जितनी अधिक होगी, EMI उतनी अधिक होगी।',
                  },
                  {
                    icon: Percent,
                    title: 'ब्याज दर',
                    desc: '0.5% अंतर भी लंबी अवधि में लाखों का फर्क दे सकता है।',
                  },
                  {
                    icon: Clock,
                    title: 'अवधि (Tenure)',
                    desc: 'अवधि बढ़ाने से EMI घटती है, पर कुल ब्याज बढ़ जाता है।',
                  },
                ].map((factor) => (
                  <Card key={factor.title} className="border-slate-200">
                    <CardContent className="flex flex-col items-center p-4 text-center">
                      <div className="mb-3 rounded-full bg-slate-100 p-2">
                        <factor.icon className="h-5 w-5 text-slate-700" />
                      </div>
                      <h4 className="mb-1 text-sm font-semibold text-slate-900">
                        {factor.title}
                      </h4>
                      <p className="text-xs leading-snug text-slate-500">
                        {factor.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-6">
              <h3 className="mb-2 font-semibold text-indigo-900">
                आवेदन से पहले त्वरित चेकलिस्ट
              </h3>
              <p className="text-sm leading-relaxed text-indigo-800/80">
                आवेदन भेजने से पहले{' '}
                <Link
                  href="/hi/credit-score/"
                  className="font-semibold underline decoration-indigo-400 underline-offset-2 hover:text-indigo-700"
                >
                  क्रेडिट स्कोर
                </Link>{' '}
                और{' '}
                <Link
                  href="/hi/emi-calculator/"
                  className="font-semibold underline decoration-indigo-400 underline-offset-2 hover:text-indigo-700"
                >
                  EMI क्षमता
                </Link>{' '}
                जरूर जांचें। आदर्श रूप से EMI आपकी नेट इनकम के सुरक्षित दायरे में
                होनी चाहिए।
              </p>
            </div>

            <div className="border-t border-slate-100 pt-8">
              <h3 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
                <HelpCircle className="h-6 w-6 text-amber-500" />
                अक्सर पूछे जाने वाले सवाल
              </h3>

              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((faq, idx) => (
                  <AccordionItem
                    key={faq.question}
                    value={`faq-${idx + 1}`}
                    className="mb-3 rounded-lg border bg-white px-1"
                  >
                    <AccordionTrigger className="px-4 font-semibold text-slate-800 hover:text-emerald-600 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-slate-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <TaxUpdateBanner />
            <AuthorBio />
          </section>

          <div className="mt-12 no-print flex justify-center">
            <AdSlot id="hi-loans-bottom-leaderboard" type="leaderboard" />
          </div>
        </div>

        <aside className="lg:col-span-4 mt-12 space-y-8">
          <Card className="border-none bg-transparent shadow-none">
            <CardContent className="pt-0">
              <HindiSidebar adId="hi-loans-sidebar-inline" />
            </CardContent>
          </Card>

          <div className="flex min-h-62.5 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <AdSlot id="hi-loans-sidebar-sticky" type="box" />
          </div>
        </aside>
      </div>
    </main>
  );
}
