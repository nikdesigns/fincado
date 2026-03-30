import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import InlineSipCalculator from '@/components/InlineSipCalculator';
import FAQSchema from '@/components/FAQSchema';

// --- UI COMPONENTS ---
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  TrendingUp,
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertTriangle,
  LineChart,
  PieChart,
  ArrowRight,
} from 'lucide-react';

// --- SEO METADATA (HINDI) ---
export const metadata: Metadata = {
  title: '10 साल में 1 करोड़ के लिए कितनी SIP करें? (2025 गणना)',
  description:
    'क्या आप 10 साल में 1 करोड़ रुपये जमा करना चाहते हैं? जानिए इसके लिए आपको हर महीने कितनी SIP करनी होगी और कौन से म्यूचुअल फंड्स सही रहेंगे।',
  keywords: [
    'SIP for 1 crore in 10 years hindi me',
    '1 crore ke liye SIP',
    '1 crore SIP kaise banaye',
    '1 crore mutual fund SIP',
    '1 crore banane ke liye SIP',
  ],
  twitter: {
    card: 'summary_large_image',
    title: '10 साल में 1 करोड़ के लिए कितनी SIP करें?',
    description: 'जानिए एक दशक में करोड़पति बनने का सटीक गणित।',
    images: ['/images/guides/mf/mutual-fund-guide-hero.webp'],
  },
  alternates: {
    canonical: 'https://fincado.com/hi/guides/10-saal-mein-1-crore-sip/',
  },
  openGraph: {
    title: '10 साल में 1 करोड़ के लिए कितनी SIP करें? (2025 गाइड)',
    description:
      'विस्तृत जानकारी: मासिक SIP राशि, स्टेप-अप रणनीति और सही एसेट एलोकेशन।',
    url: 'https://fincado.com/hi/guides/10-saal-mein-1-crore-sip/',
    type: 'article',
    images: [
      {
        url: '/images/guides/mf/mutual-fund-guide-hero.webp',
        width: 1200,
        height: 600,
        alt: '1 Crore Wealth Roadmap Hindi',
      },
    ],
  },
};

