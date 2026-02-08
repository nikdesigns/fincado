import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EMIClient from '@/app/emi-calculator/EMIClient';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import 'katex/dist/katex.min.css';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import HindiSidebar from '@/components/HindiSidebar';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { BookOpen, ArrowRight, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EMISchemas } from '@/components/schemas/EMISchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'EMI कैलकुलेटर – होम लोन, पर्सनल लोन की EMI निकालें | Fincado',
  description:
    'Fincado EMI कैलकुलेटर (Hindi): जानें आपकी मासिक किस्त (EMI) कितनी होगी। होम लोन, कार लोन और पर्सनल लोन के लिए सटीक गणना करें।',
  keywords: [
    'EMI Calculator Hindi',
    'Home Loan EMI Hindi',
    'Personal Loan EMI Calculator',
    'Loan Interest Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/emi-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/emi-calculator/',
    },
  },
  openGraph: {
    title: 'EMI कैलकुलेटर – अपनी लोन EMI प्लान करें',
    description:
      'मुफ्त टूल: होम लोन, कार लोन और पर्सनल लोन की EMI और ब्याज की गणना करें।',
    url: 'https://fincado.com/hi/emi-calculator/',
    type: 'website',
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

export default function HindiEMIPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    loanAmount: 'लोन राशि (Loan Amount)',
    rate: 'ब्याज दर (Interest Rate %)',
    tenure: 'लोन अवधि (Years)',
    monthlyEMI: 'मासिक किस्त (EMI)',
    principal: 'मूल राशि (Principal)',
    totalInterest: 'कुल ब्याज (Total Interest)',
  };

  // ✅ Hindi FAQ Items
  const faqItems = [
    {
      id: 'faq-1',
      question: 'EMI क्रेडिट स्कोर को कैसे प्रभावित करती है?',
      answer:
        'कैलकुलेटर पर EMI चेक करने से क्रेडिट स्कोर पर कोई असर नहीं पड़ता। हालांकि, अगर आप लोन लेने के बाद समय पर EMI नहीं चुकाते हैं, तो आपका सिबिल (CIBIL) स्कोर कम हो सकता है।',
    },
    {
      id: 'faq-2',
      question: 'क्या प्रीपेमेंट (Prepayment) करने से EMI कम होती है?',
      answer:
        'आम तौर पर, बैंक प्रीपेमेंट करने पर लोन की अवधि (Tenure) कम करते हैं क्योंकि इससे ब्याज की सबसे ज्यादा बचत होती है। अगर आप EMI कम करना चाहते हैं, तो बैंक से विशेष अनुरोध कर सकते हैं।',
    },
    {
      id: 'faq-3',
      question: 'बैंक EMI की गणना कैसे करते हैं?',
      answer:
        'भारतीय बैंक "Reducing Balance Method" का उपयोग करते हैं। इसका मतलब है कि ब्याज केवल बची हुई मूल राशि (Outstanding Principal) पर ही लगाया जाता है।',
    },
    {
      id: 'faq-4',
      question: 'क्या फिक्स्ड और फ्लोटिंग रेट में EMI अलग होती है?',
      answer:
        'हाँ। फिक्स्ड रेट में EMI पूरे लोन के दौरान एक समान रहती है। फ्लोटिंग रेट में अगर RBI रेपो रेट बदलता है, तो आपकी EMI घट या बढ़ सकती है।',
    },
    {
      id: 'faq-5',
      question: 'क्या लोन अवधि के दौरान EMI बदल सकती है?',
      answer:
        'हाँ। अगर ब्याज दरें बदलती हैं या आप आंशिक प्रीपेमेंट करते हैं तो EMI बदल सकती है।',
    },
    {
      id: 'faq-6',
      question: 'क्या बजट 2026 में EMI गणना के नियम बदले?',
      answer:
        'नहीं। केंद्रीय बजट 2026 में होम लोन, कार लोन या पर्सनल लोन के लिए EMI गणना के फॉर्मूले में कोई बदलाव नहीं हुआ। EMI अभी भी Reducing Balance Method से ही कैलकुलेट की जाती है।',
    },
    {
      id: 'faq-7',
      question: '20 लाख के होम लोन की EMI कितनी होगी?',
      answer:
        '₹20 लाख के होम लोन पर 8.5% ब्याज दर से 20 साल के लिए EMI लगभग ₹17,340 प्रति महीना होगी। कुल ब्याज लगभग ₹21.62 लाख होगा। सटीक आंकड़ों के लिए ऊपर दिए गए कैलकुलेटर का उपयोग करें।',
    },
    {
      id: 'faq-8',
      question: 'भारत में सबसे कम होम लोन EMI किस बैंक की है?',
      answer:
        'फरवरी 2026 तक, SBI होम लोन 8.50% से शुरू होने वाली प्रतिस्पर्धी दरें प्रदान करता है, इसके बाद HDFC बैंक (8.60%) और Axis बैंक (8.75%) हैं। हालांकि, वास्तविक दर आपके क्रेडिट स्कोर, आय और लोन राशि पर निर्भर करती है।',
    },
    {
      id: 'faq-9',
      question: 'लोन अवधि बदले बिना EMI कैसे कम करें?',
      answer:
        'अवधि बढ़ाए बिना EMI कम करने के लिए: 1) मूलधन घटाने के लिए एकमुश्त प्रीपेमेंट करें, 2) बैंक से कम बैलेंस पर EMI पुनर्गणना का अनुरोध करें, 3) कम ब्याज दर वाले बैंक में लोन ट्रांसफर करें (बैलेंस ट्रांसफर), 4) दर में कमी के लिए बातचीत करने के लिए क्रेडिट स्कोर में सुधार करें।',
    },
    {
      id: 'faq-10',
      question: 'EMI की गणना Reducing या Flat Rate पर होती है?',
      answer:
        'सभी प्रमुख भारतीय बैंक होम लोन, कार लोन और पर्सनल लोन के लिए REDUCING BALANCE METHOD का उपयोग करते हैं। इसका मतलब है कि ब्याज केवल बकाया मूलधन पर गणना की जाती है, जो हर EMI भुगतान के साथ घटता है। Flat Rate Method पुराना है और अब उपयोग नहीं होता।',
    },
  ];

  const introContent = autoLinkContent(`
    <p>
    <strong>EMI (Equated Monthly Installment)</strong> वह निश्चित मासिक राशि है 
    जो लोन चुकौती के लिए भुगतान की जाती है, जिसमें मूलधन और ब्याज शामिल होते हैं।
    भारतीय बैंक <strong>Reducing Balance Method</strong> का उपयोग करके EMI की गणना करते हैं,
    जहां ब्याज केवल बकाया मूलधन पर ही लगाया जाता है।
  </p>
  `);

  const benefitsContent = autoLinkContent(`
    <p>
      यह कैलकुलेटर आपको बेहतर बजट बनाने, लोन ऑफर्स की तुलना करने,
      और सूचित योजना के माध्यम से कुल ब्याज कम करने में मदद करता है।
      ज्यादातर उधारकर्ता कम आंकते हैं कि लंबी अवधि में कितना ब्याज जमा होता है
      जब तक वे Amortization Table नहीं देखते।
    </p>
  `);

  const factorsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>लोन मूलधन:</strong> आप जितनी राशि उधार लेते हैं। अधिक मूलधन का मतलब अधिक EMI।</li>
      <li><strong>ब्याज दर:</strong> कम <strong>पर्सनल लोन ब्याज दर</strong> या होम लोन दर आपके मासिक बोझ को काफी कम कर देती है।</li>
      <li><strong>अवधि:</strong> लंबी अवधि चुनने से आपकी मासिक EMI कम हो जाती है लेकिन समय के साथ कुल ब्याज भुगतान बढ़ जाता है।</li>
    </ul>
  `);

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'EMI कैलकुलेटर',
            url: 'https://fincado.com/hi/emi-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="EMI Calculator Hindi"
        description="Calculate Loan EMI in Hindi for Home, Car, and Personal Loan."
        url="https://fincado.com/hi/emi-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <EMISchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* --- HEADER SECTION --- */}
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="EMI कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/emi-calculator" />
          </div>

          <h1
            className="
              mb-4
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-semibold
              tracking-tight
              text-slate-900
            "
          >
            EMI कैलकुलेटर
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              अपने लोन की स्मार्ट प्लानिंग करें
            </span>
          </h1>

          {/* 💰 AD 1: TOP LEADERBOARD */}
          {/* <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="hi-emi-top" type="leaderboard" />
          </div> */}

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
      <p>
        Fincado के <strong>EMI कैलकुलेटर</strong> का उपयोग करके अपनी मासिक
        किस्त, कुल ब्याज और भुगतान शेड्यूल की गणना करें। यह टूल
        <strong> होम लोन, पर्सनल लोन और कार लोन</strong> के लिए एकदम सही
        है। लोन लेने से पहले अलग-अलग ब्याज दरों की तुलना करें और सही फैसला
        लें।
      </p>
    `}
            />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          {/* LEFT: MAIN CONTENT */}
          <div className="main-content">
            {/* --- TOP STATISTICS CARDS --- */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      सबसे लोकप्रिय
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹25 लाख @ 8.5% (20 साल) के लिए EMI
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹21,675
                      <span className="text-base font-normal text-slate-600">
                        /महीना
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      आज की सबसे अच्छी दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      SBI होम लोन (अपडेट {updatedLabel})
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

                <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-amber-700 mb-1">
                      ब्याज बचाएं
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹20L लोन पर ₹1L प्रीपे करें
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹1.2L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        बचत
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <EMIClient labels={hindiLabels} />

            {/* --- BUDGET 2026 ALERT --- */}
            <Alert className="mt-6 bg-slate-50/50 border-slate-200 text-slate-600">
              <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  बजट 2026 अपडेट
                </strong>
                यह कैलकुलेटर मानक बैंकिंग फॉर्मूले का पालन करता है। केंद्रीय बजट 2026 में 
                होम या पर्सनल लोन के लिए EMI गणना नियमों में कोई बदलाव नहीं हुआ।
              </AlertDescription>
            </Alert>

            {/* --- EMI FORMULA SECTION --- */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    EMI गणना का फॉर्मूला
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      किसी भी लोन (होम, कार, पर्सनल, शिक्षा) के लिए EMI (समान 
                      मासिक किस्त) की गणना Reducing Balance Method का उपयोग करके की जाती है:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        EMI = P × [r × (1 + r)<sup>n</sup>] / [(1 + r)
                        <sup>n</sup> − 1]
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">जहाँ:</strong>
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
                        <span>
                          = मासिक ब्याज दर = वार्षिक दर ÷ (12 × 100)
                        </span>
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
                      EMI गणना का उदाहरण
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>लोन राशि (P):</strong>
                        </div>
                        <div>₹5,00,000</div>

                        <div>
                          <strong>वार्षिक ब्याज दर:</strong>
                        </div>
                        <div>12% प्रति वर्ष</div>

                        <div>
                          <strong>लोन अवधि:</strong>
                        </div>
                        <div>3 साल (36 महीने)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          चरण 1: मासिक ब्याज दर (r)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 12 ÷ (12 × 100) = 12 ÷ 1200 = 0.01
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 2: (1 + r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          (1 + 0.01)<sup>36</sup> ≈ 1.4308
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          चरण 3: EMI फॉर्मूला लागू करें
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            EMI = 5,00,000 × [0.01 × 1.4308] / [1.4308 − 1]
                          </div>
                          <div>EMI = 5,00,000 × 0.014308 / 0.4308</div>
                          <div>EMI ≈ 5,00,000 × 0.033228</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          मासिक EMI:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹16,607
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>कुल देय राशि:</span>
                          <strong>₹5,97,852</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>कुल ब्याज भुगतान:</span>
                          <strong className="text-red-600">₹97,852</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      EMI फॉर्मूला को समझना
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        EMI की गणना <strong>Reducing Balance Method</strong> का उपयोग करके की जाती है, 
                        वही तरीका जो बैंक उपयोग करते हैं।
                      </li>
                      <li>
                        EMI स्थिर रहती है, लेकिन <strong>ब्याज भाग कम होता है</strong> और{' '}
                        <strong>मूलधन भाग बढ़ता है</strong> समय के साथ।
                      </li>
                      <li>
                        आप इस फॉर्मूले का उपयोग <strong>किसी भी लोन प्रकार</strong> के लिए कर सकते हैं – 
                        होम, कार, पर्सनल, शिक्षा, या बिजनेस लोन।
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-4">
                    यह EMI कैलकुलेटर वही फॉर्मूला उपयोग करता है जो बैंक और NBFC उपयोग करते हैं, 
                    इसलिए आपके परिणाम आधिकारिक लोन Amortization Schedule से मेल खाएंगे।
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* --- KEY INSIGHTS CARD --- */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    महत्वपूर्ण जानकारी (Key Insights)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 text-base text-slate-600 list-disc pl-5">
                    <li>
                      कम EMI का मतलब अक्सर लंबी अवधि और अधिक कुल ब्याज होता है।
                    </li>
                    <li>
                      छोटा सा प्रीपेमेंट (Prepayment) भी आपके ब्याज में लाखों की
                      बचत कर सकता है।
                    </li>
                    <li>
                      ब्याज दर की तुलना में &apos;लोन अवधि&apos; (Tenure) कुल
                      भुगतान पर ज्यादा असर डालती है।
                    </li>
                    <li>
                      लोन अप्लाई करने से पहले अलग-अलग बैंकों की EMI चेक करना
                      समझदारी है।
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* 💰 AD 2: AFTER RESULT */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-emi-after-calc" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="personalLoan" />

            {/* --- BANK RATES COMPARISON TABLE --- */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    बैंक EMI दरों की तुलना (अपडेट {updatedLabel})
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">बैंक</th>
                          <th className="p-3 text-left font-semibold">
                            होम लोन दर
                          </th>
                          <th className="p-3 text-left font-semibold">
                            कार लोन दर
                          </th>
                          <th className="p-3 text-left font-semibold">
                            पर्सनल लोन दर
                          </th>
                          <th className="p-3 text-left font-semibold">
                            प्रोसेसिंग फीस
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">HDFC Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.60% - 9.50%
                          </td>
                          <td className="p-3">8.70% - 10.00%</td>
                          <td className="p-3">10.50% - 21.00%</td>
                          <td className="p-3">0.5% तक</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">SBI</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.50% - 9.65%
                          </td>
                          <td className="p-3">8.85% - 9.75%</td>
                          <td className="p-3">11.15% - 14.45%</td>
                          <td className="p-3">0.35% तक</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">ICICI Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.75% - 9.70%
                          </td>
                          <td className="p-3">9.00% - 10.50%</td>
                          <td className="p-3">10.75% - 19.00%</td>
                          <td className="p-3">2.5% तक</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Axis Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.75% - 9.65%
                          </td>
                          <td className="p-3">9.25% - 11.50%</td>
                          <td className="p-3">10.49% - 22.00%</td>
                          <td className="p-3">2% तक</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *दरें सांकेतिक हैं और परिवर्तन के अधीन हैं। (अपडेट{' '}
                    {updatedLabel})
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* --- PROMO CARD --- */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                {/* Icon Container */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या आप अपनी EMI में महारत हासिल करना चाहते हैं?
                  </strong>

                  <Link
                    href="/guides/emi-calculator-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>हमारी EMI गाइड पढ़ें (2026 के लिए अपडेट)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE CONTENT --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1 */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      EMI क्या है? (What is EMI?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* SECTION 2 */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      यह EMI कैलकुलेटर कैसे मदद करता है
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* 💰 AD 3: SQUARE */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3 */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EMI को प्रभावित करने वाले कारक
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={factorsContent} />
                    </div>
                  </section>

                  {/* SECTION 4: RELATED TOOLS */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      संबंधित वित्तीय कैलकुलेटर
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {/* SIP Calculator */}
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
                                  म्यूचुअल फंड में मासिक SIP निवेश से रिटर्न कैलकुलेट करें
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

                      {/* Lumpsum Calculator */}
                      <Link href="/hi/lumpsum-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                                💰
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                                  लम्पसम कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  म्यूचुअल फंड में एकमुश्त निवेश पर रिटर्न कैलकुलेट करें
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

                      {/* PPF Calculator */}
                      <Link href="/hi/ppf-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-purple-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-50 to-purple-100 text-purple-700 text-2xl">
                                🏦
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-purple-700 mb-1">
                                  PPF कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  टैक्स लाभ के साथ पब्लिक प्रॉविडेंट फंड मेच्योरिटी कैलकुलेट करें
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-purple-700">
                                  <span>अभी कैलकुलेट करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      {/* FD Calculator */}
                      <Link href="/hi/fd-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-amber-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-amber-50 to-amber-100 text-amber-700 text-2xl">
                                🎯
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-amber-700 mb-1">
                                  FD कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  फिक्स्ड डिपॉज़िट मेच्योरिटी राशि और अर्जित ब्याज कैलकुलेट करें
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-amber-700">
                                  <span>अभी कैलकुलेट करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      {/* RD Calculator */}
                      <Link href="/hi/rd-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-orange-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-50 to-orange-100 text-orange-700 text-2xl">
                                📅
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-orange-700 mb-1">
                                  RD कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  मासिक योगदान के साथ रेकरिंग डिपॉज़िट मेच्योरिटी कैलकुलेट करें
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-orange-700">
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

                  {/* --- WHEN TO USE --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      EMI कैलकुलेटर का उपयोग कब करें?
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        किसी भी लोन के लिए आवेदन करने से पहले सामर्थ्य जांचने के लिए।
                      </li>
                      <li>
                        सबसे सस्ता विकल्प खोजने के लिए बैंकों की तुलना करते समय।
                      </li>
                      <li>
                        यह कैलकुलेट करने के लिए कि प्रीपेमेंट से आप कितना ब्याज बचाते हैं।
                      </li>
                    </ul>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* --- EMI REFERENCE TABLE --- */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-linear-to-br from-white to-slate-50">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    त्वरित EMI संदर्भ गाइड
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-2">
                    विभिन्न ब्याज दरों पर प्रति ₹1 लाख लोन के लिए अनुमानित मासिक EMI
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* 5 Years */}
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-2">
                        5 साल @ 8.5%
                      </div>
                      <div className="text-2xl font-bold text-emerald-700">
                        ₹2,052
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        प्रति लाख/महीना
                      </div>
                    </div>

                    {/* 10 Years */}
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-2">
                        10 साल @ 8.5%
                      </div>
                      <div className="text-2xl font-bold text-emerald-700">
                        ₹1,237
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        प्रति लाख/महीना
                      </div>
                    </div>

                    {/* 15 Years */}
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-2">
                        15 साल @ 8.5%
                      </div>
                      <div className="text-2xl font-bold text-emerald-700">
                        ₹984
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        प्रति लाख/महीना
                      </div>
                    </div>

                    {/* 20 Years */}
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-2">
                        20 साल @ 8.5%
                      </div>
                      <div className="text-2xl font-bold text-emerald-700">
                        ₹867
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        प्रति लाख/महीना
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-900">
                      <strong>उदाहरण:</strong> 20 साल के लिए 8.5% पर ₹25 लाख के होम लोन के लिए, 
                      आपकी EMI लगभग <strong>₹21,675/महीना</strong> होगी
                      (₹867 × 25)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

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

            <AuthorBio />
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <HindiSidebar adId="hi-emi-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
