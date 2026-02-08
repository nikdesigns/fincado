import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HomeLoanClient from '@/app/loans/home-loan/HomeLoanClient';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import 'katex/dist/katex.min.css';
import LanguageToggle from '@/components/LanguageToggle';
import HindiSidebar from '@/components/HindiSidebar';
import FAQSchema from '@/components/FAQSchema';
import WikiText from '@/components/WikiText';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Home, ArrowRight, BookOpen, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { HomeLoanSchemas } from '@/components/schemas/HomeLoanSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'होम लोन EMI कैलकुलेटर – ब्याज और टैक्स छूट की गणना करें | Fincado',
  description:
    'Fincado होम लोन कैलकुलेटर (Hindi): अपनी मासिक किस्त (EMI) जानें, कुल ब्याज की गणना करें और टैक्स छूट (Section 80C, 24b) का लाभ उठाएं।',
  keywords: [
    'Home Loan EMI Calculator Hindi',
    'Housing Loan Calculator India',
    'Home Loan Tax Benefit Hindi',
    'SBI Home Loan Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/loans/home-loan/',
    languages: {
      'en-IN': 'https://fincado.com/loans/home-loan/',
    },
  },
  openGraph: {
    title: 'होम लोन EMI कैलकुलेटर – अपने घर का सपना पूरा करें',
    description: 'मुफ्त टूल: होम लोन EMI, ब्याज और टैक्स बचत की गणना करें।',
    url: 'https://fincado.com/hi/loans/home-loan/',
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

export default function HindiHomeLoanPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    interestRate: 'ब्याज दर (Interest Rate %)',
    tenure: 'अवधि (Years)',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principal: 'मूल राशि (Principal)',
    interest: 'ब्याज (Interest)',
    amortizationSchedule: 'किस्त तालिका (Amortization)',
    yearlyBreakdown: 'वर्ष के अनुसार विवरण',
    copy: 'कॉपी करें',
    export: 'डाउनलोड (CSV)',
    print: 'प्रिंट करें',
    month: 'माह',
    balance: 'बकाया राशि',
  };

  // ✅ FAQ Items
  const faqItems = [
    {
      id: 'faq-1',
      question: 'होम लोन कैलकुलेटर कैसे मदद करता है?',
      answer:
        'यह आपको लोन लेने से पहले ही अपनी मासिक ईएमआई (EMI), कुल ब्याज लागत और टैक्स लाभों का सटीक अनुमान लगाने में मदद करता है, ताकि आप सही बजट बना सकें।',
    },
    {
      id: 'faq-2',
      question: 'होम लोन पर टैक्स लाभ क्या हैं?',
      answer:
        'आप धारा 80C के तहत मूलधन (Principal) भुगतान पर ₹1.5 लाख तक और धारा 24(b) के तहत ब्याज भुगतान पर ₹2 लाख तक की टैक्स कटौती का दावा कर सकते हैं।',
    },
    {
      id: 'faq-3',
      question: 'क्या लोन अवधि (Tenure) ब्याज को प्रभावित करती है?',
      answer:
        'हाँ। लंबी अवधि (जैसे 30 साल) चुनने से आपकी EMI कम हो जाती है, लेकिन बैंक को दिया जाने वाला कुल ब्याज काफी बढ़ जाता है।',
    },
    {
      id: 'faq-4',
      question: 'क्या मैं अपनी EMI बीच में बदल सकता हूँ?',
      answer:
        'हाँ, आप "Prepayment" करके या लोन रिफाइनेंस (Balance Transfer) कराके अपनी EMI या अवधि कम कर सकते हैं।',
    },
    {
      id: 'faq-5',
      question: '₹50,000 सैलरी पर कितना होम लोन मिल सकता है?',
      answer:
        '₹50,000 मासिक सैलरी पर आपको लगभग ₹35-40 लाख का होम लोन मिल सकता है, यह मानते हुए कि आपकी आय का 50% EMI के लिए जाता है। ₹40 लाख के लोन पर 8.5% ब्याज दर और 20 साल की अवधि के लिए EMI लगभग ₹34,680 होगी।',
    },
    {
      id: 'faq-6',
      question: 'होम लोन के लिए न्यूनतम डाउन पेमेंट कितना होता है?',
      answer:
        'बैंक आमतौर पर प्रॉपर्टी वैल्यू का 80-90% फाइनेंस करते हैं। आपको 10-20% डाउन पेमेंट की व्यवस्था करनी होगी। ₹75 लाख से अधिक की प्रॉपर्टी के लिए, RBI कम से कम 25% डाउन पेमेंट अनिवार्य करता है।',
    },
    {
      id: 'faq-7',
      question: 'क्या बिना ITR के होम लोन मिल सकता है?',
      answer:
        'नौकरीपेशा व्यक्ति सैलरी स्लिप और Form 16 के साथ होम लोन ले सकते हैं। स्व-रोजगार व्यक्तियों को आमतौर पर 2-3 साल का ITR चाहिए होता है। कुछ बैंक वैकल्पिक आय प्रमाण के साथ बिना ITR के भी लोन देते हैं।',
    },
    {
      id: 'faq-8',
      question: 'होम लोन की अधिकतम अवधि कितनी होती है?',
      answer:
        'अधिकांश बैंक 30 साल (360 महीने) तक के होम लोन ऑफर करते हैं। हालांकि, अवधि रिटायरमेंट उम्र (आमतौर पर 60-65 साल) से आगे नहीं बढ़ सकती। लंबी अवधि से EMI कम होती है लेकिन कुल ब्याज बढ़ जाता है।',
    },
    {
      id: 'faq-9',
      question: 'फ्लोटिंग या फिक्स्ड ब्याज दर बेहतर है?',
      answer:
        'फ्लोटिंग दरें आमतौर पर फिक्स्ड दरों से 0.5-1% कम होती हैं और बाजार की स्थितियों के साथ बदलती हैं। फिक्स्ड दरें निश्चितता प्रदान करती हैं। अधिकांश उधारकर्ता फ्लोटिंग दरें चुनते हैं क्योंकि होम लोन लंबी अवधि के होते हैं और दरें समय के साथ घटती हैं।',
    },
    {
      id: 'faq-10',
      question: 'क्या मैं अपना होम लोन दूसरे बैंक में ट्रांसफर कर सकता हूँ?',
      answer:
        'हाँ, आप अपने होम लोन को दूसरे बैंक में ट्रांसफर (बैलेंस ट्रांसफर) कर सकते हैं जो कम ब्याज दर ऑफर करता है। अधिकांश बैंक बकाया मूलधन का 0.5-1% प्रोसेसिंग फीस के रूप में लेते हैं। ट्रांसफर तभी फायदेमंद है जब आप ब्याज दर में कम से कम 0.75% की बचत करें।',
    },
  ];

  const introContent = autoLinkContent(`
    <p>
      <strong>होम लोन EMI कैलकुलेटर</strong> आपको मूल राशि, ब्याज दर और अवधि के आधार पर 
      अपने हाउसिंग लोन के लिए मासिक किस्त की गणना करने में मदद करता है। 
      भारतीय होम लोन <strong>धारा 80C</strong> (मूलधन चुकौती पर ₹1.5 लाख तक) 
      और <strong>धारा 24(b)</strong> (स्व-अधिकृत संपत्ति के लिए ब्याज भुगतान पर ₹2 लाख तक) 
      के तहत कर कटौती के लिए भी योग्य हैं।
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>कम ब्याज दरें:</strong> होम लोन में अन्य लोनों की तुलना में सबसे कम ब्याज दरें (8.5%-9.5%) होती हैं।</li>
      <li><strong>टैक्स बचत:</strong> धारा 80C और 24(b) के तहत सालाना ₹3.5 लाख तक बचाएं।</li>
      <li><strong>लंबी अवधि:</strong> 30 साल तक की चुकौती अवधि EMI को किफायती बनाती है।</li>
      <li><strong>संपत्ति निर्माण:</strong> किराए के बजाय EMI चुकाते हुए इक्विटी बनाएं।</li>
    </ul>
  `);

  const taxBenefitsContent = autoLinkContent(`
    <p>
      <strong>धारा 80C:</strong> मूलधन चुकौती पर ₹1,50,000 तक की कटौती का दावा करें।<br/>
      <strong>धारा 24(b):</strong> स्व-अधिकृत संपत्ति के लिए भुगतान किए गए ब्याज पर ₹2,00,000 तक की कटौती 
      (किराए पर दी गई संपत्ति के लिए कोई सीमा नहीं)।<br/>
      <strong>धारा 80EEA:</strong> पहली बार घर खरीदारों के लिए ब्याज पर अतिरिक्त ₹1,50,000 की कटौती 
      (संपत्ति मूल्य ₹45 लाख तक)।
    </p>
  `);

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <CalculatorSchema
        name="Home Loan EMI Calculator Hindi"
        description="Calculate Home Loan EMI and Tax Benefits in Hindi."
        url="https://fincado.com/hi/loans/home-loan/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'लोन', url: 'https://fincado.com/hi/loans/' },
          {
            name: 'होम लोन EMI कैलकुलेटर',
            url: 'https://fincado.com/hi/loans/home-loan/',
          },
        ]}
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <HomeLoanSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="होम लोन EMI कैलकुलेटर – ब्याज और टैक्स छूट" />
            <LanguageToggle path="/loans/home-loan" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                होम लोन EMI कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                EMI, ब्याज और टैक्स छूट की सटीक गणना करें
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD - Highest Viewability */}
          <div className="no-print my-6">
            <AdSlot id="hi-home-loan-top" type="leaderboard" />
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
                      सबसे कम दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      SBI होम लोन {updatedLabel}
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8.50%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        प्रति वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      अधिकतम टैक्स लाभ
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      धारा 80C + 24(b) के तहत
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹3.5L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /वर्ष
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      सामान्य EMI
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹30L @ 8.5% 20 साल के लिए
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹26,010
                      <span className="text-base font-normal text-slate-600">
                        /महीना
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <HomeLoanClient labels={hindiLabels} />

            {/* 🎯 AD #2: AFTER CALCULATOR - High Engagement */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-home-loan-after-calc"
                type="square"
                lazyLoad={false}
              />
            </div>

            {/* EMI Formula Section */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    होम लोन EMI गणना फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      होम लोन के लिए EMI (समान मासिक किस्त) की गणना Reducing
                      Balance Method का उपयोग करके की जाती है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        EMI = P × [r × (1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> -
                        1]
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">जहां:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= मूल लोन राशि (₹ में)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>= मासिक ब्याज दर = वार्षिक दर ÷ (12 × 100)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>= महीनों में लोन अवधि (वर्ष × 12)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      होम लोन के लिए उदाहरण गणना
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>लोन राशि (P):</strong>
                        </div>
                        <div>₹30,00,000</div>

                        <div>
                          <strong>वार्षिक ब्याज दर:</strong>
                        </div>
                        <div>8.5% प्रति वर्ष</div>

                        <div>
                          <strong>लोन अवधि:</strong>
                        </div>
                        <div>20 साल (240 महीने)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          चरण 1: मासिक ब्याज दर (r)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 8.5 ÷ (12 × 100) = 8.5 ÷ 1200 = 0.00708333
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: (1+r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          (1 + 0.00708333)<sup>240</sup> = 5.4397
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: EMI फॉर्मूला लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            EMI = 30,00,000 × [0.00708333 × 5.4397] / [5.4397 -
                            1]
                          </div>
                          <div>EMI = 30,00,000 × 0.03853 / 4.4397</div>
                          <div>EMI = 30,00,000 × 0.008678</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          मासिक EMI:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹26,034
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>कुल देय राशि:</span>
                          <strong>₹62,48,160</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>कुल ब्याज भुगतान:</span>
                          <strong className="text-red-600">₹32,48,160</strong>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>(ब्याज मूलधन राशि का 108% है)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      फॉर्मूला को समझना
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        <strong>Reducing Balance Method:</strong> ब्याज की गणना
                        बकाया मूलधन राशि पर की जाती है, जो प्रत्येक EMI भुगतान
                        के साथ घटती है।
                      </li>
                      <li>
                        <strong>निश्चित EMI:</strong> EMI राशि पूरे लोन अवधि में
                        स्थिर रहती है, लेकिन ब्याज और मूलधन के घटक हर महीने
                        बदलते हैं।
                      </li>
                      <li>
                        <strong>शुरुआती भुगतान:</strong> शुरुआती EMI में अधिक
                        ब्याज होता है, बाद की EMI में अधिक मूलधन चुकौती होती है।
                      </li>
                      <li>
                        <strong>टैक्स लाभ:</strong> ITR फाइल करते समय धारा 80C
                        (मूलधन पर ₹1.5L तक) और धारा 24(b) (ब्याज पर ₹2L तक) के
                        तहत कटौती का दावा करें।
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-4">
                    <strong>नोट:</strong> सभी भारतीय बैंक EMI गणना के लिए
                    Reducing Balance Method का उपयोग करते हैं। यह कैलकुलेटर बैंक
                    स्टेटमेंट से मेल खाने वाले सटीक परिणाम प्रदान करने के लिए
                    समान फॉर्मूले का उपयोग करता है।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Budget Alert */}
            <Alert className="mt-6 bg-blue-50/50 border-blue-200 text-slate-600">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  टैक्स लाभ अलर्ट
                </strong>
                होम लोन सभी लोनों में अधिकतम टैक्स कटौती प्रदान करते हैं। आप
                धारा 80C, 24(b), और 80EEA को मिलाकर सालाना ₹3.5 लाख तक बचा सकते
                हैं।
              </AlertDescription>
            </Alert>

            {/* Bank Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    होम लोन ब्याज दरों की तुलना (अपडेट {updatedLabel})
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">बैंक</th>
                          <th className="p-3 text-left font-semibold">
                            ब्याज दर
                          </th>
                          <th className="p-3 text-left font-semibold">
                            प्रोसेसिंग फीस
                          </th>
                          <th className="p-3 text-left font-semibold">
                            अधिकतम लोन राशि
                          </th>
                          <th className="p-3 text-left font-semibold">
                            अधिकतम अवधि
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">SBI</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.50% - 9.65%
                          </td>
                          <td className="p-3">लोन का 0.35%</td>
                          <td className="p-3">₹10 करोड़ तक</td>
                          <td className="p-3">30 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">HDFC Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.60% - 9.50%
                          </td>
                          <td className="p-3">0.5% तक</td>
                          <td className="p-3">₹10 करोड़ तक</td>
                          <td className="p-3">30 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">ICICI Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.75% - 9.70%
                          </td>
                          <td className="p-3">1% तक</td>
                          <td className="p-3">₹15 करोड़ तक</td>
                          <td className="p-3">30 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Axis Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.75% - 9.65%
                          </td>
                          <td className="p-3">1% तक</td>
                          <td className="p-3">₹5 करोड़ तक</td>
                          <td className="p-3">30 साल</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">PNB</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.40% - 10.40%
                          </td>
                          <td className="p-3">लोन का 0.35%</td>
                          <td className="p-3">₹7.5 करोड़ तक</td>
                          <td className="p-3">30 साल</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *दरें सांकेतिक हैं और क्रेडिट स्कोर, लोन राशि और संपत्ति
                    मूल्य के आधार पर भिन्न होती हैं। अंतिम अपडेट: {updatedLabel}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #3: IN-FEED - After Comparison */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-home-loan-infeed-1"
                type="banner"
                lazyLoad={true}
              />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="homeLoan" />

            {/* PROMO CARD (Hindi) */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या आप होम लोन में महारत हासिल करना चाहते हैं?
                  </strong>
                  <Link
                    href="/guides/home-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>हमारी पूर्ण होम लोन गाइड पढ़ें (2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* Benefits */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      भारत में होम लोन के लाभ
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Tax Benefits */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      होम लोन टैक्स लाभ (2026)
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxBenefitsContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="hi-home-loan-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Eligibility */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      होम लोन पात्रता मानदंड
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        <strong>आयु:</strong> 21-65 साल (नौकरीपेशा), 21-70 साल
                        (स्व-रोजगार)
                      </li>
                      <li>
                        <strong>आय:</strong> न्यूनतम ₹25,000/महीना (शहर और बैंक
                        के अनुसार भिन्न)
                      </li>
                      <li>
                        <strong>क्रेडिट स्कोर:</strong> न्यूनतम 650, अधिमानतः
                        750+
                      </li>
                      <li>
                        <strong>रोजगार:</strong> न्यूनतम 2 साल का कार्य अनुभव
                        (नौकरीपेशा), 3 साल का व्यवसाय (स्व-रोजगार)
                      </li>
                      <li>
                        <strong>EMI से आय अनुपात:</strong> मासिक आय के 50% से
                        अधिक नहीं होना चाहिए
                      </li>
                    </ul>
                  </section>

                  {/* 🎯 AD #5: AFTER ELIGIBILITY */}
                  <div className="no-print my-8">
                    <AdSlot
                      id="hi-home-loan-infeed-2"
                      type="banner"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित लोन कैलकुलेटर
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/hi/emi-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                💰
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  सामान्य EMI कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  किसी भी प्रकार के लोन के लिए EMI कैलकुलेट करें
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                                  <span>अभी कैलकुलेट करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hi/sip-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                                📈
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                                  SIP कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  लोन चुकौती के साथ निवेश की योजना बनाएं
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                                  <span>अभी कैलकुलेट करें</span>
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

            {/* 🎯 AD #6: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="hi-home-loan-before-faq"
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

            {/* 🎯 AD #7: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-home-loan-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #8: SIDEBAR TOP - Sticky */}
              <AdSlot id="hi-home-loan-sidebar-top" type="skyscraper" />

              <HindiSidebar adId="hi-home-loan-sidebar" />

              {/* 🎯 AD #9: SIDEBAR BOTTOM */}
              <AdSlot
                id="hi-home-loan-sidebar-bottom"
                type="box"
                lazyLoad={true}
              />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
