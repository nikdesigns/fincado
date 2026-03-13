import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import InflationClient from '@/app/inflation-calculator/InflationClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { InflationSchemas } from '@/components/schemas/InflationSchemas';
import {
  BadgeCheck,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  Shield,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'महंगाई कैलकुलेटर भारत 2026 – भविष्य का मूल्य और क्रय शक्ति',
  description:
    'भविष्य के खर्चों पर महंगाई के प्रभाव की गणना करें। शिक्षा, चिकित्सा, रिटायरमेंट के लिए क्रय शक्ति में कमी की जांच करें। 72 के नियम को सीखें और स्मार्ट निवेश से महंगाई को हराएं।',
  keywords: [
    'महंगाई कैलकुलेटर भारत',
    'क्रय शक्ति कैलकुलेटर',
    'पैसे का भविष्य मूल्य',
    'जीवन यापन लागत कैलकुलेटर',
    'वास्तविक रिटर्न दर',
    '72 का नियम कैलकुलेटर',
    'भारत CPI महंगाई',
    'चिकित्सा महंगाई कैलकुलेटर',
    'शिक्षा लागत कैलकुलेटर'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/inflation-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/inflation-calculator/',
    },
  },
  openGraph: {
    title: 'महंगाई कैलकुलेटर 2026 – बढ़ती लागत की योजना बनाएं',
    description:
      'भविष्य के खर्चों का अनुमान लगाने और क्रय शक्ति में कमी को समझने के लिए मुफ्त महंगाई कैलकुलेटर। वास्तविक रिटर्न की गणना करें और महंगाई को हराएं।',
    url: 'https://fincado.com/hi/inflation-calculator/',
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

/* ---------------- FAQ DATA ---------------- */
const faqItems = [
  {
    id: 'faq-1',
    question: 'महंगाई क्या है और यह क्यों मायने रखती है?',
    answer:
      'महंगाई वह दर है जिस पर समय के साथ वस्तुओं और सेवाओं की कीमतें बढ़ती हैं, जिससे पैसे की क्रय शक्ति कम होती है। यदि महंगाई 6% है, तो आज के ₹100 अगले साल केवल ₹94 मूल्य की वस्तुएं खरीदेंगे। यह मायने रखता है क्योंकि आपकी बचत को संपत्ति बनाए रखने के लिए महंगाई से तेजी से बढ़ना चाहिए। बचत खाते में पैसा रखना (3-4% रिटर्न) का मतलब है क्रय शक्ति की गारंटीशुदा हानि।',
  },
  {
    id: 'faq-2',
    question: '2026 में भारत की वर्तमान महंगाई दर क्या है?',
    answer:
      '2026 की शुरुआत में भारत की CPI (उपभोक्ता मूल्य सूचकांक) महंगाई लगभग 5-6% वार्षिक है। RBI 4% (+/- 2% सहनशीलता बैंड) को लक्षित करता है। हालांकि, क्षेत्रीय महंगाई काफी भिन्न होती है: सामान्य CPI 5-6%, खाद्य 7-8%, ईंधन 8-10%, शिक्षा 10-12%, स्वास्थ्य सेवा 12-14%। सटीक योजना के लिए हमेशा श्रेणी-विशिष्ट दरों का उपयोग करें।',
  },
  {
    id: 'faq-3',
    question: 'मैं महंगाई के साथ भविष्य के मूल्य की गणना कैसे करूं?',
    answer:
      'चक्रवृद्धि सूत्र का उपयोग करें: FV = PV × (1 + r)^n जहां FV भविष्य का मूल्य है, PV वर्तमान मूल्य है, r महंगाई दर है (दशमलव के रूप में), n वर्ष है। उदाहरण: ₹50,000 वर्तमान व्यय, 6% महंगाई, 10 वर्ष → FV = 50,000 × (1.06)^10 = ₹89,542। इसका मतलब है कि आपको 10 वर्षों में ₹89,542 की आवश्यकता होगी जो आज ₹50,000 खरीदता है।',
  },
  {
    id: 'faq-4',
    question: 'महंगाई के लिए 72 का नियम क्या है?',
    answer:
      '72 का नियम यह गणना करने का एक त्वरित तरीका है कि महंगाई के कारण कीमतें कब दोगुनी होंगी: दोगुना होने के वर्ष = 72 ÷ महंगाई दर। उदाहरण: 6% महंगाई पर, कीमतें 12 वर्षों में दोगुनी होती हैं (72÷6)। 10% शिक्षा महंगाई पर, फीस 7.2 वर्षों में दोगुनी होती है (72÷10)। 12% चिकित्सा महंगाई पर, लागत 6 वर्षों में दोगुनी होती है (72÷12)। त्वरित मानसिक अनुमानों के लिए इसका उपयोग करें।',
  },
  {
    id: 'faq-5',
    question: 'भारत में चिकित्सा महंगाई इतनी अधिक क्यों है?',
    answer:
      'भारत में चिकित्सा महंगाई वार्षिक रूप से 12-14% (सामान्य महंगाई से दोगुनी) पर चलती है क्योंकि: (1) बढ़ती दवा कीमतें, (2) उन्नत चिकित्सा प्रौद्योगिकी लागत, (3) बढ़ती डॉक्टर/विशेषज्ञ शुल्क, (4) प्रीमियम मूल्य निर्धारण के साथ निजी अस्पताल विस्तार, (5) चिकित्सा पर्यटन मांग बढ़ा रहा है। हमेशा उच्च महंगाई धारणा के साथ अलग स्वास्थ्य सेवा कोष की योजना बनाएं।',
  },
  {
    id: 'faq-6',
    question: 'शिक्षा लागत हर साल कितनी बढ़ती है?',
    answer:
      'भारत में शिक्षा महंगाई औसतन 10-12% वार्षिक है। इंजीनियरिंग/मेडिकल कॉलेज शुल्क पिछले 15 वर्षों में 300-400% बढ़ा है। उदाहरण: आज ₹10 लाख/वर्ष कॉलेज फीस 10% महंगाई पर 12 वर्षों में ₹31 लाख/वर्ष होगी। बच्चे की शिक्षा योजना के लिए, हमेशा न्यूनतम 10% मानें। अंतर्राष्ट्रीय शिक्षा महंगाई और भी अधिक 12-15% है।',
  },
  {
    id: 'faq-7',
    question: 'वास्तविक रिटर्न दर क्या है और यह क्यों मायने रखती है?',
    answer:
      'वास्तविक रिटर्न दर = नाममात्र रिटर्न - महंगाई दर। यह महंगाई के लिए लेखांकन के बाद वास्तविक संपत्ति वृद्धि दिखाता है। उदाहरण: 6% महंगाई के साथ 7% देने वाला FD = 1% वास्तविक रिटर्न (मुश्किल से महंगाई को हराना)। 6% महंगाई के साथ 12% देने वाला इक्विटी म्यूचुअल फंड = 6% वास्तविक रिटर्न (वास्तविक संपत्ति निर्माण)। निवेशों का मूल्यांकन करते समय हमेशा वास्तविक रिटर्न की गणना करें।',
  },
  {
    id: 'faq-8',
    question: 'भारत में कौन से निवेश महंगाई को हराते हैं?',
    answer:
      'ऐतिहासिक रूप से महंगाई को हराने वाली संपत्तियां: (1) इक्विटी/म्यूचुअल फंड (12-15% दीर्घकालिक, 6% महंगाई को 6-9% से हराता है), (2) रियल एस्टेट (8-10% पूंजी प्रशंसा + किराया), (3) सोना (8-10% दीर्घकालिक बचाव), (4) REITs (9-11% नियमित भुगतान के साथ)। बचें: बचत खाता (3-4% = हानि), नकद (0% = गंभीर हानि), PPF कर के बाद (5-6% = मुश्किल से ब्रेक-ईवन)।',
  },
  {
    id: 'faq-9',
    question: 'महंगाई रिटायरमेंट योजना को कैसे प्रभावित करती है?',
    answer:
      'महंगाई नाटकीय रूप से आवश्यक रिटायरमेंट कोष बढ़ाती है। उदाहरण: आज ₹50,000 मासिक व्यय (₹6L/वर्ष)। 25 वर्षों के लिए 6% महंगाई पर, आपको रिटायरमेंट पर ₹2.15 लाख/माह (₹25.8L/वर्ष) की आवश्यकता है। 30-वर्षीय रिटायरमेंट के लिए, आवश्यक कोष = ₹5.3 करोड़ (8% रिटायरमेंट के बाद रिटर्न मानते हुए)। महंगाई समायोजन के बिना, आप 10-12 वर्षों में पैसे से बाहर हो जाएंगे।',
  },
  {
    id: 'faq-10',
    question: 'क्या वेतन वृद्धि महंगाई के साथ बनाए रख सकती है?',
    answer:
      'वेतन वृद्धि आमतौर पर करियर के पहले 10-15 वर्षों के लिए महंगाई से पीछे रहती है। औसत वृद्धि: निजी क्षेत्र में 8-10%, सरकार में 3-5%। लेकिन "जीवनशैली महंगाई" (आय बढ़ने के साथ खर्च को अपग्रेड करना) अक्सर इसे खा जाती है। समाधान: हर वृद्धि के साथ बचत वृद्धि को स्वचालित करें (स्टेप-अप SIP), जीवनशैली समायोजित होने से पहले वृद्धि निवेश करें, पूरे करियर में 30% बचत दर बनाए रखें।',
  }
];

/* ---------------- PAGE ---------------- */
export default function InflationPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>महंगाई</strong> मौन धन हत्यारा है जो हर साल आपके पैसे की क्रय शक्ति को कम करती है। 
      यह वह दर है जिस पर वस्तुओं और सेवाओं की कीमतें बढ़ती हैं, जिससे यदि आपकी बचत महंगाई से 
      तेजी से नहीं बढ़ती है तो समय के साथ कम मूल्य की हो जाती है।
    </p>
    <p class="mt-4">
      भारत में, <strong>उपभोक्ता मूल्य सूचकांक (CPI)</strong> सामान्य महंगाई को मापता है 
      (वर्तमान में 5-6% वार्षिक)। हालांकि, क्षेत्रीय महंगाई व्यापक रूप से भिन्न होती है: शिक्षा 
      लागत 10-12% पर बढ़ती है, स्वास्थ्य सेवा 12-14% पर, जबकि सामान्य वस्तुएं 6% पर महंगी होती 
      हैं। वित्तीय योजना के लिए इसे समझना महत्वपूर्ण है।
    </p>
  `);

  const impactContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">वास्तविक जीवन उदाहरण:</h4>
    <p class="mt-2">
      यदि आपका मासिक घरेलू खर्च आज ₹50,000 है और सामान्य महंगाई 6% है, तो आपको चाहिए:
    </p>
    <ul class="list-disc pl-5 space-y-1 mt-2">
      <li><strong>₹67,196</strong> 5 वर्षों में (34% वृद्धि)</li>
      <li><strong>₹89,542</strong> 10 वर्षों में (79% वृद्धि)</li>
      <li><strong>₹1,60,356</strong> 20 वर्षों में (221% वृद्धि)</li>
      <li><strong>₹2,87,175</strong> 30 वर्षों में (474% वृद्धि)</li>
    </ul>
    <p class="mt-3 text-sm text-slate-600">
      इसका मतलब है कि यदि आपकी बचत/निवेश वार्षिक रूप से कम से कम 6% नहीं बढ़ते हैं, तो आप 
      हर साल क्रय शक्ति खो रहे हैं।
    </p>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'महंगाई कैलकुलेटर',
            url: 'https://fincado.com/hi/inflation-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="महंगाई कैलकुलेटर - भविष्य मूल्य और क्रय शक्ति"
        description="भविष्य के खर्चों पर महंगाई के प्रभाव की गणना करें। क्रय शक्ति में कमी का अनुमान लगाएं और महंगाई को हराने के लिए निवेश की योजना बनाएं।"
        url="https://fincado.com/hi/inflation-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <InflationSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="महंगाई कैलकुलेटर 2026" />
            <LanguageToggle path="/inflation-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-50 to-red-100 text-orange-700">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                महंगाई कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-orange-700">
                भविष्य मूल्य और क्रय शक्ति अनुमानक
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  गणना करें कि महंगाई समय के साथ आपकी क्रय शक्ति को कैसे कम करती है। शिक्षा, 
                  रिटायरमेंट, स्वास्थ्य सेवा, और दैनिक जीवन के भविष्य के खर्चों की वास्तविक 
                  लागत को समझें।
                </p>
              `}
            />
          </div>

          {/* Budget 2026 Status */}
          <div className="mt-6 flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-900">
                बजट 2026: महंगाई लक्ष्य बनाए रखे गए
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                केंद्रीय बजट 2026 ने RBI के 4% (+/- 2%) के महंगाई लक्ष्यीकरण
                ढांचे की पुष्टि की। कोई प्रमुख अप्रत्यक्ष कर परिवर्तन नहीं जो
                CPI को बढ़ाएगा। मूल्य वृद्धि को नियंत्रित करने के लिए खाद्य
                सब्सिडी बनाए रखी गई।
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-inflation-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-orange-700 mb-1">
                      वर्तमान भारत CPI
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सामान्य महंगाई दर
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      5-6%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        प्रति वर्ष
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      फरवरी 2026 तक
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      RBI महंगाई लक्ष्य
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सहनशीलता बैंड
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      4%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        ±2%
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      2% से 6% स्वीकार्य
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-linear-to-br from-red-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-red-700 mb-1">
                      चिकित्सा महंगाई
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      स्वास्थ्य सेवा लागत
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      12-14%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        प्रति वर्ष
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      सामान्य महंगाई से दोगुनी
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <InflationClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-inflation-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-amber-50/50 border-amber-200 text-slate-600">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  योजना युक्ति
                </strong>
                श्रेणी-विशिष्ट महंगाई दरों का उपयोग करें: सामान्य 6%, खाद्य
                7-8%, शिक्षा 10-12%, स्वास्थ्य सेवा 12-14%। सामान्य 6% धारणा
                विशिष्ट श्रेणियों के लिए भविष्य के खर्चों को गंभीर रूप से कम आंक
                सकती है।
              </AlertDescription>
            </Alert>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    महंगाई से अपनी संपत्ति की रक्षा करें
                  </strong>
                  <p className="text-sm text-slate-700">
                    जानें कि इक्विटी निवेश, सोना, और रियल एस्टेट ने ऐतिहासिक रूप
                    से भारत में महंगाई को कैसे हराया है
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Category-wise Inflation Table */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    भारत में श्रेणी-वार महंगाई दरें (2026)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>श्रेणी</TableHead>
                          <TableHead>महंगाई दर</TableHead>
                          <TableHead>दोगुना अवधि (72 का नियम)</TableHead>
                          <TableHead>मुख्य चालक</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            🛒 सामान्य CPI
                          </TableCell>
                          <TableCell>5-6%</TableCell>
                          <TableCell>12-14 वर्ष</TableCell>
                          <TableCell className="text-sm">
                            समग्र उपभोक्ता वस्तुएं और सेवाएं
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            🍎 खाद्य और किराना
                          </TableCell>
                          <TableCell>7-8%</TableCell>
                          <TableCell>9-10 वर्ष</TableCell>
                          <TableCell className="text-sm">
                            मानसून निर्भरता, आपूर्ति श्रृंखला मुद्दे
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            ⛽ ईंधन और परिवहन
                          </TableCell>
                          <TableCell>8-10%</TableCell>
                          <TableCell>7-9 वर्ष</TableCell>
                          <TableCell className="text-sm">
                            कच्चे तेल की कीमतें, रुपये की विनिमय दर
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            🎓 शिक्षा
                          </TableCell>
                          <TableCell className="text-orange-600 font-bold">
                            10-12%
                          </TableCell>
                          <TableCell>6-7 वर्ष</TableCell>
                          <TableCell className="text-sm">
                            निजी संस्थान विस्तार, संकाय लागत
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            🏥 स्वास्थ्य सेवा
                          </TableCell>
                          <TableCell className="text-red-600 font-bold">
                            12-14%
                          </TableCell>
                          <TableCell>5-6 वर्ष</TableCell>
                          <TableCell className="text-sm">
                            उन्नत उपचार, आयातित दवाएं, अस्पताल बुनियादी ढांचा
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            🏠 रियल एस्टेट
                          </TableCell>
                          <TableCell>8-10%</TableCell>
                          <TableCell>7-9 वर्ष</TableCell>
                          <TableCell className="text-sm">
                            भूमि कीमतें, निर्माण लागत, स्थान प्रीमियम
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            👔 कपड़े और परिधान
                          </TableCell>
                          <TableCell>5-7%</TableCell>
                          <TableCell>10-14 वर्ष</TableCell>
                          <TableCell className="text-sm">
                            कपास की कीमतें, फैशन रुझान, आयात
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                    <p className="text-sm text-slate-700">
                      <strong>योजना युक्ति:</strong> भविष्य के खर्चों की गणना
                      करते समय हमेशा श्रेणी-विशिष्ट महंगाई का उपयोग करें। बच्चे
                      के शिक्षा कोष के लिए, 10-12% (सामान्य 6% नहीं) उपयोग करें।
                      स्वास्थ्य सेवा कोष के लिए, 12-14% उपयोग करें। यह गंभीर कम
                      आकलन को रोकता है।
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* AD #3: MID-CONTENT */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot
                id="hi-inflation-mid-content"
                type="square"
                label="विज्ञापन"
              />
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  महंगाई क्या है और यह आपको कैसे प्रभावित करती है?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  महंगाई का वास्तविक जीवन प्रभाव
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={impactContent} />
                </div>
              </section>

              {/* Purchasing Power Comparison */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  क्रय शक्ति: तब बनाम अब
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>वस्तु</TableHead>
                        <TableHead>वर्ष 2000</TableHead>
                        <TableHead>वर्ष 2026</TableHead>
                        <TableHead>वृद्धि</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          पेट्रोल (प्रति लीटर)
                        </TableCell>
                        <TableCell>₹30</TableCell>
                        <TableCell>₹100</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          233% ↑
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          मूवी टिकट (मेट्रो)
                        </TableCell>
                        <TableCell>₹40</TableCell>
                        <TableCell>₹250</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          525% ↑
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          इंजीनियरिंग कॉलेज फीस (वार्षिक)
                        </TableCell>
                        <TableCell>₹50,000</TableCell>
                        <TableCell>₹3,00,000</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          500% ↑
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          घर (1000 वर्ग फुट, मेट्रो)
                        </TableCell>
                        <TableCell>₹15 लाख</TableCell>
                        <TableCell>₹80 लाख</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          433% ↑
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          अस्पताल कमरा (ICU प्रति दिन)
                        </TableCell>
                        <TableCell>₹1,500</TableCell>
                        <TableCell>₹15,000</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          900% ↑
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          मासिक किराना (4 की फैमिली)
                        </TableCell>
                        <TableCell>₹3,000</TableCell>
                        <TableCell>₹12,000</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          300% ↑
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-slate-700">
                    <strong>वास्तविकता जांच:</strong> 26 वर्षों (2000-2026) में,
                    श्रेणी के आधार पर कीमतें 3-9 गुना बढ़ीं। यह दिखाता है कि बचत
                    खाते (3-4% रिटर्न) संपत्ति क्षरण की गारंटी देते हैं। केवल
                    इक्विटी और रियल एस्टेट ने महंगाई के साथ या उसे हराया।
                  </p>
                </div>
              </section>

              {/* Real Returns Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  क्या आपके निवेश महंगाई को हरा रहे हैं? (वास्तविक रिटर्न)
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>निवेश</TableHead>
                        <TableHead>नाममात्र रिटर्न</TableHead>
                        <TableHead>महंगाई (6%)</TableHead>
                        <TableHead>वास्तविक रिटर्न</TableHead>
                        <TableHead>निर्णय</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">बचत खाता</TableCell>
                        <TableCell>3-4%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-red-600 font-bold">
                          -2 से -3%
                        </TableCell>
                        <TableCell className="text-red-600">
                          ❌ पैसा खो रहे हैं
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          फिक्स्ड डिपॉजिट
                        </TableCell>
                        <TableCell>7%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-orange-600 font-bold">
                          +1%
                        </TableCell>
                        <TableCell className="text-orange-600">
                          ⚠️ मुश्किल से ब्रेक-ईवन
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          PPF (कर के बाद)
                        </TableCell>
                        <TableCell>7.1%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-lime-600 font-bold">
                          +1.1%
                        </TableCell>
                        <TableCell className="text-lime-600">
                          ⚠️ न्यूनतम वास्तविक वृद्धि
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">सोना</TableCell>
                        <TableCell>8-10%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-emerald-600 font-bold">
                          +2 से +4%
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          ✓ महंगाई बचाव
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          इक्विटी म्यूचुअल फंड
                        </TableCell>
                        <TableCell>12-15%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-emerald-600 font-bold">
                          +6 से +9%
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          ✓✓ संपत्ति निर्माण
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          रियल एस्टेट (पूंजी प्रशंसा)
                        </TableCell>
                        <TableCell>8-10%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-emerald-600 font-bold">
                          +2 से +4%
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          ✓ महंगाई को हराता है
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          गद्दे के नीचे नकद
                        </TableCell>
                        <TableCell>0%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-red-600 font-bold">
                          -6%
                        </TableCell>
                        <TableCell className="text-red-600">
                          ❌❌ गंभीर संपत्ति क्षरण
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* Rule of 72 */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  72 का नियम: त्वरित महंगाई कैलकुलेटर
                </h3>

                <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">
                    सूत्र: दोगुना होने के वर्ष = 72 ÷ महंगाई दर
                  </h4>
                  <p className="text-sm text-slate-700">
                    यह मानसिक शॉर्टकट आपको जटिल गणनाओं के बिना जल्दी से अनुमान
                    लगाने में मदद करता है कि महंगाई के कारण कीमतें कब दोगुनी
                    होंगी।
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🛒</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            सामान्य महंगाई (6%)
                          </h4>
                          <p className="text-sm text-slate-700">
                            72 ÷ 6 = <strong>12 वर्ष</strong>
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            किराना, उपयोगिताएं, परिवहन लागत हर 12 वर्षों में
                            दोगुनी होती है
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🎓</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            शिक्षा (10%)
                          </h4>
                          <p className="text-sm text-slate-700">
                            72 ÷ 10 = <strong>7.2 वर्ष</strong>
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            स्कूल/कॉलेज शुल्क हर 7 वर्षों में दोगुना होता है
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🏥</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            स्वास्थ्य सेवा (12%)
                          </h4>
                          <p className="text-sm text-slate-700">
                            72 ÷ 12 = <strong>6 वर्ष</strong>
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            चिकित्सा लागत हर 6 वर्षों में दोगुनी होती है -
                            तदनुसार योजना बनाएं
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">⛽</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            ईंधन (8%)
                          </h4>
                          <p className="text-sm text-slate-700">
                            72 ÷ 8 = <strong>9 वर्ष</strong>
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            पेट्रोल/डीजल कीमतें हर 9 वर्षों में दोगुनी होती हैं
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* How to Beat Inflation */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  महंगाई को हराने की 8 रणनीतियां
                </h3>

                <div className="space-y-4">
                  <Card className="border-emerald-200 bg-emerald-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-emerald-600 text-white shrink-0">
                          1
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            इक्विटी/म्यूचुअल फंड में निवेश करें
                          </h4>
                          <p className="text-sm text-slate-700">
                            केवल संपत्ति वर्ग जो लगातार दीर्घकालिक महंगाई को
                            हराता है (12-15% रिटर्न बनाम 6% महंगाई = 6-9%
                            वास्तविक संपत्ति वृद्धि)। दीर्घकालिक बचत का 60-70%
                            इक्विटी में आवंटित करें।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-200 bg-emerald-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-emerald-600 text-white shrink-0">
                          2
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            स्टेप-अप SIP का उपयोग करें
                          </h4>
                          <p className="text-sm text-slate-700">
                            वेतन वृद्धि के अनुरूप SIP राशि को वार्षिक रूप से
                            10-15% बढ़ाएं। यह जीवनशैली महंगाई का मुकाबला करता है
                            और निश्चित SIP से तेजी से संपत्ति को चक्रवृद्धि करता
                            है।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          3
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            सोने के साथ विविधता लाएं (10-15%)
                          </h4>
                          <p className="text-sm text-slate-700">
                            सोना ऐतिहासिक रूप से उच्च महंगाई के दौरान क्रय शक्ति
                            को संरक्षित करता है। सॉवरेन गोल्ड बॉन्ड के माध्यम से
                            10-15% आवंटित करें (2.5% ब्याज + पूंजी प्रशंसा)।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          4
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            निष्क्रिय नकदी से बचें
                          </h4>
                          <p className="text-sm text-slate-700">
                            बचत में केवल 3-6 महीने का आपातकालीन कोष रखें। बाकी
                            लिक्विड म्यूचुअल फंड (7-8% रिटर्न) या FD में होना
                            चाहिए। निष्क्रिय नकद वार्षिक रूप से 6% मूल्य खो देती
                            है।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          5
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            रियल एस्टेट पर विचार करें (दीर्घकालिक)
                          </h4>
                          <p className="text-sm text-slate-700">
                            अच्छे स्थानों में संपत्ति वार्षिक रूप से 8-10% बढ़ती
                            है + किराये की आय। लेकिन बड़ी पूंजी, कम तरलता की
                            आवश्यकता है। या तरलता के साथ रियल एस्टेट एक्सपोजर के
                            लिए REITs में निवेश करें।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          6
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            वेतन वृद्धि निवेश करें
                          </h4>
                          <p className="text-sm text-slate-700">
                            जीवनशैली समायोजित होने से पहले प्रत्येक वेतन वृद्धि
                            का 50% निवेश में स्वचालित करें। यह चुटकी महसूस किए
                            बिना संपत्ति का निर्माण करता है, जीवनशैली महंगाई से
                            लड़ता है।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          7
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            वार्षिक रूप से पोर्टफोलियो को पुनर्संतुलित करें
                          </h4>
                          <p className="text-sm text-slate-700">
                            वार्षिक रूप से परिसंपत्ति आवंटन की समीक्षा करें। यदि
                            इक्विटी बहुत अधिक बढ़ी, तो ऋण में लाभ बुक करें। यदि
                            गिर गई, तो अधिक निवेश करें। जोखिम-पुरस्कार संतुलन
                            बनाए रखता है और वास्तविक रिटर्न को अनुकूलित करता है।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          8
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            उच्च महंगाई दरों के साथ योजना बनाएं
                          </h4>
                          <p className="text-sm text-slate-700">
                            शिक्षा/चिकित्सा के लिए, 10-12% महंगाई का उपयोग करें
                            (6% नहीं)। रिटायरमेंट के लिए, 1-2% बफर जोड़ें। कम
                            आकलन के कारण कम पड़ने के बजाय अधिक बचत करना बेहतर
                            है।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित वित्तीय कैलकुलेटर
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/hi/retirement-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            👴
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              रिटायरमेंट कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              महंगाई को ध्यान में रखते हुए रिटायरमेंट कोष की
                              योजना बनाएं। गणना करें कि आरामदायक सेवानिवृत्ति के
                              लिए आपको कितनी आवश्यकता है।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>रिटायरमेंट योजना</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/hi/sip-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            📈
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              SIP कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              SIP रिटर्न की गणना करें जो महंगाई को हराते हैं।
                              दीर्घकालिक संपत्ति के लिए स्टेप-अप SIP लाभ देखें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>SIP योजना शुरू करें</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-inflation-before-faq"
                type="leaderboard"
                lazyLoad
              />
            </div>

            {/* FAQs */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    अक्सर पूछे जाने वाले प्रश्न
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={faqItems[0]?.id}
                    className="space-y-2"
                  >
                    {faqItems.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-slate-900">
                          {faq.question}
                        </AccordionTrigger>

                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-inflation-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-inflation-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-inflation-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