export default function Sip1Cr10YearsPageHindi() {
  const pageTitle = '10 साल में 1 करोड़ के लिए कितनी SIP करें?';

  // --- FAQ DATA (HINDI) ---
  const faqData = [
    {
      question: 'क्या 10 साल में ₹1 करोड़ जमा करना संभव है?',
      answer:
        'हाँ, यह गणितीय रूप से संभव है लेकिन इसके लिए आपको अनुशासित निवेश की आवश्यकता होगी। यदि आपको 12% का रिटर्न मिलता है, तो आपको लगभग ₹43,000 प्रति माह निवेश करना होगा।',
    },
    {
      question: '10 साल के लिए कितना रिटर्न (Return Rate) सही माना जाएगा?',
      answer:
        'इक्विटी म्यूचुअल फंड्स (जैसे Nifty 50 या Flexi Cap) के लिए 10 साल की अवधि में 12% CAGR का अनुमान सुरक्षित माना जाता है। हालांकि बाजार 15-18% भी दे सकता है, लेकिन योजना 12% पर बनाना सुरक्षित है।',
    },
    {
      question: 'क्या SIP एकमुश्त निवेश (Lump Sum) से बेहतर है?',
      answer:
        'वेतनभोगी (Salaried) लोगों के लिए SIP बेहतर है क्योंकि यह निवेश में अनुशासन लाता है। साथ ही, "Rupee Cost Averaging" के कारण बाजार के उतार-चढ़ाव का जोखिम कम हो जाता है।',
    },
    {
      question: 'अगर 5वें या 8वें साल में शेयर बाजार गिर गया तो?',
      answer:
        'शुरुआती सालों (1-8 वर्ष) में बाजार का गिरना आपके लिए अच्छा है क्योंकि आपकी SIP कम कीमत पर ज्यादा यूनिट्स खरीदती है। अगर 9वें या 10वें साल में गिरावट आती है, तो अपने पैसे को सुरक्षित Debt Fund में शिफ्ट (STP) कर लें।',
    },
    {
      question: 'क्या ₹43,000 से कम की SIP में 1 करोड़ बन सकते हैं?',
      answer:
        'जी हाँ, "Step-Up SIP" के जरिए। यदि आप ₹25,000 प्रति माह से शुरू करते हैं और हर साल अपनी राशि में 15% की वृद्धि करते हैं, तो भी आप 10 साल में 1 करोड़ का लक्ष्य पा सकते हैं।',
    },
  ];

  return (
    <article className="max-w-4xl mx-auto">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Guides', url: 'https://fincado.com/hi/guides/' },
          {
            name: '10 साल में 1 करोड़ SIP गाइड',
            url: 'https://fincado.com/hi/guides/10-saal-mein-1-crore-sip/',
          },
        ]}
      />

      {/* --- FAQ SCHEMA --- */}
      <FAQSchema faqs={faqData} />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'hi-IN',
            '@id':
              'https://fincado.com/hi/guides/10-saal-mein-1-crore-sip#article/',
            headline: pageTitle,
            description:
              '10 साल में म्यूचुअल फंड्स के जरिए 1 करोड़ रुपये का कॉर्पस बनाने की विस्तृत रणनीति।',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/hi/guides/10-saal-mein-1-crore-sip/',
            },
            image: ['/images/guides/mf/mutual-fund-guide-hero.webp'],
            author: {
              '@type': 'Person',
              name: 'Fincado Research Team',
              worksFor: {
                '@type': 'Organization',
                name: 'Fincado',
              },
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: '/logo.png',
              },
            },
            datePublished: '2025-12-28',
            dateModified: '2025-12-28',
          }),
        }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-8">
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 mb-4 px-3 py-1 text-sm font-semibold">
          Wealth Strategy
        </Badge>
        <h1
          itemProp="headline"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6"
        >
          {pageTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" />
            अपडेटेड: <strong>28 Dec, 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />8 मिनट पढ़ें
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-4 h-4" />
            गणना @ 12% CAGR
          </span>
        </div>
      </header>

      {/* --- SHARE TOOLS --- */}
      <div className="mb-8">
        <ShareTools title={pageTitle} />
      </div>

      {/* --- HERO IMAGE --- */}
      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <Image
          src="/images/guides/mf/mutual-fund-guide-hero.webp"
          alt="1 Crore Wealth Goal Illustration"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
          <p className="text-sm text-slate-500 italic">
            1 करोड़ का लक्ष्य बड़ा है, लेकिन सही योजना के साथ इसे हासिल किया जा
            सकता है।
          </p>
        </div>
      </div>

      {/* --- INTRO --- */}
      <div className="prose prose-slate max-w-none mb-8">
        <WikiText
          content={`1 करोड़ रुपये का कॉर्पस बनाना हर भारतीय निवेशक का सपना होता है। इसे <strong>10 साल</strong> में हासिल करना एक आक्रामक (aggressive) लक्ष्य है जिसके लिए अनुशासन, सही फंड्स का चुनाव और एक बड़ी मासिक निवेश राशि की आवश्यकता होती है।`}
        />
      </div>

      <Alert className="bg-blue-50 border-blue-200 mb-8">
        <AlertDescription className="text-blue-900 text-sm">
          बहुत से लोग 1 crore ke liye SIP या 1 crore SIP kaise banaye जैसे सवाल
          सर्च करते हैं। इस गाइड में हम बिल्कुल आसान भाषा में वही गणित और रणनीति
          समझा रहे हैं।
        </AlertDescription>
      </Alert>

      <Alert className="bg-amber-50 border-amber-200 mb-8">
        <AlertDescription className="text-amber-900 text-sm">
          <strong>2025 अपडेट:</strong> सभी गणनाएँ वर्तमान बाजार रिटर्न और भारतीय
          निवेशकों के लिए लागू SIP नियमों पर आधारित हैं।
        </AlertDescription>
      </Alert>

      {/* --- THE DIRECT ANSWER (HINDI) --- */}
      <Card className="mb-10 border-emerald-200 shadow-md bg-linear-to-br from-white to-emerald-50/30 overflow-hidden">
        <div className="h-1.5 w-full bg-emerald-500"></div>
        <CardContent className="p-6 sm:p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            संक्षिप्त उत्तर (Short Answer)
          </h3>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            यदि आप इक्विटी म्यूचुअल फंड से सालाना 12% रिटर्न की उम्मीद करते हैं,
            तो <strong>10 साल में ₹1 करोड़</strong> तक पहुंचने के लिए आपको हर
            महीने लगभग{' '}
            <strong className="text-emerald-700 text-xl bg-emerald-100 px-2 py-0.5 rounded">
              ₹43,041
            </strong>{' '}
            की SIP शुरू करनी होगी।
          </p>

          <div className="my-6">
            <InlineSipCalculator />
          </div>

          <div className="bg-white/60 rounded-lg p-4 border border-emerald-100/50 mb-6">
            <h4 className="font-bold text-slate-800 text-sm mb-2">
              यह गणना कैसे की गई?
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              ऊपर दिखाई गई SIP राशि मानक &apos;फ्यूचर वैल्यू फॉर्मूला&apos; का
              उपयोग करके निकाली गई है। इसमें मासिक निवेश, 12% वार्षिक रिटर्न (जो
              हर महीने कंपाउंड होता है) और 120 महीने (10 साल) की अवधि मानी गई
              है। 12% का रिटर्न निफ्टी 50 (Nifty 50) के लॉन्ग-टर्म प्रदर्शन पर
              आधारित है।
            </p>
          </div>

          <Link href="/hi/sip-calculator/">
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
              अपना गोल चेक करें <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <p className="text-slate-700 mb-8 leading-relaxed">
        क्या ₹43,000 की रकम बहुत ज्यादा लग रही है? चिंता न करें। इस गाइड में हम
        आपको एक <strong>&quot;Step-Up Strategy&quot;</strong> (निवेश बढ़ाने की
        तकनीक) बताएंगे, जिससे आप छोटी रकम से शुरुआत करके भी इस लक्ष्य तक पहुँच
        सकते हैं।
      </p>

      {/* 💰 AD SLOT 1 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="guide-1cr-1" type="leaderboard" />
      </div>

      {/* --- THE MATH SECTION --- */}
      <h2
        id="the-math"
        className="text-2xl font-bold text-slate-900 mb-4 mt-12 flex items-center gap-2"
      >
        <LineChart className="w-6 h-6 text-indigo-600" />
        गणित: ₹43k कैसे बनते हैं ₹1 करोड़?
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        जब आप केवल 10 वर्षों के लिए निवेश करते हैं, तो आपको अपनी जेब से ज्यादा
        पैसा लगाना पड़ता है क्योंकि कंपाउंडिंग (ब्याज पर ब्याज) का असली जादू
        आमतौर पर 10वें साल के बाद शुरू होता है।
      </p>

      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <Image
          src="/images/guides/sip/power-of-compounding-graph.webp"
          alt="Power of Compounding Graph"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
        <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
          <p className="text-xs text-slate-500">
            ध्यान दें कि कैसे समय के साथ धन तेजी से बढ़ता है। 10 साल की अवधि में
            आपका योगदान (Contribution) बहुत मायने रखता है।
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-12">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">
                पैरामीटर (Parameter)
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-right">
                मूल्य (Value)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">लक्ष्य राशि</TableCell>
              <TableCell className="text-right">
                ₹1,00,00,000 (1 करोड़)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">समय अवधि</TableCell>
              <TableCell className="text-right">10 साल (120 महीने)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">अनुमानित रिटर्न</TableCell>
              <TableCell className="text-right text-emerald-600 font-bold">
                12% (Equity Benchmark)
              </TableCell>
            </TableRow>
            <TableRow className="bg-emerald-50/50">
              <TableCell className="font-bold text-slate-900">
                मासिक SIP
              </TableCell>
              <TableCell className="text-right font-bold text-slate-900 text-lg">
                ₹43,041
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                कुल निवेश (आपकी जेब से)
              </TableCell>
              <TableCell className="text-right">₹51.6 लाख</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                कुल लाभ (Wealth Gained)
              </TableCell>
              <TableCell className="text-right text-emerald-600">
                + ₹48.4 लाख
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* --- COMPARISON TABLE --- */}
      <h2
        id="time-comparison"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <Clock className="w-6 h-6 text-amber-500" />
        क्या ₹43k बहुत ज्यादा है? देरी की कीमत देखें
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        यदि ₹43,000 आपके बजट से बाहर है, तो देखें कि यदि आप अपनी समय सीमा में
        सिर्फ कुछ साल और जोड़ दें, तो यह राशि कितनी कम हो जाती है।
      </p>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-12 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">
                समय (Years)
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                मासिक SIP की जरूरत
              </TableHead>
              <TableHead className="font-bold text-slate-700 hidden sm:table-cell">
                कुल निवेश
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-right">
                कठिनाई स्तर
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-orange-50/50">
              <TableCell className="font-bold">10 साल</TableCell>
              <TableCell className="font-bold text-slate-900">
                ₹43,041
              </TableCell>
              <TableCell className="hidden sm:table-cell">₹51.6 लाख</TableCell>
              <TableCell className="text-right font-bold text-orange-600">
                कठिन (Hard)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>15 साल</TableCell>
              <TableCell>₹19,819</TableCell>
              <TableCell className="hidden sm:table-cell">₹35.6 लाख</TableCell>
              <TableCell className="text-right font-bold text-emerald-600">
                मध्यम (Moderate)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>20 साल</TableCell>
              <TableCell>₹10,009</TableCell>
              <TableCell className="hidden sm:table-cell">₹24.0 लाख</TableCell>
              <TableCell className="text-right font-bold text-emerald-600">
                आसान (Easy)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>25 साल</TableCell>
              <TableCell>₹5,270</TableCell>
              <TableCell className="hidden sm:table-cell">₹15.8 लाख</TableCell>
              <TableCell className="text-right font-bold text-emerald-600">
                बहुत आसान
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* 💰 AD SLOT 2 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="guide-1cr-2" type="leaderboard" />
      </div>

      {/* --- STEP-UP STRATEGY --- */}
      <h2
        id="step-up-strategy"
        className="text-2xl font-bold text-slate-900 mb-4 mt-12 flex items-center gap-2"
      >
        <TrendingUp className="w-6 h-6 text-emerald-600" />
        कम सैलरी है? &quot;Step-Up SIP&quot; का उपयोग करें
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        ज्यादातर लोग तुरंत ₹43,000 से शुरुआत नहीं कर सकते। इसका समाधान है{' '}
        <strong>Step-Up SIP</strong>। छोटी रकम से शुरुआत करें, और जैसे-जैसे आपकी
        सैलरी बढ़े, हर साल अपनी SIP राशि में 10-15% की बढ़ोतरी करें।
      </p>

      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <Image
          src="/images/guides/sip/step-up-strategy.webp"
          alt="Visualizing Step-Up SIP Strategy"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
        <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
          <p className="text-xs text-slate-500">
            स्टेप-अप रणनीति आपको कम से शुरुआत करने और बाद में तेजी से पकड़ने की
            अनुमति देती है।
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
        <h4 className="font-bold text-indigo-900 mb-4">
          10 साल में ₹1 करोड़ तक पहुँचने की रणनीति (छोटी शुरुआत के साथ):
        </h4>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
            <span className="text-indigo-800">
              <strong>शुरुआती SIP:</strong> ₹25,000 / महीना
            </span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
            <span className="text-indigo-800">
              <strong>हर साल बढ़ोतरी (Step-Up):</strong> 15% प्रति वर्ष
            </span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
            <span className="text-indigo-800">
              <strong>अनुमानित रिटर्न:</strong> 12%
            </span>
          </li>
        </ul>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-12 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">
                वर्ष (Year)
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                मासिक SIP
              </TableHead>
              <TableHead className="font-bold text-slate-700 text-right">
                साल के अंत में कॉर्पस
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Year 1</TableCell>
              <TableCell>₹25,000</TableCell>
              <TableCell className="text-right">₹3.2 लाख</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Year 3</TableCell>
              <TableCell>₹33,063</TableCell>
              <TableCell className="text-right">₹12.5 लाख</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Year 5</TableCell>
              <TableCell>₹43,725</TableCell>
              <TableCell className="text-right">₹28.4 लाख</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Year 8</TableCell>
              <TableCell>₹66,480</TableCell>
              <TableCell className="text-right">₹65.8 लाख</TableCell>
            </TableRow>
            <TableRow className="bg-emerald-50">
              <TableCell className="font-bold text-emerald-900">
                Year 10
              </TableCell>
              <TableCell className="font-bold text-emerald-900">
                ₹87,900
              </TableCell>
              <TableCell className="text-right font-bold text-emerald-700 text-lg">
                ₹1.03 करोड़ ✅
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* --- ASSET ALLOCATION --- */}
      <h2
        id="where-to-invest"
        className="text-2xl font-bold text-slate-900 mb-4 mt-12 flex items-center gap-2"
      >
        <PieChart className="w-6 h-6 text-purple-600" />
        इस लक्ष्य के लिए कहाँ निवेश करें?
      </h2>
      <p className="text-slate-700 mb-4 leading-relaxed">
        10 साल के नजरिए के लिए, महंगाई (Inflation) आपकी दुश्मन है। फिक्स्ड
        डिपॉजिट (FD) जो 6-7% रिटर्न देते हैं, वे 1 करोड़ के लक्ष्य के लिए
        पर्याप्त नहीं हैं। आपको इक्विटी (Equity) में निवेश करना ही होगा।
      </p>
      <p className="text-slate-700 mb-8 leading-relaxed">
        यदि आप निवेश के साथ टैक्स भी बचाना चाहते हैं, तो{' '}
        <Link
          href="/hi/guides/elss-mutual-funds/"
          className="text-blue-600 hover:underline font-medium"
        >
          ELSS Mutual Funds
        </Link>{' '}
        पर विचार करें जो Section 80C के तहत टैक्स छूट भी देते हैं।
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="border-red-100 shadow-sm bg-red-50/30">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-red-900">
              आक्रामक पोर्टफोलियो (Aggressive)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant="outline"
              className="bg-red-100 text-red-800 border-red-200 mb-4"
            >
              लक्ष्य: 14-15% रिटर्न
            </Badge>
            <ul className="space-y-2 text-sm text-slate-700 mb-4">
              <li>• 40% Mid Cap Funds</li>
              <li>• 30% Small Cap Funds</li>
              <li>• 30% Flexi Cap Funds</li>
            </ul>
            <p className="text-xs text-slate-500 italic">
              जोखिम: उच्च उतार-चढ़ाव, लेकिन 1 करोड़ जल्दी हासिल करने की संभावना।
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 shadow-md ring-1 ring-emerald-500 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-emerald-900 flex items-center gap-2">
              संतुलित पोर्टफोलियो{' '}
              <Badge className="bg-emerald-600 ml-2">Recommended</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant="outline"
              className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4"
            >
              लक्ष्य: 12% रिटर्न
            </Badge>
            <ul className="space-y-2 text-sm text-slate-700 mb-4">
              <li>• 50% Nifty 50 Index Fund</li>
              <li>• 30% Flexi Cap Fund</li>
              <li>• 20% Mid Cap Fund</li>
            </ul>
            <p className="text-xs text-slate-500 italic">
              जोखिम: मध्यम। बाजार के साथ स्थिर विकास।
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 💰 AD SLOT 3 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="guide-1cr-3" type="leaderboard" />
      </div>

      {/* --- MISTAKES --- */}
      <h2
        id="common-mistakes"
        className="text-2xl font-bold text-slate-900 mb-4 mt-12 flex items-center gap-2"
      >
        <AlertTriangle className="w-6 h-6 text-red-500" />3 गलतियाँ जो 1 करोड़
        का सपना तोड़ सकती हैं
      </h2>

      <div className="space-y-6 mb-12 mt-6">
        {[
          {
            title: '1. बाजार गिरने पर SIP रोकना',
            desc: '10 साल में बाजार कम से कम दो बार गिरेगा (करेक्शन)। उस समय डरकर SIP रोकना आपकी सबसे बड़ी गलती होगी। गिरावट में ही आप ज्यादा यूनिट्स जमा करते हैं।',
            fix: 'गिरावट के दौरान SIP जारी रखें (या हो सके तो बढ़ा दें)।',
          },
          {
            title: '2. महंगाई को नजरअंदाज करना',
            desc: '10 साल बाद 1 करोड़ रुपये की कीमत आज जैसी नहीं होगी। 6% महंगाई दर पर, उस समय 1 करोड़ की वैल्यू आज के ₹55 लाख के बराबर होगी।',
            fix: 'हो सके तो लक्ष्य ₹1.5 करोड़ का रखें।',
          },
          {
            title: '3. बहुत सारे फंड्स खरीदना',
            desc: "10 अलग-अलग फंड्स खरीदने से आपका पोर्टफोलियो 'Over-diversified' हो जाता है, जिससे रिटर्न कम हो सकते हैं। आपको केवल 3 अच्छे फंड्स की जरूरत है।",
            fix: '1 Index + 1 Flexi + 1 Midcap फंड ही काफी है।',
          },
        ].map((mistake, i) => (
          <Card key={i} className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-red-800">
                {mistake.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                {mistake.desc}
              </p>
              <Alert className="bg-green-50 border-green-200 py-2">
                <AlertTitle className="text-xs font-bold text-green-800 uppercase tracking-wider mb-1">
                  सुधार (Solution)
                </AlertTitle>
                <AlertDescription className="text-sm text-green-900">
                  {mistake.fix}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- FREQUENTLY ASKED QUESTIONS --- */}
      <h2 id="faqs" className="text-2xl font-bold text-slate-900 mb-6">
        अक्सर पूछे जाने वाले प्रश्न (FAQs)
      </h2>
      <div className="mb-12">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-slate-200"
            >
              <AccordionTrigger className="text-slate-800 font-semibold hover:text-emerald-700 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* --- CONCLUSION --- */}
      <Card className="bg-slate-900 text-slate-100 border-none mb-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            निष्कर्ष: आज ही शुरुआत करें
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            10 साल में 1 करोड़ रुपये जमा करना चुनौतीपूर्ण है, लेकिन गणितीय रूप
            से पूरी तरह संभव है। इसके लिए या तो ₹43,000 की सीधी SIP या ₹25,000
            की Step-Up SIP की आवश्यकता है। सबसे महत्वपूर्ण कारक रकम नहीं, बल्कि{' '}
            <strong className="text-emerald-400">शुरुआत करने की तारीख</strong>{' '}
            है।
          </p>

          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">
              आपका एक्शन प्लान:
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-slate-300 text-sm">
                  <strong>खर्चों का ऑडिट करें</strong> और निवेश के लिए अधिकतम
                  पैसा निकालें।
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-slate-300 text-sm">
                  <strong>तुरंत SIP शुरू करें</strong>, भले ही वह छोटी रकम से
                  हो।
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-slate-300 text-sm">
                  <strong>ऑटोमेट करें:</strong> बैंक से ऑटो-डेबिट सेट करें ताकि
                  अनुशासन बना रहे।
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-slate-300 text-sm">
                  <strong>अल्पकालिक गिरावट को अनदेखा करें</strong>; अपना ध्यान
                  2035 के लक्ष्य पर रखें।
                </span>
              </li>
            </ul>
          </div>

          <p className="text-xs text-slate-500 italic">
            <strong>डिस्क्लेमर:</strong> यह जानकारी केवल शैक्षिक उद्देश्य के लिए
            है। म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं। निवेश से पहले अपने
            वित्तीय सलाहकार से परामर्श करें।
          </p>
        </CardContent>
      </Card>

      {/* --- AUTHOR BIO --- */}
      <div className="mb-12">
        <AuthorBio />
      </div>

      {/* --- FINAL CTA --- */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          अपना 1 करोड़ का रास्ता खुद तय करें
        </h2>
        <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
          देखना चाहते हैं कि आपकी मौजूदा उम्र और सैलरी के हिसाब से आपको कितना
          निवेश करना चाहिए? हमारे फ्री कैलकुलेटर का उपयोग करें।
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/hi/sip-calculator/">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 font-bold border-0"
            >
              SIP कैलकुलेटर खोलें
            </Button>
          </Link>
          <Link href="/hi/mutual-funds/">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white text-emerald-700 hover:bg-emerald-700/50 hover:text-white font-bold"
            >
              टॉप फंड्स देखें
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
