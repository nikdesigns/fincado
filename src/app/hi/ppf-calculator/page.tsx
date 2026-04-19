import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PPFClient from '@/app/ppf-calculator/PPFClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import FAQSchema from '@/components/FAQSchema';
import { PPFSchemas } from '@/components/schemas/PPFSchemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  Lock,
  TrendingUp,
  ArrowRight,
  FileText,
  Info,
} from 'lucide-react';
import { autoLinkContent } from '@/utils/autoLinker';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'PPF कैलकुलेटर 2026 – पब्लिक प्रोविडेंट फंड परिपक्वता कैलकुलेटर | Fincado',
  description:
    'पब्लिक प्रोविडेंट फंड (PPF) कैलकुलेटर हिंदी में: 7.1% ब्याज दर के साथ 15 साल बाद मैच्योरिटी राशि की गणना करें। EEE स्टेटस के तहत 100% टैक्स-फ्री रिटर्न। Section 80C लाभ, निकासी विकल्प और लोन सुविधा जांचें।',
  keywords: [
    'PPF Calculator Hindi',
    'Public Provident Fund Hindi',
    'PPF Interest Rate Hindi',
    'Tax Free Investment Hindi',
    'PPF Maturity Calculator',
    'Section 80C PPF'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/ppf-calculator/',
    languages: { 'en-IN': 'https://fincado.com/ppf-calculator/' },
  },
  openGraph: {
    title: 'PPF कैलकुलेटर – सुरक्षित और टैक्स-फ्री निवेश',
    description:
      'मुफ्त PPF कैलकुलेटर 7.1% ब्याज दर के साथ। मैच्योरिटी राशि, Section 80C के तहत टैक्स बचत, और सरकार समर्थित सुरक्षा के साथ रिटायरमेंट की योजना बनाएं।',
    url: 'https://fincado.com/hi/ppf-calculator/',
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

export default function HindiPPFPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    modeLabel: 'निवेश मोड',
    monthlyInv: 'मासिक निवेश (₹)',
    annualInv: 'वार्षिक निवेश (₹)',
    rate: 'ब्याज दर (% प्रति वर्ष)',
    duration: 'समय अवधि (वर्ष)',
    maturity: 'परिपक्वता राशि',
    totalInv: 'कुल निवेश',
    totalInt: 'कुल ब्याज',
    investmentMode: 'निवेश मोड',
    monthly: 'मासिक',
    annual: 'वार्षिक',
    monthlyInvestment: 'मासिक निवेश (₹)',
    annualInvestment: 'वार्षिक निवेश (₹)',
    interestRate: 'ब्याज दर (% प्रति वर्ष)',
    timePeriod: 'समय अवधि',
    years: 'वर्ष',
    maturityAmount: 'परिपक्वता राशि',
    totalInvestment: 'कुल निवेश',
    totalInterest: 'कुल अर्जित ब्याज',
    saveCalculation: 'गणना सहेजें',
    shareWhatsApp: 'WhatsApp पर साझा करें',
    savedPPFPlans: 'आपकी सहेजी गई PPF योजनाएं',
    clearAll: 'सभी साफ़ करें',
    mode: 'मोड:',
  };

  const introContent = autoLinkContent(`
    <p>
      <strong>पब्लिक प्रोविडेंट फंड (PPF)</strong> भारत सरकार द्वारा समर्थित एक लंबी अवधि की 
      बचत योजना है। यह <strong>EEE (Exempt-Exempt-Exempt)</strong> स्टेटस के तहत पूर्ण कर छूट 
      के साथ गारंटीड रिटर्न प्रदान करता है, जो इसे रिटायरमेंट प्लानिंग के लिए सबसे सुरक्षित 
      निवेश विकल्पों में से एक बनाता है।
    </p>
    <p class="mt-4">
      15 साल की अनिवार्य लॉक-इन अवधि के साथ, PPF <strong>Section 80C कर कटौती</strong>, 
      टैक्स-फ्री ब्याज और टैक्स-फ्री मैच्योरिटी राशि के लाभों को जोड़ता है। वर्तमान ब्याज दर 
      <strong>7.1% प्रति वर्ष</strong> है, जो सालाना चक्रवृद्धि होती है।
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>लॉक-इन अवधि:</strong> 15 वर्ष (5 वर्ष के ब्लॉक में बढ़ाया जा सकता है)</li>
      <li><strong>न्यूनतम वार्षिक जमा:</strong> ₹500 प्रति वर्ष</li>
      <li><strong>अधिकतम वार्षिक जमा:</strong> ₹1,50,000 प्रति वर्ष</li>
      <li><strong>ब्याज दर:</strong> 7.1% प्रति वर्ष (Q4 FY 2025-26, तिमाही समीक्षा)</li>
      <li><strong>चक्रवृद्धि:</strong> 31 मार्च को वार्षिक चक्रवृद्धि</li>
      <li><strong>खाता खोलना:</strong> प्रति व्यक्ति एक खाता (नाबालिगों सहित)</li>
      <li><strong>आंशिक निकासी:</strong> 7वें वर्ष से अनुमति (50% तक)</li>
      <li><strong>लोन सुविधा:</strong> तीसरे से छठे वर्ष तक उपलब्ध (25% तक)</li>
    </ul>
  `);

  const taxBenefitsContent = autoLinkContent(`
    <p>
      PPF <strong>EEE (Exempt-Exempt-Exempt)</strong> कर स्टेटस का आनंद लेता है, जो ट्रिपल 
      कर लाभ प्रदान करता है:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>निवेश पर छूट:</strong> आयकर अधिनियम की धारा 80C के तहत 1.5 लाख तक की कटौती।</li>
      <li><strong>ब्याज पर छूट:</strong> वार्षिक रूप से अर्जित ब्याज पूरी तरह से टैक्स-फ्री है।</li>
      <li><strong>मैच्योरिटी पर छूट:</strong> पूरी मैच्योरिटी राशि टैक्स-फ्री है, NSC या टैक्स-सेविंग FD के विपरीत।</li>
    </ul>
    <p class="mt-4">
      यह PPF को भारत में सबसे कर-कुशल निवेश विकल्पों में से एक बनाता है, विशेष रूप से उच्च 
      कर ब्रैकेट (30% स्लैब) में व्यक्तियों के लिए।
    </p>
  `);

  const withdrawalContent = autoLinkContent(`
    <p>
      PPF में दीर्घकालिक बचत अनुशासन सुनिश्चित करने के लिए सख्त निकासी नियम हैं:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>7 वर्ष से पहले:</strong> अत्यंत चिकित्सा आपात स्थिति या जीवन-घातक बीमारियों को छोड़कर कोई निकासी की अनुमति नहीं है।</li>
      <li><strong>7 वर्ष के बाद:</strong> प्रति वर्ष एक आंशिक निकासी की अनुमति है, निकासी के वर्ष से पहले चौथे वर्ष के अंत में शेष राशि के 50% तक सीमित।</li>
      <li><strong>15 वर्ष के बाद:</strong> पूरी मैच्योरिटी राशि निकाली जा सकती है, या खाते को 5 वर्ष के ब्लॉक में योगदान के साथ या बिना बढ़ाया जा सकता है।</li>
      <li><strong>समयपूर्व बंद:</strong> गंभीर बीमारी, उच्च शिक्षा, या निवास परिवर्तन के मामले में 5 वर्ष के बाद अनुमति है, लेकिन कम ब्याज दर पर।</li>
    </ul>
  `);

  // ✅ FAQ Items (Hindi) - Expanded to 10
  const ppfFaqs = [
    {
      id: 'ppf-faq-1',
      question: 'क्या PPF का ब्याज टैक्सेबल है?',
      answer:
        'नहीं। PPF EEE (Exempt-Exempt-Exempt) स्टेटस का आनंद लेता है। निवेश Section 80C कटौती के लिए योग्य है, अर्जित ब्याज टैक्स-फ्री है, और मैच्योरिटी राशि भी पूरी तरह से टैक्स-फ्री है।',
    },
    {
      id: 'ppf-faq-2',
      question: 'वर्तमान PPF ब्याज दर क्या है?',
      answer:
        'वर्तमान PPF ब्याज दर 7.1% प्रति वर्ष है (Q4 FY 2025-26 तक)। भारत सरकार तिमाही PPF दरों की समीक्षा करती है। ब्याज 31 मार्च को वार्षिक रूप से चक्रवृद्धि होता है।',
    },
    {
      id: 'ppf-faq-3',
      question: 'क्या मैं 15 साल से पहले PPF से निकासी कर सकता हूं?',
      answer:
        '7वें वर्ष से आंशिक निकासी की अनुमति है, जो चौथे पूर्ववर्ती वर्ष के अंत में शेष राशि के 50% तक सीमित है। पूर्ण समयपूर्व बंद केवल 5 वर्ष के बाद असाधारण मामलों जैसे गंभीर बीमारी या उच्च शिक्षा में अनुमति है, लेकिन कम ब्याज दर (1-2% कम) पर।',
    },
    {
      id: 'ppf-faq-4',
      question: '15 वर्षों में PPF मैच्योर होने के बाद क्या होता है?',
      answer:
        'मैच्योरिटी के बाद, आपके पास तीन विकल्प हैं: (1) पूरी राशि निकालें, (2) आगे जमा किए बिना 5 वर्षों के लिए बढ़ाएं, या (3) निरंतर जमा (अधिकतम ₹1.5L/वर्ष) के साथ 5 वर्षों के लिए बढ़ाएं। विस्तार 5 वर्ष के ब्लॉक में कई बार किया जा सकता है।',
    },
    {
      id: 'ppf-faq-5',
      question: 'क्या मेरे पास कई PPF खाते हो सकते हैं?',
      answer:
        'नहीं। एक व्यक्ति अपने नाम पर केवल एक PPF खाता रख सकता है। हालांकि, आप अपने नाबालिग बच्चे के लिए एक अलग PPF खाता खोल सकते हैं। यदि आपके पास कई खाते हैं, तो केवल पहला खाता ब्याज अर्जित करेगा; अन्य को बंद करना होगा।',
    },
    {
      id: 'ppf-faq-6',
      question: 'क्या मैं अपने PPF खाते पर लोन ले सकता हूं?',
      answer:
        'हां। आप तीसरे वित्तीय वर्ष से छठे वित्तीय वर्ष तक अपने PPF शेष राशि पर लोन ले सकते हैं। लोन राशि दूसरे पूर्ववर्ती वर्ष के अंत में शेष राशि के 25% तक सीमित है। ब्याज दर आम तौर पर PPF दर से 2% अधिक है (वर्तमान में लगभग 9.1%)।',
    },
    {
      id: 'ppf-faq-7',
      question: 'PPF बनाम NPS - रिटायरमेंट के लिए कौन बेहतर है?',
      answer:
        'PPF शून्य जोखिम और 15 वर्षों के बाद पूर्ण तरलता के साथ गारंटीड 7.1% टैक्स-फ्री रिटर्न प्रदान करता है। NPS संभावित रूप से उच्च बाजार-लिंक्ड रिटर्न (10-12%) प्रदान करता है लेकिन बाजार जोखिम के साथ आता है और मैच्योरिटी पर केवल 60% टैक्स-फ्री निकासी। PPF जोखिम-विमुख निवेशकों के लिए आदर्श है, जबकि NPS उन लोगों के लिए उपयुक्त है जो रिटायरमेंट के लिए उच्च वृद्धि चाहते हैं।',
    },
    {
      id: 'ppf-faq-8',
      question: 'PPF में जमा करने का सबसे अच्छा समय कब है?',
      answer:
        'किसी भी महीने की 5 तारीख से पहले जमा करें ताकि उस पूरे महीने के लिए ब्याज मिल सके। ब्याज प्रत्येक महीने की 5वीं और अंतिम दिन के बीच सबसे कम शेष राशि पर गणना की जाती है। वित्तीय वर्ष (अप्रैल-मई) में जल्दी जमा करने से चक्रवृद्धि के माध्यम से आपके रिटर्न को अधिकतम किया जाता है।',
    },
    {
      id: 'ppf-faq-9',
      question: 'क्या NRI PPF खाता खोल सकते हैं?',
      answer:
        'नहीं। NRI (अनिवासी भारतीय) नए PPF खाते नहीं खोल सकते। हालांकि, यदि आपने निवासी भारतीय के रूप में PPF खाता खोला और बाद में NRI बन गए, तो खाता बिना आगे जमा के मैच्योरिटी तक जारी रह सकता है। अर्जित ब्याज प्रचलित PPF दर पर होगा।',
    },
    {
      id: 'ppf-faq-10',
      question: 'न्यूनतम और अधिकतम PPF जमा क्या है?',
      answer:
        'न्यूनतम वार्षिक जमा ₹500 है (एक या कई किश्तों में किया जा सकता है)। अधिकतम वार्षिक जमा ₹1,50,000 है। यदि आप एक वर्ष में ₹500 से कम जमा करते हैं, तो खाता निष्क्रिय हो जाता है और इसे ₹50 प्रति वर्ष के जुर्माने और बकाया के साथ पुनर्जीवित करने की आवश्यकता होती है।',
    }
  ];

  return (
    <>
      <CalculatorSchema
        name="PPF Calculator Hindi"
        description="Calculate PPF maturity value with 7.1% tax-free interest in Hindi."
        url="https://fincado.com/hi/ppf-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'PPF कैलकुलेटर',
            url: 'https://fincado.com/hi/ppf-calculator/',
          }
        ]}
      />

      <FAQSchema
        faqs={ppfFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <PPFSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="PPF कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/ppf-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-green-100 text-emerald-700">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                PPF कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                सरकार समर्थित सुरक्षा के साथ टैक्स-फ्री रिटर्न की गणना करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              पब्लिक प्रोविडेंट फंड (PPF) भारत में निवेश का सबसे सुरक्षित विकल्प
              है। इस कैलकुलेटर से जानें कि 15 साल बाद आपको कितना रिटर्न मिलेगा
              और आप कितना <strong>टैक्स बचा (Tax Saving)</strong> सकते हैं।
            </p>
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-ppf-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      वर्तमान PPF दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सरकारी अधिसूचित (Q4 FY25-26)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      7.1%
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
                      टैक्स स्टेटस
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ट्रिपल टैक्स छूट
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      EEE
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        स्टेटस
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-amber-700 mb-1">
                      अधिकतम निवेश
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      प्रति वित्तीय वर्ष (Section 80C)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹1.5L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <PPFClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-ppf-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  टैक्स-सेविंग टिप
                </strong>
                PPF ट्रिपल टैक्स लाभ (EEE स्टेटस) प्रदान करता है: Section 80C के
                तहत कटौती, टैक्स-फ्री ब्याज और टैक्स-फ्री मैच्योरिटी। पूरे महीने
                के लिए ब्याज अर्जित करने के लिए प्रत्येक महीने की 5 तारीख से
                पहले जमा करें।
              </AlertDescription>
            </Alert>

            {/* ✅ PPF FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    PPF मैच्योरिटी गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      PPF फ्यूचर वैल्यू ऑफ एन्युइटी ड्यू फॉर्मूला का उपयोग करता
                      है क्योंकि जमा आमतौर पर वर्ष की शुरुआत में की जाती है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        M = P × [((1 + r)<sup>n</sup> - 1) / r] × (1 + r)
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">जहां:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          M
                        </span>
                        <span>= मैच्योरिटी राशि (अंत में कुल कोष)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= वार्षिक जमा राशि (₹ में)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = वार्षिक ब्याज दर (दशमलव के रूप में, जैसे 7.1% के लिए
                          0.071)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>= निवेश अवधि वर्षों में (न्यूनतम 15 वर्ष)</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
                      <p className="text-xs text-slate-700">
                        <strong>नोट:</strong> फॉर्मूला में अंत में (1 + r) से
                        गुणा शामिल है क्योंकि PPF जमा वर्ष की शुरुआत में की जाती
                        है (एन्युइटी ड्यू), अंत में नहीं।
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      उदाहरण: PPF गणना (15 वर्ष)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>वार्षिक जमा (P):</strong>
                        </div>
                        <div>₹1,50,000</div>

                        <div>
                          <strong>ब्याज दर (r):</strong>
                        </div>
                        <div>7.1% प्रति वर्ष</div>

                        <div>
                          <strong>अवधि (n):</strong>
                        </div>
                        <div>15 वर्ष (न्यूनतम लॉक-इन)</div>
                      </div>

                      <div className="pt-3 border-t border-emerald-300">
                        <strong className="block mb-2">
                          चरण 1: दर को दशमलव में बदलें
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 7.1 ÷ 100 = 0.071
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: (1 + r)<sup>n</sup> की गणना करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            (1 + 0.071)<sup>15</sup> = (1.071)<sup>15</sup>
                          </div>
                          <div>≈ 2.8171</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: PPF फॉर्मूला लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            M = 1,50,000 × [(2.8171 - 1) / 0.071] × 1.071
                          </div>
                          <div>M = 1,50,000 × (1.8171 / 0.071) × 1.071</div>
                          <div>M = 1,50,000 × 25.593 × 1.071</div>
                          <div>M = 1,50,000 × 27.410</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          मैच्योरिटी वैल्यू (टैक्स-फ्री):
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹41,11,500
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-emerald-300 space-y-2">
                        <div className="flex justify-between">
                          <span>कुल जमा (15 वर्ष):</span>
                          <strong>₹22,50,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>टैक्स-फ्री ब्याज अर्जित:</span>
                          <strong className="text-green-700">₹18,61,500</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>प्रभावी लाभ:</span>
                          <strong className="text-emerald-700">82.73%</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Section 80C टैक्स बचा (30% स्लैब):</span>
                          <strong className="text-emerald-700">₹6,75,000</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interest Calculation Note */}
                  <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                    <h4 className="font-semibold text-lime-900 mb-2 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      PPF ब्याज की गणना कैसे की जाती है
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <ul className="list-disc pl-5 space-y-1 text-xs">
                        <li>
                          ब्याज प्रत्येक महीने की 5वीं और अंतिम दिन के बीच{' '}
                          <strong>सबसे कम शेष राशि</strong> पर गणना की जाती है।
                        </li>
                        <li>
                          पूरे महीने के लिए ब्याज अर्जित करने के लिए, उस महीने
                          की <strong>5 तारीख से पहले</strong> जमा करें।
                        </li>
                        <li>
                          5 तारीख के बाद जमा केवल अगले महीने से ब्याज अर्जित
                          करती है।
                        </li>
                        <li>
                          ब्याज <strong>वार्षिक रूप से</strong> चक्रवृद्धि होता
                          है और 31 मार्च को जमा किया जाता है।
                        </li>
                        <li>
                          अधिकतम रिटर्न के लिए, वर्ष के पूरे योगदान को{' '}
                          <strong>अप्रैल</strong> में (5 तारीख से पहले) जमा
                          करें।
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Monthly vs Annual Deposit */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      मासिक बनाम वार्षिक जमा रणनीति
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p className="text-xs">
                        <strong>वार्षिक एकमुश्त (अप्रैल):</strong> सभी 12 महीनों
                        के लिए ब्याज अर्जित करने के लिए 5 अप्रैल से पहले
                        ₹1,50,000 जमा करें। यह आपके रिटर्न को अधिकतम करता है।
                      </p>
                      <p className="text-xs">
                        <strong>मासिक जमा:</strong> हर महीने 5 तारीख से पहले
                        ₹12,500 जमा करें। सुविधाजनक होने पर भी, यह थोड़ा कम
                        ब्याज अर्जित करता है क्योंकि बाद की जमा के पास
                        चक्रवृद्धि के लिए कम समय होता है।
                      </p>
                      <p className="text-xs font-semibold text-amber-800 mt-2">
                        💡 टिप: यदि आपके पास एकमुश्त राशि है, तो इसे जल्दी जमा
                        करें। अन्यथा, मासिक SIP-स्टाइल जमा निवेश अनुशासन बनाए
                        रखने में मदद करती है।
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    यह कैलकुलेटर मानक फ्यूचर वैल्यू ऑफ एन्युइटी ड्यू फॉर्मूला का
                    उपयोग करता है। बैंकों द्वारा वास्तविक ब्याज गणना मासिक ब्याज
                    गणना के साथ दैनिक शेष राशि विधि का पालन करती है।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* PROMO BOX */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <TrendingUp className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    रिटायरमेंट के लिए उच्च रिटर्न चाहिए?
                  </strong>

                  <Link
                    href="/hi/nps-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      बाजार-लिंक्ड पेंशन वृद्धि के लिए NPS कैलकुलेटर से तुलना
                      करें
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS PPF */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      पब्लिक प्रोविडेंट फंड (PPF) क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* SECTION 2: Features */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      PPF की प्रमुख विशेषताएं
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={featuresContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #3: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-ppf-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* SECTION 3: TAX BENEFITS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      PPF कर लाभ (EEE स्टेटस)
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxBenefitsContent} />
                    </div>
                  </section>

                  {/* Comparison Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      PPF बनाम EPF बनाम NPS बनाम FD तुलना
                    </h3>

                    <div className="overflow-x-auto">
                      <Table className="border-collapse">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-left">विशेषता</TableHead>
                            <TableHead className="text-left">PPF</TableHead>
                            <TableHead className="text-left">EPF</TableHead>
                            <TableHead className="text-left">NPS</TableHead>
                            <TableHead className="text-left">FD</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              रिटर्न
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              7.1% (निश्चित)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              8.25% (निश्चित)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              10-12% (बाजार-लिंक्ड)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              6.5-7.5%
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              टैक्स स्टेटस
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              EEE (100% टैक्स-फ्री)
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              EEE (100% टैक्स-फ्री)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              EET (60% टैक्स-फ्री)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              टैक्सेबल
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              लॉक-इन अवधि
                            </TableCell>
                            <TableCell className="text-slate-700">
                              15 वर्ष
                            </TableCell>
                            <TableCell className="text-slate-700">
                              रिटायरमेंट तक
                            </TableCell>
                            <TableCell className="text-slate-700">
                              60 वर्ष तक
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              7 दिन - 10 वर्ष
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              जोखिम स्तर
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              शून्य (सरकार समर्थित)
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              शून्य (सरकार समर्थित)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              मध्यम (बाजार जोखिम)
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              शून्य (बैंक गारंटी)
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              आदर्श के लिए
                            </TableCell>
                            <TableCell className="text-slate-700">
                              दीर्घकालिक टैक्स-फ्री बचत
                            </TableCell>
                            <TableCell className="text-slate-700">
                              वेतनभोगी कर्मचारी
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              रिटायरमेंट प्लानिंग
                            </TableCell>
                            <TableCell className="text-slate-700">
                              अल्पकालिक लक्ष्य
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              निकासी
                            </TableCell>
                            <TableCell className="text-slate-700">
                              7 वर्ष के बाद (आंशिक)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              रिटायरमेंट से पहले सीमित
                            </TableCell>
                            <TableCell className="text-slate-700">
                              60 वर्ष के बाद
                            </TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              कभी भी (जुर्माने के साथ)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                      <p className="text-sm text-slate-700">
                        <strong>विशेषज्ञ टिप:</strong> PPF जोखिम-मुक्त,
                        टैक्स-फ्री रिटायरमेंट बचत के लिए आदर्श है। संतुलित
                        रिटायरमेंट पोर्टफोलियो के लिए PPF को NPS के साथ
                        मिलाएं—सुरक्षा के लिए PPF, वृद्धि के लिए NPS।
                      </p>
                    </div>
                  </section>

                  {/* WITHDRAWAL RULES */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      PPF निकासी नियम
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={withdrawalContent} />
                    </div>
                  </section>

                  {/* PPF vs NSC */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      PPF बनाम NSC: कौन बेहतर है?
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        दोनों PPF और{' '}
                        <strong>राष्ट्रीय बचत प्रमाणपत्र (NSC)</strong> Section
                        80C कटौती प्रदान करते हैं, लेकिन PPF का स्पष्ट लाभ है:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>
                          <strong>मैच्योरिटी पर टैक्स:</strong> PPF मैच्योरिटी
                          100% टैक्स-फ्री है (EEE), जबकि NSC मैच्योरिटी आपके
                          स्लैब के अनुसार टैक्सेबल है।
                        </li>
                        <li>
                          <strong>ब्याज:</strong> PPF ब्याज टैक्स-फ्री है, NSC
                          ब्याज टैक्सेबल है (पुनर्निवेशित माना जाता है और 80C के
                          लिए पात्र)।
                        </li>
                        <li>
                          <strong>अवधि:</strong> PPF में विस्तार विकल्प के साथ
                          15 वर्ष हैं, NSC निश्चित 5 वर्ष है।
                        </li>
                        <li>
                          <strong>तरलता:</strong> PPF 7 वर्ष के बाद आंशिक निकासी
                          और लोन की अनुमति देता है। NSC को मैच्योरिटी से पहले
                          नहीं निकाला जा सकता।
                        </li>
                      </ul>
                      <p className="mt-4 font-semibold text-emerald-700">
                        निर्णय: PPF दीर्घकालिक टैक्स-फ्री धन सृजन के लिए बेहतर
                        है। NSC उन लोगों के लिए उपयुक्त है जो उच्च प्री-टैक्स
                        रिटर्न के साथ छोटी 5 साल की प्रतिबद्धता चाहते हैं।
                      </p>
                    </div>
                  </section>

                  {/* How to Use Calculator */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      इस PPF कैलकुलेटर का उपयोग कैसे करें
                    </h3>
                    <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                      <li>
                        अपना योगदान मोड चुनें: मासिक (₹500-₹12,500) या वार्षिक
                        (₹500-₹1,50,000)।
                      </li>
                      <li>अपनी मासिक या वार्षिक निवेश राशि दर्ज करें।</li>
                      <li>
                        ब्याज दर सेट करें (वर्तमान में 7.1%, सरकार द्वारा तिमाही
                        अपडेट)।
                      </li>
                      <li>
                        अवधि चुनें (न्यूनतम 15 वर्ष, 5 साल के ब्लॉक में बढ़ा
                        सकते हैं)।
                      </li>
                      <li>
                        मैच्योरिटी राशि, कुल निवेश और टैक्स-फ्री ब्याज अर्जित
                        देखें।
                      </li>
                      <li>
                        पहले 5 वर्षों में वृद्धि देखने के लिए{' '}
                        <strong>&quot;Year-wise Breakdown&quot;</strong> सक्षम
                        करें।
                      </li>
                      <li>
                        भविष्य के संदर्भ के लिए अपनी गणना सहेजें या WhatsApp के
                        माध्यम से साझा करें।
                      </li>
                    </ol>
                  </section>

                  {/* PPF Extension */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      मैच्योरिटी के बाद PPF विस्तार
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <p>15 वर्षों के बाद, आपके पास तीन विकल्प हैं:</p>
                      <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>
                          <strong>बंद करें और निकालें:</strong> पूरी मैच्योरिटी
                          राशि निकालें (100% टैक्स-फ्री)।
                        </li>
                        <li>
                          <strong>बिना जमा के बढ़ाएं:</strong> नई जमा किए बिना 5
                          और वर्षों के लिए खाता सक्रिय रखें। आपका मौजूदा कोष
                          ब्याज अर्जित करना जारी रखता है।
                        </li>
                        <li>
                          <strong>जमा के साथ बढ़ाएं:</strong> 5 और वर्षों के लिए
                          जमा जारी रखें (अधिकतम ₹1.5L/वर्ष)। आप 5 वर्ष के ब्लॉक
                          में कई बार बढ़ा सकते हैं।
                        </li>
                      </ul>
                      <p className="mt-4">
                        विस्तार के दौरान, आप बिना सीमा के प्रति वर्ष एक निकासी
                        कर सकते हैं, और ब्याज टैक्स-फ्री रहता है।
                      </p>
                    </div>
                  </section>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित टैक्स-सेविंग कैलकुलेटर
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/hi/elss-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                📊
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  ELSS कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  3 साल के लॉक-इन के साथ टैक्स-सेविंग म्यूचुअल
                                  फंड से रिटर्न की गणना करें।
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

                      <Link href="/hi/nps-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🏦
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  NPS कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  NPS (राष्ट्रीय पेंशन प्रणाली) कैलकुलेटर के साथ
                                  रिटायरमेंट की योजना बनाएं।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
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
                id="hi-ppf-before-faq"
                type="leaderboard"
                lazyLoad={true}
              />
            </div>

            {/* --- FAQ SECTION --- */}
            <section className="no-print my-12">
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
                    defaultValue={ppfFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {ppfFaqs.map((faq) => (
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
              <AdSlot id="hi-ppf-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-ppf-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-ppf-sidebar" />

              {/* 🎯 AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-ppf-sidebar-bottom" type="box" lazyLoad={true} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
