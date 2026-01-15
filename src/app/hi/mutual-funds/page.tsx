import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import MutualFundsClient from '@/app/mutual-funds/MutualFundsClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import WikiText from '@/components/WikiText';

// --- UI COMPONENTS ---
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  PieChart,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
  HelpCircle,
  Globe,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'म्यूचुअल फंड कैलकुलेटर – पोर्टफोलियो रिटर्न और एसेट एलोकेशन',
  description:
    'Fincado म्यूचुअल फंड कैलकुलेटर (Hindi): अपने इक्विटी, डेट और गोल्ड निवेश के रिटर्न की गणना करें। महंगाई को मात देने वाला पोर्टफोलियो बनाएं।',
  keywords: [
    'Mutual Fund Calculator Hindi',
    'SIP Return Calculator Hindi',
    'Asset Allocation Hindi',
    'Equity vs Debt Hindi',
    'Portfolio Planner Hindi',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/mutual-funds/',
    languages: {
      'en-IN': 'https://fincado.com/mutual-funds/',
    },
  },
  openGraph: {
    title: 'म्यूचुअल फंड कैलकुलेटर – सही निवेश, सही भविष्य',
    description:
      'जानें कि आपका पोर्टफोलियो 10-20 साल में कितना बड़ा हो सकता है।',
    url: 'https://fincado.com/hi/mutual-funds/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiMutualFundPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    monthlySIP: 'मासिक SIP राशि (₹)',
    lumpSum: 'एकमुश्त निवेश (Lump Sum)',
    horizon: 'निवेश अवधि (Years)',
    strategy: 'एसेट एलोकेशन रणनीति',
    conservative: 'सुरक्षित (Conservative)',
    balanced: 'संतुलित (Balanced)',
    growth: 'एग्रेसिव (Growth)',
    equity: 'इक्विटी (%)',
    debt: 'डेट (%)',
    gold: 'सोना (%)',
    cash: 'कैश (%)',
    return: 'रिटर्न',
    inflation: 'महंगाई दर (%)',
    inflationSub: '- वास्तविक मूल्य जानने के लिए',
    resetDefaults: 'रीसेट करें',
    portfolioValue: 'अनुमानित पोर्टफोलियो वैल्यू',
    blendedReturn: 'औसत रिटर्न',
    totalInvested: 'कुल निवेश',
    wealthGained: 'कुल लाभ (Wealth Gained)',
    realValue: 'आज के हिसाब से मूल्य (Real Value)',
  };

  const faqItems = [
    {
      question: 'एसेट एलोकेशन (Asset Allocation) क्या है?',
      answer:
        'यह अपने निवेश को इक्विटी, डेट और गोल्ड जैसे विभिन्न वर्गों में बांटने की रणनीति है। इससे जोखिम कम होता है और रिटर्न संतुलित रहता है।',
    },
    {
      question: '100 माइनस उम्र का नियम क्या है?',
      answer:
        'यह एक थंब रूल है। 100 में से अपनी उम्र घटाएं, जो संख्या आए उतना प्रतिशत आपको इक्विटी (शेयर बाजार) में निवेश करना चाहिए। उदाहरण: 30 वर्ष की आयु में 70% इक्विटी।',
    },
    {
      question: 'क्या पोर्टफोलियो में सोना होना चाहिए?',
      answer:
        'हाँ, सोना महंगाई और बाजार की गिरावट के खिलाफ सुरक्षा देता है। अपने पोर्टफोलियो का 5-10% सोने में रखना एक समझदारी भरा कदम है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Mutual Fund Portfolio Calculator Hindi"
        description="Calculate Mutual Fund portfolio returns in Hindi."
        url="https://fincado.com/hi/mutual-funds/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/' },
          { name: 'हिंदी (Hindi)', url: 'https://fincado.com/hi/' },
          {
            name: 'म्यूचुअल फंड कैलकुलेटर',
            url: 'https://fincado.com/hi/mutual-funds/',
          },
        ]}
      />

      {/* FAQ Schema (Hindi) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header */}
        <header className="no-print my-4">
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="म्यूचुअल फंड कैलकुलेटर (Hindi)" />
            <Link
              href="/mutual-funds/"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors"
            >
              <Globe className="h-4 w-4" /> Switch to English
            </Link>
          </div>

          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-slate-900 leading-tight mb-4">
            म्यूचुअल फंड पोर्टफोलियो प्लानर
          </h1>

          <div className="max-w-3xl text-slate-600 text-lg leading-relaxed">
            <WikiText
              content={`
              <p>
                सिर्फ एक फंड में निवेश न करें, पूरा पोर्टफोलियो बनाएं। <strong>इक्विटी</strong>, 
                <strong>डेट</strong> और <strong>गोल्ड</strong> के मिश्रण से देखें कि आपका पैसा कैसे बढ़ेगा और 
                <strong>महंगाई</strong> का उस पर क्या असर होगा।
              </p>
            `}
            />
          </div>
        </header>

        <AdSlot type="leaderboard" id="hi-edu-loan-top" />

        <div className="layout-grid mt-10">
          <div className="main-content">
            {/* CALCULATOR CARD */}
            <Card className="border-slate-200 shadow-sm overflow-visible">
              <CardContent className="p-0">
                <MutualFundsClient labels={hindiLabels} />
              </CardContent>
            </Card>

            {/* AD SLOT */}
            <div className="no-print my-8">
              <AdSlot id="hi-edu-loan-mid" type="banner" />
            </div>

            {/* PROMO BOX (Hindi) */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 no-print mb-12">
              <div className="bg-white p-3 rounded-full shadow-xs shrink-0">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold text-emerald-900 text-lg">
                  Direct vs Regular प्लान में उलझन?
                </h4>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  कमीशन के कारण आपको हर साल 1.5% तक का नुकसान हो सकता है। जानें
                  कि डायरेक्ट प्लान बेहतर क्यों है।
                </p>
              </div>
              <Link
                href="/guides/mutual-fund-guide/" // Ensure this Hindi guide exists or link to English
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-sm shadow-emerald-200"
              >
                गाइड पढ़ें <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* CONTENT */}
            <article className="prose prose-slate max-w-none">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mt-0">
                <PieChart className="h-6 w-6 text-indigo-600" /> एसेट एलोकेशन
                क्यों जरूरी है?
              </h2>
              <p className="text-slate-700 leading-relaxed">
                निवेश का मतलब सिर्फ &quot;सबसे अच्छा&quot; शेयर चुनना नहीं है।
                इसका मतलब है एक संतुलित पोर्टफोलियो बनाना।{' '}
                <strong>एसेट एलोकेशन</strong> वह तरीका है जिससे आप अपने पैसे को
                अलग-अलग जगहों पर लगाते हैं:
              </p>

              <div className="grid md:grid-cols-3 gap-6 not-prose mb-10 mt-6">
                <Card className="border-indigo-100 bg-indigo-50/50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-indigo-900 mb-2">
                      इक्विटी (Equity)
                    </h4>
                    <p className="text-sm text-slate-600">
                      पैसे बढ़ाने के लिए (Growth)। लंबी अवधि में सबसे ज्यादा
                      रिटर्न।
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-blue-100 bg-blue-50/50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-blue-900 mb-2">डेट (Debt)</h4>
                    <p className="text-sm text-slate-600">
                      सुरक्षा और स्थिरता के लिए। बाजार की गिरावट में पोर्टफोलियो
                      को बचाता है।
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-amber-100 bg-amber-50/50">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-amber-900 mb-2">
                      सोना (Gold)
                    </h4>
                    <p className="text-sm text-slate-600">
                      बुरे वक्त और महंगाई से बचने के लिए (Hedge against
                      inflation)।
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* AD */}
              <div className="my-10 flex justify-center no-print">
                <AdSlot type="square" label="Advertisement" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" /> निवेश की
                रणनीतियाँ (Strategies)
              </h3>
              <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm mb-8">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-slate-900">
                        रणनीति
                      </TableHead>
                      <TableHead className="font-bold text-slate-900">
                        एलोकेशन
                      </TableHead>
                      <TableHead className="font-bold text-slate-900">
                        किसके लिए सही?
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        एग्रेसिव (Growth)
                      </TableCell>
                      <TableCell className="text-emerald-700 font-bold">
                        &gt;70% इक्विटी
                      </TableCell>
                      <TableCell>युवा निवेशक (10+ साल)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        संतुलित (Balanced)
                      </TableCell>
                      <TableCell className="text-blue-700 font-bold">
                        50% इक्विटी / 50% डेट
                      </TableCell>
                      <TableCell>मध्यम जोखिम लेने वाले</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        सुरक्षित (Conservative)
                      </TableCell>
                      <TableCell className="text-amber-700 font-bold">
                        &gt;70% डेट
                      </TableCell>
                      <TableCell>रिटायर हो चुके लोग</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-lg my-10">
                <h3 className="text-lg font-bold text-slate-900 mt-0 mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-slate-600" /> म्यूचुअल
                  फंड पर टैक्स (Tax Rules 2026)
                </h3>
                <div className="text-slate-700 text-sm leading-relaxed space-y-2">
                  <p>
                    <strong>इक्विटी फंड्स:</strong> 1 साल से ज्यादा रखने पर
                    ₹1.25 लाख से ऊपर के लाभ पर <strong>12.5%</strong> टैक्स लगता
                    है (LTCG)।
                  </p>
                  <p>
                    <strong>डेट फंड्स:</strong> इसमें होने वाला मुनाफा आपकी आय
                    में जुड़ता है और आपके टैक्स स्लैब के अनुसार टैक्स लगता है (1
                    अप्रैल 2023 के बाद के निवेश पर)।
                  </p>
                </div>
              </div>

              {/* Related Tools */}
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                संबंधित कैलकुलेटर
              </h3>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/hi/sip-calculator/"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  SIP कैलकुलेटर
                </Link>
                <Link
                  href="/hi/lumpsum-calculator/"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  लम्पसम कैलकुलेटर
                </Link>
                <Link
                  href="/hi/swp-calculator/"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  SWP कैलकुलेटर
                </Link>
              </div>
            </article>

            {/* FAQs */}
            <section className="mb-12 no-print">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-emerald-600" /> अक्सर पूछे
                जाने वाले प्रश्न (FAQs)
              </h2>
              <Accordion
                type="single"
                collapsible
                defaultValue="item-0"
                className="w-full"
              >
                {faqItems.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white border rounded-lg mb-3 px-4"
                  >
                    <AccordionTrigger className="text-slate-900 font-semibold hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <HindiSidebar adId="hi-edu-loan-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
