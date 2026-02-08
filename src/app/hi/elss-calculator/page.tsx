import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import ELSSClient from '@/app/elss-calculator/ELSSClient';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import HindiSidebar from '@/components/HindiSidebar';
import { autoLinkContent } from '@/utils/autoLinker';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import {
  TrendingUp,
  Shield,
  ShieldCheck,
  Info,
  ArrowRight,
} from 'lucide-react';
import { ELSSSchemas } from '@/components/schemas/ELSSSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA (HINDI) ---------------- */
export const metadata: Metadata = {
  title: 'ELSS कैलकुलेटर 2026 - टैक्स बचाएं और वेल्थ बढ़ाएं (80C)',
  description:
    'ELSS म्यूचुअल फंड कैलकुलेटर: जानें कि ₹1.5 लाख तक निवेश करके आप कितना टैक्स बचा सकते हैं और 3 साल में कितना रिटर्न पा सकते हैं।',
  keywords: [
    'ELSS कैलकुलेटर',
    'टैक्स सेविंग म्यूचुअल फंड',
    'ELSS रिटर्न कैलकुलेटर',
    '80C टैक्स बचत',
    'SIP टैक्स कैलकुलेटर',
    'ELSS vs PPF हिंदी'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/elss-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/elss-calculator/',
    },
  },
  openGraph: {
    title: 'ELSS कैलकुलेटर - टैक्स बचाएं और पैसा बढ़ाएं',
    description:
      'धारा 80C के तहत ₹46,800 तक टैक्स बचाएं। अपने ELSS निवेश के रिटर्न की गणना करें।',
    url: 'https://fincado.com/hi/elss-calculator/',
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

/* ---------------- PAGE ---------------- */

export default function ELSSHindiPage() {
  // Hindi Labels for the Calculator Component
  const hindiLabels = {
    monthlyInv: 'मासिक निवेश (₹)',
    rate: 'अपेक्षित रिटर्न (% वार्षिक)',
    timePeriod: 'समय अवधि (वर्ष)',
    maturityValue: 'कुल मैच्योरिटी राशि',
    invested: 'कुल निवेश',
    returns: 'कुल लाभ (Returns)',
    taxSaved: 'टैक्स बचत (अधिकतम)',
  };

  const introContent = autoLinkContent(`
    <p>
      <strong>ELSS (इक्विटी लिंक्ड सेविंग्स स्कीम)</strong> एकमात्र ऐसा म्यूचुअल फंड है जो 
      आयकर अधिनियम की <strong>धारा 80C</strong> के तहत टैक्स छूट के लिए योग्य है।
    </p>
    <p>
      यह दोहरे लाभ देता है: <strong>टैक्स की बचत</strong> और <strong>पैसे की बढ़ोतरी (Wealth Creation)</strong>। 
      आप प्रति वर्ष ₹1.5 लाख तक के निवेश पर टैक्स छूट का दावा कर सकते हैं, जिससे आप ₹46,800 तक 
      (30% टैक्स स्लैब के लिए) टैक्स बचा सकते हैं।
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>लॉक-इन अवधि:</strong> 3 साल (सभी 80C विकल्पों जैसे PPF या FD में सबसे कम)।</li>
      <li><strong>संभावित रिटर्न:</strong> 12% - 15% (ऐतिहासिक रूप से PPF/FD से बेहतर)।</li>
      <li><strong>निवेश का तरीका:</strong> SIP (सिस्टमैटिक इन्वेस्टमेंट प्लान) या एकमुश्त (Lump Sum)।</li>
      <li><strong>टैक्सेशन:</strong> ₹1.25 लाख से अधिक के लाभ (LTCG) पर 12.5% टैक्स लगता है।</li>
    </ul>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>सबसे कम लॉक-इन:</strong> सिर्फ 3 साल बनाम 5 साल (Tax Saving FD) या 15 साल (PPF)।</li>
      <li><strong>उच्च रिटर्न संभावना:</strong> ऐतिहासिक रूप से 12-15% प्रति वर्ष निश्चित आय विकल्पों की तुलना में।</li>
      <li><strong>Rupee Cost Averaging:</strong> SIP निवेश बाजार की अस्थिरता को औसत करता है।</li>
      <li><strong>पेशेवर प्रबंधन:</strong> अनुभवी फंड मैनेजरों द्वारा प्रबंधित।</li>
      <li><strong>तरलता:</strong> 3 साल के बाद बिना जुर्माने के पूरी तरह से रिडीम किया जा सकता है।</li>
      <li><strong>टैक्स दक्षता:</strong> निवेश पर टैक्स बचाएं और ₹1.25L तक टैक्स-फ्री लाभ का आनंद लें।</li>
    </ul>
  `);

  // FAQ Items
  const faqItems = [
    {
      id: 'faq-1',
      question: 'क्या मैं 3 साल बाद पैसा निकाल सकता हूं?',
      answer:
        'हां, 3 साल की लॉक-इन अवधि समाप्त होने के बाद, आप अपनी यूनिट्स को रिडीम कर सकते हैं (बेच सकते हैं)। हालांकि, बेहतर रिटर्न के लिए 5-7 साल तक निवेशित रहने की सलाह दी जाती है।',
    },
    {
      id: 'faq-2',
      question: 'क्या ELSS में SIP की अनुमति है?',
      answer:
        'हां, ELSS में निवेश करने का सबसे अच्छा तरीका SIP है। हालांकि, याद रखें कि प्रत्येक SIP किस्त का अपना 3 साल का लॉक-इन पीरियड होता है।',
    },
    {
      id: 'faq-3',
      question: 'ELSS पर टैक्स कैसे लगता है?',
      answer:
        'ELSS से होने वाले लाभ को लॉन्ग टर्म कैपिटल गेन्स (LTCG) माना जाता है। एक वित्तीय वर्ष में ₹1.25 लाख तक का लाभ टैक्स-फ्री है। इस सीमा से ऊपर के लाभ पर 12.5% टैक्स लगता है।',
    },
    {
      id: 'faq-4',
      question: 'मैं ELSS से कितना टैक्स बचा सकता हूं?',
      answer:
        'आप धारा 80C के तहत ₹1.5 लाख तक निवेश कर सकते हैं। यदि आप 30% टैक्स ब्रैकेट में हैं, तो आप लगभग ₹46,800 (सेस सहित) टैक्स बचा सकते हैं।',
    },
    {
      id: 'faq-5',
      question: 'क्या ELSS, PPF से बेहतर है?',
      answer:
        'वेल्थ क्रिएशन के लिए, ELSS आम तौर पर बेहतर है क्योंकि यह PPF (7.1%) की तुलना में इक्विटी-लिंक्ड रिटर्न (12-15%) देता है। ELSS का लॉक-इन भी कम है (3 साल)। हालांकि, PPF जोखिम-मुक्त है।',
    },
    {
      id: 'faq-6',
      question: 'क्या ELSS अल्पकालिक निवेश के लिए उपयुक्त है?',
      answer:
        'नहीं। ELSS एक इक्विटी-लिंक्ड उत्पाद है और दीर्घकालिक निवेशकों (5+ वर्ष) के लिए सबसे उपयुक्त है। अल्पकालिक निवेश बाजार की अस्थिरता से प्रभावित हो सकते हैं।',
    },
    {
      id: 'faq-7',
      question: 'यदि मैं अपनी ELSS SIP बंद कर दूं तो क्या होगा?',
      answer:
        'आप बिना जुर्माने के कभी भी अपनी ELSS SIP को रोक या बंद कर सकते हैं। हालांकि, पहले से निवेश की गई किस्तें तब तक लॉक रहेंगी जब तक प्रत्येक अपनी 3 साल की लॉक-इन अवधि पूरी नहीं कर लेती।',
    },
    {
      id: 'faq-8',
      question: 'क्या मैं ₹1.5 लाख से अधिक ELSS में निवेश कर सकता हूं?',
      answer:
        'हां, आप ELSS में कोई भी राशि निवेश कर सकते हैं, लेकिन धारा 80C के तहत टैक्स कटौती प्रति वर्ष ₹1.5 लाख तक सीमित है। अतिरिक्त निवेश अभी भी रिटर्न उत्पन्न करेंगे लेकिन अतिरिक्त टैक्स लाभ प्रदान नहीं करेंगे।',
    },
    {
      id: 'faq-9',
      question: 'क्या मैं एक ELSS फंड से दूसरे में स्विच कर सकता हूं?',
      answer:
        'आप 3 साल की लॉक-इन अवधि के दौरान ELSS फंड के बीच सीधे स्विच नहीं कर सकते। लॉक-इन समाप्त होने के बाद, आप रिडीम कर सकते हैं और दूसरे ELSS फंड में पुनर्निवेश कर सकते हैं, लेकिन यह लाभ पर टैक्स ट्रिगर करेगा।',
    },
    {
      id: 'faq-10',
      question:
        'क्या बजट 2026 ने ELSS टैक्स लाभ या धारा 80C सीमा में बदलाव किया?',
      answer:
        'नहीं। केंद्रीय बजट 2026 ने ELSS म्यूचुअल फंड या धारा 80C निवेश सीमा में कोई बदलाव नहीं किया। निवेशक आयकर नियमों के अनुसार मौजूदा सीमा तक कटौती का दावा करना जारी रख सकते हैं।',
    }
  ];

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <CalculatorSchema
        name="ELSS Calculator Hindi"
        description="Calculate returns and tax savings for ELSS Mutual Funds in Hindi."
        url="https://fincado.com/hi/elss-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          {
            name: 'कैलकुलेटर',
            url: 'https://fincado.com/hi/calculators/',
          },
          {
            name: 'ELSS कैलकुलेटर',
            url: 'https://fincado.com/hi/elss-calculator/',
          }
        ]}
      />

      <ELSSSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="ELSS कैलकुलेटर – टैक्स बचाएं और वेल्थ बढ़ाएं" />
            <LanguageToggle path="/elss-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-emerald-100 text-lime-700">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                ELSS कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                धारा 80C के तहत टैक्स बचाएं और दीर्घकालिक धन बढ़ाएं
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
            <p>
              अपने टैक्स-सेविंग म्यूचुअल फंड निवेश की मैच्योरिटी वैल्यू की गणना करें।
              जानें कि धारा 80C के तहत <strong>₹1.5 लाख तक टैक्स बचाते हुए</strong> आप कितनी संपत्ति बना सकते हैं।
            </p>
          `}
            />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-elss-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      सामान्य रिटर्न (ELSS)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      दीर्घकालिक औसत (5+ वर्ष)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      12–15%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        प्रति वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      अधिकतम टैक्स बचत (30%)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹1.5L वार्षिक निवेश पर
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹46,800
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      अपडेट किया गया डेटा
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      लॉक-इन और टैक्स नियम
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <ELSSClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-elss-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  निवेश टिप
                </strong>
                ELSS 5+ वर्षों के लिए रखने पर सर्वोत्तम काम करता है। 3 साल का
                लॉक-इन न्यूनतम है, लेकिन लंबे समय तक निवेशित रहने से आप बाजार की
                अस्थिरता से बाहर निकल सकते हैं और अपने धन को प्रभावी ढंग से बढ़ा
                सकते हैं।
              </AlertDescription>
            </Alert>

            {/* Formula Section */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    ELSS रिटर्न गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      ELSS रिटर्न की गणना निवेश मोड के आधार पर अलग तरीके से की
                      जाती है:
                    </div>

                    {/* SIP Formula */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">
                        मासिक SIP (सिस्टमैटिक इन्वेस्टमेंट प्लान) के लिए
                      </h4>
                      <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                        <div className="text-center text-xl font-serif">
                          FV = P × &#123;[(1 + r)<sup>n</sup> − 1] ÷ r&#125; ×
                          (1 + r)
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-slate-700 mt-4">
                        <div className="flex gap-3 items-start">
                          <strong className="min-w-20">जहां:</strong>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            FV
                          </span>
                          <span>
                            = भविष्य मूल्य / आपके ELSS निवेश की परिपक्वता राशि
                          </span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            P
                          </span>
                          <span>= मासिक SIP राशि (₹ में)</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            r
                          </span>
                          <span>
                            = मासिक रिटर्न दर = वार्षिक रिटर्न ÷ 12 ÷ 100
                          </span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            n
                          </span>
                          <span>= कुल SIP किस्तों की संख्या (वर्ष × 12)</span>
                        </div>
                      </div>
                    </div>

                    {/* Lump Sum Formula */}
                    <div className="pt-6 border-t border-slate-300">
                      <h4 className="font-semibold text-slate-900 mb-3">
                        एकमुश्त निवेश के लिए
                      </h4>
                      <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                        <div className="text-center text-xl font-serif">
                          FV = P × (1 + r)<sup>n</sup>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-slate-700 mt-4">
                        <div className="flex gap-3 items-start">
                          <strong className="min-w-20">जहां:</strong>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            FV
                          </span>
                          <span>= भविष्य मूल्य / परिपक्वता राशि</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            P
                          </span>
                          <span>= निवेश की गई मूल एकमुश्त राशि (₹ में)</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            r
                          </span>
                          <span>
                            = वार्षिक रिटर्न दर (दशमलव के रूप में, जैसे 14% के
                            लिए 0.14)
                          </span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">
                            n
                          </span>
                          <span>= वर्षों में निवेश अवधि</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: ELSS SIP गणना
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>मासिक SIP (P):</strong>
                        </div>
                        <div>₹12,500</div>

                        <div>
                          <strong>अपेक्षित वार्षिक रिटर्न:</strong>
                        </div>
                        <div>14% प्रति वर्ष</div>

                        <div>
                          <strong>निवेश अवधि:</strong>
                        </div>
                        <div>5 वर्ष (60 महीने)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          चरण 1: मासिक रिटर्न दर (r)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 14 ÷ (12 × 100) = 14 ÷ 1200 = 0.0117
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: (1 + r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          (1 + 0.0117)<sup>60</sup> ≈ 2.007
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: ELSS SIP फॉर्मूला लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV = 12,500 × &#123;[(1.0117)<sup>60</sup> − 1] ÷
                            0.0117&#125; × 1.0117
                          </div>
                          <div>
                            FV = 12,500 × &#123;(2.007 − 1) ÷ 0.0117&#125; ×
                            1.0117
                          </div>
                          <div>FV = 12,500 × (1.007 ÷ 0.0117) × 1.0117</div>
                          <div>FV = 12,500 × 86.07 × 1.0117</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          अनुमानित परिपक्वता मूल्य:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹10,88,000
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>कुल निवेशित राशि:</span>
                          <strong>₹7,50,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>धन लाभ:</span>
                          <strong className="text-green-700">
                            ≈ ₹3,38,000
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span>टैक्स बचत (धारा 80C @ 30%):</span>
                          <strong className="text-lime-700">≈ ₹2,25,000</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tax Saving Calculation */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      धारा 80C टैक्स बचत गणना
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <div className="p-3 bg-white rounded border border-lime-200">
                        <strong>वार्षिक टैक्स बचत = </strong>
                        <span className="font-mono">
                          min(वार्षिक निवेश, ₹1,50,000) × टैक्स दर
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        <strong>उदाहरण:</strong> यदि आप ELSS में प्रति वर्ष
                        ₹1,50,000 निवेश करते हैं और आप 30% टैक्स ब्रैकेट में
                        हैं, तो आप हर साल ₹45,000 टैक्स बचाते हैं। 5 वर्षों में,
                        यह ₹2,25,000 बचाया गया!
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      महत्वपूर्ण बिंदु
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        ELSS रिटर्न बाजार-लिंक्ड हैं और गारंटीकृत नहीं हैं।
                        ऐतिहासिक औसत 12-15% प्रति वर्ष है।
                      </li>
                      <li>
                        प्रत्येक SIP किस्त की अपने निवेश की तारीख से 3 साल की
                        लॉक-इन होती है।
                      </li>
                      <li>
                        रिडेम्पशन पर LTCG टैक्स लागू होता है: ₹1.25L/वर्ष तक का
                        लाभ टैक्स-फ्री है, उसके ऊपर 12.5% टैक्स लागू होता है।
                      </li>
                      <li>
                        80C के तहत टैक्स बचत आपके टैक्स ब्रैकेट और शासन (नई बनाम
                        पुरानी टैक्स व्यवस्था) के अधीन है।
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह ELSS कैलकुलेटर इक्विटी म्यूचुअल फंड के लिए मानक
                    चक्रवृद्धि ब्याज फॉर्मूले का उपयोग करता है। वास्तविक रिटर्न
                    फंड प्रदर्शन और बाजार स्थितियों के आधार पर भिन्न हो सकता है।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo content */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    धारा 80C लाभों को अधिकतम करना चाहते हैं?
                  </strong>
                  <Link
                    href="/hi/sip-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>नियमित निवेश के लिए हमारा SIP कैलकुलेटर आजमाएं</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* Section 1: Intro */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      ELSS म्यूचुअल फंड क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* Section 2: Features */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      ELSS की मुख्य विशेषताएं
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={featuresContent} />
                    </div>
                    <p className="text-xs text-slate-500 italic">
                      केंद्रीय बजट 2026 ने ELSS कराधान या धारा 80C सीमा में कोई
                      बदलाव नहीं किया। निवेशकों को रिडेम्पशन के समय प्रचलित
                      टैक्स नियमों को सत्यापित करना चाहिए।
                    </p>
                  </section>

                  {/* 🎯 AD #3: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-elss-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Section 3: Benefits */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      ELSS निवेश के लाभ
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Comparison Table */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      ELSS बनाम अन्य 80C विकल्प
                    </h3>

                    <Card className="border-none shadow-none m-0 ring-1 ring-slate-200">
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-slate-50">
                                <TableHead className="w-30 font-bold text-slate-900">
                                  विशेषता
                                </TableHead>
                                <TableHead className="font-bold text-slate-900">
                                  ELSS
                                </TableHead>
                                <TableHead className="font-bold text-slate-900">
                                  PPF
                                </TableHead>
                                <TableHead className="font-bold text-slate-900">
                                  Tax Saver FD
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">
                                  रिटर्न (अपेक्षित)
                                </TableCell>
                                <TableCell className="font-semibold text-emerald-600">
                                  12% - 15% प्रति वर्ष
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  7.1% (निश्चित)
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  6.5% - 7.5%
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  लॉक-इन अवधि
                                </TableCell>
                                <TableCell className="font-semibold text-emerald-600">
                                  3 साल
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  15 साल
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  5 साल
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  जोखिम स्तर
                                </TableCell>
                                <TableCell className="font-semibold text-amber-600">
                                  मध्यम/उच्च
                                </TableCell>
                                <TableCell className="font-semibold text-emerald-600">
                                  शून्य जोखिम
                                </TableCell>
                                <TableCell className="font-semibold text-emerald-600">
                                  शून्य जोखिम
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  रिटर्न पर टैक्स
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  LTCG: ₹1.25L फ्री, फिर 12.5%
                                </TableCell>
                                <TableCell className="font-semibold text-emerald-600">
                                  पूरी तरह से टैक्स फ्री (EEE)
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  टैक्स स्लैब के अनुसार
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  सर्वोत्तम के लिए
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  दीर्घकालिक धन + टैक्स बचत
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  जोखिम-मुक्त रिटायरमेंट योजना
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  रूढ़िवादी टैक्स बचत
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Advantages Grid */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      ELSS क्यों चुनें? (Why Choose ELSS?)
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-5">
                          <div className="mb-2 text-emerald-600">
                            <Shield className="h-6 w-6" />
                          </div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            सबसे कम लॉक-इन
                          </h4>
                          <p className="text-sm text-slate-600">
                            सिर्फ 3 साल के लॉक-इन के साथ, ELSS अन्य विकल्पों
                            जैसे PPF (15 साल) या FD (5 साल) की तुलना में सबसे
                            अधिक तरल है।
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-5">
                          <div className="mb-2 text-emerald-600">
                            <TrendingUp className="h-6 w-6" />
                          </div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            महंगाई को मात
                          </h4>
                          <p className="text-sm text-slate-600">
                            इक्विटी ही एकमात्र एसेट क्लास है जो लंबी अवधि (5+
                            वर्ष) में लगातार महंगाई (Inflation) को मात देती है।
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-5">
                          <div className="mb-2 text-emerald-600">
                            <ShieldCheck className="h-6 w-6" />
                          </div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            SIP की सुविधा
                          </h4>
                          <p className="text-sm text-slate-600">
                            आपको बड़ी एकमुश्त राशि की आवश्यकता नहीं है। SIP के
                            जरिए सिर्फ ₹500 प्रति माह से टैक्स बचाना शुरू करें।
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* How to Use Calculator */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      इस ELSS कैलकुलेटर का उपयोग कैसे करें
                    </h3>
                    <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                      <li>
                        <strong>मासिक SIP</strong> या <strong>एकमुश्त</strong>{' '}
                        निवेश मोड के बीच चुनें।
                      </li>
                      <li>अपनी निवेश राशि दर्ज करें (मासिक या एक बार)।</li>
                      <li>
                        अपेक्षित रिटर्न दर सेट करें (इक्विटी फंड के लिए आमतौर पर
                        12-14%)।
                      </li>
                      <li>
                        निवेश अवधि चुनें (न्यूनतम 3 साल, अनुशंसित 5-7 साल)।
                      </li>
                      <li>
                        सटीक टैक्स बचत देखने के लिए अपना टैक्स ब्रैकेट चुनें।
                      </li>
                      <li>
                        <strong>&quot;PPF से तुलना करें&quot;</strong> पर क्लिक
                        करें यह देखने के लिए कि ELSS जोखिम-मुक्त विकल्पों से
                        कैसे तुलना करता है।
                      </li>
                      <li>
                        भविष्य के संदर्भ के लिए अपनी गणना सहेजें या परिवार के
                        साथ साझा करें।
                      </li>
                    </ol>
                  </section>

                  {/* Related calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित टैक्स सेविंग कैलकुलेटर
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/hi/ppf-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🔒
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  PPF कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  गारंटीड 7.1% रिटर्न के साथ जोखिम-मुक्त टैक्स
                                  बचत।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                                  <span>अभी गणना करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hi/sip-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                                📈
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                                  SIP कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  धन सृजन के लिए नियमित म्यूचुअल फंड निवेश की
                                  योजना बनाएं।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                                  <span>अभी आजमाएं</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* 🎯 AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-elss-before-faq"
                type="leaderboard"
                lazyLoad={true}
              />
            </div>

            {/* --- FAQ SECTION --- */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    अक्सर पूछे जाने वाले प्रश्न (FAQs)
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
                        <AccordionTrigger className="text-left text-slate-900 font-medium">
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

            {/* 🎯 AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-elss-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-elss-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-elss-sidebar" />

              {/* 🎯 AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-elss-sidebar-bottom" type="box" lazyLoad={true} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
